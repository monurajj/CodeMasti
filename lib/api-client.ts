/**
 * API Client with retry logic and comprehensive error handling
 */

export interface ApiError {
  message: string;
  type: 'network' | 'server' | 'client' | 'timeout' | 'unknown';
  statusCode?: number;
  retryable: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  retryableStatusCodes?: number[];
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};

/**
 * Determines if an error is a network error
 */
function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }
  if (error instanceof Error) {
    return (
      error.message.includes('network') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('Network request failed')
    );
  }
  return false;
}

/**
 * Determines if an error is a timeout error
 */
function isTimeoutError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('timeout') ||
      error.message.includes('TimeoutError') ||
      error.message.includes('aborted')
    );
  }
  return false;
}

/**
 * Creates a standardized error object
 */
function createApiError(error: unknown, statusCode?: number): ApiError {
  // Network errors
  if (isNetworkError(error)) {
    return {
      message: 'Network connection failed. Please check your internet connection and try again.',
      type: 'network',
      retryable: true,
    };
  }

  // Timeout errors
  if (isTimeoutError(error)) {
    return {
      message: 'Request timed out. Please try again.',
      type: 'timeout',
      retryable: true,
    };
  }

  // HTTP status code errors
  if (statusCode) {
    if (statusCode >= 500) {
      return {
        message: 'Server error occurred. Please try again later.',
        type: 'server',
        statusCode,
        retryable: true,
      };
    }
    if (statusCode === 429) {
      return {
        message: 'Too many requests. Please wait a moment and try again.',
        type: 'server',
        statusCode,
        retryable: true,
      };
    }
    if (statusCode === 408) {
      return {
        message: 'Request timed out. Please try again.',
        type: 'timeout',
        statusCode,
        retryable: true,
      };
    }
    if (statusCode >= 400 && statusCode < 500) {
      return {
        message: 'Invalid request. Please check your input and try again.',
        type: 'client',
        statusCode,
        retryable: false,
      };
    }
  }

  // Generic error
  if (error instanceof Error) {
    return {
      message: error.message || 'An unexpected error occurred. Please try again.',
      type: 'unknown',
      statusCode,
      retryable: false,
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'unknown',
    retryable: false,
  };
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculates exponential backoff delay
 */
function calculateRetryDelay(attempt: number, baseDelay: number): number {
  return baseDelay * Math.pow(2, attempt);
}

/**
 * Makes an API request with retry logic
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<ApiResponse<T>> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
  let lastError: ApiError | null = null;
  let lastStatusCode: number | undefined;

  // Add timeout to fetch request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      lastStatusCode = response.status;

      // Handle successful response
      if (response.ok) {
        try {
          const data = await response.json();
          return {
            success: true,
            data,
          };
        } catch (parseError) {
          // Response is ok but not JSON
          return {
            success: true,
            data: {} as T,
          };
        }
      }

      // Handle error response
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      const apiError = createApiError(
        new Error(errorMessage),
        response.status
      );

      // Check if we should retry
      const shouldRetry =
        attempt < config.maxRetries &&
        apiError.retryable &&
        (config.retryableStatusCodes.includes(response.status) ||
          response.status >= 500);

      if (!shouldRetry) {
        return {
          success: false,
          error: apiError,
        };
      }

      lastError = apiError;

      // Wait before retrying with exponential backoff
      if (attempt < config.maxRetries) {
        const delay = calculateRetryDelay(attempt, config.retryDelay);
        await sleep(delay);
      }
    } catch (error) {
      clearTimeout(timeoutId);

      const apiError = createApiError(error, lastStatusCode);

      // Check if we should retry
      const shouldRetry =
        attempt < config.maxRetries &&
        apiError.retryable &&
        (apiError.type === 'network' ||
          apiError.type === 'timeout' ||
          apiError.type === 'server');

      if (!shouldRetry) {
        return {
          success: false,
          error: apiError,
        };
      }

      lastError = apiError;

      // Wait before retrying with exponential backoff
      if (attempt < config.maxRetries) {
        const delay = calculateRetryDelay(attempt, config.retryDelay);
        await sleep(delay);
      }
    }
  }

  // All retries exhausted
  return {
    success: false,
    error:
      lastError ||
      createApiError(new Error('Request failed after multiple attempts')),
  };
}

/**
 * Helper function for POST requests
 */
export async function postRequest<T = any>(
  url: string,
  data: any,
  retryOptions?: RetryOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    retryOptions
  );
}

/**
 * Helper function for GET requests
 */
export async function getRequest<T = any>(
  url: string,
  retryOptions?: RetryOptions
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { method: 'GET' }, retryOptions);
}

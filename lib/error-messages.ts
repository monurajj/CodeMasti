/**
 * Centralized error messages for better user experience
 */

export interface ErrorMessage {
  title: string;
  message: string;
  suggestion?: string;
}

/**
 * Gets user-friendly error messages based on error type and context
 */
export function getErrorMessage(
  error: { type: string; message?: string; statusCode?: number },
  context: 'register' | 'contact' | 'newsletter' = 'register'
): ErrorMessage {
  const { type, message, statusCode } = error;

  // Network errors
  if (type === 'network') {
    return {
      title: 'Connection Problem',
      message: 'Unable to connect to the server. Please check your internet connection.',
      suggestion: 'Make sure you are connected to the internet and try again.',
    };
  }

  // Timeout errors
  if (type === 'timeout') {
    return {
      title: 'Request Timed Out',
      message: 'The request took too long to complete.',
      suggestion: 'Please try again. If the problem persists, check your internet connection.',
    };
  }

  // Server errors (5xx)
  if (type === 'server' || (statusCode && statusCode >= 500)) {
    return {
      title: 'Server Error',
      message: 'Our servers are experiencing issues. We are working to fix this.',
      suggestion: 'Please try again in a few moments. If the problem continues, contact support.',
    };
  }

  // Rate limiting (429)
  if (statusCode === 429) {
    return {
      title: 'Too Many Requests',
      message: 'You have made too many requests. Please wait a moment.',
      suggestion: 'Please wait a few seconds before trying again.',
    };
  }

  // Client errors (4xx)
  if (type === 'client' || (statusCode && statusCode >= 400 && statusCode < 500)) {
    // Validation errors
    if (statusCode === 400) {
      const contextMessages = {
        register: {
          title: 'Invalid Information',
          message: message || 'Please check all fields and make sure they are filled correctly.',
          suggestion: 'Review the form and ensure all required fields are completed.',
        },
        contact: {
          title: 'Invalid Information',
          message: message || 'Please check your message and contact details.',
          suggestion: 'Make sure all required fields are filled correctly.',
        },
        newsletter: {
          title: 'Invalid Email',
          message: message || 'Please enter a valid email address.',
          suggestion: 'Check your email address and try again.',
        },
      };
      return contextMessages[context];
    }

    // Unauthorized
    if (statusCode === 401) {
      return {
        title: 'Authentication Required',
        message: 'Your session has expired or you are not authorized.',
        suggestion: 'Please refresh the page and try again.',
      };
    }

    // Forbidden
    if (statusCode === 403) {
      return {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action.',
        suggestion: 'If you believe this is an error, please contact support.',
      };
    }

    // Not found
    if (statusCode === 404) {
      return {
        title: 'Not Found',
        message: 'The requested resource could not be found.',
        suggestion: 'Please check the URL or try again later.',
      };
    }

    // Generic client error (e.g. duplicate email)
    const isAlreadyRegistered = message?.toLowerCase().includes('already registered');
    return {
      title: isAlreadyRegistered ? 'Email Already Registered' : 'Invalid Request',
      message: message || 'There was a problem with your request.',
      suggestion: isAlreadyRegistered
        ? 'You can reach us at info.codemasti@gmail.com for assistance.'
        : 'Please check your input and try again.',
    };
  }

  // Unknown errors
  return {
    title: 'Something Went Wrong',
    message: message || 'An unexpected error occurred. Please try again.',
    suggestion: 'If the problem persists, please contact support.',
  };
}

/**
 * Gets a specific error message for API responses
 */
export function getApiErrorMessage(
  response: { error?: string; message?: string },
  context: 'register' | 'contact' | 'newsletter' = 'register'
): ErrorMessage {
  const errorText = response.error || response.message || '';

  // Check for specific error patterns
  if (errorText.toLowerCase().includes('email')) {
    return {
      title: 'Email Error',
      message: 'There was a problem with the email address.',
      suggestion: 'Please check your email address and try again.',
    };
  }

  if (errorText.toLowerCase().includes('required')) {
    return {
      title: 'Missing Information',
      message: 'Some required fields are missing.',
      suggestion: 'Please fill in all required fields and try again.',
    };
  }

  if (errorText.toLowerCase().includes('invalid')) {
    return {
      title: 'Invalid Information',
      message: errorText,
      suggestion: 'Please check your input and try again.',
    };
  }

  // Default error message
  return {
    title: 'Request Failed',
    message: errorText || 'Unable to complete your request.',
    suggestion: 'Please try again. If the problem persists, contact support.',
  };
}

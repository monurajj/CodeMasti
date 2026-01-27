# Error Handling Implementation

This document describes the comprehensive error handling improvements implemented in the CodeMasti application.

## Overview

The application now includes:
1. **Retry logic** for failed API calls
2. **Specific error messages** based on error type and context
3. **Network error detection** and handling
4. **React Error Boundaries** for graceful error recovery
5. **User-friendly error messages** with actionable suggestions

## Files Created

### 1. `/lib/api-client.ts`
- **Purpose**: Centralized API client with retry logic and error handling
- **Features**:
  - Automatic retry with exponential backoff
  - Network error detection
  - Timeout handling (30 seconds)
  - Specific error types (network, server, client, timeout, unknown)
  - Configurable retry options

**Key Functions**:
- `apiRequest<T>()` - Main API request function with retry logic
- `postRequest<T>()` - Helper for POST requests
- `getRequest<T>()` - Helper for GET requests

**Usage Example**:
```typescript
import { postRequest } from "@/lib/api-client";

const result = await postRequest('/api/register', formData, {
  maxRetries: 3,
  retryDelay: 1000,
});

if (result.success) {
  // Handle success
} else {
  // Handle error - result.error contains detailed error info
}
```

### 2. `/lib/error-messages.ts`
- **Purpose**: Centralized error message management
- **Features**:
  - Context-specific error messages (register, contact, newsletter)
  - User-friendly error titles and descriptions
  - Actionable suggestions for users
  - Handles different HTTP status codes

**Key Functions**:
- `getErrorMessage()` - Gets user-friendly error message based on error type
- `getApiErrorMessage()` - Gets error message from API response

**Usage Example**:
```typescript
import { getErrorMessage } from "@/lib/error-messages";

const errorMsg = getErrorMessage(result.error, "register");
// Returns: { title: string, message: string, suggestion?: string }
```

### 3. `/components/ErrorBoundary.tsx`
- **Purpose**: React Error Boundary for catching component errors
- **Features**:
  - Catches JavaScript errors in component tree
  - Provides fallback UI
  - Error logging (development mode)
  - Reset functionality
  - Customizable fallback UI

**Usage**:
The ErrorBoundary is automatically applied to the entire application via the root layout.

### 4. `/components/ErrorMessage.tsx`
- **Purpose**: Reusable error message component
- **Features**:
  - Consistent error UI across the application
  - Dismissible errors
  - Accessible (ARIA labels)
  - Customizable styling

**Usage Example**:
```typescript
<ErrorMessage
  title="Connection Problem"
  message="Unable to connect to the server."
  suggestion="Check your internet connection and try again."
  onDismiss={() => setError(null)}
/>
```

## Updated Pages

### 1. `/app/register/page.tsx`
- ✅ Uses `postRequest()` with retry logic
- ✅ Displays specific error messages
- ✅ Shows network error messages
- ✅ Better error state management

### 2. `/app/contact/page.tsx`
- ✅ Uses `postRequest()` with retry logic
- ✅ Displays specific error messages
- ✅ Shows network error messages
- ✅ Better error state management

### 3. `/app/page.tsx` (Newsletter Form)
- ✅ Uses `postRequest()` with retry logic
- ✅ Displays specific error messages
- ✅ Shows network error messages
- ✅ Better error state management

### 4. `/app/layout.tsx`
- ✅ Wrapped with ErrorBoundary for global error catching

## Error Types Handled

### Network Errors
- **Detection**: Failed fetch, network errors, connection issues
- **Message**: "Network connection failed. Please check your internet connection."
- **Retryable**: Yes (automatic retry with exponential backoff)

### Timeout Errors
- **Detection**: Request timeout (30 seconds), aborted requests
- **Message**: "Request timed out. Please try again."
- **Retryable**: Yes

### Server Errors (5xx)
- **Detection**: HTTP status codes 500-599
- **Message**: "Server error occurred. We are working to fix this."
- **Retryable**: Yes (for retryable status codes: 500, 502, 503, 504)

### Client Errors (4xx)
- **Detection**: HTTP status codes 400-499
- **Message**: Context-specific messages
- **Retryable**: No (user input issues)

### Rate Limiting (429)
- **Detection**: HTTP status code 429
- **Message**: "Too many requests. Please wait a moment."
- **Retryable**: Yes (with delay)

## Retry Configuration

Default retry settings:
- **Max Retries**: 3 attempts
- **Initial Delay**: 1 second
- **Backoff Strategy**: Exponential (1s, 2s, 4s)
- **Retryable Status Codes**: 408, 429, 500, 502, 503, 504

Customizable per request:
```typescript
postRequest('/api/endpoint', data, {
  maxRetries: 5,
  retryDelay: 2000,
  retryableStatusCodes: [500, 502, 503]
});
```

## Error Message Examples

### Network Error
```
Title: Connection Problem
Message: Unable to connect to the server. Please check your internet connection.
Suggestion: Make sure you are connected to the internet and try again.
```

### Server Error
```
Title: Server Error
Message: Our servers are experiencing issues. We are working to fix this.
Suggestion: Please try again in a few moments. If the problem continues, contact support.
```

### Validation Error (Register)
```
Title: Invalid Information
Message: Please check all fields and make sure they are filled correctly.
Suggestion: Review the form and ensure all required fields are completed.
```

## Benefits

1. **Better User Experience**: Users see specific, actionable error messages
2. **Automatic Recovery**: Retry logic handles transient failures automatically
3. **Network Resilience**: Handles network issues gracefully
4. **Error Isolation**: Error boundaries prevent entire app crashes
5. **Consistent UI**: Standardized error display across the application
6. **Developer Friendly**: Detailed error logging in development mode

## Testing Error Handling

### Test Network Errors
1. Disable internet connection
2. Submit a form
3. Should see: "Connection Problem" error with retry attempts

### Test Server Errors
1. Temporarily break an API endpoint
2. Submit a form
3. Should see: "Server Error" message with retry attempts

### Test Validation Errors
1. Submit form with invalid data
2. Should see: Specific validation error messages

### Test Error Boundary
1. Cause a component error (e.g., undefined property access)
2. Should see: Error boundary fallback UI with "Try Again" option

## Future Enhancements

Potential improvements:
- Error reporting service integration (e.g., Sentry)
- User error reporting mechanism
- Analytics for error tracking
- Offline mode detection and messaging
- Progressive retry with user notification

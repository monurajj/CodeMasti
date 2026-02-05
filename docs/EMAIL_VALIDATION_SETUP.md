# Email Validation Setup

## Overview

The contact form now validates if email addresses actually exist (not just format validation). This helps prevent invalid email submissions and improves data quality.

## Setup Instructions

### Option 1: Mails.so (Recommended)

1. **Sign up for Mails.so**
   - Go to [Mails.so](https://mails.so/)
   - Sign up for an account
   - Navigate to the API section

2. **Get your API Key**
   - Copy your API key from the dashboard

3. **Add to Environment Variables**
   - Add to your `.env.local` file:
   ```
   MAILS_SO_API_KEY=your_api_key_here
   ```

4. **Deploy**
   - Add the same environment variable to your hosting platform (Vercel, etc.)

### Option 2: Without API Key (Fallback)

If `MAILS_SO_API_KEY` is not configured:
- The system will only perform basic email format validation
- Email existence checks will be skipped
- This is acceptable for development/testing

## How It Works

1. **Format Validation**: First checks if the email format is valid (basic regex)
2. **Existence Check**: If API key is configured, validates if the email actually exists and can receive emails
3. **Error Handling**: Shows user-friendly error messages if validation fails

## Error Messages

Users will see appropriate error messages:
- **Invalid Format**: "Invalid email format. Please enter a valid email address."
- **Email Doesn't Exist**: "This email address does not exist or cannot receive emails. Please check your email address and try again."

## Testing

1. Test with a valid email: `test@example.com` (should pass)
2. Test with invalid format: `notanemail` (should show format error)
3. Test with non-existent email: `nonexistent12345@example.com` (should show existence error if API key is configured)

## Notes

- The validation is performed server-side in the API route
- If the validation API fails, the email is allowed through to avoid blocking legitimate users
- The validation adds a small delay (~500ms) to form submission

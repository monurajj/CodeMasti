/**
 * Validates if an email address actually exists (not just format validation)
 * Uses Mails.so email validation service
 * Falls back to basic format validation if API key is not configured
 */

interface EmailValidationResult {
  isValid: boolean;
  isDeliverable: boolean;
  error?: string;
}

export async function validateEmailExistence(
  email: string
): Promise<EmailValidationResult> {
  // Basic format validation first
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      isDeliverable: false,
      error: 'Invalid email format',
    };
  }

  // Check if Mails.so API key is configured
  const apiKey = process.env.MAILS_SO_API_KEY;

  if (!apiKey) {
    // If no API key, do basic validation only
    console.warn('⚠️ MAILS_SO_API_KEY not configured, skipping email existence check');
    return {
      isValid: true,
      isDeliverable: true, // Assume valid if we can't check
    };
  }

  try {
    // Use Mails.so for email validation
    const response = await fetch(
      `https://api.mails.so/v1/validate?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'x-mails-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      console.error('Email validation API error:', response.status);
      // If API fails, allow the email through but log the error
      return {
        isValid: true,
        isDeliverable: true,
      };
    }

    const data = await response.json();
    const result = data.data;

    // Check if email format is valid according to the API
    const isValid = result.isv_format === true;

    if (!isValid) {
      return {
        isValid: false,
        isDeliverable: false,
        error: 'Invalid email format',
      };
    }

    // Check if email is deliverable
    // result.result can be 'deliverable', 'risky', 'unknown', 'undeliverable'
    // We strictly block 'undeliverable'. 'risky' and 'unknown' are allowed but logged/warned if needed.
    // Also using score as a secondary signal if available (though result is primary)
    const isDeliverable = result.result !== 'undeliverable';

    if (!isDeliverable) {
      return {
        isValid: true,
        isDeliverable: false,
        error: 'This email address does not exist or cannot receive emails. Please check and try again.',
      };
    }

    return {
      isValid: true,
      isDeliverable: true,
    };
  } catch (error) {
    console.error('Error validating email existence:', error);
    // If validation fails, allow the email through to avoid blocking legitimate users
    return {
      isValid: true,
      isDeliverable: true,
    };
  }
}

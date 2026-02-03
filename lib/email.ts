const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Parse "Name <email>" or use as email only
function parseFrom(from: string): { name: string; email: string } {
  const match = from.match(/^(.+?)\s*<([^>]+)>$/);
  if (match) return { name: match[1].trim(), email: match[2].trim() };
  return { name: process.env.BREVO_SENDER_NAME || 'CodeMasti', email: from.trim() };
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (
  options: EmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'CodeMasti';

  if (!apiKey || !senderEmail) {
    const missing = !apiKey ? 'BREVO_API_KEY' : 'BREVO_SENDER_EMAIL';
    throw new Error(
      `Brevo is not configured. Please add ${missing} to your .env.local file.`
    );
  }

  const sender = options.from
    ? parseFrom(options.from)
    : { name: senderName, email: senderEmail };

  const toList = Array.isArray(options.to) ? options.to : [options.to];
  const to = toList.map((email) => ({ email: email.trim() }));

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: sender.name, email: sender.email },
        to,
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = data.message || data.code || res.statusText;
      console.error('Brevo API error:', res.status, data);
      return {
        success: false,
        error: typeof message === 'string' ? message : JSON.stringify(message),
      };
    }

    return {
      success: true,
      messageId: data.messageId ?? undefined,
    };
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('Error sending email:', err);
    return {
      success: false,
      error: err.message,
    };
  }
};

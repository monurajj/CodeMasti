# SMTP Email Setup Guide

## Overview

Your CodeMasti website now uses SMTP (via Nodemailer) to send automated emails. This guide will help you configure SMTP credentials.

## Quick Setup (Gmail - Recommended for Testing)

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

### Step 2: Generate App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Enter "CodeMasti" as the name
4. Click **Generate**
5. **Copy the 16-character password** (you'll need this!)

### Step 3: Add to Environment Variables

Add these to your `.env.local` file:

```env
# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info.codemasti@gmail.com
SMTP_PASS=your-16-character-app-password-here
```

**Important:** Replace `your-16-character-app-password-here` with the app password you generated in Step 2.

## Other SMTP Providers

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### Custom SMTP Server

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
```

**Note:** For port 465, set `SMTP_SECURE=true`. For port 587, set `SMTP_SECURE=false`.

## Testing

After adding your SMTP credentials:

1. Restart your development server (`npm run dev`)
2. Test the newsletter signup form
3. Test the contact form
4. Check your email inbox (and spam folder)

## Troubleshooting

### "Invalid login" error
- **Gmail:** Make sure you're using an App Password, not your regular password
- **Other providers:** Verify your credentials are correct

### "Connection timeout" error
- Check your firewall settings
- Verify SMTP_HOST and SMTP_PORT are correct
- Try port 465 with SMTP_SECURE=true

### Emails going to spam
- This is normal for new email addresses
- Add SPF/DKIM records to your domain (if using custom domain)
- Ask recipients to mark as "Not Spam"

### "Authentication failed" error
- Verify 2FA is enabled (for Gmail)
- Regenerate app password
- Check SMTP_USER matches the email address exactly

## Security Notes

- **Never commit `.env.local` to git** (it's already in `.gitignore`)
- Use App Passwords, not regular passwords
- Rotate passwords regularly
- For production, consider using a dedicated email service (SendGrid, Mailgun, etc.)

## Production Recommendations

For production deployment:

1. **Use a dedicated email service:**
   - SendGrid (free tier: 100 emails/day)
   - Mailgun (free tier: 5,000 emails/month)
   - Amazon SES (very affordable)

2. **Set up domain authentication:**
   - Add SPF records
   - Add DKIM records
   - Add DMARC records

3. **Monitor email delivery:**
   - Check bounce rates
   - Monitor spam complaints
   - Track open/click rates

## Need Help?

- Nodemailer Docs: https://nodemailer.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Test SMTP: https://www.smtper.net/

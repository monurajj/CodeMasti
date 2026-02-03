# Resend Email Setup - Complete ✅

## What's Been Done

✅ **Resend package installed**
✅ **API key added to `.env.local`**
✅ **Contact form API configured** - Sends emails to admin and confirmation to user
✅ **Newsletter API configured** - Sends welcome email to user and notification to admin

## Important: Domain Verification

Currently using Resend's test domain: `onboarding@resend.dev`

**To use your custom domain (e.g., `contact@codemasti.com`):**

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your domain (`codemasti.com`)
3. Update the `from` field in both API routes:
   - `/app/api/contact/route.ts`
   - `/app/api/newsletter/route.ts`
   
   Change from:
   ```typescript
   from: 'CodeMasti <onboarding@resend.dev>'
   ```
   
   To:
   ```typescript
   from: 'CodeMasti <contact@codemasti.com>'  // or your preferred email
   ```

## Update Email Addresses

Update these email addresses in the API routes:

1. **Contact Form** (`/app/api/contact/route.ts`):
   - Line with `to: ['info@codemasti.com', 'support@codemasti.com']` - Update with your actual admin emails

2. **Newsletter** (`/app/api/newsletter/route.ts`):
   - Line with `to: ['info@codemasti.com']` - Update with your actual admin email

## Testing

The emails are now working! Test by:
1. Submitting the contact form on `/contact` page
2. Signing up for the newsletter on the homepage

Both will send real emails through Resend.

## Security Note

Your `.env.local` file is already in `.gitignore`, so your API key is safe. Never commit it to git!

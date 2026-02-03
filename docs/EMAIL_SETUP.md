# Email Setup Guide

## Current Status

✅ **API Routes Created:**
- `/app/api/contact/route.ts` - Handles contact form submissions
- `/app/api/newsletter/route.ts` - Handles newsletter/waitlist signups

✅ **Frontend Connected:**
- Contact form now sends data to `/api/contact`
- Homepage email input now sends data to `/api/newsletter`

⚠️ **Email Service Not Configured:**
Currently, the API routes only log the data to the console. You need to set up an email service to actually send emails.

## Setup Options

### Option 1: Resend (Recommended for Next.js)

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Install Resend:**
   ```bash
   npm install resend
   ```
4. **Add to `.env.local`:**
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
5. **Update `/app/api/contact/route.ts` and `/app/api/newsletter/route.ts`:**
   - Uncomment the Resend code
   - Replace `contact@codemasti.com` with your verified domain email

### Option 2: SendGrid

1. **Sign up at [sendgrid.com](https://sendgrid.com)**
2. **Get your API key**
3. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```
4. **Add to `.env.local`:**
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   ```
5. **Update the API routes** to use SendGrid

### Option 3: Nodemailer (SMTP)

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   ```
2. **Add SMTP credentials to `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. **Update the API routes** to use Nodemailer

### Option 4: Database Storage (Alternative)

If you just want to store submissions without sending emails immediately:

1. **Set up a database** (PostgreSQL, MongoDB, etc.)
2. **Install database client:**
   ```bash
   npm install @prisma/client prisma  # For Prisma
   # OR
   npm install mongodb  # For MongoDB
   ```
3. **Update API routes** to save to database instead of sending emails

## Testing

Currently, all form submissions are logged to the console. Check your terminal/console when:
- Someone submits the contact form
- Someone signs up for the newsletter

## Next Steps

1. Choose an email service (Resend recommended)
2. Install the required package
3. Add API key to `.env.local`
4. Uncomment and configure the email code in the API routes
5. Test with a real submission

## Security Notes

- Never commit `.env.local` to git
- Use environment variables for all sensitive data
- Validate and sanitize all form inputs (already done)
- Consider adding rate limiting for production

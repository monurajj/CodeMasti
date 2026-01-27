# Resend Domain Verification Guide

## Current Issue

The `onboarding@resend.dev` sender can **only send to your verified email address** (the one associated with your Resend account). To send emails to all users, you need to verify your domain.

## Solution: Verify Your Domain in Resend

### Step 1: Add Your Domain

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain: `codemasti.com`
4. Click **"Add"**

### Step 2: Verify Domain Ownership

Resend will provide you with DNS records to add to your domain. You'll need to add these records to your domain's DNS settings:

**Required DNS Records:**
- **SPF Record** (TXT)
- **DKIM Records** (CNAME)
- **DMARC Record** (TXT) - Optional but recommended

### Step 3: Add DNS Records

1. Log in to your domain registrar (where you bought codemasti.com)
2. Go to DNS settings
3. Add the DNS records provided by Resend
4. Wait for DNS propagation (usually 5-60 minutes)

### Step 4: Verify Domain in Resend

1. Go back to [Resend Domains](https://resend.com/domains)
2. Click **"Verify"** next to your domain
3. Wait for verification (can take a few minutes)

### Step 5: Update Your Code

Once your domain is verified, update the `from` address in these files:

**Files to update:**
- `/app/api/contact/route.ts`
- `/app/api/newsletter/route.ts`

**Change from:**
```typescript
from: 'CodeMasti <onboarding@resend.dev>',
```

**Change to:**
```typescript
from: 'CodeMasti <noreply@codemasti.com>', // or info@codemasti.com
```

## Alternative: Quick Test (Temporary)

If you want to test emails immediately, you can temporarily send to your own verified email address (`info.codemasti@gmail.com`) to confirm the email templates work correctly.

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Domain Setup Guide: https://resend.com/docs/dashboard/domains/introduction

## After Verification

Once your domain is verified:
1. ✅ Update the `from` addresses in both API routes
2. ✅ Test sending to a real user email
3. ✅ All emails will now work for any recipient!

# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to automatically save all contact form submissions and newsletter signups to a Google Sheet.

## Overview

All messages and contact information will be automatically saved to a Google Sheet with the following columns:
- **Timestamp** - When the submission was received
- **Name** - Contact name (for contact forms)
- **Email** - Contact email
- **Phone** - Contact phone number (for contact forms)
- **Student Class** - Student's class (for contact forms)
- **Message** - Message content (for contact forms)
- **Type** - Either "Contact" or "Newsletter"
- **Resolved** - Status tracking (you can manually update this)
- **Section** - Section/category (you can manually update this)
- **Admission Done** - Admission status (you can manually update this)
- **Message by Founder** - Notes from founder (you can manually update this)
- **Notes** - Additional notes (you can manually update this)

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter a project name (e.g., "CodeMasti Sheets")
5. Click "Create"

### 2. Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

### 3. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name (e.g., "codemasti-sheets-service")
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file

### 5. Share Google Sheet with Service Account

1. Create a new Google Sheet (or use an existing one)
2. Click the "Share" button in the top right
3. Copy the email address from the service account JSON file (it looks like: `your-service-account@project-id.iam.gserviceaccount.com`)
4. Paste it in the "Share" field and give it "Editor" access
5. Click "Send"

### 6. Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL - it will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
3. Copy the `YOUR_SHEET_ID` part (the long string between `/d/` and `/edit`)

### 7. Configure Environment Variables

Open your `.env.local` file and add the following variables:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id
```

**Important Notes:**
- Replace `your_sheet_id_here` with the Sheet ID from step 6
- Replace `your-service-account@project-id.iam.gserviceaccount.com` with the `client_email` from the JSON file
- Replace `Your private key here` with the `private_key` from the JSON file (keep the quotes and `\n` characters)
- Replace `your-project-id` with the `project_id` from the JSON file

### 8. Example `.env.local` File

```env
# Existing variables...
RESEND_API_KEY=re_your_api_key_here

# Google Sheets Configuration
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
GOOGLE_SERVICE_ACCOUNT_EMAIL=codemasti-sheets@codemasti-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=codemasti-project
```

## How It Works

1. **Contact Form Submissions**: When someone submits the contact form, the data is automatically saved to your Google Sheet with all the contact information.

2. **Newsletter Signups**: When someone signs up for the newsletter, their email is saved to the same Google Sheet with the type marked as "Newsletter".

3. **Automatic Headers**: The first time data is saved, the sheet will automatically create a header row with all the columns.

4. **Manual Updates**: You can manually update the "Resolved", "Section", "Admission Done", "Message by Founder", and "Notes" columns directly in Google Sheets.

## Testing

1. Submit a test contact form on your website
2. Check your Google Sheet - you should see a new row with the data
3. Submit a test newsletter signup
4. Check your Google Sheet again - you should see another row

## Troubleshooting

### Error: "The caller does not have permission"
- Make sure you've shared the Google Sheet with the service account email
- Verify the service account email is correct in your `.env.local`

### Error: "Invalid credentials"
- Check that your `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` includes the full key with `\n` characters
- Make sure the private key is wrapped in quotes in `.env.local`

### Error: "Unable to parse range"
- Verify your `GOOGLE_SHEET_ID` is correct
- Make sure the sheet exists and is accessible

### Data not appearing
- Check your server logs for any error messages
- Verify all environment variables are set correctly
- Make sure the Google Sheets API is enabled in your Google Cloud project

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your service account JSON file secure
- The service account should only have access to the specific Google Sheet you're using
- Regularly rotate your service account keys if needed

## Support

If you encounter any issues, check:
1. Server logs for detailed error messages
2. Google Cloud Console for API quota limits
3. Google Sheet sharing permissions

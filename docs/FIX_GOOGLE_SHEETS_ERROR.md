# Fix Google Sheets 403 Error

## 🔴 Error You're Seeing

```
403 Forbidden - Google Sheets API has not been used in project 834597755944 before or it is disabled
```

## ✅ Solutions

### Issue 1: Enable Google Sheets API

**The Google Sheets API is not enabled for your project.**

1. **Click this link to enable it:**
   ```
   https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=834597755944
   ```

2. **Or manually:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project (project ID: 834597755944)
   - Go to **APIs & Services** > **Library**
   - Search for **"Google Sheets API"**
   - Click on it
   - Click **"Enable"** button
   - Wait 1-2 minutes for it to propagate

### Issue 2: Fix Your Sheet ID

**Your `GOOGLE_SHEET_ID` appears to be incorrect.**

The error shows: `mybuddy-485608` which looks like a project name, not a Sheet ID.

**A proper Google Sheet ID should look like:**
```
1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```
(A long alphanumeric string, usually 44 characters)

**To find your correct Sheet ID:**

1. **Create a new Google Sheet** (or use an existing one):
   - Go to [Google Sheets](https://sheets.google.com/)
   - Create a new blank sheet
   - Or open an existing sheet

2. **Get the Sheet ID from the URL:**
   - Look at the URL in your browser
   - It will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f/edit`
     Then Sheet ID is: `1a2b3c4d5e6f`

3. **Update your `.env.local`:**
   ```env
   GOOGLE_SHEET_ID=your_actual_sheet_id_here
   ```
   Replace `your_actual_sheet_id_here` with the ID you copied

4. **Share the sheet with your service account:**
   - In your Google Sheet, click **"Share"** button (top right)
   - Add the service account email (from `GOOGLE_SERVICE_ACCOUNT_EMAIL` in your `.env.local`)
   - Give it **"Editor"** access
   - Click **"Send"**

### Step-by-Step Fix

1. ✅ **Enable Google Sheets API** (use the link above or follow manual steps)

2. ✅ **Create/Open a Google Sheet** and get its ID from the URL

3. ✅ **Update `.env.local`** with the correct `GOOGLE_SHEET_ID`

4. ✅ **Share the sheet** with your service account email

5. ✅ **Restart your dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

6. ✅ **Test again** by submitting a contact form

## 🔍 Verify Your Setup

After fixing, check these in your `.env.local`:

```env
# Should be a long alphanumeric string (not a project name)
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t

# Should be an email ending in @...iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com

# Should start with -----BEGIN PRIVATE KEY-----
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Should match your Google Cloud project ID
GOOGLE_PROJECT_ID=your-project-id
```

## ⚠️ Common Mistakes

1. **Using project name instead of Sheet ID** ❌
   - Wrong: `GOOGLE_SHEET_ID=mybuddy-485608`
   - Right: `GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t`

2. **Not sharing the sheet with service account** ❌
   - The service account email MUST have Editor access to the sheet

3. **API not enabled** ❌
   - Google Sheets API must be enabled in your Google Cloud project

4. **Wrong project** ❌
   - Make sure your `GOOGLE_PROJECT_ID` matches the project where you enabled the API

## 🎯 Quick Fix Checklist

- [ ] Enable Google Sheets API in Google Cloud Console
- [ ] Create/open a Google Sheet and copy its ID from URL
- [ ] Update `GOOGLE_SHEET_ID` in `.env.local`
- [ ] Share the sheet with service account email (Editor access)
- [ ] Restart dev server
- [ ] Test with a form submission

After completing these steps, the error should be resolved! 🎉

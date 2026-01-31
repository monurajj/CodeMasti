# How to View Your Google Sheets Results

## 📊 Accessing Your Google Sheet

### Step 1: Find Your Google Sheet URL

Your Google Sheet ID is stored in your `.env.local` file as `GOOGLE_SHEET_ID`. 

**To access your sheet:**

1. **If you created the sheet yourself:**
   - Go to [Google Drive](https://drive.google.com/)
   - Look for your sheet in "Recent" or search for it
   - Click to open it

2. **If you need to find it using the Sheet ID:**
   - Your Sheet ID is the value of `GOOGLE_SHEET_ID` in your `.env.local`
   - Construct the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Replace `YOUR_SHEET_ID` with your actual Sheet ID
   - Example: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t/edit`

### Step 2: Open the Sheet

Once you open the sheet, you'll see:

## 📋 What You'll See

### Header Row (Automatically Created)

The first row contains these columns:

| Column | Description |
|--------|-------------|
| **Timestamp** | Date and time of submission (IST timezone) |
| **Name** | Contact's name (for contact forms) |
| **Email** | Contact's email address |
| **Phone** | Contact's phone number (if provided) |
| **Student Class** | Student's class (if provided) |
| **Message** | The message content (for contact forms) |
| **Type** | "Contact", "Newsletter", or "Registration" |
| **Resolved** | Empty - You can mark as "Yes", "No", or add status |
| **Section** | Empty - You can add section/category (e.g., "SPARK", "BUILDERS", "INNOVATORS") |
| **Admission Done** | Empty - You can mark as "Yes", "No", or add status |
| **Message by Founder** | Empty - You can add notes/messages from founder |
| **Notes** | Empty - You can add any additional notes |
| **Payment Ref** | PhonePe merchant order ID (for paid registrations) |
| **Payment Status** | "Paid", "Pay Later", or empty |

### Data Rows

Each new submission (contact form or newsletter signup) will appear as a new row below the header.

## 🔍 Viewing Your Data

### Real-Time Updates

- **New submissions appear automatically** - No need to refresh!
- Data is saved immediately when someone submits a form
- Check the "Timestamp" column to see when each submission was received

### Filtering and Sorting

1. **To filter data:**
   - Click on the filter icon (funnel) in the toolbar
   - Or select a column header and click "Create a filter"
   - Filter by Type, Resolved status, Section, etc.

2. **To sort data:**
   - Click on any column header to sort
   - Click again to reverse the sort order
   - Useful for sorting by Timestamp (newest first)

### Viewing Specific Types

- **Contact Forms Only:** Filter the "Type" column to show only "Contact"
- **Newsletter Signups Only:** Filter the "Type" column to show only "Newsletter"

## ✏️ Managing Your Data

### If Your Sheet Was Created Before Payment Columns Were Added

If your header row does not have **Payment Ref** and **Payment Status** columns, add them manually so new registration rows align correctly:

1. In **row 1**, click the cell in **column M** (the 13th column) and type **Payment Ref**.
2. In **row 1**, click the cell in **column N** (the 14th column) and type **Payment Status**.

New registration rows will then show payment info in these columns.

### Updating Columns Manually

You can directly edit cells in these columns:

1. **Resolved Column:**
   - Mark as "Yes" when you've responded to a contact
   - Mark as "No" for pending items
   - Or use statuses like "In Progress", "Closed", etc.

2. **Section Column:**
   - Add section names like "SPARK", "BUILDERS", "INNOVATORS"
   - Or categories like "General Inquiry", "Admission", "Support"

3. **Admission Done Column:**
   - Mark as "Yes" when admission is completed
   - Mark as "No" for pending admissions
   - Or use dates like "2026-05-15"

4. **Message by Founder Column:**
   - Add notes or messages from the founder
   - Internal communication notes
   - Follow-up instructions

5. **Notes Column:**
   - Any additional information
   - Internal remarks
   - Important details about the contact

### Tips for Better Organization

1. **Use Color Coding:**
   - Select rows and use "Fill color" to highlight important entries
   - Example: Yellow for pending, Green for resolved

2. **Freeze Header Row:**
   - Go to View → Freeze → 1 row
   - Keeps headers visible when scrolling

3. **Format Columns:**
   - Right-click column headers to resize
   - Format Timestamp column as date/time
   - Wrap text in Message column for better readability

## 📱 Mobile Access

You can also access your Google Sheet on mobile:

1. **Install Google Sheets app** (iOS/Android)
2. **Sign in** with your Google account
3. **Open the sheet** from your Google Drive
4. View and edit data on the go!

## 🔔 Notifications (Optional)

To get notified of new submissions:

1. In Google Sheets, go to **Tools → Notification rules**
2. Set up email notifications for:
   - When a form is submitted
   - When cells are edited
   - Daily/weekly summaries

## 📊 Quick Stats

To see quick statistics:

1. **Count submissions:** Use `=COUNTA(A:A)-1` (minus 1 for header)
2. **Count by type:** Use `=COUNTIF(G:G,"Contact")` for contacts
3. **Count resolved:** Use `=COUNTIF(H:H,"Yes")` for resolved items

## 🎯 Best Practices

1. **Regular Review:** Check the sheet daily for new submissions
2. **Update Status:** Mark "Resolved" when you've responded
3. **Add Notes:** Document important conversations in the Notes column
4. **Backup:** Google Sheets auto-saves, but you can download as Excel/CSV for backup
5. **Share Access:** Share the sheet with team members who need to view/edit

## 🔗 Quick Links

- [Google Sheets](https://sheets.google.com/)
- [Google Drive](https://drive.google.com/)
- [Google Sheets Help](https://support.google.com/sheets/)

## ❓ Troubleshooting

**Can't see new data?**
- Check if the form submission was successful (check website console)
- Verify `GOOGLE_SHEET_ID` is correct in `.env.local`
- Check server logs for errors

**Sheet not accessible?**
- Make sure you're signed in with the correct Google account
- Verify the sheet exists and hasn't been deleted
- Check if the service account has proper access

**Data formatting issues?**
- The header row is automatically formatted (dark background, white text)
- Data rows use default formatting
- You can customize formatting as needed

---

**Your Google Sheet is your central hub for all contact form submissions and newsletter signups!** 📊✨

# Reset Google Sheet (Clear All Data & Restart)

Use this when you want to **remove all data** and **restart the sheet** with the correct 14-column headers so new submissions align properly (including **Payment Ref** and **Payment Status**).

---

## Option 1: Run the reset script (recommended)

From the **project root** (where `package.json` is):

```bash
npm run reset:sheet
```

Or directly:

```bash
npx tsx scripts/reset-google-sheet.ts
```

This will:

1. Clear all values in **Sheet1** (columns A–Z).
2. Write the **14-column header row** in row 1:  
   Timestamp, Name, Email, Phone, Student Class, Message, Type, Resolved, Section, Admission Done, Message by Founder, Notes, **Payment Ref**, **Payment Status**.

After that, the next contact/registration/newsletter submission will append in row 2 and stay aligned with these columns.

**Requirements:** `.env.local` must have `GOOGLE_SHEET_ID` and the Google service account env vars (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GOOGLE_PROJECT_ID`). The script loads `.env.local` from the project root.

---

## Option 2: Manual reset in Google Sheets

1. Open your Google Sheet (the one used by CodeMasti).
2. Select **all cells** (e.g. click the top-left corner square between row 1 and column A, or select all rows).
3. **Delete** (Delete key or right‑click → Delete).
4. In **row 1**, add these headers in order (one per column, A → N):

   | A | B | C | D | E | F | G | H | I | J | K | L | M | N |
   |---|---|---|---|---|---|---|---|---|---|---|---|---|---|
   | Timestamp | Name | Email | Phone | Student Class | Message | Type | Resolved | Section | Admission Done | Message by Founder | Notes | Payment Ref | Payment Status |

5. Save. The next form submission will append in row 2 and align with these columns.

---

## After reset

- New **Contact**, **Newsletter**, and **Registration** submissions will write to columns **A–N**.
- **Payment Ref** (M) and **Payment Status** (N) will be filled for registrations (Paid / Pay Later); they stay empty for Contact and Newsletter.

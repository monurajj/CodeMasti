/**
 * Reset Google Sheet: clear all data and write the correct 14-column headers.
 * Run from project root: npx tsx scripts/reset-google-sheet.ts
 * Loads .env.local from project root so GOOGLE_SHEET_ID and service account vars are set.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { google } from "googleapis";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) {
    console.warn("⚠️ .env.local not found; using existing process.env");
    return;
  }
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eq = trimmed.indexOf("=");
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
          value = value.slice(1, -1);
        value = value.replace(/\\n/g, "\n");
        process.env[key] = value;
      }
    }
  }
}

loadEnvLocal();

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
const projectId = process.env.GOOGLE_PROJECT_ID;

const HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Student Class",
  "Message",
  "Type",
  "Resolved",
  "Section",
  "Admission Done",
  "Message by Founder",
  "Notes",
  "Payment Ref",
  "Payment Status",
];

async function main() {
  if (!spreadsheetId || !clientEmail || !privateKey || !projectId) {
    console.error("❌ Missing env: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, GOOGLE_PROJECT_ID");
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
      project_id: projectId,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  console.log("🗑️ Clearing Sheet1...");
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Sheet1!A:Z",
  });

  console.log("📝 Writing 14-column headers...");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Sheet1!A1:N1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [HEADERS],
    },
  });

  console.log("✅ Sheet reset complete. Row 1 now has: " + HEADERS.join(" | "));
  console.log("   New form submissions will align with these columns.");
}

main().catch((err) => {
  console.error("❌", err.message || err);
  process.exit(1);
});

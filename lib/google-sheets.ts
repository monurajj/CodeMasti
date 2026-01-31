import { google } from 'googleapis';

// Initialize Google Sheets API
async function getSheetsClient() {
  // Validate required environment variables
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in environment variables');
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is not set in environment variables');
  }
  if (!process.env.GOOGLE_PROJECT_ID) {
    throw new Error('GOOGLE_PROJECT_ID is not set in environment variables');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * Initialize the Google Sheet with headers if it doesn't exist
 */
export async function initializeSheet(spreadsheetId: string) {
  try {
    const sheets = await getSheetsClient();
    
    // Check if sheet exists and has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:Z1',
    });

    // If no data exists, add headers (14 columns – must match row length in append functions)
    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Student Class',
        'Message',
        'Type', // 'Contact', 'Newsletter', or 'Registration'
        'Resolved',
        'Section',
        'Admission Done',
        'Message by Founder',
        'Notes',
        'Payment Ref',
        'Payment Status',
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });

      // Format header row
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                      bold: true,
                    },
                  },
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)',
              },
            },
          ],
        },
      });

      console.log('✅ Google Sheet initialized with headers');
    }
  } catch (error) {
    console.error('❌ Error initializing Google Sheet:', error);
    throw error;
  }
}

/**
 * Append a contact form submission to Google Sheets
 */
export async function appendContactToSheet(
  spreadsheetId: string,
  data: {
    name: string;
    email: string;
    phone?: string;
    studentClass?: string;
    message: string;
  }
) {
  try {
    // Validate Sheet ID format (should be alphanumeric, typically 44 chars)
    if (!spreadsheetId || spreadsheetId.length < 20 || /[^a-zA-Z0-9_-]/.test(spreadsheetId)) {
      throw new Error(`Invalid Google Sheet ID format: "${spreadsheetId}". Sheet ID should be a long alphanumeric string from the Google Sheet URL.`);
    }

    const sheets = await getSheetsClient();
    
    // Initialize sheet if needed
    await initializeSheet(spreadsheetId);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const row = [
      timestamp,
      data.name,
      data.email,
      data.phone || '',
      data.studentClass || '',
      data.message,
      'Contact',
      '', // Resolved
      '', // Section
      '', // Admission Done
      '', // Message by Founder
      '', // Notes
      '', // Payment Ref
      '', // Payment Status
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Contact form data saved to Google Sheet');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error saving contact to Google Sheet:', error);
    
    // Provide helpful error messages
    if (error?.code === 403) {
      if (error?.message?.includes('API has not been used') || error?.message?.includes('disabled')) {
        console.error('💡 SOLUTION: Enable Google Sheets API in Google Cloud Console');
        console.error('   Visit: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview');
      } else if (error?.message?.includes('PERMISSION_DENIED')) {
        console.error('💡 SOLUTION: Share your Google Sheet with the service account email');
        console.error(`   Service Account Email: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
        console.error('   Give it "Editor" access in the Share settings');
      }
    } else if (error?.message?.includes('Invalid Google Sheet ID')) {
      console.error('💡 SOLUTION: Check your GOOGLE_SHEET_ID in .env.local');
      console.error('   Sheet ID should be from the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit');
    }
    
    return { success: false, error: error?.message || error };
  }
}

/**
 * Append a newsletter signup to Google Sheets
 */
export async function appendNewsletterToSheet(
  spreadsheetId: string,
  data: {
    email: string;
  }
) {
  try {
    // Validate Sheet ID format (should be alphanumeric, typically 44 chars)
    if (!spreadsheetId || spreadsheetId.length < 20 || /[^a-zA-Z0-9_-]/.test(spreadsheetId)) {
      throw new Error(`Invalid Google Sheet ID format: "${spreadsheetId}". Sheet ID should be a long alphanumeric string from the Google Sheet URL.`);
    }

    const sheets = await getSheetsClient();
    
    // Initialize sheet if needed
    await initializeSheet(spreadsheetId);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const row = [
      timestamp,
      '', // Name
      data.email,
      '', // Phone
      '', // Student Class
      '', // Message
      'Newsletter',
      '', // Resolved
      '', // Section
      '', // Admission Done
      '', // Message by Founder
      '', // Notes
      '', // Payment Ref
      '', // Payment Status
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Newsletter signup saved to Google Sheet');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error saving newsletter to Google Sheet:', error);
    
    // Provide helpful error messages
    if (error?.code === 403) {
      if (error?.message?.includes('API has not been used') || error?.message?.includes('disabled')) {
        console.error('💡 SOLUTION: Enable Google Sheets API in Google Cloud Console');
        console.error('   Visit: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview');
      } else if (error?.message?.includes('PERMISSION_DENIED')) {
        console.error('💡 SOLUTION: Share your Google Sheet with the service account email');
        console.error(`   Service Account Email: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
        console.error('   Give it "Editor" access in the Share settings');
      }
    } else if (error?.message?.includes('Invalid Google Sheet ID')) {
      console.error('💡 SOLUTION: Check your GOOGLE_SHEET_ID in .env.local');
      console.error('   Sheet ID should be from the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit');
    }
    
    return { success: false, error: error?.message || error };
  }
}

/**
 * Check if an email is already registered (exists in sheet with Type = "Registration").
 * Email comparison is case-insensitive.
 */
export async function registrationEmailExists(
  spreadsheetId: string,
  email: string
): Promise<boolean> {
  try {
    if (!spreadsheetId || !email?.trim()) return false;
    const sheets = await getSheetsClient();
    const normalizedEmail = email.trim().toLowerCase();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:G1000',
    });
    const rows = (response.data.values as string[][] | undefined) || [];
    for (const row of rows) {
      const rowEmail = (row[2] ?? '').trim().toLowerCase();
      const type = (row[6] ?? '').trim();
      if (rowEmail === normalizedEmail && type === 'Registration') {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Append a registration submission to Google Sheets
 */
export async function appendRegistrationToSheet(
  spreadsheetId: string,
  data: {
    name: string;
    email: string;
    phone: string;
    studentClass: string;
    batch: string;
    paymentMerchantOrderId?: string;
    paymentStatus?: string;
  }
) {
  try {
    // Validate Sheet ID format (should be alphanumeric, typically 44 chars)
    if (!spreadsheetId || spreadsheetId.length < 20 || /[^a-zA-Z0-9_-]/.test(spreadsheetId)) {
      throw new Error(`Invalid Google Sheet ID format: "${spreadsheetId}". Sheet ID should be a long alphanumeric string from the Google Sheet URL.`);
    }

    const sheets = await getSheetsClient();
    
    // Initialize sheet if needed
    await initializeSheet(spreadsheetId);

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Map batch IDs to readable names
    const batchNames: { [key: string]: string } = {
      spark: 'SPARK',
      builders: 'BUILDERS',
      innovators: 'INNOVATORS',
    };

    const row = [
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.studentClass,
      '', // Message (empty for registration)
      'Registration',
      '', // Resolved
      batchNames[data.batch] || data.batch, // Section (batch name)
      '', // Admission Done
      '', // Message by Founder
      '', // Notes
      data.paymentMerchantOrderId || '', // Payment Ref (PhonePe merchant order ID)
      data.paymentStatus || '', // Payment Status: Paid | Pay Later | (empty)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Registration data saved to Google Sheet');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error saving registration to Google Sheet:', error);
    
    // Provide helpful error messages
    if (error?.code === 403) {
      if (error?.message?.includes('API has not been used') || error?.message?.includes('disabled')) {
        console.error('💡 SOLUTION: Enable Google Sheets API in Google Cloud Console');
        console.error('   Visit: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview');
      } else if (error?.message?.includes('PERMISSION_DENIED')) {
        console.error('💡 SOLUTION: Share your Google Sheet with the service account email');
        console.error(`   Service Account Email: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
        console.error('   Give it "Editor" access in the Share settings');
      }
    } else if (error?.message?.includes('Invalid Google Sheet ID')) {
      console.error('💡 SOLUTION: Check your GOOGLE_SHEET_ID in .env.local');
      console.error('   Sheet ID should be from the URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit');
    }
    
    return { success: false, error: error?.message || error };
  }
}

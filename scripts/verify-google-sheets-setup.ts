/**
 * Verification script to check Google Sheets setup
 * Run with: npx tsx scripts/verify-google-sheets-setup.ts
 * Or: npm run verify:sheets (if added to package.json)
 */

const requiredEnvVars = [
  'GOOGLE_SHEET_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
  'GOOGLE_PROJECT_ID',
];

console.log('🔍 Verifying Google Sheets Environment Variables...\n');

let allPresent = true;

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (value) {
    // Mask sensitive values
    if (varName === 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY') {
      const masked = value.substring(0, 20) + '...' + value.substring(value.length - 20);
      console.log(`✅ ${varName}: ${masked}`);
    } else {
      console.log(`✅ ${varName}: ${value}`);
    }
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allPresent = false;
  }
});

console.log('\n');

if (allPresent) {
  console.log('✅ All required environment variables are set!');
  console.log('\n📝 Next steps:');
  console.log('1. Make sure you\'ve shared your Google Sheet with the service account email');
  console.log('2. Test by submitting a contact form or newsletter signup');
  console.log('3. Check your Google Sheet to see if data appears');
  console.log('4. Check server logs for any errors');
} else {
  console.log('❌ Some environment variables are missing!');
  console.log('Please check your .env.local file and refer to GOOGLE_SHEETS_SETUP.md');
  process.exit(1);
}

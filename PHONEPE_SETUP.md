# PhonePe Payment Gateway – Setup & Test Integration

This guide walks you through setting up PhonePe for the **test payment page** (`/pay-test`) so you can verify a ₹1 payment before using it in the main registration flow.

---

## Step 1: Register as a PhonePe Merchant (if not already)

1. Go to **PhonePe for Business**: https://www.phonepe.com/business/  
   Or the **developer portal**: https://developer.phonepe.com/
2. Sign up / log in and complete merchant onboarding.
3. For **testing**, you need **Sandbox (UAT)** credentials. PhonePe must give you:
   - **Client ID** (V2)
   - **Client Secret** (V2)
   - **client_version** (often `1` for UAT)

**Important:** Standard Checkout v2 uses **only** Client ID + Client Secret (O-Bearer).  
**Salt keys / Merchant ID (V1)** are not used for the token or pay API in this flow. If you only have Salt keys and no Client ID/Secret, you must request **V2 UAT credentials** from PhonePe (Business Dashboard → Developer Settings, or via the integration team).

---

## Step 2: Add Environment Variables

Create or update `.env.local` in the project root with:

```env
# PhonePe Payment Gateway
PHONEPE_CLIENT_ID=your_client_id_from_phonepe
PHONEPE_CLIENT_SECRET=your_client_secret_from_phonepe
PHONEPE_CLIENT_VERSION=1
# false = Production credentials (Developer Settings → Production Credentials)
# true = Sandbox/UAT credentials only (separate from production)
PHONEPE_SANDBOX=false

# Base URL of your app (required for redirect after payment)
# For local testing use ngrok or similar so PhonePe can redirect back
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- **Production credentials** (Developer Settings → API Keys → Production Credentials): set **`PHONEPE_SANDBOX=false`**. Real payments will be processed.
- **Sandbox/UAT** (only if PhonePe gave you separate test keys): set **`PHONEPE_SANDBOX=true`**.
- **NEXT_PUBLIC_APP_URL**: Set to your **production URL** (e.g. `https://codemasti.in`) in your host’s env. The pay-test page also sends the browser’s origin so redirect uses your deployed domain; set this so server fallback is correct.

---

## Step 3: Run the App and Open the Test Page

```bash
npm run dev
```

Open: **http://localhost:3000/pay-test**

- Click **“Pay ₹1”** to start a test payment.
- You will be redirected to PhonePe’s payment page; complete the payment (use test cards if in sandbox).
- After payment, you’ll be redirected back to `/pay-test/result`, where the app will call PhonePe’s **Check Order Status** API and show success/failure.

---

## Step 4: Testing Locally (Redirect URL)

PhonePe must be able to **redirect the user** to your app. If you’re on `localhost`:

1. Use **ngrok** (or similar) to expose your dev server:
   ```bash
   ngrok http 3000
   ```
2. Set in `.env.local`:
   ```env
   NEXT_PUBLIC_APP_URL=https://your-subdomain.ngrok.io
   ```
3. Restart the dev server and test again from the ngrok URL.

---

## Step 5: Test Amounts (Sandbox)

- **Minimum**: ₹1 (100 paisa).
- Sandbox test limits are typically **₹1–₹1000**.
- The test page is set to **₹1** for verification.

---

## Step 6: After Testing – Use in Real Flow

Once a ₹1 test payment works end-to-end on `/pay-test`:

1. Keep the same env vars; switch to production credentials when going live.
2. Reuse the same APIs in your registration flow:
   - **Create payment**: `POST /api/phonepe/create-payment` (with order ID, amount, redirect URL).
   - **Result page**: Same pattern as `/pay-test/result` (check status and then show success/failure or next step).
3. Optionally add a **webhook** (Server-to-Server callback) for reliable status updates; the test page uses only redirect + Check Order Status.

---

## API Flow (Reference)

1. **Create payment**  
   Your app calls `POST /api/phonepe/create-payment` with `amount` (e.g. 100 for ₹1).  
   Backend gets O-Bearer token, calls PhonePe Create Payment, returns `redirectUrl`.

2. **User pays**  
   User is sent to `redirectUrl` (PhonePe), completes payment.

3. **Redirect back**  
   PhonePe redirects to your `redirectUrl` (e.g. `/pay-test/result?merchantOrderId=...`).

4. **Check status**  
   Your result page calls `GET /api/phonepe/status?merchantOrderId=...`.  
   Backend uses O-Bearer and calls PhonePe Check Order Status, then you show success/failure.

---

## Troubleshooting

### 401 on auth (token) request

If you see: `PhonePe auth failed: 401 {"code":"401","success":false}` — the **token API** is rejecting your credentials.

1. **Check config (no secrets exposed)**  
   Open: `http://localhost:3000/api/phonepe/config-check`  
   Confirm `PHONEPE_CLIENT_ID` and `PHONEPE_CLIENT_SECRET` show as "set" and `isSandbox` matches what you want.

2. **Use V2 credentials**  
   You must use **client_id** and **client_secret** (O-Bearer / V2), not the old Salt/Key (V1). Get them from: **PhonePe Business Dashboard** → **Developer Settings**.

3. **Sandbox vs production**  
   For testing use **Sandbox/UAT** credentials with:
   - `PHONEPE_SANDBOX=true`
   - Client ID and Secret that PhonePe gave you **for UAT/Sandbox** (not production).

4. **No typos or extra characters in .env.local**  
   - No spaces around `=`
   - No quotes unless the value has spaces
   - Variable names exactly: `PHONEPE_CLIENT_ID`, `PHONEPE_CLIENT_SECRET`

   Example:
   ```env
   PHONEPE_CLIENT_ID=your_actual_id
   PHONEPE_CLIENT_SECRET=your_actual_secret
   PHONEPE_SANDBOX=true
   ```

5. **UAT access**  
   If you’re sure the values are correct, UAT may not be enabled for your merchant. Contact PhonePe (or your integration contact) and ask them to:
   - Enable **Sandbox/UAT** for your account
   - Confirm the **Client ID** and **Client Secret** to use for the **Sandbox** token API: `https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token`

6. **Optional: client_version**  
   If PhonePe gave you a specific `client_version`, add to .env.local:
   ```env
   PHONEPE_CLIENT_VERSION=1
   ```

### 400 on PhonePe checkout page (“Sorry, we couldn’t process your request”)

If you reach the PhonePe payment page but then see **400** or “Sorry, we couldn’t process your request” (or QR/UPI errors):

1. **Use an HTTPS redirect URL in production**  
   Production often does **not** accept `http://localhost:...` as the redirect URL. Use a public HTTPS URL:
   - Run **ngrok**: `ngrok http 3000`
   - Set in `.env.local`: `NEXT_PUBLIC_APP_URL=https://your-subdomain.ngrok-free.app`
   - Restart the app and open the **ngrok URL** (e.g. `https://xxx.ngrok-free.app/pay-test`), then try Pay again.  
   The redirect URL we send will then be `https://xxx.ngrok-free.app/pay-test/result?...`, which production can accept.

2. **Whitelist / redirect URL in PhonePe**  
   In **PhonePe Business Dashboard** → **Developer Settings**, check for any **Redirect URL**, **Callback URL**, or **Whitelist** section and add your domain (e.g. your ngrok URL or live domain). If you don’t see such a setting, ask PhonePe support whether production requires whitelisting the redirect URL.

3. **Go-live / merchant activation**  
   Confirm your merchant account is fully activated for **live** payments (business verification, bank details, go-live sign-off). If not, the checkout UI may return 400.

4. **CSP / prefetch-src warning**  
   The browser warning `Unrecognized Content-Security-Policy directive 'prefetch-src'` comes from PhonePe’s page, not your app. You can ignore it.

If the 400 continues after using HTTPS redirect (e.g. ngrok), contact **PhonePe support** with your redirect URL and ask if it must be whitelisted and if the merchant is fully go-live.

### "Something went wrong" / "Sorry, we couldn't process your request" after entering UPI ID

If you reach the PhonePe payment page, enter a UPI ID, and then see this error (or 400/417 in the console):

1. **Use HTTPS redirect URL (not localhost)**  
   Production often rejects or misbehaves when the redirect URL is `http://localhost:...`. Set `NEXT_PUBLIC_APP_URL=https://your-ngrok-url.ngrok-free.app`, restart the app, and test from the **ngrok URL** (not localhost). Start a **new** payment (open `/pay-test` again and click Pay) so a fresh order is created with the correct redirect URL.

2. **Start a fresh payment each time**  
   If a payment fails, do not retry on the same PhonePe page. Go back to your site, open `/pay-test` again, and click "Pay ₹1 (test)" so a new `merchantOrderId` is created. Reusing the same session can lead to 417 (validation/duplicate) on PhonePe’s side.

3. **Merchant / UPI activation**  
   Confirm with PhonePe that your merchant account is **fully go-live** and that **UPI** is enabled for your production credentials. If UPI or live payments are not yet activated, the checkout UI can show this error after UPI entry.

4. **Contact PhonePe support**  
   If you’re already using an HTTPS redirect (e.g. ngrok) and starting fresh payments, ask PhonePe: “Getting ‘Sorry, we couldn’t process your request’ (400/417) on checkout after entering UPI ID. Redirect URL: https://…. Is our merchant fully activated for UPI/live payments, and is this redirect URL allowed?” They can check server logs and confirm.

### Other issues

| Issue | What to check |
|-------|----------------|
| Redirect not working | `NEXT_PUBLIC_APP_URL` must be reachable by the user’s browser (use ngrok for localhost). |
| Status not updating | Use the same `merchantOrderId` that was sent in create payment. |
| Redirect not working | `NEXT_PUBLIC_APP_URL` must be reachable by the user’s browser (use ngrok for localhost). |
| Status not updating | Ensure you’re using the same `merchantOrderId` that was sent in create payment. |
| “Invalid redirect” | Redirect URL in create payment must match the domain allowed in your PhonePe dashboard (if any). |

For more: [PhonePe Developer Docs](https://developer.phonepe.com/).

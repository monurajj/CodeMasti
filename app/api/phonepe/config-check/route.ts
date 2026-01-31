import { NextResponse } from "next/server";

/**
 * GET /api/phonepe/config-check
 * Returns whether PhonePe env vars are set and which environment is used.
 * Does NOT expose secret values.
 */
export async function GET() {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";
  const sandboxRaw = process.env.PHONEPE_SANDBOX;
  const isSandbox = sandboxRaw !== "false";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const authUrl = isSandbox
    ? "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"
    : "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

  return NextResponse.json({
    ok: Boolean(clientId && clientSecret),
    env: {
      PHONEPE_CLIENT_ID: clientId ? `set (${clientId.length} chars)` : "missing",
      PHONEPE_CLIENT_SECRET: clientSecret ? "set" : "missing",
      PHONEPE_CLIENT_VERSION: clientVersion,
      PHONEPE_SANDBOX: sandboxRaw ?? "(not set, defaulting to true)",
      isSandbox,
      NEXT_PUBLIC_APP_URL: baseUrl,
    },
    authUrl,
    hint: !clientId || !clientSecret
      ? "Add PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET to .env.local"
      : "If you get 401, credentials may be wrong or for the wrong environment (sandbox vs production). Get UAT credentials from PhonePe Business Dashboard → Developer Settings.",
  });
}

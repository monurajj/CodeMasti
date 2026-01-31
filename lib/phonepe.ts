/**
 * PhonePe Payment Gateway – helpers for auth, create payment, and check order status.
 * Uses Standard Checkout v2 API (O-Bearer auth).
 */

const SANDBOX = {
  authUrl: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
  payUrl: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
  statusUrl: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order",
};

const PRODUCTION = {
  authUrl: "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
  payUrl: "https://api.phonepe.com/apis/pg/checkout/v2/pay",
  statusUrl: "https://api.phonepe.com/apis/pg/checkout/v2/order",
};

function getConfig() {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";
  const isSandbox = process.env.PHONEPE_SANDBOX !== "false";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing PhonePe credentials: set PHONEPE_CLIENT_ID and PHONEPE_CLIENT_SECRET in .env.local"
    );
  }

  const urls = isSandbox ? SANDBOX : PRODUCTION;
  return { clientId, clientSecret, clientVersion, urls, baseUrl };
}

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get O-Bearer access token (cached until near expiry).
 */
export async function getPhonePeToken(): Promise<string> {
  const { clientId, clientSecret, clientVersion, urls } = getConfig();
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token;
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    client_version: clientVersion,
  });

  const res = await fetch(urls.authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    let detail = text;
    try {
      const json = JSON.parse(text) as { message?: string; description?: string; code?: string };
      if (json.message) detail = json.message;
      else if (json.description) detail = json.description;
    } catch {
      // keep raw text
    }
    throw new Error(`PhonePe auth failed: ${res.status} – ${detail}`);
  }

  const data = (await res.json()) as {
    access_token?: string;
    expires_at?: number;
    expires_in?: number;
  };

  const token = data.access_token;
  if (!token) throw new Error("PhonePe auth: no access_token in response");

  const expiresAt = data.expires_at ?? now + (data.expires_in ?? 3600);
  cachedToken = { token, expiresAt };
  return token;
}

export type CreatePaymentParams = {
  merchantOrderId: string;
  amountInPaisa: number;
  redirectPath: string;
  expireAfterSeconds?: number;
  /** If set, used as base for redirect URL (e.g. https://codemasti.in). Otherwise from env. */
  redirectBaseUrl?: string;
};

export type CreatePaymentResult = {
  redirectUrl: string;
  orderId?: string;
  state?: string;
};

/**
 * Create a payment and return the URL to redirect the user to PhonePe.
 */
export async function createPhonePePayment(
  params: CreatePaymentParams
): Promise<CreatePaymentResult> {
  const { urls, baseUrl } = getConfig();
  const token = await getPhonePeToken();

  const base = (params.redirectBaseUrl || baseUrl).replace(/\/$/, "");
  const path = params.redirectPath.startsWith("/") ? params.redirectPath : `/${params.redirectPath}`;
  const redirectUrl = `${base}${path}`;

  const payload = {
    merchantOrderId: params.merchantOrderId,
    amount: params.amountInPaisa,
    expireAfter: params.expireAfterSeconds ?? 600,
    paymentFlow: {
      type: "PG_CHECKOUT",
      merchantUrls: {
        redirectUrl,
      },
    },
  };

  const res = await fetch(urls.payUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PhonePe create payment failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    redirect_url?: string;
    redirectUrl?: string;
    order_id?: string;
    orderId?: string;
    state?: string;
  };

  const redirect = data.redirect_url ?? data.redirectUrl;
  if (!redirect) throw new Error("PhonePe create payment: no redirect URL in response");

  return {
    redirectUrl: redirect,
    orderId: data.order_id ?? data.orderId,
    state: data.state,
  };
}

export type OrderStatusResult = {
  state: "COMPLETED" | "FAILED" | "PENDING" | string;
  orderId?: string;
  amount?: number;
  payableAmount?: number;
  message?: string;
  paymentDetails?: unknown[];
};

/**
 * Check order status using merchantOrderId.
 */
export async function checkPhonePeOrderStatus(
  merchantOrderId: string
): Promise<OrderStatusResult> {
  const { urls } = getConfig();
  const token = await getPhonePeToken();

  const statusPath = `${urls.statusUrl}/${encodeURIComponent(merchantOrderId)}/status`;
  const res = await fetch(`${statusPath}?details=true&errorContext=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `O-Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PhonePe check status failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    state?: string;
    orderId?: string;
    amount?: number;
    payableAmount?: number;
    message?: string;
    paymentDetails?: unknown[];
  };

  return {
    state: data.state ?? "UNKNOWN",
    orderId: data.orderId,
    amount: data.amount,
    payableAmount: data.payableAmount,
    message: data.message,
    paymentDetails: data.paymentDetails,
  };
}

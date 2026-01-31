import { NextRequest, NextResponse } from "next/server";
import { createPhonePePayment } from "@/lib/phonepe";

/**
 * POST /api/phonepe/create-payment
 * Body: { amountInPaisa?: number, redirectPath?: string }
 * Creates a test payment and returns redirectUrl for PhonePe.
 * Default: 100 paisa (₹1), redirect to /pay-test/result
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const amountInPaisa = Number(body.amountInPaisa) || 100;
    const redirectPath = body.redirectPath ?? "/pay-test/result";

    if (amountInPaisa < 100) {
      return NextResponse.json(
        { error: "Minimum amount is 100 paisa (₹1)" },
        { status: 400 }
      );
    }

    const merchantOrderId = `TEST_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const result = await createPhonePePayment({
      merchantOrderId,
      amountInPaisa,
      redirectPath: redirectPath.includes("?") ? redirectPath : `${redirectPath}?merchantOrderId=${encodeURIComponent(merchantOrderId)}`,
      expireAfterSeconds: 600,
    });

    return NextResponse.json({
      redirectUrl: result.redirectUrl,
      merchantOrderId,
      orderId: result.orderId,
      state: result.state,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create payment failed";
    console.error("[PhonePe create-payment]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

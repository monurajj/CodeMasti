import { NextRequest, NextResponse } from "next/server";
import { checkPhonePeOrderStatus } from "@/lib/phonepe";

/**
 * GET /api/phonepe/status?merchantOrderId=xxx
 * Returns order status from PhonePe (COMPLETED, FAILED, PENDING, etc.).
 */
export async function GET(request: NextRequest) {
  try {
    const merchantOrderId = request.nextUrl.searchParams.get("merchantOrderId");
    if (!merchantOrderId) {
      return NextResponse.json(
        { error: "Missing merchantOrderId" },
        { status: 400 }
      );
    }

    const result = await checkPhonePeOrderStatus(merchantOrderId);

    return NextResponse.json({
      state: result.state,
      orderId: result.orderId,
      amount: result.amount,
      payableAmount: result.payableAmount,
      message: result.message,
      paymentDetails: result.paymentDetails,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Check status failed";
    console.error("[PhonePe status]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

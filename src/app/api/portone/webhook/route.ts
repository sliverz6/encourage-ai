import { NextRequest, NextResponse } from "next/server";
import { verify, WebhookVerificationError } from "@portone/server-sdk/webhook";
import { supabaseAdmin } from "@/lib/supabase-admin";

function userIdFromPaymentId(paymentId: string): string | null {
  // Patterns: "sub-init-{userId}-{timestamp}" or "sub-{userId}-{YYYYMM}"
  const initMatch = paymentId.match(/^sub-init-([0-9a-fA-F-]{36})-\d+$/);
  if (initMatch) return initMatch[1];
  const recurringMatch = paymentId.match(/^sub-([0-9a-fA-F-]{36})-\d{6}$/);
  if (recurringMatch) return recurringMatch[1];
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headers: Record<string, string> = {
    "webhook-id": req.headers.get("webhook-id") ?? "",
    "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
    "webhook-signature": req.headers.get("webhook-signature") ?? "",
  };

  let event;
  try {
    event = await verify(process.env.PORTONE_WEBHOOK_SECRET!, body, headers);
  } catch (e) {
    if (e instanceof WebhookVerificationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type === "Transaction.Paid") {
    const paymentId = event.data.paymentId;
    const userId = userIdFromPaymentId(paymentId);
    if (userId) {
      await supabaseAdmin
        .from("subscriptions")
        .update({ last_payment_id: paymentId, updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .neq("status", "cancelled");
    }
  } else if (event.type === "Transaction.Failed") {
    const paymentId = event.data.paymentId;
    const userId = userIdFromPaymentId(paymentId);
    if (userId) {
      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("user_id", userId)
        .in("status", ["active", "canceling"]);
    }
  }

  return NextResponse.json({ ok: true });
}

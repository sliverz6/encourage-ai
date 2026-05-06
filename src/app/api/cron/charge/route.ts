import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { chargeWithBillingKey, nextBillingDateFrom, todayKstISO } from "@/lib/portone";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = todayKstISO();

  // 1. canceling 상태 + 이번 결제일 도래 → cancelled로 마무리 (자동결제 안 함)
  const { data: canceling } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id")
    .eq("status", "canceling")
    .lte("next_billing_date", today);

  if (canceling && canceling.length > 0) {
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "cancelled", updated_at: new Date().toISOString() })
      .in(
        "user_id",
        canceling.map((r) => r.user_id)
      );
  }

  // 2. active 구독 중 결제일 도래한 행 조회
  const { data: due, error } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id, billing_key, current_period_end")
    .eq("status", "active")
    .lte("next_billing_date", today);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let processed = 0;
  let failed = 0;

  for (const row of due ?? []) {
    const { data: userResp } = await supabaseAdmin.auth.admin.getUserById(row.user_id);
    const email = userResp?.user?.email;
    if (!email) {
      failed++;
      continue;
    }

    const ym = today.slice(0, 7).replace("-", ""); // YYYYMM
    const paymentId = `sub-${row.user_id}-${ym}`;

    try {
      await chargeWithBillingKey({
        paymentId,
        billingKey: row.billing_key,
        userId: row.user_id,
        userEmail: email,
      });

      const newPeriodStart = new Date(row.current_period_end);
      const newPeriodEnd = nextBillingDateFrom(newPeriodStart);

      await supabaseAdmin
        .from("subscriptions")
        .update({
          current_period_start: newPeriodStart.toISOString(),
          current_period_end: newPeriodEnd.toISOString(),
          next_billing_date: newPeriodEnd.toISOString().slice(0, 10),
          last_payment_id: paymentId,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", row.user_id);

      processed++;
    } catch {
      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "past_due", updated_at: new Date().toISOString() })
        .eq("user_id", row.user_id);
      failed++;
    }
  }

  return NextResponse.json({
    processed,
    failed,
    canceled: canceling?.length ?? 0,
  });
}

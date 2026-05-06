import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { chargeWithBillingKey, nextBillingDateFrom } from "@/lib/portone";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("subscriptions")
    .select("status, current_period_end, next_billing_date")
    .eq("user_id", user.id)
    .maybeSingle();

  return NextResponse.json(data ?? { status: null });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const billingKey: string | undefined = body?.billingKey;
  if (!billingKey) {
    return NextResponse.json({ error: "billingKey is required" }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing && (existing.status === "active" || existing.status === "canceling")) {
    return NextResponse.json({ error: "이미 구독 중이에요." }, { status: 400 });
  }

  const paymentId = `sub-init-${user.id}-${Date.now()}`;

  try {
    await chargeWithBillingKey({
      paymentId,
      billingKey,
      userId: user.id,
      userEmail: user.email,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "결제에 실패했어요. 카드를 확인하고 다시 시도해주세요.", detail: String(e) },
      { status: 400 }
    );
  }

  const now = new Date();
  const periodEnd = nextBillingDateFrom(now);

  const { error: upsertError } = await supabaseAdmin
    .from("subscriptions")
    .upsert(
      {
        user_id: user.id,
        billing_key: billingKey,
        status: "active",
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
        next_billing_date: periodEnd.toISOString().slice(0, 10),
        last_payment_id: paymentId,
        updated_at: now.toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (upsertError) {
    return NextResponse.json(
      { error: "구독 정보 저장에 실패했어요.", detail: upsertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    current_period_end: periodEnd.toISOString(),
    next_billing_date: periodEnd.toISOString().slice(0, 10),
  });
}

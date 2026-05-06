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
  if (!process.env.PORTONE_API_SECRET) {
    return NextResponse.json(
      { error: "서버 설정 오류 (PORTONE_API_SECRET 누락)" },
      { status: 500 }
    );
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "서버 설정 오류 (SUPABASE_SERVICE_ROLE_KEY 누락)" },
      { status: 500 }
    );
  }

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

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    console.error("[/api/subscribe] read existing error", existingError);
    return NextResponse.json(
      { error: "구독 상태 조회 실패", detail: existingError.message },
      { status: 500 }
    );
  }

  if (existing && (existing.status === "active" || existing.status === "canceling")) {
    return NextResponse.json({ error: "이미 구독 중이에요." }, { status: 400 });
  }

  const paymentId = `sub-init-${user.id}-${Date.now()}`;

  try {
    const result = await chargeWithBillingKey({
      paymentId,
      billingKey,
      userId: user.id,
      userEmail: user.email,
    });
    console.log("[/api/subscribe] charge ok", paymentId, result);
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    console.error("[/api/subscribe] charge failed", paymentId, detail);
    return NextResponse.json(
      { error: "결제에 실패했어요. 카드를 확인하고 다시 시도해주세요.", detail },
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
    console.error("[/api/subscribe] upsert failed", upsertError);
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

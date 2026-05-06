import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "canceling", updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("status", "active")
    .select("current_period_end")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "활성 구독을 찾을 수 없어요." }, { status: 404 });

  return NextResponse.json({ ok: true, current_period_end: data.current_period_end });
}

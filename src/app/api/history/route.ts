import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("encouragement_history")
    .select("id, situation, message, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    (data ?? []).map((row) => ({
      id: row.id,
      situation: row.situation,
      message: row.message,
      createdAt: row.created_at,
    }))
  );
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.situation || !body?.message) {
    return NextResponse.json({ error: "situation and message are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("encouragement_history")
    .insert({ user_id: user.id, situation: body.situation, message: body.message })
    .select("id, situation, message, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    { id: data.id, situation: data.situation, message: data.message, createdAt: data.created_at },
    { status: 201 }
  );
}

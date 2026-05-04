import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT =
  "당신은 따뜻하고 진심 어린 격려를 해주는 친구입니다. 사용자의 상황을 듣고 2~3문장의 짧고 진심 어린 한국어 격려 메시지를 작성해주세요. 위로와 응원이 담긴 따뜻한 말투를 사용하고, 문장 끝에 어울리는 이모지를 하나 붙여주세요. 메시지 외의 다른 말은 하지 마세요.";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.situation?.trim()) {
    return NextResponse.json({ error: "situation is required" }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: body.situation }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ message: text });
  } catch {
    return NextResponse.json({ error: "Failed to generate message" }, { status: 500 });
  }
}

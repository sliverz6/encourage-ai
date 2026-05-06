"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { addEntry, updateEntry } from "@/lib/history";

export default function EncouragementApp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const editId = searchParams.get("editId");
  const initialMessage = searchParams.get("message");

  const [situation, setSituation] = useState(searchParams.get("situation") ?? "");
  const [card, setCard] = useState<{ id: number; message: string } | null>(
    editId && initialMessage ? { id: Number(editId), message: initialMessage } : null
  );
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  async function handleGenerate() {
    if (!situation.trim() || loading) return;

    setLoading(true);
    setCard(null);

    const res = await fetch("/api/encourage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ situation }),
    });

    if (res.status === 429) {
      setLimitReached(true);
      setLoading(false);
      return;
    }

    const { message } = await res.json();

    if (editId) {
      await updateEntry(Number(editId), situation, message);
      router.replace("/");
    } else {
      await addEntry(situation, message);
    }

    setCard({ id: editId ? Number(editId) : Date.now(), message });
    setLoading(false);
  }

  if (limitReached) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm w-full text-center animate-fade-in">
          <p className="text-lg font-medium text-stone-700 leading-relaxed">
            오늘의 격려를 모두 받으셨어요
          </p>
          <p className="text-base text-stone-500 mt-2">내일 다시 만나요 🌙</p>
          <div className="border-t border-stone-100 my-6" />
          <p className="text-sm text-stone-500 mb-4">무제한으로 받고 싶다면</p>
          <Link
            href="/subscribe"
            className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 hover:scale-105 active:scale-95 text-white text-sm font-semibold rounded-2xl shadow-lg transition-all duration-150"
          >
            구독 시작하기 — 월 1,900원
          </Link>
        </div>
      </div>
    );
  }

  const showCard = loading || !!card;

  return (
    <div className="flex flex-col items-center w-full">
      <textarea
        value={situation}
        onChange={(e) => setSituation(e.target.value)}
        placeholder="지금 어떤 상황인지 알려주세요.&#10;예) 오늘 발표를 망쳤어요, 취업 준비가 너무 힘들어요..."
        rows={4}
        className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-base text-stone-700 placeholder-stone-400 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 mb-6"
      />

      <div
        className={`grid w-full transition-[grid-template-rows] duration-300 ease-out ${showCard ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-amber-500">
                <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-sm">격려 메시지를 생성하고 있어요...</span>
              </div>
            ) : card ? (
              <div
                key={card.id}
                className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm text-stone-700 animate-fade-in w-full"
              >
                <p className="text-lg font-medium leading-relaxed">{card.message}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !situation.trim()}
        className="px-8 py-4 bg-amber-600 hover:bg-amber-700 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-2xl shadow-lg transition-all duration-150 cursor-pointer"
      >
        격려 받기 💌
      </button>
    </div>
  );
}

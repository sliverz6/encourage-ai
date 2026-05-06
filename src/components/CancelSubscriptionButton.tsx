"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CancelSubscriptionButton({ periodEnd }: { periodEnd: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const periodEndDate = new Date(periodEnd).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleCancel() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/subscribe/cancel", { method: "POST" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "해지에 실패했어요.");
      setLoading(false);
      return;
    }
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-stone-500 hover:text-red-500 transition-colors cursor-pointer"
      >
        구독 해지
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 px-6">
          <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-stone-800 mb-2">정말 해지하시겠어요?</h3>
            <p className="text-sm text-stone-500 mb-5 leading-relaxed">
              {periodEndDate}까지는 무제한으로 이용하실 수 있어요. 이후부터는 자동 결제되지 않습니다.
            </p>
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                계속 이용하기
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                {loading ? "처리 중..." : "해지"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

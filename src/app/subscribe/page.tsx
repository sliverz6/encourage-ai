"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/subscribe", { method: "GET" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.status === "active" || d?.status === "canceling") {
          router.replace("/profile");
        }
      })
      .catch(() => {});
  }, [router]);

  async function handleSubscribe() {
    if (loading) return;
    setLoading(true);
    setError(null);
    setStage("결제창 여는 중...");

    try {
      const PortOne = await import("@portone/browser-sdk/v2");

      const issueResponse = await PortOne.requestIssueBillingKey({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        billingKeyMethod: "CARD",
        issueId: `bk-${crypto.randomUUID()}`,
        issueName: "Encourage AI 월간 구독",
      });

      console.log("[subscribe] issueResponse", issueResponse);

      if (!issueResponse) {
        setError("결제창에서 응답을 받지 못했어요. 다시 시도해주세요.");
        setLoading(false);
        setStage("");
        return;
      }

      if (issueResponse.code !== undefined) {
        setError(`${issueResponse.message ?? "빌링키 발급에 실패했어요."} (${issueResponse.code})`);
        setLoading(false);
        setStage("");
        return;
      }

      if (!issueResponse.billingKey) {
        setError("빌링키가 발급되지 않았어요. 카드 정보를 다시 확인해주세요.");
        setLoading(false);
        setStage("");
        return;
      }

      setStage("결제 처리 중...");

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      let saveRes: Response;
      try {
        saveRes = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ billingKey: issueResponse.billingKey }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      console.log("[subscribe] /api/subscribe status", saveRes.status);

      const data = await saveRes.json().catch(() => ({}));
      console.log("[subscribe] /api/subscribe body", data);

      if (!saveRes.ok) {
        setError(
          data?.error
            ? `${data.error}${data?.detail ? ` (${data.detail})` : ""}`
            : `결제에 실패했어요 (HTTP ${saveRes.status})`
        );
        setLoading(false);
        setStage("");
        return;
      }

      setStage("완료! 이동 중...");
      window.location.assign("/?subscribed=1");
    } catch (e) {
      console.error("[subscribe] error", e);
      const msg =
        e instanceof DOMException && e.name === "AbortError"
          ? "결제 요청이 시간 초과됐어요. 다시 시도해주세요."
          : e instanceof Error
            ? e.message
            : String(e);
      setError(msg);
      setLoading(false);
      setStage("");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 px-6 py-12">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-10 inline-block"
          >
            ← 홈으로
          </Link>

          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2">
              Pro 구독
            </p>
            <h1 className="text-3xl font-bold text-stone-800">무제한 격려 받기</h1>
            <p className="text-stone-500 text-sm mt-2">
              매일 횟수 제한 없이 따뜻한 격려를 만나보세요
            </p>
          </div>

          <div className="bg-amber-600 rounded-2xl p-7 shadow-sm mb-5">
            <p className="text-xs font-semibold text-amber-200 uppercase tracking-widest mb-3">
              월간 구독
            </p>
            <p className="text-4xl font-bold text-white leading-tight">
              &#8361;1,900
              <span className="text-base font-normal text-amber-200">&thinsp;/ 월</span>
            </p>
            <ul className="space-y-2 text-sm text-amber-50 mt-5">
              <li>&#10003;&ensp;무제한 AI 격려 메시지</li>
              <li>&#10003;&ensp;히스토리 영구 보관</li>
              <li>&#10003;&ensp;언제든지 해지 가능</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-600 text-center break-words">{error}</p>
            </div>
          )}

          {loading && stage && !error && (
            <p className="text-sm text-stone-500 text-center mb-4">{stage}</p>
          )}

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-base font-semibold rounded-2xl shadow-lg transition-all duration-150 cursor-pointer"
          >
            {loading ? "결제 진행 중..." : "구독 시작하기"}
          </button>

          <p className="text-center text-xs text-stone-400 mt-5">
            구독은 매월 자동 결제되며, 언제든 해지할 수 있어요.
            <br />
            <Link href="/refund" className="hover:text-stone-600 transition-colors">
              환불정책
            </Link>
            &ensp;·&ensp;
            <Link href="/terms" className="hover:text-stone-600 transition-colors">
              이용약관
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

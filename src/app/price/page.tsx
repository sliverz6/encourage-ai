import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "요금제 — Encourage AI" };

export default function PricePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-10 inline-block">
            ← 홈으로
          </Link>

          <div className="mb-8 text-center">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2">Pricing</p>
            <h1 className="text-3xl font-bold text-stone-800">요금제</h1>
            <p className="text-stone-500 text-sm mt-2">필요한 만큼, 부담 없이</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* 무료 */}
            <div className="bg-white/80 rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">무료</p>
              <p className="text-3xl font-bold text-stone-800 leading-tight">&#8361;0</p>
              <p className="text-xs text-stone-400 mt-1 mb-5">1일 1회</p>
              <ul className="space-y-2 text-sm text-stone-600 flex-1">
                <li>&#10003;&ensp;AI 격려 메시지</li>
                <li>&#10003;&ensp;히스토리 보관</li>
                <li className="text-stone-400">&#8212;&ensp;하루 1회 제한</li>
              </ul>
              <Link
                href="/login"
                className="mt-6 block text-center py-2.5 rounded-xl border border-stone-300 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                무료로 시작하기
              </Link>
            </div>

            {/* 구독 */}
            <div className="bg-amber-600 rounded-2xl p-6 shadow-sm flex flex-col">
              <p className="text-xs font-semibold text-amber-200 uppercase tracking-widest mb-3">구독</p>
              <p className="text-3xl font-bold text-white leading-tight">
                &#8361;1,900<span className="text-sm font-normal text-amber-200">&thinsp;/ 월</span>
              </p>
              <p className="text-xs text-amber-200 mt-1 mb-5">무제한</p>
              <ul className="space-y-2 text-sm text-amber-50 flex-1">
                <li>&#10003;&ensp;AI 격려 메시지</li>
                <li>&#10003;&ensp;히스토리 보관</li>
                <li>&#10003;&ensp;무제한 이용</li>
              </ul>
              <Link
                href="/login"
                className="mt-6 block text-center py-2.5 rounded-xl bg-white text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
              >
                구독 시작하기
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-stone-400">
            구독은 언제든지 해지할 수 있습니다.&ensp;&#183;&ensp;
            <Link href="/refund" className="hover:text-stone-600 transition-colors">환불정책</Link>
            &ensp;&#183;&ensp;
            <Link href="/terms" className="hover:text-stone-600 transition-colors">이용약관</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

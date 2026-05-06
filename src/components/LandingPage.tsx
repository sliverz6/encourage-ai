import Link from "next/link";
import TypingDemo from "@/components/TypingDemo";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-5xl flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

        {/* 왼쪽: 타이핑 데모 */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <p className="text-xs text-stone-400 font-medium tracking-widest uppercase mb-4">
            실시간 AI 답변 예시
          </p>
          <TypingDemo />
        </div>

        {/* 오른쪽: 히어로 */}
        <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-up">
          <p className="text-amber-600 text-base font-semibold tracking-widest uppercase mb-3">
            AI 격려 메시지
          </p>
          <h1 className="text-6xl lg:text-7xl font-bold text-stone-800 tracking-tight leading-tight mb-6">
            Encourage AI
          </h1>
          <p className="text-stone-500 text-xl leading-relaxed mb-10">
            힘든 순간, 지금 상황을 적으면<br />
            AI가 당신만을 위한 따뜻한<br />
            격려 메시지를 건네드려요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href="/login"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 hover:scale-105 active:scale-95 text-white text-base font-semibold rounded-2xl shadow-lg transition-all duration-150"
            >
              무료로 시작하기
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-700 text-base font-semibold rounded-2xl shadow-sm border border-stone-200 transition-all duration-150"
            >
              로그인
            </Link>
          </div>
        </div>

      </div>
      </div>

      {/* 요금제 섹션 */}
      <div className="px-8 pb-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">요금제</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 무료 */}
            <div className="bg-white/70 rounded-2xl p-5 border border-stone-200">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">무료</p>
              <p className="text-2xl font-bold text-stone-800 leading-tight">&#8361;0</p>
              <p className="text-xs text-stone-400 mt-0.5 mb-3">1일 1회</p>
              <ul className="space-y-1.5 text-sm text-stone-600">
                <li>&#10003;&ensp;AI 격려 메시지</li>
                <li>&#10003;&ensp;히스토리 보관</li>
                <li className="text-stone-400">&#8212;&ensp;하루 1회 제한</li>
              </ul>
            </div>
            {/* 구독 */}
            <div className="bg-amber-600 rounded-2xl p-5">
              <p className="text-xs font-semibold text-amber-200 uppercase tracking-widest mb-2">구독</p>
              <p className="text-2xl font-bold text-white leading-tight">&#8361;1,900<span className="text-sm font-normal text-amber-200">&thinsp;/ 월</span></p>
              <p className="text-xs text-amber-200 mt-0.5 mb-3">무제한</p>
              <ul className="space-y-1.5 text-sm text-amber-50">
                <li>&#10003;&ensp;AI 격려 메시지</li>
                <li>&#10003;&ensp;히스토리 보관</li>
                <li>&#10003;&ensp;무제한 이용</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

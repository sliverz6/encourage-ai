import Link from "next/link";
import TypingDemo from "@/components/TypingDemo";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
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

      <Footer />
    </div>
  );
}

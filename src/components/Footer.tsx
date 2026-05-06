import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-8 px-6">
      <div className="max-w-5xl mx-auto space-y-2 text-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-stone-400">
          <span>상호: 베이직스토어</span>
          <span className="hidden sm:inline">|</span>
          <span>대표자: 이승재</span>
          <span className="hidden sm:inline">|</span>
          <span>사업자번호: 414-05-53870</span>
        </div>
        <p className="text-xs text-stone-400">
          주소: 인천광역시 부평구 경원대로1347번길 30(부평동)
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-stone-400">
          <span>유선번호: 010-9947-5338</span>
          <span className="hidden sm:inline">|</span>
          <span>통신판매업 신고번호: 제 2025-인천부평-1584 호</span>
        </div>
        <div className="flex justify-center gap-5 pt-3">
          <Link href="/price" className="text-xs text-stone-500 hover:text-amber-700 transition-colors">
            요금제
          </Link>
          <Link href="/terms" className="text-xs text-stone-500 hover:text-amber-700 transition-colors">
            이용약관
          </Link>
          <Link href="/privacy" className="text-xs text-stone-500 hover:text-amber-700 transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/refund" className="text-xs text-stone-500 hover:text-amber-700 transition-colors">
            환불정책
          </Link>
        </div>
        <p className="text-xs text-stone-400 pt-1">© 2025 베이직스토어</p>
      </div>
    </footer>
  );
}

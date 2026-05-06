import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "이용약관 — Encourage AI" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-8 inline-block">
          ← 홈으로
        </Link>

        <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-stone-100 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">이용약관</h1>
            <p className="text-sm text-stone-400">최종 수정일: 2025년 6월 1일</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제1조 (목적)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              본 약관은 베이직스토어(이하 &ldquo;회사&rdquo;)가 운영하는 Encourage AI 서비스(이하 &ldquo;서비스&rdquo;)의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제2조 (서비스 내용)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              서비스는 인공지능 기반 한국어 격려 메시지 생성 서비스입니다. 다음의 구독 플랜을 제공합니다.
            </p>
            <div className="bg-stone-50 rounded-xl p-4 space-y-2 text-sm text-stone-600">
              <div><span className="font-medium">무료 플랜</span> — 월 10회 격려 메시지 생성, 히스토리 보관</div>
              <div><span className="font-medium">Pro 플랜</span> — 월 1,900원, 무제한 격려 메시지 생성, 히스토리 보관</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제3조 (구독 및 결제)</h2>
            <ul className="text-sm text-stone-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>Pro 플랜 구독료는 월 1,900원(부가세 포함)이며, 결제일 기준 매월 자동 갱신됩니다.</li>
              <li>결제 수단은 신용카드, 체크카드 등 회사가 지정한 방법으로 합니다.</li>
              <li>구독 기간 중 플랜 변경 시, 변경 사항은 다음 결제 주기부터 적용됩니다.</li>
              <li>무료 플랜의 월 이용 횟수는 매월 1일 자정에 초기화됩니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제4조 (해지 및 환불)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              구독 해지 및 환불은 <Link href="/refund" className="text-amber-700 hover:underline">환불정책</Link>에 따릅니다. 이용자는 언제든지 구독을 해지할 수 있으며, 해지 시 현재 구독 기간 만료일까지 서비스를 이용할 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제5조 (이용자 의무)</h2>
            <ul className="text-sm text-stone-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>이용자는 서비스를 불법적인 목적이나 타인에게 해를 끼치는 방식으로 사용해서는 안 됩니다.</li>
              <li>타인의 계정을 무단으로 사용하거나 서비스를 자동화된 방식으로 과도하게 이용하는 행위를 금지합니다.</li>
              <li>이용자는 정확한 결제 정보를 제공하고 결제 의무를 이행해야 합니다.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제6조 (서비스 변경 및 중단)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              회사는 서비스 내용을 변경하거나 중단할 수 있으며, 중요한 변경 사항은 서비스 내 공지 또는 이메일로 사전 안내합니다. 서비스 중단 시 남은 구독 기간에 대한 환불은 환불정책에 따릅니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제7조 (준거법 및 관할)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              본 약관은 대한민국 법률에 따르며, 서비스 이용과 관련한 분쟁은 회사의 주소지를 관할하는 법원을 1심 전속 관할 법원으로 합니다.
            </p>
          </section>

          <p className="text-xs text-stone-400 pt-2">
            문의: 010-9947-5338 / 베이직스토어 대표 이승재
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

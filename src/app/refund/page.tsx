import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "환불정책 — Encourage AI" };

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-8 inline-block">
          ← 홈으로
        </Link>

        <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-stone-100 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">환불정책</h1>
            <p className="text-sm text-stone-400">최종 수정일: 2025년 6월 1일</p>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            베이직스토어(이하 &ldquo;회사&rdquo;)는 Encourage AI Pro 플랜 구독 서비스에 대해 다음과 같은 환불정책을 운영합니다.
          </p>

          <section className="space-y-4">
            <h2 className="text-base font-semibold text-stone-700">환불 가능 기간</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
              <p className="text-sm font-semibold text-amber-800">결제일로부터 7일 이내 — 전액 환불</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                구독 결제 후 7일 이내에 환불을 요청하시면 결제 금액 전액을 환불해 드립니다. 단, 환불 요청 시점까지 서비스를 이용한 경우에도 동일하게 적용됩니다.
              </p>
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-2">
              <p className="text-sm font-semibold text-stone-700">결제일로부터 7일 초과 — 환불 불가</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                결제 후 7일이 경과한 경우 환불이 불가합니다. 구독을 해지하시면 현재 구독 기간 만료일까지 서비스를 계속 이용하실 수 있습니다.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">환불 신청 방법</h2>
            <ol className="text-sm text-stone-600 leading-relaxed space-y-2 list-decimal list-inside">
              <li>아래 연락처로 환불 요청 (가입 이메일, 결제일자, 환불 사유 포함)</li>
              <li>회사가 환불 요청 확인 및 처리</li>
              <li>결제 취소 완료 시 이메일 안내</li>
            </ol>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 space-y-1">
              <p><span className="font-medium">전화:</span> 010-9947-5338</p>
              <p><span className="font-medium">운영시간:</span> 평일 10:00 ~ 18:00</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">환불 처리 기간</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              환불 요청 확인 후 영업일 기준 3~5일 이내에 결제 취소가 처리됩니다. 카드사별 영업일정에 따라 실제 취소 반영까지 추가 시간이 소요될 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">기타 사항</h2>
            <ul className="text-sm text-stone-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>구독 자동 갱신 후 7일 이내라면 갱신 결제분에 대해서도 동일하게 환불이 가능합니다.</li>
              <li>회사의 귀책사유로 서비스가 중단된 경우, 남은 구독 기간에 해당하는 금액을 환불합니다.</li>
              <li>본 정책은 관련 법령의 변경에 따라 수정될 수 있으며, 변경 시 서비스 내 공지를 통해 안내합니다.</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "개인정보처리방침 — Encourage AI" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors mb-8 inline-block">
          ← 홈으로
        </Link>

        <div className="bg-white/80 rounded-3xl p-8 shadow-sm border border-stone-100 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">개인정보처리방침</h1>
            <p className="text-sm text-stone-400">최종 수정일: 2025년 6월 1일</p>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            베이직스토어(이하 &ldquo;회사&rdquo;)는 개인정보 보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제1조 (수집하는 개인정보 항목)</h2>
            <div className="bg-stone-50 rounded-xl p-4 space-y-3 text-sm text-stone-600">
              <div>
                <p className="font-medium mb-1">회원가입 시</p>
                <p>이메일 주소</p>
              </div>
              <div>
                <p className="font-medium mb-1">유료 구독 결제 시</p>
                <p>결제정보(카드번호 마지막 4자리, 카드사명, 빌링키), 결제일시, 결제금액</p>
              </div>
              <div>
                <p className="font-medium mb-1">서비스 이용 시 자동 수집</p>
                <p>서비스 이용 기록(격려 메시지 요청 내용 및 응답), 접속 일시</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제2조 (개인정보의 수집 및 이용 목적)</h2>
            <ul className="text-sm text-stone-600 leading-relaxed space-y-2 list-disc list-inside">
              <li>회원 식별 및 계정 관리</li>
              <li>구독 서비스 제공 및 결제 처리</li>
              <li>서비스 이용 기록 보관(히스토리 기능)</li>
              <li>고객 문의 응대 및 분쟁 처리</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제3조 (개인정보의 보유 및 이용기간)</h2>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 space-y-2">
              <div className="flex gap-3">
                <span className="font-medium whitespace-nowrap">회원 정보</span>
                <span>회원탈퇴 후 즉시 삭제 (단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 보관)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium whitespace-nowrap">결제 정보</span>
                <span>회원탈퇴 후 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium whitespace-nowrap">이용 기록</span>
                <span>회원탈퇴 후 즉시 삭제</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제4조 (개인정보의 제3자 제공)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 단, 결제 처리를 위해 결제대행사(PortOne)에 결제 관련 정보를 제공하며, 이는 결제 처리 목적에 한하여 사용됩니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제5조 (개인정보 처리 위탁)</h2>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 space-y-2">
              <div className="flex gap-3">
                <span className="font-medium">Supabase Inc.</span>
                <span>회원 인증 및 데이터 저장·관리</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium">PortOne</span>
                <span>결제 처리 및 빌링키 관리</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제6조 (정보주체의 권리)</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다. 계정 삭제는 프로필 페이지에서 직접 처리하거나, 아래 연락처로 요청하실 수 있습니다.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-stone-700">제7조 (개인정보 보호책임자)</h2>
            <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-600 space-y-1">
              <p>성명: 이승재</p>
              <p>연락처: 010-9947-5338</p>
              <p>소속: 베이직스토어 대표</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

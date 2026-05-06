import Link from "next/link";
import { redirect } from "next/navigation";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import CancelSubscriptionButton from "@/components/CancelSubscriptionButton";
import { createClient } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ count }, { data: sub }] = await Promise.all([
    supabase
      .from("encouragement_history")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("subscriptions")
      .select("status, current_period_end, next_billing_date")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const status = sub?.status ?? null;
  const periodEnd = sub?.current_period_end as string | undefined;
  const nextBillingDate = sub?.next_billing_date as string | undefined;

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  return (
    <main className="flex-1 flex flex-col items-center p-8">
      <div className="w-full max-w-lg animate-fade-up">
        <h1 className="text-2xl font-bold text-stone-800 mb-8 tracking-tight">프로필</h1>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-4">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">계정 정보</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-400 mb-1">이메일</p>
              <p className="text-base text-stone-800 font-medium">{user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-stone-400 mb-1">생성한 격려 메시지</p>
              <p className="text-2xl font-bold text-amber-600">{count ?? 0}<span className="text-sm font-normal text-stone-400 ml-1">개</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-4">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">현재 플랜</h2>

          {status === "active" && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-stone-800 font-semibold">Pro · 무제한</p>
                <p className="text-xs text-stone-400 mt-1">
                  다음 결제일 {formatDate(nextBillingDate)} · 월 1,900원
                </p>
              </div>
              {periodEnd && <CancelSubscriptionButton periodEnd={periodEnd} />}
            </div>
          )}

          {status === "canceling" && (
            <div>
              <p className="text-base text-stone-800 font-semibold">Pro · 해지 예약됨</p>
              <p className="text-xs text-stone-400 mt-1">
                {formatDate(periodEnd)}까지 이용 가능 · 이후 자동 결제되지 않아요
              </p>
              <Link
                href="/subscribe"
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors mt-3 inline-block"
              >
                다시 구독하기
              </Link>
            </div>
          )}

          {status === "past_due" && (
            <div>
              <p className="text-base text-red-600 font-semibold">결제 실패</p>
              <p className="text-xs text-stone-400 mt-1">
                카드 정보를 갱신하고 다시 구독을 시작해주세요.
              </p>
              <Link
                href="/subscribe"
                className="text-sm text-amber-600 hover:text-amber-700 transition-colors mt-3 inline-block"
              >
                다시 구독하기
              </Link>
            </div>
          )}

          {(status === null || status === "cancelled") && (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base text-stone-800 font-semibold">Free</p>
                <p className="text-xs text-stone-400 mt-1">하루 1회 격려받기</p>
              </div>
              <Link
                href="/subscribe"
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-sm font-semibold text-white transition-colors"
              >
                Pro로 업그레이드
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-4">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-4">비밀번호 변경</h2>
          <PasswordChangeForm />
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-1">계정 삭제</h2>
          <p className="text-xs text-stone-400 mb-4">계정을 삭제하면 모든 이력이 함께 삭제되며 복구할 수 없어요.</p>
          <DeleteAccountButton />
        </div>
      </div>
    </main>
  );
}

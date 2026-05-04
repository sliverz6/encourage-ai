import { redirect } from "next/navigation";
import Header from "@/components/Header";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import { createClient } from "@/lib/supabase-server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { count } = await supabase
    .from("encouragement_history")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <Header />
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
    </div>
  );
}

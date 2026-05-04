import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import ProfileDropdown from "@/components/ProfileDropdown";

export default async function Header() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b border-stone-200 shadow-sm relative z-10">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-stone-800 tracking-tight">
          Encourage AI
        </Link>
        {user && (
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
            >
              격려받기
            </Link>
            <Link
              href="/history"
              className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              히스토리
            </Link>
            <ProfileDropdown email={user.email!} />
          </nav>
        )}
      </div>
    </header>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function ProfileDropdown({ email }: { email: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full border-2 border-stone-300 hover:border-stone-400 text-stone-600 text-sm font-bold flex items-center justify-center transition-colors cursor-pointer"
        aria-label="프로필 메뉴"
      >
        {email[0].toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-lg border border-stone-100 py-2 z-50 animate-scale-in">
          <div className="px-4 py-3 border-b border-stone-100">
            <p className="text-xs text-stone-400 mb-0.5">로그인 계정</p>
            <p className="text-sm text-stone-700 font-medium truncate">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
            >
              프로필
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

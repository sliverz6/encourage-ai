"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function PasswordChangeForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않아요.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  }

  const passwordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="password"
        placeholder="새 비밀번호 (6자 이상)"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        minLength={6}
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
      />
      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 transition-colors ${
            passwordMismatch
              ? "border-red-300 focus:ring-red-200"
              : "border-stone-200 focus:ring-amber-300"
          }`}
        />
        {passwordMismatch && (
          <p className="text-xs text-red-500 pl-1">비밀번호가 일치하지 않아요.</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-amber-600">비밀번호가 변경됐어요.</p>}

      <button
        type="submit"
        disabled={loading || passwordMismatch}
        className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors cursor-pointer"
      >
        {loading ? "변경 중..." : "비밀번호 변경"}
      </button>
    </form>
  );
}

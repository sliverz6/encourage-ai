"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type HistoryEntry, getHistory, deleteEntry } from "@/lib/history";

export default function HistoryList() {
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  async function handleDeleteConfirm() {
    if (deleteTargetId === null) return;
    await deleteEntry(deleteTargetId);
    setEntries((prev) => prev.filter((e) => e.id !== deleteTargetId));
    setDeleteTargetId(null);
  }

  function handleEdit(entry: HistoryEntry) {
    const params = new URLSearchParams({
      situation: entry.situation,
      message: entry.message,
      editId: String(entry.id),
    });
    router.push(`/?${params.toString()}`);
  }

  if (loading) return null;

  if (entries.length === 0) {
    return (
      <p className="text-stone-400 text-center mt-16">아직 생성된 이력이 없어요.</p>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-4 w-full">
        {entries.map((entry, index) => (
          <li
            key={entry.id}
            className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm animate-fade-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-stone-400">
                {new Date(entry.createdAt).toLocaleString("ko-KR")}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-1.5 text-stone-400 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50 cursor-pointer"
                  aria-label="수정"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteTargetId(entry.id)}
                  className="p-1.5 text-stone-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
                  aria-label="삭제"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="text-sm text-stone-400 mb-3 line-clamp-2">{entry.situation}</p>
            <p className="text-base font-medium text-stone-700 leading-relaxed">{entry.message}</p>
          </li>
        ))}
      </ul>

      {deleteTargetId !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-7 w-80 flex flex-col gap-5 animate-scale-in">
            <div>
              <p className="text-base font-semibold text-stone-800 mb-1">이력을 삭제할까요?</p>
              <p className="text-sm text-stone-400">삭제한 이력은 복구할 수 없어요.</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

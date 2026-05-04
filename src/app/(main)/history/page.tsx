import HistoryList from "@/components/HistoryList";

export default function HistoryPage() {
  return (
    <main className="flex-1 flex flex-col items-center p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold text-stone-800 mb-8 tracking-tight">
          생성 이력
        </h1>
        <HistoryList />
      </div>
    </main>
  );
}

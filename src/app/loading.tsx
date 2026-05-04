export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-stone-800 tracking-tight">Encourage AI</span>
          <div className="flex items-center gap-3">
            <div className="h-9 w-20 bg-stone-200 rounded-xl animate-pulse" />
            <div className="h-5 w-16 bg-stone-200 rounded animate-pulse" />
            <div className="h-9 w-9 bg-stone-200 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="h-10 w-64 bg-stone-200 rounded-xl animate-pulse mb-3" />
        <div className="h-5 w-80 bg-stone-200 rounded animate-pulse mb-10" />
        <div className="w-full max-w-lg flex flex-col items-center gap-6">
          <div className="w-full h-28 bg-stone-200 rounded-2xl animate-pulse" />
          <div className="h-14 w-36 bg-stone-200 rounded-2xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}

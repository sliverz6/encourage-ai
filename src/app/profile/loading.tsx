export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-7 w-28 bg-stone-200 rounded-lg animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-9 w-20 bg-stone-200 rounded-xl animate-pulse" />
            <div className="h-5 w-16 bg-stone-200 rounded animate-pulse" />
            <div className="h-9 w-9 bg-stone-200 rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center p-8">
        <div className="w-full max-w-lg">
          <div className="h-8 w-20 bg-stone-200 rounded-lg animate-pulse mb-8" />

          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-4 animate-pulse">
            <div className="h-3 w-16 bg-stone-200 rounded mb-4" />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-3 w-10 bg-stone-200 rounded" />
                <div className="h-5 w-44 bg-stone-200 rounded" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="h-3 w-24 bg-stone-200 rounded" />
                <div className="h-8 w-16 bg-stone-200 rounded" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mb-4 animate-pulse">
            <div className="h-3 w-20 bg-stone-200 rounded mb-4" />
            <div className="flex flex-col gap-3">
              <div className="h-11 w-full bg-stone-200 rounded-xl" />
              <div className="h-11 w-full bg-stone-200 rounded-xl" />
              <div className="h-11 w-full bg-stone-200 rounded-xl" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 animate-pulse">
            <div className="h-3 w-16 bg-stone-200 rounded mb-1" />
            <div className="h-3 w-56 bg-stone-200 rounded mb-4 mt-2" />
            <div className="h-10 w-24 bg-stone-200 rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}

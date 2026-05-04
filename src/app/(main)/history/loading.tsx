export default function Loading() {
  return (
    <main className="flex-1 flex flex-col items-center p-8">
      <div className="w-full max-w-lg">
        <div className="h-8 w-24 bg-stone-200 rounded-lg animate-pulse mb-8" />
        <ul className="flex flex-col gap-4">
          {[0.9, 0.7, 0.8].map((opacity, i) => (
            <li
              key={i}
              className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm animate-pulse"
              style={{ opacity }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-32 bg-stone-200 rounded" />
                <div className="flex gap-2">
                  <div className="h-7 w-7 bg-stone-200 rounded-lg" />
                  <div className="h-7 w-7 bg-stone-200 rounded-lg" />
                </div>
              </div>
              <div className="h-4 w-3/4 bg-stone-200 rounded mb-3" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full bg-stone-200 rounded" />
                <div className="h-4 w-5/6 bg-stone-200 rounded" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

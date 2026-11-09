
export default function Loading() {
  return (
    <main className="p-8" role="status" aria-label="Loading open source projects">
      <div className="mb-6 h-9 w-64 animate-pulse rounded bg-gray-200" />

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-lg border p-5 shadow-sm"
          >
            <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-full rounded bg-gray-200" />
            <div className="mb-4 h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading projects...</span>
    </main>
  );
}

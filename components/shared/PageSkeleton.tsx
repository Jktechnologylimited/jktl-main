// Generic Suspense fallback used by route-level loading.tsx files, styled to
// match the real hero + content layout so navigation doesn't flash blank.
export default function PageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div className="bg-cream-50">
      {/* Hero skeleton */}
      <section style={{ background: "var(--navy-950)", paddingTop: "clamp(112px,14vw,140px)", paddingBottom: 64 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton-dark" style={{ width: 140, height: 14, marginBottom: 20 }} />
          <div className="skeleton-dark" style={{ width: "60%", height: 44, marginBottom: 16 }} />
          <div className="skeleton-dark" style={{ width: "40%", height: 44, marginBottom: 24 }} />
          <div className="skeleton-dark" style={{ width: "45%", height: 16, marginBottom: 32 }} />
          <div className="flex gap-3">
            <div className="skeleton-dark" style={{ width: 160, height: 48 }} />
            <div className="skeleton-dark" style={{ width: 160, height: 48 }} />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="skeleton mx-auto" style={{ width: 260, height: 32, marginBottom: 48 }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: cards }).map((_, i) => (
              <div key={i} className="p-6 border border-cream-300 rounded">
                <div className="skeleton" style={{ width: 44, height: 44, marginBottom: 16, borderRadius: 10 }} />
                <div className="skeleton" style={{ width: "80%", height: 16, marginBottom: 10 }} />
                <div className="skeleton" style={{ width: "100%", height: 12, marginBottom: 6 }} />
                <div className="skeleton" style={{ width: "90%", height: 12 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

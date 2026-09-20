// Overrides the marketing-site loading.tsx (app/affiliates/loading.tsx) for
// the dashboard subtree, which has its own sidebar layout, not a hero.
export default function DashboardLoading() {
  return (
    <div style={{ padding: "clamp(16px,4vw,32px)" }}>
      <div className="skeleton" style={{ width: 220, height: 28, marginBottom: 24 }} />
      <div className="skeleton" style={{ width: "100%", height: 72, marginBottom: 24, borderRadius: 4 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 90, borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}

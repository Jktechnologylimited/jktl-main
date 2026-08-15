export interface Stat { v: string; l: string; }

export default function StatsRow({ stats, dark = false }: { stats: Stat[]; dark?: boolean }) {
  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}>
      {stats.map(s => (
        <div key={s.l} className="text-center">
          <p className={`font-bold leading-none mb-2 ${dark ? "text-white" : "text-navy-900"}`} style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{s.v}</p>
          <p className={`text-[0.72rem] font-mono uppercase tracking-wide ${dark ? "text-white/40" : "text-black/40"}`}>{s.l}</p>
        </div>
      ))}
    </div>
  );
}

export default function HeroMockup() {
  return (
    <div className="relative w-full" style={{ maxWidth: 460 }}>
      {/* Laptop frame */}
      <div className="rounded-t-lg overflow-hidden border border-white/10" style={{ background: "#0B1640" }}>
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10">
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
        </div>
        <div className="p-4">
          <div className="grid gap-1.5 mb-3">
            <div className="h-2 rounded-full bg-white/10" style={{ width: "55%" }} />
            <div className="h-2 rounded-full bg-white/[0.06]" style={{ width: "35%" }} />
          </div>
          {/* Chart panel */}
          <div className="rounded bg-white/[0.04] border border-white/10 p-3 mb-3">
            <svg viewBox="0 0 280 90" className="w-full h-auto" preserveAspectRatio="none">
              <polyline points="0,70 35,55 70,60 105,35 140,42 175,18 210,28 245,10 280,20"
                fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="0,70 35,55 70,60 105,35 140,42 175,18 210,28 245,10 280,20 280,90 0,90"
                fill="url(#heroGrad)" stroke="none" opacity="0.5" />
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Mini cards row */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded bg-white/[0.04] border border-white/10 p-2.5">
                <div className="h-1.5 rounded-full bg-white/15 mb-1.5" style={{ width: "70%" }} />
                <div className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: "45%" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div className="h-2.5 rounded-b-lg" style={{ background: "linear-gradient(180deg,#1a2650,#0B1640)" }} />

      {/* Phone overlay */}
      <div className="absolute rounded-xl border border-white/15 overflow-hidden shadow-2xl"
        style={{ right: "-8%", bottom: "-14%", width: "34%", background: "#0B1640", aspectRatio: "9/18" }}>
        <div className="p-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="w-4 h-4 rounded-full bg-gold-400/30" />
            <div className="flex gap-1">
              <span className="w-3.5 h-1 rounded-full bg-white/10" />
              <span className="w-3.5 h-1 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="grid gap-1.5">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-3.5 rounded bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

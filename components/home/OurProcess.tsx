const STEPS = [
  { n: "1", title: "Discover", desc: "We learn about your business, goals and target audience." },
  { n: "2", title: "Plan",     desc: "We plan the strategy, structure and user experience." },
  { n: "3", title: "Deliver",  desc: "We design, develop and launch a system that gets results." },
];

export default function OurProcess() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-center gap-8 sm:gap-4">
      {STEPS.map((s, i) => (
        <div key={s.n} className="flex flex-col sm:flex-row items-center sm:items-start flex-1" style={{ maxWidth: 280 }}>
          <div className="text-center flex-1">
            <p className="font-bold text-gold-400 mb-2" style={{ fontSize: "1.6rem" }}>{s.n}</p>
            <p className="font-bold text-[0.95rem] text-white uppercase tracking-wide mb-2">{s.title}</p>
            <p className="text-[0.82rem] text-white/45 leading-relaxed" style={{ maxWidth: 220, margin: "0 auto" }}>{s.desc}</p>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex items-center justify-center shrink-0 my-3 sm:my-0 sm:mt-3" style={{ width: 28 }}>
              <svg className="hidden sm:block" width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M1 7h24M19 1l6 6-6 6" /></svg>
              <svg className="sm:hidden" width="14" height="28" viewBox="0 0 14 28" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M7 1v24M1 19l6 6 6-6" /></svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

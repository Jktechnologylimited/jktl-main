import Link from "next/link";
import { agencyServicesTeaser } from "@/data/index";

export default function OurServicesTeaser() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <div className="flex flex-col gap-3 mb-7">
          {agencyServicesTeaser.slice(0, 6).map(s => (
            <div key={s.icon} className="flex items-center gap-3 pb-3 border-b border-cream-300">
              <span className="font-mono text-[0.6rem] font-bold text-navy-700 shrink-0 w-6">{s.icon}</span>
              <span className="text-[0.9rem] text-navy-900 font-semibold flex-1">{s.label}</span>
              <span className="text-[0.78rem] text-black/40">{s.desc}</span>
            </div>
          ))}
        </div>
        <Link href="/services" className="btn-primary px-6 py-3 inline-block text-sm">View All Services</Link>
      </div>

      <div className="rounded overflow-hidden border border-cream-300 bg-navy-950 flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
        <div className="grid grid-cols-2 gap-3 p-8 w-full">
          {agencyServicesTeaser.slice(0, 4).map(s => (
            <div key={s.icon} className="rounded p-4 bg-white/[0.04] border border-white/10">
              <span className="font-mono text-[0.6rem] font-bold text-gold-400">{s.icon}</span>
              <p className="text-[0.72rem] text-white/60 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

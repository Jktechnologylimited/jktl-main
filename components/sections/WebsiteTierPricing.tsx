import Link from "next/link";
import type { WebsiteTier } from "@/data/index";

function fmtN(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function WebsiteTierPricing({
  tiers,
  ctaHref = "/contact",
}: {
  tiers: WebsiteTier[];
  ctaHref?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={`flex flex-col p-8 rounded-sm border ${
            t.highlight ? "bg-navy-950 border-gold-400" : "bg-white border-black/10"
          }`}
        >
          {t.highlight && (
            <div className="label-xs text-gold-400 mb-3">Most Popular</div>
          )}
          <p className={`font-bold text-[0.95rem] mb-1 ${t.highlight ? "text-white" : "text-navy-900"}`}>
            {t.name}
          </p>
          <p className={`text-[0.8rem] mb-6 leading-relaxed ${t.highlight ? "text-white/50" : "text-black/50"}`}>
            {t.tagline}
          </p>

          <div className="mb-1 flex items-baseline gap-1.5">
            <span
              className={`font-display font-light text-[2.4rem] leading-none ${
                t.highlight ? "text-white" : "text-navy-900"
              }`}
            >
              {fmtN(t.monthly)}
            </span>
            <span className={`text-[0.85rem] ${t.highlight ? "text-white/40" : "text-black/40"}`}>/month</span>
          </div>
          <p className={`text-[0.72rem] mb-7 font-mono ${t.highlight ? "text-gold-400" : "text-emerald-600"}`}>
            billed annually &middot; {fmtN(t.annual)}/year
          </p>

          <ul className="flex-1 space-y-2.5 mb-8">
            {t.features.map((f) => {
              const isHeader = f.startsWith("Everything in");
              return (
                <li
                  key={f}
                  className={`text-[0.82rem] flex items-start gap-2 leading-relaxed ${
                    t.highlight ? "text-white/70" : "text-black/65"
                  } ${isHeader ? "font-bold" : ""}`}
                >
                  {!isHeader && (
                    <svg
                      width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke={t.highlight ? "#C9A84C" : "#10B981"} strokeWidth="2.5"
                      className="shrink-0 mt-0.5"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {f}
                </li>
              );
            })}
          </ul>

          <Link
            href={ctaHref}
            className={`text-center py-3.5 text-[0.75rem] font-bold uppercase tracking-widest rounded-sm no-underline ${
              t.highlight ? "bg-gold-400 text-navy-900" : "border border-navy-900 text-navy-900"
            }`}
          >
            Get Started
          </Link>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { agencyServicesTeaser, businessSuiteRoadmap, productPricing } from "@/data/index";
import { useDeskProducts, type DeskProductItem } from "@/hooks/useDeskProducts";

function fmtN(n: number) { return "\u20a6" + n.toLocaleString("en-NG"); }

// Order matters -- this is the curated "Industry Platforms" line-up shown on
// the homepage. Any desk product can exist without appearing here.
const INDUSTRY_SLUGS = ["schooldesk", "faithdesk", "insurancedesk", "constructiondesk", "gasstationdesk", "businessdesk"];

function priceLabel(p: DeskProductItem & { setupPrice?: number | null; monthlyPrice?: number | null }) {
  // DB pricing once loaded, static productPricing as an immediate first-paint fallback.
  const fallback = (productPricing as Record<string, { setup: number | null; monthly: number | null }>)[p.id] || { setup: null, monthly: null };
  const setup = p.setupPrice ?? fallback.setup;
  const monthly = p.monthlyPrice ?? fallback.monthly;
  if (setup && monthly) return `${fmtN(setup)} setup + ${fmtN(monthly)}/mo`;
  if (setup) return `From ${fmtN(setup)}`;
  if (monthly) return `From ${fmtN(monthly)}/mo`;
  return "Contact for pricing";
}

function ProductCard({ p }: { p: DeskProductItem & { setupPrice?: number | null; monthlyPrice?: number | null } }) {
  const isLive = p.status === "live";
  return (
    <div className="bg-white rounded border border-cream-300 flex flex-col overflow-hidden" style={{ borderTop: `3px solid ${p.color}` }}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0" style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
            <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[0.95rem] text-navy-900 leading-tight">{p.name}</p>
            <p className="text-[0.7rem] text-black/40 truncate">{p.tagline}</p>
          </div>
        </div>
        <p className="body-sm text-black/55 mb-4 flex-1">{p.description}</p>
        <p className="font-bold text-[0.98rem] text-navy-900 mb-4">{priceLabel(p)}</p>
        <Link href={isLive ? p.getStartedHref : p.href}
          className="py-2.5 text-center text-white text-[0.72rem] font-bold rounded-sm uppercase tracking-wide no-underline"
          style={{ background: isLive ? p.color : "#0B1640" }}>
          {isLive ? "Get Started" : "Join Waitlist"}
        </Link>
      </div>
    </div>
  );
}

export default function SolutionsTabs() {
  const allProducts = useDeskProducts() as (DeskProductItem & { setupPrice?: number | null; monthlyPrice?: number | null })[];
  const [tab, setTab] = useState<"industry" | "custom" | "infra">("industry");

  const industryProducts = INDUSTRY_SLUGS
    .map(slug => allProducts.find(p => p.id === slug))
    .filter(Boolean) as (DeskProductItem & { setupPrice?: number | null; monthlyPrice?: number | null })[];

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "industry", label: "Industry Platforms" },
    { id: "custom",   label: "Custom Platforms" },
    { id: "infra",    label: "Digital Infrastructure" },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-cream-300 mb-8 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-4 py-3 text-[0.82rem] font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors"
            style={{
              color: tab === t.id ? "var(--navy-900)" : "rgba(6,14,42,0.4)",
              borderColor: tab === t.id ? "#C9A84C" : "transparent",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Industry Platforms */}
      {tab === "industry" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {industryProducts.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}

      {/* Custom Platforms */}
      {tab === "custom" && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {agencyServicesTeaser.map(s => (
              <Link key={s.icon} href="/services" className="bg-white border border-cream-300 rounded p-4 no-underline hover:border-navy-600 transition-colors">
                <div className="w-9 h-9 rounded-sm bg-navy-900 flex items-center justify-center mb-3">
                  <span className="font-mono text-[0.62rem] font-bold text-gold-400">{s.icon}</span>
                </div>
                <p className="font-bold text-[0.85rem] text-navy-900 mb-0.5">{s.label}</p>
                <p className="text-[0.72rem] text-black/40">{s.desc}</p>
              </Link>
            ))}
          </div>
          <Link href="/get-started/services" className="btn-gold text-sm px-6 py-3 inline-block">Submit an Inquiry</Link>
        </div>
      )}

      {/* Digital Infrastructure */}
      {tab === "infra" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {businessSuiteRoadmap.map(p => (
              <div key={p.id} className="bg-white border border-cream-300 rounded p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0" style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                  <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-[0.95rem] text-navy-900">{p.name}</p>
                    <span className="font-mono text-[0.55rem] bg-amber-500/15 text-amber-600 px-1.5 py-0.5 rounded tracking-widest uppercase font-bold">Roadmap</span>
                  </div>
                  <p className="text-[0.72rem] text-black/40 mb-2">{p.tagline}</p>
                  <p className="body-sm text-black/55">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.8rem] text-black/40">Free tools with a platform-fee revenue model, built on the same infrastructure as every Desk product.</p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Service { id: string; name: string; tagline?: string; category?: string; base_price?: number; recurring: boolean; recurring_price?: number; recurring_period?: string; is_custom?: boolean; }
function fmtN(n?: number) { return n != null ? "\u20a6" + Number(n).toLocaleString("en-NG") : undefined; }

// Real agency_services data -- reuses the exact /api/offers endpoint the
// Offers page already calls, rather than a second fetch/shape of the same
// data. CTA links to the canonical checkout on /offers instead of
// duplicating the payment modal here a second time.
export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/offers").then(r => r.json()).then(d => { setServices(d.services || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-black/30 text-sm py-6">Loading services...</p>;
  if (services.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map(s => {
        const price = fmtN(s.base_price);
        return (
          <div key={s.id} className="bg-white p-6 rounded border border-cream-300 flex flex-col">
            {s.category && <span className="font-mono text-[0.6rem] text-black/30 uppercase tracking-wide mb-2">{s.category}</span>}
            <h3 className="text-navy-900 font-bold text-[1rem] mb-2">{s.name}</h3>
            {s.tagline && <p className="text-black/55 text-[0.85rem] leading-relaxed mb-4 flex-1">{s.tagline}</p>}
            <p className="text-navy-900 font-semibold text-[0.95rem] mb-4">
              {s.is_custom && price ? "From " : ""}{price || "Contact for pricing"}
              {s.recurring && s.recurring_price ? <span className="text-[0.75rem] text-black/40"> + {fmtN(s.recurring_price)}/{s.recurring_period === "yearly" ? "yr" : "mo"}</span> : ""}
            </p>
            <Link href="/offers" className="btn-outline-navy py-2.5 text-[0.74rem] uppercase tracking-wide text-center block">{s.is_custom ? "Get a Quote" : `Get ${s.name}`}</Link>
          </div>
        );
      })}
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { companyDetails } from "@/data/index";
import { useDeskProducts } from "@/hooks/useDeskProducts";
import { useProductPricing } from "@/hooks/useProductPricing";

function fmtN(n: number) { return "\u20a6" + n.toLocaleString("en-NG"); }

// Shared waitlist / coming-soon page for any desk product that doesn't have
// a bespoke marketing page yet. Pulls everything from the DB-driven product
// record (name, tagline, description, features, use cases) so a new product
// added in the Command Center immediately gets a working page here.
export default function ComingSoonProduct({ productId }: { productId: string }) {
  const products = useDeskProducts();
  const product = products.find(p => p.id === productId);
  const pricing = useProductPricing(productId);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function joinWaitlist() {
    if (!email) { setError("Email is required"); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId, email, phone, school: business }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!product) return null;
  const color = product.color;

  return (
    <div className="bg-navy-950">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "clamp(48px,7vw,72px)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: `linear-gradient(${color}FF 1px,transparent 1px),linear-gradient(90deg,${color}FF 1px,transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm mb-7"
            style={{ background: color + "15", border: `1px solid ${color}40` }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
            <span className="font-mono text-[0.62rem] tracking-widest uppercase" style={{ color }}>{product.name} &mdash; Coming Soon &middot; Waitlist Open</span>
          </div>
          <h1 className="display-hero text-white mb-5 leading-[1.05]">{product.tagline}</h1>
          <p className="body-lg text-white/55 mb-9 mx-auto" style={{ maxWidth: 620 }}>{product.description}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#waitlist" className="px-7 py-3.5 text-sm font-bold rounded-sm no-underline uppercase tracking-wide" style={{ background: color, color: "#060E2A" }}>
              Join the Waitlist
            </a>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-3.5 text-sm">
              Talk to Us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-cream-50 text-center mb-10">What&apos;s coming</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((f, i) => (
              <div key={f} className="flex items-start gap-3 p-4 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="shrink-0 mt-0.5 font-mono text-[0.7rem] font-bold" style={{ color }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.88rem] text-white/70 leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      {product.useCases?.length > 0 && (
        <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-[900px] mx-auto">
            <h2 className="display-lg text-cream-50 text-center mb-10">Built for businesses like yours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.useCases.map(u => (
                <div key={u} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1" style={{ color }}>&#10003;</span>
                  <span className="text-[0.9rem] text-white/60 leading-relaxed">{u}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING TEASER */}
      {(pricing.setup || pricing.monthly) && (
        <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-[480px] mx-auto text-center rounded p-8" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}30` }}>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase mb-3" style={{ color }}>Launch Pricing</p>
            <p className="text-white font-bold text-[1.8rem] mb-1">
              {pricing.setup ? fmtN(pricing.setup) : fmtN(pricing.monthly!) + "/mo"}
            </p>
            {pricing.setup && pricing.monthly && (
              <p className="text-white/40 text-[0.8rem] mb-3">+ {fmtN(pricing.monthly)}/month</p>
            )}
            {pricing.note && <p className="text-white/40 text-[0.82rem] leading-relaxed">{pricing.note}</p>}
          </div>
        </section>
      )}

      {/* WAITLIST FORM */}
      <section id="waitlist" className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[480px] mx-auto text-center">
          <h2 className="display-lg text-cream-50 mb-3">Join the waitlist</h2>
          <p className="text-white/45 text-[0.9rem] mb-8">Be first to know when {product.name} goes live &mdash; and lock in launch pricing.</p>
          {done ? (
            <div className="rounded p-7" style={{ background: color + "12", border: `1px solid ${color}35` }}>
              <p className="text-white font-bold mb-1">You&apos;re on the list &#10003;</p>
              <p className="text-white/50 text-[0.85rem]">We&apos;ll email you the moment {product.name} is ready.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-left">
              <input type="text" placeholder="Business / organisation name" value={business} onChange={e => setBusiness(e.target.value)}
                className="px-4 py-3 rounded-sm bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                className="px-4 py-3 rounded-sm bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none" />
              <input type="tel" placeholder="Phone number (optional)" value={phone} onChange={e => setPhone(e.target.value)}
                className="px-4 py-3 rounded-sm bg-white/[0.05] border border-white/10 text-white text-sm placeholder:text-white/25 outline-none" />
              {error && <p className="text-red-400 text-[0.8rem]">{error}</p>}
              <button onClick={joinWaitlist} disabled={loading || !email}
                className="py-3.5 rounded-sm font-bold text-sm uppercase tracking-wide disabled:opacity-50"
                style={{ background: color, color: "#060E2A" }}>
                {loading ? "Joining..." : "Join the Waitlist"}
              </button>
            </div>
          )}
          <p className="text-white/25 text-[0.78rem] mt-8">
            Looking for something else? <Link href="/desk" className="underline" style={{ color }}>See all Desk products</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

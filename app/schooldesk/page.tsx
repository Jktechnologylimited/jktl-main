import type { Metadata } from "next";
import Link from "next/link";
import { deskProducts, deskPlans, siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "SchoolDesk -- School Administration Software | JK Technology",
  description: "SchoolDesk is coming soon. Complete school management -- fees, student portal, staff, public website. Join the waitlist.",
};

function fmtN(n: number) { return "N" + n.toLocaleString("en-NG"); }

export default function ProductPage() {
  const product = deskProducts.find(p => p.id === "schooldesk")!;
  if (!product) return null;

  return (
    <div style={{ background: "var(--cream-50)" }}>

      {/* Hero */}
      <section style={{ background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: product.color }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, background: product.color + "20", border: "1px solid " + product.color + "40", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", fontWeight: 700, color: product.color }}>{product.icon}</span>
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", color: product.status === "live" ? "#34D399" : "#F59E0B", background: product.status === "live" ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 2 }}>
                {product.status === "live" ? "LIVE" : "COMING SOON"}
              </span>
            </div>
          </div>
          <h1 className="display-hero" style={{ color: "#fff", marginBottom: 12 }}>{product.name}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.4rem", color: "rgba(249,247,240,0.5)", marginBottom: 16 }}>{product.tagline}</p>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.45)", maxWidth: 520, marginBottom: 36 }}>{product.description}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {product.status === "live" ? (
              <>
                <Link href={`https://accounts.jktl.com.ng/signup?product=${product.id}`} style={{ padding: "14px 32px", background: product.color, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>Get Started</Link>
                <a href={`mailto:${siteConfig.email}`} className="btn-ghost" style={{ fontSize: "0.78rem" }}>Request Demo</a>
              </>
            ) : (
              <Link href={`https://accounts.jktl.com.ng/signup?product=${product.id}`} className="btn-gold" style={{ padding: "14px 32px" }}>Join Waitlist</Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "var(--cream-50)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <span className="gold-rule" style={{ display: "block", marginBottom: 12 }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)", marginBottom: 20 }}>Everything included.</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {product.features.map((f: string) => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 2, background: product.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: "0.65rem", color: product.color, fontWeight: 700 }}>v</span>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "rgba(28,28,30,0.7)", lineHeight: 1.5 }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {product.useCases.map((uc: string, i: number) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderLeft: "3px solid " + product.color, borderRadius: 4, padding: "18px 20px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.6rem", color: product.color, lineHeight: 1, marginBottom: 6 }}>{"0" + (i + 1)}</p>
                <p style={{ fontSize: "0.88rem", color: "var(--navy-900)", fontWeight: 600, lineHeight: 1.4 }}>{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section style={{ background: "var(--cream-100)", padding: "56px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Your own domain. Instantly.</h2>
            <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginTop: 8 }}>Every client gets their own subdomain on signup. Custom domains available on Pro and Enterprise.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {product.domains.map((d: {label: string; example: string; type: string}) => (
              <div key={d.label} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--navy-900)", marginBottom: 2 }}>{d.label}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: "rgba(28,28,30,0.45)" }}>{d.example}</p>
                </div>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 2,
                  background: d.type === "public" ? "rgba(6,182,212,0.1)" : d.type === "admin" ? "rgba(239,68,68,0.1)" : d.type === "portal" ? "rgba(139,92,246,0.1)" : "rgba(245,158,11,0.1)",
                  color: d.type === "public" ? "#0891B2" : d.type === "admin" ? "#DC2626" : d.type === "portal" ? "#7C3AED" : "#D97706",
                }}>{d.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "var(--navy-900)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="display-lg" style={{ color: "var(--cream-50)", marginBottom: 8 }}>Pricing</h2>
            <p className="body-sm" style={{ color: "rgba(249,247,240,0.4)" }}>One-time setup fee + monthly subscription. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 2, background: "rgba(249,247,240,0.05)" }}>
            {deskPlans.map((plan) => (
              <div key={plan.id} style={{ padding: "24px", background: plan.highlight ? "rgba(201,168,76,0.06)" : "var(--navy-800)", borderTop: plan.highlight ? "2px solid var(--gold-400)" : "2px solid transparent" }}>
                {plan.highlight && <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", color: "var(--gold-400)", marginBottom: 8 }}>MOST POPULAR</p>}
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: plan.highlight ? "var(--gold-400)" : "var(--cream-50)", marginBottom: 16 }}>{plan.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.8rem", color: "#fff", lineHeight: 1 }}>{fmtN(plan.setupFee)}</p>
                <p style={{ fontSize: "0.68rem", color: "rgba(249,247,240,0.3)", marginBottom: 4 }}>setup</p>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", color: plan.highlight ? "var(--gold-300)" : "var(--cream-50)", marginBottom: 18 }}>{fmtN(plan.monthlyFee)}/mo</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 6, fontSize: "0.75rem", color: "rgba(249,247,240,0.5)" }}>
                      <span style={{ color: plan.highlight ? "var(--gold-400)" : "#34D399", flexShrink: 0 }}>v</span>{f}
                    </div>
                  ))}
                </div>
                <Link href={product.status === "live" ? `https://accounts.jktl.com.ng/signup?product=${product.id}` : product.href} style={{ display: "block", padding: "10px", background: plan.highlight ? "var(--gold-400)" : "rgba(249,247,240,0.08)", color: plan.highlight ? "var(--navy-900)" : "var(--cream-50)", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", borderRadius: 2, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {product.status === "live" ? "Get Started" : "Join Waitlist"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream-100)", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 className="display-lg" style={{ color: "var(--navy-900)", marginBottom: 12 }}>
            {product.status === "live" ? "Ready to go live?" : "Want to be first?"}
          </h2>
          <p className="body-md" style={{ color: "rgba(28,28,30,0.5)", marginBottom: 28 }}>
            {product.status === "live" ? "Self-service onboarding. Go live in 10 minutes. No developer needed." : "SchoolDesk is coming soon. Join the waitlist and be first to know."}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {product.status === "live" ? (
              <>
                <Link href={`https://accounts.jktl.com.ng/signup?product=${product.id}`} className="btn-gold" style={{ padding: "14px 32px" }}>Get Started</Link>
                <a href={`mailto:${siteConfig.email}`} className="btn-outline-navy">Request Demo</a>
              </>
            ) : (
              <Link href={product.href} className="btn-gold" style={{ padding: "14px 32px" }}>Join Waitlist</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

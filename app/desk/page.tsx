import type { Metadata } from "next";
import Link from "next/link";
import { deskProducts, deskPlans, siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Desk by JK Technology | Vertical Software for African Businesses",
  description: "Desk is a suite of industry-specific management software. FaithDesk for ministries, DetailDesk for auto detailing, SchoolDesk for schools. Self-service onboarding.",
  alternates: { canonical: "https://jktl.com.ng/desk" },
};

function fmtN(n: number) { return "N" + n.toLocaleString("en-NG"); }

export default function DeskPage() {
  return (
    <div style={{ background: "var(--cream-50)" }}>

      {/* Hero */}
      <section style={{ background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", padding: "5px 14px", borderRadius: 2, marginBottom: 24 }}>
            <span className="label-xs" style={{ color: "var(--gold-400)" }}>jktl.com.ng / desk</span>
          </div>
          <h1 className="display-hero" style={{ color: "#fff", maxWidth: 700, marginBottom: 16 }}>
            Desk.<br />
            <span style={{ color: "var(--gold-400)" }}>Vertical Software Suite.</span>
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.5)", maxWidth: 520, marginBottom: 12 }}>
            Industry-specific management systems built for African businesses. Self-service onboarding. Real-time deployment. Subscription billing.
          </p>
          <p className="body-sm" style={{ color: "rgba(249,247,240,0.3)", fontFamily: "'JetBrains Mono',monospace", marginBottom: 36 }}>
            Like Google Workspace -- except built for churches, schools, and auto detailers.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="https://accounts.jktl.com.ng/signup" className="btn-gold" style={{ padding: "12px 28px", fontSize: "0.78rem" }}>Choose a Product</Link>
            <a href={"mailto:" + siteConfig.email} className="btn-ghost" style={{ fontSize: "0.78rem" }}>Talk to us</a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ background: "var(--cream-50)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span className="gold-rule" style={{ display: "block", marginBottom: 12 }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Three Products. One Suite.</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {deskProducts.map((p, i) => (
              <div key={p.id} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderLeft: "4px solid " + p.color, borderRadius: 4, padding: "28px 32px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr auto", gap: 32, alignItems: "start" }}>
                  {/* Left */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 40, height: 40, background: p.color + "15", border: "1px solid " + p.color + "30", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: p.color }}>{p.icon}</span>
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--navy-900)" }}>{p.name}</p>
                        <span style={{ display: "inline-block", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", fontWeight: 700, color: p.status === "live" ? "#059669" : "#D97706", background: p.status === "live" ? "rgba(5,150,105,0.1)" : "rgba(217,119,6,0.1)", padding: "2px 8px", borderRadius: 2 }}>
                          {p.status === "live" ? "LIVE" : "COMING SOON"}
                        </span>
                      </div>
                    </div>
                    <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)", lineHeight: 1.7 }}>{p.description}</p>
                  </div>

                  {/* Features */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "4px 16px" }}>
                    {p.features.map((f) => (
                      <div key={f} style={{ display: "flex", gap: 8, fontSize: "0.8rem", color: "rgba(28,28,30,0.6)", alignItems: "flex-start", padding: "3px 0" }}>
                        <span style={{ color: p.color, flexShrink: 0 }}>v</span>{f}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 140 }}>
                    {p.status === "live" ? (
                      <>
                        <Link href={p.getStartedHref} style={{ padding: "10px 20px", background: p.color, color: "#fff", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", borderRadius: 2, textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>Get Started</Link>
                        <Link href={p.href} style={{ padding: "10px 20px", background: "transparent", border: "1px solid var(--cream-300)", color: "rgba(28,28,30,0.6)", fontSize: "0.72rem", textDecoration: "none", borderRadius: 2, textAlign: "center" }}>Learn More</Link>
                      </>
                    ) : (
                      <Link href={p.href} style={{ padding: "10px 20px", background: "var(--cream-100)", border: "1px solid var(--cream-300)", color: "rgba(28,28,30,0.5)", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", borderRadius: 2, textAlign: "center" }}>Join Waitlist</Link>
                    )}
                  </div>
                </div>

                {/* Domains */}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--cream-200)", display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <p className="label-xs" style={{ color: "rgba(28,28,30,0.3)", alignSelf: "center" }}>Domains:</p>
                  {p.domains.map((d) => (
                    <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "rgba(28,28,30,0.4)" }}>{d.example}</span>
                      <span style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "1px 6px", borderRadius: 2,
                        background: d.type === "public" ? "rgba(6,182,212,0.1)" : d.type === "admin" ? "rgba(239,68,68,0.1)" : d.type === "portal" ? "rgba(139,92,246,0.1)" : "rgba(245,158,11,0.1)",
                        color: d.type === "public" ? "#0891B2" : d.type === "admin" ? "#DC2626" : d.type === "portal" ? "#7C3AED" : "#D97706",
                      }}>{d.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "var(--navy-900)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="display-lg" style={{ color: "var(--cream-50)", marginBottom: 8 }}>Pricing</h2>
            <p className="body-md" style={{ color: "rgba(249,247,240,0.4)" }}>Same plans across all Desk products.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 2, background: "rgba(249,247,240,0.06)" }}>
            {deskPlans.map((plan) => (
              <div key={plan.id} style={{ padding: "28px", background: plan.highlight ? "rgba(201,168,76,0.06)" : "var(--navy-800)", borderTop: plan.highlight ? "2px solid var(--gold-400)" : "2px solid transparent", position: "relative" }}>
                {plan.highlight && <p style={{ position: "absolute", top: 14, right: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", color: "var(--gold-400)", background: "rgba(201,168,76,0.15)", padding: "2px 8px", borderRadius: 2 }}>POPULAR</p>}
                <p style={{ fontWeight: 700, fontSize: "1rem", color: plan.highlight ? "var(--gold-400)" : "var(--cream-50)", marginBottom: 4 }}>{plan.name}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.4)", marginBottom: 20 }}>{plan.description}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2rem", color: "#fff", lineHeight: 1, marginBottom: 2 }}>{fmtN(plan.setupFee)}</p>
                <p style={{ fontSize: "0.7rem", color: "rgba(249,247,240,0.35)", marginBottom: 6 }}>one-time setup</p>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: plan.highlight ? "var(--gold-300)" : "var(--cream-50)", marginBottom: 20 }}>{fmtN(plan.monthlyFee)}<span style={{ fontWeight: 300, fontSize: "0.8rem", opacity: 0.5 }}>/mo</span></p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", gap: 7, fontSize: "0.78rem", color: "rgba(249,247,240,0.5)" }}>
                      <span style={{ color: plan.highlight ? "var(--gold-400)" : "#34D399", flexShrink: 0 }}>v</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="https://accounts.jktl.com.ng/signup" style={{ display: "block", padding: "10px", background: plan.highlight ? "var(--gold-400)" : "rgba(249,247,240,0.08)", color: plan.highlight ? "var(--navy-900)" : "var(--cream-50)", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", borderRadius: 2, textAlign: "center", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Business Suite Roadmap */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="gold-rule block" />
            <span className="label-xs" style={{ color: "rgba(28,28,30,0.4)" }}>Coming Later</span>
          </div>
          <h2 className="display-lg text-navy-900 mb-3">Business Suite</h2>
          <p className="body-md mb-8" style={{ color: "rgba(28,28,30,0.5)", maxWidth: 560 }}>
            General business tools built on the same JKTL infrastructure. Free to use with platform fee revenue model. Your existing account works immediately when launched.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: "IV",
                name: "InvoiceDesk",
                color: "#F59E0B",
                desc: "Global invoicing for freelancers and businesses. Paystack payments, bank account required, automated reminders, payment tracking.",
              },
              {
                icon: "QR",
                name: "QRPay",
                color: "#06B6D4",
                desc: "Generate QR codes for physical shops. Customers scan and pay. Opay and Monnify integration. Transaction dashboard.",
              },
            ].map(p => (
              <div key={p.name} className="p-6 rounded bg-white border border-cream-300 flex items-start gap-4" style={{ opacity: 0.75 }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0" style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                  <span className="font-mono text-[0.72rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="font-bold text-navy-900">{p.name}</p>
                    <span className="label-xs px-2 py-0.5 rounded" style={{ background: "rgba(245,158,11,0.1)", color: "#D97706" }}>ROADMAP</span>
                  </div>
                  <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-5" style={{ color: "rgba(28,28,30,0.35)", fontStyle: "italic" }}>
            Your JKTL account will give you instant access when these launch -- no new signup needed.
          </p>
        </div>
      </section>

      {/* How onboarding works */}
      <section style={{ background: "var(--cream-50)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="gold-rule" style={{ display: "inline-block", marginBottom: 12 }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Go Live in 10 Minutes</h2>
            <p className="body-md" style={{ color: "rgba(28,28,30,0.5)", marginTop: 8 }}>No developer needed. No waiting. Self-service.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { n:"01", t:"Choose Your Plan",       d:"Standard, Pro, or Enterprise. Pricing shown clearly upfront." },
              { n:"02", t:"Enter Organisation Details", d:"Name, owner, email, phone. Takes 2 minutes." },
              { n:"03", t:"Pick Your Subdomain",    d:"Real-time availability check. Custom domain available on Pro and Enterprise." },
              { n:"04", t:"Upload Branding",        d:"Your logo and brand colours. Live preview before you pay." },
              { n:"05", t:"Pay via Paystack",       d:"Secure card payment. Setup fee charged once. Subscription starts immediately." },
              { n:"06", t:"Go Live Automatically",  d:"Payment confirmed. System provisioned. Credentials sent to your email. You are live." },
            ].map((step, i) => (
              <div key={step.n} style={{ display: "flex", gap: 20, padding: "16px 0", borderBottom: i < 5 ? "1px solid var(--cream-300)" : "none", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: i === 5 ? "#059669" : "var(--navy-900)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", fontWeight: 700, color: i === 5 ? "#fff" : "var(--gold-400)" }}>{step.n}</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)", marginBottom: 3 }}>{step.t}</p>
                  <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)" }}>{step.d}</p>
                  {i === 5 && (
                    <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
                      {["Create organisation record", "Provision subdomain", "Send credentials", "Start subscription"].map(a => (
                        <span key={a} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#059669", background: "rgba(5,150,105,0.08)", padding: "3px 10px", borderRadius: 2 }}>v {a}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link href="https://accounts.jktl.com.ng/signup" className="btn-gold" style={{ padding: "14px 40px" }}>Start Onboarding</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

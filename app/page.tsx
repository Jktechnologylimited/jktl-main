import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Problem, ServicesPreview, Process,
  TestimonialSection, FounderStrip, WhyUs, CTA,
} from "@/components/sections/Sections";
import {
  blogPosts, siteConfig,
  ecosystemOverview, coupledSolutions, freeTools,
  roiData, platformFeatures, industrySystems,
} from "@/data/index";

export const metadata: Metadata = {
  title: "JK Technology | Business Infrastructure Ecosystem — Nigeria",
  description:
    "JK Technology builds modular business infrastructure systems that help African businesses attract customers, run operations efficiently, collect payments, and scale sustainably.",
  alternates: { canonical: "https://jktl.com.ng" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── OUTCOMES STRIP ─────────────────────────────────────────────────── */}
      <section style={{ background:"var(--gold-400)", padding:"22px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"14px" }}>
            {ecosystemOverview.outcomes.map((o) => (
              <div key={o.title} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ width:32, height:32, background:"var(--navy-900)", borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem", fontWeight:700, color:"var(--gold-400)" }}>{o.icon}</span>
                </div>
                <div>
                  <p style={{ fontWeight:700, fontSize:"0.88rem", color:"var(--navy-900)" }}>{o.title}</p>
                  <p style={{ fontSize:"0.73rem", color:"rgba(6,14,42,0.65)" }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Problem />
      <ServicesPreview />

      {/* ── ROI SECTION ────────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background:"var(--navy-900)" }}>
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="gold-rule mb-5" style={{ display:"block" }} />
              <h2 className="display-xl mb-4" style={{ color:"var(--cream-50)" }}>
                What&apos;s the Return on<br/>
                <em className="not-italic gold-text">Your Investment?</em>
              </h2>
              <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)" }}>
                Every system we build pays for itself. Here&apos;s how — in real numbers, from real businesses like yours.
              </p>
            </div>
            {/* Stats row */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {roiData.stats.slice(0,4).map((s) => (
                <div key={s.label} style={{ padding:"20px", background:"rgba(249,247,240,0.04)", border:"1px solid rgba(201,168,76,0.15)", borderRadius:"4px" }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"4px" }}>{s.value}</p>
                  <p style={{ fontWeight:600, fontSize:"0.82rem", color:"var(--cream-50)", marginBottom:"2px" }}>{s.label}</p>
                  <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)" }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI examples */}
          <div className="grid md:grid-cols-2 gap-5">
            {roiData.roiExamples.map((ex) => (
              <div key={ex.industry} style={{ background:"rgba(249,247,240,0.03)", border:"1px solid rgba(249,247,240,0.08)", borderRadius:"4px", padding:"28px", display:"flex", flexDirection:"column", gap:"16px" }}>
                {/* Industry + metrics */}
                <div>
                  <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"6px" }}>{ex.industry}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"8px" }}>
                    {[
                      { l:"Investment",     v: ex.investment },
                      { l:"Monthly Value",  v: ex.monthlyValue },
                      { l:"Break Even",     v: ex.breakEven },
                      { l:"Year 1 ROI",     v: ex.yearOneROI },
                    ].map((m) => (
                      <div key={m.l} style={{ textAlign:"center", padding:"8px 4px", background:"rgba(201,168,76,0.08)", borderRadius:"2px" }}>
                        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1rem", color:"var(--gold-300)", lineHeight:1, marginBottom:"3px" }}>{m.v}</p>
                        <p style={{ fontSize:"0.6rem", color:"rgba(249,247,240,0.35)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Story */}
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.55)", fontStyle:"italic", borderLeft:"2px solid rgba(201,168,76,0.3)", paddingLeft:"14px" }}>
                  &ldquo;{ex.story}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Revenue model */}
          <div style={{ marginTop:"40px", borderTop:"1px solid rgba(249,247,240,0.07)", paddingTop:"32px" }}>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"16px" }}>How We Generate Revenue Together</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"10px" }}>
              {roiData.revenueModel.map((r) => (
                <div key={r.label} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"14px 16px", background:"rgba(249,247,240,0.03)", border:"1px solid rgba(249,247,240,0.07)", borderRadius:"4px" }}>
                  <div style={{ width:28, height:28, background:"rgba(201,168,76,0.15)", borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", fontWeight:700, color:"var(--gold-400)" }}>{r.icon}</span></div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:"0.82rem", color:"var(--cream-50)", marginBottom:"2px" }}>{r.label}</p>
                    <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)", fontSize:"0.75rem" }}>{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COUPLED SOLUTIONS ──────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h2 className="display-xl" style={{ color:"var(--navy-900)" }}>
                  Complete Systems for<br/>
                  <em className="not-italic gold-text">Your Industry.</em>
                </h2>
                <p className="body-md" style={{ color:"rgba(28,28,30,0.55)", marginTop:"10px", maxWidth:"520px" }}>
                  Pre-built, fully integrated systems designed for specific industries. Not generic tools — purpose-built infrastructure.
                </p>
              </div>
              <Link href="/solutions" className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none" }}>
                All solutions →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coupledSolutions.map((sol) => (
              <div key={sol.slug} style={{ background:"#fff", border:"1px solid var(--cream-300)", borderTop:`3px solid ${sol.color}`, borderRadius:"4px", padding:"24px", display:"flex", flexDirection:"column" }}>
                <div style={{ width:36, height:36, background:sol.color, borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"12px" }}><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", fontWeight:700, color:"#fff" }}>{sol.icon}</span></div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.05rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"10px", flex:1 }}>
                  {sol.title}
                </h3>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"5px", marginBottom:"14px" }}>
                  {sol.includes.slice(0,4).map((inc) => (
                    <li key={inc} style={{ fontSize:"0.75rem", color:"rgba(28,28,30,0.6)", display:"flex", gap:"6px", alignItems:"flex-start" }}>
                      <span style={{ color:sol.color, flexShrink:0, marginTop:"1px" }}>✓</span>
                      {inc}
                    </li>
                  ))}
                  {sol.includes.length > 4 && (
                    <li style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.35)", fontStyle:"italic" }}>+{sol.includes.length - 4} more</li>
                  )}
                </ul>
                <p style={{ fontSize:"0.72rem", color:sol.color, fontWeight:700, fontStyle:"italic", borderTop:`1px solid ${sol.color}20`, paddingTop:"10px" }}>
                  {sol.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SYSTEMS ───────────────────────────────────────────────── */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>
              Industry-Specific Systems
            </h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>
              Build Once. Deploy Many. Scale Forever.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {industrySystems.map((sys) => (
              <div key={sys.slug} style={{ background:"var(--navy-900)", borderRadius:"4px", overflow:"hidden" }}>
                <div style={{ padding:"28px 32px 0" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px" }}>
                    <div style={{ width:44, height:44, background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", fontWeight:700, color:"var(--gold-400)" }}>{sys.icon}</span></div>
                    <div>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--cream-50)", lineHeight:1.2 }}>{sys.title}</h3>
                      <p className="label-xs" style={{ color:"var(--gold-400)", marginTop:"3px" }}>{sys.subtitle}</p>
                    </div>
                  </div>
                </div>
                {/* Modules */}
                <div style={{ padding:"16px 32px 24px" }}>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"16px" }}>
                    {sys.modules.map((mod) => (
                      <span key={mod} style={{ fontSize:"0.72rem", fontWeight:600, color:"rgba(249,247,240,0.7)", background:"rgba(249,247,240,0.07)", padding:"4px 10px", borderRadius:"2px" }}>
                        {mod}
                      </span>
                    ))}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                    <div style={{ padding:"10px 12px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.15)", borderRadius:"2px" }}>
                      <p style={{ fontSize:"0.65rem", fontWeight:700, color:"#F87171", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"4px" }}>Problems Solved</p>
                      <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.55)" }}>{sys.problemsSolved}</p>
                    </div>
                    <div style={{ padding:"10px 12px", background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:"2px" }}>
                      <p style={{ fontSize:"0.65rem", fontWeight:700, color:"#34D399", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"4px" }}>Target Audience</p>
                      <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.55)" }}>{sys.targetAudience}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* ── FREE TOOLS SECTION ─────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background:"var(--navy-950)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <span className="gold-rule mb-5" style={{ display:"block" }} />
              <h2 className="display-xl mb-4" style={{ color:"var(--cream-50)" }}>
                Free Business Tools.<br/>
                <em className="not-italic gold-text">Yours to Use. Forever.</em>
              </h2>
              <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", marginBottom:"16px" }}>
                We give you tools that make your business look and run more professionally — completely free. No catch. No credit card. Just tools that work.
              </p>
              <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)", fontStyle:"italic" }}>
                Premium features (history, team access, integrations) available when you&apos;re ready to upgrade.
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {freeTools.map((tool) => (
                <a key={tool.slug} href={`https://${tool.subdomain}`} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 20px", background:"rgba(249,247,240,0.04)", border:`1px solid ${tool.color}30`, borderRadius:"4px", textDecoration:"none", transition:"background 0.2s" }}>
                  <div style={{ width:36, height:36, background:tool.color, borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", fontWeight:700, color:"#fff" }}>{tool.icon}</span></div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--cream-50)", marginBottom:"2px" }}>{tool.name}</p>
                    <p className="body-sm" style={{ color:"rgba(249,247,240,0.45)", fontSize:"0.78rem" }}>{tool.description}</p>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"4px", flexShrink:0 }}>
                    <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", background:"rgba(16,185,129,0.15)", color:"#34D399", padding:"3px 8px", borderRadius:"2px" }}>FREE</span>
                    <span style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.3)" }}>{tool.subdomain}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Free vs Premium table */}
          <div style={{ background:"rgba(249,247,240,0.02)", border:"1px solid rgba(249,247,240,0.08)", borderRadius:"4px", overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"1px solid rgba(249,247,240,0.08)" }}>
              <div style={{ padding:"16px 20px" }}>
                <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)" }}>Feature</p>
              </div>
              <div style={{ padding:"16px 20px", borderLeft:"1px solid rgba(249,247,240,0.08)", textAlign:"center" }}>
                <p className="label-xs" style={{ color:"#34D399" }}>Free Forever</p>
              </div>
              <div style={{ padding:"16px 20px", borderLeft:"1px solid rgba(249,247,240,0.08)", textAlign:"center" }}>
                <p className="label-xs" style={{ color:"var(--gold-400)" }}>Premium (Coming Soon)</p>
              </div>
            </div>
            {[
              ["Create invoices & receipts",         "✓ Unlimited",    "✓ Unlimited"],
              ["PDF download",                       "✓",              "✓"],
              ["Custom branding / logo",             "✓",              "✓ Advanced"],
              ["History & record keeping",           "—",              "✓"],
              ["Client / customer database",         "—",              "✓"],
              ["WhatsApp & email delivery",          "—",              "✓"],
              ["Team / multi-user access",           "—",              "✓"],
              ["Payment integration",                "—",              "✓"],
              ["Analytics & reporting",              "—",              "✓"],
            ].map(([feature, free, premium]) => (
              <div key={feature} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"1px solid rgba(249,247,240,0.05)" }}>
                <div style={{ padding:"12px 20px" }}>
                  <p style={{ fontSize:"0.82rem", color:"rgba(249,247,240,0.6)" }}>{feature}</p>
                </div>
                <div style={{ padding:"12px 20px", borderLeft:"1px solid rgba(249,247,240,0.05)", textAlign:"center" }}>
                  <p style={{ fontSize:"0.82rem", color: free === "—" ? "rgba(249,247,240,0.2)" : "#34D399", fontWeight: free !== "—" ? 600 : 400 }}>{free}</p>
                </div>
                <div style={{ padding:"12px 20px", borderLeft:"1px solid rgba(249,247,240,0.05)", textAlign:"center" }}>
                  <p style={{ fontSize:"0.82rem", color: premium === "—" ? "rgba(249,247,240,0.2)" : "var(--gold-400)", fontWeight: premium !== "—" ? 600 : 400 }}>{premium}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ARCHITECTURE ──────────────────────────────────────────── */}
      <section style={{ background:"var(--cream-50)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="gold-rule mb-5" style={{ display:"block" }} />
              <h2 className="display-xl mb-4" style={{ color:"var(--navy-900)" }}>
                One Platform.<br/>
                <em className="not-italic gold-text">Built to Scale.</em>
              </h2>
              <p className="body-lg" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"24px" }}>
                All systems run on a single powerful infrastructure — multi-tenant, role-based, cloud-native, and built for the African business environment.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {platformFeatures.map((f) => (
                  <div key={f.title} style={{ padding:"16px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"4px" }}>
                    <div style={{ width:32, height:32, background:"var(--navy-700)", borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"8px" }}><span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem", fontWeight:700, color:"var(--gold-400)" }}>{f.icon}</span></div>
                    <p style={{ fontWeight:700, fontSize:"0.82rem", color:"var(--navy-900)", marginBottom:"3px" }}>{f.title}</p>
                    <p style={{ fontSize:"0.75rem", color:"rgba(28,28,30,0.55)" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Architecture visual */}
            <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"32px" }}>
              <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"20px" }}>Platform Architecture</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                <div style={{ padding:"14px 16px", background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:"4px", textAlign:"center" }}>
                  <p style={{ fontWeight:700, fontSize:"0.85rem", color:"var(--gold-300)" }}>Central Platform</p>
                  <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Shared Core Infrastructure</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px" }}>
                  {["Hotel A", "Supermarket A", "Clinic B", "Retail Store", "Hotel B", "Your Business"].map((b) => (
                    <div key={b} style={{ padding:"10px 8px", background:"rgba(249,247,240,0.05)", border:"1px solid rgba(249,247,240,0.08)", borderRadius:"2px", textAlign:"center" }}>
                      <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.6)", fontWeight:500 }}>{b}</p>
                      <p style={{ fontSize:"0.6rem", color:"rgba(249,247,240,0.3)" }}>Your Data</p>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", justifyContent:"center", marginTop:"4px" }}>
                  {["Auth","Billing","Notifications","Analytics","File Storage","Settings"].map((feat) => (
                    <span key={feat} style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.4)", background:"rgba(249,247,240,0.04)", padding:"3px 8px", borderRadius:"2px", border:"1px solid rgba(249,247,240,0.08)" }}>{feat}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <FounderStrip />
      <WhyUs />

      {/* ── BLOG PREVIEW ───────────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background:"var(--cream-200)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="gold-rule mb-4" style={{ display:"block" }} />
              <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Latest Insights</h2>
            </div>
            <Link href="/blog" className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none" }}>All articles →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.slice(0,2).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"32px", height:"100%" }}>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"10px" }}>{post.category}</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"12px" }}>{post.title}</h3>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"16px" }}>{post.excerpt}</p>
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)" }}>{post.readTime} read · {post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="Your Growth. Our Mission."
        subtext="Reach out via email or phone. We'll map out the exact system your business needs, show you the ROI you can expect, and give you a clear proposal within 24 hours."
      />
    </>
  );
}

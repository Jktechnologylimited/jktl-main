import type { Metadata } from "next";
import Link from "next/link";
import { seoTiers, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "SEO Services for US Small Businesses — All 50 States | JK Technology Limited",
  description: "Monthly SEO retainers for coaches, consultants, law firms, and service businesses across all 50 US states. Technical SEO, content strategy, local SEO. From $600/month.",
  keywords: ["SEO services USA", "SEO for small business", "local SEO all 50 states", "monthly SEO retainer", "SEO consultant USA"],
  alternates: { canonical: "https://jktl.com.ng/services/seo" },
};

export default function SEOPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"14px" }}>SEO &amp; Traffic Growth</p>
            <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)" }}>
              Stop Paying for Every Click.<br/>
              <em className="not-italic gold-text">Build an Asset That Compounds.</em>
            </h1>
            <p className="body-lg" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"560px", marginBottom:"32px" }}>
              We handle your complete US SEO strategy — technical foundation, content, local visibility across all 50 states, and authority building — so your ideal clients find you first.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Book Free SEO Audit
              </a>
              <Link href="/blog/seo-small-business-2026" className="btn-outline-cream">
                Read Our SEO Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paid vs Organic */}
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-5" style={{ color:"var(--navy-900)" }}>The Compounding Advantage of Organic Traffic</h2>
            {[
              "Paid ads stop the moment you stop paying. Organic search is the opposite — it compounds over time and continues working without ongoing media spend.",
              "A page that reaches position one for a high-intent keyword generates qualified leads every single month indefinitely. The businesses that invested in SEO three years ago are now virtually immune to ad cost inflation.",
              "Our SEO retainers are built specifically for the US market — covering state-level, city-level, and national search visibility depending on how your business serves clients.",
            ].map((p, i) => <p key={i} className="body-md" style={{ color:"rgba(28,28,30,0.62)", marginBottom:"14px" }}>{p}</p>)}
          </div>
          {/* Visual comparison */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"32px" }}>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"20px" }}>Traffic Over 12 Months</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              {[
                { label:"Paid Ads", months:[10,10,10,10,0,0,0,0,0,0,0,0], color:"#EF4444" },
                { label:"SEO",      months:[2,4,8,15,24,34,46,57,66,74,82,91], color:"var(--gold-400)" },
              ].map(type => (
                <div key={type.label}>
                  <p style={{ fontWeight:700, fontSize:"0.8rem", color:type.color, marginBottom:"10px" }}>{type.label}</p>
                  <div style={{ display:"flex", gap:"3px", alignItems:"flex-end", height:"60px" }}>
                    {type.months.map((h, i) => (
                      <div key={i} style={{ flex:1, height:`${(h/91)*100}%`, minHeight:"2px", background:type.color, opacity: h === 0 ? 0.12 : 0.8, borderRadius:"1px 1px 0 0" }} />
                    ))}
                  </div>
                  <p className="label-xs" style={{ color:"rgba(249,247,240,0.2)", marginTop:"6px" }}>Months 1–12</p>
                </div>
              ))}
            </div>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)", marginTop:"18px", borderTop:"1px solid rgba(249,247,240,0.07)", paddingTop:"14px" }}>
              SEO compounds. Paid traffic stops when spend stops.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ background:"var(--cream-100)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="display-lg mb-10 text-center" style={{ color:"var(--navy-900)" }}>What&apos;s Included in Monthly SEO Retainers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title:"Technical SEO",    icon:"⚙️", items:["Monthly technical audit","Crawl error remediation","Core Web Vitals monitoring","Structured data updates"] },
              { title:"Content Strategy", icon:"📝", items:["Monthly keyword research","Content calendar planning","SEO blog post writing","Existing page optimisation"] },
              { title:"Local SEO",        icon:"📍", items:["Google Business Profile management","Local citation building","Review strategy","All 50 US states coverage"] },
              { title:"Authority",        icon:"🔗", items:["White-hat link acquisition","Guest post outreach","Competitor backlink analysis","Digital PR opportunities"] },
            ].map(cat => (
              <div key={cat.title} style={{ background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px", padding:"28px 24px" }}>
                <div style={{ fontSize:"1.75rem", marginBottom:"12px" }}>{cat.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"14px" }}>{cat.title}</h3>
                <ul className="check-list" style={{ listStyle:"none" }}>
                  {cat.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainer tiers */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="display-lg mb-2" style={{ color:"var(--cream-50)" }}>SEO Retainer Plans</h2>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)" }}>Minimum 3-month engagement. Cancel anytime after that.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background:"rgba(249,247,240,0.06)" }}>
            {seoTiers.map(tier => (
              <div key={tier.name} style={{ padding:"36px 32px", background: tier.highlight ? "var(--navy-700)" : "var(--navy-800)", position:"relative" }}>
                {tier.highlight && (
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />
                )}
                <p className="label-xs" style={{ color: tier.highlight ? "var(--gold-400)" : "rgba(249,247,240,0.35)", marginBottom:"8px" }}>{tier.name}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.5rem", color:"var(--cream-50)", lineHeight:1 }}>{tier.price}</p>
                <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"24px" }}>{tier.period}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px" }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
                      <span style={{ color:"var(--gold-400)", flexShrink:0, fontSize:"0.8rem" }}>✓</span>
                      <span className="body-sm" style={{ color:"rgba(249,247,240,0.6)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className={tier.highlight ? "btn-gold" : "btn-outline-cream"} style={{ width:"100%", justifyContent:"center" }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="Rank Higher. Pay Less Per Lead. Keep Compounding."
        subtext="Book a free SEO audit on Zoom. We'll review your current rankings, identify your top keyword opportunities, and show you what a 90-day roadmap looks like for your specific market."
      />
    </>
  );
}

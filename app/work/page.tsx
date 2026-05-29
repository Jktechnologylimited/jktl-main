import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BeforeAfter from "@/components/ui/BeforeAfter";
import { caseStudies, testimonial, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | JK Technology Limited",
  description: "Real client results — K.K. Ubani & Co. (law firm SEO), Eljards Services (solar & consulting website), and Refinish Port Harcourt (auto detailing website). Measurable outcomes across every niche.",
  alternates: { canonical: "https://jktl.com.ng/work" },
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            Real Clients.<br/>
            <em className="not-italic gold-text">Real Results.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            Law firms, solar energy companies, business consultants, auto detailing businesses.
            Every project built to rank, convert, and grow.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background:"var(--gold-400)", padding:"18px 32px" }}>
        <div className="max-w-7xl mx-auto px-8" style={{ display:"flex", flexWrap:"wrap", gap:"36px", justifyContent:"center" }}>
          {[
            { v:"3",         l:"Industries served" },
            { v:"Page 1",    l:"Rankings for K.K. Ubani & Co." },
            { v:"21+",       l:"Google reviews for Refinish" },
            { v:"15+",       l:"SEO-optimised pages built" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.6rem", color:"var(--navy-900)", lineHeight:1 }}>{s.v}</p>
              <p className="label-xs" style={{ color:"rgba(6,14,42,0.65)", marginTop:"3px" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case studies */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8 space-y-28">
          {caseStudies.map((cs, i) => (
            <div key={cs.slug}>

              {/* Case study header */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:"20px", marginBottom:"36px", flexWrap:"wrap" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.5rem", fontWeight:300, color:"var(--cream-300)", lineHeight:1, flexShrink:0 }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"6px" }}>
                    <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)" }}>{cs.category}</p>
                    <span style={{ color:"var(--cream-300)", fontSize:"0.7rem" }}>·</span>
                    <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)" }}>{cs.location}</p>
                    <span style={{ color:"var(--cream-300)", fontSize:"0.7rem" }}>·</span>
                    <a href={cs.websiteUrl} target="_blank" rel="noopener noreferrer" className="label-xs" style={{ color:"var(--navy-500)", textDecoration:"underline", textUnderlineOffset:"3px" }}>
                      {cs.website}
                    </a>
                  </div>
                  <h2 className="display-lg" style={{ color:"var(--navy-900)", marginBottom:"4px" }}>{cs.client}</h2>
                  <p className="label-xs" style={{ color:"var(--navy-500)" }}>{cs.service} · {cs.niche}</p>
                </div>
              </div>

              {/* ── K.K. UBANI: Before/After SEO slider ── */}
              {cs.hasSEOScreenshots && (
                <div style={{ marginBottom:"32px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                    <span className="gold-rule" style={{ width:"32px" }} />
                    <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)" }}>
                      SEO Performance — Before &amp; After
                    </p>
                  </div>
                  <BeforeAfter
                    beforeSrc="/work/kk-ubani-before.jpg"
                    afterSrc="/work/kk-ubani-after.jpg"
                    beforeAlt="K.K. Ubani & Co. Google rankings before SEO work"
                    afterAlt="K.K. Ubani & Co. Google rankings after JKTL SEO work"
                    beforeLabel="Before SEO"
                    afterLabel="After SEO"
                    height={400}
                  />
                  <p style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.3)", textAlign:"center", marginTop:"8px" }}>
                    ← Drag to compare Google rankings before and after SEO work
                  </p>
                </div>
              )}

              {/* ── ELJARDS + REFINISH: Website screenshot showcase ── */}
              {cs.hasWebsiteScreenshot && (
                <div style={{ marginBottom:"32px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                    <span className="gold-rule" style={{ width:"32px" }} />
                    <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)" }}>Website Delivered</p>
                  </div>
                  <div style={{ position:"relative", borderRadius:"4px", overflow:"hidden", background:"var(--cream-200)", border:"1px solid var(--cream-300)", minHeight:"320px" }}>
                    {/* Real screenshot — add image to /public/work/[slug]-website.jpg */}
                    <div style={{ width:"100%", height:"320px", position:"relative" }}>
                      {/* Placeholder — replace with real Image tag once you add the screenshot */}
                      <div style={{
                        width:"100%", height:"100%",
                        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                        gap:"14px", background:`linear-gradient(135deg, ${cs.accentLight} 0%, var(--cream-200) 100%)`,
                      }}>
                        <div style={{
                          width:"64px", height:"64px", borderRadius:"50%",
                          background: cs.color, display:"flex", alignItems:"center", justifyContent:"center", opacity:0.2,
                        }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="14" rx="1"/>
                            <path d="M8 21h8M12 17v4"/>
                          </svg>
                        </div>
                        <div style={{ textAlign:"center" }}>
                          <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)", marginBottom:"6px" }}>
                            {cs.imageInstructions}
                          </p>
                          <a href={cs.websiteUrl} target="_blank" rel="noopener noreferrer"
                            className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"underline", textUnderlineOffset:"3px" }}>
                            View live site: {cs.website} →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Live site badge */}
                    <div style={{ position:"absolute", bottom:"12px", right:"12px" }}>
                      <a href={cs.websiteUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"var(--navy-900)", color:"var(--cream-50)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"6px 14px", borderRadius:"2px", textDecoration:"none" }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", flexShrink:0 }} />
                        Live Site
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Overview */}
              <div style={{ marginBottom:"28px" }}>
                <p className="body-lg" style={{ color:"rgba(28,28,30,0.65)", maxWidth:"800px" }}>{cs.overview}</p>
              </div>

              {/* Before / After cards */}
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div style={{ padding:"28px 30px", background:"rgba(239,68,68,0.04)", border:"1px solid rgba(239,68,68,0.12)", borderRadius:"4px" }}>
                  <p style={{ fontWeight:700, fontSize:"0.78rem", color:"#DC2626", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>
                    {cs.before.title}
                  </p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {cs.before.points.map((p) => (
                      <li key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                        <span style={{ color:"#EF4444", flexShrink:0, marginTop:"1px" }}>×</span>
                        <span className="body-sm" style={{ color:"rgba(28,28,30,0.65)" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding:"28px 30px", background:"rgba(16,185,129,0.04)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:"4px" }}>
                  <p style={{ fontWeight:700, fontSize:"0.78rem", color:"#059669", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"16px" }}>
                    {cs.after.title}
                  </p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {cs.after.points.map((p) => (
                      <li key={p} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                        <span style={{ color:"#10B981", flexShrink:0, marginTop:"1px" }}>✓</span>
                        <span className="body-sm" style={{ color:"rgba(28,28,30,0.65)" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results metrics */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"10px", marginBottom:"20px" }}>
                {cs.results.map((r) => (
                  <div key={r.label} style={{ padding:"20px 22px", background:"var(--navy-900)", borderRadius:"4px", textAlign:"center" }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"5px" }}>{r.value}</p>
                    <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>{r.label}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"16px" }}>
                {cs.tags.map((tag) => (
                  <span key={tag} style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(28,28,30,0.45)", background:"var(--cream-200)", padding:"4px 10px", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Client testimonial (if available) */}
              {cs.testimonial && (
                <div style={{ padding:"22px 26px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderLeft:`3px solid ${cs.color}`, borderRadius:"0 4px 4px 0", marginBottom:"16px" }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"var(--navy-900)", lineHeight:1.55, fontStyle:"italic", marginBottom:"10px" }}>
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:cs.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.72rem", fontWeight:700, color:"#fff", flexShrink:0 }}>
                      {cs.testimonial.initials}
                    </div>
                    <div>
                      <p style={{ fontWeight:700, fontSize:"0.82rem", color:"var(--navy-900)" }}>{cs.testimonial.name}</p>
                      <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)", marginTop:"1px" }}>{cs.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA inline */}
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer"
                className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"6px" }}>
                Want similar results for your business? Book a free Zoom audit →
              </a>

              {/* Divider between case studies */}
              {i < caseStudies.length - 1 && (
                <div className="gold-rule-full" style={{ marginTop:"60px" }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* K.K. Ubani testimonial full feature */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <div className="ornament mb-8" style={{ color:"var(--gold-400)" }}>
            <span className="label-xs">From the Client</span>
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.3rem,2.5vw,2rem)", color:"var(--navy-900)", lineHeight:1.55, fontStyle:"italic", marginBottom:"28px" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"var(--navy-900)", border:"2px solid var(--gold-400)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.8rem", color:"var(--gold-400)", marginBottom:"6px" }}>
              {testimonial.initials}
            </div>
            <p style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)" }}>{testimonial.name}</p>
            <p className="label-xs" style={{ color:"rgba(28,28,30,0.45)" }}>{testimonial.role} · {testimonial.firm}</p>
            <a href="https://kkubaniandco.com" target="_blank" rel="noopener noreferrer" className="label-xs" style={{ color:"var(--navy-500)", textDecoration:"underline", textUnderlineOffset:"3px", marginTop:"4px" }}>
              {testimonial.website}
            </a>
            <div style={{ marginTop:"12px", padding:"5px 14px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:"2px" }}>
              <p className="label-xs" style={{ color:"var(--gold-400)" }}>{testimonial.metric}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Niche diversity section */}
      <section style={{ background:"var(--navy-900)", padding:"64px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="display-lg mb-4" style={{ color:"var(--cream-50)" }}>
            We Build for Any Niche.
          </h2>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.5)", maxWidth:"520px", margin:"0 auto 32px" }}>
            The strategy changes. The quality standard doesn&apos;t.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center" }}>
            {["Law Firms","Solar Energy","Business Consulting","Auto Detailing","Medical Practices","Gyms & Fitness","Coaches & Consultants","E-commerce","Real Estate","Digital Agencies","Restaurants","Home Services"].map((niche) => (
              <span key={niche} style={{ fontSize:"0.82rem", fontWeight:500, color:"rgba(249,247,240,0.6)", background:"rgba(249,247,240,0.06)", padding:"8px 16px", border:"1px solid rgba(249,247,240,0.1)", borderRadius:"2px" }}>
                {niche}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA heading="Your Business Could Be Next." subtext="Reach out via email or phone. We'll assess your current digital presence and tell you honestly what results you can expect, what we'd build, and what it would cost." />
    </>
  );
}

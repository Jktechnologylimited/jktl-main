import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, whyUs, usStates } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "About JK Technology Limited | AI Business Website Design & SEO",
  description: "JK Technology Limited is a results-driven web design and SEO studio with 6+ years of experience serving US businesses across all 50 states. Meet the founder.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            We Build Websites That Work.<br/>
            <em className="not-italic gold-text">Not Websites That Look Nice.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            JK Technology Limited is a web design and SEO studio that operates at the intersection of strategy, copy, and technology — because that&apos;s where results actually live.
          </p>
        </div>
      </section>

      {/* ── MEET THE FOUNDER ── */}
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Photo + credentials */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"24px" }}>
              {/* Photo container */}
              <div style={{ position:"relative" }}>
                {/* Gold border frame */}
                <div style={{
                  position:"absolute", top:"12px", left:"12px", right:"-12px", bottom:"-12px",
                  border:"1px solid var(--gold-400)", borderRadius:"4px", opacity:0.4,
                  zIndex:0,
                }} />
                {/* Photo — replace /owner.jpg with real image */}
                <div style={{
                  width:"320px", height:"380px", borderRadius:"4px", overflow:"hidden",
                  background:"var(--navy-800)", position:"relative", zIndex:1,
                }}>
                  {/* Real photo: add /public/owner.jpg and uncomment the Image tag below */}
                  {/* <Image src="/owner.jpg" alt="Founder of JK Technology Limited" fill style={{ objectFit:"cover", objectPosition:"top" }} /> */}

                  {/* Placeholder — remove this div once you add owner.jpg */}
                  <div style={{
                    width:"100%", height:"100%", display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"center", gap:"16px",
                    background:"linear-gradient(160deg, var(--navy-700) 0%, var(--navy-900) 100%)",
                  }}>
                    {/* Silhouette icon */}
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ opacity:0.25 }}>
                      <circle cx="12" cy="8" r="4" stroke="var(--gold-400)" strokeWidth="1"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--gold-400)" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <div style={{ textAlign:"center", padding:"0 20px" }}>
                      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"6px" }}>
                        Add Your Photo
                      </p>
                      <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.3)", lineHeight:1.5 }}>
                        Save your headshot as<br/>
                        <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.65rem", color:"rgba(249,247,240,0.5)" }}>/public/owner.jpg</code><br/>
                        then uncomment the Image tag
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name card beneath photo */}
              <div style={{ paddingLeft:"4px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.5rem", color:"var(--navy-900)", lineHeight:1.1, marginBottom:"4px" }}>
                  {/* Replace with the founder's real name */}
                  John K.
                </p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--navy-500)", marginBottom:"16px" }}>
                  Founder &amp; Lead Strategist · JK Technology Limited
                </p>
                {/* Credential badges */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {[
                    "6+ Years Web Design",
                    "SEO Specialist",
                    "AI Website Pioneer",
                    "US Market Expert",
                  ].map(badge => (
                    <span key={badge} style={{
                      fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase",
                      color:"var(--navy-600)", background:"var(--cream-200)",
                      padding:"4px 12px", borderRadius:"2px", border:"1px solid var(--cream-300)",
                    }}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Story text */}
            <div>
              <span className="gold-rule mb-5" style={{ display:"block" }} />
              <h2 className="display-lg mb-6" style={{ color:"var(--navy-900)" }}>
                Meet the Founder
              </h2>
              {[
                "I founded JK Technology Limited in 2019 after seeing the same problem repeat itself across dozens of businesses: beautiful websites that ranked nowhere, converted nobody, and justified their existence by looking good in a portfolio screenshot.",
                "I had spent years working across web design, copywriting, and digital marketing — and the thing I noticed most was that the professionals handling each discipline rarely spoke to each other. The designer didn't know SEO. The developer didn't think about copy. The SEO consultant came in after launch and found a site that was structurally impossible to rank.",
                "I built JKTL to do all three in a single integrated engagement — where keyword strategy influences site architecture before design begins, where every word is written with the client's decision psychology in mind, and where the technical foundation is built for search from the ground up.",
                "Six years and 50+ projects later, that approach continues to produce results that a fragmented team of specialists rarely matches. I work with a small number of clients at any time. Every project gets my direct attention — not a junior designer, not an outsourced contractor.",
                "If you want a business partner who cares about your revenue, not just your approval of the design, I'd welcome a conversation.",
              ].map((p, i) => (
                <p key={i} className="body-md" style={{ color:"rgba(28,28,30,0.62)", marginBottom:"16px" }}>{p}</p>
              ))}
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginTop:"8px" }}>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Book a Zoom Call
                </a>
                <a href={`mailto:${siteConfig.email}`} className="btn-outline-navy">
                  Email Me Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:"var(--navy-900)", padding:"56px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v:"2019",   l:"Year founded",          s:"Over half a decade in business" },
              { v:"50+",    l:"Projects delivered",     s:"US, UK, Canada, Nigeria" },
              { v:"All 50", l:"US states served",       s:"100% remote delivery" },
              { v:"100%",   l:"Copy written in-house",  s:"No templates, no outsourcing" },
            ].map(s => (
              <div key={s.l} style={{ padding:"24px 20px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"5px" }}>{s.v}</p>
                <p style={{ fontWeight:600, fontSize:"0.85rem", color:"var(--cream-50)", marginBottom:"3px" }}>{s.l}</p>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)" }}>{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section style={{ background:"var(--cream-100)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="display-lg mb-3" style={{ color:"var(--navy-900)" }}>The Approach</h2>
            <p className="body-md" style={{ color:"rgba(28,28,30,0.5)", maxWidth:"480px", margin:"0 auto" }}>Three principles that govern every project.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n:"I",   title:"Strategy precedes design",    body:"Keyword research, competitor analysis, and ideal client profiling happen before any design work begins. Design serves strategy — not the reverse." },
              { n:"II",  title:"We write your copy",          body:"Every headline, body paragraph, CTA, and meta description is written by us. You fill in the brief. We do the research and writing. Included in every project." },
              { n:"III", title:"SEO from the first decision", body:"Keyword architecture, URL structure, heading hierarchy, schema markup, and page speed are determined before any page is designed. You launch with a site Google already understands." },
            ].map(item => (
              <div key={item.n} style={{ padding:"32px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:300, color:"var(--gold-400)", marginBottom:"14px" }}>{item.n}</p>
                <h3 style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"10px" }}>{item.title}</h3>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why JKTL */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="display-lg mb-2" style={{ color:"var(--cream-50)" }}>Why Choose JKTL</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:"rgba(249,247,240,0.06)" }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ padding:"32px", background:"var(--navy-800)" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:300, color:"rgba(249,247,240,0.07)", lineHeight:1, marginBottom:"14px" }}>
                  {String(i+1).padStart(2,"0")}
                </p>
                <h3 style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--cream-50)", marginBottom:"8px", letterSpacing:"0.02em" }}>{item.title}</h3>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.45)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* US states */}
      <section style={{ background:"var(--cream-50)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-8">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Serving All 50 US States</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>100% remote delivery. We have never needed to meet a client in person to deliver exceptional results.</p>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {usStates.map(s => (
              <span key={s} style={{ fontSize:"0.78rem", color:"rgba(28,28,30,0.6)", background:"var(--cream-100)", padding:"5px 12px", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Availability */}
      <section style={{ background:"var(--cream-100)", padding:"48px 32px", textAlign:"center" }}>
        <div className="max-w-xl mx-auto px-8">
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)", color:"#10B981", fontSize:"0.82rem", fontWeight:600, padding:"8px 18px", borderRadius:"2px", marginBottom:"16px" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#10B981", display:"inline-block" }} />
            Currently accepting new US clients
          </div>
          <p className="body-md" style={{ color:"rgba(28,28,30,0.6)", marginBottom:"20px" }}>
            I keep my client roster small so every project gets full attention. If you&apos;re interested in working together, start with a free Zoom audit.
          </p>
          <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display:"inline-flex" }}>
            Book a Free Zoom Audit
          </a>
        </div>
      </section>

      <CTA heading="Work With Someone Who Cares About Your Revenue." subtext="Book a free 30-minute Zoom audit. No pitch, no pressure — an honest assessment of your digital presence and a clear plan for what comes next." />
    </>
  );
}

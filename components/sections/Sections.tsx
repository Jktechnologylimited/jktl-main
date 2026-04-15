import Link from "next/link";
import { processSteps, services, testimonial, whyUs, siteConfig } from "@/data/index";

// ─── HERO ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section style={{ background:"var(--navy-950)", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden", position:"relative", paddingTop:"120px" }}>
      {/* Grid */}
      <div style={{ position:"absolute", inset:0, opacity:0.035, backgroundImage:"linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }} />
      {/* Glow */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"65vw", height:"65vw", background:"radial-gradient(circle,rgba(26,49,110,0.5) 0%,transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:"-10%", width:"40vw", height:"40vw", background:"radial-gradient(circle,rgba(11,22,64,0.6) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div className="max-w-7xl mx-auto px-8 pb-0 w-full relative z-10">
        {/* Eyebrow */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px" }}>
          <span className="gold-rule" />
          <span className="label-xs" style={{ color:"var(--gold-400)" }}>
            AI-Powered Websites · All 50 US States · 6+ Years Experience
          </span>
        </div>

        {/* H1 */}
        <h1 className="display-hero animate-fade-up" style={{ color:"var(--cream-50)", marginBottom:"28px", maxWidth:"900px" }}>
          Websites That{" "}
          <em className="not-italic gold-text">Rank, Convert,</em>
          <br className="hidden md:block" />
          {" "}and Grow Your Business.
        </h1>

        <p className="body-lg animate-fade-up d2" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"580px", marginBottom:"40px" }}>
          JK Technology Limited builds AI-enhanced business websites, high-converting landing pages, and SEO strategies that drive real, measurable growth — for service businesses across the United States.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up d3" style={{ display:"flex", flexWrap:"wrap", gap:"14px", marginBottom:"64px" }}>
          <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Book a Free Zoom Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <Link href="/work" className="btn-outline-cream">
            View Our Work
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream">
            Email Us
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up d4" style={{ borderTop:"1px solid rgba(201,168,76,0.15)", paddingTop:"28px", paddingBottom:"56px", display:"flex", flexWrap:"wrap", gap:"36px" }}>
          {[
            { value:"6+",       label:"Years of experience" },
            { value:"50+",      label:"Projects delivered" },
            { value:"8–14%",    label:"Landing page conversion rate" },
            { value:"All 50",   label:"US states served" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", fontWeight:300, color:"var(--cream-50)", lineHeight:1, marginBottom:"4px" }}>{s.value}</p>
              <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────
export function Problem() {
  return (
    <section className="section-pad" style={{ background:"var(--cream-50)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-xl mb-6" style={{ color:"var(--navy-900)" }}>
              Your Website Should Be Your Best Salesperson.{" "}
              <span style={{ color:"rgba(6,14,42,0.35)" }}>For Most Businesses, It Isn&apos;t.</span>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {[
                { t:"Invisible on Google.", b:"You're on page three or four for searches your ideal clients are making right now. Your competitors — some clearly inferior — are above you." },
                { t:"Buying every visitor with ads.", b:"$500, $1,500, $3,000 a month just to stay visible. The moment you pause, the leads stop. You're renting traffic instead of owning it." },
                { t:"Traffic that doesn't convert.", b:"Visitors land and leave. Something in the experience is breaking down — layout, copy, trust signals, the CTA — and you don't know what." },
              ].map((item) => (
                <div key={item.t} style={{ padding:"16px 20px", background:"rgba(239,68,68,0.04)", border:"1px solid rgba(239,68,68,0.1)", borderRadius:"2px" }}>
                  <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)", marginBottom:"4px" }}>{item.t}</p>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{item.b}</p>
                </div>
              ))}
            </div>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.4)", marginTop:"20px", fontStyle:"italic" }}>
              This is a strategy problem. It&apos;s what we fix.
            </p>
          </div>

          {/* Right panel — terminal aesthetic */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"32px", fontFamily:"'JetBrains Mono',monospace" }}>
            <p style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.25)", marginBottom:"20px" }}>// typical-website-reality.js</p>
            {[
              { k:"ranking",       v:"page 4+",         color:"#F87171" },
              { k:"organic_traffic", v:"< 40/month",    color:"#F87171" },
              { k:"conversion_rate", v:"0.7%",          color:"#F87171" },
              { k:"monthly_leads",  v:"2–3",            color:"#F87171" },
              { k:"monthly_ad_spend", v:"$1,800+",      color:"#F87171" },
            ].map((item) => (
              <div key={item.k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(249,247,240,0.05)", fontSize:"0.8rem" }}>
                <span style={{ color:"rgba(249,247,240,0.4)" }}>{item.k}</span>
                <span style={{ color:item.color, fontWeight:600 }}>{item.v}</span>
              </div>
            ))}
            <div style={{ marginTop:"20px", padding:"14px 16px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"2px" }}>
              <p style={{ fontSize:"0.72rem", color:"var(--gold-300)", fontWeight:600, marginBottom:"4px" }}>// after jktl</p>
              <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.5)" }}>Page 1 rankings · 8–14% conversion · Predictable organic leads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES PREVIEW ─────────────────────────────────────────────────────────
export function ServicesPreview() {
  return (
    <section className="section-pad" style={{ background:"var(--navy-900)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-xl" style={{ color:"var(--cream-50)" }}>
              What We Build
            </h2>
          </div>
          <Link href="/services" className="label-xs" style={{ color:"var(--gold-400)", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
            All services
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background:"rgba(249,247,240,0.06)" }}>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={{ textDecoration:"none", display:"block" }}>
              <div style={{ padding:"40px 36px", background: s.highlight ? "var(--navy-700)" : "var(--navy-800)", height:"100%", display:"flex", flexDirection:"column", transition:"background 0.2s", position:"relative" }}>
                {s.highlight && (
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />
                )}
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"12px" }}>{s.tier}</p>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.6rem", color:"var(--cream-50)", lineHeight:1.15, marginBottom:"14px" }}>
                  {s.shortLabel}
                </h3>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.5)", flex:1, marginBottom:"28px" }}>{s.description}</p>
                <div style={{ borderTop:"1px solid rgba(249,247,240,0.08)", paddingTop:"20px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                  <div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:300, color:"var(--cream-50)", lineHeight:1 }}>
                      {s.price}{s.priceTo !== s.price && <span style={{ fontSize:"1rem", color:"rgba(249,247,240,0.4)" }}> – {s.priceTo}</span>}
                    </p>
                    <p className="label-xs" style={{ color:"rgba(249,247,240,0.25)", marginTop:"4px" }}>{s.delivery}</p>
                  </div>
                  <span className="label-xs" style={{ color:"var(--gold-400)", display:"flex", alignItems:"center", gap:"4px" }}>
                    Details
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
export function Process() {
  return (
    <section className="section-pad" style={{ background:"var(--cream-100)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-xl mb-5" style={{ color:"var(--navy-900)" }}>
              From First Zoom Call<br/>
              <em className="not-italic gold-text">to Live in 14 Days.</em>
            </h2>
            <p className="body-lg" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"32px" }}>
              A transparent, structured process — no guesswork, no delays, no disappearing after delivery.
            </p>
            <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start with a Free Zoom Audit
            </a>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {processSteps.map((step) => (
              <div key={step.number} style={{ display:"flex", gap:"20px", padding:"22px 24px", background:"var(--cream-50)", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, flexShrink:0, width:"24px" }}>{step.number}</span>
                <div>
                  <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)", marginBottom:"5px" }}>{step.title}</p>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL — K.K. Ubani & Co. ─────────────────────────────────────────
export function TestimonialSection() {
  return (
    <section className="section-pad" style={{ background:"var(--navy-950)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:"linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }} />
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <div className="ornament mb-12" style={{ color:"var(--gold-400)" }}>
          <span className="label-xs">Client Voice — Law Firm · Port Harcourt</span>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.4rem,3vw,2.4rem)", color:"var(--cream-50)", lineHeight:1.5, marginBottom:"40px", fontStyle:"italic" }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:"var(--navy-700)", border:"2px solid var(--gold-400)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--gold-400)", marginBottom:"6px" }}>
            {testimonial.initials}
          </div>
          <p style={{ fontWeight:600, fontSize:"0.95rem", color:"var(--cream-50)" }}>{testimonial.name}</p>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>{testimonial.role} · {testimonial.firm}</p>
          <a href="https://kkubaniandco.com" target="_blank" rel="noopener noreferrer" className="label-xs" style={{ color:"rgba(249,247,240,0.3)", textDecoration:"underline", textUnderlineOffset:"3px" }}>
            {testimonial.website}
          </a>
          <div style={{ marginTop:"12px", padding:"6px 16px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"2px" }}>
            <p className="label-xs" style={{ color:"var(--gold-300)" }}>{testimonial.metric}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ───────────────────────────────────────────────────────────────────
export function WhyUs() {
  return (
    <section className="section-pad" style={{ background:"var(--cream-50)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-14">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-xl" style={{ color:"var(--navy-900)" }}>
              Why Discerning Businesses<br/>
              <em className="not-italic gold-text">Choose JKTL.</em>
            </h2>
          </div>
          <p className="body-lg" style={{ color:"rgba(28,28,30,0.55)" }}>
            The difference between a $300 website and a $3,000 website is not the design. It is the strategy, the copy, the SEO, and the experience of the team delivering it.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:"var(--cream-300)" }}>
          {whyUs.map((item, i) => (
            <div key={i} style={{ padding:"32px", background:"var(--cream-50)" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:300, color:"var(--cream-300)", lineHeight:1, marginBottom:"16px" }}>
                {String(i+1).padStart(2,"0")}
              </p>
              <h3 style={{ fontWeight:600, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"10px", letterSpacing:"0.02em" }}>{item.title}</h3>
              <p className="body-sm" style={{ color:"rgba(28,28,30,0.56)" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function CTA({ heading = "Your Clients Are Searching for You Right Now.", subtext = "Book a free 30-minute Zoom audit. We'll review your current digital presence, identify your top three revenue opportunities, and tell you exactly what we'd build. No pitch. No pressure." }: { heading?: string; subtext?: string }) {
  return (
    <section style={{ background:"var(--navy-900)", padding:"100px 32px", textAlign:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"500px", height:"250px", background:"radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"relative", zIndex:1, maxWidth:"640px", margin:"0 auto" }}>
        <div className="ornament mb-8" style={{ color:"var(--gold-400)" }}>
          <span className="label-xs">Begin</span>
        </div>
        <h2 className="display-xl mb-5" style={{ color:"var(--cream-50)" }}>{heading}</h2>
        <p className="body-lg" style={{ color:"rgba(249,247,240,0.5)", marginBottom:"36px" }}>{subtext}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"14px", justifyContent:"center", marginBottom:"20px" }}>
          <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Book Free Zoom Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream">
            Email Us
          </a>
        </div>
        <p className="label-xs" style={{ color:"rgba(249,247,240,0.2)" }}>
          Free consultation · Proposal within 24 hours · No obligations
        </p>
      </div>
    </section>
  );
}

// ─── FOUNDER STRIP ────────────────────────────────────────────────────────────
// Compact trust section showing the real person behind JKTL.
// Appears on the homepage between testimonial and Why Us.
export function FounderStrip() {
  return (
    <section style={{ background:"var(--cream-200)", padding:"64px 32px", borderTop:"1px solid var(--cream-300)", borderBottom:"1px solid var(--cream-300)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"32px" }}>

          {/* Ornament */}
          <div className="ornament" style={{ color:"var(--gold-400)", width:"100%", maxWidth:"400px" }}>
            <span className="label-xs">The person behind JKTL</span>
          </div>

          {/* Photo + text row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"32px", alignItems:"center", justifyContent:"center", maxWidth:"800px", textAlign:"center" }}>

            {/* Photo circle */}
            <div style={{ position:"relative", flexShrink:0 }}>
              {/* Decorative gold ring */}
              <div style={{
                position:"absolute", inset:"-6px", borderRadius:"50%",
                border:"1px solid var(--gold-400)", opacity:0.45,
              }} />
              {/* Photo */}
              <div style={{
                width:"120px", height:"120px", borderRadius:"50%", overflow:"hidden",
                background:"var(--navy-800)", position:"relative",
                boxShadow:"0 8px 32px rgba(6,14,42,0.18)",
              }}>
                {/*
                  ── HOW TO ADD YOUR PHOTO ──────────────────────────────────
                  1. Save your headshot as /public/owner.jpg
                     (square crop, min 300×300px, clear face visible)
                  2. Replace the placeholder div below with:

                  <Image
                    src="/owner.jpg"
                    alt="John K. — Founder of JK Technology Limited"
                    fill
                    style={{ objectFit:"cover", objectPosition:"top" }}
                  />

                  3. Import Image at the top: import Image from "next/image";
                  ────────────────────────────────────────────────────────── */}
                <div style={{
                  width:"100%", height:"100%", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  background:"linear-gradient(135deg, var(--navy-700), var(--navy-900))",
                }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" style={{ opacity:0.3 }}>
                    <circle cx="12" cy="8" r="4" stroke="var(--gold-400)" strokeWidth="1"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--gold-400)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ textAlign:"left", maxWidth:"560px" }}>
              <p style={{
                fontFamily:"'Cormorant Garamond',serif", fontWeight:400,
                fontSize:"clamp(1.2rem,2vw,1.6rem)", color:"var(--navy-900)",
                lineHeight:1.4, marginBottom:"10px",
              }}>
                &ldquo;I founded JKTL because I was tired of watching great businesses stay invisible online. Every client I work with gets my direct attention — from the first Zoom call to the day we launch.&rdquo;
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", flexWrap:"wrap" }}>
                <div>
                  {/* Replace "John K." with the real founder name */}
                  <p style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--navy-900)", letterSpacing:"0.03em" }}>
                    John K.
                  </p>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginTop:"2px" }}>
                    Founder · JK Technology Limited · 6+ Years
                  </p>
                </div>
                <a href="/about" style={{ marginLeft:"auto" }}>
                  <span className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"underline", textUnderlineOffset:"3px", cursor:"pointer" }}>
                    More about me →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Trust badges row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center" }}>
            {[
              "✓ You deal directly with the founder",
              "✓ 6+ years building business websites",
              "✓ 50+ projects delivered",
              "✓ US clients across all 50 states",
              "✓ Response within 24 hours",
            ].map(badge => (
              <span key={badge} style={{
                fontSize:"0.75rem", fontWeight:500, color:"rgba(28,28,30,0.65)",
                background:"var(--cream-50)", padding:"6px 14px",
                border:"1px solid var(--cream-300)", borderRadius:"2px",
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

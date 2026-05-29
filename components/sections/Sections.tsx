import Link from "next/link";
import {
  processSteps, services, flagshipPackage,
  testimonial, whyUs, siteConfig,
} from "@/data/index";

// ─── HERO ─────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section style={{ background:"var(--navy-950)", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end", overflow:"hidden", position:"relative", paddingTop:"120px" }}>
      <div style={{ position:"absolute", inset:0, opacity:0.035, backgroundImage:"linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize:"72px 72px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"65vw", height:"65vw", background:"radial-gradient(circle,rgba(26,49,110,0.5) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div className="max-w-7xl mx-auto px-8 pb-0 w-full relative z-10">
        {/* Eyebrow */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
          <span className="gold-rule" />
          <span className="label-xs" style={{ color:"var(--gold-400)" }}>
            Business Infrastructure Ecosystem · Nigeria, Africa &amp; the World · Est. 2019
          </span>
        </div>

        {/* H1 */}
        <h1 className="display-hero animate-fade-up" style={{ color:"var(--cream-50)", marginBottom:"20px", maxWidth:"900px" }}>
          Empowering African Businesses<br/>
          with Systems They{" "}
          <em className="not-italic gold-text">Depend On. Every Day.</em>
        </h1>

        <p className="body-lg animate-fade-up d2" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"620px", marginBottom:"12px" }}>
          We build modular digital infrastructure and business operating systems that help African businesses attract customers, run operations efficiently, collect payments, and scale sustainably.
        </p>
        <p className="body-sm animate-fade-up d2" style={{ color:"rgba(249,247,240,0.35)", maxWidth:"540px", marginBottom:"36px", fontStyle:"italic" }}>
          We don&apos;t just build software. We build systems that businesses rely on to grow, every single day.
        </p>

        {/* System tags */}
        <div className="animate-fade-up d2" style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"28px" }}>
          {["Websites","Landing Pages","Email Automation","CRM","Payments","SEO","AI Systems","Hotel System","Retail POS","Free Tools"].map(tag => (
            <span key={tag} style={{ fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", color:"rgba(249,247,240,0.45)", border:"1px solid rgba(249,247,240,0.1)", padding:"4px 10px", borderRadius:"2px" }}>{tag}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up d3" style={{ display:"flex", flexWrap:"wrap", gap:"14px", marginBottom:"56px" }}>
          <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <Link href="/services" className="btn-outline-cream">Explore Systems</Link>
          <Link href="/tools" className="btn-outline-cream">🛠️ Free Tools</Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up d4" style={{ borderTop:"1px solid rgba(201,168,76,0.15)", paddingTop:"28px", paddingBottom:"56px", display:"flex", flexWrap:"wrap", gap:"36px" }}>
          {[
            { value:"2019",  label:"Year founded" },
            { value:"2019",  label:"Year founded" },
            { value:"8",     label:"Core service systems" },
            { value:"₦500k", label:"Avg. setup fee" },
            { value:"70%+",  label:"Profit margin at scale" },
            { value:"4",     label:"Free tools available" },
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
              Your Business Deserves More Than a Website.{" "}
              <span style={{ color:"rgba(6,14,42,0.35)" }}>It Deserves a System.</span>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {[
                { t:"You have a website but it generates no enquiries.", b:"Because a website without SEO, clear messaging, and a conversion system is just an expensive business card. Most businesses have exactly that." },
                { t:"Leads come in but nobody follows up consistently.", b:"You're busy. Leads fall through the cracks. Prospects who were interested three weeks ago have moved on to a competitor who responded faster." },
                { t:"You can't see what's working and what isn't.", b:"No CRM, no analytics, no tracking. You're running a business blind — making decisions based on gut feel instead of data." },
              ].map((item) => (
                <div key={item.t} style={{ padding:"16px 20px", background:"rgba(239,68,68,0.04)", border:"1px solid rgba(239,68,68,0.1)", borderRadius:"2px" }}>
                  <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)", marginBottom:"4px" }}>{item.t}</p>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{item.b}</p>
                </div>
              ))}
            </div>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.4)", marginTop:"20px", fontStyle:"italic" }}>
              These are systems problems. And systems problems have systems solutions.
            </p>
          </div>

          {/* Right panel */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"32px", fontFamily:"'JetBrains Mono',monospace" }}>
            <p style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.25)", marginBottom:"20px" }}>// without-a-system.js</p>
            {[
              { k:"website_visitors",     v:"400/month",   good:false },
              { k:"enquiries_captured",   v:"< 5",         good:false },
              { k:"leads_followed_up",    v:"sometimes",   good:false },
              { k:"conversion_rate",      v:"1.2%",        good:false },
              { k:"monthly_revenue",      v:"stagnant",    good:false },
            ].map((item) => (
              <div key={item.k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid rgba(249,247,240,0.05)", fontSize:"0.78rem" }}>
                <span style={{ color:"rgba(249,247,240,0.4)" }}>{item.k}</span>
                <span style={{ color:"#F87171", fontWeight:600 }}>{item.v}</span>
              </div>
            ))}
            <div style={{ marginTop:"20px", padding:"14px 16px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:"2px" }}>
              <p style={{ fontSize:"0.72rem", color:"var(--gold-300)", fontWeight:600, marginBottom:"4px" }}>// with a jktl system</p>
              <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.5)" }}>Every visitor captured · Every lead followed up · Every metric tracked</p>
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
              8 Ways We Grow Your Business
            </h2>
          </div>
          <Link href="/services" className="label-xs" style={{ color:"var(--gold-400)", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
            All services →
          </Link>
        </div>

        {/* 7 core services grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-px mb-px" style={{ background:"rgba(249,247,240,0.06)" }}>
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={{ textDecoration:"none" }}>
              <div style={{ padding:"28px 24px", background: s.highlight ? "var(--navy-700)" : "var(--navy-800)", height:"100%", display:"flex", flexDirection:"column", transition:"background 0.2s", position:"relative" }}>
                {s.highlight && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />}
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"8px" }}>{s.number}</p>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:"var(--gold-400)", marginBottom:"8px", opacity:0.7 }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.15rem", color:"var(--cream-50)", lineHeight:1.2, marginBottom:"10px", flex:1 }}>
                  {s.label}
                </h3>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"16px", fontSize:"0.8rem" }}>{s.tagline}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:300, color:"var(--gold-300)", lineHeight:1 }}>
                  {s.priceFrom}
                  {s.priceTo !== s.priceFrom && <span style={{ color:"rgba(249,247,240,0.3)", fontSize:"0.85rem" }}> – {s.priceTo}</span>}
                </p>
              </div>
            </Link>
          ))}

          {/* Flagship 8th box */}
          <Link href="/packages" style={{ textDecoration:"none" }}>
            <div style={{ padding:"28px 24px", background:"var(--gold-400)", height:"100%", display:"flex", flexDirection:"column" }}>
              <p className="label-xs" style={{ color:"var(--navy-900)", marginBottom:"8px", opacity:0.7 }}>{flagshipPackage.number}</p>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:"var(--navy-900)", marginBottom:"8px", opacity:0.7 }}>{flagshipPackage.icon}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.15rem", color:"var(--navy-900)", lineHeight:1.2, marginBottom:"10px", flex:1 }}>
                {flagshipPackage.name}
              </h3>
              <p className="body-sm" style={{ color:"rgba(6,14,42,0.65)", marginBottom:"16px", fontSize:"0.8rem" }}>{flagshipPackage.tagline}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"var(--navy-900)", lineHeight:1 }}>
                {flagshipPackage.priceFrom} – {flagshipPackage.priceTo}
              </p>
            </div>
          </Link>
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
              How It Works:<br/>
              <em className="not-italic gold-text">The Client Journey.</em>
            </h2>
            <p className="body-lg" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"32px" }}>
              Every system we build follows the same five-stage logic — attract, capture, nurture, convert, retain. This is the architecture of a business that grows predictably.
            </p>
            <a href={`mailto:${siteConfig.email}`} className="btn-primary">
              Get in Touch
            </a>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
            {processSteps.map((step) => (
              <div key={step.number} style={{ display:"flex", gap:"20px", padding:"20px 24px", background:"var(--cream-50)", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <div style={{ flexShrink:0 }}>
                  <span style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"36px", height:"36px", background:"var(--navy-900)", borderRadius:"50%", fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:400, color:"var(--gold-400)", lineHeight:1 }}>
                    {step.number}
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"2px" }}>{step.title}</p>
                  <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"5px" }}>{step.subtitle}</p>
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

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────
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
              Why Choose<br/>
              <em className="not-italic gold-text">JK Technology.</em>
            </h2>
          </div>
          <p className="body-lg" style={{ color:"rgba(28,28,30,0.55)" }}>
            {siteConfig.promise}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:"var(--cream-300)" }}>
          {whyUs.map((item, i) => (
            <div key={i} style={{ padding:"32px", background:"var(--cream-50)" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:300, color:"var(--cream-300)", lineHeight:1, marginBottom:"16px" }}>
                {String(i+1).padStart(2,"0")}
              </p>
              <h3 style={{ fontWeight:600, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"8px", letterSpacing:"0.02em" }}>{item.title}</h3>
              <p className="body-sm" style={{ color:"rgba(28,28,30,0.56)" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOUNDER STRIP ────────────────────────────────────────────────────────────
export function FounderStrip() {
  return (
    <section style={{ background:"var(--cream-200)", padding:"64px 32px", borderTop:"1px solid var(--cream-300)", borderBottom:"1px solid var(--cream-300)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"32px" }}>
          <div className="ornament" style={{ color:"var(--gold-400)", width:"100%", maxWidth:"400px" }}>
            <span className="label-xs">The person behind JKTL</span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"32px", alignItems:"center", justifyContent:"center", maxWidth:"800px" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ position:"absolute", inset:"-6px", borderRadius:"50%", border:"1px solid var(--gold-400)", opacity:0.45 }} />
              <div style={{ width:"120px", height:"120px", borderRadius:"50%", overflow:"hidden", background:"var(--navy-800)", position:"relative", boxShadow:"0 8px 32px rgba(6,14,42,0.18)" }}>
                {/*
                  ── ADD YOUR PHOTO ────────────────────────────────────────
                  1. Save headshot as /public/owner.jpg (min 300×300px)
                  2. Import: import Image from "next/image";
                  3. Replace the div below with:
                     <Image src="/owner.jpg" alt="Founder of JK Technology Limited"
                       fill style={{ objectFit:"cover", objectPosition:"top" }} />
                  ────────────────────────────────────────────────────────── */}
                <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg, var(--navy-700), var(--navy-900))" }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" style={{ opacity:0.3 }}>
                    <circle cx="12" cy="8" r="4" stroke="var(--gold-400)" strokeWidth="1"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--gold-400)" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div style={{ textAlign:"left", maxWidth:"560px" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"clamp(1.2rem,2vw,1.6rem)", color:"var(--navy-900)", lineHeight:1.4, marginBottom:"10px" }}>
                &ldquo;I founded JKTL because I was tired of watching great businesses stay invisible and inefficient online. Every client gets my direct attention — from the first call to the day we launch and beyond.&rdquo;
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:"14px", flexWrap:"wrap" }}>
                <div>
                  <p style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--navy-900)", letterSpacing:"0.03em" }}>John K.</p>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginTop:"2px" }}>Founder · JK Technology Limited · Since 2019</p>
                </div>
                <Link href="/about" style={{ marginLeft:"auto" }}>
                  <span className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"underline", textUnderlineOffset:"3px" }}>More about us</span>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center" }}>
            {[
              "✓ You deal directly with the founder",
              "✓ 6+ years building business systems",
              "✓ 50+ projects delivered",
              "✓ Nigeria & Africa clients",
              "✓ Response within 24 hours",
            ].map((badge) => (
              <span key={badge} style={{ fontSize:"0.75rem", fontWeight:500, color:"rgba(28,28,30,0.65)", background:"var(--cream-50)", padding:"6px 14px", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function CTA({
  heading = "Your Growth. Our Mission.",
  subtext = "Reach out via email or phone. We'll assess your current digital presence, map out the system your business needs, and give you a clear proposal within 24 hours. No pitch, no pressure.",
}: { heading?: string; subtext?: string }) {
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
            Get in Touch
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

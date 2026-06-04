import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, whyUs, nigerianStates, targetAudiences } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "About JK Technology Limited | Business Infrastructure Ecosystem",
  description: "Founded in 2019, JK Technology builds digital systems that help African businesses attract customers, run operations efficiently, and scale sustainably.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

export default function AboutPage() {
  const mvv = [
    { icon: "MS", label: "Mission", text: siteConfig.mission },
    { icon: "VS", label: "Vision",  text: siteConfig.vision  },
    { icon: "VL", label: "Values",  text: siteConfig.values.join(" | ") },
  ];

  const stats = [
    { v: "2019",  l: "Year founded",        s: "Over 6 years in business" },
    { v: "6+",    l: "Years experience",     s: "Nigeria and Africa" },
    { v: "8",     l: "Service categories",   s: "Fully integrated" },
    { v: "100%",  l: "Copy included",        s: "No templates, no outsourcing" },
  ];

  const badges = [
    "You deal directly with the founder",
    "6+ years building business systems",
    "Nigeria and Africa clients",
    "Response within 24 hours",
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display: "block" }} />
          <h1 className="display-hero mb-5" style={{ color: "var(--cream-50)", maxWidth: "800px" }}>
            {siteConfig.shortTagline}
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", maxWidth: "600px" }}>
            {siteConfig.tagline}
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section style={{ background: "var(--cream-50)", padding: "80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--cream-300)" }}>
            {mvv.map(item => (
              <div key={item.label} style={{ padding: "40px 36px", background: "var(--cream-50)" }}>
                <div style={{ width: 40, height: 40, background: "var(--navy-900)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--gold-400)" }}>{item.icon}</span>
                </div>
                <p className="label-xs" style={{ color: "var(--navy-500)", marginBottom: "10px" }}>{item.label}</p>
                <p className="body-md" style={{ color: "rgba(28,28,30,0.65)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ background: "var(--cream-100)", padding: "80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "24px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: "12px", left: "12px", right: "-12px", bottom: "-12px", border: "1px solid var(--gold-400)", borderRadius: "4px", opacity: 0.4, zIndex: 0 }} />
                <div style={{ width: "320px", height: "380px", borderRadius: "4px", overflow: "hidden", background: "var(--navy-800)", position: "relative", zIndex: 1 }}>
                  {/*
                    ADD OWNER PHOTO:
                    1. Save headshot as /public/owner.jpg
                    2. Import Image from "next/image"
                    3. Replace the div below with:
                       <Image src="/owner.jpg" alt="Founder JKTL" fill style={{ objectFit:"cover" }} />
                  */}
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", background: "linear-gradient(160deg, var(--navy-700), var(--navy-900))" }}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2 }}>
                      <circle cx="12" cy="8" r="4" stroke="var(--gold-400)" strokeWidth="1" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="var(--gold-400)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <p className="label-xs" style={{ color: "var(--gold-400)", textAlign: "center" }}>Add /public/owner.jpg</p>
                  </div>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy-900)", lineHeight: 1.1, marginBottom: "4px" }}>John K.</p>
                <p className="label-xs" style={{ color: "var(--navy-500)", marginBottom: "14px" }}>Founder - JK Technology Limited</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {badges.map(b => (
                    <span key={b} style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--navy-600)", background: "var(--cream-200)", padding: "4px 12px", borderRadius: "2px", border: "1px solid var(--cream-300)" }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="gold-rule mb-5" style={{ display: "block" }} />
              <h2 className="display-lg mb-6" style={{ color: "var(--navy-900)" }}>Our Story</h2>
              <p className="body-md" style={{ color: "rgba(28,28,30,0.62)", marginBottom: "14px" }}>
                JK Technology Limited was founded in 2019 with one observation that would not leave us: great businesses were suffering unnecessarily from poor digital presence. Not because they lacked talent or dedication -- but because they had websites without systems.
              </p>
              <p className="body-md" style={{ color: "rgba(28,28,30,0.62)", marginBottom: "14px" }}>
                A website without SEO is invisible. SEO without a lead capture system leaks opportunities. Leads without follow-up automation go cold. Operations without a CRM become chaotic. We saw businesses investing in one piece of the puzzle and wondering why the overall picture was not coming together.
              </p>
              <p className="body-md" style={{ color: "rgba(28,28,30,0.62)", marginBottom: "14px" }}>
                We built JKTL to deliver the complete picture -- integrated digital systems that work together from day one. Website, landing pages, SEO, email automation, CRM, payment infrastructure, AI automation. Everything connected. Everything working toward the same goal: growing your business.
              </p>
              <p className="body-md" style={{ color: "rgba(28,28,30,0.62)", marginBottom: "20px" }}>
                Six years and 50+ projects later, we serve businesses across Nigeria, Africa and beyond -- in industries from law and solar energy to auto detailing and financial consulting.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={`mailto:${siteConfig.email}`} className="btn-gold">Email Us</a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="btn-outline-navy">{siteConfig.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--navy-900)", padding: "56px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.l} style={{ padding: "20px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 300, color: "var(--gold-400)", lineHeight: 1, marginBottom: "5px" }}>{s.v}</p>
              <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--cream-50)", marginBottom: "3px" }}>{s.l}</p>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.35)" }}>{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why JKTL */}
      <section style={{ background: "var(--cream-50)", padding: "80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display: "block" }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Why Choose JKTL</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} style={{ padding: "28px", background: "#fff", border: "1px solid var(--cream-300)", borderRadius: "4px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--cream-300)", lineHeight: 1, marginBottom: "12px" }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)", marginBottom: "8px" }}>{item.title}</h3>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.58)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target audiences */}
      <section style={{ background: "var(--cream-100)", padding: "80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display: "block" }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Who We Work With</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetAudiences.map(a => (
              <div key={a.title} style={{ padding: "24px", background: "#fff", border: "1px solid var(--cream-300)", borderRadius: "4px" }}>
                <div style={{ width: 44, height: 44, background: "var(--navy-900)", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--gold-400)" }}>{a.icon}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)", marginBottom: "8px" }}>{a.title}</h3>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)" }}>{a.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section style={{ background: "var(--cream-50)", padding: "64px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-8">
            <span className="gold-rule mb-4" style={{ display: "block" }} />
            <h2 className="display-lg" style={{ color: "var(--navy-900)" }}>Serving Businesses Across Nigeria</h2>
            <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginTop: "6px" }}>100% remote delivery. We have never needed to meet a client in person to deliver excellent results.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {nigerianStates.map(s => (
              <span key={s} style={{ fontSize: "0.78rem", color: "rgba(28,28,30,0.6)", background: "var(--cream-100)", padding: "5px 12px", border: "1px solid var(--cream-300)", borderRadius: "2px" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section style={{ background: "var(--cream-100)", padding: "48px 32px", textAlign: "center" }}>
        <div className="max-w-2xl mx-auto px-8">
          <div className="ornament mb-6" style={{ color: "var(--gold-400)" }}>
            <span className="label-xs">Our Promise</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(1.3rem,2.5vw,2rem)", color: "var(--navy-900)", lineHeight: 1.55, marginBottom: "20px" }}>
            &ldquo;{siteConfig.promise}&rdquo;
          </p>
          <p className="label-xs" style={{ color: "var(--gold-400)" }}>Your Growth. Our Mission.</p>
        </div>
      </section>

      <CTA heading="Work With a Team That Cares About Your Growth." subtext="Reach us by email or phone. We respond within 24 hours and will give you an honest assessment of what your business needs." />
    </>
  );
}

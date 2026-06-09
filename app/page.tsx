"use client";
import Link from "next/link";
import { deskProducts, siteConfig, companyDetails, businessSuiteRoadmap } from "@/data/index";

function fmtN(n: number) { return "N" + n.toLocaleString("en-NG"); }

export default function HomePage() {
  return (
    <div className="bg-cream-50">

      {/*  HERO  */}
      <section className="bg-navy-950 relative overflow-hidden"
        style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: 0 }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 px-4 py-1.5 rounded-sm mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
            <span className="label-xs text-gold-400">JK Technology Limited -- Nigerian Software Company -- CAC Registered</span>
          </div>

          {/* Giant Promise Headline */}
          <h1 className="display-hero text-white mb-5 leading-[1.04]" style={{ maxWidth: 820 }}>
            Vertical Software Built<br className="hidden sm:block" />
            <span className="text-gold-400"> for African Businesses.</span>
          </h1>
          <p className="body-lg text-white/55 mb-4" style={{ maxWidth: 580 }}>
            The Desk suite -- industry-specific management systems for churches, schools, and auto detailing businesses.
            Self-service onboarding. Real-time deployment. Subscription billing.
          </p>
          <p className="text-white/30 text-sm mb-9 font-mono">
            No developer needed. No IT consultant. Go live the same day.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/desk" className="btn-gold px-7 py-3.5 text-sm">Explore Desk Products</Link>
            <Link href="/get-started" className="btn-outline-cream px-7 py-3.5 text-sm">Get Started Today</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="btn-ghost px-5 py-3.5 text-sm flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp Us
            </a>
          </div>

          {/* Product cards strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 bg-white/[0.06]">
            {deskProducts.map(p => (
              <Link key={p.id} href={p.href} className="block no-underline p-6 bg-navy-900 hover:bg-navy-800 transition-colors"
                style={{ borderTop: `2px solid ${p.color}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                    <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[0.95rem] text-white leading-none mb-1">{p.name}</p>
                    <span className="font-mono text-[0.55rem] tracking-widest"
                      style={{ color: p.status === "live" ? "#34D399" : "#F59E0B" }}>
                      {p.status === "live" ? "LIVE" : "COMING SOON"}
                    </span>
                  </div>
                </div>
                <p className="text-[0.8rem] text-white/45 leading-relaxed mb-3">{p.description}</p>
                <p className="font-mono text-[0.62rem] font-bold" style={{ color: p.color }}>
                  {p.status === "live" ? "Get started" : "Join waitlist"} {"->"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*  FOUNDER SECTION  */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="gold-rule block mb-4" />
            <h2 className="display-lg text-cream-50 mb-5 leading-snug">
              Built by a Nigerian founder,<br />for African businesses.
            </h2>
            <p className="body-md text-white/55 mb-4 leading-[1.8]">
              JK Technology Limited is a registered Nigerian software company (CAC: {companyDetails.cac}), founded in 2019.
              We have been building digital systems for businesses since then. Desk is the product we always wanted to exist --
              vertical software that actually fits how African businesses operate. Not adapted from foreign tools. Built from scratch, in Nigeria, for Nigeria.
            </p>
            <p className="body-md text-white/55 mb-7 leading-[1.8]">
              Every product has Paystack integrated, works with Nigerian phone numbers, and is priced in Naira.
              Our support team answers on WhatsApp. We understand your context because we live in it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-gold text-xs px-5 py-2.5">Our Story</Link>
              <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                className="btn-ghost text-xs px-5 py-2.5 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                WhatsApp the founder
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative rounded overflow-hidden bg-navy-800 w-full max-w-[320px] mx-auto lg:max-w-none"
            style={{ aspectRatio: "9/16", maxHeight: 480 }}>
            <video src="/founder-video.mov" autoPlay loop muted playsInline className="w-full h-full object-cover block" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10"
              style={{ background: "linear-gradient(transparent,rgba(6,14,42,0.88))" }}>
              <p className="font-bold text-[0.88rem] text-white">John K.</p>
              <p className="text-[0.72rem] text-white/50">Founder, JK Technology Limited</p>
            </div>
          </div>
        </div>
      </section>

      {/*  DESK SUITE  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="gold-rule block mb-3" />
              <h2 className="display-lg text-navy-900">The Desk Suite</h2>
              <p className="body-md text-black/50 mt-1.5">Industry-specific software. Self-service onboarding. Live today.</p>
            </div>
            <Link href="/desk" className="btn-outline-navy text-xs px-4 py-2 self-start sm:self-auto shrink-0">View all products</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deskProducts.map(p => (
              <div key={p.id} className="bg-white rounded border border-cream-300 p-7 flex flex-col"
                style={{ borderTop: `3px solid ${p.color}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                    <span className="font-mono text-[0.72rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[1rem] text-navy-900">{p.name}</p>
                    <p className="text-[0.72rem] text-black/40">{p.tagline}</p>
                  </div>
                </div>
                <p className="body-sm text-black/58 mb-4 flex-1">{p.description}</p>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {p.features.slice(0, 4).map(f => (
                    <li key={f} className="flex gap-2 text-[0.78rem] text-black/60 items-start">
                      <span className="shrink-0 mt-0.5" style={{ color: p.color }}>&#10003;</span>{f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  {p.status === "live" ? (
                    <>
                      <Link href={p.getStartedHref}
                        className="flex-1 py-2.5 text-center text-white text-[0.72rem] font-bold rounded-sm uppercase tracking-wide no-underline"
                        style={{ background: p.color }}>
                        Get Started
                      </Link>
                      <Link href={p.href}
                        className="px-3.5 py-2.5 bg-transparent border border-cream-300 text-black/60 text-[0.72rem] font-semibold rounded-sm no-underline">
                        Learn More
                      </Link>
                    </>
                  ) : (
                    <Link href={p.href}
                      className="flex-1 py-2.5 text-center bg-cream-100 border border-cream-300 text-black/50 text-[0.72rem] font-bold rounded-sm no-underline">
                      Join Waitlist
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Business Suite Roadmap teaser */}
          <div className="mt-8 bg-cream-100 border border-cream-300 rounded p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[0.6rem] bg-amber-500/15 text-amber-600 px-2 py-0.5 rounded tracking-widest uppercase font-bold">Roadmap</span>
                  <p className="font-bold text-[0.9rem] text-navy-900">Business Suite -- Coming Later</p>
                </div>
                <p className="text-[0.82rem] text-black/55">
                  {businessSuiteRoadmap.map(p => p.name).join(" and ")} -- free tools with platform-fee revenue model. Built on the same SSO infrastructure.
                </p>
              </div>
              <div className="flex gap-3 shrink-0 flex-wrap">
                {businessSuiteRoadmap.map(p => (
                  <div key={p.id} className="flex items-center gap-2 px-3 py-2 rounded border border-cream-300 bg-white">
                    <span className="font-mono text-[0.6rem] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: p.color + "20", color: p.color }}>{p.icon}</span>
                    <span className="text-[0.78rem] font-semibold text-navy-900">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  HOW IT WORKS  */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="display-lg text-cream-50 mb-2">Go live in under 10 minutes.</h2>
            <p className="text-white/40 text-[0.9rem]">Self-service. No developer. No waiting.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
            {[
              { n: "01", t: "Create Account", d: "Sign up on accounts.jktl.com.ng. Google or email." },
              { n: "02", t: "Enter Details",   d: "Organisation name, size, address. 2 minutes." },
              { n: "03", t: "Pick Subdomain",  d: "yourchurch.jktl.com.ng. Real-time check." },
              { n: "04", t: "Upload Branding", d: "Logo and brand colour. Live preview." },
              { n: "05", t: "Choose Plan",     d: "Standard, Pro, or Enterprise." },
              { n: "06", t: "Pay via Paystack",d: "Secure card. Setup fee charged once." },
              { n: "07", t: "Auto Deploy",     d: "System provisioned. Credentials emailed." },
              { n: "08", t: "Go Live", d: "Your system is live. Support on WhatsApp." },
            ].map((s, i) => (
              <div key={s.n} className="bg-navy-800 p-5" style={{ borderTop: i === 7 ? "2px solid #34D399" : undefined }}>
                <p className="font-mono text-[0.65rem] font-bold mb-2" style={{ color: i === 7 ? "#34D399" : "#C9A84C" }}>{s.n}</p>
                <p className="font-bold text-[0.85rem] text-white mb-1">{s.t}</p>
                <p className="text-[0.75rem] text-white/40 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/get-started" className="btn-gold px-8 py-3.5">Start Onboarding Now</Link>
          </div>
        </div>
      </section>

      {/*  AGENCY SERVICES  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between mb-8">
            <div>
              <span className="gold-rule block mb-3" />
              <h2 className="display-lg text-navy-900 mb-2">Agency Services</h2>
              <p className="body-md text-black/55" style={{ maxWidth: 500 }}>
                Custom digital systems for businesses that need something specific -- websites, SEO, CRM, AI chatbots, payment infrastructure, email automation.
                Not self-service. Scoped, built, and delivered by our team.
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Link href="/get-started/services" className="btn-gold text-sm px-6 py-3 text-center">Submit an Inquiry</Link>
              <Link href="/services" className="btn-outline-navy text-sm px-6 py-3 text-center">View All Services</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "WS", label: "Website Systems",   desc: "From N150,000" },
              { icon: "LG", label: "Lead Generation",   desc: "From N100,000" },
              { icon: "EM", label: "Email Automation",  desc: "From N100,000" },
              { icon: "SE", label: "SEO & Google",      desc: "From N150,000" },
              { icon: "CR", label: "CRM & Operations",  desc: "From N300,000" },
              { icon: "PY", label: "Payment Systems",   desc: "From N100,000" },
              { icon: "AI", label: "AI & Automation",   desc: "From N250,000" },
              { icon: "PK", label: "Full Packages",     desc: "From N800,000" },
            ].map(s => (
              <Link key={s.icon} href="/services" className="bg-white border border-cream-300 rounded p-4 no-underline hover:border-navy-600 transition-colors">
                <div className="w-9 h-9 rounded-sm bg-navy-900 flex items-center justify-center mb-3">
                  <span className="font-mono text-[0.62rem] font-bold text-gold-400">{s.icon}</span>
                </div>
                <p className="font-bold text-[0.85rem] text-navy-900 mb-0.5">{s.label}</p>
                <p className="text-[0.72rem] text-black/40">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*  AFFILIATE BANNER  */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between">
          <div style={{ maxWidth: 560 }}>
            <p className="label-xs text-gold-400 mb-3">Affiliate Program -- Open Now</p>
            <h2 className="font-display font-light text-cream-50 mb-3" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
              Earn by referring businesses to Desk.
            </h2>
            <div className="flex flex-wrap gap-6 mb-4">
              {[
                { v: "N10,000", l: "Welcome bonus" },
                { v: "5%",      l: "On setup fees" },
                { v: "2% x 3", l: "Monthly recurring" },
                { v: "N100k",   l: "Min payout" },
              ].map(s => (
                <div key={s.l}>
                  <p className="font-bold text-lg text-white leading-none">{s.v}</p>
                  <p className="text-[0.68rem] text-white/35 uppercase tracking-wide font-mono">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-[0.82rem]">
              Promote to churches, schools, auto shops. New products auto-included at same rates. 60-day cookie attribution.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link href="/affiliates" className="btn-gold px-8 py-3.5 text-center">Join Free</Link>
            <Link href="/affiliates" className="btn-ghost px-8 py-3 text-center text-sm">Learn More</Link>
          </div>
        </div>
      </section>

      {/*  FINAL CTA  */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-navy-900 mb-3">Ready to get started?</h2>
          <p className="body-md text-black/50 mb-8">
            Pick a product and go live today. Or tell us what you need and we will build it for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link href="/get-started" className="btn-gold px-8 py-3.5">Choose a Product</Link>
            <Link href="/get-started/services" className="btn-outline-navy px-8 py-3.5">Custom Project Inquiry</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="btn-ghost px-6 py-3.5 flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

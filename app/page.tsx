"use client";
import Link from "next/link";
import { deskProducts, deskPlans, siteConfig } from "@/data/index";

function fmtN(n: number) {
  return "N" + n.toLocaleString("en-NG");
}

export default function HomePage() {
  return (
    <div className="bg-cream-50">

      {/*  HERO  */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop: "clamp(88px,12vw,120px)" }}>
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-gold-400/25 bg-gold-400/10 px-4 py-1.5 rounded-sm mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
            <span className="label-xs text-gold-400">JK Technology Limited -- Desk Product Suite</span>
          </div>

          <h1 className="display-hero text-white mb-5 leading-[1.05]" style={{ maxWidth: 760 }}>
            Vertical Software Built for<br />
            <span className="text-gold-400">African Businesses.</span>
          </h1>

          <p className="body-lg text-white/55 mb-9" style={{ maxWidth: 540 }}>
            Desk is our suite of industry-specific management systems. Self-service onboarding. Instant deployment. Real tools that run real businesses.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Link href="/desk" className="btn-gold text-sm px-6 py-3">Explore Desk Products</Link>
            <Link href="https://accounts.jktl.com.ng/signup" className="btn-outline-cream text-sm px-6 py-3">Get Started</Link>
          </div>

          {/* Product preview cards -- stack on mobile, 3-col on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-white/[0.06]">
            {deskProducts.map((p) => (
              <Link key={p.id} href={p.href}
                className="block no-underline p-6 bg-navy-900 transition-colors hover:bg-navy-800"
                style={{ borderTop: `2px solid ${p.color}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                    <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[0.95rem] text-white">{p.name}</p>
                    <p className="font-mono text-[0.58rem] tracking-widest"
                      style={{ color: p.status === "live" ? "#34D399" : "rgba(249,247,240,0.3)" }}>
                      {p.status === "live" ? "LIVE" : "COMING SOON"}
                    </p>
                  </div>
                </div>
                <p className="text-[0.8rem] text-white/45 leading-relaxed mb-3">{p.description}</p>
                <p className="font-mono text-[0.62rem] font-bold" style={{ color: p.color }}>
                  {p.status === "live" ? "Get started \u2192" : "Join waitlist \u2192"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/*  FOUNDER VIDEO  */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text -- comes second on mobile (video first) */}
          <div className="order-2 lg:order-1">
            <span className="gold-rule block mb-4" />
            <h2 className="display-lg text-cream-50 mb-4 leading-snug">
              Built by a Nigerian founder.<br />For African businesses.
            </h2>
            <p className="body-md text-white/50 mb-4 leading-[1.8]">
              JK Technology Limited is a registered Nigerian software company. We have been building digital systems for businesses since 2019. Desk is the product we always wanted to exist -- vertical software that actually fits how African businesses operate.
            </p>
            <p className="body-md text-white/50 mb-7 leading-[1.8]">
              Not adapted from foreign tools. Built from scratch, in Nigeria, for Nigeria.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-gold text-xs px-5 py-2.5">Our Story</Link>
              <a href={"mailto:" + siteConfig.email} className="btn-ghost text-xs px-5 py-2.5">Talk to the founder</a>
            </div>
          </div>

          {/* Video -- comes first on mobile */}
          <div className="order-1 lg:order-2 relative rounded overflow-hidden bg-navy-800 w-full max-w-[320px] mx-auto lg:max-w-none"
            style={{ aspectRatio: "9/16", maxHeight: 480 }}>
            <video src="/founder-video.mov" autoPlay loop muted playsInline
              className="w-full h-full object-cover block" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10"
              style={{ background: "linear-gradient(transparent,rgba(6,14,42,0.85))" }}>
              <p className="font-bold text-[0.85rem] text-white">John K.</p>
              <p className="text-[0.72rem] text-white/50">Founder, JK Technology Limited</p>
            </div>
          </div>
        </div>
      </section>

      {/*  DESK SUITE OVERVIEW  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="gold-rule block mb-3" />
              <h2 className="display-lg text-navy-900">The Desk Suite</h2>
              <p className="body-md text-black/50 mt-1.5">Industry-specific software. Self-service. Instant deployment.</p>
            </div>
            <Link href="/desk" className="btn-outline-navy text-xs px-4 py-2 self-start sm:self-auto shrink-0">View all products</Link>
          </div>

          {/* Cards -- 1 col mobile, 2 col sm, 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deskProducts.map((p) => (
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
                  {p.features.slice(0, 4).map((f) => (
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
                        More
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
        </div>
      </section>

      {/*  PRICING  */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <span className="gold-rule inline-block mb-3" />
            <h2 className="display-lg text-navy-900 mb-2">Simple, Transparent Pricing</h2>
            <p className="body-md text-black/50">Same pricing across all Desk products. One-time setup + monthly subscription.</p>
          </div>

          {/* 1 col mobile, 3 col lg */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {deskPlans.map((plan) => (
              <div key={plan.id} className="rounded p-7 relative flex flex-col"
                style={{ background: plan.highlight ? "var(--navy-900)" : "#fff", border: plan.highlight ? "none" : "1px solid var(--cream-300)" }}>
                {plan.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t bg-gold-400" />}
                {plan.highlight && (
                  <div className="absolute top-3.5 right-3.5 bg-gold-400 text-navy-900 text-[0.58rem] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
                    Popular
                  </div>
                )}

                <p className={`font-bold text-[1rem] mb-1 ${plan.highlight ? "text-cream-50" : "text-navy-900"}`}>{plan.name}</p>
                <p className={`text-[0.78rem] mb-5 ${plan.highlight ? "text-white/45" : "text-black/45"}`}>{plan.description}</p>

                <div className="mb-5">
                  <p className="font-display font-light text-[2.2rem] leading-none mb-0.5"
                    style={{ color: plan.highlight ? "var(--gold-400)" : "var(--navy-900)" }}>
                    {fmtN(plan.setupFee)}
                  </p>
                  <p className={`text-[0.7rem] mb-1.5 ${plan.highlight ? "text-white/40" : "text-black/40"}`}>setup fee</p>
                  <p className={`font-bold text-[0.95rem] ${plan.highlight ? "text-cream-50" : "text-navy-900"}`}>
                    {fmtN(plan.monthlyFee)}<span className="font-normal text-[0.78rem] opacity-50">/month</span>
                  </p>
                </div>

                <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex gap-2 text-[0.78rem] items-start ${plan.highlight ? "text-white/60" : "text-black/60"}`}>
                      <span className="shrink-0" style={{ color: plan.highlight ? "var(--gold-400)" : "#059669" }}>&#10003;</span>{f}
                    </li>
                  ))}
                </ul>

                <Link href={`https://accounts.jktl.com.ng/signup`}
                  className="block py-3 text-center text-[0.72rem] font-bold no-underline rounded-sm uppercase tracking-widest"
                  style={{ background: plan.highlight ? "var(--gold-400)" : "var(--navy-900)", color: plan.highlight ? "var(--navy-900)" : "#fff" }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CUSTOM SOLUTION  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-8 sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <span className="gold-rule block mb-3" />
            <h2 className="display-lg text-navy-900 mb-2.5">Need a Custom Solution?</h2>
            <p className="body-md text-black/55 leading-[1.75]">
              Beyond Desk products, JKTL builds custom digital systems -- websites, SEO, CRM, automation, AI chatbots, payment infrastructure. Tell us what you need and we will scope a proposal within 24 hours.
            </p>
          </div>
          {/* Buttons: stack on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:shrink-0">
            <Link href="https://jktl.com.ng/get-started/services"
              className="btn-gold text-[0.68rem] sm:text-[0.72rem] px-4 sm:px-6 py-2.5 sm:py-3 text-center">
              Submit an Inquiry
            </Link>
            <Link href="/services"
              className="btn-outline-navy text-[0.68rem] sm:text-[0.72rem] px-4 sm:px-6 py-2.5 sm:py-3 text-center">
              View Agency Services
            </Link>
          </div>
        </div>
      </section>

      {/*  AFFILIATE BANNER  */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div>
            <p className="label-xs text-gold-400 mb-2.5">Affiliate Program</p>
            <h2 className="font-display font-light text-cream-50 mb-2" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
              Earn by referring businesses to Desk.
            </h2>
            <p className="body-sm text-white/45">
              N10,000 welcome bonus. 5% on setup fees. 2% recurring for 3 months. Paid monthly.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <Link href="https://accounts.jktl.com.ng/signup?from=affiliate" className="btn-gold text-xs px-5 py-2.5">Join Free</Link>
            <Link href="/affiliates" className="btn-ghost text-xs px-5 py-2.5">Learn More</Link>
          </div>
        </div>
      </section>

      {/*  FOOTER CTA  */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-navy-900 mb-3">Ready to get started?</h2>
          <p className="body-md text-black/50 mb-7">Pick a product and go live in minutes. No developer needed.</p>
          <Link href="https://accounts.jktl.com.ng/signup" className="btn-gold px-10 py-3.5">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Globe, Smartphone, ShieldCheck } from "lucide-react";
import Icon from "@/components/shared/Icon";
import SocialProof from "@/components/shared/SocialProof";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/shared/Reveal";
import { siteConfig, features, industries, pricing, signupSteps, affiliateTerms, appSignupUrl, pexelsUrl } from "@/data/index";

export const metadata = {
  title: "Manage Your Business From Your Phone",
  description: "JKTL Business is a free, mobile-first app for Nigerian SMEs -- CRM, bookings & sales, invoicing with Paystack, inventory, expenses, and a free business website.",
};

export default function HomePage() {
  return (
    <div className="bg-cream-50">

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--navy-950)", paddingTop: "clamp(112px,14vw,140px)", paddingBottom: "clamp(56px,8vw,90px)" }}>
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal delay={0}>
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold-400)" }} />
                  <span className="label-xs" style={{ color: "var(--gold-400)" }}>Free to start -- no card required</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="display-hero" style={{ color: "#fff", marginBottom: 20 }}>
                  Run Your Business<br /><span className="gold-text">From Your Phone</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)", marginBottom: 32, maxWidth: 480 }}>
                  {siteConfig.tagline} Built for salons, gyms, restaurants, shops and every kind of Nigerian SME.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-10">
                  <a href={appSignupUrl()} className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">Get Started Free</a>
                  <Link href="/how-it-works" className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">See How It Works</Link>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {["Free CRM & invoicing", "Free business website", "Installs like an app"].map(t => (
                    <div key={t} className="flex items-center gap-2">
                      <CheckCircle2 size={16} style={{ color: "var(--gold-400)" }} />
                      <span className="text-[0.82rem]" style={{ color: "rgba(249,247,240,0.6)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={28} className="relative">
              <div className="rounded overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.1)", aspectRatio: "4/3" }}>
                <Image src={pexelsUrl(30677594, 900)} alt="Nigerian business owner using her phone" width={900} height={675} className="w-full h-full object-cover" priority />
              </div>
              <Reveal delay={0.7} y={16} className="absolute -bottom-6 -left-6 hidden sm:block">
                <div className="rounded p-4" style={{ background: "#fff", boxShadow: "0 20px 56px rgba(0,0,0,0.35)", maxWidth: 220 }}>
                  <p className="label-xs text-navy-900 mb-1">Invoice paid</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "#059669", lineHeight: 1 }}>{"₦"}45,000</p>
                  <p className="text-[0.68rem] text-black/40 mt-1">via Paystack, on the invoice</p>
                </div>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-14">
            <span className="gold-rule mx-auto mb-4" />
            <h2 className="display-xl text-navy-900 mb-3">Everything Your Business Needs, In One App</h2>
            <p className="body-md text-black/55 max-w-[560px] mx-auto">No spreadsheets, no separate apps for bookings and invoices. One place for it all.</p>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <StaggerItem key={f.title}>
                <HoverLift>
                  <div className="card-light p-6 h-full">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(6,14,42,0.05)" }}>
                      <Icon name={f.icon} size={22} className="text-navy-900" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-[0.95rem] mb-2">{f.title}</h3>
                    <p className="body-sm text-black/55">{f.desc}</p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24" style={{ background: "var(--cream-100)" }}>
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="gold-rule mb-4 block" />
              <h2 className="display-xl text-navy-900">Built For How Your Business Actually Works</h2>
            </div>
            <Link href="/industries" className="label-xs whitespace-nowrap" style={{ color: "var(--navy-700)" }}>See all industries {"->"}</Link>
          </Reveal>
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.slice(0, 5).map(ind => (
              <StaggerItem key={ind.slug}>
                <Link href={`/industries#${ind.slug}`} className="group block no-underline">
                  <div className="rounded overflow-hidden mb-2.5" style={{ aspectRatio: "1/1" }}>
                    <Image src={ind.image} alt={ind.title} width={300} height={300} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <p className="text-[0.82rem] font-semibold text-navy-900">{ind.title}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-y border-cream-300">
        <div className="max-w-[1000px] mx-auto">
          <Reveal className="text-center mb-14">
            <span className="gold-rule mx-auto mb-4" />
            <h2 className="display-xl text-navy-900">Live In Minutes</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-2" style={{ background: "var(--cream-300)" }}>
            {signupSteps.map(step => (
              <StaggerItem key={step.n} className="bg-cream-50 p-8">
                <p className="font-mono text-[0.72rem] font-bold mb-3" style={{ color: "var(--gold-400)" }}>{step.n}</p>
                <h3 className="font-semibold text-navy-900 text-[1rem] mb-2">{step.title}</h3>
                <p className="body-sm text-black/55">{step.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24" style={{ background: "var(--navy-900)" }}>
        <Reveal className="max-w-[900px] mx-auto text-center">
          <h2 className="display-xl mb-4" style={{ color: "var(--cream-50)" }}>Simple, Honest Pricing</h2>
          <p className="body-md mb-12" style={{ color: "rgba(249,247,240,0.5)" }}>Start free. Upgrade only when you need more.</p>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ background: "rgba(249,247,240,0.06)" }}>
            <StaggerItem className="p-8 text-left" style={{ background: "var(--navy-800)" }}>
              <p className="label-xs mb-3" style={{ color: "rgba(249,247,240,0.4)" }}>{pricing.free.name}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2.6rem", color: "#fff", lineHeight: 1 }}>{pricing.free.price}</p>
              <p className="body-sm mb-4" style={{ color: "rgba(249,247,240,0.45)" }}>{pricing.free.period}</p>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.6)" }}>{pricing.free.tagline}</p>
            </StaggerItem>
            <StaggerItem className="p-8 text-left relative" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p className="label-xs mb-3" style={{ color: "var(--gold-400)" }}>{pricing.paid.name}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2.6rem", color: "var(--gold-400)", lineHeight: 1 }}>{pricing.paid.priceMonthly}<span className="text-base">/mo</span></p>
              <p className="body-sm mb-4" style={{ color: "rgba(249,247,240,0.45)" }}>or {pricing.paid.priceYearly}/year</p>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.6)" }}>{pricing.paid.tagline}</p>
            </StaggerItem>
          </Stagger>
          <Link href="/pricing" className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide inline-flex mt-10">See Full Pricing Details</Link>
        </Reveal>
      </section>

      <SocialProof />

      {/* AFFILIATE TEASER */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-b border-cream-300">
        <Reveal className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-8 justify-between">
          <div>
            <p className="label-xs mb-2" style={{ color: "var(--gold-400)" }}>Affiliate Program</p>
            <h3 className="display-md text-navy-900 mb-1">Earn {affiliateTerms.recurringRate}% recurring, referring businesses to JKTL.</h3>
            <p className="body-sm text-black/55">Plus a {"₦"}{affiliateTerms.welcomeBonus.toLocaleString()} welcome bonus on your first upgrade.</p>
          </div>
          <Link href="/affiliates" className="btn-primary px-7 py-3.5 text-sm uppercase tracking-wide whitespace-nowrap">Become an Affiliate</Link>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 text-center" style={{ background: "var(--navy-950)" }}>
        <Reveal className="max-w-[560px] mx-auto">
          <div className="flex justify-center gap-6 mb-6 opacity-60">
            <Globe size={20} style={{ color: "var(--gold-400)" }} />
            <Smartphone size={20} style={{ color: "var(--gold-400)" }} />
            <ShieldCheck size={20} style={{ color: "var(--gold-400)" }} />
          </div>
          <h2 className="display-xl mb-4" style={{ color: "var(--cream-50)" }}>Ready to Run Your Business The Easy Way?</h2>
          <p className="body-lg mb-8" style={{ color: "rgba(249,247,240,0.55)" }}>Free to start. Set up your business and go live today.</p>
          <a href={appSignupUrl()} className="btn-gold px-8 py-4 text-sm uppercase tracking-wide inline-flex">Get Started Free</a>
        </Reveal>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Globe, Smartphone, ShieldCheck } from "lucide-react";
import Icon from "@/components/shared/Icon";
import SocialProof from "@/components/shared/SocialProof";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/shared/Reveal";
import { affiliateTerms, affiliateUrl, appSignupUrl, features, industries, pexelsUrl, pricing, signupSteps } from "@/data/index";

export const metadata = {
  title: "Free Business Websites, Landing Pages & Business Tools",
  description: "Build a website or landing page with 200 modern templates. Manage customers, bookings, invoices and stock with JKTL Business. Get started free.",
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
                  <span className="label-xs" style={{ color: "var(--gold-400)" }}>Websites • Domains • Hosting • Business Email</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="display-hero" style={{ color: "#fff", marginBottom: 20, fontSize: "clamp(2.6rem,4.8vw,4.4rem)", lineHeight: 1.06 }}>
                  Build your business online.<br /><span className="gold-text">Grow beyond limits.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)", marginBottom: 32, maxWidth: 480 }}>
                  Create a professional website, get your own domain and business email, and access powerful tools to manage your business — all in one place.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-4">
                  <a href={appSignupUrl()} className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">Get Started</a>
                  <Link href="/templates" className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">Explore Templates</Link>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mb-3 text-sm text-white/80">Start for free. No credit card required.</p>
                <p className="mb-6 text-xs text-white/50">Domains, business email and optional upgrades are priced separately.</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {["200 website & landing-page designs", "Free business tools", "Your own online presence"].map(t => (
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
                <Image src="/template-previews/consultancy-minimal.jpg" alt="Preview of a JKTL business website template" width={900} height={675} className="w-full h-full object-cover" priority />
              </div>
              <Reveal delay={0.7} y={16} className="absolute -bottom-6 -left-6 hidden sm:block">
                <div className="rounded p-4" style={{ background: "#fff", boxShadow: "0 20px 56px rgba(0,0,0,0.35)", maxWidth: 220 }}>
                  <p className="label-xs text-navy-900 mb-1">Your next chapter</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", color: "#059669", lineHeight: 1 }}>Your business. Online.</p>
                  <p className="text-[0.68rem] text-black/40 mt-1">Website · Domain · Business email</p>
                </div>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream-100 px-6 py-16 border-b border-cream-300"><div className="max-w-5xl mx-auto"><p className="text-xs uppercase tracking-widest text-[#80621c]">Your next chapter, online</p><h2 className="font-display text-4xl sm:text-5xl mt-4 text-navy-900">Build your next website or landing page.</h2><p className="mt-5 max-w-2xl text-black/60">Explore 200 modern designs for law firms, schools, churches, music labels, clinics, salons and more. Make one your own with your logo, Unsplash images, services, service areas, social links and genuine reviews—or start with a blank page.</p><div className="mt-6 flex flex-wrap gap-5"><Link href="/templates" className="text-navy-900 font-semibold underline">Browse website templates →</Link><Link href="/landing-pages" className="text-navy-900 font-semibold underline">Create a landing page →</Link></div></div></section>

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
          <p className="body-md mb-12" style={{ color: "rgba(249,247,240,0.5)" }}>
            ₦650,000 to set everything up — or spread it across six months. Then ₦59,000 a month.
          </p>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ background: "rgba(249,247,240,0.06)" }}>
            <StaggerItem className="p-8 text-left relative" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p className="label-xs mb-3" style={{ color: "var(--gold-400)" }}>{pricing.monthly.name} — {pricing.monthly.badge}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2.6rem", color: "var(--gold-400)", lineHeight: 1 }}>
                {pricing.monthly.headline}<span className="text-base">{pricing.monthly.headlineSuffix}</span>
              </p>
              <p className="body-sm mb-2" style={{ color: "rgba(249,247,240,0.45)" }}>{pricing.monthly.period}</p>
              <p className="body-sm mb-4" style={{ color: "rgba(249,247,240,0.6)" }}>
                {pricing.monthly.ongoingLabel}: {pricing.monthly.ongoing}
              </p>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.55)" }}>{pricing.monthly.explains}</p>
            </StaggerItem>
            <StaggerItem className="p-8 text-left" style={{ background: "var(--navy-800)" }}>
              <p className="label-xs mb-3" style={{ color: "rgba(249,247,240,0.4)" }}>{pricing.upfront.name} — {pricing.upfront.badge}</p>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2.6rem", color: "#fff", lineHeight: 1 }}>{pricing.upfront.headline}</p>
              <p className="body-sm mb-2" style={{ color: "rgba(249,247,240,0.45)" }}>{pricing.upfront.period}</p>
              <p className="body-sm mb-4" style={{ color: "rgba(249,247,240,0.6)" }}>
                {pricing.upfront.ongoingLabel}: {pricing.upfront.ongoing}
              </p>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.55)" }}>{pricing.upfront.explains}</p>
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
            <h3 className="display-md text-navy-900 mb-1">
              Earn {"₦"}{affiliateTerms.firstYearValue.toLocaleString()} from one referral.
            </h3>
            <p className="body-sm text-black/55">
              {"₦"}{affiliateTerms.signupBonus.toLocaleString()} when they sign up, {"₦"}{affiliateTerms.subscriptionBonus.toLocaleString()} when they
              subscribe, then {"₦"}{affiliateTerms.recurringMonthly.toLocaleString()} every month they stay subscribed.
            </p>
          </div>
          <a href={affiliateUrl()} className="btn-primary px-7 py-3.5 text-sm uppercase tracking-wide whitespace-nowrap">Become an Affiliate</a>
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
          <h2 className="display-xl mb-4" style={{ color: "var(--cream-50)" }}>Stop Losing Calls You Never Knew About</h2>
          <p className="body-lg mb-8" style={{ color: "rgba(249,247,240,0.55)" }}>We set up your line, train the assistant on your business, and build your website. From ₦108,333.33 a month.</p>
          <a href={appSignupUrl()} className="btn-gold px-8 py-4 text-sm uppercase tracking-wide inline-flex">Get started free</a>
          <p className="mt-4 text-xs text-white/60">Create your free account first. The AI receptionist package is optional and paid.</p>
        </Reveal>
      </section>
    </div>
  );
}

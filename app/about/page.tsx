import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, companyDetails } from "@/data/index";

export const metadata: Metadata = {
  title: "About JK Technology Limited | Nigerian Software Company",
  description: "JK Technology Limited is a CAC-registered Nigerian software company founded in 2019. We build the Desk product suite and custom digital systems for African businesses.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

const TIMELINE = [
  { year: "2019", event: "Founded", detail: "JK Technology Limited registered as a Nigerian software company. First clients in digital marketing and website development." },
  { year: "2021", event: "Agency Growth", detail: "Expanded into CRM, SEO, and payment infrastructure. Delivered 20+ systems across Nigeria." },
  { year: "2023", event: "Desk Begins", detail: "Started building FaithDesk -- the first vertical management system purpose-built for Nigerian churches." },
  { year: "2024", event: "DetailDesk Live", detail: "DetailDesk launched for auto detailing businesses. Self-service onboarding introduced." },
  { year: "2025", event: "Desk Suite", detail: "SchoolDesk development begins. SSO infrastructure built. Affiliate programme launched." },
  { year: "2026", event: "Scaling", detail: "Active clients across FaithDesk and DetailDesk. 50+ agency projects delivered. Expanding across Nigeria and Africa." },
];

const VALUES = [
  { icon: "NG", label: "Nigerian-First", desc: "Built in Nigeria, for Nigeria. Paystack payments, Naira pricing, Nigerian phone number login, and support from someone who understands your context." },
  { icon: "SC", label: "Self-Service", desc: "We believe powerful software should not require a consultant to set up. Desk products go live in minutes, not weeks." },
  { icon: "TR", label: "Transparent", desc: "No hidden fees. No ambiguous pricing. Every proposal is itemised. We tell you exactly what you are getting and exactly what it costs." },
  { icon: "FD", label: "Founder-Led", desc: "You deal directly with the founder -- not a helpdesk or outsourced team. Our reputation is on every project we deliver." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "72px" }}>
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="gold-rule block mb-5" />
          <h1 className="display-hero text-white mb-5" style={{ maxWidth: 700 }}>
            JK Technology Limited.<br /><span className="text-gold-400">Nigerian Software Company.</span>
          </h1>
          <p className="body-lg text-white/50" style={{ maxWidth: 560 }}>
            CAC Registration: {companyDetails.cac}. Founded {companyDetails.founded}. Building digital systems for African businesses.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="gold-rule block mb-4" />
            <h2 className="display-lg text-navy-900 mb-5">Why we exist.</h2>
            <p className="body-md text-black/60 mb-4 leading-[1.8]">
              African businesses are underserved by software. Most tools were built for Western markets, priced in dollars, and require IT consultants to set up. Nigerian churches manage members in WhatsApp groups. Schools collect fees with spreadsheets. Auto shops run on paper job cards.
            </p>
            <p className="body-md text-black/60 mb-4 leading-[1.8]">
              We built JK Technology Limited to change that. The Desk suite is industry-specific software built from scratch for Nigerian businesses -- with Paystack payments, Naira pricing, Nigerian phone number authentication, and support from someone who picks up the phone.
            </p>
            <p className="body-md text-black/60 leading-[1.8]">
              Our agency services -- websites, SEO, CRM, automation, payment infrastructure, AI chatbots -- have been delivered to 50+ businesses across Nigeria since 2019. Every project is scoped and delivered by the founder, not outsourced.
            </p>
          </div>
          <div>
            {/* Founder card */}
            <div className="bg-navy-900 rounded p-7 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gold-400/15 border-2 border-gold-400/30 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[0.85rem] font-bold text-gold-400">JK</span>
                </div>
                <div>
                  <p className="font-bold text-[1.05rem] text-white">John K.</p>
                  <p className="text-[0.75rem] text-white/40">Founder & CEO, JK Technology Limited</p>
                  <p className="text-[0.68rem] text-white/25 font-mono">Founded 2019 -- Lagos, Nigeria</p>
                </div>
              </div>
              <p className="text-[0.85rem] text-white/55 leading-[1.7]">
                "I started JKTL because I kept seeing great Nigerian businesses fail to grow because they lacked the digital infrastructure to operate efficiently. We are not building generic software -- we are building the systems Nigerian businesses actually need."
              </p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-sm text-[0.72rem] font-bold"
                  style={{ background: "rgba(37,211,102,0.1)", color: "#16a34a", border: "1px solid rgba(37,211,102,0.2)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp Directly
                </a>
                <a href={"mailto:" + siteConfig.email}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm text-[0.72rem] font-bold"
                  style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)" }}>
                  Email Us
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: "2019", l: "Year founded" },
                { v: "50+",  l: "Projects delivered" },
                { v: "2",    l: "Live Desk products" },
                { v: "NG",   l: "CAC Registered" },
              ].map(s => (
                <div key={s.l} className="bg-white border border-cream-300 rounded p-4 text-center">
                  <p className="font-display font-light text-[1.8rem] text-navy-900 leading-none mb-1">{s.v}</p>
                  <p className="font-mono text-[0.62rem] tracking-wide text-black/35 uppercase">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-8">
            <span className="gold-rule block mb-3" />
            <h2 className="display-lg text-navy-900">How we work.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(v => (
              <div key={v.icon} className="bg-white border border-cream-300 rounded p-6">
                <div className="w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center mb-4">
                  <span className="font-mono text-[0.65rem] font-bold text-gold-400">{v.icon}</span>
                </div>
                <p className="font-bold text-[0.95rem] text-navy-900 mb-2">{v.label}</p>
                <p className="text-[0.82rem] text-black/55 leading-[1.65]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[700px] mx-auto">
          <div className="mb-8">
            <span className="gold-rule block mb-3" />
            <h2 className="display-lg text-navy-900">Our story.</h2>
          </div>
          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-6 pb-8 last:pb-0 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center z-10">
                    <span className="font-mono text-[0.6rem] font-bold text-gold-400">{item.year}</span>
                  </div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-cream-300 mt-1" />}
                </div>
                <div className="pt-2">
                  <p className="font-bold text-[0.95rem] text-navy-900 mb-1">{item.event}</p>
                  <p className="text-[0.82rem] text-black/55 leading-[1.65]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-cream-50 mb-3">Work with us.</h2>
          <p className="text-white/45 text-[0.9rem] mb-7">
            Desk product or custom agency project -- we respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started" className="btn-gold px-8 py-3.5">Get Started</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-7 py-3.5">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

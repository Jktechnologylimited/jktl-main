import type { Metadata } from "next";
import Link from "next/link";
import { services, flagshipPackage, siteConfig, companyDetails } from "@/data/index";

export const metadata: Metadata = {
  title: "Agency Services | JK Technology Limited",
  description: "Custom digital systems for Nigerian businesses. Websites, SEO, CRM, email automation, payment infrastructure, AI chatbots. Scoped, built, and delivered by JKTL.",
};

export default function ServicesPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "64px" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 px-3.5 py-1.5 rounded-sm mb-6">
            <span className="label-xs text-gold-400">Agency Services -- Custom Scoped Work</span>
          </div>
          <h1 className="display-hero text-white mb-4" style={{ maxWidth: 720 }}>
            Custom Digital Systems<br /><span className="text-gold-400">Built for Your Business.</span>
          </h1>
          <p className="body-lg text-white/50 mb-4" style={{ maxWidth: 580 }}>
            Not self-service. Every project is scoped, quoted, built, and delivered by our team.
            You deal directly with the founder -- not a helpdesk or outsourced developer.
          </p>
          <p className="font-mono text-[0.72rem] text-white/25 mb-8">
            Serving Nigeria and Africa since 2019. 50+ systems delivered.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/get-started/services" className="btn-gold px-6 py-3.5">Submit an Inquiry</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-3.5 flex items-center gap-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* How it works -- agency */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-cream-300">
            {[
              { n: "01", t: "Submit Inquiry",   d: "Fill out our discovery form with your needs, budget, and timeline." },
              { n: "02", t: "Auto-Reply",        d: "You get a confirmation immediately. We respond within 24 hours." },
              { n: "03", t: "We Review",         d: "Owner reviews your inquiry personally and scopes the work." },
              { n: "04", t: "Custom Proposal",   d: "You receive a detailed proposal and price within 24 hours." },
              { n: "05", t: "Pay & Build",        d: "Accepted? Paystack invoice sent. Project begins." },
            ].map(s => (
              <div key={s.n} className="bg-cream-50 p-5">
                <p className="font-mono text-[0.65rem] font-bold text-gold-400 mb-2">{s.n}</p>
                <p className="font-bold text-[0.85rem] text-navy-900 mb-1">{s.t}</p>
                <p className="text-[0.75rem] text-black/50 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10">
            <span className="gold-rule block mb-3" />
            <h2 className="display-lg text-navy-900">8 Service Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map(s => (
              <div key={s.slug} className="bg-white border border-cream-300 rounded p-6 flex flex-col">
                <div className="w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center mb-4">
                  <span className="font-mono text-[0.65rem] font-bold text-gold-400">{s.number}</span>
                </div>
                <p className="font-bold text-[0.95rem] text-navy-900 mb-1.5 leading-snug">{s.label}</p>
                <p className="text-[0.78rem] text-black/50 mb-3 flex-1 leading-relaxed">{s.description}</p>
                <div className="mb-4">
                  <p className="font-display font-light text-[1.4rem] text-navy-900 leading-none">{s.priceFrom}</p>
                  {s.priceTo && s.priceTo !== s.priceFrom && (
                    <p className="text-[0.72rem] text-black/35">up to {s.priceTo}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/services/${s.slug}`}
                    className="flex-1 py-2.5 text-center bg-navy-900 text-white text-[0.68rem] font-bold rounded-sm uppercase tracking-wide no-underline">
                    Details
                  </Link>
                  <Link href="/get-started/services"
                    className="px-3.5 py-2.5 border border-cream-300 text-black/60 text-[0.68rem] font-semibold rounded-sm no-underline bg-transparent">
                    Inquire
                  </Link>
                </div>
              </div>
            ))}

            {/* Flagship package */}
            <div className="bg-navy-900 rounded p-6 flex flex-col sm:col-span-2 lg:col-span-1 xl:col-span-1">
              <div className="w-10 h-10 rounded-sm bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mb-4">
                <span className="font-mono text-[0.65rem] font-bold text-gold-400">FS</span>
              </div>
              <p className="font-bold text-[0.95rem] text-white mb-1.5 leading-snug">{flagshipPackage.name}</p>
              <p className="text-[0.78rem] text-white/45 mb-3 flex-1 leading-relaxed">{flagshipPackage.tagline}</p>
              <div className="mb-4">
                <p className="font-display font-light text-[1.4rem] text-gold-400 leading-none">{flagshipPackage.priceFrom}</p>
                <p className="text-[0.72rem] text-white/35">up to {flagshipPackage.priceTo}</p>
              </div>
              <Link href="/get-started/services"
                className="w-full py-2.5 text-center bg-gold-400 text-navy-900 text-[0.68rem] font-bold rounded-sm uppercase tracking-wide no-underline">
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-cream-50 mb-3">Not sure which service you need?</h2>
          <p className="text-white/45 text-[0.9rem] mb-7">
            Submit an inquiry and describe what you are trying to achieve. We will scope the right solution and send a proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started/services" className="btn-gold px-8 py-3.5">Submit an Inquiry</Link>
            <a href={"mailto:" + siteConfig.email} className="btn-ghost px-7 py-3.5">{siteConfig.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";
import { services, siteConfig, companyDetails } from "@/data/index";

export default function ServicePage() {
  const service = services.find(s => s.slug === "seo");
  if (!service) return null;
  const extra = ["Google Business Profile setup","Local SEO targeting","Monthly ranking reports","Keyword research included"];
  const allFeatures = [...(service.features || []), ...extra];

  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop:"clamp(88px,12vw,120px)", paddingBottom:"72px" }}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:"#DC2626" }} />
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm mb-6"
            style={{ background:"#DC262620", border:"1px solid #DC262640" }}>
            <span className="font-mono text-[0.6rem] tracking-widest uppercase font-bold" style={{ color:"#DC2626" }}>
              Agency Service -- Custom Scoped Work
            </span>
          </div>
          <h1 className="display-hero text-white mb-5 leading-[1.04]">{service.label}</h1>
          <div className="border-l-4 pl-5 mb-6" style={{ borderColor:"#DC2626" }}>
            <p className="text-white/65 text-[0.95rem] leading-[1.8]" style={{ maxWidth:620 }}>
              93% of Nigerians searching for your service online never scroll past the first page of Google results. If you are not there, you do not exist to them.
            </p>
          </div>
          <div className="p-5 rounded mb-8" style={{ background:"#DC262612", border:"1px solid #DC262630" }}>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase font-bold mb-2" style={{ color:"#DC2626" }}>Our Promise</p>
            <p className="text-white font-bold text-[0.95rem] leading-[1.6]">First-page Google rankings for your target keywords, a fully optimised Google Business profile, and monthly reports showing your progress.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/get-started/services"
              className="px-7 py-3.5 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline text-white"
              style={{ background:"#DC2626" }}>
              Get a Quote
            </Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="btn-ghost px-5 py-3.5 flex items-center gap-2 text-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <div className="py-3 px-4 text-center" style={{ background:"#DC2626" }}>
        <p className="text-white font-bold text-[0.72rem] uppercase tracking-widest">
          24-hour response -- Custom proposal -- Direct founder contact -- No outsourcing
        </p>
      </div>

      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="gold-rule block mb-4" />
            <h2 className="display-lg text-navy-900 mb-5">What is included.</h2>
            <div className="flex flex-col gap-3">
              {allFeatures.map((f: string) => (
                <div key={f} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background:"#DC262615" }}>
                    <span className="text-[0.65rem] font-bold" style={{ color:"#DC2626" }}>v</span>
                  </div>
                  <p className="text-[0.88rem] text-black/65 leading-[1.55]">{f}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="bg-white border border-cream-300 rounded p-7 mb-4">
              <p className="label-xs text-black/35 mb-4">Pricing</p>
              <p className="font-display font-light text-[2.5rem] text-navy-900 leading-none mb-1">{service.priceFrom}</p>
              {service.priceTo && service.priceTo !== service.priceFrom && (
                <p className="text-black/35 text-[0.75rem] mb-4">up to {service.priceTo}</p>
              )}
              <p className="text-[0.78rem] text-black/50 mb-5 leading-[1.6]">
                Exact price depends on scope. Submit an inquiry for a detailed quote within 24 hours.
              </p>
              <div className="flex flex-col gap-2.5">
                {["24-hour response guarantee","Custom scope -- not a package","Direct founder contact","Nigerian context, Naira pricing"].map((item: string) => (
                  <div key={item} className="flex items-center gap-2.5 text-[0.82rem] text-black/65">
                    <span style={{ color:"#DC2626" }}>v</span>{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy-900 rounded p-5 flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <p className="font-bold text-[0.85rem] text-white mb-1">Satisfaction Guarantee</p>
                <p className="text-[0.75rem] text-white/45 leading-[1.6]">We do not take full payment until you approve the scope and design.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.bestFor && service.bestFor.length > 0 && (
        <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-[1000px] mx-auto">
            <p className="label-xs text-black/35 mb-4">Best For</p>
            <div className="flex flex-wrap gap-2">
              {service.bestFor.map((b: string) => (
                <span key={b} className="px-4 py-2 bg-white border border-cream-300 rounded text-[0.82rem] font-semibold text-navy-900">{b}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-cream-50 mb-3">Ready to get started?</h2>
          <p className="text-white/45 text-[0.9rem] mb-7">Submit an inquiry. We respond within 24 hours with a scoped proposal and exact price.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started/services" className="btn-gold px-8 py-3.5">Submit Inquiry</Link>
            <a href={`mailto:${siteConfig.email}`} className="btn-ghost px-7 py-3.5">{siteConfig.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

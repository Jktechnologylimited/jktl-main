import type { Metadata } from "next";
import Link from "next/link";
import { businessWebsiteTiers, companyDetails } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import WebsiteTierPricing from "@/components/sections/WebsiteTierPricing";

export const metadata: Metadata = {
  title: "Business Websites | Subscription Websites from ₦9,900/month | JK Technology",
  description:
    "A professional business website, built and hosted for you. From ₦9,900/month (billed annually). Free hosting, SSL, business email, unlimited updates.",
  alternates: { canonical: "https://jktl.com.ng/business-websites" },
};

const FEATURES = [
  { title: "Built for you", desc: "We design, build, and launch your site — you don't touch a page builder." },
  { title: "Hosting included", desc: "Free hosting and SSL security, no separate hosting bill to manage." },
  { title: "Always up to date", desc: "Unlimited content updates included — send us the change, we make it." },
  { title: "WhatsApp-ready", desc: "WhatsApp integration built in, so customers can message you directly." },
];

export default function BusinessWebsitesPage() {
  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 px-4 py-1.5 rounded-sm mb-6">
            <span className="label-xs text-gold-400">jktl.com.ng / business-websites</span>
          </div>
          <h1 className="display-hero text-white mb-4" style={{ maxWidth: 700 }}>
            Business Websites. <span className="text-gold-400">From ₦9,900/month.</span>
          </h1>
          <p className="body-lg text-white/50 mb-3" style={{ maxWidth: 540 }}>
            A professional website for your business — designed, built, hosted, and kept up to date. No setup headaches, no hosting bills to juggle.
          </p>
          <p className="font-mono text-[0.72rem] text-white/25 mb-8">
            Billed annually. Cancel anytime.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#pricing" className="btn-gold px-7 py-3.5">See Pricing</a>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-3.5 flex items-center gap-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="border border-black/10 p-6 bg-white">
              <p className="font-bold text-[0.9rem] text-navy-900 mb-1.5">{f.title}</p>
              <p className="text-[0.8rem] text-black/55 leading-[1.6]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 text-center">
            <span className="gold-rule mb-4" style={{ display: "block", margin: "0 auto" }} />
            <h2 className="display-lg text-navy-900 mb-2">Simple, Transparent Pricing</h2>
            <p className="body-sm text-black/50">Shown as a monthly rate for reference — billed once a year at the discounted annual price.</p>
          </div>
          <WebsiteTierPricing tiers={businessWebsiteTiers} ctaHref="/contact" />
        </div>
      </section>

      <CTA
        heading="Ready for a website that works while you sleep?"
        subtext="Tell us about your business. We'll recommend the right tier and have your site live in days, not months."
      />
    </div>
  );
}

import type { Metadata } from "next";
import { companyDetails } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import FlagshipPricing from "@/components/sections/FlagshipPricing";

export const metadata: Metadata = {
  title: "Business Growth Platform | Managed Digital Platform for Businesses | JK Technology",
  description:
    "A fully managed digital platform designed to build credibility, generate enquiries, and grow your business online. Strategy, design, and build, plus ongoing Platform Management.",
  alternates: { canonical: "https://jktl.com.ng/business-websites" },
};

const FEATURES = [
  { title: "Built for you", desc: "We design, build, and launch your platform — you don't touch a page builder." },
  { title: "Fully managed", desc: "Hosting, security, and performance handled for you, year-round." },
  { title: "Always current", desc: "Platform Management keeps it running — send us the change, we make it." },
  { title: "WhatsApp-ready", desc: "WhatsApp integration built in, so customers can message you directly." },
];

const BUILD_ITEMS = [
  "Strategy Workshop",
  "Custom UI/UX Design",
  "Custom Full-Stack Website",
  "Secure Admin Dashboard",
  "Blog & Content Management",
  "Services & Portfolio Management",
  "Lead Capture Forms",
  "Technical SEO Foundation",
  "Google Analytics & Search Console Setup",
  "Training Session",
];

const MANAGEMENT_ITEMS = [
  "Premium Hosting",
  "Domain Renewal",
  "SSL Certificate",
  "Platform Maintenance",
  "Security Monitoring",
  "Daily Backups",
  "Performance Monitoring",
  "Technical Support",
  "Minor Content Updates",
  "Continuous Improvements",
];

const ADDONS = [
  "Business Email",
  "AI Chat Assistant",
  "Content Writing",
  "Monthly SEO",
  "Additional Integrations",
  "Enterprise Custom Development",
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
            <span className="label-xs text-gold-400">The Business Growth Platform</span>
          </div>
          <h1 className="display-hero text-white mb-4" style={{ maxWidth: 700 }}>
            A digital platform built to <span className="text-gold-400">win your business more customers.</span>
          </h1>
          <p className="body-lg text-white/50 mb-3" style={{ maxWidth: 560 }}>
            Not a website. A fully managed digital platform designed to build credibility, generate enquiries, and support your business&apos;s long-term growth.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#investment" className="btn-gold px-7 py-3.5">See Your Investment</a>
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

      <FlagshipPricing
        platformName="Business Growth Platform"
        tagline="One engagement. Everything your business needs to launch and grow."
        buildPrice="₦990,000"
        buildItems={BUILD_ITEMS}
        managementPrice="₦290,000/yr"
        managementItems={MANAGEMENT_ITEMS}
        addons={ADDONS}
        ctaHref="#investment-cta"
      />

      <div id="investment-cta">
        <CTA
          heading="Ready for a platform that works while you sleep?"
          subtext="Book a strategy call. We'll walk through your goals and confirm scope before anything begins."
        />
      </div>
    </div>
  );
}

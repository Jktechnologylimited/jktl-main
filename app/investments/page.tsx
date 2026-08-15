import type { Metadata } from "next";
import Link from "next/link";
import { companyDetails, siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Investments | JK Technology Limited",
  description: "JK Technology Limited is building the vertical software layer for African businesses. Learn about our growth, our model, and how to get in touch about investment opportunities.",
  alternates: { canonical: "https://jktl.com.ng/investments" },
};

const HIGHLIGHTS = [
  { v: "2019",  l: "Founded" },
  { v: "200+",  l: "Projects Delivered" },
  { v: "100+",  l: "Happy Clients" },
  { v: "7",     l: "Desk Platforms" },
];

const PILLARS = [
  { icon: "V1", title: "Vertical Software",  desc: "Purpose-built platforms for specific industries -- schools, churches, insurance, construction, fuel retail and more -- not generic tools stretched to fit." },
  { icon: "V2", title: "Recurring Revenue",  desc: "A subscription model (setup fee + monthly) across every Desk product, plus a growing agency-services and affiliate revenue line." },
  { icon: "V3", title: "Self-Service at Scale", desc: "Products are designed to onboard without a sales call -- SSO infrastructure, Paystack billing and automated provisioning built in from day one." },
  { icon: "V4", title: "Nigerian-First, Africa-Ready", desc: "Built for the Nigerian context first -- Naira pricing, local payment rails, WhatsApp support -- with an architecture built to expand across African markets." },
];

export default function InvestmentsPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "72px" }}>
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="gold-rule block mb-5" />
          <h1 className="display-hero text-white mb-5" style={{ maxWidth: 720 }}>
            Building the software layer <span className="text-gold-400">African businesses run on.</span>
          </h1>
          <p className="body-lg text-white/50 mb-10" style={{ maxWidth: 580 }}>
            JK Technology Limited is a CAC-registered Nigerian software company (CAC: {companyDetails.cac}) building
            a suite of vertical, industry-specific platforms alongside a profitable custom-development agency.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {HIGHLIGHTS.map(h => (
              <div key={h.l}>
                <p className="font-bold text-white leading-none mb-1.5" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>{h.v}</p>
                <p className="text-[0.7rem] text-white/40 font-mono uppercase tracking-wide">{h.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-navy-900 mb-10 text-center">Why JKTL</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map(p => (
              <div key={p.title} className="bg-white border border-cream-300 rounded p-7">
                <div className="w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center mb-4">
                  <span className="font-mono text-[0.65rem] font-bold text-gold-400">{p.icon}</span>
                </div>
                <p className="font-bold text-[1rem] text-navy-900 mb-2">{p.title}</p>
                <p className="body-sm text-black/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-cream-50 mb-3">Interested in learning more?</h2>
          <p className="body-md text-white/50 mb-8">
            For investment enquiries, partnership discussions, or to request our latest numbers, get in touch directly with the founder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`mailto:${siteConfig.email}?subject=Investment%20Enquiry`} className="btn-gold px-8 py-3.5">Email Us</a>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-cream px-8 py-3.5">WhatsApp the Founder</a>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-14 text-center">
        <p className="text-[0.8rem] text-black/40" style={{ maxWidth: 560, margin: "0 auto" }}>
          This page is informational and does not constitute an offer or solicitation to invest. Any investment
          discussion is subject to standard due diligence and applicable Nigerian securities regulations.
        </p>
      </section>
    </div>
  );
}

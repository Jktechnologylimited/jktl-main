import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Industries We Serve | JK Technology Limited",
  description: "Digital solutions tailored for every industry -- education, faith organisations, insurance, construction, fuel retail and general business.",
  alternates: { canonical: "https://jktl.com.ng/industries" },
};

const INDUSTRIES = [
  { icon: "ED", title: "Education",        desc: "Complete school operating systems for schools and educational institutions.", href: "/schooldesk" },
  { icon: "FA", title: "Faith & Ministry",  desc: "Digital management platforms for churches and faith organisations.", href: "/faithdesk" },
  { icon: "IN", title: "Insurance",         desc: "Policy, claims and client management for insurance agencies and brokers.", href: "/insurancedesk" },
  { icon: "CO", title: "Construction",      desc: "Project and operations management for construction and contracting companies.", href: "/constructiondesk" },
  { icon: "FL", title: "Fuel & Retail",     desc: "Inventory, sales and shift management for filling stations and fuel businesses.", href: "/gasstationdesk" },
  { icon: "AU", title: "Auto Detailing",    desc: "Booking, job tracking and client management for detailing businesses.", href: "/detaildesk" },
  { icon: "BU", title: "General Business",  desc: "CRM, operations and growth tools for businesses that don't fit a single mould.", href: "/businessdesk" },
  { icon: "AG", title: "Custom / Agency",   desc: "Bespoke websites and systems for any industry not listed here.", href: "/services" },
];

const BENEFITS = [
  { title: "Industry Expertise",   desc: "We understand your market and what your customers expect." },
  { title: "Tailored Solutions",   desc: "Custom systems and strategies designed for your unique business needs." },
  { title: "Better Results",       desc: "We help you attract the right customers and grow your business." },
  { title: "Built to Scale",       desc: "Our solutions grow with your business, no matter the industry." },
  { title: "Ongoing Support",      desc: "We're here to support you every step of the way, long after launch." },
];

export default function IndustriesPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Industries We Serve"
        heading="Digital Solutions Tailored For Every Industry"
        subhead="We understand the unique challenges of different industries. Our platforms and digital strategies are built to meet your specific goals and drive real results."
        primaryLabel="Discuss Your Project"
        primaryHref="/contact"
        secondaryLabel="View Our Work"
        secondaryHref="/case-studies"
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">INDUSTRIES</span></div>}
      />

      {/* INDUSTRIES GRID */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">We Help Businesses In Various Industries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <Link key={ind.title} href={ind.href} className="block no-underline bg-cream-50 border border-cream-300 rounded p-6 hover:border-navy-600 transition-colors">
                <div className="rounded bg-navy-950 mb-4" style={{ aspectRatio: "16/10" }} />
                <div className="w-8 h-8 rounded-sm bg-navy-900 flex items-center justify-center mb-3">
                  <span className="font-mono text-[0.58rem] font-bold text-gold-400">{ind.icon}</span>
                </div>
                <p className="font-bold text-[0.92rem] text-navy-900 mb-2">{ind.title}</p>
                <p className="text-[0.8rem] text-black/50 leading-relaxed mb-3">{ind.desc}</p>
                <span className="font-mono text-[0.66rem] font-bold text-navy-700 uppercase tracking-wide">Learn More &#8594;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRY-FOCUSED BENEFITS */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Industry-Focused Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="text-center">
                <div className="w-11 h-11 rounded-full border border-cream-300 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[0.88rem] text-navy-900 mb-2">{b.title}</p>
                <p className="text-[0.76rem] text-black/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK ACROSS INDUSTRIES */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Work Across Industries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {["Education", "Faith & Ministry", "Insurance", "Construction"].map(cat => (
              <div key={cat}>
                <div className="rounded bg-cream-100 border border-cream-300 mb-3" style={{ aspectRatio: "4/3" }} />
                <p className="font-bold text-[0.85rem] text-navy-900">Project Title</p>
                <p className="text-[0.72rem] text-black/40">{cat}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/case-studies" className="btn-outline-navy px-6 py-3 inline-block text-sm uppercase tracking-wide">View All Case Studies</Link>
          </div>
        </div>
      </section>

      <CTABanner heading="Let's Build Something Great For Your Industry" subhead="Tell us about your business and we'll show you how we can help you grow." />
    </div>
  );
}

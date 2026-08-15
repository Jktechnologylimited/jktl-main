import type { Metadata } from "next";
import Link from "next/link";
import { companyDetails } from "@/data/index";

export const metadata: Metadata = {
  title: "Service Areas | JK Technology Limited",
  description: "Where JK Technology Limited operates -- Port Harcourt and Rivers State on the ground, with Desk products and remote delivery serving businesses across Nigeria.",
  alternates: { canonical: "https://jktl.com.ng/service-areas" },
};

const AREAS = [
  { city: "Lagos",         state: "Lagos State",   note: "Headquarters -- in-person consultations, on-site visits and installs." },
  { city: "Port Harcourt", state: "Rivers State",  note: "Active client base -- remote delivery and scheduled on-site visits." },
  { city: "Abuja",         state: "FCT",           note: "Remote delivery and scheduled on-site visits for larger projects." },
  { city: "Nationwide",    state: "All 36 states",  note: "Every Desk product (SchoolDesk, FaithDesk, DetailDesk and more) is self-service and works anywhere in Nigeria." },
];

const INDUSTRIES = [
  "Schools & educational institutions", "Churches & faith organisations", "Insurance agencies & brokers",
  "Construction & contracting companies", "Filling stations & fuel businesses", "Auto detailing businesses",
  "General businesses & SMEs",
];

export default function ServiceAreasPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "72px" }}>
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="gold-rule block mb-5" />
          <h1 className="display-hero text-white mb-5" style={{ maxWidth: 700 }}>
            Where We <span className="text-gold-400">Work.</span>
          </h1>
          <p className="body-lg text-white/50" style={{ maxWidth: 560 }}>
            Headquartered in Lagos -- serving businesses across Nigeria through
            self-service software and remote-first custom development.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-navy-900 mb-8">Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AREAS.map(a => (
              <div key={a.city} className="bg-white border border-cream-300 rounded p-6">
                <p className="font-bold text-[1.05rem] text-navy-900">{a.city}</p>
                <p className="font-mono text-[0.68rem] text-black/35 uppercase tracking-wide mb-2">{a.state}</p>
                <p className="body-sm text-black/55">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-cream-50 mb-8">Industries We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INDUSTRIES.map(i => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-gold-400 shrink-0">&#10003;</span>
                <span className="text-[0.88rem] text-white/70">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="display-lg text-navy-900 mb-3">Not sure if we cover your area?</h2>
          <p className="body-md text-black/50 mb-8">Reach out and we&apos;ll tell you exactly how we can help, wherever you&apos;re based.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-gold px-8 py-3.5">Contact Us</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-navy px-8 py-3.5">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, companyDetails, deskProducts } from "@/data/index";

export const metadata: Metadata = {
  title: "Contact | JK Technology Limited",
  description: "Contact JK Technology Limited. WhatsApp, email, or submit an inquiry. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream-50">
      <section className="bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "64px" }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <span className="gold-rule block mb-5" />
          <h1 className="display-hero text-white mb-4">Get in touch.</h1>
          <p className="body-lg text-white/50">We respond within 24 hours. WhatsApp is fastest.</p>
        </div>
      </section>

      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Direct contact */}
            <div className="flex flex-col gap-4">
              <div className="bg-navy-900 rounded p-6">
                <p className="label-xs text-gold-400 mb-4">Fastest Response</p>
                <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded no-underline transition-colors"
                  style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}>
                  <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-[1rem] text-white">WhatsApp</p>
                    <p className="text-[0.82rem] text-white/50">{companyDetails.whatsapp}</p>
                    <p className="text-[0.72rem] text-green-400 font-mono mt-0.5">Typically responds within 2 hours</p>
                  </div>
                </a>
              </div>

              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="label-xs text-black/35 mb-4">Email & Phone</p>
                <div className="flex flex-col gap-4">
                  <a href={"mailto:" + siteConfig.email}
                    className="flex items-center gap-3 no-underline">
                    <div className="w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center shrink-0">
                      <span className="font-mono text-[0.58rem] font-bold text-gold-400">EM</span>
                    </div>
                    <div>
                      <p className="font-bold text-[0.88rem] text-navy-900">{siteConfig.email}</p>
                      <p className="text-[0.72rem] text-black/40">Responds within 24 hours</p>
                    </div>
                  </a>
                  <a href={"tel:" + siteConfig.phone.replace(/ /g, "")}
                    className="flex items-center gap-3 no-underline">
                    <div className="w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center shrink-0">
                      <span className="font-mono text-[0.58rem] font-bold text-gold-400">PH</span>
                    </div>
                    <div>
                      <p className="font-bold text-[0.88rem] text-navy-900">{siteConfig.phone}</p>
                      <p className="text-[0.72rem] text-black/40">Lagos, Nigeria</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-cream-100 border border-cream-300 rounded p-5">
                <p className="font-bold text-[0.88rem] text-navy-900 mb-2">What happens after you contact us?</p>
                <div className="flex flex-col gap-2">
                  {["You describe what you need","We review and respond within 24 hours","We send a scoped proposal and price","You approve -- project begins"].map((s, i) => (
                    <div key={s} className="flex gap-3 text-[0.8rem] text-black/60">
                      <span className="font-mono text-[0.65rem] font-bold text-gold-400 shrink-0 mt-0.5">0{i+1}</span>{s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What to contact us about */}
            <div className="flex flex-col gap-4">
              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="label-xs text-black/35 mb-4">Desk Products</p>
                <div className="flex flex-col gap-3">
                  {deskProducts.map(p => (
                    <Link key={p.id} href={p.status === "live" ? p.getStartedHref : p.href}
                      className="flex items-center gap-3 no-underline">
                      <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                        style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                        <span className="font-mono text-[0.6rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-[0.85rem] text-navy-900">{p.name}</p>
                        <p className="text-[0.72rem] text-black/40">{p.status === "live" ? "Self-service -- go live today" : "Join waitlist"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="label-xs text-black/35 mb-4">Agency Services</p>
                <p className="text-[0.82rem] text-black/55 mb-4 leading-[1.65]">
                  Need a custom website, SEO, CRM, payment system, AI chatbot, or email automation? Submit a discovery form and we will scope and quote within 24 hours.
                </p>
                <Link href="/get-started/services" className="btn-gold text-sm w-full justify-center py-3">
                  Submit Service Inquiry
                </Link>
              </div>

              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="label-xs text-black/35 mb-4">Affiliate Programme</p>
                <p className="text-[0.82rem] text-black/55 mb-4 leading-[1.65]">
                  Interested in earning commissions by referring businesses to Desk? Join our affiliate programme -- free to join, N10,000 welcome bonus.
                </p>
                <Link href="/affiliates" className="btn-outline-navy text-sm w-full justify-center py-3">
                  Join Affiliate Programme
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

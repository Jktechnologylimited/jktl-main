import Link from "next/link";
import { deskProducts, companyDetails } from "@/data/index";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-navy-950" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="gold-rule inline-block mb-5" />
          <h1 className="display-hero text-white mb-4">What are you building?</h1>
          <p className="body-lg text-white/45">Choose your path. Desk products are self-service. Agency work requires a brief.</p>
        </div>

        {/* Desk products */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {deskProducts.map(p => (
            <Link key={p.id} href={p.status === "live" ? p.getStartedHref : p.href}
              className="block no-underline p-7 rounded transition-colors"
              style={{ background: "rgba(249,247,240,0.04)", border: `1px solid rgba(249,247,240,0.08)`, borderTop: `3px solid ${p.color}` }}>
              <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-4"
                style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                <span className="font-mono text-[0.75rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
              </div>
              <p className="font-bold text-[1.05rem] text-white mb-1">{p.name}</p>
              <p className="text-[0.75rem] text-white/40 mb-4 leading-relaxed">{p.tagline}</p>
              <p className="font-mono text-[0.62rem] font-bold" style={{ color: p.status === "live" ? p.color : "rgba(249,247,240,0.25)" }}>
                {p.status === "live" ? "Start onboarding -- 10 min" : "Join waitlist"}
              </p>
            </Link>
          ))}
        </div>

        {/* Agency */}
        <Link href="/get-started/services"
          className="block no-underline p-6 rounded transition-colors"
          style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)" }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-sm bg-gold-400/15 border border-gold-400/30 flex items-center justify-center shrink-0">
                  <span className="font-mono text-[0.62rem] font-bold text-gold-400">AG</span>
                </div>
                <p className="font-bold text-[1rem] text-gold-400">Custom Agency Services</p>
              </div>
              <p className="text-[0.82rem] text-white/45 leading-[1.6]" style={{ maxWidth: 500 }}>
                Need a custom website, SEO, CRM, payment system, AI chatbot, or email automation?
                Tell us what you need and we will scope a proposal within 24 hours.
              </p>
            </div>
            <div className="font-mono text-[0.65rem] text-gold-400/60 shrink-0">
              Not self-service -- requires review
            </div>
          </div>
        </Link>

        <div className="mt-8 text-center">
          <p className="text-white/25 text-[0.78rem] mb-3">Not sure which path? Message us directly.</p>
          <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-bold text-[0.72rem] uppercase tracking-wide"
            style={{ background: "rgba(37,211,102,0.1)", color: "#16a34a", border: "1px solid rgba(37,211,102,0.2)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { deskPlans, productPricing, businessSuiteRoadmap, siteConfig, companyDetails, ACCOUNTS_URL } from "@/data/index";
import { getDeskProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Desk by JK Technology | Vertical Software for African Businesses",
  description: "Desk is a suite of industry-specific management software. FaithDesk for ministries, DetailDesk for auto detailing businesses, SchoolDesk for schools. Self-service onboarding, Paystack billing, live today.",
  alternates: { canonical: "https://jktl.com.ng/desk" },
};

function fmtN(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default async function DeskPage() {
  const deskProducts = await getDeskProducts();
  return (
    <div className="bg-cream-50">

      {/* Hero */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 px-4 py-1.5 rounded-sm mb-6">
            <span className="label-xs text-gold-400">jktl.com.ng / desk</span>
          </div>
          <h1 className="display-hero text-white mb-4" style={{ maxWidth: 700 }}>
            Desk. <span className="text-gold-400">Vertical Software Suite.</span>
          </h1>
          <p className="body-lg text-white/50 mb-3" style={{ maxWidth: 540 }}>
            Industry-specific management systems built for African businesses. Self-service onboarding. Real-time deployment. Paystack billing.
          </p>
          <p className="font-mono text-[0.72rem] text-white/25 mb-8">
            Like Google Workspace -- except built for churches, schools, and auto detailing businesses in Nigeria.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/get-started" className="btn-gold px-7 py-3.5">Choose a Product</Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-ghost px-5 py-3.5 flex items-center gap-2 text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Products detail rows */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12">
            <span className="gold-rule block mb-3" />
            <h2 className="display-lg text-navy-900">Three Products. One Suite.</h2>
          </div>

          <div className="flex flex-col gap-4">
            {deskProducts.map(p => {
              const pp = productPricing[p.id as keyof typeof productPricing];
              return (
                <div key={p.id} className="bg-white border border-cream-300 rounded p-6 sm:p-8"
                  style={{ borderLeft: `4px solid ${p.color}` }}>
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-12 h-12 rounded-sm flex items-center justify-center"
                        style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                        <span className="font-mono text-[0.72rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-[1.15rem] text-navy-900">{p.name}</p>
                        <p className="text-[0.72rem] text-black/40">{p.tagline}</p>
                        <span className="inline-block font-mono text-[0.58rem] font-bold px-2 py-0.5 rounded mt-1"
                          style={{ background: p.status === "live" ? "rgba(5,150,105,0.1)" : "rgba(245,158,11,0.1)", color: p.status === "live" ? "#059669" : "#D97706" }}>
                          {p.status === "live" ? "LIVE" : "COMING SOON"}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="body-md text-black/55 leading-[1.7]">{p.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      {pp && pp.setup ? (
                        <>
                          <p className="font-bold text-[1.4rem] text-navy-900 leading-none">{fmtN(pp.setup)}</p>
                          <p className="text-[0.68rem] text-black/35 mb-1">setup fee</p>
                          <p className="font-bold text-[0.9rem] text-navy-700">{fmtN(pp.monthly)}<span className="font-normal text-[0.75rem] text-black/35">/mo</span></p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-[1rem] text-navy-900">Waitlist</p>
                          <p className="text-[0.72rem] text-black/40">lock in {fmtN((pp as {monthly:number}).monthly)}/mo</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Features grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 mb-5">
                    {p.features.map(f => (
                      <div key={f} className="flex gap-2 text-[0.8rem] text-black/60 items-start">
                        <span className="shrink-0 mt-0.5" style={{ color: p.color }}>&#10003;</span>{f}
                      </div>
                    ))}
                  </div>

                  {/* Domain structure */}
                  <div className="border-t border-cream-200 pt-4 mb-5">
                    <p className="label-xs text-black/30 mb-2">Your domains</p>
                    <div className="flex flex-wrap gap-2">
                      {p.domains.map((d: {label:string;example:string;type:string}) => (
                        <div key={d.label} className="flex items-center gap-2">
                          <span className="font-mono text-[0.72rem] text-black/50">{d.example}</span>
                          <span className="font-mono text-[0.58rem] font-bold px-1.5 py-0.5 rounded"
                            style={{
                              background: d.type === "public" ? "rgba(6,182,212,0.1)" : d.type === "admin" ? "rgba(239,68,68,0.1)" : d.type === "portal" ? "rgba(139,92,246,0.1)" : "rgba(245,158,11,0.1)",
                              color: d.type === "public" ? "#0891B2" : d.type === "admin" ? "#DC2626" : d.type === "portal" ? "#7C3AED" : "#D97706",
                            }}>{d.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 flex-wrap">
                    {p.status === "live" ? (
                      <>
                        <Link href={p.getStartedHref}
                          className="px-6 py-2.5 text-white text-[0.72rem] font-bold rounded-sm uppercase tracking-wide no-underline"
                          style={{ background: p.color }}>
                          Get Started
                        </Link>
                        <Link href={p.href} className="px-6 py-2.5 bg-transparent border border-cream-300 text-black/60 text-[0.72rem] font-semibold rounded-sm no-underline">
                          Full Details
                        </Link>
                      </>
                    ) : (
                      <Link href={p.href}
                        className="px-6 py-2.5 text-[0.72rem] font-bold rounded-sm no-underline"
                        style={{ background: p.color + "20", color: p.color, border: `1px solid ${p.color}30` }}>
                        Join Waitlist
                      </Link>
                    )}
                    <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                      className="px-5 py-2.5 text-[0.72rem] font-semibold rounded-sm no-underline flex items-center gap-1.5"
                      style={{ background: "rgba(37,211,102,0.08)", color: "#16a34a", border: "1px solid rgba(37,211,102,0.2)" }}>
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing table */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="display-lg text-cream-50 mb-3">Pricing Plans</h2>
            <p className="text-white/40 text-[0.9rem]">Same plans across all Desk products. One-time setup + monthly subscription.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {deskPlans.map(plan => (
              <div key={plan.id} className="p-7 flex flex-col"
                style={{ background: plan.highlight ? "rgba(201,168,76,0.06)" : "var(--navy-800)", borderTop: plan.highlight ? "2px solid #C9A84C" : "2px solid transparent" }}>
                {plan.highlight && <p className="font-mono text-[0.58rem] text-gold-400 tracking-widest mb-2">MOST POPULAR</p>}
                <p className="font-bold text-[1rem] mb-1" style={{ color: plan.highlight ? "#C9A84C" : "var(--cream-50)" }}>{plan.name}</p>
                <p className="text-[0.75rem] text-white/40 mb-5">{plan.description}</p>
                <p className="font-display font-light text-[2rem] text-white leading-none mb-0.5">{fmtN(plan.setupFee)}</p>
                <p className="text-[0.68rem] text-white/30 mb-1.5">one-time setup</p>
                <p className="font-bold text-[0.9rem] mb-5" style={{ color: plan.highlight ? "#E2CF96" : "var(--cream-50)" }}>
                  {fmtN(plan.monthlyFee)}<span className="font-normal text-[0.78rem] text-white/35">/mo</span>
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex gap-2 text-[0.78rem] text-white/50 items-start">
                      <span style={{ color: plan.highlight ? "#C9A84C" : "#34D399" }} className="shrink-0">&#10003;</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/get-started"
                  className="block py-3 text-center font-bold text-[0.72rem] uppercase tracking-widest rounded-sm no-underline"
                  style={{ background: plan.highlight ? "#C9A84C" : "rgba(249,247,240,0.08)", color: plan.highlight ? "#060E2A" : "var(--cream-50)" }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-white/25 text-[0.78rem]">
              All plans include a 30-day money-back guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding flow */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <span className="gold-rule inline-block mb-3" />
            <h2 className="display-lg text-navy-900 mb-2">Go live in 10 minutes.</h2>
            <p className="text-black/50 text-[0.9rem]">Self-service. No developer. No waiting. 8 steps and you are live.</p>
          </div>
          <div className="flex flex-col gap-0">
            {[
              { n: "01", t: "Create JKTL Account",    d: "Sign up at accounts.jktl.com.ng with Google, Microsoft, or email. One account for all JKTL products." },
              { n: "02", t: "Organisation Details",    d: "Enter your organisation name, owner name, phone, email, and address. Takes 2 minutes." },
              { n: "03", t: "Choose Subdomain",        d: "Pick your URL: yourchurch.jktl.com.ng. Real-time availability check. Custom domain on Pro and Enterprise." },
              { n: "04", t: "Upload Branding",         d: "Upload your logo and pick your brand colour. Live preview before you pay." },
              { n: "05", t: "Choose Plan",             d: "Standard, Pro, or Enterprise. All features listed clearly. No hidden costs." },
              { n: "06", t: "Pay Setup Fee",           d: "Secure Paystack payment. Setup fee charged once. Monthly subscription starts after." },
              { n: "07", t: "Auto Deploy",             d: "Payment confirmed. System provisioned automatically. Login credentials sent to your email." },
              { n: "08", t: "Go Live",                 d: "Your system is live. Open WhatsApp and message us -- we onboard you in 30 minutes." },
            ].map((step, i) => (
              <div key={step.n} className="flex gap-5 py-4 border-b border-cream-300 last:border-0 items-start">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: i === 7 ? "#059669" : "var(--navy-900)" }}>
                  <span className="font-mono text-[0.65rem] font-bold" style={{ color: i === 7 ? "#fff" : "#C9A84C" }}>{step.n}</span>
                </div>
                <div>
                  <p className="font-bold text-[0.9rem] text-navy-900 mb-0.5">{step.t}</p>
                  <p className="text-[0.82rem] text-black/55 leading-[1.6]">{step.d}</p>
                  {i === 7 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {["System provisioned","Credentials emailed","Subscription started","Affiliate credited if referred"].map(a => (
                        <span key={a} className="font-mono text-[0.62rem] text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">&#10003; {a}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/get-started" className="btn-gold px-10 py-3.5">Start Onboarding</Link>
          </div>
        </div>
      </section>

      {/* Business Suite Roadmap */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[0.6rem] bg-amber-500/15 text-amber-600 px-2.5 py-1 rounded tracking-widest uppercase font-bold">Roadmap -- Not yet built</span>
            <h2 className="font-bold text-[1.1rem] text-navy-900">Business Suite -- Coming Later</h2>
          </div>
          <p className="text-black/55 text-[0.9rem] mb-6" style={{ maxWidth: 600 }}>
            After Desk matures, JKTL will launch a Business Suite -- general business tools with a free tier and platform-fee revenue model. The SSO infrastructure already supports them.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {businessSuiteRoadmap.map(p => (
              <div key={p.id} className="bg-white border border-cream-300 rounded p-6 opacity-70">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center"
                    style={{ background: p.color + "15", border: `1px solid ${p.color}30` }}>
                    <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[0.95rem] text-navy-900">{p.name}</p>
                    <p className="text-[0.7rem] text-black/40">{p.tagline}</p>
                  </div>
                </div>
                <p className="text-[0.82rem] text-black/55 leading-[1.6]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

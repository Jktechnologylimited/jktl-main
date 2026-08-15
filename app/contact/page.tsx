"use client";
import { useState } from "react";
import { siteConfig } from "@/data/index";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";

const WAYS = [
  { icon: "call",  title: "Call Us",   line1: siteConfig.phone,  line2: "We respond within 24 hours" },
  { icon: "mail",  title: "Email Us",  line1: siteConfig.email,  line2: "We reply within 24 hours" },
  { icon: "pin",   title: "Visit Us",  line1: siteConfig.location, line2: "By appointment" },
  { icon: "clock", title: "Response Time", line1: "Within 24 Hours", line2: "WhatsApp is fastest" },
];

const ICONS: Record<string, React.ReactNode> = {
  call: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
  pin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
};

const FAQS = [
  { q: "How long does it take to build a system?", a: "Timelines vary by scope -- a marketing website typically takes 2-4 weeks, while a full platform like SchoolDesk or a custom system can take longer. We'll give you a clear timeline before work begins." },
  { q: "Can you help with domain and hosting?",     a: "Yes -- we can register domains, set up hosting and manage deployment as part of your project." },
  { q: "What information do you need to get started?", a: "Just tell us about your business, goals and what you're trying to achieve. We'll scope the rest with you." },
  { q: "Will my system be mobile-friendly?",        a: "Always. Every platform we build is fully responsive across phones, tablets and desktops." },
  { q: "Do you provide ongoing maintenance?",       a: "Yes -- we offer maintenance and support plans to keep your platform updated, secure and running smoothly." },
  { q: "Do you work with businesses in my industry?", a: "We build both industry-specific platforms (schools, churches, insurance, construction and more) and custom systems for any industry. Reach out and we'll tell you exactly how we can help." },
];

const inputCls = "w-full px-4 py-3 rounded-sm border border-cream-300 bg-white text-[0.85rem] text-navy-900 placeholder:text-black/30 outline-none focus:border-navy-600 transition-colors";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Contact Us"
        heading="Let's Build Something Great Together"
        subhead="Have a project in mind or need help growing your business online? We'd love to hear from you."
        primaryLabel="Get in Touch"
        primaryHref="#form"
        secondaryLabel="WhatsApp Us"
        secondaryHref={`https://wa.me/${siteConfig.whatsapp}`}
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">CONTACT</span></div>}
      />

      {/* WAYS TO REACH US */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Ways To Reach Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WAYS.map(w => (
              <div key={w.title} className="bg-cream-50 border border-cream-300 rounded p-6 text-center">
                <div className="w-11 h-11 rounded-sm border border-cream-300 flex items-center justify-center mx-auto mb-4 text-navy-800">
                  {ICONS[w.icon]}
                </div>
                <p className="font-bold text-[0.88rem] text-navy-900 mb-1.5">{w.title}</p>
                <p className="text-[0.82rem] text-navy-800 font-semibold mb-0.5">{w.line1}</p>
                <p className="text-[0.72rem] text-black/40">{w.line2}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + LOCATION */}
      <section id="form" className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <h2 className="display-lg text-navy-900 mb-2">Send Us a Message</h2>
            <p className="body-sm text-black/50 mb-7">Fill out the form and we'll get back to you as soon as possible.</p>
            {sent ? (
              <div className="bg-white border border-cream-300 rounded p-8 text-center">
                <p className="font-bold text-navy-900 mb-1">Message ready &#10003;</p>
                <p className="text-[0.82rem] text-black/50">This form isn't wired to a live inbox yet -- it'll send for real once the backend is reconnected.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required type="text" placeholder="Full Name *" className={inputCls} />
                  <input required type="email" placeholder="Email Address *" className={inputCls} />
                </div>
                <input type="tel" placeholder="Phone Number" className={inputCls} />
                <input type="text" placeholder="Company / Business Name" className={inputCls} />
                <input type="text" placeholder="Subject" className={inputCls} />
                <textarea required placeholder="How can we help you? *" rows={5} className={inputCls} style={{ resize: "vertical" }} />
                <button type="submit" className="btn-primary py-3.5 text-sm uppercase tracking-wide flex items-center justify-center gap-2">
                  Send Message
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </button>
              </form>
            )}
          </div>

          {/* Location */}
          <div>
            <h2 className="display-lg text-navy-900 mb-2">Our Location</h2>
            <p className="body-sm text-black/50 mb-7">&nbsp;</p>
            <div className="rounded border border-cream-300 overflow-hidden bg-cream-100 flex items-center justify-center mb-4" style={{ aspectRatio: "4/3" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--navy-900)"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3.5" fill="white" /></svg>
            </div>
            <div className="bg-white border border-cream-300 rounded p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-navy-800 shrink-0">{ICONS.pin}</span>
                <div>
                  <p className="font-bold text-[0.85rem] text-navy-900">Our Office</p>
                  <p className="text-[0.78rem] text-black/45">{siteConfig.location}</p>
                </div>
              </div>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-outline-navy px-4 py-2 text-[0.72rem] uppercase tracking-wide">Get Directions</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="bg-cream-50 border border-cream-300 rounded overflow-hidden self-start">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-transparent border-none text-left cursor-pointer">
                  <span className="font-semibold text-[0.85rem] text-navy-900">{f.q}</span>
                  <span className="text-navy-900 text-lg shrink-0">{openFaq === i ? "\u2212" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-4 text-[0.8rem] text-black/55 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to Grow Your Business Online?" subhead="Let's discuss your project and create a powerful digital solution that delivers real results." />
    </div>
  );
}

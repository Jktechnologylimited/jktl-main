"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig, companyDetails, productPricing } from "@/data/index";

const pricing = productPricing.schooldesk;

export default function SchoolDeskPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function joinWaitlist() {
    if (!email || !school) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product:"schooldesk", email, phone, school }),
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="bg-cream-50">

      {/* HERO */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop:"clamp(88px,12vw,120px)", paddingBottom:"clamp(48px,8vw,80px)" }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 rounded-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-mono text-[0.6rem] tracking-widest text-emerald-400 uppercase">SchoolDesk -- Coming Soon -- Waitlist Open</span>
          </div>

          <h1 className="font-display font-light text-white leading-[1.05] mb-6"
            style={{ fontSize:"clamp(1.8rem,5vw,3.2rem)" }}>
            Every Parent Will Pay Fees On Time.<br />
            <span className="text-emerald-400">Every Student Record Will Be Searchable</span><br />
            <span className="text-white/50 italic" style={{ fontSize:"clamp(1.2rem,3vw,1.8rem)" }}>In 3 Seconds.</span>
          </h1>

          <div className="border-l-4 pl-5 mb-8 border-emerald-500">
            <p className="text-white/65 leading-[1.8]" style={{ fontSize:"clamp(0.9rem,2vw,1rem)", maxWidth:600 }}>
              Schools with an online payment portal collect fees 40% faster than those relying on manual collection.
              SchoolDesk brings Nigerian schools the same technology top Lagos schools already have -- at a price every school can afford.
              We are launching soon. Join the waitlist today and lock in N{(pricing.monthly||0).toLocaleString()}/month for life.
            </p>
          </div>

          {/* AWOOF OFFER */}
          <div className="rounded border border-emerald-500/30 bg-emerald-500/08 p-5 sm:p-6 mb-8">
            <p className="font-mono text-[0.62rem] tracking-widest text-emerald-400 uppercase mb-2">Waitlist Offer -- Limited Spots</p>
            <p className="text-white font-bold text-xl mb-1">Lock in N{(pricing.monthly||0).toLocaleString()}/month forever.</p>
            <p className="text-white/55 text-[0.85rem] mb-4">
              The launch price will be higher. Schools on the waitlist lock in today's rate for the life of their subscription.
              Once the spots fill, the offer closes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Fees collection and receipts",
                "Student and parent portal",
                "Public school website",
                "Staff management system",
                "Analytics and reporting",
                "First 2 months FREE on launch",
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-[0.82rem] text-white/70">
                  <span className="text-emerald-400 shrink-0">&#10003;</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-8">
            <span className="block w-10 h-px bg-gold-400 mb-4 mx-auto" />
            <h2 className="font-display font-light text-navy-900 mb-2" style={{ fontSize:"clamp(1.4rem,4vw,2rem)" }}>
              Join the waitlist.
            </h2>
            <p className="text-black/50 text-[0.9rem]">
              Lock in N{(pricing.monthly||0).toLocaleString()}/month. Be first to go live. No payment required now.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white border-2 border-emerald-500 rounded p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-bold text-xl text-navy-900 mb-2">You are on the list!</h3>
              <p className="text-black/55 text-[0.85rem] mb-2">
                We will contact you when SchoolDesk launches. Your N{(pricing.monthly||0).toLocaleString()}/month rate is locked.
              </p>
              <p className="text-black/35 text-[0.75rem]">
                Questions? WhatsApp us at {companyDetails.whatsapp}
              </p>
            </div>
          ) : (
            <div className="bg-white border border-cream-300 rounded p-7 flex flex-col gap-4">
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/40 mb-1.5">School Name *</label>
                <input value={school} onChange={e => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-300 rounded-sm text-[0.9rem] outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Grace Academy, Lagos" />
              </div>
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/40 mb-1.5">Email Address *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-300 rounded-sm text-[0.9rem] outline-none focus:border-emerald-500 transition-colors"
                  placeholder="principal@yourschool.com" />
              </div>
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/40 mb-1.5">WhatsApp Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-300 rounded-sm text-[0.9rem] outline-none focus:border-emerald-500 transition-colors"
                  placeholder="+234 803 000 0000" />
              </div>
              <button onClick={joinWaitlist} disabled={loading || !email || !school}
                className="w-full py-4 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm border-none cursor-pointer disabled:opacity-50"
                style={{ background:"#10B981", color:"#fff" }}>
                {loading ? "Joining..." : "Join Waitlist -- Lock in N" + (pricing.monthly||0).toLocaleString() + "/mo"}
              </button>
              <p className="text-center text-[0.72rem] text-black/35">
                No payment now. We will contact you before launch.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

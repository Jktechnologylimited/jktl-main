"use client";

import { useState, useEffect } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  trade: string;
  missedPerWeek: number;
  avgJobValue: number;
  closeRate: number;
  email: string;
}

interface Results {
  perMonth: number;
  perYear: number;
  recoverable: number;
  jobsLost: number;
}

// ─── Metadata (export from a separate file if needed, or via generateMetadata) ─
export const metadata = {
  title: "Free Missed Call Calculator | How Much Are You Losing? — CallBackPro",
  description:
    "Find out exactly how much revenue your home service business loses to missed calls every month. Takes 30 seconds.",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [step, setStep] = useState<"form" | "results" | "capture">("form");
  const [form, setForm] = useState<FormData>({
    trade: "",
    missedPerWeek: 5,
    avgJobValue: 800,
    closeRate: 40,
    email: "",
  });
  const [results, setResults] = useState<Results | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    setAnimIn(true);
  }, [step]);

  const trades = [
    "Plumber",
    "HVAC Technician",
    "Electrician",
    "Roofer",
    "Landscaper",
    "Pest Control",
    "General Contractor",
    "Other",
  ];

  function calculate() {
    const jobsLostPerWeek = form.missedPerWeek * (form.closeRate / 100);
    const jobsLostPerMonth = jobsLostPerWeek * 4.33;
    const perMonth = jobsLostPerMonth * form.avgJobValue;
    const perYear = perMonth * 12;
    const recoverable = perMonth * 0.65; // ~65% recoverable with auto follow-up

    setResults({
      perMonth: Math.round(perMonth),
      perYear: Math.round(perYear),
      recoverable: Math.round(recoverable),
      jobsLost: Math.round(jobsLostPerMonth),
    });

    setAnimIn(false);
    setTimeout(() => setStep("results"), 50);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <div className="min-h-screen bg-navy-950 font-sans">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-navy-800">
        {/* grid bg */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-gold-300 uppercase">
              Free Revenue Audit
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-50 leading-none mb-6">
            How Much Are Missed Calls{" "}
            <span className="italic text-gold-300">Costing You?</span>
          </h1>

          <p className="text-navy-200 text-lg max-w-xl mx-auto leading-relaxed">
            Takes 30 seconds. Most home service businesses are shocked by the number.
          </p>
        </div>
      </section>

      {/* ── Main Card ───────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-16">

        {/* STEP: FORM */}
        {step === "form" && (
          <div
            className={`transition-all duration-500 ${
              animIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden">

              {/* Card header */}
              <div className="px-8 pt-8 pb-6 border-b border-navy-800">
                <p className="font-mono text-xs tracking-widest text-gold-400 uppercase mb-2">
                  Step 1 of 1
                </p>
                <h2 className="font-display text-2xl font-light text-cream-100">
                  Tell us about your business
                </h2>
              </div>

              <div className="px-8 py-8 space-y-8">

                {/* Trade selector */}
                <div>
                  <label className="block text-sm font-medium text-navy-200 mb-3">
                    What type of home service business?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {trades.map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, trade: t })}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                          form.trade === t
                            ? "bg-gold-400 border-gold-400 text-navy-950"
                            : "bg-navy-800 border-navy-700 text-navy-200 hover:border-gold-400/50 hover:text-cream-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Missed calls slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-medium text-navy-200">
                      Missed calls per week
                    </label>
                    <span className="font-display text-3xl font-light text-gold-300">
                      {form.missedPerWeek}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={form.missedPerWeek}
                    onChange={(e) =>
                      setForm({ ...form, missedPerWeek: +e.target.value })
                    }
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #C9A84C ${
                        ((form.missedPerWeek - 1) / 29) * 100
                      }%, #112055 0%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-navy-500 font-mono">
                    <span>1/week</span>
                    <span>30/week</span>
                  </div>
                  <p className="mt-2 text-xs text-navy-500">
                    Average home service business misses 8–12 calls/week
                  </p>
                </div>

                {/* Avg job value slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-medium text-navy-200">
                      Average job value
                    </label>
                    <span className="font-display text-3xl font-light text-gold-300">
                      ${form.avgJobValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={5000}
                    step={50}
                    value={form.avgJobValue}
                    onChange={(e) =>
                      setForm({ ...form, avgJobValue: +e.target.value })
                    }
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #C9A84C ${
                        ((form.avgJobValue - 200) / 4800) * 100
                      }%, #112055 0%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-navy-500 font-mono">
                    <span>$200</span>
                    <span>$5,000</span>
                  </div>
                </div>

                {/* Close rate slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="text-sm font-medium text-navy-200">
                      Your close rate (if you reach them)
                    </label>
                    <span className="font-display text-3xl font-light text-gold-300">
                      {form.closeRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    step={5}
                    value={form.closeRate}
                    onChange={(e) =>
                      setForm({ ...form, closeRate: +e.target.value })
                    }
                    className="w-full h-1 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #C9A84C ${
                        ((form.closeRate - 10) / 80) * 100
                      }%, #112055 0%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-navy-500 font-mono">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={calculate}
                  disabled={!form.trade}
                  className={`w-full py-4 rounded-xl font-semibold text-base tracking-wide transition-all duration-200 ${
                    form.trade
                      ? "bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-lg shadow-gold-400/20"
                      : "bg-navy-800 text-navy-600 cursor-not-allowed"
                  }`}
                >
                  {form.trade ? "Calculate My Revenue Leak →" : "Select your trade above first"}
                </button>

                {!form.trade && (
                  <p className="text-center text-xs text-navy-600">
                    Select your trade type to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP: RESULTS */}
        {step === "results" && results && (
          <div
            className={`transition-all duration-500 ${
              animIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Big loss number */}
            <div className="text-center mb-8">
              <p className="font-mono text-xs tracking-widest text-gold-400 uppercase mb-4">
                Your Revenue Leak
              </p>
              <div className="font-display font-light text-cream-50 leading-none mb-2"
                style={{ fontSize: "clamp(4rem, 15vw, 8rem)" }}>
                {fmt(results.perMonth)}
              </div>
              <p className="text-navy-300 text-lg">lost every single month</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 text-center">
                <div className="font-display text-3xl font-light text-gold-300 mb-1">
                  {results.jobsLost}
                </div>
                <div className="text-xs text-navy-400 leading-snug">
                  jobs lost per month
                </div>
              </div>
              <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 text-center">
                <div className="font-display text-3xl font-light text-gold-300 mb-1">
                  {fmt(results.perYear)}
                </div>
                <div className="text-xs text-navy-400 leading-snug">
                  lost per year
                </div>
              </div>
              <div className="bg-navy-900 border border-navy-700 rounded-xl p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 border border-green-500/20 rounded-xl" />
                <div className="relative font-display text-3xl font-light text-green-400 mb-1">
                  {fmt(results.recoverable)}
                </div>
                <div className="relative text-xs text-navy-400 leading-snug">
                  recoverable/mo
                </div>
              </div>
            </div>

            {/* Insight box */}
            <div className="bg-navy-900 border border-gold-400/20 rounded-xl p-6 mb-6">
              <div className="flex gap-3">
                <div className="w-1 rounded-full bg-gold-400 flex-shrink-0" />
                <div>
                  <p className="text-cream-100 font-medium mb-1">
                    {form.trade} businesses in your range typically recover{" "}
                    <span className="text-gold-300">65% of lost leads</span> with
                    automated follow-up.
                  </p>
                  <p className="text-navy-400 text-sm leading-relaxed">
                    That&apos;s because 65% of missed callers will respond to a
                    text within 5 minutes — they just don&apos;t leave voicemails.
                    An auto text-back catches them before they call your competitor.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setAnimIn(false);
                  setTimeout(() => setStep("capture"), 50);
                }}
                className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-navy-950 rounded-xl font-semibold text-base tracking-wide transition-all shadow-lg shadow-gold-400/20"
              >
                Get the Free Setup Guide →
              </button>
              <button
                onClick={() => {
                  setAnimIn(false);
                  setTimeout(() => {
                    setStep("form");
                    setForm({ ...form, trade: "" });
                  }, 50);
                }}
                className="w-full py-3 text-navy-400 hover:text-navy-200 text-sm transition-colors"
              >
                ← Recalculate with different numbers
              </button>
            </div>
          </div>
        )}

        {/* STEP: EMAIL CAPTURE */}
        {step === "capture" && (
          <div
            className={`transition-all duration-500 ${
              animIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {!submitted ? (
              <div className="bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden">
                <div className="px-8 pt-8 pb-6 border-b border-navy-800">
                  <p className="font-mono text-xs tracking-widest text-gold-400 uppercase mb-2">
                    One Last Step
                  </p>
                  <h2 className="font-display text-2xl font-light text-cream-100">
                    Where should we send your free setup guide?
                  </h2>
                  <p className="text-navy-400 text-sm mt-2">
                    Includes: the exact auto-text script, a step-by-step setup walkthrough,
                    and the ROI one-pager you can show your partner.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="px-8 py-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-300 mb-2">
                      Your email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-navy-800 border border-navy-700 text-cream-100 placeholder-navy-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  {/* What they get */}
                  <div className="space-y-2">
                    {[
                      "The exact text message script that books jobs",
                      "30-minute setup walkthrough (no tech skills needed)",
                      "ROI calculator spreadsheet",
                      "How to get live in 24 hours",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <svg
                          className="w-4 h-4 text-gold-400 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-navy-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-400 hover:bg-gold-300 text-navy-950 rounded-xl font-semibold text-base tracking-wide transition-all shadow-lg shadow-gold-400/20"
                  >
                    Send Me the Free Guide →
                  </button>

                  <p className="text-center text-xs text-navy-600">
                    No spam. Unsubscribe any time. We hate spam too.
                  </p>
                </form>
              </div>
            ) : (
              /* Success state */
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-light text-cream-50 mb-3">
                  It&apos;s on its way.
                </h2>
                <p className="text-navy-300 mb-8 max-w-sm mx-auto">
                  Check your inbox in the next 5 minutes. While you wait — want us to
                  set this up for you?
                </p>
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 bg-gold-400 hover:bg-gold-300 text-navy-950 rounded-xl font-semibold transition-all shadow-lg shadow-gold-400/20"
                >
                  Book a Free 15-Min Setup Call →
                </a>
                <p className="mt-4 text-xs text-navy-600">
                  Live in 24 hours · 30-day guarantee · No contracts
                </p>
              </div>
            )}
          </div>
        )}

      </section>

      {/* ── Trust bar ───────────────────────────────────────────────── */}
      <section className="border-t border-navy-800 py-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { num: "20+", label: "Tradespeople set up" },
              { num: "24hrs", label: "Average go-live time" },
              { num: "30-day", label: "Money-back guarantee" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-display text-2xl font-light text-gold-300 mb-1">
                  {item.num}
                </div>
                <div className="text-xs text-navy-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Slider thumb styles ─────────────────────────────────────── */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C9A84C;
          cursor: pointer;
          border: 3px solid #020818;
          box-shadow: 0 0 0 2px #C9A84C40;
          transition: transform 0.15s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C9A84C;
          cursor: pointer;
          border: 3px solid #020818;
        }
      `}</style>
    </div>
  );
}
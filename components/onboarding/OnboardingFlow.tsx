"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { deskPlans } from "@/data/index";

//  TYPES 
interface ProductConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  orgLabel: string;        // "Church / Ministry" | "Business"
  ownerLabel: string;      // "Pastor / Leader" | "Owner / Manager"
  sizeLabel: string;       // "Congregation size" | "Team size"
  sizeOptions: string[];
  addressLabel: string;
  subdomainHint: string;   // e.g. "triumphchurch" | "elitedetailing"
  subdomainSuffix: string; // ".jktl.com.ng"
}

interface OnboardingData {
  plan: string;
  setupFee: number;
  monthlyFee: number;
  orgName: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  orgSize: string;
  subdomain: string;
  logoUrl: string;
  brandColor: string;
}

const EMPTY: OnboardingData = {
  plan: "", setupFee: 0, monthlyFee: 0,
  orgName: "", ownerName: "", ownerEmail: "", ownerPhone: "",
  address: "", orgSize: "", subdomain: "", logoUrl: "", brandColor: "#8B5CF6",
};

const BRAND_COLORS = [
  "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B",
  "#EF4444", "#EC4899", "#0EA5E9", "#14B8A6",
  "#7C3AED", "#060E2A", "#1A316E", "#C9A84C",
];

//  STEP INDICATOR 
function StepBar({ step, total, color }: { step: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div className="flex items-center justify-center w-7 h-7 rounded-full text-[0.62rem] font-bold shrink-0 transition-all"
            style={{
              background: i < step ? color : i === step ? color : "rgba(249,247,240,0.08)",
              color: i <= step ? "#fff" : "rgba(249,247,240,0.3)",
              border: i === step ? `2px solid ${color}` : "2px solid transparent",
              boxShadow: i === step ? `0 0 0 3px ${color}30` : "none",
            }}>
            {i < step
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              : i + 1
            }
          </div>
          {i < total - 1 && (
            <div className="flex-1 h-px transition-all" style={{ background: i < step ? color : "rgba(249,247,240,0.1)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

//  INPUT 
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/45 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-[0.72rem] mt-1">{error}</p>}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 border-[1.5px] border-cream-300 rounded-sm text-[0.9rem] outline-none font-sans transition-colors focus:border-navy-600 bg-white";

//  MAIN COMPONENT 
export default function OnboardingFlow({ config }: { config: ProductConfig }) {
  const [step, setStep] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const [data, setData] = useState<OnboardingData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof OnboardingData, string>>>({});
  const [subdomainStatus, setSubdomainStatus] = useState<"idle"|"checking"|"available"|"taken"|"error">("idle");
  const [subdomainMsg, setSubdomainMsg] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const subdomainTimer = useRef<NodeJS.Timeout | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) =>
    setData(prev => ({ ...prev, [k]: v }));

  // Auto-generate subdomain from org name
  useEffect(() => {
    if (data.orgName && !data.subdomain) {
      const auto = data.orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
      if (auto.length >= 3) set("subdomain", auto);
    }
  }, [data.orgName]);

  // Subdomain availability check
  useEffect(() => {
    if (!data.subdomain || data.subdomain.length < 3) { setSubdomainStatus("idle"); return; }
    setSubdomainStatus("checking");
    if (subdomainTimer.current) clearTimeout(subdomainTimer.current);
    subdomainTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/onboarding/check-subdomain?sub=${data.subdomain}&product=${config.id}`);
        const j = await res.json();
        setSubdomainStatus(j.available ? "available" : "taken");
        setSubdomainMsg(j.error || (j.available ? "Available!" : "Already taken"));
      } catch {
        setSubdomainStatus("error");
        setSubdomainMsg("Could not check availability");
      }
    }, 600);
  }, [data.subdomain]);

  // Logo upload handler
  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      set("logoUrl", result); // base64 for preview; replace with Cloudinary URL in production
    };
    reader.readAsDataURL(file);
  }

  // Validators per step
  function validateStep(): boolean {
    const e: Partial<Record<keyof OnboardingData, string>> = {};
    if (step === 0 && !data.plan) e.plan = "Please select a plan";
    if (step === 1) {
      if (!data.orgName.trim()) e.orgName = "Required";
      if (!data.ownerName.trim()) e.ownerName = "Required";
      if (!data.ownerEmail.includes("@")) e.ownerEmail = "Valid email required";
      if (data.ownerPhone.length < 7) e.ownerPhone = "Valid phone required";
    }
    if (step === 2) {
      if (!data.subdomain || data.subdomain.length < 3) e.subdomain = "Required (min 3 chars)";
      if (subdomainStatus === "taken") e.subdomain = "This subdomain is taken";
      if (subdomainStatus === "checking") e.subdomain = "Still checking...";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() { if (validateStep()) setStep(s => s + 1); }
  function back() { setStep(s => s - 1); setErrors({}); }

  async function handlePay() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const plan = deskPlans.find(p => p.id === data.plan);
      const res = await fetch("/api/onboarding/create-org", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: config.id,
          plan: data.plan,
          setupFee: plan?.setupFee || data.setupFee,
          monthlyFee: plan?.monthlyFee || data.monthlyFee,
          orgName: data.orgName,
          ownerName: data.ownerName,
          ownerEmail: data.ownerEmail,
          ownerPhone: data.ownerPhone,
          address: data.address,
          orgSize: data.orgSize,
          subdomain: data.subdomain,
          logoUrl: data.logoUrl,
          brandColor: data.brandColor,
          affiliateCode: typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("ref") || ""
            : "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmitError(json.error || "Something went wrong. Please try again.");
        return;
      }
      // Mock mode -- go to success screen
      if (json.paymentUrl?.includes("mock=1")) {
        setStep(5);
        return;
      }
      // Real Paystack -- redirect to payment page
      window.location.href = json.paymentUrl;
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPlan = deskPlans.find(p => p.id === data.plan);

  const STEPS = ["Choose Plan", "Your Details", "Subdomain", "Branding", "Review & Pay", "Done!"];

  return (
    <div className="min-h-screen bg-navy-950 pt-[68px]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-navy-900 px-4 py-4">
        <div className="max-w-[640px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: config.color + "20", border: `1px solid ${config.color}40` }}>
              <span className="font-mono text-[0.65rem] font-bold" style={{ color: config.color }}>{config.icon}</span>
            </div>
            <div>
              <p className="font-bold text-[0.85rem] text-white">{config.name} Onboarding</p>
              <p className="font-mono text-[0.55rem] text-white/35 tracking-wider">STEP {step + 1} OF {STEPS.length}</p>
            </div>
          </div>
          <Link href={`/${config.id}`} className="text-[0.72rem] text-white/35 no-underline hover:text-white/60 transition-colors">
            Cancel
          </Link>
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-4 py-8 sm:py-12">
        {/* Step bar */}
        {step < 5 && <StepBar step={step} total={5} color={config.color} />}

        {/*  STEP 0: CHOOSE PLAN  */}
        {step === 0 && (
          <div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-2">Choose your plan.</h1>
            <p className="text-white/45 text-[0.9rem] mb-8">One-time setup fee + monthly subscription. Cancel anytime.</p>

            <div className="flex flex-col gap-3 mb-8">
              {deskPlans.map(plan => (
                <button key={plan.id} onClick={() => { set("plan", plan.id); set("setupFee", plan.setupFee); set("monthlyFee", plan.monthlyFee); }}
                  className="text-left w-full p-5 rounded border-2 transition-all cursor-pointer"
                  style={{
                    background: data.plan === plan.id ? config.color + "12" : "rgba(249,247,240,0.03)",
                    borderColor: data.plan === plan.id ? config.color : "rgba(249,247,240,0.08)",
                  }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        {/* Radio dot */}
                        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                          style={{ borderColor: data.plan === plan.id ? config.color : "rgba(249,247,240,0.25)" }}>
                          {data.plan === plan.id && (
                            <div className="w-2 h-2 rounded-full" style={{ background: config.color }} />
                          )}
                        </div>
                        <p className="font-bold text-white text-[0.95rem]">{plan.name}</p>
                        {plan.highlight && (
                          <span className="font-mono text-[0.55rem] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">POPULAR</span>
                        )}
                      </div>
                      <p className="text-white/45 text-[0.8rem] ml-6.5">{plan.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display font-light text-[1.5rem] leading-none mb-0.5"
                        style={{ color: data.plan === plan.id ? config.color : "rgba(249,247,240,0.5)" }}>
                        N{plan.setupFee.toLocaleString()}
                      </p>
                      <p className="text-white/35 text-[0.65rem]">setup</p>
                      <p className="font-bold text-[0.82rem] text-white/70 mt-0.5">
                        N{plan.monthlyFee.toLocaleString()}<span className="font-normal text-white/35">/mo</span>
                      </p>
                    </div>
                  </div>
                  <ul className="mt-3 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex gap-1.5 text-[0.75rem] text-white/50 items-start">
                        <span className="shrink-0 mt-px" style={{ color: config.color }}>&#10003;</span>{f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
            {errors.plan && <p className="text-red-400 text-[0.78rem] mb-4">{errors.plan}</p>}
            <button onClick={next}
              className="w-full py-3.5 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm border-none cursor-pointer transition-opacity"
              style={{ background: config.color, color: "#fff", opacity: data.plan ? 1 : 0.5 }}>
              Continue with {selectedPlan?.name || "selected plan"}
            </button>
          </div>
        )}

        {/*  STEP 1: ORG DETAILS  */}
        {step === 1 && (
          <div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-2">Tell us about your {config.orgLabel.toLowerCase()}.</h1>
            <p className="text-white/45 text-[0.9rem] mb-8">This goes on your system and welcome email.</p>

            <div className="bg-white rounded p-6 sm:p-8 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={config.orgLabel + " Name *"} error={errors.orgName}>
                  <input className={inputCls} value={data.orgName} onChange={e => set("orgName", e.target.value)}
                    placeholder={config.id === "faithdesk" ? "Triumph Church" : "Elite Auto Detailing"} />
                </Field>
                <Field label={config.ownerLabel + " Name *"} error={errors.ownerName}>
                  <input className={inputCls} value={data.ownerName} onChange={e => set("ownerName", e.target.value)}
                    placeholder="Full name" />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Email Address *" error={errors.ownerEmail}>
                  <input type="email" className={inputCls} value={data.ownerEmail} onChange={e => set("ownerEmail", e.target.value)}
                    placeholder="your@email.com" />
                </Field>
                <Field label="Phone / WhatsApp *" error={errors.ownerPhone}>
                  <input className={inputCls} value={data.ownerPhone} onChange={e => set("ownerPhone", e.target.value)}
                    placeholder="+234 803 000 0000" />
                </Field>
              </div>
              <Field label={config.addressLabel}>
                <input className={inputCls} value={data.address} onChange={e => set("address", e.target.value)}
                  placeholder="City, State" />
              </Field>
              <Field label={config.sizeLabel}>
                <select className={inputCls} value={data.orgSize} onChange={e => set("orgSize", e.target.value)} style={{ cursor: "pointer" }}>
                  <option value="">Select...</option>
                  {config.sizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={back} className="px-6 py-3 border border-white/15 bg-transparent text-white/50 text-[0.72rem] font-bold uppercase tracking-wide rounded-sm cursor-pointer hover:border-white/30 transition-colors">
                Back
              </button>
              <button onClick={next} className="flex-1 py-3 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm border-none cursor-pointer"
                style={{ background: config.color, color: "#fff" }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/*  STEP 2: SUBDOMAIN  */}
        {step === 2 && (
          <div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-2">Choose your address.</h1>
            <p className="text-white/45 text-[0.9rem] mb-8">
              Your system will live at <span style={{ color: config.color }} className="font-mono text-[0.85rem]">
                {data.subdomain || config.subdomainHint}.jktl.com.ng
              </span>
            </p>

            <div className="bg-white rounded p-6 sm:p-8">
              <Field label="Your Subdomain" error={errors.subdomain}>
                <div className="flex items-stretch gap-0">
                  <input className="flex-1 px-3.5 py-2.5 border-[1.5px] border-cream-300 rounded-l-sm text-[0.9rem] outline-none font-mono transition-colors focus:border-navy-600 min-w-0"
                    value={data.subdomain} onChange={e => set("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder={config.subdomainHint} maxLength={32} />
                  <div className="px-3 py-2.5 bg-cream-100 border-[1.5px] border-l-0 border-cream-300 rounded-r-sm text-[0.8rem] font-mono text-black/45 whitespace-nowrap flex items-center">
                    .jktl.com.ng
                  </div>
                </div>
                {/* Status */}
                {subdomainStatus !== "idle" && (
                  <p className={`text-[0.72rem] mt-1.5 ${
                    subdomainStatus === "available" ? "text-green-600" :
                    subdomainStatus === "taken" ? "text-red-500" :
                    subdomainStatus === "checking" ? "text-amber-600" : "text-gray-500"
                  }`}>
                    {subdomainStatus === "checking" ? "Checking availability..." : subdomainMsg}
                  </p>
                )}
              </Field>

              {/* Pro/Enterprise custom domain note */}
              {(data.plan === "pro" || data.plan === "enterprise") && (
                <div className="mt-4 p-3.5 rounded border border-cream-300 bg-cream-100">
                  <p className="text-[0.78rem] text-black/60 font-semibold mb-0.5">Custom Domain (Pro/Enterprise)</p>
                  <p className="text-[0.72rem] text-black/45">After signup, you can connect your own domain (e.g. admin.{data.orgName.toLowerCase().replace(/\s+/g, "") || "yourchurch"}.com). We handle the DNS setup.</p>
                </div>
              )}

              {/* Preview */}
              <div className="mt-5 p-4 rounded bg-navy-950/5 border border-cream-200">
                <p className="text-[0.65rem] font-bold tracking-widest uppercase text-black/35 mb-2">Your URLs will be</p>
                {config.id === "faithdesk" ? (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">public</span>
                      <span className="font-mono text-[0.78rem] text-navy-700">{data.subdomain || config.subdomainHint}.jktl.com.ng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">admin</span>
                      <span className="font-mono text-[0.78rem] text-navy-700">admin.{data.subdomain || config.subdomainHint}.jktl.com.ng</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">public</span>
                      <span className="font-mono text-[0.78rem] text-navy-700">{data.subdomain || config.subdomainHint}.jktl.com.ng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">shop</span>
                      <span className="font-mono text-[0.78rem] text-navy-700">shop.{data.subdomain || config.subdomainHint}.jktl.com.ng</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.65rem] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">admin</span>
                      <span className="font-mono text-[0.78rem] text-navy-700">admin.{data.subdomain || config.subdomainHint}.jktl.com.ng</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={back} className="px-6 py-3 border border-white/15 bg-transparent text-white/50 text-[0.72rem] font-bold uppercase tracking-wide rounded-sm cursor-pointer">Back</button>
              <button onClick={next} className="flex-1 py-3 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm border-none cursor-pointer"
                style={{ background: config.color, color: "#fff" }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/*  STEP 3: BRANDING  */}
        {step === 3 && (
          <div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-2">Make it yours.</h1>
            <p className="text-white/45 text-[0.9rem] mb-8">Upload your logo and pick your brand colour. You can change these later.</p>

            <div className="bg-white rounded p-6 sm:p-8 flex flex-col gap-6">
              {/* Logo upload */}
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/45 mb-2">Logo (optional)</label>
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Preview */}
                  <div className="w-16 h-16 rounded border-2 border-cream-300 flex items-center justify-center bg-cream-100 shrink-0 overflow-hidden">
                    {logoPreview
                      ? <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                      : <span className="font-mono text-[0.65rem] text-black/30">LOGO</span>
                    }
                  </div>
                  <div>
                    <button onClick={() => fileRef.current?.click()}
                      className="px-4 py-2 border border-cream-300 bg-cream-100 text-[0.75rem] font-semibold text-black/60 rounded-sm cursor-pointer hover:bg-cream-200 transition-colors">
                      {logoPreview ? "Change Logo" : "Upload Logo"}
                    </button>
                    <p className="text-[0.68rem] text-black/35 mt-1">PNG or SVG recommended. Max 2MB.</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </div>
                </div>
              </div>

              {/* Brand colour */}
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/45 mb-2">Brand Colour</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {BRAND_COLORS.map(c => (
                    <button key={c} onClick={() => set("brandColor", c)}
                      className="w-8 h-8 rounded-sm border-2 cursor-pointer transition-all hover:scale-110"
                      style={{ background: c, borderColor: data.brandColor === c ? "#000" : "transparent",
                        boxShadow: data.brandColor === c ? "0 0 0 2px #fff, 0 0 0 4px " + c : "none" }} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input type="color" value={data.brandColor} onChange={e => set("brandColor", e.target.value)}
                    className="w-8 h-8 cursor-pointer border-none rounded-sm" />
                  <span className="font-mono text-[0.78rem] text-black/45">{data.brandColor}</span>
                  <span className="text-[0.72rem] text-black/35">or enter a custom colour</span>
                </div>
              </div>

              {/* What your branding applies to */}
              <div className="rounded border border-cream-300 bg-cream-100 p-4">
                <p className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-black/40 mb-3">Your branding will appear on</p>
                <div className="flex flex-col gap-2">
                  {[
                    "Your public portal (yourchurch.jktl.com.ng)",
                    "Member login and dashboard screens",
                    "Email notifications and receipts sent to members",
                    "Admin panel header and navigation",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-[0.78rem] text-black/60">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: data.brandColor }} />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-[0.68rem] text-black/35 mt-3 italic">
                  You can update your logo and colours anytime from your admin settings after going live.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={back} className="px-6 py-3 border border-white/15 bg-transparent text-white/50 text-[0.72rem] font-bold uppercase tracking-wide rounded-sm cursor-pointer">Back</button>
              <button onClick={next} className="flex-1 py-3 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm border-none cursor-pointer"
                style={{ background: config.color, color: "#fff" }}>
                Continue to Review
              </button>
            </div>
          </div>
        )}

        {/*  STEP 4: REVIEW & PAY  */}
        {step === 4 && (
          <div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-2">Review and pay.</h1>
            <p className="text-white/45 text-[0.9rem] mb-8">Check everything looks right before we take payment.</p>

            <div className="bg-white rounded overflow-hidden mb-4">
              {/* Summary rows */}
              {[
                { l: "Product",      v: config.name },
                { l: "Plan",         v: selectedPlan?.name || "" },
                { l: "Organisation", v: data.orgName },
                { l: "Owner",        v: data.ownerName },
                { l: "Email",        v: data.ownerEmail },
                { l: "Phone",        v: data.ownerPhone },
                { l: "Address",      v: data.address || "--" },
                { l: "Subdomain",    v: data.subdomain + ".jktl.com.ng" },
              ].map(row => (
                <div key={row.l} className="flex justify-between items-start px-5 py-3 border-b border-cream-200 last:border-b-0">
                  <span className="text-[0.72rem] font-bold uppercase tracking-wide text-black/40 shrink-0 mr-4">{row.l}</span>
                  <span className="text-[0.85rem] text-navy-900 text-right break-all">{row.v}</span>
                </div>
              ))}
            </div>

            {/* Payment box */}
            <div className="rounded border-2 p-5 mb-4" style={{ borderColor: config.color, background: config.color + "08" }}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold text-white text-[0.95rem]">Setup Fee (one-time)</p>
                  <p className="text-white/45 text-[0.78rem]">Monthly subscription starts after payment</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-light text-[2rem] leading-none" style={{ color: config.color }}>
                    N{(selectedPlan?.setupFee || 0).toLocaleString()}
                  </p>
                  <p className="text-white/40 text-[0.7rem]">
                    then N{(selectedPlan?.monthlyFee || 0).toLocaleString()}/month
                  </p>
                </div>
              </div>
            </div>

            {submitError && (
              <div className="p-3.5 rounded border border-red-500/30 bg-red-500/10 mb-4">
                <p className="text-red-400 text-[0.82rem]">{submitError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={back} className="px-6 py-3 border border-white/15 bg-transparent text-white/50 text-[0.72rem] font-bold uppercase tracking-wide rounded-sm cursor-pointer sm:w-auto w-full">
                Back
              </button>
              <button onClick={handlePay} disabled={submitting}
                className="flex-1 py-4 font-bold text-[0.82rem] uppercase tracking-widest rounded-sm border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: config.color, color: "#fff" }}>
                {submitting ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Pay N{(selectedPlan?.setupFee || 0).toLocaleString()} via Paystack
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-white/25 text-[0.68rem] mt-3 flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Secured by Paystack. Card details never stored by JKTL.
            </p>
          </div>
        )}

        {/*  STEP 5: SUCCESS  */}
        {step === 5 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: config.color + "20", border: `2px solid ${config.color}40` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 className="font-display font-light text-[clamp(1.8rem,5vw,2.5rem)] text-white mb-3">
              Payment successful!
            </h1>
            <p className="text-white/55 text-[0.95rem] mb-2">
              Welcome to {config.name}, <span style={{ color: config.color }}>{data.ownerName}</span>.
            </p>
            <p className="text-white/40 text-[0.85rem] mb-8 max-w-md mx-auto">
              Your system for <strong className="text-white/60">{data.orgName}</strong> is being set up.
              You will receive your login credentials at <strong className="text-white/60">{data.ownerEmail}</strong> within 24 hours.
            </p>

            {/* What happens next */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded p-6 text-left mb-8 max-w-sm mx-auto">
              <p className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase mb-4">What happens next</p>
              {[
                { n: "01", t: "System configuration",       d: "We configure your system with your branding" },
                { n: "02", t: "Credentials sent",            d: "Login details sent to " + data.ownerEmail },
                { n: "03", t: "Onboarding call",             d: "We schedule a 30-min setup call" },
                { n: "04", t: "Go live",                     d: data.subdomain + ".jktl.com.ng is live" },
              ].map(s => (
                <div key={s.n} className="flex gap-3 mb-4 last:mb-0">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: config.color + "20", border: `1px solid ${config.color}30` }}>
                    <span className="font-mono text-[0.55rem] font-bold" style={{ color: config.color }}>{s.n}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[0.82rem] text-white mb-0.5">{s.t}</p>
                    <p className="text-[0.75rem] text-white/40">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="btn-gold px-8 py-3 text-[0.75rem]">Back to Home</Link>
              <a href="mailto:info@jktl.com.ng" className="btn-outline-cream px-8 py-3 text-[0.75rem]">
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

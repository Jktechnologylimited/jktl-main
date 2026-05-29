"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export default function LeadGenDemo() {
  const [step, setStep] = useState<"landing"|"form"|"thankyou">("landing");
  const [form, setForm] = useState({ name:"", phone:"", business:"", challenge:"" });
  const [variant, setVariant] = useState<"A"|"B">("A");

  const headlines = {
    A: { h: "Get 20+ New Customers Every Month From Google", sub: "Without spending on ads. We build your system — website, SEO, CRM, automation. Done for you.", cta: "Get My Free Growth Audit" },
    B: { h: "Your Competitors Are Stealing Customers You Don't Know About", sub: "Every day without a proper system, you're losing leads to businesses half your size. Let's fix that this week.", cta: "Show Me How to Fix This" },
  };
  const v = headlines[variant];

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      {/* Demo header */}
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: Lead Generation Landing Page</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>A/B test two headlines — see which converts better</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Build My Landing Page</a>
        </div>
      </div>

      <div style={{ maxWidth:"860px", margin:"32px auto", padding:"0 24px" }}>
        {/* A/B switcher */}
        <div style={{ display:"flex", gap:"10px", marginBottom:"20px", alignItems:"center" }}>
          <span style={{ fontSize:"0.75rem", color:"rgba(28,28,30,0.5)", fontWeight:600 }}>A/B Test:</span>
          {(["A","B"] as const).map(v => (
            <button key={v} onClick={() => setVariant(v)}
              style={{ padding:"6px 18px", background: variant === v ? "var(--navy-900)" : "#fff", color: variant === v ? "#fff" : "var(--navy-900)", border:"1px solid var(--navy-900)", borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer" }}>
              Variant {v}
            </button>
          ))}
          <span style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.4)", fontStyle:"italic" }}>Click to switch headlines</span>
        </div>

        {step === "landing" && (
          <div style={{ border:"1px solid #e0e0e0", borderRadius:"8px", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
            {/* Alert bar */}
            <div style={{ background:"#c0392b", padding:"10px 24px", textAlign:"center", fontSize:"0.78rem", fontWeight:600, color:"#fff" }}>
              Limited spots available this month — Only 7 businesses left
            </div>
            {/* Hero */}
            <div style={{ background:"linear-gradient(135deg,#0b1f3a,#1a3a6e)", padding:"52px 40px", textAlign:"center" }}>
              <div style={{ display:"inline-block", background:"#C9A84C", color:"#0b1f3a", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", padding:"5px 14px", marginBottom:"20px", borderRadius:"2px" }}>
                For Business Owners in Nigeria
              </div>
              <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"clamp(1.5rem,4vw,2.5rem)", color:"#fff", lineHeight:1.15, marginBottom:"16px", maxWidth:"600px", margin:"0 auto 16px" }}>
                {v.h}
              </h1>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.95rem", marginBottom:"28px", maxWidth:"480px", margin:"0 auto 28px", lineHeight:1.7 }}>
                {v.sub}
              </p>
              <button onClick={() => setStep("form")}
                style={{ background:"#C9A84C", color:"#0b1f3a", padding:"16px 36px", border:"none", borderRadius:"2px", fontWeight:800, fontSize:"0.875rem", cursor:"pointer", letterSpacing:"0.05em", animation:"pulse 2s ease infinite" }}>
                {v.cta} →
              </button>
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.72rem", marginTop:"12px" }}>Free. No credit card. No obligation.</p>
            </div>
            {/* Trust strip */}
            <div style={{ background:"#f5f5f5", padding:"14px 28px", display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"center" }}>
              {["6+ Years Experience","Nigeria & Africa","50+ Businesses Served","Results Guaranteed"].map(t => (
                <span key={t} style={{ fontSize:"0.72rem", fontWeight:600, color:"#555", display:"flex", alignItems:"center", gap:"5px" }}>
                  <span style={{ color:"#1A6E3C" }}>✓</span> {t}
                </span>
              ))}
            </div>
            {/* Pain points */}
            <div style={{ padding:"32px 40px", background:"#fff" }}>
              <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#0b1f3a", marginBottom:"16px" }}>Does this sound like your business right now?</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[
                  "You have a website but it gets zero enquiries",
                  "Leads come in but nobody follows up automatically",
                  "You're spending on ads but getting poor results",
                  "Your competitors look more professional online",
                ].map(p => (
                  <div key={p} style={{ display:"flex", gap:"12px", padding:"12px 16px", background:"#fff5f5", border:"1px solid #ffdddd", borderRadius:"2px" }}>
                    <span style={{ color:"#c0392b", fontWeight:700, flexShrink:0 }}>×</span>
                    <span style={{ fontSize:"0.875rem", color:"#444" }}>{p}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep("form")}
                style={{ marginTop:"24px", width:"100%", background:"#0b1f3a", color:"#fff", padding:"14px", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.875rem", cursor:"pointer" }}>
                {v.cta} — Free, No Obligation →
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <div style={{ border:"1px solid #e0e0e0", borderRadius:"8px", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", background:"#fff", padding:"40px" }}>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#0b1f3a", marginBottom:"6px" }}>Tell Us About Your Business</h2>
            <p style={{ color:"#666", fontSize:"0.875rem", marginBottom:"24px" }}>We&apos;ll prepare a personalised growth audit based on your answers.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              {[
                { key:"name", label:"Your Name", placeholder:"John Adeyemi" },
                { key:"phone", label:"WhatsApp / Phone Number", placeholder:"+234 803 000 0000" },
                { key:"business", label:"Business Name", placeholder:"Adeyemi Plumbing Services" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display:"block", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(28,28,30,0.45)", marginBottom:"5px" }}>{f.label}</label>
                  <input placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({...form, [f.key]: e.target.value})}
                    style={{ width:"100%", padding:"11px 14px", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.875rem" }} />
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(28,28,30,0.45)", marginBottom:"5px" }}>Biggest Challenge Right Now</label>
                <textarea placeholder="e.g. I get walk-in clients but no online leads..." rows={3} value={form.challenge}
                  onChange={e => setForm({...form, challenge: e.target.value})}
                  style={{ width:"100%", padding:"11px 14px", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.875rem", resize:"none" }} />
              </div>
              <button onClick={() => form.name && form.phone ? setStep("thankyou") : null}
                style={{ background:"#C9A84C", color:"#0b1f3a", padding:"14px", border:"none", borderRadius:"2px", fontWeight:800, fontSize:"0.875rem", cursor:"pointer" }}>
                Submit — Get My Free Audit →
              </button>
            </div>
          </div>
        )}

        {step === "thankyou" && (
          <div style={{ border:"1px solid #e0e0e0", borderRadius:"8px", overflow:"hidden", background:"#fff", padding:"56px 40px", textAlign:"center" }}>
            <div style={{ width:56, height:56, background:"#dcfce7", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:"1.5rem" }}>✓</div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#0b1f3a", marginBottom:"8px" }}>Lead Captured Successfully!</h2>
            <p style={{ color:"#666", marginBottom:"8px" }}>
              <strong>{form.name}</strong> — your audit request has been received.
            </p>
            <p style={{ color:"#888", fontSize:"0.82rem", fontStyle:"italic", marginBottom:"24px", maxWidth:"440px", margin:"0 auto 24px" }}>
              In a real system: this lead is instantly added to your CRM, you receive a WhatsApp notification, and an automated follow-up email is sent to {form.business || "your business"} within 5 minutes.
            </p>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
              <button onClick={() => { setStep("landing"); setForm({name:"",phone:"",business:"",challenge:""}); }}
                style={{ padding:"10px 20px", background:"transparent", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.78rem", cursor:"pointer", color:"#666" }}>
                Restart Demo
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Build My Landing Page</a>
          <Link href="/demos/email-automation" className="btn-outline-navy">Next Demo: Email Automation</Link>
        </div>
      </div>
    </div>
  );
}

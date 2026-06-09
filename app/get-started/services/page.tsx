"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

const SERVICES = ["Website & Landing Page","Lead Generation","Email Automation","SEO & Google Visibility","CRM & Business Operations","Payment Infrastructure","AI Chatbot & Automation","Full Business System","Not sure yet"];
const BUDGETS = ["Under N200,000","N200,000 -- N500,000","N500,000 -- N1,000,000","N1,000,000 -- N3,000,000","N3,000,000+"];
const TIMELINES = ["ASAP","Within 1 month","1-3 months","3-6 months","Just exploring"];

interface Form {
  name: string; businessName: string; email: string; phone: string;
  service: string; budget: string; timeline: string; description: string;
}

const EMPTY: Form = { name:"", businessName:"", email:"", phone:"", service:"", budget:"", timeline:"", description:"" };

export default function ServicesDiscoveryPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof Form, v: string) => setForm(p => ({ ...p, [k]: v }));

  async function submit() {
    if (!form.name || !form.email || !form.phone || !form.service || !form.description) {
      setError("Please fill in all required fields."); return;
    }
    setSending(true); setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else setError("Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please email us directly.");
    } finally {
      setSending(false);
    }
  }

  const sel = (k: keyof Form, opts: string[], label: string) => (
    <div>
      <label className="label">{label}</label>
      <select value={form[k]} onChange={e => set(k, e.target.value)} className="input" style={{ cursor: "pointer" }}>
        <option value="">Select...</option>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  if (sent) return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(5,150,105,0.15)", border: "2px solid rgba(5,150,105,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2rem", color: "#fff", marginBottom: 12 }}>Inquiry Received</h1>
        <p className="body-md" style={{ color: "rgba(249,247,240,0.5)", marginBottom: 8 }}>Thank you, {form.name}. We will respond within 24 hours with a scoped proposal.</p>
        <p style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.3)", marginBottom: 28 }}>A copy has been sent to {form.email}</p>
        <Link href="/" className="btn-gold">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/get-started" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "rgba(249,247,240,0.35)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>{"<-"} Back to Get Started
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", padding: "4px 12px", borderRadius: 2, marginBottom: 16, width: "fit-content" }}>
            <span className="label-xs" style={{ color: "var(--gold-400)" }}>Agency Services -- Discovery Form</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.5rem)", color: "#fff", marginBottom: 10 }}>Tell us what you need.</h1>
          <p className="body-md" style={{ color: "rgba(249,247,240,0.45)" }}>
            Not a checkout. This form goes directly to our team. We review every submission and send a scoped proposal within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: "#fff", borderRadius: 4, padding: "36px 40px", boxShadow: "0 24px 48px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
              <div>
                <label className="label">Your Name *</label>
                <input className="input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Full name" />
              </div>
              <div>
                <label className="label">Business Name</label>
                <input className="input" value={form.businessName} onChange={e => set("businessName", e.target.value)} placeholder="Your business" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
              <div>
                <label className="label">Email *</label>
                <input type="email" className="input" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" />
              </div>
              <div>
                <label className="label">Phone / WhatsApp *</label>
                <input className="input" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+234 803 000 0000" />
              </div>
            </div>
            {sel("service", SERVICES, "What do you need? *")}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
              {sel("budget", BUDGETS, "Budget range")}
              {sel("timeline", TIMELINES, "Timeline")}
            </div>
            <div>
              <label className="label">Tell us about your business and what you want to achieve *</label>
              <textarea className="input" rows={5} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe your business, what you currently have, what problem you are trying to solve, and any specific requirements..." style={{ resize: "none" }} />
            </div>
            {error && <p style={{ color: "var(--red)", fontSize: "0.78rem" }}>{error}</p>}
            <button onClick={submit} disabled={sending} className="btn btn-navy" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
              {sending ? "Submitting..." : "Submit Inquiry"}
            </button>
            <p style={{ fontSize: "0.72rem", color: "rgba(28,28,30,0.35)", textAlign: "center" }}>
              We respond within 24 hours. No spam. You can also reach us at <a href={"mailto:" + siteConfig.email} style={{ color: "var(--navy-600)" }}>{siteConfig.email}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { siteConfig } from "@/data/index";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", business:"", url:"", email:"", type:"", budget:"", service:"", challenge:"", contact:"" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form) });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name:"", business:"", url:"", email:"", type:"", budget:"", service:"", challenge:"", contact:"" });
    } catch { setStatus("error"); }
  };

  const field = { background:"var(--cream-50)", border:"1px solid var(--cream-300)", borderRadius:"2px", padding:"12px 14px", fontSize:"0.875rem", color:"var(--charcoal)", width:"100%", outline:"none", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:300 } as const;
  const lbl = { display:"block" as const, fontSize:"0.65rem", fontWeight:700 as const, letterSpacing:"0.14em", textTransform:"uppercase" as const, color:"rgba(28,28,30,0.4)", marginBottom:"6px" };

  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)", maxWidth:"700px" }}>
            Let&apos;s Build Something That<br/>
            <em className="not-italic gold-text">Actually Works.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"540px" }}>
            Email us your brief or book a free 30-minute Zoom audit. We&apos;ll assess your digital presence, identify your top opportunities, and send a written proposal within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-5 gap-12">

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <p className="label-xs" style={{ color:"rgba(28,28,30,0.35)", marginBottom:"14px" }}>How to Reach Us</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {/* Zoom */}
                  <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 18px", background:"var(--navy-900)", border:"none", borderRadius:"4px", textDecoration:"none" }}>
                    <span style={{ fontSize:"1.25rem" }}>🎥</span>
                    <div>
                      <p style={{ fontWeight:700, fontSize:"0.875rem", color:"var(--cream-50)" }}>Book a Free Zoom Audit</p>
                      <p className="body-sm" style={{ color:"rgba(249,247,240,0.45)" }}>30 mins · Free · No pitch</p>
                    </div>
                    <span style={{ marginLeft:"auto", color:"var(--gold-400)", fontSize:"0.8rem" }}>→</span>
                  </a>
                  {/* Email */}
                  <a href={`mailto:${siteConfig.email}`} style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 18px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px", textDecoration:"none" }}>
                    <span style={{ fontSize:"1.25rem" }}>📧</span>
                    <div>
                      <p style={{ fontWeight:700, fontSize:"0.875rem", color:"var(--navy-900)" }}>Email Us Directly</p>
                      <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)" }}>{siteConfig.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* What happens */}
              <div>
                <p className="label-xs" style={{ color:"rgba(28,28,30,0.35)", marginBottom:"14px" }}>What Happens Next</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {[
                    { n:"01", t:"We review your enquiry same day" },
                    { n:"02", t:"We respond by email within 24 hours" },
                    { n:"03", t:"Free 30-minute Zoom audit" },
                    { n:"04", t:"Written proposal within 24 hours" },
                  ].map(s => (
                    <div key={s.n} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:300, color:"var(--gold-400)", flexShrink:0, lineHeight:1.4 }}>{s.n}</span>
                      <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{s.t}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding:"16px 18px", background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:"4px" }}>
                <p style={{ fontWeight:700, fontSize:"0.85rem", color:"var(--navy-900)", marginBottom:"4px" }}>✓ No-pressure guarantee</p>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.55)" }}>If we&apos;re not the right fit, we&apos;ll tell you and point you in the right direction. We don&apos;t chase business that isn&apos;t a genuine match.</p>
              </div>

              <div style={{ padding:"14px 18px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"4px" }}>
                <p className="label-xs" style={{ color:"rgba(28,28,30,0.35)", marginBottom:"6px" }}>Response Time</p>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.65)" }}>All emails responded to within 24 hours. Zoom audits available Monday–Friday, 9am–6pm EST.</p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {status === "success" ? (
                <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"64px 40px", textAlign:"center", minHeight:"400px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.5rem", color:"var(--cream-50)", marginBottom:"12px" }}>Message received.</p>
                  <p className="body-md" style={{ color:"rgba(249,247,240,0.5)", maxWidth:"340px" }}>
                    We&apos;ll review your enquiry and respond by email within 24 hours. If you&apos;d like to speak sooner, book a Zoom audit directly.
                  </p>
                  <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ marginTop:"24px" }}>
                    Book a Zoom Audit Now
                  </a>
                </div>
              ) : (
                <div style={{ background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px", overflow:"hidden" }}>
                  <div style={{ padding:"22px 28px", borderBottom:"1px solid var(--cream-300)" }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.5rem", color:"var(--navy-900)" }}>Project Enquiry</p>
                    <p className="body-sm" style={{ color:"rgba(28,28,30,0.4)", marginTop:"4px" }}>Fields marked * are required</p>
                  </div>
                  <form onSubmit={submit} style={{ padding:"28px", display:"flex", flexDirection:"column", gap:"16px" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                      <div>
                        <label style={lbl}>Full Name *</label>
                        <input name="name" required value={form.name} onChange={handle} placeholder="Your name" style={field} />
                      </div>
                      <div>
                        <label style={lbl}>Business Name</label>
                        <input name="business" value={form.business} onChange={handle} placeholder="Company name" style={field} />
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Current Website URL</label>
                      <input name="url" value={form.url} onChange={handle} placeholder="https://yoursite.com (leave blank if none)" style={field} />
                    </div>
                    <div>
                      <label style={lbl}>Email Address *</label>
                      <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@yourbusiness.com" style={field} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                      <div>
                        <label style={lbl}>Business Type *</label>
                        <select name="type" required value={form.type} onChange={handle} style={field}>
                          <option value="">Select...</option>
                          {["Law Firm","Consultant / Professional Service","Medical / Dental Clinic","Accounting / Finance","Digital Agency","E-commerce Brand","Real Estate","Salon / Gym / Wellness","Auto / Transport","Solar / Energy","Logistics / Construction","School / Training Institute","Other"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={lbl}>Monthly Marketing Budget</label>
                        <select name="budget" value={form.budget} onChange={handle} style={field}>
                          <option value="">Select...</option>
                          {["Under ₦100,000","₦100,000 – ₦500,000","₦500,000 – ₦2,000,000","₦2,000,000+","Not sure yet"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Service You&apos;re Interested In</label>
                      <select name="service" value={form.service} onChange={handle} style={field}>
                        <option value="">Select...</option>
                        {["Website & Landing Page System","Lead Generation Landing Page","Email & Follow-up Automation","SEO & Google Visibility","CRM & Business Operations","Payment Infrastructure","AI & Automation System","Full Business System Package","Not sure — advise me"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>Your Biggest Challenge Right Now *</label>
                      <textarea name="challenge" required rows={4} value={form.challenge} onChange={handle}
                        placeholder="e.g. My site ranks on page 3 for my main keywords. I'm spending $2,000/month on Google Ads and not sure if it's working. I want to build a site that generates inbound leads consistently..."
                        style={{ ...field, resize:"none" }} />
                    </div>
                    {status === "error" && (
                      <p style={{ fontSize:"0.82rem", color:"#EF4444" }}>Something went wrong. Please email us directly at {siteConfig.email}</p>
                    )}
                    <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                      <button type="submit" className="btn-gold" style={{ justifyContent:"center", opacity: status === "loading" ? 0.6 : 1 }} disabled={status === "loading"}>
                        {status === "loading" ? "Sending..." : "Submit Enquiry"}
                      </button>
                      <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-outline-navy" style={{ textAlign:"center", justifyContent:"center" }}>
                        Or Book a Zoom Audit Directly
                      </a>
                    </div>
                    <p className="body-sm" style={{ color:"rgba(28,28,30,0.3)", textAlign:"center" }}>
                      All enquiries responded to within 24 hours. All communications by email and Zoom.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

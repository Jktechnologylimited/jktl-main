"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

const pages = ["Home", "Services", "About", "Contact"];

const pageContent: Record<string, { hero: string; sub: string; body: string }> = {
  Home: {
    hero: "Professional Plumbing Services in Lagos",
    sub: "Fast, reliable, and trusted by 500+ Lagos homeowners. Licensed & insured.",
    body: "Your homepage is your first impression. This hero section communicates what you do, who you serve, and why they should trust you — in under 5 seconds.",
  },
  Services: {
    hero: "Our Plumbing Services",
    sub: "From emergency repairs to full installations — we handle it all.",
    body: "Each service gets its own section with clear descriptions, pricing context, and a call to action. This page ranks for specific service keywords on Google.",
  },
  About: {
    hero: "About Our Business",
    sub: "10 years of trusted plumbing experience in Lagos State.",
    body: "The About page builds personal trust. Real photos, real credentials, real story — this is what converts a visitor who is comparing three plumbers.",
  },
  Contact: {
    hero: "Get in Touch",
    sub: "Call, WhatsApp, or fill the form below. We respond within 1 hour.",
    body: "A contact form that captures the visitor's name, phone, and problem — and sends it directly to your CRM or email. No lead falls through the cracks.",
  },
};

export default function WebsiteDemo() {
  const [activePage, setActivePage] = useState("Home");
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
  const pg = pageContent[activePage];

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      {/* Demo header */}
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>
            Demo: Website & Landing Page System
          </p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Interactive preview — this is what your business website looks like</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>
            All Demos
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>
            Build My Website
          </a>
        </div>
      </div>

      {/* Simulated browser */}
      <div style={{ maxWidth:"900px", margin:"32px auto", padding:"0 24px" }}>
        {/* Browser chrome */}
        <div style={{ background:"#f5f5f5", border:"1px solid #ddd", borderRadius:"8px 8px 0 0", padding:"10px 16px", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ display:"flex", gap:"6px" }}>
            <div style={{ width:12, height:12, borderRadius:"50%", background:"#ff5f57" }} />
            <div style={{ width:12, height:12, borderRadius:"50%", background:"#ffbd2e" }} />
            <div style={{ width:12, height:12, borderRadius:"50%", background:"#28ca41" }} />
          </div>
          <div style={{ flex:1, background:"#fff", border:"1px solid #e0e0e0", borderRadius:"4px", padding:"5px 14px", fontSize:"0.75rem", color:"#666", display:"flex", alignItems:"center", gap:"6px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            yourbusiness.com.ng
          </div>
        </div>

        {/* Simulated website */}
        <div style={{ border:"1px solid #e0e0e0", borderTop:"none", borderRadius:"0 0 8px 8px", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
          {/* Site nav */}
          <nav style={{ background:"#0b1f3a", padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontWeight:700, fontSize:"1rem", color:"#fff" }}>YourBusiness</span>
            <div style={{ display:"flex", gap:"4px" }}>
              {pages.map(p => (
                <button key={p} onClick={() => setActivePage(p)}
                  style={{ padding:"6px 14px", background: activePage === p ? "#C9A84C" : "transparent", color: activePage === p ? "#0b1f3a" : "rgba(255,255,255,0.7)", border:"none", borderRadius:"2px", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
                  {p}
                </button>
              ))}
            </div>
          </nav>

          {/* Hero area */}
          <div style={{ background:"linear-gradient(135deg, #0b1f3a 60%, #1a3a6e)", padding:"48px 32px" }}>
            <div style={{ display:"inline-block", background:"#C9A84C", color:"#0b1f3a", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", padding:"4px 12px", marginBottom:"16px", borderRadius:"2px" }}>
              {activePage}
            </div>
            <h1 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"clamp(1.4rem,3vw,2.2rem)", color:"#fff", lineHeight:1.15, marginBottom:"12px", maxWidth:"520px" }}>
              {pg.hero}
            </h1>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.9rem", marginBottom:"24px", maxWidth:"440px" }}>{pg.sub}</p>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              <button style={{ background:"#C9A84C", color:"#0b1f3a", padding:"10px 22px", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.8rem", cursor:"pointer" }}>
                Get a Quote
              </button>
              <button style={{ background:"transparent", color:"rgba(255,255,255,0.7)", padding:"10px 22px", border:"1px solid rgba(255,255,255,0.3)", borderRadius:"2px", fontSize:"0.8rem", cursor:"pointer" }}>
                Learn More
              </button>
            </div>
          </div>

          {/* Content area */}
          <div style={{ padding:"28px 32px", background:"#fff" }}>
            {activePage === "Contact" ? (
              <div>
                {formStep === 0 && (
                  <div>
                    <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"16px", color:"#0b1f3a" }}>Send Us a Message</h3>
                    <div style={{ display:"flex", flexDirection:"column", gap:"12px", maxWidth:"400px" }}>
                      <input placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        style={{ padding:"10px 14px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }} />
                      <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        style={{ padding:"10px 14px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }} />
                      <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                        style={{ padding:"10px 14px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }}>
                        <option value="">Select a service...</option>
                        <option>Emergency Repair</option>
                        <option>Pipe Installation</option>
                        <option>Drainage Cleaning</option>
                        <option>Full Renovation</option>
                      </select>
                      <button onClick={() => formData.name && formData.phone ? setFormStep(1) : null}
                        style={{ padding:"12px", background:"#0b1f3a", color:"#fff", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.875rem", cursor:"pointer" }}>
                        Submit Enquiry
                      </button>
                    </div>
                  </div>
                )}
                {formStep === 1 && (
                  <div style={{ textAlign:"center", padding:"24px" }}>
                    <div style={{ fontSize:"2.5rem", marginBottom:"12px" }}>✓</div>
                    <h3 style={{ color:"#0b1f3a", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"8px" }}>
                      Enquiry Received!
                    </h3>
                    <p style={{ color:"#666", fontSize:"0.875rem", marginBottom:"16px" }}>
                      <strong>{formData.name}</strong> — we&apos;ll call you back on <strong>{formData.phone}</strong> within 1 hour.
                    </p>
                    <p style={{ color:"#888", fontSize:"0.78rem", fontStyle:"italic" }}>
                      In a real system, this submission is sent to your CRM, triggers an automatic WhatsApp message, and logs the lead for follow-up.
                    </p>
                    <button onClick={() => { setFormStep(0); setFormData({name:"",phone:"",service:""}); }}
                      style={{ marginTop:"16px", padding:"8px 20px", background:"transparent", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.78rem", cursor:"pointer", color:"#666" }}>
                      Reset Demo
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div style={{ background:"#f0f4f8", border:"1px solid #e0e8f0", borderLeft:"4px solid #C9A84C", padding:"16px 18px", borderRadius:"0 4px 4px 0", marginBottom:"16px" }}>
                  <p style={{ fontSize:"0.82rem", color:"#1a3a6e", fontWeight:600, marginBottom:"4px" }}>What This Page Does For Your Business:</p>
                  <p style={{ fontSize:"0.82rem", color:"#444", lineHeight:1.6 }}>{pg.body}</p>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px" }}>
                  {["SEO Optimised", "Mobile-First", "Fast Loading"].map(f => (
                    <div key={f} style={{ padding:"12px", background:"#f9f9f9", border:"1px solid #eee", borderRadius:"2px", textAlign:"center" }}>
                      <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#1a3a6e" }}>{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Demo explanation */}
        <div style={{ marginTop:"24px", padding:"20px 24px", background:"rgba(26,74,138,0.06)", border:"1px solid rgba(26,74,138,0.15)", borderRadius:"4px" }}>
          <p style={{ fontSize:"0.82rem", color:"var(--navy-700)", fontWeight:600, marginBottom:"4px" }}>About This Demo</p>
          <p style={{ fontSize:"0.8rem", color:"rgba(28,28,30,0.6)", lineHeight:1.6 }}>
            This is a simplified preview of how your business website would work. Your actual site would include your real logo, photos, services, testimonials, Google reviews, and full mobile optimisation — built specifically for your industry.
          </p>
        </div>

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">
            Build My Website — {siteConfig.email}
          </a>
          <Link href="/demos/lead-generation" className="btn-outline-navy">
            Next Demo: Lead Generation
          </Link>
        </div>
      </div>
    </div>
  );
}

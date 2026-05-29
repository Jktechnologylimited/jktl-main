"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

const sequence = [
  { delay: "Immediately", trigger: "Lead submits form", subject: "Welcome! Your enquiry has been received", preview: "Hi {Name}, thank you for reaching out to us. We've received your enquiry and one of our team members will be in touch within 1 hour...", tag: "Auto-send", color: "#1A4A8A" },
  { delay: "30 minutes", trigger: "If no phone call made", subject: "Quick follow-up on your enquiry", preview: "Hi {Name}, just checking in — did you get our first message? We have a slot available this week that might suit you perfectly...", tag: "Follow-up", color: "#7C3AED" },
  { delay: "Day 1", trigger: "If not yet converted", subject: "Here's what we can do for your business", preview: "Hi {Name}, many businesses like {Business} have used our system to get 3x more leads. Here are 3 quick wins we'd implement for you...", tag: "Nurture", color: "#059669" },
  { delay: "Day 3", trigger: "If not yet converted", subject: "A question about your business", preview: "Hi {Name}, I wanted to personally ask — what's the biggest challenge you're facing with {Challenge}? Understanding this helps us prepare exactly the right solution...", tag: "Personal", color: "#D97706" },
  { delay: "Day 7", trigger: "If not yet converted", subject: "Our best offer — expires Friday", preview: "Hi {Name}, we have one spot remaining this month for a full business system setup at our standard rate. After Friday, pricing increases by 20%...", tag: "Urgency", color: "#DC2626" },
];

export default function EmailDemo() {
  const [activeEmail, setActiveEmail] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const runSimulation = () => {
    setSimulating(true);
    setCurrentStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setSimulating(false);
      } else {
        setCurrentStep(i);
      }
    }, 1200);
  };

  const em = sequence[activeEmail];

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: Email & Follow-up Automation</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>5-step automated sequence — click each email to preview</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Set Up My Automation</a>
        </div>
      </div>

      <div style={{ maxWidth:"900px", margin:"32px auto", padding:"0 24px" }}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sequence flow */}
          <div>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--navy-900)", marginBottom:"16px" }}>Automation Sequence</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"4px", marginBottom:"20px" }}>
              {sequence.map((email, i) => (
                <div key={i}>
                  <button onClick={() => setActiveEmail(i)}
                    style={{ width:"100%", display:"flex", gap:"12px", padding:"14px 16px", background: activeEmail === i ? "var(--navy-900)" : "#fff", border:`1px solid ${activeEmail === i ? "transparent" : "#e0e0e0"}`, borderLeft: activeEmail === i ? `4px solid ${email.color}` : `4px solid transparent`, borderRadius:"2px", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                    <div style={{ flexShrink:0 }}>
                      <div style={{ width:32, height:32, background: currentStep >= i ? email.color : "#f0f0f0", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.72rem", fontWeight:700, color: currentStep >= i ? "#fff" : "#999", transition:"all 0.4s" }}>
                        {currentStep >= i ? "✓" : i+1}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize:"0.72rem", fontWeight:700, color: activeEmail === i ? email.color : "#888", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"2px" }}>{email.delay} · {email.tag}</p>
                      <p style={{ fontSize:"0.82rem", fontWeight:600, color: activeEmail === i ? "#fff" : "#333" }}>{email.subject}</p>
                      <p style={{ fontSize:"0.72rem", color: activeEmail === i ? "rgba(249,247,240,0.5)" : "#888" }}>{email.trigger}</p>
                    </div>
                  </button>
                  {i < sequence.length - 1 && (
                    <div style={{ marginLeft:"28px", width:"2px", height:"12px", background:"#e0e0e0" }} />
                  )}
                </div>
              ))}
            </div>
            <button onClick={runSimulation} disabled={simulating}
              style={{ width:"100%", padding:"12px", background: simulating ? "#999" : "var(--navy-900)", color:"#fff", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.8rem", cursor: simulating ? "not-allowed" : "pointer" }}>
              {simulating ? "Simulating automation..." : "Run Simulation"}
            </button>
          </div>

          {/* Email preview */}
          <div>
            <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--navy-900)", marginBottom:"16px" }}>Email Preview</p>
            <div style={{ border:"1px solid #e0e0e0", borderRadius:"8px", overflow:"hidden", background:"#fff" }}>
              {/* Email client header */}
              <div style={{ background:"#f5f5f5", padding:"12px 16px", borderBottom:"1px solid #e0e0e0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontSize:"0.75rem", fontWeight:600, color:"#333" }}>From: info@jktl.com.ng</span>
                  <span style={{ fontSize:"0.7rem", color:em.color, background:`${em.color}15`, padding:"2px 8px", borderRadius:"2px", fontWeight:700 }}>{em.tag}</span>
                </div>
                <div style={{ fontSize:"0.78rem", color:"#666", marginBottom:"4px" }}>To: customer@gmail.com</div>
                <div style={{ fontSize:"0.85rem", fontWeight:700, color:"#222" }}>{em.subject}</div>
              </div>
              {/* Email body */}
              <div style={{ padding:"20px 20px" }}>
                <p style={{ fontSize:"0.85rem", lineHeight:1.75, color:"#333", whiteSpace:"pre-line" }}>
                  {em.preview.replace("{Name}", "Chukwu").replace("{Business}", "ChukwuPlumb Ltd").replace("{Challenge}", "getting online leads")}
                </p>
                <div style={{ marginTop:"16px", padding:"10px 16px", background: em.color, borderRadius:"2px", display:"inline-block" }}>
                  <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#fff" }}>View Your Personalised Plan →</span>
                </div>
                <p style={{ marginTop:"16px", fontSize:"0.72rem", color:"#999" }}>
                  Best regards,<br/>JK Technology Limited<br/>{siteConfig.phone} · {siteConfig.email}
                </p>
              </div>
            </div>
            <div style={{ marginTop:"12px", padding:"12px 14px", background:"rgba(26,74,138,0.06)", border:"1px solid rgba(26,74,138,0.15)", borderRadius:"4px" }}>
              <p style={{ fontSize:"0.75rem", color:"var(--navy-700)", fontWeight:600, marginBottom:"3px" }}>Variables personalised automatically:</p>
              <p style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.6)" }}>
                {"{Name}, {Business}, {Challenge}, {Date}"} — filled from your CRM for every lead.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Set Up My Email Automation</a>
          <Link href="/demos/crm" className="btn-outline-navy">Next Demo: CRM System</Link>
        </div>
      </div>
    </div>
  );
}

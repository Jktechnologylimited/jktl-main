"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

const keywords = [
  { kw:"plumber Lagos",          pos:3,  prev:12, vol:"2.4k/mo", trend:"up" },
  { kw:"emergency plumbing Lagos", pos:1, prev:5,  vol:"1.8k/mo", trend:"up" },
  { kw:"pipe repair Lagos Island", pos:6,  prev:14, vol:"890/mo",  trend:"up" },
  { kw:"plumbing company Lekki",  pos:2,  prev:8,  vol:"720/mo",  trend:"up" },
  { kw:"plumber near me Lagos",   pos:8,  prev:18, vol:"3.1k/mo", trend:"up" },
  { kw:"water tank installation", pos:14, prev:14, vol:"450/mo",  trend:"same" },
];

const checklist = [
  { item:"Google Business Profile set up",           done:true,  impact:"High" },
  { item:"Title tags optimised for all pages",        done:true,  impact:"High" },
  { item:"Mobile-first responsive design",            done:true,  impact:"High" },
  { item:"Page speed under 2 seconds",                done:true,  impact:"High" },
  { item:"Schema markup (LocalBusiness)",             done:true,  impact:"Medium" },
  { item:"XML sitemap submitted to Search Console",   done:true,  impact:"Medium" },
  { item:"5+ Google reviews collected",               done:false, impact:"High" },
  { item:"Location pages for service areas",          done:false, impact:"High" },
  { item:"Monthly blog content (SEO articles)",       done:false, impact:"Medium" },
  { item:"Link building (directory citations)",       done:false, impact:"Medium" },
];

export default function SEODemo() {
  const [business, setBusiness] = useState("Adeyemi Plumbing Services");
  const [city, setCity] = useState("Lagos");
  const [activeKw, setActiveKw] = useState(0);

  const score = Math.round((checklist.filter(c => c.done).length / checklist.length) * 100);

  return (
    <div style={{ background:"#f0f2f5", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: SEO & Google Visibility Dashboard</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>See how your business ranks — keyword tracking, SERP preview, and SEO checklist</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Improve My Rankings</a>
        </div>
      </div>

      <div style={{ maxWidth:"1000px", margin:"24px auto", padding:"0 24px" }}>
        {/* Business inputs */}
        <div style={{ background:"#fff", borderRadius:"4px", padding:"16px 20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginBottom:"16px", display:"flex", gap:"14px", flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", gap:"10px", alignItems:"center", flex:1, minWidth:"280px" }}>
            <label style={{ fontSize:"0.72rem", fontWeight:700, color:"#888", flexShrink:0 }}>Business:</label>
            <input value={business} onChange={e => setBusiness(e.target.value)} style={{ flex:1, padding:"7px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.82rem" }} />
          </div>
          <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
            <label style={{ fontSize:"0.72rem", fontWeight:700, color:"#888", flexShrink:0 }}>City:</label>
            <input value={city} onChange={e => setCity(e.target.value)} style={{ width:"120px", padding:"7px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.82rem" }} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* SEO Score */}
          <div style={{ background:"#fff", borderRadius:"4px", padding:"20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"12px" }}>SEO Health Score</p>
            <div style={{ position:"relative", width:80, height:80, margin:"0 auto 12px" }}>
              <svg viewBox="0 0 36 36" style={{ width:"100%", height:"100%", transform:"rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f0f0f0" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={score >= 70 ? "#059669" : score >= 40 ? "#D97706" : "#DC2626"} strokeWidth="3"
                  strokeDasharray={`${score} ${100-score}`} strokeLinecap="round" />
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.1rem", color: score >= 70 ? "#059669" : "#D97706" }}>{score}%</span>
              </div>
            </div>
            <p style={{ fontSize:"0.78rem", textAlign:"center", color:"#666" }}>
              {score >= 70 ? "Good foundation" : "Needs improvement"}
            </p>
          </div>

          {/* SERP Preview */}
          <div style={{ background:"#fff", borderRadius:"4px", padding:"20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", gridColumn:"span 2" }}>
            <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"12px" }}>Google SERP Preview</p>
            <div style={{ border:"1px solid #e0e0e0", borderRadius:"4px", padding:"14px 16px" }}>
              <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"6px" }}>
                <div style={{ width:16, height:16, background:"#1a73e8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:"0.5rem", color:"#fff", fontWeight:700" }}>G</span>
                </div>
                <span style={{ fontSize:"0.72rem", color:"#202124" }}>yourbusiness.com.ng</span>
              </div>
              <p style={{ fontSize:"1rem", color:"#1a0dab", marginBottom:"3px", lineHeight:1.3 }}>
                {business} | Expert Plumbers in {city}
              </p>
              <p style={{ fontSize:"0.78rem", color:"#4d5156", lineHeight:1.5 }}>
                Professional and reliable plumbing services in {city}. Emergency repairs, pipe installation, drainage solutions. Licensed &amp; insured. Call us today.
              </p>
            </div>
            <p style={{ fontSize:"0.72rem", color:"#888", marginTop:"8px", fontStyle:"italic" }}>
              This is how your business appears on Google with proper SEO setup.
            </p>
          </div>
        </div>

        {/* Keyword rankings */}
        <div style={{ background:"#fff", borderRadius:"4px", padding:"20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginTop:"12px" }}>
          <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"14px" }}>Keyword Rankings (Sample)</p>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem" }}>
              <thead><tr style={{ background:"#f5f5f5" }}>
                {["Keyword","Current Position","Previous","Monthly Searches","Trend"].map(h => (
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {keywords.map((kw, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid #f5f5f5", background: activeKw === i ? "#f0f4ff" : "transparent", cursor:"pointer" }}
                    onClick={() => setActiveKw(i)}>
                    <td style={{ padding:"10px 12px", fontWeight:600, color:"#222" }}>{kw.kw.replace("Lagos", city)}</td>
                    <td style={{ padding:"10px 12px" }}>
                      <span style={{ fontWeight:800, fontSize:"1rem", color: kw.pos <= 3 ? "#059669" : kw.pos <= 10 ? "#D97706" : "#DC2626" }}>#{kw.pos}</span>
                    </td>
                    <td style={{ padding:"10px 12px", color:"#888" }}>#{kw.prev}</td>
                    <td style={{ padding:"10px 12px", color:"#666" }}>{kw.vol}</td>
                    <td style={{ padding:"10px 12px" }}>
                      <span style={{ fontSize:"1rem", color: kw.trend === "up" ? "#059669" : "#888" }}>{kw.trend === "up" ? "▲" : "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO Checklist */}
        <div style={{ background:"#fff", borderRadius:"4px", padding:"20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)", marginTop:"12px" }}>
          <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"14px" }}>SEO Checklist</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {checklist.map((item, i) => (
              <div key={i} style={{ display:"flex", gap:"12px", alignItems:"center", padding:"8px 12px", background: item.done ? "#f0fdf4" : "#fff", border:`1px solid ${item.done ? "#86efac" : "#f0f0f0"}`, borderRadius:"2px" }}>
                <span style={{ color: item.done ? "#059669" : "#e0e0e0", fontSize:"1rem", flexShrink:0 }}>{item.done ? "✓" : "○"}</span>
                <span style={{ flex:1, fontSize:"0.82rem", color: item.done ? "#166534" : "#888", textDecoration: item.done ? "none" : "none" }}>{item.item}</span>
                <span style={{ fontSize:"0.65rem", fontWeight:700, color: item.impact === "High" ? "#DC2626" : "#D97706", background: item.impact === "High" ? "#fee2e2" : "#fef3c7", padding:"2px 8px", borderRadius:"2px", flexShrink:0 }}>{item.impact}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Improve My Google Rankings</a>
          <Link href="/demos/ai-chatbot" className="btn-outline-navy">Next Demo: AI Chatbot</Link>
        </div>
      </div>
    </div>
  );
}

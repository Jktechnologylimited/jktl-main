import Link from "next/link";
import { siteConfig, sitemapLinks, usStates } from "@/data/index";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"var(--navy-950)", color:"var(--cream-100)" }}>

      {/* CTA strip */}
      <div style={{ borderBottom:"1px solid rgba(249,247,240,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.75rem,3.5vw,2.75rem)", color:"var(--cream-50)", lineHeight:1.15, marginBottom:"8px" }}>
              Ready to build a website that<br className="hidden md:block"/> actually grows your business?
            </p>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)" }}>
              Book a free 30-minute Call audit — no pitch, no pressure.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", flexShrink:0 }}>
            <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent:"center" }}>
              Book Free Call Audit
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream" style={{ justifyContent:"center", fontSize:"0.68rem" }}>
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ marginBottom:"16px" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.3rem", color:"var(--cream-50)", lineHeight:1 }}>JK Technology Limited</p>
              <p className="label-xs" style={{ color:"var(--gold-400)", marginTop:"4px" }}></p>
            </div>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)", maxWidth:"280px", marginBottom:"20px" }}>
              AI-powered business websites, high-converting landing pages, and SEO strategies that drive measurable growth — serving businesses across all 50 US states.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <a href={`mailto:${siteConfig.email}`} className="footer-link" style={{ fontSize:"0.82rem" }}>
                📧 {siteConfig.email}
              </a>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="footer-link-gold" style={{ fontSize:"0.82rem" }}>
                🎥 Book a free Call
              </a>
            </div>
            <div style={{ marginTop:"20px", display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {["6+ Years Experience","50+ Projects","US Focused","AI-Powered"].map((tag) => (
                <span key={tag} style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(249,247,240,0.3)", border:"1px solid rgba(249,247,240,0.1)", padding:"3px 10px", borderRadius:"2px" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Services</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {sitemapLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Company</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {sitemapLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Latest Insights</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
              {sitemapLinks.blog.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.8rem" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SITEMAP SECTION ── */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"40px", marginBottom:"32px" }}>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.25)", marginBottom:"20px" }}>Site Map</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Services</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.services.map((l) => <li key={l.href}><Link href={l.href} style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.3)", textDecoration:"none" }} className="footer-link">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Company</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.company.map((l) => <li key={l.href}><Link href={l.href} style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.3)", textDecoration:"none" }} className="footer-link">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Insights</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.blog.map((l) => <li key={l.href}><Link href={l.href} style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.3)", textDecoration:"none" }} className="footer-link">{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Legal</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.legal.map((l) => <li key={l.href}><Link href={l.href} style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.3)", textDecoration:"none" }} className="footer-link">{l.label}</Link></li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* US states */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"24px", marginBottom:"24px" }}>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.2)", marginBottom:"12px" }}>Serving All 50 US States</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {usStates.map((s) => (
              <span key={s} style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.2)", padding:"2px 8px", border:"1px solid rgba(249,247,240,0.07)", borderRadius:"2px" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"20px", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"10px" }}>
          <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.2)", fontWeight:300 }}>
            © {year} JK Technology Limited · All rights reserved.
          </p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.15)", fontWeight:300 }}>
            AI Business Website Designer · High-Converting Landing Pages · SEO for Small Business USA
          </p>
        </div>
      </div>
    </footer>
  );
}

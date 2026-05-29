import Link from "next/link";
import Image from "next/image";
import { siteConfig, sitemapLinks, nigerianStates } from "@/data/index";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"var(--navy-950)", color:"var(--cream-100)" }}>

      {/* CTA strip */}
      <div style={{ borderBottom:"1px solid rgba(249,247,240,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.75rem,3.5vw,2.75rem)", color:"var(--cream-50)", lineHeight:1.15, marginBottom:"8px" }}>
              Ready to build a system that<br className="hidden md:block"/> grows your business?
            </p>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)" }}>
              Reach us by email or phone — we respond within 24 hours.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px", flexShrink:0 }}>
            <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ justifyContent:"center" }}>
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} className="btn-outline-cream" style={{ justifyContent:"center", fontSize:"0.68rem" }}>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
              <Image src="/logo.png" alt="JK Technology Limited" width={48} height={48} style={{ objectFit:"contain" }} />
              <div>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--cream-50)", lineHeight:1 }}>JK Technology Limited</p>
                <p className="label-xs" style={{ color:"var(--gold-400)", marginTop:"3px" }}>Business Infrastructure Ecosystem</p>
              </div>
            </div>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)", maxWidth:"280px", marginBottom:"16px" }}>
              {siteConfig.tagline}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"14px" }}>
              <a href={`mailto:${siteConfig.email}`} className="footer-link" style={{ fontSize:"0.82rem", display:"flex", alignItems:"center", gap:"6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} className="footer-link" style={{ fontSize:"0.82rem", display:"flex", alignItems:"center", gap:"6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 7.82 19.79 19.79 0 01.21 4.18 2 2 0 012.18 2H5.18a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {siteConfig.phone}
              </a>
              <span className="footer-link" style={{ fontSize:"0.82rem", display:"flex", alignItems:"center", gap:"6px", cursor:"default" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {siteConfig.location} · Nigeria & Africa
              </span>
            </div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {["Est. 2019","Nigeria & Africa","AI-Powered Systems","6+ Years"].map((tag) => (
                <span key={tag} style={{ fontSize:"0.65rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(249,247,240,0.3)", border:"1px solid rgba(249,247,240,0.1)", padding:"3px 10px", borderRadius:"2px" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Services</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"9px" }}>
              {sitemapLinks.services.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.8rem" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Company</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"9px" }}>
              {sitemapLinks.company.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"14px" }}>Insights</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"9px" }}>
              {sitemapLinks.blog.map((l) => (
                <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.78rem" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sitemap */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"36px", marginBottom:"28px" }}>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.25)", marginBottom:"18px" }}>Site Map</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Services</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.services.map((l) => <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.78rem" }}>{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Company</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.company.map((l) => <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.78rem" }}>{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Insights</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.blog.map((l) => <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.78rem" }}>{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-400)", marginBottom:"10px" }}>Legal</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                {sitemapLinks.legal.map((l) => <li key={l.href}><Link href={l.href} className="footer-link" style={{ fontSize:"0.78rem" }}>{l.label}</Link></li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Nigerian states */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"24px", marginBottom:"24px" }}>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.2)", marginBottom:"12px" }}>Serving Businesses Across Nigeria</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
            {nigerianStates.map((s) => (
              <span key={s} style={{ fontSize:"0.65rem", color:"rgba(249,247,240,0.2)", padding:"2px 8px", border:"1px solid rgba(249,247,240,0.07)", borderRadius:"2px" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"20px", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"10px" }}>
          <p style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.2)", fontWeight:300 }}>
            © {year} JK Technology Limited · jktl.com.ng · All rights reserved.
          </p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.15)", fontWeight:300 }}>
            Your Growth. Our Mission.
          </p>
        </div>
      </div>
    </footer>
  );
}

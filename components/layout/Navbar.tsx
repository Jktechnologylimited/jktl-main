"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks, siteConfig } from "@/data/index";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        .dd-menu { position:absolute; top:calc(100%+12px); left:50%; transform:translateX(-50%); background:var(--navy-900); border:1px solid rgba(249,247,240,0.1); border-radius:2px; padding:8px; min-width:240px; z-index:200; box-shadow:0 24px 48px rgba(2,8,24,0.5); }
        .dd-menu a { display:block; padding:11px 16px; font-size:0.82rem; font-weight:400; color:rgba(249,247,240,0.65); text-decoration:none; transition:all 0.15s; letter-spacing:0.02em; }
        .dd-menu a:hover { color:#fff; background:rgba(249,247,240,0.05); }
        .dd-menu .dd-label { font-size:0.62rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold-400); padding:8px 16px 4px; }
      `}</style>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(6,14,42,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(249,247,240,0.06)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" style={{ textDecoration:"none", display:"flex", flexDirection:"column", gap:"1px" }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.2rem", color:"#fff", lineHeight:1, letterSpacing:"0.04em" }}>JK Technology</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--gold-400)" }}>Limited </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <div key={l.href} className="relative"
                onMouseEnter={() => l.children && setDropdown(l.href)}
                onMouseLeave={() => setDropdown(null)}>
                <Link href={l.href} className="nav-link-cream flex items-center gap-1">
                  {l.label}
                  {l.children && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity:0.4 }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </Link>
                {l.children && dropdown === l.href && (
                  <div className="dd-menu">
                    <div className="dd-label">Services</div>
                    {l.children.map((c) => <Link key={c.href} href={c.href}>{c.label}</Link>)}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding:"10px 22px", fontSize:"0.68rem" }}>
              Book Free Call Audit
            </a>
          </div>

          {/* Mobile */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#fff" }}>
            {open
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            }
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background:"var(--navy-900)", borderTop:"1px solid rgba(249,247,240,0.07)", padding:"20px 32px 28px" }}>
            {navLinks.map((l) => (
              <div key={l.href}>
                <Link href={l.href} className="nav-link-cream" style={{ display:"block", padding:"12px 0", borderBottom:"1px solid rgba(249,247,240,0.06)", fontWeight:500 }} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
                {l.children?.map((c) => (
                  <Link key={c.href} href={c.href} className="nav-link-cream" style={{ display:"block", padding:"8px 0 8px 16px", fontSize:"0.8rem", opacity:0.6 }} onClick={() => setOpen(false)}>
                    — {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ paddingTop:"20px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width:"100%", justifyContent:"center" }}>
                Book Free Call Audit
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

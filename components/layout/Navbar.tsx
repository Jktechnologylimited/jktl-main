"use client";
import Link from "next/link";
import Image from "next/image";
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
        .dd-menu { position:absolute; top:calc(100%+12px); left:50%; transform:translateX(-50%); background:var(--navy-900); border:1px solid rgba(249,247,240,0.1); border-radius:2px; padding:8px; min-width:280px; z-index:200; box-shadow:0 24px 48px rgba(2,8,24,0.5); }
        .dd-menu a { display:block; padding:10px 16px; font-size:0.8rem; font-weight:400; color:rgba(249,247,240,0.6); text-decoration:none; transition:all 0.15s; }
        .dd-menu a:hover { color:#fff; background:rgba(249,247,240,0.05); }
        .dd-label { font-size:0.62rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold-400); padding:8px 16px 4px; }
      `}</style>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(6,14,42,0.97)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(249,247,240,0.06)" : "none" }}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"10px" }}>
            <Image
              src="/logo.png"
              alt="JK Technology Limited"
              width={44}
              height={44}
              style={{ objectFit:"contain" }}
              priority
            />
            <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.95rem", color:"#fff", lineHeight:1, letterSpacing:"0.02em" }}>JK Technology</span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.55rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold-400)" }}>Limited</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <div key={l.href} className="relative"
                onMouseEnter={() => l.children && setDropdown(l.href)}
                onMouseLeave={() => setDropdown(null)}>
                <Link href={l.href} className="nav-link-cream flex items-center gap-1" style={{ fontSize:"0.78rem" }}>
                  {l.label}
                  {l.children && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity:0.4 }}>
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
            <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} style={{ color:"rgba(249,247,240,0.6)", fontSize:"0.75rem", textDecoration:"none", display:"flex", alignItems:"center", gap:"5px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink:0 }}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 7.82 19.79 19.79 0 01.21 4.18 2 2 0 012.18 2H5.18a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"10px 18px", fontSize:"0.68rem" }}>
              Get in Touch
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ background:"none", border:"none", cursor:"pointer", color:"#fff" }}>
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
                  <Link key={c.href} href={c.href} className="nav-link-cream" style={{ display:"block", padding:"8px 0 8px 16px", fontSize:"0.78rem", opacity:0.55 }} onClick={() => setOpen(false)}>
                    — {c.label}
                  </Link>
                ))}
              </div>
            ))}
            <div style={{ paddingTop:"20px", display:"flex", flexDirection:"column", gap:"10px" }}>
              <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} className="btn-outline-cream" style={{ justifyContent:"center" }}>
                Call {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ justifyContent:"center" }}>
                Email Us
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

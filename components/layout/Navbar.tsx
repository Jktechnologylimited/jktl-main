"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deskProducts, siteConfig } from "@/data/index";

export default function Navbar() {
  const [deskOpen, setDeskOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(r => r.json())
      .then(d => setSignedIn(d.authenticated === true))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => { setMenuOpen(false); setDeskOpen(false); }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDeskOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/*  NAV BAR  */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center border-b border-white/[0.06]" style={{ background: "#060E2A" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="JK Technology Limited" width={44} height={44} className="object-contain" />
          </Link>

          {/* Desktop nav links -- hidden below lg */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Products dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDeskOpen(!deskOpen)}
                className="flex items-center gap-1 px-3.5 py-2 bg-transparent border-none text-white/70 text-[0.82rem] font-semibold cursor-pointer rounded-sm hover:text-white transition-colors">
                Products
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-200 ${deskOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {deskOpen && (
                <div className="absolute top-full left-0 mt-1 bg-navy-900 border border-white/[0.08] rounded p-2 min-w-[240px] shadow-2xl z-50">
                  {deskProducts.map(p => (
                    <Link key={p.id} href={p.href}
                      className="flex items-center gap-2.5 px-3 py-2.5 no-underline rounded-sm hover:bg-white/[0.05] transition-colors">
                      <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0"
                        style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                        <span className="font-mono text-[0.6rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[0.82rem] text-white">{p.name}</p>
                        <p className="text-[0.68rem] text-white/35 truncate">{p.tagline}</p>
                      </div>
                      {p.status !== "live" && (
                        <span className="font-mono text-[0.52rem] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">SOON</span>
                      )}
                    </Link>
                  ))}
                  <div className="border-t border-white/[0.06] mt-1 pt-1">
                    <Link href="/desk" className="block px-3 py-2 text-[0.75rem] text-white/45 no-underline hover:text-white/70 transition-colors">
                      View all products &#8594;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/services"  className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors">Services</Link>
            <Link href="/affiliates" className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors">Affiliates</Link>
            <Link href="/about"     className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors">About</Link>
            <a href="https://accounts.jktl.com.ng/" className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors">Sign In</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Phone -- only on xl */}
            <a href={"tel:" + siteConfig.phone.replace(/ /g, "")}
              className="hidden xl:block font-mono text-[0.65rem] text-white/30 no-underline">
              {siteConfig.phone}
            </a>

            {/* Get Started -- hidden on mobile */}
            <Link href="https://accounts.jktl.com.ng/" className="hidden sm:inline-flex btn-gold text-[0.72rem] px-5 py-2.5 whitespace-nowrap">
              Get Started
            </Link>

            {/* Hamburger -- visible below lg */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer text-white"
              aria-label="Toggle menu">
              {menuOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/*  MOBILE MENU OVERLAY  */}
      {menuOpen && (
        <div className="fixed top-[68px] left-0 right-0 bottom-0 z-[99] overflow-y-auto lg:hidden" style={{ background: "#060E2A" }}>
          <div className="px-4 py-6 flex flex-col gap-1 pb-10">

            {/* Products label */}
            <p className="font-mono text-[0.58rem] text-white/25 tracking-[0.15em] uppercase px-3 pt-2 pb-1">Products</p>
            {deskProducts.map(p => (
              <Link key={p.id} href={p.href}
                className="flex items-center gap-3 px-3 py-3 no-underline rounded bg-white/[0.03] border border-white/[0.06]">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                  style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                  <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[0.9rem] text-white">{p.name}</p>
                  <p className="text-[0.72rem] text-white/35">{p.tagline}</p>
                </div>
                {p.status !== "live" && (
                  <span className="font-mono text-[0.52rem] text-amber-400 shrink-0">SOON</span>
                )}
              </Link>
            ))}

            {/* Nav links */}
            <p className="font-mono text-[0.58rem] text-white/25 tracking-[0.15em] uppercase px-3 pt-4 pb-1">Navigation</p>
            {[
              { l: "Desk Overview", h: "/desk" },
              { l: "Services",      h: "/services" },
              { l: "Affiliates",    h: "/affiliates" },
              { l: "About",         h: "/about" },
              { l: "Contact",       h: "/contact" },
              { l: "Sign In",       h: "https://accounts.jktl.com.ng/" },
            ].map(link => (
              <Link key={link.l} href={link.h}
                className="block px-4 py-3.5 text-[0.9rem] font-semibold text-white/70 no-underline rounded hover:bg-white/[0.04] transition-colors">
                {link.l}
              </Link>
            ))}

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 mt-5">
              <Link href="https://accounts.jktl.com.ng/" className="btn-gold w-full justify-center py-3.5">Get Started</Link>
              <a href={"mailto:" + siteConfig.email} className="btn-outline-cream w-full justify-center py-3.5 text-[0.72rem]">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

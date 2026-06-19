"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { deskProducts, siteConfig, companyDetails } from "@/data/index";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

interface SessionData {
  authenticated: boolean;
  name: string | null;
  email: string | null;
}

export default function Navbar() {
  const [deskOpen,    setDeskOpen]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [userOpen,    setUserOpen]    = useState(false);
  const [session,     setSession]     = useState<SessionData | null>(null);
  const pathname  = usePathname();
  const dropRef   = useRef<HTMLDivElement>(null);
  const userRef   = useRef<HTMLDivElement>(null);

  // Fetch session on every route change -- retry up to 3x for fresh cookies
  useEffect(() => {
    let attempts = 0;
    async function check() {
      attempts++;
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const d = await res.json();
        setSession(d);
        // If still not authenticated and have retries left, try again
        if (!d.authenticated && attempts < 3) {
          setTimeout(check, 800);
        }
      } catch {
        setSession({ authenticated: false, name: null, email: null });
      }
    }
    check();
  }, [pathname]);

  // Close menus on route change
  useEffect(() => { setMenuOpen(false); setDeskOpen(false); setUserOpen(false); }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDeskOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = session?.name
    ? session.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : session?.email?.[0]?.toUpperCase() || "JK";

  const firstName = session?.name?.split(" ")[0] || "Account";

  const userMenuItems = [
    { label: "My Dashboard",   href: `${ACCOUNTS_URL}/dashboard`,         desc: "Your products and account" },
    { label: "Billing",        href: `${ACCOUNTS_URL}/dashboard/billing`,  desc: "Subscriptions and payments" },
    { label: "Profile",        href: `${ACCOUNTS_URL}/dashboard/profile`,  desc: "Edit name and password" },
    { label: "divider" },
    { label: "Get FaithDesk",  href: "/get-started/faithdesk",             desc: "Ministry management software" },
    { label: "Get DetailDesk", href: "/get-started/detaildesk",            desc: "Auto detailing business software" },
    { label: "divider" },
    { label: "Sign Out",       href: `${ACCOUNTS_URL}/sign-out`,           desc: "", danger: true },
  ];

  return (
    <>
      {/*  NAV BAR  */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center border-b border-white/[0.06]"
        style={{ background: "#060E2A" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="JK Technology Limited" width={42} height={42} className="object-contain" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Products dropdown */}
            <div ref={dropRef} className="relative">
              <button onClick={() => setDeskOpen(!deskOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-transparent border-none text-white/60 text-[0.82rem] font-semibold cursor-pointer rounded-lg hover:text-white transition-colors">
                Products
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-150 ${deskOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {deskOpen && (
                <div className="absolute top-full left-0 mt-1 rounded-xl shadow-2xl z-50 overflow-hidden"
                  style={{ background: "#0B1640", border: "1px solid rgba(255,255,255,0.08)", minWidth: 260 }}>
                  {deskProducts.map(p => (
                    <Link key={p.id} href={p.href}
                      className="flex items-center gap-3 px-4 py-3 no-underline hover:bg-white/[0.05] transition-colors">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                        <span className="font-mono text-[0.58rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
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
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="px-4 py-2">
                    <Link href="/desk" className="text-[0.75rem] text-white/40 no-underline hover:text-white/70 transition-colors">
                      View all products {"->"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/services"     className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">Services</Link>
            <Link href="/case-studies" className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">Work</Link>
            <Link href="/blog"         className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">Insights</Link>
            <Link href="/affiliates"   className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">Affiliates</Link>
            <Link href="/about"        className="px-3.5 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">About</Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Phone -- xl only */}
            <a href={`tel:${siteConfig.phone.replace(/ /g, "")}`}
              className="hidden xl:block font-mono text-[0.65rem] text-white/25 no-underline">
              {siteConfig.phone}
            </a>

            {/* Auth state -- desktop */}
            {session === null ? (
              // Loading -- show nothing to avoid flash
              <div className="hidden sm:block w-28 h-9" />
            ) : session.authenticated ? (
              //  SIGNED IN: user dropdown 
              <div ref={userRef} className="relative hidden sm:block">
                <button onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-pointer bg-transparent">
                  {/* Avatar circle */}
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[0.65rem] shrink-0"
                    style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C" }}>
                    {initials}
                  </div>
                  <span className="text-[0.82rem] font-semibold text-white/80 max-w-[100px] truncate">{firstName}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={`text-white/40 transition-transform duration-150 ${userOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* User dropdown */}
                {userOpen && (
                  <div className="absolute top-full right-0 mt-1 rounded-xl shadow-2xl z-50 overflow-hidden"
                    style={{ background: "#0B1640", border: "1px solid rgba(255,255,255,0.08)", minWidth: 240 }}>

                    {/* User info header */}
                    <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="font-bold text-[0.85rem] text-white">{session.name || "My Account"}</p>
                      <p className="text-[0.72rem] text-white/35 truncate">{session.email}</p>
                    </div>

                    {/* Menu items */}
                    {userMenuItems.map((item, i) => {
                      if (item.label === "divider") return (
                        <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                      );

                      const isExternal = item.href?.startsWith("http");
                      const isDanger   = item.danger;

                      if (isExternal) {
                        return (
                          <a key={item.label} href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 no-underline hover:bg-white/[0.05] transition-colors">
                            <div className="flex-1 min-w-0">
                              <p className={`font-semibold text-[0.82rem] ${isDanger ? "text-red-400" : "text-white"}`}>{item.label}</p>
                              {item.desc && <p className="text-[0.68rem] text-white/30">{item.desc}</p>}
                            </div>
                          </a>
                        );
                      }

                      return (
                        <Link key={item.label} href={item.href!}
                          className="flex items-center gap-3 px-4 py-2.5 no-underline hover:bg-white/[0.05] transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[0.82rem] text-white">{item.label}</p>
                            {item.desc && <p className="text-[0.68rem] text-white/30">{item.desc}</p>}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              //  NOT SIGNED IN: Get Started 
              <div className="hidden sm:flex items-center gap-2">
                <a href={`${ACCOUNTS_URL}/sign-in`}
                  className="px-4 py-2 text-white/55 text-[0.78rem] font-semibold no-underline hover:text-white transition-colors rounded-lg">
                  Sign In
                </a>
                <Link href="/get-started" className="btn-gold text-[0.72rem] px-5 py-2.5 whitespace-nowrap">
                  Get Started
                </Link>
              </div>
            )}

            {/* Hamburger -- mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer text-white/70">
              {menuOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/*  MOBILE MENU  */}
      {menuOpen && (
        <div className="fixed top-[68px] left-0 right-0 bottom-0 z-[99] overflow-y-auto lg:hidden"
          style={{ background: "#060E2A" }}>
          <div className="px-5 py-6 flex flex-col gap-1 pb-12">

            {/* Products */}
            <p className="font-mono text-[0.58rem] text-white/20 tracking-[0.15em] uppercase px-3 pt-2 pb-1.5">Products</p>
            {deskProducts.map(p => (
              <Link key={p.id} href={p.href}
                className="flex items-center gap-3 px-3 py-3 no-underline rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 6 }}>
                <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: p.color + "20", border: `1px solid ${p.color}40` }}>
                  <span className="font-mono text-[0.65rem] font-bold" style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[0.9rem] text-white">{p.name}</p>
                  <p className="text-[0.72rem] text-white/35">{p.tagline}</p>
                </div>
                {p.status !== "live" && <span className="font-mono text-[0.52rem] text-amber-400 shrink-0">SOON</span>}
              </Link>
            ))}

            {/* Nav links */}
            <p className="font-mono text-[0.58rem] text-white/20 tracking-[0.15em] uppercase px-3 pt-4 pb-1.5">Navigation</p>
            {[
              { l: "Desk Overview",  h: "/desk"       },
              { l: "Services",       h: "/services"   },
              { l: "Work",           h: "/case-studies" },
              { l: "Insights",       h: "/blog"       },
              { l: "Careers",        h: "/careers"    },
              { l: "Affiliates",     h: "/affiliates" },
              { l: "About",          h: "/about"      },
              { l: "Contact",        h: "/contact"    },
            ].map(link => (
              <Link key={link.l} href={link.h}
                className="block px-4 py-3.5 text-[0.9rem] font-semibold text-white/65 no-underline rounded-lg hover:bg-white/[0.04] transition-colors">
                {link.l}
              </Link>
            ))}

            {/* Auth section */}
            <div className="mt-5 flex flex-col gap-2.5">
              {session?.authenticated ? (
                <>
                  {/* Signed-in user info */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.72rem] shrink-0"
                      style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C" }}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[0.88rem] text-white">{session.name || "My Account"}</p>
                      <p className="text-[0.72rem] text-white/35 truncate">{session.email}</p>
                    </div>
                  </div>
                  <a href={`${ACCOUNTS_URL}/dashboard`}
                    className="flex items-center justify-center py-3.5 rounded-lg font-bold text-[0.78rem] uppercase tracking-wide no-underline"
                    style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)" }}>
                    My Dashboard
                  </a>
                  <a href={`${ACCOUNTS_URL}/dashboard/billing`}
                    className="flex items-center justify-center py-3 rounded-lg font-semibold text-[0.78rem] no-underline"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(226,232,240,0.65)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    Billing & Payments
                  </a>
                  <a href={`${ACCOUNTS_URL}/sign-out`}
                    className="flex items-center justify-center py-3 rounded-lg font-semibold text-[0.78rem] no-underline"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#F87171", border: "1px solid rgba(239,68,68,0.15)" }}>
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <Link href="/get-started"
                    className="flex items-center justify-center py-3.5 rounded-lg font-bold text-[0.78rem] uppercase tracking-wide no-underline btn-gold">
                    Get Started
                  </Link>
                  <a href={`${ACCOUNTS_URL}/sign-in`}
                    className="flex items-center justify-center py-3.5 rounded-lg font-bold text-[0.78rem] uppercase tracking-wide no-underline btn-outline-cream">
                    Sign In
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

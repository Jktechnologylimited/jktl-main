"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig, appLoginUrl, appSignupUrl } from "@/data/index";
import { useCustomNavItems } from "@/hooks/useCustomNavItems";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { nav: customNav } = useCustomNavItems();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center border-b border-white/[0.06]"
        style={{ background: "#060E2A" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-2.5 shrink-0">
            <Image src="/logo.png" alt="JKTL Business" width={38} height={38} className="object-contain" />
            <span className="hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#fff" }}>
              JKTL <span style={{ color: "#C9A84C" }}>Business</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="px-3 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            {customNav.map(item => (
              <Link key={item.slug} href={`/${item.slug}`}
                className="px-3 py-2 text-white/60 text-[0.82rem] font-semibold no-underline hover:text-white transition-colors rounded-lg whitespace-nowrap">
                {item.title}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a href={appLoginUrl()}
              className="hidden sm:inline-flex px-4 py-2 text-white/60 text-[0.78rem] font-semibold no-underline hover:text-white transition-colors rounded-lg whitespace-nowrap">
              Log In
            </a>
            <a href={appSignupUrl()} className="btn-gold text-[0.72rem] px-5 py-2.5 whitespace-nowrap">
              Get started
            </a>

            {/* Hamburger -- mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 bg-transparent border-none cursor-pointer text-white/70">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-[68px] left-0 right-0 bottom-0 z-[99] overflow-y-auto lg:hidden"
          style={{ background: "#060E2A" }}>
          <div className="px-5 py-6 flex flex-col gap-1 pb-12">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="block px-4 py-3.5 text-[0.95rem] font-semibold text-white/70 no-underline rounded-lg hover:bg-white/[0.04] transition-colors">
                {link.label}
              </Link>
            ))}
            {customNav.map(item => (
              <Link key={item.slug} href={`/${item.slug}`}
                className="block px-4 py-3.5 text-[0.95rem] font-semibold text-white/70 no-underline rounded-lg hover:bg-white/[0.04] transition-colors">
                {item.title}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-2.5">
              <a href={appLoginUrl()}
                className="flex items-center justify-center py-3.5 rounded-lg font-bold text-[0.78rem] uppercase tracking-wide no-underline"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(226,232,240,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}>
                Log In
              </a>
              <a href={appSignupUrl()} className="btn-gold" style={{ justifyContent: "center", padding: "15px" }}>
                Get started
              </a>
              <a href={`tel:${siteConfig.phone.replace(/ /g, "")}`}
                className="text-center font-mono text-[0.7rem] text-white/30 no-underline pt-2">
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

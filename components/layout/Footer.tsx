"use client";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/index";
import { useDeskProducts } from "@/hooks/useDeskProducts";

export default function Footer() {
  const deskProducts = useDeskProducts();
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"var(--navy-950)", borderTop:"1px solid rgba(249,247,240,0.06)", padding:"clamp(40px,6vw,56px) clamp(16px,4vw,32px) 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"clamp(24px,4vw,48px)", marginBottom:40 }}>

          {/* Brand */}
          <div style={{ gridColumn:"span 1" }}>
            <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
              <Image src="/logo.png" alt="JK Technology" width={32} height={32} style={{ objectFit:"contain" }} />
              <div>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"0.85rem", color:"#fff" }}>JK Technology Limited</p>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.5rem", color:"var(--gold-400)", letterSpacing:"0.15em" }}>DESK SUITE</p>
              </div>
            </Link>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.3)", lineHeight:1.7, marginBottom:14, fontSize:"0.78rem" }}>
              Vertical software for African businesses. Self-service. Real tools.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              <a href={"mailto:"+siteConfig.email} style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.35)", textDecoration:"none" }}>{siteConfig.email}</a>
              <a href={"tel:"+siteConfig.phone.replace(/ /g,"")} style={{ fontSize:"0.75rem", color:"rgba(249,247,240,0.35)", textDecoration:"none" }}>{siteConfig.phone}</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.22)", marginBottom:14 }}>Products</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <Link href="/desk" style={{ fontSize:"0.8rem", color:"rgba(249,247,240,0.4)", textDecoration:"none" }}>Desk Overview</Link>
              {deskProducts.map(p => (
                <Link key={p.id} href={p.href} style={{ fontSize:"0.8rem", color:"rgba(249,247,240,0.4)", textDecoration:"none" }}>{p.name}</Link>
              ))}
              <Link href="https://accounts.jktl.com.ng/signup" style={{ fontSize:"0.8rem", color:"var(--gold-400)", textDecoration:"none", marginTop:4 }}>Get Started {"->"}</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.22)", marginBottom:14 }}>Services</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {["Website Systems","Lead Generation","Email Automation","SEO","CRM","Payments","AI & Automation"].map(s => (
                <Link key={s} href="/services" style={{ fontSize:"0.8rem", color:"rgba(249,247,240,0.4)", textDecoration:"none" }}>{s}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.22)", marginBottom:14 }}>Company</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { l:"About", h:"/about" },
                { l:"Affiliate Program", h:"/affiliates" },
                { l:"Contact", h:"/contact" },
                { l:"Privacy Policy", h:"/privacy" },
                { l:"Terms", h:"/terms" },
              ].map(link => (
                <Link key={link.l} href={link.h} style={{ fontSize:"0.8rem", color:"rgba(249,247,240,0.4)", textDecoration:"none" }}>{link.l}</Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <p style={{ fontSize:"0.68rem", color:"rgba(249,247,240,0.18)", fontFamily:"'JetBrains Mono',monospace" }}>
            {year} JK Technology Limited -- jktl.com.ng
          </p>
          <p style={{ fontSize:"0.68rem", color:"rgba(249,247,240,0.18)", fontFamily:"'JetBrains Mono',monospace" }}>
            Nigeria -- Africa
          </p>
        </div>
      </div>
    </footer>
  );
}

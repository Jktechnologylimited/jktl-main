import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/index";

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  facebook: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z"/></svg>,
  instagram: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.21-1.15 1.76-.5.5-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47-.66-.26-1.21-.6-1.76-1.15-.5-.5-.9-1.1-1.15-1.76-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.5-.5 1.1-.9 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.4-.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/></svg>,
  linkedin: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>,
  twitter: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-6.9L4.7 22H1.5l8-9.2L1 2h7l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z"/></svg>,
};

// Static Industries list -- no live DB call. Swap back to getDeskProducts()
// once the backend/content layer is reconnected.
const INDUSTRIES_LIST = [
  { id: "schooldesk",       name: "Education",        href: "/schooldesk" },
  { id: "faithdesk",        name: "Faith & Ministry",  href: "/faithdesk" },
  { id: "insurancedesk",    name: "Insurance",         href: "/insurancedesk" },
  { id: "constructiondesk", name: "Construction",      href: "/constructiondesk" },
  { id: "gasstationdesk",   name: "Fuel & Retail",     href: "/gasstationdesk" },
  { id: "businessdesk",     name: "General Business",  href: "/businessdesk" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const deskProducts = INDUSTRIES_LIST;

  const quickLinks = [
    { l: "Home", h: "/" },
    { l: "About Us", h: "/about" },
    { l: "Services", h: "/services" },
    { l: "Industries", h: "/desk" },
    { l: "Work", h: "/case-studies" },
    { l: "Blog", h: "/blog" },
    { l: "Contact", h: "/contact" },
    { l: "Service Areas", h: "/service-areas" },
    { l: "Affiliate Program", h: "/affiliates" },
    { l: "Investments", h: "/investments" },
  ];

  const services = ["Website Systems", "Lead Generation", "SEO & Digital Marketing", "Email Automation", "CRM & Operations", "Payment Systems"];

  const socials = Object.entries(siteConfig.socials || {}).filter(([, url]) => url);

  return (
    <footer style={{ background: "var(--navy-950)", borderTop: "1px solid rgba(249,247,240,0.06)", padding: "clamp(40px,6vw,56px) clamp(16px,4vw,32px) 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4,1fr)", gap: "clamp(24px,4vw,40px)", marginBottom: 40 }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Image src="/logo.png" alt="JK Technology" width={32} height={32} style={{ objectFit: "contain" }} />
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "0.85rem", color: "#fff" }}>JK Technology Limited</p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", color: "var(--gold-400)", letterSpacing: "0.15em" }}>DESK SUITE</p>
              </div>
            </Link>
            <p className="body-sm" style={{ color: "rgba(249,247,240,0.35)", lineHeight: 1.7, marginBottom: 16, fontSize: "0.8rem" }}>
              We help businesses grow with smart digital solutions, industry-specific software and proven strategies.
            </p>
            {socials.length > 0 && (
              <div style={{ display: "flex", gap: 8 }}>
                {socials.map(([key, url]) => (
                  <a key={key} href={url as string} target="_blank" rel="noopener noreferrer" aria-label={key}
                    style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(249,247,240,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {SOCIAL_ICONS[key]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <p className="label-xs" style={{ color: "rgba(249,247,240,0.22)", marginBottom: 14 }}>Quick Links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickLinks.map(link => (
                <Link key={link.l} href={link.h} style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.4)", textDecoration: "none" }}>{link.l}</Link>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <p className="label-xs" style={{ color: "rgba(249,247,240,0.22)", marginBottom: 14 }}>Our Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {services.map(s => (
                <Link key={s} href="/services" style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.4)", textDecoration: "none" }}>{s}</Link>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <p className="label-xs" style={{ color: "rgba(249,247,240,0.22)", marginBottom: 14 }}>Industries</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {deskProducts.map(p => (
                <Link key={p.id} href={p.href} style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.4)", textDecoration: "none" }}>{p.name}</Link>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <p className="label-xs" style={{ color: "rgba(249,247,240,0.22)", marginBottom: 14 }}>Contact Us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={"tel:" + siteConfig.phone.replace(/ /g, "")} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "rgba(249,247,240,0.4)", textDecoration: "none" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                {siteConfig.phone}
              </a>
              <a href={"mailto:" + siteConfig.email} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "rgba(249,247,240,0.4)", textDecoration: "none" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                {siteConfig.email}
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.78rem", color: "rgba(249,247,240,0.4)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {siteConfig.location}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "rgba(249,247,240,0.4)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                We respond within 24 hours
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(249,247,240,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ fontSize: "0.7rem", color: "rgba(249,247,240,0.3)" }}>
            &copy; {year} JK Technology Limited. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: "0.7rem", color: "rgba(249,247,240,0.3)", textDecoration: "none" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: "0.7rem", color: "rgba(249,247,240,0.3)", textDecoration: "none" }}>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

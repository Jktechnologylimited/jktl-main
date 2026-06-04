import type { Metadata } from "next";
import Link from "next/link";
import { sitemapLinks } from "@/data/index";

export const metadata: Metadata = {
  title: "Sitemap | JK Technology Limited",
  description: "Complete sitemap for jktl.com.ng -- AI business websites, landing pages, SEO services, case studies, and insights for US businesses.",
  robots: { index: true, follow: true },
};

const allPages = [
  {
    heading: "Core Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Work / Case Studies", href: "/work" },
      { label: "Packages & Pricing", href: "/packages" },
      { label: "About JKTL", href: "/about" },
      { label: "Contact & Book a Zoom Audit", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: sitemapLinks.services,
  },
  {
    heading: "Insights & Blog",
    links: sitemapLinks.blog,
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"64px" }}>
        <div className="max-w-4xl mx-auto px-8">
          <span className="gold-rule mb-5" style={{ display:"block" }} />
          <h1 className="display-xl mb-3" style={{ color:"var(--cream-50)" }}>Sitemap</h1>
          <p className="body-md" style={{ color:"rgba(249,247,240,0.45)" }}>
            Complete index of all pages on jktl.com.ng
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {allPages.map(section => (
              <div key={section.heading}>
                <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"14px" }}>{section.heading}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"8px" }}>
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} style={{ display:"flex", alignItems:"center", gap:"8px", textDecoration:"none" }}>
                        <span style={{ color:"var(--gold-400)", fontSize:"0.7rem" }}>{"->"}</span>
                        <span style={{ fontSize:"0.9rem", color:"var(--navy-600)", fontWeight:400 }}>{link.label}</span>
                        <span style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.3)", marginLeft:"auto", fontFamily:"'JetBrains Mono',monospace" }}>jktl.com.ng{link.href}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop:"48px", padding:"20px 24px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"4px" }}>
            <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)", marginBottom:"6px" }}>XML Sitemap</p>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.55)" }}>
              The machine-readable XML sitemap for search engines is available at{" "}
              <a href="/sitemap.xml" style={{ color:"var(--navy-600)", fontFamily:"'JetBrains Mono',monospace", fontSize:"0.82rem" }}>
                jktl.com.ng/sitemap.xml
              </a>
              {" "}and is automatically submitted to Google Search Console on every deployment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Hero, Problem, ServicesPreview, Process, TestimonialSection, WhyUs, CTA } from "@/components/sections/Sections";
import Link from "next/link";
import { blogPosts, siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "JK Technology Limited | AI Business Websites & SEO — USA",
  description: "JK Technology Limited builds AI-powered business websites, high-converting landing pages, and SEO strategies for US service businesses. 6+ years. Book a free Zoom audit.",
  alternates: { canonical: "https://jktl.com.ng" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ServicesPreview />

      {/* AI feature strip */}
      <section style={{ background:"var(--navy-800)", padding:"48px 32px", borderTop:"1px solid rgba(249,247,240,0.06)", borderBottom:"1px solid rgba(249,247,240,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon:"🤖", title:"AI-Enhanced Copy", desc:"Intelligent content that adapts to visitor context and intent" },
              { icon:"⚡", title:"Core Web Vitals A+", desc:"Sub-2-second load times, fully optimised for Google ranking factors" },
              { icon:"🗺️", title:"All 50 US States", desc:"Local and national SEO coverage built into every project from day one" },
              { icon:"📊", title:"Conversion Tracked", desc:"Every lead source, every action — measured and reported monthly" },
            ].map((item) => (
              <div key={item.title} style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                <span style={{ fontSize:"1.5rem", flexShrink:0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight:600, fontSize:"0.88rem", color:"var(--cream-50)", marginBottom:"4px" }}>{item.title}</p>
                  <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <TestimonialSection />
      <WhyUs />

      {/* Blog preview */}
      <section className="section-pad" style={{ background:"var(--cream-200)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="gold-rule mb-4" style={{ display:"block" }} />
              <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Latest Insights</h2>
            </div>
            <Link href="/blog" className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none" }}>All articles →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.slice(0,2).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"32px", height:"100%" }}>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"10px" }}>{post.category}</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"12px" }}>{post.title}</h3>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"16px" }}>{post.excerpt}</p>
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)" }}>{post.readTime} read · {post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

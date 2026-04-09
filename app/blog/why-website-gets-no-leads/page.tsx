import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Why Your Website Gets Traffic But No Leads | JKTL",
  description: "High traffic but no leads? Learn the 7 conversion killers destroying your website's performance — and the exact fixes that turn visitors into paying clients.",
  keywords: ["website not converting", "business website no leads", "improve website conversion rate", "high converting landing page", "website conversion rate optimization"],
  alternates: { canonical: "https://jktl.com.ng/blog/why-website-gets-no-leads" },
  openGraph: { title: "Why Your Website Gets Traffic But No Leads", description: "The 7 conversion killers and how to fix them.", type: "article" },
};

export default function BlogPost1() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"64px" }}>
        <div className="max-w-3xl mx-auto px-8">
          <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"14px" }}>Conversion Optimisation · 7 min read · March 15, 2026</p>
          <h1 className="display-xl mb-5" style={{ color:"var(--cream-50)", maxWidth:"680px" }}>
            Why Your Business Website Gets Traffic But No Leads (And How to Fix It)
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            You check your analytics. Traffic is there. But your inbox is empty. Here&apos;s the diagnosis most web designers never give you — and how to fix it fast.
          </p>
        </div>
      </section>

      <article className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-3xl mx-auto px-8 prose-article">

          <p>
            There is a specific kind of frustration that comes from having a website that gets real traffic but generates almost no leads. You can see people are visiting. You know they found you somehow. And then they leave — silently — and you have no idea why.
          </p>
          <p>
            Most business owners assume this is a <strong>traffic problem</strong>. It almost never is. It is a <strong>conversion problem</strong> — and there is a significant difference between the two. More traffic will not fix a broken conversion funnel. It will just amplify the problem.
          </p>
          <p>
            After auditing hundreds of business websites for coaches, consultants, law firms, clinics, and service businesses across the United States, these are the seven conversion killers we find most consistently.
          </p>

          <h2>1. Your Headline Doesn&apos;t Tell Visitors What You Do in Under 5 Seconds</h2>
          <p>
            When a visitor lands on your homepage, they make a sub-conscious decision within 5 seconds: <em>is this for me?</em> If your headline doesn&apos;t answer that question clearly, they leave.
          </p>
          <p>
            The most common mistake is a headline that leads with your company name, a tagline, or vague language like &quot;Excellence in Every Solution.&quot; These mean nothing to a first-time visitor. They want to know: what do you do, who do you do it for, and what result will I get?
          </p>
          <p>
            <strong>The fix:</strong> Rewrite your headline to follow this structure — <em>[What you do] for [who you serve] so they can [result they want].</em> Example: &quot;We build AI-powered websites for US law firms that rank on Google and generate consistent inbound enquiries.&quot;
          </p>

          <h2>2. You Have No Clear Single Call to Action</h2>
          <p>
            Most business websites have 6–12 different &quot;calls to action&quot; spread across the homepage — a phone number in the header, a contact form at the bottom, social media icons, a newsletter signup, a &quot;Learn More&quot; button, and a &quot;Get a Free Quote&quot; button that appears three times.
          </p>
          <p>
            When you give visitors too many choices, they make none. This is a well-documented phenomenon in conversion psychology called the <strong>paradox of choice</strong>.
          </p>
          <p>
            <strong>The fix:</strong> Choose one primary action you want visitors to take — ideally booking a call, requesting an audit, or emailing you directly. Make that action prominent, repeated at strategic points, and the most visually dominant element on the page.
          </p>

          <h2>3. Your Copy Talks About You, Not Your Client</h2>
          <p>
            Read the copy on your homepage right now. Count how many times it uses the words &quot;we,&quot; &quot;our,&quot; and &quot;I&quot; versus &quot;you&quot; and &quot;your.&quot; If you&apos;re like most businesses, it&apos;s heavily skewed toward the former.
          </p>
          <p>
            Visitors don&apos;t come to your website to learn about you. They come because they have a problem they need solved. Your copy needs to speak to that problem first — and position your service as the solution second.
          </p>
          <p>
            <strong>The fix:</strong> Rewrite your above-the-fold copy to lead with your client&apos;s pain, not your company history. Start with what they&apos;re experiencing, acknowledge it, and then introduce your solution.
          </p>

          <h2>4. There Is No Social Proof Above the Fold</h2>
          <p>
            In 2026, a business&apos;s credibility is established digitally before a single conversation happens. Visitors want to see that real people — ideally people like them — have worked with you and had a good experience.
          </p>
          <p>
            If your testimonials are buried at the bottom of the page, or on a separate &quot;Testimonials&quot; page nobody visits, they aren&apos;t doing the conversion work they&apos;re capable of.
          </p>
          <p>
            <strong>The fix:</strong> Place at least one specific, quantified testimonial above the fold — ideally with a photo, name, business type, and a measurable result. &quot;The website paid for itself in the first month&quot; outperforms &quot;Great service!&quot; by a factor of ten.
          </p>

          <h2>5. Your Site Is Slow, Especially on Mobile</h2>
          <p>
            Over 65% of web traffic in the United States now comes from mobile devices. If your website takes more than 3 seconds to load on a mobile connection, Google data shows you will lose over 50% of visitors before they see a single word of your content.
          </p>
          <p>
            Site speed also directly impacts your Google rankings. Pages with poor Core Web Vitals scores — Largest Contentful Paint, Cumulative Layout Shift, First Input Delay — are penalised in search results. So a slow site both loses visitors and ranks lower to begin with.
          </p>
          <p>
            <strong>The fix:</strong> Run your site through <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer">Google PageSpeed Insights</a>. If your mobile score is below 70, engage a developer to address the specific issues flagged. Common culprits are unoptimised images, render-blocking scripts, and poor hosting.
          </p>

          <h2>6. Your Contact Form Has Too Many Fields</h2>
          <p>
            Every field you add to a contact form is a point of friction — a small psychological barrier between a visitor and becoming a lead. Research consistently shows that forms with more than 4–5 fields see significantly lower completion rates.
          </p>
          <p>
            The most common mistake is asking for information at the enquiry stage that you don&apos;t actually need until a project begins — budget ranges, full address, company registration numbers, detailed project briefs.
          </p>
          <p>
            <strong>The fix:</strong> Reduce your contact form to the absolute minimum: name, email, and one open-ended question about what they need. You can gather everything else on the discovery call.
          </p>

          <h2>7. You Have No Stated Next Step</h2>
          <p>
            Many business websites present information clearly, have good design, and still don&apos;t convert — because they never explicitly tell the visitor what to do next. They present the information and then stop.
          </p>
          <p>
            Visitors, especially on service-based business websites, are rarely in &quot;buy now&quot; mode on first visit. But they are often in &quot;learn more&quot; mode. If you don&apos;t give them a clear, low-commitment next step, they leave and forget you.
          </p>
          <p>
            <strong>The fix:</strong> Create a low-commitment next step that feels natural — &quot;Book a free 30-minute audit,&quot; &quot;Request a proposal,&quot; or &quot;Send us a brief.&quot; Make it prominent, explain what happens after they take it, and remove all anxiety from the action.
          </p>

          <h2>What to Do Next</h2>
          <p>
            If any of these seven points resonate, the good news is that conversion problems are entirely fixable — and often faster to address than SEO problems.
          </p>
          <p>
            At JK Technology Limited, every website we build is designed to address all seven of these conversion killers from the outset. Copywriting, information architecture, call-to-action strategy, and site speed are built in — not retrofitted after complaints.
          </p>
          <p>
            If you&apos;d like us to audit your current website and identify specifically which of these is costing you leads, book a free 30-minute Zoom call below.
          </p>

          {/* CTA block */}
          <div style={{ background:"var(--navy-900)", padding:"32px", borderRadius:"4px", marginTop:"40px", textAlign:"center" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.75rem", color:"var(--cream-50)", marginBottom:"12px" }}>Get a Free Website Conversion Audit</h3>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.5)", marginBottom:"20px" }}>
              30 minutes on Zoom. We&apos;ll identify exactly which of these seven problems is impacting your site — and what to do about each one.
            </p>
            <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Book a Free Zoom Audit
            </a>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section style={{ background:"var(--cream-100)", padding:"64px 32px" }}>
        <div className="max-w-3xl mx-auto px-8">
          <h3 className="display-md mb-8" style={{ color:"var(--navy-900)" }}>Related Insights</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title:"Landing Page vs. Website: Which One Does Your Business Need?", slug:"landing-page-vs-website" },
              { title:"The Complete Guide to SEO for Small Businesses in 2026", slug:"seo-small-business-2026" },
            ].map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"24px" }}>
                  <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.15rem", color:"var(--navy-900)", lineHeight:1.3 }}>{p.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import { useState } from "react";
import PageHero from "@/components/shared/PageHero";

// Example posts -- placeholder content for frontend review.
// Swap for real posts from the database once the backend is reconnected.
const POSTS = [
  { date: "May 12, 2024", cat: "Website Design",   title: "10 Must-Have Features Every Business Website Needs",    excerpt: "Discover the essential features that can transform your website into a powerful business tool." },
  { date: "May 5, 2024",  cat: "SEO",               title: "How SEO Helps You Attract More Customers Online",        excerpt: "Learn how search engine optimisation can increase your visibility and drive quality traffic." },
  { date: "Apr 28, 2024", cat: "Digital Marketing", title: "7 Digital Marketing Strategies That Actually Work",      excerpt: "Proven strategies to help you reach your audience, generate leads and grow your business." },
  { date: "Apr 20, 2024", cat: "Business Growth",   title: "How to Turn Your Website Into a Lead Generation Machine", excerpt: "Simple steps to convert website visitors into leads and paying customers." },
  { date: "Apr 15, 2024", cat: "Website Design",    title: "The Importance of Mobile Responsive Web Design",          excerpt: "Why having a mobile-friendly website is crucial for your business success." },
  { date: "Apr 8, 2024",  cat: "Technology",         title: "CMS Showdown: WordPress vs Custom Website",              excerpt: "Which content management approach is right for your business? We break it down." },
  { date: "Mar 30, 2024", cat: "E-Commerce",         title: "E-Commerce Trends to Watch This Year",                   excerpt: "Stay ahead of the competition with these upcoming e-commerce trends." },
  { date: "Mar 22, 2024", cat: "SEO",                title: "Local SEO: A Complete Guide for Small Businesses",       excerpt: "Optimise your online presence locally and attract more customers in your area." },
  { date: "Mar 15, 2024", cat: "Digital Marketing",  title: "How Content Marketing Builds Trust and Boosts Sales",    excerpt: "Create valuable content that builds trust and influences buying decisions." },
];

const TABS = ["All Posts", "Website Design", "SEO", "Digital Marketing", "Business Growth", "Technology", "E-Commerce"];

const CATEGORIES = [
  { l: "Website Design",    n: 12 }, { l: "SEO", n: 10 }, { l: "Digital Marketing", n: 15 },
  { l: "Business Growth",   n: 9 },  { l: "Technology", n: 8 }, { l: "E-Commerce", n: 7 }, { l: "Case Studies", n: 6 },
];

const TAGS = ["Website Design", "SEO", "Marketing", "Business Growth", "WordPress", "E-Commerce", "Content Marketing", "Analytics", "Conversion", "Lead Generation"];

export default function BlogPage() {
  const [tab, setTab] = useState("All Posts");
  const [q, setQ] = useState("");

  const filtered = POSTS.filter(p =>
    (tab === "All Posts" || p.cat === tab) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Blog & Insights"
        heading="Insights, Tips & Strategies To Help Your Business Grow"
        subhead="Practical advice and expert insights on websites, marketing, business growth and technology."
        primaryLabel="Read Latest"
        primaryHref="#posts"
        secondaryLabel="Subscribe"
        secondaryHref="#newsletter"
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">BLOG</span></div>}
      />

      {/* Search */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-6 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 border border-cream-300 rounded-sm px-4 py-3 bg-cream-50" style={{ maxWidth: 420 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(6,14,42,0.35)" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input type="text" placeholder="Search articles..." value={q} onChange={e => setQ(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-navy-900 placeholder:text-black/30" />
          </div>
        </div>
      </section>

      <section id="posts" className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[1200px] mx-auto">
          {/* Category tabs */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="px-4 py-2.5 text-[0.76rem] font-semibold rounded-sm whitespace-nowrap border transition-colors"
                style={{ background: tab === t ? "var(--navy-900)" : "transparent", color: tab === t ? "#fff" : "rgba(6,14,42,0.5)", borderColor: tab === t ? "var(--navy-900)" : "var(--cream-300)" }}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* Posts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" style={{ alignContent: "start" }}>
              {filtered.map(p => (
                <div key={p.title} className="bg-white border border-cream-300 rounded overflow-hidden">
                  <div className="bg-cream-100" style={{ aspectRatio: "16/10" }} />
                  <div className="p-5">
                    <p className="font-mono text-[0.62rem] text-black/35 uppercase tracking-wide mb-2">{p.date} &middot; {p.cat}</p>
                    <p className="font-bold text-[0.9rem] text-navy-900 mb-2 leading-snug">{p.title}</p>
                    <p className="text-[0.8rem] text-black/50 leading-relaxed mb-3 line-clamp-2">{p.excerpt}</p>
                    <span className="font-mono text-[0.66rem] font-bold text-navy-700 uppercase tracking-wide">Read More &#8594;</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p className="text-black/40 text-sm col-span-full text-center py-10">No articles match your search.</p>}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="font-bold text-[0.85rem] text-navy-900 uppercase tracking-wide mb-4">Categories</p>
                <div className="flex flex-col gap-2.5">
                  {CATEGORIES.map(c => (
                    <div key={c.l} className="flex items-center justify-between text-[0.82rem]">
                      <span className="text-black/60">{c.l}</span>
                      <span className="font-mono text-black/35">{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="font-bold text-[0.85rem] text-navy-900 uppercase tracking-wide mb-4">Popular Posts</p>
                <div className="flex flex-col gap-4">
                  {POSTS.slice(0, 3).map(p => (
                    <div key={p.title} className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded bg-cream-100 shrink-0" />
                      <div>
                        <p className="text-[0.78rem] font-semibold text-navy-900 leading-snug mb-1">{p.title}</p>
                        <p className="font-mono text-[0.64rem] text-black/35">{p.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-cream-300 rounded p-6">
                <p className="font-bold text-[0.85rem] text-navy-900 uppercase tracking-wide mb-4">Tag Cloud</p>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(t => (
                    <span key={t} className="text-[0.72rem] px-2.5 py-1 rounded-sm bg-cream-100 text-black/55">{t}</span>
                  ))}
                </div>
              </div>

              <div id="newsletter" className="bg-navy-900 border border-navy-700 rounded p-6">
                <p className="font-bold text-[0.9rem] text-white mb-2">Want More Growth Tips Like These?</p>
                <p className="text-[0.78rem] text-white/45 leading-relaxed mb-4">Subscribe and get the latest insights straight to your inbox.</p>
                <input type="email" placeholder="Enter your email..." className="w-full px-3 py-2.5 mb-2 rounded-sm bg-white/[0.06] border border-white/15 text-white text-[0.8rem] placeholder:text-white/25 outline-none" />
                <button className="btn-gold w-full py-2.5 text-[0.76rem] uppercase tracking-wide">Subscribe</button>
              </div>
            </aside>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
            <button className="px-4 py-2 text-[0.78rem] border border-cream-300 rounded-sm text-black/40">&laquo; Previous</button>
            {[1, 2, 3, 4].map(n => (
              <button key={n} className="w-9 h-9 text-[0.78rem] rounded-sm border"
                style={{ background: n === 1 ? "var(--navy-900)" : "transparent", color: n === 1 ? "#fff" : "rgba(6,14,42,0.5)", borderColor: n === 1 ? "var(--navy-900)" : "var(--cream-300)" }}>
                {n}
              </button>
            ))}
            <span className="text-black/30 text-[0.78rem]">&hellip;</span>
            <button className="px-4 py-2 text-[0.78rem] border border-cream-300 rounded-sm text-black/40">Next &raquo;</button>
          </div>
        </div>
      </section>

      {/* Bottom newsletter bar */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-10 border-t border-cream-300">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="display-lg text-cream-50 mb-1.5" style={{ fontSize: "1.4rem" }}>Stay Updated With Actionable Insights</h2>
            <p className="body-sm text-white/50">Join our newsletter and get expert tips delivered to your inbox.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0">
            <input type="email" placeholder="Enter your email address..." className="flex-1 sm:w-64 px-4 py-3 rounded-sm bg-white/[0.06] border border-white/15 text-white text-[0.82rem] placeholder:text-white/30 outline-none" />
            <button className="btn-gold px-6 py-3 text-[0.78rem] uppercase tracking-wide whitespace-nowrap">Subscribe Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}

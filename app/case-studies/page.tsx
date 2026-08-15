"use client";
import { useState } from "react";
import PageHero from "@/components/shared/PageHero";
import StatsRow from "@/components/shared/StatsRow";
import CTABanner from "@/components/shared/CTABanner";

// Example project entries -- placeholder content for frontend review.
// Swap for real case studies from the database once the backend is reconnected.
const PROJECTS = [
  { client: "Example School",       category: "Education",   type: "School Platform",       desc: "A complete school operating system for a growing K-12 institution." },
  { client: "Example Church",       category: "Faith",       type: "Ministry Platform",      desc: "A digital management platform for a multi-branch faith organisation." },
  { client: "Example Insurer",      category: "Finance",     type: "Insurance Platform",     desc: "A policy and claims management system for an insurance brokerage." },
  { client: "Example Contractor",   category: "Other",       type: "Construction Platform",  desc: "A project and site-tracking system for a construction company." },
  { client: "Example Retailer",     category: "E-Commerce",  type: "Online Store",           desc: "An online store that delivers a seamless shopping experience." },
  { client: "Example Detailer",     category: "Other",       type: "Booking Platform",       desc: "A booking and job-tracking system for an auto detailing business." },
  { client: "Example Agency",       category: "Websites",    type: "Business Website",       desc: "A high-performing marketing website built to generate leads." },
  { client: "Example Station",      category: "Other",       type: "Operations Platform",    desc: "An inventory and shift-management platform for a fuel retailer." },
];

const FILTERS = ["All Projects", "Websites", "E-Commerce", "Education", "Finance", "Other"];

const STATS = [
  { v: "200+", l: "Projects Completed" },
  { v: "100+", l: "Happy Clients" },
  { v: "6+",   l: "Industries Served" },
  { v: "6+",   l: "Years Experience" },
  { v: "24/7", l: "Support" },
];

const TESTIMONIALS = [
  { quote: "Their team understood our needs perfectly and delivered a platform that has significantly increased our enquiries.", name: "Client Name", role: "CEO, Example Company" },
  { quote: "Professional, responsive and highly skilled. Our new system looks great and performs even better.", name: "Client Name", role: "Managing Partner, Example Co." },
  { quote: "Our operations have improved since we launched. Highly recommended.", name: "Client Name", role: "Founder, Example Business" },
];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState("All Projects");
  const [t, setT] = useState(0);

  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Our Work"
        heading="Systems That Drive Results For Our Clients"
        subhead="Explore a selection of our recent projects. Each one designed with purpose, built for performance, and crafted to help businesses grow."
        primaryLabel="View Case Studies"
        primaryHref="#projects"
        secondaryLabel="Start Your Project"
        secondaryHref="/get-started"
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">OUR WORK</span></div>}
      />

      {/* FILTER TABS + PROJECTS */}
      <section id="projects" className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-1">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2.5 text-[0.78rem] font-semibold rounded-sm whitespace-nowrap border transition-colors"
                style={{ background: filter === f ? "var(--navy-900)" : "transparent", color: filter === f ? "#fff" : "rgba(6,14,42,0.5)", borderColor: filter === f ? "var(--navy-900)" : "var(--cream-300)" }}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PROJECTS.filter(p => filter === "All Projects" || p.category === filter).map(p => (
              <div key={p.client} className="bg-cream-50 border border-cream-300 rounded overflow-hidden">
                <div className="bg-navy-950" style={{ aspectRatio: "4/3" }} />
                <div className="p-5">
                  <p className="font-bold text-[0.9rem] text-navy-900 mb-0.5">{p.client}</p>
                  <p className="text-[0.72rem] text-black/40 mb-2">{p.type}</p>
                  <p className="text-[0.8rem] text-black/55 leading-relaxed mb-3">{p.desc}</p>
                  <span className="font-mono text-[0.66rem] font-bold text-navy-700 uppercase tracking-wide">View Project &#8594;</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="btn-outline-navy px-6 py-3 text-sm uppercase tracking-wide">Load More Projects</button>
          </div>
        </div>
      </section>

      {/* RESULTS STATS */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Work Delivers Real Results</h2>
          <StatsRow stats={STATS} />
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Trusted By Businesses Like Yours</h2>
          <div className="flex items-center gap-3">
            <button aria-label="Previous" onClick={() => setT(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-cream-300 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {[0, 1, 2].map(off => {
                const item = TESTIMONIALS[(t + off) % TESTIMONIALS.length];
                return (
                  <div key={off} className="bg-cream-50 border border-cream-300 rounded p-6">
                    <div className="w-10 h-10 rounded-full bg-navy-900 mb-4" />
                    <p className="text-[0.85rem] text-black/65 leading-relaxed mb-4">&ldquo;{item.quote}&rdquo;</p>
                    <p className="font-bold text-[0.82rem] text-navy-900">{item.name}</p>
                    <p className="text-[0.72rem] text-black/40">{item.role}</p>
                  </div>
                );
              })}
            </div>
            <button aria-label="Next" onClick={() => setT(i => (i + 1) % TESTIMONIALS.length)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-cream-300 shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} aria-label={`Go to ${i + 1}`} onClick={() => setT(i)} className="rounded-full transition-all"
                style={{ width: i === t ? 20 : 7, height: 7, background: i === t ? "#C9A84C" : "rgba(6,14,42,0.15)" }} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner heading="Ready to Build Your Success Story?" subhead="Let's create a system that helps your business grow and stand out online." />
    </div>
  );
}

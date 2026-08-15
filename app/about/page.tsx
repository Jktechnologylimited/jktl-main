import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import StatsRow from "@/components/shared/StatsRow";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Us | JK Technology Limited",
  description: "We are a team of strategists, designers and developers passionate about building high-performing digital systems that help businesses grow.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

const VALUES = [
  {
    title: "Our Mission",
    desc: "To empower businesses with powerful digital solutions that drive growth, build credibility and create lasting impact.",
  },
  {
    title: "Our Vision",
    desc: "To be the leading digital partner for businesses in Africa and beyond, known for innovation, results and exceptional service.",
  },
  {
    title: "Our Values",
    list: ["Excellence in everything we do", "Integrity and transparency", "Client success is our priority", "Innovation and continuous growth"],
  },
];

const WHY = [
  { title: "Results Driven",   desc: "We focus on building systems that deliver measurable results for your business." },
  { title: "Custom Solutions", desc: "Every business is unique. We create tailored solutions that fit your goals." },
  { title: "Expert Team",      desc: "Skilled designers, developers and strategists working together for you." },
  { title: "Ongoing Support",  desc: "We're always here to support you even after your project goes live." },
];

const TEAM = [
  { name: "Founder & Team",  role: "Leadership" },
  { name: "Product & Design", role: "Design Team" },
  { name: "Engineering",     role: "Development Team" },
  { name: "Client Success",  role: "Support Team" },
];

const STATS = [
  { v: "200+", l: "Projects Completed" },
  { v: "100+", l: "Happy Clients" },
  { v: "6+",   l: "Industries Served" },
  { v: "6+",   l: "Years Experience" },
  { v: "24/7", l: "Support" },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="About Us"
        heading="We Build Systems That Help Businesses Grow"
        subhead="We are a team of strategists, designers and developers passionate about building high-performing software that attracts customers, generates leads and grows businesses across Nigeria."
        primaryLabel="Get to Know Us"
        primaryHref="/contact"
        secondaryLabel="View Our Work"
        secondaryHref="/case-studies"
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">JKTL</span></div>}
      />

      {/* OUR STORY */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="rounded overflow-hidden border border-cream-300 bg-navy-950 flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
              <span className="font-mono text-[0.6rem] text-white/20 tracking-widest">FOUNDED 2019</span>
            </div>
            <div>
              <p className="font-bold text-[1.05rem] text-navy-900 mb-4">Every great business has a beginning.</p>
              <div className="flex flex-col gap-3 mb-6">
                <p className="body-sm text-black/55 leading-relaxed">We started with a simple goal -- to help businesses establish a professional online presence that drives real results.</p>
                <p className="body-sm text-black/55 leading-relaxed">Since 2019, we have worked with businesses across different industries, delivering platforms that not only look great but also perform and convert.</p>
                <p className="body-sm text-black/55 leading-relaxed">Our journey is built on passion, creativity, and a commitment to excellence in everything we ship.</p>
              </div>
              <Link href="/case-studies" className="btn-outline-navy px-6 py-3 inline-block text-sm uppercase tracking-wide">Our Journey</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Mission, Vision &amp; Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white border border-cream-300 rounded p-7 text-center">
                <div className="w-11 h-11 rounded-full border border-cream-300 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[1rem] text-navy-900 mb-3">{v.title}</p>
                {v.desc && <p className="body-sm text-black/55 leading-relaxed">{v.desc}</p>}
                {v.list && (
                  <ul className="text-left flex flex-col gap-1.5 mt-2">
                    {v.list.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[0.82rem] text-black/55">
                        <span className="text-gold-400 shrink-0">&#8226;</span>{item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map(w => (
              <div key={w.title} className="text-center">
                <div className="w-11 h-11 rounded-sm bg-navy-900 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[0.92rem] text-navy-900 mb-2">{w.title}</p>
                <p className="text-[0.8rem] text-black/50 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map(t => (
              <div key={t.name} className="bg-white border border-cream-300 rounded p-6 text-center">
                <div className="rounded bg-navy-950 mb-4 flex items-center justify-center" style={{ aspectRatio: "1/1" }}>
                  <span className="font-mono text-[0.55rem] text-white/20">{t.name.split(" ")[0].toUpperCase()}</span>
                </div>
                <p className="font-bold text-[0.9rem] text-navy-900">{t.name}</p>
                <p className="text-[0.75rem] text-black/40 mb-3">{t.role}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[0.8rem] text-black/35 mt-8">Real team profiles coming soon.</p>
        </div>
      </section>

      {/* IMPACT IN NUMBERS */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Impact in Numbers</h2>
          <StatsRow stats={STATS} />
        </div>
      </section>

      <CTABanner heading="Ready to grow your business?" subhead="Let's build a system that delivers real results for your business." />
    </div>
  );
}

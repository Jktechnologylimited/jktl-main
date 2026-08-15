import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Our Services | JK Technology Limited",
  description: "Powerful digital solutions that drive real results -- website design, e-commerce, SEO, content, maintenance and digital marketing.",
  alternates: { canonical: "https://jktl.com.ng/services" },
};

const HELP = [
  { title: "Build",   desc: "We build fast, responsive and secure systems that represent your brand." },
  { title: "Attract", desc: "We use proven strategies to attract the right traffic to your platform." },
  { title: "Convert", desc: "We design experiences that convert visitors into leads and customers." },
  { title: "Engage",  desc: "We help you engage your audience and build lasting relationships." },
  { title: "Grow",    desc: "We provide insights and support to help you scale your business." },
];

const CORE_SERVICES = [
  { title: "Website Design & Development", desc: "Custom websites that are modern, fast, responsive and built to convert visitors into customers." },
  { title: "E-Commerce Solutions",         desc: "Powerful online stores that help you sell products, manage orders and grow revenue." },
  { title: "Search Engine Optimisation",   desc: "Improve your website ranking, get found by your ideal customers and drive organic traffic." },
  { title: "Content Writing",              desc: "Engaging and SEO-friendly content that tells your story and builds trust with your audience." },
  { title: "System Maintenance",           desc: "We keep your platform updated, secure and running smoothly so you can focus on your business." },
  { title: "Digital Marketing",            desc: "Strategic campaigns that increase your brand visibility, generate leads and boost sales." },
];

const PROCESS = [
  { n: "1", title: "Discover", desc: "We learn about your business, goals and target audience." },
  { n: "2", title: "Plan",     desc: "We create a strategic plan tailored to your needs." },
  { n: "3", title: "Design",   desc: "We design a stunning, user-friendly experience." },
  { n: "4", title: "Develop",  desc: "We build your system with clean code and best practices." },
  { n: "5", title: "Launch & Support", desc: "We launch your platform and provide ongoing support." },
];

const WHY = [
  { title: "Results Focused",  desc: "We focus on delivering measurable results that help your business grow and succeed." },
  { title: "Custom Solutions", desc: "Every business is unique -- we create solutions that are tailored to your goals." },
  { title: "Expert Team",      desc: "Our team of strategists, designers and developers are passionate about your success." },
  { title: "Ongoing Support",  desc: "We are with you even after launch to ensure your system continues to perform." },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Our Services"
        heading="Powerful Digital Solutions That Drive Real Results"
        subhead="We offer a wide range of services designed to help businesses build a strong online presence, attract more customers and achieve sustainable growth."
        primaryLabel="Let's Work Together"
        primaryHref="/get-started/services"
        secondaryLabel="View Our Work"
        secondaryHref="/case-studies"
        imageNode={<div className="w-full h-full flex items-center justify-center"><span className="font-mono text-[0.65rem] text-white/20 tracking-widest">SERVICES</span></div>}
      />

      {/* HOW WE HELP */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">How We Help Your Business Grow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HELP.map(h => (
              <div key={h.title} className="text-center">
                <div className="w-11 h-11 rounded-sm border border-cream-300 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[0.9rem] text-navy-900 mb-2">{h.title}</p>
                <p className="text-[0.78rem] text-black/50 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Core Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_SERVICES.map(s => (
              <div key={s.title} className="bg-white border border-cream-300 rounded p-6">
                <div className="rounded bg-navy-950 mb-4" style={{ aspectRatio: "16/10" }} />
                <p className="font-bold text-[0.95rem] text-navy-900 mb-2">{s.title}</p>
                <p className="text-[0.82rem] text-black/55 leading-relaxed mb-4">{s.desc}</p>
                <Link href="/get-started/services" className="font-mono text-[0.68rem] font-bold text-navy-700 no-underline uppercase tracking-wide">Learn More &#8594;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="display-lg text-cream-50 text-center mb-14">Our Process</h2>
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-8 sm:gap-3">
            {PROCESS.map((s, i) => (
              <div key={s.n} className="flex flex-col sm:flex-row items-center sm:items-start flex-1" style={{ maxWidth: 220 }}>
                <div className="text-center flex-1">
                  <div className="w-9 h-9 rounded-full border border-gold-400/40 flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-gold-400 text-[0.85rem]">{s.n}</span>
                  </div>
                  <p className="font-bold text-[0.85rem] text-white uppercase tracking-wide mb-2">{s.title}</p>
                  <p className="text-[0.76rem] text-white/45 leading-relaxed">{s.desc}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 my-3 sm:my-0 sm:mt-3" style={{ width: 24 }}>
                    <svg className="hidden sm:block" width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M1 6h16M13 1l5 5-5 5" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
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

      <CTABanner heading="Ready to take your business to the next level?" subhead="Let's build a powerful online presence that drives real growth." />
    </div>
  );
}

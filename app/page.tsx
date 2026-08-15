import Link from "next/link";
import TrustBadges from "@/components/home/TrustBadges";
import HeroMockup from "@/components/home/HeroMockup";
import OurProcess from "@/components/home/OurProcess";
import OurServicesTeaser from "@/components/home/OurServicesTeaser";
import AboutVideo from "@/components/home/AboutVideo";
import ServiceLocations from "@/components/home/ServiceLocations";
import HomeTestimonials from "@/components/home/HomeTestimonials";

// Static homepage content -- no live API/DB calls. Swap the arrays below (or
// reintroduce the useSiteContent/useTestimonials/useCaseStudies/usePosts hooks)
// once the backend/content layer is reconnected.
const HERO = {
  line1: "Grow Your", accent: "Business Online",
  subhead: "We build high-performing digital systems that attract customers, generate leads and grow your business.",
};

const PAST_WORK = [
  { title: "Example School",     category: "Education" },
  { title: "Example Church",     category: "Faith & Ministry" },
  { title: "Example Insurer",    category: "Insurance" },
  { title: "Example Business",   category: "General Business" },
];

const BLOG_POSTS = [
  { title: "10 Must-Have Features Every Business Website Needs", cat: "Website Design", excerpt: "Discover the essential features that can transform your website into a powerful business tool." },
  { title: "How SEO Helps You Attract More Customers Online",    cat: "SEO",             excerpt: "Learn how search engine optimisation can increase your visibility and drive quality traffic." },
  { title: "7 Digital Marketing Strategies That Actually Work",  cat: "Digital Marketing", excerpt: "Proven strategies to help you reach your audience, generate leads and grow your business." },
];

export default function HomePage() {
  return (
    <div className="bg-cream-50">

      {/*  HERO  */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "clamp(56px,8vw,88px)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <h1 className="display-hero text-white mb-5 leading-[1.05] uppercase">
                {HERO.line1} <span className="text-gold-400">{HERO.accent}</span>
              </h1>
              <p className="body-lg text-white/55 mb-9" style={{ maxWidth: 480 }}>
                {HERO.subhead}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/get-started" className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">Get Started</Link>
                <Link href="/services" className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">Learn More</Link>
              </div>
            </div>

            {/* Right: image / mockup */}
            <div className="flex justify-center">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/*  REVIEWS / TESTIMONIALS  */}
      <section id="testimonials" className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Reviews / Testimonials</h2>
          <HomeTestimonials />
        </div>
      </section>

      {/*  TRUST BADGES  */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-8">Trust Badges</h2>
          <TrustBadges />
        </div>
      </section>

      {/*  PAST WORK  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Past Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAST_WORK.map(w => (
              <div key={w.title}>
                <div className="rounded overflow-hidden border border-cream-300 mb-3 bg-white flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
                  <span className="font-mono text-[0.6rem] text-black/20">{w.category.toUpperCase()}</span>
                </div>
                <p className="font-bold text-[0.88rem] text-navy-900">{w.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/case-studies" className="font-mono text-[0.72rem] font-bold text-navy-900 no-underline">View All Case Studies &#8594;</Link>
          </div>
        </div>
      </section>

      {/*  OUR PROCESS  */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="display-lg text-cream-50 text-center mb-14">Our Process</h2>
          <OurProcess />
        </div>
      </section>

      {/*  OUR SERVICES  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Our Services</h2>
          <OurServicesTeaser />
        </div>
      </section>

      {/*  ABOUT US  */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AboutVideo />
            <div>
              <p className="body-md text-black/60 leading-relaxed mb-3">Built by a Nigerian founder, for African businesses.</p>
              <p className="body-sm text-black/50 leading-relaxed mb-6">
                We are a team of strategists, designers and developers passionate about building high-performing digital systems that help businesses grow.
              </p>
              <Link href="/about" className="btn-outline-navy px-7 py-3 inline-block text-sm uppercase tracking-wide">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/*  BLOG  */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">Blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOG_POSTS.map(p => (
              <div key={p.title} className="bg-white border border-cream-300 rounded overflow-hidden">
                <div className="w-full h-40 bg-cream-100 flex items-center justify-center"><span className="font-mono text-[0.6rem] text-black/20">{p.cat.toUpperCase()}</span></div>
                <div className="p-5">
                  <p className="font-bold text-[0.95rem] text-navy-900 mb-2 leading-snug">{p.title}</p>
                  <p className="text-[0.82rem] text-black/45 leading-relaxed mb-3 line-clamp-2">{p.excerpt}</p>
                  <span className="font-mono text-[0.68rem] font-bold text-navy-700 uppercase tracking-wide">Read More &#8594;</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="font-mono text-[0.72rem] font-bold text-navy-900 no-underline">View All Articles &#8594;</Link>
          </div>
        </div>
      </section>

      {/*  SERVICE LOCATIONS  */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-8">Service Locations</h2>
          <ServiceLocations />
        </div>
      </section>

    </div>
  );
}

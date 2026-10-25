import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import Icon from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { industries, pexelsUrl, appSignupUrl } from "@/data/index";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "JKTL Business fits beauty, fitness, food, retail, events, media, nightlife, travel and fashion businesses across Nigeria.",
  alternates: { canonical: "https://jktl.com.ng/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="Industries We Serve"
        heading="Built For Every Kind Of Nigerian Business"
        subhead="Whether you take bookings or make sales, JKTL Business adapts to how your business actually works -- not the other way around."
        primaryLabel="Get started free"
        primaryHref={appSignupUrl()}
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
        imageNode={<Image src={pexelsUrl(30689114, 900)} alt="Team running a Nigerian business" width={900} height={675} className="w-full h-full object-cover" />}
      />

      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
          {industries.map((ind, i) => (
            <div key={ind.slug} id={ind.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center scroll-mt-24">
              <Reveal y={0} className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="rounded overflow-hidden border border-cream-300" style={{ aspectRatio: "4/3" }}>
                  <Image src={ind.image} alt={ind.title} width={800} height={600} className="w-full h-full object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(6,14,42,0.05)" }}>
                  <Icon name={ind.icon} size={22} className="text-navy-900" />
                </div>
                <h2 className="display-lg text-navy-900 mb-3">{ind.title}</h2>
                <p className="body-md text-black/60 mb-5">{ind.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {ind.examples.map(ex => (
                    <span key={ex} className="text-[0.75rem] px-3 py-1.5 rounded-full" style={{ background: "var(--site-tint)", border: "1px solid var(--cream-300)", color: "var(--site-muted)" }}>{ex}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-6" style={{ background: "var(--site-tint)" }}>
        <p className="text-center body-sm text-black/45 max-w-[640px] mx-auto py-8">
          Don&apos;t see your exact type of business? JKTL Business is flexible enough for most service and product businesses --
          {" "}<Link href="/contact" style={{ color: "var(--site-text)" }}>talk to us</Link> and we&apos;ll tell you honestly if it&apos;s a fit.
        </p>
      </section>

      <CTABanner
        heading="Find Your Industry Above?"
        subhead="No card required. Set up your business and go live today."
        primaryLabel="Get started free"
        primaryHref={appSignupUrl()}
        secondaryLabel="See How It Works"
        secondaryHref="/how-it-works"
      />
    </div>
  );
}

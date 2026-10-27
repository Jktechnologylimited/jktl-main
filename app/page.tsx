import { pageMetadata } from "@/lib/seo/metadata";
import { PeopleStory } from "@/components/shared/PeopleStory";
import { FeatureBadge } from "@/components/features/FeatureBadge";
import { FeaturedCaseStudies } from "@/components/case-studies/FeaturedCaseStudies";
import { T } from "@/components/i18n/LanguageProvider";
import { WebsiteSteps } from "@/components/home/WebsiteSteps";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Globe, Smartphone, ShieldCheck } from "lucide-react";
import Icon from "@/components/shared/Icon";
import SocialProof from "@/components/shared/SocialProof";
import {
  Reveal,
  Stagger,
  StaggerItem,
  HoverLift,
} from "@/components/shared/Reveal";
import { affiliateUrl, appSignupUrl, features, industries } from "@/data/index";

export const metadata = pageMetadata("/", {
  title: "Free Business Websites, Landing Pages & Business Tools",
  description:
    "Build a website or landing page with 200 modern templates. Manage customers, bookings, invoices and stock with JKTL Business. Start for free.",
});

export default function HomePage() {
  return (
    <div className="bg-cream-50">
      {/* The hook comes first; the people-led visual follows on every screen. */}
      <section className="relative overflow-hidden bg-[#FDFCF8] text-[#060E2A] px-5 pt-32 pb-16 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[950px] text-center">
            <p className="text-[11px] sm:text-xs uppercase tracking-[.16em] font-semibold">
              <T>Websites • Domains • Hosting • Business Email</T>
            </p>
            <h1 className="mt-7 text-[clamp(2.8rem,6vw,5.8rem)] leading-[1.03] tracking-[-.055em] font-medium">
              <T>Build your business online.</T>
              <br />
              <span className="text-[#80621c]">
                <T>Grow beyond limits.</T>
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-[690px] text-base sm:text-lg leading-relaxed text-[#5b6472]">
              <T>
                Create a professional website, get your own domain and business
                email, and access powerful tools to manage your business — all
                in one place.
              </T>
            </p>
            <a
              href={appSignupUrl()}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#060E2A] px-9 py-4 text-white text-sm font-semibold"
            >
              <T>Start for free</T>{" "}
              <span aria-hidden="true" className="ml-5">
                →
              </span>
            </a>
            <p className="mt-4 text-xs text-[#5b6472]">
              <T>No credit card required. Choose a plan when you’re ready.</T>
            </p>
          </div>
          <div className="relative mt-12 sm:mt-16">
            <div className="overflow-hidden rounded-[24px] sm:rounded-[36px] border border-[#E8E1D0]">
              <Image
                src="/brand/entrepreneur-studio.png"
                alt="A smiling African entrepreneur with her laptop in a bright studio, with two colleagues talking behind her"
                width={1672}
                height={941}
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-auto"
                priority
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-7 sm:left-7 rounded-2xl border border-[#E8E1D0] bg-[#fbfcf7] p-5 sm:max-w-[270px] shadow-sm">
              <p className="text-[10px] uppercase tracking-[.14em] text-[#80621c]">
                <T>YOUR NEXT CHAPTER</T>
              </p>
              <p className="mt-2 text-2xl tracking-tight">
                <T>Your business. Online.</T>
              </p>
              <p className="mt-2 text-xs text-[#5b6472]">
                <T>A website, a name of your own, and room to grow.</T>
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-9 gap-y-3 text-xs text-[#5b6472]">
            {[
              "200 industry designs + blank canvases",
              "Managed hosting & SSL",
              "14-day guarantee on your first paid website plan",
            ].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
      <PeopleStory variant="business" />
      <WebsiteSteps />
      <FeaturedCaseStudies />
      {/* FEATURE GRID */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-14">
            <span className="gold-rule mx-auto mb-4" />
            <h2 className="display-xl text-navy-900 mb-3">
              <T>Everything Your Business Needs, In One App</T>
            </h2>
            <p className="body-md text-black/55 max-w-[560px] mx-auto">
              <T>
                No spreadsheets, no separate apps for bookings and invoices. One
                place for it all.
              </T>
            </p>
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <HoverLift>
                  <div className="card-light p-6 h-full">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "rgba(6,14,42,0.05)" }}
                    >
                      <Icon name={f.icon} size={22} className="text-navy-900" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-[0.95rem] mb-2">
                      {f.title}
                      <FeatureBadge
                        slug={f.id === "website" ? "website-builder" : f.id}
                      />
                    </h3>
                    <p className="body-sm text-black/55">{f.desc}</p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* INDUSTRIES TEASER */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        style={{ background: "var(--site-tint)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="gold-rule mb-4 block" />
              <h2 className="display-xl text-navy-900">
                <T>Built For How Your Business Actually Works</T>
              </h2>
            </div>
            <Link
              href="/industries"
              className="label-xs whitespace-nowrap"
              style={{ color: "var(--site-accent)" }}
            >
              <T>See all industries </T>
              {"->"}
            </Link>
          </Reveal>
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.slice(0, 5).map((ind) => (
              <StaggerItem key={ind.slug}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="group block no-underline"
                >
                  <div
                    className="rounded overflow-hidden mb-2.5"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Image
                      src={ind.image}
                      alt={ind.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[0.82rem] font-semibold text-navy-900">
                    {ind.title}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-[#020818] px-6 py-20 text-[#f6f7ee]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-widest text-[#E2CF96]">
            <T>A plan for your next chapter</T>
          </p>
          <h2 className="mt-5 text-4xl sm:text-6xl leading-tight tracking-tight">
            <T>Start free. Grow at your pace.</T>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70">
            <T>
              Your free website includes a JKTL address, managed hosting and
              access to 200 designs. Compare monthly and yearly plans as your
              team grows.
            </T>
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-5">
            <a
              href={appSignupUrl()}
              className="rounded-full bg-[#C9A84C] px-8 py-4 font-semibold text-[#060E2A] text-sm"
            >
              <T>Start for free</T>
            </a>
            <Link
              href="/pricing"
              className="rounded-full border border-white/40 px-8 py-4 text-sm"
            >
              <T>Compare plans</T>
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/65">
            <T>14-day money-back guarantee on your first paid website plan.</T>{" "}
            <Link href="/terms#website-guarantee" className="underline">
              <T>Terms apply</T>
            </Link>
            .
          </p>
        </div>
      </section>
      <SocialProof />

      {/* AFFILIATE TEASER */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 border-b border-cream-300">
        <Reveal className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-8 justify-between">
          <div>
            <p className="label-xs mb-2" style={{ color: "var(--gold-400)" }}>
              <T>Affiliate Program</T>
            </p>
            <h3 className="display-md text-navy-900 mb-1">
              <T>Turn your introductions into business growth.</T>
            </h3>
            <p className="body-sm text-black/55">
              <T>
                Introduce businesses to JKTL websites, domains and Business
                Email. Earn rewards on qualifying purchases under your accepted
                agreement.
              </T>
            </p>
          </div>
          <a
            href={affiliateUrl()}
            className="btn-primary px-7 py-3.5 text-sm uppercase tracking-wide whitespace-nowrap"
          >
            <T>Become an Affiliate</T>
          </a>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20 text-center"
        style={{ background: "var(--navy-950)" }}
      >
        <Reveal className="max-w-[560px] mx-auto">
          <div className="flex justify-center gap-6 mb-6 opacity-60">
            <Globe size={20} style={{ color: "var(--gold-400)" }} />
            <Smartphone size={20} style={{ color: "var(--gold-400)" }} />
            <ShieldCheck size={20} style={{ color: "var(--gold-400)" }} />
          </div>
          <h2 className="display-xl mb-4" style={{ color: "var(--cream-50)" }}>
            <T>Your next chapter starts here.</T>
          </h2>
          <p
            className="body-lg mb-8"
            style={{ color: "rgba(249,247,240,0.55)" }}
          >
            <T>
              Choose a design, make it yours, and put your business online. Your
              free JKTL address and managed hosting are included.
            </T>
          </p>
          <a
            href={appSignupUrl()}
            className="btn-gold px-8 py-4 text-sm uppercase tracking-wide inline-flex"
          >
            <T>Start for free</T>
          </a>
          <p className="mt-4 text-xs text-white/60">
            <T>
              No credit card required. Domains, email and optional add-ons are
              priced separately.
            </T>
          </p>
        </Reveal>
      </section>
    </div>
  );
}

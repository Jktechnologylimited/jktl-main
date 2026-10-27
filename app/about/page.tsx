import { PeopleStory } from "@/components/shared/PeopleStory";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import { siteConfig, appSignupUrl, pexelsUrl } from "@/data/index";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "JKTL Business is built by JK Technology Limited -- a Lagos-based team building business software for Nigerian SMEs.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

const VALUES = [
  { title: "Mission", desc: siteConfig.mission },
  { title: "Vision", desc: siteConfig.vision },
  { title: "Values", list: siteConfig.values },
];

const WHY = [
  {
    title: "Built for Nigeria",
    desc: "Naira pricing, Paystack built in, and a design that works on the phones and networks people actually use.",
  },
  {
    title: "No Cut of Your Revenue",
    desc: "We charge a flat fee and never take a percentage of your sales or bookings. Card payments go straight to your own bank account.",
  },
  {
    title: "Mobile-First",
    desc: "Most business owners run their business from a phone, not a laptop. Everything is designed for that first.",
  },
  {
    title: "One Flat Price",
    desc: "₦650,000 to set up and ₦59,000 a month after that. No commission on your sales, no per-seat charges, no surprise fees.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="About Us"
        heading="We Build The Back Office So You Can Run The Business"
        subhead={`JKTL Business is built by ${siteConfig.name}, a Lagos-based software company founded in ${siteConfig.founded}.`}
        primaryLabel="Get started"
        primaryHref={appSignupUrl()}
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        imageNode={
          <Image
            src={pexelsUrl(30689114, 900)}
            alt="JKTL team"
            width={900}
            height={675}
            className="w-full h-full object-cover"
          />
        }
      />

      {/* OUR STORY */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="display-lg text-navy-900 text-center mb-10">
            Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div
              className="rounded overflow-hidden border border-cream-300"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={pexelsUrl(37992489, 800)}
                alt="Nigerian business owner at work"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-[1.05rem] text-navy-900 mb-4">
                Every Nigerian business deserves proper tools, not just a
                notebook and a WhatsApp group.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <p className="body-sm text-black/55 leading-relaxed">
                  {siteConfig.name} was founded in {siteConfig.founded} building
                  digital tools for Nigerian businesses.
                </p>
                <p className="body-sm text-black/55 leading-relaxed">
                  That work led directly to JKTL Business -- a single
                  mobile-first app that gives any small or medium business the
                  customer management, booking, invoicing and inventory tools
                  that used to be out of reach, plus an AI receptionist that
                  answers the calls those businesses were losing.
                </p>
                <p className="body-sm text-black/55 leading-relaxed">
                  {siteConfig.promise}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PeopleStory variant="team" />

      {/* MISSION / VISION / VALUES */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-cream-300 rounded p-7 text-center"
              >
                <div className="w-11 h-11 rounded-full border border-cream-300 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[1rem] text-navy-900 mb-3">
                  {v.title}
                </p>
                {v.desc && (
                  <p className="body-sm text-black/55 leading-relaxed">
                    {v.desc}
                  </p>
                )}
                {v.list && (
                  <ul className="text-left flex flex-col gap-1.5 mt-2">
                    {v.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[0.82rem] text-black/55"
                      >
                        <span className="text-gold-400 shrink-0">&#8226;</span>
                        {item}
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
          <h2 className="display-lg text-navy-900 text-center mb-10">
            Why JKTL Business
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w) => (
              <div key={w.title} className="text-center">
                <div className="w-11 h-11 rounded-sm bg-navy-900 flex items-center justify-center mx-auto mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                </div>
                <p className="font-bold text-[0.92rem] text-navy-900 mb-2">
                  {w.title}
                </p>
                <p className="text-[0.8rem] text-black/50 leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        heading="Ready to Try It?"
        subhead="We set up your line, your assistant and your website."
        primaryLabel="Get started"
        primaryHref={appSignupUrl()}
      />
    </div>
  );
}

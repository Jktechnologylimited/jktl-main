import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import CTABanner from "@/components/shared/CTABanner";
import Icon from "@/components/shared/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { features, signupSteps, appSignupUrl, pexelsUrl } from "@/data/index";

export const metadata: Metadata = {
  title: "How It Works",
  description: "See how the JKTL Business AI receptionist answers calls, books appointments, and texts back missed callers -- and how your website gets built from your own photos and reviews.",
  alternates: { canonical: "https://jktl.com.ng/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="bg-cream-50">
      <PageHero
        eyebrow="How It Works"
        heading="From Sign-Up To Selling, In Minutes"
        subhead="No setup fees, no onboarding calls required. Create your account, add your business, and you're live."
        primaryLabel="Get started"
        primaryHref={appSignupUrl()}
        secondaryLabel="See Pricing"
        secondaryHref="/pricing"
        imageNode={<Image src={pexelsUrl(5332487, 900)} alt="Customer paying an invoice online" width={900} height={675} className="w-full h-full object-cover" />}
      />

      {/* Signup flow */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-y border-cream-300">
        <div className="max-w-[1000px] mx-auto">
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-2" style={{ background: "var(--cream-300)" }}>
            {signupSteps.map(step => (
              <StaggerItem key={step.n} className="bg-cream-50 p-8">
                <p className="font-mono text-[0.72rem] font-bold mb-3" style={{ color: "var(--gold-400)" }}>{step.n}</p>
                <h3 className="font-semibold text-navy-900 text-[1rem] mb-2">{step.title}</h3>
                <p className="body-sm text-black/55">{step.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Feature breakdown */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20" style={{ background: "var(--cream-100)" }}>
        <div className="max-w-[1000px] mx-auto">
          <Reveal className="text-center mb-14">
            <span className="gold-rule mx-auto mb-4" />
            <h2 className="display-xl text-navy-900">Every Module, Explained</h2>
          </Reveal>
          <Stagger className="flex flex-col gap-2" stagger={0.06}>
            {features.map((f, i) => (
              <StaggerItem key={f.title} className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 bg-white border border-cream-300 rounded p-6 items-start">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(6,14,42,0.05)" }}>
                  <Icon name={f.icon} size={22} className="text-navy-900" />
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] font-bold mb-1" style={{ color: "var(--gold-400)" }}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-semibold text-navy-900 text-[0.98rem] mb-1.5">{f.title}</h3>
                  <p className="body-sm text-black/55">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Installable app note */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-cream-300">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="display-lg text-navy-900 mb-4">No App Store Needed</h2>
            <p className="body-md text-black/60 mb-4">JKTL Business installs straight to your home screen from your browser -- as a Progressive Web App (PWA). No app store download, no waiting on updates.</p>
            <ul className="check-list">
              <li>Works on Android and iPhone</li>
              <li>Opens like any other app on your phone</li>
              <li>Updates automatically, no manual downloads</li>
            </ul>
          </Reveal>
          <Reveal delay={0.15} y={28} className="rounded overflow-hidden border border-cream-300" style={{ aspectRatio: "4/3", background: "var(--navy-900)" }}>
            <Image src={pexelsUrl(30677594, 800)} alt="Business owner using JKTL Business on her phone" width={800} height={600} className="w-full h-full object-cover" />
          </Reveal>
        </div>
      </section>

      <CTABanner
        heading="Ready to See It For Yourself?"
        subhead="We set up your line, your assistant and your website."
        primaryLabel="Get started"
        primaryHref={appSignupUrl()}
        secondaryLabel="Talk to Us"
        secondaryHref="/contact"
      />
    </div>
  );
}

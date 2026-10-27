import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
export const metadata: Metadata = pageMetadata("/landing-pages", {
  title: "Landing Page Builder & Templates",
  description:
    "Create a focused landing page for enquiries, campaigns and bookings. Choose a JKTL industry design or start blank and publish through JKTL Business.",
  alternates: { canonical: "https://jktl.com.ng/landing-pages" },
  openGraph: {
    title: "JKTL Landing Page Builder",
    description:
      "Choose a campaign design, edit your content and measure published results.",
    url: "https://jktl.com.ng/landing-pages",
  },
});
export default function LandingPages() {
  return (
    <div style={{ paddingTop: 68 }}>
      <section className="bg-[#142d24] text-white px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#e5cc85]">
            JKTL landing pages
          </p>
          <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl">
            One page. A clear next step.
          </h1>
          <p className="mt-5 max-w-2xl text-white/75">
            Build a focused campaign page for your services, enquiries or
            appointment bookings. Customise your logo, images, service areas,
            genuine reviews and social links in JKTL Business.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-[#c9a84c] text-[#142d24] px-6 py-3 text-sm font-semibold"
              href="https://business.jktl.com.ng/login?template=blank-landing"
            >
              Start a blank landing page
            </a>
            <Link className="px-6 py-3 text-sm underline" href="/templates">
              Browse all website designs
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/60">
            Your published page can measure views, CTA and contact clicks, and
            saved booking requests. Optional paid services remain separate.
          </p>
        </div>
      </section>
      <TemplateGallery initialType="landing" />
    </div>
  );
}

import { pageMetadata } from "@/lib/seo/metadata";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { CaseStudyGallery } from "@/components/case-studies/CaseStudyGallery";
import styles from "@/components/case-studies/CaseStudies.module.css";
export const metadata: Metadata = pageMetadata("/case-studies", {
  title: "Case Studies — Websites, Commerce & Custom Platforms",
  description:
    "Explore ten JKTL client projects across law, clothing, music, services, churches and schools: business websites, e-commerce, portals and custom platforms.",
  alternates: { canonical: "https://jktl.com.ng/case-studies" },
  openGraph: {
    title: "Selected work | JKTL",
    description:
      "Ten client stories across legal, commerce, entertainment, services, faith and education.",
    url: "https://jktl.com.ng/case-studies",
  },
});
export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "JKTL case studies",
    url: "https://jktl.com.ng/case-studies",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.client,
        url: `https://jktl.com.ng/case-studies/${s.slug}`,
      })),
    },
  };
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>JKTL / Case studies</p>
        <h1>
          Different businesses.
          <br />
          Work with purpose.
        </h1>
        <p className={styles.lede}>
          Explore ten client projects, from professional websites and business
          email to e-commerce, ticketing, school portals and management systems.
        </p>
      </header>
      <div className={styles.inner}>
        <CaseStudyGallery />
        <section className={styles.cta}>
          <div>
            <h2>What could we build for your business?</h2>
            <p>
              Start with a JKTL website design or talk to us about a custom
              website, platform or portal.
            </p>
          </div>
          <Link href="/products/custom-websites">
            Explore JKTL Custom <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}

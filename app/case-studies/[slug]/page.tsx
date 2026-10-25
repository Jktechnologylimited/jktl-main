import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import {
  ProjectCover,
  CaseStudyCard,
} from "@/components/case-studies/CaseStudyCard";
import styles from "@/components/case-studies/CaseStudies.module.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  if (!s) return {};
  return {
    title: `${s.client} — JKTL Case Study`,
    description: s.summary,
    alternates: { canonical: `https://jktl.com.ng/case-studies/${slug}` },
    openGraph: {
      title: `${s.client} | JKTL Selected Work`,
      description: s.summary,
      url: `https://jktl.com.ng/case-studies/${slug}`,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  if (!s) notFound();
  const related = [
    ...caseStudies.filter(
      (c) =>
        c.slug !== slug &&
        c.categories.some((category) => s.categories.includes(category)),
    ),
    ...caseStudies.filter(
      (c) =>
        c.slug !== slug &&
        !c.categories.some((category) => s.categories.includes(category)),
    ),
  ].slice(0, 2);
  const url = `https://jktl.com.ng/case-studies/${slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: `${s.client} — JKTL project`,
      description: s.summary,
      url,
      about: { "@type": "Thing", name: s.industry },
      creator: {
        "@type": "Organization",
        name: "JK Technology Limited",
        url: "https://jktl.com.ng",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://jktl.com.ng",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case studies",
          item: "https://jktl.com.ng/case-studies",
        },
        { "@type": "ListItem", position: 3, name: s.client, item: url },
      ],
    },
  ];
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.inner}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/case-studies">Case studies</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{s.client}</span>
        </nav>
        <header className={styles.detailHero}>
          <div>
            <p className={styles.eyebrow}>
              {s.industry} / {s.client}
            </p>
            <h1>{s.headline}</h1>
            <p className={styles.lede}>{s.summary}</p>
            {s.websiteUrl && (
              <a
                className={styles.more}
                href={s.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
          <ProjectCover study={s} />
        </header>
        <section className={`${styles.detailSection} ${styles.detailText}`}>
          <p className={styles.eyebrow}>The project</p>
          <h2>{s.client}</h2>
          <p>{s.overview}</p>
        </section>
        <section
          className={styles.detailSection}
          aria-labelledby="project-scope"
        >
          <p className={styles.eyebrow}>Project scope</p>
          <h2 id="project-scope" className={styles.title}>
            What we built.
          </h2>
          <div className={styles.scope}>
            {s.deliverables.map((d, i) => (
              <article key={d.title}>
                <small>{String(i + 1).padStart(2, "0")} / Deliverable</small>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </article>
            ))}
          </div>
          <div className={styles.focus}>
            <p className={styles.eyebrow}>Experience focus</p>
            <p>{s.focus}</p>
          </div>
        </section>
        <section className={styles.cta}>
          <div>
            <h2>Your business has its own story.</h2>
            <p>
              Tell us what you need. We’ll agree the scope, deliverables and
              services for your website or custom platform.
            </p>
          </div>
          <Link href={`/contact?product=custom-websites&case=${s.slug}#form`}>
            Talk to JKTL about your project{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </section>
        <section className={styles.related}>
          <h2>More work to explore.</h2>
          <div className={styles.grid}>
            {related.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
          <p style={{ marginTop: 30 }}>
            <Link className={styles.more} href="/case-studies">
              View all case studies{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

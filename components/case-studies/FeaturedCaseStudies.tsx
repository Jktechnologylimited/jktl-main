import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies, featuredCaseStudySlugs } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudies.module.css";
export function FeaturedCaseStudies({ custom = false }: { custom?: boolean }) {
  const featured = featuredCaseStudySlugs.flatMap((slug) =>
    caseStudies.filter((s) => s.slug === slug),
  );
  return (
    <section
      className={styles.section}
      aria-labelledby={custom ? "custom-case-studies" : "home-case-studies"}
    >
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Selected work / JKTL Custom</p>
            <h2 id={custom ? "custom-case-studies" : "home-case-studies"}>
              {custom
                ? "Custom work. Across different worlds."
                : "Built for businesses like yours."}
            </h2>
            <p>
              From law firms and clothing brands to music labels, churches and
              schools. Explore the websites and platforms in our portfolio.
            </p>
          </div>
          <Link className={styles.more} href="/case-studies">
            Explore all 10 case studies{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className={`${styles.grid} ${styles.compact}`}>
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} floating />
          ))}
        </div>
      </div>
    </section>
  );
}

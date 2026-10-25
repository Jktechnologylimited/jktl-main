import Image from "next/image";
import { MotionCaseStudy } from "./MotionCaseStudy";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import styles from "./CaseStudies.module.css";
export function ProjectCover({ study }: { study: CaseStudy }) {
  if (study.screenshot)
    return (
      <div className={`${styles.cover} ${styles.screenshot}`}>
        <Image
          src={study.screenshot.src}
          alt={study.screenshot.alt}
          width={study.screenshot.width}
          height={study.screenshot.height}
          sizes="(max-width: 760px) 100vw, 650px"
        />
      </div>
    );
  return (
    <div
      className={`${styles.cover} ${styles[study.theme]}`}
      aria-hidden="true"
    >
      <div className={styles.coverTop}>
        <span>JKTL / Selected work</span>
        <span>
          {String(
            caseStudies.findIndex((s) => s.slug === study.slug) + 1,
          ).padStart(2, "0")}
        </span>
      </div>
      <span className={styles.monogram}>{study.initials}</span>
      <span className={styles.coverFoot}>{study.industry}</span>
    </div>
  );
}
export function CaseStudyCard({
  study,
  floating = false,
  zigzag = false,
  index,
}: {
  study: CaseStudy;
  floating?: boolean;
  zigzag?: boolean;
  index?: number;
}) {
  return (
    <MotionCaseStudy
      className={`${styles.card} ${zigzag ? styles.zigzagCard : ""}`}
      floating={floating}
      reveal={zigzag}
      reverse={zigzag && (index ?? 0) % 2 === 1}
      index={index ?? caseStudies.findIndex((s) => s.slug === study.slug)}
    >
      <ProjectCover study={study} />
      <div className={styles.body}>
        <p className={styles.industry}>{study.industry}</p>
        <h3>{study.client}</h3>
        <p>{study.summary}</p>
        <div className={styles.tags}>
          {study.deliverables.map((d) => (
            <span key={d.title}>{d.title}</span>
          ))}
        </div>
        <Link
          className={styles.cardLink}
          href={`/case-studies/${study.slug}`}
          aria-label={`Read ${study.client} case study`}
        >
          Read case study <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </MotionCaseStudy>
  );
}

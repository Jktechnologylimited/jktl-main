"use client";
import { useState } from "react";
import { caseStudies, caseStudyCategories } from "@/data/case-studies";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudies.module.css";
export function CaseStudyGallery() {
  const [category, setCategory] = useState("All projects");
  const filtered =
    category === "All projects"
      ? caseStudies
      : caseStudies.filter((study) => study.categories.includes(category));
  return (
    <div>
      <div
        className={styles.filters}
        role="group"
        aria-label="Filter case studies by industry"
      >
        {caseStudyCategories.map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "All projects" ? ` / ${category}` : " / All industries"}
      </p>
      <div className={styles.grid}>
        {filtered.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </div>
  );
}

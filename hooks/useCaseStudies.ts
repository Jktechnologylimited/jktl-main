"use client";
import { useState, useEffect } from "react";

export type CaseStudyItem = {
  id: string; client_name: string; product: string; slug: string;
  cover_image: string; results: string; published_at: string;
};

// Public list of published case studies -- empty until fetched, sections
// using this should hide themselves when the array is empty (no placeholder spam).
export function useCaseStudies(): CaseStudyItem[] {
  const [items, setItems] = useState<CaseStudyItem[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/api/case-studies")
      .then(r => r.json())
      .then(d => { if (active && Array.isArray(d.caseStudies)) setItems(d.caseStudies); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return items;
}

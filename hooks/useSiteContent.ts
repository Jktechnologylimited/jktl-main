"use client";
import { useState, useEffect } from "react";
import { homepageDefaults, mergeHomepage, type HomepageContent } from "@/data/homepage-defaults";

// Renders defaults immediately (SSR + first paint), swaps in DB content once loaded.
export function useSiteContent(): HomepageContent {
  const [content, setContent] = useState<HomepageContent>(homepageDefaults);
  useEffect(() => {
    let active = true;
    fetch("/api/site-content")
      .then((r) => r.json())
      .then((d) => { if (active && d.homepage) setContent(mergeHomepage(d.homepage)); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return content;
}

export type Testimonial = {
  id: string; quote: string; author_name: string; author_role: string;
  company: string; avatar_url: string; rating: number;
};

export function useTestimonials(): Testimonial[] {
  const [items, setItems] = useState<Testimonial[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => { if (active && Array.isArray(d.testimonials)) setItems(d.testimonials); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return items;
}

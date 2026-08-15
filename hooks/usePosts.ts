"use client";
import { useState, useEffect } from "react";

export type PostItem = {
  id: string; title: string; slug: string; cover_image: string;
  excerpt: string; author: string; type: string; published_at: string;
};

// Public list of published posts, optionally filtered by type (e.g. "blog").
export function usePosts(type?: string): PostItem[] {
  const [items, setItems] = useState<PostItem[]>([]);
  useEffect(() => {
    let active = true;
    const qs = type ? `?type=${encodeURIComponent(type)}` : "";
    fetch(`/api/posts${qs}`)
      .then(r => r.json())
      .then(d => { if (active && Array.isArray(d.posts)) setItems(d.posts); })
      .catch(() => {});
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  return items;
}

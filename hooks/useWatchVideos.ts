"use client";
import { useState, useEffect } from "react";

export type WatchVideo = { id: string; title: string; desc: string; duration: string; youtubeId: string; comingSoon: boolean };

// DB-first watch-&-learn videos for a page, with a hardcoded fallback so the
// section always renders (and stays identical before migration runs).
export function useWatchVideos(pageKey: string, fallback: WatchVideo[]): WatchVideo[] {
  const [videos, setVideos] = useState<WatchVideo[]>(fallback);
  useEffect(() => {
    let active = true;
    fetch(`/api/watch-videos?page=${encodeURIComponent(pageKey)}`)
      .then((r) => r.json())
      .then((d) => { if (active && Array.isArray(d.videos) && d.videos.length) setVideos(d.videos); })
      .catch(() => {});
    return () => { active = false; };
  }, [pageKey]);
  return videos;
}

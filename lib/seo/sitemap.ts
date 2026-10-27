import type { MetadataRoute } from "next";
import {
  SITE_ORIGIN,
  PREFERRED_ALIASES,
  isUtilityPath,
  localRedirectTarget,
  resolveRedirect,
} from "./routing.mjs";
import { isReservedSlug } from "@/lib/reserved-slugs";
export type CmsPageRecord = {
  slug: unknown;
  content?: unknown;
  published_at?: unknown;
};
export type RedirectRecord = {
  from_path: string;
  to_path: string;
  status_code?: number;
};
export function eligibleCmsPath(page: CmsPageRecord) {
  const slug = String(page.slug || "");
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    isReservedSlug(slug) ||
    typeof page.content !== "string" ||
    !page.content.replace(/<[^>]*>/g, " ").trim()
  )
    return null;
  return "/" + slug;
}
/** Sitemap URLs describe preferred content, never aliases, private routes or configured redirects. */
export function preferredSitemap(
  items: MetadataRoute.Sitemap,
  redirects: RedirectRecord[] = [],
): MetadataRoute.Sitemap {
  const output = new Map<string, MetadataRoute.Sitemap[number]>();
  const redirectSources = new Set(redirects.map((r) => r.from_path));
  for (const item of items) {
    let url: URL;
    try {
      url = new URL(item.url);
    } catch {
      continue;
    }
    if (
      url.origin !== SITE_ORIGIN ||
      url.search ||
      url.hash ||
      isUtilityPath(url.pathname) ||
      url.pathname in PREFERRED_ALIASES ||
      redirectSources.has(url.pathname)
    )
      continue;
    if (resolveRedirect(url.pathname, redirects) !== url.pathname) continue;
    const canonical = SITE_ORIGIN + url.pathname;
    const date = item.lastModified ? new Date(item.lastModified) : null;
    output.set(canonical, {
      ...item,
      url: canonical,
      ...(date && !Number.isFinite(+date) ? { lastModified: undefined } : {}),
    });
  }
  return [...output.values()];
}
export function safeCmsRedirect(rows: RedirectRecord[], pathname: string) {
  const target = resolveRedirect(pathname, rows);
  return target && target !== pathname && localRedirectTarget(target)
    ? target
    : null;
}

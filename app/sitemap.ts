import { caseStudies } from "@/data/case-studies";
import {
  publicationPath,
  readAllPublications,
  readAuthor,
} from "@/lib/publications";
import { featurePages } from "@/data/feature-pages";
import { DIGITAL_PRODUCTS } from "@/lib/website-pricing";
import type { MetadataRoute } from "next";
import { sql } from "@/lib/db";
import {
  eligibleCmsPath,
  preferredSitemap,
  type RedirectRecord,
} from "@/lib/seo/sitemap";
import { SITE_ORIGIN, canonicalPath } from "@/lib/seo/routing.mjs";
export const dynamic = "force-dynamic";
const routes = [
  "/",
  "/templates",
  "/domains",
  "/case-studies",
  "/landing-pages",
  "/about",
  "/industries",
  "/how-it-works",
  "/pricing",
  "/contact",
  "/affiliates",
  "/partners",
  "/games",
  "/games/fantasy",
  "/privacy",
  "/terms",
];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    ...new Set([
      ...routes,
      ...DIGITAL_PRODUCTS.map((p) => canonicalPath("/products/" + p.id)),
      ...caseStudies.map((s) => "/case-studies/" + s.slug),
      ...featurePages.map((p) => `/${p.section}/${p.slug}`),
    ]),
  ];
  const items: MetadataRoute.Sitemap = paths.map((path) => ({
    url: SITE_ORIGIN + (path === "/" ? "" : path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
  const kinds = ["blog", "release", "column", "update"] as const;
  const feeds = await Promise.all(
    kinds.map((kind) => readAllPublications(kind)),
  );
  for (let i = 0; i < feeds.length; i++) {
    const feed = feeds[i];
    if (feed.unavailable || !feed.articles.length) continue;
    items.push({
      url: `${SITE_ORIGIN}/${publicationPath[kinds[i]]}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const article of feed.articles)
      items.push({
        url: `${SITE_ORIGIN}/${publicationPath[article.kind]}/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
  }
  const authors = [
    ...new Set(
      feeds
        .filter((f) => !f.unavailable)
        .flatMap((f) =>
          f.articles
            .map((a) => a.authorSlug)
            .filter(
              (slug): slug is string =>
                !!slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),
            ),
        ),
    ),
  ];
  for (const slug of authors) {
    const { profile, unavailable } = await readAuthor(slug);
    if (profile && !unavailable)
      items.push({
        url: `${SITE_ORIGIN}/authors/${slug}`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
  }
  let redirects: RedirectRecord[] = [];
  if (sql) {
    // Read redirect sources before generating CMS URLs; a configured redirect is never a sitemap target.
    try {
      redirects =
        await sql`SELECT from_path,to_path,status_code FROM redirects`;
    } catch {
      /* Static routes remain usable without the optional CMS redirect table. */
    }
    try {
      const pages =
        await sql`SELECT slug,content,published_at FROM pages WHERE status='published' AND(password_protected IS NULL OR password_protected='')`;
      for (const page of pages) {
        const path = eligibleCmsPath(page);
        if (path)
          items.push({
            url: SITE_ORIGIN + path,
            ...(page.published_at
              ? { lastModified: new Date(page.published_at) }
              : {}),
          });
      }
    } catch {
      /* A CMS outage must not remove the static public sitemap. */
    }
  }
  return preferredSitemap(items, redirects);
}

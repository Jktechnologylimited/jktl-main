import { caseStudies } from "@/data/case-studies";
import { readPublications } from "@/lib/publications";
import { featurePages } from "@/data/feature-pages";
import type { MetadataRoute } from "next";
import { sql } from "@/lib/db";
export const dynamic = "force-dynamic";
const base = "https://jktl.com.ng";
const routes = [
  "",
  "templates",
  "products/domains",
  "products/business-email",
  "products/business-tools",
  "products/add-ons",
  "products/custom-websites",
  "products/managed-services",
  "case-studies",
  "landing-pages",
  "about",
  "blog",
  "updates",
  "industries",
  "how-it-works",
  "pricing",
  "contact",
  "affiliates",
  "partners",
  "games/business-tycoon",
  "games",
  "games/fantasy",
  "privacy",
  "terms",
];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allRoutes = [
    ...new Set([
      ...routes,
      ...caseStudies.map((study) => `case-studies/${study.slug}`),
      ...featurePages.map((p) => `${p.section}/${p.slug}`),
    ]),
  ];
  const items: MetadataRoute.Sitemap = allRoutes.map((route) => ({
    url: `${base}/${route}`,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
  const publications = await Promise.all([
    readPublications("blog"),
    readPublications("release"),
  ]);
  for (const result of publications)
    for (const article of result.articles)
      items.push({
        url: `${base}/${article.kind === "blog" ? "blog" : "updates"}/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
  if (sql) {
    try {
      const pages =
        await sql`SELECT slug,published_at FROM pages WHERE status='published' AND (password_protected IS NULL OR password_protected='')`;
      for (const page of pages) {
        const slug = String(page.slug);
        if (/^[a-z0-9-]+$/.test(slug) && !routes.includes(slug))
          items.push({
            url: `${base}/${slug}`,
            ...(page.published_at
              ? { lastModified: new Date(String(page.published_at)) }
              : {}),
          });
      }
    } catch {
      /* Published static routes remain available if CMS data cannot be read. */
    }
  }
  return items;
}

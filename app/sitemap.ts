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
  "landing-pages",
  "about",
  "industries",
  "how-it-works",
  "pricing",
  "contact",
  "affiliates",
  "privacy",
  "terms",
];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}/${route}`,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
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

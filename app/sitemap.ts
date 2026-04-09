import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jktl.com.ng";
  const now = new Date();

  return [
    { url: base,                                     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/services`,                       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/business-websites`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/landing-pages`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/services/seo`,                   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/packages`,                       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`,                           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/contact`,                        lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
    { url: `${base}/blog`,                           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/blog/why-website-gets-no-leads`, lastModified: new Date("2026-03-15"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/seo-small-business-2026`,   lastModified: new Date("2026-02-28"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/landing-page-vs-website`,   lastModified: new Date("2026-02-10"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/ai-business-websites-2026`, lastModified: new Date("2026-01-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog/how-long-does-seo-take`,    lastModified: new Date("2026-01-05"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`,                        lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,                          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://jktl.com.ng",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 7000,

  // Exclude internal/utility pages
  exclude: ["/sitemap", "/api/*"],

  // Override priority and changefreq per path
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/services"),
    await config.transform(config, "/services/business-websites"),
    await config.transform(config, "/services/landing-pages"),
    await config.transform(config, "/services/seo"),
    await config.transform(config, "/packages"),
    await config.transform(config, "/work"),
    await config.transform(config, "/about"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/blog"),
    await config.transform(config, "/blog/why-website-gets-no-leads"),
    await config.transform(config, "/blog/seo-small-business-2026"),
    await config.transform(config, "/blog/landing-page-vs-website"),
    await config.transform(config, "/blog/ai-business-websites-2026"),
    await config.transform(config, "/blog/how-long-does-seo-take"),
  ],

  transform: async (config, path) => {
    // Custom priority map
    const priorities = {
      "/":                                  { priority: 1.0, changefreq: "weekly" },
      "/services":                          { priority: 0.9, changefreq: "monthly" },
      "/services/business-websites":        { priority: 0.9, changefreq: "monthly" },
      "/services/landing-pages":            { priority: 0.9, changefreq: "monthly" },
      "/services/seo":                      { priority: 0.9, changefreq: "monthly" },
      "/packages":                          { priority: 0.8, changefreq: "monthly" },
      "/work":                              { priority: 0.8, changefreq: "monthly" },
      "/about":                             { priority: 0.7, changefreq: "yearly" },
      "/contact":                           { priority: 0.8, changefreq: "yearly" },
      "/blog":                              { priority: 0.8, changefreq: "weekly" },
      "/blog/why-website-gets-no-leads":    { priority: 0.7, changefreq: "monthly" },
      "/blog/seo-small-business-2026":      { priority: 0.7, changefreq: "monthly" },
      "/blog/landing-page-vs-website":      { priority: 0.7, changefreq: "monthly" },
      "/blog/ai-business-websites-2026":    { priority: 0.7, changefreq: "monthly" },
      "/blog/how-long-does-seo-take":       { priority: 0.7, changefreq: "monthly" },
    };

    const custom = priorities[path] || {};

    return {
      loc: path,
      changefreq: custom.changefreq || config.changefreq,
      priority: custom.priority ?? config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/sitemap/"] },
    ],
    additionalSitemaps: [
      "https://jktl.com.ng/sitemap.xml",
    ],
  },
};

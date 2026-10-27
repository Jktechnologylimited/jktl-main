import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
    sitemap: "https://jktl.com.ng/sitemap.xml",
    host: "https://jktl.com.ng",
  };
}

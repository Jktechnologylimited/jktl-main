import { SITE_ORIGIN, PERMANENT_ROUTES } from "./lib/seo/routing.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router owns robots.txt and sitemap.xml; do not generate competing static files.
  async redirects() {
    return [
      ...Object.entries(PERMANENT_ROUTES).map(([source, target]) => ({
        source,
        destination: SITE_ORIGIN + target,
        permanent: true,
        has: [{ type: "host", value: "(?:www\\.)?jktl\\.com\\.ng" }],
      })),
      {
        source: "/:path*",
        destination: SITE_ORIGIN + "/:path*",
        permanent: true,
        has: [{ type: "host", value: "www\\.jktl\\.com\\.ng" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};
export default nextConfig;

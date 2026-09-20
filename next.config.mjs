/** @type {import('next').NextConfig} */
const nextConfig = {
  // next-sitemap writes sitemap.xml and robots.txt to /public on build
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};
export default nextConfig;

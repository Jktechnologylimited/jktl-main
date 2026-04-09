import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JK Technology Limited | AI Business Websites & SEO — USA",
  description:
    "JK Technology Limited builds AI-powered business websites, high-converting landing pages, and SEO strategies for US service businesses. 6+ years experience. Book a free Zoom audit.",
  keywords:
    "AI business website designer, high converting landing page USA, SEO for small business, business website designer USA, landing page with SEO, AI powered website",
  authors: [{ name: "JK Technology Limited", url: "https://jktl.com.ng" }],
  openGraph: {
    title: "JK Technology Limited | AI Business Websites & SEO",
    description:
      "We build AI-powered websites and landing pages that rank on Google and turn visitors into paying clients. Serving all 50 US states.",
    url: "https://jktl.com.ng",
    siteName: "JK Technology Limited",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Technology Limited | AI Business Websites & SEO",
    description: "AI-powered websites that rank, convert, and grow your business.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://jktl.com.ng" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

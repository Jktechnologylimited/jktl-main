import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JK Technology Limited | Business Infrastructure Ecosystem — Nigeria",
  description:
    "JK Technology builds modular digital infrastructure and business operating systems that help African businesses attract customers, run operations efficiently, collect payments, and scale sustainably.",
  keywords:
    "digital systems Nigeria, business website Nigeria, SEO Nigeria, CRM system, email automation, AI chatbot, web design Lagos, web design Port Harcourt, invoice generator Nigeria",
  authors: [{ name: "JK Technology Limited", url: "https://jktl.com.ng" }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png",    sizes: "48x48",  type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "JK Technology Limited | Business Infrastructure Ecosystem",
    description:
      "We build digital systems that help African businesses get customers, convert leads, and automate operations.",
    url: "https://jktl.com.ng",
    siteName: "JK Technology Limited",
    locale: "en_NG",
    type: "website",
    images: [{ url: "https://jktl.com.ng/logo.png", width: 1080, height: 1080 }],
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

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "JK Technology Limited | Digital Growth & Business Systems Agency",
  description:
    "JK Technology builds digital systems that help businesses get customers, convert leads, and automate operations. Websites, SEO, CRM, email automation, AI systems — Nigeria & UK.",
  keywords:
    "digital systems Nigeria, business website Nigeria, SEO Nigeria, CRM system, email automation, AI chatbot, web design Lagos, web design Port Harcourt, landing page Nigeria",
  authors: [{ name: "JK Technology Limited", url: "https://jktl.com.ng" }],
  openGraph: {
    title: "JK Technology Limited | Digital Growth & Business Systems Agency",
    description:
      "We build digital systems that help businesses get customers, convert leads, and automate operations.",
    url: "https://jktl.com.ng",
    siteName: "JK Technology Limited",
    locale: "en_NG",
    type: "website",
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

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HideOnDashboard from "@/components/HideOnDashboard";
import BizChat from "@/components/shared/BizChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://jktl.com.ng"),
  title: {
    default: "JKTL Business | Business Management App for Nigerian SMEs",
    template: "%s | JKTL Business",
  },
  description:
    "JKTL Business is a free, mobile-first app for Nigerian small and medium businesses -- CRM, bookings & sales, invoicing with Paystack, inventory, expenses, and a free business website, all in one place.",
  keywords:
    "business management app Nigeria, booking app Nigeria, invoicing app Nigeria, CRM Nigeria, salon software Nigeria, POS app Nigeria, free business website Nigeria, Paystack invoicing",
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
    title: "JKTL Business | Business Management App for Nigerian SMEs",
    description:
      "CRM, bookings & sales, invoicing with Paystack, inventory, expenses, and a free business website -- all in one free, mobile-first app.",
    url: "https://jktl.com.ng",
    siteName: "JKTL Business",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "JKTL Business",
                url: "https://jktl.com.ng",
                logo: "https://jktl.com.ng/logo.png",
                description:
                  "JKTL Business is a free, mobile-first business management app for Nigerian small and medium businesses.",
                sameAs: [],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "JKTL Business",
                url: "https://jktl.com.ng",
              },
            ]),
          }}
        />
        <HideOnDashboard><Navbar /></HideOnDashboard>
        <main>{children}</main>
        <HideOnDashboard><Footer /></HideOnDashboard>
        <BizChat />
      </body>
    </html>
  );
}

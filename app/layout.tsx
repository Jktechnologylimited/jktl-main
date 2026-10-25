import { themeBootScript } from "@/components/theme/boot";
import { FeatureBadgeProvider } from "@/components/features/FeatureBadge";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import type { Metadata } from "next";
import "./globals.css";
import "@/components/theme/theme.css";
import MarketingShell from "@/components/layout/MarketingShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://jktl.com.ng"),
  title: {
    default: "JKTL Business | Free Websites, Landing Pages & Business Tools",
    template: "%s | JKTL Business",
  },
  description:
    "Build a free business website or landing page with 200 modern templates. Manage customers, bookings, invoices and stock with JKTL Business. Optional AI receptionist services are available.",
  keywords:
    "AI receptionist Nigeria, missed call recovery Nigeria, clinic booking software Nigeria, salon booking software Nigeria, medical answering service Nigeria, bookings app Nigeria, invoicing app Nigeria, CRM Nigeria, Paystack invoicing",
  authors: [{ name: "JK Technology Limited", url: "https://jktl.com.ng" }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "JKTL Business | Free Websites, Landing Pages & Business Tools",
    description:
      "Websites, landing pages and business tools for African businesses. Get started free with JKTL Business.",
    url: "https://jktl.com.ng",
    siteName: "JKTL Business",
    locale: "en_NG",
    type: "website",
    images: [
      { url: "https://jktl.com.ng/logo.png", width: 1080, height: 1080 },
    ],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://jktl.com.ng" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
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
                  "JKTL Business helps African businesses build websites and landing pages, manage customers, bookings and invoices, and explore optional AI receptionist services.",
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
        <LanguageProvider>
          <FeatureBadgeProvider>
            <MarketingShell>{children}</MarketingShell>
          </FeatureBadgeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

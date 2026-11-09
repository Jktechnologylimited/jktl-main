import { themeBootScript } from "@/components/theme/boot";
import { FeatureBadgeProvider } from "@/components/features/FeatureBadge";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/components/theme/theme.css";
import MarketingShell from "@/components/layout/MarketingShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jktl.com.ng"),
  title: {
    default: "JKTL Business | Free Websites, Invoicing & Online Payments",
    template: "%s | JKTL Business",
  },
  description:
    "Start free with a business website and professional invoicing. Accept online payments and manage customers, appointments and stock with JKTL Business in Nigeria.",
  keywords:
    "free website builder Nigeria, free business website, online invoice generator, business invoicing software, online payments for businesses, business management software Nigeria",
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
    title: "JKTL Business | Free Websites, Invoicing & Online Payments",
    description:
      "Start free. Run your business. Get paid. Websites, professional invoicing, online payment links and business tools for growing African businesses.",
    siteName: "JKTL Business",
    locale: "en_NG",
    type: "website",
    images: [
      { url: "https://jktl.com.ng/logo.png", width: 1080, height: 1080 },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={plusJakartaSans.variable}
      suppressHydrationWarning
    >
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
                  "JKTL Business helps African businesses create free websites, send professional invoices, accept online payments and manage their operations.",
                foundingDate: "2025",
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

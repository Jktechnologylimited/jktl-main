import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BizChat from "@/components/shared/BizChat";

export const metadata: Metadata = {
  metadataBase: new URL("https://jktl.com.ng"),
  title: {
    default: "JKTL Business | The AI Receptionist for Nigerian Clinics & Salons",
    template: "%s | JKTL Business",
  },
  description:
    "An AI receptionist for Nigerian clinics, salons and home-care services. It answers every call you cannot, books the appointment, and texts back anyone it missed. ₦650,000 to set up, or six monthly payments of ₦108,333.33, then ₦59,000/month. Cancel any time.",
  keywords:
    "AI receptionist Nigeria, missed call recovery Nigeria, clinic booking software Nigeria, salon booking software Nigeria, medical answering service Nigeria, bookings app Nigeria, invoicing app Nigeria, CRM Nigeria, Paystack invoicing",
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
    title: "JKTL Business | The AI Receptionist for Nigerian Clinics & Salons",
    description:
      "It answers every call your clinic cannot, books the patient, and texts back anyone it missed. ₦650,000 to set up, or six monthly payments of ₦108,333.33, then ₦59,000/month.",
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
                  "JKTL Business gives Nigerian clinics and salons an AI receptionist that answers every call they cannot, books the appointment, and texts back anyone it missed.",
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BizChat />
      </body>
    </html>
  );
}

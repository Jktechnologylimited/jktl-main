import { EmailLanding } from "@/components/business-email/EmailLanding";
import { CustomPage } from "@/components/custom/CustomPage";
import { T } from "@/components/i18n/LanguageProvider";
import { getFeaturePage, featurePages } from "@/data/feature-pages";
import { FeaturePage } from "@/components/shared/FeaturePage";
import { DomainPage } from "@/components/domains/DomainPage";
import { getLiveRetailDomainPrices } from "@/lib/domain-catalogue";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIGITAL_PRODUCTS } from "@/lib/website-pricing";
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...DIGITAL_PRODUCTS.map((p) => ({ product: p.id })),
    ...featurePages
      .filter((p) => p.section === "products")
      .map((p) => ({ product: p.slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  if (product === "domains")
    return {
      title: "Nigerian Domains — .ng, .com.ng & .name.ng",
      description:
        "Explore Nigerian, generic and country-code domains. Request domain registration, transfers and annual renewal quotes through JKTL, with availability confirmed before payment.",
      alternates: { canonical: "https://jktl.com.ng/products/domains" },
    };
  const feature = getFeaturePage("products", product);
  if (feature)
    return {
      title: feature.label,
      description: feature.intro,
      alternates: { canonical: `https://jktl.com.ng/products/${product}` },
    };
  const item = DIGITAL_PRODUCTS.find((p) => p.id === product);
  return item
    ? {
        title: `${item.name} | JKTL`,
        description: item.description,
        alternates: { canonical: `https://jktl.com.ng/products/${product}` },
      }
    : {};
}
export default async function Product({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  if (product === "business-email") {
    let plans: Record<string, unknown>[] = [];
    try {
      const r = await fetch(
        "https://business.jktl.com.ng/api/public/email-plans",
        { cache: "no-store", signal: AbortSignal.timeout(2500) },
      );
      if (r.ok) {
        const d = await r.json();
        if (Array.isArray(d.plans)) plans = d.plans;
      }
    } catch {}
    return (
      <div style={{ paddingTop: 68 }}>
        <EmailLanding plans={plans} mainSite />
      </div>
    );
  }
  if (product === "domains")
    return <DomainPage prices={await getLiveRetailDomainPrices()} />;
  if (product === "custom-websites" || product === "managed-services")
    return <CustomPage managed={product === "managed-services"} />;
  const feature = getFeaturePage("products", product);
  if (feature) return <FeaturePage page={feature} />;
  const item = DIGITAL_PRODUCTS.find((p) => p.id === product);
  if (!item) notFound();
  return (
    <div
      style={{
        padding: "140px 24px 80px",
        background: "#FDFCF8",
        color: "#060E2A",
        minHeight: "90vh",
      }}
    >
      <div style={{ maxWidth: 1050, margin: "auto" }}>
        <p style={{ fontSize: 12, letterSpacing: 3 }}>
          JKTL · {item.name.toUpperCase()}
        </p>
        <h1
          style={{
            fontSize: "clamp(2.8rem,5vw,5rem)",
            lineHeight: 1.08,
            maxWidth: 850,
            margin: "24px 0",
            letterSpacing: "-.04em",
          }}
        >
          {item.title}
        </h1>
        <p style={{ fontSize: 20, maxWidth: 720, lineHeight: 1.7 }}>
          {item.description}
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            margin: "32px 0",
          }}
        >
          <Link className="btn-navy" href={`/contact?product=${item.id}#form`}>
            Request a consultation →
          </Link>
          <Link className="btn-outline-navy" href="/templates">
            Explore Templates
          </Link>
        </div>
        <section
          style={{
            background: "white",
            borderRadius: 24,
            padding: 32,
            marginTop: 48,
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>How it works</h2>
          <ol
            style={{
              display: "grid",
              gap: 20,
              paddingLeft: 22,
              lineHeight: 1.8,
            }}
          >
            {item.details.map((detail) => (
              <li key={detail}>
                <T>{detail}</T>
              </li>
            ))}
          </ol>
        </section>
        <nav
          aria-label="Explore JKTL products"
          style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40 }}
        >
          {DIGITAL_PRODUCTS.filter((p) => p.id !== item.id).map((p) => (
            <Link href={`/products/${p.id}`} key={p.id}>
              {p.name} →
            </Link>
          ))}
          <Link href="/pricing">Website Plans →</Link>
        </nav>
      </div>
    </div>
  );
}

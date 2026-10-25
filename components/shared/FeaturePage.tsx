import { FeatureBadge } from "@/components/features/FeatureBadge";
import Image from "next/image";
import Link from "next/link";
import { T } from "@/components/i18n/LanguageProvider";
import type { featurePages } from "@/data/feature-pages";
export function FeaturePage({ page }: { page: (typeof featurePages)[number] }) {
  return (
    <div
      style={{
        background: "var(--cream-50)",
        color: "var(--navy-900)",
        padding: "136px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1150, margin: "auto" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#80621c",
          }}
        >
          JKTL · <T>{page.label}</T>
          <FeatureBadge route={`/${page.section}/${page.slug}`} />
        </p>
        <div className="grid gap-10 lg:grid-cols-2 items-center mt-7">
          <div>
            <h1
              style={{
                fontSize: "clamp(2.7rem,4.6vw,4.4rem)",
                lineHeight: 1.1,
                letterSpacing: "-.04em",
              }}
            >
              <T>{page.title}</T>
            </h1>
            <p
              style={{
                marginTop: 25,
                fontSize: 17,
                lineHeight: 1.8,
                color: "#5b6472",
              }}
            >
              <T>{page.intro}</T>
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                className="btn-gold rounded-full px-6 py-3"
                href="https://business.jktl.com.ng/signup"
              >
                <T>Start for free</T>
              </a>
              <Link
                className="btn-outline-navy rounded-full px-6 py-3"
                href="/templates"
              >
                <T>Explore templates</T>
              </Link>
            </div>
          </div>
          <Image
            className="w-full rounded-2xl border border-cream-300"
            src={`/template-previews/${page.image}.jpg`}
            alt={page.label}
            width={700}
            height={474}
          />
        </div>
        <section className="mt-16">
          <h2 className="text-3xl">
            <T>What you can do</T>
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {page.benefits.map((text) => (
              <li
                key={text}
                className="rounded-2xl border border-cream-300 bg-white p-6 text-sm leading-relaxed"
              >
                <T>{text}</T>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-14 rounded-2xl bg-cream-100 p-7">
          <h2 className="text-3xl">
            <T>How it works</T>
          </h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {page.steps.map((text, i) => (
              <li key={text}>
                <span className="font-mono text-xs text-[#80621c]">
                  0{i + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed">
                  <T>{text}</T>
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-14">
          <h2 className="text-3xl">
            <T>Before you begin</T>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/60">
            <T>
              Core business tools and all website designs remain available.
              Domains, business email, AI products and custom services are
              scoped separately. Review current capabilities and the full
              payable total before any paid checkout.
            </T>
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Link href="/pricing" className="underline">
              <T>Compare plans</T>
            </Link>
            <Link
              href={`/contact?product=${page.slug}#form`}
              className="underline"
            >
              <T>Contact the team</T>
            </Link>
            <Link href="/resources/help-centre" className="underline">
              <T>Help & guides</T>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

import { T } from "@/components/i18n/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, industries, appSignupUrl } from "@/data/index";
import { navigation } from "@/data/navigation";
import { FeatureBadge } from "@/components/features/FeatureBadge";
import FooterQuickLinks from "./FooterQuickLinks";
import styles from "./Footer.module.css";
const SOCIAL_ICONS: Record<string, JSX.Element> = {
  facebook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
    </svg>
  ),
  instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.21-1.15 1.76-.5.5-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47-.66-.26-1.21-.6-1.76-1.15-.5-.5-.9-1.1-1.15-1.76-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.5-.5 1.1-.9 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.4-.2a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
  ),
  linkedin: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
  twitter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-6.9L4.7 22H1.5l8-9.2L1 2h7l4.9 6.4L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z" />
    </svg>
  ),
};

export default function Footer() {
  const year = Number(
    new Intl.DateTimeFormat("en-NG", {
      year: "numeric",
      timeZone: "Africa/Lagos",
    }).format(new Date()),
  );
  const socials = Object.entries(siteConfig.socials || {}).filter(
    ([, url]) => url,
  );
  const products = [
    ...navigation.product.groups.flatMap((g) => g.items),
    ...navigation.product.aside.items,
    navigation.product.footer,
  ].filter(
    (item, index, all) => all.findIndex((i) => i.href === item.href) === index,
  );
  const solutions = [
    ...navigation.solutions.groups.flatMap((g) => g.items),
    ...navigation.solutions.aside.items,
  ];
  const resources = [
    ...navigation.resources.groups[0].items,
    ...navigation.resources.aside.items,
  ].filter((i) => !["/about", "/affiliates", "/partners"].includes(i.href));
  const support = [
    { href: "/resources/help-centre", title: "Help & guides" },
    { href: "/contact", title: "Contact the team" },
    { href: "/pricing", title: "Plans & pricing" },
    { href: "https://business.jktl.com.ng/login", title: "Business sign in" },
    {
      href: "https://business.jktl.com.ng/partners/login",
      title: "Partner sign in",
    },
    {
      href: "https://business.jktl.com.ng/affiliates/login",
      title: "Affiliate sign in",
    },
    {
      href: "https://business.jktl.com.ng/email-terms",
      title: "Email service terms",
    },
    {
      href: "https://business.jktl.com.ng/domain-terms",
      title: "Domain terms",
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <div>
            <Link href="/" className={styles.brand}>
              <Image src="/logo.png" alt="" width={38} height={38} />
              <div>
                <T>JKTL Business</T>
                <small>
                  <T>BY JK TECHNOLOGY LIMITED</T>
                </small>
              </div>
            </Link>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <a
              href={appSignupUrl()}
              className="btn-gold"
              style={{
                fontSize: 11,
                padding: "11px 20px",
                display: "inline-flex",
              }}
            >
              <T>Start for free</T>
            </a>
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={String(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                  >
                    {SOCIAL_ICONS[key]}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className={styles.contact}>
            <h2>
              <T>Contact Us</T>
            </h2>
            <a href={"tel:" + siteConfig.phone.replace(/\s/g, "")}>
              {siteConfig.phone}
            </a>
            <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
            <p>{siteConfig.location}</p>
            <small>
              <T>We respond within 24 hours</T>
            </small>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="Footer navigation">
          {[
            ["Product", products],
            ["Solutions", solutions],
            ["Resources", resources],
            ["Support", support],
          ].map(([label, items]) => (
            <section key={String(label)}>
              <h2>
                <T>{String(label)}</T>
              </h2>
              <ul>
                {(items as { href: string; title: string }[]).map((i) => (
                  <li key={i.href}>
                    <Link href={i.href}>
                      <T>{i.title}</T>
                      {label === "Product" && <FeatureBadge route={i.href} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section>
            <h2>
              <T>Company</T>
            </h2>
            <ul>
              <li>
                <Link href="/partners">
                  <T>JKTL Partners</T>
                </Link>
              </li>
              <FooterQuickLinks asListItems excludeHrefs={["/case-studies"]} />
            </ul>
          </section>
        </nav>
        <section className={styles.industries}>
          <h2>
            <T>Industries</T>
          </h2>
          <ul>
            {industries.slice(0, 8).map((i) => (
              <li key={i.slug}>
                <Link href={"/industries#" + i.slug}>{i.title}</Link>
              </li>
            ))}
          </ul>
        </section>
        <div className={styles.bottom}>
          <p>
            © {year} <T>JK Technology Limited. All Rights Reserved.</T>
          </p>
          <a href="https://status.jktl.com.ng" className={styles.statusButton}>
            <span className={styles.statusDot} aria-hidden="true" />
            <T>Status</T>
          </a>
          <nav aria-label="Legal">
            <Link href="/privacy">
              <T>Privacy Policy</T>
            </Link>
            <Link href="/terms">
              <T>Terms & Conditions</T>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

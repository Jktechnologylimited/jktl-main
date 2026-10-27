"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { PeopleStory } from "@/components/shared/PeopleStory";
import { priceNGN } from "@/lib/website-pricing";
import type { DomainPrices } from "@/lib/domain-catalogue";
import styles from "./DomainPage.module.css";
type Result = {
  domain: string;
  extension: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "UNKNOWN";
  registrationKobo: number;
  renewalKobo: number;
  periodYears: number;
};
const faqs = [
  [
    "Can I buy a domain without buying a website?",
    "Yes. Your domain is a separate purchase managed in JKTL Business. You can connect it to an existing JKTL website when your website plan supports a custom domain.",
  ],
  [
    "Does a search reserve my domain?",
    "No. Availability, eligibility and the current price are checked again before checkout and registration. Premium, reserved and restricted names may not be eligible for standard checkout.",
  ],
  [
    "What does availability not confirmed mean?",
    "The lookup could not establish a reliable result. Try again shortly. A missing website or DNS record does not prove a domain is available.",
  ],
  [
    "How much does renewal cost?",
    "Each extension shows its current annual renewal price separately from the first-year registration price. Review the current renewal quote before paying; renewal is not automatic.",
  ],
  [
    "Who owns my domain?",
    "Your domain is registered using your legitimate registrant details. Use an email you can access and complete any registrar verification instructions you receive.",
  ],
  [
    "When will my domain connect to my website?",
    "Registration, website connection and SSL verification are separate steps. Your free JKTL address remains available while connection is pending. Your dashboard shows the confirmed status.",
  ],
];
export function DomainPage({ prices }: { prices: DomainPrices }) {
  const preferred = [".com.ng", ".ng", ".com"];
  const rank = (s: string) =>
    preferred.includes(s) ? preferred.indexOf(s) : 99;
  const extensions = Object.keys(prices).sort(
    (a, b) => rank(a) - rank(b) || a.localeCompare(b),
  );
  const [name, setName] = useState(""),
    [extension, setExtension] = useState(extensions[0] || ".com.ng"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [results, setResults] = useState<Result[]>([]),
    [searched, setSearched] = useState(false),
    [paused, setPaused] = useState(false);
  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setResults([]);
    setSearched(false);
    try {
      const r = await fetch("/api/domains/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), extension }),
      });
      const data = await r.json();
      if (!r.ok)
        throw Error(data.error || "Availability could not be confirmed.");
      setResults(data.results);
      setSearched(true);
      setPaused(!data.purchasesEnabled);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Availability could not be confirmed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  function select(ext: string) {
    setExtension(ext);
    document.getElementById("domain-name")?.focus();
    document.getElementById("domain-search")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className={styles.page}>
      <section className={styles.hero} id="domain-search">
        <p className={styles.eyebrow}>JKTL DOMAINS</p>
        <h1>
          Find the perfect domain
          <br />
          <span>for your business.</span>
        </h1>
        <p className={styles.lead}>
          Search, register, and connect your custom domain with JKTL. Simple
          pricing, secure registration, and everything managed in one place.
        </p>
        <form onSubmit={search} className={styles.search}>
          <label htmlFor="domain-name">
            <span>Your domain name</span>
            <input
              id="domain-name"
              name="domain"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="yourbusiness or yourbusiness.com.ng"
              required
              maxLength={253}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </label>
          <label htmlFor="domain-extension">
            <span>Extension</span>
            <select
              id="domain-extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              {(extensions.length
                ? extensions
                : [".com.ng", ".ng", ".com"]
              ).map((ext) => (
                <option key={ext}>{ext}</option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={busy}>
            <Search size={18} />
            {busy ? "Checking availability…" : "Search Domain"}
          </button>
        </form>
        <p className={styles.small}>
          No account needed to search. Availability is checked again before
          payment.
        </p>
        <Link href="https://business.jktl.com.ng" className={styles.explore}>
          Explore JKTL Business <ArrowRight size={16} />
        </Link>
      </section>
      <section
        className={styles.section}
        aria-label="Domain search results"
        aria-live="polite"
      >
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        {searched && (
          <>
            <h2>Your name, and a few possibilities.</h2>
            <p>
              Search results do not reserve a domain. Registration and renewal
              prices are shown separately.
            </p>
            {paused && (
              <p className={styles.small}>
                Purchasing is currently paused while registration checks are
                completed. You can still review a domain in JKTL Business.
              </p>
            )}
            <div className={styles.results}>
              {results.map((r, i) => (
                <article key={r.domain}>
                  <div>
                    <small>
                      {i === 0 ? "YOUR SEARCH" : "ALTERNATIVE EXTENSION"}
                    </small>
                    <h3>{r.domain}</h3>
                    <p
                      className={
                        r.status === "AVAILABLE"
                          ? styles.available
                          : styles.inconclusive
                      }
                    >
                      {r.status === "AVAILABLE"
                        ? "Available"
                        : r.status === "UNAVAILABLE"
                          ? "Unavailable"
                          : "Availability not confirmed"}
                    </p>
                    {r.status === "UNKNOWN" && (
                      <p>
                        We couldn’t confirm this name. Please try again shortly.
                      </p>
                    )}
                  </div>
                  <div>
                    <p>
                      <strong>{priceNGN(r.registrationKobo)}</strong> · first
                      year
                    </p>
                    <p>Renews at {priceNGN(r.renewalKobo)} / year</p>
                    <small>Registration period: {r.periodYears} year</small>
                    {r.status === "AVAILABLE" && (
                      <Link
                        className={styles.getDomain}
                        href={`https://business.jktl.com.ng/login?next=domains&domain=${encodeURIComponent(r.domain)}`}
                      >
                        Get Domain <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {!results.length && (
              <p>
                Search is temporarily unavailable. Please try again shortly.
              </p>
            )}
          </>
        )}
      </section>
      <PeopleStory variant="business" compact />
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <p>YOUR NAME, YOUR WAY</p>
          <h2>Simple, transparent domain pricing.</h2>
          <p>
            Current JKTL prices, shared directly with JKTL Business. Prices are
            per year and shown in naira.
          </p>
        </div>
        <div className={styles.featured}>
          {extensions.map((ext) => (
            <article key={ext}>
              <span>
                {ext.endsWith(".ng")
                  ? "A NIGERIAN IDENTITY"
                  : "A GLOBAL ADDRESS"}
              </span>
              <h3>{ext}</h3>
              <p className={styles.price}>
                {priceNGN(prices[ext].registrationKobo)}
                <small> / first year</small>
              </p>
              <p>Annual renewal {priceNGN(prices[ext].renewalKobo)}</p>
              <p>Registration period: 1 year</p>
              <button onClick={() => select(ext)}>Search {ext} →</button>
            </article>
          ))}
        </div>
        {!extensions.length && (
          <p>
            Current prices are temporarily unavailable. We’ll show a confirmed
            price before any payment.
          </p>
        )}
      </section>
      <section className={styles.steps}>
        <h2>From a name to your next chapter.</h2>
        <div>
          {[
            [
              "Find your name",
              "Search for a domain and compare available extensions.",
            ],
            [
              "Make it yours",
              "Sign in to JKTL Business, confirm your registrant details and current quote, then pay securely.",
            ],
            [
              "Connect and grow",
              "Once registration is confirmed, manage renewal and connect to your existing JKTL website.",
            ],
          ].map(([title, body], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.essentials}>
        <Globe size={32} />
        <h2>A name people remember.</h2>
        <p>
          A custom domain gives customers a consistent place to find you,
          supports a professional business email and grows with your brand.
        </p>
        <nav>
          <Link href="/products/business-email">Business email →</Link>
          <Link href="/templates">Website templates →</Link>
          <Link href="/pricing">Website plans →</Link>
        </nav>
        <p>
          <ShieldCheck size={16} /> Your domain purchase does not require a
          website subscription. Payment confirmation and registration
          confirmation are separate.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Good questions. Clear answers.</h2>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([name, text]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}

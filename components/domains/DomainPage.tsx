"use client";
import { PeopleStory } from "@/components/shared/PeopleStory";
import { useState } from "react";
import Link from "next/link";
import { Search, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import {
  domainExtensions,
  normaliseRequestedDomain,
  type DomainPrices,
} from "@/lib/domain-catalogue";
import { priceNGN } from "@/lib/website-pricing";
import { T, useLanguage } from "@/components/i18n/LanguageProvider";
import styles from "./DomainPage.module.css";
export function DomainPage({ prices }: { prices: DomainPrices }) {
  const { t } = useLanguage();
  const [label, setLabel] = useState(""),
    [extension, setExtension] = useState(".com.ng"),
    [group, setGroup] = useState("all"),
    [searched, setSearched] = useState(false),
    [selected, setSelected] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [sent, setSent] = useState(false);
  const candidates = domainExtensions.filter(
    (item) => group === "all" || item.group === group,
  );
  function search(event: React.FormEvent) {
    event.preventDefault();
    try {
      normaliseRequestedDomain(label, extension);
      setSearched(true);
      setSelected("");
      setSent(false);
      setError("");
    } catch (e) {
      setError(
        t(e instanceof Error ? e.message : "Please check your request."),
      );
    }
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("/api/domains/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          label,
          extension: selected,
          years: 1,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setSent(true);
    } catch (e) {
      setError(t(e instanceof Error ? e.message : "Please try again."));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>JKTL DOMAINS</p>
        <h1>
          <T>Your name. Your business.</T>
          <br />
          <span>
            <T>Your own domain.</T>
          </span>
        </h1>
        <p className={styles.lead}>
          <T>
            Build a Nigerian identity with .ng, .com.ng or .name.ng — or explore
            a global or country-code domain for your next chapter.
          </T>
        </p>
        <a
          href="https://business.jktl.com.ng/domains"
          style={{
            display: "inline-block",
            background: "#c9a84c",
            color: "#060e2a",
            padding: "14px 22px",
            borderRadius: 30,
            fontSize: 13,
            marginTop: 20,
            textDecoration: "none",
          }}
        >
          View live domain prices and order in JKTL Business →
        </a>
        <form className={styles.search} onSubmit={search}>
          <label>
            <span>
              <T>Your preferred name</T>
            </span>
            <input
              required
              id="domain-search-name"
              aria-label={t("Your preferred name")}
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                setSelected("");
                setSearched(false);
              }}
              placeholder="yourbusiness"
              maxLength={80}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
            />
          </label>
          <label>
            <span>
              <T>Extension</T>
            </span>
            <select
              aria-label={t("Extension")}
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            >
              {domainExtensions.map((item) => (
                <option key={item.extension} value={item.extension}>
                  {item.extension}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">
            <Search size={18} />
            <T>Explore domains</T>
          </button>
        </form>
        <p className={styles.small}>
          <T>
            JKTL handles registration requests. Availability, eligibility and
            the full price are confirmed before you pay. Searching here does not
            reserve a domain.
          </T>
        </p>
      </section>
      <PeopleStory variant="business" compact />
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>
              <T>START WITH YOUR IDENTITY</T>
            </p>
            <h2>
              <T>Made for a Nigerian name.</T>
            </h2>
          </div>
          <p>
            <T>
              Your website, email address and brand can share one memorable
              name.
            </T>
          </p>
        </div>
        <div className={styles.featured}>
          {domainExtensions
            .filter((item) => "featured" in item && item.featured)
            .map((item) => (
              <article key={item.extension}>
                <span>
                  <Globe size={19} /> {item.country}
                </span>
                <h3>{item.extension}</h3>
                <p>
                  <T>{item.purpose}</T>
                </p>
                <p className={styles.price}>
                  {prices[item.extension] ? (
                    priceNGN(prices[item.extension].registrationKobo)
                  ) : (
                    <T>Request a quote</T>
                  )}
                </p>
                <p className={styles.small}>
                  {prices[item.extension] ? (
                    <>
                      <T>Renewal per year</T>:{" "}
                      {priceNGN(prices[item.extension].renewalKobo)}
                    </>
                  ) : (
                    <T>Registration and annual renewal quoted separately.</T>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setExtension(item.extension);
                    document.getElementById("domain-search-name")?.focus();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <T>Explore this extension</T> <ArrowRight size={14} />
                </button>
              </article>
            ))}
        </div>
      </section>
      <section className={styles.section} id="domain-results">
        <h2>
          <T>
            {searched
              ? "Explore names for your business."
              : "Choose the right extension."}
          </T>
        </h2>
        <div
          className={styles.filters}
          role="group"
          aria-label={t("Domain categories")}
        >
          {[
            ["all", "All extensions"],
            ["nigeria", "Nigerian domains"],
            ["generic", "Generic TLDs"],
            ["country", "Country-code domains"],
          ].map(([value, text]) => (
            <button
              type="button"
              key={value}
              aria-pressed={group === value}
              onClick={() => setGroup(value)}
            >
              <T>{text}</T>
            </button>
          ))}
        </div>
        <div className={styles.results}>
          {candidates.map((item) => {
            let domain: string = item.extension;
            if (searched) {
              try {
                domain = normaliseRequestedDomain(label, item.extension);
              } catch {
                domain = item.extension;
              }
            }
            return (
              <article key={item.extension}>
                <div>
                  <h3>{domain}</h3>
                  <p>
                    <T>{item.country}</T> · <T>{item.purpose}</T>
                  </p>
                  <small>
                    <T>Availability requires confirmation</T>
                  </small>
                </div>
                <div>
                  <p>
                    {prices[item.extension]
                      ? `${priceNGN(prices[item.extension].registrationKobo)} / ${t("first year")}`
                      : t("Price on request")}
                  </p>
                  <small>
                    {prices[item.extension]
                      ? `${t("Renewal per year")}: ${priceNGN(prices[item.extension].renewalKobo)}`
                      : t("Renewal price confirmed in your quote")}
                  </small>
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        normaliseRequestedDomain(label, item.extension);
                        setSelected(item.extension);
                        setSent(false);
                        setError("");
                        setTimeout(
                          () =>
                            document
                              .getElementById("domain-request")
                              ?.scrollIntoView({ behavior: "smooth" }),
                          0,
                        );
                      } catch {
                        setError(t("Enter your preferred name above first."));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <T>Request availability & quote</T>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.small}>
          <T>
            Country-code and restricted domains may need local presence or
            supporting documents. Registry support, premium names, transfer
            eligibility and final registration terms are confirmed by the team.
          </T>
        </p>
      </section>
      {selected && (
        <section id="domain-request" className={styles.request}>
          <h2>{normaliseRequestedDomain(label, selected)}</h2>
          {sent ? (
            <div role="status">
              <h3>
                <T>Your domain request is saved.</T>
              </h3>
              <p>
                <T>
                  The JKTL team will confirm registrar availability,
                  eligibility, registration price and renewal price before
                  requesting payment. Your domain has not yet been registered or
                  reserved.
                </T>
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p>
                <T>Tell us where to send your availability check and quote.</T>
              </p>
              <div className={styles.formGrid}>
                <label>
                  <T>Full name</T>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    maxLength={120}
                  />
                </label>
                <label>
                  <T>Email address</T>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
                <label>
                  <T>Phone number</T>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={60}
                  />
                </label>
                <label>
                  <T>Domain service</T>
                  <select name="operation" defaultValue="registration">
                    <option value="registration">
                      {t("New registration")}
                    </option>
                    <option value="transfer">
                      {t("Transfer an existing domain")}
                    </option>
                    <option value="renewal">{t("Renewal enquiry")}</option>
                  </select>
                </label>
              </div>
              <p className={styles.small}>
                <T>
                  One-year request. The quote confirms the permitted term, any
                  transfer requirements, taxes and renewal dates. No payment or
                  automatic registration starts from this form.
                </T>
              </p>
              <button type="submit" disabled={busy}>
                {t(busy ? "Sending…" : "Send domain request")}
              </button>
            </form>
          )}
        </section>
      )}
      <section className={styles.steps}>
        <h2>
          <T>Your domain, step by step.</T>
        </h2>
        <div>
          {[
            [
              "01",
              "Choose your name",
              "Explore Nigerian, global and country-code extensions.",
            ],
            [
              "02",
              "Confirm the quote",
              "JKTL checks availability and confirms registration and renewal totals.",
            ],
            [
              "03",
              "Register and connect",
              "After payment and any required checks, the team completes registration and helps you connect your website.",
            ],
            [
              "04",
              "Keep it yours",
              "Keep your contact details current and renew before your confirmed expiry date.",
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>
                <T>{title}</T>
              </h3>
              <p>
                <T>{text}</T>
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.essentials}>
        <ShieldCheck size={30} />
        <h2>
          <T>A domain is one part of your online home.</T>
        </h2>
        <p>
          <T>
            Hosting is already included with your JKTL website. Domain
            registration and professional email are separate services — you do
            not need to buy website hosting twice.
          </T>
        </p>
        <nav>
          <Link href="/products/hosting">
            <T>Hosting & HTTPS</T> →
          </Link>
          <Link href="/products/business-email">
            <T>Business email</T> →
          </Link>
          <a href="https://business.jktl.com.ng/business/website">
            <T>Connect a domain you own</T> →
          </a>
        </nav>
      </section>
      <section className={styles.section}>
        <h2>
          <T>Good to know before you register.</T>
        </h2>
        {[
          [
            "Is the domain available when it appears here?",
            "No. These are name suggestions and extension choices. The JKTL team confirms live registrar availability before quoting or taking payment.",
          ],
          [
            "Who handles my registration?",
            "JKTL manages your request and fulfils domain registration after confirming the quote, payment and any registry requirements.",
          ],
          [
            "Is my domain included in the website plan?",
            "A free JKTL subdomain is included. Registration of a separate domain and its annual renewal are quoted independently.",
          ],
          [
            "Can I transfer a domain?",
            "You can request a transfer assessment. The team confirms registry rules, transfer eligibility, authorisation requirements and any applicable cost.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              <T>{q}</T>
            </summary>
            <p>
              <T>{a}</T>
            </p>
          </details>
        ))}
      </section>
    </div>
  );
}

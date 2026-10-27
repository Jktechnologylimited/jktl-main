import { pageMetadata } from "@/lib/seo/metadata";
import { PeopleStory } from "@/components/shared/PeopleStory";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Globe2,
  Mail,
  Monitor,
  Sparkles,
  Link2,
  Download,
  MessageCircle,
  ShieldCheck,
  Bell,
  Banknote,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import {
  AFFILIATE_PROGRAM as program,
  AFFILIATE_PRODUCTS,
  AFFILIATE_STEPS,
  AFFILIATE_FAQS,
} from "@/lib/affiliate-offers";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata("/affiliates", {
  title: "JKTL Affiliates — Grow with your audience",
  description:
    "Introduce businesses to JKTL websites, domains and Business Email. Explore Affiliate applications, agreement-based commissions, marketing materials, support and payouts.",
  alternates: { canonical: "https://jktl.com.ng/affiliates" },
  openGraph: {
    title: "JKTL Affiliates — Your audience. Their next chapter.",
    description: program.description,
    url: "https://jktl.com.ng/affiliates",
    images: [
      { url: "https://jktl.com.ng/logo.png", width: 1080, height: 1080 },
    ],
  },
});

function AffiliateCTA({ light = false }: { light?: boolean }) {
  return (
    <div className={styles.actions}>
      <a href={program.applyUrl} className="btn-gold">
        Apply to join <ArrowUpRight size={17} aria-hidden="true" />
      </a>
      <a
        href={program.businessLoginUrl}
        className={light ? styles.lightLink : styles.textLink}
      >
        Open your Business account <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

const tools = [
  {
    icon: Link2,
    title: "Your link. Your referrals.",
    text: "Copy your unique referral link and track valid visits, signups and paying customers in your Overview.",
  },
  {
    icon: Banknote,
    title: "Earnings you can follow",
    text: "Review qualifying payments, held commissions, available earnings and confirmed payouts. Your agreement defines the rewards.",
  },
  {
    icon: Download,
    title: "Ready-to-share materials",
    text: "Preview approved graphics, download images and copy captions, WhatsApp messages, emails and follow-ups with your referral URL.",
  },
  {
    icon: MessageCircle,
    title: "Support when you need it",
    text: "Open a support ticket, attach screenshots or documents and follow Team replies in the same workspace.",
  },
  {
    icon: Bell,
    title: "Updates on your device",
    text: "Install JKTL Business on your home screen and opt into PWA alerts on a supported device. Email updates keep you informed too.",
  },
  {
    icon: ShieldCheck,
    title: "Clear account controls",
    text: "Meaningful promotional activity counts. Applicable agreements and exemptions are reviewed before inactivity actions, and earned obligations are preserved.",
  },
];
const productIcons = {
  website: Monitor,
  domain: Globe2,
  email: Mail,
  custom: Sparkles,
};

export default function AffiliatesLandingPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: AFFILIATE_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div>
            <p className={styles.eyebrow}>JKTL AFFILIATES</p>
            <h1>
              Your audience.
              <br />
              <span>Their next chapter.</span>
            </h1>
            <p className={styles.heroText}>{program.description}</p>
            <AffiliateCTA light />
            <p className={styles.heroNote}>
              For creators, influencers and business educators. Applications
              require review.
            </p>
            <a className={styles.lightLink} href={program.legacyLoginUrl}>
              Already have Affiliate credentials? Sign in →
            </a>
          </div>
          <div className={styles.introduction}>
            <div className={styles.introBrand}>
              <Image src="/logo.png" alt="JKTL" width={54} height={54} />
              <span>
                GOOD INTRODUCTIONS
                <br />
                <strong>Build better businesses.</strong>
              </span>
            </div>
            <p className={styles.introTitle}>
              A business owner’s next step could start with you.
            </p>
            <div className={styles.journey}>
              {[
                [
                  "01",
                  "Make the introduction",
                  "Share your referral link with your audience.",
                ],
                [
                  "02",
                  "Follow their progress",
                  "Track signups and qualifying purchases.",
                ],
                [
                  "03",
                  "Grow together",
                  "View rewards under your activated agreement.",
                ],
              ].map(([n, title, text]) => (
                <div className={styles.journeyRow} key={n}>
                  <span>{n}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.introFoot}>
              <Check size={16} aria-hidden="true" /> Your workspace lives in
              JKTL Business.
            </p>
          </div>
        </div>
      </section>
      <PeopleStory variant="partners" />

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="promote-heading"
      >
        <Reveal>
          <p className={styles.eyebrow}>MORE WAYS TO HELP A BUSINESS GROW</p>
          <h2 id="promote-heading" className={styles.heading}>
            Promote the tools businesses need.
          </h2>
          <p className={styles.lead}>
            Explore JKTL’s products, then promote the ones covered by your
            agreement. Product availability and commission eligibility are
            confirmed separately.
          </p>
        </Reveal>
        <div className={styles.productGrid}>
          {AFFILIATE_PRODUCTS.map((p) => {
            const Icon = productIcons[p.icon];
            return (
              <Reveal key={p.title}>
                <Link href={p.href} className={styles.productCard}>
                  <Icon size={26} aria-hidden="true" />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span>
                    Explore <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className={styles.tinted} aria-labelledby="steps-heading">
        <div className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>FROM INTRODUCTION TO REWARD</p>
          <h2 id="steps-heading" className={styles.heading}>
            A clear path, from the first step.
          </h2>
          <div className={styles.steps}>
            {AFFILIATE_STEPS.map((step, i) => (
              <Reveal key={step.title}>
                <article className={styles.step}>
                  <span className={styles.stepNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="agreement-heading"
      >
        <div className={styles.agreementGrid}>
          <div>
            <p className={styles.eyebrow}>KNOW YOUR TERMS</p>
            <h2 id="agreement-heading" className={styles.heading}>
              Rewards built around a clear agreement.
            </h2>
            <p className={styles.lead}>
              Your agreement sets the eligible products, percentage or fixed
              rewards, earning period, review holds and payout requirements. A
              signup alone does not guarantee a commission.
            </p>
            <ul className={styles.checks}>
              {[
                "Verified eligible payments, with duplicate rewards prevented.",
                "Net revenue accounts for processing fees, applicable taxes and product costs.",
                "Refunds and disputes affect eligibility and can reverse rewards.",
                "View held, available and paid amounts in your workspace.",
              ].map((t) => (
                <li key={t}>
                  <Check size={18} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <aside className={styles.policy} aria-labelledby="proposal-heading">
            <span className={styles.badge}>
              PROPOSED POLICY · AWAITING APPROVAL
            </span>
            <h3 id="proposal-heading">
              A simpler proposal for new Affiliates.
            </h3>
            <p className={styles.proposalRate}>
              {program.proposedPolicy.ratePercent}%{" "}
              <span>of eligible net subscription revenue</span>
            </p>
            <p>
              For a customer’s first{" "}
              <strong>
                {program.proposedPolicy.paidMonths} paid subscription months
              </strong>
              .
            </p>
            <p className={styles.policyNote}>
              This proposal remains a draft. It is not an automatically active
              offer. Read the exact terms issued to you and wait for formal
              activation before relying on commission eligibility.
            </p>
          </aside>
        </div>
        <div className={styles.legacy}>
          <ShieldCheck size={24} aria-hidden="true" />
          <div>
            <h3>Already part of JKTL Affiliates?</h3>
            <p>{program.legacyNotice}</p>
          </div>
        </div>
      </section>

      <section className={styles.workspace} aria-labelledby="workspace-heading">
        <div className={`${styles.container} ${styles.section}`}>
          <p className={styles.eyebrow}>ONE CONNECTED WORKSPACE</p>
          <h2 id="workspace-heading" className={styles.heading}>
            Everything you need to keep moving.
          </h2>
          <div
            className={styles.tabs}
            aria-label="Affiliate workspace sections"
          >
            {[
              "Overview",
              "Referrals & Earnings",
              "Marketing Materials",
              "Support",
              "Settings",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className={styles.tools}>
            {tools.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <article>
                  <Icon size={25} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <a className={styles.textLink} href={program.businessLoginUrl}>
            Open your Business account to access your approved programme{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className={`${styles.container} ${styles.section}`}
        aria-labelledby="payout-heading"
      >
        <div className={styles.payoutGrid}>
          <div>
            <p className={styles.eyebrow}>A PAYOUT YOU CAN FOLLOW</p>
            <h2 id="payout-heading" className={styles.heading}>
              From available earnings to confirmed payment.
            </h2>
            <p className={styles.lead}>
              Add verified Nigerian bank details, request available earnings and
              follow the review. A payout is marked paid only after the transfer
              is confirmed.
            </p>
            <p className={styles.muted}>
              Your accepted agreement controls the minimum and request window.
              Existing accepted settings are preserved when future defaults
              change.
            </p>
          </div>
          <div className={styles.payoutCard}>
            <p className={styles.eyebrow}>DEFAULTS FOR FUTURE OFFERS</p>
            <div>
              <strong>
                ₦
                {program.futurePayoutDefaults.minimumNaira.toLocaleString(
                  "en-NG",
                )}
              </strong>
              <span>Minimum payout in new offers</span>
            </div>
            <div>
              <strong>
                {program.futurePayoutDefaults.expectedPaymentDay}th
              </strong>
              <span>Expected monthly payment day</span>
            </div>
            <p>
              These defaults do not replace your accepted terms or guarantee a
              transfer before review.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className={styles.tinted} aria-labelledby="faq-heading">
        <div
          className={`${styles.container} ${styles.section} ${styles.faqSection}`}
        >
          <p className={styles.eyebrow}>A FEW THINGS TO KNOW</p>
          <h2 id="faq-heading" className={styles.heading}>
            Your questions, answered.
          </h2>
          <div className={styles.faqs}>
            {AFFILIATE_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`}>
        <div className={styles.partnerCard}>
          <div>
            <p className={styles.eyebrow}>WORK DIRECTLY WITH CLIENTS?</p>
            <h2>There’s a place for you in JKTL Partners.</h2>
            <p>
              Developers, agencies, business consultants and CAC registration
              agents can help clients build websites and manage services under a
              separate Partner agreement.
            </p>
          </div>
          <Link href="/partners" className={styles.textLink}>
            Explore JKTL Partners <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className={styles.final}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>YOUR NEXT INTRODUCTION COULD MATTER</p>
          <h2>Help a business take its next step.</h2>
          <p>
            Bring your audience. Explore the programme. Review your agreement
            and grow with JKTL.
          </p>
          <AffiliateCTA light />
        </div>
      </section>
    </div>
  );
}

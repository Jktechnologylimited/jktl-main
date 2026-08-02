// Default homepage content. These mirror the original hardcoded copy, so the
// live site is unchanged until an admin edits and saves in /dashboard/homepage.
// The web accessor and admin editor both merge DB values over these defaults.

export type HomepageContent = {
  hero: {
    badge: string;
    headlineLine1: string;
    headlineAccent: string;
    subhead: string;
    note: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  founder: { heading: string; body1: string; body2: string };
  deskSuite: { heading: string; subhead: string };
  howItWorks: { heading: string; subhead: string };
  agencyServices: { heading: string; subhead: string };
  testimonials: { heading: string; subhead: string };
  finalCta: { heading: string; subhead: string };
};

export const homepageDefaults: HomepageContent = {
  hero: {
    badge: "JK Technology Limited \u2014 Enterprise Software \u2014 CAC Registered",
    headlineLine1: "Enterprise Software,",
    headlineAccent: "Built for Growth.",
    subhead:
      "We design, build, and manage software platforms for law firms, businesses, and schools \u2014 helping you automate operations and scale with confidence.",
    note: "Managed end-to-end \u2014 from strategy to launch to ongoing support.",
    primaryCta: { label: "Book a Strategy Call", href: "/contact" },
    secondaryCta: { label: "View Solutions", href: "/desk" },
  },
  founder: {
    heading: "Built by a Nigerian founder,\nfor African businesses.",
    body1:
      "JK Technology Limited is a registered Nigerian software company, founded in 2019. We build and manage the platforms that businesses, law firms, and schools run on \u2014 not adapted from foreign templates, but built from scratch, in Nigeria, for Nigeria.",
    body2:
      "Every platform integrates Paystack, works with Nigerian phone numbers, and is priced in Naira. Our team reviews, builds, and supports every engagement \u2014 we understand your context because we live in it.",
  },
  deskSuite: {
    heading: "The Desk Suite",
    subhead: "Industry-specific software, built and managed for you.",
  },
  howItWorks: {
    heading: "From first conversation to going live.",
    subhead: "Every platform is reviewed, built, and launched by our team.",
  },
  agencyServices: {
    heading: "Custom Platforms",
    subhead:
      "Custom digital systems for businesses that need something specific \u2014 websites, SEO, CRM, AI chatbots, payment infrastructure, email automation. Scoped, built, and delivered by our team.",
  },
  testimonials: {
    heading: "What our clients say",
    subhead: "Real businesses, real results.",
  },
  finalCta: {
    heading: "Let's Build Your Next Platform",
    subhead:
      "Book a strategy call, or tell us what you're building \u2014 we'll take it from there.",
  },
};

// Deep-merge a partial stored doc over the defaults (one level into each section).
export function mergeHomepage(stored: unknown): HomepageContent {
  const base = homepageDefaults as unknown as Record<string, Record<string, unknown>>;
  const over = (stored && typeof stored === "object" ? stored : {}) as Record<string, Record<string, unknown>>;
  const out: Record<string, Record<string, unknown>> = {};
  for (const section of Object.keys(base)) {
    out[section] = { ...base[section], ...(over[section] || {}) };
  }
  return out as unknown as HomepageContent;
}

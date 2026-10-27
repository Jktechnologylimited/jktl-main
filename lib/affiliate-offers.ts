/** Public programme copy. Financial eligibility is owned by accepted, activated
 * Business agreements; draft policies are never presented as live defaults. */
export const AFFILIATE_PROGRAM = {
  headline: "Your audience. Their next chapter.",
  description:
    "Introduce business owners to JKTL’s websites, domains, Business Email and tools. Earn rewards on qualifying purchases under your accepted agreement.",
  applyUrl:
    "https://business.jktl.com.ng/login?next=programs&program=affiliate",
  businessLoginUrl: "https://business.jktl.com.ng/login?next=distribution",
  legacyLoginUrl: "https://business.jktl.com.ng/affiliates/login",
  proposedPolicy: { status: "DRAFT", ratePercent: 15, paidMonths: 12 },
  futurePayoutDefaults: { minimumNaira: 50000, expectedPaymentDay: 28 },
  cookieDays: 30,
  legacyNotice:
    "Existing Affiliates keep their applicable accepted terms, earned commissions and payout history. A new proposal does not replace an existing agreement.",
} as const;

export const AFFILIATE_PRODUCTS = [
  {
    title: "Websites & templates",
    description:
      "Help businesses find a website or landing page that fits their industry.",
    href: "/templates",
    icon: "website",
  },
  {
    title: "Domains",
    description:
      "Introduce businesses to domain options, including .ng and .com.ng.",
    href: "/products/domains",
    icon: "domain",
  },
  {
    title: "Business Email",
    description:
      "Help business owners explore professional email and available plans.",
    href: "/products/business-email",
    icon: "email",
  },
  {
    title: "Custom projects",
    description:
      "Refer businesses that need a tailored website or project scope.",
    href: "/products/custom-websites",
    icon: "custom",
  },
] as const;

export const AFFILIATE_STEPS = [
  {
    title: "Apply or accept an invitation",
    description:
      "Apply through JKTL Business, or open the secure invitation sent by the Team. Use your existing account or create one and choose your own password.",
  },
  {
    title: "Review your agreement",
    description:
      "Review the eligible products, rewards and payout terms. Financial eligibility begins only after you accept the agreement and JKTL formally activates it.",
  },
  {
    title: "Share with your audience",
    description:
      "Copy your referral link and use approved graphics, captions and outreach messages. Disclose your referral relationship when sharing.",
  },
  {
    title: "Track qualifying purchases",
    description:
      "See valid referral visits, signups, paying customers and your earnings. Rewards require verified eligible payments; refunds and disputes affect eligibility.",
  },
  {
    title: "Request your payout",
    description:
      "Add verified Nigerian bank details and request reviewed available earnings when your agreement allows. Track the request through confirmation of payment.",
  },
] as const;

export const AFFILIATE_FAQS = [
  {
    q: "How much can I earn?",
    a: "Your accepted, activated agreement sets the eligible products, percentage or fixed rewards, earning period, review holds and payout terms. There is no universal guaranteed amount per referral. Product costs, processing fees, refunds and disputes affect eligibility.",
  },
  {
    q: "Is the 15% policy already active?",
    a: "No. The proposed new Affiliate policy is 15% of eligible net subscription revenue for a customer’s first 12 paid subscription months. It remains a draft awaiting formal approval. An invitation or application does not automatically activate commission terms.",
  },
  {
    q: "What happens to my existing agreement?",
    a: AFFILIATE_PROGRAM.legacyNotice,
  },
  {
    q: "How do invitations and sign-in work?",
    a: "Open the time-limited, single-use invitation sent to your email. Sign in with your existing JKTL Business account, or create an account and choose your own password. Accept the invitation’s terms, then use Business → Programs & partner access to open your approved Affiliate workspace. Existing Affiliate credentials also continue to work.",
  },
  {
    q: "How are referrals tracked?",
    a: "Visitors can explicitly allow a 30-day referral cookie. Eligible signups can then be attributed to your introduction. Existing attribution is preserved; self-referrals are ineligible. Visitors can decline tracking and still use JKTL.",
  },
  {
    q: "When can I request payment?",
    a: "Your accepted agreement controls the minimum, request window and eligibility. Future offers default to a ₦50,000 minimum and an expected 28th monthly payment day. Existing accepted payout settings are preserved. Verified bank details, available reviewed earnings and separate transfer confirmation are required.",
  },
  {
    q: "What can I use to promote JKTL?",
    a: "Your Marketing Materials section provides approved branded graphics, social captions, WhatsApp and direct messages, outreach emails and follow-ups. Preview or download resources, copy messages with your referral URL, and share through supported options.",
  },
  {
    q: "Can I get help and notifications?",
    a: "Use Affiliate Support to open a ticket, attach a screenshot or PDF and follow replies. Install JKTL Business on your home screen and enable notifications on a supported device. Email and PWA alerts depend on your permissions and configured delivery services.",
  },
  {
    q: "What counts as Affiliate activity?",
    a: "Qualified referral visits, legitimate signups and verified customer conversions can count. Account sign-in alone does not reset the promotional activity clock. Applicable agreements and exemptions are reviewed before inactivity actions, and earned financial obligations are preserved.",
  },
  {
    q: "Should I choose Affiliates or Partners?",
    a: "Affiliates introduce JKTL to their audiences. Partners work directly with business clients on websites and services. If you are a developer, agency, consultant or CAC registration agent serving clients, explore JKTL Partners. Each programme has its own approval and agreement.",
  },
] as const;

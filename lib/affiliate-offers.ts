// The affiliate programme's terms, as shown on this site.
//
// **These must match the business app's ledger.** The app owns the money — the
// subscriptions, the Paystack webhook and the commission rows — and its constants
// live in `src/lib/affiliate-commission.ts` (`SIGNUP_BONUS_KOBO`,
// `SUBSCRIPTION_BONUS_KOBO`, `RECURRING_MONTHLY_KOBO`). This file is the marketing
// copy of the same contract.
//
// An earlier version advertised **20% recurring and a ₦2,000 welcome bonus**,
// which is a programme that no longer exists. That was worse than stale: a partner
// would have joined on a promise the ledger does not pay, and their first
// statement would have been the argument. If a figure changes, it changes in both
// repositories in the same commit.
//
// The programme is three fixed tiers now, which is easier to sell than a
// percentage: "₦102,000 from one referral in the first year" needs no arithmetic
// against a price list.
//
// Note on where the money is recorded: this repo holds only the landing page. The
// application, the approval, the dashboard and the commission ledger all live in
// the product app at business.jktl.com.ng, because the event this pays out on — a
// referred business subscribing and paying via Paystack — happens there and
// nowhere else.

/** The three tiers, in Naira. */
export const TIERS = {
  /** When a referred business creates an account. Held until they subscribe. */
  signup: 20000,
  /** When that business subscribes. Releases the signup bonus with it. */
  subscription: 40000,
  /** Every month they stay subscribed, including the first. */
  recurring: 3500,
  /** 20,000 + 40,000 + 12 × 3,500. The number to lead with. */
  firstYearValue: 102000,
};

/**
 * `COMMISSION.rate` is deliberately gone.
 *
 * A percentage that no longer exists is a trap for whoever edits this next — every
 * component that read it would keep rendering "20%" against a ledger paying flat
 * amounts.
 */
export const COMMISSION = {
  recurring: true,
  tiers: TIERS,
  releaseRule:
    "The ₦20,000 signup bonus appears in your dashboard the moment your referral creates an account, and becomes withdrawable when they subscribe.",
};

export const BONUS = {
  signup: TIERS.signup,
  subscription: TIERS.subscription,
  monthly: TIERS.recurring,
};

export const PAYOUT = {
  minimum: 50000,
  /** The business app opens payout requests from the 21st. */
  payoutDay: 21,
  schedule: "Monthly — requests open from the 21st",
  methods: ["Bank Transfer (all Nigerian banks)"],
  currency: "NGN",
  cookieDays: 30,
  /** How a partner gets in after approval. */
  access:
    "Applications are reviewed by hand, usually within 24–48 hours. Once approved you sign in at business.jktl.com.ng/affiliates with the email and password you applied with.",
};

/** The single product affiliates promote. */
export const PRODUCT = {
  name: "JKTL Business",
  subtitle: "₦650,000 to set up, or six monthly payments of ₦108,333.33 — then ₦59,000/month",
  description:
    "An AI receptionist for Nigerian clinics, salons and home-care services. It answers every call the business cannot, books the appointment, and texts back anyone it missed.",
};

/** What one referral is worth, for the dashboard and the pitch. */
export function firstYearValue(): number {
  return TIERS.signup + TIERS.subscription + TIERS.recurring * 12;
}

/** ₦20,000 — grouped, no decimals. */
export function fmtNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

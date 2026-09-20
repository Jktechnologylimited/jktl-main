// JKTL Business Affiliate Program -- single source of truth for commission
// terms shown across the marketing site and the affiliate dashboard.
//
// Flat-rate program: every affiliate earns the same recurring commission on
// every business they refer that subscribes to a paid JKTL Business plan,
// for as long as that business stays subscribed. No tiers.
//
// Note on how a commission actually gets recorded: this repo (the marketing
// site) only holds the affiliate signup/login/dashboard/admin-approval
// system. The event this pays out on -- a referred business subscribing and
// paying, every billing cycle, via Paystack -- happens inside the product
// app at business.jktl.com.ng, which is a separate codebase. Until that app
// is wired to write into the `commissions` table here (or call an API that
// does), commission rows are recorded manually against these constants.

export const COMMISSION = {
  rate: 20,           // percent, on the subscription amount
  recurring: true,    // for as long as the referred business stays subscribed -- no duration cap
};

export const BONUS = {
  amount: 2000,                                         // Naira, one-time
  trigger: "once your first referral upgrades to a paid plan",
};

export const PAYOUT = {
  minimum: 50000,
  payoutDay: 28,
  schedule: "Monthly -- 28th of every month",
  methods: ["Bank Transfer (all Nigerian banks)"],
  currency: "NGN",
  cookieDays: 30,
};

// The single product affiliates promote.
export const PRODUCT = {
  name: "JKTL Business",
  subtitle: "Free plan available; paid plan ₦5,000/mo or ₦50,000/yr",
  description: "Multi-tenant business management app for Nigerian SMEs -- CRM, bookings/sales, invoicing with Paystack, inventory, expenses, and a free business website.",
};

export function calcCommission(subscriptionAmount: number) {
  return Math.round((subscriptionAmount * COMMISSION.rate) / 100);
}

export function fmtNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

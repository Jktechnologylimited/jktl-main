export const TIERS = {
  standard: { label: "Standard", oneTime: 10, recurring: 10, recurringMonths: 3,  minReferrals: 0, color: "#1A4A8A" },
  silver:   { label: "Silver",   oneTime: 12, recurring: 12, recurringMonths: 6,  minReferrals: 3, color: "#6B7280" },
  gold:     { label: "Gold",     oneTime: 15, recurring: 15, recurringMonths: 12, minReferrals: 8, color: "#C9A84C" },
};

export const OFFERS = [
  // DESK PRODUCTS
  {
    id: "desk-faithdesk", category: "Desk Product", featured: true,
    name: "FaithDesk", subtitle: "Ministry Management Software",
    description: "Complete management system for churches and ministries. Members, tithes, offerings, portal, analytics.",
    priceMin: 300000, priceMax: 2000000, type: "setup + monthly",
    commissionType: "both", color: "#8B5CF6",
    slug: "faithdesk",
  },
  {
    id: "desk-detaildesk", category: "Desk Product", featured: true,
    name: "DetailDesk", subtitle: "Auto Detailing Business Software",
    description: "Online store, job assignment, role-based access, CRM and analytics for auto detailing businesses.",
    priceMin: 300000, priceMax: 2000000, type: "setup + monthly",
    commissionType: "both", color: "#F59E0B",
    slug: "detaildesk",
  },
  {
    id: "desk-schooldesk", category: "Desk Product", featured: false,
    name: "SchoolDesk", subtitle: "School Administration Software (Coming Soon)",
    description: "Fees, student portal, staff management, public website. Coming soon -- join waitlist.",
    priceMin: 300000, priceMax: 2000000, type: "setup + monthly",
    commissionType: "both", color: "#10B981",
    slug: "schooldesk",
  },
  // PACKAGES
  {
    id: "pkg-starter", category: "Package", featured: false,
    name: "Starter Package", subtitle: "Get Online",
    description: "Basic website, contact form, WhatsApp integration, basic SEO. 1 month support.",
    priceMin: 150000, priceMax: 500000, type: "one-time",
    commissionType: "one-time", color: "#1A4A8A",
    slug: "packages",
  },
  {
    id: "pkg-growth", category: "Package", featured: true,
    name: "Growth Package", subtitle: "Generate & Convert Leads",
    description: "Website + landing page, SEO setup, email automation, lead tracking CRM. 3 months support.",
    priceMin: 500000, priceMax: 1500000, type: "one-time + monthly",
    commissionType: "both", color: "#C9A84C",
    slug: "packages",
  },
  {
    id: "pkg-enterprise", category: "Package", featured: false,
    name: "Enterprise Package", subtitle: "Full Business System",
    description: "Full business system: CRM, automation, payment integration, AI chatbot, ongoing support.",
    priceMin: 1500000, priceMax: 5000000, type: "one-time + monthly",
    commissionType: "both", color: "#0F172A",
    slug: "packages",
  },
  {
    id: "pkg-flagship", category: "Package", featured: true,
    name: "Full Business System", subtitle: "Flagship Offer",
    description: "Website, SEO, CRM, email automation, payment system, AI chatbot, analytics, ongoing support.",
    priceMin: 800000, priceMax: 5000000, type: "one-time + monthly",
    commissionType: "both", color: "#C9A84C",
    slug: "packages",
  },
  // SERVICES
  {
    id: "svc-website", category: "Service", featured: false,
    name: "Website & Landing Page System", subtitle: "From N150,000",
    description: "Professional business website 5-8 pages, SEO setup, mobile-responsive, contact forms.",
    priceMin: 150000, priceMax: 800000, type: "one-time",
    commissionType: "one-time", color: "#1A4A8A",
    slug: "services/website-systems",
  },
  {
    id: "svc-leads", category: "Service", featured: false,
    name: "Lead Generation Landing Page", subtitle: "From N100,000",
    description: "High-converting landing page for paid ad campaigns with CRM integration and tracking.",
    priceMin: 100000, priceMax: 500000, type: "one-time",
    commissionType: "one-time", color: "#1A6E3C",
    slug: "services/lead-generation",
  },
  {
    id: "svc-email", category: "Service", featured: false,
    name: "Email & Follow-up Automation", subtitle: "From N100,000 + N20,000/mo",
    description: "Automated email sequences, lead follow-up, payment confirmations, missed inquiry recovery.",
    priceMin: 100000, priceMax: 400000, type: "one-time + monthly",
    commissionType: "both", color: "#7C3AED",
    slug: "services/email-automation",
  },
  {
    id: "svc-seo", category: "Service", featured: true,
    name: "SEO & Google Visibility", subtitle: "From N150,000 + N50,000/mo",
    description: "Google Business optimisation, local SEO, keyword targeting, map rankings, monthly reports.",
    priceMin: 150000, priceMax: 700000, type: "one-time + monthly",
    commissionType: "both", color: "#DC2626",
    slug: "services/seo",
  },
  {
    id: "svc-crm", category: "Service", featured: false,
    name: "CRM & Business Operations", subtitle: "From N300,000 + N30,000/mo",
    description: "Lead tracking, customer database, sales pipeline, staff tracking, analytics dashboard.",
    priceMin: 300000, priceMax: 2000000, type: "one-time + monthly",
    commissionType: "both", color: "#D97706",
    slug: "services/crm-operations",
  },
  {
    id: "svc-payments", category: "Service", featured: false,
    name: "Payment & Business Infrastructure", subtitle: "From N100,000",
    description: "Payment links, QR codes, online checkout, subscription billing, invoice generation.",
    priceMin: 100000, priceMax: 600000, type: "one-time",
    commissionType: "one-time", color: "#059669",
    slug: "services/payment-infrastructure",
  },
  {
    id: "svc-ai", category: "Service", featured: false,
    name: "AI & Automation Systems", subtitle: "From N250,000 + N50,000/mo",
    description: "AI chatbot, WhatsApp auto-replies, FAQ automation, customer onboarding, workflow automation.",
    priceMin: 250000, priceMax: 1500000, type: "one-time + monthly",
    commissionType: "both", color: "#0F172A",
    slug: "services/ai-automation",
  },
];

export const PAYOUT = {
  minimum: 50000,
  signupBonus: 20000,
  payoutDay: 28,
  schedule: "Monthly -- 28th of every month",
  methods: ["Bank Transfer (all Nigerian banks)"],
  currency: "NGN",
  cookieDays: 30,
  bonusExpiryDays: 90,
  dormancyDays: 365,
  commissionApprovalDays: 60,
};

export function calcCommission(priceMin: number, priceMax: number, rate: number) {
  return {
    min: Math.round((priceMin * rate) / 100),
    max: Math.round((priceMax * rate) / 100),
  };
}

export function fmtNaira(amount: number) {
  return "N" + amount.toLocaleString("en-NG");
}

export function tierFromReferrals(count: number): keyof typeof TIERS {
  if (count >= 8) return "gold";
  if (count >= 3) return "silver";
  return "standard";
}

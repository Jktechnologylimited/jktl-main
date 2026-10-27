// ---------------------------------------------------------------------------
//  JKTL BUSINESS -- marketing site data
// ---------------------------------------------------------------------------

export function pexelsUrl(id: number, w = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

// --- SITE CONFIG --------------------------------------------------------------
export const siteConfig = {
  name: "JK Technology Limited",
  short: "JKTL",
  product: "JKTL Business",
  tagline: "The all-in-one app Nigerian businesses use to manage customers, bookings, invoices and payments -- from their phone.",
  shortTagline: "Business management, made mobile-first",
  url: "https://jktl.com.ng",
  appUrl: "https://business.jktl.com.ng",
  email: "info@jktl.com.ng",
  phone: "+234 703 658 0994",
  whatsapp: "2347036580994",
  location: "Lagos, Nigeria",
  coverage: "Serving Nigeria & Africa",
  founded: "2019",
  experience: "6+",
  markets: "Nigeria & Africa",
  mission: "Give every Nigerian business owner the tools a big company has -- CRM, bookings, invoicing, inventory, and a website -- in one free app that works from a phone.",
  vision: "To be the operating system every small and medium business in Africa runs on.",
  values: ["Simplicity", "Fairness", "Reliability", "Local-first"],
  promise: "We build the back office so you can focus on the business.",
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
};

export function appSignupUrl(ref?: string) {
  return ref ? `${siteConfig.appUrl}/signup?ref=${ref}` : `${siteConfig.appUrl}/signup`;
}
export function appLoginUrl() {
  return `${siteConfig.appUrl}/login`;
}

/**
 * The partner programme's home — in the business app, not here.
 *
 * **This site keeps the pitch; the app keeps the programme.**
 *
 * The landing page is here, at `/affiliates`, because this is where people find
 * things and a programme nobody can read about does not get joined. What lives in
 * the app is the working half: the application form, the approval queue, the
 * partner's dashboard, and the commission ledger — all of it where the
 * subscriptions and the Paystack webhook are.
 *
 * So every affiliate link **on this site** points to the local page. It used to
 * point straight at `business.jktl.com.ng/affiliate`, which meant the site's own
 * landing page was unreachable and the "Affiliates" button in the navigation
 * skipped the explanation entirely — dropping a cold visitor on a sign-in form
 * for a programme they had not been sold.
 *
 * To apply, the landing page links out:
 *   apply → https://business.jktl.com.ng/affiliates/apply
 *   login → https://business.jktl.com.ng/affiliates/login
 *
 * `ref` is only meaningful for a partner sharing a link, which goes to the app's
 * signup, not here — so it is passed through to the apply page.
 */
export function affiliateUrl(ref?: string) {
  const base = "/affiliates";
  return ref ? `${base}?ref=${encodeURIComponent(ref)}` : base;
}

// --- NAVIGATION ---------------------------------------------------------------
export const navLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  // The local landing page — not the app. See `affiliateUrl` above.
  { href: "/affiliates", label: "Affiliates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// --- CORE FEATURES (used on Home + How It Works) -------------------------------
export const features = [
  {
    icon: "Users",
    id: "customers",
    title: "Customer Records (CRM)",
    desc: "Every customer, their history, notes and preferences, saved automatically -- so every visit feels personal.",
  },
  {
    icon: "CalendarCheck",
    id: "bookings",
    title: "Bookings & Sales Tracking",
    desc: "Appointments for service businesses, sales tracking for retail and product businesses -- whichever fits how you work.",
  },
  {
    icon: "Receipt",
    id: "payments",
    title: "Invoicing & Payments",
    desc: "Create an invoice in seconds and collect payment online, directly on it, via Paystack. No more chasing bank transfers.",
  },
  {
    icon: "Package",
    id: "inventory",
    title: "Inventory Tracking",
    desc: "Know what's in stock, what's running low, and get alerted before you run out.",
  },
  {
    icon: "Wallet",
    id: "expenses",
    title: "Expense Tracking",
    desc: "Log business expenses as you spend, so you always know your real numbers.",
  },
  {
    icon: "Globe",
    id: "website",
    title: "Free Business Website",
    desc: "Every business gets a published website on a jktl.com.ng subdomain -- customers can find you and book or buy online.",
  },
  {
    icon: "Smartphone",
    id: "mobile-app",
    title: "Installable App (PWA)",
    desc: "Add JKTL Business to your home screen like any app. No app store, no update hassle.",
  },
  {
    icon: "UsersRound",
    id: "team",
    title: "Team Roles",
    desc: "Bring your team in with owner, manager and team member roles, each seeing only what they need to.",
  },
];

// --- INDUSTRIES -----------------------------------------------------------------
export const industries = [
  {
    slug: "beauty-personal-care",
    title: "Beauty & Personal Care",
    blurb: "Bookings that don't overlap, a client history you can actually search, and a website customers can book from directly.",
    examples: ["Salons", "Nail techs", "Lash techs", "Nail & lash studios", "Hair vendors", "Wig installers", "Braiders", "Makeup artists", "Beauty studios"],
    icon: "Scissors",
    image: pexelsUrl(3993330),
  },
  {
    slug: "fitness-wellness",
    title: "Fitness & Wellness",
    blurb: "Class and session bookings, membership customers on file, and invoicing for packages and personal training.",
    examples: ["Gyms", "Pilates studios", "Spin studios", "Wellness brands"],
    icon: "Dumbbell",
    image: pexelsUrl(6455787),
  },
  {
    slug: "med-spas-aesthetics",
    title: "Med-Spas & Aesthetics",
    blurb: "Track treatment history per client, manage appointment slots, and take deposits or full payment upfront.",
    examples: ["IV therapy", "Laser treatment", "Aestheticians", "Cosmetics clinics"],
    icon: "Sparkles",
    image: pexelsUrl(3738349),
  },
  {
    slug: "food-hospitality",
    title: "Food & Hospitality",
    blurb: "Track orders and sales, manage stock and ingredients, and let customers find and reach you online.",
    examples: ["Restaurants", "Fine dining", "Cafes", "Brunch spots"],
    icon: "UtensilsCrossed",
    image: pexelsUrl(37992489),
  },
  {
    slug: "retail-trade",
    title: "Retail & Trade",
    blurb: "Full inventory with low-stock alerts, sales tracking instead of appointments, and invoicing for bigger orders.",
    examples: ["Auto parts", "Building materials", "Plumbing supplies", "Gas/filling stations", "Personal shoppers", "Luxury resellers", "Errand services"],
    icon: "Store",
    image: pexelsUrl(33203798),
  },
  {
    slug: "events",
    title: "Events",
    blurb: "Manage client bookings and event dates, track deposits and balances, and keep vendor and client notes in one place.",
    examples: ["Wedding & event planners", "Florists", "Decorators", "Event venues"],
    icon: "PartyPopper",
    image: pexelsUrl(17023110),
  },
  {
    slug: "content-media",
    title: "Content & Media",
    blurb: "Book shoots and sessions, invoice clients with online payment, and keep a record of every project and client.",
    examples: ["Photographers", "Videographers", "Content creators"],
    icon: "Camera",
    image: pexelsUrl(34443368),
  },
  {
    slug: "nightlife",
    title: "Nightlife",
    blurb: "Track table and event bookings, manage stock behind the bar, and keep a record of regulars and VIP clients.",
    examples: ["Clubs", "Lounges", "DJs", "Promoters"],
    icon: "Music",
    image: pexelsUrl(34009280),
  },
  {
    slug: "travel",
    title: "Travel",
    blurb: "Manage client bookings and travel packages, invoice for tickets and packages, and collect payment online.",
    examples: ["Travel agents", "Hotels", "Airlines", "Tour operators"],
    icon: "Plane",
    image: pexelsUrl(3885493),
  },
  {
    slug: "fashion",
    title: "Fashion",
    blurb: "Track orders and measurements per customer, manage fabric and stock, and invoice for custom pieces.",
    examples: ["Designers", "Stylists", "Tailors", "Instagram-based fashion vendors"],
    icon: "Shirt",
    image: pexelsUrl(9849297),
  },
];

// --- PRICING --------------------------------------------------------------------
export const pricing = {
  monthly: {
    id: "monthly",
    name: "Monthly",
    badge: "Start here",
    headline: "₦108,333.33",
    headlineSuffix: "/month",
    period: "for the first 6 months",
    explains: "Six payments that together cover the ₦650,000 launch package exactly. Nothing is added on top.",
    ongoingLabel: "From month 7",
    ongoing: "₦59,000/month",
    ongoingNote: "The ongoing platform fee once the package is paid off.",
    cancellation: "Cancel any time from month 1. No minimum term, no exit fee.",
    featured: true,
    features: [
      "Your own dedicated business phone number, set up and running",
      "The AI receptionist: answers every call, day or night",
      "Instant text back to every caller you missed",
      "Books appointments straight into your calendar",
      "Screens for red flags and hands anything clinical to a human",
      "Trained on your services, prices and opening hours",
      "A professional website built from your own photos and reviews",
      "₦15,000 of communication credit included",
      "Customer records, bookings, invoicing, inventory and expenses",
      "Installable app on every phone in the business",
    ],
  },
  upfront: {
    id: "upfront",
    name: "Pay in full",
    badge: "The anchor",
    headline: "₦650,000",
    headlineSuffix: "",
    period: "one payment, covering the launch package",
    explains: "The same package paid once instead of across six months. Same total, less to think about.",
    ongoingLabel: "From month 7",
    ongoing: "₦59,000/month",
    ongoingNote: "The ongoing platform fee, identical to the monthly card.",
    cancellation: "Cancel any time. No minimum term, no exit fee.",
    featured: false,
    features: [
      "Everything in Monthly, paid up front",
      "Nothing due for the first 6 months",
      "Priority setup: your line and assistant configured first",
      "A named person to call during onboarding",
      "₦15,000 of communication credit included",
    ],
  },
  shared: {
    freeCredit: "₦15,000",
    freeCreditNote: "Every new business starts with ₦15,000 of communication credit. Texts, calls and the line all come out of it, and you only ever pay for what you use.",
    noCommission: "We never take a cut of your sales, bookings or revenue. Flat fee, nothing else.",
    lineRental: "Your dedicated number costs $1.90 a month, billed from your communication credit like a text. No markup.",
  },
};

export const competitors = [
  { name: "JKTL Business", price: "₦108,333/mo for 6 months, then ₦59,000/mo", highlight: true },
  { name: "Bumpa", price: "From ₦10,000+/mo" },
  { name: "Catlog", price: "From ₦7,000+/mo" },
  { name: "GlossGenius", price: "From ~$24-48/mo (≈₦40,000-80,000+)" },
  { name: "Square Appointments", price: "From ~$29+/mo (≈₦50,000+)" },
  { name: "Vagaro", price: "From ~$30+/mo (≈₦50,000+)" },
  { name: "Booksy", price: "From ~$29.99+/mo (≈₦50,000+)" },
  { name: "Fresha", price: "Commission-based, or ~$9.90+/mo per seat" },
];

// Public Affiliate descriptions and policy status live in lib/affiliate-offers.ts.
// Financial terms are owned by accepted, activated Business agreements.

// --- HOW IT WORKS STEPS ------------------------------------------------------------
export const signupSteps = [
  { n: "01", title: "Create your account", desc: "Sign up free at business.jktl.com.ng with just your business name and phone number." },
  { n: "02", title: "Set up your business", desc: "Pick your business type, add your services or products, and your public website is generated automatically." },
  { n: "03", title: "Go live", desc: "Install it on your phone, share your website link, and start taking bookings, sales and payments." },
];

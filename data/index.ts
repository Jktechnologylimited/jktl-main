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

// --- NAVIGATION ---------------------------------------------------------------
export const navLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// --- CORE FEATURES (used on Home + How It Works) -------------------------------
export const features = [
  {
    icon: "Users",
    title: "Customer Records (CRM)",
    desc: "Every customer, their history, notes and preferences, saved automatically -- so every visit feels personal.",
  },
  {
    icon: "CalendarCheck",
    title: "Bookings & Sales Tracking",
    desc: "Appointments for service businesses, sales tracking for retail and product businesses -- whichever fits how you work.",
  },
  {
    icon: "Receipt",
    title: "Invoicing & Payments",
    desc: "Create an invoice in seconds and collect payment online, directly on it, via Paystack. No more chasing bank transfers.",
  },
  {
    icon: "Package",
    title: "Inventory Tracking",
    desc: "Know what's in stock, what's running low, and get alerted before you run out.",
  },
  {
    icon: "Wallet",
    title: "Expense Tracking",
    desc: "Log business expenses as you spend, so you always know your real numbers.",
  },
  {
    icon: "Globe",
    title: "Free Business Website",
    desc: "Every business gets a published website on a jktl.com.ng subdomain -- customers can find you and book or buy online.",
  },
  {
    icon: "Smartphone",
    title: "Installable App (PWA)",
    desc: "Add JKTL Business to your home screen like any app. No app store, no update hassle.",
  },
  {
    icon: "UsersRound",
    title: "Multi-Staff Roles",
    desc: "Bring your team in with owner, manager and staff roles, each seeing only what they need to.",
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
  free: {
    name: "Free",
    price: "₦0",
    period: "forever",
    tagline: "Everything a business needs to start running better, today.",
    features: [
      "Full customer records (CRM)",
      "Bookings or sales tracking",
      "Invoicing with online payment via Paystack",
      "Inventory tracking with low-stock alerts",
      "Expense tracking",
      "Published business website on a jktl.com.ng subdomain",
      "Installable app (PWA)",
      "1 staff seat (owner)",
    ],
  },
  paid: {
    name: "Paid Plan",
    priceMonthly: "₦5,000",
    priceYearly: "₦50,000",
    period: "per month, or ₦50,000/year",
    savingsNote: "Paying yearly works out about 17% cheaper than monthly.",
    tagline: "For businesses ready to bring on a team and go further.",
    features: [
      "Everything in Free",
      "Extra staff seats (manager & staff roles)",
      "More photo/storage space",
      "Custom domain for your business website",
    ],
  },
  custom: {
    name: "Custom",
    price: "Let's talk",
    period: "tailored to your business",
    tagline: "For businesses that need more than the app -- a bespoke website, a client or student portal, business email hosting, or a build outside the standard plans.",
    features: [
      "Custom-built business website beyond the standard template",
      "Client, student or member portals",
      "Business email hosting & setup",
      "Bespoke integrations or features on request",
    ],
  },
};

export const competitors = [
  { name: "JKTL Business", price: "Free — ₦5,000/mo", highlight: true },
  { name: "Bumpa", price: "From ₦10,000+/mo" },
  { name: "Catlog", price: "From ₦7,000+/mo" },
  { name: "GlossGenius", price: "From ~$24-48/mo (≈₦40,000-80,000+)" },
  { name: "Square Appointments", price: "From ~$29+/mo (≈₦50,000+)" },
  { name: "Vagaro", price: "From ~$30+/mo (≈₦50,000+)" },
  { name: "Booksy", price: "From ~$29.99+/mo (≈₦50,000+)" },
  { name: "Fresha", price: "Commission-based, or ~$9.90+/mo per seat" },
];

// --- AFFILIATE PROGRAM ------------------------------------------------------------
export const affiliateTerms = {
  recurringRate: 20, // percent, for life of subscription
  welcomeBonus: 2000, // Naira, one-time
  welcomeBonusTrigger: "once your first referral upgrades to a paid plan",
  payoutMinimum: 50000,
  cookieDays: 30,
};

// --- HOW IT WORKS STEPS ------------------------------------------------------------
export const signupSteps = [
  { n: "01", title: "Create your account", desc: "Sign up free at business.jktl.com.ng with just your business name and phone number." },
  { n: "02", title: "Set up your business", desc: "Pick your business type, add your services or products, and your public website is generated automatically." },
  { n: "03", title: "Go live", desc: "Install it on your phone, share your website link, and start taking bookings, sales and payments." },
];

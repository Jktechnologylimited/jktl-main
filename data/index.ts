// ─── SITE CONFIG ──────────────────────────────────────────────────────────────
export const siteConfig = {
  name: "JK Technology Limited",
  short: "JKTL",
  tagline: "AI-Powered Business Websites & SEO That Drive Measurable Growth",
  url: "https://jktl.com.ng",
  email: "info@jktl.com.ng",
  zoomLink: "https://calendly.com/johnchnd195/30min", // replace with real Calendly/Zoom link
  founded: "2019",
  experience: "6+",
  // projectsDelivered: "50+",
  countriesServed: "US, UK, Canada, Nigeria",
};

// ─── NAVIGATION LINKS ──────────────────────────────────────────────────────────
export const navLinks = [
  { href: "/services", label: "Services", children: [
    { href: "/services/business-websites", label: "AI Business Websites" },
    { href: "/services/landing-pages",     label: "High-Converting Landing Pages" },
    { href: "/services/seo",               label: "SEO & Traffic Growth" },
  ]},
  { href: "/work",     label: "Work",     children: null },
  { href: "/packages", label: "Packages", children: null },
  { href: "/about",    label: "About",    children: null },
  { href: "/blog",     label: "Insights", children: null },
  { href: "/contact",  label: "Contact",  children: null },
];

// ─── SERVICES ──────────────────────────────────────────────────────────────────
export const services = [
  {
    slug: "business-websites",
    icon: "◈",
    tier: "Signature",
    label: "AI Business Websites",
    shortLabel: "AI Business Websites",
    headline: "Smart AI-Powered Business Websites That Rank, Convert, and Grow",
    subheadline: "We design and build intelligent business websites with AI-enhanced personalisation, SEO architecture, and copywriting baked in from the start — not as an afterthought.",
    price: "$1,500",
    priceTo: "$5,500",
    delivery: "10–14 business days",
    description: "A complete digital presence engineered to attract your ideal clients through search, communicate your value with precision, and convert visitors into leads — with AI-powered features that set you apart from every competitor using a standard template.",
    features: [
      "Custom design — no templates, ever",
      "Full professional copywriting",
      "AI-enhanced content personalisation",
      "On-page SEO architecture",
      "Google Analytics 4 + conversion tracking",
      "Google Business Profile optimisation",
      "Core Web Vitals compliant (fast)",
      "Schema markup & structured data",
      "XML sitemap + Search Console submission",
      "Mobile-first responsive build",
      "30 days post-launch support",
      "Handover session + full documentation",
    ],
    bestFor: ["Law Firms", "Coaches & Consultants", "Medical & Dental Practices", "Agencies & Firms"],
    highlight: false,
  },
  {
    slug: "landing-pages",
    icon: "◆",
    tier: "Campaign",
    label: "High-Converting Landing Pages",
    shortLabel: "Landing Pages",
    headline: "Landing Pages Engineered to Convert at 8–14%",
    subheadline: "The average landing page converts at 2–4%. Ours average 8–14%. That gap is the difference between a campaign that bleeds money and one that generates consistent ROI.",
    price: "$800",
    priceTo: "$1,100",
    delivery: "3–5 business days",
    description: "A single focused page built for one goal — converting visitors into leads, bookings, or buyers. Built for paid ad campaigns, service launches, lead magnets, and email funnels.",
    features: [
      "Conversion-first strategy session",
      "Full page copywriting — we write it",
      "Three headline variants included",
      "Objection-handling copy sections",
      "Trust badges and social proof layout",
      "A/B testing ready structure",
      "Facebook Pixel + Google Ads tracking",
      "CRM / email platform integration",
      "Mobile-first responsive design",
      "48-hour rush delivery available",
    ],
    bestFor: ["Paid Ad Campaigns", "Service Launches", "Lead Generation", "Email Funnels"],
    highlight: true,
  },
  {
    slug: "seo",
    icon: "◉",
    tier: "Retainer",
    label: "SEO & Traffic Growth",
    shortLabel: "SEO Services",
    headline: "Stop Paying for Every Click. Build an Organic Asset That Compounds.",
    subheadline: "We handle your entire US SEO strategy — technical setup, content, local optimisation across all 50 states, and authority building — so you rank where your clients search.",
    price: "$600",
    priceTo: "$2,000+",
    delivery: "Monthly retainer",
    description: "A complete monthly SEO retainer covering technical audits, keyword-targeted content, local and national search visibility, and link building — designed to compound over time and reduce your paid ad dependency.",
    features: [
      "Monthly technical SEO audit",
      "Keyword research and opportunity mapping",
      "On-page content optimisation",
      "SEO-optimised blog content",
      "Google Business Profile management",
      "Local citation building (all 50 US states)",
      "White-hat link acquisition",
      "Competitor tracking and gap analysis",
      "Monthly performance report",
      "Strategy call included",
    ],
    bestFor: ["Local Service Businesses", "Law Firms", "Medical Practices", "US-Based Service Firms"],
    highlight: false,
  },
];

// ─── PACKAGES ──────────────────────────────────────────────────────────────────
export const packages = [
  {
    name: "Essentials",
    price: "$1,500",
    tagline: "A credible, optimised digital presence that works",
    delivery: "10 days",
    deposit: "50% upfront, 50% on delivery",
    highlight: false,
    features: [
      "Up to 4 custom pages",
      "Full professional copywriting",
      "On-page SEO",
      "Google Analytics 4 setup",
      "Mobile-first design",
      "30-day post-launch support",
    ],
  },
  {
    name: "Growth",
    price: "$3,000",
    tagline: "For established businesses ready to generate consistent inbound leads",
    delivery: "12 days",
    deposit: "50% upfront, 50% on delivery",
    highlight: true,
    features: [
      "Up to 8 custom pages",
      "Full professional copywriting",
      "Advanced on-page + technical SEO",
      "Google Business Profile optimisation",
      "1 high-converting landing page",
      "Analytics with conversion tracking",
      "60-day post-launch support",
    ],
  },
  {
    name: "Authority",
    price: "$5,500",
    tagline: "For businesses that want to dominate their market online",
    delivery: "14 days",
    deposit: "40% / 40% / 20% split",
    highlight: false,
    features: [
      "Up to 12 custom pages",
      "Full copywriting + content strategy",
      "Complete technical SEO",
      "3 landing pages included",
      "AI-enhanced personalisation features",
      "Local SEO full setup",
      "1 month SEO retainer included",
      "Priority 90-day support",
    ],
  },
];

export const seoTiers = [
  {
    name: "Starter",
    price: "$600",
    period: "/month",
    highlight: false,
    features: [
      "Monthly technical audit",
      "20 keywords tracked",
      "1 SEO content piece/month",
      "Local SEO (up to 5 states)",
      "Monthly report",
    ],
  },
  {
    name: "Growth",
    price: "$1,100",
    period: "/month",
    highlight: true,
    features: [
      "Monthly technical audit",
      "50 keywords tracked",
      "2 SEO content pieces/month",
      "Local SEO (up to 20 states)",
      "Link building",
      "Monthly report + strategy call",
    ],
  },
  {
    name: "Authority",
    price: "$2,000",
    period: "/month",
    highlight: false,
    features: [
      "Bi-weekly technical audit",
      "100 keywords tracked",
      "4 SEO content pieces/month",
      "All 50 US states coverage",
      "Aggressive link building",
      "Competitor intelligence",
      "Priority support",
    ],
  },
];

// ─── TESTIMONIAL (Law Firm) ────────────────────────────────────────────────────
export const testimonial = {
  quote: "Our old website was costing us clients — not winning them. JK Technology rebuilt our entire online presence from the ground up. Within 60 days we were ranking on the first page of Google for three of our core practice areas. The quality of inbound enquiries improved dramatically. These are clients who already understand our services and our fees before they ever contact us. That is the difference between a website that works and one that simply exists.",
  name: "Jonathan M.",
  role: "Managing Partner",
  firm: "Meridian Legal Group",
  location: "New York, NY",
  initials: "JM",
  metric: "Page 1 rankings in 60 days · 3 practice areas",
};

// // ─── CASE STUDIES ──────────────────────────────────────────────────────────────
// export const caseStudies = [
//   {
//     slug: "law-firm-new-york",
//     client: "Meridian Legal Group",
//     category: "Law Firm",
//     location: "New York, NY",
//     service: "Authority Package + SEO Retainer",
//     before: {
//       title: "Before: Invisible and Unconvincing",
//       points: [
//         "Ranked on page 4+ for all primary practice area keywords",
//         "Homepage copy was generic — indistinguishable from 50 other firms",
//         "Zero inbound leads from organic search",
//         "Spending $2,000/month on Google Ads with poor ROI",
//       ],
//     },
//     after: {
//       title: "After: First Page. Premium Positioning.",
//       points: [
//         "Page 1 Google rankings for 3 core practice area keywords",
//         "Clear, authoritative positioning that pre-qualifies clients",
//         "8–12 qualified inbound enquiries per month from organic search",
//         "Google Ads spend reduced by 55%",
//       ],
//     },
//     results: [
//       { value: "Page 1", label: "for 3 practice areas" },
//       { value: "55%", label: "reduction in ad spend" },
//       { value: "60 days", label: "to first results" },
//     ],
//     color: "#112055",
//   },
//   {
//     slug: "executive-coach-chicago",
//     client: "Executive Coaching Practice",
//     category: "Coaching",
//     location: "Chicago, IL",
//     service: "Landing Page",
//     before: {
//       title: "Before: Ads Running. Money Bleeding.",
//       points: [
//         "Running Facebook ads to a DIY landing page converting at 2.1%",
//         "Cost per lead was $180 — unsustainable for a $2,500 programme",
//         "Page looked inconsistent with the premium positioning of the offer",
//         "No objection handling, no trust signals, weak CTA",
//       ],
//     },
//     after: {
//       title: "After: 14% Conversion. ROI in Week One.",
//       points: [
//         "New landing page converting at 14% from cold traffic",
//         "Cost per lead dropped to $27",
//         "Premium design and copy consistent with the $2,500 programme price",
//         "First launch ROI paid back the project fee 12×",
//       ],
//     },
//     results: [
//       { value: "14%", label: "conversion rate" },
//       { value: "12×", label: "ROI first launch" },
//       { value: "$27", label: "cost per lead" },
//     ],
//     color: "#254387",
//   },
//   {
//     slug: "medical-clinic-los-angeles",
//     client: "Specialist Medical Clinic",
//     category: "Healthcare",
//     location: "Los Angeles, CA",
//     service: "Growth Website + SEO",
//     before: {
//       title: "Before: Traffic. No Patients.",
//       points: [
//         "Had a website with 400 monthly visitors but fewer than 5 enquiries",
//         "No SEO — invisible for condition-specific searches",
//         "Confusing navigation and weak calls to action",
//         "Relied entirely on referrals and paid directories",
//       ],
//     },
//     after: {
//       title: "After: Ranked, Converting, Growing.",
//       points: [
//         "Ranking page 1 for 5 condition-specific keywords in LA",
//         "Monthly organic enquiries increased from 5 to 38",
//         "New patient conversion improved through clearer copy and UX",
//         "Referral directory spend cut by 70%",
//       ],
//     },
//     results: [
//       { value: "38", label: "organic enquiries/month" },
//       { value: "7×", label: "increase from 5 to 38" },
//       { value: "70%", label: "directory spend cut" },
//     ],
//     color: "#1A316E",
//   },
// ];

// ─── PROCESS ──────────────────────────────────────────────────────────────────
export const processSteps = [
  {
    number: "I",
    title: "Discovery — Free Audit &  Call",
    description: "We begin with a free 30-minute call to audit your current digital presence, understand your target clients and service areas, and identify the specific opportunities you're missing. Book directly in our calendar — no back-and-forth.",
  },
  {
    number: "II",
    title: "Strategy & Written Proposal",
    description: "Within 24 hours you receive a written proposal — scope, timeline, pricing, keyword targets, and expected outcomes. Fixed price, no surprises. We don't begin until you've approved and the deposit has cleared.",
  },
  {
    number: "III",
    title: "Design, Copy & Build",
    description: "We handle everything: strategy, copywriting, design, development, and technical SEO. You review at design approval and final preview stages. Two revision rounds included in every project.",
  },
  {
    number: "IV",
    title: "Launch & Technical SEO",
    description: "We go live, submit your sitemap to Google Search Console, configure analytics with conversion tracking, and complete all technical SEO setup. A thorough handover session ensures you understand everything that was built.",
  },
  {
    number: "V",
    title: "Grow — Optional SEO Retainer",
    description: "Clients who want compounding organic growth engage our monthly SEO retainer. Content, link building, technical audits, and a monthly report — every month, without fail.",
  },
];

// ─── WHY US ───────────────────────────────────────────────────────────────────
export const whyUs = [
  {
    title: "6+ Years of Proven Delivery",
    description: "Founded in 2019, we have built websites and SEO strategies for businesses across the US, UK, Canada, and Nigeria. Our results are documented. Our process is refined.",
  },
  {
    title: "AI-Enhanced, Not AI-Replaced",
    description: "We integrate intelligent features into every website we build — personalisation, dynamic content, and smart lead capture. But every word of copy and every design decision comes from a human being who understands your market.",
  },
  {
    title: "SEO Is the Foundation, Not an Add-On",
    description: "Keyword architecture, page speed, schema markup, semantic structure, and content strategy are decided before a single page is designed. You launch with a site Google already understands.",
  },
  {
    title: "We Write Your Copy",
    description: "Full copywriting is included in every project. We research your market, understand your client's decision psychology, and write every headline, paragraph, and CTA. You fill in the brief. We do the writing.",
  },
  {
    title: "US Coverage — All 50 States",
    description: "Our SEO strategies are built for the US market. Whether you serve one city or operate nationally, we map your keyword targets, local signals, and content strategy to match how your American clients actually search.",
  },
  {
    title: "Direct Communication, No Account Managers",
    description: "You deal with the person doing the work. Every email is read and answered by a senior practitioner. No account managers, no handoffs, no lost context.",
  },
];

// ─── US STATES SERVED ─────────────────────────────────────────────────────────
export const usStates = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
export const blogPosts = [
  {
    slug: "why-website-gets-no-leads",
    title: "Why Your Business Website Gets Traffic But No Leads (And How to Fix It)",
    metaTitle: "Why Your Website Gets No Leads | Business Website Designer | JKTL",
    metaDescription: "High traffic but no leads? Learn the 7 conversion killers destroying your website's performance — and the exact fixes that turn visitors into paying clients.",
    excerpt: "You check your analytics. Traffic is there. But your inbox is empty. Here's the diagnosis most web designers never give you — and how to fix it fast.",
    category: "Conversion Optimisation",
    readTime: "7 min",
    date: "March 15, 2026",
    dateISO: "2026-03-15",
    keywords: ["website not converting", "business website no leads", "improve website conversion rate", "high converting landing page"],
  },
  {
    slug: "seo-small-business-2026",
    title: "The Complete Guide to SEO for Small Businesses in 2026",
    metaTitle: "SEO for Small Business 2026: The Complete Guide | JKTL",
    metaDescription: "What actually works for small business SEO in 2026. From technical setup to content strategy — a practical guide used by service businesses across the US.",
    excerpt: "Everything that worked in 2023 SEO is table stakes now. This is what actually moves the needle in 2026 — from AI content to Core Web Vitals to local authority.",
    category: "SEO",
    readTime: "10 min",
    date: "February 28, 2026",
    dateISO: "2026-02-28",
    keywords: ["SEO for small business", "small business SEO 2026", "how to rank on Google", "local SEO strategy"],
  },
  {
    slug: "landing-page-vs-website",
    title: "Landing Page vs. Business Website: Which One Does Your Business Actually Need?",
    metaTitle: "Landing Page vs Website: Which Do You Need? | JKTL",
    metaDescription: "Landing page or full website? Learn the key differences, when each performs best, and how to decide which investment will generate more leads for your business.",
    excerpt: "They serve completely different purposes. Choosing the wrong one wastes budget and kills conversions. Here's the framework we use with every new client.",
    category: "Strategy",
    readTime: "6 min",
    date: "February 10, 2026",
    dateISO: "2026-02-10",
    keywords: ["landing page vs website", "do I need a landing page", "high converting landing page", "business website designer"],
  },
  {
    slug: "ai-business-websites-2026",
    title: "AI Business Websites in 2026: What They Are and Why Your Competitors Are Getting Them",
    metaTitle: "AI Business Websites 2026: The Competitive Edge You're Missing | JKTL",
    metaDescription: "AI-powered websites aren't the future — they're 2026. Learn what AI business websites include, how they outperform standard sites, and who's already using them.",
    excerpt: "Standard websites rank, load, and sit there. AI-enhanced websites personalise, adapt, and convert. Here's what the gap looks like in practice — and what it means for your business.",
    category: "AI & Technology",
    readTime: "8 min",
    date: "January 20, 2026",
    dateISO: "2026-01-20",
    keywords: ["AI business website", "smart website design", "AI landing page", "AI powered website 2026"],
  },
  {
    slug: "how-long-does-seo-take",
    title: "How Long Does SEO Take? A Realistic Timeline for Service Businesses",
    metaTitle: "How Long Does SEO Take? Realistic Timeline | JKTL",
    metaDescription: "How long before SEO produces results? The honest answer with real timelines from real client campaigns — not the vague 'it depends' most agencies give you.",
    excerpt: "The honest answer — with real data from real client campaigns across law firms, clinics, consultants, and agencies. No vague promises.",
    category: "SEO",
    readTime: "6 min",
    date: "January 5, 2026",
    dateISO: "2026-01-05",
    keywords: ["how long does SEO take", "SEO timeline", "when will my website rank", "SEO for service businesses"],
  },
];

// ─── SITEMAP LINKS ─────────────────────────────────────────────────────────────
export const sitemapLinks = {
  services: [
    { label: "AI Business Websites",       href: "/services/business-websites" },
    { label: "High-Converting Landing Pages", href: "/services/landing-pages" },
    { label: "SEO & Traffic Growth",       href: "/services/seo" },
  ],
  company: [
    { label: "About JKTL",    href: "/about" },
    { label: "Our Work",       href: "/work" },
    { label: "Packages",       href: "/packages" },
    { label: "Insights",       href: "/blog" },
    { label: "Contact Us",     href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Sitemap",        href: "/sitemap" },
  ],
  blog: [
    { label: "Why Your Website Gets No Leads", href: "/blog/why-website-gets-no-leads" },
    { label: "SEO for Small Business 2026",    href: "/blog/seo-small-business-2026" },
    { label: "Landing Page vs. Website",       href: "/blog/landing-page-vs-website" },
    { label: "AI Business Websites 2026",      href: "/blog/ai-business-websites-2026" },
    { label: "How Long Does SEO Take?",        href: "/blog/how-long-does-seo-take" },
  ],
};

// ─── ADD-ONS ──────────────────────────────────────────────────────────────────
export const addOns = [
  { name: "Additional page",                  price: "$250 – $400 / page" },
  { name: "Stripe / payment integration",     price: "$400" },
  { name: "Blog / CMS setup",                 price: "$350" },
  { name: "Monthly site maintenance",         price: "$200 – $400 / month" },
  { name: "Site speed & performance audit",   price: "$300" },
  { name: "Professional logo design",         price: "$400 – $700" },
  { name: "Copywriting (additional pages)",   price: "$400 / page" },
  { name: "Google Ads landing page + setup",  price: "$1,000" },
  { name: "AI chatbot integration",           price: "$500" },
  { name: "Email marketing setup (Klaviyo / Mailchimp)", price: "$400" },
];

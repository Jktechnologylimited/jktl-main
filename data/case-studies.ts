export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  categories: string[];
  initials: string;
  theme:
    | "legal"
    | "music"
    | "fashion"
    | "services"
    | "automotive"
    | "faith"
    | "education";
  headline: string;
  summary: string;
  overview: string;
  deliverables: { title: string; description: string }[];
  focus: string;
  websiteUrl?: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
};

/** Project scopes supplied by JKTL. Screenshots and results require verified sources. */
export const caseStudies: CaseStudy[] = [
  {
    slug: "kk-ubani-and-co",
    client: "K.K. Ubani & Co.",
    industry: "Legal",
    categories: ["Legal"],
    initials: "KK",
    theme: "legal",
    headline: "A professional online presence for a law firm.",
    summary: "A business website and business email for K.K. Ubani & Co.",
    overview:
      "K.K. Ubani & Co. brings together two essentials of a professional digital presence: a business website and business email. This project showcases JKTL’s work for legal practices, where a clear public identity and professional communication belong together.",
    deliverables: [
      {
        title: "Business website",
        description:
          "A public website representing the law firm and its business online.",
      },
      {
        title: "Business email",
        description:
          "Business email as part of the firm’s professional communications setup.",
      },
    ],
    focus:
      "Present the firm clearly online and give its professional communications a consistent business identity.",
    websiteUrl: "https://kkubaniandco.com",
  },
  {
    slug: "jnn-woka-law",
    client: "JNN Woka Law",
    industry: "Legal",
    categories: ["Legal"],
    initials: "JW",
    theme: "legal",
    headline: "A law firm’s website and communications, together.",
    summary: "A law firm website and business email for JNN Woka Law.",
    overview:
      "The JNN Woka Law project pairs a law firm website with business email. It is another example of JKTL’s work across professional services: building a public-facing website alongside the communications services a business uses beyond the website itself.",
    deliverables: [
      {
        title: "Law firm website",
        description:
          "A website for the firm’s public-facing business presence.",
      },
      {
        title: "Business email",
        description:
          "Business email supporting the firm’s professional correspondence.",
      },
    ],
    focus:
      "Keep the firm’s online presence and business communications part of the same professional picture.",
  },
  {
    slug: "bae-entertainment-group",
    client: "BAE Entertainment Group",
    industry: "Entertainment",
    categories: ["Entertainment"],
    initials: "BAE",
    theme: "music",
    headline: "A digital home for music. A platform for ticketing.",
    summary:
      "A music label website and ticketing platform for BAE Entertainment Group.",
    overview:
      "BAE Entertainment Group’s project spans a music label website and a ticketing platform. The work brings an entertainment business’s public identity and its ticketing offering into JKTL’s portfolio, showing how a custom project can extend beyond a business website.",
    deliverables: [
      {
        title: "Music label website",
        description:
          "A public-facing website for the music label and entertainment brand.",
      },
      {
        title: "Ticketing platform",
        description:
          "A platform deliverable for the group’s ticketing offering.",
      },
    ],
    focus:
      "Give the entertainment brand a place online while supporting its ticketing activity through a dedicated platform.",
  },
  {
    slug: "nej",
    client: "NEJ",
    industry: "Commerce",
    categories: ["Commerce"],
    initials: "NEJ",
    theme: "fashion",
    headline: "A brand website with commerce at its heart.",
    summary: "A business website and e-commerce for NEJ.",
    overview:
      "NEJ’s project combines a business website with e-commerce. It represents JKTL’s work for a clothing business that needs both an online brand presence and a way to bring its products into a digital shopping experience.",
    deliverables: [
      {
        title: "Business website",
        description:
          "A public website for the NEJ business and clothing brand.",
      },
      {
        title: "E-commerce",
        description:
          "An online commerce deliverable for the business’s products.",
      },
    ],
    focus:
      "Connect the way a brand presents itself with the way customers explore its products online.",
  },
  {
    slug: "sarvify",
    client: "Sarvify",
    industry: "Home services",
    categories: ["Services"],
    initials: "S",
    theme: "services",
    headline: "A platform built around practical services.",
    summary: "A handyman and blue-collar services platform for Sarvify.",
    overview:
      "Sarvify is a home-services project focused on handyman and blue-collar services. Its place in JKTL’s portfolio shows the breadth of custom platform work: a service-oriented application with a different purpose from a conventional brochure website or online store.",
    deliverables: [
      {
        title: "Services platform",
        description:
          "A platform for the handyman and blue-collar services business.",
      },
    ],
    focus:
      "Organize a digital experience around the practical services the business provides.",
  },
  {
    slug: "refinish-phc",
    client: "Refinish PHC",
    industry: "Automotive / services",
    categories: ["Services", "Commerce"],
    initials: "R",
    theme: "automotive",
    headline: "A website, commerce and management in one project scope.",
    summary:
      "A business website, e-commerce and management system for Refinish PHC.",
    overview:
      "Refinish PHC combines three deliverables: a public business website, e-commerce and a management system. The project illustrates how JKTL Custom work can cover both a business’s public-facing experience and the systems used to manage its operations.",
    deliverables: [
      {
        title: "Business website",
        description:
          "A public online presence for the automotive and services business.",
      },
      {
        title: "E-commerce",
        description:
          "An online commerce component alongside the business website.",
      },
      {
        title: "Management system",
        description:
          "A management-system deliverable supporting the business’s operations.",
      },
    ],
    focus:
      "Consider the public website, commerce experience and business management as distinct parts of a wider digital project.",
  },
  {
    slug: "heavens-hospitality",
    client: "Heavens Hospitality",
    industry: "Faith / hospitality",
    categories: ["Faith & hospitality"],
    initials: "HH",
    theme: "faith",
    headline: "A church website with a wider platform scope.",
    summary: "A church website and platform for Heavens Hospitality.",
    overview:
      "The Heavens Hospitality project includes a church website and a platform. It brings faith and hospitality into JKTL’s portfolio, with a public website and an additional platform deliverable reflecting the project’s broader scope.",
    deliverables: [
      {
        title: "Church website",
        description:
          "A public-facing website for the church’s online presence.",
      },
      {
        title: "Platform",
        description:
          "An additional platform deliverable within the project scope.",
      },
    ],
    focus:
      "Bring a faith community’s website and its wider platform requirements into a considered digital project.",
  },
  {
    slug: "ftme-elite-services",
    client: "FTME Elite Services",
    industry: "Business services",
    categories: ["Services"],
    initials: "FTME",
    theme: "services",
    headline: "A clear online presence for a services business.",
    summary: "A business website for FTME Elite Services.",
    overview:
      "FTME Elite Services is a business website project in JKTL’s professional services portfolio. Its scope centers on the company’s public presence online, showing the role a focused business website plays within JKTL’s wider range of custom work.",
    deliverables: [
      {
        title: "Business website",
        description: "A public business website for FTME Elite Services.",
      },
    ],
    focus:
      "Give the services business a clear, dedicated place to present itself online.",
  },
  {
    slug: "cecilia-learning-academy",
    client: "Cecilia Learning Academy",
    industry: "Education",
    categories: ["Education"],
    initials: "CLA",
    theme: "education",
    headline: "A school’s public website and portal.",
    summary: "A school website and portal for Cecilia Learning Academy.",
    overview:
      "Cecilia Learning Academy’s project combines a school website with a portal. It illustrates the distinction between an institution’s public-facing information and a separate portal experience, both within the scope of JKTL’s education work.",
    deliverables: [
      {
        title: "School website",
        description:
          "A public website representing the learning academy online.",
      },
      {
        title: "School portal",
        description:
          "A portal deliverable alongside the school’s public website.",
      },
    ],
    focus:
      "Treat the school’s public presence and portal as complementary parts of its digital experience.",
  },
  {
    slug: "newlife-baptist-church",
    client: "Newlife Baptist Church",
    industry: "Faith / education",
    categories: ["Faith & hospitality", "Education"],
    initials: "NB",
    theme: "faith",
    headline: "A shared digital project for church and school.",
    summary:
      "Church and school websites and portals for Newlife Baptist Church.",
    overview:
      "The Newlife Baptist Church project spans both church and school work, with websites and portals in its scope. It represents a multi-part engagement across faith and education, where the public presence and portal requirements of each part deserve individual consideration.",
    deliverables: [
      {
        title: "Church website",
        description: "A public website for the church’s online presence.",
      },
      {
        title: "School website",
        description: "A public website for the school within the project.",
      },
      {
        title: "Portals",
        description:
          "Portal deliverables within the church and school project scope.",
      },
    ],
    focus:
      "Bring church and school digital needs into one project while recognizing their different audiences and portal requirements.",
  },
];
export const caseStudyCategories = [
  "All projects",
  "Legal",
  "Commerce",
  "Entertainment",
  "Services",
  "Faith & hospitality",
  "Education",
];
export const featuredCaseStudySlugs = [
  "kk-ubani-and-co",
  "refinish-phc",
  "nej",
  "bae-entertainment-group",
  "newlife-baptist-church",
];
export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

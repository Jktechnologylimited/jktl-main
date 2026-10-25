export type NavigationItem = {
  title: string;
  description: string;
  href: string;
  note?: string;
};
export type NavigationGroup = { title: string; items: NavigationItem[] };
export type NavigationMenu = {
  label: string;
  groups: NavigationGroup[];
  aside: NavigationGroup;
  footer: NavigationItem;
};
export type NavigationKey = "product" | "solutions" | "resources";

// Every menu item links to its own public product, solution or resource page.
// Manual services link to the existing contact form, not an invented checkout.
export const navigation: Record<NavigationKey, NavigationMenu> = {
  product: {
    label: "Product",
    groups: [
      {
        title: "Creation",
        items: [
          {
            title: "Website builder",
            description:
              "Publish a business website with your services, photos and contact details.",
            href: "/products/website-builder",
          },
          {
            title: "Website templates",
            description:
              "Make it yours with brand colours and curated font pairings.",
            href: "/templates",
          },
          {
            title: "JKTL Custom",
            description:
              "Professionally developed websites, applications and portals.",
            href: "/products/custom-websites",
          },
          {
            title: "JKTL Managed Services",
            description:
              "Ongoing website care, content updates and technical support.",
            href: "/products/managed-services",
          },
          {
            title: "Free website address",
            description: "Get online with your own JKTL subdomain.",
            href: "/products/free-website-address",
          },
          {
            title: "Landing page builder",
            description:
              "Create a focused campaign page and measure published results.",
            href: "/landing-pages",
          },
        ],
      },
      {
        title: "Business",
        items: [
          {
            title: "Customer management",
            description:
              "Keep customer records, history and preferences together.",
            href: "/products/customer-management",
          },
          {
            title: "Bookings & sales",
            description: "Manage appointments and record everyday sales.",
            href: "/products/bookings-sales",
          },
          {
            title: "Invoicing & payments",
            description: "Send invoices and collect payments through Paystack.",
            href: "/products/invoicing-payments",
          },
          {
            title: "Inventory & expenses",
            description: "Track your stock and the money your business spends.",
            href: "/products/inventory-expenses",
          },
          {
            title: "Reports & analytics",
            description: "Understand revenue, customer trends and performance.",
            href: "/products/reports-analytics",
          },
          {
            title: "AI receptionist",
            description:
              "Explore call handling and missed-call recovery for your business.",
            href: "/products/ai-receptionist",
            note: "Paid activation",
          },
        ],
      },
    ],
    aside: {
      title: "Essentials",
      items: [
        {
          title: "Custom domains",
          description:
            "Connect a domain you own, or ask us about manual registration.",
          href: "/products/domains",
          note: "Paid add-on · registration quoted separately",
        },
        {
          title: "Hosting & HTTPS",
          description:
            "Managed hosting for your published JKTL business website.",
          href: "/products/hosting",
        },
        {
          title: "Business email",
          description:
            "Ask the team about manual Zoho Mail setup for your domain.",
          href: "/products/business-email",
          note: "Manual setup · annual quotation",
        },
      ],
    },
    footer: {
      title: "Start for free",
      description:
        "Start with the business tools. AI and optional services are priced separately.",
      href: "https://business.jktl.com.ng/signup",
    },
  },
  solutions: {
    label: "Solutions",
    groups: [
      {
        title: "Management",
        items: [
          {
            title: "Manage your customers",
            description: "Give every customer a more personal experience.",
            href: "/solutions/customer-relationships",
          },
          {
            title: "Schedule appointments",
            description: "Organise bookings, services and customer visits.",
            href: "/solutions/appointment-scheduling",
          },
          {
            title: "Get paid",
            description: "Invoice customers and track their payments.",
            href: "/solutions/online-payments",
          },
          {
            title: "Track stock & expenses",
            description: "Keep an eye on your products and operating costs.",
            href: "/solutions/stock-expenses",
          },
          {
            title: "Work with your team",
            description: "Manage access with owner, manager and staff roles.",
            href: "/solutions/team-management",
          },
          {
            title: "Run your business on mobile",
            description: "Install JKTL from your browser and work on the go.",
            href: "/solutions/mobile-business",
          },
        ],
      },
      {
        title: "Growth",
        items: [
          {
            title: "Get your business online",
            description: "Help customers discover your services and reach you.",
            href: "/solutions/online-presence",
          },
          {
            title: "Recover missed enquiries",
            description:
              "Explore the paid AI receptionist and follow-up workflow.",
            href: "/solutions/missed-enquiries",
          },
          {
            title: "Know your numbers",
            description:
              "Use reports to understand how your business is doing.",
            href: "/solutions/business-insights",
          },
        ],
      },
    ],
    aside: {
      title: "By industry",
      items: [
        {
          title: "Salons & beauty",
          description:
            "Customer records and bookings for personal care businesses.",
          href: "/solutions/salons-beauty",
        },
        {
          title: "Retail & trade",
          description: "Stock, sales and invoices for product businesses.",
          href: "/solutions/retail-trade",
        },
        {
          title: "Food & hospitality",
          description: "Keep track of sales, stock and customer enquiries.",
          href: "/solutions/food-hospitality",
        },
        {
          title: "Explore all industries",
          description: "Find the tools that fit your type of business.",
          href: "/industries",
        },
      ],
    },
    footer: {
      title: "Business management tools",
      description: "See how the existing JKTL tools work together.",
      href: "/how-it-works",
    },
  },
  resources: {
    label: "Resources",
    groups: [
      {
        title: "Explore",
        items: [
          {
            title: "Case studies",
            description:
              "Explore client websites, commerce and custom platforms built by JKTL.",
            href: "/case-studies",
          },
          {
            title: "JKTL Blog",
            description:
              "Ideas and practical guidance for growing your business.",
            href: "/blog",
          },
          {
            title: "Releases & updates",
            description: "New features and product improvements from the team.",
            href: "/updates",
          },
          {
            title: "How JKTL works",
            description: "A practical introduction to your business tools.",
            href: "/how-it-works",
          },
          {
            title: "About JKTL",
            description: "Meet the company behind your business platform.",
            href: "/about",
          },
          {
            title: "JKTL Affiliates",
            description: "For creators, influencers and business educators.",
            href: "/affiliates",
          },
          {
            title: "JKTL Partners",
            description:
              "For agencies, consultants and CAC registration agents.",
            href: "/partners",
          },
          {
            title: "Games & Fantasy",
            description: "Open the game interface and play immediately.",
            href: "/games",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            title: "Help & guides",
            description: "Find product guides in your JKTL account.",
            href: "/resources/help-centre",
            note: "Public guides · account help available after sign-in",
          },
          {
            title: "Contact the team",
            description: "Ask a question or discuss setup and custom work.",
            href: "/contact",
          },
          {
            title: "Plans & pricing",
            description:
              "Compare free and paid website plans with monthly or yearly billing.",
            href: "/pricing",
          },
        ],
      },
    ],
    aside: {
      title: "Start here",
      items: [
        {
          title: "Your first steps with JKTL",
          description:
            "Create an account, add your business and get familiar with the tools.",
          href: "/resources/first-steps",
        },
      ],
    },
    footer: {
      title: "Need a hand?",
      description: "Talk to the JKTL team about the right next step.",
      href: "/contact",
    },
  },
};

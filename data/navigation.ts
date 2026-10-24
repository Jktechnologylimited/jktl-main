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

// Every destination is an existing JKTL page or a section on How It Works.
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
            href: "/how-it-works#website",
          },
          {
            title: "Website styling",
            description:
              "Make it yours with brand colours and curated font pairings.",
            href: "/how-it-works#website-styling",
          },
          {
            title: "Free website address",
            description: "Get online with your own JKTL subdomain.",
            href: "/how-it-works#website",
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
            href: "/how-it-works#customers",
          },
          {
            title: "Bookings & sales",
            description: "Manage appointments and record everyday sales.",
            href: "/how-it-works#bookings",
          },
          {
            title: "Invoicing & payments",
            description: "Send invoices and collect payments through Paystack.",
            href: "/how-it-works#payments",
          },
          {
            title: "Inventory & expenses",
            description: "Track your stock and the money your business spends.",
            href: "/how-it-works#inventory",
          },
          {
            title: "Reports & analytics",
            description: "Understand revenue, customer trends and performance.",
            href: "/how-it-works#analytics",
          },
          {
            title: "AI receptionist",
            description:
              "Explore call handling and missed-call recovery for your business.",
            href: "/pricing",
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
          href: "/how-it-works#domains",
          note: "Paid add-on · registration quoted separately",
        },
        {
          title: "Hosting & HTTPS",
          description:
            "Managed hosting for your published JKTL business website.",
          href: "/how-it-works#hosting",
        },
        {
          title: "Business email",
          description:
            "Ask the team about manual Zoho Mail setup for your domain.",
          href: "/contact#form",
          note: "Service quotation",
        },
      ],
    },
    footer: {
      title: "Get started free",
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
            href: "/how-it-works#customers",
          },
          {
            title: "Schedule appointments",
            description: "Organise bookings, services and customer visits.",
            href: "/how-it-works#bookings",
          },
          {
            title: "Get paid",
            description: "Invoice customers and track their payments.",
            href: "/how-it-works#payments",
          },
          {
            title: "Track stock & expenses",
            description: "Keep an eye on your products and operating costs.",
            href: "/how-it-works#expenses",
          },
          {
            title: "Work with your team",
            description: "Manage access with owner, manager and staff roles.",
            href: "/how-it-works#team",
          },
          {
            title: "Run your business on mobile",
            description: "Install JKTL from your browser and work on the go.",
            href: "/how-it-works#mobile-app",
          },
        ],
      },
      {
        title: "Growth",
        items: [
          {
            title: "Get your business online",
            description: "Help customers discover your services and reach you.",
            href: "/how-it-works#website",
          },
          {
            title: "Recover missed enquiries",
            description:
              "Explore the paid AI receptionist and follow-up workflow.",
            href: "/pricing",
          },
          {
            title: "Know your numbers",
            description:
              "Use reports to understand how your business is doing.",
            href: "/how-it-works#analytics",
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
          href: "/industries#beauty-personal-care",
        },
        {
          title: "Retail & trade",
          description: "Stock, sales and invoices for product businesses.",
          href: "/industries#retail-trade",
        },
        {
          title: "Food & hospitality",
          description: "Keep track of sales, stock and customer enquiries.",
          href: "/industries#food-hospitality",
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
            title: "Partner programme",
            description: "Learn about referring businesses to JKTL.",
            href: "/affiliates",
          },
        ],
      },
      {
        title: "Support",
        items: [
          {
            title: "Help & guides",
            description: "Find product guides in your JKTL account.",
            href: "https://business.jktl.com.ng/business/help",
            note: "Sign in to your account",
          },
          {
            title: "Contact the team",
            description: "Ask a question or discuss setup and custom work.",
            href: "/contact",
          },
          {
            title: "Plans & pricing",
            description: "Understand the paid AI receptionist package.",
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
          href: "/how-it-works#first-steps",
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

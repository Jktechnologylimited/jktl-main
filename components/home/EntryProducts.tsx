import Link from "next/link";
import { Globe, FileText, CreditCard, ArrowUpRight } from "lucide-react";
import { T } from "@/components/i18n/LanguageProvider";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
const items = [
  {
    name: "Free Websites",
    title: "Your business deserves a website.",
    body: "Choose from professional website designs, customize your online presence, and publish your website with a free JKTL address.",
    label: "Explore Free Templates",
    href: "/templates",
    icon: Globe,
    note: "A JKTL address, hosting and SSL are included.",
  },
  {
    name: "Free Invoicing",
    title: "Create invoices. Get paid.",
    body: "Create professional invoices, share them with customers, and keep track of payments from one place.",
    label: "Create an Invoice",
    href: "https://business.jktl.com.ng/signup?next=invoices",
    icon: FileText,
    note: "Create your account and verify receiving bank details. No website subscription required.",
  },
  {
    name: "Online Payments",
    title: "Make it easier for customers to pay.",
    body: "Share secure invoice payment links from your website or directly with customers. Review transparent checkout charges before payment.",
    label: "Explore Payments",
    href: "/solutions/online-payments",
    icon: CreditCard,
    note: "Paystack processes supported payments. Transaction charges apply.",
  },
];
export function EntryProducts() {
  return (
    <section
      className="border-y border-cream-300 bg-white px-5 py-16 sm:px-8 sm:py-20"
      aria-labelledby="entry-products"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#80621c]">
            THREE WAYS TO START
          </p>
          <h2
            id="entry-products"
            className="mt-4 max-w-2xl text-3xl tracking-tight text-navy-900 sm:text-5xl"
          >
            <T>Start with what your business needs today.</T>
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.name}>
              <article className="flex h-full flex-col rounded-2xl border border-cream-300 bg-cream-50 p-6 sm:p-8">
                <item.icon
                  size={26}
                  className="text-[#80621c]"
                  aria-hidden="true"
                />
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#80621c]">
                  <T>{item.name}</T>
                </p>
                <h3 className="mt-3 text-2xl tracking-tight text-navy-900">
                  <T>{item.title}</T>
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/60">
                  <T>{item.body}</T>
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900 underline underline-offset-4"
                >
                  <T>{item.label}</T>
                  <ArrowUpRight size={16} />
                </Link>
                <p className="mt-auto pt-6 text-xs leading-5 text-black/55">
                  <T>{item.note}</T>
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

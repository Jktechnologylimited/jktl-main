import Link from "next/link";
import { T } from "@/components/i18n/LanguageProvider";
export function BusinessSteps() {
  return (
    <section id="business-steps" className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-widest text-[#80621c]">
          A SIMPLE START
        </p>
        <h2 className="mt-4 text-3xl tracking-tight text-navy-900 sm:text-5xl">
          <T>From your first account to your next customer.</T>
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [
              "Create your free account.",
              "Add your business details. You can use free business tools without buying a website subscription.",
              "https://business.jktl.com.ng/signup",
              "Start for Free",
            ],
            [
              "Build a website, create invoices, or set up your business.",
              "Choose a template or go straight to invoicing. Add your branding, customer details and the information you need.",
              "/how-it-works",
              "Explore the steps",
            ],
            [
              "Share with customers, receive payments, and manage your business.",
              "Publish on your free JKTL address, send invoice links and follow your records. Set up verified receiving bank details for online payments.",
              "/solutions/online-payments",
              "How payments work",
            ],
          ].map(([title, body, href, label], i) => (
            <li
              key={title}
              className="rounded-2xl border border-cream-300 bg-cream-50 p-6"
            >
              <span className="font-mono text-xs text-[#80621c]">0{i + 1}</span>
              <h3 className="mt-5 text-xl text-navy-900">
                <T>{title}</T>
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/60">
                <T>{body}</T>
              </p>
              <Link
                href={href}
                className="mt-5 inline-block text-sm font-semibold text-navy-900 underline underline-offset-4"
              >
                <T>{label}</T> →
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

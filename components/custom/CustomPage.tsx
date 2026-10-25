import { FeaturedCaseStudies } from "@/components/case-studies/FeaturedCaseStudies";
import Link from "next/link";
import {
  Globe,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  LifeBuoy,
  FileCheck2,
} from "lucide-react";
export function CustomPage({ managed = false }: { managed?: boolean }) {
  return (
    <main className="bg-[#fdfcf8] pt-36 text-[#060e2a]">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-[#80621c]">
            {managed ? "JKTL Managed Services" : "JKTL Custom"}
          </p>
          <h1 className="mb-6 mt-5 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {managed
              ? "Keep your business moving."
              : "A website as individual as your business."}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#62636a]">
            {managed
              ? "Ongoing website care, content updates, technical support and infrastructure management, with a service agreement built around your needs."
              : "Professionally developed websites, applications and portals. Your own application, with a clear place to manage your JKTL services."}
          </p>
          <div className="my-8 flex flex-wrap gap-4">
            <Link
              className="btn-navy"
              href={`/contact?product=${managed ? "managed-services" : "custom-websites"}#form`}
            >
              Request a custom project{" "}
              <ArrowUpRight className="ml-2 inline size-4" />
            </Link>
            <a
              className="btn-outline-navy"
              href="https://business.jktl.com.ng/login?next=custom"
            >
              Open client workspace
            </a>
          </div>
          <p className="text-sm text-[#62636a]">
            Existing client? JKTL will configure your projects and send you a
            secure activation invitation.
          </p>
        </div>
        <div className="self-center rounded-3xl bg-[#060e2a] p-8 text-[#fdfcf8]">
          <p className="text-xs uppercase tracking-widest text-[#c9a84c]">
            Your JKTL Custom workspace
          </p>
          <h2 className="my-6 text-3xl">
            Everything you need to stay in control.
          </h2>
          {[
            [
              Globe,
              "My Websites",
              "Your connected sites and permitted content management.",
            ],
            [
              FileCheck2,
              "Services & invoices",
              "Review agreed prices, billing dates and verified receipts.",
            ],
            [
              LifeBuoy,
              "Support",
              "Request content updates, fixes and additional development.",
            ],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Globe;
            return (
              <div
                key={String(title)}
                className="my-5 flex gap-4 border-t border-white/15 pt-5"
              >
                <I className="mt-1 size-5 shrink-0 text-[#c9a84c]" />
                <div>
                  <h3 className="font-semibold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {String(desc)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <FeaturedCaseStudies custom />
      <section className="bg-[#eeeee8] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-[#80621c]">
            Three ways to build with JKTL
          </p>
          <h2 className="mb-10 mt-4 text-4xl tracking-tight">
            The right support for your next chapter.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
                Globe,
                "JKTL Websites",
                "Choose a template, edit your content and publish a self-service website.",
                "/templates",
              ],
              [
                Layers,
                "JKTL Custom",
                "A tailored website, business application or portal with its own scope and written quote.",
                "/products/custom-websites",
              ],
              [
                ShieldCheck,
                "JKTL Managed Services",
                "Optional maintenance, content support and infrastructure services, itemized in your agreement.",
                "/products/managed-services",
              ],
            ].map(([Icon, title, desc, url]) => {
              const I = Icon as typeof Globe;
              return (
                <article
                  key={String(title)}
                  className="rounded-2xl border border-[#d9d5c7] bg-[#fdfcf8] p-7"
                >
                  <I className="mb-7 size-7 text-[#80621c]" />
                  <h3 className="text-xl font-semibold">{String(title)}</h3>
                  <p className="my-5 text-sm leading-relaxed text-[#62636a]">
                    {String(desc)}
                  </p>
                  <Link
                    href={String(url)}
                    className="text-sm font-semibold underline underline-offset-4"
                  >
                    Explore offering
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl tracking-tight">
          From a clear brief to a working website.
        </h2>
        <ol className="my-10 grid gap-8 md:grid-cols-4">
          {[
            [
              "01",
              "Agree the scope",
              "Review deliverables, permissions, infrastructure costs and your written quote.",
            ],
            [
              "02",
              "Build & test",
              "We configure the project and verify the customer experience before access is enabled.",
            ],
            [
              "03",
              "Activate your workspace",
              "Use a secure, expiring invitation to access your websites and service proposals.",
            ],
            [
              "04",
              "Manage & grow",
              "Pay invoices, request updates and add approved services as your business grows.",
            ],
          ].map(([n, t, d]) => (
            <li key={n}>
              <span className="text-sm text-[#80621c]">{n}</span>
              <h3 className="my-4 text-lg font-semibold">{t}</h3>
              <p className="text-sm leading-relaxed text-[#62636a]">{d}</p>
            </li>
          ))}
        </ol>
        <p className="max-w-3xl text-sm leading-relaxed text-[#62636a]">
          Each custom project has an agreed scope and its own pricing. Hosting,
          JKTL maintenance and third-party costs are distinguished in your
          service agreement. CMS access and analytics depend on the integrations
          configured for your project. Current Custom invoices require customer
          payment; automatic charging is disabled.
        </p>
        <p className="mt-6">
          <Link
            href="/contact?product=custom-websites#form"
            className="underline underline-offset-4"
          >
            Tell us about your project →
          </Link>
        </p>
      </section>
    </main>
  );
}

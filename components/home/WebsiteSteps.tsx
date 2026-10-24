import { T } from "@/components/i18n/LanguageProvider";
import Link from "next/link";
export function WebsiteSteps() {
  return (
    <section id="website-steps" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.16em] text-[#80621c]">
          <T>FROM AN IDEA TO YOUR OWN WEBSITE</T>
        </p>
        <h2 className="mt-5 max-w-2xl text-4xl sm:text-6xl tracking-[-.04em] leading-[1.07] text-[#060E2A]">
          <T>Your website, in four easy steps.</T>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              title: "Find your design",
              body: "Explore the templates without signing up. Try desktop and mobile preview, or choose a blank canvas.",
              href: "/templates",
              link: "Explore templates",
            },
            {
              n: "02",
              title: "Make it yours",
              body: "Create your free account. Your selected template follows you — add your logo, photos, services and contact details.",
              href: "https://business.jktl.com.ng/signup",
              link: "Start for free",
            },
            {
              n: "03",
              title: "Publish your website",
              body: "Save your design and turn on publishing. Your website is available on your free JKTL address, with hosting and SSL included.",
              href: "/how-it-works#website",
              link: "How publishing works",
            },
            {
              n: "04",
              title: "Grow when you’re ready",
              body: "Choose a paid plan for your team, connect a domain you own, and request business email separately.",
              href: "/pricing",
              link: "Compare plans",
            },
          ].map((step) => (
            <article
              key={step.n}
              className="rounded-2xl border border-[#E8E1D0] bg-[#F9F7F0] p-6"
            >
              <span className="text-xs text-[#80621c]">{step.n}</span>
              <h3 className="mt-7 text-xl tracking-tight text-[#060E2A]">
                <T>{step.title}</T>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5b6472]">
                <T>{step.body}</T>
              </p>
              <Link
                href={step.href}
                className="mt-6 inline-block text-xs font-semibold text-[#060E2A] underline underline-offset-4"
              >
                <T>{step.link}</T> →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

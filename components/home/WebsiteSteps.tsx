import Link from "next/link";
export function WebsiteSteps() {
  return (
    <section id="website-steps" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[.16em] text-[#71805c]">
          FROM AN IDEA TO YOUR OWN WEBSITE
        </p>
        <h2 className="mt-5 max-w-2xl text-4xl sm:text-6xl tracking-[-.04em] leading-[1.07] text-[#193f2d]">
          Your website, in four easy steps.
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
              className="rounded-2xl border border-[#dde4d5] bg-[#f8f9f3] p-6"
            >
              <span className="text-xs text-[#7e8a68]">{step.n}</span>
              <h3 className="mt-7 text-xl tracking-tight text-[#193f2d]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#65705d]">
                {step.body}
              </p>
              <Link
                href={step.href}
                className="mt-6 inline-block text-xs font-semibold text-[#193f2d] underline underline-offset-4"
              >
                {step.link} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

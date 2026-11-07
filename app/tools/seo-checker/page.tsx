import { pageMetadata } from "@/lib/seo/metadata";
import { SeoChecker } from "@/components/seo/SeoChecker";
export const metadata = pageMetadata("/tools/seo-checker", {
  title: "Free Website SEO Checker | JKTL",
  description:
    "Check your website’s title, description, headings, canonical URL and indexing signals. Get practical fixes, then build a free business website with JKTL.",
});
export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-32 text-ink">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-ink-muted">
          FREE JKTL TOOLS
        </p>
        <h1 className="my-5 text-4xl font-semibold md:text-6xl">
          Help customers find your business.
        </h1>
        <p className="text-lg text-ink-muted">
          Check the foundations of your website’s SEO. Get clear, practical
          improvements without signing up.
        </p>
        <p className="mt-4 text-sm">
          No website yet?{" "}
          <a
            className="text-blue-600 underline"
            href="https://business.jktl.com.ng/signup"
          >
            Create your free JKTL website
          </a>
          .
        </p>
      </header>
      <SeoChecker />
    </main>
  );
}

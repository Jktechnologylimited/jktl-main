import { HelpLibrary } from "@/components/support/HelpLibrary";
import { notFound } from "next/navigation";
import { featurePages, getFeaturePage } from "@/data/feature-pages";
import { FeaturePage } from "@/components/shared/FeaturePage";
export const dynamicParams = false;
export function generateStaticParams() {
  return featurePages
    .filter((p) => p.section === "resources")
    .map((p) => ({ resource: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const slug = (await params).resource;
  const item = getFeaturePage("resources", slug);
  return item
    ? {
        title: item.label,
        description: item.intro,
        alternates: { canonical: `https://jktl.com.ng/resources/${slug}` },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const item = getFeaturePage("resources", (await params).resource);
  if (!item) notFound();
  if (item.slug === "help-centre")
    return (
      <div className="bg-cream-50 px-6 pb-20 pt-36 text-navy-900">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-5xl">JKTL Business Help Centre</h1>
          <p className="mb-8 text-sm text-black/60">
            Detailed guides for getting online and running your business.{" "}
            <a
              className="underline"
              href="https://business.jktl.com.ng/login?next=support"
            >
              Sign in for AI help and human support →
            </a>
          </p>
          <HelpLibrary />
        </div>
      </div>
    );
  return <FeaturePage page={item} />;
}

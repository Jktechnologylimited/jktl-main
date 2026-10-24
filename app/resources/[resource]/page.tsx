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
  return <FeaturePage page={item} />;
}

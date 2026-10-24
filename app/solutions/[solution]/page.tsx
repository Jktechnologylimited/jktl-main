import { notFound } from "next/navigation";
import { featurePages, getFeaturePage } from "@/data/feature-pages";
import { FeaturePage } from "@/components/shared/FeaturePage";
export const dynamicParams = false;
export function generateStaticParams() {
  return featurePages
    .filter((p) => p.section === "solutions")
    .map((p) => ({ solution: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ solution: string }>;
}) {
  const slug = (await params).solution;
  const item = getFeaturePage("solutions", slug);
  return item
    ? {
        title: item.label,
        description: item.intro,
        alternates: { canonical: `https://jktl.com.ng/solutions/${slug}` },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ solution: string }>;
}) {
  const item = getFeaturePage("solutions", (await params).solution);
  if (!item) notFound();
  return <FeaturePage page={item} />;
}

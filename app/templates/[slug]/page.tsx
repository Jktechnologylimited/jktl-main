import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { websiteTemplates, getWebsiteTemplate } from "@/lib/website-templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { pageMetadata } from "@/lib/seo/metadata";
import { templatePageCopy, templatePageSchema } from "@/lib/seo/template-page";
export const dynamicParams = false;
export function generateStaticParams() {
  return websiteTemplates.map((t) => ({ slug: t.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getWebsiteTemplate(slug);
  if (!template) notFound();
  const copy = templatePageCopy(template);
  return pageMetadata(`/templates/${slug}`, {
    title: copy.title,
    description: copy.description,
    // Preserve the existing preview indexing policy; this change fixes headings.
    robots: { index: false, follow: true },
  });
}
export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getWebsiteTemplate(slug);
  if (!template) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(templatePageSchema(template)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <TemplatePreview id={slug} />
    </>
  );
}

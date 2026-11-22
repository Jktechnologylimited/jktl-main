import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { websiteTemplates, getWebsiteTemplate } from "@/lib/website-templates";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { TemplateDetails } from "@/components/templates/TemplateDetails";
import { pageMetadata } from "@/lib/seo/metadata";
import { isIndexableTemplate, templatePageCopy, templatePageSchema } from "@/lib/seo/template-page";
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
    robots: { index: isIndexableTemplate(template), follow: true },
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
      <TemplateDetails template={template} />
    </>
  );
}

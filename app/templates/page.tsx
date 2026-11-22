import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { TemplateDirectory } from "@/components/templates/TemplateDirectory";
export const metadata: Metadata = pageMetadata("/templates", {
  title: "Website Templates",
  alternates: { canonical: "https://jktl.com.ng/templates" },
  description:
    "Browse free website templates for businesses in Nigeria. Preview designs for clinics, salons, law firms, shops and more, then customise yours with JKTL Business.",
});
export default function TemplatesPage() {
  return (
    <div style={{ paddingTop: 68 }}>
      <TemplateGallery />
      <TemplateDirectory />
    </div>
  );
}

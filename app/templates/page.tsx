import type { Metadata } from "next";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
export const metadata: Metadata = {
  title: "Website Templates",
  description:
    "Explore 20 complete JKTL website templates for law firms, churches, schools, music labels, med spas and more.",
};
export default function TemplatesPage() {
  return (
    <div style={{ paddingTop: 68 }}>
      <TemplateGallery />
    </div>
  );
}

import type { Metadata } from "next";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
export const metadata: Metadata = {
  title: "Website Templates",
  alternates:{canonical:"https://jktl.com.ng/templates"},
  description:
    "Explore 200 modern JKTL website and landing-page templates for law firms, churches, schools, music labels, med spas and more.",
};
export default function TemplatesPage() {
  return (
    <div style={{ paddingTop: 68 }}>
      <TemplateGallery />
    </div>
  );
}

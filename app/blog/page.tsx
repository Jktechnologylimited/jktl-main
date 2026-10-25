import type { Metadata } from "next";
import { EditorialList } from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "JKTL Blog | Ideas for growing your business",
  description:
    "Practical perspectives on websites, digital tools and everyday business from the JKTL team.",
  alternates: { canonical: "https://jktl.com.ng/blog" },
};
export default function Page() {
  return <EditorialList kind="blog" />;
}

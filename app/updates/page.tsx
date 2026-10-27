import type { Metadata } from "next";
import { EditorialList } from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "JKTL Updates | Company news & announcements",
  description:
    "Company news, upcoming events and product updates from the JKTL team.",
  alternates: { canonical: "https://jktl.com.ng/updates" },
};
export default function Page() {
  return <EditorialList kind="update" />;
}

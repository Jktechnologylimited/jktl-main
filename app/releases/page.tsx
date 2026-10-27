import type { Metadata } from "next";
import { EditorialList } from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "JKTL Releases | Product launches & release notes",
  description:
    "Official product announcements, releases and new capabilities from JKTL.",
  alternates: { canonical: "https://jktl.com.ng/releases" },
};
export default function Page() {
  return <EditorialList kind="release" />;
}

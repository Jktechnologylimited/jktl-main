import type { Metadata } from "next";
import {
  EditorialList,
  editorialListMetadata,
} from "@/components/editorial/EditorialPages";
export const revalidate = 60;
const metadata: Metadata = {
  title: "JKTL Releases | Product launches & release notes",
  description:
    "Official product announcements, releases and new capabilities from JKTL.",
  alternates: { canonical: "https://jktl.com.ng/releases" },
};
export default function Page() {
  return <EditorialList kind="release" />;
}

export async function generateMetadata() {
  return editorialListMetadata("release", metadata);
}

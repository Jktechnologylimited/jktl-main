import type { Metadata } from "next";
import { EditorialList } from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Releases & Updates | JKTL",
  description:
    "The latest JKTL product improvements, features and release notes from the team.",
  alternates: { canonical: "https://jktl.com.ng/updates" },
};
export default function Page() {
  return <EditorialList kind="release" />;
}

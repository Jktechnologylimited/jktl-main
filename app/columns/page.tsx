import type { Metadata } from "next";
import { EditorialList } from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "JKTL Columns | Stories, essays & fresh perspectives",
  description:
    "Original fiction, nonfiction, essays and serialized stories from JKTL writers.",
  alternates: { canonical: "https://jktl.com.ng/columns" },
};
export default function Page() {
  return <EditorialList kind="column" />;
}

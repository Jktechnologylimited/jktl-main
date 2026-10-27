import type { Metadata } from "next";
import { SITE_ORIGIN } from "./routing.mjs";
/** Page canonicals are explicit: the root layout must never canonicalize a child to Home. */
export function pageMetadata(path: string, metadata: Metadata): Metadata {
  const title =
    typeof metadata.title === "string" ? metadata.title : "JKTL Business";
  const description =
    metadata.description ||
    "Websites, domains and business tools from JK Technology Limited.";
  const url = new URL(path, SITE_ORIGIN).toString();
  return {
    ...metadata,
    description,
    alternates: { ...metadata.alternates, canonical: url },
    openGraph: {
      type: "website",
      siteName: "JKTL Business",
      locale: "en_NG",
      images: [{ url: `${SITE_ORIGIN}/logo.png`, width: 1080, height: 1080 }],
      ...metadata.openGraph,
      title,
      description,
      url,
    },
  };
}

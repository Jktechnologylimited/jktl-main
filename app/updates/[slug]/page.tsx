import { readPublications } from "@/lib/publications";
import { permanentRedirect } from "next/navigation";
import {
  EditorialArticle,
  articleMetadata,
} from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
async function releaseReplacement(slug: string) {
  const current = await readPublications("update", slug);
  if (!current.unavailable && !current.articles.length) {
    const legacy = await readPublications("release", slug);
    if (legacy.articles.length) return "/releases/" + slug;
  }
  return null;
}
async function redirectLegacy(props: Props, slug: string) {
  const destination = await releaseReplacement(slug);
  if (!destination) return;
  const q = new URLSearchParams();
  for (const [key, value] of Object.entries(await props.searchParams)) {
    if (typeof value === "string") q.set(key, value);
    else if (Array.isArray(value)) for (const v of value) q.append(key, v);
  }
  permanentRedirect(destination + (q.size ? "?" + q.toString() : ""));
}
export async function generateMetadata(props: Props) {
  const { slug } = await props.params;
  await redirectLegacy(props, slug);
  return articleMetadata("update", slug);
}
export default async function Page(props: Props) {
  const { slug } = await props.params;
  await redirectLegacy(props, slug);
  return <EditorialArticle kind="update" slug={slug} />;
}

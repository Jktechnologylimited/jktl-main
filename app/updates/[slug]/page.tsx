import { readPublications } from "@/lib/publications";
import { redirect } from "next/navigation";
import {
  EditorialArticle,
  articleMetadata,
} from "@/components/editorial/EditorialPages";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return articleMetadata("update", (await params).slug);
}
export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const current = await readPublications("update", slug);
  if (!current.unavailable && !current.articles.length) {
    const legacy = await readPublications("release", slug);
    if (legacy.articles.length) redirect(`/releases/${slug}`);
  }
  return <EditorialArticle kind="update" slug={(await params).slug} />;
}

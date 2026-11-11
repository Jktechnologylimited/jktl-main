import {
  EditorialArticle,
  articleMetadata,
} from "@/components/editorial/EditorialPages";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return articleMetadata("blog", (await params).slug);
}
export default async function Page({ params }: Props) {
  return <EditorialArticle kind="blog" slug={(await params).slug} />;
}

// Render public slugs on demand; do not enumerate unpublished content.
export function generateStaticParams() {
  return [];
}

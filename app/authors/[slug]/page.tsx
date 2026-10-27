import { pageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";
import {
  readAuthor,
  readPublications,
  type PublicationKind,
} from "@/lib/publications";
import { EditorialSearch } from "@/components/editorial/EditorialSearch";
import styles from "@/components/editorial/EditorialPages.module.css";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { profile, unavailable } = await readAuthor(slug);
  if (!profile && !unavailable) notFound();
  return profile
    ? pageMetadata(`/authors/${slug}`, {
        title: `${profile.name} — JKTL Writer`,
        description:
          profile.bio.slice(0, 300) ||
          `Read published stories, articles and perspectives by ${profile.name} on JKTL.`,
      })
    : { title: "JKTL Writer", robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const { slug } = await params,
    { profile, unavailable } = await readAuthor(slug);
  if (unavailable)
    return (
      <main className={styles.unavailable}>
        <h1>Author profiles are temporarily unavailable.</h1>
        <p>Please try again shortly.</p>
      </main>
    );
  if (!profile) notFound();
  const feeds = await Promise.all(
    (["column", "blog", "release", "update"] as PublicationKind[]).map((k) =>
      readPublications(k),
    ),
  );
  const articles = feeds
    .flatMap((f) => f.articles)
    .filter((p) => p.authorSlug === slug)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return (
    <main className={styles.page}>
      <header className={styles.articleHero}>
        <p>JKTL WRITERS</p>
        {profile.avatar && (
          <img
            src={profile.avatar}
            alt=""
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              aspectRatio: "1",
            }}
          />
        )}
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
      </header>
      <section className={styles.collection}>
        <h2 className="text-2xl mb-6">Published stories</h2>
        <EditorialSearch articles={articles} />
      </section>
    </main>
  );
}

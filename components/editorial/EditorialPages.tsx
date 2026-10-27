import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { EditorialSearch } from "./EditorialSearch";
import { PeopleStory } from "@/components/shared/PeopleStory";
import { publicationPath, type PublicationKind } from "@/lib/publications";
import { readPublications } from "@/lib/publications";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./EditorialPages.module.css";
const info = {
  blog: {
    label: "JKTL JOURNAL",
    title: "Ideas for your next chapter.",
    intro:
      "Practical perspectives on building a business, showing up online and making everyday work easier.",
    path: "blog",
  },
  release: {
    label: "JKTL RELEASES",
    title: "What’s new at JKTL.",
    intro:
      "Product improvements, new tools and the details that help you get more from JKTL Business.",
    path: "releases",
  },
  column: {
    label: "JKTL COLUMNS",
    title: "Stories that stay with you.",
    intro:
      "Original fiction, essays and new perspectives from the JKTL writing community.",
    path: "columns",
  },
  update: {
    label: "JKTL UPDATES",
    title: "The latest from JKTL.",
    intro:
      "Company news, upcoming events and practical updates from the team. For live service health, visit JKTL Status.",
    path: "updates",
  },
};
const date = (s: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(s));
export async function EditorialList({ kind }: { kind: PublicationKind }) {
  const copy = info[kind];
  const { articles, unavailable } = await readPublications(kind);
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p>{copy.label}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <nav aria-label="Editorial sections">
            {Object.entries(info).map(([key, value]) => (
              <Link
                key={key}
                href={`/${value.path}`}
                aria-current={kind === key ? "page" : undefined}
              >
                {value.label.replace("JKTL ", "")}
              </Link>
            ))}
            {kind === "update" && (
              <a
                href="https://status.jktl.com.ng"
                target="_blank"
                rel="noreferrer"
              >
                Service status ↗
              </a>
            )}
          </nav>
        </div>
      </header>
      <PeopleStory variant="stories" compact />
      <section
        className={styles.collection}
        aria-label={kind === "blog" ? "Blog articles" : "Product releases"}
      >
        {articles.length ? (
          <EditorialSearch articles={articles} />
        ) : (
          <div className={styles.empty}>
            <span>
              {unavailable
                ? "WE’LL BE BACK SHORTLY"
                : kind === "blog"
                  ? "THE NEXT CHAPTER IS COMING"
                  : "WATCH THIS SPACE"}
            </span>
            <h2>
              {unavailable
                ? "We couldn’t load the latest posts."
                : kind === "blog"
                  ? "Fresh perspectives are on their way."
                  : "New updates will appear here."}
            </h2>
            <p>
              {unavailable
                ? "Please try again shortly. You can still explore JKTL’s tools and guides."
                : "The JKTL team will share published stories and updates here. In the meantime, explore what you can build."}
            </p>
            <Link href="/how-it-works">Explore JKTL →</Link>
          </div>
        )}
      </section>
    </main>
  );
}
export async function articleMetadata(
  kind: PublicationKind,
  slug: string,
): Promise<Metadata> {
  const { articles, unavailable } = await readPublications(kind, slug);
  const p = articles[0];
  if (!p)
    return {
      title: unavailable
        ? "Articles temporarily unavailable | JKTL"
        : "Article not found | JKTL",
      robots: { index: false, follow: true },
    };
  const url = `https://jktl.com.ng/${info[kind].path}/${p.slug}`;
  return {
    title: `${p.seoTitle || p.title} | JKTL`,
    description: p.metaDescription || p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url,
      publishedTime: p.publishedAt,
      modifiedTime: p.updatedAt,
      authors: [p.author],
      ...(p.coverImage ? { images: [p.coverImage] } : {}),
    },
  };
}
export async function EditorialArticle({
  kind,
  slug,
}: {
  kind: PublicationKind;
  slug: string;
}) {
  const { articles, unavailable } = await readPublications(kind, slug);
  if (unavailable)
    return (
      <main className={styles.unavailable}>
        <h1>Articles are temporarily unavailable.</h1>
        <p>Please try again shortly.</p>
        <Link href={`/${info[kind].path}`}>
          Back to {kind === "blog" ? "Blog" : "Releases & updates"} →
        </Link>
      </main>
    );
  const p = articles[0];
  if (!p) notFound();
  const feed = await readPublications(kind);
  const related = feed.articles
    .filter((a) => a.id !== p.id && (!p.category || a.category === p.category))
    .slice(0, 3);
  const chapters = p.seriesSlug
    ? feed.articles
        .filter((a) => a.seriesSlug === p.seriesSlug && a.chapter)
        .sort((a, b) => (a.chapter || 0) - (b.chapter || 0))
    : [];
  const chapterIndex = chapters.findIndex((a) => a.id === p.id);
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    author: { "@type": "Person", name: p.author },
    publisher: { "@type": "Organization", name: "JK Technology Limited" },
    mainEntityOfPage: `https://jktl.com.ng/${info[kind].path}/${p.slug}`,
    ...(p.coverImage ? { image: p.coverImage } : {}),
  };
  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
      <header className={styles.articleHero}>
        <Link href={`/${info[kind].path}`}>
          ← {kind === "blog" ? "JKTL Blog" : "Releases & updates"}
        </Link>
        <p>{info[kind].label}</p>
        <h1>{p.title}</h1>
        <p>{p.excerpt}</p>
        <div>
          <span>
            By{" "}
            {p.authorSlug ? (
              <Link href={`/authors/${p.authorSlug}`}>{p.author}</Link>
            ) : (
              p.author
            )}
          </span>
          <time dateTime={p.publishedAt}>{date(p.publishedAt)}</time>
          <span>
            {Math.max(1, Math.ceil(p.body.split(/\s+/).length / 220))} min read
          </span>
        </div>
      </header>
      {p.coverImage && (
        <div className={styles.articleCover}>
          <img src={p.coverImage} alt="" />
        </div>
      )}
      <article className={styles.prose}>
        {p.subtitle && <h2>{p.subtitle}</h2>}
        {p.product && (
          <p>
            {p.product} {p.versionLabel && `· ${p.versionLabel}`}
          </p>
        )}
        {!!p.features?.length && (
          <ul>
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
        <ReactMarkdown
          skipHtml
          components={{
            a: ({ href, children }) => (
              <a href={href} rel="noopener noreferrer">
                {children}
              </a>
            ),
            img: ({ src, alt }) =>
              typeof src === "string" && /^https:\/\//.test(src) ? (
                <img src={src} alt={alt || ""} loading="lazy" />
              ) : null,
          }}
        >
          {p.body}
        </ReactMarkdown>
      </article>
      <section className={styles.next}>
        {p.seriesSlug && (
          <nav aria-label="Story chapters">
            <h2>In this series</h2>
            {chapterIndex > 0 && (
              <Link href={`/columns/${chapters[chapterIndex - 1].slug}`}>
                ← Previous chapter
              </Link>
            )}
            {chapters.map((c) => (
              <Link
                key={c.id}
                href={`/columns/${c.slug}`}
                aria-current={c.id === p.id ? "page" : undefined}
              >
                Chapter {c.chapter}: {c.title}
              </Link>
            ))}
            {chapterIndex >= 0 && chapterIndex < chapters.length - 1 && (
              <Link href={`/columns/${chapters[chapterIndex + 1].slug}`}>
                Next chapter →
              </Link>
            )}
          </nav>
        )}
        {p.authorBio && (
          <p>
            About {p.author}: {p.authorBio}
          </p>
        )}
        <nav aria-label="Share this article">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/?text=${encodeURIComponent(p.title + " https://jktl.com.ng/" + info[kind].path + "/" + p.slug)}`}
          >
            Share on WhatsApp ↗
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://jktl.com.ng/" + info[kind].path + "/" + p.slug)}`}
          >
            Share on LinkedIn ↗
          </a>
        </nav>
        {!!p.tags?.length && <p>{p.tags.join(" · ")}</p>}
        {!!related.length && (
          <div>
            <h2>Related stories</h2>
            {related.map((r) => (
              <Link key={r.id} href={`/${publicationPath[r.kind]}/${r.slug}`}>
                {r.title}
              </Link>
            ))}
          </div>
        )}

        <p>Ready for your next chapter?</p>
        <Link href="https://business.jktl.com.ng/signup">Start for free →</Link>
        <Link href={`/${info[kind].path}`}>More from JKTL</Link>
      </section>
    </main>
  );
}

import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
    label: "RELEASES & UPDATES",
    title: "What’s new at JKTL.",
    intro:
      "Product improvements, new tools and the details that help you get more from JKTL Business.",
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
export async function EditorialList({ kind }: { kind: "blog" | "release" }) {
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
            <Link
              href="/blog"
              aria-current={kind === "blog" ? "page" : undefined}
            >
              Blog
            </Link>
            <Link
              href="/updates"
              aria-current={kind === "release" ? "page" : undefined}
            >
              Releases & updates
            </Link>
          </nav>
        </div>
      </header>
      <section
        className={styles.collection}
        aria-label={kind === "blog" ? "Blog articles" : "Product releases"}
      >
        {articles.length ? (
          <div className={styles.grid}>
            {articles.map((p, i) => (
              <article key={p.id} className={styles.card}>
                <Link
                  href={`/${copy.path}/${p.slug}`}
                  className={styles.cover}
                  style={{
                    backgroundImage: `linear-gradient(0deg,#060e2a90,transparent),url('/brand/entrepreneur-studio.png')`,
                  }}
                >
                  {p.coverImage && (
                    <img
                      src={p.coverImage}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  )}
                  <span>
                    {kind === "blog" ? "IDEAS & INSIGHTS" : "PRODUCT UPDATE"}
                  </span>
                </Link>
                <div className={styles.cardBody}>
                  <time dateTime={p.publishedAt}>{date(p.publishedAt)}</time>
                  <h2>
                    <Link href={`/${copy.path}/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p>{p.excerpt}</p>
                  <div>
                    <span>{p.author}</span>
                    <Link href={`/${copy.path}/${p.slug}`}>
                      Read {kind === "blog" ? "article" : "update"} ↗
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
  kind: "blog" | "release",
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
    title: `${p.title} | JKTL`,
    description: p.excerpt,
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
  kind: "blog" | "release";
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
          <span>By {p.author}</span>
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
        <p>Ready for your next chapter?</p>
        <Link href="https://business.jktl.com.ng/signup">Start for free →</Link>
        <Link href={`/${info[kind].path}`}>More from JKTL</Link>
      </section>
    </main>
  );
}

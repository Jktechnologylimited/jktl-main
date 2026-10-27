"use client";
import { useState } from "react";
import Link from "next/link";
import { publicationPath, type Article } from "@/lib/publications";
import styles from "./EditorialPages.module.css";
export function EditorialSearch({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("");
  const categories = [
    ...new Set(articles.map((p) => p.category).filter(Boolean)),
  ];
  const filtered = articles.filter(
    (p) =>
      (!category || p.category === category) &&
      `${p.title} ${p.excerpt} ${p.author} ${(p.tags || []).join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <div className={styles.filters}>
        <label>
          Search stories
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title, author or topic"
          />
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>
      </div>
      <div className={styles.grid}>
        {filtered.map((p, i) => (
          <article key={p.id} className={styles.card}>
            <Link
              href={`/${publicationPath[p.kind]}/${p.slug}`}
              className={styles.cover}
              style={{
                backgroundImage: "url('/brand/entrepreneur-studio.png')",
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
                {p.featured ? "FEATURED · " : ""}
                {p.category || p.kind.toUpperCase()}
              </span>
            </Link>
            <div className={styles.cardBody}>
              <time dateTime={p.publishedAt}>
                {new Date(p.publishedAt).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Africa/Lagos",
                })}
              </time>
              <h2>
                <Link href={`/${publicationPath[p.kind]}/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <p>{p.excerpt}</p>
              <div>
                {p.authorSlug ? (
                  <Link href={`/authors/${p.authorSlug}`}>{p.author}</Link>
                ) : (
                  <span>{p.author}</span>
                )}
                <Link href={`/${publicationPath[p.kind]}/${p.slug}`}>
                  Read story ↗
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p className={styles.empty}>
          No matching articles. Try another topic or category.
        </p>
      )}
    </>
  );
}

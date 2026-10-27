import { cache } from "react";
import { pageMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";
import Markdown from "@/components/Markdown";
import { CTA } from "@/components/shared/CmsPageCTA";
import { isReservedSlug } from "@/lib/reserved-slugs";
import PagePasswordGate from "@/components/shared/PagePasswordGate";

export const dynamic = "force-dynamic";

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  password_protected: string | null;
  published_at: string | null;
};

async function fetchPage(slug: string): Promise<Page | null> {
  if (!sql || isReservedSlug(slug)) return null;
  try {
    const rows = (await sql`
      SELECT id, title, slug, content, seo_title, seo_description, password_protected, published_at
      FROM pages WHERE slug = ${slug} AND status = 'published' LIMIT 1
    `) as Page[];
    return rows[0] || null;
  } catch {
    return null;
  }
}

const getPage = cache(fetchPage);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();
  const text = (page.content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return pageMetadata(`/${page.slug}`, {
    title: page.seo_title || page.title,
    description:
      page.seo_description ||
      text.slice(0, 160) ||
      `Learn more about ${page.title} from JKTL.`,
    robots: {
      index: !page.password_protected && text.length > 0,
      follow: true,
    },
  });
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  if (page.password_protected) {
    const cookieStore = await cookies();
    const unlocked = cookieStore.get(`page-unlock-${page.id}`)?.value === "1";
    if (!unlocked)
      return <PagePasswordGate pageId={page.id} title={page.title} />;
  }

  return (
    <>
      <section
        style={{
          background: "var(--navy-950)",
          paddingTop: "120px",
          paddingBottom: "64px",
        }}
      >
        <div className="max-w-3xl mx-auto px-8">
          <h1
            className="display-xl mb-5"
            style={{ color: "var(--cream-50)", maxWidth: "680px" }}
          >
            {page.title}
          </h1>
        </div>
      </section>

      <article
        className="section-pad"
        style={{ background: "var(--site-paper)" }}
      >
        <div className="max-w-3xl mx-auto px-8">
          <Markdown>{page.content || ""}</Markdown>
        </div>
      </article>

      <CTA
        heading="Ready to get started?"
        subtext="Book a free 30-minute call and we'll map out exactly what would move the needle for you."
      />
    </>
  );
}

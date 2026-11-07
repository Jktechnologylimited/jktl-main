"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { analyzePage, type SeoReport } from "@/lib/seo-tool/analyze";
export function SeoChecker() {
  const [url, setUrl] = useState(""),
    [html, setHtml] = useState(""),
    [report, setReport] = useState<SeoReport | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function check(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setReport(null);
    try {
      const r = await fetch("/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await r.json();
      if (!r.ok) throw Error(data.error);
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please retry.");
    } finally {
      setBusy(false);
    }
  }
  function localCheck() {
    setError("");
    try {
      if (html.length < 50 || html.length > 1000000)
        throw Error("Paste between 50 characters and 1 MB of page HTML.");
      setReport(analyzePage(html, "https://your-website.example/", 0));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Check the HTML.");
    }
  }
  const input =
    "mt-2 w-full rounded-xl border border-border bg-paper p-3 text-ink";
  const button =
    "rounded-full bg-primary px-6 py-3 font-semibold text-white disabled:opacity-50";
  return (
    <div className="space-y-8">
      <form
        onSubmit={check}
        className="rounded-2xl border border-border bg-paper p-6"
      >
        <label className="block font-semibold" htmlFor="seo-url">
          Your public website address
        </label>
        <input
          id="seo-url"
          className={input}
          type="url"
          required
          maxLength={2000}
          placeholder="https://yourbusiness.com.ng"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className={button + " mt-4"} disabled={busy}>
          {busy ? "Checking your page…" : "Check my website free"}
        </button>
        <p className="mt-3 text-sm text-ink-muted">
          No signup required. We read one public page; we do not edit your site
          or save the page HTML.
        </p>
      </form>
      {error && (
        <p role="alert" className="rounded-xl border border-border p-4">
          {error}
        </p>
      )}
      <details className="rounded-xl border border-border p-5">
        <summary className="cursor-pointer font-semibold">
          Site blocks the checker? Check pasted HTML instead
        </summary>
        <label className="mt-4 block" htmlFor="seo-html">
          Paste your page source (never paste secrets or private account pages)
        </label>
        <textarea
          id="seo-html"
          rows={6}
          maxLength={1000000}
          className={input}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <button type="button" onClick={localCheck} className={button + " mt-3"}>
          Check pasted HTML
        </button>
        <p className="mt-3 text-sm text-ink-muted">
          This check stays in your browser. Response codes and HTTP headers
          cannot be verified in this mode.
        </p>
      </details>
      {report && (
        <section aria-live="polite" className="space-y-5">
          <header>
            <p className="text-sm uppercase tracking-widest text-ink-muted">
              On-page readiness
            </p>
            <h2 className="text-3xl font-semibold">
              {report.score}/100 · Your next improvements
            </h2>
            <p className="mt-2 break-all text-sm">{report.url}</p>
            <p className="mt-2 text-sm text-ink-muted">
              A checklist score, not a Google ranking or indexing guarantee. We
              check returned HTML, not JavaScript-rendered content, speed,
              backlinks or robots.txt.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {report.checks.map((c) => (
              <article
                key={c.id}
                className="rounded-xl border border-border bg-paper p-5"
              >
                <p className="text-sm font-semibold">
                  {c.passed ? "✓ Looks good" : "• Review"} · {c.label}
                </p>
                <p className="mt-2 break-words text-sm text-ink-muted">
                  {c.detail}
                </p>
                {!c.passed && <p className="mt-3 text-sm">{c.fix}</p>}
              </article>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-paper p-6">
            <h2 className="text-2xl font-semibold">
              A better starting point for your business.
            </h2>
            <p className="my-3">
              Choose a free JKTL website template, add useful business content,
              and publish when you are ready. You can edit page titles and
              descriptions, then check the published page again.
            </p>
            <Link
              className={button + " inline-block"}
              href="https://business.jktl.com.ng/signup"
            >
              Create my free website →
            </Link>
            <Link
              className="ml-4 inline-block py-3 text-blue-600 underline"
              href="/templates"
            >
              Explore free templates
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

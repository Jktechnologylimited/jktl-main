# JKTL Search Console indexing audit

Date: 27 October 2026 (Africa/Lagos).

## Scope and evidence

The supplied Search Console totals are **6 Not found, 3 Page with redirect, 1 Alternate page with proper canonical tag, 4 Discovered — currently not indexed, and 2 Crawled — currently not indexed**. These are user-provided counts, not a downloaded URL-level export. The two supplied legacy service paths were investigated and repaired. The other counts cannot be assigned to exact URLs without the Search Console examples/export.

This workspace has no Search Console connector. Direct requests to the live JKTL site are blocked by the workspace proxy (`CONNECT tunnel failed, response 403`); that is **not** evidence that JKTL returns 403 to visitors or Google. Vercel's domain-level www/DNS configuration and production CMS records are not accessible here. The HTTP results below come from the actual production build on a local server, using apex/www Host headers. Published-article fixtures are local, read-only test data and were never written to a production database.

## Priority fixes

| Finding | Change |
| --- | --- |
| Legacy `/services/web-development` had no active route | Host-scoped permanent redirect to the existing `/products/custom-websites` page. |
| Legacy `/services/software-solutions` had no active route | Host-scoped permanent redirect to the existing `/products/business-tools` page. |
| Canonical host handling depended entirely on external hosting configuration | Exact `www.jktl.com.ng` → `jktl.com.ng` app-level fallback. Apex URLs do not match this rule. Customer/retired subdomains do not match either rule. Existing external Vercel configuration was not removed or edited. |
| Root layout supplied the homepage canonical to every child that omitted one | Removed the inherited canonical; added explicit page metadata for Home, Contact, Privacy, Terms, product/solution/resource pages and other public sections. Open Graph URLs also describe the actual page. |
| Contact rendered an empty Suspense shell before client query handling | The unchanged Contact interface now receives its query context from a server wrapper, providing an initial HTML heading, contact content and form. No form submission behavior was replaced. |
| Redirects and missing pages could stream HTTP 200 shells | The generic root loading boundary was scoped to known marketing/product routes so it cannot prematurely stream HTTP 200 for missing CMS/editorial content. Existing skeleton styling and page-specific loading remain. Missing CMS/article metadata uses the existing not-found handling. The domain alias has a real permanent config redirect, and legacy release redirects preserve queries. Dynamic content must resolve before a missing/redirect response is sent; monitor feed latency. |
| Sitemap did not account for CMS redirect sources or route collisions | Sitemap excludes configured redirect sources, canonical aliases, reserved CMS slugs, protected/empty CMS pages, query URLs and utility routes. Preferred URLs are deduplicated and invalid modification dates are omitted. |
| Sitemap article enumeration stopped at 200 records | Added backward-compatible offset pagination to Business's existing public publication API; Main enumerates published pages using its cursor. No database schema change or second content system. |
| robots.txt blocked preview paths carrying noindex tags | Preview/canvas URLs can now be crawled so Google can observe their existing noindex directives. They remain excluded from the sitemap. API and Team utilities remain disallowed. |
| Empty/unavailable editorial sections looked indexable | Empty or unavailable Blog/Columns/Releases/Updates listings are noindex and omitted from the sitemap; they automatically become eligible after actual published content is available. Protected CMS content stays noindex even with an unlock cookie. |
| Existing domain CTAs linked through a redirected URL | Current rendered links now point directly to `/domains`. No current product destination was removed. |
| CMS redirect targets could be malformed or self-referential | Internal targets are validated; bounded redirect-chain checks reject detected cycles, and CMS redirects cannot intercept robots.txt or sitemap.xml. Existing legitimate temporary CMS redirects retain their semantics and remain outside the sitemap. |

No page design, CSS system, pricing policy, customer website data, authentication system or database schema was rebuilt. No retired demo site was recreated, and no blanket subdomain-to-homepage redirect was introduced.

## HTTP verification

Expected and verified production-build results (repeat against the live deployment after publishing):

| Request host | Path | Status | Destination |
| --- | --- | --- | --- |
| `jktl.com.ng` | `/services/web-development` | **308** | `https://jktl.com.ng/products/custom-websites` |
| `www.jktl.com.ng` | `/services/web-development` | **308** | `https://jktl.com.ng/products/custom-websites` |
| `jktl.com.ng` | `/services/software-solutions` | **308** | `https://jktl.com.ng/products/business-tools` |
| `www.jktl.com.ng` | `/services/software-solutions` | **308** | `https://jktl.com.ng/products/business-tools` |
| `www.jktl.com.ng` | `/pricing` | **308** | `https://jktl.com.ng/pricing` |
| `jktl.com.ng` | `/products/custom-websites` | **200** | Same URL, self-canonical, substantive website-development content. |
| `jktl.com.ng` | `/products/business-tools` | **200** | Same URL, self-canonical, substantive software/business-tools content. |

The same final build returned **308** for `/products/domains` → `/domains` and the local legacy release fixture → its existing release article, retaining the test query. A deliberately missing CMS URL and a valid-format missing author URL both returned genuine **404**, rather than streamed HTTP 200 not-found shells. These checks do not create routes or alter intentional retirement behavior.

Both legacy service redirects were tested with `?utm_source=legacy-audit&ref=seo`; the exact query was preserved. Their destinations do not redirect back to the source. No external `next` URL controls a redirect destination. A www request handled by an existing Vercel host redirect may first normalize to apex before the path redirect; that edge behavior needs live verification. The app itself can handle each supplied www legacy path directly in one redirect.

## Sitemap, content and intentional exclusions

The rendered-build crawl checks **63 sitemap URLs**: **54 built-in public URLs** plus four editorial section indexes, four published-article fixtures, and one author-profile fixture. It also checks **111 rendered internal paths**. Every sitemap entry has an HTTP 200 response, one preferred canonical, a title, a description, server-rendered heading/content, and no noindex directive. No broken rendered internal path was found. These fixture counts are not a claim about the number of real production posts.

Existing product, solution, resource and case-study pages remain server-rendered and discoverable through navigation/footer/contextual links. Published articles, authors with published work, and eligible CMS pages are included from their existing sources. No fictional business outcome or new article was published for SEO.

The catalogue has **202 existing templates (including two blank canvases)**. `/templates` and `/landing-pages` are indexable commercial galleries. `/templates/[slug]` and `/template-canvas/[slug]` are interactive demo/preview utilities with intentional noindex, not separate long-form acquisition pages. They stay out of the sitemap. This audit did **not** turn 202 similar demonstrations into indexable pages. A future template acquisition page should have useful, original, customer-facing content before becoming indexable.

`/games/business-tycoon` remains functional but canonicalizes to `/games`, because those two pages present the same interface. Only the preferred `/games` is in the sitemap. This is an intentional alternate canonical, not a broken URL. Iframe-led game pages have limited native descriptive text; improve visible editorial context later if game search acquisition becomes a priority, without adding hidden SEO text.

A genuine retired URL without a relevant replacement should remain 404/410. A redirect source or a proper canonical alternate is normally excluded from Google's index; these categories do not need to reach zero.

## Retired demo hosts and malformed BAE URL

No generator or literal reference to `bae.jktl.com.ng/$` was found in the available Main, Business or Fantasy repositories. No route or homepage redirect was created for `$`. The BAE site's own repository and its deployed/DB-managed navigation are not mounted in this workspace, so those remain unverified sources of the malformed link.

No code recreated `consultant-website.jktl.com.ng` or `clinic-website.jktl.com.ng`. New hostname rules match only apex/www Main, not these retired hosts or any active customer subdomain. No DNS record, Vercel customer-domain binding or customer website was changed. Review the BAE site's actual rendered links/content and use Search Console's referring-page information to locate a bad link if it persists.

## Verification and repeatable audit

- Main production build and SEO/unit regressions pass.
- Business production build and editorial regressions pass, including a real local PostgreSQL-compatible test enumerating 201 published records across the API's existing 200-record page size.
- The real Main proxy was exercised against a local PostgreSQL-compatible redirect table: query retention, self/cyclic redirects, unsafe targets and protected robots/sitemap routes pass.
- Desktop/mobile browser checks cover Contact, both product destinations, the template gallery, a published article, canonical tags and preview noindex. No form was submitted and no customer record was created.
- The full rendered HTTP crawl is repeatable with no external package or account credentials:

```sh
node scripts/audit-indexing.mjs --base https://jktl.com.ng --output /tmp/jktl-indexing-live.json
```

For an isolated production-build check, set the existing publication/domain origin overrides to read-only fixtures, then run:

```sh
node scripts/audit-indexing.mjs --base http://127.0.0.1:3990 --host jktl.com.ng --output /tmp/jktl-indexing-build.json
```

The script only reads sitemap/public pages; it never submits forms, purchases anything or follows redirects to another application. Local Host tests use native HTTP because the built-in fetch client can override a manually supplied Host header.

## Search Console follow-up after deployment

1. Confirm both deployments finished successfully. Business's backward-compatible feed pagination can deploy first; no migration is required.
2. Verify the four supplied apex/www legacy requests live with redirects disabled, then fetch the two final product URLs. Expect permanent 308 (or a permanent host redirect followed by 308) and final HTTP 200. Confirm HTTPS, query retention and no loops in the live Vercel configuration.
3. Open live `/robots.txt` and `/sitemap.xml`; check Search Console's last-read timestamp and sitemap fetch status. Submit/resubmit **`https://jktl.com.ng/sitemap.xml`**. Do not submit redirected aliases, preview/canvas utilities, protected CMS pages, retired demos or malformed URLs.
4. Use **URL Inspection → Test live URL** for Home, both product destinations, Pricing, Contact, a real case study, Templates, and one real published article. Confirm crawl allowed, indexing allowed, rendered content present, and declared canonical equals the preferred URL. Inspect Google-selected canonical after the next crawl.
5. Request indexing for those preferred high-value URLs after the live test passes. Do not request indexing of the two legacy redirect sources or of intentional canonical alternates.
6. For the 404 report, validate the repaired legacy paths after deployment. Leave intentional retirement/malformed URL 404s alone; remove bad incoming links where the source is under JKTL's control. Obtain all six exact examples before claiming every reported 404 has been resolved.
7. For Discovered/Crawled — currently not indexed, inspect each exact URL, its Google fetch date, selected canonical, body quality and internal links. Prefer original tutorials, real project explanations and complete product information; do not mass-generate thin pages. Empty editorial sections become indexable when real content is published.
8. Recheck Page Indexing after Google recrawls. Discovery, crawl and indexing are separate decisions; a valid sitemap and eligible page do not guarantee that Google will index every page immediately.

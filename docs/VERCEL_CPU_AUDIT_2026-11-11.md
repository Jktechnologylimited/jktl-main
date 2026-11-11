# JKTL Main: Fluid CPU audit and implemented optimisations

Date: 11 November 2026. Installed Next.js: **16.2.9**. Companion changes are in `jktl-business--` (Next.js 16.4.2).

Changes are prepared locally for review. **Nothing was deployed or pushed.** No framework upgrade, paid service, design rebuild, database migration, live payment or outbound email was required.

## Evidence and causes

This is a source/build/local-runtime audit, not a Vercel billing measurement. No authenticated Vercel usage API/dashboard was available. CPU savings have not been measured or estimated as a percentage.

The homepage, how-it-works, industries, affiliate/partner marketing pages and most informational/template pages were already static. Pricing already regenerated every 300 seconds. Changing those to another static declaration would not save meaningful work.

Actual avoidable work found:

- Editorial lists/articles/authors, domains, the business-email product page and sitemap were dynamically rendered. Public feed and catalogue reads used `no-store`. Metadata and page content already shared React request memoisation, but each new request still repeated origin work.
- The global proxy looked up recursive CMS redirects through Neon on nearly every navigation, including negative lookups. It also matched fonts, videos and other static assets unnecessarily. The Neon wrapper was recreated per request.
- The shared feature-badge provider fetched Business every 30 seconds with `no-store`, even in preview frames without badges. Focus events could trigger more reads.
- Public review polling continued every minute in hidden tabs. Each poll can execute both Main's bridge and Business's API.
- Sitemap generation combined paginated publication feeds, author profiles and optional CMS/redirect SQL on every crawl.

## Implemented changes

| Area | Implementation | Freshness / invalidation |
| --- | --- | --- |
| `/blog`, `/columns`, `/releases`, `/updates` and their `[slug]` pages | Public fetch and page ISR at 60 seconds; unknown published slugs generate on demand via empty `generateStaticParams` | Time-based regeneration, no cross-app invalidation webhook added |
| `/authors/[slug]` | Same public-only 60-second fetch/ISR | Metadata and body still share React request memoisation |
| `/domains` | 60-second public retail catalogue fetch and page ISR | Domain searches, availability and actual Business checkout are unchanged/current |
| `/products/business-email` | Public plan fetch revalidates at 60 seconds, allowing its existing generated product page to be cached | Only marketing plan data; no payment/session result is cached |
| `/sitemap.xml` | Removed forced dynamic rendering, configured route revalidation at 300 seconds | **Effective build interval is 60 seconds**, because nested publication fetches use the lower interval; sitemap remains paginated and canonical-filtered |
| CMS redirect SQL | Reuse Neon wrapper; bounded warm-instance cache keyed by public pathname, TTL 30 seconds, maximum 256 entries; concurrent misses coalesce | Both positive and negative results expire; failures are not cached; query parameters and redirect validation preserved |
| Proxy matcher | Exclude static robots/sitemap and more asset extensions | Navigation/legacy redirect paths still match; proxy execution on normal navigations remains |
| Feature badges (both apps) | Five-minute visible-tab refresh, focus throttled to same interval; skip raw previews/sites/chatbot frames; expired badges filtered during refresh | Cosmetic metadata only; Business endpoint's successful CDN responses cache 60 seconds |
| Reviews | Keep responses uncached; only poll visible tabs, coalesce requests and throttle focus | Consent/moderation is still checked at the server; refresh on return and every 60 seconds while visible |

ISR is stale-while-revalidate: the first request after expiry may see old content while regeneration runs. Nested fetch/page caches, low traffic or upstream failures can extend the observed delay beyond 60 seconds. This is not a hard freshness SLA. Prices shown on marketing pages are informational; authoritative quotes and verified payment state remain in Business. Environment-provided fallback price changes still require the existing deployment process.

The redirect cache only avoids repeated SQL; it does **not** eliminate proxy invocations. It is local to each warm instance, so cold instances and separate regions can miss. CMS redirect edits may take 30 seconds to reach a warm instance. Existing redirects' best-effort hit counting is preserved.

## Security, design and work deliberately retained

No private data has been added to shared caches. Auth, protected CMS/password checks, forms, domain search, referral redirects and customer-facing interactive controls remain functional. The catch-all CMS page remains dynamic because it can require cookies/password checks. Public review responses remain `no-store` to preserve consent behaviour.

Main-to-Business HTTP calls are calls to a **different application**, not avoidable same-application API calls. They now benefit from public fetch caching where suitable. Existing data-only SEO metadata and the static logo Open Graph image do not need new DB queries or image-generation functions. `robots.txt` was already static and remains so. Analytics is consented/event-driven; no analytics event accounting or chatbot functionality was disabled.

## Validation

- Production build passed using `NODE_USE_ENV_PROXY=1 npm --ignore-scripts run build`; TypeScript ran successfully in the build.
- Build manifest comparison: `/`, `/how-it-works`, `/industries`, `/affiliates`, `/partners` remain static; `/pricing` remains ISR 300. Domains, editorial lists, business-email and sitemap changed from dynamic to ISR 60. Article/author patterns use on-demand generation. Public template wrappers/previews remain static.
- Targeted ESLint: zero errors; one existing raw `<img>` warning on the author page. The legacy `npm run lint` script points to removed `next lint`, so ESLint was invoked directly with the installed Next configuration.
- New cache/matcher tests pass: concurrent/negative lookup caching, expiry/eviction, failed lookup retry, asset exclusions and navigation matching. Existing SEO-indexing and template-heading test files pass.
- Chromium tested 1360px desktop and 390px mobile: how-it-works, pricing, domains and a local article returned HTTP 200, each with one H1 and canonical metadata. No design changes were introduced.
- A local mock publication feed exercised an unbuilt article: first request `x-nextjs-cache: MISS`, repeated request `HIT`; after changing only the mock feed, regeneration returned the updated HTML and then `HIT`. Metadata/page coalesced the initial feed read. No real editorial content was edited.
- Local response advertised `Cache-Control: s-maxage=60, stale-while-revalidate=31535940`. This verifies Next's local page cache, **not** Vercel CDN behaviour or measured Fluid savings.

Business companion validation includes protected-route redirects, template parameter preservation, zero private action requests from a public preview, mocked feature cache/CORS tests, hidden-tab timer tests, and payment/tenant tests. One unrelated pre-existing editorial assertion expects writers to have only `/admin/content`, while unchanged permissions also expose `/admin/knowledge`; see the Business audit. It was not changed to alter permissions.

## Remaining limitations and dashboard actions

Do not deploy until approved. On the next authorised deployment, inspect Vercel's route/function CPU and invocation data to confirm the priority routes; inspect repeated GETs' `x-vercel-cache`, cache-control and CORS headers. A cached Main page may still run its proxy, so inspect those costs separately.

Publications use time-based refresh rather than instant cross-app purge. Verify an authorised publish/edit/unpublish and public catalogue edit in staging, allowing stale-while-revalidate. Keep urgent/private access checks dynamic. No authenticated production mutation/browser session was exercised in this audit.

The optional CMS redirect/table queries fail open as before if their DB is unavailable. Database outage costs and cold-region misses need deployed observation. Do not treat local ISR tests as proof of distributed cache behaviour.

## Before/after measurement plan (both repositories)

1. Export seven complete days before deployment and seven comparable days after; separate deployment/build/warm-up activity. Match weekdays, campaigns, bot mix and traffic volume. Keep Main and Business separate and group routes into marketing, proxy, public API, dashboards, payments/webhooks and cron.
2. Record **total Fluid active CPU (ms)**, **function invocations**, **HTTP requests including CDN hits**, error rate and latency for each group. Also record cache hit ratio and DB read counts where available. Build time is a separate measure.
3. Calculate CPU ms / invocation and CPU ms / 1,000 HTTP requests. Report totals alongside these normalised values; different traffic volumes can change totals even if per-request cost improves. Split human and crawler traffic when possible.
4. Compare feature polling, support polling and public feed invocations under matched active-tab time. Confirm hidden tabs stop polling, mutations still refresh immediately, and stale content updates within expected regeneration behaviour.
5. Check authentication/tenant isolation, successful and failed sandbox payments, catalogue freshness and cron completion before accepting the change as a win. Investigate regressions by route; do not infer savings from a static build symbol alone.

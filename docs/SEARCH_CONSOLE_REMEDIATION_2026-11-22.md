JKTL Search Console remediation — 22 November 2026 (Africa/Lagos)

The confirmed technical defect was the Business app serving unavailable customer websites with HTTP 200. The shared website route now returns a real 404 with `noindex`, preserving its helpful message. Main's template sitemap coverage was already correct for its current indexing policy. Business Email and Chatbot search metadata and page structured data have been improved. This report preserves the pre-deployment audit; the user subsequently authorized production release. Release results are verified separately.

Inspected repositories: `jktl-main` (installed Next.js 16.2.9) and `jktl-business--` (16.4.2). Repository instructions were followed, including Business's installed Next.js documentation for `notFound()`. No design rebuild, customer records, subscriptions, billing, registrar configuration, authentication, or database architecture was changed.

**1. Published templates and sitemap coverage**

| Measure | Verified count |
| --- | ---: |
| Published registry entries / distinct public detail URLs | 224 |
| Designed choices | 222 |
| Blank editor starting points | 2 |
| Original designs intended for indexing | 42 |
| Template URLs in the live Main sitemap | 42 |
| Intended indexable templates omitted from the live sitemap | 0 |
| Intentionally omitted entries | 182 |
| Omitted editions with shared starter content | 180 |
| Omitted blank starting points | 2 |
| All URLs in the live Main sitemap | 96 |

The older count of 223 was correct before commit `2f856e2` added `kora-coffee`. Loading the preceding registry from Git confirms 223 distinct IDs. The current registry and production build have 224. This is a source/build count, not a Google indexing count.

The 180 editions derive from 20 base templates with nine editions each. Their selectable design differences do not currently justify 180 additional search landing pages with substantially shared starter copy. Their detail URLs remain functional, self-canonicalized and intentionally `noindex`. Blanks are editor tools rather than useful search destinations. Raw `/template-canvas/*` previews are also excluded and are separate from the 224 detail URLs.

No additional thin pages were generated and no indexing restrictions were removed to inflate the sitemap count. If an edition later receives a distinct purpose and substantial original content, reassess its eligibility before changing the shared policy.

Every registry entry and its exclusion reason is recorded in [template-inventory.csv](seo/2026-11-22-remediation/template-inventory.csv). The read-only audit command is `node scripts/audit-indexing-registry.mjs`; in this workspace, prefix with `NODE_USE_ENV_PROXY=1` to use its network proxy. It checks unique URLs, exact eligible-template coverage, available product coverage and alias/paused-product exclusions. It never publishes content or changes data.

**2. Indexable template page verification**

All 224 detail routes were tested against the generated production build. Each returned 200 with exactly one server-rendered primary H1, unique title/description and its own preferred detail canonical. The 42 indexable originals contain useful business-specific content, page examples, setup guidance, structured data and relevant product links. The 182 intentional exclusions still carry `noindex`.

The server-rendered directory links to all 42 originals. Their edition links make all 222 designed choices reachable through ordinary HTML anchors without JavaScript or clicking Show more. Gallery pagination remains functional. Public previews remain accessible without signup; selection retains the exact template ID through login and signup. No 40-URL manual heading patch was needed: the deployed shared components already handle the registry.

**3. Products and commercial intent**

The route registry has 16 distinct `/products/*` entries. Fourteen are intended indexable product pages and all fourteen are in the sitemap. `/products/domains` is a permanent alias for `/domains`, whose preferred destination is included. `/products/ai-receptionist` is an explanatory, paused-service page with `noindex` and is excluded. The separate `/solutions/online-payments` landing page is included.

The existing three customer entry offers remain:

| Offer | Preferred URL | Result |
| --- | --- | --- |
| Free Websites | https://jktl.com.ng/products/website-builder | 200, one H1, self-canonical, in sitemap |
| Free Invoicing | https://jktl.com.ng/products/invoicing-payments | 200, one H1, self-canonical, in sitemap |
| Online Payments | https://jktl.com.ng/solutions/online-payments | 200, one H1, self-canonical, in sitemap |

The homepage positioning remains **Free Websites • Free Invoicing • Online Payments**. Existing navigation and footer anchors already expose the genuine product pages, including Business Email and Chatbot. Neither was missing from the sitemap; no replacement routes were created.

Implemented in this audit:

- Business Email: replaced the generic search title and 53-character description with domain-specific wording explaining approved mailbox plans, confirmed annual pricing and team-arranged setup.
- Chatbot: replaced the brand-only search title with an FAQ/enquiry-specific title. The description now explicitly says AI-generated replies require activation, matching the existing visible availability notice.
- Both dedicated product renderers now emit their matching `WebPage` and `BreadcrumbList` JSON-LD through the shared SEO helper. There are no fabricated offers, prices or reviews.
- Add-ons copy now leads with available website chat, team access and capacity options, explicitly retaining the paused call-handling status. No product capability was activated and no prices changed.

The complete product inventory, preferred paths and readiness treatment are in [product-inventory.csv](seo/2026-11-22-remediation/product-inventory.csv).

**4. Seven reported 404 URLs**

Live observations below are before this audit's changes are deployed. “After” refers to local production-build validation where code changed.

| Reported URL | Live result | Decision / verified local result |
| --- | --- | --- |
| https://jktl.com.ng/demos/payments | 404 | Retain intentional retirement. No relevant replacement was confirmed; no new route or homepage redirect. |
| https://bae.jktl.com.ng/$ | 404 | Retain malformed-path 404. No source generating this path was found in either requested repository. No route created for it. |
| https://receipt.jktl.com.ng/ | **200**, “This site isn't available”; no robots directive | Shared Business fix: **404 + noindex**. |
| https://consultant-website.jktl.com.ng/ | **200**, same unavailable message | Shared Business fix: **404 + noindex**. No demo recreated. |
| https://clinic-website.jktl.com.ng/ | **200**, same unavailable message | Shared Business fix: **404 + noindex**. No demo recreated. |
| https://www.jktl.com.ng/services/software-solutions | 307 to apex old path → 308 → `/products/business-tools` → 200 | Preserve relevant replacement. App-level redirect already permanent; provider-level www 307 remains to fix. |
| https://www.jktl.com.ng/services/web-development | 307 to apex old path → 308 → `/products/custom-websites` → 200 | Preserve relevant replacement. App-level redirect already permanent; provider-level www 307 remains to fix. |

Root cause: `src/app/sites/[subdomain]/page.tsx` returned ordinary JSX for a missing public site, and its metadata function merely returned a “Site not found” title. Next therefore treated it as a successful page. Both now call `notFound()` for missing/unpublished data, before assistant or prospect account processing. The nested `not-found.tsx` preserves the unavailable-site message and adds a clear sign-in link for the owner.

This is a shared missing-resource fix, not a denylist of retired hosts. It does not reclaim subdomains, recreate demos, redirect unrelated sites, or change published customer routing. Local HTTP tests checked the three reported subdomains, a missing nested page, and a directly addressed missing site, each with browser and Googlebot user agents: all ten responses were 404 with `noindex`.

No stale internal links to the supplied legacy service paths, retired demo hosts or malformed BAE path were found in the two requested repositories. The broader production-build link check found zero broken internal links. This does not establish the source of externally cached links or links in a separate customer repository.

See [legacy-url-review.csv](seo/2026-11-22-remediation/legacy-url-review.csv) for the recorded chains.

**5. Canonicals, BAE and host redirects**

Main's preferred host remains `https://jktl.com.ng`. All 96 sitemap URLs in the local production build returned 200 with self-referencing preferred canonicals and no `noindex`. Canonicals do not include template selection or tracking parameters. Neither retired URLs nor redirected aliases are in the sitemap.

The eight BAE examples previously supplied were checked: `/`, `/terms`, `/cookies`, `/privacy`, `/media`, `/news`, `/tickets?event=e3` and `/faqs`. All return 200 and canonicalize to their corresponding page on **https://www.baeentertainmentgroup.com**, not JKTL Main. All eight canonical destination URLs also return 200. Tickets appropriately canonicalizes its event-query variation to the base tickets page. BAE's owned apex domain permanently redirects to its owned www host. These are valid alternate canonical pages and were preserved.

Details of that initial set are in [bae-canonical-review.csv](seo/2026-11-22-remediation/bae-canonical-review.csv).

The user subsequently supplied seven pasted links, with one joining two addresses: `https://bae.jktl.com.ng/tickets?event=e2https://bae.jktl.com.ng/culture`. Splitting those two addresses yields eight intended URLs. The exact pasted link was also checked, for nine requests in this follow-up:

| Intended URL on `https://bae.jktl.com.ng` | Live HTTP | Canonical on `https://www.baeentertainmentgroup.com` |
| --- | --- | --- |
| `/` | 200 | `/` |
| `/tickets?event=e2` | 200 | `/tickets` |
| `/culture` | 200 | `/culture` |
| `/tickets` | 200 | `/tickets` |
| `/events` | 200 | `/events` |
| `/artists?label=bigdripuniverse` | 200 | `/artists` |
| `/artists?label=elmayanaconcept` | 200 | `/artists` |
| `/tickets?event=e1` | 200 | `/tickets` |

All five distinct preferred destinations also return 200, have a single self-referencing canonical, permit indexing and appear in BAE's own 14-URL sitemap. BAE's live robots.txt permits these paths and declares **https://www.baeentertainmentgroup.com/sitemap.xml**. Neither the artist filters nor ticket selections need separate search indexing: they are variations of their listing pages. Preserve their parameters for users rather than adding redirects that interfere with selection.

The malformed joined link returns 200 for the tickets page and declares the same preferred `/tickets` canonical. It is not a separate culture page. A read-only source review of `client-integrations/bae-label` at `63d256b` confirms explicit per-page canonicals, separate culture routing, ticket links constructed from event IDs, and exact-match event selection with a fallback. No source producing the exact concatenated link was found in BAE or Main; its original source cannot be established from this pasted list. No new malformed route, blanket redirect or customer application change was needed.

If Search Console lists these as “Alternate page with proper canonical tag”, that is expected treatment for the alternate host and filter variations. Inspect/request indexing of the preferred customer-domain pages, not the alternate JKTL URLs. Google’s actual selected canonical/indexing status was not accessed. Exact follow-up rows are in [bae-supplied-urls-review.csv](seo/2026-11-22-remediation/bae-supplied-urls-review.csv); [bae-supplied-discovery.json](seo/2026-11-22-remediation/bae-supplied-discovery.json) preserves the live robots and sitemap evidence.

Customer-domain regression tests also verify separate published customers retain their own verified domain, an unverified domain is not adopted as canonical, and template subpages, sitemap and robots use the correct customer origin. No customer canonical was changed to JKTL Main.

One deployment-setting issue remains:

- Live `http://jktl.com.ng/` returns **308 → HTTPS apex → 200**.
- Live `https://www.jktl.com.ng/` returns **307 → apex → 200**. HTTP www first upgrades with 308, then encounters that 307.
- Main's checked-in host and legacy rules already return 308 in the local production build. The live upstream www redirect takes precedence. Review **Vercel → jktl-main → Settings → Domains → www.jktl.com.ng**, retain its apex destination and change the redirect status to permanent **308**. Retest the complete live chains afterward. There is no Vercel token or connected management tool here, so the domain setting was not changed.
- Live apex legacy redirects preserve `utm_source` and `ref`, reach the relevant 200 product destination and do not loop. The live www chains preserve those parameters too, but their first hop is still temporary. Local application-level tests pass directly for both hosts with 308. Do not mistake that local result for a fixed live Vercel setting.

The two “duplicate without user-selected canonical” examples were not supplied, so their exact cause cannot be established. The tested current Main sitemap pages all have a selected canonical; that does not prove those two historical URLs have been resolved.

**6. Intentional exclusions and content work**

Login, signup, password-reset, private dashboards, internal management, onboarding and private payment links retain their existing noindex policy. No blanket noindex was added to customer websites. Forty authentication/template-query examples and twelve private-header paths were checked. Template IDs survive the tested navigation; query variations are not separate sitemap entries.

Blank editor tools, near-duplicate template editions, raw previews and the paused AI receptionist remain excluded. Empty editorial listings and unpublished/future posts remain filtered by the existing publication code. Published article and public-author inclusion rules are covered by tests; no articles were manufactured and no direct production database enumeration was performed. Publish useful original articles through the existing editorial workflow, rather than creating empty SEO routes.

Content priorities after technical validation: strengthen genuine industry-specific examples, original customer case studies and service detail on the existing three entry offers and original template pages. Only promote an edition to indexable status when it has substantial distinct customer value. The fifteen discovered and four crawled-but-not-indexed examples cannot be diagnosed individually without their URLs and Google's current inspection details. Technical eligibility does not guarantee selection for indexing.

**7. Validation and before/after evidence**

| Check | Result |
| --- | --- |
| Main production build | Passed; 516 generated pages |
| Business production build | Passed; 591 generated pages |
| TypeScript, both repositories | Passed |
| ESLint for every changed source, script and test | Passed |
| Main complete lint command | Four pre-existing errors and ten warnings in unchanged files; not clean |
| Main regression checks | 23 passing tests across six files |
| Business regression checks | 11 passing tests across three files |
| Main rendered routes | 291 checked, including all 224 template detail pages |
| Sitemap | 200; 96 unique preferred URLs, 42 templates, no redirects/noindex entries |
| robots.txt | 200; preferred sitemap declared; template crawling permitted |
| H1 and metadata | Exactly one server H1 for all 224 template details and all sitemap pages; titles, descriptions and canonicals present |
| Discovery | 222 designed choices reachable without Show more; zero broken internal links in tested rendered pages |
| Authentication | 40 template-query URLs; login/signup H1 and noindex; selection preserved; no forms submitted |
| Mobile / desktop | 1440, 390 and 320 pixel layouts; no horizontal overflow, visible H1 and selection controls |
| JavaScript disabled | Homepage, template gallery, template detail and free-website entry page retain visible primary content |
| Unavailable Business sites | Ten actual local HTTP tests: 404 plus noindex for browser/Googlebot |
| Customer domains | Published/unpublished and distinct-customer canonical tests pass; the original eight BAE examples and the later eight intended URLs have healthy owned-domain canonicals; the malformed pasted link was checked separately |
| Dedicated product HTML | Email and Chatbot: 200, one H1, preferred canonical and one matching page/breadcrumb graph each |

The existing full-lint errors are `prefer-const` in `app/api/tenant/route.ts`, an effect/state rule in `components/shared/PromotionBanner.tsx`, and explicit `any` in `lib/db.ts` and `lib/affiliate-db.ts`. They were not introduced or modified here. Changed files pass lint independently.

Builds were invoked directly through the installed Next CLI with database/provider credentials removed. Business's prebuild migration script was deliberately not invoked; no schema migration, production database mutation, live charge or email was performed. Business HTTP QA used an explicit empty SELECT-only mock connection with external requests blocked. Published customer configuration was covered by fixtures and read-only public BAE checks, not by modifying customer accounts.

Both builds preserve the existing rendering architecture: template details/products are generated statically; Business Email's public-plan dependency regenerates at one minute; sitemap output regenerates at its effective one-minute dependency interval. Customer websites remain request-rendered for their published tenant data. No caching or authentication architecture was changed by this audit.

Reproducible checks include:

```sh
# Main
node tests/seo-foundation.test.mjs
node tests/seo-indexing.test.mjs
node tests/template-heading.test.mjs
node tests/editorial-publications.test.mjs
node tests/cpu-optimisation.test.mjs
node tests/product-indexing.test.mjs
node node_modules/typescript/bin/tsc --noEmit

# Business
node tests/seo-private-indexing.test.mjs
node tests/public-site-indexing.test.mjs
node tests/coffee-template.test.mjs
node node_modules/typescript/bin/tsc --noEmit
```

The existing `tests/seo-foundation.browser.cjs` was run against local production servers on ports 3317/3318. It performs read-only browser navigation and never submits a form. Its [rendered-page CSV](seo/2026-11-22-remediation/rendered-pages.csv) includes the 291 Main responses and 40 auth query responses. [summary.json](seo/2026-11-22-remediation/summary.json) preserves inventory counts, local HTTP results, live query-preserving redirect chains, before/after product descriptions and limitations. Full local logs and desktop/mobile screenshots are under `/tmp/jktl-indexing-remediation-22nov/`.

**8. Files changed in this audit**

Main:

- `app/products/[product]/page.tsx`: dedicated product schema output and shared product metadata.
- `lib/seo/feature-page.ts`: accurate product search copy and reusable page/breadcrumb schema.
- `lib/website-pricing.ts`: availability copy only; no pricing changes.
- `scripts/audit-indexing-registry.mjs`: read-only exact-coverage inventory tool.
- `tests/product-indexing.test.mjs`: product route coverage, metadata/schema and paused-service checks.
- This report and eight evidence files under `docs/seo/2026-11-22-remediation/`.

Business:

- `src/app/sites/[subdomain]/page.tsx`: missing/unpublished page and metadata now use `notFound()`.
- `src/app/sites/[subdomain]/not-found.tsx`: existing unavailable-site design with a useful owner sign-in link.
- `tests/public-site-indexing.test.mjs`: missing/draft handling and customer-domain isolation checks.

**9. Search Console steps after deployment**

1. Deploy the reviewed code when authorized, correct the live www 307 at the domain layer, and retest the three unavailable subdomains and two legacy service chains. The local 404 fix is not yet on production.
2. Retain/resubmit **https://jktl.com.ng/sitemap.xml** in the correct JKTL property. The live preferred sitemap currently contains 96 URLs; that count can change legitimately when original templates or published editorial content are added. Retire the old www sitemap submission if it is still separately maintained; removing a sitemap submission does not itself remove pages from Google's index.
3. Inspect the preferred free-website, invoicing and online-payments URLs above, `/templates`, `/products/business-email`, `/products/ai-chatbot`, and original template URLs such as **https://jktl.com.ng/templates/lumivie-skin**, **https://jktl.com.ng/templates/med-spa** and **https://jktl.com.ng/templates/law-firm**. These IDs exist in the attached registry and are eligible. Inspect URL → Test Live URL → confirm 200, allowed indexing and the intended canonical → Request indexing where useful.
4. For the three retired subdomains, verify the live 404/noindex result after deployment. Keep intentional retirement; do not request indexing or redirect them to Main merely to clear a report. The older `/demos/payments` and malformed BAE `$` already return 404 and may legitimately remain in historical exclusions.
5. Preserve BAE's owned-domain canonical selection. Do not request indexing of its alternate JKTL URLs to compete with the preferred customer domain. Noindex auth pages, edition previews, font files and retired URLs also do not need indexing requests.
6. Open the two unresolved duplicate examples and the discovered/crawled lists in Search Console. Compare Google's selected canonical and last crawl date with the current live result. Request recrawling of genuine canonical pages and use Validate Fix for repaired issues where offered. Historical exclusion counts can lag deployment; success means valuable canonical pages are eligible and discovered, not that every exclusion count becomes zero.

No Search Console API/session was connected, and Google has not been asked to index anything by this code change. No claim is made that Google has indexed a URL because it is in the sitemap or passed these tests. The BAE follow-up changed documentation/evidence only; no rebuild or deployment was needed for it.

**10. Deployment state**

The audit and BAE follow-up were completed without a commit, push, deployment or production setting change. The user subsequently authorized deployment of the reviewed changes to both repositories. The evidence files remain a pre-deployment snapshot; GitHub/Vercel release status and post-deployment HTTP checks are reported separately. The upstream www redirect setting still requires verification independently of an application release.

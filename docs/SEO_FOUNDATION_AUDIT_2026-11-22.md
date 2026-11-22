# JKTL organic SEO foundation — 22 November 2026

Status at audit completion: implemented and verified in local production builds. The live baseline records the previous release; the after checks record local validation. GitHub's Vercel checks record the deployment status of each released commit. Homepage positioning remains **Free Websites • Free Invoicing • Online Payments**. Colours, typography, navigation features, template identifiers and customer website documents are preserved.

Scope: JKTL Main, with a small Business response-header change to exclude private account flows. Main uses Next.js 16.2.9; Business uses 16.4.2. No framework upgrade, new service, database migration, account creation or live charge was involved.

## Prioritised findings and implemented changes

| Priority | Affected URLs | Confirmed finding | Change |
| --- | --- | --- | --- |
| High | `/templates/[slug]` | All 224 detail pages were `noindex`, including original, useful designs. None appeared in the sitemap. | A shared eligibility rule now enables the 42 original designed templates and includes them in the sitemap. The 180 repeated editions and two blank starting points remain usable with `noindex, follow` and self canonicals. Raw `/template-canvas/*` previews retain `noindex`. |
| High | `/templates`, `/landing-pages`, original template details | Only the first 24 catalogue cards were linked in the initial HTML. Later cards required Show more. | Added a server-rendered industry directory and edition-comparison links. All 222 designed templates are reachable through normal HTML links without pressing Show more. Existing filters, new-tab previews and 24-to-48 Show more behaviour continue to work. |
| High | All template details | The outer document had roughly 50–69 words in the sampled live pages; most useful content was inside an iframe. | Added visible server-rendered information about the actual design, page count, example services, editable sections, setup, plan boundaries and related templates. Selection links retain the exact `template` identifier. No invented client results, reviews or medical claims were added. |
| High | Main public route families, including `/templates`, `/industries`, `/products/*`, `/solutions/*` | Folder-wide loading placeholders left completed content in hidden streaming containers until a JavaScript swap. Reveal animations also initially hid some content. | Removed 15 redundant public route loading wrappers. Added a no-JavaScript visibility fallback for shared Reveal/Stagger elements. Confirmed the catalogue, template detail, industry and website-builder H1s are visible with JavaScript disabled. Component loading states and JavaScript-enabled animations remain. |
| High | Business `/business/*`, `/admin/*`, programme account flows and onboarding | Client-guarded workspaces could return HTTP 200 without a general crawler exclusion directive. Login/signup already had appropriate metadata. | Added scoped `X-Robots-Tag: noindex, nofollow` headers to private workspaces, authentication, onboarding and `/pay/*` invoice links. Existing authorisation, frame policies and tenant handling are retained. This is not a project-wide header: customer website homes, public template routes, help and games are unaffected. |
| Medium | `/products/website-builder`, `/products/invoicing-payments`, `/solutions/online-payments` | Search titles and headings did not clearly distinguish the three entry offers. | Added intent-specific titles, descriptions, H1s, relevant CTA labels, visible practical questions, cross-links and WebPage/Breadcrumb structured data. Free invoice creation is distinguished from paid payment processing. Existing signup destinations are retained. |
| Medium | `/products/ai-receptionist` | A paused-service placeholder was an indexable sitemap entry. | Retained its explanatory page and customer contact path, set `noindex, follow`, and excluded it from the sitemap. |
| Medium | Product navigation on `/products/business-tools` and `/products/add-ons` | Generated links used the redirected `/products/domains` alias. | Product links now use the existing preferred-path helper and go directly to `/domains`. Existing permanent redirects remain available for old links. |
| Maintenance | Main lint command | `next lint` is unavailable in the installed Next.js version. | Added the installed Next ESLint flat configuration and a working production-source lint command. Existing unrelated findings are listed below. |

Primary implementation files: `lib/seo/template-page.ts`, `lib/seo/sitemap.ts`, `lib/seo/routing.mjs`, `app/sitemap.ts`, `app/templates/[slug]/page.tsx`, `components/templates/TemplateDetails.tsx`, `components/templates/TemplateDirectory.tsx`, `lib/seo/feature-page.ts`, and `components/shared/FeaturePage.tsx`. Business exclusions are in its existing `next.config.ts`.

## Before and after

The baseline was read from the deployed site. After checks used the completed local production builds.

| Check | Live baseline | Local implementation |
| --- | --- | --- |
| Sitemap URLs | 55 | 96: adds 42 originals and excludes the paused AI receptionist page |
| Sitemap responses | All 55 returned 200 | All 96 return 200, self-canonical and index-eligible |
| Index-eligible original templates | 0 | 42 |
| Template detail H1 | Earlier shared fix present | Exactly one across all 224 rendered detail documents |
| Discovery beyond initial catalogue cards | Depended on interaction | All 222 designs reachable through server-rendered links |
| Template details outside iframe | Very short preview introduction | Useful visible content, setup guidance and internal links |
| Auth query headings/indexing | Shared login/signup fix present | 40 representative query URLs each have one H1, `noindex` and a query-free canonical |
| Private Business responses | Incomplete general crawler exclusion | Scoped HTTP noindex headers confirmed on private route families |
| Mobile layouts | Existing design | Checks pass at 1440, 390 and 320 pixels, including selection and auth navigation |

The browser audit checked 291 Main responses and 40 Business authentication query responses. These counts include intentional negative tests and do not represent 331 indexable pages. The crawl found **zero broken internal page links** and no browser JavaScript errors in the checked flows.

Evidence:

- [Live baseline: 68 responses](seo/2026-11-22-before.csv)
- [Rendered after checks: 331 responses](seo/2026-11-22-after.csv)
- [Verification summary](seo/2026-11-22-summary.json)

## Sitemap, robots and canonicals

The sitemap URL remains **https://jktl.com.ng/sitemap.xml**. `robots.txt` returns 200, advertises that URL, permits public pages and rendering assets, and excludes API/administrative utilities. No competing static sitemap or robots file was introduced.

Sitemap generation now shares template eligibility with detail metadata. It excludes query strings, alternate hosts, redirects, private paths, raw previews, repeated editions, blanks, unavailable/empty publication collections and protected or empty CMS pages. Redirect sources configured in the optional CMS remain filtered out.

Sitemap code declares a 300-second regeneration interval. Its public publication reads retain their existing 60-second cache; the current Next build reports an effective one-minute sitemap regeneration interval. Template detail documents and the catalogue remain static/SSG. A new template requires the normal code release. No private data was added to a public cache.

Self canonicals on indexable pages use the apex HTTPS origin. Template display and marketing attribution query variations canonicalize to their query-free page. Login/signup canonicalize to the corresponding Business auth route while remaining noindex. Template editions retain their routes and identifiers; no redirect changes a customer's selection.

Confirmed existing redirects, for both apex and www hosts:

| Source | HTTP status | Preferred destination |
| --- | --- | --- |
| `/services/web-development?source=seo-check` | 308 | `https://jktl.com.ng/products/custom-websites?source=seo-check` |
| `/services/software-solutions?source=seo-check` | 308 | `https://jktl.com.ng/products/business-tools?source=seo-check` |
| `/products/domains` | 308 in the live audit | `https://jktl.com.ng/domains` |

The legacy replacements return 200; query preservation and www-to-apex handling passed. Intentional missing pages, including `/demos/payments`, unknown template IDs and the retired `/blog/ai-business-websites-2026`, remain 404. Retired customer/demo subdomains were not recreated or redirected.

The three offer pages serve different needs and retain separate self canonicals. `/landing-pages` and `/templates` also retain their distinct purposes. There is no evidence warranting a broad redirect or canonical to the homepage. Repeated template editions can be considered for search eligibility later if they acquire substantial, genuinely distinct content; they are not deleted now.

## Articles and content still needing attention

All four official public publication feeds returned HTTP 200 with **zero published articles** at audit time: blog, columns, releases and updates. Empty collections correctly remain outside the sitemap and noindex. No articles or author pages were manufactured. Existing publication logic and tests verify published-only/future-date filtering, author-field privacy and sitemap enumeration beyond the first 200 records using mocked fixtures. This does not establish that any article is indexed.

Recommended editorial work, in priority order:

1. **Original template detail pages:** add approved industry-specific guidance and real examples over time, particularly medical spas, senior care and wealth advisory. The preview itself is valuable; richer original guidance can improve its usefulness further. Do not index all 180 editions merely to increase the page count.
2. **The three offer pages:** replace generic template screenshots with approved screenshots of the actual website editor, invoice and payment experience when available. Add verified customer examples and results without inventing performance claims. The clearer copy and CTAs are already implemented.
3. **Case studies:** expand short search descriptions and add approved detail about the real scope, process and customer experience. Short descriptions were observed on K.K. Ubani, J.N. Nwoka, Nej, Sarvify, Heavens Hospitality, FTM Elite, Cecilia Learning Academy and Newlife Baptist Church. Their present URLs, content and self canonicals are retained.
4. **`/products/business-email` and `/terms`:** their existing descriptions are unusually short (53 and 52 characters). More useful descriptions can be written from approved service/legal copy; length alone is not an indexing error.
5. **Editorial collections:** publish a small number of original, practical guides tied to genuine customer questions and the existing entry offers. Each should provide a useful next step into the appropriate product or template. No bulk article generation is recommended.

## Validation and limitations

| Validation | Result |
| --- | --- |
| Main production build, Next 16.2.9/Turbopack | Passed; existing public static/SSG architecture retained |
| Business production build, Next 16.4.2/Turbopack | Passed; database-writing prebuild skipped for local validation |
| Main and Business TypeScript checks | Passed |
| Main SEO, H1, sitemap, publication and caching regression tests | 20 passed |
| Business private-indexing tests | 2 passed |
| Changed production files, ESLint | Passed in Main and Business |
| Full Main production-source lint | 4 pre-existing errors and 10 warnings; not reported as a passing full lint |
| Browser/server audit | Passed: 96 sitemap URLs; all 224 template details; 40 auth variants; internal links; structured JSON and canonical consistency; mobile/desktop; Show more; no-JS visibility; safe login/signup navigation |
| Legacy redirects and intentional 404s | Passed |

The unrelated full-lint errors are `prefer-const` in `app/api/tenant/route.ts`, `react-hooks/set-state-in-effect` in `components/shared/PromotionBanner.tsx`, and existing `no-explicit-any` annotations in `lib/db.ts` and `lib/affiliate-db.ts`. Their behaviour was not changed as part of this SEO task. Existing image/unused-variable warnings are recorded by the full lint output.

Reproduce the relevant checks from Main:

```sh
node --test tests/seo-foundation.test.mjs tests/seo-indexing.test.mjs tests/template-heading.test.mjs tests/editorial-publications.test.mjs tests/cpu-optimisation.test.mjs
node tests/seo-foundation.browser.cjs
node node_modules/typescript/bin/tsc --noEmit
npm run lint
```

The browser audit expects the built Main app on localhost:3317 and Business on localhost:3318, configurable through `SEO_MAIN_ORIGIN` and `SEO_BUSINESS_ORIGIN`. Use builds/runtimes with production database and mail credentials removed for local verification. Business's `npm run build` has a database-writing prebuild; invoke Next directly for a read-only local build. No verification form was submitted, account created, email sent or live charge made.

There is no connected Search Console account or real-user Core Web Vitals dataset in this task. These checks validate eligibility, rendering and links; they do **not** prove Google indexing, rankings, production field performance or a Rich Results entitlement. Public external customer sites/social links were not exhaustively crawled. Authenticated account contents and protected CMS records were not inspected. Published CMS content and future publication changes should continue through the existing authorised workflows.

## Search Console follow-up after deployment

1. Deploy the reviewed Main changes and the scoped Business headers. No new environment variables or migrations are required.
2. Confirm the production sitemap now contains the eligible original templates and no paused/private/preview URLs, then resubmit **https://jktl.com.ng/sitemap.xml** in the correct JKTL Search Console and Bing property.
3. Inspect the homepage, the three offer URLs, `/templates` and a small priority set such as `/templates/nacre-aesthetics`, `/templates/lumivie-skin`, `/templates/luneform-aesthetics`, `/templates/clinic` and `/templates/consultancy`.
4. Use Test Live URL to check the response, crawl permission and canonical, then request indexing for the priority canonical pages. Compare Google's selected canonical after recrawling. Do not request indexing for auth, blank templates, editions or raw previews.
5. Validate the affected original-template noindex findings after the deployment is live. Leave intentional retired-page 404s intact. Search Console examples and counts may lag behind the current site.
6. Track discovery/index coverage and qualified search queries alongside the existing template-selection/signup funnel over comparable periods. Sitemap inclusion is a discovery signal, not an indexing guarantee.

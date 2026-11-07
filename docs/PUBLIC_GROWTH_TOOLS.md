# Games trends and free website SEO checker

The public `/tools/seo-checker` page is linked in Resources and the sitemap. It needs no account. Its primary conversion is a free JKTL Business website; it does not start checkout or promise search rankings.

The URL checker retrieves one public HTTPS HTML page, following at most three redirects. It verifies DNS on every hop and pins the chosen public IPv4 address at connection time. Private/reserved IPv4 destinations, credentials, IP-literal URLs, non-HTTPS URLs and alternate ports are blocked. It does not execute remote JavaScript, retrieve subresources or store the page HTML. It caps input, HTML size, request duration and concurrent work. Request limits are per server instance, not a distributed abuse-prevention guarantee.

Checks cover HTTP response, title, description, H1, viewport, canonical, meta/header noindex, image alt attributes, server-visible text and JSON-LD presence. The score is a simple readiness checklist, not a full audit or ranking prediction. It does not check robots.txt, Google indexing, performance, backlinks or full structured-data eligibility. Pasted-HTML mode runs entirely in the browser and cannot verify the HTTP response or headers. IPv6-only sites and sites blocking automated readers can use pasted-HTML mode.

Games show a compact, expandable Google Trends section below the play area, with a free-website action and an SEO-checker link. Business games also include these destinations in the existing Games menu. Nothing overlays mobile game controls.

`/api/game-trends` reads Google's public Nigeria RSS feed, server-cached for 30 minutes. There is no API credential, scraping of private endpoints, invented fallback trend or claim that search popularity proves factual accuracy. Only topic labels, dates and published approximate traffic are shown. Links open Google Trends; source attribution is visible. A feed outage shows a temporary-unavailability message while games and website links remain usable. Main and Business keep the same adapter and card component.

Verified against the live public feed (six items) and one public fetch of the JKTL homepage. Automated tests cover RSS parsing and bounds, HTML checks, private-address rejection, DNS pinning, redirect validation, API request limits and throttling. Browser checks cover the SEO report, free-website CTA, trends display and paused-receptionist page on desktop/mobile. No messages, purchases, account creation or website changes are performed by those checks.

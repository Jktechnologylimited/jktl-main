# Game updates and free website SEO checker

The public `/tools/seo-checker` page is linked in Resources and the sitemap. It needs no account. Its primary conversion is a free JKTL Business website; it does not start checkout or promise search rankings.

The URL checker retrieves one public HTTPS HTML page, following at most three redirects. It verifies DNS on every hop and pins the chosen public IPv4 address at connection time. Private/reserved IPv4 destinations, credentials, IP-literal URLs, non-HTTPS URLs and alternate ports are blocked. It does not execute remote JavaScript, retrieve subresources or store the page HTML. It caps input, HTML size, request duration and concurrent work. Request limits are per server instance, not a distributed abuse-prevention guarantee.

Checks cover HTTP response, title, description, H1, viewport, canonical, meta/header noindex, image alt attributes, server-visible text and JSON-LD presence. The score is a simple readiness checklist, not a full audit or ranking prediction. It does not check robots.txt, Google indexing, performance, backlinks or full structured-data eligibility. Pasted-HTML mode runs entirely in the browser and cannot verify the HTTP response or headers. IPv6-only sites and sites blocking automated readers can use pasted-HTML mode.

Games show a compact, expandable matches and news section below the play area, with a free-website action and an SEO-checker link. Business games also include these destinations in the existing Games menu. Nothing overlays mobile game controls.

Verified against public news and match sources and one public fetch of the JKTL homepage. Automated tests cover RSS parsing and bounds, HTML checks, private-address rejection, DNS pinning, redirect validation, API request limits and throttling. Browser checks cover the SEO report, free-website CTA, news display and paused-receptionist page on desktop/mobile. No messages, purchases, account creation or website changes are performed by those checks.

## In-game updates and roadside signs

Main and Business now also serve `/api/game-world-feed`. The expandable game panel and Business's existing Games menu show today's football and news. Match coverage is explicitly limited to Premier League, La Liga and Champions League public ESPN scoreboards. BBC Africa supplies short dated headlines. Provider failures remain partial and visible rather than generating fictional content.

Match state comes from the provider: LIVE only for ongoing games with an observation no older than two minutes, WAT kick-offs for upcoming fixtures, FT only when completed. Cancelled/postponed games do not invent 0–0 results. Source links and delayed-data labels remain available. Fetches are coalesced and cached for a minute; clients poll while visible. Headlines older than 48 hours are omitted from billboard rotation.

Tycoon and Street Run render signs as world geometry, outside the lanes and game controls. Low quality uses at most two signs; higher quality at most three. Modest canvas textures are disposed when replaced; no additional per-frame text painting or ad overlays are introduced. Reduced-motion preferences stop billboard rotation. Full text is available in the accessible menu because distant signs are intentionally small.

The promotional copy is “Got 5 minutes? Start your free website.” It links to the public template gallery, not automatic checkout. No completion-time guarantee, pop-up timer, forced redirect or reward for purchasing is used. Tests verified real live source responses and isolated live/upcoming/finished/delayed fixtures, plus actual WebGL texture painting and continued runner gameplay on desktop and mobile.


Google Trends has been removed completely from the game feed and billboards, including its standalone endpoint and adapter. Matches, dated news and free-website prompts remain.

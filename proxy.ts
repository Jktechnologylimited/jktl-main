import { localRedirectTarget, resolveRedirect } from "./lib/seo/routing.mjs";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * Where the affiliate program actually lives.
 *
 * The program pays out on real signups and real subscriptions, and both of those
 * happen in the business app — it owns the accounts, the Paystack webhook and the
 * commission ledger. Running a second, competing affiliate program on the
 * marketing domain would mean two dashboards, two sets of numbers, and an
 * affiliate who cannot tell which one they are being paid from.
 *
 * So every affiliate path on this domain hands over. Both spellings are covered
 * because the marketing site's own links used the plural and the business app
 * uses the singular, and a visitor should not have to know which is which.
 */
const AFFILIATE_APP_ORIGIN =
  process.env.AFFILIATE_APP_ORIGIN || "https://business.jktl.com.ng";
/**
 * The business app's real path is plural.
 *
 * `jktl.com.ng/affiliate` is the singular spelling the programme is known by, so
 * the business app answers that too (it redirects to `/affiliates`). Pointing
 * this at `/affiliate` instead of `/affiliates` was the bug that made the signup
 * page "missing": every affiliate URL 404ed on arrival, because the singular path
 * existed nowhere.
 */
const AFFILIATE_APP_PATH = "/affiliates";

/** Paths on this domain that must NOT be handed over, if any ever need to stay. */
const AFFILIATE_LOCAL = new Set<string>();

/**
 * The old marketing paths, mapped onto the business app's real routes.
 *
 * This site's programme used different URLs: it applied at `/affiliates/join` and
 * had a multi-page dashboard under `/affiliates/dashboard/*`. The business app
 * applies at `/affiliates/apply` and has a single dashboard at `/affiliates`. A
 * blind prefix rewrite would send every existing link — including ones already
 * circulating in WhatsApp groups and email signatures — to a 404, which is the
 * same class of bug as the one this whole change fixes.
 *
 * Longest prefix wins, so ordering is by specificity rather than insertion.
 */
const AFFILIATE_PATH_MAP: Array<[RegExp, string]> = [
  [/^\/affiliates?\/join$/, "/affiliates/apply"],
  [/^\/affiliates?\/register$/, "/affiliates/apply"],
  [/^\/affiliates?\/signup$/, "/affiliates/apply"],
  // The dashboard was several pages; the business app's is one.
  [/^\/affiliates?\/dashboard(\/.*)?$/, "/affiliates"],
  // No pending screen exists in the business app — an applicant who is waiting
  // is told on the login page, so send them somewhere that says something.
  [/^\/affiliates?\/pending$/, "/affiliates/login"],
  // forgot-password and reset-password are NOT mapped: the business app now has
  // both, and the reset link carries a one-time token in the query string. A hop
  // that dropped it would produce a page that asks for a new password and then
  // refuses it.
];

function mapAffiliatePath(pathname: string): string | null {
  for (const [pattern, replacement] of AFFILIATE_PATH_MAP) {
    if (pattern.test(pathname)) return replacement;
  }
  return null;
}

/**
 * The programme's **landing page belongs on this site.**
 *
 * An earlier version redirected everything, including `/affiliates` itself, which
 * took the marketing page off the public web entirely — the one page whose whole
 * job is to recruit partners. This site is where people find things; the app is
 * where an approved partner works. Each keeps its own half:
 *
 *   jktl.com.ng/affiliates          → the landing page (here, indexed, public)
 *   jktl.com.ng/affiliates/join     → the application form (in the app, so the
 *                                     admin can approve it)
 *   jktl.com.ng/affiliates/login    → the partner sign-in (in the app, where the
 *                                     commissions and the dashboard are)
 *
 * Only the working parts leave. The pitch stays.
 */
function affiliateRedirect(req: NextRequest): NextResponse | null {
  const { pathname } = req.nextUrl;

  // The landing page, served here. A permanent move to itself would be a loop.
  if (pathname === "/affiliates") return null;

  // The singular spelling lands on the plural one, on this domain, so the
  // landing page still appears and nothing 404s.
  if (pathname === "/affiliate") {
    const url = req.nextUrl.clone();
    url.pathname = "/affiliates";
    return NextResponse.redirect(url, 308);
  }

  const match = /^\/affiliates?(\/.*)$/.exec(pathname);
  if (!match) return null;
  if (AFFILIATE_LOCAL.has(pathname)) return null;

  const mapped = mapAffiliatePath(pathname);
  const rest = match[1] ?? "";
  const target = new URL(
    mapped ?? `${AFFILIATE_APP_PATH}${rest}`,
    AFFILIATE_APP_ORIGIN,
  );
  // The query string carries referral codes and UTM tags, and losing it would
  // silently break attribution — the one thing an affiliate cares about.
  target.search = req.nextUrl.search;

  // 308 preserves the method and is cached, so this costs nothing per visit;
  // a permanent move, not a temporary one.
  return NextResponse.redirect(target, 308);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Checked before anything else, including the redirects table: an affiliate
  // link must never be intercepted by a stale CMS redirect.
  const affiliate = affiliateRedirect(req);
  if (affiliate) return affiliate;

  // Real redirect enforcement (Batch 14, Sheet 9) -- checked first, before
  // the existing auth/admin logic below. One lightweight indexed query per
  // matched navigation; a disclosed tradeoff for genuinely real redirects
  // rather than a UI that doesn't redirect anyone. Fails open on any DB
  // error so a redirects-table issue never takes the site down.
  if (
    process.env.DATABASE_URL &&
    !pathname.startsWith("/affiliate") &&
    !pathname.startsWith("/admin") &&
    !["/robots.txt", "/sitemap.xml"].includes(pathname)
  ) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`WITH RECURSIVE chain AS (
        SELECT from_path,to_path,status_code,ARRAY[from_path::text] AS visited,0 AS depth FROM redirects WHERE from_path=${pathname}
        UNION ALL
        SELECT r.from_path,r.to_path,r.status_code,c.visited||r.from_path::text,c.depth+1 FROM redirects r JOIN chain c ON r.from_path=split_part(split_part(c.to_path,'?',1),'#',1)
        WHERE c.depth<8 AND NOT r.from_path=ANY(c.visited)
      ) SELECT from_path,to_path,status_code FROM chain ORDER BY depth`;
      const configured = rows as {
        from_path: string;
        to_path: string;
        status_code: number;
      }[];
      const redirect = configured[0],
        target = redirect ? localRedirectTarget(redirect.to_path) : null;
      if (redirect && target && resolveRedirect(pathname, configured, false)) {
        sql`UPDATE redirects SET hit_count=hit_count+1 WHERE from_path=${pathname}`.catch(
          () => {},
        );
        const url = req.nextUrl.clone();
        url.pathname = target.pathname;
        for (const [key, value] of target.searchParams)
          url.searchParams.set(key, value);
        url.hash = target.hash;
        return NextResponse.redirect(
          url,
          redirect.status_code === 302 ? 302 : 301,
        );
      }
    } catch {
      // fall through to normal routing
    }
  }

  // No affiliate auth guards here any more. The dashboard, its sessions and its
  // cookie all live in the business app; every /affiliates sub-path has already
  // been handed over above, so there is nothing left on this domain to protect.

  // No admin gate here. This site has no /admin route — administration lives in
  // the business app at business.jktl.com.ng/admin — so the old gate protected
  // nothing, and its failure path redirected to /affiliates/login, which now
  // hands the visitor to a different domain.

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};

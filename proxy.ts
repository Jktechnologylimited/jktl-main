import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { verifyToken, COOKIE_NAME } from "@/lib/affiliate-auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Real redirect enforcement (Batch 14, Sheet 9) -- checked first, before
  // the existing auth/admin logic below. One lightweight indexed query per
  // matched navigation; a disclosed tradeoff for genuinely real redirects
  // rather than a UI that doesn't redirect anyone. Fails open on any DB
  // error so a redirects-table issue never takes the site down.
  if (process.env.DATABASE_URL && !pathname.startsWith("/affiliates") && !pathname.startsWith("/admin")) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      const rows = await sql`SELECT to_path, status_code FROM redirects WHERE from_path = ${pathname} LIMIT 1`;
      const redirect = rows[0] as { to_path: string; status_code: number } | undefined;
      if (redirect) {
        sql`UPDATE redirects SET hit_count = hit_count + 1 WHERE from_path = ${pathname}`.catch(() => {});
        const url = req.nextUrl.clone();
        url.pathname = redirect.to_path;
        return NextResponse.redirect(url, redirect.status_code === 302 ? 302 : 301);
      }
    } catch {
      // fall through to normal routing
    }
  }

  // Protect /affiliates/dashboard routes
  if (pathname.startsWith("/affiliates/dashboard")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.redirect(new URL("/affiliates/login", req.url));
    const session = verifyToken(token);
    if (!session) return NextResponse.redirect(new URL("/affiliates/login", req.url));
    if (session.status === "pending")  return NextResponse.redirect(new URL("/affiliates/pending", req.url));
    if (session.status === "rejected") return NextResponse.redirect(new URL("/affiliates/login?rejected=1", req.url));
  }

  // Protect /affiliates/pending
  if (pathname === "/affiliates/pending") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.redirect(new URL("/affiliates/login", req.url));
    const session = verifyToken(token);
    if (!session) return NextResponse.redirect(new URL("/affiliates/login", req.url));
    if (session.status === "active") return NextResponse.redirect(new URL("/affiliates/dashboard", req.url));
  }

  // Admin panel
  if (pathname.startsWith("/admin")) {
    const key = req.nextUrl.searchParams.get("key");
    if (key !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/affiliates/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)"],
};

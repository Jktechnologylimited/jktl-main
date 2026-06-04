import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/affiliate-auth";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
  matcher: ["/affiliates/dashboard/:path*", "/affiliates/pending", "/admin/:path*"],
};

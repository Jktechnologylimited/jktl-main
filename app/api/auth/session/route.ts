import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookies = req.cookies;

  const sessionCookie =
    cookies.get("jktl-session-token")?.value ||
    cookies.get("authjs.session-token")?.value ||
    cookies.get("next-auth.session-token")?.value ||
    cookies.get("__Secure-authjs.session-token")?.value ||
    cookies.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false });
  }

  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    return NextResponse.json({ authenticated: true, name: null, email: null, mode: "dev" });
  }

  try {
    const { jwtDecrypt } = await import("jose");
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtDecrypt(sessionCookie, key);

    // NextAuth stores user info in payload.user or at root level
    const user = (payload.user as Record<string,string>) || {};
    const name  = user.name  || (payload.name  as string) || null;
    const email = user.email || (payload.email as string) || null;

    return NextResponse.json({ authenticated: true, name, email });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

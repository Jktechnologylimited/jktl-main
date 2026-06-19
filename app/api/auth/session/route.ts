import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookies = req.cookies;

  // Check all possible NextAuth cookie names
  const sessionCookie =
    cookies.get("jktl-session-token")?.value ||
    cookies.get("authjs.session-token")?.value ||
    cookies.get("next-auth.session-token")?.value ||
    cookies.get("__Secure-authjs.session-token")?.value ||
    cookies.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false });
  }

  // Cookie exists -- try to decode it to get the user name
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    // Dev mode: no secret, trust cookie presence
    return NextResponse.json({ authenticated: true, name: null, email: null });
  }

  try {
    // NextAuth v5 (Auth.js) uses JWE encryption
    const { jwtDecrypt } = await import("jose");
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtDecrypt(sessionCookie, key);

    const token = payload as Record<string, unknown>;
    const name  = (token.name  as string) || null;
    const email = (token.email as string) || null;

    return NextResponse.json({ authenticated: true, name, email });
  } catch {
    // Decryption failed -- but cookie exists
    // This can happen if AUTH_SECRET differs between projects
    // Still return authenticated:true so the user isn't stuck in a loop
    // The worst case is we show "My Account" without a name
    return NextResponse.json({ authenticated: true, name: null, email: null, note: "decoded-failed" });
  }
}

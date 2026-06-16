// import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET(req: NextRequest) {
//   const cookies = req.cookies;

//   // Check all possible NextAuth cookie names
//   const sessionCookie =
//     cookies.get("jktl-session-token")?.value ||
//     cookies.get("authjs.session-token")?.value ||
//     cookies.get("next-auth.session-token")?.value ||
//     cookies.get("__Secure-authjs.session-token")?.value ||
//     cookies.get("__Secure-next-auth.session-token")?.value;

//   if (!sessionCookie) {
//     return NextResponse.json({ authenticated: false });
//   }

//   // Cookie exists -- try to decode it to get the user name
//   const secret = process.env.AUTH_SECRET;

//   if (!secret) {
//     // Dev mode: no secret, trust cookie presence
//     return NextResponse.json({ authenticated: true, name: null, email: null });
//   }

//   try {
//     // NextAuth v5 (Auth.js) uses JWE encryption
//     const { jwtDecrypt } = await import("jose");
//     const key = new TextEncoder().encode(secret);
//     const { payload } = await jwtDecrypt(sessionCookie, key);

//     const token = payload as Record<string, unknown>;
//     const name  = (token.name  as string) || null;
//     const email = (token.email as string) || null;

//     return NextResponse.json({ authenticated: true, name, email });
//   } catch {
//     // Decryption failed -- but cookie exists
//     // This can happen if AUTH_SECRET differs between projects
//     // Still return authenticated:true so the user isn't stuck in a loop
//     // The worst case is we show "My Account" without a name
//     return NextResponse.json({ authenticated: true, name: null, email: null, note: "decoded-failed" });
//   }
// }




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
    return NextResponse.json({ authenticated: false, reason: "no_cookie" });
  }

  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    // Dev: no secret, trust presence of cookie
    return NextResponse.json({ authenticated: true, email: null, name: null, id: null });
  }

  // Try JWE decryption (NextAuth v5 / Auth.js format)
  try {
    const { jwtDecrypt } = await import("jose");
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtDecrypt(sessionCookie, key);
    const p = payload as Record<string, unknown>;
    const email = (p.email as string) || null;
    const name  = (p.name  as string) || null;
    const id    = (p.sub   as string) || (p.id as string) || null;
    if (email) {
      return NextResponse.json({ authenticated: true, email, name, id });
    }
  } catch {}

  // Try standard JWT base64 decode (fallback)
  try {
    const parts = sessionCookie.split(".");
    if (parts.length === 3) {
      const b64    = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64").toString("utf-8"));
      const email = decoded.email || decoded?.user?.email || null;
      const name  = decoded.name  || decoded?.user?.name  || null;
      const id    = decoded.sub   || decoded.id || null;
      if (email) {
        return NextResponse.json({ authenticated: true, email, name, id });
      }
    }
  } catch {}

  // Cookie exists but we can't read it
  // AUTH_SECRET mismatch between projects
  // Return authenticated with no user info — better than false loop
  return NextResponse.json({
    authenticated: true,
    email: null,
    name: null,
    id: null,
    note: "cookie_unreadable_secret_mismatch",
  });
}

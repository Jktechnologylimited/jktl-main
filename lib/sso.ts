import { decode } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// The accounts app (accounts.jktl.com.ng) issues a NextAuth v5 JWE session
// cookie named "jktl-session-token" on domain ".jktl.com.ng", so it is shared
// across every *.jktl.com.ng app. NextAuth derives the encryption key from
// AUTH_SECRET via HKDF using the cookie name as salt — so we must decode with
// NextAuth's own decoder and the SAME AUTH_SECRET, not the raw secret.

const SALT = "jktl-session-token";
const COOKIE_NAMES = [
  "jktl-session-token",
  "__Secure-jktl-session-token",
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

export interface SsoSession {
  email: string;
  name: string | null;
  id: string | null;
  emailVerified: boolean;
}

export async function getSsoSession(req: NextRequest): Promise<SsoSession | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  let raw: string | undefined;
  for (const n of COOKIE_NAMES) {
    raw = req.cookies.get(n)?.value;
    if (raw) break;
  }
  if (!raw) return null;

  try {
    const p = (await decode({ token: raw, secret, salt: SALT })) as Record<string, unknown> | null;
    const email = (p?.email as string) || ((p?.user as Record<string, string>)?.email) || null;
    if (!email) return null;
    return {
      email,
      name: (p?.name as string) || null,
      id: (p?.id as string) || (p?.sub as string) || null,
      emailVerified: Boolean(p?.emailVerified ?? false),
    };
  } catch {
    return null;
  }
}

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "jktl-affiliate-secret-change-in-production";
const COOKIE_NAME = "jktl_affiliate_token";

export interface AffiliatePayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  referralCode: string;
  tier: string;
  status: string;
}

export function signToken(payload: AffiliatePayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): AffiliatePayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AffiliatePayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AffiliatePayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function generateReferralCode(firstName: string, lastName: string): string {
  const base = (firstName.slice(0, 2) + lastName.slice(0, 2)).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base}${rand}`;
}

export const COOKIE_NAME_EXPORT = COOKIE_NAME;

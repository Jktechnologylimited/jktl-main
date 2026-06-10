import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/lib/affiliate-db";
import DashboardShell from "./DashboardShell";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

async function getAffiliateFromSession() {
  // Read the JKTL session cookie
  const cookieStore = await cookies();
  const sessionCookie =
    cookieStore.get("jktl-session-token")?.value ||
    cookieStore.get("authjs.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-authjs.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie) return null;

  // Decode the JWT to get the email
  let email: string | null = null;
  try {
    const secret = process.env.AUTH_SECRET;
    if (secret) {
      const { jwtDecrypt } = await import("jose");
      const key = new TextEncoder().encode(secret);
      const { payload } = await jwtDecrypt(sessionCookie, key);
      email = (payload.email as string) || null;
    }
  } catch {
    return null;
  }

  if (!email || !sql) return null;

  // Look up affiliate record by email
  try {
    const rows = await sql`SELECT * FROM affiliates WHERE email = ${email} LIMIT 1`;
    return rows[0] || null;
  } catch {
    return null;
  }
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const affiliate = await getAffiliateFromSession();

  // Not signed in to JKTL at all
  if (!affiliate) {
    const returnUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL || "https://jktl.com.ng"}/affiliates/dashboard`);
    redirect(`${ACCOUNTS_URL}/sign-in?return=${returnUrl}`);
  }

  // Signed in but affiliate application pending or rejected
  if (affiliate.status === "pending") redirect("/affiliates/pending");
  if (affiliate.status === "rejected") redirect("/affiliates?rejected=1");

  return (
    <DashboardShell session={{
      firstName: affiliate.first_name as string,
      lastName:  affiliate.last_name  as string,
      email:     affiliate.email      as string,
      referralCode: affiliate.referral_code as string,
      tier:      affiliate.tier       as string,
    }}>
      {children}
    </DashboardShell>
  );
}

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const RESERVED = [
  "www","admin","api","mail","smtp","ftp","cdn","static","assets",
  "app","portal","dashboard","billing","support","help","blog",
  "faithdesk","detaildesk","schooldesk","desk","jktl","affiliate",
];

export async function GET(req: NextRequest) {
  const sub = req.nextUrl.searchParams.get("sub")?.toLowerCase().trim();
  const product = req.nextUrl.searchParams.get("product") || "faithdesk";

  if (!sub) return NextResponse.json({ available: false, error: "No subdomain provided" });

  // Validate format
  if (!/^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/.test(sub)) {
    return NextResponse.json({
      available: false,
      error: "Use only lowercase letters, numbers, and hyphens (3-32 chars)",
    });
  }

  if (RESERVED.includes(sub)) {
    return NextResponse.json({ available: false, error: "That subdomain is reserved" });
  }

  // Check against DB if available
  if (process.env.DATABASE_URL) {
    try {
      const { sql } = await import("@/lib/db");
      const rows = await sql`SELECT id FROM organisations WHERE subdomain = ${sub} LIMIT 1`;
      if (rows.length > 0) {
        return NextResponse.json({ available: false, error: "Already taken — try another" });
      }
    } catch {
      // DB not available — skip check
    }
  }

  // Simulate a small delay for realism
  return NextResponse.json({ available: true, subdomain: sub });
}

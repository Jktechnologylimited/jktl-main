import { NextRequest, NextResponse } from "next/server";
import { sql, getAffiliateByCode } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  try {
    const { code, page, campaign } = await req.json();
    if (!code) return NextResponse.json({ ok: false });

    const affiliate = await getAffiliateByCode(code);
    if (!affiliate || affiliate.status !== "active") return NextResponse.json({ ok: false });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const ua = req.headers.get("user-agent") || "unknown";

    await sql`
      INSERT INTO referral_clicks (affiliate_id, ip_address, user_agent, landing_page, campaign)
      VALUES (${affiliate.id}, ${ip}, ${ua.slice(0, 200)}, ${page || "/"}, ${campaign || null})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false });
  }
}

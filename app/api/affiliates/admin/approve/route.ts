import { NextRequest, NextResponse } from "next/server";
import { sql, getAffiliateById } from "@/lib/affiliate-db";
import { sendApprovalEmail } from "@/lib/affiliate-auth";

export const dynamic = "force-dynamic";


function checkAdmin(req: NextRequest) {
  const key = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key");
  return key === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await sql`UPDATE affiliates SET status = 'active', updated_at = NOW() WHERE id = ${id}`;

  const affiliate = await getAffiliateById(id);
  if (affiliate) {
    await sendApprovalEmail(affiliate.email, affiliate.first_name).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}

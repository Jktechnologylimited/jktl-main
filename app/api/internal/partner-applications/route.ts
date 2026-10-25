import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const secret = process.env.JKTL_PARTNER_BRIDGE_SECRET;
  if (!secret || secret.length < 32)
    return NextResponse.json(
      { error: "Partner bridge is not configured" },
      { status: 503, headers },
    );
  const supplied = Buffer.from(request.headers.get("authorization") || ""),
    expected = Buffer.from("Bearer " + secret);
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers },
    );
  if (!sql)
    return NextResponse.json(
      { error: "Inquiry storage unavailable" },
      { status: 503, headers },
    );
  try {
    const applications =
      await sql`SELECT id::text AS id,name,email,business_name,message,meta,created_at FROM service_inquiries WHERE source='partner-programme' AND meta->>'consent'='true' ORDER BY created_at DESC LIMIT 200`;
    return NextResponse.json({ applications }, { headers });
  } catch {
    return NextResponse.json(
      { error: "Inquiry storage unavailable" },
      { status: 503, headers },
    );
  }
}

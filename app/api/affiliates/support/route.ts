import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { sql } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { subject, message } = await req.json();
  if (!subject || !message) return NextResponse.json({ error: "Subject and message required" }, { status: 400 });

  await sql`
    INSERT INTO support_tickets (affiliate_id, subject, message)
    VALUES (${session.id}, ${subject}, ${message})
  `;

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tickets = await sql`
    SELECT * FROM support_tickets WHERE affiliate_id = ${session.id} ORDER BY created_at DESC
  `;
  return NextResponse.json({ tickets });
}

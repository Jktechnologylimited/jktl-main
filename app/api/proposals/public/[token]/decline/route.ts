import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  const { token } = await params;

  const rows = await sql`SELECT id, status FROM proposals WHERE access_token = ${token} LIMIT 1`;
  const proposal = rows[0];
  if (!proposal) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  if (proposal.status !== "sent") return NextResponse.json({ error: "This proposal can no longer be responded to" }, { status: 400 });

  const b = await req.json().catch(() => ({}));
  await sql`UPDATE proposals SET status = 'declined', declined_at = NOW(), decline_reason = ${b.reason || null}, updated_at = NOW() WHERE id = ${proposal.id}`;
  return NextResponse.json({ ok: true });
}

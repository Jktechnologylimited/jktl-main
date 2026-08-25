import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// POST /api/proposals/public/[token]/accept { acceptedByName } -- no auth,
// same token-as-access-control model as the GET route.
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  const { token } = await params;

  const rows = await sql`SELECT id, status, request_acceptance, expiry_date FROM proposals WHERE access_token = ${token} LIMIT 1`;
  const proposal = rows[0];
  if (!proposal) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  if (proposal.status !== "sent") return NextResponse.json({ error: "This proposal can no longer be accepted" }, { status: 400 });
  if (!proposal.request_acceptance) return NextResponse.json({ error: "This proposal doesn't accept online approval" }, { status: 400 });
  if (proposal.expiry_date && new Date(proposal.expiry_date) < new Date()) {
    return NextResponse.json({ error: "This proposal has expired" }, { status: 400 });
  }

  const b = await req.json().catch(() => ({}));
  const acceptedByName = (b.acceptedByName || "").trim();
  if (!acceptedByName) return NextResponse.json({ error: "Your name is required" }, { status: 400 });

  await sql`UPDATE proposals SET status = 'accepted', accepted_at = NOW(), accepted_by_name = ${acceptedByName}, updated_at = NOW() WHERE id = ${proposal.id}`;
  return NextResponse.json({ ok: true });
}

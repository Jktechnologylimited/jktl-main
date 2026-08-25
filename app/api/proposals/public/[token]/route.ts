import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/proposals/public/[token] -- no auth. The token itself is the
// access control (long, random, unguessable, generated in jktl-admin at
// send time). Never exposes internal-only fields (notes_internal,
// owner_staff_id, prepared_by_staff_id).
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  const { token } = await params;

  const rows = await sql`
    SELECT proposal_number, customer_name, contact_name, name, currency, valid_until,
           line_items, client_note, subtotal, discount_total, tax_pct, total,
           deliverables, start_date, duration_weeks, end_date, payment_terms, maintenance_terms,
           status, sent_at, request_acceptance, expiry_date, accepted_at, accepted_by_name,
           declined_at, decline_reason, created_at
    FROM proposals WHERE access_token = ${token} LIMIT 1
  `;
  const proposal = rows[0];
  if (!proposal) return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  if (proposal.status === "draft") return NextResponse.json({ error: "This proposal hasn't been sent yet" }, { status: 404 });

  return NextResponse.json({ proposal });
}

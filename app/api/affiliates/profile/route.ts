import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { sql } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { firstName, lastName, phone, businessName, bankName, bankAccount, bankHolder } = await req.json();

  await sql`
    UPDATE affiliates SET
      first_name    = COALESCE(${firstName || null},    first_name),
      last_name     = COALESCE(${lastName || null},     last_name),
      phone         = COALESCE(${phone || null},        phone),
      business_name = COALESCE(${businessName || null}, business_name),
      bank_name     = COALESCE(${bankName || null},     bank_name),
      bank_account  = COALESCE(${bankAccount || null},  bank_account),
      bank_holder   = COALESCE(${bankHolder || null},   bank_holder),
      updated_at    = NOW()
    WHERE id = ${session.id}
  `;

  return NextResponse.json({ ok: true });
}

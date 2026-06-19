import { NextResponse } from "next/server";
import { getAgencyServices } from "@/lib/content";

export const dynamic = "force-dynamic";

// GET /api/agency-services — public list (DB-first, static fallback)
export async function GET() {
  const services = await getAgencyServices();
  return NextResponse.json({ services });
}

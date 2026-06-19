import { NextResponse } from "next/server";
import { getDeskProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

// GET /api/desk-products — public list (DB-first, static fallback)
export async function GET() {
  const products = await getDeskProducts();
  return NextResponse.json({ products });
}

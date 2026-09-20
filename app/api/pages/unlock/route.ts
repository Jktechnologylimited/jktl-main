import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  try {
    const { pageId, password } = await req.json();
    if (!pageId || !password) return NextResponse.json({ error: "Password is required" }, { status: 400 });
    const rows = await sql`SELECT password_protected FROM pages WHERE id = ${pageId} LIMIT 1`;
    const page = rows[0];
    if (!page || !page.password_protected) return NextResponse.json({ error: "Page not found" }, { status: 404 });
    if (page.password_protected !== password) return NextResponse.json({ error: "Incorrect password" }, { status: 401 });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(`page-unlock-${pageId}`, "1", { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24, path: "/" });
    return res;
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

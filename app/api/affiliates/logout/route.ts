import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/affiliate-auth";

export const dynamic = "force-dynamic";

function clear(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}

export async function POST() {
  return clear(NextResponse.json({ ok: true }));
}

// GET so a plain link can log out and land on the affiliate login page.
export async function GET(req: NextRequest) {
  return clear(NextResponse.redirect(new URL("/affiliates/login", req.url)));
}

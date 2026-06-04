import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: Connect to Neon DB and/or send email via Resend
    // For now logs the inquiry and returns success
    console.log("New inquiry:", body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

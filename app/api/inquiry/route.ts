import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

// POST /api/inquiry — main "Get started / services" enquiry form.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b.name || !b.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const known = ["name", "email", "phone", "businessName", "service", "budget", "timeline", "description", "message"];
    const extra: Record<string, unknown> = {};
    for (const k of Object.keys(b)) if (!known.includes(k)) extra[k] = b[k];

    const saved = await saveInquiry({
      name: b.name, email: b.email, phone: b.phone, businessName: b.businessName,
      service: b.service, budget: b.budget, timeline: b.timeline,
      message: b.description || b.message, source: "services-inquiry", meta: extra,
    });
    if (!saved) return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
    return NextResponse.json({ ok: true, success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

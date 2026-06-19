import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

// POST /api/contact — contact page enquiry.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const { name, email, challenge } = b;
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const known = ["name", "email", "phone", "businessName", "company", "challenge", "message", "type"];
    const extra: Record<string, unknown> = {};
    for (const k of Object.keys(b)) if (!known.includes(k)) extra[k] = b[k];
    if (b.type) extra.type = b.type;

    const saved = await saveInquiry({
      name, email, phone: b.phone, businessName: b.businessName || b.company,
      service: b.type || "", message: challenge || b.message, source: "contact", meta: extra,
    });
    if (!saved) return NextResponse.json({ error: "Server error" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

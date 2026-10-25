import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
const specialties = [
  "Website developer",
  "Digital marketing agency",
  "Business consultant",
  "CAC registration agent",
  "Other business professional",
];
export async function POST(req: NextRequest) {
  try {
    if (
      !req.headers.get("origin") ||
      new URL(req.headers.get("origin")!).host !== req.headers.get("host")
    )
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    const raw = await req.text();
    if (raw.length > 8000)
      return NextResponse.json({ error: "Too large" }, { status: 413 });
    let b;
    try {
      b = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (!b || typeof b !== "object")
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    const valid = (v: unknown, max: number) =>
      typeof v === "string" && v.trim().length > 0 && v.length <= max;
    if (
      !valid(b.name, 120) ||
      !valid(b.email, 200) ||
      !/^\S+@\S+\.\S+$/.test(b.email) ||
      !valid(b.company, 180) ||
      !valid(b.message, 2000) ||
      !specialties.includes(b.specialism) ||
      !Number.isInteger(Number(b.clients)) ||
      Number(b.clients) < 1 ||
      Number(b.clients) > 10000 ||
      b.consent !== "yes"
    )
      return NextResponse.json(
        { error: "Please complete the application" },
        { status: 400 },
      );
    const ok = await saveInquiry({
      name: b.name.trim(),
      email: b.email.trim(),
      businessName: b.company.trim(),
      service: "JKTL Partners application",
      message: b.message.trim(),
      source: "partner-programme",
      meta: {
        specialism: b.specialism,
        clientsPerMonth: Number(b.clients),
        status: "pending-review",
        agreement: "required-before-activation",
        consent: true,
      },
    });
    if (!ok)
      return NextResponse.json(
        { error: "Could not save application" },
        { status: 503 },
      );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Could not save application" },
      { status: 503 },
    );
  }
}

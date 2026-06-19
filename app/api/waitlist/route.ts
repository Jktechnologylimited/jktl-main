import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { product, email, phone, school } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    if (process.env.DATABASE_URL) {
      const { sql } = await import("@/lib/db");
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          product TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          school_name TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;
      await sql`
        INSERT INTO waitlist (product, email, phone, school_name)
        VALUES (${product}, ${email}, ${phone || null}, ${school || null})
        ON CONFLICT DO NOTHING
      `;
    }

    // Mirror into the Command Centre so all leads land in one place
    const { saveInquiry } = await import("@/lib/inquiries");
    await saveInquiry({
      email, phone, businessName: school, service: product,
      message: `Waitlist signup for ${product}`, source: "waitlist",
      meta: { product, school },
    });

    // Notify via Resend
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "JKTL System <noreply@jktl.com.ng>",
          to: ["info@jktl.com.ng"],
          subject: `New ${product} waitlist signup: ${email}`,
          html: `<p><strong>Product:</strong> ${product}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "Not provided"}</p><p><strong>School:</strong> ${school || "Not provided"}</p>`,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
import { sendMainMail } from "@/lib/mail";
import { escapeHtml } from "@/lib/mail-layout";
import { templateSupportRequest } from "@/lib/template-support-request";

export const dynamic = "force-dynamic";

// POST /api/contact — contact page enquiry.
export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get("content-length") || 0) > 32_000)
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const raw = await req.text();
    if (raw.length > 32_000)
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const b = JSON.parse(raw);
    if (b?.type === "template-support") {
      const origin = req.headers.get("origin");
      if (
        origin &&
        ![
          new URL(req.url).origin,
          "https://jktl.com.ng",
          "https://www.jktl.com.ng",
        ].includes(origin)
      )
        return NextResponse.json(
          { error: "Request not allowed" },
          { status: 403 },
        );
      const inquiry = templateSupportRequest(b);
      if (!inquiry)
        return NextResponse.json(
          { error: "Check your name, email and template support details." },
          { status: 400 },
        );
      const saved = await saveInquiry(inquiry);
      if (!saved)
        return NextResponse.json(
          {
            error:
              "Your request could not be saved. Please try again or contact JKTL directly.",
          },
          { status: 503 },
        );
      let notified = false;
      try {
        const notification = await sendMainMail({
          to: ["info@jktl.com.ng"],
          subject: "Free template support request",
          category: "internal",
          html: `<p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></p><p><strong>Template:</strong> ${escapeHtml(inquiry.meta.templateName || "Gallery enquiry")}</p><p><a href="https://jktl.com.ng${escapeHtml(inquiry.meta.page)}">Open template context</a></p><p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>${inquiry.meta.chat.map((item) => `<p><strong>${escapeHtml(item.from)}:</strong> ${escapeHtml(item.text).replace(/\n/g, "<br>")}</p>`).join("")}`,
        });
        notified = notification?.ok === true;
      } catch {}
      return NextResponse.json({ success: true, notified });
    }
    const { name, email, challenge } = b;
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }
    const known = [
      "name",
      "email",
      "phone",
      "businessName",
      "company",
      "challenge",
      "message",
      "type",
    ];
    const extra: Record<string, unknown> = {};
    for (const k of Object.keys(b)) if (!known.includes(k)) extra[k] = b[k];
    if (b.type) extra.type = b.type;

    const saved = await saveInquiry({
      name,
      email,
      phone: b.phone,
      businessName: b.businessName || b.company,
      service: b.type || "",
      message: challenge || b.message,
      source: "contact",
      meta: extra,
    });
    if (!saved)
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

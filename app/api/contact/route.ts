import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, challenge } = body;

    if (!name || !email || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // -- Resend (uncomment after adding RESEND_API_KEY to .env.local) ---------
    //
    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "noreply@jktl.com.ng",
    //   to: "info@jktl.com.ng",
    //   subject: `New enquiry -- ${body.type || "Business"} | ${name}`,
    //   text: Object.entries(body).map(([k,v]) => `${k}: ${v}`).join("\n"),
    // });

    console.log("New enquiry:", { ...body, receivedAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY || "";
    const signature = req.headers.get("x-paystack-signature") || "";
    const body = await req.text();

    // Verify webhook signature
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, metadata, customer } = event.data;
      const orgId = metadata?.orgId;
      const product = metadata?.product;
      const plan = metadata?.plan;
      const subdomain = metadata?.subdomain;
      const orgName = metadata?.orgName;
      const email = customer?.email;

      if (!orgId || !process.env.DATABASE_URL) {
        return NextResponse.json({ ok: true });
      }

      const { sql } = await import("@/lib/db");

      // Activate the organisation
      await sql`
        UPDATE organisations
        SET status = 'active', activated_at = NOW(), paystack_ref = ${reference}
        WHERE id = ${orgId}
      `;

      // Send welcome email via Resend
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey && email) {
        const productName = product === "faithdesk" ? "FaithDesk" : product === "detaildesk" ? "DetailDesk" : "SchoolDesk";
        const adminUrl = `https://admin.${subdomain}.jktl.com.ng`;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "JK Technology Limited <noreply@jktl.com.ng>",
            to: [email],
            subject: `Welcome to ${productName} -- Your system is being set up`,
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
                <h2 style="color:#060E2A;">Welcome to ${productName}!</h2>
                <p>Your payment was successful. Your ${productName} system for <strong>${orgName}</strong> is being set up.</p>
                <p><strong>Your subdomain:</strong> ${subdomain}.jktl.com.ng</p>
                <p>You will receive your login credentials within 24 hours at this email address.</p>
                <div style="margin:24px 0;padding:16px;background:#F9F7F0;border-left:3px solid #C9A84C;">
                  <p style="margin:0;font-size:13px;color:#666;">
                    <strong>Next steps:</strong><br/>
                    1. We will configure your system with your branding<br/>
                    2. You will receive login credentials by email<br/>
                    3. We will schedule a 30-minute onboarding call
                  </p>
                </div>
                <p>Questions? Reply to this email or contact us at <a href="mailto:info@jktl.com.ng">info@jktl.com.ng</a></p>
                <p style="color:#999;font-size:12px;">JK Technology Limited &mdash; jktl.com.ng</p>
              </div>
            `,
          }),
        });

        // Also notify JKTL owner
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "JKTL System <noreply@jktl.com.ng>",
            to: ["info@jktl.com.ng"],
            subject: `New ${productName} signup: ${orgName}`,
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
                <h2>New Client Signup</h2>
                <p><strong>Product:</strong> ${productName}</p>
                <p><strong>Plan:</strong> ${plan}</p>
                <p><strong>Organisation:</strong> ${orgName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subdomain:</strong> ${subdomain}.jktl.com.ng</p>
                <p><strong>Paystack ref:</strong> ${reference}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin?key=${process.env.ADMIN_PASSWORD}" style="display:inline-block;background:#060E2A;color:#C9A84C;padding:12px 24px;text-decoration:none;border-radius:2px;margin-top:16px;">
                  View in Command Centre
                </a>
              </div>
            `,
          }),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

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

      // Auto-provision SchoolDesk tenants: create DB, seed admin + branding, apply tier, activate.
      let provision: { ok?: boolean; tempPassword?: string; adminEmail?: string; error?: string } | null = null;
      if (product === "schooldesk") {
        const ADMIN = process.env.SCHOOLDESK_ADMIN_URL;
        const SECRET = process.env.PROVISION_SECRET;
        if (ADMIN && SECRET) {
          try {
            const pr = await fetch(`${ADMIN}/api/provision`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-provision-secret": SECRET },
              body: JSON.stringify({ orgId }),
            });
            provision = await pr.json().catch(() => null);
            if (!pr.ok) console.error("[provision] failed:", provision);
          } catch (err) {
            console.error("[provision] call error:", err);
            provision = { ok: false, error: String(err) };
          }
        } else {
          console.warn("[provision] SCHOOLDESK_ADMIN_URL / PROVISION_SECRET not set; skipping auto-provision");
        }
      }

      // Send welcome email via Resend
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey && email) {
        const productName = product === "faithdesk" ? "FaithDesk" : product === "detaildesk" ? "DetailDesk" : "SchoolDesk";
        const adminUrl = `https://admin.${subdomain}.jktl.com.ng`;
        const provisioned = !!(provision && provision.ok);
        const loginInfoHtml = provisioned && provision?.tempPassword
          ? `<div style="margin:24px 0;padding:16px;background:#F9F7F0;border-left:3px solid #C9A84C;">
               <p style="margin:0 0 8px;"><strong>Your admin login is ready:</strong></p>
               <p style="margin:0;font-size:14px;">Admin URL: <a href="${adminUrl}">${adminUrl}</a><br/>
               Email: <strong>${provision?.adminEmail || email}</strong><br/>
               Temporary password: <strong>${provision?.tempPassword}</strong></p>
               <p style="margin:8px 0 0;font-size:12px;color:#666;">Please log in and change your password right away.</p>
             </div>`
          : `<div style="margin:24px 0;padding:16px;background:#F9F7F0;border-left:3px solid #C9A84C;">
               <p style="margin:0;font-size:13px;color:#666;"><strong>Next steps:</strong><br/>
               1. We are configuring your system with your branding<br/>
               2. You will receive login credentials by email shortly<br/>
               3. We will schedule a 30-minute onboarding call</p>
             </div>`;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "JK Technology Limited <noreply@mail.ibiz.name.ng>",
            to: [email],
            subject: `Welcome to ${productName} -- Your system is being set up`,
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
                <h2 style="color:#060E2A;">Welcome to ${productName}!</h2>
                <p>Your payment was successful. Your ${productName} system for <strong>${orgName}</strong> is being set up.</p>
                <p><strong>Your subdomain:</strong> ${subdomain}.jktl.com.ng</p>
                ${loginInfoHtml}
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
            from: "JKTL System <noreply@mail.ibiz.name.ng>",
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

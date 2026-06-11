const FROM = "JK Technology Limited <verify-accounts-jktl@mail.ibiz.name.ng>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jktl.com.ng";
const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.jktl.com.ng";

export async function sendAffiliateEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[DEV] Affiliate email to ${to}: ${subject}`);
    return;
  }
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  }).catch(err => console.error("Resend error:", err));
}

export async function sendApplicationReceived(email: string, firstName: string) {
  await sendAffiliateEmail(email,
    "Your JKTL Affiliate Application Has Been Received",
    `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#060E2A;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
    <div style="max-width:520px;margin:40px auto;padding:0 20px;">
      <div style="background:#0B1640;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
        <div style="background:#060E2A;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-family:monospace;font-size:11px;color:#C9A84C;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px;">JK Technology Limited</p>
          <p style="font-size:12px;color:rgba(226,232,240,0.4);margin:0;">Affiliate Programme</p>
        </div>
        <div style="padding:32px;">
          <h2 style="font-size:20px;font-weight:700;color:#fff;margin:0 0 12px;">Application Received, ${firstName}!</h2>
          <p style="font-size:15px;color:rgba(226,232,240,0.6);margin:0 0 20px;line-height:1.6;">
            Thank you for applying to the JKTL Affiliate Programme. We have received your application and will review it within 24-48 hours.
          </p>
          <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:16px 20px;margin-bottom:20px;">
            <p style="font-size:13px;color:#C9A84C;font-weight:700;margin:0 0 8px;">What happens next?</p>
            <p style="font-size:13px;color:rgba(226,232,240,0.6);margin:0;line-height:1.6;">
              1. We review your application (24-48 hrs)<br/>
              2. You receive an approval or feedback email<br/>
              3. Once approved, access your dashboard and start earning
            </p>
          </div>
          <p style="font-size:12px;color:rgba(226,232,240,0.3);margin:0;">
            Questions? Email us at <a href="mailto:info@jktl.com.ng" style="color:#C9A84C;">info@jktl.com.ng</a>
          </p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-size:11px;color:rgba(226,232,240,0.2);margin:0;">JK Technology Limited -- CAC RC-8754824 -- jktl.com.ng</p>
        </div>
      </div>
    </div></body></html>`
  );
}

export async function sendApplicationApproved(email: string, firstName: string, referralCode: string) {
  await sendAffiliateEmail(email,
    "Congratulations -- Your JKTL Affiliate Application is Approved!",
    `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#060E2A;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
    <div style="max-width:520px;margin:40px auto;padding:0 20px;">
      <div style="background:#0B1640;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
        <div style="background:#060E2A;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-family:monospace;font-size:11px;color:#C9A84C;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px;">JK Technology Limited</p>
          <p style="font-size:12px;color:rgba(226,232,240,0.4);margin:0;">Affiliate Programme</p>
        </div>
        <div style="padding:32px;">
          <div style="width:56px;height:56px;border-radius:50%;background:rgba(16,185,129,0.15);border:2px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;text-align:center;">
            <span style="font-size:24px;line-height:56px;">&#10003;</span>
          </div>
          <h2 style="font-size:20px;font-weight:700;color:#fff;margin:0 0 12px;text-align:center;">You are Approved, ${firstName}!</h2>
          <p style="font-size:15px;color:rgba(226,232,240,0.6);margin:0 0 24px;line-height:1.6;text-align:center;">
            Welcome to the JKTL Affiliate Programme. You can now start earning by referring businesses to our Desk products.
          </p>
          <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="font-size:11px;font-family:monospace;color:rgba(226,232,240,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Your Referral Code</p>
            <p style="font-size:22px;font-weight:700;color:#C9A84C;font-family:monospace;margin:0;">${referralCode}</p>
          </div>
          <div style="margin-bottom:24px;">
            <p style="font-size:13px;color:rgba(226,232,240,0.5);margin:0 0 6px;">Your referral link:</p>
            <p style="font-size:12px;font-family:monospace;color:#C9A84C;word-break:break-all;margin:0;">${APP_URL}/affiliates/join?ref=${referralCode}</p>
          </div>
          <a href="${APP_URL}/affiliates/dashboard"
            style="display:block;background:#C9A84C;color:#060E2A;font-weight:700;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;text-align:center;">
            Go to My Dashboard
          </a>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-size:11px;color:rgba(226,232,240,0.2);margin:0;">JK Technology Limited -- CAC RC-8754824 -- jktl.com.ng</p>
        </div>
      </div>
    </div></body></html>`
  );
}

export async function sendApplicationRejected(email: string, firstName: string) {
  await sendAffiliateEmail(email,
    "Update on Your JKTL Affiliate Application",
    `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#060E2A;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
    <div style="max-width:520px;margin:40px auto;padding:0 20px;">
      <div style="background:#0B1640;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
        <div style="background:#060E2A;padding:24px 32px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-family:monospace;font-size:11px;color:#C9A84C;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 4px;">JK Technology Limited</p>
          <p style="font-size:12px;color:rgba(226,232,240,0.4);margin:0;">Affiliate Programme</p>
        </div>
        <div style="padding:32px;">
          <h2 style="font-size:20px;font-weight:700;color:#fff;margin:0 0 12px;">Hi ${firstName},</h2>
          <p style="font-size:15px;color:rgba(226,232,240,0.6);margin:0 0 20px;line-height:1.6;">
            Thank you for applying to the JKTL Affiliate Programme. After reviewing your application, we are unable to approve it at this time.
          </p>
          <p style="font-size:14px;color:rgba(226,232,240,0.5);margin:0 0 20px;line-height:1.6;">
            If you believe this is an error, or would like to provide more information about how you plan to promote our products, please reach out to us directly.
          </p>
          <a href="mailto:info@jktl.com.ng"
            style="display:block;background:rgba(255,255,255,0.06);color:rgba(226,232,240,0.8);font-weight:600;font-size:13px;text-decoration:none;padding:14px 32px;border-radius:8px;text-align:center;border:1px solid rgba(255,255,255,0.1);">
            Contact Us at info@jktl.com.ng
          </a>
        </div>
        <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="font-size:11px;color:rgba(226,232,240,0.2);margin:0;">JK Technology Limited -- CAC RC-8754824 -- jktl.com.ng</p>
        </div>
      </div>
    </div></body></html>`
  );
}

export async function notifyAdminNewApplication(firstName: string, lastName: string, email: string, howPromote: string) {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || "info@jktl.com.ng";
  await sendAffiliateEmail(adminEmail,
    `New Affiliate Application: ${firstName} ${lastName}`,
    `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">
      <h2 style="color:#060E2A;">New Affiliate Application</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${firstName} ${lastName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;">${email}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top;">Plan</td><td style="padding:8px 0;line-height:1.5;">${howPromote}</td></tr>
      </table>
      <a href="${ADMIN_URL}/dashboard/affiliates"
        style="display:inline-block;margin-top:20px;background:#C9A84C;color:#060E2A;font-weight:700;padding:12px 28px;text-decoration:none;border-radius:6px;">
        Review in Command Centre
      </a>
    </div>`
  );
}

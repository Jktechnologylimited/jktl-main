import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST /api/payments/checkout -- the simple "pay us" page's backend. No
// invoice lookup, no catalog involved: the amount was agreed offline
// (phone/email/in person), staff shares this page's link, and the client
// types in that agreed amount themselves. Reuses the exact same Paystack
// initialization pattern as /api/offers/checkout and /api/onboarding/
// create-org, and points at the SAME already-configured webhook
// (/api/offers/paystack-webhook) rather than standing up a second one --
// that route already just reads whatever metadata.offerName/name/amount
// it's given, so it works for this too without any changes.
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const { name, email, phone, amount, note } = b;
    if (!name || !email) return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) return NextResponse.json({ error: "Enter a valid amount" }, { status: 400 });

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jktl.com.ng";
    const reference = `JKTL_PAY_${Date.now()}`;
    const label = note ? `Payment: ${note}` : "Payment to JKTL";

    if (!paystackSecret) {
      return NextResponse.json({ ok: true, paymentUrl: `${appUrl}/payments/success?ref=${reference}&mock=1` });
    }

    const callbackUrl = `${appUrl}/payments/success?ref=${reference}`;
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${paystackSecret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email, amount: Math.round(amountNum * 100), reference, callback_url: callbackUrl,
        metadata: {
          offerName: label, name, phone,
          custom_fields: [
            { display_name: "Note", variable_name: "note", value: note || "" },
            { display_name: "Name", variable_name: "name", value: name },
          ],
        },
      }),
    });
    const ps = await paystackRes.json();
    if (!ps.status) return NextResponse.json({ error: ps.message || "Paystack error" }, { status: 500 });

    return NextResponse.json({ ok: true, paymentUrl: ps.data.authorization_url, reference });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

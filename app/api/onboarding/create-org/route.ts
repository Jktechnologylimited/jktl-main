import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      product, plan, setupFee, monthlyFee,
      orgName, ownerName, ownerEmail, ownerPhone, address, orgSize,
      subdomain, logoUrl, brandColor, affiliateCode,
    } = body;

    if (!product || !plan || !orgName || !ownerEmail || !subdomain) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create org record in DB
    let orgId = "";
    if (process.env.DATABASE_URL) {
      const { sql } = await import("@/lib/db");

      // Check subdomain not taken
      const existing = await sql`SELECT id FROM organisations WHERE subdomain = ${subdomain} LIMIT 1`;
      if (existing.length > 0) {
        return NextResponse.json({ error: "Subdomain already taken" }, { status: 409 });
      }

      const rows = await sql`
        INSERT INTO organisations
          (product, plan, setup_fee, monthly_fee, org_name, owner_name, owner_email,
           owner_phone, address, org_size, subdomain, logo_url, brand_color, affiliate_code, status)
        VALUES
          (${product}, ${plan}, ${setupFee}, ${monthlyFee}, ${orgName}, ${ownerName},
           ${ownerEmail}, ${ownerPhone || null}, ${address || null}, ${orgSize || null},
           ${subdomain}, ${logoUrl || null}, ${brandColor || "#8B5CF6"}, ${affiliateCode || null},
           'pending_payment')
        RETURNING id
      `;
      orgId = rows[0]?.id || "";
    }

    // Initialise Paystack transaction
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      // Dev mode -- skip payment, go straight to success
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      return NextResponse.json({
        ok: true,
        orgId,
        paymentUrl: `${appUrl}/get-started/${product}?success=1&org=${orgId}&mock=1`,
        reference: `MOCK_${Date.now()}`,
      });
    }

    const reference = `JKTL_${product.toUpperCase()}_${Date.now()}`;
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/get-started/${product}?ref=${reference}&org=${orgId}`;

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: ownerEmail,
        amount: Math.round(setupFee * 100), // Paystack uses kobo
        reference,
        callback_url: callbackUrl,
        metadata: {
          orgId,
          product,
          plan,
          orgName,
          subdomain,
          custom_fields: [
            { display_name: "Product",      variable_name: "product",   value: product },
            { display_name: "Plan",         variable_name: "plan",      value: plan },
            { display_name: "Organisation", variable_name: "org_name",  value: orgName },
            { display_name: "Subdomain",    variable_name: "subdomain", value: subdomain },
          ],
        },
      }),
    });

    const ps = await paystackRes.json();
    if (!ps.status) {
      return NextResponse.json({ error: ps.message || "Paystack error" }, { status: 500 });
    }

    // Save paystack ref to org
    if (orgId && process.env.DATABASE_URL) {
      const { sql } = await import("@/lib/db");
      await sql`UPDATE organisations SET paystack_ref = ${reference} WHERE id = ${orgId}`;
    }

    return NextResponse.json({
      ok: true,
      orgId,
      paymentUrl: ps.data.authorization_url,
      reference,
    });

  } catch (err) {
    console.error("Create org error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

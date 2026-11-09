import Link from "next/link";
/** Public approved schedule only; Main never calculates checkout prices or reads financial settings. */
export async function TransactionCharges() {
  let bands: { minKobo: number; feeKobo: number }[] | null = null;
  try {
    const r = await fetch(
      "https://business.jktl.com.ng/api/public/transaction-fees",
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(2000) },
    );
    if (r.ok) {
      const d = await r.json();
      if (
        d.approved === true &&
        d.currency === "NGN" &&
        Array.isArray(d.bands) &&
        d.bands.length <= 12 &&
        d.bands.every(
          (b: { minKobo: number; feeKobo: number }) =>
            Number.isSafeInteger(b.minKobo) &&
            Number.isSafeInteger(b.feeKobo) &&
            b.minKobo >= 0 &&
            b.feeKobo >= 0,
        )
      )
        bands = d.bands;
    }
  } catch {}
  const money = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(n / 100);
  return (
    <section
      id="transaction-charges"
      className="mx-auto max-w-6xl px-6 py-12 text-navy-900"
    >
      <div className="rounded-2xl border border-cream-300 bg-white p-6 sm:p-8">
        <h2 className="text-2xl tracking-tight sm:text-3xl">
          Start free. Pay for the capabilities you choose.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">
              Free websites &amp; invoice creation
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/60">
              Publish on a free JKTL address and create professional invoices.
              The core tools do not require a paid website subscription.
              Receiving-bank verification is required before creating or sending
              invoices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Online payment charges</h3>
            <p className="mt-3 text-sm leading-7 text-black/60">
              Online processing is not free. The buyer sees the merchant amount,
              applicable JKTL platform fee and final payable total before
              confirming. Provider processing costs follow the supported
              arrangement; no separate buyer processing surcharge is currently
              added.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Optional upgrades &amp; services</h3>
            <p className="mt-3 text-sm leading-7 text-black/60">
              Paid plans add the capabilities listed below. Custom domains,
              business email, custom development and managed services are scoped
              and billed separately.
            </p>
          </div>
        </div>
        {bands && (
          <div className="mt-7">
            <h3 className="font-semibold">
              Approved buyer-paid JKTL platform fees · NGN
            </h3>
            <ul className="mt-3 text-sm leading-7">
              {bands.map((b, i) => (
                <li key={b.minKobo}>
                  {bands[i + 1]
                    ? `${money(b.minKobo)} to ${money(bands[i + 1].minKobo - 1)}`
                    : `${money(b.minKobo)} and above`}
                  : {money(b.feeKobo)} per eligible payment
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-black/55">
              Applies to the merchant principal before the JKTL fee. Your
              checkout shows the current applicable charge and any account
              exemptions.
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-5 text-sm">
          <Link
            className="underline underline-offset-4"
            href="https://business.jktl.com.ng/signup?next=invoices"
          >
            Create an invoice
          </Link>
          <Link
            className="underline underline-offset-4"
            href="/solutions/online-payments"
          >
            Explore payment links
          </Link>
          <Link className="underline underline-offset-4" href="/domains">
            Domain pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const response = await fetch(
      "https://business.jktl.com.ng/api/public/reviews",
      { cache: "no-store", signal: AbortSignal.timeout(3000) },
    );
    if (!response.ok) throw Error();
    const body = await response.json();
    const reviews = Array.isArray(body.reviews)
      ? body.reviews
          .filter(
            (r: Record<string, unknown>) =>
              typeof r.id === "string" &&
              typeof r.quote === "string" &&
              typeof r.display_name === "string" &&
              typeof r.company === "string" &&
              Number.isInteger(r.rating) &&
              Number(r.rating) >= 1 &&
              Number(r.rating) <= 5,
          )
          .map((r: Record<string, unknown>) => ({
            id: r.id,
            quote: r.quote,
            rating: r.rating,
            display_name: r.display_name,
            company: r.company,
            milestone: r.milestone,
          }))
      : [];
    return NextResponse.json(
      { reviews },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { reviews: [] },
      { headers: { "Cache-Control": "no-store" }, status: 503 },
    );
  }
}

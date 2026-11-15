// Keep the parked entry point reversible and serve its redirect statically.
export const dynamic = "force-static";
export function GET() {
  return new Response("Redirecting to JKTL Games.", {
    status: 307,
    headers: { Location: "/games", "X-Robots-Tag": "noindex, nofollow" },
  });
}

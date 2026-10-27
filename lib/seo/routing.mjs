export const SITE_ORIGIN = "https://jktl.com.ng";
export const LEGACY_SERVICE_REDIRECTS = Object.freeze({
  "/services/web-development": "/products/custom-websites",
  "/services/software-solutions": "/products/business-tools",
});
export const PERMANENT_ROUTES = Object.freeze({
  ...LEGACY_SERVICE_REDIRECTS,
  "/products/domains": "/domains",
});
export const PREFERRED_ALIASES = Object.freeze({
  ...LEGACY_SERVICE_REDIRECTS,
  "/products/domains": "/domains",
  "/games/business-tycoon": "/games",
  "/affiliate": "/affiliates",
});
export function isUtilityPath(path) {
  return (
    /^\/(?:api|admin|templates\/[^/]+|template-canvas)(?:\/|$)/.test(path) ||
    /^\/affiliates?\/.+/.test(path)
  );
}
export function canonicalPath(path) {
  return PREFERRED_ALIASES[path] || path;
}
export function localRedirectTarget(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\u0000-\u0020\\]/.test(value)
  )
    return null;
  try {
    const url = new URL(value, SITE_ORIGIN);
    return url.origin === SITE_ORIGIN ? url : null;
  } catch {
    return null;
  }
}
/** Resolve configured redirects without turning cycles or malformed targets into sitemap entries. */
export function resolveRedirect(path, rows, aliases = true) {
  const seen = new Set([path]);
  let current = path;
  for (let i = 0; i < 10; i++) {
    const fixed = aliases ? PREFERRED_ALIASES[current] : undefined;
    const row = rows.find((r) => r.from_path === current);
    if (!fixed && !row) return current;
    const target = localRedirectTarget(fixed || row.to_path);
    if (!target || seen.has(target.pathname)) return null;
    current = target.pathname;
    seen.add(current);
  }
  return null;
}

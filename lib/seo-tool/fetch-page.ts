import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import https from "node:https";
export function publicIpv4(ip: string) {
  const n = ip.split(".").map(Number);
  if (n.length !== 4 || n.some((x) => !Number.isInteger(x) || x < 0 || x > 255))
    return false;
  const [a, b, c] = n;
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 168 || b === 0 || b === 2)) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113)
  );
}
export function publicPageUrl(raw: string) {
  if (typeof raw !== "string" || raw.length > 2000)
    throw Error("Enter a public HTTPS website address.");
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    isIP(url.hostname) ||
    !url.hostname.includes(".") ||
    /\.(?:local|internal|localhost|test|invalid|onion)$/i.test(url.hostname)
  )
    throw Error("Enter a public HTTPS website address.");
  url.hash = "";
  return url;
}
/** DNS is checked for every redirect, then pinned at connection time to prevent rebinding. */
export async function fetchPublicPage(raw: string) {
  let url = publicPageUrl(raw);
  const signal = AbortSignal.timeout(12000);
  for (let redirects = 0; redirects <= 3; redirects++) {
    signal.throwIfAborted();
    const addresses = await Promise.race([
      lookup(url.hostname, { all: true, verbatim: true }),
      new Promise<never>((_, reject) => {
        signal.addEventListener(
          "abort",
          () => reject(Error("Page check timed out")),
          { once: true },
        );
      }),
    ]);
    const ipv4 = addresses.filter((a) => a.family === 4);
    if (!ipv4.length || ipv4.some((a) => !publicIpv4(a.address)))
      throw Error("This checker only supports public IPv4 websites.");
    const pinned = ipv4[0];
    const result = await new Promise<{
      status: number;
      location?: string;
      html: string;
      xRobots: string;
    }>((resolve, reject) => {
      const req = https.request(
        url,
        {
          method: "GET",
          signal,
          family: 4,
          lookup: (_host, _options, callback) =>
            callback(null, pinned.address, 4),
          headers: {
            "User-Agent":
              "JKTL-SEO-Checker/1.0 (+https://jktl.com.ng/tools/seo-checker)",
            Accept: "text/html",
          },
        },
        (res) => {
          const status = res.statusCode || 0;
          if ([301, 302, 303, 307, 308].includes(status)) {
            res.resume();
            resolve({
              status,
              location: res.headers.location,
              html: "",
              xRobots: "",
            });
            return;
          }
          if (!/^text\/html(?:;|$)/i.test(res.headers["content-type"] || "")) {
            res.resume();
            reject(Error("The address must return an HTML page."));
            return;
          }
          const chunks: Buffer[] = [];
          let bytes = 0;
          res.on("data", (chunk) => {
            bytes += chunk.length;
            if (bytes > 1000000) {
              req.destroy(Error("This page is too large to check."));
              return;
            }
            chunks.push(Buffer.from(chunk));
          });
          res.on("end", () =>
            resolve({
              status,
              html: Buffer.concat(chunks).toString("utf8"),
              xRobots: String(res.headers["x-robots-tag"] || ""),
            }),
          );
          res.on("error", reject);
        },
      );
      req.on("error", reject);
      req.end();
    });
    if (result.location) {
      if (redirects === 3)
        throw Error("Too many redirects. Enter the final public address.");
      url = publicPageUrl(new URL(result.location, url).href);
      continue;
    }
    return { ...result, url: url.href };
  }
  throw Error("Could not retrieve the page.");
}

import {
  brandingSettings,
  DEFAULT_BRANDING,
  mailLayout,
  type MailCategory,
  type Branding,
} from "./mail-layout";
let cache: { until: number; branding: Branding } | null = null;
export async function connectedBranding() {
  if (cache && cache.until > Date.now()) return cache.branding;
  try {
    const r = await fetch(
      "https://business.jktl.com.ng/api/public/email-branding",
      { cache: "no-store", signal: AbortSignal.timeout(2000) },
    );
    if (!r.ok) throw Error("Branding unavailable");
    const result = brandingSettings((await r.json()).branding);
    cache = { until: Date.now() + 60000, branding: result };
    return result;
  } catch {
    return { ...DEFAULT_BRANDING };
  }
}
export async function brandConnectedEmail(
  subject: string,
  html: string,
  text: string,
  category: MailCategory = "service",
) {
  return mailLayout({
    title: subject,
    bodyHtml: html,
    text,
    category,
    branding: await connectedBranding(),
    promotions: [],
  });
}

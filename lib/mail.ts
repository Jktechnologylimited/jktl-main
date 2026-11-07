import { brandConnectedEmail } from "./mail-branding";
import type { MailCategory } from "./mail-layout";
export function mainMailSender() {
  const configured =
    process.env.RESEND_FROM_EMAIL || "John <jktl-business@mail.jktl.com.ng>";
  // Retire older deployment values as well as hardcoded caller identities.
  return /@(?:[^@.<>\s]+\.)*ibiz\.name\.ng(?:>|$)/i.test(configured)
    ? "John <jktl-business@mail.jktl.com.ng>"
    : configured;
}
/** Reuse Main's existing Resend HTTP integration and sender configuration. */
export async function sendMainMail(p: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  category?: MailCategory;
  key?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const text =
    p.text ||
    p.html
      .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "$2 ($1)")
      .replace(/<br\s*\/?\s*>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  const rendered = await brandConnectedEmail(
    p.subject,
    p.html,
    text,
    p.category || "service",
  );
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(p.key ? { "Idempotency-Key": p.key } : {}),
    },
    body: JSON.stringify({
      from: mainMailSender(),
      reply_to: "info@jktl.com.ng",
      to: p.to,
      subject: p.subject,
      html: rendered.html,
      text: rendered.text,
    }),
  });
}

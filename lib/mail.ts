import { brandConnectedEmail } from "./mail-branding";
import type { MailCategory } from "./mail-layout";
/** Reuse Main's existing Resend HTTP integration and sender configuration. */
export async function sendMainMail(p: {
  from: string;
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
      from: p.from,
      to: p.to,
      subject: p.subject,
      html: rendered.html,
      text: rendered.text,
    }),
  });
}

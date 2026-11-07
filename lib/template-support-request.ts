import { getWebsiteTemplate } from "./website-templates";
export function templateSupportRequest(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const b = body as Record<string, unknown>;
  const text = (key: string, max: number) =>
    typeof b[key] === "string" && (b[key] as string).length <= max
      ? (b[key] as string).trim()
      : "";
  const name = text("name", 100),
    email = text("email", 254),
    message = text("challenge", 1500),
    page = text("page", 250);
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 5 ||
    !/^\/(?:templates(?:\/[a-z0-9-]+)?|landing-pages)\/?$/.test(page)
  )
    return null;
  const templateId = page.match(/^\/templates\/([a-z0-9-]+)/)?.[1],
    template = templateId ? getWebsiteTemplate(templateId) : undefined;
  if (templateId && !template) return null;
  if (b.chat !== undefined && (!Array.isArray(b.chat) || b.chat.length > 10))
    return null;
  const chat = Array.isArray(b.chat) ? b.chat : [];
  if (
    chat.some(
      (item) =>
        !item ||
        typeof item !== "object" ||
        !["bot", "user"].includes(item.from) ||
        typeof item.text !== "string" ||
        item.text.length > 1500,
    )
  )
    return null;
  return {
    name,
    email: email.toLowerCase(),
    service: "Free template support",
    message,
    source: "contact",
    meta: {
      type: "template-support",
      page,
      templateId: template?.id || null,
      templateName: template?.name || null,
      chat: chat.map((item) => ({ from: item.from, text: item.text })),
    },
  };
}

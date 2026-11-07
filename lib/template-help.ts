export const TEMPLATE_CHAT_GREETING =
  "Hi, I’m President. I can help you choose, edit and publish a free JKTL template. Ask about mobile previews, blank designs or getting your site online. You can also request a person from JKTL.";
export const TEMPLATE_CHAT_QUESTIONS = [
  "Are the templates free?",
  "How do I choose and edit a template?",
  "How do I publish my free website?",
  "Can I use my own photos?",
  "Talk to a human",
];
export function isTemplateHelpPath(path: string) {
  return /^\/templates(?:\/|$)/.test(path) || /^\/landing-pages\/?$/.test(path);
}
export function templateHelpReply(question: string): {
  reply: string;
  handoff: boolean;
} {
  const q = question.toLowerCase();
  if (/\b(human|person|agent|someone|team|escalat\w*)\b/.test(q))
    return {
      reply:
        "I can pass your free-template question to the JKTL team. Add your name, email and a short description below, then send the request. A team member can follow up by email; replies are not instant.",
      handoff: true,
    };
  if (
    /\b(error|broken|failed|failing|lost|stuck|not working|can.t|cannot|won.t)\b/.test(
      q,
    )
  )
    return {
      reply:
        "For a template problem, keep a copy of your text, confirm you’re in the right business account and note the exact error. A preview does not publish your site. Send the details below if you need the JKTL team to help. Do not include passwords or verification codes.",
      handoff: true,
    };
  if (/\b(upgrade\w*|existing|already|switch\w*)\b/.test(q))
    return {
      reply:
        "Keep using your existing JKTL Business account and selected template. An upgrade should retain your design; you do not need to choose a template again. Before replacing a published design, request help below so the team can guide you without losing your content.",
      handoff: true,
    };
  if (
    /\b(photo\w*|image\w*|logo\w*|picture\w*|colour\w*|color\w*|content|text|customi[sz]\w*)\b/.test(
      q,
    )
  )
    return {
      reply:
        "After selecting a free template, use the website editor in JKTL Business to replace sample text, add your logo and use photos you have permission to publish. Preview desktop and mobile, save, then publish. Template photos are demonstration content; add your real team and genuine reviews before launching.",
      handoff: false,
    };
  if (/\b(mobile|desktop|phone|responsive|preview|view)\b/.test(q))
    return {
      reply:
        "Select View in the public gallery to explore a template without signing up. In the preview toolbar, switch between the desktop and mobile icons. Select Template takes you to JKTL Business to sign in or create an account with that design selected.",
      handoff: false,
    };
  if (/\b(blank|empty|scratch)\b/.test(q))
    return {
      reply:
        "Choose Blank templates in the Type dropdown. You can start with a blank website or landing page, then add the sections and content you need in JKTL Business. You can preview it freely before selecting it.",
      handoff: false,
    };
  if (/\b(publish\w*|save\w*|live|online|subdomain|address)\b/.test(q))
    return {
      reply:
        "In JKTL Business, open Website, edit your selected template and save your changes. Check both preview sizes, choose an available free JKTL website address and publish. Open the published address in a new tab to check it. A custom domain purchase is optional for starting your free site.",
      handoff: false,
    };
  if (/\b(free|cost|price|pricing|pay|card|domain)\b/.test(q))
    return {
      reply:
        "You can explore templates without an account and start a free website on a JKTL address. Sign up only when you want to select and edit a design. You do not need to buy a custom domain to start your free website. Optional domains, email and paid services have separate charges; this chat focuses on free templates.",
      handoff: false,
    };
  if (
    /\b(template\w*|choose|select|edit|start|signup|sign up|login|sign in|industry|landing|website|design)\b/.test(
      q,
    )
  )
    return {
      reply:
        "Browse by Type or Industry, or search for your business. Use View to compare designs freely. Click Select Template or Edit when ready, then sign in to JKTL Business or create a free account. Keep the selected template through setup, replace sample content and preview before publishing.",
      handoff: false,
    };
  if (/^(hi|hello|hey|thanks|thank you)[!.\s]*$/.test(q))
    return { reply: TEMPLATE_CHAT_GREETING, handoff: false };
  return {
    reply:
      "I can help with JKTL’s free templates: choosing a design, mobile previews, editing content and publishing on a free JKTL address. For a question beyond those guides, request help from the JKTL team below.",
    handoff: true,
  };
}

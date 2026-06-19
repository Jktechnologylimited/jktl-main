import { sql } from "@/lib/db";

type InquiryInput = {
  name?: string; email?: string; phone?: string; businessName?: string;
  service?: string; budget?: string; timeline?: string; message?: string;
  source: string; meta?: Record<string, unknown>;
};

// Stores a public-form submission into service_inquiries (the Command Centre).
// Returns true on success. Never throws — callers decide how to respond.
export async function saveInquiry(input: InquiryInput): Promise<boolean> {
  if (!sql) return false;
  try {
    await sql`
      INSERT INTO service_inquiries
        (name, email, phone, business_name, service, budget, timeline, message, source, meta)
      VALUES
        (${input.name || ""}, ${(input.email || "").toLowerCase()}, ${input.phone || ""},
         ${input.businessName || ""}, ${input.service || ""}, ${input.budget || ""},
         ${input.timeline || ""}, ${input.message || ""}, ${input.source},
         ${JSON.stringify(input.meta || {})})
    `;
    return true;
  } catch {
    return false;
  }
}

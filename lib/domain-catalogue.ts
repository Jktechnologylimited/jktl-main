export const domainExtensions = [
  {
    extension: ".com.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "For Nigerian businesses and organisations",
    featured: true,
  },
  {
    extension: ".ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "A short Nigerian country-code identity",
    featured: true,
  },
  {
    extension: ".name.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "For a personal name or professional identity",
    featured: true,
  },
  {
    extension: ".org.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "For organisations and communities",
  },
  {
    extension: ".net.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "For networks and technology businesses",
  },
  {
    extension: ".edu.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose:
      "For eligible educational institutions; documentation may be required",
  },
  {
    extension: ".sch.ng",
    group: "nigeria",
    country: "Nigeria",
    purpose: "For eligible schools; documentation may be required",
  },
  {
    extension: ".com",
    group: "generic",
    country: "Global",
    purpose: "A familiar global business address",
  },
  {
    extension: ".org",
    group: "generic",
    country: "Global",
    purpose: "For organisations and communities",
  },
  {
    extension: ".net",
    group: "generic",
    country: "Global",
    purpose: "For networks and technology businesses",
  },
  {
    extension: ".africa",
    group: "generic",
    country: "Africa",
    purpose: "A continental identity for an African brand",
  },
  {
    extension: ".online",
    group: "generic",
    country: "Global",
    purpose: "A flexible online identity",
  },
  {
    extension: ".store",
    group: "generic",
    country: "Global",
    purpose: "For a retail brand or online store",
  },
  {
    extension: ".co.uk",
    group: "country",
    country: "United Kingdom",
    purpose: "Explore a country-specific address",
  },
  {
    extension: ".co.za",
    group: "country",
    country: "South Africa",
    purpose: "Explore a country-specific address",
  },
  {
    extension: ".com.gh",
    group: "country",
    country: "Ghana",
    purpose: "Explore a country-specific address",
  },
  {
    extension: ".co.ke",
    group: "country",
    country: "Kenya",
    purpose: "Explore a country-specific address",
  },
] as const;
export type DomainPrice = {
  registrationKobo: number;
  renewalKobo: number;
  transferKobo?: number;
  currency: "NGN";
};
export type DomainPrices = Record<string, DomainPrice>;
export function getRetailDomainPrices(
  raw: string | undefined = process.env.DOMAIN_RETAIL_PRICES_JSON,
): DomainPrices {
  if (!raw) return {};
  let entries: unknown;
  try {
    entries = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!entries || typeof entries !== "object" || Array.isArray(entries))
    return {};
  const result: DomainPrices = {};
  for (const item of domainExtensions) {
    const value = (entries as Record<string, unknown>)[item.extension];
    if (!value || typeof value !== "object") continue;
    const row = value as Record<string, unknown>;
    const valid = (v: unknown) =>
      typeof v === "number" &&
      Number.isSafeInteger(v) &&
      v > 0 &&
      v <= 1000000000;
    if (
      row.currency !== "NGN" ||
      !valid(row.registrationKobo) ||
      !valid(row.renewalKobo)
    )
      continue;
    result[item.extension] = {
      currency: "NGN",
      registrationKobo: Number(row.registrationKobo),
      renewalKobo: Number(row.renewalKobo),
      ...(valid(row.transferKobo)
        ? { transferKobo: Number(row.transferKobo) }
        : {}),
    };
  }
  return result;
}
export function normaliseRequestedDomain(
  name: unknown,
  extension: unknown,
): string {
  if (
    typeof name !== "string" ||
    typeof extension !== "string" ||
    !domainExtensions.some((item) => item.extension === extension)
  )
    throw new Error("Choose a supported extension.");
  let label = name.trim().toLowerCase();
  if (label.endsWith(extension)) label = label.slice(0, -extension.length);
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
    throw new Error(
      "Use letters, numbers and hyphens, without spaces or a website address.",
    );
  return label + extension;
}
export function parseDomainRequest(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Please check your request.");
  const input = value as Record<string, unknown>;
  const bounded = (key: string, max: number, required = true) => {
    const raw = input[key];
    if (
      typeof raw !== "string" ||
      raw.trim().length > max ||
      (required && !raw.trim())
    )
      throw new Error("Please check your contact details.");
    return raw.trim();
  };
  const name = bounded("name", 120),
    email = bounded("email", 254),
    phone = bounded("phone", 60, false);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  const domain = normaliseRequestedDomain(input.label, input.extension);
  const operation = input.operation;
  if (!["registration", "transfer", "renewal"].includes(String(operation)))
    throw new Error("Choose a domain service.");
  const years = input.years;
  if (years !== 1)
    throw new Error(
      "Request one year; the team will confirm the permitted registration term.",
    );
  return {
    name,
    email: email.toLowerCase(),
    phone,
    domain,
    extension: String(input.extension),
    operation: String(operation),
    years: 1,
  };
}

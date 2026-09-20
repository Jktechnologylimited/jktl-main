// Default homepage content. Rebuilt to mirror the ACTUAL current homepage
// copy (app/page.tsx) as of Batch 14 -- the previous version of this file
// described an older redesign (different hero/section set) that no longer
// matches the live page, which is why useSiteContent was never reconnected.
// The web accessor and admin editor both merge DB values over these
// defaults, so the live site is unchanged until an admin edits and saves.

export type HomepageContent = {
  hero: {
    line1: string;
    accent: string;
    subhead: string;
  };
  about: {
    heading: string;
    body: string;
  };
};

export const homepageDefaults: HomepageContent = {
  hero: {
    line1: "Grow Your",
    accent: "Business Online",
    subhead:
      "We build high-performing digital systems that attract customers, generate leads and grow your business.",
  },
  about: {
    heading: "Built by a Nigerian founder, for African businesses.",
    body:
      "We are a team of strategists, designers and developers passionate about building high-performing digital systems that help businesses grow.",
  },
};

// Deep-merge a partial stored doc over the defaults (one level into each section).
export function mergeHomepage(stored: unknown): HomepageContent {
  const base = homepageDefaults as unknown as Record<string, Record<string, unknown>>;
  const over = (stored && typeof stored === "object" ? stored : {}) as Record<string, Record<string, unknown>>;
  const out: Record<string, Record<string, unknown>> = {};
  for (const section of Object.keys(base)) {
    out[section] = { ...base[section], ...(over[section] || {}) };
  }
  return out as unknown as HomepageContent;
}

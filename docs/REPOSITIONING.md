# JKTL Main positioning update

9 November 2026 (WAT). Local changes; deployment remains paused.

## Existing-site audit

The homepage led with websites/domains/hosting/email. It already had the JKTL navy, gold and cream identity, an African entrepreneur hero image, motion-based reveals, customer case studies, industry sections, public templates, pricing, support and broader product pages. These components and all established URLs were retained.

The Business repository confirms free core invoicing, verified receiving-bank setup, Paystack invoice payment links, customer records and website publishing. It does not currently implement a native shopping cart. Payment processing is therefore described as supported invoice links, including links shared from websites; the site does not claim a native store checkout exists.

Existing website plan IDs, amounts, entitlements and the 14-day first-paid-website-plan guarantee remain unchanged. Financial configuration and calculation logic stay in Business.

## Changes

- Homepage: the primary H1 is “Start free. Run your business. Get paid.” Supporting copy introduces websites, professional invoicing and payments. The primary free-account CTA and secondary public-template CTA remain clear. The existing human hero image still follows the hook.
- Immediately after the hero: three entry-product cards for Free Websites, Free Invoicing and Online Payments, with real destinations. Invoice signup uses `https://business.jktl.com.ng/signup?next=invoices`; payment setup uses the existing payment product page and approved Business intent.
- Three-step introduction: create a free account, choose a website/invoicing/business tool, then share with customers and manage records. It does not require buying a website plan before using independently available tools.
- Product navigation: free invoicing and online payments are easier to find. Existing websites/templates, Business Tools, Custom, Managed Services, domains, email, partners, affiliates, resources and support remain reachable. AI receptionist is accurately labelled paused rather than available for paid activation.
- Product/solution pages: `/products/invoicing-payments` and `/solutions/online-payments` explain free invoice creation, bank setup, charge disclosure and the difference between verification and bank settlement. Invoice CTAs carry a safe whitelisted destination through signup/login/onboarding. No arbitrary redirects are accepted.
- Pricing: a section separates free website/invoice creation, paid website capabilities, online payment charges and separately billed domains/email/custom/managed work. Payment processing is not advertised as free. Existing paid plan prices were not edited.
- Approved schedule display: Main reads Business's public `/api/public/transaction-fees` response. It does not calculate fees or read private settings. The proposed NGN 0/100/200 rates are absent until an approved live configuration is published by Business. Test-only or unavailable responses show general disclosure, not guessed active prices. Checkout is authoritative; public display is cached for up to five minutes.
- Audience examples cover retailers, beauty businesses, restaurants, freelancers/consultants, professional services, schools and organizations using actual available workflows. No customer quote, performance statistic or testimonial was fabricated.
- The broader feature grid still covers CRM, bookings/sales, inventory, expenses, PWA and analytics. AI chatbot, Custom, domains/infrastructure and managed-service pages remain in navigation. Existing customer work, testimonials and footer sections remain.

## SEO

Homepage, global metadata and pricing descriptions now address free business websites, online invoicing, online payment links and business management in Nigeria. Updated product descriptions feed their existing canonical/OG helper. The homepage has a three-product ItemList; the organization description is accurate and retains the verified 2025 founding date.

Existing routes, sitemap mechanisms, canonicals and legacy redirects were preserved. No new URL aliases or unnecessary redirects were introduced. Public template browsing stays accessible without signup. Authentication remains a Business concern with the existing noindex behavior.

## Verification

Both repositories' optimized production builds/type checks passed during implementation. The changed Main production files pass the installed Next/TypeScript ESLint rules using an explicit temporary configuration because the existing Main lint script still invokes the removed `next lint` command and has no ESLint 9 config. That unrelated lint-system migration was not bundled into this content update.

The actual built Main server passes Chromium checks at 1440, 390 and 320 pixels for `/`, `/pricing`, `/products/invoicing-payments`, `/solutions/online-payments` and `/how-it-works`: HTTP 200, one primary H1, appropriate metadata lengths, correct self-canonicals, real CTA destinations, navigation links, no horizontal overflow and human-image ordering. The pricing page does not display an unapproved fee schedule. Eight existing SEO-indexing tests pass.

Screenshots are local artifacts at `/tmp/jktl-reposition-home-*.png`. Browser tests intercept Business-side browser requests with read-only fixtures. No email, signup, payment or publishing action was performed on a real account.

## Release boundaries

These changes are local and have not been pushed or deployed. Business migrations 076–077 and the new payment code need their own explicitly authorized release. Main must not treat deployment as permission to activate the proposed fees. Provider split/fee-bearing tests, permitted surcharge treatment and JKTL live approval are still required.

Native shopping-cart checkout remains unimplemented. Existing invoice links are the supported online payment path. The implementation and activation checklist are documented in `jktl-business--/docs/BUYER_PAID_FEES.md`.

# Hair and cosmetics template additions

Added locally on 9 November 2026; not deployed.

- **Hair Extensions — Fiora Locks** (`fiora-locks`): an oversized editorial wordmark, monochrome portraits, a photo collage, service pages and consultation enquiries. Ten pages.
- **Cosmetics Boutique — Velora Beauty** (`velora-cosmetics`): teal/grey beauty branding, a product rail, three collections, six product-detail pages, editorial content, care information and product enquiries. Fifteen pages.

Both use the existing public template gallery and responsive preview wrapper. Visitors can explore without signup. Gallery previews open in a new tab; Select Template and sign-in retain the selected ID for JKTL Business. The same catalogue, renderers, styles and bundled photographs are present in Business.

The ZIPs are screenshot references. The implementation uses editable original content and locally bundled, licensed African beauty photography and product stock photographs. Source records are in `public/template-photos/african/sources.json`. Reference-site branding and browser chrome are not published as assets. Reviews, contact details, product claims and prices are not fabricated.

Business's existing editor and request infrastructure handle both designs. Velora is a product catalogue with real enquiry forms; it does not create a native cart or checkout. Customer-site canonicals and sitemaps use the existing publication system. The fuller paired implementation report is in `jktl-business--/docs/NOVEMBER_9_HAIR_AND_COSMETICS.md`.

The catalogue now contains 214 starters, including the two blank starting points. Existing templates, public SEO mechanisms, application design and payment configuration are preserved. Deployment remains on hold.

Verification passed: both optimized builds/type checks, 43 paired template/CMS/request tests, 10 Main heading/SEO tests, all three desktop/phone browser sizes in both applications, and a final rendered-page check against the production builds. Changed-source lint has no errors and two existing shared-renderer image warnings. No customer site was published and no live enquiry was sent.

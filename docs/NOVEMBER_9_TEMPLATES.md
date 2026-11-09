# November 9 template additions

Two full website starters are added to the existing public catalogue and mirrored in JKTL Business:

- **Bridal Beauty — Aura** (`bridal-aura`): ivory, editorial bridal photography and a numbered photo gallery.
- **Nail Studio — Claw Culture** (`nail-culture`): orange/lime, expressive typography and a photographic nail-art gallery.

Each has Home, About, Services, three individual service pages, Gallery, Booking and Contact. Both remain publicly previewable at `/templates/[id]` without signup. Existing gallery links open previews in a new tab; Select Template and the sign-in icon preserve the selected ID in the Business login flow. Desktop/mobile preview behavior is unchanged.

The archives supplied screenshots rather than source code. The implementation uses original editable content and licensed, locally bundled African photography. Sources are recorded in `public/template-photos/african/sources.json`. No screenshot containing Wix branding is published as an asset.

The shared catalogue and renderers remain identical between Main and Business. The existing Business editor, enquiry handler, tenant permissions and publication system handle these designs. New drafts replace sample branding in their page titles and descriptions. Blank contact details stay blank, reviews are not invented, and preview forms do not send messages.

The paired Business report at `jktl-business--/docs/NOVEMBER_9_TEMPLATES.md` describes editing, publication and tests. Its `tests/occasion-template.browser.cjs` checks both running apps at 1440, 390 and 320 pixels. Main's template heading/SEO tests cover the new entries too. Gallery thumbnails are screenshots of the locally built templates.

Both optimized builds/type checks passed. The paired template/CMS/request suite passed 38 tests; Main's heading/SEO suite passed 10. The final browser run against the built apps passed all three widths in both repositories. Changed-source lint has no errors and two existing image warnings in shared components.

Changes are held locally. No deployment, production migration, customer-site publication or live enquiry is authorized or performed by this addition.

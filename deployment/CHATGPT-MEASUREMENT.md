# Ole Man RB ChatGPT measurement

The November 4, 2026 measurement release uses the production site files recovered
from Hostinger, preserving the live address autocomplete. It does not publish the
separate September Google Ads and Apex portal measurement changes on main.

## Build integration

`npm run build` runs `deployment/install-measurement.mjs` after the static export.
The public measurement script is disabled outside olemanrb.com and www.olemanrb.com.
It also stays off on privacy, admin and staging-directory URLs, and for rollout
tests, stored opt-outs, GPC and DNT. Debug is false.

The loader runs once per document. It records page views across client navigation,
phone-link clicks as `phone_link_clicked`, and a `lead_created` event only after an
HTTP-success response containing `success: true` from the quote endpoint. Lead
event IDs are the quote request UUID. Duplicate successes are suppressed in memory
and local storage. No names, addresses, email, phone or messages are in event data.

The integration adds readable source details to the existing quote message, inside
the backend's 5,000-byte limit. It preserves the full visitor message. It never
changes WordPress plugins, webhook destinations, required fields or timeout behavior.
The source summary omits the referrer's path/query and raw ad click identifiers.
The OpenAI SDK retains its own click reference for attribution. No CAPI key or
server-side OpenAI integration is installed by this release.

The main conversion setting is **Quote Request Confirmed**, based on `lead_created`,
using the supplied website pixel. Page views and phone clicks are separate signals,
not confirmed quotes or answered calls. Link only the confirmed-quote goal to the
campaign's primary outcome. Never infer an appointment or booked job from a form.

## Production overlay and rollback

New files live in `public_html/_apex-tracking-20261104`. The `FOUND FIRST MEASUREMENT`
block precedes the existing static blog/site blocks in root `.htaccess`. It serves
the recovered HTML plus a single added loader and the privacy-choices page. Existing
JS, CSS, images, WordPress plugins, blog comment blocks and quote API remain intact.

Future releases must preserve or deliberately replace this overlay, otherwise its
HTML will take precedence over a newer underlying release. Include the loader and
privacy page in the new release before retiring the overlay. A full main deployment
still requires reconciliation of the recovered live autocomplete code.

Rollback: remove only `BEGIN FOUND FIRST MEASUREMENT` through its END marker and
purge Hostinger cache. Preserve everything below it. The earlier live directories
remain on the server. Backups, release package and verification evidence are in
Nick's private `olemanrb-tracking-2026-11-04` working folder.

## Verification boundaries

Twenty focused automated checks cover confirmed/failed/malformed responses,
deduplication, privacy signals, storage denial, SPA navigation, source retention,
unrelated fetches, long messages and phone clicks. A native-browser local test
verified the real recovered contact form against an isolated endpoint and SDK stub.
It delivered one local test request and one matching event. No test request was
sent to the live quote endpoint, Make, Chris or Sarah.

Production page activity must be checked in the OpenAI event stream after release.
A genuine customer quote is still needed to establish live lead ingestion and
downstream receipt. A successful local test or page-view event does not prove that.

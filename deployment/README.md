# Hostinger deployment

The production site is https://olemanrb.com/. WordPress remains installed for its articles, legal pages, Elementor submissions, and existing Make automation.

The static export is served from `public_html/_apex-repair-20260918/` through the rules in `hostinger.htaccess`. Unmatched paths continue to the existing WordPress rules. Do not replace or delete the WordPress installation.

Build outside the iCloud Desktop checkout:

```sh
NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_GA_MEASUREMENT_ID=G-MGZGBR196N npm run build -- --webpack
node deployment/prepare-release.mjs out
```

The preparation script creates a sitemap index covering both the new site and the existing WordPress sitemaps. It is safe to run more than once on the same export.

Install `modern-apex-quote.php` in `wp-content/mu-plugins/`. It reads the existing Elementor form configuration from page 50, form c36bae4, without copying the webhook URL into source control. Preserve that form and its configured actions. The bridge saves submissions in Elementor and sends them to the existing Make webhook. The original required email and address fields are retained. Extra service, message, emergency, and request ID fields are stored and included in the webhook payload.

Before deploying, create a Hostinger backup and save the current `.htaccess` outside the public directory. Upload each completed export to a new release directory, verify its files, and update the release path in the managed block from `hostinger.htaccess`. Preserve the previous release directory. Prepend the block on a first deployment; replace that managed block on later deployments rather than adding it twice. The September 18 repair uses `_apex-repair-20260918/`; the earlier `_apex-site/` release remains available as a fallback. Purge LiteSpeed caches after switching.

Verify HTTPS, the full static route list, legacy redirects, blog and legal URLs, all sitemap children, phone links, and mobile layouts. For forms, prove a real stored submission and successful webhook action. Reusing a successful request UUID must not create another record or webhook delivery. A `quote_request_success` event is queued only after API success; GA4 dashboard ingestion is a separate check. The existing GA4 configuration also emits `generate_lead` on a contact-page visit, so that event alone does not prove a submitted form. Google Ads conversion settings were not changed by this launch.

GitHub Pages uses `/olemanrb-web` and the absolute production quote endpoint through workflow environment variables. Its analytics are disabled. Production uses the domain root and same-origin quote endpoint.

Nick explicitly directed that the new site remain live during the September 18 repairs. Do not restore the old WordPress homepage without a new instruction. To revert only the repair release if necessary, change the managed release path back to `_apex-site` while retaining the editor preview rules, then purge LiteSpeed. A full launch rollback would restore the original saved `.htaccess`, then purge LiteSpeed. The original WordPress pages and database remain intact. Remove the quote bridge only if deliberately retiring the new form endpoint. Close temporary SSH access after deployment.

September 18 verification evidence is stored privately at `/Users/modernapex/olemanrb-launch-2026-09-18/`.

September 18 repair verification: the live home, contact, about, services, service areas, gallery, tree removal, and sitemap files match the tested build; all 14 home JS/CSS assets match. The mobile menu opens, closes on Contact navigation, and follows Blog to the original archive. WordPress blog articles and Elementor preview routing remain available. Submission 6 was saved with a successful webhook action after switching Elementor to Sarah's supplied destination; downstream Monday receipt still needs confirmation.

# Static blog migration, November 3, 2026

Nick requested replacing WordPress blog pages with static pages in the existing
GitHub site, preserving the copy and URLs and removing the comment sections.
This is a blog-only swap. It does not retire the WordPress installation, replace
the quote workflow, or migrate the internal application and legal pages.

## Content

- All 56 published posts and the additional article stored as page 1126.
- Six archive pages at the existing `/category/blog/` paths.
- Two legacy article aliases with canonical destinations.
- 78 images copied locally and optimized to WebP.
- Editorial text retained, with dash punctuation normalized to Nick's standing
  style rule. Builder chrome, live recommendation widgets and embeds are omitted.
- No comment thread, comment form, WordPress scripts or remote article images.

`src/content/blog.json` is the editable content. The migration manifest records
the real source URLs and IDs. The importer is a one-time, explicit operation,
not a runtime or build-time connection to WordPress.

## Build and verify

Use an isolated checkout outside iCloud Desktop.

```sh
npm ci
NEXT_PUBLIC_BASE_PATH= npm run build -- --webpack
python3 scripts/verify-blog.py
node deployment/package-blog.mjs out ../release
```

For the GitHub preview, build with `NEXT_PUBLIC_BASE_PATH=/olemanrb-web` and run
the verifier with `/olemanrb-web` as its argument. The existing workflow handles
the GitHub build. The public domain remains on Hostinger.

## Hostinger cutover

1. Download the current root `.htaccess` for rollback.
2. Upload the generated `_apex-blog-20261103` directory to `public_html` and
   verify the extracted article, archive and asset files before changing routing.
3. Prepend `blog-routing.htaccess` to the current `.htaccess`, preserving every
   existing block. On a repeat deploy, replace only the STATIC BLOG block.
4. Purge the site's Hostinger cache.
5. Verify all 57 live article URLs and six archive pages, local image delivery,
   no comment UI, and HTTP 410 for comment/trackback/pingback endpoints.
6. Verify the existing homepage/contact pages are byte-identical to their
   predeployment versions. Verify quote route discovery without submitting it.

The routing block intercepts old WordPress comment and pingback submission
endpoints so removing the visible forms does not leave the spam path open.
The old database/comments and WordPress admin are not deleted. Do not submit
the live quote form as a test: it delivers directly to the client's Make flow.

Rollback: remove only the STATIC BLOG block and purge cache. The former blog
and existing site release remain intact.

The September measurement release is not part of this Hostinger package. New
blog pages use the current source layout, but no contact-page code or quote
delivery behavior is replaced by this release.

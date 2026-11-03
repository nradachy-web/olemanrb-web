import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";

const output = resolve(process.argv[2] ?? "out");
const packageDir = resolve(process.argv[3] ?? "../release");
const release = "_apex-blog-20261103";
const destination = join(packageDir, release);
const content = JSON.parse(await readFile("src/content/blog.json", "utf8"));
const manifest = JSON.parse(await readFile("src/content/blog-migration.json", "utf8"));
const archiveHtml = await readFile(join(output, "category/blog/index.html"), "utf8");
if (archiveHtml.includes("/olemanrb-web/_next/")) {
  throw new Error("Hostinger packaging requires a verified domain-root build, not the GitHub preview.");
}

// Ship only blog routes and their assets. Existing home, service and contact
// pages, quote processing, analytics and WordPress records are not replaced.
const paths = ["_next", "blog", "category", ...content.map((p) => p.slug), ...Object.keys(manifest.aliases)];
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const path of paths) await cp(join(output, path), join(destination, path), { recursive: true });
// Next static navigation also requests route payloads beside each directory.
const rootFiles = await readdir(output);
for (const file of rootFiles) {
  if (paths.some((path) => !path.includes("/") && file.startsWith(path + "."))) {
    await cp(join(output, file), join(destination, file));
  }
}
await cp(join(output, "sitemap.xml"), join(destination, "site-sitemap.xml"));
await writeFile(join(destination, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://olemanrb.com/site-sitemap.xml</loc></sitemap><sitemap><loc>https://olemanrb.com/page-sitemap.xml</loc></sitemap></sitemapindex>\n');
const rules = `# BEGIN MODERN APEX STATIC BLOG
<IfModule mod_rewrite.c>
RewriteEngine On

# Comments and pingbacks are retired. Keep the quote API and admin available.
RewriteRule ^(wp-comments-post|wp-trackback|xmlrpc)\\.php(?:/|$) - [G,L,NC]
RewriteRule ^(?:index\\.php/)?wp-json/wp/v2/comments(?:/|$) - [G,L,NC]
RewriteCond %{QUERY_STRING} (^|&)rest_route=(/|%2f)?wp(/|%2f)v2(/|%2f)comments([/&]|%2f|$) [NC]
RewriteRule ^ - [G,L]
RewriteRule ^(?:.+/)?trackback/?$ - [G,L,NC]
RewriteRule ^comments/feed(?:/|$) - [G,L,NC]

RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} ^www\\.olemanrb\\.com$ [NC]
RewriteRule ^ https://olemanrb.com%{REQUEST_URI} [R=301,L]

# The existing homepage and quote workflow keep their current routing.
RewriteRule ^${release}(?:/|$) - [L]
RewriteCond %{DOCUMENT_ROOT}/${release}/$1/index.html -f
RewriteRule ^(.+[^/])$ /$1/ [R=301,L]
RewriteCond %{DOCUMENT_ROOT}/${release}/$1 -f
RewriteRule ^(.+)$ ${release}/$1 [L]
RewriteCond %{DOCUMENT_ROOT}/${release}/$1/index.html -f
RewriteRule ^(.+?)/?$ ${release}/$1/index.html [L]
</IfModule>
# END MODERN APEX STATIC BLOG
`;
await writeFile(join(packageDir, "blog-routing.htaccess"), rules);
console.log(`Prepared blog-only release at ${destination}. No homepage or contact-page export included.`);

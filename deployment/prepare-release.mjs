import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve(process.argv[2] ?? "out");

// Articles and the blog archive are now in the static sitemap. WordPress still
// serves existing legal and internal pages until a separate retirement.
const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
if (sitemap.includes("<urlset")) {
  await writeFile(resolve(output, "site-sitemap.xml"), sitemap);
} else if (!(await readFile(resolve(output, "site-sitemap.xml"), "utf8")).includes("<urlset")) {
  throw new Error("The static route sitemap is missing.");
}
const sitemaps = [
  "site-sitemap.xml",
  "page-sitemap.xml",
];
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((name) => `  <sitemap><loc>https://olemanrb.com/${name}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`,
);
console.log("Prepared static blog sitemap and retained WordPress page sitemap.");

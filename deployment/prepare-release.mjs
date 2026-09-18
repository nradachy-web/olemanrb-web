import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve(process.argv[2] ?? "out");

// Keep the existing WordPress article and page sitemaps discoverable after launch.
const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
if (sitemap.includes("<urlset")) {
  await writeFile(resolve(output, "site-sitemap.xml"), sitemap);
} else if (!(await readFile(resolve(output, "site-sitemap.xml"), "utf8")).includes("<urlset")) {
  throw new Error("The static route sitemap is missing.");
}
const sitemaps = [
  "site-sitemap.xml",
  "post-sitemap.xml",
  "page-sitemap.xml",
  "category-sitemap.xml",
];
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((name) => `  <sitemap><loc>https://olemanrb.com/${name}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`,
);
console.log("Prepared combined static and WordPress sitemap index.");

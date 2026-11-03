import sharp from "sharp";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const contentPath = resolve(root, "src/content/blog.json");
const manifestPath = resolve(root, "src/content/blog-migration.json");
let content = await readFile(contentPath, "utf8");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const replacements = new Map();
for (const source of new Set(Object.values(manifest.media))) {
  if (source.endsWith(".webp")) continue;
  const destination = source.replace(/\.[^.]+$/, ".webp");
  const input = resolve(root, "public", source.slice(1));
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile(resolve(root, "public", destination.slice(1)));
  replacements.set(source, destination);
}
for (const [source, destination] of replacements) content = content.replaceAll(source, destination);
for (const [url, path] of Object.entries(manifest.media)) manifest.media[url] = replacements.get(path) ?? path;
await writeFile(contentPath, content);
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
for (const source of replacements.keys()) await unlink(resolve(root, "public", source.slice(1)));
console.log(`Optimized ${replacements.size} article images for static delivery.`);

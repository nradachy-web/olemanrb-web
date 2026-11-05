import fs from 'node:fs';
import path from 'node:path';
const root = process.argv[2] || 'out';
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const loader = `<script src="${base}/found-first-measurement-20261104.js"></script>`;
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const text = fs.readFileSync(file, 'utf8');
      if (text.includes('found-first-measurement-20261104.js')) continue;
      if (!text.includes('<head>')) throw new Error(`No HTML head in ${file}`);
      fs.writeFileSync(file, text.replace('<head>', `<head>${loader}`));
      count++;
    }
  }
}
walk(root);
console.log(`Installed measurement loader on ${count} exported pages.`);

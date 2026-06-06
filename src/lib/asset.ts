/**
 * GitHub Pages project-page basePath helper for raw <img> src and other
 * root-relative asset paths (next/link and next/font handle basePath natively).
 * For the apex-domain cutover, set BASE to "" here and in next.config.ts and
 * add public/CNAME.
 */
export const BASE = "/olemanrb-web";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (BASE && path.startsWith(BASE)) return path;
  if (path.startsWith("/")) return `${BASE}${path}`;
  return path;
}

/**
 * GitHub Pages project-page basePath helper for raw <img> src and other
 * root-relative asset paths (next/link and next/font handle basePath natively).
 * Hostinger uses the domain root. GitHub Pages supplies its project path.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (BASE && path.startsWith(BASE)) return path;
  if (path.startsWith("/")) return `${BASE}${path}`;
  return path;
}

import type { NextConfig } from "next";

/**
 * Ole Man RB's Tree Service - static export for GitHub Pages.
 * Served as a project page at /olemanrb-web (basePath). For the apex-domain
 * cutover, set basePath to "" here and in src/lib/asset.ts, add public/CNAME.
 */
const repoBase = "/olemanrb-web";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBase,
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

import type { NextConfig } from "next";

/**
 * Static export for Hostinger. The GitHub Pages workflow supplies its project
 * path so the same source continues to support the review site.
 */
const repoBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBase,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

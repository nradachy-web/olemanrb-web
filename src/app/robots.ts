import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://olemanrb.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/thank-you",
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

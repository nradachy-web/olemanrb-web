import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const BASE = site.url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you/", "/_apex-site/", "/wp-admin/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}

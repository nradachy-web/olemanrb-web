import type { MetadataRoute } from "next";
import { services, serviceAreas } from "@/lib/site";

export const dynamic = "force-static";

const BASE = "https://olemanrb.com";
const LAST_MODIFIED = "2026-06-06";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/service-areas", priority: 0.8 },
    { path: "/gallery", priority: 0.6 },
    { path: "/storm-damage", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p.path}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...serviceAreas.map((a) => ({
      url: `${BASE}/service-areas/${a.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

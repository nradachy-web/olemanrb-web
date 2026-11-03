import type { MetadataRoute } from "next";
import { services, serviceAreas, site } from "@/lib/site";
import { posts, blogPageCount, blogPagePath } from "@/lib/blog";

export const dynamic = "force-static";

const BASE = site.url;
const LAST_MODIFIED = "2026-09-18";

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
    ...posts.map((post) => ({
      url: `${BASE}/${post.slug}/`,
      lastModified: post.modified.slice(0, 10),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...Array.from({ length: blogPageCount }, (_, index) => ({
      url: `${BASE}${blogPagePath(index + 1)}`,
      lastModified: "2026-11-03",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...staticPaths.map((p) => ({
      url: `${BASE}${p.path}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${BASE}/services/${s.slug}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...serviceAreas.map((a) => ({
      url: `${BASE}/service-areas/${a.slug}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

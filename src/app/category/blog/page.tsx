import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { blogPath } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tree Care Blog | Ole Man RB's Tree Service",
  description: "Tree removal, trimming, storm cleanup, and seasonal tree care advice for West Michigan homeowners from Ole Man RB's Tree Service.",
  alternates: { canonical: `${site.url}${blogPath}` },
  openGraph: { url: `${site.url}${blogPath}`, title: "Tree Care Blog | Ole Man RB's Tree Service" },
};

export default function BlogPage() {
  return <BlogArchive />;
}

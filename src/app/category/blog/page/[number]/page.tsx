import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArchive } from "@/components/blog/BlogArchive";
import { blogPageCount, blogPagePath } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from({ length: blogPageCount - 1 }, (_, i) => ({ number: String(i + 2) }));
}
export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  return { title: `Tree Care Blog, Page ${number} | Ole Man RB's`, alternates: { canonical: `${site.url}${blogPagePath(Number(number))}` } };
}
export default async function BlogPagination({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const page = Number(number);
  if (!Number.isInteger(page) || page < 2 || page > blogPageCount) notFound();
  return <BlogArchive page={page} />;
}

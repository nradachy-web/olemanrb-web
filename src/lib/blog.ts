import content from "@/content/blog.json";
import migration from "@/content/blog-migration.json";
import { BASE } from "@/lib/asset";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  kind: string;
  published: string;
  modified: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  toc: { id: string; title: string }[];
  html: string;
  sourceUrl: string;
};

export const posts: BlogPost[] = content.filter((item) => item.kind === "post");
export const blogAliases: Record<string, string> = migration.aliases;
export const POSTS_PER_PAGE = 10;
export const blogPageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
export const blogPath = "/category/blog/";

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === (blogAliases[slug] ?? slug));
}

export function blogPagePath(page: number): string {
  return page === 1 ? blogPath : `${blogPath}page/${page}/`;
}

export function formatPostDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value.slice(0, 10)}T12:00:00Z`));
}

// Importer strips executable markup and allows only safe links. Apply the
// project prefix at build time so preview links stay on the GitHub site.
export function articleHtml(post: BlogPost): string {
  return BASE ? post.html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : post.html;
}

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { asset } from "@/lib/asset";
import { blogPageCount, blogPagePath, formatPostDate, posts, POSTS_PER_PAGE } from "@/lib/blog";

export function BlogArchive({ page = 1 }: { page?: number }) {
  const visible = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  return (
    <>
      <PageHero
        eyebrow="From the crew"
        title="Tree care in West Michigan."
        subtitle="Practical advice on tree removal, seasonal care, storm damage, and keeping your property safe."
        image="/photos/hero-crew-1600.webp"
        imageAlt="Ole Man RB's crew working on a tree in West Michigan"
        crumbs={[{ label: "Tree care blog", ...(page > 1 ? { href: blogPagePath(1) } : {}) }, ...(page > 1 ? [{ label: `Page ${page}` }] : [])]}
      />
      <section className="bg-grey-50 py-14 text-ink sm:py-20" aria-label="Tree care articles">
        <div className="container-x">
          <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3 border-b border-grey-200 pb-5">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">{page === 1 ? "Latest articles" : "More from the blog"}</h2>
            <p className="text-sm text-[#545963]">Page {page} of {blogPageCount}</p>
          </div>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {visible.map((post) => (
              <article key={post.id} className="min-w-0">
                <Link href={`/${post.slug}/`} className="blog-card group block" aria-labelledby={`post-${post.id}`}>
                  <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-sm bg-grey-100">
                    <Image src={asset(post.image)} alt={post.imageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
                  </div>
                  <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#545963]">
                    <time dateTime={post.published.slice(0, 10)}>{formatPostDate(post.published)}</time>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h3 id={`post-${post.id}`} className="mb-3 max-w-[30ch] text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-red-deep sm:text-[1.65rem]">{post.title}</h3>
                  <p className="max-w-[65ch] text-base leading-relaxed text-[#545963]">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-red-deep">Read article <ChevronRight className="size-4" aria-hidden /></span>
                </Link>
              </article>
            ))}
          </div>
          <nav aria-label="Blog pages" className="mt-16 flex flex-wrap items-center justify-center gap-2 border-t border-grey-200 pt-8">
            {page > 1 && <Link className="blog-page" href={blogPagePath(page - 1)} aria-label="Previous page"><ChevronLeft className="size-5" aria-hidden /></Link>}
            {Array.from({ length: blogPageCount }, (_, index) => index + 1).map((number) => (
              <Link className="blog-page" key={number} href={blogPagePath(number)} aria-label={`Page ${number}`} aria-current={number === page ? "page" : undefined}>{number}</Link>
            ))}
            {page < blogPageCount && <Link className="blog-page" href={blogPagePath(page + 1)} aria-label="Next page"><ChevronRight className="size-5" aria-hidden /></Link>}
          </nav>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

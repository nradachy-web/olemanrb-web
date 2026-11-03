import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { articleHtml, blogAliases, blogPath, findPost, formatPostDate, posts } from "@/lib/blog";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import { JsonLd } from "@/lib/schema";
import { Button } from "@/components/ui/Button";

export const dynamicParams = false;
export function generateStaticParams() {
  return [...posts.map((post) => ({ slug: post.slug })), ...Object.keys(blogAliases).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const url = `${site.url}/${post.slug}/`;
  return {
    title: `${post.title} | Ole Man RB's`, description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.excerpt, publishedTime: post.published, modifiedTime: post.modified, images: [{ url: `${site.url}${post.image}`, alt: post.imageAlt }] },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [`${site.url}${post.image}`] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  if (blogAliases[slug]) {
    return <section className="container-x min-h-[60vh] pt-40 pb-20"><meta httpEquiv="refresh" content={`0;url=${asset(`/${post.slug}/`)}`} /><h1 className="text-3xl font-bold">{post.title}</h1><p className="mt-5"><Link className="underline" href={`/${post.slug}/`}>Continue to this article</Link></p></section>;
  }
  const related = posts.filter((item) => item.id !== post.id).slice(0, 3);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.published, dateModified: post.modified, mainEntityOfPage: `${site.url}/${post.slug}/`, image: `${site.url}${post.image}`, author: { "@type": "Organization", name: site.name, url: site.url }, publisher: { "@type": "Organization", name: site.name, url: site.url } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Home", item: site.url }, { "@type": "ListItem", position: 2, name: "Tree care blog", item: `${site.url}${blogPath}` }, { "@type": "ListItem", position: 3, name: post.title, item: `${site.url}/${post.slug}/` } ] }} />
      <header className="bg-ink pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="container-x">
          <Link href={blogPath} className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-silver hover:text-white"><ArrowLeft className="size-4" aria-hidden />Tree care blog</Link>
          <h1 className="max-w-[24ch] text-balance font-display text-[clamp(2rem,4.5vw,3.75rem)] font-extrabold leading-[1.12] tracking-tight text-white">{post.title}</h1>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-silver"><span>{site.name}</span><time dateTime={post.published.slice(0, 10)}>{formatPostDate(post.published)}</time><span>{post.readingMinutes} min read</span></div>
        </div>
      </header>
      <section className="bg-white text-ink">
        <div className="container-x grid items-start gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <article className="blog-prose min-w-0" aria-label={post.title} dangerouslySetInnerHTML={{ __html: articleHtml(post) }} />
          <aside className="min-w-0 lg:sticky lg:top-28">
            {post.toc.length > 1 && <nav className="mb-8 border-l-2 border-grey-200 pl-5" aria-label="In this article"><h2 className="mb-4 text-base font-bold text-ink">In this article</h2><ol className="space-y-3">{post.toc.map((item) => <li key={item.id}><a href={`#${item.id}`} className="text-sm leading-relaxed text-[#545963] hover:text-red-deep">{item.title}</a></li>)}</ol></nav>}
            <div className="rounded-sm bg-grey-50 p-6"><h2 className="text-xl font-bold leading-tight text-ink">Need a hand with your trees?</h2><p className="mt-3 text-sm leading-relaxed text-[#545963]">Tell us what is happening on your property. Our West Michigan crew can help you plan the next step.</p><Button href="/contact/" variant="primary" className="mt-5 w-full">Get a Free Quote</Button><a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink"><Phone className="size-4" aria-hidden />{site.phone}</a></div>
          </aside>
        </div>
      </section>
      <section className="border-t border-grey-200 bg-grey-50 py-14 text-ink sm:py-20">
        <div className="container-x"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold text-ink">More tree care advice</h2><Link href={blogPath} className="font-semibold text-red-deep">View all articles</Link></div><div className="grid gap-8 md:grid-cols-3">{related.map((item) => <Link key={item.id} href={`/${item.slug}/`} className="blog-card group"><div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-sm bg-grey-100"><Image src={asset(item.image)} alt={item.imageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" /></div><h3 className="text-lg font-bold leading-snug text-ink group-hover:text-red-deep">{item.title}</h3></Link>)}</div></div>
      </section>
    </>
  );
}

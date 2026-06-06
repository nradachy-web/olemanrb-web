"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * PAGEHERO — reusable compact dark hero for interior pages.
 *
 * - Compact min-h (no full-bleed); content bottom-anchored.
 * - Optional background image (ink-veil gradient + .grit when present); falls
 *   back to a clean ink + woodgrain backplate when imageless.
 * - eyebrow → display-1 UPPERCASE H1 with optional ONE red key word → silver
 *   subtitle, plus an optional breadcrumb above it.
 * - The signature red Blade sits beneath the eyebrow as the section accent.
 * - Staggered Reveal entrance.
 */
export function PageHero({
  eyebrow,
  title,
  /** optional substring of `title` rendered in red */
  titleKeyword,
  subtitle,
  image,
  imageAlt,
  crumbs = [],
  className = "",
}: {
  eyebrow: string;
  title: string;
  titleKeyword?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  className?: string;
}) {
  const hasImage = Boolean(image);

  // Optional red key word in the H1.
  let before = title;
  let keyword = "";
  let after = "";
  if (titleKeyword) {
    const i = title.toLowerCase().indexOf(titleKeyword.toLowerCase());
    if (i >= 0) {
      before = title.slice(0, i);
      keyword = title.slice(i, i + titleKeyword.length);
      after = title.slice(i + titleKeyword.length);
    }
  }

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[52svh] flex-col justify-end overflow-hidden bg-ink",
        className,
      )}
    >
      {/* ---------- background ---------- */}
      <div className="absolute inset-0 -z-10">
        {hasImage ? (
          <>
            <img
              src={asset(image!)}
              alt={imageAlt ?? ""}
              width={2000}
              height={1125}
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--ink-veil) 0%, rgba(10,10,11,0.72) 42%, rgba(10,10,11,0.5) 78%, rgba(10,10,11,0.4) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent"
            />
            <div aria-hidden className="grit absolute inset-0" />
          </>
        ) : (
          <>
            <div aria-hidden className="woodgrain absolute inset-0 bg-ink-2" />
            <div aria-hidden className="grit absolute inset-0" />
          </>
        )}
      </div>

      {/* ---------- content ---------- */}
      <div className="mx-auto w-full max-w-6xl px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        <div className="max-w-2xl">
          {crumbs.length > 0 && (
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-silver"
              >
                <Link
                  href="/"
                  className="link-underline -my-1 inline-flex py-1 hover:text-light"
                >
                  Home
                </Link>
                {crumbs.map((c) => (
                  <span key={c.label} className="flex items-center gap-1.5">
                    <ChevronRight
                      className="size-3.5 text-faint"
                      aria-hidden
                    />
                    {c.href ? (
                      <Link
                        href={c.href}
                        className="link-underline -my-1 inline-flex py-1 hover:text-light"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-light" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </Reveal>
          )}

          <Reveal delay={0.06}>
            <Eyebrow tone="red">{eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <span
              aria-hidden
              className="blade animate-blade-wipe mt-5 block w-16"
            />
          </Reveal>

          <Reveal delay={0.14}>
            <h1
              className={cn(
                "font-display mt-4 text-balance text-white [overflow-wrap:anywhere]",
                "text-[clamp(2.2rem,1.2rem+4.4vw,4.75rem)] font-bold leading-[0.96] tracking-[-0.005em]",
              )}
            >
              {keyword ? (
                <>
                  {before}
                  <span className="text-red text-glow-red">{keyword}</span>
                  {after}
                </>
              ) : (
                title
              )}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal delay={0.22}>
              <p className="lead measure mt-5 max-w-xl text-pretty">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;

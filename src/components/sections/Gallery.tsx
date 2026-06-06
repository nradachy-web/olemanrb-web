"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { gallery as galleryData, type GalleryItem } from "@/lib/site";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";

/* ============================================================
   GALLERY — signature showcase of real OMRB job photos.
   Responsive CSS-masonry grid with hover zoom + red veil,
   and an accessible keyboard/touch lightbox.
   Copy pulled from _plan/copy.md §7.
   ============================================================ */

type GalleryProps = {
  /** Photos to show. Defaults to the full `gallery` list from site.ts. */
  items?: GalleryItem[];
  /** Cap the count (e.g. homepage preview). Omit to show all. */
  limit?: number;
  /** Section intro (eyebrow / heading / lead). Defaults to copy.md §7. */
  eyebrow?: string;
  heading?: string;
  intro?: string;
  /** Show the section intro block. */
  showIntro?: boolean;
  /** Render a "View the full gallery" link (use on homepage preview). */
  viewAllHref?: string;
  /** Render the primary quote CTA under the grid. */
  ctaHref?: string;
  ctaLabel?: string;
  /** Alternate background tone for section rhythm. */
  background?: "ink" | "ink-2";
  className?: string;
};

export function Gallery({
  items = galleryData,
  limit,
  eyebrow = "Real jobs, real yards",
  heading = "See the work.",
  intro = "Real Ole Man RB's jobs across West Michigan. Big removals, tight takedowns, crane work, and the cleanups that prove the job is not done until the yard is.",
  showIntro = true,
  viewAllHref,
  ctaHref = "/contact",
  ctaLabel = "Get a Free Quote on Your Tree",
  background = "ink",
  className = "",
}: GalleryProps) {
  const reduce = useReducedMotion();
  const photos = typeof limit === "number" ? items.slice(0, limit) : items;
  const count = photos.length;

  const [active, setActive] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  // Keyboard nav + scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, go]);

  // Return focus to the tile that opened the lightbox.
  const open = (i: number) => setActive(i);
  const handleExited = () => {
    if (active !== null) triggerRefs.current[active]?.focus();
  };

  const current = active !== null ? photos[active] : null;

  return (
    <section
      className={cn(
        "section relative isolate",
        background === "ink-2" ? "bg-ink-2" : "bg-ink",
        className,
      )}
      aria-labelledby="gallery-heading"
    >
      <div className="container-x">
        {showIntro && (
          <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              as="h2"
              eyebrow={eyebrow}
              eyebrowTone="red"
              title={heading}
              lead={intro}
            />
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="link-underline group inline-flex shrink-0 items-center gap-2 self-start font-sans text-[0.95rem] font-bold uppercase tracking-[0.04em] text-light hover:text-white md:self-end md:pb-2"
              >
                View the full gallery
                <ArrowRight
                  className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        )}

        {/* Masonry grid of real job photos */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 sm:gap-5 sm:[&>*]:mb-5">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              aria-label={`View larger: ${photo.alt}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
              whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : (i % 6) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative block w-full overflow-hidden rounded-lg",
                "border border-[var(--hairline)] bg-charcoal",
                "shadow-[var(--shadow-card)] transition-shadow duration-300",
                "hover:border-[var(--hairline-strong)] hover:shadow-[var(--shadow-lift)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
              )}
            >
              <img
                src={asset(photo.src)}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
              />
              {/* bottom-up ink veil for depth */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--ink-veil)] to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
              />
              {/* red hover wash + signature blade slash */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-red/0 transition-colors duration-300 group-hover:bg-red/[0.06]"
              />
              <span
                aria-hidden
                className="blade-static pointer-events-none absolute bottom-4 left-4 w-0 transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-10"
              />
            </motion.button>
          ))}
        </div>

        {ctaHref && (
          <div className="mt-12 flex justify-center md:mt-14">
            <Button href={ctaHref} variant="primary" size="lg" withArrow>
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence onExitComplete={handleExited}>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${active! + 1} of ${count}: ${current.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--glass-fill-2)] p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-charcoal/80 text-light backdrop-blur-sm transition-colors duration-200 hover:border-red hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:right-8 sm:top-8"
            >
              <X className="size-6" aria-hidden />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 z-10 grid size-11 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-charcoal/80 text-light backdrop-blur-sm transition-colors duration-200 hover:border-red hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:left-8"
                >
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 z-10 grid size-11 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-charcoal/80 text-light backdrop-blur-sm transition-colors duration-200 hover:border-red hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:right-8"
                >
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}

            <motion.figure
              key={active}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden rounded-lg border border-[var(--hairline-strong)] shadow-[var(--shadow-lift)]">
                <img
                  src={asset(current.src)}
                  alt={current.alt}
                  decoding="async"
                  className="block max-h-[76svh] w-auto max-w-full object-contain"
                />
              </div>
              <figcaption className="max-w-2xl text-pretty text-center text-[0.9rem] leading-relaxed text-silver">
                {current.alt}
                <span className="ml-3 text-faint">
                  {active! + 1} / {count}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;

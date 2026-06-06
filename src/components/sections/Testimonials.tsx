import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { googleRating, testimonials } from "@/lib/site";

/* Google-authentic gold for review stars (matches the GBP star color). */
const GOLD = "#F5B40A";

/** Five solid gold stars, used in the badge and on every review card. */
function GoldStars({ className = "" }: { className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4"
          style={{ fill: GOLD, color: GOLD }}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

/**
 * Testimonials — the 6 real, verbatim Google reviews as dark cards.
 *
 * Spec (LOCKED design system + copy.md REVIEWS SECTION):
 *  - Dark band (#reviews anchor), section intro from copy: eyebrow
 *    "Straight from the neighbors", heading "West Michigan homeowners
 *    don't mince words.", intro line about the call-back / fair / clean theme.
 *  - "5.0 on Google" badge (eyebrow-style chip) with five gold stars + verified count.
 *  - Each card: a red quote glyph, the verbatim review, five gold stars,
 *    the real reviewer name, and the source ("Google review").
 *  - Only the 6 real named reviews are rendered (no fabrication).
 *  - Staggered reveal via RevealGroup / RevealItem.
 */
export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="section relative overflow-hidden bg-ink-2 grit"
    >
      {/* subtle red edge accent at the top, ties to "THE CUT" motif */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/40 to-transparent"
      />

      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Straight from the neighbors"
            title="West Michigan homeowners don't mince words."
            lead="Real reviews from real customers. Notice a theme: we call back, we're fair, and we clean up like we were never there."
          />

          {/* 5.0 on Google badge */}
          <Reveal delay={0.1}>
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--hairline-strong)] bg-charcoal/70 px-5 py-2.5 shadow-[var(--shadow-card)]">
              <span className="font-display text-xl font-bold leading-none text-white">
                {googleRating.score}
              </span>
              <GoldStars />
              <span className="text-sm font-medium text-silver">
                on Google
              </span>
              <span className="text-xs text-muted">
                ({googleRating.count} reviews)
              </span>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="card card-hover machined-edge flex h-full flex-col p-7">
                <Quote
                  className="size-9 text-red"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-light">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6 border-t border-[var(--hairline)]">
                  <GoldStars className="mb-2.5" />
                  <p className="font-display font-bold uppercase tracking-[-0.005em] text-white">
                    {t.name}
                  </p>
                  {t.when && (
                    <p className="mt-0.5 text-sm text-muted">{t.when}</p>
                  )}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

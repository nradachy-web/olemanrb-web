"use client";

import { ShieldCheck, Clock, Star, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import {
  brand,
  credentials,
  cta,
  googleRating,
  heroImage,
  site,
} from "@/lib/site";

/* Map each credential to a lucide glyph, in array order. */
const credentialIcons = [ShieldCheck, Clock, Star, Sparkles] as const;

/**
 * HOME HERO — full-bleed cinematic dark hero.
 *
 * - min-h-[92svh], content bottom-anchored (justify-end).
 * - hero-ai.jpg background with .animate-kenburns + dark ink-veil gradient + .grit film.
 * - eyebrow: the West Michigan towns.
 * - huge font-display UPPERCASE H1 with ONE red key word, with the signature
 *   animated red Blade wiping in beneath it.
 * - silver lead, primary "Get a Free Quote" + outline phone button.
 * - credential strip pinned at the base (licensed & insured / fast response /
 *   5-star / spotless cleanup).
 * - staggered Reveal entrance at delays 0, 0.08, 0.16, 0.24, 0.32.
 */
export function Hero() {
  // Split the headline so the key word ("shows up") renders in red. Keeps the
  // surrounding copy data-driven from lib/site so it stays the single source.
  const { heroHeadline, heroHeadlineKeyword } = brand;
  const kwIndex = heroHeadline
    .toLowerCase()
    .indexOf(heroHeadlineKeyword.toLowerCase());
  const before = kwIndex >= 0 ? heroHeadline.slice(0, kwIndex) : heroHeadline;
  const keyword =
    kwIndex >= 0
      ? heroHeadline.slice(kwIndex, kwIndex + heroHeadlineKeyword.length)
      : "";
  const after =
    kwIndex >= 0 ? heroHeadline.slice(kwIndex + heroHeadlineKeyword.length) : "";

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink">
      {/* ---------- background ---------- */}
      <div className="absolute inset-0 -z-10">
        <img
          src={asset(heroImage.src)}
          alt={heroImage.alt}
          className="animate-kenburns h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
        {/* bottom-anchored ink veil so the headline always reads */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--ink-veil) 0%, rgba(10,10,11,0.6) 38%, rgba(10,10,11,0.22) 70%, rgba(10,10,11,0.35) 100%)",
          }}
        />
        {/* left-weighted darkening for text contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent"
        />
        {/* fine grit film */}
        <div aria-hidden className="grit absolute inset-0" />
      </div>

      {/* ---------- content (bottom-anchored) ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="red">
              BELDING &bull; ROCKFORD &bull; GREENVILLE &bull; GRAND RAPIDS
            </Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className={cn(
                "font-display mt-6 text-balance text-white",
                "text-[clamp(2.9rem,7.5vw,6.25rem)] font-bold leading-[0.92] tracking-[-0.01em]",
              )}
            >
              {before}
              {keyword && (
                <span className="relative inline-block">
                  <span className="text-red text-glow-red">{keyword}</span>
                  {/* signature animated red blade under the key word */}
                  <span
                    aria-hidden
                    className="blade animate-blade-wipe absolute -bottom-1 left-0 w-full sm:-bottom-2"
                  />
                </span>
              )}
              {after}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-pretty text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-silver">
              {brand.heroSub}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={cta.primaryHref} variant="primary" size="lg" withArrow>
                {cta.primary}
              </Button>
              <Button
                href={site.phoneHref}
                variant="phone"
                size="lg"
                className="backdrop-blur-sm"
                aria-label={`Call Ole Man RB's at ${site.phone}`}
              >
                <Phone className="phone-glyph size-5" aria-hidden />
                {cta.phoneLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-silver">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-5 text-red" aria-hidden />
                Licensed &amp; insured
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="size-4 fill-red text-red"
                    />
                  ))}
                </span>
                <span>
                  {googleRating.score} on Google &middot; {brand.heroStarLine}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- credential strip (pinned at base) ---------- */}
      <div className="relative border-t border-[var(--hairline)] bg-[var(--glass-fill-2)] backdrop-blur-md">
        <dl className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-[var(--hairline)] px-5 sm:px-8 lg:grid-cols-4">
          {credentials.map((c, i) => {
            const Icon = credentialIcons[i] ?? ShieldCheck;
            return (
              <div
                key={c.label}
                className="flex items-start gap-3 px-4 py-5 first:pl-0 sm:px-6"
              >
                <Icon
                  className="mt-0.5 size-5 shrink-0 text-red"
                  aria-hidden
                />
                <div>
                  <dt className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.01em] text-white">
                    {c.label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-muted">{c.detail}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

export default Hero;

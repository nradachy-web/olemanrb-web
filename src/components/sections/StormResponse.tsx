import { Phone, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { site, stormResponse } from "@/lib/site";
import { cn } from "@/lib/utils";

type StormResponseProps = {
  /** Override the urgent headline. */
  heading?: string;
  /** Override the supporting line. */
  sub?: string;
  /** Where the "Storm damage details" link points. */
  detailsHref?: string;
  className?: string;
};

/**
 * StormResponse — the storm / emergency emphasis band.
 *
 * Cinematic storm photo (storm-ai.jpg) under a heavy near-black veil, with a
 * restrained .hazard-stripe top edge (the only place outside CtaBand the hazard
 * motif is allowed). Urgent headline, "tree on your house? we move fast" line,
 * a phone CTA (tel:+16162325300), and a link to the storm-damage page.
 *
 * No fabricated 24/7 claim, fast/dependable response is the real promise.
 */
export function StormResponse({
  heading = stormResponse.heading,
  sub = stormResponse.body,
  detailsHref = "/storm-damage",
  className,
}: StormResponseProps) {
  return (
    <section
      className={cn(
        "section relative isolate overflow-hidden",
        className,
      )}
    >
      {/* background photo */}
      <img
        src={asset(stormResponse.image)}
        alt={stormResponse.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* near-black veil for legibility + a red wash from the right */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--ink-veil)] via-[rgba(8,8,9,0.86)] to-[rgba(8,8,9,0.78)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-[-8%] -z-10 h-80 w-80 rounded-full bg-red/[0.22] blur-[130px]"
      />

      {/* restrained hazard-stripe top edge */}
      <span
        aria-hidden
        className="hazard-stripe hazard-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px]"
      />

      <div className="container-x">
        <Reveal className="max-w-2xl">
          <Eyebrow tone="red">
            <AlertTriangle className="size-[0.95em]" aria-hidden />
            {stormResponse.eyebrow}
          </Eyebrow>

          <h2 className="h2-display mt-5 text-balance text-white">
            {heading}
          </h2>

          <p className="mt-4 text-[1.2rem] font-semibold leading-snug text-red-bright text-glow-red">
            Tree on your house? We move fast.
          </p>

          <p className="lead measure mt-4 max-w-xl text-pretty">
            {sub}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={site.phoneHref} variant="primary" size="lg">
              <Phone className="size-[1.05em]" aria-hidden />
              {site.phone}
            </Button>

            <Link
              href={detailsHref}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm border border-[var(--hairline-strong)] px-8 py-4 font-sans text-base font-bold uppercase leading-none tracking-[0.04em] text-light transition-all duration-300 hover:border-red hover:bg-red/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-red active:scale-[0.98] sm:px-6"
            >
              Storm Damage Details
              <ArrowRight
                className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <p className="mt-6 text-sm font-medium text-silver">
            {stormResponse.reassurance}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default StormResponse;

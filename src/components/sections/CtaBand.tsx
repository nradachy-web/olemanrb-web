import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Blade } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { site, cta } from "@/lib/site";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  /** Optional override for the closing headline. */
  heading?: string;
  /** Optional override for the supporting line under the headline. */
  sub?: string;
  /**
   * Visual treatment:
   *  - "red"   = bold solid red field (default; the loud closing CTA)
   *  - "black" = near-black field with a red key word and red glow (restrained)
   */
  tone?: "red" | "black";
  /** Where the primary "Get a Free Quote" button points. */
  quoteHref?: string;
  className?: string;
};

/**
 * CtaBand — the bold closing call to action used at the bottom of pages.
 *
 * Signature: a thin .hazard-stripe top edge (the storm/CTA caution signal),
 * a heavy display headline, and the dual CTA pairing used sitewide:
 * primary "Get a Free Quote" + the phone number as a tel: link.
 *
 * Conversion contract: phone is always a tel:+16162325300 link; primary CTA
 * wording is always "Get a Free Quote".
 */
export function CtaBand({
  heading = "Got a tree that has to come down?",
  sub = "Tell us what is going on. You get a clear, written quote within 24 hours, no pressure and no obligation. Then we show up, get it gone, and leave your yard spotless.",
  tone = "red",
  quoteHref = cta.primaryHref,
  className,
}: CtaBandProps) {
  const isRed = tone === "red";

  return (
    <section
      className={cn(
        "section relative isolate overflow-hidden woodgrain",
        isRed ? "bg-red-blood text-white" : "bg-ink-2 text-light",
        className,
      )}
    >
      {/* hazard-stripe top edge (thin caution rule) */}
      <span
        aria-hidden
        className="hazard-stripe hazard-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px]"
      />

      {/* ambient red bloom on the dark variant */}
      {!isRed && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-red/[0.18] blur-[120px]"
        />
      )}

      <div className="container-x">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <h2
              className={cn(
                "font-display uppercase text-balance",
                "text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.01em]",
                isRed ? "text-white" : "text-white",
              )}
            >
              {heading}
            </h2>
            <Blade
              animate={false}
              width="w-20"
              className={cn(
                "mt-5",
                isRed
                  ? "!bg-white !bg-none shadow-none"
                  : "",
              )}
            />
            <p
              className={cn(
                "mt-5 max-w-xl text-pretty text-[1.05rem] leading-[1.6]",
                isRed ? "text-white/85" : "text-silver",
              )}
            >
              {sub}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Button
              href={quoteHref}
              variant={isRed ? "outline" : "primary"}
              size="lg"
              withArrow
              className={cn(
                "w-full justify-center md:w-auto",
                isRed &&
                  "border-white/70 bg-white text-red-blood shadow-none hover:border-white hover:bg-white hover:text-red-deep",
              )}
            >
              {cta.primary}
            </Button>

            <a
              href={site.phoneHref}
              className={cn(
                "group inline-flex w-full items-center justify-center gap-2 rounded-sm border px-8 py-4 font-sans text-base font-bold uppercase leading-none tracking-[0.04em] transition-all duration-300 md:w-auto",
                "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.98]",
                isRed
                  ? "border-white/40 text-white hover:border-white hover:bg-white/[0.12]"
                  : "border-[var(--hairline-strong)] text-light hover:border-red hover:text-white hover:bg-red/[0.08]",
              )}
            >
              <Phone className="size-[1.05em]" aria-hidden />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CtaBand;

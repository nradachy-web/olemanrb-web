import { CloudLightning } from "lucide-react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { cta, site, stormResponse } from "@/lib/site";

/**
 * STAKES SECTION (StoryBrand: what happens if a hazard or storm tree is ignored).
 * Cinematic split on bg-ink-2: storm-ai.jpg framed on one side, the cost-of-waiting
 * list on the other. Hazard accent is restrained (a single thin hazard-stripe edge
 * on the image frame). Closes with a relief line and the dual CTA.
 */

const failure: string[] = [
  "The next big wind drops a limb on the roof, and now you're paying for the tree and the repairs.",
  "A dead tree finally lets go onto the car, the fence, or the neighbor's property.",
  "Storm damage turns into an insurance headache when there's no documentation and no one to call.",
  "What started as a clean removal becomes a tangled, dangerous mess that costs more to clean up.",
];

export function StakesSection() {
  return (
    <section className="section bg-ink-2">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              {/* restrained hazard accent: a single thin stripe along the top edge */}
              <span
                aria-hidden
                className="hazard-stripe absolute -top-2 left-6 right-6 z-10 h-1.5 rounded-full opacity-70"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--hairline)] shadow-[var(--shadow-lift)]">
                <img
                  src={asset(stormResponse.image)}
                  alt={stormResponse.imageAlt}
                  className="size-full object-cover"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--ink-veil)] via-transparent to-transparent"
                />
              </div>
              {/* floating caption tag */}
              <div className="card-frosted absolute -bottom-5 left-5 flex items-center gap-3 px-5 py-4 sm:left-7">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                >
                  <CloudLightning className="size-5" strokeWidth={2.2} />
                </span>
                <p className="font-condensed text-[0.95rem] font-semibold leading-tight text-white">
                  Storm took it down?
                  <span className="block text-[0.82rem] font-normal text-silver">
                    We'll take it from here.
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* content */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow tone="red">What happens if you wait</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white text-balance">
                A bad tree doesn't get better.{" "}
                <span className="text-red">It gets more expensive.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead mt-4 text-pretty">
                Every season you put it off, the risk grows and so does the bill.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 flex flex-col gap-3">
              {failure.map((f) => (
                <RevealItem key={f}>
                  <div className="flex items-start gap-3.5 rounded-md border border-[var(--hairline)] bg-charcoal px-4 py-3.5">
                    <span
                      aria-hidden
                      className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-red/40"
                    >
                      <span className="size-1.5 rounded-full bg-red" />
                    </span>
                    <span className="text-[0.97rem] leading-relaxed text-silver text-pretty">
                      {f}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.2}>
              <p className="mt-8 font-condensed text-[1.15rem] font-medium leading-snug text-light text-pretty">
                It doesn't have to go that way. Get it handled now, on your
                schedule, by a crew that does this for a living.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={cta.primaryHref} variant="primary" size="md" withArrow>
                  {cta.primary}
                </Button>
                <Button href={site.phoneHref} variant="phone" size="md">
                  {cta.phoneLabel}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StakesSection;

import { Fragment } from "react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cta, plan, site } from "@/lib/site";

/**
 * PLAN SECTION (StoryBrand: the simple 3-step plan).
 * Light-relief band on bg-grey-50 with text-ink, used once per page for rhythm.
 * Big red step numbers in tactical-square tiles, cut-divider blade connectors
 * between the steps, and the dual CTA after the plan.
 */

export function PlanSection() {
  return (
    <section className="section bg-grey-50">
      <div className="container-x">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow tone="red">Simple as it should be</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h2-display mt-5 text-ink text-balance">
              Three steps to a tree{" "}
              <span className="text-red">handled.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-grey-warm/80 text-pretty">
              No drawn-out process, no hard sell. Just a clear path from "I've
              got a tree that needs to go" to "it's handled."
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0">
          {plan.map((step, i) => (
            <Fragment key={step.step}>
              <RevealItem>
                <div className="relative flex h-full flex-col rounded-md border border-grey-100 bg-white p-7 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.25)] md:mx-3">
                  {/* big red step number tile */}
                  <span
                    aria-hidden
                    className="grid size-14 place-items-center rounded-sm bg-red font-display text-2xl font-bold leading-none text-white shadow-[var(--shadow-red)]"
                  >
                    {step.step}
                  </span>
                  <h3 className="h3-card mt-6 uppercase text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-grey-warm/80 text-pretty">
                    {step.body}
                  </p>
                </div>
              </RevealItem>

              {/* cut-divider blade connector between steps (desktop only) */}
              {i < plan.length - 1 && (
                <RevealItem className="hidden items-center md:flex">
                  <span
                    aria-hidden
                    className="blade-static h-1 w-10 shrink-0"
                  />
                </RevealItem>
              )}
            </Fragment>
          ))}
        </RevealGroup>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={cta.primaryHref} variant="primary" size="lg" withArrow>
              {cta.primary}
            </Button>
            <Button
              href={site.phoneHref}
              variant="outline"
              size="lg"
              className="border-grey-200 text-ink hover:border-red hover:bg-red/[0.06] hover:text-red-deep"
            >
              {cta.phoneLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PlanSection;

import { Check, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { authorityBullets, owner, site } from "@/lib/site";

/**
 * GUIDE SECTION (StoryBrand: OMRB as the dependable guide).
 * Cinematic dark band on bg-ink with the owner-truck photo, the two guide body
 * paragraphs, the authority bullets, a licensed-and-insured seal badge, the
 * empathy one-liner, and a link to /about. Owner Chris Holmes named.
 */

const empathyLine =
  "We know letting a stranger take a chainsaw to your property is a leap of faith. We earn it the boring way: by showing up and doing it right.";

export function GuideSection() {
  return (
    <section className="section woodgrain relative overflow-hidden bg-ink">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* image */}
          <Reveal className="order-1 lg:order-2">
            <div className="relative mb-8 lg:mb-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[var(--hairline)] shadow-[var(--shadow-lift)]">
                <img
                  src={asset(owner.image)}
                  alt={owner.imageAlt}
                  className="size-full object-cover object-[50%_35%]"
                  width={1400}
                  height={1400}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--ink-veil)] via-transparent to-transparent"
                />
                {/* owner nameplate over the image */}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-xl font-bold uppercase leading-none tracking-[-0.01em] text-white">
                    {owner.name}
                  </p>
                  <p className="mt-1.5 text-[0.82rem] font-medium uppercase tracking-[0.14em] text-silver">
                    {owner.title}
                  </p>
                </div>
              </div>

              {/* licensed & insured seal badge */}
              <div className="card-frosted absolute -bottom-6 -right-4 flex items-center gap-3 px-5 py-4 sm:-right-6">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                >
                  <ShieldCheck className="size-6" strokeWidth={2.2} />
                </span>
                <div className="leading-tight">
                  <p className="font-condensed text-[0.95rem] font-semibold text-white">
                    Licensed &amp; Insured
                  </p>
                  <p className="text-[0.8rem] text-silver">
                    Fully covered, every job
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* content */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow tone="red">Meet your crew</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 h2-display text-white text-balance">
                We're the crew West Michigan calls when the tree{" "}
                <span className="text-red">has to go.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 measure text-[1.02rem] leading-relaxed text-silver text-pretty">
                Ole Man RB's Tree Service is owner-operated right here in Belding
                by {owner.name}. We built this company on one simple idea: answer
                the phone, show up when we say we will, and leave the yard cleaner
                than we found it. That's it. No runaround, no disappearing acts,
                no torn-up lawns.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 measure text-[1.02rem] leading-relaxed text-silver text-pretty">
                We're fully licensed and insured, so you're covered before anyone
                ever climbs a tree. We've got the equipment to handle the big,
                scary, near-the-house jobs other crews pass on, including
                crane-assisted removals. And we treat your property like it's our
                own, because around here, you might be a neighbor.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {authorityBullets.map((b) => (
                <RevealItem key={b}>
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red/15 text-red"
                    >
                      <Check className="size-3.5" strokeWidth={2.6} />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-light">
                      {b}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.34}>
              <p className="mt-8 border-l-2 border-red/50 pl-4 font-condensed text-[1.1rem] font-medium italic leading-snug text-light text-pretty">
                {empathyLine}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/about" variant="outline" size="md" withArrow>
                  More About Ole Man RB's
                </Button>
                <Button href={site.phoneHref} variant="phone" size="md">
                  Call {site.phone}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuideSection;

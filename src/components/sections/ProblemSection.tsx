import { AlertTriangle, Axe, PhoneOff, ShieldQuestion, PhoneCall } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { brand } from "@/lib/site";

/**
 * PROBLEM SECTION (StoryBrand: the homeowner's worries).
 * Two-column image+content split on bg-ink: a real OMRB hazard-tree photo framed
 * on the right (with a floating "we answer the phone" trust badge that directly
 * rebuts the #1 worry), the four worries as a clean vertical list on the left,
 * and the empathy closing line centered beneath. This restores the
 * image-every-screen rhythm right after the hero.
 */

type Worry = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const worries: Worry[] = [
  {
    icon: AlertTriangle,
    title: "A dead or leaning tree over the house.",
    body: "That tree is too close to the roof, the garage, or the car, and every storm makes it worse.",
  },
  {
    icon: Axe,
    title: "Too big for a regular crew.",
    body: "It's huge, near power lines, or jammed into a tight spot, and the last company took one look and said no.",
  },
  {
    icon: PhoneOff,
    title: "Nobody calls you back.",
    body: "You left messages with five companies. Crickets. The ones who did call gave a number with no explanation.",
  },
  {
    icon: ShieldQuestion,
    title: "No idea who to trust.",
    body: "Will they wreck the lawn? Overcharge you? Leave a mess and disappear? You shouldn't have to gamble on your own property.",
  },
];

export function ProblemSection() {
  return (
    <section className="section grit bg-ink">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* image (top on mobile, right on desktop) */}
          <Reveal className="order-1 lg:order-2">
            <div className="relative mb-8 lg:mb-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[var(--hairline)] shadow-[var(--shadow-lift)]">
                <img
                  src={asset("/photos/big-tree.jpg")}
                  alt="A large, looming tree crowding a West Michigan home — exactly the kind of hazard Ole Man RB's takes down safely."
                  className="h-full w-full object-cover"
                  width={1000}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--ink-veil)] via-transparent to-transparent"
                />
              </div>

              {/* floating badge — directly rebuts the "nobody calls back" worry */}
              <div className="card-frosted absolute -bottom-6 -right-4 flex items-center gap-3 px-5 py-4 sm:-right-6">
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                >
                  <PhoneCall className="size-5" strokeWidth={2.2} />
                </span>
                <div className="leading-tight">
                  <p className="font-condensed text-[0.95rem] font-semibold text-white">
                    We answer the phone.
                  </p>
                  <p className="text-[0.8rem] text-silver">
                    A real person, every call
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* content (bottom on mobile, left on desktop) */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <Eyebrow tone="red">We get it</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h2-display mt-5 text-white text-balance">
                Finding a tree company that actually{" "}
                <span className="text-red">shows up</span> shouldn't be this hard.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead measure mt-4 text-pretty">
                You've got a tree that needs to come down, and you just want
                someone dependable to answer the phone, give you a straight price,
                and get it done. Instead you get voicemail, no callbacks, and
                quotes that make no sense. Sound familiar?
              </p>
            </Reveal>

            <RevealGroup className="mt-9 flex flex-col gap-6">
              {worries.map((w) => {
                const Icon = w.icon;
                return (
                  <RevealItem key={w.title}>
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="grid size-12 shrink-0 place-items-center rounded-md border border-[var(--hairline-strong)] bg-[var(--glass-fill-2)] text-red"
                      >
                        <Icon className="size-6" strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="font-condensed text-[1.1rem] font-semibold leading-snug text-white">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 text-[0.97rem] leading-relaxed text-silver text-pretty">
                          {w.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <p className="max-w-2xl text-center font-condensed text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-snug text-light text-balance">
            {brand.empathyLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default ProblemSection;

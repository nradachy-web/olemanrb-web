import { AlertTriangle, Axe, PhoneOff, ShieldQuestion } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { brand } from "@/lib/site";

/**
 * PROBLEM SECTION (StoryBrand: the homeowner's worries).
 * Dark section on bg-ink. Four worry cards in a 2x2 grid, each with a restrained
 * red-tinted icon, then the empathy closing line. Title carries a single red word.
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
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal>
            <Eyebrow tone="red">We get it</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white text-balance">
              Finding a tree company that actually{" "}
              <span className="text-red">shows up</span> shouldn't be this hard.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lead mt-4 text-pretty">
              You've got a tree that needs to come down, and you just want
              someone dependable to answer the phone, give you a straight price,
              and get it done. Instead you get voicemail, no callbacks, and
              quotes that make no sense. Sound familiar?
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6">
          {worries.map((w) => {
            const Icon = w.icon;
            return (
              <RevealItem key={w.title}>
                <div className="card card-hover machined-edge flex h-full items-start gap-4 p-6 md:p-7">
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-md border border-[var(--hairline-strong)] bg-steel text-red"
                  >
                    <Icon className="size-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-condensed text-[1.15rem] font-semibold leading-snug text-white">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-silver text-pretty">
                      {w.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.12} className="mt-12 flex justify-center">
          <p className="max-w-2xl text-center font-condensed text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-snug text-light text-balance">
            {brand.empathyLine}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default ProblemSection;

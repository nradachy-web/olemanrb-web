"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/site";

/**
 * Faq — accessible accordion of the sitewide FAQs from site.ts.
 *
 * Spec (LOCKED design system + copy.md FAQ SECTION):
 *  - Dark band. Section intro from copy: eyebrow "Good questions",
 *    heading "The stuff homeowners actually ask."
 *  - Accessible: each row is a real <button> with aria-expanded and
 *    aria-controls pointing at the answer region (role/aria-labelledby),
 *    keyboard- and screen-reader-friendly. Single-open accordion.
 *  - Animated open/close with motion (height + fade), reduced-motion safe.
 *  - Red accent on the open row: a red left blade rail, the question turns
 *    red, the toggle icon rotates to an X and goes red, and the card border
 *    strengthens. The signature "THE CUT" red used as the active accent.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <section className="section bg-ink">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Good questions"
            title="The stuff homeowners actually ask."
            lead="A few things West Michigan homeowners want to know before they call. If yours isn't here, just reach out, we like questions."
          />

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-faq-btn-${i}`;
              const panelId = `${baseId}-faq-panel-${i}`;

              return (
                <Reveal key={faq.q} delay={i * 0.04}>
                  <div
                    className={cn(
                      "card relative overflow-hidden p-0 transition-colors duration-300",
                      isOpen
                        ? "border-red/40 shadow-[var(--shadow-red)]"
                        : "card-hover",
                    )}
                  >
                    {/* red left rail blade — visible when open */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top -skew-y-0 bg-gradient-to-b from-red to-red-bright transition-transform duration-300",
                        isOpen ? "scale-y-100" : "scale-y-0",
                      )}
                    />

                    <h3>
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="focus-ring flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      >
                        <span
                          className={cn(
                            "font-display text-lg font-bold uppercase leading-snug tracking-[-0.005em] transition-colors duration-300",
                            isOpen ? "text-red" : "text-white",
                          )}
                        >
                          {faq.q}
                        </span>

                        {/* plus -> x toggle */}
                        <span
                          aria-hidden
                          className={cn(
                            "relative grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "rotate-45 border-red/50 bg-red/10 text-red"
                              : "border-[var(--hairline-strong)] bg-charcoal text-silver",
                          )}
                        >
                          <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                          <span className="absolute h-3.5 w-0.5 rounded bg-current" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          initial={
                            reduce
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          animate={
                            reduce
                              ? { opacity: 1 }
                              : { height: "auto", opacity: 1 }
                          }
                          exit={
                            reduce
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.34,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 pr-10 leading-relaxed text-silver sm:px-6 sm:pb-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

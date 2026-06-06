"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ServiceFaq as ServiceFaqType } from "@/lib/site";

/**
 * ServiceFaq — accessible single-open accordion for a service page's own FAQs.
 *
 * Same accordion mechanics and red "THE CUT" active accent as the sitewide
 * components/sections/Faq.tsx, but takes the FAQ list as a prop so it can render
 * each service's `service.faqs` (Faq reads the global sitewide list and takes no
 * props). Accessible: real <button> rows with aria-expanded / aria-controls,
 * single-open, reduced-motion safe.
 */
export function ServiceFaq({ items }: { items: ServiceFaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-sfaq-btn-${i}`;
        const panelId = `${baseId}-sfaq-panel-${i}`;

        return (
          <div
            key={faq.q}
            className={cn(
              "card relative overflow-hidden p-0 transition-colors duration-300",
              isOpen ? "border-red/40 shadow-[var(--shadow-red)]" : "card-hover",
            )}
          >
            {/* red left rail blade — visible when open */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top bg-gradient-to-b from-red to-red-bright transition-transform duration-300",
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
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }
                  }
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pr-10 leading-relaxed text-silver sm:px-6 sm:pb-6">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default ServiceFaq;

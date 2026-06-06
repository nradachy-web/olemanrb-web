"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { cta, site } from "@/lib/site";

/**
 * Sticky mobile call/quote dock (mobile only, lg:hidden).
 *
 * A fixed bottom bar present sitewide so the two primary conversion actions are
 * always one tap away on phones: call (616) 232-5300 and Get a Free Quote.
 * Dark glass background, safe-area padding for notched devices.
 *
 * Desktop hides it (the header keeps phone + quote CTA visible there instead).
 */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* the dock surface: dark glass + top hairline + the red blade motif edge */}
      <div className="border-t border-[var(--hairline-strong)] bg-[var(--glass-fill-2)] backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.55)]">
        <div
          aria-hidden
          className="h-[2px] w-full bg-gradient-to-r from-transparent via-red to-transparent opacity-80"
        />
        <div className="grid grid-cols-2 gap-2.5 px-3 py-3">
          {/* CALL — tel: link */}
          <a
            href={site.phoneHref}
            aria-label={`Call Ole Man RB's at ${site.phone}`}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-[var(--hairline-strong)] px-3 py-3.5 font-sans text-[0.9rem] font-bold uppercase tracking-[0.04em] leading-none text-light transition-colors duration-200 hover:border-red hover:text-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <Phone
              className="phone-glyph size-[1.05em] text-silver transition-colors duration-200 group-hover:text-red"
              aria-hidden
            />
            Call Now
          </a>

          {/* GET A FREE QUOTE — internal route */}
          <Link
            href={cta.primaryHref}
            aria-label={cta.primary}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm bg-red px-3 py-3.5 font-sans text-[0.9rem] font-bold uppercase tracking-[0.04em] leading-none text-white shadow-[var(--shadow-red)] transition-all duration-200 hover:bg-red-bright active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            {cta.quoteShort}
            <ArrowRight
              className="size-[1.05em] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StickyCallBar;

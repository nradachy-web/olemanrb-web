"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Blade } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import { nav, site, cta } from "@/lib/site";

/**
 * Header — fixed, z-50, dark tone-switch (the inverse of TLC's light bar).
 *
 * Default (over the cinematic hero): transparent backdrop, white Logo (tone="light"),
 * white nav text. On scroll past 24px (or when the mobile panel is open): switches to a
 * SOLID DARK glass bar (bg-[var(--glass-fill-2)] + backdrop-blur-md) with a bottom
 * hairline and soft shadow. The Logo stays white in both states because the bar is dark.
 *
 * Right cluster: phone link "(616) 232-5300" (tel:, PhoneIcon, white -> red on hover) +
 * the single primary CTA "Get a Free Quote" (-> /contact).
 *
 * Active link: short static red blade indicator ("THE CUT" motif) under the label.
 * Mobile: hamburger -> full-screen dark AnimatePresence panel (bg-ink) with large links,
 * phone + Get a Free Quote pinned at the bottom. Locks body scroll while open.
 *
 * Reads all content from lib/site (nav, site.phone/phoneHref, cta). No client props.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // tone-switch on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile panel on route change
  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll while the mobile panel is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  const isActive = (href: string) => {
    // home/hash links (e.g. "/#reviews") never mark a desktop route active
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "bg-[var(--glass-fill-2)] backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(0,0,0,0.8)] border-b border-[var(--hairline)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-x flex w-full items-center justify-between py-3.5">
        {/* Logo stays white over the dark hero and the dark solid bar alike */}
        <Logo tone="light" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "link-underline relative px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300",
                  active ? "text-white" : "text-light/85 hover:text-white",
                )}
              >
                {item.label}
                {active && (
                  <Blade
                    animate={false}
                    width="w-5"
                    className="absolute left-4 -bottom-0.5 h-[3px]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[0.95rem] font-semibold text-white transition-colors hover:text-red md:inline-flex"
          >
            <Phone className="size-[1.05rem]" aria-hidden />
            <span>{site.phone}</span>
          </a>
          <span className="hidden sm:inline-flex">
            <Button href={cta.primaryHref} variant="primary">
              {cta.primary}
            </Button>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/[0.08] lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile full-screen dark panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-[72px] z-40 flex flex-col bg-ink lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile"
              className="container-x flex flex-1 flex-col gap-1 overflow-y-auto py-6"
            >
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-4 font-display text-2xl font-bold uppercase tracking-[-0.01em] transition-colors",
                      active
                        ? "text-white"
                        : "text-light/90 hover:bg-white/[0.05] hover:text-white",
                    )}
                  >
                    {active && (
                      <Blade animate={false} width="w-6" className="h-[4px] shrink-0" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </motion.nav>

            {/* Phone + primary CTA pinned at the bottom */}
            <div className="container-x flex flex-col gap-3 border-t border-[var(--hairline)] py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 text-lg font-semibold text-white transition-colors hover:text-red"
              >
                <Phone className="size-5" aria-hidden />
                {site.phone}
              </a>
              <Button href={cta.primaryHref} variant="primary" size="lg" withArrow className="w-full">
                {cta.primary}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;

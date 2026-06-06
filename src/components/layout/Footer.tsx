import Link from "next/link";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CutDivider } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import {
  site,
  cta,
  services,
  serviceAreas,
  moreAreas,
  googleRating,
} from "@/lib/site";

/**
 * Footer — the true-black anchor at the base of every page.
 *
 * Spec (LOCKED design system §5):
 *  - bg-pure-black, top edge is the .cut-divider (the "THE CUT" motif as separator).
 *  - Four zones: (1) Logo (light tone) + one-line positioning + Google rating stars,
 *    (2) Services (all 6 linked), (3) Service Areas (11 cities; the 7 full areas
 *    linked, the 4 more-areas as text), (4) Contact (address, tel, mailto, big quote CTA).
 *  - Bottom bar: copyright + "Licensed & Insured" badge in text-muted.
 *  - Fixed year string (no runtime clock) for deterministic static export.
 */
export function Footer() {
  const year = "2026";

  return (
    <footer className="relative isolate overflow-hidden bg-pure-black text-light">
      {/* top edge: the red blade-cut divider (the brand motif as separator) */}
      <CutDivider className="!my-0" />

      {/* ---------------------------------------------------------------- */}
      {/* link zones                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.3fr] lg:gap-10 lg:py-20">
        {/* Zone 1 — brand + positioning + Google rating */}
        <div className="max-w-xs sm:col-span-2 lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-6 text-pretty text-sm leading-relaxed text-silver">
            Licensed and insured tree pros across {site.regionShort}. Fast,
            clean, dependable.
          </p>

          {/* Google rating stars */}
          <div className="mt-6 flex items-center gap-3">
            <div
              className="flex items-center gap-0.5"
              aria-hidden
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-red text-red"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-white">
              {googleRating.score}
            </span>
            <span className="text-xs text-muted">
              ({googleRating.count} Google reviews)
            </span>
          </div>
        </div>

        {/* Zone 2 — services (all 6, linked) */}
        <nav aria-label="Services" className="flex flex-col gap-3.5">
          <p className="eyebrow eyebrow-red mb-1">Services</p>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="link-underline self-start text-sm text-silver transition-colors hover:text-white"
            >
              {s.short}
            </Link>
          ))}
        </nav>

        {/* Zone 3 — service areas (7 linked + 4 text) */}
        <nav aria-label="Service areas" className="flex flex-col gap-3.5">
          <p className="eyebrow eyebrow-red mb-1">Service Areas</p>
          {serviceAreas.map((a) => (
            <Link
              key={a.slug}
              href={`/service-areas/${a.slug}`}
              className="link-underline self-start text-sm text-silver transition-colors hover:text-white"
            >
              {a.name}
            </Link>
          ))}
          {moreAreas.map((a) => (
            <span key={a.slug} className="text-sm text-muted">
              {a.name}
            </span>
          ))}
        </nav>

        {/* Zone 4 — contact + primary CTA */}
        <div className="flex flex-col gap-4">
          <p className="eyebrow eyebrow-red mb-1">Get In Touch</p>

          <p className="flex items-start gap-3 text-sm text-silver">
            <MapPin className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
            <span>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </span>
          </p>

          <a
            href={site.phoneHref}
            className="group flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-red"
          >
            <Phone className="size-4 shrink-0 text-red" aria-hidden />
            {site.phone}
          </a>

          <a
            href={site.emailHref}
            className="group flex items-center gap-3 break-all text-sm text-silver transition-colors hover:text-white"
          >
            <Mail className="size-4 shrink-0 text-red" aria-hidden />
            {site.email}
          </a>

          <Button
            href={cta.primaryHref}
            variant="primary"
            size="lg"
            withArrow
            className="mt-3 w-full"
          >
            {cta.primary}
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* bottom bar                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-[var(--hairline)]">
        <div
          className={cn(
            "container-x flex flex-col gap-4 py-6",
            "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="text-xs text-muted">
            © {year} {site.legalName}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-[3px] w-5 -skew-x-12 bg-red"
              />
              Licensed &amp; Insured
            </span>
            <span aria-hidden className="text-faint">
              ·
            </span>
            <a
              href="https://modernapexstrategies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver transition-colors hover:text-white"
            >
              Site by Modern Apex Strategies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

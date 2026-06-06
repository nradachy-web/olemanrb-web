import Link from "next/link";
import { MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { serviceAreas, moreAreas, site } from "@/lib/site";

/* ================================================================== */
/* AREA CHIP — a single linked service-area card                       */
/* ================================================================== */
function AreaChip({
  href,
  name,
  county,
}: {
  href: string;
  name: string;
  county: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Tree service in ${name}, ${site.address.state}`}
      className={cn(
        "group focus-ring relative flex items-center justify-between gap-4 overflow-hidden rounded-md",
        "border border-[var(--hairline)] bg-charcoal px-5 py-4",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5 hover:border-red/45 hover:bg-graphite hover:shadow-[var(--shadow-card)]",
      )}
    >
      {/* left blade-slash that wipes in on hover (the "THE CUT" motif) */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 -skew-y-0 bg-gradient-to-b from-red to-red-bright transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-ink text-silver transition-colors duration-300 group-hover:border-red/40 group-hover:text-red">
          <MapPin className="size-5" strokeWidth={1.7} aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display font-semibold uppercase tracking-[0.005em] text-white">
            {name}
          </span>
          <span className="block truncate text-sm text-muted">{county}</span>
        </span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red"
        aria-hidden
      />
    </Link>
  );
}

/* ================================================================== */
/* AREAS GRID — reusable (home + /service-areas index)                */
/* ================================================================== */
export function AreasGrid({
  showMore = true,
  className = "",
}: {
  /** also render the name-only "more areas" as static chips */
  showMore?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <RevealGroup
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.05}
      >
        {serviceAreas.map((area) => (
          <RevealItem key={area.slug}>
            <AreaChip
              href={`/service-areas/${area.slug}`}
              name={area.name}
              county={area.county}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {showMore && moreAreas.length > 0 && (
        <Reveal className="mt-5 flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-medium text-muted">
            Also serving
          </span>
          {moreAreas.map((a) => (
            <span
              key={a.slug}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--hairline)] bg-charcoal px-3 py-1.5 text-sm text-silver"
            >
              <MapPin className="size-3.5 text-red/80" strokeWidth={1.8} aria-hidden />
              {a.name}
            </span>
          ))}
        </Reveal>
      )}
    </div>
  );
}

/* ================================================================== */
/* AREAS SECTION — homepage block                                     */
/* ================================================================== */
export function Areas({
  eyebrow = "Where we work",
  title = "Rooted in Belding, working across West Michigan.",
  lead = "Our shop is in Belding and we cover the surrounding towns with fast, dependable tree service. If you do not see your town, just ask. Chances are we are already nearby.",
  showSeeAll = true,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  showSeeAll?: boolean;
}) {
  return (
    <section className="section relative isolate bg-ink">
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowTone="red"
          title={title}
          lead={lead}
          align="center"
          className="mb-12"
        />

        <AreasGrid />

        {showSeeAll && (
          <Reveal className="mt-12 flex justify-center">
            <Link
              href="/service-areas"
              className="link-underline group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em] text-white transition-colors hover:text-red"
            >
              See all service areas
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Areas;

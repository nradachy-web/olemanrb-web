import Link from "next/link";
import {
  TreeDeciduous,
  Scissors,
  CloudLightning,
  Hammer,
  Construction,
  Trees,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Card, SectionHeading } from "@/components/ui/Primitives";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import { services, mainServices, type Service, type ServiceIcon } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* ICON MAP — site.ts ServiceIcon keys → lucide-react glyphs          */
/* (lucide has no "Crane"; Construction reads as the crane/equipment) */
/* ------------------------------------------------------------------ */
const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  removal: TreeDeciduous,
  trimming: Scissors,
  storm: CloudLightning,
  stump: Hammer,
  crane: Construction,
  clearing: Trees,
};

/** The featured tier-1 card (crane removal) gets the red accent treatment. */
const FEATURED_SLUG = "crane-assisted-removal";

/* ================================================================== */
/* SERVICE CARD                                                        */
/* ================================================================== */
export function ServiceCard({
  service,
  featured = false,
  className = "",
}: {
  service: Service;
  /** render the red blade-slash accent treatment (featured / crane card) */
  featured?: boolean;
  className?: string;
}) {
  const Icon = serviceIcons[service.icon];
  // 4 feature bullets per card; the page carries the full list.
  const bullets = service.features.slice(0, 4);

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`${service.name} — learn more`}
      className="group block h-full focus-ring rounded-lg"
    >
      <Card
        variant={featured ? "accent" : "solid"}
        machined={featured}
        className={cn(
          "flex h-full flex-col gap-0 overflow-hidden !p-0",
          className,
        )}
      >
        {/* image top */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={asset(service.image)}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
            width={1800}
            height={1013}
            className="h-full w-full object-cover object-[50%_40%] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          {/* dark wash so the icon chip + edge read on any photo */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"
          />
          {featured && (
            <span
              aria-hidden
              className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-sm bg-red/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white shadow-[var(--shadow-red)] ring-1 ring-black/20 backdrop-blur-sm"
            >
              <span className="inline-block h-[3px] w-3 -skew-x-12 bg-white/90" />
              Specialty
            </span>
          )}
          {/* icon chip, overlapping the image base */}
          <span
            aria-hidden
            className={cn(
              "absolute -bottom-6 left-6 grid size-12 place-items-center rounded-md border backdrop-blur-md transition-colors duration-300",
              featured
                ? "border-red/40 bg-red/15 text-red-bright"
                : "border-[var(--hairline-strong)] bg-[var(--glass-fill-2)] text-silver group-hover:text-red",
            )}
          >
            <Icon className="size-6" strokeWidth={1.6} />
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6 pt-9 md:p-7 md:pt-10">
          <h3
            className={cn(
              "h3-card",
              featured ? "text-red-bright" : "text-white",
            )}
          >
            {service.name}
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[2.85em] text-[0.95rem] leading-relaxed text-silver text-pretty">
            {service.oneLine}
          </p>

          {/* feature bullets */}
          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[0.9rem] leading-snug text-silver"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-red"
                  strokeWidth={2.4}
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* learn more */}
          <span
            className={cn(
              "mt-auto pt-7 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.04em]",
              "transition-colors duration-300",
              featured ? "text-red-bright" : "text-white group-hover:text-red",
            )}
          >
            Learn more
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}

/* ================================================================== */
/* SERVICES GRID — reusable card grid (home + /services index)        */
/* ================================================================== */
export function ServicesGrid({
  items = services,
  featuredSlug = FEATURED_SLUG,
  className = "",
}: {
  items?: Service[];
  /** which slug gets the accent treatment; pass null to disable */
  featuredSlug?: string | null;
  className?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6",
        className,
      )}
    >
      {items.map((service) => (
        <RevealItem key={service.slug} className="h-full">
          <ServiceCard
            service={service}
            featured={service.slug === featuredSlug}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/* ================================================================== */
/* SERVICES SECTION — homepage block                                  */
/* ================================================================== */
export function Services({
  eyebrow = "What we do",
  title = "Tree work, handled start to spotless finish.",
  lead = "From a single hazard tree to a full lot clearing, one dependable West Michigan crew that answers the phone, shows up on time, and leaves your yard cleaner than we found it.",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="section relative isolate bg-ink-2">
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          eyebrowTone="red"
          title={title}
          lead={lead}
          className="mb-12 sm:mb-14"
        />
        <ServicesGrid items={mainServices} />
      </div>
    </section>
  );
}

export default Services;

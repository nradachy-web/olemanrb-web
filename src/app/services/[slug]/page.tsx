import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  TreeDeciduous,
  Scissors,
  CloudLightning,
  Hammer,
  Construction,
  Trees,
  ArrowUpRight,
  ArrowRight,
  Check,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { ServiceFaq } from "@/components/sections/ServiceFaq";
import {
  SectionHeading,
  Eyebrow,
  Blade,
} from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import {
  services,
  serviceAreas,
  seo,
  site,
  type Service,
  type ServiceBlock,
  type ServiceIcon,
} from "@/lib/site";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";

/* ------------------------------------------------------------------ */
/* ICON MAP — mirrors components/sections/Services.tsx                  */
/* (lucide has no "Crane"; Construction reads as the crane/equipment)  */
/* ------------------------------------------------------------------ */
const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  removal: TreeDeciduous,
  trimming: Scissors,
  storm: CloudLightning,
  stump: Hammer,
  crane: Construction,
  clearing: Trees,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const entry = seo[slug];
  return {
    title: entry?.title ?? `${service.name} in ${site.regionShort}`,
    description: entry?.description ?? `${service.promise} ${service.intro}`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

/* ------------------------------------------------------------------ */
/* BLOCK — renders one ordered content block (dark-styled)             */
/* ------------------------------------------------------------------ */
function Block({ block }: { block: ServiceBlock }) {
  if (block.kind === "callout") {
    return (
      <div className="card machined-edge relative overflow-hidden p-7 sm:p-9">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-px top-8 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
        />
        <p className="eyebrow eyebrow-red">{block.heading}</p>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-silver">
          {block.body}
        </p>
      </div>
    );
  }

  if (block.kind === "prose") {
    return (
      <div>
        <h2 className="font-display text-balance text-[clamp(1.5rem,2.8vw,2rem)] font-bold uppercase leading-tight tracking-[-0.005em] text-white">
          {block.heading}
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          {block.body.map((p) => (
            <p
              key={p}
              className="text-pretty text-lg leading-relaxed text-silver"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // list (default + "warn" tone)
  const warn = block.tone === "warn";
  return (
    <div>
      <h2 className="font-display text-balance text-[clamp(1.5rem,2.8vw,2rem)] font-bold uppercase leading-tight tracking-[-0.005em] text-white">
        {block.heading}
      </h2>
      {block.intro && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-silver">
          {block.intro}
        </p>
      )}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3.5 rounded-md border border-[var(--hairline)] bg-charcoal px-4 py-3.5"
          >
            {warn ? (
              <span
                className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-faint"
                aria-hidden
              >
                <span className="h-0.5 w-3 rounded bg-muted" />
              </span>
            ) : (
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-red text-white"
                aria-hidden
              >
                <Check className="size-4" strokeWidth={2.6} />
              </span>
            )}
            <span className="leading-relaxed text-light">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================== */
/* SERVICE DETAIL PAGE                                                 */
/* ================================================================== */
export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug);
  const schema = serviceSchema(service.slug);

  // split the ordered blocks around a cinematic photo band
  const splitAt = Math.ceil(service.blocks.length / 2);
  const leadBlocks = service.blocks.slice(0, splitAt);
  const restBlocks = service.blocks.slice(splitAt);
  const bandImage = service.gallery[1] ?? service.gallery[0];

  // a few nearby areas to cross-link (first 4 full-page areas)
  const relatedAreas = serviceAreas.slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          ...(schema ? [schema] : []),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.name, url: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      <PageHero
        eyebrow="Tree service"
        title={service.name}
        subtitle={service.promise}
        image={service.heroImage}
        imageAlt={service.imageAlt}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      {/* ---------------- lead: intro + framed photo ---------------- */}
      <section className="section bg-ink-2">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow tone="red">The work</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <Blade animate={false} width="w-16" className="mt-5" />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-pretty text-[clamp(1.15rem,1.7vw,1.4rem)] leading-relaxed text-light">
                  {service.intro}
                </p>
              </Reveal>

              {/* quick feature chips */}
              <Reveal delay={0.16}>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-semibold text-silver">
                  {service.features.slice(0, 4).map((point) => (
                    <li
                      key={point}
                      className="inline-flex items-center gap-2"
                    >
                      <Check
                        className="size-4 shrink-0 text-red"
                        strokeWidth={2.6}
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="#quote" variant="primary" size="lg" withArrow>
                    Get a Free Quote
                  </Button>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 text-[0.92rem] font-semibold text-silver transition-colors hover:text-red-bright"
                  >
                    <Phone className="size-4" aria-hidden />
                    or call {site.phone}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--hairline)] shadow-[var(--shadow-card)]">
                <img
                  src={asset(service.gallery[0] ?? service.image)}
                  alt={service.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute left-5 top-5 grid size-12 place-items-center rounded-md border border-[var(--hairline-strong)] bg-[var(--glass-fill-2)] text-red-bright backdrop-blur-md"
                >
                  <Icon className="size-7" strokeWidth={1.6} />
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- longDescription prose ---------------- */}
      <section className="section bg-ink pb-0">
        <div className="container-x">
          <Reveal className="mx-auto flex max-w-4xl flex-col gap-5">
            {service.longDescription.map((p) => (
              <p
                key={p}
                className="text-pretty text-lg leading-relaxed text-silver"
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- ordered content blocks (split by photo band) ---------------- */}
      <section className="bg-ink pt-16 sm:pt-20">
        <div className="container-x">
          <div className="mx-auto flex max-w-4xl flex-col gap-14">
            {leadBlocks.map((block, i) => (
              <Reveal key={`${block.kind}-${i}`} delay={0.04}>
                <Block block={block} />
              </Reveal>
            ))}
          </div>
        </div>
        <div className="h-16 sm:h-20" />
      </section>

      {bandImage && (
        <section className="relative h-[46vh] min-h-[300px] overflow-hidden">
          <img
            src={asset(bandImage)}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55"
          />
          <span
            aria-hidden
            className="grit pointer-events-none absolute inset-0"
          />
        </section>
      )}

      {restBlocks.length > 0 && (
        <section className="section bg-ink">
          <div className="container-x">
            <div className="mx-auto flex max-w-4xl flex-col gap-14">
              {restBlocks.map((block, i) => (
                <Reveal key={`${block.kind}-rest-${i}`} delay={0.04}>
                  <Block block={block} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- process: how this job goes ---------------- */}
      <section className="section bg-ink-2">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it goes"
            eyebrowTone="red"
            title="From your call to a spotless finish."
            lead="No mystery, no runaround. Here is exactly how we handle your job, start to finish."
            align="center"
            className="mb-12"
          />
          <RevealGroup className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {service.process.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="card card-hover machined-edge relative h-full overflow-hidden p-7">
                  <span
                    aria-hidden
                    className="font-display block text-[2.6rem] font-bold leading-none text-red/25"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-xl font-bold uppercase tracking-[0.005em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-silver">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- best-fit customer ---------------- */}
      {service.bestFit && (
        <section className="section bg-ink">
          <div className="container-x">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow tone="red" className="justify-center">
                Who it is for
              </Eyebrow>
              <p className="font-display mt-6 text-balance text-[clamp(1.3rem,2.6vw,2rem)] font-bold uppercase leading-[1.1] tracking-[-0.005em] text-white">
                {service.bestFit}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- service FAQs ---------------- */}
      {service.faqs.length > 0 && (
        <section className="section bg-ink-2">
          <div className="container-x">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <SectionHeading
                eyebrow="Good questions"
                eyebrowTone="red"
                title={`${service.short}, answered.`}
                lead="The things West Michigan homeowners ask us most about this job. If yours is not here, just call and ask."
              />
              <ServiceFaq items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ---------------- the outcome (red band) ---------------- */}
      {service.outcome && (
        <section className="section relative isolate overflow-hidden woodgrain bg-red-blood text-white">
          <span
            aria-hidden
            className="hazard-stripe hazard-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px]"
          />
          <div className="container-x">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="eyebrow text-white/80">The result</p>
              <p className="font-display mt-6 text-balance text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold uppercase leading-[1.12]">
                {service.outcome}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- estimate form (primary conversion) ---------------- */}
      <section className="section relative isolate overflow-hidden bg-ink">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-red/[0.14] blur-[120px]"
        />
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="Get started"
              eyebrowTone="red"
              title={`Ready for ${service.short.toLowerCase()}?`}
              lead="Send the form and our team follows up within 24 hours with a clear, written quote. No cost, no pressure. Storm or hazard emergency? Call us now and we move."
            />
            <Reveal delay={0.08}>
              <EstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- related areas ---------------- */}
      <section className="section bg-ink-2">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-white">
            {service.short} across West Michigan
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-silver">
            Rooted in Belding, we bring {service.short.toLowerCase()} to
            homeowners across the region.
          </p>
          <RevealGroup
            className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.05}
          >
            {relatedAreas.map((area) => (
              <RevealItem key={area.slug}>
                <Link
                  href={`/service-areas/${area.slug}`}
                  aria-label={`Tree service in ${area.name}, ${site.address.state}`}
                  className={cn(
                    "group focus-ring flex items-center justify-between gap-3 rounded-md border border-[var(--hairline)] bg-charcoal px-5 py-4",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:border-red/45 hover:bg-graphite hover:shadow-[var(--shadow-card)]",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-ink text-silver transition-colors duration-300 group-hover:border-red/40 group-hover:text-red">
                      <MapPin className="size-4" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span className="font-display font-semibold uppercase tracking-[0.005em] text-white">
                      {area.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red"
                    aria-hidden
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8">
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
        </div>
      </section>

      {/* ---------------- other services ---------------- */}
      <section className="section bg-ink">
        <div className="container-x">
          <h2 className="font-display text-2xl font-bold uppercase tracking-[0.005em] text-white">
            Explore our other services
          </h2>
          <RevealGroup
            className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {others.map((s: Service) => {
              const OtherIcon = serviceIcons[s.icon];
              return (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className={cn(
                      "group focus-ring flex items-center justify-between gap-4 rounded-md border border-[var(--hairline)] bg-charcoal px-5 py-4",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:border-red/45 hover:bg-graphite hover:shadow-[var(--shadow-card)]",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-ink text-silver transition-colors duration-300 group-hover:border-red/40 group-hover:text-red">
                        <OtherIcon className="size-5" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="font-display font-semibold uppercase tracking-[0.005em] text-white">
                        {s.short}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red"
                      aria-hidden
                    />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

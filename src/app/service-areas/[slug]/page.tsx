import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Axe,
  TreeDeciduous,
  Scissors,
  CloudLightning,
  Hammer,
  Construction,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  services,
  serviceAreas,
  moreAreas,
  site,
  seoTemplates,
  type ServiceIcon,
} from "@/lib/site";
import { JsonLd, breadcrumbSchema, areaServiceSchema } from "@/lib/schema";

/* ------------------------------------------------------------------ */
/* STATIC PARAMS — the 7 full service-area pages (chip-only towns      */
/* in moreAreas don't get their own page until promoted with intro[]). */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

/* ------------------------------------------------------------------ */
/* GEO-TARGETED METADATA                                               */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: PageProps<"/service-areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};

  const title = seoTemplates.serviceArea.title.replace("{City}", area.name);
  const description = seoTemplates.serviceArea.description
    .replace("{City}", area.name)
    .replace("{County}", area.county);

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

/* ------------------------------------------------------------------ */
/* ICON MAP — ServiceIcon keys → lucide glyphs (matches Services.tsx)  */
/* ------------------------------------------------------------------ */
const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  removal: TreeDeciduous,
  trimming: Scissors,
  storm: CloudLightning,
  stump: Hammer,
  crane: Construction,
  clearing: Trees,
};

/* "Why this city calls us" — defensible, no fabricated claims. */
const reasons: { icon: LucideIcon; text: string }[] = [
  { icon: Clock, text: "Fast, local response. We are based right here in West Michigan." },
  { icon: ShieldCheck, text: "Licensed and insured, with proof provided gladly." },
  { icon: Axe, text: "The right gear for big, hazardous, tight-access removals." },
  { icon: Sparkles, text: "A straight quote and a spotless cleanup, every time." },
];

export default async function ServiceAreaPage({
  params,
}: PageProps<"/service-areas/[slug]">) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  // Resolve cross-links from the area's `nearby` slugs (full pages first), then
  // backfill with other full areas so we always show up to 4 destinations.
  const allFull = serviceAreas;
  const nearbyFromList = area.nearby
    .map((s) => allFull.find((a) => a.slug === s))
    .filter((a): a is (typeof serviceAreas)[number] => Boolean(a) && a!.slug !== area.slug);
  const backfill = allFull.filter(
    (a) => a.slug !== area.slug && !nearbyFromList.some((n) => n.slug === a.slug),
  );
  const nearby = [...nearbyFromList, ...backfill].slice(0, 4);

  const cityState = `${area.name}, ${site.address.state}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Service Areas", url: "/service-areas" },
            { name: area.name, url: `/service-areas/${area.slug}` },
          ]),
          areaServiceSchema(area.slug) ?? {},
        ]}
      />

      <PageHero
        eyebrow={area.county}
        title={`Tree Service in ${area.name}, MI`}
        titleKeyword={area.name}
        subtitle={`Licensed, insured tree removal, trimming, and storm cleanup for ${area.name} and the surrounding ${area.county} country. Industry-leading response and a spotless cleanup, every time.`}
        image={seoTemplates.ogImage}
        imageAlt={`Tree service in ${cityState} by Ole Man RB's`}
        crumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: area.name },
        ]}
      />

      {/* ---------------- INTRO + WHY-US RAIL ---------------- */}
      <section className="section relative isolate bg-ink">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            {/* unique per-city copy */}
            <div className="max-w-2xl">
              <Reveal>
                <Eyebrow tone="red">Your local tree crew</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="font-display mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white">
                  Dependable tree work for{" "}
                  <span className="text-red text-glow-red">{area.name}</span>{" "}
                  homeowners.
                </h2>
              </Reveal>

              <div className="mt-6 flex flex-col gap-5">
                {area.intro.map((para, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="text-pretty text-[1.05rem] leading-[1.7] text-silver">
                      {para}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* why-us card */}
            <Reveal delay={0.12}>
              <div className="card machined-edge relative overflow-hidden p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-px top-8 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
                />
                <span className="grid size-12 place-items-center rounded-md border border-[var(--hairline-strong)] bg-ink text-red">
                  <MapPin className="size-6" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="font-display mt-5 text-[1.35rem] font-bold uppercase tracking-[-0.005em] text-white">
                  Why {area.name} calls us
                </h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {reasons.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-silver"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-red"
                        strokeWidth={2.4}
                        aria-hidden
                      />
                      <span className="flex items-start gap-2">
                        <Icon
                          className="mt-0.5 hidden size-4 shrink-0 text-muted sm:block"
                          strokeWidth={1.7}
                          aria-hidden
                        />
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={site.phoneHref}
                  className="link-underline group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em] text-white transition-colors hover:text-red"
                >
                  Call {site.phone}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES OFFERED ---------------- */}
      <section className="section relative isolate bg-ink-2">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services in this area"
            eyebrowTone="red"
            title={`Everything your ${area.name} trees might need.`}
            lead={`One dependable crew, start to spotless finish, across ${area.name} and all of ${area.county}.`}
            className="mb-12"
          />

          <RevealGroup
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <RevealItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    aria-label={`${s.name} in ${area.name}, ${site.address.state}`}
                    className="group focus-ring relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-md border border-[var(--hairline)] bg-charcoal px-5 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-red/45 hover:bg-graphite hover:shadow-[var(--shadow-card)]"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gradient-to-b from-red to-red-bright transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-[var(--hairline-strong)] bg-ink text-silver transition-colors duration-300 group-hover:border-red/40 group-hover:text-red">
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-display font-semibold uppercase tracking-[0.005em] text-white">
                          {s.short}
                        </span>
                        <span className="hidden truncate text-sm text-muted lg:block">
                          {s.oneLine}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red"
                      aria-hidden
                    />
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- ESTIMATE FORM ---------------- */}
      <section className="section relative isolate bg-ink">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow="Free quote"
              eyebrowTone="red"
              title={`Get a free ${area.name} tree quote.`}
              lead={`Tell us what is going on with your tree. We respond within 24 hours with a clear, written price, no pressure and no obligation. Or call ${site.phone} and we will take care of you right away.`}
            />
            <Reveal delay={0.1} className="mx-auto w-full max-w-xl lg:max-w-none">
              <EstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- NEARBY AREAS ---------------- */}
      <section className="section relative isolate bg-ink-2">
        <div className="container-x">
          <Reveal>
            <Eyebrow tone="red">Nearby</Eyebrow>
            <h2 className="font-display mt-4 text-balance text-[clamp(1.6rem,3vw,2.3rem)] font-bold uppercase leading-[1.05] tracking-[-0.005em] text-white">
              We also serve nearby
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-7 flex flex-wrap gap-3">
            {nearby.map((a) => (
              <Link
                key={a.slug}
                href={`/service-areas/${a.slug}`}
                className="group inline-flex items-center gap-2 rounded-sm border border-[var(--hairline)] bg-charcoal px-5 py-2.5 text-sm font-semibold text-light transition-colors duration-300 hover:border-red/45 hover:bg-graphite hover:text-white"
              >
                <MapPin
                  className="size-4 text-red/80 transition-colors group-hover:text-red"
                  strokeWidth={1.8}
                  aria-hidden
                />
                {a.name}, {site.address.state}
              </Link>
            ))}
            {moreAreas.length > 0 && (
              <Link
                href="/service-areas"
                className="link-underline inline-flex items-center gap-1.5 self-center px-2 text-sm font-bold uppercase tracking-[0.04em] text-white transition-colors hover:text-red"
              >
                See all areas
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      <CtaBand
        heading={`Got a tree in ${area.name}? Let's take a look.`}
        sub={`Tell us what is going on and you get a clear, written quote within 24 hours. Then we show up, get it gone, and leave your ${area.name} yard spotless.`}
      />
    </>
  );
}

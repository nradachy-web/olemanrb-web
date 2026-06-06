import type { Metadata } from "next";
import {
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  Axe,
  Quote as QuoteIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow, SectionHeading, Blade } from "@/components/ui/Primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import {
  authorityBullets,
  credentials,
  owner,
  seo,
  site,
  whyUs,
} from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  alternates: { canonical: "/about" },
};

/** Map the whyUs icon keys to lucide components (no fabricated claims, copy verbatim). */
const whyUsIcons = {
  "shield-check": ShieldCheck,
  clock: Clock,
  sparkles: Sparkles,
  axe: Axe,
} as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About Ole Man RB's"
        title="The crew West Michigan calls when the tree has to go."
        titleKeyword="has to go"
        subtitle="Owner-operated in Belding by Chris Holmes. Built on fast response, honest pricing, and work done right."
        image="/photos/crew.jpg"
        imageAlt="The Ole Man RB's tree crew on a West Michigan job"
        crumbs={[{ label: "About" }]}
      />

      {/* ---------------- OWNER STORY (GuideSection-style) ---------------- */}
      <section className="section woodgrain relative overflow-hidden bg-ink">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* owner image with nameplate + licensed seal */}
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[5/6] overflow-hidden rounded-lg border border-[var(--hairline)] shadow-[var(--shadow-lift)]">
                  <img
                    src={asset(owner.image)}
                    alt={owner.imageAlt}
                    className="size-full object-cover"
                    width={1000}
                    height={1200}
                    loading="lazy"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[var(--ink-veil)] via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-5 bottom-5">
                    <p className="font-display text-xl font-bold uppercase leading-none tracking-[-0.01em] text-white">
                      {owner.name}
                    </p>
                    <p className="mt-1.5 text-[0.82rem] font-medium uppercase tracking-[0.14em] text-silver">
                      {owner.title}
                    </p>
                  </div>
                </div>

                <div className="card-frosted absolute -bottom-5 -right-3 flex items-center gap-3 px-5 py-4 sm:-right-5">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                  >
                    <ShieldCheck className="size-6" strokeWidth={2.2} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-condensed text-[0.95rem] font-semibold text-white">
                      Licensed &amp; Insured
                    </p>
                    <p className="text-[0.8rem] text-silver">
                      Fully covered, every job
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* story copy */}
            <div>
              <Reveal>
                <Eyebrow tone="red">Who we are</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white text-balance">
                  Locally owned. Owner-operated. <span className="text-red">Accountable.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-silver text-pretty">
                  Ole Man RB's Tree Service is a locally owned, owner-operated
                  tree company based in Belding, Michigan, and run by{" "}
                  {owner.name}. We serve homeowners across Belding, Rockford,
                  Greenville, Grand Rapids, and the surrounding West Michigan
                  communities with tree removal, trimming, storm cleanup, stump
                  grinding, crane-assisted removal, and lot clearing.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-silver text-pretty">
                  We started this company on a simple frustration that homeowners
                  around here know all too well: you call a handful of tree
                  companies and most of them never call you back. The ones that
                  do leave you a price with no explanation and no timeline. We
                  decided to be the opposite of that. Answer the phone. Show up
                  when we say we will. Give an honest, detailed quote. Do the
                  work right. Clean up like we were never there. That's the whole
                  company, and our customers notice.
                </p>
              </Reveal>

              <RevealGroup className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {authorityBullets.map((b) => (
                  <RevealItem key={b}>
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red/15 text-red"
                      >
                        <Check className="size-3.5" strokeWidth={2.6} />
                      </span>
                      <span className="text-[0.95rem] leading-relaxed text-light">
                        {b}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHY HOMEOWNERS TRUST US ---------------- */}
      <section className="section relative overflow-hidden bg-ink-2">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why homeowners trust us"
            title={
              <>
                The reputation you can't fake.
              </>
            }
            lead="We're fully licensed and insured, so you're protected before anyone touches a tree on your property. We've got the equipment and the know-how for the big, hazardous, near-the-house removals that other crews pass on, including crane-assisted work. And we treat every yard like it belongs to a neighbor, because in West Michigan, it usually does."
          />

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {whyUs.map((w) => {
              const Icon = whyUsIcons[w.icon];
              return (
                <RevealItem key={w.title} className="h-full">
                  <div className="card card-hover machined-edge flex h-full gap-5 p-7">
                    <span
                      aria-hidden
                      className="grid size-12 shrink-0 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                    >
                      <Icon className="size-6" strokeWidth={2.1} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-[-0.005em] text-white">
                        {w.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-silver text-pretty">
                        {w.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- A NOTE FROM CHRIS (motto + owner quote) ---------------- */}
      <section className="section relative isolate overflow-hidden woodgrain bg-ink">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 left-[-10%] -z-10 h-72 w-72 rounded-full bg-red/[0.16] blur-[120px]"
        />
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="mx-auto grid size-14 place-items-center rounded-full bg-red/15 text-red"
            >
              <QuoteIcon className="size-7" strokeWidth={2} />
            </span>
            <Blade animate={false} width="w-20" className="mx-auto mt-6" />
            <p className="mt-7 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-bold uppercase leading-[1.1] tracking-[-0.005em] text-white text-balance">
              "{owner.quote}"
            </p>
            <p className="mt-7 text-[0.85rem] font-semibold uppercase tracking-[0.16em] text-silver">
              {owner.name}, {owner.title}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-silver text-pretty">
              {site.motto}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Get a Free Quote
              </Button>
              <Button href={site.phoneHref} variant="phone" size="lg">
                Call {site.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CREDENTIAL STRIP ---------------- */}
      <section className="relative overflow-hidden bg-pure-black py-14 sm:py-16">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--hairline)] bg-[var(--hairline)] lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.label} className="bg-ink p-6 text-center">
                <dt className="font-display text-[1.05rem] font-bold uppercase tracking-[-0.005em] text-white">
                  {c.label}
                </dt>
                <dd className="mt-1.5 text-[0.85rem] text-silver">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        heading="Let's get your tree handled."
        sub="Owner-operated, licensed, and insured, with a free written quote within 24 hours. Storm damage or a hazard tree? Call now and we'll move."
      />
    </>
  );
}

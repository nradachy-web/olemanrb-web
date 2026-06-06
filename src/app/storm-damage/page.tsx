import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  AlertTriangle,
  ShieldCheck,
  Zap,
  PhoneCall,
  Camera,
  Check,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Blade, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";
import { asset } from "@/lib/asset";
import { services, site, seo } from "@/lib/site";

/**
 * STORM DAMAGE PAGE - the storm / emergency hub at /storm-damage.
 *
 * This is the page StormResponse links to (detailsHref="/storm-damage"). It is the
 * loudest, most phone-forward page on the site: an urgent PageHero over storm-ai.jpg
 * with the .hazard-stripe caution edge, a "what to do if a tree falls" triage block,
 * fast/dependable response messaging (no fabricated 24/7), the full storm-damage-cleanup
 * service detail rendered from site.ts, and the EstimateForm as the conversion anchor.
 *
 * Mirrors the TLC service-page composition shape, restyled to OMRB's dark system.
 * The hazard-stripe motif is allowed here (storm/CTA only).
 */

const stormService = services.find((s) => s.slug === "storm-damage-cleanup")!;

export const metadata: Metadata = {
  title: seo["storm-response"].title,
  description: seo["storm-response"].description,
  alternates: { canonical: "/storm-damage" },
  openGraph: {
    title: seo["storm-response"].title,
    description: seo["storm-response"].description,
    url: "/storm-damage",
    images: [{ url: asset(stormService.heroImage) }],
  },
};

/* "What to do if a tree falls" - fast, calm, safety-first triage. */
const triage: { icon: typeof Zap; title: string; body: string }[] = [
  {
    icon: ShieldCheck,
    title: "Get everyone safe",
    body: "Move people and pets away from the tree and any sagging structure. Do not go under a leaning or hung-up tree, it can shift without warning.",
  },
  {
    icon: Zap,
    title: "Stay clear of power lines",
    body: "Treat every downed or tangled line as live. Keep your distance, keep others back, and call your utility and 911 if a line is involved.",
  },
  {
    icon: PhoneCall,
    title: "Call us right away",
    body: `Call ${site.phone}. Tell us what happened and what the tree is on. We prioritize active hazards and tell you straight how fast we can be there.`,
  },
  {
    icon: Camera,
    title: "Document the damage",
    body: "If it is safe, photograph the tree and the damage before anything is moved. We add our own photos and a written scope for your insurance claim.",
  },
];

export default function StormDamagePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Storm Damage", url: "/storm-damage" },
          ]),
          serviceSchema("storm-damage-cleanup")!,
          faqSchema(stormService.faqs),
        ]}
      />

      {/* ---------- URGENT PAGE HERO ---------- */}
      <div className="relative isolate">
        <span
          aria-hidden
          className="hazard-stripe hazard-sweep pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px]"
        />
        <PageHero
          eyebrow="Storm and emergency response"
          title="Tree on your house? We respond fast."
          titleKeyword="fast"
          subtitle="When a storm drops a tree on your roof, your car, or across the driveway, you need a crew that moves now and knows what it is doing. We make the scene safe, clear the damage, and document everything for your insurance claim."
          image={stormService.heroImage}
          imageAlt={stormService.imageAlt}
          crumbs={[{ label: "Storm Damage" }]}
        />
      </div>

      {/* ---------- FAST-RESPONSE PHONE BAND ---------- */}
      <section className="relative isolate overflow-hidden border-y border-[var(--hairline)] bg-red-blood">
        <span
          aria-hidden
          className="hazard-stripe hazard-sweep pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px]"
        />
        <div className="container-x !py-7 sm:!py-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="mt-0.5 size-7 shrink-0 text-white"
                aria-hidden
              />
              <div>
                <p className="font-display text-[clamp(1.25rem,2.6vw,1.7rem)] font-bold uppercase leading-[1.05] tracking-[-0.01em] text-white">
                  Active hazard right now?
                </p>
                <p className="mt-1 text-pretty text-[0.98rem] leading-snug text-white/85">
                  Do not wait, and do not let an uninsured storm-chaser onto your
                  property. Call the crew that shows up.
                </p>
              </div>
            </div>
            <a
              href={site.phoneHref}
              className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-sm bg-white px-8 py-4 font-sans text-base font-bold uppercase leading-none tracking-[0.04em] text-red-blood transition-all duration-300 hover:bg-white hover:text-red-deep focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.98] sm:w-auto"
            >
              <Phone className="size-[1.15em]" aria-hidden />
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- WHAT TO DO IF A TREE FALLS ---------- */}
      <section className="section relative isolate bg-ink" aria-labelledby="triage-heading">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="red">If a tree just came down</Eyebrow>
            <h2
              id="triage-heading"
              className="font-display mt-5 text-balance text-[clamp(1.9rem,3.6vw,3rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white"
            >
              What to do if a tree falls
            </h2>
            <Blade animate={false} width="w-20" className="mt-5" />
            <p className="lead mt-4 text-pretty text-silver">
              A half-fallen tree, a hung-up limb, or a split trunk is dangerous
              and can get worse fast. Stay calm, stay clear, and work through
              these four steps.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {triage.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="li" key={step.title} delay={i * 0.06}>
                  <div className="card machined-edge relative h-full overflow-hidden p-6">
                    <span
                      aria-hidden
                      className="font-display absolute right-5 top-4 text-[2.4rem] font-bold leading-none text-white/[0.06]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-11 place-items-center rounded-sm bg-red/[0.12] text-red-bright ring-1 ring-red/30">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="font-display mt-5 text-[1.15rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-silver">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- STORM-DAMAGE-CLEANUP SERVICE DETAIL ---------- */}
      <section
        className="section relative isolate bg-ink-2"
        aria-labelledby="service-heading"
      >
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* left: intro + long copy + features */}
            <div>
              <Reveal>
                <Eyebrow tone="red">{stormService.short}</Eyebrow>
                <h2
                  id="service-heading"
                  className="font-display mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white"
                >
                  {stormService.name}
                </h2>
                <Blade animate={false} width="w-20" className="mt-5" />
                <p className="lead mt-5 text-pretty text-silver">
                  {stormService.intro}
                </p>
              </Reveal>

              {stormService.longDescription.map((para, i) => (
                <Reveal key={i} delay={0.04 + i * 0.04}>
                  <p className="mt-4 text-pretty text-[1.02rem] leading-[1.65] text-silver">
                    {para}
                  </p>
                </Reveal>
              ))}

              <Reveal delay={0.1}>
                <h3 className="font-display mt-10 text-[1.2rem] font-bold uppercase tracking-[-0.01em] text-white">
                  What we handle in a storm
                </h3>
                <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {stormService.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-[0.98rem] leading-snug text-light"
                    >
                      <Check
                        className="mt-0.5 size-[1.1em] shrink-0 text-red-bright"
                        aria-hidden
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* right: framed lead image + 3-step process */}
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <figure className="card machined-edge overflow-hidden p-0">
                  <img
                    src={asset(stormService.image)}
                    alt={stormService.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full object-cover"
                  />
                </figure>
              </Reveal>

              <Reveal delay={0.08}>
                <ol className="mt-6 flex flex-col gap-3">
                  {stormService.process.map((step, i) => (
                    <li
                      key={step.title}
                      className="card relative flex gap-4 p-5"
                    >
                      <span className="font-display grid size-9 shrink-0 place-items-center rounded-sm bg-red text-[0.95rem] font-bold text-white shadow-[var(--shadow-red)]">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-display text-[1.02rem] font-bold uppercase tracking-[-0.01em] text-white">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-silver">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>

          {/* service content blocks */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {stormService.blocks.map((block, i) => (
              <Reveal key={i} delay={i * 0.05}>
                {block.kind === "callout" ? (
                  <div className="card card-frosted relative h-full overflow-hidden p-7">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-px top-7 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
                    />
                    <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {block.heading}
                    </h3>
                    <p className="mt-3 text-pretty text-[0.98rem] leading-[1.6] text-silver">
                      {block.body}
                    </p>
                  </div>
                ) : block.kind === "list" ? (
                  <div className="card h-full p-7">
                    <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {block.heading}
                    </h3>
                    {block.intro && (
                      <p className="mt-2 text-[0.95rem] text-silver">
                        {block.intro}
                      </p>
                    )}
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.96rem] leading-snug text-light"
                        >
                          <Check
                            className="mt-0.5 size-[1.05em] shrink-0 text-red-bright"
                            aria-hidden
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="card h-full p-7">
                    <h3 className="font-display text-[1.2rem] font-bold uppercase tracking-[-0.01em] text-white">
                      {block.heading}
                    </h3>
                    {block.body.map((p, j) => (
                      <p
                        key={j}
                        className="mt-3 text-pretty text-[0.98rem] leading-[1.6] text-silver"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          {stormService.outcome && (
            <Reveal delay={0.1}>
              <div className="mt-12 flex items-start gap-4 rounded-md border-l-2 border-red bg-charcoal/60 p-6">
                <ArrowRight
                  className="mt-1 size-5 shrink-0 text-red-bright"
                  aria-hidden
                />
                <p className="text-pretty text-[1.05rem] font-semibold leading-snug text-light">
                  {stormService.outcome}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- STORM FAQ ---------- */}
      <section className="section bg-ink" aria-labelledby="storm-faq-heading">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="red">Storm questions, answered</Eyebrow>
            <h2
              id="storm-faq-heading"
              className="font-display mt-5 text-balance text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold uppercase leading-[1.0] tracking-[-0.005em] text-white"
            >
              When the storm hits, this is what people ask.
            </h2>
            <Blade animate={false} width="w-20" className="mt-5" />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {stormService.faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <h3 className="font-display text-[1.1rem] font-bold leading-snug text-white">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-pretty text-[0.96rem] leading-[1.6] text-silver">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ESTIMATE FORM (conversion anchor) ---------- */}
      <section
        className="section relative isolate overflow-hidden bg-ink-2 woodgrain"
        aria-labelledby="quote-heading"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-red/[0.16] blur-[120px]"
        />
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <Eyebrow tone="red">
                <AlertTriangle className="size-[0.95em]" aria-hidden />
                Get help now
              </Eyebrow>
              <h2
                id="quote-heading"
                className="font-display mt-5 text-balance text-[clamp(2rem,4vw,3rem)] font-bold uppercase leading-[0.98] tracking-[-0.01em] text-white"
              >
                Storm took the tree down. We&apos;ll take it from here.
              </h2>
              <Blade animate={false} width="w-20" className="mt-5" />
              <p className="mt-5 max-w-md text-pretty text-[1.05rem] leading-[1.6] text-silver">
                For an active hazard, calling is fastest. For everything else,
                send the form and we follow up quickly. Either way, you get a
                crew that answers, shows up, and leaves your property spotless.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={site.phoneHref} variant="primary" size="lg">
                  <Phone className="size-[1.05em]" aria-hidden />
                  {site.phone}
                </Button>
                <Link
                  href="/services/storm-damage-cleanup"
                  className="group inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--hairline-strong)] px-8 py-4 font-sans text-base font-bold uppercase leading-none tracking-[0.04em] text-light transition-all duration-300 hover:border-red hover:bg-red/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-red active:scale-[0.98]"
                >
                  More on storm cleanup
                  <ArrowRight
                    className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>

              <p className="mt-6 text-sm font-medium text-muted">
                Licensed, insured, and ready when West Michigan weather turns.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <EstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <CtaBand
        heading="When the storm passes, call the crew that shows up."
        sub="Tell us what came down. You get fast, dependable response, a written scope for your insurance, and a yard cleaned up like the storm was never there."
        tone="red"
      />
    </>
  );
}

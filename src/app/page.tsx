import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { StakesSection } from "@/components/sections/StakesSection";
import { GuideSection } from "@/components/sections/GuideSection";
import { Services } from "@/components/sections/Services";
import { PlanSection } from "@/components/sections/PlanSection";
import { StormResponse } from "@/components/sections/StormResponse";
import { Gallery } from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { CtaBand } from "@/components/sections/CtaBand";

import { CutDivider, Eyebrow, Stat } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

import { JsonLd, faqSchema } from "@/lib/schema";
import { faqs, seo, site, stats } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* METADATA (home)                                                            */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: seo.home.title,
  description: seo.home.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    url: "/",
  },
  twitter: {
    title: seo.home.title,
    description: seo.home.description,
  },
};

/* -------------------------------------------------------------------------- */
/* HOMEPAGE — StoryBrand order                                                */
/*                                                                            */
/* Hero -> Problem -> Stakes -> Guide -> Services -> Plan (light relief) ->   */
/* StormResponse -> Gallery (preview) -> Testimonials -> Faq -> Quote form -> */
/* CtaBand. The site chrome (Header / Footer / StickyCallBar) and the         */
/* LocalBusiness JSON-LD live in app/layout.tsx; this page emits the FAQPage  */
/* JSON-LD from the sitewide faqs.                                            */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* FAQPage structured data, built from the homepage FAQ set */}
      <JsonLd data={faqSchema(faqs)} />

      {/* 1. HERO (credential strip is built into the hero) */}
      <Hero />

      {/* 2. PROBLEM — the homeowner's worries (dark, bg-ink) */}
      <ProblemSection />

      <CutDivider />

      {/* 3. STAKES — the cost of waiting (dark, bg-ink-2) */}
      <StakesSection />

      <CutDivider />

      {/* 4. GUIDE — Ole Man RB's as the dependable guide (dark, bg-ink) */}
      <GuideSection />

      <CutDivider />

      {/* 5. STATS — defensible count-up strip (dark, bg-ink) */}
      <StatsStrip />

      {/* 6. SERVICES — the 6 core services (dark, bg-ink-2) */}
      <Services />

      {/* 7. THE PLAN — 3 steps (light relief, bg-grey-50; hard color step) */}
      <PlanSection />

      {/* 8. STORM RESPONSE — emergency emphasis band (cinematic, hazard edge) */}
      <StormResponse detailsHref="/storm-damage" />

      {/* 9. GALLERY PREVIEW — real job photos (dark, bg-ink) */}
      <Gallery
        limit={6}
        viewAllHref="/gallery"
        ctaHref="#quote"
        background="ink"
        bento
      />

      <CutDivider />

      {/* 10. TESTIMONIALS — the 6 real reviews (dark, bg-ink-2, #reviews) */}
      <Testimonials />

      <CutDivider />

      {/* 11. FAQ — the sitewide questions (dark, bg-ink) */}
      <Faq />

      <CutDivider />

      {/* 12. QUOTE — the primary conversion (dark, bg-ink-2, #quote anchor) */}
      <QuoteSection />

      {/* 13. FINAL CTA BAND (red, hazard top edge, dual CTA) */}
      <CtaBand
        heading="Got a tree that needs to go? Let's get it handled."
        sub="Get a free, detailed quote within 24 hours from the crew West Michigan trusts to show up, do it right, and clean up after. Storm damage or a hazard tree? Call now."
        quoteHref="#quote"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* STATS STRIP — defensible, count-up (copy.md STATS BAR)                      */
/* -------------------------------------------------------------------------- */

function StatsStrip() {
  return (
    <section className="section bg-ink" aria-label="Ole Man RB's at a glance">
      <div className="container-x">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              align="center"
              className="border-l border-[var(--hairline)] pl-5 first:border-l-0 sm:pl-6"
            />
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* QUOTE SECTION — embeds the primary-conversion EstimateForm                  */
/* (copy.md CONTACT / QUOTE PAGE intro + contact details block)               */
/* -------------------------------------------------------------------------- */

function QuoteSection() {
  const details = [
    { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "Email", value: site.email, href: site.emailHref },
    { icon: MapPin, label: "Based in", value: site.address.full },
    {
      icon: Clock,
      label: "Response",
      value: "Free quote within 24 hours. Emergencies, call now.",
    },
  ];

  return (
    <section className="section relative isolate bg-ink-2" aria-labelledby="quote-heading">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* intro + contact details */}
          <div>
            <Reveal>
              <Eyebrow tone="red">Get your free quote</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="quote-heading"
                className="h2-display mt-5 text-white text-balance"
              >
                Tell us about your tree.{" "}
                <span className="text-red">We'll handle the rest.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="lead mt-4 text-pretty">
                Fill out the form or give us a call. We'll get back to you within
                24 hours with a free, detailed quote, no cost and no obligation.
                Got a storm or hazard emergency, like a tree on your house or
                blocking access? Call us right now at{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-red-bright hover:text-white"
                >
                  {site.phone}
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-9 flex flex-col gap-5">
                {details.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label} className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className="grid size-11 shrink-0 place-items-center rounded-md border border-[var(--hairline-strong)] bg-steel text-red"
                      >
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <div>
                        <dt className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {d.label}
                        </dt>
                        <dd className="mt-0.5 text-[1.02rem] leading-relaxed text-light">
                          {d.href ? (
                            <a
                              href={d.href}
                              className="link-underline hover:text-white"
                            >
                              {d.value}
                            </a>
                          ) : (
                            d.value
                          )}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </div>

          {/* the primary conversion form */}
          <Reveal delay={0.1}>
            <EstimateForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

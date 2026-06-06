import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/Services";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading, Blade } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { mainServices, seo, site, brand } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />

      <PageHero
        eyebrow="What we do"
        title="Tree work, handled start to spotless finish."
        titleKeyword="spotless"
        subtitle="From a single hazard tree to a full lot clearing, one dependable West Michigan crew that answers the phone, shows up on time, and leaves your yard cleaner than we found it."
        image="/photos/big-tree.jpg"
        imageAlt="An Ole Man RB's crew taking down a massive tree on a West Michigan property"
        crumbs={[{ label: "Services" }]}
      />

      {/* ---------------- services grid ---------------- */}
      <section className="section relative isolate bg-ink-2">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our services"
            eyebrowTone="red"
            title="Six ways we take the tree off your plate."
            lead="Pick a service to see exactly what the job involves, when homeowners call us for it, and the spotless result you can expect. Every one is licensed, insured, and cleaned up like we were never there."
            className="mb-12 sm:mb-14"
          />
          <ServicesGrid items={mainServices} />
        </div>
      </section>

      {/* ---------------- guide / reassurance strip ---------------- */}
      <section className="section bg-ink">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Blade animate={false} width="w-16" className="mx-auto" />
            <p className="font-display mt-6 text-balance text-[clamp(1.5rem,3.4vw,2.4rem)] font-bold uppercase leading-[1.04] tracking-[-0.005em] text-white">
              {brand.lines[0]}
            </p>
            <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-silver">
              {site.areaServedLine} Not sure which service you need? Tell us
              what is going on and we will point you the right way, no pressure.
            </p>
            <Link
              href="/service-areas"
              className="link-underline group mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.04em] text-white transition-colors hover:text-red"
            >
              See where we work
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- estimate form (primary conversion) ---------------- */}
      <section className="section relative isolate overflow-hidden bg-ink-2">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-72 w-72 rounded-full bg-red/[0.14] blur-[120px]"
        />
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="Get started"
              eyebrowTone="red"
              title="Tell us about your tree."
              lead="Whatever the job, it starts with a free quote. Send the form and our team follows up within 24 hours with a clear, written price. Storm or hazard emergency? Call us now and we move."
            />
            <Reveal delay={0.08}>
              <EstimateForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

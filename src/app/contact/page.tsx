import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { EstimateForm } from "@/components/sections/EstimateForm";
import Faq from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { faqs, seo, serviceAreas, site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: Phone,
    label: "Call or text",
    value: site.phone,
    href: site.phoneHref,
    note: "Storm or hazard emergency? Call now.",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: site.emailHref,
  },
  {
    icon: MapPin,
    label: "Located in",
    value: site.address.full,
  },
  {
    icon: Clock,
    label: "Response",
    value: "Free quote within 24 hours.",
  },
];

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.full,
  )}&output=embed`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="Get your free quote"
        title="Tell us about your tree. We'll handle the rest."
        titleKeyword="your tree"
        subtitle="Fill out the form or give us a call. We'll get back to you within 24 hours with a free, detailed quote, no cost and no obligation. Got a storm or hazard emergency? Call us right now at (616) 232-5300."
        image="/photos/crane-removal.jpg"
        imageAlt="An Ole Man RB's crane-assisted tree removal in progress in West Michigan."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section relative overflow-hidden woodgrain bg-ink">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            {/* form is the primary conversion */}
            <Reveal>
              <EstimateForm />
            </Reveal>

            {/* contact details column */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6">
                <div className="card machined-edge relative overflow-hidden p-7">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-px top-8 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
                  />
                  <h2 className="font-display text-xl font-bold uppercase tracking-[-0.005em] text-white">
                    Reach us directly
                  </h2>
                  <ul className="mt-6 flex flex-col gap-5">
                    {details.map((d) => {
                      const Icon = d.icon;
                      const content = (
                        <>
                          <span
                            aria-hidden
                            className="grid size-11 shrink-0 place-items-center rounded-md bg-red/15 text-red"
                          >
                            <Icon className="size-5" strokeWidth={2.1} />
                          </span>
                          <span>
                            <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted">
                              {d.label}
                            </span>
                            <span className="font-display text-[1.05rem] font-semibold text-white">
                              {d.value}
                            </span>
                            {d.note && (
                              <span className="mt-0.5 block text-[0.85rem] text-red-bright">
                                {d.note}
                              </span>
                            )}
                          </span>
                        </>
                      );
                      return (
                        <li key={d.label}>
                          {d.href ? (
                            <a
                              href={d.href}
                              className="flex items-start gap-4 transition-opacity hover:opacity-80"
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="flex items-start gap-4">
                              {content}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="card-frosted p-7">
                  <span
                    aria-hidden
                    className="grid size-11 place-items-center rounded-md bg-red text-white shadow-[var(--shadow-red)]"
                  >
                    <ShieldCheck className="size-6" strokeWidth={2.1} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-[-0.005em] text-white">
                    What to expect
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-silver text-pretty">
                    Send the form or call and we'll follow up within 24 hours.
                    You get a clear, written quote with the full job description
                    and pricing, no vague estimates and no surprises. Then we
                    show up when we say we will and leave your yard spotless.
                  </p>
                  <p className="mt-4 text-[0.9rem] text-silver">
                    <span className="font-semibold text-white">
                      Proudly serving:
                    </span>{" "}
                    {serviceAreas.map((a) => a.name).join(", ")}, and surrounding
                    West Michigan.
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-[var(--hairline)]">
                  <iframe
                    src={mapSrc}
                    title={`Map of ${site.name} in ${site.address.city}, ${site.address.state}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full grayscale"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}

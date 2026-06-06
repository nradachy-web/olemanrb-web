import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AreasGrid } from "@/components/sections/Areas";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/Primitives";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { serviceAreas, seo, site } from "@/lib/site";

export const metadata: Metadata = {
  title: seo["service-areas"].title,
  description: seo["service-areas"].description,
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
        ])}
      />

      <PageHero
        eyebrow="Where we work"
        title="Tree service across West Michigan."
        titleKeyword="West Michigan"
        subtitle={`Our shop is in Belding and we cover ${serviceAreas.length} core towns and the country in between with fast, dependable tree work. If you do not see your town, just ask. Chances are we are already nearby.`}
        image="/photos/hero-ai.jpg"
        imageAlt="A cinematic golden-hour tree removal in West Michigan with an Ole Man RB's crane"
        crumbs={[{ label: "Service Areas" }]}
      />

      {/* communities grid */}
      <section className="section relative isolate bg-ink">
        <div className="container-x">
          <SectionHeading
            eyebrow="Communities we serve"
            eyebrowTone="red"
            title="Local crew that knows your trees and your weather."
            lead="We live and work here. That means faster response, a real read on what West Michigan winters and summer storms do to our trees, and a crew that treats your yard like a neighbor's."
            align="center"
            className="mb-12"
          />

          <AreasGrid />
        </div>
      </section>

      <CtaBand heading={`Serving your town across ${site.regionShort}.`} />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { seo } from "@/lib/site";

/**
 * GALLERY PAGE - the full real-work showcase.
 *
 * Composition mirrors the TLC gallery page (PageHero + full grid + closing CTA),
 * restyled to OMRB's dark system: an urgent compact PageHero over a real crane
 * removal photo, the signature masonry Gallery (full set, lightbox), and the bold
 * closing CtaBand. No before/after slider, the cinematic real-job grid is the proof.
 */

export const metadata: Metadata = {
  title: seo.gallery.title,
  description: seo.gallery.description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: seo.gallery.title,
    description: seo.gallery.description,
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ])}
      />

      <PageHero
        eyebrow="Real jobs, real yards"
        title="See the work."
        titleKeyword="work"
        subtitle="Real Ole Man RB's removals, trims, crane lifts, and storm calls across West Michigan. Every photo is our own crew, our own gear, and the spotless cleanup that proves the job is not done until the yard is."
        image="/photos/crane-removal.jpg"
        imageAlt="An Ole Man RB's crane lifting a large tree section over a West Michigan home"
        crumbs={[{ label: "Gallery" }]}
      />

      <Gallery
        showIntro
        eyebrow="The proof is in the yard"
        heading="Big trees. Tight takedowns. Spotless cleanups."
        intro="Tap any photo to view it full size. These are real West Michigan jobs, from a single hazard tree over the garage to full lot clearings, all handled by the crew that shows up."
        background="ink"
        ctaHref="/contact"
        ctaLabel="Get a Free Quote on Your Tree"
      />

      <CtaBand
        heading="Picture your own yard, handled."
        sub="Send us a few details about your tree and you get a clear, written quote within 24 hours. Then we show up, get it gone, and leave your property spotless."
        tone="red"
      />
    </>
  );
}

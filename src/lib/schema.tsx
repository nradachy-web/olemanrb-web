import {
  googleRating,
  moreAreas,
  serviceAreas,
  services,
  site,
  testimonials,
} from "@/lib/site";

/**
 * JSON-LD helpers for Ole Man RB's Tree Service.
 *
 * Mirrors the structure of treelovingcare-web/lib/schema.tsx, restyled for OMRB.
 * All data is sourced from "@/lib/site" so there is one source of truth.
 *
 * CONFIRM-BEFORE-LAUNCH values (do NOT invent live data):
 *   - site.url          live apex domain (placeholder until confirmed)
 *   - site.geo          Belding, MI city-center approximation, not the verified GBP pin
 *   - site.facebook     empty until the real profile URL is confirmed (sameAs filters empties)
 *   - googleRating      score "5.0" / count 6 = the six verified named reviews in hand
 * Each is flagged with a // TODO below. None are fabricated.
 */

/** Phone in E.164-ish schema form, derived from the canonical tel: href (no fabrication). */
const telephone = site.phoneHref.replace(/^tel:/, "");

/** Belding, MI is the single business location for all geo-scoped schema. */
const ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.state,
  postalCode: site.address.zip,
  addressCountry: "US",
};

/** All served cities (full pages + chip-only), as schema City nodes. */
const AREA_SERVED = [...serviceAreas, ...moreAreas].map((a) => ({
  "@type": "City" as const,
  name: `${a.name}, ${site.address.state}`,
}));

/** Review nodes from the six real, verbatim testimonials. Reused inline + standalone. */
function reviewNodes() {
  return testimonials.map((t) => ({
    "@type": "Review" as const,
    author: { "@type": "Person" as const, name: t.name },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.quote,
  }));
}

/**
 * LocalBusiness / TreeService schema for the homepage.
 * @type prioritizes TreeService (the meaningful refinement) then the generic fallbacks.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TreeService", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${site.url}/#business`,
    name: site.legalName,
    description: site.description,
    url: site.url, // TODO: confirm live apex domain before launch
    telephone,
    email: site.email,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/icon.png`,
    priceRange: "$$",
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      // TODO: replace with the verified Google Business Profile pin before launch
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: AREA_SERVED,
    // Hours per site.hours ("Mon to Sat, 7am to 7pm"); do not claim 24/7.
    openingHours: "Mo-Sa 07:00-19:00",
    founder: { "@type": "Person", name: site.owner.name },
    aggregateRating: {
      "@type": "AggregateRating",
      // TODO: update to the live Google total once confirmed (currently the 6 verified reviews)
      ratingValue: googleRating.score,
      reviewCount: googleRating.count,
      bestRating: "5",
    },
    review: reviewNodes(),
    // TODO: populate with the real Google Business Profile / social URLs when confirmed.
    sameAs: [site.facebook].filter(Boolean),
    knowsAbout: services.map((s) => s.name),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.promise,
      },
    })),
  };
}

/** Per-service Service schema (service page). Returns null for an unknown slug. */
export function serviceSchema(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.intro,
    serviceType: service.name,
    provider: { "@id": `${site.url}/#business` },
    areaServed: AREA_SERVED,
    url: `${site.url}/services/${service.slug}`,
  };
}

/**
 * Geo-targeted Service schema for a service-area page. Returns null for an
 * unknown slug. Describes OMRB's tree service scoped to one city, referencing
 * the business via @id and offering the full catalog as an OfferCatalog.
 * No fabricated data: name, county, and service list all come from site.ts.
 */
export function areaServiceSchema(slug: string) {
  const area = [...serviceAreas, ...moreAreas].find((a) => a.slug === slug);
  if (!area) return null;
  const cityState = `${area.name}, ${site.address.state}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tree Service in ${cityState}`,
    description: `Licensed and insured tree removal, trimming, storm damage cleanup, stump grinding, crane-assisted removal, and lot clearing in ${cityState}.`,
    serviceType: "Tree Service",
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: cityState },
    url: `${site.url}/service-areas/${area.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Tree services offered in ${cityState}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.promise,
        },
      })),
    },
  };
}

/**
 * Standalone AggregateRating + Review schema, for any page that wants reviews
 * without the full LocalBusiness node. References the business via @id.
 */
export function reviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${site.url}/#business` },
    // TODO: update to the live Google total once confirmed.
    ratingValue: googleRating.score,
    reviewCount: googleRating.count,
    bestRating: "5",
    review: reviewNodes(),
  };
}

/** BreadcrumbList for service / service-area pages. Pass site-relative urls. */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
}

/** FAQPage from any page's faqs array (sitewide faqs on home/contact, service.faqs per service). */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders one or more JSON-LD objects as <script type="application/ld+json"> tags. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

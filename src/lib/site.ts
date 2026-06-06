/**
 * Ole Man RB's Tree Service, single source of truth for site content.
 *
 * Positioning (StoryBrand): the West Michigan homeowner is the hero; Ole Man RB's
 * is the dependable guide that answers the phone, shows up on time, handles the big
 * and hazardous removals, and leaves the yard spotless. Owner-operated in Belding, MI
 * by Chris Holmes. Licensed and insured. Single primary CTA everywhere: "Get a Free Quote."
 *
 * Mirrors the proven content-as-data shape of treelovingcare-web/lib/site.ts, restyled
 * to OMRB's locked dark design system. Image fields use the REAL flat filenames present
 * in /public/photos (the nested placeholder paths from the content schema are overridden).
 *
 * Hard rules honored: no em/en dashes anywhere; no fabricated years in business,
 * certifications, license numbers, crew size, awards, or job counts; only the 6 real
 * named Google reviews; phone rendered as (616) 232-5300 / tel:+16162325300 everywhere.
 */

/* -------------------------------------------------------------------------- */
/* BRAND / NAP / CONSTANTS                                                     */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "Ole Man RB's Tree Service",
  legalName: "Ole Man RB's Tree Service LLC",
  shortName: "Ole Man RB's",
  /** Placeholder until the apex domain is confirmed; used only to build absolute
   * URLs in JSON-LD. Do not surface in copy. Confirm before launch. */
  url: "https://olemanrbs.com",
  description:
    "Licensed and insured tree removal, trimming, storm damage cleanup, stump grinding, crane-assisted removal, and lot clearing across Belding, Rockford, Greenville, Grand Rapids, and surrounding West Michigan. Industry-leading response times and a spotless cleanup, every time.",
  tagline: "Save the headache. Call the crew that shows up.",
  region: "West Michigan",
  regionShort: "West Michigan",
  phone: "(616) 232-5300",
  phoneHref: "tel:+16162325300",
  email: "olemanrb@gmail.com",
  emailHref: "mailto:olemanrb@gmail.com",
  address: {
    street: "1002 N Bridge St",
    city: "Belding",
    state: "MI",
    zip: "48807",
    full: "1002 N Bridge St, Belding, MI 48807",
  },
  /** No fabricated 24/7. Fast storm/hazard response is the real claim. */
  hours: "Open daily. Free quote within 24 hours. Storm or hazard emergency, call now.",
  owner: {
    name: "Chris Holmes",
    title: "Owner and Operator",
  },
  /** Placeholder. schema.tsx sameAs filters empties; populate when the real URL is confirmed. */
  facebook: "",
  /** Belding, MI approximate for GeoCoordinates in JSON-LD; refine with the verified GBP pin. */
  geo: { lat: 43.0978, lng: -85.2289 },
  motto:
    "When the tree has to go, and it has to be done right, you call Ole Man RB's.",
  areaServedLine:
    "Belding, Rockford, Greenville, Grand Rapids, Ionia, Lowell, Cedar Springs, Sparta, Lakeview, Stanton, Sheridan, and surrounding West Michigan.",
} as const;

/** CTA strings, single source. Every button reads from here. */
export const cta = {
  primary: "Get a Free Quote",
  primaryHref: "/contact",
  /** Use this when an EstimateForm is embedded on the page. */
  primaryAnchor: "#quote",
  phoneLabel: "Call (616) 232-5300",
  phoneShort: "Call Now",
  storm: "Storm Damage? Call Now",
  quoteShort: "Free Quote",
} as const;

/**
 * Brand colors, read-only echo of globals.css @theme for non-CSS consumers
 * (OG image, JSON-LD image, any inline use). Source of truth stays in globals.css.
 */
export const colors = {
  red: "#FF3131",
  redBright: "#FF5A45",
  redDeep: "#B81E1E",
  black: "#000000",
  ink: "#0A0A0B",
  white: "#FFFFFF",
  grey50: "#F1F3F5",
  silver: "#B7BBC2",
} as const;

/* -------------------------------------------------------------------------- */
/* CORE BRAND LANGUAGE                                                         */
/* -------------------------------------------------------------------------- */

export const brand = {
  primaryLine: "West Michigan's fast, dependable tree removal.",
  coreBelief:
    "When a tree has to come down, you want pros who answer the phone, show up on time, and leave your yard spotless.",
  supporting:
    "We are licensed and insured, we move fast, and we treat your property like it is our own. From a single hazard tree to a full lot clearing, we handle it start to spotless finish.",
  audience:
    "We help West Michigan homeowners and property owners get hazardous, overgrown, and storm-damaged trees handled fast, safely, and without the headache.",
  /** Homepage uses heroHeadline; reuse the alts on landing and service pages. */
  heroHeadline: "Tree removal that actually shows up.",
  /** The key word rendered in red. */
  heroHeadlineKeyword: "shows up",
  heroHeadlineAlt: [
    "West Michigan's fast, dependable tree removal.",
    "The tree service that calls you back.",
    "Big trees. Hazardous removals. Handled.",
  ],
  heroSub:
    "Licensed and insured tree removal, trimming, and storm cleanup for Belding, Rockford, Greenville, Grand Rapids, and surrounding West Michigan. Industry-leading response times and a spotless cleanup, every time. Get a free quote within 24 hours.",
  heroStarLine: "5-star rated by West Michigan homeowners on Google.",
  empathyLine:
    "You shouldn't have to wonder whether the tree in your yard is protecting your home or threatening it.",
  /** Short, quotable lines for section accents and dividers. */
  lines: [
    "We answer the phone. We show up. We get it gone.",
    "Save the headache. Choose the pros.",
    "Gone for good, cleaned like we were never there.",
    "Too big, too close, too dangerous? That's our specialty.",
    "Licensed, insured, and on time.",
    "Storm took the tree down. We'll take it from here.",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* HERO TRUST STRIP                                                            */
/* -------------------------------------------------------------------------- */

export type Credential = { label: string; detail: string };

export const credentials: Credential[] = [
  { label: "Licensed & Insured", detail: "Fully covered, every job" },
  { label: "Industry-Leading Response", detail: "Free quote within 24 hours" },
  { label: "5-Star Rated Locally", detail: "Real reviews from real neighbors" },
  { label: "Spotless Cleanup", detail: "We leave it cleaner than we found it" },
];

/* -------------------------------------------------------------------------- */
/* THE 3-STEP PLAN                                                            */
/* -------------------------------------------------------------------------- */

export type PlanStep = { step: string; title: string; body: string };

export const plan: PlanStep[] = [
  {
    step: "01",
    title: "Schedule a Quote",
    body: "Request a free quote. Tell us about the tree and your property, and our team contacts you within 24 hours. No pressure, no obligation.",
  },
  {
    step: "02",
    title: "Make a Hiring Decision",
    body: "You get a detailed quote by email with the full job description and clear pricing. No vague estimates, no surprises, just a straight answer you can decide on.",
  },
  {
    step: "03",
    title: "Book Your Service",
    body: "Pick a time that works for you and we schedule the appointment. We handle everything, start to spotless finish, and treat your yard like our own.",
  },
];

/* -------------------------------------------------------------------------- */
/* TYPES                                                                       */
/* -------------------------------------------------------------------------- */

/** Ordered content blocks unique to each service page (verbatim TLC contract). */
export type ServiceBlock =
  | {
      kind: "list";
      heading: string;
      intro?: string;
      items: string[];
      /** "warn" styles a "what we won't do / what we avoid" list. */
      tone?: "default" | "warn";
    }
  | { kind: "callout"; heading: string; body: string }
  | { kind: "prose"; heading: string; body: string[] };

/** OMRB has no specialty tier; all 6 services are "main". */
export type ServiceTier = "main";

/** lucide-react icon keys (mapped to components in components/ui/Icons.tsx). */
export type ServiceIcon =
  | "removal"
  | "trimming"
  | "storm"
  | "stump"
  | "crane"
  | "clearing";

export type ProcessStep = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  /** full page/H1 name */
  name: string;
  /** short label for cards, footer, related links */
  short: string;
  tier: ServiceTier;
  /** one-line value promise; card copy + page-hero subtitle */
  promise: string;
  /** ultra-short tagline for chips/nav/cards */
  oneLine: string;
  /** lead paragraph for the service page */
  intro: string;
  /** 2 to 4 body paragraphs, the SEO/intent body copy */
  longDescription: string[];
  /** 4 to 6 quick benefit bullets (chip/checklist row near top) */
  features: string[];
  /** 3-step "how this job goes" (per-service mini-plan) */
  process: ProcessStep[];
  /** 2 to 3 service-specific objections (seed + FAQ schema) */
  faqs: ServiceFaq[];
  /** ordered content blocks, the deep page body */
  blocks: ServiceBlock[];
  /** who it's for */
  bestFit?: string;
  /** closing result line, red/dark band */
  outcome?: string;
  icon: ServiceIcon;
  /** primary service photo (framed lead image) */
  image: string;
  /** page-hero background (may equal image; allows a wider crop) */
  heroImage: string;
  /** alt text for image/heroImage */
  imageAlt: string;
  /** [framed lead image, full-width mid-page band] */
  gallery: string[];
};

export type ServiceArea = {
  slug: string;
  /** city name (components read `name`) */
  name: string;
  county: string;
  /** unique per-city paragraphs */
  intro: string[];
  /** slugs of neighboring areas to cross-link */
  nearby: string[];
};

export type MoreArea = { slug: string; name: string; county: string };

export type Testimonial = {
  name: string;
  quote: string;
  rating: 5;
  /** optional relative time or source */
  when?: string;
  /** optional city if known */
  location?: string;
};

export type Stat = { value: number; suffix?: string; label: string };

export type WhyUs = {
  icon: "shield-check" | "clock" | "sparkles" | "axe";
  title: string;
  body: string;
};

export type Faq = { q: string; a: string };

export type NavItem = { label: string; href: string };

export type GalleryItem = { src: string; alt: string };

export type SeoEntry = { title: string; description: string };

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                    */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  /* ----------------------------- 6.1 Tree Removal ---------------------------- */
  {
    slug: "tree-removal",
    name: "Tree Removal",
    short: "Tree Removal",
    tier: "main",
    icon: "removal",
    oneLine: "Gone for good. Cleaned like we were never there.",
    promise:
      "Hazardous, overgrown, or just in the way? We take it down and haul it off, fast and clean.",
    intro:
      "When a tree has to come down, you want a crew that answers the phone, shows up on time, and gets it gone without tearing up your yard. That is exactly what we do. From a single dead tree to a row of overgrown giants, we remove it safely, haul off every limb, and leave your property spotless.",
    longDescription: [
      "Tree removal is high-risk work, and the wrong crew can drop a limb on your roof, gouge your lawn, or vanish before the cleanup is done. We are licensed and insured, we plan every drop, and we treat your property like our own.",
      "Big, leaning, or right next to the house? That is our specialty. For the tightest and most dangerous removals we bring in a crane to lift heavy sections up and over your yard instead of dragging equipment across it. You get the tree gone with minimal impact to your lawn, beds, and fences.",
      "Every removal ends the same way: branches chipped, wood hauled or stacked to your preference, and the work area raked clean. You should barely be able to tell we were there, except the problem tree is gone.",
    ],
    features: [
      "Licensed and insured, fully covered",
      "Free on-site quote within 24 hours",
      "Big and hazardous removals welcome",
      "Crane available for tight, near-structure jobs",
      "Complete debris haul-off",
      "Spotless cleanup, every time",
    ],
    process: [
      {
        title: "Free quote",
        body: "We come look at the actual tree, the access, and what is around it, then send a clear written price.",
      },
      {
        title: "Safe takedown",
        body: "We plan every cut and drop, rig where needed, and bring the crane for big or near-structure trees.",
      },
      {
        title: "Clean haul-off",
        body: "We chip the brush, haul or stack the wood, and rake the area clean before we leave.",
      },
    ],
    faqs: [
      {
        q: "How much does tree removal cost?",
        a: "It depends on the tree's size and height, the species, how close it is to your house or power lines, and whether you want the stump ground and debris hauled. That is why the quote is free and based on the actual tree, so you get a clear written price with no surprises.",
      },
      {
        q: "Will you wreck my lawn taking it down?",
        a: "No. We plan the work to protect your property, rig sections down where needed, and for tight or near-structure trees we use a crane to lift pieces over the yard instead of dragging equipment across it. Our reviews say it best: you can barely tell we were there.",
      },
      {
        q: "Can you handle a huge or dangerous tree?",
        a: "Yes. Big, leaning, or right next to the house is our specialty. We bring the right gear, including a crane when the job calls for it, and do it safely.",
      },
    ],
    blocks: [
      {
        kind: "list",
        heading: "When homeowners call us",
        intro: "It is usually time to remove a tree when:",
        items: [
          "The tree is dead, dying, or hollow",
          "It is leaning or storm-damaged over your house, garage, or car",
          "It is too close to power lines or the structure",
          "Roots are lifting your driveway, walkway, or foundation",
          "It dropped a major limb and you are worried about the next one",
          "You are clearing space for a build, addition, or new landscaping",
        ],
      },
      {
        kind: "callout",
        heading: "The crew West Michigan calls when it has to go",
        body: "Plenty of homeowners tell us they called several companies and either nobody called back or the quotes made no sense. We answer the phone, we give you a real quote with a timeline, and we show up when we say we will. That is the whole point of Ole Man RB's.",
      },
      {
        kind: "list",
        heading: "What's included with every removal",
        items: [
          "Full takedown, safely rigged where needed",
          "Crane-assisted lifts for big or tight jobs",
          "All brush chipped on site",
          "Wood hauled off or stacked, your call",
          "Stump grinding available as an add-on",
          "Complete cleanup and rake-down",
        ],
      },
    ],
    bestFit:
      "Best for homeowners who want a hazardous or overgrown tree gone fast, done safely, and cleaned up completely, by a crew that actually shows up.",
    outcome:
      "The problem tree is gone, your property is spotless, and you finally have one tree guy you can trust to call back.",
    image: "/photos/tree-removal.jpg",
    heroImage: "/photos/tree-removal.jpg",
    imageAlt:
      "An Ole Man RB's climber taking down a large tree in sections beside a West Michigan home",
    gallery: ["/photos/big-tree.jpg", "/photos/lift-crew.jpg"],
  },

  /* ----------------------------- 6.2 Tree Trimming --------------------------- */
  {
    slug: "tree-trimming",
    name: "Tree Trimming",
    short: "Tree Trimming",
    tier: "main",
    icon: "trimming",
    oneLine: "Cleaner, safer, better-looking trees.",
    promise:
      "Clear the limbs off your roof and power lines and shape your trees the right way.",
    intro:
      "Overgrown limbs scraping the roof, crowding the power line, or blocking the light do not fix themselves, and a bad trim job can do more harm than good. We trim trees to clear hazards, protect your home, and keep them healthy and looking sharp.",
    longDescription: [
      "Good trimming is about more than appearance. Removing dead, weak, and rubbing limbs reduces the chance of a branch coming down in the next storm, keeps weight off the structure, and lets the tree put energy where it counts.",
      "We clear limbs off roofs, driveways, walkways, and power-line clearances, thin crowded canopies for light and airflow, and shape young trees so they grow strong instead of into a future problem. And like every job we do, we clean up every clipping before we leave.",
    ],
    features: [
      "Clearance trimming off roofs, drives, and lines",
      "Deadwood and hazard-limb removal",
      "Canopy thinning for light and airflow",
      "Shaping that keeps trees healthy",
      "Licensed and insured",
      "Full cleanup after every trim",
    ],
    process: [
      {
        title: "Free quote",
        body: "We look at the trees and your goals, then send a clear written price.",
      },
      {
        title: "Skilled trimming",
        body: "We make clean, proper cuts that clear hazards without harming the tree.",
      },
      {
        title: "Clean cleanup",
        body: "Every limb and clipping chipped and hauled, the area raked clean.",
      },
    ],
    faqs: [
      {
        q: "When is the best time to trim?",
        a: "Most trees can be trimmed any time of year, and hazard or clearance limbs should be handled whenever you notice them. For shaping and health pruning, dormant season is often ideal. Tell us your goal and we will advise.",
      },
      {
        q: "Do you trim limbs off my roof and power lines?",
        a: "Yes. Clearing limbs off roofs, gutters, driveways, and utility-line clearances is one of our most common jobs. For limbs touching the primary power line itself, that may be the utility's responsibility, and we will tell you which is which.",
      },
    ],
    blocks: [
      {
        kind: "list",
        heading: "Trimming homeowners ask us for",
        items: [
          "Limbs over the roof, garage, or driveway",
          "Branches crowding the power line or blocking light",
          "Dead, cracked, or hanging limbs",
          "Crowded canopies that need thinning",
          "Young trees that need shaping early",
          "Storm-stressed limbs that should come off before they fail",
        ],
      },
      {
        kind: "callout",
        heading: "The right cut, not just any cut",
        body: "A bad trim, topping, or over-cutting can leave a tree weak and dangerous. We make clean, proper cuts that clear the hazard and keep the tree healthy, so you are not paying to fix it twice.",
      },
    ],
    bestFit:
      "Best for homeowners who want limbs cleared off the house and their trees kept healthy, safe, and sharp without the mess.",
    outcome:
      "Your roof and lines are clear, your trees look great, and the yard is spotless when we drive away.",
    image: "/photos/hero-trim.jpg",
    heroImage: "/photos/hero-trim.jpg",
    imageAlt:
      "An Ole Man RB's climber making a clean clearance cut over a West Michigan rooftop",
    gallery: ["/photos/lift-canopy.jpg", "/photos/bucket-lift.jpg"],
  },

  /* ------------------------- 6.3 Storm Damage Cleanup ------------------------ */
  {
    slug: "storm-damage-cleanup",
    name: "Storm Damage Cleanup",
    short: "Storm Cleanup",
    tier: "main",
    icon: "storm",
    oneLine: "Storm took it down. We'll take it from here.",
    promise:
      "Tree on your house, car, or blocking the drive? We respond fast and make it safe.",
    intro:
      "When a storm snaps a tree onto your house, your car, or across the driveway, you need a crew that responds fast and knows what they are doing. We make the scene safe, clear the damage, and help you document everything for your insurance claim.",
    longDescription: [
      "Storm damage is stressful and time-sensitive. A half-fallen tree, a hung-up limb, or a split trunk is dangerous and can get worse fast. We respond quickly, secure the situation, and remove the damage carefully so nothing else gets hurt.",
      "Here is what most crews will not tell you: when a tree falls on a covered structure from a covered storm, your homeowners insurance often covers removal and repair. We photograph the damage and give you a written scope so you have exactly what you need for your claim. That is a headache off your plate when you need it most.",
    ],
    features: [
      "Fast storm and hazard response",
      "Trees off houses, cars, and driveways",
      "Hung-up and broken limbs made safe",
      "Insurance documentation: photos and written scope",
      "Licensed and insured",
      "Complete debris cleanup and haul-off",
    ],
    process: [
      {
        title: "Call now",
        body: "Reach us fast at (616) 232-5300 and tell us what happened. We prioritize active hazards.",
      },
      {
        title: "Make it safe",
        body: "We secure the scene, clear the immediate danger, and assess what comes next.",
      },
      {
        title: "Clear and document",
        body: "We remove the damage, haul it off, and photograph and write up the scope for your insurance.",
      },
    ],
    faqs: [
      {
        q: "A tree fell on my house. What do I do first?",
        a: "Get everyone to safety, stay clear of any downed power lines, and call us at (616) 232-5300. We respond fast, make the scene safe, and document the damage for your insurance claim.",
      },
      {
        q: "Will my insurance cover storm tree removal?",
        a: "Often yes, when a tree falls on a covered structure due to a covered peril like wind. Coverage and caps vary by policy, and a tree that fell from rot or hit nothing may not be covered. We document the damage with photos and a written scope so you have what you need to file.",
      },
      {
        q: "How fast can you get here?",
        a: "Storm and hazard response is where we move fastest. Call us and we will tell you straight how soon we can be there. We do not claim 24/7 we cannot deliver, but fast, dependable response is our reputation.",
      },
    ],
    blocks: [
      {
        kind: "list",
        heading: "Storm work we handle",
        items: [
          "Trees down on a house, garage, shed, or fence",
          "A tree or limb on a vehicle",
          "Trees blocking your driveway or road access",
          "Hung-up, split, or partially fallen trees",
          "Broken and hanging limbs after high wind or ice",
          "Full debris cleanup and haul-off",
        ],
      },
      {
        kind: "callout",
        heading: "We document it for your insurance",
        body: "Most crews just want the job. We photograph the damage and give you a written scope of what happened and what it takes to fix it, so your claim goes smoother. One real customer had a massive cherrywood come down on their shed in a storm, and we took it from there.",
      },
    ],
    bestFit:
      "Best for homeowners dealing with fresh storm damage who need fast, safe removal and help getting their insurance claim handled.",
    outcome:
      "The danger is cleared by people who do this for a living, your property is cleaned up, and your claim is documented.",
    image: "/photos/storm-ai.jpg",
    heroImage: "/photos/storm-ai.jpg",
    imageAlt:
      "An Ole Man RB's crew clearing a storm-fallen tree off a West Michigan home",
    gallery: ["/photos/marked-tree.jpg", "/photos/cleanup.jpg"],
  },

  /* ----------------------------- 6.4 Stump Grinding -------------------------- */
  {
    slug: "stump-grinding",
    name: "Stump Grinding",
    short: "Stump Grinding",
    tier: "main",
    icon: "stump",
    oneLine: "Grind it down. Reclaim the yard.",
    promise:
      "Finish the job. We grind the stump down and clear the trip hazard for good.",
    intro:
      "A leftover stump is a trip hazard, a mowing headache, a magnet for pests, and an eyesore. We grind stumps down below grade so you can reclaim the space, replant, reseed, or just mow straight over it.",
    longDescription: [
      "After a tree comes down, the stump is the last thing standing between you and a finished yard. We grind it below the surface, leaving clean grindings you can use to backfill or have hauled away, so the area is ready to use again.",
      "We grind stumps from our own removals and stumps left behind by other crews. Got a few of them scattered around the property from years of DIY cuts? We will knock them all out in one trip.",
    ],
    features: [
      "Ground below grade, not just shaved off",
      "Old leftover stumps welcome",
      "Multiple stumps in one trip",
      "Grindings backfilled or hauled, your call",
      "Ready to replant or reseed",
      "Clean finish, every time",
    ],
    process: [
      {
        title: "Free quote",
        body: "Tell us how many stumps and where, and we send a clear price.",
      },
      {
        title: "Grind it down",
        body: "We grind each stump well below grade with the right machine for the spot.",
      },
      {
        title: "Clean and level",
        body: "We backfill or haul the grindings and leave the ground ready to use.",
      },
    ],
    faqs: [
      {
        q: "How deep do you grind the stump?",
        a: "We grind below grade, typically several inches under the surface, so you can reseed, replant, or mow over it without the stump in the way. Tell us if you plan to plant something there and we will grind deeper.",
      },
      {
        q: "Do you grind stumps from another company's removal?",
        a: "Yes. We grind stumps no matter who took the tree down, including old ones that have been sitting for years. We can knock out several in one visit.",
      },
    ],
    blocks: [
      {
        kind: "list",
        heading: "Reasons to grind that stump",
        items: [
          "Kill the trip hazard in the yard",
          "Stop mowing around it for years",
          "Cut off a home for pests and decay",
          "Clear space to replant or reseed",
          "Finish a removal so the yard looks done",
          "Knock out several old stumps at once",
        ],
      },
    ],
    bestFit:
      "Best for homeowners who just had a tree removed, or have old stumps hanging around, and want the ground clean, level, and ready to use.",
    outcome:
      "The stump is gone below the surface, the ground is ready to mow or plant, and your yard finally looks finished.",
    image: "/photos/stump-grinding.jpg",
    heroImage: "/photos/stump-grinding.jpg",
    imageAlt:
      "An Ole Man RB's stump grinder taking a stump down to clean, level soil in a West Michigan backyard",
    gallery: ["/photos/chipper.jpg", "/photos/cleanup.jpg"],
  },

  /* ------------------------- 6.5 Crane-Assisted Removal ---------------------- */
  {
    slug: "crane-assisted-removal",
    name: "Crane-Assisted Removal",
    short: "Crane Removal",
    tier: "main",
    icon: "crane",
    oneLine: "Too big to climb? We bring the crane.",
    promise:
      "Big, hazardous, or right against the house? We lift it out safely with a crane.",
    intro:
      "Some trees are too big, too dead, or too close to the house to take down the normal way. That is exactly the kind of job we love. With a crane, we lift heavy sections up and over your property instead of dragging them across it, which is faster, safer, and far easier on your yard.",
    longDescription: [
      "Climbing or felling a massive or compromised tree near a structure is where things go wrong for the wrong crew. A crane changes the math. We rig each section, the crane lifts it clear, and we lower it to a safe drop zone. No heavy equipment tracking across your lawn, no risky drops next to the roof.",
      "Crane removal is the answer for trees that are too big, too close, too dead, or too dangerous to handle conventionally, including over fences, sheds, pools, and power-line clearances. If another company told you your tree is too risky, that usually means it is a crane job, and it is our specialty.",
    ],
    features: [
      "For big, hazardous, near-structure trees",
      "Sections lifted over the yard, not dragged across it",
      "Minimal impact to lawn and landscaping",
      "Safer and faster than conventional takedown",
      "Licensed and insured",
      "Full cleanup and haul-off",
    ],
    process: [
      {
        title: "Free assessment",
        body: "We look at the tree, the access, and the obstacles, and confirm the crane plan and price.",
      },
      {
        title: "Rig and lift",
        body: "We rig each section, the crane lifts it clear of your house and yard, and we lower it safely.",
      },
      {
        title: "Clean haul-off",
        body: "Everything chipped, wood hauled or stacked, and the area raked clean.",
      },
    ],
    faqs: [
      {
        q: "Why use a crane instead of just climbing it?",
        a: "For big or hazardous trees, a crane lifts heavy sections up and away from your house and yard instead of risking drops next to the structure or dragging equipment across your lawn. It is safer, faster, and far gentler on your property.",
      },
      {
        q: "My tree is huge and right next to the house. Can you do it?",
        a: "Yes. Too big, too close, too dangerous is our specialty. A crane is built for exactly this, including over fences, sheds, pools, and tight spots a conventional crew will not touch.",
      },
    ],
    blocks: [
      {
        kind: "callout",
        heading: "If another crew called your tree too risky",
        body: "That usually means it is a crane job. Big, leaning, dead, or right on top of the house is not a reason to call someone else, it is the reason to call us.",
      },
      {
        kind: "list",
        heading: "When a crane is the right call",
        items: [
          "The tree is massive or very tall",
          "It is leaning or dead over the house",
          "It is too close to the structure to fell or climb safely",
          "It overhangs a fence, shed, pool, or driveway",
          "There is no clear drop zone for conventional rigging",
          "You want minimal impact to your lawn and beds",
        ],
      },
    ],
    bestFit:
      "Best for homeowners with a big, dangerous, or tight-access tree that a regular crew will not touch, who want it gone safely with minimal property impact.",
    outcome:
      "The scary tree is lifted out cleanly, your house and yard are untouched, and the job is done by a crew built for the hard ones.",
    image: "/photos/crane-removal.jpg",
    heroImage: "/photos/crane-removal.jpg",
    imageAlt:
      "An Ole Man RB's crane lifting a large tree section over a West Michigan home during removal",
    gallery: ["/photos/bucket-lift.jpg", "/photos/big-tree.jpg"],
  },

  /* ------------------------------ 6.6 Lot Clearing -------------------------- */
  {
    slug: "lot-clearing",
    name: "Lot Clearing",
    short: "Lot Clearing",
    tier: "main",
    icon: "clearing",
    oneLine: "Clear the lot. Start your project.",
    promise:
      "Building, expanding, or reclaiming land? We clear the trees and brush and haul it off.",
    intro:
      "Whether you are building, putting in a driveway, expanding a field, or just reclaiming an overgrown corner of the property, we clear trees, brush, and undergrowth and haul it all away, leaving you a clean, usable lot ready for the next step.",
    longDescription: [
      "Lot clearing is a bigger job than a single removal, and it pays to have one crew handle the whole thing. We take down the trees, clear the brush and undergrowth, grind the stumps if you want them gone, and haul off the debris so you are not left with piles to deal with.",
      "From a single building site to acreage, we scale the work to your project and your timeline. Tell us what the land needs to become, a home site, a driveway, a wider field, a clean back lot, and we clear it to match.",
    ],
    features: [
      "Trees, brush, and undergrowth cleared",
      "Building sites, driveways, fields, and back lots",
      "Stump grinding available",
      "Full debris haul-off",
      "Scaled to your project and timeline",
      "Licensed and insured",
    ],
    process: [
      {
        title: "Walk the lot",
        body: "We walk the site with you, scope what needs to go, and give a clear written price.",
      },
      {
        title: "Clear it out",
        body: "We drop the trees, clear the brush and undergrowth, and grind stumps if you want them gone.",
      },
      {
        title: "Haul and finish",
        body: "We haul off the debris and leave the lot clean and ready for your project.",
      },
    ],
    faqs: [
      {
        q: "How big a lot can you clear?",
        a: "From a single building site to acreage. We scale the crew and equipment to your project and your timeline. Walk the lot with us and we will scope it out.",
      },
      {
        q: "Do you grind the stumps and haul everything away?",
        a: "We can. Stump grinding and full debris haul-off are available so you are left with a clean, usable lot instead of piles to deal with. Tell us how finished you want it.",
      },
    ],
    blocks: [
      {
        kind: "list",
        heading: "What lot clearing covers",
        items: [
          "Clearing a building or home site",
          "Opening up for a driveway or access road",
          "Expanding a field or pasture",
          "Reclaiming an overgrown back lot",
          "Removing brush and undergrowth",
          "Stump grinding and full haul-off",
        ],
      },
    ],
    bestFit:
      "Best for property owners building, expanding, or reclaiming land who want trees and brush cleared and hauled off by one dependable crew.",
    outcome:
      "Your lot is cleared, the debris is gone, and you have clean, usable ground ready for whatever is next.",
    image: "/photos/lot-clearing.jpg",
    heroImage: "/photos/lot-clearing.jpg",
    imageAlt:
      "A cleared West Michigan building lot after Ole Man RB's removed the trees and brush",
    gallery: ["/photos/chipper.jpg", "/photos/crew.jpg"],
  },
];

/** All six services are "main". specialtyServices kept empty for TLC parity. */
export const mainServices: Service[] = services.filter((s) => s.tier === "main");
export const specialtyServices: Service[] = [];

/* -------------------------------------------------------------------------- */
/* SERVICE AREAS                                                               */
/* -------------------------------------------------------------------------- */

export const serviceAreas: ServiceArea[] = [
  {
    slug: "belding",
    name: "Belding",
    county: "Ionia County",
    nearby: ["greenville", "ionia", "lowell", "rockford"],
    intro: [
      "Belding is home base. Our shop is right here at 1002 N Bridge St, which means when a Belding homeowner calls, we are minutes away, not an hour out. We know these neighborhoods, these trees, and what our winters and summer storms do to them.",
      "From the older shade trees along the Flat River to maples and ash crowding newer subdivisions, Belding has plenty of removals, trims, and storm cleanups that need a crew that actually answers the phone. That is us. Call (616) 232-5300 for a free quote within 24 hours.",
    ],
  },
  {
    slug: "rockford",
    name: "Rockford",
    county: "Kent County",
    nearby: ["cedar-springs", "grand-rapids", "belding", "greenville"],
    intro: [
      "Rockford's wooded lots and mature trees along the Rogue River make for beautiful property and, sometimes, big trees a little too close to the house. We handle Rockford removals, hazard trimming, and storm cleanup with the right gear, including a crane for the tight ones.",
      "We are a short drive from Rockford and respond fast. Whether it is a dead oak over the garage or storm-snapped limbs after a Kent County windstorm, we give you a real quote with a timeline and leave the yard spotless.",
    ],
  },
  {
    slug: "greenville",
    name: "Greenville",
    county: "Montcalm County",
    nearby: ["belding", "stanton", "sheridan", "lakeview"],
    intro: [
      "Greenville is right in our backyard, and we are out here constantly. Big old hardwoods, lakefront lots, and storm-prone open country all keep Montcalm County homeowners calling for fast, dependable tree work.",
      "Removals, trimming, stump grinding, storm cleanup, lot clearing, we do it all in Greenville, and we do it clean. Call (616) 232-5300 and we will get you a free quote within 24 hours.",
    ],
  },
  {
    slug: "grand-rapids",
    name: "Grand Rapids",
    county: "Kent County",
    nearby: ["rockford", "lowell", "cedar-springs", "belding"],
    intro: [
      "Grand Rapids has everything from tight city lots with century-old street trees to wooded suburban yards, and every one of them eventually needs a tree handled. We bring big-city capability with small-crew dependability: we answer, we show up, and we leave it spotless.",
      "Tall trees crowded between houses are exactly where our crane earns its keep, lifting heavy sections over the property instead of risking the roof or the fence. Call (616) 232-5300 for a free Grand Rapids tree quote within 24 hours.",
    ],
  },
  {
    slug: "ionia",
    name: "Ionia",
    county: "Ionia County",
    nearby: ["belding", "lowell", "greenville", "grand-rapids"],
    intro: [
      "Ionia County is home turf, and we are a quick drive from town. From shade trees in established Ionia neighborhoods to trees on rural acreage and farm property, we remove, trim, and clean up after storms fast and clean.",
      "Need a hazard tree gone, a lot cleared, or storm damage handled? Call (616) 232-5300 and we will get you a free quote within 24 hours.",
    ],
  },
  {
    slug: "lowell",
    name: "Lowell",
    county: "Kent County",
    nearby: ["grand-rapids", "ionia", "belding", "rockford"],
    intro: [
      "Lowell's riverside lots and mature trees along the Flat and Grand Rivers make for great property and the occasional big tree that needs to come down safely. We handle Lowell removals, trimming, and storm cleanup with full cleanup every time.",
      "We respond fast across Kent County. Call (616) 232-5300 for a free Lowell tree quote within 24 hours.",
    ],
  },
  {
    slug: "cedar-springs",
    name: "Cedar Springs",
    county: "Kent County",
    nearby: ["rockford", "sparta", "grand-rapids", "greenville"],
    intro: [
      "Cedar Springs sits in wooded northern Kent County where storms and heavy snow take a toll on the trees. We are close by and respond fast for removals, hazard trimming, and storm cleanup.",
      "From a dead tree over the driveway to a full lot clearing, we give Cedar Springs homeowners a straight quote and a spotless finish. Call (616) 232-5300 for a free quote within 24 hours.",
    ],
  },
];

/** Name-only chips, shown on /service-areas and in the footer. Promote to full
 * serviceAreas entries with their own intro[] when expanding SEO coverage. */
export const moreAreas: MoreArea[] = [
  { slug: "sparta", name: "Sparta", county: "Kent County" },
  { slug: "lakeview", name: "Lakeview", county: "Montcalm County" },
  { slug: "stanton", name: "Stanton", county: "Montcalm County" },
  { slug: "sheridan", name: "Sheridan", county: "Montcalm County" },
];

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS (6 real, verbatim Google reviews)                             */
/* -------------------------------------------------------------------------- */

export const testimonials: Testimonial[] = [
  {
    name: "Alison Passino",
    rating: 5,
    when: "Google review",
    quote:
      "I can't say enough wonderful things about this company! After calling 10 different tree removal/trimming companies, only 5 got back to me, and RB's was the only one to give both a quote and timeline.",
  },
  {
    name: "Pamela Bunton",
    rating: 5,
    when: "Google review",
    quote:
      "These guys are awesome! Very professional, fair prices and make sure everything is clean before they go.",
  },
  {
    name: "Sheri Weeks",
    rating: 5,
    when: "Google review",
    quote:
      "We were delighted with the professional and skilled workmanship on the removal of our tree. The respect these guys showed our property landscaping was amazing!",
  },
  {
    name: "Jason DesJarden",
    rating: 5,
    when: "Google review",
    quote:
      "Absolutely recommend the guys from Ole Man RB's Tree Service! We had a massive cherrywood fall onto our shed during a storm.",
  },
  {
    name: "Patty Donovan",
    rating: 5,
    when: "Google review",
    quote:
      "OLE MAN RB's Tree service was amazing! They removed a dying Blue Spruce from my yard and two hours later it looked like nothing had happened.",
  },
  {
    name: "Craig Sholty",
    rating: 5,
    when: "Google review",
    quote:
      "These guys are top notch! They have done 8 big trees for us. Very professional. Clean up awesome, could barely tell they were here.",
  },
];

/** Google rating. count is the verbatim-review total we can prove right now.
 * Update score/count to the live Google Business Profile totals once confirmed. */
export const googleRating = { score: "5.0", count: 6 };

/* -------------------------------------------------------------------------- */
/* STATS (count-up strip, all defensible)                                     */
/* -------------------------------------------------------------------------- */

export const stats: Stat[] = [
  { value: 24, suffix: "hr", label: "Free quote response time" },
  { value: 5, suffix: ".0", label: "Star-rated by local customers" },
  { value: 100, suffix: "%", label: "Licensed and insured" },
  { value: 100, suffix: "%", label: "Spotless cleanup, every job" },
];

/* -------------------------------------------------------------------------- */
/* WHY US / GUIDE AUTHORITY                                                    */
/* -------------------------------------------------------------------------- */

export const whyUs: WhyUs[] = [
  {
    icon: "shield-check",
    title: "Licensed & Insured",
    body: "Fully covered on every job. We will gladly show proof. Never let an uninsured crew on your property.",
  },
  {
    icon: "clock",
    title: "We Actually Show Up",
    body: "Industry-leading response times and a free quote within 24 hours. We answer the phone and we call you back.",
  },
  {
    icon: "sparkles",
    title: "Spotless Cleanup",
    body: "We chip the brush, haul the wood, and rake it clean. You can barely tell we were there, except the tree is gone.",
  },
  {
    icon: "axe",
    title: "Big & Hazardous Jobs",
    body: "Too big, too close, too dangerous? With our crane and crew, the scary tree is exactly the one we want.",
  },
];

/** Authority bullets for the Guide section (under the owner intro). */
export const authorityBullets: string[] = [
  "Licensed and insured, every single job",
  "Industry-leading response, free quote within 24 hours",
  "Owner-operated and locally rooted in Belding, Michigan",
  "The right equipment for big, hazardous, tight-access removals",
  "A clean cleanup that's a promise, not an afterthought",
];

/* -------------------------------------------------------------------------- */
/* PROBLEM / STAKES (StoryBrand)                                              */
/* -------------------------------------------------------------------------- */

export const problems: string[] = [
  "A dead, leaning, or storm-damaged tree hanging over your house, garage, or car.",
  "A tree too big or too close to power lines for a regular crew to touch.",
  "You called around and either nobody calls back, or the quotes make no sense.",
  "No idea who to trust not to wreck your yard or overcharge you.",
];

export const stakes: { failure: string[]; success: string[] } = {
  failure: [
    "The leaning limb finally lets go onto your roof in the next storm.",
    "A dead tree drops on the car, the fence, or the neighbor's property.",
    "The cleanup gets uglier and the bill gets bigger the longer it waits.",
    "You hand money to the cheapest crew, then pay again to fix the mess.",
  ],
  success: [
    "The hazard tree is gone before the next storm finds it.",
    "Your roof, lines, and yard are clear and safe.",
    "A spotless yard you are glad to walk out into.",
    "One dependable number to call, and a crew that answers it.",
  ],
};

/* -------------------------------------------------------------------------- */
/* SITEWIDE FAQ                                                                */
/* -------------------------------------------------------------------------- */

export const faqs: Faq[] = [
  {
    q: "How much does tree removal cost?",
    a: "It depends on the tree's size and height, the species, how close it is to your house or power lines, the condition, and whether you want the stump ground and debris hauled. That is why our quote is free and based on the actual tree. We give you a clear written price with no guessing and no surprises.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes, fully. Tree work carries real risk and you should never let an uninsured crew on your property. We will gladly provide proof of insurance.",
  },
  {
    q: "Will you wreck my lawn and landscaping?",
    a: "No. We plan the work to protect your property, and for big or tight jobs we use a crane to lift sections over the yard instead of dragging equipment across it. Our customers say it best: we clean up so well you can barely tell we were there.",
  },
  {
    q: "How fast can you get here?",
    a: "We are known for fast, dependable response. You get a free quote within 24 hours, and for storm or hazard emergencies, call us and we will tell you straight how soon we can be there.",
  },
  {
    q: "A storm dropped a tree on my house. Does insurance cover it?",
    a: "Often yes, when a tree falls on a covered structure due to a covered peril like wind. Coverage and caps vary by policy. We respond fast, make the scene safe, and document the damage with photos and a written scope so you have exactly what you need for your claim.",
  },
  {
    q: "My tree is huge and right next to the house. Can you do it safely?",
    a: "Yes, that is our specialty. Big, leaning, or tight-access trees are a crane job, and a crane lifts heavy sections over your property safely instead of risking the structure. If another company said your tree is too risky, that usually means it is exactly the job for us.",
  },
  {
    q: "Do I need a permit to remove a tree?",
    a: "Some West Michigan municipalities require permits for certain removals, like large trees or street and right-of-way trees. We know the local rules and will tell you if your job needs a permit and help you sort it out.",
  },
  {
    q: "Will you actually call me back?",
    a: "Yes. That is the whole reason Ole Man RB's exists. One customer called 10 companies and we were the only one to give both a quote and a timeline. We answer the phone, we follow up, and we show up.",
  },
  {
    q: "What areas do you serve?",
    a: "Belding, Rockford, Greenville, Grand Rapids, and surrounding West Michigan, including Ionia, Lowell, Cedar Springs, Sparta, Lakeview, Stanton, and Sheridan. If you do not see your town, just ask, chances are we are nearby.",
  },
];

/* -------------------------------------------------------------------------- */
/* NAV                                                                         */
/* -------------------------------------------------------------------------- */

export const nav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Storm Response", href: "/storm-damage" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* -------------------------------------------------------------------------- */
/* GALLERY (real job photos)                                                   */
/* -------------------------------------------------------------------------- */

export const gallery: GalleryItem[] = [
  {
    src: "/photos/crane-removal.jpg",
    alt: "An Ole Man RB's crane lifting a large tree section over a West Michigan home",
  },
  {
    src: "/photos/tree-removal.jpg",
    alt: "An Ole Man RB's climber removing a tall tree in sections in a West Michigan yard",
  },
  {
    src: "/photos/big-tree.jpg",
    alt: "An Ole Man RB's crew taking down a massive tree on a West Michigan property",
  },
  {
    src: "/photos/hero-trim.jpg",
    alt: "An Ole Man RB's boom lift trimming a tree above a West Michigan rooftop",
  },
  {
    src: "/photos/bucket-lift.jpg",
    alt: "An Ole Man RB's bucket truck reaching into a tall canopy for a removal",
  },
  {
    src: "/photos/lift-canopy.jpg",
    alt: "An Ole Man RB's lift working high in a dense tree canopy",
  },
  {
    src: "/photos/lift-crew.jpg",
    alt: "The Ole Man RB's crew working a lift on a West Michigan tree removal",
  },
  {
    src: "/photos/stump-grinding.jpg",
    alt: "An Ole Man RB's stump grinder taking a stump below grade",
  },
  {
    src: "/photos/lot-clearing.jpg",
    alt: "An Ole Man RB's crew hauling brush during a West Michigan lot clearing",
  },
  {
    src: "/photos/chipper.jpg",
    alt: "Brush fed into the Ole Man RB's wood chipper during cleanup",
  },
  {
    src: "/photos/marked-tree.jpg",
    alt: "A hazard tree marked with a red X for removal by Ole Man RB's",
  },
  {
    src: "/photos/cleanup.jpg",
    alt: "An Ole Man RB's job site raked clean after a tree removal",
  },
  {
    src: "/photos/crew.jpg",
    alt: "The Ole Man RB's tree crew on a West Michigan job",
  },
  {
    src: "/photos/owner-truck.jpg",
    alt: "Owner Chris Holmes beside his branded Ole Man RB's truck in Belding, MI",
  },
];

/* -------------------------------------------------------------------------- */
/* GALLERY CAPTIONS (optional accents for /gallery)                            */
/* -------------------------------------------------------------------------- */

export const galleryCaptions: string[] = [
  "Dying Blue Spruce, gone in an afternoon. Two hours later it looked like nothing had happened.",
  "Massive hazard tree over the garage. Lifted out clean with the crane.",
  "Storm-snapped cherrywood off the shed and hauled away.",
  "Big oak right against the house, removed in sections, lawn untouched.",
  "Overgrown lot cleared and ready for the build.",
  "Old stump that bugged them for years, ground out and seeded over.",
  "Leaning maple near the power lines, down safely, yard spotless.",
  "Eight big trees, one clean property. Could barely tell they were here.",
];

/* -------------------------------------------------------------------------- */
/* OWNER / ABOUT                                                               */
/* -------------------------------------------------------------------------- */

export const owner = {
  name: "Chris Holmes",
  title: "Owner and Operator",
  image: "/photos/owner-truck.jpg",
  imageAlt: "Owner Chris Holmes beside his branded Ole Man RB's truck in Belding, MI",
  quote:
    "I built Ole Man RB's to be the tree company I'd want to hire: one that answers, shows up, charges fair, and leaves your place better than we found it. Whether it's a giant hazard tree over your house or an old stump in the back forty, we'll handle it right. Give us a call and let's take a look.",
} as const;

/* -------------------------------------------------------------------------- */
/* ESTIMATE FORM (service dropdown options)                                    */
/* -------------------------------------------------------------------------- */

export const serviceOptions: string[] = [
  "Tree Removal",
  "Tree Trimming",
  "Storm Damage Cleanup",
  "Stump Grinding",
  "Crane-Assisted Removal",
  "Lot Clearing",
  "Not sure / general inquiry",
];

/* -------------------------------------------------------------------------- */
/* SEO MAP                                                                     */
/* -------------------------------------------------------------------------- */

export const seo: Record<string, SeoEntry> = {
  home: {
    title: "Tree Removal & Tree Service in West Michigan · Ole Man RB's",
    description:
      "Licensed and insured tree removal, trimming, and storm cleanup in Belding, Rockford, Greenville, Grand Rapids and West Michigan. Free quote within 24 hours.",
  },
  services: {
    title: "Tree Services in West Michigan · Ole Man RB's",
    description:
      "Tree removal, trimming, storm cleanup, stump grinding, crane-assisted removal, and lot clearing across West Michigan. Fast, clean, dependable. Free quote.",
  },
  "tree-removal": {
    title: "Tree Removal in West Michigan · Ole Man RB's",
    description:
      "Fast, dependable tree removal in Belding, Rockford, Greenville and Grand Rapids. Licensed and insured, big jobs welcome, spotless cleanup. Free quote.",
  },
  "tree-trimming": {
    title: "Tree Trimming in West Michigan · Ole Man RB's",
    description:
      "Clear limbs off your roof and power lines and keep your trees healthy. Licensed, insured tree trimming across West Michigan. Free quote within 24 hours.",
  },
  "storm-damage-cleanup": {
    title: "Storm Damage Cleanup in West Michigan · Ole Man RB's",
    description:
      "Tree on your house or car? We respond fast, make it safe, and document the damage for your insurance. Storm cleanup across West Michigan. Call now.",
  },
  "stump-grinding": {
    title: "Stump Grinding in West Michigan · Ole Man RB's",
    description:
      "We grind stumps below grade so you can reclaim the yard, replant, or mow over it. Old stumps welcome. Stump grinding across West Michigan. Free quote.",
  },
  "crane-assisted-removal": {
    title: "Crane-Assisted Tree Removal in West Michigan · Ole Man RB's",
    description:
      "Too big, too close, too dangerous? We lift large trees out with a crane, safely and with minimal yard impact. Crane removal across West Michigan.",
  },
  "lot-clearing": {
    title: "Lot Clearing in West Michigan · Ole Man RB's",
    description:
      "Building, expanding, or reclaiming land? We clear trees, brush, and stumps and haul it all off. Lot clearing across West Michigan. Free quote.",
  },
  "service-areas": {
    title: "Service Areas · Ole Man RB's Tree Service",
    description:
      "Serving Belding, Rockford, Greenville, Grand Rapids, Ionia, Lowell, Cedar Springs and surrounding West Michigan with fast, dependable tree service.",
  },
  "storm-response": {
    title: "Storm Damage Tree Service in West Michigan · Ole Man RB's",
    description:
      "Tree on your house, car, or driveway? We respond fast, clear the danger, and document everything for your insurance. Storm tree service across West Michigan.",
  },
  about: {
    title: "About Ole Man RB's Tree Service · Belding, MI",
    description:
      "Ole Man RB's is the West Michigan crew that answers the phone, shows up on time, and leaves your yard spotless. Owner Chris Holmes, Belding, MI.",
  },
  contact: {
    title: "Get a Free Quote · Ole Man RB's Tree Service",
    description:
      "Request a free tree service quote. Call (616) 232-5300 or send the form and we respond within 24 hours. Belding and all of West Michigan.",
  },
  gallery: {
    title: "Job Gallery · Ole Man RB's Tree Service",
    description:
      "Real West Michigan tree removal, trimming, crane, and storm cleanup jobs by Ole Man RB's. See the work and the spotless cleanup.",
  },
};

/** SEO templates for dynamic service-area pages. {City} / {County} are replaced per route. */
export const seoTemplates = {
  serviceArea: {
    title: "Tree Service in {City}, MI · Ole Man RB's",
    description:
      "Licensed, insured tree removal, trimming, and storm cleanup in {City}, {County}. Fast response and a spotless cleanup. Free quote within 24 hours.",
  },
  ogImage: "/photos/hero-ai.jpg",
} as const;

/* -------------------------------------------------------------------------- */
/* HOME-HERO ASSET                                                             */
/* -------------------------------------------------------------------------- */

export const heroImage = {
  src: "/photos/hero-ai.jpg",
  alt: "A cinematic golden-hour tree removal in West Michigan with an Ole Man RB's crane",
} as const;

/* -------------------------------------------------------------------------- */
/* STORM RESPONSE BAND                                                         */
/* -------------------------------------------------------------------------- */

export const stormResponse = {
  eyebrow: "Storm response",
  heading: "Tree on your house? We respond fast.",
  body: "When a storm drops a tree on your roof, your car, or across your driveway, you need a crew that moves now and knows what it's doing. We make the scene safe, clear the damage, and document everything with photos to help your insurance claim. Don't wait, and don't let an uninsured storm-chaser onto your property.",
  reassurance: "Licensed, insured, and ready when West Michigan weather turns.",
  image: "/photos/storm-ai.jpg",
  imageAlt: "A storm-damaged tree resting on a West Michigan home after high wind",
} as const;

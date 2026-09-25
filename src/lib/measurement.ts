/**
 * Measurement wiring for the live olemanrb.com site. Read from the real
 * accounts on 2026-09-25; never invent or guess these values.
 *
 * Google Ads CID 661-372-0698, conversion tracking id 16473633915.
 * "Website quote request (confirmed)" is conversion action 7794862203. It was
 * created SECONDARY: it reports under All conversions and does not steer
 * bidding until Modern Apex promotes it after 30 days of verified data.
 * It fires only after the WordPress quote bridge answers success.
 *
 * GA4 G-MGZGBR196N (property 396906524) still has an old "create event" rule
 * that turns every /contact/ page view into generate_lead. That event is not a
 * lead and must never be imported into Google Ads or counted as one.
 * quote_request_success is the confirmed submission event.
 *
 * The Modern Apex form token authenticates the additive copy of each quote
 * request to the agency portal (apex-attribution.js). It is public by design.
 * The WordPress bridge, Elementor record and Make webhook stay the delivery
 * lane; the portal copy never blocks or replaces them.
 *
 * Everything here runs only on the production hostnames, so the GitHub Pages
 * preview and local builds send nothing anywhere.
 */
export const measurement = {
  productionHosts: ["olemanrb.com", "www.olemanrb.com"],
  googleAdsId: "AW-16473633915",
  quoteConversionSendTo: "AW-16473633915/VlLoCPvQ8IQdEPvonq89",
  apexFormToken: "f7dd979967cabde2f49675ced167d1f3",
} as const;

/** Event the quote form dispatches after a confirmed success. */
export const QUOTE_SUCCESS_EVENT = "apex:quote-success";

export type QuoteSuccessDetail = {
  /** The bridge request UUID; doubles as the Ads transaction_id for dedupe. */
  requestId: string;
  /** True for ?apx_test=1 rollout checks: no GA4 or Ads event is sent. */
  test: boolean;
};

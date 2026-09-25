import Script from "next/script";
import { BASE } from "@/lib/asset";
import { measurement, QUOTE_SUCCESS_EVENT } from "@/lib/measurement";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const gaId =
  measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : "";

/**
 * Production-only measurement: GA4 (existing property), the Google Ads tag and
 * its confirmed quote conversion, and the Modern Apex attribution snippet.
 * Nothing loads on previews or localhost.
 *
 * Only a confirmed quote (the bridge answered success) fires
 * quote_request_success and the Ads conversion. Page views never do.
 */
export function Analytics() {
  const config = JSON.stringify({
    hosts: measurement.productionHosts,
    ga: gaId,
    aw: measurement.googleAdsId,
    sendTo: measurement.quoteConversionSendTo,
    token: measurement.apexFormToken,
    attributionSrc: `${BASE}/apex-attribution.js`,
    event: QUOTE_SUCCESS_EVENT,
  });

  return (
    <Script id="site-measurement" strategy="afterInteractive">
      {`
        (function (c) {
          if (c.hosts.indexOf(location.hostname) === -1) return;

          var attribution = document.createElement('script');
          attribution.async = true;
          attribution.src = c.attributionSrc;
          attribution.setAttribute('data-token', c.token);
          document.head.appendChild(attribution);

          window.dataLayer = window.dataLayer || [];
          window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          if (c.ga) window.gtag('config', c.ga);
          window.gtag('config', c.aw);

          window.addEventListener(c.event, function (e) {
            var d = (e && e.detail) || {};
            if (d.test) return;
            if (c.ga) window.gtag('event', 'quote_request_success', { form_name: 'free_quote' });
            window.gtag('event', 'conversion', { send_to: c.sendTo, transaction_id: d.requestId || '' });
          });

          var tag = document.createElement('script');
          tag.async = true;
          tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + (c.ga || c.aw);
          document.head.appendChild(tag);
        })(${config});
      `}
    </Script>
  );
}

import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Preserve the live site's GA4 property without recording preview visits. */
export function Analytics() {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return null;

  return (
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        if (location.hostname === 'olemanrb.com' || location.hostname === 'www.olemanrb.com') {
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}');
          window.addEventListener('apex:quote-success', function () {
            window.gtag('event', 'generate_lead', { form_name: 'free_quote' });
          });
          var analyticsScript = document.createElement('script');
          analyticsScript.async = true;
          analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=${measurementId}';
          document.head.appendChild(analyticsScript);
        }
      `}
    </Script>
  );
}

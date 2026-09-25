/* ============================================================================
 * apex-attribution.js  (Modern Apex Strategies, attribution rails 2026-08-09)
 *
 * VENDOR THIS FILE. Copy it into each client site's own repo and serve it from
 * that site's own origin. No CDN, no hotlinking the portal copy: a client
 * site's forms must keep working even if the portal is down or the file moves,
 * and a first-party script is the only kind tracking protection leaves alone.
 * The canonical copy lives at public/apex-attribution.js in modern-apex-web.
 *
 * WHAT IT DOES
 *   1. On landing, captures Google click ids (gclid, gbraid, wbraid; Google
 *      sends gbraid/wbraid INSTEAD of gclid on much iOS traffic) and utm_*
 *      params into a first-party cookie "apx_attr", 90-day expiry. A cookie,
 *      not localStorage: WebKit deletes script-writable storage after 7 days
 *      of no interaction but honours a 90-day JS-set cookie expiry. A NEW
 *      click id overwrites the stored attribution; otherwise first touch wins.
 *   2. Exposes window.apexAttribution.attach(fields) for the site's own form
 *      handler to call AFTER its normal submit path (Web3Forms stays exactly
 *      as is; this post is additive and fire-and-forget, failures swallowed).
 *   3. Auto-reports tel: link clicks as kind call_click (stored in the ledger,
 *      never counted as a lead).
 *   4. Sends at most one heartbeat per session: token, page, and whether a
 *      click id was present. No PII, ever, on that lane.
 *
 * INSTALL
 *   <script src="/apex-attribution.js" data-token="YOUR_FORM_TOKEN"></script>
 *
 *   data-token     required. The per-client form token issued by Modern Apex.
 *                  Without it this file does nothing, silently.
 *   data-endpoint  optional. Defaults to
 *                  https://app.modernapexstrategies.com/api/lead-intake
 *
 * FORM WIRING (from the site's submit handler, non-blocking)
 *   var confirmed = window.apexAttribution.attach({   // Promise<boolean>
 *     name: "...", email: "...", phone: "...", message: "...",
 *     isTest: true   // rollout verification only; omit in production
 *   });
 *
 * Payloads post as text/plain so the browser never needs a CORS preflight.
 * ES2017, no dependencies, one global (window.apexAttribution).
 * ========================================================================== */
(function () {
  "use strict";

  var script =
    document.currentScript ||
    document.querySelector('script[src*="apex-attribution"][data-token]');
  var token = script && script.getAttribute("data-token");
  // No token configured means this site is not wired up yet. Do nothing,
  // silently: the snippet must never break or noise up a client site.
  if (!token) return;
  var endpoint =
    (script && script.getAttribute("data-endpoint")) ||
    "https://app.modernapexstrategies.com/api/lead-intake";

  var COOKIE_NAME = "apx_attr";
  var COOKIE_MAX_AGE = 90 * 24 * 60 * 60; // 90 days, in seconds
  var UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  function readCookie(name) {
    var pairs = document.cookie ? document.cookie.split(";") : [];
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      var eq = pair.indexOf("=");
      if (eq < 0) continue;
      if (pair.slice(0, eq).trim() === name) {
        try {
          return decodeURIComponent(pair.slice(eq + 1));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  }

  function writeAttr(data) {
    try {
      var value = encodeURIComponent(JSON.stringify(data));
      // First-party, SameSite=Lax, site-wide. Secure only on https so a local
      // preview of a client site still works.
      document.cookie =
        COOKIE_NAME +
        "=" +
        value +
        "; Max-Age=" +
        COOKIE_MAX_AGE +
        "; Path=/; SameSite=Lax" +
        (location.protocol === "https:" ? "; Secure" : "");
    } catch (e) {
      /* a cookie failure must never surface on the site */
    }
  }

  function readAttr() {
    var raw = readCookie(COOKIE_NAME);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  // Google's own first-party click id cookie, format GCL.<timestamp>.<id>.
  // Read as a gclid fallback: gtag may hold a click id from a landing the
  // visitor made before this snippet shipped.
  function gclAwFallback() {
    var raw = readCookie("_gcl_aw");
    if (!raw) return null;
    var parts = raw.split(".");
    return parts.length >= 3 && parts[2] ? parts.slice(2).join(".") : null;
  }

  // What THIS page view carries. gclid falls back to _gcl_aw; gbraid/wbraid
  // only ever arrive as URL params.
  function captureFromUrl() {
    var params;
    try {
      params = new URLSearchParams(location.search);
    } catch (e) {
      params = { get: function () { return null; } };
    }
    var utms = {};
    var hasUtms = false;
    for (var i = 0; i < UTM_KEYS.length; i++) {
      var v = params.get(UTM_KEYS[i]);
      if (v) {
        utms[UTM_KEYS[i]] = v;
        hasUtms = true;
      }
    }
    return {
      gclid: params.get("gclid") || gclAwFallback(),
      gbraid: params.get("gbraid"),
      wbraid: params.get("wbraid"),
      utms: utms,
      hasUtms: hasUtms,
    };
  }

  var fresh = captureFromUrl();
  var freshClickId = fresh.gclid || fresh.gbraid || fresh.wbraid;

  // Store or refresh the attribution. The rule: a NEW click id overwrites
  // (the latest ad click is the touch Google will bill), otherwise first
  // touch wins and a plain organic revisit never clobbers it. Re-writing the
  // stored value on every visit is what actually renews the 90-day expiry.
  (function persist() {
    var stored = readAttr();
    var storedClickId =
      stored && (stored.gclid || stored.gbraid || stored.wbraid);
    if (freshClickId && freshClickId !== storedClickId) {
      writeAttr({
        gclid: fresh.gclid || null,
        gbraid: fresh.gbraid || null,
        wbraid: fresh.wbraid || null,
        utms: fresh.utms,
        landingPage: location.href,
        referrer: document.referrer || null,
        firstSeenAt: new Date().toISOString(),
      });
    } else if (stored) {
      writeAttr(stored);
    } else if (freshClickId || fresh.hasUtms) {
      writeAttr({
        gclid: fresh.gclid || null,
        gbraid: fresh.gbraid || null,
        wbraid: fresh.wbraid || null,
        utms: fresh.utms,
        landingPage: location.href,
        referrer: document.referrer || null,
        firstSeenAt: new Date().toISOString(),
      });
    }
  })();

  function uuid() {
    try {
      if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      if (window.crypto && window.crypto.getRandomValues) {
        var bytes = new Uint8Array(16);
        window.crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
        bytes[8] = (bytes[8] & 0x3f) | 0x80; // RFC 4122 variant
        var hex = [];
        for (var i = 0; i < 16; i++) {
          hex.push((bytes[i] + 0x100).toString(16).slice(1));
        }
        return (
          hex.slice(0, 4).join("") +
          "-" +
          hex.slice(4, 6).join("") +
          "-" +
          hex.slice(6, 8).join("") +
          "-" +
          hex.slice(8, 10).join("") +
          "-" +
          hex.slice(10, 16).join("")
        );
      }
    } catch (e) {
      /* fall through to the weak generator */
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  // Attribution block for a lead payload: the stored first touch when one
  // exists, else whatever this page view carries.
  function attributionBlock() {
    var stored = readAttr();
    var src = stored || {
      gclid: fresh.gclid || null,
      gbraid: fresh.gbraid || null,
      wbraid: fresh.wbraid || null,
      utms: fresh.utms,
      landingPage: location.href,
      referrer: document.referrer || null,
      firstSeenAt: new Date().toISOString(),
    };
    var out = {
      gclid: src.gclid || "",
      gbraid: src.gbraid || "",
      wbraid: src.wbraid || "",
      referrer: src.referrer || "",
      landingPage: src.landingPage || "",
      firstSeenAt: src.firstSeenAt || "",
    };
    var utms = src.utms || {};
    for (var i = 0; i < UTM_KEYS.length; i++) {
      out[UTM_KEYS[i]] = utms[UTM_KEYS[i]] || "";
    }
    return out;
  }

  function leadPayload(kind, fields, isTest) {
    var p = {
      token: token,
      kind: kind,
      submissionId: uuid(),
      occurredAt: new Date().toISOString(),
      // Full URL, not a bare path: the server derives the site host from it
      // for the heartbeat counters, and a path alone has no host.
      page: location.href,
      fields: fields || {},
      attribution: attributionBlock(),
      company: "", // honeypot; a human's payload leaves it empty
    };
    if (isTest) p.isTest = true;
    return p;
  }

  // text/plain keeps both senders preflight-free cross-origin posts. The
  // endpoint parses the body as JSON regardless of content type.
  function sendViaBeacon(payload) {
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([body], { type: "text/plain" }));
      } else if (window.fetch) {
        fetch(endpoint, { method: "POST", body: body, keepalive: true }).catch(
          function () {}
        );
      }
    } catch (e) {
      /* fire and forget, always */
    }
  }

  // Resolves true only when the portal answered 200 {ok:true}; false for any
  // failure, and false for the sendBeacon fallback, which can queue a request
  // but never confirm it. Never rejects.
  function sendViaFetch(payload) {
    try {
      var body = JSON.stringify(payload);
      if (window.fetch) {
        // keepalive lets the POST survive an immediate navigation after
        // submit, the normal fate of a thank-you redirect.
        return fetch(endpoint, { method: "POST", body: body, keepalive: true })
          .then(function (res) {
            if (!res.ok) return false;
            return res
              .json()
              .then(function (j) {
                return !!(j && j.ok === true);
              })
              .catch(function () {
                return false;
              });
          })
          .catch(function () {
            return false;
          });
      } else if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([body], { type: "text/plain" }));
      }
    } catch (e) {
      /* never let attribution break a form */
    }
    return window.Promise ? Promise.resolve(false) : undefined;
  }

  // ── Heartbeat: once per session, no PII ───────────────────────────────────
  // Proves the snippet RUNS (a presence check only proves it is pasted), and
  // heartbeats carrying a click id are the real count of ad visits reaching
  // the site. sessionStorage can throw in some private modes; then we simply
  // skip the beat rather than risk a double count.
  (function heartbeat() {
    try {
      if (sessionStorage.getItem("apx_hb_sent")) return;
      sessionStorage.setItem("apx_hb_sent", "1");
      sendViaBeacon({
        token: token,
        kind: "heartbeat",
        submissionId: uuid(),
        occurredAt: new Date().toISOString(),
        page: location.href,
        clickIdPresent: !!freshClickId,
        company: "",
      });
    } catch (e) {
      /* no storage, no beat */
    }
  })();

  // ── tel: clicks -> kind call_click ────────────────────────────────────────
  // Stored in the ledger as "call attempts from your website", never counted
  // as a lead. Capture phase so a site's own stopPropagation cannot hide the
  // click; sendBeacon because the tap usually navigates to the dialer.
  document.addEventListener(
    "click",
    function (ev) {
      try {
        var el = ev.target;
        if (!el || !el.closest) return;
        var anchor = el.closest('a[href^="tel:"]');
        if (!anchor) return;
        sendViaBeacon(leadPayload("call_click", {}, false));
      } catch (e) {
        /* never interfere with the call itself */
      }
    },
    true
  );

  // ── Public API ────────────────────────────────────────────────────────────
  window.apexAttribution = {
    /**
     * Post one form submission to the lead ledger. Call it from the site's
     * own submit handler AFTER the normal form path; it never blocks, never
     * throws, and never touches the Web3Forms request.
     * fields: { name, email, phone, message, isTest }
     * Returns a Promise that resolves true when the portal confirmed the row
     * and false otherwise (never rejects). Callers that ignore the return
     * value keep the original fire-and-forget behaviour. Added 2026-09-25 so
     * a site can show a real success or failure state.
     */
    attach: function (fields) {
      try {
        fields = fields || {};
        var isTest = fields.isTest === true;
        var clean = {
          name: typeof fields.name === "string" ? fields.name : "",
          email: typeof fields.email === "string" ? fields.email : "",
          phone: typeof fields.phone === "string" ? fields.phone : "",
          message: typeof fields.message === "string" ? fields.message : "",
        };
        return sendViaFetch(leadPayload("form", clean, isTest));
      } catch (e) {
        /* swallowed by contract */
      }
      return window.Promise ? Promise.resolve(false) : undefined;
    },
  };
})();

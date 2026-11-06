/* Ole Man RB website measurement. No customer field values are sent in events. */
(function () {
  'use strict';
  if (window.__omrMeasurement || !/^(www\.)?olemanrb\.com$/.test(location.hostname)) return;
  window.__omrMeasurement = true;
  var PIXEL = 'BnyAXPbRSfvwJxYxbUGsX1';
  var PREF = 'omr_measurement_opt_out';
  var ATTR = 'omr_visit_source_v1';
  var SEEN = 'omr_confirmed_quotes_v1';
  var sent = Object.create(null);
  var started = false;
  var lastPath = '';
  var memorySource = null;
  var entryCaptured = false;
  var lastCampaign = null;
  var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function read(key) { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function write(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function remove(key) { try { localStorage.removeItem(key); } catch (_) {} }
  function signal() {
    return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
  }
  function optedOut() { return signal() || read(PREF) === '1'; }
  function isTest() { return new URLSearchParams(location.search).get('apx_test') === '1'; }
  function publicPage() { return !/^\/(?:wp-admin|wp-json|privacy-policy|privacy-choices|terms)(?:[\/.]|$)|^\/_apex-/.test(location.pathname); }
  function uuid() { return crypto.randomUUID(); }
  function clean(value, limit) { return String(value || '').replace(/[\r\n\u0000-\u001f]/g, ' ').slice(0, limit || 120); }
  function sourceAtVisit() {
    if (optedOut() || isTest()) return null;
    var q = new URLSearchParams(location.search);
    var fresh = { landing_path: location.pathname, at: Date.now() };
    var campaign = false;
    params.forEach(function (k) { var v = clean(q.get(k)); if (v) { fresh[k] = v; campaign = true; } });
    ['oppref', 'gclid', 'gbraid', 'wbraid'].forEach(function (k) {
      var v = q.get(k); if (v && /^[\w.~-]+$/.test(v) && v.length <= 2048) { fresh[k] = v; campaign = true; }
    });
    try {
      var ref = new URL(document.referrer);
      if (!entryCaptured && ref.hostname !== location.hostname && !/^(www\.)?olemanrb\.com$/.test(ref.hostname)) fresh.referrer_host = ref.hostname;
    } catch (_) {}
    var previous = memorySource;
    try { previous = previous || JSON.parse(read(ATTR)); } catch (_) {}
    var campaignKey = JSON.stringify(params.concat(['oppref', 'gclid', 'gbraid', 'wbraid']).map(function (k) { return fresh[k] || ''; }));
    if (!previous || Date.now() - previous.at > 30 * 86400000 || (campaign && campaignKey !== lastCampaign) || fresh.referrer_host) {
      previous = fresh;
      memorySource = fresh;
      write(ATTR, JSON.stringify(fresh));
    }
    entryCaptured = true;
    if (campaign) lastCampaign = campaignKey;
    return previous;
  }
  function measure(name, data, options) {
    if (!started || optedOut() || isTest() || !publicPage()) return;
    try { window.oaiq('measure', name, data, Object.assign({ opt_out: true }, options || {})); } catch (_) {}
  }
  function initialize() {
    if (started || optedOut() || isTest() || !publicPage()) return;
    if (!window.oaiq) {
      var q = function () { q.q.push(arguments); }; q.q = []; window.oaiq = q;
      var script = document.createElement('script');
      script.async = true; script.src = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
      document.head.appendChild(script);
    }
    window.oaiq('init', { pixelId: PIXEL, debug: false });
    started = true;
  }
  function pageView() {
    sourceAtVisit();
    initialize();
    if (lastPath === location.pathname || !started || optedOut() || isTest() || !publicPage()) return;
    lastPath = location.pathname;
    measure('page_viewed', { type: 'contents', contents: [{ id: lastPath, content_type: 'page' }] }, { event_id: uuid() });
  }
  function clearMeasurement() {
    memorySource = null; remove(ATTR); remove(SEEN);
    if (window.oaiq) { try { window.oaiq('consent', false); } catch (_) {} }
    ['__oppref', '__obref'].forEach(function (key) {
      ['', ';domain=olemanrb.com', ';domain=.olemanrb.com'].forEach(function (domain) {
        document.cookie = key + '=; Max-Age=0; path=/; SameSite=Lax; Secure' + domain;
      });
    });
  }
  function setPreference(allow) {
    write(PREF, allow ? '0' : '1');
    if (!allow || signal()) clearMeasurement();
    else {
      if (window.oaiq) window.oaiq('consent', true);
      pageView();
    }
    updateChoices();
  }
  function updateChoices() {
    var status = document.getElementById('omr-privacy-status');
    var text = signal() ? 'Optional OpenAI measurement is off because your browser sends a privacy signal.' : optedOut() ? 'Optional OpenAI measurement is off in this browser.' : 'Optional OpenAI measurement is on in this browser.';
    if (status && status.textContent !== text) status.textContent = text;
  }
  function attributionNote() {
    var s = sourceAtVisit();
    if (!s) return '';
    var lines = ['Website source details', 'Landing page: ' + clean(s.landing_path, 240)];
    if (s.referrer_host) lines.push('Referrer: ' + clean(s.referrer_host, 160));
    params.forEach(function (k) { if (s[k]) lines.push(k + ': ' + clean(s[k])); });
    // A click reference is retained by the Pixel cookie. Do not expose it in a human-readable message.
    if (s.oppref) lines.push('OpenAI ad click reference: present');
    if (s.gclid || s.gbraid || s.wbraid) lines.push('Google ad click reference: present');
    if (!s.referrer_host && !s.utm_source && !s.oppref && !s.gclid && !s.gbraid && !s.wbraid) lines.push('Source: direct or unavailable');
    return lines.join('\n');
  }
  function confirmedQuote(id) {
    if (optedOut() || isTest() || !/^[a-f0-9-]{36}$/i.test(id || '')) return;
    var ids = [];
    try { ids = JSON.parse(read(SEEN)) || []; if (!Array.isArray(ids)) ids = []; } catch (_) {}
    if (sent[id] || ids.indexOf(id) !== -1) return;
    sent[id] = true;
    write(SEEN, JSON.stringify(ids.concat(id).slice(-100)));
    measure('lead_created', { type: 'customer_action' }, { event_id: id });
  }
  // The live application already uses this endpoint and checks HTTP success plus success:true.
  // Preserve its request, response, timeout, validation and delivery behavior exactly.
  var originalFetch = window.fetch;
  window.fetch = function (input, options) {
    var next = options;
    var id = null;
    try {
      var url = new URL(typeof input === 'string' ? input : input.url, location.href);
      if (url.origin === location.origin && url.pathname === '/wp-json/modern-apex/v1/quote' && options && String(options.method).toUpperCase() === 'POST' && typeof options.body === 'string') {
        var body = JSON.parse(options.body);
        if (!body.botcheck && /^[a-f0-9-]{36}$/i.test(body.request_id || '')) {
          id = body.request_id;
          var note = attributionNote();
          var message = String(body.message || '');
          if (note && new TextEncoder().encode(message + '\n\n' + note).length <= 5000) {
            body.message = message ? message + '\n\n' + note : note;
            next = Object.assign({}, options, { body: JSON.stringify(body) });
          }
        }
      }
    } catch (_) { next = options; }
    var request = originalFetch.call(this, input, next);
    if (id) request.then(function (response) {
      if (response.ok) response.clone().json().then(function (data) {
        if (data && data.success === true) confirmedQuote(id);
      }).catch(function () {});
    }).catch(function () {});
    return request;
  };

  function decorate() {
    var footer = document.querySelector('footer');
    if (footer && !document.getElementById('omr-privacy-link')) {
      var line = document.createElement('p'); line.id = 'omr-privacy-link';
      line.style.cssText = 'text-align:center;font-size:12px;padding:12px 16px;margin:0;color:#b6b9bd';
      var link = document.createElement('a'); link.href = '/privacy-choices/'; link.textContent = 'Privacy and measurement choices';
      link.style.cssText = 'color:inherit;text-decoration:underline'; line.appendChild(link); footer.appendChild(line);
    }
    document.querySelectorAll('form').forEach(function (form) {
      if (!form.querySelector('[name="botcheck"]') || !form.querySelector('[name="service"]') || form.querySelector('[data-omr-disclosure]')) return;
      form.querySelectorAll('p').forEach(function (p) {
        if (p.textContent === "We'll only use your details to contact you about your quote.") p.textContent = 'Your request goes directly to our team.';
      });
      var notice = document.createElement('p'); notice.setAttribute('data-omr-disclosure', '');
      notice.style.cssText = 'font-size:12px;line-height:1.6;color:#a8adb4;margin-top:14px';
      notice.appendChild(document.createTextNode('Your details are used to respond to your request. We use optional OpenAI measurement to understand ad results. '));
      var link = document.createElement('a'); link.href = '/privacy-choices/'; link.textContent = 'Privacy choices';
      link.style.cssText = 'color:inherit;text-decoration:underline'; notice.appendChild(link); form.appendChild(notice);
    });
    updateChoices();
  }
  document.addEventListener('click', function (event) {
    var target = event.target && event.target.closest ? event.target.closest('a,button') : null;
    if (!target) return;
    if (target.id === 'omr-opt-out') setPreference(false);
    if (target.id === 'omr-opt-in') setPreference(true);
    if (target.tagName === 'A' && /^tel:/i.test(target.getAttribute('href') || '') && event.isTrusted) {
      measure('custom', { type: 'custom' }, { custom_event_name: 'phone_link_clicked', event_id: uuid() });
    }
  }, true);
  window.addEventListener('storage', function (event) { if (event.key === PREF) { if (optedOut()) clearMeasurement(); updateChoices(); } });
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () { var result = original.apply(this, arguments); pageView(); return result; };
  });
  window.addEventListener('popstate', pageView);
  function ready() {
    decorate();
    var queued = false;
    new MutationObserver(function () {
      if (queued) return; queued = true;
      requestAnimationFrame(function () { queued = false; decorate(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (optedOut()) clearMeasurement();
  pageView();
  // Wait for React to finish hydrating before touching the page. Editing the DOM
  // first causes React error #418, a full client re-render and duplicate JSON-LD.
  function hydrated() {
    var el = document.querySelector('footer') || document.body;
    return !!el && Object.keys(el).some(function (k) { return k.indexOf('__reactFiber') === 0; });
  }
  function start() {
    if (!window.__next_f) return ready();
    var tries = 0;
    (function check() { if (hydrated() || ++tries > 100) return ready(); setTimeout(check, 100); })();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

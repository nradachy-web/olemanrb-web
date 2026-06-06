"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Phone, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { serviceOptions, site } from "@/lib/site";

/* -------------------------------------------------------------------------- */
/* Web3Forms access key — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in env before    */
/* launch. The placeholder is treated as "not connected" so the form fails     */
/* gracefully to the phone fallback instead of silently 404ing submissions.    */
/* -------------------------------------------------------------------------- */
const WEB3FORMS_PLACEHOLDER = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? WEB3FORMS_PLACEHOLDER;

type Status = "idle" | "submitting" | "success" | "error";

const labelClass =
  "mb-1.5 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-silver";

export function EstimateForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const reduce = useReducedMotion();

  const callFallback = `Please call us at ${site.phone} and we'll take care of you right away.`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot: bail silently for bots
    if (String(fd.get("botcheck") ?? "")) {
      setStatus("success");
      form.reset();
      return;
    }

    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const service = String(fd.get("service") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const emergency = fd.get("emergency") === "on";

    if (name.length < 2) {
      setStatus("error");
      setError("Please enter your name.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setError("Please enter a valid phone number so we can reach you.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    // Not connected yet: fail gracefully to the phone fallback.
    if (!ACCESS_KEY || ACCESS_KEY === WEB3FORMS_PLACEHOLDER) {
      setStatus("error");
      setError(`Our online form isn't connected yet. ${callFallback}`);
      return;
    }

    const detail = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
      location && `Town or address: ${location}`,
      `Service needed: ${service || "Not specified"}`,
      `Emergency: ${emergency ? "YES, tree on a structure, vehicle, or blocking access" : "No"}`,
      "",
      "Message:",
      message || "(none provided)",
    ]
      .filter(Boolean)
      .join("\n");

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: emergency
            ? `EMERGENCY tree request: ${name}`
            : `New free quote request: ${name}`,
          from_name: `${site.name} Website`,
          name,
          email: email || site.email,
          phone,
          replyto: email || undefined,
          message: detail,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
        return;
      }
      setStatus("error");
      setError(`Something went wrong sending your request. ${callFallback}`);
    } catch {
      setStatus("error");
      setError(`We couldn't send your request. ${callFallback}`);
    }
  }

  /* -------------------------- SUCCESS STATE -------------------------- */
  if (status === "success") {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "card relative flex flex-col items-center overflow-hidden p-8 text-center sm:p-12",
          className,
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -left-px top-8 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
        />
        <span className="grid size-16 place-items-center rounded-full bg-red text-white shadow-[var(--shadow-red)]">
          <Check className="size-9" strokeWidth={2.4} aria-hidden />
        </span>
        <h3 className="font-display mt-6 text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase tracking-[-0.01em] text-white">
          Got it. Your request is in.
        </h3>
        <p className="mt-3 max-w-md text-pretty text-silver">
          A member of our crew will reach out shortly to schedule your free
          quote. If it's urgent, call us any time at{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-red-bright hover:text-white"
          >
            {site.phone}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  /* ----------------------------- FORM ------------------------------ */
  return (
    <form
      id="quote"
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "card machined-edge relative overflow-hidden p-6 sm:p-8",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-px top-8 h-12 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
      />

      <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold uppercase tracking-[-0.01em] text-white">
        Get a free quote
      </h2>
      <p className="mt-2 text-pretty text-[0.95rem] text-silver">
        Tell us what's going on. We'll follow up within 24 hours to get you a
        detailed quote. No cost, no pressure.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="field"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-red">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="field"
            placeholder="(616) 555-0123"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Town or address
          </label>
          <input
            id="location"
            name="location"
            autoComplete="address-level2"
            className="field"
            placeholder="e.g. Belding, MI"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="service" className={labelClass}>
          What do you need?
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            defaultValue=""
            className="field pr-10"
          >
            <option value="" disabled>
              Select a service...
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-silver"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          Tell us about your tree
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="field resize-y"
          placeholder="A big maple is leaning toward the house and I'd like it looked at..."
        />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-sm border border-[var(--hairline)] bg-charcoal px-4 py-3.5">
        <input
          type="checkbox"
          name="emergency"
          className="mt-0.5 size-5 shrink-0 accent-red"
        />
        <span className="text-[0.9rem] leading-relaxed text-light">
          This is an <strong className="text-white">emergency</strong>. A tree
          is on a structure, vehicle, or blocking access.
        </span>
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-sm border border-red/40 bg-red/[0.08] px-4 py-3 text-[0.9rem] text-red-tint"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          withArrow
          disabled={status === "submitting"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? "Sending..." : "Get My Free Quote"}
        </Button>
        <a
          href={site.phoneHref}
          className="inline-flex items-center justify-center gap-2 text-[0.92rem] font-semibold text-silver transition-colors hover:text-red-bright"
        >
          <Phone className="size-4" aria-hidden />
          or call {site.phone}
        </a>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-red" aria-hidden />
          Licensed and insured
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-red" aria-hidden />
          Free quote within 24 hours
        </span>
      </div>
      <p className="mt-3 text-[0.78rem] text-muted">
        We'll only use your details to contact you about your quote.
      </p>
    </form>
  );
}

export default EstimateForm;

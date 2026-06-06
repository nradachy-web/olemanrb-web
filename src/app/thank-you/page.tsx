import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Blade } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request Received",
  description:
    "Thanks, your free quote request is in. A member of the Ole Man RB's crew will reach out shortly to schedule your free tree service quote.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden woodgrain bg-ink px-5 py-32 text-center sm:px-8">
      {/* ambient red bloom */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-red/[0.16] blur-[130px]"
      />
      <div aria-hidden className="grit absolute inset-0 -z-10" />

      <Reveal className="mx-auto flex max-w-2xl flex-col items-center">
        <span className="grid size-16 place-items-center rounded-full bg-red text-white shadow-[var(--shadow-red)] sm:size-20">
          <Check className="size-9 sm:size-11" strokeWidth={2.4} aria-hidden />
        </span>

        <Blade animate={false} width="w-20" className="mt-7" />

        <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold uppercase leading-[0.98] tracking-[-0.005em] text-white text-balance">
          Got it. Your request is <span className="text-red text-glow-red">in.</span>
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-silver">
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

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={site.phoneHref} variant="primary" size="lg" withArrow>
            Call {site.phone}
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to Home
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

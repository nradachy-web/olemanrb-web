import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { asset } from "@/lib/asset";
import { site, cta, nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink woodgrain">
      {/* Cinematic backdrop, heavily veiled so the page reads as a clean 404 */}
      <div className="absolute inset-0 -z-10">
        <img
          src={asset("/photos/hero-ai.jpg")}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[var(--ink-veil)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x w-full pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Logo tone="light" />
          </div>

          <p className="eyebrow eyebrow-red mt-10">Off the trail</p>

          <p className="font-display mt-4 text-[clamp(5rem,18vw,11rem)] font-bold leading-[0.85] tracking-[-0.02em] text-white">
            4<span className="text-red text-glow-red">0</span>4
          </p>

          {/* The CUT motif as the divider line under the number */}
          <div className="cut-divider mx-auto mt-8 max-w-sm" />

          <h1 className="font-display mt-8 text-[clamp(1.6rem,4vw,2.75rem)] font-bold uppercase leading-[1.02] tracking-[-0.005em] text-white text-balance">
            This page came down.
          </h1>

          <p className="lead mx-auto mt-4 max-w-xl text-pretty">
            We could not find what you were looking for, but the crew is still on
            the clock. Get back to solid ground, or call and we will point you the
            right way.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg" withArrow>
              Back to Home
            </Button>
            <Button href={site.phoneHref} variant="phone" size="lg">
              <Phone className="phone-glyph size-[1.1em]" aria-hidden="true" />
              {cta.phoneLabel}
            </Button>
          </div>

          {/* Quick links so nav is always one click away */}
          <nav
            aria-label="Helpful links"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-silver"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

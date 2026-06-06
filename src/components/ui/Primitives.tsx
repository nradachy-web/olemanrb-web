"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/* ============================================================
   EYEBROW — small uppercase label above headings
   ============================================================ */
export function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  /** "muted" (default grey) or "red" (brand accent) */
  tone?: "muted" | "red";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        tone === "red" && "eyebrow-red",
        className,
      )}
    >
      {tone === "red" && (
        <span
          aria-hidden
          className="blade-static inline-block h-[3px] w-6 -skew-x-12 bg-red"
        />
      )}
      {children}
    </span>
  );
}

/* ============================================================
   SECTION HEADING — eyebrow + display-2 H2 + optional lead
   ============================================================ */
export function SectionHeading({
  eyebrow,
  eyebrowTone = "red",
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  eyebrowTone?: "muted" | "red";
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  /** "dark" = on dark bg (white title); "light" = on grey-50 relief (ink title) */
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";
  const titleColor = tone === "light" ? "text-ink" : "text-white";
  const leadColor = tone === "light" ? "text-grey-warm/80" : "text-silver";

  return (
    <Reveal className={cn("flex max-w-2xl flex-col", alignment, className)}>
      {eyebrow && (
        <Eyebrow tone={eyebrowTone} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          "h2-display text-balance",
          titleColor,
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn("lead mt-4 text-pretty", leadColor)}>{lead}</p>
      )}
    </Reveal>
  );
}

/* ============================================================
   CARD — solid dark default + variants
   ============================================================ */
type CardVariant = "solid" | "frosted" | "accent";

export function Card({
  children,
  variant = "solid",
  hover = true,
  machined = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: CardVariant;
  /** lift + brighten on hover */
  hover?: boolean;
  /** show the milled-metal top edge highlight */
  machined?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const base =
    variant === "frosted"
      ? "card-frosted"
      : variant === "accent"
        ? "card relative overflow-hidden"
        : "card";

  const hoverCls = hover
    ? variant === "accent"
      ? "card-hover hover:shadow-[var(--shadow-red)]"
      : "card-hover"
    : "";

  return (
    <motion.div
      className={cn(
        base,
        hoverCls,
        machined && "machined-edge",
        "p-6 md:p-7",
        className,
      )}
      {...rest}
    >
      {variant === "accent" && (
        <span
          aria-hidden
          className="pointer-events-none absolute -left-px top-7 h-10 w-[3px] -skew-y-[14deg] bg-gradient-to-b from-red to-red-bright shadow-[0_0_14px_var(--red-glow)]"
        />
      )}
      {children}
    </motion.div>
  );
}

/* ============================================================
   BLADE — the signature animated red slash ("THE CUT")
   ============================================================ */
export function Blade({
  className = "",
  width = "w-16",
  animate: doAnimate = true,
}: {
  className?: string;
  /** tailwind width class, e.g. "w-16" / "w-24" / "w-full" */
  width?: string;
  /** wipe in on mount; false renders static */
  animate?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "blade",
        doAnimate ? "animate-blade-wipe" : "blade-static",
        width,
        className,
      )}
    />
  );
}

/* ============================================================
   CUT DIVIDER — red diagonal blade rule between sections
   ============================================================ */
export function CutDivider({ className = "" }: { className?: string }) {
  return <hr aria-hidden className={cn("cut-divider", className)} />;
}

/* ============================================================
   STAT — big display number + label, optional count-up
   ============================================================ */
export function Stat({
  value,
  label,
  prefix = "",
  suffix = "",
  countUp = true,
  decimals = 0,
  align = "left",
  tone = "dark",
  className = "",
}: {
  /** numeric for count-up, or any node for static text (e.g. "24/7") */
  value: number | ReactNode;
  label: ReactNode;
  prefix?: string;
  suffix?: string;
  countUp?: boolean;
  decimals?: number;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const isNumeric = typeof value === "number";
  const [display, setDisplay] = useState<string>(
    isNumeric
      ? `${prefix}${(reduce || !countUp ? (value as number) : 0).toFixed(
          decimals,
        )}${suffix}`
      : "",
  );

  useEffect(() => {
    if (!isNumeric || !countUp || reduce) {
      if (isNumeric)
        setDisplay(
          `${prefix}${(value as number).toFixed(decimals)}${suffix}`,
        );
      return;
    }
    if (!inView) return;
    const controls = animate(0, value as number, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, isNumeric, countUp, reduce, value, prefix, suffix, decimals]);

  const numColor = tone === "light" ? "text-ink" : "text-white";
  const labelColor = tone === "light" ? "text-grey-warm/70" : "text-muted";
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={cn("flex flex-col gap-2", alignment, className)}>
      <span
        ref={ref}
        className={cn(
          "font-display font-bold leading-[0.9] tracking-[-0.01em]",
          "text-[clamp(2.6rem,5vw,4rem)]",
          numColor,
        )}
      >
        {isNumeric ? display : value}
      </span>
      <span
        className={cn(
          "text-[0.8rem] font-medium uppercase tracking-[0.12em]",
          labelColor,
        )}
      >
        {label}
      </span>
    </div>
  );
}

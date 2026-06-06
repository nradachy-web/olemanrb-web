"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "phone";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-red text-white shadow-[var(--shadow-red)] hover:bg-red-bright hover:shadow-[var(--shadow-red-lg)]",
  outline:
    "border border-[var(--hairline-strong)] text-light hover:border-red hover:text-white hover:bg-red/[0.08]",
  ghost: "text-light hover:text-white hover:bg-white/[0.06]",
  phone:
    "border border-[var(--hairline-strong)] text-light hover:border-red hover:text-white hover:bg-red/[0.06] [&_svg.phone-glyph]:text-silver [&:hover_svg.phone-glyph]:text-red",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
};

function classes({
  variant = "primary",
  size = "md",
  className,
}: Pick<BaseProps, "variant" | "size" | "className">) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-sm font-sans font-bold uppercase tracking-[0.04em] leading-none",
    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-red",
    "active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
}

function Inner({
  children,
  withArrow,
}: {
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </>
  );
}

type ButtonProps =
  | (BaseProps & {
      href: string;
      onClick?: never;
    } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">)
  | (BaseProps & {
      href?: undefined;
    } & Omit<ComponentProps<"button">, "className" | "children">);

/**
 * Unified Button. Renders:
 *  - a tel:/mailto:/http(s)/# external <a> when href starts with those,
 *  - a next/link <Link> for internal hrefs,
 *  - a <button> when no href is given.
 */
export function Button(props: ButtonProps) {
  const { children, variant, size, withArrow, className } = props;
  const cls = classes({ variant, size, className });

  if (props.href !== undefined) {
    const { href, children: _c, variant: _v, size: _s, withArrow: _w, className: _cn, ...rest } =
      props;
    const isExternal = /^(tel:|mailto:|https?:\/\/|#)/.test(href);

    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as ComponentProps<"a">)}>
          <Inner withArrow={withArrow}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link href={href} className={cls} {...rest}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  const { children: _c, variant: _v, size: _s, withArrow: _w, className: _cn, href: _h, ...rest } =
    props;
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}

export default Button;

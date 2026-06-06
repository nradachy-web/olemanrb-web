import Link from "next/link";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * OMRB wordmark/lockup image.
 * tone "light" (default) -> white logo, for dark backgrounds (nav over hero, footer).
 * tone "dark" -> black logo, for light-relief sections (bg-grey-50).
 * Links to home and uses the basePath-aware asset() helper.
 */
export function Logo({
  tone = "light",
  className = "",
  imgClassName = "",
  href = "/",
}: {
  tone?: "light" | "dark";
  className?: string;
  imgClassName?: string;
  href?: string | null;
}) {
  const src = tone === "dark" ? "/logo-black.png" : "/logo-white.png";

  const img = (
    <img
      src={asset(src)}
      alt="Ole Man RB's Tree Service"
      className={cn("h-11 w-auto select-none sm:h-12", imgClassName)}
      width={400}
      height={321}
      draggable={false}
    />
  );

  if (href === null) {
    return <span className={cn("inline-flex items-center", className)}>{img}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Ole Man RB's Tree Service, home"
      className={cn(
        "group inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
    >
      {img}
    </Link>
  );
}

export default Logo;

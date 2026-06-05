import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  centered?: boolean;
  sectionClassName?: string;
  contentClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  backgroundImageClassName?: string;
  overlayClassName?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  tone = "light",
  centered = false,
  sectionClassName,
  contentClassName,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  backgroundImageSrc,
  backgroundImageAlt = "",
  backgroundImageClassName,
  overlayClassName,
}: PageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "w-full overflow-hidden",
        backgroundImageSrc && "relative",
        sectionClassName,
      )}
    >
      {backgroundImageSrc ? (
        <img
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center",
            backgroundImageClassName,
          )}
        />
      ) : null}

      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}

      <div className={cn("section-wrap", backgroundImageSrc && "relative z-10", contentClassName)}>
        <div className={cn(centered && "flex flex-col items-center text-center")}>
          <span
            className={cn(
              "eyebrow",
              isDark && "text-brand-pink",
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </span>

          <h1
            className={cn(
              "mt-4 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1]",
              isDark ? "text-white" : "text-brand-black",
              titleClassName,
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "mt-8 text-[1.05rem] leading-[1.65]",
                isDark ? "text-white/70" : "text-brand-gray",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : null}

          {children}
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
import {getTreatmentBanner} from "@/lib/treatment-banners";

export interface TreatmentHeroMediaProps {
  slug: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  customImage?: string;
  customImageAlt?: string;
  mediaBreakpoint?: string;
}

export function TreatmentHeroMedia({
  slug,
  alt,
  priority = true,
  className = "absolute inset-0 block h-full w-full overflow-hidden",
  imgClassName = "h-full w-full object-cover",
  customImage,
  customImageAlt,
  mediaBreakpoint = "(max-width: 767px)",
}: TreatmentHeroMediaProps) {
  // 1. Sanity custom hero override takes top priority if explicitly present
  if (customImage) {
    return (
      <div className={className}>
        <Image
          src={customImage}
          alt={customImageAlt ?? alt ?? ""}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={imgClassName}
        />
      </div>
    );
  }

  // 2. Curated local treatment banner with true responsive art direction
  const banner = getTreatmentBanner(slug);
  if (!banner) return null;

  const resolvedAlt = alt !== undefined ? alt : banner.alt;

  return (
    <picture className={className}>
      {/* Mobile art direction composition: vertical 9:16 format */}
      <source
        media={mediaBreakpoint}
        srcSet={banner.mobile}
        type="image/webp"
        width={banner.mobileWidth}
        height={banner.mobileHeight}
      />
      {/* Desktop art direction composition: horizontal 16:9 format */}
      <img
        src={banner.desktop}
        alt={resolvedAlt}
        width={banner.width}
        height={banner.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}

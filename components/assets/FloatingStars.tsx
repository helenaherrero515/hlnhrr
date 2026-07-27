import type { ReactElement } from "react";
import { cn } from "@/utils";

interface FloatingStarsProps {
  className?: string;
}

export function FloatingStars({ className }: FloatingStarsProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-lavender)]", className)} viewBox="0 0 180 90" fill="none">
      <path d="M28 6L31 25L50 28L31 31L28 50L25 31L6 28L25 25L28 6Z" fill="currentColor" opacity="0.65" />
      <path d="M142 18L145 33L160 36L145 39L142 54L139 39L124 36L139 33L142 18Z" fill="currentColor" opacity="0.42" />
      <circle cx="80" cy="22" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="108" cy="70" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="58" cy="67" r="2" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

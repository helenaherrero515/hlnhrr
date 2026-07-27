import type { ReactElement } from "react";
import { cn } from "@/utils";

interface DecorativeShapesProps {
  className?: string;
}

export function DecorativeShapes({ className }: DecorativeShapesProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none", className)} viewBox="0 0 220 180" fill="none">
      <rect x="18" y="92" width="78" height="56" rx="18" fill="url(#shapeA)" />
      <rect x="116" y="28" width="72" height="72" rx="24" fill="url(#shapeB)" />
      <circle cx="154" cy="132" r="27" fill="url(#shapeC)" />
      <path d="M43 47H93" stroke="var(--color-periwinkle)" strokeWidth="8" strokeLinecap="round" opacity="0.42" />
      <defs>
        <linearGradient id="shapeA" x1="18" y1="92" x2="96" y2="148" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-pink)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--color-peach)" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="shapeB" x1="116" y1="28" x2="188" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-lavender)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--color-sky)" stopOpacity="0.24" />
        </linearGradient>
        <linearGradient id="shapeC" x1="127" y1="105" x2="181" y2="159" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-sky)" stopOpacity="0.24" />
          <stop offset="1" stopColor="var(--color-pink)" stopOpacity="0.22" />
        </linearGradient>
      </defs>
    </svg>
  );
}

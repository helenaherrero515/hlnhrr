import type { ReactElement } from "react";
import { cn } from "@/utils";

interface SparklesProps {
  className?: string;
}

export function Sparkles({ className }: SparklesProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-pink)]", className)} viewBox="0 0 96 96" fill="none">
      <path d="M48 6L55 36L84 48L55 60L48 90L41 60L12 48L41 36L48 6Z" fill="currentColor" opacity="0.72" />
      <path d="M19 7L22 19L34 22L22 25L19 37L16 25L4 22L16 19L19 7Z" fill="currentColor" opacity="0.42" />
      <path d="M78 58L81 70L93 73L81 76L78 88L75 76L63 73L75 70L78 58Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

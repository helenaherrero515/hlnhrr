import type { ReactElement } from "react";
import { cn } from "@/utils";

interface FloatingCursorProps {
  className?: string;
}

export function FloatingCursor({ className }: FloatingCursorProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-periwinkle)]", className)} viewBox="0 0 72 72" fill="none">
      <path d="M17 8L55 38L38 42L30 60L17 8Z" fill="currentColor" />
      <path d="M38 42L50 57" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

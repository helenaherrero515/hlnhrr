import type { ReactElement } from "react";
import { cn } from "@/utils";

interface GridDotsProps {
  className?: string;
}

export function GridDots({ className }: GridDotsProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-periwinkle)] opacity-45", className)} viewBox="0 0 120 120" fill="none">
      {Array.from({ length: 6 }).flatMap((_, row) =>
        Array.from({ length: 6 }).map((__, column) => <circle key={`${row}-${column}`} cx={10 + column * 20} cy={10 + row * 20} r="2" fill="currentColor" />),
      )}
    </svg>
  );
}

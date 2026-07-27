import type { ReactElement } from "react";
import { cn } from "@/utils";

interface SelectionBoxProps {
  className?: string;
}

export function SelectionBox({ className }: SelectionBoxProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-periwinkle)]", className)} viewBox="0 0 160 120" fill="none">
      <rect x="18" y="18" width="124" height="84" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      {[18, 142].map((x) =>
        [18, 102].map((y) => <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="white" stroke="currentColor" strokeWidth="2" />),
      )}
    </svg>
  );
}

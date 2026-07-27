import type { ReactElement } from "react";
import { cn } from "@/utils";

interface BrandMarkProps {
  label?: string;
  className?: string;
}

export function BrandMark({ label = "Helena", className }: BrandMarkProps): ReactElement {
  const initials = label
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-[rgb(139_124_255_/_18%)] bg-[linear-gradient(135deg,rgb(139_124_255_/_18%),rgb(255_114_184_/_14%))] text-sm font-semibold text-[var(--color-ink)] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {initials}
    </span>
  );
}

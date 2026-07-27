import type { ReactElement } from "react";
import { cn } from "@/utils";

type GridDensity = "loose" | "regular" | "dense";

const densitySize: Record<GridDensity, string> = {
  loose: "[background-size:64px_64px]",
  regular: "[background-size:40px_40px]",
  dense: "[background-size:24px_24px]",
};

interface GridBackgroundProps {
  density?: GridDensity;
  fade?: boolean;
  className?: string;
}

export function GridBackground({ density = "regular", fade = true, className }: GridBackgroundProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] opacity-45",
        densitySize[density],
        fade ? "[mask-image:linear-gradient(to_bottom,black,transparent_85%)]" : undefined,
        className,
      )}
    />
  );
}

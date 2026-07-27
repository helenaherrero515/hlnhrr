import type { ReactElement } from "react";
import { cn } from "@/utils";

type GradientBlobTone = "cool" | "warm" | "mixed";
type GradientBlobSize = "sm" | "md" | "lg";

const toneClasses: Record<GradientBlobTone, string> = {
  cool: "from-[rgb(139_124_255_/_22%)] via-[rgb(141_207_255_/_18%)] to-transparent",
  warm: "from-[rgb(255_114_184_/_20%)] via-[rgb(255_201_174_/_18%)] to-transparent",
  mixed: "from-[rgb(139_124_255_/_18%)] via-[rgb(255_114_184_/_16%)] to-[rgb(141_207_255_/_12%)]",
};

const sizeClasses: Record<GradientBlobSize, string> = {
  sm: "h-40 w-40",
  md: "h-72 w-72",
  lg: "h-[30rem] w-[30rem]",
};

interface GradientBlobProps {
  tone?: GradientBlobTone;
  size?: GradientBlobSize;
  className?: string;
}

export function GradientBlob({ tone = "mixed", size = "md", className }: GradientBlobProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl motion-reduce:transform-none", toneClasses[tone], sizeClasses[size], className)}
    />
  );
}

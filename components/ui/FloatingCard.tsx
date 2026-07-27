import type { ReactElement, ReactNode } from "react";
import { cn } from "@/utils";
import { GlassCard } from "./GlassCard";

type FloatingPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "flow";

const placementClasses: Record<FloatingPlacement, string> = {
  "top-left": "lg:absolute lg:left-0 lg:top-0 lg:-translate-x-4 lg:-translate-y-4",
  "top-right": "lg:absolute lg:right-0 lg:top-0 lg:translate-x-4 lg:-translate-y-4",
  "bottom-left": "lg:absolute lg:bottom-0 lg:left-0 lg:-translate-x-4 lg:translate-y-4",
  "bottom-right": "lg:absolute lg:bottom-0 lg:right-0 lg:translate-x-4 lg:translate-y-4",
  flow: "relative",
};

interface FloatingCardProps {
  children: ReactNode;
  placement?: FloatingPlacement;
  className?: string;
}

export function FloatingCard({ children, placement = "flow", className }: FloatingCardProps): ReactElement {
  return (
    <GlassCard tone="default" padding="sm" className={cn("pointer-events-auto relative max-w-sm", placementClasses[placement], className)}>
      {children}
    </GlassCard>
  );
}

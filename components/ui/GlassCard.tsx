import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "@/utils";

type GlassCardTone = "default" | "solid" | "wash";
type GlassCardPadding = "none" | "sm" | "md" | "lg";

const toneClasses: Record<GlassCardTone, string> = {
  default: "border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] backdrop-blur-[var(--blur-glass)]",
  solid: "border-[var(--color-line)] bg-[var(--color-surface-solid)] shadow-[var(--shadow-card)]",
  wash: "border-[rgb(139_124_255_/_14%)] bg-[linear-gradient(145deg,rgb(255_255_255_/_84%),rgb(255_255_255_/_56%))] shadow-[var(--shadow-float)] backdrop-blur-[var(--blur-glass)]",
};

const paddingClasses: Record<GlassCardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-[var(--space-card)]",
  lg: "p-8",
};

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: GlassCardTone;
  padding?: GlassCardPadding;
}

export function GlassCard({ tone = "default", padding = "md", className, children, ...props }: GlassCardProps): ReactElement {
  return (
    <div className={cn("rounded-[var(--radius-lg)]", toneClasses[tone], paddingClasses[padding], className)} {...props}>
      {children}
    </div>
  );
}

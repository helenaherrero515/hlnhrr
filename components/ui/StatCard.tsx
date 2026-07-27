import type { ReactElement, ReactNode } from "react";
import type { Statistics } from "@/types";
import { cn } from "@/utils";
import { GlassCard } from "./GlassCard";

type StatTone = "default" | "lavender" | "pink" | "sky";

const toneClasses: Record<StatTone, string> = {
  default: "text-[var(--color-ink)]",
  lavender: "text-[var(--color-lavender)]",
  pink: "text-[var(--color-pink)]",
  sky: "text-[#2f74b8]",
};

interface StatCardProps {
  stat: Statistics;
  icon?: ReactNode;
  tone?: StatTone;
  className?: string;
}

export function StatCard({ stat, icon, tone = "default", className }: StatCardProps): ReactElement {
  return (
    <GlassCard tone="solid" padding="md" className={cn("min-w-[9.5rem]", className)}>
      <div className="flex items-start gap-4">
        {icon ? (
          <span aria-hidden="true" className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgb(139_124_255_/_10%)] text-[var(--color-lavender)]">
            {icon}
          </span>
        ) : null}
        <div>
          <p className={cn("text-3xl font-semibold leading-none", toneClasses[tone])}>{stat.value}</p>
          <p className="mt-2 text-sm font-medium leading-snug text-[var(--color-ink)]">{stat.label}</p>
          {stat.description ? <p className="mt-2 text-xs leading-[var(--line-body)] text-[var(--color-ink-muted)]">{stat.description}</p> : null}
        </div>
      </div>
    </GlassCard>
  );
}

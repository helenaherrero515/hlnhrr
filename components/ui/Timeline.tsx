import type { ReactElement } from "react";
import type { TimelineItem } from "@/types";
import { cn } from "@/utils";
import { Badge } from "./Badge";

type TimelineVariant = "compact" | "spacious";

interface TimelineProps {
  items: TimelineItem[];
  variant?: TimelineVariant;
  className?: string;
}

const variantClasses: Record<TimelineVariant, string> = {
  compact: "gap-6",
  spacious: "gap-10",
};

const categoryTone: Record<TimelineItem["category"], "neutral" | "lavender" | "pink" | "sky" | "peach"> = {
  Education: "sky",
  Experience: "lavender",
  Achievement: "pink",
  Milestone: "peach",
};

export function Timeline({ items, variant = "compact", className }: TimelineProps): ReactElement {
  return (
    <ol className={cn("relative grid border-l border-[var(--color-line)] pl-6", variantClasses[variant], className)}>
      {items.map((item) => (
        <li key={`${item.category}-${item.title}-${item.date}`} className="relative">
          <span aria-hidden="true" className="absolute -left-[1.95rem] top-1.5 size-3 rounded-full border border-[var(--color-periwinkle)] bg-[var(--color-surface-solid)]" />
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={categoryTone[item.category]}>{item.category}</Badge>
            <time className="text-xs font-medium text-[var(--color-ink-muted)]">{item.date}</time>
          </div>
          <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--color-ink)]">{item.title}</h3>
          <p className="mt-2 max-w-[62ch] text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

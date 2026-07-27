import type { ReactElement } from "react";
import { GlassCard } from "@/components/ui";

interface QuoteCardProps {
  quote: string;
  attribution?: string;
}

export function QuoteCard({ quote, attribution }: QuoteCardProps): ReactElement {
  return (
    <GlassCard tone="default" padding="md" className="h-full">
      <blockquote className="text-base font-medium leading-[var(--line-body)] text-[var(--color-ink)]">
        <span aria-hidden="true">&ldquo;</span>{quote}<span aria-hidden="true">&rdquo;</span>
      </blockquote>
      {attribution ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{attribution}</p> : null}
    </GlassCard>
  );
}

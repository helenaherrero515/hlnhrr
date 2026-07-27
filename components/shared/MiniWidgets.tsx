import type { ReactElement, ReactNode } from "react";
import { GlassCard } from "@/components/ui";

export interface MiniWidgetItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface MiniWidgetsProps {
  items: MiniWidgetItem[];
}

export function MiniWidgets({ items }: MiniWidgetsProps): ReactElement {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.slice(0, 3).map((item) => (
        <GlassCard key={`${item.label}-${item.value}`} tone="solid" padding="sm">
          <div className="flex items-start gap-3">
            {item.icon ? <span aria-hidden="true" className="mt-0.5 text-[var(--color-periwinkle)]">{item.icon}</span> : null}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-muted)]">{item.label}</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-[var(--color-ink)]">{item.value}</p>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}

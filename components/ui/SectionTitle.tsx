import type { ReactElement, ReactNode } from "react";
import { cn } from "@/utils";

interface SectionTitleProps {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  headingId?: string;
}

export function SectionTitle({ title, eyebrow, description, action, className, headingId }: SectionTitleProps): ReactElement {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-[var(--container-readable)]">
        {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{eyebrow}</p> : null}
        <h2 id={headingId} className="font-[family-name:var(--font-display)] text-[length:var(--type-h2)] font-semibold leading-[var(--line-heading)] text-[var(--color-ink)]">
          {title}
        </h2>
        {description ? <p className="mt-4 max-w-[62ch] text-base leading-[var(--line-body)] text-[var(--color-ink-muted)]">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </div>
  );
}

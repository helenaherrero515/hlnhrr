import type { ReactElement, ReactNode } from "react";
import { Badge } from "@/components/ui";
import { cn } from "@/utils";

interface RouteIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function RouteIntro({ eyebrow, title, description, action, className }: RouteIntroProps): ReactElement {
  return (
    <header className={cn("relative py-[var(--space-section)]", className)}>
      <Badge tone="lavender">{eyebrow}</Badge>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-[length:var(--type-h1)] font-semibold leading-[var(--line-heading)] text-[var(--color-ink)]">{title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-[var(--line-body)] text-[var(--color-ink-muted)]">{description}</p>
        </div>
        {action ? <div className="lg:justify-self-end">{action}</div> : null}
      </div>
    </header>
  );
}

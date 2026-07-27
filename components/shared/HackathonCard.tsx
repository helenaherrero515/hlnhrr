import type { ReactElement } from "react";
import type { Hackathon } from "@/types";
import { Badge, GlassCard } from "@/components/ui";

interface HackathonCardProps {
  hackathon: Hackathon;
  emphasis?: boolean;
}

export function HackathonCard({ hackathon, emphasis = false }: HackathonCardProps): ReactElement {
  return (
    <article className={emphasis ? "md:col-span-2" : undefined}>
      <GlassCard tone={emphasis ? "wash" : "solid"} padding="md" className="h-full">
        <div className="flex flex-wrap gap-2">
          {hackathon.achievement ? <Badge tone="pink">{hackathon.achievement}</Badge> : null}
          <Badge tone="neutral">{hackathon.date}</Badge>
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-snug text-[var(--color-ink)]">{hackathon.project}</h3>
        <p className="mt-1 text-xs font-semibold text-[var(--color-periwinkle)]">{hackathon.name}</p>
        <p className="mt-4 text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{hackathon.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {hackathon.tags.slice(0, 3).map((tag) => <Badge key={tag} tone="sky">{tag}</Badge>)}
        </div>
      </GlassCard>
    </article>
  );
}

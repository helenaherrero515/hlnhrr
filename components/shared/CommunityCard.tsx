import { UsersRound } from "lucide-react";
import type { ReactElement } from "react";
import type { Community } from "@/types";
import { GlassCard } from "@/components/ui";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps): ReactElement {
  return (
    <GlassCard tone="solid" padding="md" className="h-full">
      <div className="flex gap-4">
        <span aria-hidden="true" className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgb(113_134_255_/_16%),rgb(255_114_184_/_14%))] text-[var(--color-periwinkle)]">
          <UsersRound size={21} />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-snug text-[var(--color-ink)]">{community.name}</h3>
          <p className="mt-1 text-xs font-semibold text-[var(--color-periwinkle)]">{community.role}</p>
          <p className="mt-3 text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{community.description}</p>
          {community.highlights?.[0] ? <p className="mt-3 text-xs font-medium text-[var(--color-ink)]">{community.highlights[0]}</p> : null}
        </div>
      </div>
    </GlassCard>
  );
}

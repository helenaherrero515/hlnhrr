import { Award } from "lucide-react";
import type { ReactElement } from "react";
import type { Certification } from "@/types";
import { GlassCard } from "@/components/ui";
import { formatDate } from "@/utils";

interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps): ReactElement {
  return (
    <GlassCard tone="solid" padding="md" className="h-full">
      <div className="flex gap-4">
        <span aria-hidden="true" className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[rgb(139_124_255_/_10%)] text-[var(--color-lavender)]">
          <Award size={20} />
        </span>
        <div>
          <h3 className="text-sm font-semibold leading-snug text-[var(--color-ink)]">{certification.name}</h3>
          <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)]">
            {certification.issuer} · {formatDate(certification.issuedDate)}
          </p>
          {certification.description ? <p className="mt-3 text-xs leading-[var(--line-body)] text-[var(--color-ink-muted)]">{certification.description}</p> : null}
        </div>
      </div>
    </GlassCard>
  );
}

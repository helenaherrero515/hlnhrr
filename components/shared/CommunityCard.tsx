/* eslint-disable @next/next/no-img-element */
import { ExternalLink } from "lucide-react";
import type { ReactElement } from "react";
import type { Community } from "@/types";
import { formatDate } from "@/utils";

interface CommunityCardProps {
  community: Community;
  gradientTone?: string;
}

function dateRange(startDate?: string, endDate?: string): string {
  if (!startDate) return "";
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
}

export function CommunityCard({ community, gradientTone }: CommunityCardProps): ReactElement {
  const logoUrl = community.logo ?? community.image ?? "/images/logos/aws-cloud-club-pup.png";
  const dates = dateRange(community.startDate, community.endDate);
  const locationAndDate = [community.location, dates].filter(Boolean).join(" • ");

  return (
    <article
      tabIndex={0}
      className="org-hover-card group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[1.25rem] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[var(--shadow-float)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
      aria-label={`${community.name} - ${community.role}`}
    >
      {/* Back Layer (Content Layer) */}
      <div className="org-card-back-content flex h-full min-h-[22rem] flex-col justify-between p-6 pb-20 text-[var(--color-ink)]">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-[var(--color-ink)]">
              {community.name}
            </h3>
          </div>
          <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-periwinkle)]">
            {community.role}
          </p>
          {locationAndDate ? (
            <p className="mt-1 text-[0.72rem] font-semibold text-[var(--color-ink-muted)]">
              {locationAndDate}
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-[1.6] text-[var(--color-ink-muted)]">
            {community.description}
          </p>

          {community.highlights && community.highlights.length > 0 ? (
            <ul className="mt-4 space-y-1.5 text-xs font-medium text-[var(--color-ink)]">
              {community.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={`${community.name}-hl-${idx}`} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--color-pink)]" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {community.href ? (
          <div className="mt-6">
            <a
              href={community.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-neutral-50 px-4 py-2 text-xs font-bold text-[var(--color-ink)] transition-colors hover:bg-neutral-100 hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              <span>Learn More</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>

      {/* Front Layer (Overlay Layer) */}
      <div
        className="org-card-overlay absolute inset-0 z-10 flex items-center justify-center p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background:
            gradientTone ??
            "linear-gradient(135deg, rgb(28, 31, 44) 0%, rgb(44, 48, 68) 50%, rgb(60, 64, 88) 100%)",
        }}
      >
        <div className="flex size-full items-center justify-center">
          <img
            src={logoUrl}
            alt={`${community.name} logo`}
            className="org-card-logo max-h-[110px] max-w-[110px] rounded-2xl object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
        </div>
      </div>
    </article>
  );
}

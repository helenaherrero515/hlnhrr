import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactElement } from "react";
import type { Project } from "@/types";
import { Badge, GlassCard } from "@/components/ui";
import { GridDots, SelectionBox } from "@/components/assets";
import { cn } from "@/utils";

type ProjectCardSize = "feature" | "standard" | "compact";

interface ProjectCardProps {
  project: Project;
  size?: ProjectCardSize;
  priority?: boolean;
  className?: string;
}

const sizeClasses: Record<ProjectCardSize, string> = {
  feature: "md:col-span-7 lg:col-span-8",
  standard: "md:col-span-5 lg:col-span-4",
  compact: "md:col-span-4",
};

export function ProjectCard({ project, size = "standard", className }: ProjectCardProps): ReactElement {
  const destination = project.caseStudyHref ?? project.href;
  const isFeature = size === "feature";

  const content = (
    <GlassCard
      tone={isFeature ? "wash" : "solid"}
      padding="none"
      className={cn("group relative h-full overflow-hidden transition-transform duration-[var(--duration-base)] hover:-translate-y-1", className)}
    >
      <div className={cn("grid h-full gap-6 p-6", isFeature ? "lg:grid-cols-[1.1fr_0.9fr] lg:p-8" : undefined)}>
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={isFeature ? "pink" : "lavender"}>{project.year}</Badge>
            <Badge tone="neutral">{project.role}</Badge>
          </div>
          <h3 className={cn("mt-5 font-semibold leading-[var(--line-heading)] text-[var(--color-ink)]", isFeature ? "text-3xl" : "text-xl")}>{project.title}</h3>
          <p className="mt-3 text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{project.summary}</p>
          {isFeature ? <p className="mt-4 text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{project.description}</p> : null}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.slice(0, isFeature ? 5 : 3).map((tag) => (
              <Badge key={tag} tone="sky">{tag}</Badge>
            ))}
          </div>
          <div className="mt-auto pt-6 text-sm font-semibold text-[var(--color-ink)]">
            {destination ? (
              <span className="inline-flex items-center gap-2">
                View project <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            ) : (
              <span className="text-[var(--color-ink-muted)]">Case study pending approved assets</span>
            )}
          </div>
        </div>
        <div className={cn("relative min-h-48 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[linear-gradient(145deg,rgb(255_255_255_/_74%),rgb(139_124_255_/_10%))]", isFeature ? "lg:min-h-72" : undefined)}>
          <GridDots className="absolute right-4 top-4 h-24 w-24" />
          <SelectionBox className="absolute bottom-6 left-1/2 h-28 w-36 -translate-x-1/2" />
          <div className="absolute left-5 top-5 rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-white/70 px-3 py-1 text-xs font-semibold text-[var(--color-ink)]">
            {project.slug}
          </div>
          <div className="absolute bottom-5 right-5 h-2 w-24 rounded-[var(--radius-pill)] bg-[linear-gradient(90deg,var(--color-periwinkle),var(--color-pink))]" />
        </div>
      </div>
    </GlassCard>
  );

  return (
    <article className={cn(sizeClasses[size], "h-full")}>
      {destination ? (
        <Link href={destination} className="block h-full rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-canvas)]">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}

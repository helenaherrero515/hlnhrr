import Link from "next/link";
import { ArrowRight, Award, MapPin, Medal, Trophy } from "lucide-react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { Project } from "@/types";
import { Badge, GlassCard } from "@/components/ui";
import { cn } from "@/utils";

type ProjectCardSize = "feature" | "standard" | "compact";

interface ProjectCardProps {
  project: Project;
  size?: ProjectCardSize;
  priority?: boolean;
  className?: string;
  onSelect?: (project: Project) => void;
  ctaLabel?: string;
}

type ProjectCardStyle = CSSProperties & {
  "--project-primary": string;
  "--project-secondary": string;
  "--project-tertiary": string;
  "--project-ink": string;
  "--project-logo": string;
};

function projectStyle(project: Project): ProjectCardStyle {
  return {
    "--project-primary": project.palette.primary,
    "--project-secondary": project.palette.secondary,
    "--project-tertiary": project.palette.tertiary ?? project.palette.secondary,
    "--project-ink": project.palette.ink ?? "var(--color-ink)",
    "--project-logo": `url(${project.logoImage ?? `/images/projects/logos/${project.slug}-logo.png`})`,
  };
}

function awardIcon(award?: string): ReactNode {
  if (!award) return null;
  if (award.toLowerCase().includes("champion")) return <Trophy size={13} />;
  if (award.toLowerCase().includes("pitch")) return <span className="inline-flex items-center gap-1"><Medal size={13} /><Award size={13} /></span>;
  return <Medal size={13} />;
}

function ProjectFolder({ title }: { title: string }): ReactElement {
  return (
    <div className="project-folder-scene" aria-hidden="true">
      <div className="project-folder-back" />
      <div className="project-folder-paper project-folder-paper-one">
        <span />
        <span />
        <span />
      </div>
      <div className="project-folder-paper project-folder-paper-two">
        <span />
        <span />
      </div>
      <div className="project-folder-front">
        <div className="project-folder-tab" />
        <p>{title.slice(0, 2)}</p>
      </div>
    </div>
  );
}

export function ProjectCard({ project, size = "standard", className, onSelect, ctaLabel = "View Project" }: ProjectCardProps): ReactElement {
  const destination = project.caseStudyHref ?? project.href ?? `/projects#${project.slug}`;
  const cardContent = (
    <GlassCard tone="default" padding="none" className="project-showcase-card relative flex h-full min-h-[35rem] overflow-hidden rounded-[1.5rem] border border-white/70 bg-[linear-gradient(145deg,rgb(255_255_255_/_78%),rgb(255_255_255_/_48%))] p-5 shadow-[0_22px_70px_rgb(32_27_58_/_10%)] backdrop-blur-[var(--blur-glass)] sm:p-6">
      <div aria-hidden="true" className="project-card-aura absolute inset-0" />
      <div className="relative z-10 flex min-h-full w-full flex-col">
        <div className="project-visual grid min-h-52 place-items-center rounded-[1.25rem] border border-white/70 bg-white/35 shadow-[inset_0_1px_0_rgb(255_255_255_/_70%)] backdrop-blur-xl">
          <ProjectFolder title={project.title} />
        </div>

        <div className="project-badges mt-5 flex flex-wrap items-center gap-2">
          {project.award ? <Badge tone="peach" icon={awardIcon(project.award)} className="project-award-badge border-white/70 bg-white/60 text-[var(--project-ink)] shadow-sm">{project.award}</Badge> : null}
          <Badge tone="neutral" className="project-date-badge border-white/70 bg-white/55 text-[var(--color-ink-muted)] shadow-sm">{project.location} • {project.year}</Badge>
        </div>

        <div className="project-copy mt-5">
          <h3 className="project-title text-2xl font-black leading-tight text-[var(--color-ink)]">{project.title}</h3>
          <p className="project-event mt-2 text-xs font-black uppercase leading-snug text-[var(--project-ink)] opacity-80">{project.event}</p>
          <p className="project-role mt-4 text-sm font-semibold leading-snug text-[var(--color-ink)]">{project.role}</p>
          <p className="project-description mt-3 text-sm leading-[1.55] text-[var(--color-ink-muted)]">{project.description}</p>
        </div>

        <div className="project-footer mt-auto pt-6">
          <p className="project-achievement rounded-[1rem] border border-white/70 bg-white/50 px-4 py-3 text-xs font-semibold leading-[1.45] text-[var(--color-ink-muted)] shadow-sm backdrop-blur-sm">{project.achievement}</p>
          <span className="project-cta mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--color-ink)]">
            {ctaLabel} <ArrowRight aria-hidden="true" size={16} />
          </span>
        </div>
      </div>
      <span aria-hidden="true" className="project-location-pin absolute bottom-6 right-6 grid size-11 place-items-center rounded-full border border-white/70 bg-white/60 text-[var(--project-secondary)] shadow-sm backdrop-blur-md">
        <MapPin size={19} />
      </span>
    </GlassCard>
  );

  return (
    <article id={project.slug} className={cn("project-archive-card h-full scroll-mt-24", `project-card-${size}`, className)} style={projectStyle(project)}>
      {onSelect ? (
        <button type="button" onClick={() => onSelect(project)} className="group block h-full w-full rounded-[1.5rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-canvas)]">
          {cardContent}
        </button>
      ) : (
        <Link href={destination} className="group block h-full rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-canvas)]">
          {cardContent}
        </Link>
      )}
    </article>
  );
}
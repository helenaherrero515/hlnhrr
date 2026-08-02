"use client";

import { Github, X } from "lucide-react";
import type { CSSProperties, ReactElement } from "react";
import { useEffect, useState } from "react";
import type { Project } from "@/types";
import { ProjectCard } from "@/components/shared";

type ProjectModalStyle = CSSProperties & {
  "--project-primary": string;
  "--project-secondary": string;
  "--project-tertiary": string;
  "--project-ink": string;
  "--project-logo": string;
};

interface ProjectShowcaseProps {
  projects: Project[];
}

function modalStyle(project: Project): ProjectModalStyle {
  return {
    "--project-primary": project.palette.primary,
    "--project-secondary": project.palette.secondary,
    "--project-tertiary": project.palette.tertiary ?? project.palette.secondary,
    "--project-ink": project.palette.ink ?? "var(--color-ink)",
    "--project-logo": `url(${project.logoImage ?? `/images/projects/logos/${project.slug}-logo.png`})`,
  };
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps): ReactElement {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") setSelectedProject(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <section id="projects" aria-labelledby="projects-showcase-title" className="mx-auto mt-16 max-w-[96rem]">
        <h2 id="projects-showcase-title" className="sr-only">Project showcase</h2>
        <div className="projects-fan" aria-label="Featured project cards">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} size="feature" ctaLabel="Know More" onSelect={setSelectedProject} className={`project-arc-card project-arc-card-${project.slug}`} />
          ))}
        </div>
      </section>

      {selectedProject ? (
        <div className="project-detail-popout" role="dialog" aria-modal="true" aria-labelledby="project-detail-title" style={modalStyle(selectedProject)}>
          <button type="button" className="project-detail-backdrop" aria-label="Close project details" onClick={() => setSelectedProject(null)} />
          <div className="project-detail-panel">
            <button type="button" className="project-detail-close" aria-label="Close project details" onClick={() => setSelectedProject(null)}><X size={18} /></button>
            <div className="project-detail-visual" aria-hidden="true">
              <div className="project-logo-mark project-logo-mark-large">
                <span>{selectedProject.title.slice(0, 2)}</span>
              </div>
            </div>
            <div className="project-detail-copy">
              {selectedProject.award ? <p className="project-detail-award">{selectedProject.award}</p> : null}
              <h3 id="project-detail-title">{selectedProject.title}</h3>
              <p className="project-detail-event">{selectedProject.event}</p>
              <p className="project-detail-meta">{selectedProject.location} • {selectedProject.year}</p>
              <p className="project-detail-role">{selectedProject.role}</p>
              <p className="project-detail-description">{selectedProject.description}</p>
              <p className="project-detail-achievement">{selectedProject.achievement}</p>
              <div className="project-detail-tags">
                {selectedProject.tags.map((tag) => <span key={`${selectedProject.slug}-${tag}`}>{tag}</span>)}
              </div>
              <a className="project-detail-github" href={selectedProject.githubHref ?? "https://github.com/helenaherrero515"} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" size={17} /> GitHub Repository
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
import type { ReactElement } from "react";
import type { Project } from "@/types";
import { ProjectCard, Section, SectionHeading } from "@/components/shared";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps): ReactElement {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <Section id="projects" aria-labelledby="projects-title">
      <SectionHeading headingId="projects-title" eyebrow="Selected work" title="Product ideas shaped from flows, prototypes, and frontends." description="Three verified project records from Helena's CV. Full case studies can be added when project briefs, images, and destinations are approved." />
      <div className="mt-8 grid gap-5 md:grid-cols-12">
        {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} size={index === 0 ? "feature" : "standard"} priority={index === 0} />)}
      </div>
    </Section>
  );
}


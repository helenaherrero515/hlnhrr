import type { ReactElement } from "react";
import type { Project } from "@/types";
import { ProjectCard, Section, SectionHeading } from "@/components/shared";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps): ReactElement {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 6);

  return (
    <Section id="projects" aria-labelledby="projects-title" className="max-w-[92rem]">
      <SectionHeading headingId="projects-title" eyebrow="Projects" title="Premium builds shaped through design, AI, and frontend craft." description="Six hackathon and buildathon projects presented with distinct visual identities, verified roles, awards, and outcomes." />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </Section>
  );
}

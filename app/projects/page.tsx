import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { Footer } from "@/components/sections";
import { ProjectCard, RouteIntro, Section } from "@/components/shared";
import { projects } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Selected UI/UX, frontend, AI, and hackathon projects by Helena R. Herrero.",
  path: "/projects",
});

export default function ProjectsPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="Projects" title="Selected product work, built from verified project records." description="Project cards currently use code-native interface visuals until approved case-study images and destinations are added." />
        <Section id="project-archive" aria-labelledby="project-archive-title" className="pt-0">
          <h2 id="project-archive-title" className="sr-only">Project archive</h2>
          <div className="grid gap-5 md:grid-cols-12">
            {projects.map((project, index) => <ProjectCard key={project.slug} project={project} size={index === 0 ? "feature" : "standard"} />)}
          </div>
        </Section>
      </PageShell>
      <Footer />
    </>
  );
}

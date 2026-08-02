import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { projects } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Selected UI/UX, frontend, AI, and hackathon projects by Helena R. Herrero.",
  path: "/projects",
});

const showcaseOrder = ["lingap", "gising", "guidher", "tinig", "purifai", "convex"];

export default function ProjectsPage(): React.ReactElement {
  const showcaseProjects = showcaseOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="projects-showcase-page relative isolate min-h-screen overflow-hidden px-4 pb-24 pt-36 sm:px-8 lg:px-16 lg:pt-40">
        <div aria-hidden="true" className="projects-orb projects-orb-left" />
        <div aria-hidden="true" className="projects-orb projects-orb-right" />
        <div aria-hidden="true" className="projects-dot-field" />

        <header className="mx-auto max-w-6xl text-center">
          <h1 className="mx-auto max-w-5xl text-[clamp(3rem,6.8vw,5.35rem)] font-black leading-[0.95] tracking-[-0.06em] text-[var(--color-ink)]">
            Building award-winning<br /><span className="bg-[linear-gradient(100deg,#ff4fa8_0%,#8b5cf6_44%,#5b7cff_72%)] bg-clip-text text-transparent">digital products</span> with purpose.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-[1.65] text-[var(--color-ink-muted)]">
            A curated collection of AI, blockchain, and cybersecurity projects that showcase product thinking, user-centered design, and modern frontend engineering.
          </p>
        </header>

        <ProjectShowcase projects={showcaseProjects} />

      </main>
    </>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout";
import { ProjectsInteractiveBackground } from "@/components/sections";
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
        <ProjectsInteractiveBackground />

        <header className="relative flex flex-col items-center justify-center w-full max-w-6xl mx-auto select-none pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="relative flex flex-col items-center justify-center w-full z-20">
            
            <div className="flex flex-col items-center justify-center w-full">
              {/* Top Row: Tech */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 w-full md:pr-[10%]">
                <h1 className="text-[var(--color-ink)] text-[4.5rem] sm:text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-[0.85] m-0 p-0 font-lexend">
                  Tech
                </h1>
                
                <div className="bg-[#fffade]/80 backdrop-blur-sm border border-[#e8dfa5] px-6 py-2 shadow-sm rounded-full hidden md:flex items-center transform md:-translate-y-2">
                  <span className="text-[#5c531d] text-lg md:text-xl font-medium tracking-wide">
                    showcase
                  </span>
                </div>
              </div>

              {/* Bottom Row: Projects */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 w-full md:pl-[10%] mt-4 md:mt-2">
                <div className="bg-[#e6f7ff]/80 backdrop-blur-sm border border-[#bce3f5] px-6 py-2 shadow-sm rounded-full hidden md:flex items-center transform md:translate-y-2">
                  <span className="text-[#195b7a] text-lg md:text-xl font-medium tracking-wide">
                    portfolio
                  </span>
                </div>

                <h2 className="text-[var(--color-ink)] text-[4.5rem] sm:text-7xl md:text-[10rem] font-black tracking-[-0.04em] leading-[0.85] m-0 p-0 font-lexend">
                  Projects
                </h2>
              </div>
            </div>
            
            {/* Subtitle */}
            <div className="mt-14 md:mt-24 max-w-3xl text-center px-4">
              <p className="text-[var(--color-ink-muted)] text-lg sm:text-xl font-normal leading-relaxed tracking-wide font-sans">
                A curated collection of AI, blockchain, and cybersecurity projects that showcase product thinking, user-centered design, and modern frontend engineering.
              </p>
            </div>
            
          </div>
        </header>

        <ProjectShowcase projects={showcaseProjects} />

      </main>
    </>
  );
}

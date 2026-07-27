import type { ReactElement } from "react";
import type { Project } from "@/types";
import { FeaturedProjects } from "./FeaturedProjects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps): ReactElement {
  return <FeaturedProjects projects={projects} />;
}

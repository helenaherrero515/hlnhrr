export interface ProjectPalette {
  primary: string;
  secondary: string;
  tertiary?: string;
  ink?: string;
}

export interface Project {
  slug: string;
  title: string;
  event: string;
  location: string;
  year: number;
  role: string;
  summary: string;
  description: string;
  achievement: string;
  award?: string;
  coverImage: string;
  logoImage?: string;
  githubHref?: string;
  tags: string[];
  palette: ProjectPalette;
  href?: string;
  caseStudyHref?: string;
  featured: boolean;
}

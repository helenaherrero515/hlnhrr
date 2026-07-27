export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: number;
  role: string;
  coverImage: string;
  tags: string[];
  href?: string;
  caseStudyHref?: string;
  featured: boolean;
}

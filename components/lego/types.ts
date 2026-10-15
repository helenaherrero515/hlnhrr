export interface ProjectItem {
  title: string;
  award: string;
  event?: string;
  role?: string;
  description: string;
  tags: string[];
  color: "c-red" | "c-yellow" | "c-blue" | "c-green" | "c-grey";
  img?: string;
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface ExperienceRole {
  role: string;
  detail: string;
}

export interface ExperienceCategory {
  title: string;
  code: string;
  color: "c-red" | "c-yellow" | "c-blue" | "c-green" | "c-grey";
  items: [string, string][];
}

export interface WorkCategory {
  title: string;
  subtitle: string;
  type: "pubmats" | "swags" | "ppt";
}

export interface GuestbookEntry {
  n: string;
  m: string;
  t: number;
}

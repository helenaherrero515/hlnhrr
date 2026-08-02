export interface Hackathon {
  name: string;
  date: string;
  project: string;
  role: string;
  location: string;
  achievement?: string;
  description: string;
  highlights: string[];
  tags: string[];
  href?: string;
  footer?: string[];
}

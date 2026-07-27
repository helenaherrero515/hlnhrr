import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "purifai",
    title: "PurifAI",
    summary: "An AI-powered cybersecurity platform designed to protect enterprise AI from prompt injection through real-time threat detection.",
    description: "Helena led the React dashboard and Chrome extension frontend design and implementation during CODEKADA Hackathon 2026.",
    year: 2026,
    role: "Frontend Developer & UI/UX Designer",
    coverImage: "/images/projects/purifai/cover.webp",
    tags: ["React", "Chrome Extension", "AI", "Cybersecurity"],
    featured: true,
  },
  {
    slug: "lingap",
    title: "LINGAP",
    summary: "A blockchain-based donation platform designed around transparent, trust-forward giving.",
    description: "Helena owned the UI/UX design and visual assets, including milestone-based escrow and donor-verification flows, for Build on Stellar PH Hackathon 2026.",
    year: 2026,
    role: "UI/UX & Graphics Designer",
    coverImage: "/images/projects/lingap/cover.webp",
    tags: ["UI/UX Design", "Visual Design", "Blockchain"],
    featured: true,
  },
  {
    slug: "core-vertex",
    title: "Core Vertex",
    summary: "An award-recognized hackathon experience developed from initial wireframes to polished screens with full-stack implementation.",
    description: "Helena designed the end-to-end UX and built backend logic with the complete frontend experience for FEUTECH ACM Core Vertex Hackathon 2025.",
    year: 2025,
    role: "Full Stack Developer & UI/UX Designer",
    coverImage: "/images/projects/core-vertex/cover.webp",
    tags: ["Full Stack Development", "UX Design", "Wireframing"],
    featured: true,
  },
];

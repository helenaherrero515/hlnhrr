import type { ExperienceCategory, ProjectItem } from "./types";

export const LEGO_MANIFESTO: [string, number, string?][] = [
  ["With", 0],
  ["a", 0],
  ["brick", 1, "c-yellow"],
  ["in", 0],
  ["hand", 0],
  ["and", 0],
  ["wonder", 1, "c-blue"],
  ["in", 0],
  ["mind,", 0],
  ["I", 0],
  ["build", 1, "c-red"],
  ["beyond", 0],
  ["what", 0],
  ["the", 0],
  ["pieces", 1, "c-green"],
  ["were", 0],
  ["meant", 0],
  ["to", 0],
  ["be.", 0],
];

export const LEGO_TICKER: string[] = [
  "Obsessed with growth",
  "Machine Learning",
  "Artificial Intelligence",
  "Automation",
  "Software Development",
  "Cloud Computing",
  "AI Workflows",
  "UI/UX",
  "Product Designer",
];

export const LEGO_EXPERIENCE: ExperienceCategory[] = [
  {
    title: "ORGS",
    code: "ORG",
    color: "c-red",
    items: [
      ["Data Science Associate", "AWS Student Builder Group PUP"],
      ["AIX/UI/UX Design Lead", "Seekers Guild"],
      ["Partnership Lead", "Microsoft Campus Cloud PUP"],
      ["General Secretary", "Microsoft Student Community Philippines"],
      ["Events Core Team", "For Girls Who Build PH"],
      ["Frontend Developer", "Microsoft Campus Club PUP"],
    ],
  },
  {
    title: "INTERNSHIP",
    code: "INT",
    color: "c-blue",
    items: [
      ["ML Intern", "Progree - Remote"],
      ["ML Engineering Intern", "Flyrankai - Remote"],
      ["Proj Management Intern", "Kadakareer - Remote"],
    ],
  },
  {
    title: "VOLUNTEERING",
    code: "VOL",
    color: "c-yellow",
    items: [
      ["Registration / Usher", "Echelon PH 2026"],
      ["Layout Designer / Workshop Facilitator", "AWS Community Day PH 2026"],
      ["SocMed Documentation", "Philippines Blockchain Week 2026"],
      ["Graphics Designer", "AWS User Group Philippines Meetup"],
      ["Graphics Designer / Media", "AWS BuildNights 2026: QuickQuest"],
      ["Creatives / Facilitator", "AWS Build Over Night Hackathon 2026"],
      ["Registration", "App Builders PH Meetup 2026"],
    ],
  },
  {
    title: "HACKATHONS",
    code: "HAK",
    color: "c-green",
    items: [
      ["Champion", "Google Developer Group PUP: SparksFest 2026"],
      ["2nd Place", "Google Developer Group PUP: Build With AI 2026"],
      ["2nd Place & Best Pitch", "PUP CCIS AFK Ideathon 2026"],
      ["6th Place", "Build on Stellar Philippines Hackathon 2026"],
      ["Best Concept Creativity, Best Accuracy, & Best Functionality", "FEUTECH ACM Core Vertex Buildathon 2026"],
      ["Participant", "Codekada Hackathon 2026"],
      ["Participant", "OpenAI Build Week Community Buildathon 2026"],
    ],
  },
  {
    title: "ACADEMIC",
    code: "EDU",
    color: "c-grey",
    items: [
      ["Polytechnic University of the Philippines", "Bachelor of Science in Computer Science · 2025-2029"],
      ["Navotas National Science Highschool", "Junior Highschool - Senior Highschool (STEM) · 2019-2025"],
    ],
  },
];

export const LEGO_PROJECTS: ProjectItem[] = [
  {
    title: "GuidHer",
    award: "Champion",
    event: "GDGPUP SPARKSFEST 2026",
    role: "UI/UX Designer & Frontend Developer",
    description: "Community-sourced safer routing for women commuting around PUP Sta. Mesa with real-time street condition reports and AI pre-trip safety briefs.",
    tags: ["Safer Routing", "Civic Tech", "Gemini API"],
    color: "c-red",
    img: "/images/projects/guidher/cover.webp",
    live: "https://guidher.vercel.app",
    github: "https://github.com/1-N-2-Dis/GuidHer",
  },
  {
    title: "Tinig",
    award: "2nd Place & Best Pitch",
    event: "CCIS AFK Ideathon 2026",
    role: "Full Stack Developer",
    description: "Toll-free AI voice hotline for Filipino senior citizens accessing government services by speaking naturally in Tagalog or Taglish, with emergency SOS.",
    tags: ["AI Voice", "Civic Tech", "Emergency SOS"],
    color: "c-yellow",
    img: "/images/projects/tinig/cover.webp",
    live: "https://tinig-mnl.vercel.app",
    github: "https://github.com/helenaherrero515/tinig-mnl",
  },
  {
    title: "Lingap",
    award: "6th Place",
    event: "Build on Stellar PH Hackathon 2026",
    role: "UI/UX & Graphics Designer",
    description: "Transparent donation platform using Stellar Soroban smart contracts for milestone-based aid campaigns with auditable fund release.",
    tags: ["Blockchain", "Donations", "Smart Contracts"],
    color: "c-blue",
    img: "/images/projects/lingap/cover.webp",
    live: "https://lingap-ledger.vercel.app",
    github: "https://github.com/wolfsenberg/LINGAP",
  },
  {
    title: "Gising",
    award: "2nd Place",
    event: "GDGPUP Build with AI Hackathon 2025",
    role: "Frontend Developer & UI/UX Designer",
    description: "Edge-AI wearable concept for detecting early stroke biomarkers in real time before hospital arrival, combining sensor telemetry and Gemini/Vertex AI.",
    tags: ["Edge AI", "Healthcare", "Wearable"],
    color: "c-green",
    img: "/images/projects/gising/cover.webp",
    caseStudy: "https://app.notion.com/p/GISING-351007194e9c801985eae6064c7c0769?source=copy_link",
  },
  {
    title: "PurifAI",
    award: "CODEKADA Hackathon 2026",
    event: "CODEKADA Hackathon 2026",
    role: "Frontend Developer & UI/UX Designer",
    description: "Prompt-injection defense suite for enterprise AI workflows. Scans emails and files via Chrome Extension, React dashboard, and local DeBERTa inference.",
    tags: ["Cybersecurity", "Chrome Extension", "ML Inference"],
    color: "c-grey",
    img: "/images/projects/purifai/cover.webp",
    live: "https://purifai-cleaner.vercel.app",
    github: "https://github.com/HitsukiMok/PurifAI",
  },
  {
    title: "Convex",
    award: "OpenAI Build Week 2026",
    event: "OpenAI Build Week Community Buildathon 2026",
    role: "Frontend Developer & UI/UX Designer",
    description: "Read-only comprehension layer for code repositories. Helps developers trace deterministic evidence and answer teach-back questions without mutating code.",
    tags: ["OpenAI", "Code Comprehension", "Evidence UX"],
    color: "c-red",
    img: "/images/projects/convex/cover.webp",
    live: "https://convex.varietase.workers.dev",
    github: "https://github.com/varietase/convex",
  },
];

export const LEGO_WORKS = [
  {
    title: "Pubmats",
    subtitle: "Publication materials gallery",
    type: "pubmats" as const,
    img: "/images/works/pubmats/aws community day 2026/venue reveal.png",
  },
  {
    title: "Swags design",
    subtitle: "2 merch and event collateral designs",
    type: "swags" as const,
    img: "/images/works/swags-design/aws-community-day-2026.png",
  },
  {
    title: "Branding",
    subtitle: "Visual identity & design systems",
    badge: "Under construction",
    type: "branding" as const,
    img: "/images/works/branding-construction.svg",
  },
];

export const LEGO_TOOLS: string[] = [
  "Gemini API",
  "OpenAI",
  "Stellar Soroban",
  "Smart Contracts",
  "Chrome Extension",
  "ML Inference",
  "Edge AI",
  "AI Voice",
  "Blockchain",
  "Civic Tech",
];

export const LEGO_TECHNICAL_SKILLS = [
  {
    category: "Programming Languages",
    color: "c-red",
    items: ["Python", "SQL", "C", "C#", "Java"],
  },
  {
    category: "Frontend & Web",
    color: "c-yellow",
    items: ["React", "HTML/CSS", "Chrome Extension development"],
  },
  {
    category: "Data & ML",
    color: "c-blue",
    items: ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow/Keras", "PyTorch"],
  },
  {
    category: "Visualization & BI",
    color: "c-green",
    items: ["Tableau", "Power BI", "Google Looker Studio"],
  },
  {
    category: "Blockchain",
    color: "c-red",
    items: ["Solidity", "Stellar"],
  },
  {
    category: "Design & Tools",
    color: "c-yellow",
    items: ["Figma", "Canva", "Github", "OpenAI", "Anthropic", "Antigravity"],
  },
  {
    category: "Others",
    color: "c-blue",
    items: ["UI/UX design", "Agile project management"],
  },
];

export const LEGO_COLOR_MAP: Record<string, string> = {
  "c-red": "var(--red)",
  "c-yellow": "var(--yellow)",
  "c-blue": "var(--blue)",
  "c-green": "var(--green)",
  "c-grey": "var(--grey)",
};

export const LEGO_LETTER_PATTERNS: Record<string, string[]> = {
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
};

import type { ExperienceCategory, ProjectItem } from "./types";

export const LEGO_MANIFESTO: [string, number, string?][] = [
  ["Curious", 1, "c-yellow"],
  ["first.", 0],
  ["Then", 0],
  ["I", 0],
  ["build", 1, "c-blue"],
  ["it,", 0],
  ["break", 1, "c-red"],
  ["it,", 0],
  ["fix", 1, "c-green"],
  ["it,", 0],
  ["and", 0],
  ["build", 0],
  ["it", 0],
  ["better.", 0],
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
    description: "Community-sourced safer routing for women commuting around PUP Sta. Mesa.",
    tags: ["Safer Routing", "Civic Tech", "Gemini API"],
    color: "c-red",
  },
  {
    title: "Tinig",
    award: "2nd Place & Best Pitch",
    description: "Toll-free AI voice hotline for Filipino senior citizens accessing public services.",
    tags: ["AI Voice", "Civic Tech", "Emergency SOS"],
    color: "c-yellow",
  },
  {
    title: "Lingap",
    award: "6th Place",
    description: "Transparent donation platform using Stellar Soroban milestone escrow.",
    tags: ["Blockchain", "Donations", "Smart Contracts"],
    color: "c-blue",
  },
  {
    title: "Gising",
    award: "2nd Place",
    description: "Edge-AI wearable concept for detecting early stroke risk before hospital arrival.",
    tags: ["Edge AI", "Healthcare", "Wearable"],
    color: "c-green",
  },
  {
    title: "PurifAI",
    award: "",
    description: "Prompt-injection defense suite for enterprise AI workflows.",
    tags: ["Cybersecurity", "Chrome Extension", "ML Inference"],
    color: "c-grey",
  },
  {
    title: "Convex",
    award: "",
    description: "Read-only comprehension layer for understanding unfamiliar code repositories.",
    tags: ["OpenAI", "Code Comprehension", "Evidence UX"],
    color: "c-red",
  },
];

export const LEGO_WORKS = [
  {
    title: "Pubmats",
    subtitle: "Publication materials gallery",
    type: "pubmats" as const,
  },
  {
    title: "Swags design",
    subtitle: "2 merch and event collateral designs",
    type: "swags" as const,
  },
  {
    title: "PPT decks",
    subtitle: "Presentation design and storytelling",
    type: "ppt" as const,
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

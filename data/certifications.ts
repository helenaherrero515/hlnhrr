import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    name: "Meta Data Analyst Professional Certificate",
    issuer: "Meta via Coursera",
    issuedDate: "2026-02-01",
    badge: "/images/logos/meta-data-analyst.png",
    description: "Developed proficiency in the OSEMN framework for data-driven decision-making, with hands-on SQL, Python, Tableau, and Power BI practice.",
    highlights: [
      "Applied the OSEMN framework: Obtain, Scrub, Explore, Model, and Nurture.",
      "Used SQL for database management and Python for data cleaning and exploratory analysis.",
      "Built data visualizations and stakeholder-ready stories in Tableau and Power BI.",
    ],
  },
  {
    name: "Google Cloud Data Analytics Professional Certificate",
    issuer: "Google Cloud via Coursera",
    issuedDate: "2026-02-01",
    badge: "/images/logos/google-cloud-data-analytics.png",
    description: "Completed a 5-course, approximately 80-hour specialization in cloud analytics, data storage, transformation, governance, and visualization.",
    highlights: [
      "Built cloud data analytics workflows for scalable storage, transformation, and visualization.",
      "Applied data transformation and management techniques to solve business problems in cloud environments.",
      "Created dashboards and data stories using a five-stage visualization framework with responsible AI practices.",
    ],
  },
  {
    name: "Google Analytics Certification",
    issuer: "Google Skillshop",
    issuedDate: "2026-02-01",
    badge: "/images/logos/google-analytics.png",
    description: "Certified in analytics reporting, user-behavior interpretation, and using measurement insights to support design, content, and product decisions.",
    highlights: [
      "Interpreted acquisition, engagement, retention, and conversion metrics for decision-making.",
      "Applied audience and behavior reporting concepts to evaluate digital experiences.",
      "Connected analytics findings to content, UX, and stakeholder communication needs.",
    ],
  },
];
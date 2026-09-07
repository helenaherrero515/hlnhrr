import Image from "next/image";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { FigmaRefreshScroll } from "@/components/sections/FigmaRefreshScroll";
import { FigmaScrollReveal } from "@/components/sections/FigmaScrollReveal";
import { FigmaTypingLabel } from "@/components/sections/FigmaTypingLabel";
import { FigmaWorksGallery } from "@/components/sections/FigmaWorksGallery";
import { profile, projects } from "@/data";

interface ExperienceEntry {
  title: string;
  source: string;
}

interface TerminalPanelProps {
  index: string;
  label: string;
  entries: ExperienceEntry[];
  className?: string;
  revealDelay?: number;
}

type FigmaProjectSlug = "guidher" | "tinig" | "lingap" | "gising" | "purifai" | "convex";

interface ProjectCardProps {
  slug: FigmaProjectSlug;
  image?: string;
  index: string;
  revealDelay?: number;
}

interface WorkImage {
  title: string;
  image: string;
  position?: string;
  pdf?: string;
  organization?: string;
  width?: number;
  height?: number;
}

interface WorkCategoryCardProps {
  title: string;
  subtitle: string;
  images?: WorkImage[];
  revealDelay?: number;
}

const orgEntries: ExperienceEntry[] = [
  { title: "DATA SCIENCE ASSOCIATE", source: "AWS STUDENT BUILDER GROUP PUP" },
  { title: "AIX/UI/UX DESIGN LEAD", source: "SEEKERS GUILD" },
  { title: "PARTNERSHIP LEAD", source: "MICROSOFT CAMPUS CLOUD PUP" },
];

const internshipEntries: ExperienceEntry[] = [
  { title: "ML INTERN", source: "PROGREE - REMOTE" },
  { title: "ML ENGINEERING INTERN", source: "FLYRANKAI - REMOTE" },
  { title: "PROJ MANAGEMENT INTERN", source: "KADAKAREER - REMOTE" },
];

const volunteeringEntries: ExperienceEntry[] = [
  { title: "REGISTRATION / USHER", source: "ECHELON PH 2026" },
  { title: "LAYOUT DESIGNER / WORKSHOP FACILITATOR", source: "AWS COMMUNITY DAY PH 2026" },
  { title: "SOCMED DOCUMENTATION", source: "PHILIPPINES BLOCKCHAIN WEEK 2026" },
  { title: "GRAPHICS DESIGNER", source: "AWS USER GROUP PHILIPPINES MEETUP" },
  { title: "GRAPHICS DESIGNER / MEDIA", source: "AWS BUILDNIGHTS 2026: QUICKQUEST" },
  { title: "CREATIVES / FACILITATOR", source: "AWS BUILD OVER NIGHT HACKATHON 2026" },
  { title: "REGISTRATION", source: "APP BUILDERS PH MEETUP 2026" },
];

const hackathonEntries: ExperienceEntry[] = [
  { title: "CHAMPION", source: "GOOGLE DEVELOPER GROUP PUP: SPARKSFEST 2026" },
  { title: "2ND PLACE", source: "GOOGLE DEVELOPER GROUP PUP: BUILD WITH AI 2026" },
  { title: "2ND PLACE & BEST PITCH", source: "PUP CCIS AFK IDEATHON 2026" },
  { title: "6TH PLACE", source: "BUILD ON STELLAR PHILIPPINES HACKATHON 2026" },
  { title: "BEST CONCEPT CREATIVITY, BEST ACCURACY, & BEST FUNCTIONALITY", source: "FEUTECH ACM CORE VERTEX BUILDATHON 2026" },
  { title: "PARTICIPANT", source: "CODEKADA HACKATHON 2026" },
  { title: "PARTICIPANT", source: "OPENAI BUILD WEEK COMMUNITY BUILDATHON 2026" },
];

const projectImages: ProjectCardProps[] = [
  { slug: "guidher", image: "/images/figma-portfolio/raw-16.png", index: "01" },
  { slug: "tinig", image: "/images/figma-portfolio/raw-08.png", index: "02" },
  { slug: "lingap", image: "/images/figma-portfolio/raw-03.png", index: "03" },
  { slug: "gising", index: "04" },
  { slug: "purifai", index: "05" },
  { slug: "convex", index: "06" },
];

const pubmatWorks: WorkImage[] = [
  { title: "Teaser", organization: "Founders Live Manila", image: "/images/figma-portfolio/pubmats/founders live manila/teaser.png", width: 913, height: 911 },
  { title: "Kiro Night Pubs", organization: "AWS User Group PH", image: "/images/figma-portfolio/pubmats/aws user group ph/kiro night pubs.png", width: 666, height: 557 },
  { title: "Agentic Football Cup Pubs", organization: "AWS User Group PH", image: "/images/figma-portfolio/pubmats/aws user group ph/agentic football cup pubs.png", width: 342, height: 822 },
  { title: "Meet the Speaker and Fun Fact Pubs", organization: "AWS User Group PH", image: "/images/figma-portfolio/pubmats/aws user group ph/meet the speaker and fun fact pubs.png", width: 707, height: 727 },
  { title: "Cover Photo", organization: "AWS User Group PH", image: "/images/figma-portfolio/pubmats/aws user group ph/cover photo.png", width: 1401, height: 347 },
  { title: "Logo", organization: "AWS User Group PH", image: "/images/figma-portfolio/pubmats/aws user group ph/logo.png", width: 907, height: 910 },
  { title: "Workshop 1 Poster", organization: "AWS Student Builder Group PUP", image: "/images/figma-portfolio/pubmats/aws sbg pup/workshop 1 poster.png", width: 737, height: 737 },
  { title: "Top DataCamp Scholars", organization: "AWS Student Builder Group PUP", image: "/images/figma-portfolio/pubmats/aws sbg pup/top datacamp scholars.png", width: 782, height: 780 },
  { title: "Meet the Winners", organization: "AWS Build Night", image: "/images/figma-portfolio/pubmats/aws build night/meet the winners.png", width: 965, height: 812 },
  { title: "Recap Pics", organization: "AWS Build Night", image: "/images/figma-portfolio/pubmats/aws build night/recap pics.png", width: 770, height: 762 },
  { title: "Meet the Judges", organization: "AWS Build Night", image: "/images/figma-portfolio/pubmats/aws build night/meet the judgess.png", width: 772, height: 651 },
  { title: "Registration", organization: "AWS Build Night", image: "/images/figma-portfolio/pubmats/aws build night/registration.png", width: 767, height: 395 },
  { title: "Reveal and Onboarding", organization: "AWS Build Night", image: "/images/figma-portfolio/pubmats/aws build night/reveal and onboarding.png", width: 1111, height: 557 },
  { title: "Email Header", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/email header.png", width: 953, height: 248 },
  { title: "Countdown", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/countdown.png", width: 1075, height: 242 },
  { title: "Meet the Host", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/meet the host.png", width: 315, height: 798 },
  { title: "Program Flow", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/program flow.png", width: 1152, height: 422 },
  { title: "Banner", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/banner.png", width: 222, height: 832 },
  { title: "Call for Media Team", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/call for media team.png", width: 818, height: 418 },
  { title: "Application Closed", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/application closed.png", width: 592, height: 602 },
  { title: "Venue Reveal", organization: "AWS Community Day 2026", image: "/images/figma-portfolio/pubmats/aws community day 2026/venue reveal.png", width: 602, height: 738 },
];

const pptDeckWorks: WorkImage[] = [
  {
    title: "GuidHER Pitch Deck",
    image: "/images/figma-portfolio/ppt-decks/guidher-pitch-deck-cover.png",
    pdf: "/images/figma-portfolio/ppt-decks/Copy of GUIDHER PITCH DECK.pdf",
  },
  {
    title: "ACT1 Presentation Deck",
    image: "/images/figma-portfolio/ppt-decks/act1-herrero-helena-cover.png",
    pdf: "/images/figma-portfolio/ppt-decks/ACT1_HERRERO, HELENA.pdf",
  },
];

const swagDesignWorks: WorkImage[] = [
  { title: "AWS Community Day 2026", image: "/images/figma-portfolio/swags-design/aws-community-day-2026.png" },
  { title: "Microsoft Build 2026", image: "/images/figma-portfolio/swags-design/microsoft-build-2026.png" },
];

const workCategories: WorkCategoryCardProps[] = [
  {
    title: "PUBMATS",
    subtitle: "publication materials gallery",
    images: pubmatWorks,
  },
  {
    title: "SWAGS DESIGN",
    subtitle: "2 merch and event collateral designs",
    images: swagDesignWorks,
  },
  {
    title: "PPT DECKS",
    subtitle: "presentation design and storytelling",
    images: pptDeckWorks,
  },
];

const contactLinks = [
  { label: "GITHUB", href: "https://github.com/helenaherrero515" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/helenaherrero515/" },
  { label: "EMAIL", href: `mailto:${profile.email}` },
  { label: "DOWNLOAD CV", href: "https://drive.google.com/file/d/1sk6wbg5BdckKLKD2uhr5s2deBHTrIdig/view?usp=sharing" },
];

const navLinks = [
  { label: "ABOUT ME", href: "#about" },
  { label: "EXPERIENCES", href: "#experiences" },
  { label: "PROJECTS", href: "#projects" },
  { label: "WORKS", href: "#works" },
  { label: "CONTACT ME", href: "#contact" },
];

function SectionLabel({ children }: { children: ReactNode }): ReactElement {
  return <h2 className="figma-section-label figma-scroll-rise">&gt;&gt; {children}</h2>;
}

function revealDelayStyle(delay: number): CSSProperties {
  return { "--figma-reveal-delay": `${delay}ms` } as CSSProperties;
}

function TerminalPanel({ index, label, entries, className, revealDelay = 0 }: TerminalPanelProps): ReactElement {
  return (
    <article className={`figma-terminal-panel figma-scroll-rise ${className ?? ""}`} style={revealDelayStyle(revealDelay)}>
      <div className="figma-terminal-topline">
        <span>{index}</span>
        <span>{label}</span>
      </div>
      <div className="figma-terminal-entries">
        {entries.map((entry) => (
          <div className="figma-terminal-entry" key={`${index}-${entry.title}-${entry.source}`}>
            <h3>{entry.title}</h3>
            <p>{entry.source}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ slug, image, index, revealDelay = 0 }: ProjectCardProps): ReactElement | null {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return null;
  }

  const href = project.githubHref ?? project.caseStudyHref ?? "/projects";
  const titleClass = `figma-project-title figma-project-title-${slug}`;
  const coverImage = image ?? project.coverImage;

  return (
    <article className="figma-project-card figma-scroll-rise" style={revealDelayStyle(revealDelay)}>
      <div className="figma-card-toolbar">
        <span>{index}</span>
        <a href={href} target="_blank" rel="noreferrer">
          OPEN PROJECT
          <Image src="/images/figma-portfolio/hero-corners.svg" alt="" width={10} height={10} />
        </a>
      </div>
      <div className="figma-project-image">
        <Image src={coverImage} alt={`${project.title} project cover`} fill sizes="(max-width: 780px) 92vw, 31vw" />
      </div>
      <div className="figma-project-copy">
        <div className="figma-project-title-row">
          <h3 className={titleClass}>{project.title}</h3>
          {project.award ? <span>{project.award.toUpperCase().replace(" • ", " & ")}</span> : null}
        </div>
        <p>{project.summary}</p>
        <div className="figma-project-tags" aria-label={`${project.title} tags`}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={`${project.slug}-${tag}`}>{tag.toUpperCase()}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function FigmaPortfolioHome(): ReactElement {
  return (
    <main id="main-content" className="figma-portfolio-page">
      <FigmaRefreshScroll />
      <FigmaScrollReveal />
      <div className="figma-portfolio-shell">
        <header className="figma-topbar">
          <a className="figma-brand" href="#about" aria-label="Helena home">
            HLN
          </a>
          <nav className="figma-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <details className="figma-mobile-menu">
            <summary aria-label="Open navigation menu">
              <span />
              <span />
              <span />
            </summary>
            <nav className="figma-mobile-nav" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </details>
        </header>

        <section id="about" className="figma-about-section">
          <div className="figma-about-copy figma-scroll-rise">
            <FigmaTypingLabel />
            <div className="figma-about-text">
              <p>
                I’m <strong>Helena Herrero</strong>. I started getting into tech back in high school through robotics research, and honestly, it just kept growing from there.
              </p>
              <p>I started working on different projects in data science, analytics, web development, information systems, and machine learning. Most of the time, I was just curious about something and wanted to see if I could build it.</p>
              <p>I’m currently focused on data science, AI, and machine learning. I also enjoy learning by experimenting, breaking things, fixing them, and trying new technologies.</p>
              <p>Lately, I’ve been getting into cybersecurity, especially digital forensics. I find it interesting how you can look at digital evidence and piece together what actually happened.</p>
              <p>I don’t really have everything figured out yet. I’m just enjoying the process of learning, building, and seeing where it takes me.</p>
            </div>
          </div>

          <div className="figma-portrait-frame figma-scroll-rise" aria-label="Portrait of Helena Herrero" style={revealDelayStyle(120)}>
            <Image className="figma-portrait-image" src="/images/figma-portfolio/raw-01.png" alt="Black and white halftone portrait of Helena Herrero" width={606} height={606} priority />
            <Image className="figma-portrait-image figma-portrait-glitch-layer figma-portrait-glitch-red" src="/images/figma-portfolio/raw-01.png" alt="" width={606} height={606} aria-hidden="true" />
            <Image className="figma-portrait-image figma-portrait-glitch-layer figma-portrait-glitch-blue" src="/images/figma-portfolio/raw-01.png" alt="" width={606} height={606} aria-hidden="true" />
            <span className="figma-corner figma-corner-tl" />
            <span className="figma-corner figma-corner-tr" />
            <span className="figma-corner figma-corner-bl" />
            <span className="figma-corner figma-corner-br" />
          </div>
        </section>

        <section id="experiences" className="figma-experience-section">
          <SectionLabel>EXPERIENCES</SectionLabel>
          <div className="figma-experience-grid">
            <div className="figma-left-stack">
              <TerminalPanel index="01" label="ORGS" entries={orgEntries} revealDelay={70} />
              <TerminalPanel index="02" label="INTERNSHIP" entries={internshipEntries} revealDelay={120} />
            </div>
            <TerminalPanel index="03" label="VOLUNTEERING" entries={volunteeringEntries} className="figma-panel-tall" revealDelay={170} />
            <TerminalPanel index="04" label="HACKATHONS" entries={hackathonEntries} className="figma-panel-wide" revealDelay={220} />
          </div>
        </section>

        <section id="projects" className="figma-projects-section">
          <SectionLabel>PROJECTS</SectionLabel>
          <div className="figma-project-grid">
            {projectImages.map((project, index) => (
              <ProjectCard key={project.slug} {...project} revealDelay={index * 90} />
            ))}
          </div>
        </section>

        <section id="works" className="figma-works-section">
          <div className="figma-works-heading-row">
            <SectionLabel>WORKS</SectionLabel>
            <a className="figma-more-designs-button" href="https://artletsstudentcouncilmock.my.canva.site/helena-herrero" target="_blank" rel="noreferrer">
              MORE DESIGNS →
            </a>
          </div>
          <FigmaWorksGallery categories={workCategories} />
        </section>

        <section id="contact" className="figma-contact-section">
          <SectionLabel>CONTACT ME!</SectionLabel>
          <div className="figma-contact-grid">
            <div className="figma-contact-copy figma-scroll-rise">
              <div className="figma-contact-body">
                <p>I’m a 2nd-year Bachelor of Science in Computer Science student at PUP Manila, based in Navotas, Philippines. For me, learning is more than just a part of college. It is something I genuinely enjoy and choose to pursue every day.</p>
                <p>I love attending tech conferences, meetups, and events where I can connect with people, exchange ideas, discover new perspectives, and be inspired by others in the field. Every conversation and experience reminds me why I chose this path and motivates me to keep growing with purpose and passion.</p>
                <p>
                  I’m always open to learning, creating, connecting, and taking on new opportunities. If you’re looking for someone curious, creative, and passionate about technology,{" "}
                  <a href="https://calendly.com/helenaherrero515/30min" target="_blank" rel="noreferrer">
                    feel free to book a meeting with me
                  </a>
                  .
                </p>
              </div>
              <div className="figma-contact-signal" aria-label="Availability">
                <span>AVAILABLE FOR</span>
                <strong>PROJECTS / MEETUPS / COLLABS</strong>
                <small>BASED IN NAVOTAS, PH</small>
              </div>
            </div>
            <aside className="figma-contact-data figma-scroll-rise" aria-label="Contact data" style={revealDelayStyle(120)}>
              <h3>{`// CONTACT DATA`}</h3>
              <div>
                {contactLinks.map((link, index) => (
                  <a key={link.label} className="figma-scroll-rise" href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} style={revealDelayStyle(160 + index * 55)}>
                    {link.label}
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

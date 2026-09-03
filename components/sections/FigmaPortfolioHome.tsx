import Image from "next/image";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { FigmaRefreshScroll } from "@/components/sections/FigmaRefreshScroll";
import { FigmaScrollReveal } from "@/components/sections/FigmaScrollReveal";
import { FigmaTypingLabel } from "@/components/sections/FigmaTypingLabel";
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
  { title: "Founders Live Manila", image: "/images/figma-portfolio/raw-11.png" },
  { title: "AWS Community Day", image: "/images/figma-portfolio/raw-15.png", position: "top" },
  { title: "AWS Build Night", image: "/images/figma-portfolio/raw-14.png" },
  { title: "AWS User Group PH", image: "/images/figma-portfolio/raw-20.png" },
  { title: "AWSSBG PUP", image: "/images/figma-portfolio/raw-10.png" },
  { title: "Microsoft Build", image: "/images/figma-portfolio/raw-02.png" },
];

const workCategories: WorkCategoryCardProps[] = [
  {
    title: "PUBMATS",
    subtitle: "6 org publication materials",
    images: pubmatWorks,
  },
  {
    title: "SWAGS DESIGN",
    subtitle: "merch and event collateral",
  },
  {
    title: "BRANDING",
    subtitle: "identity systems and visual direction",
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

function WorkCategoryCard({ title, subtitle, images, revealDelay = 0 }: WorkCategoryCardProps): ReactElement {
  return (
    <article className="figma-work-card figma-scroll-rise" style={revealDelayStyle(revealDelay)}>
      <div className={images ? "figma-work-image figma-work-image-collage" : "figma-work-image figma-work-image-category"}>
        {images ? (
          images.map((image) => (
            <div key={image.title} className="figma-work-collage-tile">
              <Image src={image.image} alt={`${image.title} pubmat`} fill sizes="(max-width: 780px) 45vw, 16vw" style={{ objectPosition: image.position ?? "center" }} />
            </div>
          ))
        ) : (
          <div className="figma-work-category-message">
            <span>POSTING SOON</span>
            <strong>{title}</strong>
            <small>UNDER CONSTRUCTION</small>
          </div>
        )}
      </div>
      <div className="figma-work-caption">
        <span>{title}</span>
        <small>{subtitle}</small>
        <Image src="/images/figma-portfolio/arrow-project.svg" alt="" width={16} height={15} />
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
                I’m <strong>Helena Herrero</strong>, I started doing projects back when i was in Highschool. It first started as doing robotics research, but it ended up being more.
              </p>
              <p>What we built back then were data science, data analytics, web development, information system, and machine learning experiments.</p>
              <p>We have spent a lot thinking of topics and created a space for our innovative minds, not just because it’s requirement, but we enjoyed sharing ideas as much as we do building them.</p>
              <p>Right now, I’m studying and focusing on data science, artificial intelligence, and machine learning. I also learned how to write code through experimenting with different projects and technologies. More recently, I’ve started exploring cybersecurity as well, particularly digital forensics and cyber forensic investigation, as I’ve become increasingly interested in understanding how cyber incidents happen, analyzing digital evidence, and investigating what happened behind them.</p>
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
          <SectionLabel>WORKS</SectionLabel>
          <div className="figma-work-grid">
            {workCategories.map((work, index) => (
              <WorkCategoryCard key={work.title} {...work} revealDelay={index * 90} />
            ))}
          </div>
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

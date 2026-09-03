import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Download,
  Github,
  Globe2,
  Mail,
  MapPin,
  Phone,
  SquareArrowOutUpRight,
} from "lucide-react";
import { certifications, experience, profile, projects, skills } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "A one-page visual portfolio dossier for Helena R. Herrero.",
  path: "/projects",
});

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#service" },
  { label: "Contact", href: "#contact" },
] as const;

const showcaseOrder = ["lingap", "gising", "guidher", "tinig", "purifai", "convex"];

const barcodeBars = [4, 2, 7, 3, 2, 5, 6, 2, 4, 8, 3, 5, 2, 7, 4, 2, 6, 3, 8, 2, 5, 4, 7, 2, 3, 6, 5, 2];

const qrCells = [
  1, 1, 1, 0, 1, 0, 1, 1,
  1, 0, 0, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 0, 1, 0, 1,
  0, 0, 1, 0, 1, 1, 1, 0,
  1, 1, 0, 1, 1, 0, 0, 1,
  0, 1, 1, 1, 0, 0, 1, 1,
  1, 0, 0, 1, 0, 1, 1, 0,
  1, 1, 0, 0, 1, 1, 0, 1,
];

const serviceGroups = [
  {
    title: "Product Interfaces",
    label: "UI/UX",
    detail: "Figma systems, flows, responsive screens, critiques, and user-tested prototypes.",
  },
  {
    title: "Frontend Builds",
    label: "React",
    detail: "Accessible React interfaces, landing surfaces, dashboards, and Chrome extension UI.",
  },
  {
    title: "Visual Systems",
    label: "Brand",
    detail: "Identity direction, social graphics, event materials, layout production, and pitch visuals.",
  },
] as const;

const selectedProjects = showcaseOrder
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

function Barcode({ compact = false }: { compact?: boolean }): ReactElement {
  return (
    <div className={`flex items-end gap-[3px] ${compact ? "h-12" : "h-16"}`} aria-hidden="true">
      {barcodeBars.map((width, index) => (
        <span
          key={`${width}-${index}`}
          className="block h-full bg-black"
          style={{ width: `${width}px`, height: `${compact ? 55 + (index % 4) * 7 : 72 + (index % 5) * 5}%` }}
        />
      ))}
    </div>
  );
}

function FauxQr(): ReactElement {
  return (
    <div className="grid size-24 grid-cols-8 gap-1 border-2 border-black p-1" aria-hidden="true">
      {qrCells.map((filled, index) => (
        <span key={index} className={filled ? "bg-black" : "bg-white"} />
      ))}
    </div>
  );
}

function CornerMarks(): ReactElement {
  return (
    <>
      <span className="absolute left-3 top-3 size-8 border-l-2 border-t-2 border-black" aria-hidden="true" />
      <span className="absolute right-3 top-3 size-8 border-r-2 border-t-2 border-black" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 size-8 border-b-2 border-l-2 border-black" aria-hidden="true" />
      <span className="absolute bottom-3 right-3 size-8 border-b-2 border-r-2 border-black" aria-hidden="true" />
    </>
  );
}

function PortfolioMark(): ReactElement {
  return (
    <Link href="/" aria-label="Go to home" className="group leading-none">
      <span className="block font-lexend text-[clamp(3.25rem,8vw,6.25rem)] font-black leading-[0.68] text-black">
        H
      </span>
      <span className="block border-t-4 border-black pt-1 text-sm font-black uppercase leading-none">
        Herrero
      </span>
    </Link>
  );
}

function SectionRule({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}): ReactElement {
  return (
    <div className="flex min-h-12 items-center justify-between gap-4 overflow-hidden border-y-2 border-black px-4 py-2 text-sm font-black uppercase sm:px-6">
      <span>
        {"//"}
        {label}
      </span>
      <span className="hidden text-3xl leading-none sm:block">*</span>
      <span className="hidden flex-1 justify-center text-center md:flex">{children}</span>
      <span className="hidden text-3xl leading-none sm:block">*</span>
      <span className="ml-auto hidden whitespace-nowrap lg:inline">Available for design and frontend work</span>
      <div className="hidden shrink-0 sm:block">
        <Barcode compact />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}): ReactElement {
  const href = project.href ?? project.githubHref ?? project.caseStudyHref;

  return (
    <article className="group flex min-h-full min-w-0 flex-col border-2 border-black bg-white">
      <div className="flex items-center justify-between border-b-2 border-black px-4 py-3 text-sm font-black uppercase">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{project.tags[0]}</span>
      </div>
      <div className="relative aspect-[1.14] overflow-hidden border-b-2 border-black bg-neutral-100">
        <Image
          src={project.coverImage}
          alt={`${project.title} project cover`}
          fill
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 45vw, 92vw"
          className="object-cover grayscale contrast-125 transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.13)_1px,transparent_1px)] bg-[length:100%_7px] mix-blend-multiply" />
        <div className="absolute left-3 top-3 bg-white px-2 py-1 text-xs font-black uppercase text-black">
          {project.year}
        </div>
        {project.award ? (
          <div className="absolute bottom-3 right-3 max-w-[70%] border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase text-black">
            {project.award}
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h3 className="font-lexend text-2xl font-black uppercase leading-none text-black">{project.title}</h3>
          <p className="mt-1 text-xs font-black uppercase text-black">{project.event}</p>
        </div>
        <p className="text-sm font-bold leading-relaxed text-black">{project.summary}</p>
        <div className="mt-auto grid border-2 border-black text-xs font-black uppercase sm:grid-cols-2">
          <div className="border-b-2 border-black p-2 sm:border-b-0 sm:border-r-2">
            <span className="block text-[10px]">Role</span>
            {project.role}
          </div>
          <div className="p-2">
            <span className="block text-[10px]">Location</span>
            {project.location}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="border border-black px-2 py-1 text-xs font-black uppercase">
              {tag}
            </span>
          ))}
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-between border-2 border-black px-3 py-2 text-sm font-black uppercase transition hover:bg-black hover:text-white"
          >
            Open Project
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={3} />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function DetailPanel({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}): ReactElement {
  return (
    <div className="border-2 border-black bg-white p-4">
      <p className="text-xs font-black uppercase">{label}</p>
      <p className="mt-2 font-lexend text-2xl font-black uppercase leading-tight">{value}</p>
      {children ? <div className="mt-4 text-sm font-bold leading-relaxed">{children}</div> : null}
    </div>
  );
}

export default function ProjectsPage(): ReactElement {
  const skillGroups = Array.from(new Set(skills.map((skill) => skill.category))).map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  }));
  const featuredExperience = experience.slice(0, 5);
  const primaryProject = selectedProjects[0] ?? projects[0];

  return (
    <main
      id="main-content"
      className="min-h-screen overflow-x-hidden bg-[#f7f7f2] px-0 py-3 font-mono text-black sm:px-5 sm:py-5"
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="mx-auto w-full max-w-[116rem] overflow-hidden border-4 border-black bg-white">
        <section className="grid min-h-[calc(100vh-2.5rem)] grid-cols-1 border-b-4 border-black lg:grid-cols-[1fr_14rem]">
          <div className="flex flex-col">
            <header className="grid grid-cols-1 items-center gap-5 border-b-2 border-black p-4 sm:grid-cols-[auto_1fr_auto] sm:p-5">
              <PortfolioMark />
              <nav aria-label="Portfolio sections" className="flex flex-wrap justify-center gap-3 text-sm font-black uppercase sm:gap-8 lg:gap-16">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="px-2 py-2 underline-offset-4 hover:underline">
                    {item.label}
                  </a>
                ))}
              </nav>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-3 border-2 border-black px-4 py-3 text-sm font-black uppercase transition hover:bg-black hover:text-white"
              >
                Contact Card
                <Download aria-hidden="true" size={20} strokeWidth={3} />
              </a>
            </header>

            <div className="grid flex-1 grid-cols-1 gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(25rem,1fr)_minmax(22rem,0.86fr)_minmax(16rem,0.58fr)]">
              <div className="flex min-w-0 flex-col justify-between gap-5">
                <div>
                  <p className="mb-5 max-w-full whitespace-normal break-words text-sm font-black uppercase leading-tight [overflow-wrap:anywhere] sm:max-w-xl sm:text-base">
                    UI/UX Designer,
                    <br />
                    Frontend Developer
                    <br />
                    & Creative Technologist
                    <br />
                    Based in {profile.location}.
                  </p>
                  <h1 className="break-words font-lexend text-[clamp(2.55rem,11.5vw,5.6rem)] font-black uppercase leading-[0.93] text-black">
                    Designing
                    <br />
                    useful systems,
                    <br />
                    built with care.
                  </h1>
                </div>

                <div className="grid gap-4">
                  <div className="grid border-2 border-black text-sm font-black uppercase sm:grid-cols-[1fr_1fr_4.25rem]">
                    <div className="min-w-0 border-b-2 border-black p-4 sm:border-b-0 sm:border-r-2">
                      <span className="block text-xs">Status</span>
                      <span className="mt-1 inline-block size-2 bg-black" aria-hidden="true" /> Actively seeking UI/UX design
                      <br />
                      opportunities
                    </div>
                    <div className="min-w-0 border-b-2 border-black p-4 sm:border-b-0 sm:border-r-2">
                      <span className="block text-xs">Location</span>
                      PH-MNL
                    </div>
                    <a
                      href="#work"
                      aria-label="Jump to selected work"
                      className="grid min-h-16 place-items-center transition hover:bg-black hover:text-white"
                    >
                      <SquareArrowOutUpRight aria-hidden="true" size={36} strokeWidth={3} />
                    </a>
                  </div>
                  <div className="grid items-center border-2 border-black text-sm font-black uppercase sm:grid-cols-[10rem_1fr_4.5rem]">
                    <div className="h-full min-h-14 bg-[repeating-linear-gradient(135deg,#000_0_10px,#fff_10px_18px)]" aria-hidden="true" />
                    <div className="min-w-0 max-w-full whitespace-normal break-words border-y-2 border-black p-3 [overflow-wrap:anywhere] sm:border-x-2 sm:border-y-0">
                      Built for civic tech, AI products,
                      <br />
                      and human-centered interfaces.
                    </div>
                    <div className="p-3 text-center">HRH<br />006</div>
                  </div>
                </div>
              </div>

              <div className="relative min-w-0 border-2 border-black bg-white p-4">
                <CornerMarks />
                <div className="absolute right-10 top-5 text-4xl font-black leading-none">{"///"}</div>
                <div className="relative mx-auto h-full min-h-[32rem] max-w-[34rem] overflow-hidden">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 55vw, 92vw"
                    priority
                    className="object-cover object-[center_38%] grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[length:100%_8px] mix-blend-multiply" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-black/20" aria-hidden="true" />
                </div>
              </div>

              <aside className="grid content-start gap-5 border-l-0 border-black xl:border-l-2 xl:pl-5">
                <div className="border-2 border-black p-4">
                  <p className="text-xs font-black uppercase">ID</p>
                  <p className="mt-2 font-black uppercase">HRH-PORTFOLIO-01</p>
                  <div className="mt-4">
                    <Barcode />
                  </div>
                </div>
                <div className="grid gap-3 text-sm font-black uppercase">
                  <p>
                    <span className="block text-xs">Email</span>
                    <a href={`mailto:${profile.email}`} className="break-all hover:underline">{profile.email}</a>
                  </p>
                  <p>
                    <span className="block text-xs">Phone</span>
                    <a href={`tel:${profile.phone}`} className="hover:underline">{profile.phone}</a>
                  </p>
                </div>
                <div className="flex items-end gap-4">
                  <FauxQr />
                  <p className="text-xs font-black uppercase leading-tight">
                    Scan style
                    <br />
                    Contact index
                    <br />
                    {"/////////"}
                  </p>
                </div>
              </aside>
            </div>
          </div>

          <aside className="hidden border-l-4 border-black lg:grid">
            <div className="grid grid-rows-[7rem_5rem_1fr]">
              <div className="grid place-items-center border-b-2 border-black bg-black text-white">
                <Globe2 aria-hidden="true" size={48} strokeWidth={1.7} />
              </div>
              <div className="grid place-items-center border-b-2 border-black text-center text-xs font-black uppercase">
                Portfolio
                <br />
                2026
              </div>
              <div className="flex flex-col items-center justify-between p-5">
                <a
                  href="#contact"
                  aria-label="Jump to contact"
                  className="grid size-16 place-items-center border-4 border-black transition hover:bg-black hover:text-white"
                >
                  <ArrowUpRight aria-hidden="true" size={44} strokeWidth={3} />
                </a>
                <div className="h-[26rem] w-16 bg-[repeating-linear-gradient(0deg,#000_0_4px,#fff_4px_8px)]" aria-hidden="true" />
              </div>
            </div>
          </aside>
        </section>

        <SectionRule label="Selected Work">AI / Civic Tech / Blockchain / Cybersecurity / Product Design</SectionRule>

        <section id="work" className="border-b-4 border-black p-4 sm:p-5">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <SquareArrowOutUpRight aria-hidden="true" className="shrink-0 border-2 border-black p-1" size={42} strokeWidth={3} />
              <h2 className="font-lexend text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-none">Selected Work</h2>
            </div>
            <a
              href={primaryProject.href ?? primaryProject.githubHref ?? "#contact"}
              target={primaryProject.href ?? primaryProject.githubHref ? "_blank" : undefined}
              rel={primaryProject.href ?? primaryProject.githubHref ? "noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-3 border-2 border-black px-5 py-3 text-sm font-black uppercase transition hover:bg-black hover:text-white"
            >
              View Feature
              <ArrowUpRight aria-hidden="true" size={20} strokeWidth={3} />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {selectedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section id="about" className="grid border-b-4 border-black lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b-4 border-black p-4 sm:p-5 lg:border-b-0 lg:border-r-4">
            <p className="text-sm font-black uppercase">{"//"}About</p>
            <h2 className="mt-4 font-lexend text-[clamp(2.75rem,6vw,6.25rem)] font-black uppercase leading-none">
              Visual
              <br />
              systems for
              <br />
              real people.
            </h2>
            <p className="mt-6 max-w-3xl text-base font-bold leading-relaxed">{profile.bio}</p>
          </div>
          <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
            <DetailPanel label="Name" value={profile.name}>{profile.education}</DetailPanel>
            <DetailPanel label="Base" value={profile.location}>Available for remote collaboration and Manila-based product work.</DetailPanel>
            <DetailPanel label="Primary Role" value="UI/UX + Frontend">Designing in Figma, building in React, and shaping usable product narratives.</DetailPanel>
            <DetailPanel label="Current Focus" value="AI + Civic Tech">Hackathon-tested ideas across safer routing, healthcare, voice access, and transparent aid.</DetailPanel>
          </div>
        </section>

        <section id="service" className="border-b-4 border-black p-4 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-lexend text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-none">Service</h2>
            <span className="hidden text-sm font-black uppercase sm:inline">Design / Development / Creative Direction</span>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceGroups.map((service, index) => (
              <article key={service.title} className="border-2 border-black bg-white p-5">
                <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-4 text-sm font-black uppercase">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{service.label}</span>
                </div>
                <h3 className="font-lexend text-3xl font-black uppercase leading-tight">{service.title}</h3>
                <p className="mt-4 text-sm font-bold leading-relaxed">{service.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.68fr_1.32fr]">
            <div className="border-2 border-black p-5">
              <p className="text-sm font-black uppercase">Capability Index</p>
              <div className="mt-5 grid gap-3">
                {skillGroups.map((group) => (
                  <div key={group.category} className="border-b border-black pb-3 last:border-b-0 last:pb-0">
                    <p className="text-xs font-black uppercase">{group.category}</p>
                    <p className="mt-1 text-sm font-bold">{group.items.map((item) => item.name).join(" / ")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {certifications.map((certification) => (
                <a
                  key={certification.credentialId}
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-2 border-black bg-white p-4 transition hover:bg-black hover:text-white"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <Award aria-hidden="true" size={32} strokeWidth={2.5} />
                    <ArrowUpRight aria-hidden="true" size={18} strokeWidth={3} />
                  </div>
                  <h3 className="font-lexend text-xl font-black uppercase leading-tight">{certification.name}</h3>
                  <p className="mt-3 text-xs font-black uppercase">{certification.issuer}</p>
                  <p className="mt-3 text-sm font-bold leading-relaxed">{certification.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="grid border-b-4 border-black lg:grid-cols-[22rem_1fr]">
          <div className="border-b-4 border-black p-4 sm:p-5 lg:border-b-0 lg:border-r-4">
            <BriefcaseBusiness aria-hidden="true" size={44} strokeWidth={2.5} />
            <h2 className="mt-5 font-lexend text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-none">
              Field
              <br />
              Notes
            </h2>
            <p className="mt-4 text-sm font-bold leading-relaxed">
              Recent internships, leadership roles, and creative community work from Helena&apos;s portfolio data.
            </p>
          </div>
          <div className="divide-y-2 divide-black">
            {featuredExperience.map((item, index) => (
              <article key={`${item.company}-${item.role}`} className="grid gap-4 p-4 sm:grid-cols-[4rem_1fr_12rem] sm:p-5">
                <p className="text-xl font-black">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-lexend text-2xl font-black uppercase leading-tight">{item.company}</h3>
                  <p className="mt-1 text-sm font-black uppercase">{item.role}</p>
                  <p className="mt-3 max-w-4xl text-sm font-bold leading-relaxed">{item.summary}</p>
                </div>
                <div className="text-sm font-black uppercase sm:text-right">
                  <p>{item.location}</p>
                  <p>{item.employmentType}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="grid lg:grid-cols-[1fr_24rem]">
          <div className="p-4 sm:p-5">
            <p className="text-sm font-black uppercase">{"//"}Contact</p>
            <h2 className="mt-4 font-lexend text-[clamp(2.75rem,7vw,7rem)] font-black uppercase leading-none">
              Build the next useful interface.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 border-2 border-black p-4 text-sm font-black uppercase transition hover:bg-black hover:text-white">
                <Mail aria-hidden="true" size={22} strokeWidth={2.5} />
                Email
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center gap-3 border-2 border-black p-4 text-sm font-black uppercase transition hover:bg-black hover:text-white">
                <Phone aria-hidden="true" size={22} strokeWidth={2.5} />
                Phone
              </a>
              <a href="#main-content" className="flex items-center gap-3 border-2 border-black p-4 text-sm font-black uppercase transition hover:bg-black hover:text-white">
                <MapPin aria-hidden="true" size={22} strokeWidth={2.5} />
                Top
              </a>
            </div>
          </div>
          <div className="border-t-4 border-black p-4 sm:p-5 lg:border-l-4 lg:border-t-0">
            <div className="border-2 border-black p-4">
              <p className="text-xs font-black uppercase">Contact Data</p>
              <p className="mt-4 break-all font-black uppercase">{profile.email}</p>
              <p className="mt-2 font-black uppercase">{profile.phone}</p>
              <p className="mt-2 font-black uppercase">{profile.location}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <FauxQr />
                <Github aria-hidden="true" size={44} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

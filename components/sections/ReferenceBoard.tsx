import Image from "next/image";
import { ArrowRight, Atom, Award, BrainCircuit, Briefcase, FlaskConical, Github, Heart, Lightbulb, Linkedin, Mail, Medal, Palette, Puzzle, Quote, Sparkles, Trophy, UserRound, UsersRound } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import type { Certification, Community, Experience, Hackathon, Profile, Skill } from "@/types";
import { GridDots, IntpScientist, SelectionBox } from "@/components/assets";
import { CommunityGallery } from "@/components/sections/CommunityGallery";
import { Badge, GlassCard, SkillChip } from "@/components/ui";
import { formatDate } from "@/utils";

interface ReferenceBoardProps {
  profile: Profile;
  experience: Experience[];
  hackathons: Hackathon[];
  skills: Skill[];
  communities: Community[];
  certifications: Certification[];
}

interface StatTile {
  value: string;
  label: string;
  icon: ReactNode;
  tone: "pink" | "lavender" | "sky" | "peach" | "mint" | "blue";
}

const stats: StatTile[] = [
  { value: "7+", label: "Hackathons", icon: <Trophy size={22} />, tone: "peach" },
  { value: "4+", label: "Major Awards", icon: <Award size={22} />, tone: "pink" },
  { value: "20+", label: "Branding Projects", icon: <Palette size={22} />, tone: "lavender" },
  { value: "2", label: "Internships", icon: <Briefcase size={22} />, tone: "blue" },
  { value: "50+", label: "Students Mentored", icon: <UsersRound size={22} />, tone: "sky" },
  { value: "25+", label: "Core Skills", icon: <Sparkles size={22} />, tone: "mint" },
];

const personalityTraits = ["Loves quiet environments", "Thinks deeply", "Values meaningful connections", "Creative problem solver"];
const impactTraits = ["User Focused", "Detail Oriented", "Impact Driven"];

function Card({ children, className, id }: { children: ReactNode; className?: string; id?: string }): ReactElement {
  return (
    <GlassCard id={id} tone="solid" padding="none" className={`board-card surface-shine anchor-target relative overflow-hidden p-6 ${className ?? ""}`}>
      {children}
    </GlassCard>
  );
}

function HeaderLabel({ icon, children, action, actionHref }: { icon?: ReactNode; children: ReactNode; action?: string; actionHref?: string }): ReactElement {
  const actionContent = action ? (
    <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-ink-muted)]">
      {action}
      <ArrowRight aria-hidden="true" size={15} />
    </span>
  ) : null;

  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 text-base font-black uppercase tracking-tight text-[var(--color-ink)]">
        {icon ? <span aria-hidden="true" className="text-[var(--color-periwinkle)]">{icon}</span> : null}
        {children}
      </h2>
      {actionContent && actionHref ? (
        <a className="rounded-full transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={actionHref}>
          {actionContent}
        </a>
      ) : actionContent}
    </div>
  );
}

function skillGroups(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const items = groups[skill.category] ?? [];
    return { ...groups, [skill.category]: [...items, skill] };
  }, {});
}

function compactDate(startDate: string, endDate?: string): string {
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
}

function skillCategoryLabel(category: string): string {
  return category
    .replace("Design & Prototyping", "Product Design")
    .replace("Frontend Development", "Frontend")
    .replace("Supporting Tech", "AI & Data")
    .replace("Project Collaboration", "Tools");
}

function statToneClass(tone: StatTile["tone"]): string {
  if (tone === "pink") return "border-[rgb(255_114_184_/_22%)] bg-[linear-gradient(145deg,rgb(255_114_184_/_14%),rgb(255_255_255_/_76%))] text-[var(--color-pink)] hover:border-[rgb(255_114_184_/_46%)] hover:shadow-[0_18px_45px_rgb(255_114_184_/_16%)]";
  if (tone === "sky") return "border-[rgb(79_127_255_/_20%)] bg-[linear-gradient(145deg,rgb(141_207_255_/_18%),rgb(255_255_255_/_78%))] text-[#4f7fff] hover:border-[rgb(79_127_255_/_42%)] hover:shadow-[0_18px_45px_rgb(79_127_255_/_14%)]";
  if (tone === "peach") return "border-[rgb(255_127_72_/_22%)] bg-[linear-gradient(145deg,rgb(255_201_174_/_26%),rgb(255_255_255_/_78%))] text-[#ff7f48] hover:border-[rgb(255_127_72_/_46%)] hover:shadow-[0_18px_45px_rgb(255_127_72_/_16%)]";
  if (tone === "blue") return "border-[rgb(65_92_255_/_20%)] bg-[linear-gradient(145deg,rgb(113_134_255_/_15%),rgb(255_255_255_/_78%))] text-[var(--color-focus)] hover:border-[rgb(65_92_255_/_42%)] hover:shadow-[0_18px_45px_rgb(65_92_255_/_14%)]";
  if (tone === "mint") return "border-[rgb(34_197_160_/_20%)] bg-[linear-gradient(145deg,rgb(34_197_160_/_13%),rgb(255_255_255_/_78%))] text-[#18a887] hover:border-[rgb(34_197_160_/_42%)] hover:shadow-[0_18px_45px_rgb(34_197_160_/_14%)]";
  return "border-[rgb(139_124_255_/_22%)] bg-[linear-gradient(145deg,rgb(139_124_255_/_16%),rgb(255_255_255_/_78%))] text-[var(--color-lavender)] hover:border-[rgb(139_124_255_/_46%)] hover:shadow-[0_18px_45px_rgb(139_124_255_/_16%)]";
}


function hackathonAwardStyle(index: number): { icon: ReactNode; className: string } {
  const styles = [
    {
      icon: <Trophy size={13} />,
      className: "border-[rgb(255_127_72_/_28%)] bg-[rgb(255_201_174_/_18%)] text-[#a4573e] shadow-[0_10px_24px_rgb(255_127_72_/_10%)]",
    },
    {
      icon: <Medal size={13} />,
      className: "border-[rgb(113_134_255_/_28%)] bg-[rgb(113_134_255_/_11%)] text-[var(--color-periwinkle)] shadow-[0_10px_24px_rgb(113_134_255_/_10%)]",
    },
    {
      icon: <span className="inline-flex items-center gap-1"><Medal size={13} /><Award size={13} /></span>,
      className: "border-[rgb(255_114_184_/_28%)] bg-[rgb(255_114_184_/_11%)] text-[var(--color-pink)] shadow-[0_10px_24px_rgb(255_114_184_/_10%)]",
    },
    {
      icon: <Medal size={13} />,
      className: "border-[rgb(34_197_94_/_30%)] bg-[rgb(34_197_94_/_10%)] text-[#15803d] shadow-[0_10px_24px_rgb(34_197_94_/_10%)]",
    },
  ];

  return styles[index % styles.length];
}

export function ReferenceBoard({ profile, experience, hackathons, skills, communities, certifications }: ReferenceBoardProps): ReactElement {
  const groupedSkills = skillGroups(skills);
  const selectedHackathons = hackathons.slice(0, 4);

  return (
    <section className="mx-auto grid max-w-[92rem] items-stretch gap-4 px-4 pb-8 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-16" aria-label="Portfolio overview board">
      <Card id="about" className="about-card atm-about-card min-h-[20rem] rounded-[1.5rem] border-[rgb(139_124_255_/_18%)] bg-white/30 p-0 shadow-[0_22px_70px_rgb(75_63_131_/_14%)] backdrop-blur-[var(--blur-glass)] md:col-span-1 lg:col-span-5">
        <button type="button" aria-label="Hover or focus to flip About Me card" className="atm-flip-card">
          <span className="atm-card-inner">
            <span className="atm-card-face atm-card-front">
              <span className="relative z-10 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-white/92"><UserRound aria-hidden="true" size={18} /> About Me</span>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/80">Portfolio</span>
              </span>
              <span aria-hidden="true" className="atm-card-chip"><span /><span /><span /><span /></span>
              <span aria-hidden="true" className="atm-card-contactless"><span /><span /><span /></span>
              <span className="relative z-10 mt-auto block">
                <span className="mb-6 block text-2xl font-semibold tracking-[0.34em] text-white">•••• •••• •••• 8853</span>
                <span className="grid grid-cols-3 gap-5 text-white/90">
                  <span><span className="block text-[0.62rem] font-bold uppercase tracking-wide text-white/58">Exp</span><span className="text-sm font-black">08/26</span></span>
                  <span><span className="block text-[0.62rem] font-bold uppercase tracking-wide text-white/58">CVV</span><span className="text-sm font-black">•••</span></span>
                  <span><span className="block text-[0.62rem] font-bold uppercase tracking-wide text-white/58">Type</span><span className="text-sm font-black">UX</span></span>
                </span>
                <span className="mt-5 flex items-end justify-between gap-4">
                  <span className="text-lg font-black uppercase tracking-wide text-white">Helena R. Herrero</span>
                  <span className="text-2xl font-black italic tracking-[-0.06em] text-white">VISA</span>
                </span>
              </span>
            </span>

            <span className="atm-card-face atm-card-back">
              <span aria-hidden="true" className="atm-card-stripe" />
              <span className="relative z-10 flex items-center gap-2 border-b border-white/24 pb-3 text-sm font-black uppercase tracking-wide text-white/92"><UserRound size={18} /> About Me</span>
              <span className="relative z-10 mt-4 grid gap-4 text-white/88 sm:grid-cols-2">
                <span className="space-y-4">
                  <span className="flex gap-3"><Sparkles aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-white/72" /><span><span className="block text-[0.66rem] font-black uppercase tracking-wide text-white/62">Education</span><span className="block text-xs font-bold leading-snug">BS Computer Science<br />Polytechnic University of the Philippines</span></span></span>
                  <span className="flex gap-3"><BrainCircuit aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-white/72" /><span><span className="block text-[0.66rem] font-black uppercase tracking-wide text-white/62">Specializations</span><span className="block text-xs font-bold leading-snug">UI/UX Design • Frontend Development<br />Product Design • Research</span></span></span>
                </span>
                <span className="space-y-4 border-white/24 sm:border-l sm:pl-5">
                  <span className="flex gap-3"><Heart aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-white/72" /><span><span className="block text-[0.66rem] font-black uppercase tracking-wide text-white/62">Passions</span><span className="block text-xs font-bold leading-snug">Design, problem solving, AI, and meaningful web experiences.</span></span></span>
                  <span className="flex gap-3"><Lightbulb aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-white/72" /><span><span className="block text-[0.66rem] font-black uppercase tracking-wide text-white/62">Focus</span><span className="block text-xs font-bold leading-snug">Turning research into intuitive, user-centered products.</span></span></span>
                </span>
              </span>
              <span className="relative z-10 mt-auto block text-right font-[family-name:var(--font-script)] text-5xl leading-none text-white/50 drop-shadow-[0_0_18px_rgb(255_255_255_/_18%)]">Helena</span>
            </span>
          </span>
        </button>
      </Card>

      <div className="stats-dashboard board-card rounded-[1.5rem] border border-white/70 bg-[linear-gradient(145deg,rgb(255_255_255_/_82%),rgb(255_255_255_/_58%))] p-4 shadow-[0_18px_60px_rgb(75_63_131_/_9%)] backdrop-blur-[var(--blur-glass)] md:col-span-1 lg:col-span-7 lg:p-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-[var(--color-ink)]">Snapshot</p>
            <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)]">Compact proof of practice</p>
          </div>
          <span aria-hidden="true" className="rounded-full border border-[rgb(139_124_255_/_20%)] bg-white/70 px-3 py-1 text-xs font-black text-[var(--color-lavender)]">2026</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className={`stat-tile group rounded-[1.25rem] border px-3 py-4 ${statToneClass(stat.tone)}`}>
              <div className="flex items-center justify-between gap-3">
                <span aria-hidden="true" className="stat-icon grid size-9 place-items-center rounded-full bg-white/76 shadow-sm backdrop-blur-sm">{stat.icon}</span>
                <p className="text-[clamp(1.8rem,5vw,2.45rem)] font-black leading-none text-[var(--color-ink)] lg:text-[2.25rem]">{stat.value}</p>
              </div>
              <p className="mt-4 text-[0.7rem] font-bold uppercase leading-tight text-[var(--color-ink-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Card id="skills" className="lg:col-span-3 lg:row-span-2">
        <HeaderLabel icon={<Sparkles size={20} />}>Skills</HeaderLabel>
        <div className="space-y-6">
          {Object.entries(groupedSkills).slice(0, 5).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-3 text-xs font-black uppercase text-[var(--color-ink)]">{skillCategoryLabel(category)}</h3>
              <div className="flex flex-wrap gap-2">
                {items.slice(0, 6).map((skill) => <SkillChip key={`${category}-${skill.name}`} skill={skill} className="min-h-6 px-2.5 text-[0.68rem]" />)}
              </div>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mt-10 min-h-64 rounded-[1.5rem] bg-[linear-gradient(145deg,rgb(255_114_184_/_20%),rgb(139_124_255_/_18%),rgb(255_255_255_/_60%))]">
          <SelectionBox className="motion-float-slow mx-auto h-48 w-56 translate-y-8 rotate-[-8deg] text-[var(--color-lavender)] [--float-rotate:-8deg]" />
        </div>
      </Card>

      <Card id="experience" className="flex min-h-[32rem] flex-col lg:col-span-6">
        <HeaderLabel icon={<Briefcase size={21} />} action="View Full Experience" actionHref="/experience">Experience</HeaderLabel>
        <div className="relative flex flex-1 flex-col justify-between gap-5 pl-7 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--color-line)]">
          {experience.slice(0, 3).map((item) => (
            <article key={`${item.company}-${item.role}`} className="relative grid gap-3 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden="true" className="absolute -left-[1.75rem] top-3 size-3.5 rounded-full border-2 border-[var(--color-periwinkle)] bg-white" />
              <span aria-hidden="true" className="relative grid size-12 place-items-center overflow-hidden rounded-[1rem] bg-white text-[0.68rem] font-black text-[var(--color-periwinkle)] shadow-[0_12px_30px_rgb(65_92_255_/_16%)] ring-1 ring-[var(--color-line)]">{item.logo ? <Image src={item.logo} alt="" width={34} height={34} className="h-8 w-8 object-contain" /> : item.company.split(" ").map((word) => word[0]).join("").slice(0, 4)}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                  <div>
                    <h3 className="text-base font-black leading-tight text-[var(--color-ink)]">{item.role}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--color-ink)]">{item.company}</p>
                  </div>
                  <p className="shrink-0 text-[0.68rem] font-bold text-[var(--color-ink-muted)]">{compactDate(item.startDate, item.endDate)}</p>
                </div>
                <p className="mt-2 text-xs leading-[1.45] text-[var(--color-ink-muted)]">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.topics.slice(0, 5).map((topic) => <Badge key={`${item.company}-${topic}`} tone="sky" className="max-w-full px-2.5 text-[0.66rem]">{topic}</Badge>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <GridDots className="motion-pulse-soft absolute bottom-5 right-8 h-20 w-20 opacity-70" />
      </Card>

      <Card id="personality" className="personality-card lg:col-span-3">
        <div className="mb-5 flex items-center justify-between"><p className="text-base font-black uppercase text-[var(--color-ink)]">My Personality</p><span className="text-xs font-semibold text-[var(--color-ink-muted)]">002</span></div>
        <p className="text-4xl font-black text-[var(--color-lavender)]">INTP</p>
        <p className="mt-2 text-base font-semibold leading-snug text-[var(--color-ink)]">Introvert, insightful and always curious.</p>
        <ul className="mt-7 space-y-4 text-sm text-[var(--color-ink-muted)]">
          {personalityTraits.map((trait) => <li key={trait} className="flex items-center gap-3"><Puzzle aria-hidden="true" size={15} className="text-[var(--color-periwinkle)]" />{trait}</li>)}
        </ul>
        <div aria-hidden="true" className="relative mt-8 min-h-60 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(145deg,rgb(139_124_255_/_14%),rgb(255_255_255_/_78%),rgb(255_114_184_/_10%))] px-4 pt-5">
          <span className="intp-floating-icon motion-float left-5 top-6 text-[var(--color-lavender)] [--float-rotate:-8deg]"><BrainCircuit size={18} /></span>
          <span className="intp-floating-icon motion-float-slow right-6 top-9 text-[var(--color-pink)] [--float-rotate:10deg] [animation-delay:420ms]"><Atom size={18} /></span>
          <span className="intp-floating-icon motion-float bottom-10 left-7 text-[var(--color-periwinkle)] [--float-rotate:8deg] [animation-delay:780ms]"><FlaskConical size={18} /></span>
          <span className="intp-floating-icon motion-float-slow bottom-14 right-7 text-[#7b61ff] [--float-rotate:-10deg] [animation-delay:1.1s]"><Lightbulb size={18} /></span>
          <IntpScientist className="motion-float-slow relative z-10 mx-auto h-56 w-auto max-w-full drop-shadow-[0_18px_28px_rgb(76_49_95_/_18%)] [--float-rotate:0deg]" />
        </div>
      </Card>

      <Card id="hackathons" className="lg:col-span-9">
        <HeaderLabel icon={<Sparkles size={20} />} action="View All Projects" actionHref="/projects">Featured Hackathons</HeaderLabel>
        <div className="grid gap-4 md:grid-cols-4">
          {selectedHackathons.map((hackathon, index) => (
            <article key={`${hackathon.name}-${hackathon.date}`} className={`hackathon-card board-card min-h-56 rounded-[1.25rem] border bg-white/60 p-5 border-[var(--color-line)]`}>
              {hackathon.achievement ? <Badge tone="neutral" icon={hackathonAwardStyle(index).icon} className={`normal-case ${hackathonAwardStyle(index).className}`}>{hackathon.achievement}</Badge> : null}
              <h3 className="mt-5 text-lg font-black uppercase leading-tight text-[var(--color-ink)]">{hackathon.project}</h3>
              <p className="mt-2 text-[0.68rem] font-semibold text-[var(--color-ink-muted)]">{hackathon.role}</p>
              <p className="mt-4 text-xs leading-[1.5] text-[var(--color-ink-muted)]">{hackathon.description}</p>
              <p className="mt-5 text-xs font-semibold text-[var(--color-ink-muted)]">{(hackathon.footer ?? [hackathon.name, `${hackathon.location.split(",")[0]} • ${hackathon.date}`]).map((line) => <span key={`${hackathon.project}-${line}`} className="block">{line}</span>)}</p>
            </article>
          ))}
        </div>
      </Card>

      <Card id="communities" className="community-gallery-card lg:col-span-4">
        <CommunityGallery communities={communities} />
      </Card>

      <Card id="certifications" className="lg:col-span-4">
        <HeaderLabel icon={<Sparkles size={20} />} action="View All" actionHref="/experience">Certifications</HeaderLabel>
        <div className="space-y-3">
          {certifications.map((certification) => <div key={certification.name} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[var(--color-line)] pb-3 last:border-0"><span className="relative grid size-11 place-items-center overflow-hidden rounded-[var(--radius-md)] bg-white text-xl font-black text-[var(--color-periwinkle)] shadow-sm">{certification.badge ? <Image src={certification.badge} alt="" width={28} height={28} className="h-7 w-7 object-contain" /> : certification.name[0]}</span><p className="text-xs font-black leading-tight text-[var(--color-ink)]">{certification.name}</p><p className="text-[0.68rem] font-semibold text-[var(--color-ink-muted)]">{formatDate(certification.issuedDate)}</p></div>)}
        </div>
      </Card>

      <Card id="impact" className="lg:col-span-4">
        <HeaderLabel icon={<UsersRound size={20} />}>Impact & Passion</HeaderLabel>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/70 p-5">
          <p className="flex gap-3 text-sm font-semibold leading-[1.45] text-[var(--color-ink)]"><Quote aria-hidden="true" className="shrink-0 text-[var(--color-lavender)]" size={26} />I turn ideas into intuitive experiences that solve real problems.</p>
        </div>
        <p className="mt-6 text-sm font-black text-[var(--color-ink)]">Always learning, always building.</p>
        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-[0.68rem] font-semibold text-[var(--color-ink-muted)]">
          {impactTraits.map((trait) => <div key={trait}><span className="mx-auto mb-2 grid size-8 place-items-center rounded-full bg-[rgb(139_124_255_/_12%)] text-[var(--color-periwinkle)]"><Heart size={15} /></span>{trait}</div>)}
        </div>
      </Card>

      <div id="contact" className="anchor-target lg:col-span-12">
        <div className="connect-card grid items-center gap-5 rounded-[2rem] border border-white/70 px-8 py-6 shadow-[0_24px_70px_rgb(255_114_184_/_16%)] md:grid-cols-[1fr_auto_auto_auto]">
          <p className="relative z-10 text-2xl font-black leading-tight text-[var(--color-ink)]">Let&apos;s create something <span className="text-[var(--color-pink)]">amazing</span> together.</p>
          {profile.email ? <a className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 text-sm font-semibold text-[var(--color-ink)] shadow-sm backdrop-blur-md transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}</a> : null}
          <a className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 text-sm font-semibold text-[var(--color-ink)] shadow-sm backdrop-blur-md transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href="https://www.linkedin.com/in/helenaherrero515/" target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a>
          <a className="relative z-10 inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-2 text-sm font-semibold text-[var(--color-ink)] shadow-sm backdrop-blur-md transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href="https://github.com/helenaherrero515" target="_blank" rel="noreferrer"><Github size={16} />GitHub</a>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Award, Briefcase, Heart, Mail, Palette, Phone, Puzzle, Quote, Sparkles, Trophy, UserRound, UsersRound } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import type { Certification, Community, Experience, Hackathon, Profile, Skill } from "@/types";
import { GridDots, SelectionBox } from "@/components/assets";
import { Badge, CopyButton, GlassCard, SkillChip } from "@/components/ui";
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
  tone: "pink" | "lavender" | "sky" | "peach";
}

const stats: StatTile[] = [
  { value: "7+", label: "Hackathons Participated", icon: <Trophy size={34} />, tone: "peach" },
  { value: "4+", label: "Major Awards Received", icon: <Award size={34} />, tone: "pink" },
  { value: "20+", label: "Branding Projects", icon: <Palette size={34} />, tone: "lavender" },
  { value: "2", label: "Internships Completed", icon: <Briefcase size={34} />, tone: "lavender" },
  { value: "50+", label: "Students Mentored", icon: <UsersRound size={34} />, tone: "sky" },
];

const logoMarks = ["aws", "G", "M", "B", "C"];
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
  if (tone === "pink") return "text-[var(--color-pink)]";
  if (tone === "sky") return "text-[#4f7fff]";
  if (tone === "peach") return "text-[#ff7f48]";
  return "text-[var(--color-lavender)]";
}

export function ReferenceBoard({ profile, experience, hackathons, skills, communities, certifications }: ReferenceBoardProps): ReactElement {
  const groupedSkills = skillGroups(skills);
  const selectedHackathons = hackathons.slice(0, 4);

  return (
    <section className="mx-auto grid max-w-[92rem] gap-4 px-4 pb-8 sm:px-8 lg:grid-cols-12 lg:px-12" aria-label="Portfolio overview board">
      <Card id="about" className="lg:col-span-3">
        <HeaderLabel icon={<UserRound size={22} />}>About Me</HeaderLabel>
        <p className="max-w-[16rem] text-sm font-medium leading-[1.55] text-[var(--color-ink-muted)]">
          Creative Computer Science student specializing in UI/UX, product thinking, and frontend development. I design intuitive digital experiences backed by research, prototyping, and modern technologies.
        </p>
        <p className="mt-10 bg-[linear-gradient(110deg,var(--color-periwinkle),var(--color-pink))] bg-clip-text font-[family-name:var(--font-script)] text-4xl text-transparent">Helena</p>
        <Sparkles aria-hidden="true" className="motion-pulse-soft absolute bottom-9 left-8 text-[var(--color-lavender)]" size={22} />
      </Card>

      <Card className="lg:col-span-9">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="board-card grid min-h-36 place-items-center rounded-[1.5rem] bg-[linear-gradient(180deg,rgb(255_255_255_/_80%),rgb(139_124_255_/_8%))] px-3 py-5 text-center">
              <span aria-hidden="true" className={`motion-pulse-soft ${statToneClass(stat.tone)}`}>{stat.icon}</span>
              <p className="mt-3 text-3xl font-black leading-none text-[var(--color-ink)]">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold leading-tight text-[var(--color-ink)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>

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

      <Card id="experience" className="lg:col-span-6">
        <HeaderLabel icon={<Briefcase size={21} />} action="View Full Experience" actionHref="/experience">Experience</HeaderLabel>
        <div className="relative space-y-8 pl-8 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--color-line)]">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="relative grid gap-4 sm:grid-cols-[3.5rem_1fr]">
              <span aria-hidden="true" className="absolute -left-[1.85rem] top-3 size-4 rounded-full border-2 border-[var(--color-periwinkle)] bg-white" />
              <span aria-hidden="true" className="grid size-14 place-items-center rounded-[var(--radius-md)] bg-[linear-gradient(135deg,var(--color-lavender),#174ea6)] text-xs font-black text-white">{item.company.slice(0, 4)}</span>
              <div>
                <h3 className="text-lg font-black leading-tight text-[var(--color-ink)]">{item.role}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{item.company}</p>
                <p className="text-xs font-medium text-[var(--color-ink-muted)]">{compactDate(item.startDate, item.endDate)}</p>
                <p className="mt-3 text-sm leading-[1.5] text-[var(--color-ink-muted)]">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.slice(0, 2).map((highlight) => <Badge key={highlight} tone="sky" className="max-w-full">{highlight.split(" ").slice(0, 2).join(" ")}</Badge>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <GridDots className="motion-pulse-soft absolute bottom-6 right-9 h-24 w-24" />
      </Card>

      <Card id="personality" className="lg:col-span-3">
        <div className="mb-5 flex items-center justify-between"><p className="text-base font-black uppercase text-[var(--color-ink)]">My Personality</p><span className="text-xs font-semibold text-[var(--color-ink-muted)]">002</span></div>
        <p className="text-4xl font-black text-[var(--color-lavender)]">INTP</p>
        <p className="mt-2 text-base font-semibold leading-snug text-[var(--color-ink)]">Introvert, insightful and always curious.</p>
        <ul className="mt-7 space-y-4 text-sm text-[var(--color-ink-muted)]">
          {personalityTraits.map((trait) => <li key={trait} className="flex items-center gap-3"><Puzzle aria-hidden="true" size={15} className="text-[var(--color-periwinkle)]" />{trait}</li>)}
        </ul>
        <div aria-hidden="true" className="mt-8 grid place-items-center"><div className="motion-float-slow grid size-32 place-items-center rounded-full bg-[linear-gradient(145deg,rgb(29_29_31_/_8%),rgb(139_124_255_/_12%))] text-5xl [--float-rotate:0deg]">♟</div></div>
      </Card>

      <Card id="hackathons" className="lg:col-span-9">
        <HeaderLabel icon={<Sparkles size={20} />} action="View All Projects" actionHref="/projects">Featured Hackathons</HeaderLabel>
        <div className="grid gap-4 md:grid-cols-4">
          {selectedHackathons.map((hackathon, index) => (
            <article key={`${hackathon.name}-${hackathon.date}`} className={`board-card min-h-56 rounded-[1.25rem] border bg-white/60 p-5 ${index === 0 ? "border-[rgb(255_114_184_/_48%)]" : "border-[var(--color-line)]"}`}>
              {hackathon.achievement ? <Badge tone={index === 0 ? "peach" : "pink"}>{hackathon.achievement}</Badge> : null}
              <h3 className="mt-5 text-lg font-black uppercase leading-tight text-[var(--color-ink)]">{hackathon.project.replace("Winning project (title pending confirmation)", "GDGPUP SparkSFest 2026")}</h3>
              <p className="mt-2 text-[0.68rem] font-semibold text-[var(--color-ink-muted)]">{hackathon.role}</p>
              <p className="mt-4 text-xs leading-[1.5] text-[var(--color-ink-muted)]">{hackathon.description}</p>
              <p className="mt-5 text-xs font-semibold text-[var(--color-ink-muted)]">{hackathon.location.split(",")[0]} · {hackathon.date}</p>
            </article>
          ))}
        </div>
      </Card>

      <Card id="communities" className="lg:col-span-4">
        <HeaderLabel icon={<UsersRound size={20} />}>Communities & Leadership</HeaderLabel>
        <div className="mb-6 flex flex-wrap gap-3">
          {logoMarks.map((mark) => <span key={mark} className="board-card grid size-14 place-items-center rounded-full border border-[var(--color-line)] bg-white text-sm font-black text-[var(--color-ink)] shadow-sm">{mark}</span>)}
        </div>
        <div className="space-y-4">
          {communities.map((community) => <p key={community.name} className="text-sm font-semibold text-[var(--color-ink)]">{community.name}<span className="block font-medium text-[var(--color-ink-muted)]">{community.role.split("|")[0].trim()}</span></p>)}
        </div>
      </Card>

      <Card id="certifications" className="lg:col-span-4">
        <HeaderLabel icon={<Sparkles size={20} />} action="View All" actionHref="/certifications">Certifications</HeaderLabel>
        <div className="space-y-3">
          {certifications.map((certification) => <div key={certification.name} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[var(--color-line)] pb-3 last:border-0"><span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-white text-xl font-black text-[var(--color-periwinkle)] shadow-sm">{certification.name[0]}</span><p className="text-xs font-black leading-tight text-[var(--color-ink)]">{certification.name}</p><p className="text-[0.68rem] font-semibold text-[var(--color-ink-muted)]">{formatDate(certification.issuedDate)}</p></div>)}
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
        <div className="grid items-center gap-5 rounded-[2rem] border border-[var(--color-line)] bg-white/80 px-8 py-5 shadow-[var(--shadow-card)] md:grid-cols-[1fr_auto_auto_auto]">
          <p className="text-2xl font-black leading-tight text-[var(--color-ink)]">Let&apos;s create something <span className="text-[var(--color-pink)]">amazing</span> together.</p>
          {profile.email ? <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-muted)]"><a className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}</a><CopyButton value={profile.email} label="email address" /></span> : null}
          {profile.phone ? <a className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={`tel:${profile.phone}`}><Phone size={16} />{profile.phone}</a> : null}
          <p className="text-sm font-semibold text-[var(--color-ink-muted)]">© 2026 Helena R. Herrero</p>
        </div>
      </div>
    </section>
  );
}
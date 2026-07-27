import Link from "next/link";
import { ArrowDown, Mail, Sparkle } from "lucide-react";
import type { ReactElement } from "react";
import type { Profile, Statistics } from "@/types";
import { BrandMark, DecorativeShapes, FloatingCursor, FloatingStars, PrototypeConnector, SelectionBox } from "@/components/assets";
import { Badge, Button, FloatingCard, GlassCard, GradientBlob, GridBackground } from "@/components/ui";

interface HeroProps {
  profile: Profile;
  statistics: Statistics[];
}

function splitName(name: string): { firstName: string; restName: string } {
  const [firstName = name, ...rest] = name.split(" ");
  return { firstName, restName: rest.join(" ") };
}

export function Hero({ profile, statistics }: HeroProps): ReactElement {
  const { firstName, restName } = splitName(profile.name);
  const featuredStats = statistics.slice(0, 3);

  return (
    <section className="relative isolate grid min-h-[calc(100vh-5rem)] items-center gap-12 overflow-hidden pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20" aria-labelledby="hero-title">
      <GridBackground className="-z-20" />
      <GradientBlob tone="cool" size="lg" className="-right-24 top-4 -z-10" />
      <GradientBlob tone="warm" size="md" className="-bottom-24 left-4 -z-10" />

      <div className="lg:col-span-7">
        <Badge tone="pink" icon={<span className="size-2 rounded-full bg-[var(--color-pink)]" />}>{profile.availability}</Badge>
        <h1 id="hero-title" className="mt-8 max-w-4xl font-[family-name:var(--font-display)] leading-[0.88] text-[var(--color-ink)]">
          <span className="block text-[length:var(--type-display)] font-black uppercase">{firstName}</span>
          <span className="mt-[-0.12em] block bg-[linear-gradient(110deg,var(--color-periwinkle),var(--color-pink),var(--color-peach))] bg-clip-text font-[family-name:var(--font-script)] text-[length:var(--type-script)] font-normal text-transparent">
            {restName}
          </span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge tone="lavender">UI/UX Designer</Badge>
          <Badge tone="peach">Frontend Developer</Badge>
          <Badge tone="sky">Creative Technologist</Badge>
        </div>
        <p className="mt-7 max-w-[42rem] text-lg leading-[var(--line-body)] text-[var(--color-ink-muted)]">{profile.bio}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#projects"><span>View selected work</span><ArrowDown aria-hidden="true" size={18} /></Link>
          </Button>
          {profile.email ? (
            <Button asChild variant="secondary" size="lg">
              <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={18} /> Contact Helena</a>
            </Button>
          ) : null}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {featuredStats.map((stat) => (
            <GlassCard key={stat.label} tone="solid" padding="sm">
              <p className="text-2xl font-semibold leading-none text-[var(--color-ink)]">{stat.value}</p>
              <p className="mt-1 text-xs font-medium leading-snug text-[var(--color-ink-muted)]">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="relative lg:col-span-5">
        <GlassCard tone="wash" padding="none" className="relative min-h-[31rem] overflow-hidden p-6 sm:p-8">
          <GridBackground density="dense" className="opacity-35" />
          <FloatingStars className="absolute right-7 top-8 h-20 w-36" />
          <SelectionBox className="absolute bottom-24 left-8 hidden h-32 w-44 text-[var(--color-lavender)] sm:block" />
          <PrototypeConnector className="absolute left-10 top-32 hidden h-28 w-56 sm:block" />
          <FloatingCursor className="absolute bottom-14 right-9 h-14 w-14 rotate-[-8deg]" />
          <DecorativeShapes className="absolute bottom-4 right-12 h-44 w-52" />

          <div className="relative z-10 flex h-full min-h-[27rem] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <BrandMark label={profile.name} />
              <Badge tone="neutral">Design workspace</Badge>
            </div>
            <div className="mx-auto grid size-52 place-items-center rounded-[2rem] border border-[rgb(255_255_255_/_70%)] bg-[linear-gradient(145deg,rgb(255_255_255_/_78%),rgb(139_124_255_/_16%))] shadow-[var(--shadow-float)] sm:size-64">
              <div className="text-center">
                <p className="text-5xl font-black text-[var(--color-ink)]">H</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">Portfolio identity</p>
              </div>
            </div>
            <FloatingCard placement="flow" className="ml-auto max-w-[16rem]">
              <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]"><Sparkle aria-hidden="true" size={16} /> Designing meaningful interfaces.</p>
              <p className="mt-2 text-xs leading-[var(--line-body)] text-[var(--color-ink-muted)]">Portrait-ready cluster. Approved image can replace this identity panel later.</p>
            </FloatingCard>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

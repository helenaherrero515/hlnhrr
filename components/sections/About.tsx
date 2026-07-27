import { BriefcaseBusiness, Trophy, UsersRound } from "lucide-react";
import type { ReactElement } from "react";
import type { Profile, Statistics } from "@/types";
import { DecorativeShapes } from "@/components/assets";
import { StatCard } from "@/components/ui";
import { QuoteCard, Section, SectionHeading } from "@/components/shared";

interface AboutProps {
  profile: Profile;
  statistics: Statistics[];
}

const statIcons = [<Trophy key="trophy" size={21} />, <BriefcaseBusiness key="briefcase" size={21} />, <UsersRound key="users" size={21} />];

export function About({ profile, statistics }: AboutProps): ReactElement {
  return (
    <Section id="about" aria-labelledby="about-title" className="relative">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeading headingId="about-title" eyebrow="About" title="A designer who can reason through the interface and build it." description={profile.bio} />
          <div className="relative mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/60 p-6">
            <DecorativeShapes className="absolute -bottom-10 -right-12 h-44 w-56 opacity-70" />
            <p className="relative max-w-[42rem] text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">
              Helena brings together product thinking, user flows, visual systems, and responsive frontend implementation. Her work is shaped by hackathon pressure, community design work, and hands-on collaboration with engineers and stakeholders.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {statistics.slice(0, 4).map((stat, index) => <StatCard key={stat.label} stat={stat} icon={statIcons[index % statIcons.length]} tone={index === 1 ? "pink" : index === 2 ? "sky" : "lavender"} />)}
          <div className="sm:col-span-2">
            <QuoteCard quote="I turn complex needs into clear, human-centered digital experiences through research, prototyping, and careful frontend implementation." attribution="Design philosophy" />
          </div>
        </div>
      </div>
    </Section>
  );
}


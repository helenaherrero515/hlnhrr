import type { ReactElement } from "react";
import type { Skill } from "@/types";
import { SkillChip } from "@/components/ui";
import { Section, SectionHeading } from "@/components/shared";

interface SkillsProps {
  skills: Skill[];
}

function groupSkills(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const categorySkills = groups[skill.category] ?? [];
    return { ...groups, [skill.category]: [...categorySkills, skill] };
  }, {});
}

export function Skills({ skills }: SkillsProps): ReactElement {
  const groupedSkills = groupSkills(skills);

  return (
    <Section id="skills" aria-labelledby="skills-title">
      <SectionHeading headingId="skills-title" eyebrow="Skills" title="A practical toolkit for research, systems, visuals, and frontend craft." />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {Object.entries(groupedSkills).map(([category, items]) => (
          <section key={category} aria-labelledby={`skill-${category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className="rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/60 p-6 shadow-[var(--shadow-card)]">
            <h3 id={`skill-${category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className="text-sm font-semibold text-[var(--color-ink)]">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {items.map((skill) => <SkillChip key={`${skill.category}-${skill.name}`} skill={skill} />)}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}


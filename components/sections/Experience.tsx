import type { ReactElement } from "react";
import type { Experience as ExperienceRecord, TimelineItem } from "@/types";
import { Badge, GlassCard, Timeline } from "@/components/ui";
import { Section, SectionHeading } from "@/components/shared";
import { formatDate } from "@/utils";

interface ExperienceProps {
  experience: ExperienceRecord[];
}

function toTimelineItem(item: ExperienceRecord): TimelineItem {
  const endDate = item.endDate ? formatDate(item.endDate) : "Present";
  return {
    category: "Experience",
    date: `${formatDate(item.startDate)} to ${endDate}`,
    title: `${item.role} at ${item.company}`,
    description: item.summary,
  };
}

export function Experience({ experience }: ExperienceProps): ReactElement {
  return (
    <Section id="experience" aria-labelledby="experience-title">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading headingId="experience-title" eyebrow="Experience" title="Cross-functional work with design and engineering context." description="Internship experience is presented as concise evidence of product judgment, visual communication, and implementation fluency." />
        </div>
        <GlassCard tone="solid" padding="lg" className="lg:col-span-8">
          <Timeline items={experience.map(toTimelineItem)} variant="spacious" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/55 p-4">
                <h3 className="text-sm font-semibold text-[var(--color-ink)]">{item.company}</h3>
                <p className="mt-1 text-xs font-medium text-[var(--color-ink-muted)]">{item.location} · {item.employmentType}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.highlights.slice(0, 2).map((highlight) => <Badge key={highlight} tone="sky">{highlight}</Badge>)}
                </div>
              </article>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}


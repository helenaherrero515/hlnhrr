import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { Experience, Footer, Hackathons } from "@/components/sections";
import { RouteIntro, Section, SectionHeading } from "@/components/shared";
import { Badge, GlassCard } from "@/components/ui";
import { creativeExperience, experience, hackathons } from "@/data";
import { createMetadata } from "@/lib";
import { formatDate } from "@/utils";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description: "Internship, hackathon, and creative-branding experience for Helena R. Herrero.",
  path: "/experience",
});

export default function ExperiencePage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="Experience" title="Proof of practice across product, AI, design, and community work." description="A focused record of internships, competitive builds, and creative-branding contributions sourced from Helena's CV." />
        <Experience experience={experience} />
        <Hackathons hackathons={hackathons} />
        <Section id="creative-work" aria-labelledby="creative-work-title">
          <SectionHeading headingId="creative-work-title" eyebrow="Creative work" title="Branding and event design for technology communities." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {creativeExperience.map((item) => (
              <GlassCard key={`${item.organization}-${item.role}`} tone="solid" padding="md">
                <div className="flex flex-wrap gap-2"><Badge tone="peach">{formatDate(item.startDate)}</Badge><Badge tone="neutral">{item.location}</Badge></div>
                <h2 className="mt-5 text-lg font-semibold leading-snug text-[var(--color-ink)]">{item.role}</h2>
                <p className="mt-1 text-sm font-medium text-[var(--color-periwinkle)]">{item.organization}</p>
                <p className="mt-4 text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">{item.summary}</p>
              </GlassCard>
            ))}
          </div>
        </Section>
      </PageShell>
      <Footer />
    </>
  );
}

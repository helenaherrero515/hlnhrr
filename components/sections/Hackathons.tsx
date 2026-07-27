import type { ReactElement } from "react";
import type { Hackathon } from "@/types";
import { HackathonCard, Section, SectionHeading } from "@/components/shared";

interface HackathonsProps {
  hackathons: Hackathon[];
}

export function Hackathons({ hackathons }: HackathonsProps): ReactElement {
  const selectedHackathons = hackathons.slice(0, 4);

  return (
    <Section id="hackathons" aria-labelledby="hackathons-title">
      <SectionHeading headingId="hackathons-title" eyebrow="Hackathons" title="Competitive builds with design ownership under pressure." description="Hackathon work shows Helena's ability to move from user flows and prototypes to polished implementation inside compressed timelines." />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {selectedHackathons.map((hackathon, index) => <HackathonCard key={`${hackathon.name}-${hackathon.date}`} hackathon={hackathon} emphasis={index === 0} />)}
      </div>
    </Section>
  );
}


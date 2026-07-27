import type { ReactElement } from "react";
import type { Community } from "@/types";
import { CommunityCard, Section, SectionHeading } from "@/components/shared";

interface CommunitiesProps {
  communities: Community[];
}

export function Communities({ communities }: CommunitiesProps): ReactElement {
  return (
    <Section id="communities" aria-labelledby="communities-title">
      <SectionHeading headingId="communities-title" eyebrow="Communities" title="Leadership and creative work inside student and tech communities." />
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {communities.map((community) => <CommunityCard key={community.name} community={community} />)}
      </div>
    </Section>
  );
}


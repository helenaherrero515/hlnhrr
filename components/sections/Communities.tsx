import type { ReactElement } from "react";
import type { Community } from "@/types";
import { CommunityCard, Section, SectionHeading } from "@/components/shared";

interface CommunitiesProps {
  communities: Community[];
}

const overlayGradients = [
  "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
  "linear-gradient(135deg, #311b92 0%, #4527a0 100%)",
  "linear-gradient(135deg, #880e4f 0%, #ad1457 100%)",
  "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
  "linear-gradient(135deg, #7c2d12 0%, #9a3412 100%)",
  "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
];

export function Communities({ communities }: CommunitiesProps): ReactElement {
  return (
    <Section id="communities" aria-labelledby="communities-title">
      <SectionHeading headingId="communities-title" eyebrow="Communities & Organizations" title="Leadership and creative work inside student and tech communities." />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((community, index) => (
          <CommunityCard key={community.name} community={community} gradientTone={overlayGradients[index % overlayGradients.length]} />
        ))}
      </div>
    </Section>
  );
}


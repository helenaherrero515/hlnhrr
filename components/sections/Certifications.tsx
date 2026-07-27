import type { ReactElement } from "react";
import type { Certification } from "@/types";
import { CertificationCard, Section, SectionHeading } from "@/components/shared";

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps): ReactElement {
  return (
    <Section id="certifications" aria-labelledby="certifications-title">
      <SectionHeading headingId="certifications-title" eyebrow="Certifications" title="Analytics credentials that strengthen product and UX decisions." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {certifications.map((certification) => <CertificationCard key={`${certification.issuer}-${certification.name}`} certification={certification} />)}
      </div>
    </Section>
  );
}


import type { ReactElement } from "react";
import type { Profile, Social } from "@/types";
import { ContactWidget, Section } from "@/components/shared";

interface ContactProps {
  profile: Profile;
  socials: Social[];
}

export function Contact({ profile, socials }: ContactProps): ReactElement {
  return (
    <Section id="contact" aria-labelledby="contact-title" contained={false} className="mx-auto max-w-[var(--container-content)] pb-[var(--space-section)] pt-8">
      <div id="contact-title" className="sr-only">Contact Helena</div>
      <ContactWidget profile={profile} socials={socials} resumeHref="/assets/cv/CV_HERRERO,%20HELENA%20R.%20.pdf" />
    </Section>
  );
}

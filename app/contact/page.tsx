import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { Footer } from "@/components/sections";
import { ContactWidget, RouteIntro, Section } from "@/components/shared";
import { profile, socials } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact Helena R. Herrero for UI/UX design, frontend, and product collaboration opportunities.",
  path: "/contact",
});

export default function ContactPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="Contact" title="Start a conversation about product design and frontend craft." description="The fastest verified contact path is Helena's public email from her CV." />
        <Section id="contact-options" aria-labelledby="contact-options-title" className="pt-0">
          <h2 id="contact-options-title" className="sr-only">Contact options</h2>
          <ContactWidget profile={profile} socials={socials} resumeHref="/assets/cv/CV_HERRERO,%20HELENA%20R.%20.pdf" />
        </Section>
      </PageShell>
      <Footer />
    </>
  );
}

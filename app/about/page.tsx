import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { About, Communities, Footer, Skills } from "@/components/sections";
import { RouteIntro } from "@/components/shared";
import { communities, profile, skills, statistics } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn about Helena R. Herrero's product design, frontend, and community-centered creative practice.",
  path: "/about",
});

export default function AboutPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="About Helena" title="Design judgment, visual systems, and frontend fluency in one practice." description="Helena connects user-centered design methods with implementation awareness, community leadership, and visual-branding craft." />
        <About profile={profile} statistics={statistics} />
        <Skills skills={skills} />
        <Communities communities={communities} />
      </PageShell>
      <Footer />
    </>
  );
}

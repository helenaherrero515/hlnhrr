import { BackToTop, CursorGlow } from "@/components/ui";
import { SiteHeader } from "@/components/layout";
import { ReferenceBoard, ShowcaseHero } from "@/components/sections";
import { certifications, communities, experience, hackathons, profile, skills } from "@/data";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <CursorGlow />
      <main id="main-content" className="relative isolate min-h-screen overflow-x-hidden bg-[var(--color-canvas)]">
        <div aria-hidden="true" className="organic-gradient-blob" />
        <div className="relative z-10">
          <SiteHeader />
          <ShowcaseHero profile={profile} />
          <ReferenceBoard profile={profile} experience={experience} hackathons={hackathons} skills={skills} communities={communities} certifications={certifications} />
          <BackToTop />
        </div>
      </main>
    </>
  );
}
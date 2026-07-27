import { BackToTop, CursorGlow } from "@/components/ui";
import { ReferenceBoard, ShowcaseHero } from "@/components/sections";
import { certifications, communities, experience, hackathons, profile, skills } from "@/data";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <CursorGlow />
      <main id="main-content" className="min-h-screen overflow-hidden bg-[var(--color-canvas)]">
        <ShowcaseHero profile={profile} />
        <ReferenceBoard profile={profile} experience={experience} hackathons={hackathons} skills={skills} communities={communities} certifications={certifications} />
        <BackToTop />
      </main>
    </>
  );
}


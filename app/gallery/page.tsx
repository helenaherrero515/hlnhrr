import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { Footer } from "@/components/sections";
import { RouteIntro, Section, SectionHeading } from "@/components/shared";
import { GlassCard } from "@/components/ui";
import { DecorativeShapes, GridDots } from "@/components/assets";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description: "Reserved gallery space for approved visual work and interface studies by Helena R. Herrero.",
  path: "/gallery",
});

export default function GalleryPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="Gallery" title="A reserved space for approved visual studies." description="This route is ready for future interface explorations, branding work, and gallery pieces once publishable assets are selected." />
        <Section id="gallery-status" aria-labelledby="gallery-status-title" className="pt-0">
          <SectionHeading headingId="gallery-status-title" eyebrow="Status" title="No public gallery assets have been approved yet." description="The gallery intentionally avoids placeholder artwork. When assets are ready, they should be added under the documented `public/images/` directories and rendered with clear alt text." />
          <GlassCard tone="wash" padding="lg" className="relative mt-8 min-h-72 overflow-hidden">
            <GridDots className="absolute right-8 top-8 h-32 w-32" />
            <DecorativeShapes className="absolute bottom-0 right-10 h-56 w-72 opacity-80" />
            <p className="relative z-10 max-w-[42rem] text-sm leading-[var(--line-body)] text-[var(--color-ink-muted)]">
              Future gallery content should preserve the same soft-white workspace language, use real project artifacts, and avoid turning the portfolio into a generic image wall.
            </p>
          </GlassCard>
        </Section>
      </PageShell>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { PageShell, SiteHeader } from "@/components/layout";
import { Certifications, Communities, Footer } from "@/components/sections";
import { RouteIntro } from "@/components/shared";
import { certifications, communities } from "@/data";
import { createMetadata } from "@/lib";

export const metadata: Metadata = createMetadata({
  title: "Certifications",
  description: "Analytics and data credentials that support Helena R. Herrero's product and UX decision-making.",
  path: "/certifications",
});

export default function CertificationsPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <PageShell>
        <RouteIntro eyebrow="Certifications" title="Data and analytics learning that strengthens design decisions." description="Credentials are shown with official titles, issuers, and dates from Helena's CV." />
        <Certifications certifications={certifications} />
        <Communities communities={communities} />
      </PageShell>
      <Footer />
    </>
  );
}

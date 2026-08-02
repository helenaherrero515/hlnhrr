import Image from "next/image";
import type { Metadata } from "next";
import { Award, BarChart3, CalendarDays, Cloud, Database, MapPin, Palette, PieChart, Sparkles, Users } from "lucide-react";
import { PageShell, SiteHeader } from "@/components/layout";
import { Footer } from "@/components/sections";
import { Badge, GlassCard } from "@/components/ui";
import { certifications, experience } from "@/data";
import { createMetadata } from "@/lib";
import { formatDate } from "@/utils";

export const metadata: Metadata = createMetadata({
  title: "Experience",
  description: "Certificates, leadership, community, and creative experience for Helena R. Herrero.",
  path: "/experience",
});


const roleIcon = [Cloud, Database, Palette, Users, Sparkles];

function dateRange(startDate: string, endDate?: string): string {
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "Present"}`;
}

function experienceTone(index: number): string {
  const tones = ["experience-card-lavender", "experience-card-sky", "experience-card-pink", "experience-card-mint", "experience-card-peach"];
  return tones[index % tones.length];
}

export default function ExperiencePage(): React.ReactElement {
  const certificateHighlights = certifications.flatMap((certificate) => certificate.highlights ?? []);

  return (
    <>
      <SiteHeader />
      <PageShell className="experience-playground">
        <section className="experience-hero pt-10">
          <GlassCard tone="wash" padding="none" className="experience-hero-panel overflow-hidden">
            <div aria-hidden="true" className="experience-background-shape shape-blue" />
            <div aria-hidden="true" className="experience-background-shape shape-pink" />
            <div aria-hidden="true" className="experience-background-shape shape-yellow" />
            <div aria-hidden="true" className="experience-background-shape shape-mint-ring" />
            <div aria-hidden="true" className="experience-floating-star star-left" />
            <div aria-hidden="true" className="experience-floating-star star-right" />
            <span aria-hidden="true" className="experience-dot dot-left" />
            <span aria-hidden="true" className="experience-dot dot-right" />
            <span aria-hidden="true" className="experience-dot dot-blue" />

            <div className="experience-floating-card experience-chart-card" aria-hidden="true">
              <BarChart3 size={108} strokeWidth={1.7} />
            </div>
            <div className="experience-floating-card experience-pie-card" aria-hidden="true">
              <PieChart size={118} strokeWidth={1.7} />
            </div>
            <div className="experience-menu-card" aria-hidden="true"><span /><span /><span /></div>

            <div className="experience-hero-copy">
              <h1><span>Ready to build,</span><br />lead, and tell<br />better <em>data stories.</em></h1>
              <p>
                Certificates, student leadership, technical programs, and creative community work organized into one record of practice.
              </p>
            </div>
          </GlassCard>
        </section>

        <section id="certificates" className="experience-section mx-auto max-w-[var(--container-page)]" aria-labelledby="certificates-title">
          <div className="experience-section-heading">
            <Badge tone="lavender">Certificates</Badge>
            <h2 id="certificates-title">Data credentials with hands-on analytics practice.</h2>
            <p>{certificateHighlights.length} concrete learning outcomes across SQL, Python, cloud data pipelines, dashboards, analytics reporting, and storytelling.</p>
          </div>
          <div className="experience-certificate-grid">
            {certifications.map((certificate, index) => (
              <GlassCard key={certificate.name} tone="wash" padding="none" className={`experience-certificate-card ${experienceTone(index)}`}>
                <div className="experience-certificate-topline">
                  <div className="experience-badge-mark">
                    {certificate.badge ? <Image src={certificate.badge} alt="" width={42} height={42} /> : <Award size={24} />}
                  </div>
                  <Badge tone="neutral">{formatDate(certificate.issuedDate)}</Badge>
                </div>
                <h3>{certificate.name}</h3>
                <p className="experience-issuer">{certificate.issuer}</p>
                <p className="experience-description">{certificate.description}</p>
                <ul>
                  {(certificate.highlights ?? []).map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="leadership" className="experience-section mx-auto max-w-[var(--container-page)]" aria-labelledby="leadership-title">
          <div className="experience-section-heading experience-section-heading-wide">
            <Badge tone="sky">Leadership & Organizational Experience</Badge>
            <h2 id="leadership-title">Community work arranged like a soft, scannable event board.</h2>
            <p>Each card keeps the role, dates, location, and core contributions visible without flattening everything into a long resume wall.</p>
          </div>
          <div className="experience-board-grid">
            {experience.map((item, index) => {
              const Icon = roleIcon[index % roleIcon.length];
              return (
                <article key={`${item.company}-${item.role}`} className={`experience-role-card ${experienceTone(index)}`}>
                  <div className="experience-role-glow" aria-hidden="true" />
                  <div className="experience-role-header">
                    <span className="experience-role-icon"><Icon size={20} /></span>
                    <div>
                      <h3>{item.company}</h3>
                      <p>{item.role}</p>
                    </div>
                  </div>
                  <div className="experience-role-meta">
                    <span><MapPin size={13} /> {item.location}</span>
                    <span><CalendarDays size={13} /> {dateRange(item.startDate, item.endDate)}</span>
                  </div>
                  <p className="experience-role-summary">{item.summary}</p>
                  <ul>
                    {item.highlights.slice(0, 3).map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <div className="experience-topic-row">
                    {item.topics.slice(0, 4).map((topic) => <span key={`${item.company}-${topic}`}>{topic}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </PageShell>
      <Footer />
    </>
  );
}
import { Mail, MapPin } from "lucide-react";
import type { ReactElement } from "react";
import type { Profile, Social } from "@/types";
import { Button, GlassCard } from "@/components/ui";

interface ContactWidgetProps {
  profile: Profile;
  socials: Social[];
  resumeHref?: string;
}

function getCountry(location: string): string {
  return location.split(",").at(-1)?.trim() ?? location;
}

export function ContactWidget({ profile, socials, resumeHref }: ContactWidgetProps): ReactElement {
  const emailHref = profile.email ? `mailto:${profile.email}` : undefined;
  const publicSocials = socials.filter((social) => social.platform !== "Email");

  return (
    <GlassCard tone="wash" padding="lg" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-20 -top-24 size-64 rounded-full bg-[rgb(255_114_184_/_14%)] blur-3xl" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">Contact</p>
          <h2 className="mt-4 max-w-2xl text-[length:var(--type-h2)] font-semibold leading-[var(--line-heading)] text-[var(--color-ink)]">
            Let us build clear, useful products together.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[var(--line-body)] text-[var(--color-ink-muted)]">
            Helena is actively seeking UI/UX design opportunities where research, interface craft, and frontend execution meet.
          </p>
        </div>
        <div className="grid gap-4">
          {emailHref ? (
            <Button asChild size="lg" className="w-full justify-between">
              <a href={emailHref}>
                <span className="inline-flex items-center gap-2"><Mail aria-hidden="true" size={18} /> Email Helena</span>
              </a>
            </Button>
          ) : null}
          <div className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/60 p-4 text-sm text-[var(--color-ink-muted)]">
            <p className="flex items-center gap-2 font-medium text-[var(--color-ink)]"><MapPin aria-hidden="true" size={17} /> Based in {getCountry(profile.location)}</p>
            {publicSocials.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {publicSocials.map((social) => <a key={social.href} href={social.href} className="underline hover:text-[var(--color-ink)]">{social.label}</a>)}
              </div>
            ) : null}
            {resumeHref ? <a className="mt-3 inline-block underline hover:text-[var(--color-ink)]" href={resumeHref}>View resume</a> : null}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

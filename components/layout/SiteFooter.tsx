import Link from "next/link";
import type { ReactElement } from "react";
import { routes, siteConfig } from "@/constants";
import { socials } from "@/data";
import { cn } from "@/utils";

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-[var(--color-line)]", className)}>
      <div className="mx-auto flex max-w-[var(--container-page)] flex-col gap-5 px-[var(--space-gutter)] py-8 text-sm text-[var(--color-ink-muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-ink)]">{siteConfig.name}</p>
          <p className="mt-1">Designing clear digital products with care.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link className="rounded-sm hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={routes.projects}>
            Projects
          </Link>
          <Link className="rounded-sm hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]" href={routes.contact}>
            Contact
          </Link>
          {socials.map((social) => (
            <a
              key={social.href}
              className="rounded-sm hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              href={social.href}
            >
              {social.label}
            </a>
          ))}
        </nav>
        <p>&copy; {year} {siteConfig.name}</p>
      </div>
    </footer>
  );
}

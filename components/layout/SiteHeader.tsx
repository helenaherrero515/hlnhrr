import Link from "next/link";
import type { ReactElement } from "react";
import { navigation, routes, siteConfig } from "@/constants";
import { cn } from "@/utils";

interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps): ReactElement {
  return (
    <header className={cn("sticky top-0 z-30 border-b border-[var(--color-line)] bg-[rgb(250_250_250_/_78%)] backdrop-blur-[var(--blur-glass)]", className)}>
      <div className="mx-auto flex max-w-[var(--container-page)] flex-col gap-4 px-[var(--space-gutter)] py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={routes.home}
          className="w-fit rounded-[var(--radius-pill)] text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[var(--radius-pill)] px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[rgb(255_255_255_/_70%)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

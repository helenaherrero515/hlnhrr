import Link from "next/link";
import type { ReactElement } from "react";
import { navigation } from "@/constants";
import { cn } from "@/utils";

interface SiteHeaderProps {
  className?: string;
}

export function SiteHeader({ className }: SiteHeaderProps): ReactElement {
  return (
    <header className={cn("fixed left-0 top-0 z-[100] w-full px-4 pt-3 sm:px-8 lg:px-16", className)}>
      <div className="pointer-events-none mx-auto flex max-w-[92rem] justify-center">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-[var(--radius-pill)] border border-[rgb(255_114_184_/_24%)] bg-[rgb(255_114_184_/_12%)] px-2.5 py-2 text-xs font-semibold text-[var(--color-ink-muted)] shadow-[0_10px_32px_rgb(66_55_120_/_10%)] backdrop-blur-[var(--blur-glass)] transition-[background-color,box-shadow,transform] duration-300 ease-[var(--ease-emphasized)] hover:-translate-y-0.5 hover:bg-[rgb(255_114_184_/_16%)] hover:shadow-[0_14px_42px_rgb(255_114_184_/_16%)] motion-reduce:hover:translate-y-0 sm:px-3"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-[var(--radius-pill)] px-3 py-1.5 transition-colors hover:bg-[rgb(255_114_184_/_10%)] hover:text-[var(--color-pink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 sm:px-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

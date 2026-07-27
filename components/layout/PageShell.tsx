import type { ReactElement, ReactNode } from "react";
import { cn } from "@/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps): ReactElement {
  return (
    <main id="main-content" className={cn("mx-auto w-full max-w-[var(--container-page)] px-[var(--space-gutter)]", className)}>
      {children}
    </main>
  );
}

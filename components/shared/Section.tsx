import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { Reveal } from "@/components/ui";
import { cn } from "@/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  contained?: boolean;
  reveal?: boolean;
}

export function Section({ children, contained = true, reveal = true, className, ...props }: SectionProps): ReactElement {
  const content = reveal ? <Reveal>{children}</Reveal> : children;

  return (
    <section className={cn("py-[var(--space-section)]", contained ? "mx-auto max-w-[var(--container-content)]" : undefined, className)} {...props}>
      {content}
    </section>
  );
}

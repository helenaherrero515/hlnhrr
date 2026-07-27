import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "@/utils";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function ExternalLink({ children, className, rel, target, ...props }: ExternalLinkProps): ReactElement {
  return (
    <a
      className={cn("rounded-sm underline decoration-[var(--color-line)] transition-colors hover:text-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]", className)}
      rel={rel ?? "noreferrer"}
      target={target ?? "_blank"}
      {...props}
    >
      {children}
    </a>
  );
}

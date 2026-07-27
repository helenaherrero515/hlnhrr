import type { ReactElement } from "react";
import { cn } from "@/utils";

interface PrototypeConnectorProps {
  className?: string;
}

export function PrototypeConnector({ className }: PrototypeConnectorProps): ReactElement {
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none text-[var(--color-periwinkle)]", className)} viewBox="0 0 220 120" fill="none">
      <path d="M16 88C58 18 96 118 138 50C158 18 184 20 204 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="7 8" />
      <path d="M204 32L191 29L198 43L204 32Z" fill="currentColor" />
      <circle cx="16" cy="88" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

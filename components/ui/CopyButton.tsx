"use client";

import { Check, Copy } from "lucide-react";
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { useState } from "react";
import { cn } from "@/utils";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label: string;
}

export function CopyButton({ value, label, className, ...props }: CopyButtonProps): ReactElement {
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-line)] bg-white/70 px-3 text-xs font-semibold text-[var(--color-ink-muted)] shadow-sm transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        className,
      )}
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      {...props}
    >
      {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

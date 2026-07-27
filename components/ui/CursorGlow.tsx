"use client";

import type { ReactElement } from "react";
import { useCursorGlow } from "@/hooks";
import { cn } from "@/utils";

interface CursorGlowProps {
  enabled?: boolean;
  className?: string;
}

export function CursorGlow({ enabled = true, className }: CursorGlowProps): ReactElement | null {
  const style = useCursorGlow(enabled);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 hidden bg-[radial-gradient(420px_circle_at_var(--cursor-x)_var(--cursor-y),rgb(139_124_255_/_12%),transparent_42%)] motion-reduce:hidden lg:block",
        className,
      )}
      style={style}
    />
  );
}


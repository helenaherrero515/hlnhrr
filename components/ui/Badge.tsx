import type { ReactElement, ReactNode } from "react";
import { cn } from "@/utils";

type BadgeTone = "neutral" | "lavender" | "pink" | "sky" | "peach" | "success";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-[var(--color-line)] bg-[rgb(255_255_255_/_64%)] text-[var(--color-ink)]",
  lavender: "border-[rgb(139_124_255_/_22%)] bg-[rgb(139_124_255_/_10%)] text-[var(--color-lavender)]",
  pink: "border-[rgb(255_114_184_/_24%)] bg-[rgb(255_114_184_/_10%)] text-[var(--color-pink)]",
  sky: "border-[rgb(141_207_255_/_32%)] bg-[rgb(141_207_255_/_13%)] text-[#2f74b8]",
  peach: "border-[rgb(255_201_174_/_42%)] bg-[rgb(255_201_174_/_18%)] text-[#a4573e]",
  success: "border-[rgb(80_180_120_/_24%)] bg-[rgb(80_180_120_/_10%)] text-[#2f7a54]",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}

export function Badge({ children, tone = "neutral", icon, className }: BadgeProps): ReactElement {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 max-w-full items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium leading-none",
        toneClasses[tone],
        className,
      )}
    >
      {icon ? <span aria-hidden="true" className="inline-flex shrink-0">{icon}</span> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

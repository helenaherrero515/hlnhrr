import type { ReactElement } from "react";
import type { Skill } from "@/types";
import { cn } from "@/utils";

interface SkillChipProps {
  skill: Skill;
  interactive?: boolean;
  className?: string;
}

export function SkillChip({ skill, interactive = false, className }: SkillChipProps): ReactElement {
  const Component = interactive ? "button" : "span";

  return (
    <Component
      className={cn(
        "inline-flex min-h-8 max-w-full items-center rounded-[var(--radius-pill)] border border-[rgb(113_134_255_/_22%)] bg-[rgb(255_255_255_/_58%)] px-3 py-1 text-xs font-medium text-[var(--color-periwinkle)] shadow-sm transition-colors duration-[var(--duration-fast)]",
        interactive ? "cursor-pointer hover:border-[var(--color-periwinkle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2" : undefined,
        className,
      )}
      type={interactive ? "button" : undefined}
      aria-label={interactive ? `Filter by ${skill.name}` : undefined}
    >
      <span className="truncate">{skill.name}</span>
    </Component>
  );
}

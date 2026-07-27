"use client";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks";
import { cn } from "@/utils";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Reveal({ children, className, ...props }: RevealProps): ReactElement {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12);
  const [isMotionSafe, setIsMotionSafe] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMotionSafe(!reducedMotion.matches);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reduce:translate-y-0 motion-reduce:opacity-100",
        isMotionSafe ? "transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-emphasized)]" : undefined,
        isMotionSafe && !isVisible ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

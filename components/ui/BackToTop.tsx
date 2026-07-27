"use client";

import { ArrowUp } from "lucide-react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/utils";

export function BackToTop(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = (): void => setIsVisible(window.scrollY > 720);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop(): void {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={cn(
        "fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-[var(--color-line)] bg-white/85 text-[var(--color-ink)] shadow-[var(--shadow-float)] backdrop-blur-[var(--blur-glass)] transition-[opacity,transform] duration-[var(--duration-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" size={19} />
    </button>
  );
}

"use client";

import { useEffect } from "react";

const scrollDurationMs = 950;

function easeOutCubic(progress: number): number {
  return 1 - (1 - progress) ** 3;
}

export function FigmaRefreshScroll(): null {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || window.location.hash || window.location.pathname !== "/") {
      return;
    }

    const aboutSection = document.getElementById("about");

    if (!aboutSection) {
      return;
    }

    let frameId = 0;
    let startTime = 0;
    const startY = 0;
    const endY = Math.max(0, aboutSection.offsetTop - 8);

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const delayId = window.setTimeout(() => {
      const animateScroll = (timestamp: number): void => {
        if (!startTime) {
          startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / scrollDurationMs, 1);
        const easedProgress = easeOutCubic(progress);

        window.scrollTo(0, startY + (endY - startY) * easedProgress);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(animateScroll);
        }
      };

      frameId = window.requestAnimationFrame(animateScroll);
    }, 260);

    return () => {
      window.clearTimeout(delayId);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}

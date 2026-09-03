"use client";

import { useEffect } from "react";

export function FigmaScrollToExperiences(): null {
  useEffect(() => {
    const scrollToExperiences = (): void => {
      const target = document.getElementById("experiences");

      if (!target) {
        return;
      }

      window.scrollTo({ top: target.offsetTop, behavior: "auto" });
    };

    scrollToExperiences();
    const shortDelay = window.setTimeout(scrollToExperiences, 250);
    const imageDelay = window.setTimeout(scrollToExperiences, 900);

    return () => {
      window.clearTimeout(shortDelay);
      window.clearTimeout(imageDelay);
    };
  }, []);

  return null;
}

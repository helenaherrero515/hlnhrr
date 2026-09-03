"use client";

import { useEffect } from "react";

type ScrollDirection = "down" | "up";

const revealSelector = ".figma-scroll-rise";

export function FigmaScrollReveal(): null {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const page = document.querySelector<HTMLElement>(".figma-portfolio-page");
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (!page || revealItems.length === 0) {
      return;
    }

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    let lastScrollY = window.scrollY;
    let scrollDirection: ScrollDirection = "down";

    page.classList.add("figma-scroll-reveal-ready");
    revealItems.forEach((item) => {
      item.dataset.revealDirection = "down";
    });

    const updateDirection = (): void => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 2) {
        return;
      }

      scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          target.dataset.revealDirection = scrollDirection;

          if (entry.isIntersecting) {
            target.classList.add("is-visible");
          } else {
            target.classList.remove("is-visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    window.addEventListener("scroll", updateDirection, { passive: true });
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", updateDirection);
      observer.disconnect();
      page.classList.remove("figma-scroll-reveal-ready");
    };
  }, []);

  return null;
}

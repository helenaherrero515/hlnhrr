"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(enabled = true): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (prefersReducedMotion.matches || coarsePointer.matches) {
      return undefined;
    }

    const updatePosition = (event: PointerEvent): void => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    return () => window.removeEventListener("pointermove", updatePosition);
  }, [enabled]);

  return position;
}

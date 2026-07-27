"use client";

import { useEffect, useState } from "react";

export function useParallax(speed = 0.15): number {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const updateOffset = (): void => setOffset(window.scrollY * speed);
    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    return () => window.removeEventListener("scroll", updateOffset);
  }, [speed]);
  return offset;
}

"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>(threshold = 0.15): { ref: React.RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, threshold]);
  return { ref, isVisible };
}

"use client";

import { useEffect, useState } from "react";
import type { ReactElement, CSSProperties } from "react";

export function ProjectsInteractiveBackground(): ReactElement {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({ x: event.pageX, y: event.pageY });
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    return () => window.removeEventListener("pointermove", updatePosition);
  }, []);

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black 0%, transparent 100%)`,
    maskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black 0%, transparent 100%)`,
  } as CSSProperties;

  return (
    <>
      <div aria-hidden="true" className="projects-grid-top-left" />
      <div aria-hidden="true" className="projects-orb projects-orb-left" />
      <div aria-hidden="true" className="projects-orb projects-orb-right" />

      {/* Cursor Spotlight Interactive Dot Matrix Field */}
      <div
        aria-hidden="true"
        className="projects-interactive-dots"
        style={maskStyle}
      />
    </>
  );
}

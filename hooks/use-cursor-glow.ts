"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import { useMousePosition } from "./use-mouse-position";

type CursorGlowStyle = CSSProperties & {
  "--cursor-x": string;
  "--cursor-y": string;
};

export function useCursorGlow(enabled = true): CursorGlowStyle {
  const { x, y } = useMousePosition(enabled);

  return useMemo(
    () => ({
      "--cursor-x": `${x}px`,
      "--cursor-y": `${y}px`,
    }),
    [x, y],
  );
}

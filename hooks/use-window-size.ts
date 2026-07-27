"use client";

import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const initialSize: WindowSize = { width: 0, height: 0 };

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(initialSize);

  useEffect(() => {
    const updateSize = (): void => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

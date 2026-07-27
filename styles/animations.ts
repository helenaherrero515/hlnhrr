export const animations = {
  duration: {
    fast: 160,
    base: 320,
    slow: 560,
  },
  easing: {
    emphasized: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  classes: {
    float: "motion-float",
    floatSlow: "motion-float-slow",
    pulseSoft: "motion-pulse-soft",
    settle: "motion-settle",
    boardCard: "board-card",
    surfaceShine: "surface-shine",
  },
} as const;

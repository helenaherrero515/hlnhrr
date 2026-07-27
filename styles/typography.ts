export const typography = {
  fontFamily: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    script: "var(--font-script)",
  },
  size: {
    display: "var(--type-display)",
    script: "var(--type-script)",
    h1: "var(--type-h1)",
    h2: "var(--type-h2)",
    body: "var(--type-body)",
    meta: "var(--type-meta)",
  },
  lineHeight: {
    tight: "var(--line-tight)",
    heading: "var(--line-heading)",
    body: "var(--line-body)",
  },
} as const;

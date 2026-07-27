export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const value = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${normalized}${value}`;
}

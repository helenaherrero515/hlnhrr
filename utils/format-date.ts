export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    ...options,
  }).format(new Date(date));
}

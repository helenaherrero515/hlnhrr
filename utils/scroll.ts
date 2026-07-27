export function scrollToId(id: string, behavior: ScrollBehavior = "smooth"): void {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

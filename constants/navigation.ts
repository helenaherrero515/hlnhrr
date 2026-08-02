import { routes } from "./routes";

export const navigation = [
  { label: "About", href: routes.home },
  { label: "Projects", href: routes.projects },
  { label: "Experience", href: routes.experience },
  { label: "Creative Works", href: routes.gallery },
] as const;

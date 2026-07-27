import { routes } from "./routes";

export const navigation = [
  { label: "Projects", href: routes.projects },
  { label: "Experience", href: routes.experience },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
] as const;

import { siteConfig } from "./site-config";

export const defaultSeo = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
} as const;

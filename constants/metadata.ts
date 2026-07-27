import type { Metadata } from "next";
import { defaultSeo } from "./seo";
import { siteConfig } from "./site-config";

export const siteMetadata: Metadata = {
  title: {
    default: defaultSeo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultSeo.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: defaultSeo.openGraph,
  robots: {
    index: true,
    follow: true,
  },
};

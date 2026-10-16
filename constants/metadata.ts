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
  icons: {
    icon: [
      { url: "/icons/hln.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icons/hln-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: [{ url: "/icons/hln-32.png", type: "image/png" }],
    apple: [{ url: "/icons/hln-180.png", type: "image/png", sizes: "180x180" }],
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: defaultSeo.openGraph,
  robots: {
    index: true,
    follow: true,
  },
};

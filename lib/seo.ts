import type { Metadata } from "next";
import { siteMetadata, siteConfig } from "@/constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
}

export function createMetadata({ title, description, path = "/" }: PageMetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    ...siteMetadata,
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...siteMetadata.openGraph,
      title,
      description,
      url,
    },
  };
}

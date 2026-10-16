import type { Metadata, Viewport } from "next";
import { siteMetadata } from "@/constants";
import "./globals.css";
import "@/styles/lego.css";

export const metadata: Metadata = {
  ...siteMetadata,
  description: "Obsessed with growth, robotics, data science, AI/ML, and building what I'm curious about.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

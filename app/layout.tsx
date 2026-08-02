import type { Metadata } from "next";
import { siteMetadata } from "@/constants";
import { heroSignature, sans, signature } from "@/lib";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
  return (
    <html lang="en" className={`${sans.variable} ${signature.variable} ${heroSignature.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

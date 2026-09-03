import type { Metadata, Viewport } from "next";
import "@fontsource/iosevka-charon/latin-300.css";
import "@fontsource/iosevka-charon/latin-400.css";
import "@fontsource/iosevka-charon/latin-500.css";
import "@fontsource/iosevka-charon/latin-700.css";
import "@fontsource/iosevka-charon/latin-700-italic.css";
import "@fontsource/iosevka-charon-mono/latin-300.css";
import "@fontsource/iosevka-charon-mono/latin-400.css";
import "@fontsource/iosevka-charon-mono/latin-500.css";
import "@fontsource/iosevka-charon-mono/latin-700.css";
import { siteMetadata } from "@/constants";
import { heroSignature, lexend, sans, signature } from "@/lib";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
  return (
    <html lang="en" className={`${sans.variable} ${lexend.variable} ${signature.variable} ${heroSignature.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

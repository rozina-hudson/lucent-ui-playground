import type { Metadata } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import { AppProviders } from "@/components/AppProviders";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucent UI — Component Playground",
  description:
    "An AI-first React component library with machine-readable manifests and MCP server support. Explore components live at lucentui.dev.",
  metadataBase: new URL("https://lucentui.dev"),
  openGraph: {
    title: "Lucent UI — Component Playground",
    description:
      "An AI-first React component library with machine-readable manifests and MCP server support.",
    url: "https://lucentui.dev",
    siteName: "Lucent UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucent UI — Component Playground",
    description:
      "An AI-first React component library with machine-readable manifests and MCP server support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${unbounded.variable} antialiased`}
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

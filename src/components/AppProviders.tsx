"use client";

import { PlaygroundProvider } from "@/lib/playgroundContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <PlaygroundProvider>{children}</PlaygroundProvider>;
}

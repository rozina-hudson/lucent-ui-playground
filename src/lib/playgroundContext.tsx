"use client";

import { createContext, useContext, useState } from "react";
import { defaultPlaygroundState, type PlaygroundState } from "@/components/docs/PlaygroundPanel";

type PlaygroundContextValue = {
  pg: PlaygroundState;
  setPg: (s: PlaygroundState) => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [pg, setPg] = useState<PlaygroundState>(defaultPlaygroundState);
  return (
    <PlaygroundContext.Provider value={{ pg, setPg }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}

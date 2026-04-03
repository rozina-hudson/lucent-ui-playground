"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { defaultPlaygroundState, type PlaygroundState } from "@/components/docs/PlaygroundPanel";

const STORAGE_KEY = "lucent-pg";

function loadState(): PlaygroundState {
  if (typeof window === "undefined") return defaultPlaygroundState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultPlaygroundState, ...JSON.parse(raw) };
  } catch {}
  return defaultPlaygroundState;
}

type PlaygroundContextValue = {
  pg: PlaygroundState;
  setPg: (s: PlaygroundState) => void;
  activeDocTab: string;
  setActiveDocTab: (tab: string) => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [pg, setPgState] = useState<PlaygroundState>(defaultPlaygroundState);
  const [activeDocTab, setActiveDocTab] = useState("preview");

  useEffect(() => {
    setPgState(loadState());
  }, []);

  const setPg = (s: PlaygroundState) => {
    setPgState(s);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {}
  };

  return (
    <PlaygroundContext.Provider value={{ pg, setPg, activeDocTab, setActiveDocTab }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error("usePlayground must be used within PlaygroundProvider");
  return ctx;
}

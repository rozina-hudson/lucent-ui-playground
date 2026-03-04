import type { Theme } from "lucent-ui";

export type ShellColors = {
  bg: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  subtle: string;
  gold: string;
  goldBg: string;
  goldBorder: string;
  codeBg: string;
  codeText: string;
};

export function getShell(theme: Theme): ShellColors {
  if (theme === "dark") {
    return {
      bg: "#0a0a0a",
      surface: "#111111",
      border: "#1f1f1f",
      text: "#f5f5f5",
      muted: "#a3a3a3",
      subtle: "#525252",
      gold: "#e4e4e7",
      goldBg: "#1a1a1a",
      goldBorder: "#27272a",
      codeBg: "#141414",
      codeText: "#c9d1d9",
    };
  }
  return {
    bg: "#ffffff",
    surface: "#f9fafb",
    border: "#e5e7eb",
    text: "#0a0a0a",
    muted: "#6b7280",
    subtle: "#9ca3af",
    gold: "#18181b",
    goldBg: "#f4f4f5",
    goldBorder: "#d4d4d8",
    codeBg: "#f6f8fa",
    codeText: "#24292f",
  };
}

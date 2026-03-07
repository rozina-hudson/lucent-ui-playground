"use client";

import { useEffect, useState } from "react";
import { Tabs, Select, Slider, CodeBlock } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";
import { adjustBorderForTheme } from "@/lib/colorUtils";

export type PlaygroundState = {
  theme: "light" | "dark";
  primaryColor: string;
  borderColor: string;
  borderRadius: number;
  fontScale: number;
  spacingScale: number;
  fontFamily: string;
};

export const defaultPlaygroundState: PlaygroundState = {
  theme: "light",
  primaryColor: "#6366f1",
  borderColor: "#e5e7eb",
  fontScale: 1,
  borderRadius: 8,
  spacingScale: 1,
  fontFamily: "Inter",
};

export const PLAYGROUND_FONTS = [
  "Inter",
  "DM Sans",
  "Geist",
  "Sora",
  "Plus Jakarta Sans",
  "IBM Plex Sans",
  "Nunito",
] as const;

function useGoogleFont(family: string) {
  useEffect(() => {
    const id = `gfont-${family.replace(/\s+/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [family]);
}

type Props = {
  state: PlaygroundState;
  onChange: (s: PlaygroundState) => void;
  shell: ShellColors;
  showCodeTab?: boolean;
};

function Label({ children, shell }: { children: React.ReactNode; shell: ShellColors }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: shell.subtle,
        fontFamily: "var(--font-dm-sans), sans-serif",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      {children}
    </div>
  );
}

export function generateCode(state: PlaygroundState): string {
  // In Lucent UI 0.5 the provider will happily derive all of the "extra"
  // accent tokens (hover/active/subtle, textOnAccent, accentBorder) from
  // `accentDefault`.  We show the minimal overrides here, with a comment
  // explaining the automatic behaviour so users know they don't need to
  // paste a big object.
  const baseTokens: Record<string, string> = {
    accentDefault: state.primaryColor,
  };

  // still handle an explicit border override since the library doesn't
  // nudge it for us yet
  if (state.borderColor !== defaultPlaygroundState.borderColor) {
    baseTokens.borderDefault = adjustBorderForTheme(state.borderColor, state.theme);
  }

  const lines = [
    `import { LucentProvider } from 'lucent-ui';`,
    ``,
    `<LucentProvider`,
    `  theme="${state.theme}"`,
    `  tokens={{`,
    ...Object.entries(baseTokens).map(([k, v]) => `    ${k}: "${v}",`),
    `  }}`,
    `>`,
    `  {/* your app */}`,
    `</LucentProvider>`,
  ];

  lines.push(
    ``,
    `/*
     * LucentProvider (0.5+) automatically derives from accentDefault:
     *   textOnAccent  — black or white for WCAG AA contrast
     *   accentBorder  — lightness-shifted per theme
     *
     * accentHover, accentActive, accentSubtle, and focusRing are NOT
     * auto-derived; omitting them leaves the base-theme defaults in place.
     * Supply them in tokens={{}} if you need precise hover/focus colours.
     */`
  );
  if (state.borderRadius !== 8 || state.fontScale !== 1 || state.spacingScale !== 1) {
    lines.push(``, `/* CSS custom properties (apply to a wrapper div) */`);
    if (state.borderRadius !== 8) {
      lines.push(`/* --lucent-radius-md: ${state.borderRadius}px; */`);
    }
    if (state.fontScale !== 1) {
      lines.push(`/* --lucent-font-size-md: ${state.fontScale}rem; */`);
    }
    if (state.spacingScale !== 1) {
      lines.push(`/* --lucent-space-4: ${state.spacingScale}rem; */`);
    }
  }
  return lines.join("\n");
}

export function PlaygroundPanel({ state, onChange, shell, showCodeTab = false }: Props) {
  const set = (patch: Partial<PlaygroundState>) => onChange({ ...state, ...patch });
  useGoogleFont(state.fontFamily);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const code = generateCode(state);

  const colorInputStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: `1px solid ${shell.border}`,
    padding: 2,
    cursor: "pointer",
    background: "transparent",
  };

  const customizeContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px" }}>
      <Row>
        <Label shell={shell}>Accent</Label>
        <input type="color" value={state.primaryColor} onChange={(e) => set({ primaryColor: e.target.value })} style={colorInputStyle} title="Primary accent colour" />
      </Row>
      <Row>
        <Label shell={shell}>Border</Label>
        <input type="color" value={state.borderColor} onChange={(e) => set({ borderColor: e.target.value })} style={colorInputStyle} title="Border colour" />
      </Row>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Label shell={shell}>Font</Label>
        <Select
          size="sm"
          value={state.fontFamily}
          onChange={(e) => set({ fontFamily: e.target.value })}
          options={PLAYGROUND_FONTS.map((f) => ({ value: f, label: f }))}
        />
      </div>
      <Slider size="sm" label={`Radius — ${state.borderRadius}px`} min={0} max={20} step={1} value={state.borderRadius} onChange={(e) => set({ borderRadius: Number(e.target.value) })} />
      <Slider size="sm" label={`Font scale — ${state.fontScale}×`} min={0.75} max={1.5} step={0.05} value={state.fontScale} onChange={(e) => set({ fontScale: Number(e.target.value) })} />
      <Slider size="sm" label={`Padding / Gap — ${state.spacingScale}×`} min={0.5} max={2} step={0.1} value={state.spacingScale} onChange={(e) => set({ spacingScale: Number(e.target.value) })} />
      <button onClick={() => onChange({ theme: "light", primaryColor: "#6366f1", borderColor: "#e5e7eb", borderRadius: 8, fontScale: 1, spacingScale: 1, fontFamily: "Inter" })} style={{ marginTop: 4, padding: "5px 0", background: "transparent", border: `1px solid ${shell.border}`, borderRadius: 6, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, cursor: "pointer" }}>
        Reset defaults
      </button>
    </div>
  );

  const codeContent = (
    <div style={{ padding: "0 12px 20px" }}>
      <CodeBlock code={code} />
    </div>
  );

  if (!showCodeTab) return customizeContent;

  return (
    <Tabs
      defaultValue="customize"
      style={{ paddingTop: 4 }}
      tabs={[
        { value: "customize", label: "Customize", content: customizeContent },
        { value: "code", label: "Code", content: codeContent },
      ]}
    />
  );
}

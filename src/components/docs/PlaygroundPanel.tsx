"use client";

import { useEffect, useState } from "react";
import { Tabs } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";
import { deriveAccentTokens } from "@/lib/colorUtils";

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
  const tokens = { ...deriveAccentTokens(state.primaryColor), borderDefault: state.borderColor };
  const lines = [
    `import { LucentProvider } from 'lucent-ui';`,
    ``,
    `<LucentProvider`,
    `  theme="${state.theme}"`,
    `  tokens={{`,
    ...Object.entries(tokens).map(([k, v]) => `    ${k}: "${v}",`),
    `  }}`,
    `>`,
    `  {/* your app */}`,
    `</LucentProvider>`,
  ];
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
  const [copied, setCopied] = useState(false);

  const code = generateCode(state);

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const sliderStyle: React.CSSProperties = {
    flex: 1,
    height: 4,
    cursor: "pointer",
    accentColor: shell.gold,
  };

  const colorInputStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: `1px solid ${shell.border}`,
    padding: 2,
    cursor: "pointer",
    background: "transparent",
  };

  const sectionHead: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: shell.subtle,
    fontFamily: "var(--font-dm-sans), sans-serif",
    padding: "12px 20px 6px",
    borderTop: `1px solid ${shell.border}`,
    marginTop: 12,
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
        <select value={state.fontFamily} onChange={(e) => set({ fontFamily: e.target.value })} style={{ width: "100%", padding: "5px 8px", background: shell.surface, border: `1px solid ${shell.border}`, borderRadius: 6, color: shell.text, fontSize: 12, fontFamily: "var(--font-dm-sans), sans-serif", cursor: "pointer" }}>
          {PLAYGROUND_FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Row><Label shell={shell}>Radius</Label><span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.borderRadius}px</span></Row>
        <input type="range" min={0} max={20} step={1} value={state.borderRadius} onChange={(e) => set({ borderRadius: Number(e.target.value) })} style={sliderStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Row><Label shell={shell}>Font scale</Label><span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.fontScale}×</span></Row>
        <input type="range" min={0.75} max={1.5} step={0.05} value={state.fontScale} onChange={(e) => set({ fontScale: Number(e.target.value) })} style={sliderStyle} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Row><Label shell={shell}>Padding / Gap</Label><span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.spacingScale}×</span></Row>
        <input type="range" min={0.5} max={2} step={0.1} value={state.spacingScale} onChange={(e) => set({ spacingScale: Number(e.target.value) })} style={sliderStyle} />
      </div>
      <button onClick={() => onChange({ theme: "light", primaryColor: "#6366f1", borderColor: "#e5e7eb", borderRadius: 8, fontScale: 1, spacingScale: 1, fontFamily: "Inter" })} style={{ marginTop: 4, padding: "5px 0", background: "transparent", border: `1px solid ${shell.border}`, borderRadius: 6, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, cursor: "pointer" }}>
        Reset defaults
      </button>
    </div>
  );

  const codeContent = (
    <div style={{ padding: "0 12px 20px" }}>
      <div style={{ position: "relative" }}>
        <pre style={{ margin: 0, padding: "12px 14px", background: shell.surface, border: `1px solid ${shell.border}`, borderRadius: 8, fontSize: 11, lineHeight: 1.7, color: shell.text, fontFamily: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace", overflowX: "auto", whiteSpace: "pre" }}>{code}</pre>
        <button onClick={copyCode} style={{ position: "absolute", top: 8, right: 8, background: shell.bg, border: `1px solid ${shell.border}`, borderRadius: 5, padding: "3px 8px", fontSize: 10, fontWeight: 600, cursor: "pointer", color: copied ? shell.gold : shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", transition: "color 0.15s" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
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

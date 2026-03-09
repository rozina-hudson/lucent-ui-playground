"use client";

import { useEffect, useState } from "react";
import { Tabs, Select, Slider, CodeBlock, ColorPicker } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";
import { adjustBorderForTheme } from "@/lib/colorUtils";

export type PlaygroundState = {
  theme: "light" | "dark";
  primaryColor: string;
  borderColor: string;
  bgColor: string;
  surfaceColor: string;
  textColor: string;
  borderRadius: number;
  fontScale: number;
  spacingScale: number;
  fontFamily: string;
};

export const defaultPlaygroundState: PlaygroundState = {
  theme: "light",
  primaryColor: "#6366f1",
  borderColor: "#e5e7eb",
  bgColor: "#ffffff",
  surfaceColor: "#ffffff",
  textColor: "#111827",
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

const ACCENT_PRESETS = [
  { label: "Core", colors: ["#003366", "#4169E1", "#708090", "#34282C", "#60A5FA", "#22543D", "#2563EB", "#06B6D4"] },
  { label: "Earth", colors: ["#A47551", "#C05621", "#9DB2BF", "#00A86B", "#BD9B83", "#E1B382", "#4A6741", "#E97451"] },
  { label: "Vibrant", colors: ["#FF6B35", "#FF00FF", "#E53E3E", "#39FF14", "#FBBF24", "#F87171", "#D4E157", "#0D9488"] },
  { label: "Jewel", colors: ["#4B0082", "#800020", "#065F46", "#0F172A", "#9966CC", "#D4AF37", "#1E293B", "#A855F7"] },
  { label: "Pastel", colors: ["#D1FAE5", "#FDA4AF", "#E9D5FF", "#BFDBFE", "#FFBE98", "#FEF3C7", "#E2E8F0", "#F0F0F0"] },
];

const BORDER_PRESETS = [
  { label: "Neutral", colors: ["#F1F5F9", "#E2E8F0", "#D4D4D8", "#E7E5E4", "#F8F9FA", "#C0C0C0", "#EBEBEB", "#F5F5F5"] },
  { label: "Dark", colors: ["#1E293B", "#2D3748", "#2B3040", "#312E81", "#0F172A", "#2A2E37", "#3F3F46", "#050505"] },
  { label: "Accent", colors: ["#A855F7", "#22D3EE", "#FDE047", "#FB7185", "#84CC16", "#5EEAD4", "#DDD6FE", "#F97316"] },
  { label: "Earthy", colors: ["#F5F5DC", "#A3B18A", "#8D99AE", "#D6D3D1", "#6B705C", "#FFEDD5", "#93C5FD", "#57534E"] },
];

const BG_PRESETS = [
  { label: "Light", colors: ["#FFFFFF", "#F9FAFB", "#F8FAFC", "#F5F5F4", "#FAFAF9", "#F0F4F8", "#FFF8F0", "#F0FFF4"] },
  { label: "Warm", colors: ["#FFFBEB", "#FFF1F2", "#F0F9FF", "#F5F3FF", "#ECFDF5", "#FDF4FF", "#FFFDE7", "#F0FDFA"] },
  { label: "Dark", colors: ["#0A0A0A", "#0F0F11", "#101114", "#111218", "#0D1117", "#11141A", "#0F1923", "#13111A"] },
  { label: "Mid-dark", colors: ["#18181B", "#1A1A2E", "#1C1917", "#162032", "#1B1D22", "#191C21", "#1E1E2E", "#1A1625"] },
];

const TEXT_PRESETS = [
  { label: "Near-black", colors: ["#111827", "#0F172A", "#18181B", "#1C1917", "#0A0A0A", "#1A1A2E", "#1E293B", "#27272A"] },
  { label: "Dark gray", colors: ["#374151", "#3F3F46", "#44403C", "#334155", "#404040", "#52525B", "#57534E", "#475569"] },
  { label: "Near-white", colors: ["#F9FAFB", "#E6EBF4", "#F4F4F5", "#F5F5F4", "#E2E8F0", "#EDEDED", "#D4D4D8", "#CBD5E1"] },
  { label: "Tinted", colors: ["#E8E8F0", "#F0EDE8", "#E0E7FF", "#D1FAE5", "#F3E8FF", "#E0F2FE", "#FEF9C3", "#FFE4E6"] },
];

export function generateCode(state: PlaygroundState): string {
  const d = defaultPlaygroundState;
  const useAnchors =
    state.bgColor !== d.bgColor ||
    state.surfaceColor !== d.surfaceColor ||
    state.textColor !== d.textColor;

  let lines: string[];

  if (useAnchors) {
    lines = [
      `import { LucentProvider } from 'lucent-ui';`,
      ``,
      `<LucentProvider`,
      `  theme="${state.theme}"`,
      `  anchors={{`,
      `    bgBase:         "${state.bgColor}",`,
      `    surface:        "${state.surfaceColor}",`,
      `    borderDefault:  "${adjustBorderForTheme(state.borderColor, state.theme)}",`,
      `    textPrimary:    "${state.textColor}",`,
      `    accentDefault:  "${state.primaryColor}",`,
      `    successDefault: "#16a34a",`,
      `    warningDefault: "#d97706",`,
      `    dangerDefault:  "#dc2626",`,
      `    infoDefault:    "#2563eb",`,
      `  }}`,
      `>`,
      `  {/* your app */}`,
      `</LucentProvider>`,
      ``,
      `/*`,
      ` * anchors mode: all 30+ variant tokens are auto-derived from these 9`,
      ` * colors — hover/active/subtle states, WCAG-compliant textOnAccent,`,
      ` * surface elevations, and status tints.`,
      ` */`,
    ];
  } else {
    const tokens: Record<string, string> = { accentDefault: state.primaryColor };
    if (state.borderColor !== d.borderColor) {
      tokens.borderDefault = adjustBorderForTheme(state.borderColor, state.theme);
    }
    lines = [
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
      ``,
      `/*`,
      ` * tokens mode: supply any subset of tokens — all variants are`,
      ` * auto-derived from anchor keys (accentDefault → hover/active/subtle,`,
      ` * textOnAccent, accentBorder). For full theming use anchors={{}} instead.`,
      ` */`,
    ];
  }
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

  const customizeContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px" }}>
      <Row>
        <Label shell={shell}>Accent</Label>
        <ColorPicker value={state.primaryColor} onChange={(hex) => set({ primaryColor: hex })} presetGroups={ACCENT_PRESETS} />
      </Row>
      <Row>
        <Label shell={shell}>Border</Label>
        <ColorPicker value={state.borderColor} onChange={(hex) => set({ borderColor: hex })} presetGroups={BORDER_PRESETS} />
      </Row>
      <Row>
        <Label shell={shell}>Background</Label>
        <ColorPicker value={state.bgColor} onChange={(hex) => set({ bgColor: hex })} presetGroups={BG_PRESETS} />
      </Row>
      <Row>
        <Label shell={shell}>Surface</Label>
        <ColorPicker value={state.surfaceColor} onChange={(hex) => set({ surfaceColor: hex })} presetGroups={BG_PRESETS} />
      </Row>
      <Row>
        <Label shell={shell}>Text</Label>
        <ColorPicker value={state.textColor} onChange={(hex) => set({ textColor: hex })} presetGroups={TEXT_PRESETS} />
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
      <button onClick={() => onChange(defaultPlaygroundState)} style={{ marginTop: 4, padding: "5px 0", background: "transparent", border: `1px solid ${shell.border}`, borderRadius: 6, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", fontSize: 11, cursor: "pointer" }}>
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

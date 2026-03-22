"use client";

import { useEffect, useState } from "react";
import { Tabs, Select, Slider, CodeBlock, ColorPicker, SegmentedControl, ColorSwatch } from "lucent-ui";
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

/* ─── Design Presets ─── */

type ThemeColors = {
  primaryColor: string;
  borderColor: string;
  bgColor: string;
  surfaceColor: string;
  textColor: string;
};

export type PresetDefinition = {
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
  shared: { borderRadius: number; fontScale: number; spacingScale: number; fontFamily: string };
};

export function resolvePreset(preset: PresetDefinition, theme: "light" | "dark"): Omit<PlaygroundState, "theme"> {
  return { ...(theme === "dark" ? preset.dark : preset.light), ...preset.shared };
}

export const COMBINED_PRESETS: PresetDefinition[] = [
  {
    name: "Modern",
    description: "Clean lines, indigo accent, balanced spacing",
    light: { primaryColor: "#6366f1", borderColor: "#e5e7eb", bgColor: "#ffffff", surfaceColor: "#ffffff", textColor: "#111827" },
    dark: { primaryColor: "#818cf8", borderColor: "#2e2e3a", bgColor: "#0f0f14", surfaceColor: "#18181f", textColor: "#f3f4f6" },
    shared: { borderRadius: 8, fontScale: 1, spacingScale: 1, fontFamily: "Inter" },
  },
  {
    name: "Enterprise",
    description: "Conservative, compact, professional",
    light: { primaryColor: "#2563EB", borderColor: "#D4D4D8", bgColor: "#F9FAFB", surfaceColor: "#ffffff", textColor: "#111827" },
    dark: { primaryColor: "#60A5FA", borderColor: "#2a2d35", bgColor: "#0c0e14", surfaceColor: "#14161e", textColor: "#f3f4f6" },
    shared: { borderRadius: 4, fontScale: 0.95, spacingScale: 0.85, fontFamily: "IBM Plex Sans" },
  },
  {
    name: "Playful",
    description: "Bold colors, soft shapes, roomy",
    light: { primaryColor: "#F43F5E", borderColor: "#FDE68A", bgColor: "#FFFBEB", surfaceColor: "#ffffff", textColor: "#111827" },
    dark: { primaryColor: "#FB7185", borderColor: "#3d3222", bgColor: "#141008", surfaceColor: "#1c1710", textColor: "#f3f4f6" },
    shared: { borderRadius: 16, fontScale: 1.05, spacingScale: 1.15, fontFamily: "Nunito" },
  },
];

export type DimensionOption = { label: string; light: Partial<PlaygroundState>; dark: Partial<PlaygroundState> };

export function resolveDimension(opt: DimensionOption, theme: "light" | "dark"): Partial<PlaygroundState> {
  return theme === "dark" ? opt.dark : opt.light;
}

export const PALETTE_OPTIONS: DimensionOption[] = [
  { label: "Indigo",   light: { primaryColor: "#6366f1", bgColor: "#ffffff", surfaceColor: "#ffffff", borderColor: "#e5e7eb" },   dark: { primaryColor: "#818cf8", bgColor: "#0f0f14", surfaceColor: "#18181f", borderColor: "#2e2e3a" } },
  { label: "Ocean",    light: { primaryColor: "#0EA5E9", bgColor: "#F0F9FF", surfaceColor: "#ffffff", borderColor: "#BAE6FD" },   dark: { primaryColor: "#38BDF8", bgColor: "#0a1520", surfaceColor: "#0f1c2a", borderColor: "#1a3a52" } },
  { label: "Forest",   light: { primaryColor: "#16A34A", bgColor: "#F0FDF4", surfaceColor: "#ffffff", borderColor: "#BBF7D0" },   dark: { primaryColor: "#4ADE80", bgColor: "#0a1510", surfaceColor: "#0f1c16", borderColor: "#1a3a28" } },
  { label: "Sunset",   light: { primaryColor: "#F97316", bgColor: "#FFFBEB", surfaceColor: "#ffffff", borderColor: "#FED7AA" },   dark: { primaryColor: "#FB923C", bgColor: "#14100a", surfaceColor: "#1c1710", borderColor: "#3d2e1a" } },
  { label: "Lavender", light: { primaryColor: "#8B5CF6", bgColor: "#F5F3FF", surfaceColor: "#ffffff", borderColor: "#DDD6FE" },   dark: { primaryColor: "#A78BFA", bgColor: "#100e1a", surfaceColor: "#171422", borderColor: "#2e2848" } },
  { label: "Slate",    light: { primaryColor: "#475569", bgColor: "#F8FAFC", surfaceColor: "#ffffff", borderColor: "#CBD5E1" },   dark: { primaryColor: "#94A3B8", bgColor: "#0c0e12", surfaceColor: "#14161c", borderColor: "#2a2e38" } },
  { label: "Coral",    light: { primaryColor: "#e8624a", bgColor: "#FFF5F3", surfaceColor: "#ffffff", borderColor: "#FECACA" },   dark: { primaryColor: "#F87171", bgColor: "#140a0a", surfaceColor: "#1c1210", borderColor: "#3d1a1a" } },
  { label: "Teal",     light: { primaryColor: "#0d9488", bgColor: "#F0FDFA", surfaceColor: "#ffffff", borderColor: "#99F6E4" },   dark: { primaryColor: "#2DD4BF", bgColor: "#0a1514", surfaceColor: "#0f1c1a", borderColor: "#1a3a36" } },
  { label: "Amber",    light: { primaryColor: "#d97706", bgColor: "#FFFBEB", surfaceColor: "#ffffff", borderColor: "#FDE68A" },   dark: { primaryColor: "#FBBF24", bgColor: "#14100a", surfaceColor: "#1c1710", borderColor: "#3d2e1a" } },
  { label: "Sage",     light: { primaryColor: "#5f8c6e", bgColor: "#F0FDF4", surfaceColor: "#ffffff", borderColor: "#BBF7D0" },   dark: { primaryColor: "#86EFAC", bgColor: "#0a140e", surfaceColor: "#0f1c14", borderColor: "#1a3a24" } },
];

export const SHAPE_OPTIONS: DimensionOption[] = [
  { label: "Sharp", light: { borderRadius: 2 }, dark: { borderRadius: 2 } },
  { label: "Rounded", light: { borderRadius: 8 }, dark: { borderRadius: 8 } },
  { label: "Pill", light: { borderRadius: 20 }, dark: { borderRadius: 20 } },
];

export const DENSITY_OPTIONS: DimensionOption[] = [
  { label: "Compact", light: { spacingScale: 0.8 }, dark: { spacingScale: 0.8 } },
  { label: "Default", light: { spacingScale: 1 }, dark: { spacingScale: 1 } },
  { label: "Comfortable", light: { spacingScale: 1.2 }, dark: { spacingScale: 1.2 } },
];

export const FONT_SCALE_OPTIONS: DimensionOption[] = [
  { label: "Small", light: { fontScale: 0.9 }, dark: { fontScale: 0.9 } },
  { label: "Default", light: { fontScale: 1 }, dark: { fontScale: 1 } },
  { label: "Large", light: { fontScale: 1.1 }, dark: { fontScale: 1.1 } },
];

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
    const anchorLines = [
      `    bgBase:         "${state.bgColor}",`,
      `    surface:        "${state.surfaceColor}",`,
      `    borderDefault:  "${adjustBorderForTheme(state.borderColor, state.theme)}",`,
      ...(state.textColor !== d.textColor ? [`    textPrimary:    "${state.textColor}",`] : []),
      `    accentDefault:  "${state.primaryColor}",`,
      `    successDefault: "#16a34a",`,
      `    warningDefault: "#d97706",`,
      `    dangerDefault:  "#dc2626",`,
      `    infoDefault:    "#2563eb",`,
    ];
    lines = [
      `import { LucentProvider } from 'lucent-ui';`,
      ``,
      `<LucentProvider`,
      `  theme="${state.theme}"`,
      `  anchors={{`,
      ...anchorLines,
      `  }}`,
      `>`,
      `  {/* your app */}`,
      `</LucentProvider>`,
      ``,
      `/*`,
      ` * anchors mode: all variant tokens are auto-derived from these`,
      ` * colors — hover/active/subtle states, WCAG-compliant textOnAccent,`,
      ` * surface elevations, and status tints. textPrimary is optional`,
      ` * and defaults to neutral gray.`,
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

function DimensionPicker({
  label,
  options,
  state,
  onChange,
  shell,
}: {
  label: string;
  options: DimensionOption[];
  state: PlaygroundState;
  onChange: (s: PlaygroundState) => void;
  shell: ShellColors;
}) {
  const activeValue = options.find((opt) => {
    const patch = resolveDimension(opt, state.theme);
    return Object.entries(patch).every(
      ([k, v]) => state[k as keyof PlaygroundState] === v,
    );
  })?.label ?? options[0].label;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label shell={shell}>{label}</Label>
      <SegmentedControl
        size="sm"
        value={activeValue}
        onChange={(val) => {
          const opt = options.find((o) => o.label === val);
          if (opt) onChange({ ...state, ...resolveDimension(opt, state.theme) });
        }}
        options={options.map((o) => ({ value: o.label, label: o.label }))}
      />
    </div>
  );
}

function PresetCard({
  preset,
  shell,
  theme,
  onSelect,
}: {
  preset: PresetDefinition;
  shell: ShellColors;
  theme: "light" | "dark";
  onSelect: () => void;
}) {
  const s = resolvePreset(preset, theme);
  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: 12,
        background: "transparent",
        border: `1px solid ${shell.border}`,
        borderRadius: 10,
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = s.primaryColor + "60";
        e.currentTarget.style.background = s.primaryColor + "08";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = shell.border;
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: shell.text, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {preset.name}
      </span>
      <span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.3 }}>
        {preset.description}
      </span>
    </button>
  );
}

export function PlaygroundPanel({ state, onChange, shell, showCodeTab = false }: Props) {
  const set = (patch: Partial<PlaygroundState>) => onChange({ ...state, ...patch });
  useGoogleFont(state.fontFamily);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"presets" | "customize">("presets");
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const code = generateCode(state);

  const presetsContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px" }}>
      <Label shell={shell}>Presets</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {COMBINED_PRESETS.map((p) => (
          <PresetCard
            key={p.name}
            preset={p}
            shell={shell}
            theme={state.theme}
            onSelect={() => onChange({ ...state, ...resolvePreset(p, state.theme) })}
          />
        ))}
      </div>

      <div style={{ height: 1, background: shell.border, margin: "4px 0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Label shell={shell}>Palette</Label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PALETTE_OPTIONS.map((opt) => {
            const colors = resolveDimension(opt, state.theme);
            const active = Object.entries(colors).every(
              ([k, v]) => state[k as keyof PlaygroundState] === v,
            );
            return (
              <button
                key={opt.label}
                onClick={() => onChange({ ...state, ...colors })}
                title={opt.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: 0,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <ColorSwatch
                  color={colors.primaryColor as string}
                  size="md"
                  selected={active}
                />
                <span style={{
                  fontSize: 9,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  color: active ? state.primaryColor : shell.muted,
                  fontWeight: active ? 600 : 400,
                }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <DimensionPicker label="Shape" options={SHAPE_OPTIONS} state={state} onChange={onChange} shell={shell} />
      <div style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--lucent-space-1" as any]: `${0.25 * state.spacingScale}rem`,
        ["--lucent-space-2" as any]: `${0.5 * state.spacingScale}rem`,
        ["--lucent-space-3" as any]: `${0.75 * state.spacingScale}rem`,
        ["--lucent-space-4" as any]: `${1 * state.spacingScale}rem`,
        ["--lucent-font-size-xs" as any]: `${0.75 * state.fontScale}rem`,
        ["--lucent-font-size-sm" as any]: `${0.875 * state.fontScale}rem`,
        ["--lucent-font-size-md" as any]: `${1 * state.fontScale}rem`,
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
        transition: "all 0.2s ease",
      }}>
        <DimensionPicker label="Density" options={DENSITY_OPTIONS} state={state} onChange={onChange} shell={shell} />
        <DimensionPicker label="Font Scale" options={FONT_SCALE_OPTIONS} state={state} onChange={onChange} shell={shell} />
      </div>

      <button
        onClick={() => setView("customize")}
        style={{
          marginTop: 4,
          padding: "7px 0",
          background: "transparent",
          border: `1px solid ${shell.border}`,
          borderRadius: 6,
          color: shell.muted,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 11,
          cursor: "pointer",
        }}
      >
        Customize →
      </button>
    </div>
  );

  const customizeContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px" }}>
      <button
        onClick={() => setView("presets")}
        style={{
          alignSelf: "flex-start",
          padding: 0,
          background: "transparent",
          border: "none",
          color: shell.muted,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 11,
          cursor: "pointer",
        }}
      >
        ← Presets
      </button>
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

  const activeContent = view === "presets" ? presetsContent : customizeContent;

  const codeContent = (
    <div style={{ padding: "0 12px 20px" }}>
      <CodeBlock code={code} />
    </div>
  );

  if (!showCodeTab) return activeContent;

  return (
    <Tabs
      defaultValue="customize"
      style={{ paddingTop: 4 }}
      tabs={[
        { value: "customize", label: "Customize", content: activeContent },
        { value: "code", label: "Code", content: codeContent },
      ]}
    />
  );
}

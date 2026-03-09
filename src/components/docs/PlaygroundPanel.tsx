"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Tabs, Select, Slider, CodeBlock } from "lucent-ui";
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

const ACCENT_PALETTE = [
  // Core primaries
  "#003366", "#4169E1", "#708090", "#34282C", "#FFFFFF", "#F0F0F0", "#60A5FA", "#22543D",
  // Earth & nature
  "#A47551", "#C05621", "#9DB2BF", "#00A86B", "#BD9B83", "#E1B382", "#4A6741", "#E97451",
  // High-conversion accents
  "#FF6B35", "#FF00FF", "#E53E3E", "#39FF14", "#FBBF24", "#2563EB", "#06B6D4", "#F87171",
  // Jewel tones
  "#4B0082", "#800020", "#065F46", "#0F172A", "#9966CC", "#D4AF37", "#1E293B", "#0D9488",
  // Pastel & muted
  "#D1FAE5", "#FDA4AF", "#E9D5FF", "#BFDBFE", "#FFBE98", "#FEF3C7", "#E2E8F0", "#D4E157",
] as const;

const BORDER_PALETTE = [
  // Invisible neutrals (layout & dividers)
  "#F1F5F9", "#E2E8F0", "#D4D4D8", "#E7E5E4", "#F8F9FA", "#C0C0C0", "#EBEBEB", "#F5F5F5",
  // Dark mode depth (#2B3040 ≈ rgba(255,255,255,0.1) on dark)
  "#1E293B", "#2D3748", "#2B3040", "#312E81", "#0F172A", "#2A2E37", "#3F3F46", "#050505",
  // Feedback / utility
  "#10B981", "#EF4444", "#F59E0B", "#3B82F6", "#8B5CF6", "#94A3B8", "#D1FAE5", "#F43F5E",
  // Trendy accent borders
  "#A855F7", "#22D3EE", "#FDE047", "#FB7185", "#84CC16", "#5EEAD4", "#DDD6FE", "#F97316",
  // Earthy / human-centric
  "#F5F5DC", "#A3B18A", "#8D99AE", "#D6D3D1", "#6B705C", "#FFEDD5", "#93C5FD", "#57534E",
] as const;

const BG_PALETTE = [
  // Light canvas
  "#FFFFFF", "#F9FAFB", "#F8FAFC", "#F5F5F4", "#FAFAF9", "#F0F4F8", "#FFF8F0", "#F0FFF4",
  // Warm & tinted whites
  "#FFFBEB", "#FFF1F2", "#F0F9FF", "#F5F3FF", "#ECFDF5", "#FDF4FF", "#FFFDE7", "#F0FDFA",
  // Dark canvas
  "#0A0A0A", "#0F0F11", "#101114", "#111218", "#0D1117", "#11141A", "#0F1923", "#13111A",
  // Mid-dark
  "#18181B", "#1A1A2E", "#1C1917", "#162032", "#1B1D22", "#191C21", "#1E1E2E", "#1A1625",
] as const;

const TEXT_PALETTE = [
  // Near-black (light mode)
  "#111827", "#0F172A", "#18181B", "#1C1917", "#0A0A0A", "#1A1A2E", "#1E293B", "#27272A",
  // Dark gray
  "#374151", "#3F3F46", "#44403C", "#334155", "#404040", "#52525B", "#57534E", "#475569",
  // Near-white (dark mode)
  "#F9FAFB", "#E6EBF4", "#F4F4F5", "#F5F5F4", "#E2E8F0", "#EDEDED", "#D4D4D8", "#CBD5E1",
  // Warm & cool tints
  "#E8E8F0", "#F0EDE8", "#E0E7FF", "#D1FAE5", "#F3E8FF", "#E0F2FE", "#FEF9C3", "#FFE4E6",
] as const;

const DROPDOWN_W = 226;

function ColorPicker({ value, onChange, shell, palette = ACCENT_PALETTE }: { value: string; onChange: (hex: string) => void; shell: ShellColors; palette?: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(value);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setHexInput(value); }, [value]);

  const openDropdown = () => {
    if (buttonRef.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: Math.max(8, r.right - DROPDOWN_W) });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      // close if click is outside the portal dropdown (identified by data attr)
      const dropdown = document.querySelector("[data-lucent-colorpicker]");
      if (!dropdown?.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const commitHex = (raw: string) => {
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9a-f]{6}$/i.test(v)) { onChange(v); setHexInput(v); }
    else setHexInput(value);
  };

  const dropdown = open ? (
    <div
      data-lucent-colorpicker
      style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999, background: shell.bg, border: `1px solid ${shell.border}`, borderRadius: 10, padding: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", width: DROPDOWN_W }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}>
        {palette.map((color) => (
          <button
            key={color}
            onClick={() => { onChange(color); setHexInput(color); setOpen(false); }}
            style={{
              width: 22, height: 22, borderRadius: 5, background: color, padding: 0, cursor: "pointer",
              border: color.toLowerCase() === value.toLowerCase() ? `2px solid ${shell.text}` : `1.5px solid ${shell.border}`,
              outline: color.toLowerCase() === value.toLowerCase() ? `2px solid ${shell.bg}` : "none",
              outlineOffset: -4,
            }}
          />
        ))}
      </div>
      <input
        type="text"
        value={hexInput}
        onChange={(e) => setHexInput(e.target.value)}
        onBlur={(e) => commitHex(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") commitHex((e.target as HTMLInputElement).value); }}
        maxLength={7}
        placeholder="#000000"
        style={{ marginTop: 8, width: "100%", padding: "4px 7px", borderRadius: 5, border: `1px solid ${shell.border}`, background: "transparent", color: shell.text, fontFamily: "monospace", fontSize: 12, boxSizing: "border-box", outline: "none" }}
      />
    </div>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={openDropdown}
        style={{ width: 28, height: 28, borderRadius: 6, background: value, border: `2px solid ${shell.border}`, cursor: "pointer", padding: 0, flexShrink: 0 }}
        title="Pick colour"
      />
      {typeof document !== "undefined" && createPortal(dropdown, document.body)}
    </>
  );
}

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
        <ColorPicker value={state.primaryColor} onChange={(hex) => set({ primaryColor: hex })} shell={shell} />
      </Row>
      <Row>
        <Label shell={shell}>Border</Label>
        <ColorPicker value={state.borderColor} onChange={(hex) => set({ borderColor: hex })} shell={shell} palette={BORDER_PALETTE} />
      </Row>
      <Row>
        <Label shell={shell}>Background</Label>
        <ColorPicker value={state.bgColor} onChange={(hex) => set({ bgColor: hex })} shell={shell} palette={BG_PALETTE} />
      </Row>
      <Row>
        <Label shell={shell}>Surface</Label>
        <ColorPicker value={state.surfaceColor} onChange={(hex) => set({ surfaceColor: hex })} shell={shell} palette={BG_PALETTE} />
      </Row>
      <Row>
        <Label shell={shell}>Text</Label>
        <ColorPicker value={state.textColor} onChange={(hex) => set({ textColor: hex })} shell={shell} palette={TEXT_PALETTE} />
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

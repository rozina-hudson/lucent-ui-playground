import { useEffect } from "react";
import type { ShellColors } from "@/lib/shellColors";

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

export function PlaygroundPanel({ state, onChange, shell }: Props) {
  const set = (patch: Partial<PlaygroundState>) => onChange({ ...state, ...patch });
  useGoogleFont(state.fontFamily);

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

  return (
    <div style={{ paddingBottom: 20 }}>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px 20px" }}>
        {/* Primary colour */}
        <Row>
          <Label shell={shell}>Accent</Label>
          <input
            type="color"
            value={state.primaryColor}
            onChange={(e) => set({ primaryColor: e.target.value })}
            style={colorInputStyle}
            title="Primary accent colour"
          />
        </Row>

        {/* Border colour */}
        <Row>
          <Label shell={shell}>Border</Label>
          <input
            type="color"
            value={state.borderColor}
            onChange={(e) => set({ borderColor: e.target.value })}
            style={colorInputStyle}
            title="Border colour"
          />
        </Row>

        {/* Font family */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label shell={shell}>Font</Label>
          <select
            value={state.fontFamily}
            onChange={(e) => set({ fontFamily: e.target.value })}
            style={{
              width: "100%",
              padding: "5px 8px",
              background: shell.surface,
              border: `1px solid ${shell.border}`,
              borderRadius: 6,
              color: shell.text,
              fontSize: 12,
              fontFamily: "var(--font-dm-sans), sans-serif",
              cursor: "pointer",
            }}
          >
            {PLAYGROUND_FONTS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Border radius */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Row>
            <Label shell={shell}>Radius</Label>
            <span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.borderRadius}px</span>
          </Row>
          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={state.borderRadius}
            onChange={(e) => set({ borderRadius: Number(e.target.value) })}
            style={sliderStyle}
          />
        </div>

        {/* Font scale */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Row>
            <Label shell={shell}>Font scale</Label>
            <span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.fontScale}×</span>
          </Row>
          <input
            type="range"
            min={0.75}
            max={1.5}
            step={0.05}
            value={state.fontScale}
            onChange={(e) => set({ fontScale: Number(e.target.value) })}
            style={sliderStyle}
          />
        </div>

        {/* Spacing scale */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Row>
            <Label shell={shell}>Padding / Gap</Label>
            <span style={{ fontSize: 11, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>{state.spacingScale}×</span>
          </Row>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={state.spacingScale}
            onChange={(e) => set({ spacingScale: Number(e.target.value) })}
            style={sliderStyle}
          />
        </div>

        {/* Reset */}
        <button
          onClick={() =>
            onChange({
              theme: "light",
              primaryColor: "#6366f1",
              borderColor: "#e5e7eb",
              borderRadius: 8,
              fontScale: 1,
              spacingScale: 1,
              fontFamily: "Inter",
            })
          }
          style={{
            marginTop: 4,
            padding: "5px 0",
            background: "transparent",
            border: `1px solid ${shell.border}`,
            borderRadius: 6,
            color: shell.muted,
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          Reset defaults
        </button>
      </div>
    </div>
  );
}

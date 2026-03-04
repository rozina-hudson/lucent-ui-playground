import type { Theme } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";

export type PlaygroundState = {
  theme: Theme;
  primaryColor: string;
  borderColor: string;
  borderRadius: number;
  fontScale: number;
  spacingScale: number;
};

export const defaultPlaygroundState: PlaygroundState = {
  theme: "light",
  primaryColor: "#6366f1",
  borderColor: "#e5e7eb",
  fontScale: 1,
  borderRadius: 8,
  spacingScale: 1,
};

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
      <p style={sectionHead}>Appearance</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 20px" }}>
        {/* Theme */}
        <Row>
          <Label shell={shell}>Theme</Label>
          <div style={{ display: "flex", gap: 4 }}>
            {(["light", "dark"] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => set({ theme: t })}
                style={{
                  padding: "3px 9px",
                  borderRadius: 5,
                  border: `1px solid ${state.theme === t ? shell.gold : shell.border}`,
                  background: state.theme === t ? shell.goldBg : "transparent",
                  color: state.theme === t ? shell.gold : shell.muted,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: 11,
                  fontWeight: state.theme === t ? 600 : 400,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </Row>

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
            <Label shell={shell}>Spacing</Label>
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

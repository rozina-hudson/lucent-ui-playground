"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LucentProvider,
  lightTokens,
  darkTokens,
  Avatar,
  Text,
  Badge,
  Button,
  Divider,
  Tag,
  Tooltip,
  SegmentedControl,
  ColorSwatch,
} from "lucent-ui";
import { getShell, type ShellColors } from "@/lib/shellColors";
import {
  defaultPlaygroundState,
  type PlaygroundState,
  COMBINED_PRESETS,
  PALETTE_OPTIONS,
  SHAPE_OPTIONS,
  DENSITY_OPTIONS,
  resolvePreset,
  resolveDimension,
  type DimensionOption,
  type PresetDefinition,
} from "@/components/docs/PlaygroundPanel";

const T = "all 180ms ease";

// ─── Shadow options ────────────────────────────────────────────────────────────

type ShadowLevel = "none" | "subtle" | "medium" | "dramatic";

// Shadow level bundled with each preset
const PRESET_SHADOWS: Record<string, ShadowLevel> = {
  Modern: "subtle",
  Enterprise: "none",
  Playful: "medium",
};
const SHADOW_VALUES: Record<ShadowLevel, Record<"light" | "dark", string>> = {
  none:     { light: "none", dark: "none" },
  subtle:   { light: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)", dark: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)" },
  medium:   { light: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)", dark: "0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.25)" },
  dramatic: { light: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)", dark: "0 12px 40px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)" },
};

// ─── Profile card ──────────────────────────────────────────────────────────────

function ProfileCard({ shadow, theme }: { shadow: ShadowLevel; theme: "light" | "dark" }) {
  return (
    <div
      style={{
        background: "var(--lucent-surface)",
        border: "1px solid var(--lucent-border-default)",
        borderRadius: "var(--lucent-radius-lg)",
        padding: "var(--lucent-space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--lucent-space-4)",
        maxWidth: 380,
        width: "100%",
        boxShadow: SHADOW_VALUES[shadow][theme],
        transition: T,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-4)", transition: T }}>
        <Avatar alt="Elena Vasquez" src="https://i.pravatar.cc/150?img=32" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-2)" }}>
            <Text size="lg" weight="semibold">Elena Vasquez</Text>
            <Badge variant="success" size="sm" dot>Pro</Badge>
          </div>
          <Text size="sm" color="secondary">Staff Engineer @ Vercel</Text>
        </div>
      </div>

      {/* Bio */}
      <Text size="sm" color="secondary" lineHeight="relaxed" style={{ transition: T }}>
        Building design systems that scale. Open-source contributor,
        TypeScript enthusiast, and occasional writer.
      </Text>

      {/* Tags */}
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", flexWrap: "wrap", transition: T }}>
        <Tag variant="neutral" size="sm">Design Systems</Tag>
        <Tag variant="neutral" size="sm">TypeScript</Tag>
        <Tag variant="neutral" size="sm">React</Tag>
        <Tag variant="neutral" size="sm">Open Source</Tag>
      </div>

      <Divider />

      {/* Stats row */}
      <div style={{ display: "flex", gap: "var(--lucent-space-4)", transition: T }}>
        {[
          { value: "2.4k", label: "Followers" },
          { value: "186", label: "Projects" },
          { value: "99.8%", label: "Uptime" },
        ].map(({ value, label }) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <Text size="xl" weight="bold" style={{ display: "block", lineHeight: 1.2 }}>{value}</Text>
            <Text size="xs" color="secondary">{label}</Text>
          </div>
        ))}
      </div>

      <Divider />

      {/* Activity heatmap */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--lucent-space-2)" }}>
          <Text size="xs" weight="semibold" color="secondary">Activity</Text>
          <div style={{ display: "flex", gap: "var(--lucent-space-2)", alignItems: "center" }}>
            <Badge variant="accent" size="sm">Top 5%</Badge>
            <Text size="xs" color="secondary">Last 8 weeks</Text>
          </div>
        </div>
        <div style={{ display: "flex", gap: 3, transition: T }}>
          {ACTIVITY_DATA.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {week.map((level, di) => (
                <Tooltip key={di} content={`${level} contributions`} delay={0}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "var(--lucent-radius-sm)",
                      background: level === 0
                        ? "var(--lucent-border-default)"
                        : `color-mix(in srgb, var(--lucent-accent-default) ${25 + level * 25}%, transparent)`,
                      transition: T,
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", marginTop: "var(--lucent-space-1)", transition: T }}>
        <Button size="sm" variant="primary" style={{ flex: 1 }}>Follow</Button>
        <Button size="sm" variant="ghost">Message</Button>
      </div>
    </div>
  );
}

const ACTIVITY_DATA = [
  [1, 0, 2, 1, 0, 3, 1],
  [2, 3, 1, 0, 2, 1, 0],
  [0, 1, 3, 2, 1, 0, 2],
  [3, 2, 0, 1, 3, 2, 1],
  [1, 0, 2, 3, 0, 1, 3],
  [2, 1, 1, 0, 2, 3, 0],
  [0, 3, 2, 1, 0, 2, 1],
  [1, 2, 0, 3, 1, 0, 2],
];

// Strip textColor so accent palettes only affect bg/border/accent, not text
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stripText<T extends Record<string, unknown>>({ textColor, ...rest }: T) {
  return rest;
}

// ─── Controls panel ────────────────────────────────────────────────────────────

function PanelLabel({ children, shell }: { children: React.ReactNode; shell: ShellColors }) {
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
      <PanelLabel shell={shell}>{label}</PanelLabel>
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

function ControlsPanel({
  state,
  onChange,
  shell,
  shadow,
  onShadowChange,
}: {
  state: PlaygroundState;
  onChange: (s: PlaygroundState) => void;
  shell: ShellColors;
  shadow: ShadowLevel;
  onShadowChange: (s: ShadowLevel) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}>
      <PanelLabel shell={shell}>Presets</PanelLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {COMBINED_PRESETS.map((p) => (
          <PresetCard
            key={p.name}
            preset={p}
            shell={shell}
            theme={state.theme}
            onSelect={() => {
              onChange({ ...state, ...stripText(resolvePreset(p, state.theme)) });
              onShadowChange(PRESET_SHADOWS[p.name] ?? "subtle");
            }}
          />
        ))}
      </div>

      <div style={{ height: 1, background: shell.border, margin: "4px 0" }} />

      {/* Palette */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <PanelLabel shell={shell}>Palette</PanelLabel>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {PALETTE_OPTIONS.map((opt) => {
            const colors = stripText(resolveDimension(opt, state.theme));
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
      <DimensionPicker label="Density" options={DENSITY_OPTIONS} state={state} onChange={onChange} shell={shell} />

      {/* Shadow */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <PanelLabel shell={shell}>Shadow</PanelLabel>
        <SegmentedControl
          size="sm"
          value={shadow}
          onChange={(val) => onShadowChange(val as ShadowLevel)}
          options={[
            { value: "none", label: "None" },
            { value: "subtle", label: "Subtle" },
            { value: "medium", label: "Medium" },
            { value: "dramatic", label: "Drama" },
          ]}
        />
      </div>

    </div>
  );
}

// ─── Showcase ──────────────────────────────────────────────────────────────────

export function DesignPresetShowcase({ shellTheme }: { shellTheme: "light" | "dark" }) {
  const [pg, setPg] = useState<PlaygroundState>(() => ({
    ...defaultPlaygroundState,
    theme: shellTheme,
  }));
  const [shadow, setShadow] = useState<ShadowLevel>("subtle");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setPg((prev) => {
      const d = defaultPlaygroundState;
      return {
        ...prev,
        theme: shellTheme,
        bgColor: prev.bgColor === d.bgColor ? d.bgColor : prev.bgColor,
        surfaceColor: prev.surfaceColor === d.surfaceColor ? d.surfaceColor : prev.surfaceColor,
        textColor: prev.textColor === d.textColor ? d.textColor : prev.textColor,
        borderColor: prev.borderColor === d.borderColor ? d.borderColor : prev.borderColor,
      };
    });
  }, [shellTheme]);

  const shell = useMemo(() => getShell(shellTheme), [shellTheme]);

  const base = pg.theme === "dark" ? darkTokens : lightTokens;
  const d = defaultPlaygroundState;
  const resolvedBg = pg.bgColor !== d.bgColor ? pg.bgColor : base.bgBase;
  const resolvedSurface = pg.surfaceColor !== d.surfaceColor ? pg.surfaceColor : base.surface;
  const resolvedText = pg.textColor !== d.textColor ? pg.textColor : base.textPrimary;
  const resolvedBorder = pg.borderColor !== d.borderColor ? pg.borderColor : base.borderDefault;
  const anchors = {
    bgBase: resolvedBg,
    surface: resolvedSurface,
    textPrimary: resolvedText,
    successDefault: base.successDefault,
    warningDefault: base.warningDefault,
    dangerDefault: base.dangerDefault,
    infoDefault: base.infoDefault,
    accentDefault: pg.primaryColor,
    borderDefault: resolvedBorder,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = (v: string | number) => v as any;
  const previewStyle: React.CSSProperties = {
    [a("--lucent-font-size-xs")]: `${0.75 * pg.fontScale}rem`,
    [a("--lucent-font-size-sm")]: `${0.875 * pg.fontScale}rem`,
    [a("--lucent-font-size-md")]: `${1 * pg.fontScale}rem`,
    [a("--lucent-font-size-lg")]: `${1.125 * pg.fontScale}rem`,
    [a("--lucent-font-size-xl")]: `${1.25 * pg.fontScale}rem`,
    [a("--lucent-font-size-2xl")]: `${1.5 * pg.fontScale}rem`,
    [a("--lucent-font-size-3xl")]: `${1.875 * pg.fontScale}rem`,
    [a("--lucent-space-1")]: `${0.25 * pg.spacingScale}rem`,
    [a("--lucent-space-2")]: `${0.5 * pg.spacingScale}rem`,
    [a("--lucent-space-3")]: `${0.75 * pg.spacingScale}rem`,
    [a("--lucent-space-4")]: `${1 * pg.spacingScale}rem`,
    [a("--lucent-space-5")]: `${1.25 * pg.spacingScale}rem`,
    [a("--lucent-space-6")]: `${1.5 * pg.spacingScale}rem`,
    [a("--lucent-space-8")]: `${2 * pg.spacingScale}rem`,
    [a("--lucent-space-10")]: `${2.5 * pg.spacingScale}rem`,
    [a("--lucent-radius-sm")]: `${Math.max(0, pg.borderRadius - 4)}px`,
    [a("--lucent-radius-md")]: `${pg.borderRadius}px`,
    [a("--lucent-radius-lg")]: `${pg.borderRadius + 4}px`,
    [a("--lucent-font-family-base")]: `"${pg.fontFamily}", sans-serif`,
    fontFamily: `"${pg.fontFamily}", sans-serif`,
  };

  return (
    <div
      className="mt-24 w-full mx-auto"
      style={{
        maxWidth: 1120,
        padding: "48px 24px",
        position: "relative",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${pg.primaryColor}${shellTheme === "dark" ? "12" : "0a"} 0%, transparent 70%)`,
          pointerEvents: "none",
          transition: T,
        }}
      />

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 48, position: "relative" }}>
        <h2
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: 32,
            fontWeight: 700,
            color: shell.text,
            margin: "0 0 12px",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          Presets. Polished instantly.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: shell.muted,
            margin: 0,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Pick a palette, shape, and density — every token updates in real time.
          Ship a complete design system in minutes, not months.
        </p>
      </div>

      {/* Main layout — 50/50 split, no outer border */}
      <div
        style={{
          display: "flex",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Controls — left 50% */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: 620,
          }}
        >
          <ControlsPanel
            state={pg}
            onChange={setPg}
            shell={shell}
            shadow={shadow}
            onShadowChange={setShadow}
          />
        </div>

        {/* Preview — right 50% */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mounted && (
            <LucentProvider theme={pg.theme} anchors={anchors}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 32px",
                  position: "relative",
                  width: "100%",
                  ...previewStyle,
                }}
              >
                {/* Accent glow behind card */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 340,
                    height: 340,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${pg.primaryColor}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                    transition: T,
                  }}
                />
                <ProfileCard shadow={shadow} theme={pg.theme} />
              </div>
            </LucentProvider>
          )}
        </div>
      </div>
    </div>
  );
}

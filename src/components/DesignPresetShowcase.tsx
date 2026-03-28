"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LucentProvider,
  lightTokens,
  darkTokens,
  Avatar,
  Badge,
  Text,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  MenuSeparator,
  Select,
  Slider,
  Toggle,
  SegmentedControl,
  ColorSwatch,
  ToastProvider,
  useToast,
} from "lucent-ui";
import { getShell, type ShellColors } from "@/lib/shellColors";
import {
  defaultPlaygroundState,
  type PlaygroundState,
  COMBINED_PRESETS,
  DESIGN_PRESETS,
  PALETTE_OPTIONS,
  SHAPE_OPTIONS,
  DENSITY_OPTIONS,
  resolvePreset,
  resolveDimension,
  type PresetDefinition,
} from "@/components/docs/PlaygroundPanel";

const T = "all 180ms ease";

// All presets in one array for the unified picker
const ALL_PRESETS: PresetDefinition[] = [...COMBINED_PRESETS, ...DESIGN_PRESETS];

// Map PlaygroundState values → LucentProvider preset axis names
function pgToShape(radius: number): "sharp" | "rounded" | "pill" {
  if (radius <= 4) return "sharp";
  if (radius >= 16) return "pill";
  return "rounded";
}
function pgToDensity(scale: number): "compact" | "default" | "spacious" {
  if (scale <= 0.85) return "compact";
  if (scale >= 1.15) return "spacious";
  return "default";
}

// ─── Profile card ──────────────────────────────────────────────────────────────

function ProfileCardInner() {
  const { toast } = useToast();
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
        width: "100%",
        boxShadow: "var(--lucent-shadow-md)",
        transition: T,
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-4)", transition: T }}>
        <Avatar alt="Rozina Szogyenyi" src="https://i.pravatar.cc/150?u=szogyenyi.zina@gmail.com" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-2)" }}>
            <Text size="lg" weight="semibold">Rozina Szogyenyi</Text>
            <Chip variant="success" size="sm" dot>Pro</Chip>
          </div>
          <Text size="sm" color="secondary">Staff Product Designer @ Deel</Text>
        </div>
      </div>
      <Text size="sm" color="secondary" lineHeight="relaxed" style={{ transition: T }}>
        Building design systems that scale. Open-source contributor,
        TypeScript enthusiast, and occasional writer.
      </Text>
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", flexWrap: "wrap", transition: T }}>
        <Chip variant="neutral" size="sm">Design Systems</Chip>
        <Chip variant="neutral" size="sm">TypeScript</Chip>
        <Chip variant="neutral" size="sm">React</Chip>
        <Chip variant="neutral" size="sm">Open Source</Chip>
      </div>
      <Divider />
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
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", marginTop: "var(--lucent-space-1)", transition: T }}>
        <Button size="sm" variant="primary" style={{ flex: 1 }} onClick={() => toast({ title: "Following", variant: "success" })}>Follow</Button>
        <Button size="sm" variant="ghost" onClick={() => toast({ title: "Message sent", variant: "info" })}>Message</Button>
      </div>
    </div>
  );
}

// ─── Settings card ────────────────────────────────────────────────────────────

function SettingsCardInner() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState("en");

  return (
    <div
      style={{
        background: "var(--lucent-surface)",
        border: "1px solid var(--lucent-border-default)",
        borderRadius: "var(--lucent-radius-lg)",
        padding: "var(--lucent-space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--lucent-space-3)",
        width: "100%",
        boxShadow: "var(--lucent-shadow-md)",
        transition: T,
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-2)", transition: T }}>
        <Text size="md" weight="semibold" style={{ flex: 1 }}>Preferences</Text>
        <Badge variant="accent" size="sm">v2.4</Badge>
        <Menu trigger={<Button size="2xs" variant="ghost">&#x22EF;</Button>}>
          <MenuItem onSelect={() => {}}>Reset defaults</MenuItem>
          <MenuItem onSelect={() => {}}>Import config</MenuItem>
          <MenuSeparator />
          <MenuItem onSelect={() => {}} danger>Clear all data</MenuItem>
        </Menu>
      </div>
      <Divider />
      <Toggle contained label="Push notifications" helperText="Alerts on your device" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
      <Toggle contained label="Auto-save" helperText="Save changes automatically" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
      <Slider label="Font size" min={12} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} size="sm" showValue />
      <Select size="sm" label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} options={[{ value: "en", label: "English" }, { value: "es", label: "Espa\u00F1ol" }, { value: "fr", label: "Fran\u00E7ais" }, { value: "de", label: "Deutsch" }]} />
      <Divider />
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", transition: T }}>
        <Button size="sm" variant="primary" style={{ flex: 1 }} onClick={() => toast({ title: "Preferences saved", variant: "success" })}>Save changes</Button>
        <Button size="sm" variant="ghost">Reset</Button>
      </div>
    </div>
  );
}

function PreviewCards() {
  return (
    <ToastProvider position="bottom-right" duration={3000}>
      <div style={{ display: "flex", gap: 16, width: "100%" }}>
        <div style={{ flex: 1, minWidth: 0 }}><ProfileCardInner /></div>
        <div style={{ flex: 1, minWidth: 0 }}><SettingsCardInner /></div>
      </div>
    </ToastProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stripText<T extends Record<string, unknown>>({ textColor, ...rest }: T) {
  return rest;
}

// ─── Personality chip ─────────────────────────────────────────────────────────

function PersonalityChip({
  preset,
  theme,
  active,
  onSelect,
  shell,
}: {
  preset: PresetDefinition;
  theme: "light" | "dark";
  active: boolean;
  onSelect: () => void;
  shell: ShellColors;
}) {
  const resolved = resolvePreset(preset, theme);
  const radius = resolved.borderRadius;
  // Map border radius to a shape label
  const chipRadius = radius <= 4 ? 3 : radius >= 16 ? 14 : 8;

  return (
    <button
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px 6px 8px",
        background: active ? resolved.primaryColor + "14" : "transparent",
        border: `1.5px solid ${active ? resolved.primaryColor + "80" : shell.border}`,
        borderRadius: chipRadius,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = resolved.primaryColor + "50";
          e.currentTarget.style.background = resolved.primaryColor + "08";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = shell.border;
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {/* Color dot — shows accent + shape hint */}
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: chipRadius >= 14 ? "50%" : chipRadius >= 8 ? 3 : 1,
          background: resolved.primaryColor,
          flexShrink: 0,
          boxShadow: active ? `0 0 6px ${resolved.primaryColor}60` : "none",
          transition: "all 0.15s",
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: active ? 600 : 500,
          color: active ? resolved.primaryColor : shell.text,
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: "-0.01em",
          transition: "color 0.15s",
        }}
      >
        {preset.name}
      </span>
    </button>
  );
}

// ─── Controls row ───────────────────────────────────────────────────────────

function ControlLabel({ children, shell }: { children: React.ReactNode; shell: ShellColors }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color: shell.subtle, fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function CompactControls({
  state,
  onChange,
  shell,
}: {
  state: PlaygroundState;
  onChange: (s: PlaygroundState) => void;
  shell: ShellColors;
}) {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      {/* Palette */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <ControlLabel shell={shell}>Palette</ControlLabel>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {PALETTE_OPTIONS.map((opt) => {
            const colors = stripText(resolveDimension(opt, state.theme));
            const active = Object.entries(colors).every(
              ([k, v]) => state[k as keyof PlaygroundState] === v,
            );
            return (
              <button
                key={opt.label}
                onClick={() => onChange({ ...state, ...colors, presetName: undefined })}
                title={opt.label}
                style={{ padding: 0, background: "transparent", border: "none", cursor: "pointer" }}
              >
                <ColorSwatch color={colors.primaryColor as string} size="sm" selected={active} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Shape */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <ControlLabel shell={shell}>Shape</ControlLabel>
        <SegmentedControl
          size="sm"
          value={SHAPE_OPTIONS.find((opt) => {
            const patch = resolveDimension(opt, state.theme);
            return Object.entries(patch).every(([k, v]) => state[k as keyof PlaygroundState] === v);
          })?.label ?? "Rounded"}
          onChange={(val) => {
            const opt = SHAPE_OPTIONS.find((o) => o.label === val);
            if (opt) onChange({ ...state, ...resolveDimension(opt, state.theme), presetName: undefined });
          }}
          options={SHAPE_OPTIONS.map((o) => ({ value: o.label, label: o.label }))}
        />
      </div>

      {/* Density */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <ControlLabel shell={shell}>Density</ControlLabel>
        <SegmentedControl
          size="sm"
          value={DENSITY_OPTIONS.find((opt) => {
            const patch = resolveDimension(opt, state.theme);
            return Object.entries(patch).every(([k, v]) => state[k as keyof PlaygroundState] === v);
          })?.label ?? "Default"}
          onChange={(val) => {
            const opt = DENSITY_OPTIONS.find((o) => o.label === val);
            if (opt) onChange({ ...state, ...resolveDimension(opt, state.theme), presetName: undefined });
          }}
          options={DENSITY_OPTIONS.map((o) => ({ value: o.label, label: o.label }))}
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setPg((prev) => {
      const d = defaultPlaygroundState;
      const oldTheme = prev.theme;

      const matchedPalette = PALETTE_OPTIONS.find((opt) => {
        const colors = resolveDimension(opt, oldTheme);
        return Object.entries(colors).every(([k, v]) => prev[k as keyof PlaygroundState] === v);
      });
      if (matchedPalette) return { ...prev, theme: shellTheme, ...resolveDimension(matchedPalette, shellTheme) };

      const matchedPreset = ALL_PRESETS.find((preset) => {
        const resolved = resolvePreset(preset, oldTheme);
        return Object.entries(resolved).every(([k, v]) => prev[k as keyof PlaygroundState] === v);
      });
      if (matchedPreset) return { ...prev, theme: shellTheme, ...resolvePreset(matchedPreset, shellTheme) };

      return { ...prev, theme: shellTheme, borderColor: d.borderColor, bgColor: d.bgColor, surfaceColor: d.surfaceColor, textColor: d.textColor };
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
    bgBase: resolvedBg, surface: resolvedSurface, textPrimary: resolvedText,
    successDefault: base.successDefault, warningDefault: base.warningDefault,
    dangerDefault: base.dangerDefault, infoDefault: base.infoDefault,
    accentDefault: pg.primaryColor, borderDefault: resolvedBorder,
  };

  // Detect which preset is currently active
  const activePresetName = ALL_PRESETS.find((preset) => {
    const resolved = resolvePreset(preset, pg.theme);
    return Object.entries(resolved).every(([k, v]) => pg[k as keyof PlaygroundState] === v);
  })?.name;

  return (
    <div
      className="mt-24 w-full mx-auto"
      style={{ maxWidth: 1120, padding: "48px 24px", position: "relative" }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)", width: 800, height: 500, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${pg.primaryColor}${shellTheme === "dark" ? "12" : "0a"} 0%, transparent 70%)`,
          pointerEvents: "none", transition: T,
        }}
      />

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 40, position: "relative" }}>
        <h2
          style={{
            fontFamily: "var(--font-unbounded)", fontSize: 32, fontWeight: 700,
            color: shell.text, margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.2,
          }}
        >
          Design personalities. One prop.
        </h2>
        <p style={{ fontSize: 15, color: shell.muted, margin: 0, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
          Each preset bundles palette, shape, density, shadow, and typography into a single
          <code style={{ fontSize: 13, padding: "1px 6px", borderRadius: 4, background: shell.codeBg, color: shell.codeText, margin: "0 4px" }}>preset</code>
          prop. Click to preview.
        </p>
      </div>

      {/* ─── Personality chips ─── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          marginBottom: 28,
          position: "relative",
        }}
      >
        {ALL_PRESETS.map((preset) => (
          <PersonalityChip
            key={preset.name}
            preset={preset}
            theme={pg.theme}
            active={activePresetName === preset.name}
            shell={shell}
            onSelect={() => setPg({ ...pg, ...stripText(resolvePreset(preset, pg.theme)) })}
          />
        ))}
      </div>

      {/* ─── Secondary controls ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 32,
          position: "relative",
        }}
      >
        <CompactControls state={pg} onChange={setPg} shell={shell} />
      </div>

      {/* ─── Preview cards ─── */}
      <div
        style={{
          position: "relative",
          maxWidth: 820,
          margin: "0 auto",
        }}
      >
        {/* Accent glow behind cards */}
        <div
          style={{
            position: "absolute", top: "40%", left: "50%",
            transform: "translate(-50%, -50%)", width: 500, height: 500, borderRadius: "50%",
            background: `radial-gradient(circle, ${pg.primaryColor}18 0%, transparent 70%)`,
            pointerEvents: "none", transition: T,
          }}
        />
        {mounted && (() => {
          // Named preset → pass the string directly so LucentProvider applies all axes
          if (pg.presetName) {
            return (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <LucentProvider theme={pg.theme} preset={pg.presetName as any}>
                <div style={{ position: "relative" }}><PreviewCards /></div>
              </LucentProvider>
            );
          }
          // Manual customisation → pass anchors for colors, object preset for shape/density/shadow
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const presetObj: Record<string, any> = {};
          const shape = pgToShape(pg.borderRadius);
          if (shape !== "rounded") presetObj.shape = shape;
          const density = pgToDensity(pg.spacingScale);
          if (density !== "default") presetObj.density = density;
          if (pg.shadowStyle !== "default") presetObj.shadow = pg.shadowStyle;
          const hasPresetAxes = Object.keys(presetObj).length > 0;
          return (
            <LucentProvider theme={pg.theme} anchors={anchors} preset={hasPresetAxes ? presetObj : undefined}>
              <div style={{ position: "relative" }}><PreviewCards /></div>
            </LucentProvider>
          );
        })()}
      </div>
    </div>
  );
}

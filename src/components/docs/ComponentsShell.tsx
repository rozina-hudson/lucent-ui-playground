"use client";

import { memo, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import {
  LucentProvider,
  Badge,
  PageLayout,
  Collapsible,
  NavLink,
  lightTokens,
  darkTokens,
} from "lucent-ui";
import { getShell } from "@/lib/shellColors";
import { usePlayground } from "@/lib/playgroundContext";
import { CATEGORIES, componentRegistry, getComponent, getPrevNext, type ComponentDef } from "@/lib/componentData";
import { BentoGrid } from "@/components/docs/BentoGrid";
import {
  PlaygroundPanel,
  defaultPlaygroundState,
  PALETTE_OPTIONS,
  COMBINED_PRESETS,
  resolveDimension,
  resolvePreset,
  type PlaygroundState,
} from "@/components/docs/PlaygroundPanel";
import { LucentSpinner } from "@/components/brand";

type Shell = ReturnType<typeof getShell>;

const SIDEBAR_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

// ─── Stable sub-components — only re-render on theme/slug/toggle changes ─────

const RESOURCES = [
  { slug: "changelog", label: "Changelog" },
];

const SidebarNav = memo(function SidebarNav({
  shell,
  segment,
}: {
  shell: Shell;
  segment: string | null;
}) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((cat) => [cat.label, true]))
  );

  return (
    <div>
      {/* Resources section */}
      <div style={{ padding: "12px 4px", borderBottom: `1px solid ${shell.border}` }}>
        <div style={{ color: shell.text, ...SIDEBAR_LABEL, padding: "8px 12px 4px" }}>
          Resources
        </div>
        <nav>
          {RESOURCES.map(({ slug, label }) => (
            <NavLink
              key={slug}
              as={Link}
              href={`/components/${slug}`}
              isActive={slug === segment}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {CATEGORIES.map((cat) => (
        <Collapsible
          key={cat.label}
          open={openMap[cat.label]}
          onOpenChange={(v) => setOpenMap((prev) => ({ ...prev, [cat.label]: v }))}
          style={{ padding: "0 4px", borderBottom: `1px solid ${shell.border}` }}
          trigger={
            <div style={{  color: shell.text, ...SIDEBAR_LABEL }}>
              {cat.label}
            </div>
          }
        >
          <div style={{ paddingBottom: 12 }}>
            <nav>
              {cat.slugs.map((slug) => {
                const comp = componentRegistry.find((c) => c.slug === slug);
                return (
                  <NavLink
                    key={slug}
                    as={Link}
                    href={`/components/${slug}`}
                    isActive={slug === segment}
                  >
                    {comp?.name ?? slug}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </Collapsible>
      ))}
    </div>
  );
});


const HeaderContent = memo(function HeaderContent({
  shell,
  bg,
  prev,
  next,
  defName,
  isDark,
  onThemeToggle,
  generateUI,
  onToggleGenerateUI,
  onDismissGenerateUI,
}: {
  shell: Shell;
  bg: string;
  prev: ComponentDef | null;
  next: ComponentDef | null;
  defName: string;
  isDark: boolean;
  onThemeToggle: () => void;
  generateUI: boolean;
  onToggleGenerateUI: () => void;
  onDismissGenerateUI: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "100%", background: bg, gap: 12 }}>
      <Link href="/" style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: 600, fontSize: 13, color: shell.gold, textDecoration: "none", letterSpacing: "-0.01em", flexShrink: 0 }}>
        Lucent UI
      </Link>
      {generateUI ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onDismissGenerateUI}
            style={{ background: "none", border: "none", cursor: "pointer", color: shell.muted, fontSize: 12, fontFamily: "var(--font-dm-sans), sans-serif", display: "flex", alignItems: "center", gap: 4, padding: 0 }}
          >
            ← Back to docs
          </button>
          <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: 12, color: shell.gold, fontWeight: 600 }}>✦ Generated UI</span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {prev
            ? <Link href={`/components/${prev.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>← {prev.name}</Link>
            : <span style={{ width: 60 }} />}
          <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: 12, color: shell.text, fontWeight: 600 }}>{defName}</span>
          {next
            ? <Link href={`/components/${next.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>{next.name} →</Link>
            : <span style={{ width: 60 }} />}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!generateUI && (
          <button
            onClick={onToggleGenerateUI}
            style={{
              background: "none",
              border: `1px solid ${shell.border}`,
              borderRadius: 8,
              padding: "5px 10px",
              cursor: "pointer",
              color: shell.gold,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1,
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            ✦ Generate UI
          </button>
        )}
        <button
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          style={{
            background: "none",
            border: `1px solid ${shell.border}`,
            borderRadius: 8,
            padding: "5px 10px",
            cursor: "pointer",
            color: shell.muted,
            fontSize: 13,
            lineHeight: 1,
            transition: "border-color 0.15s, color 0.15s",
          }}
        >
          {isDark ? "☀︎" : "☽"}
        </button>
        <Badge variant="accent" size="sm">✦ LLM-ready</Badge>
      </div>
    </div>
  );
});

// ─── Main shell ───────────────────────────────────────────────────────────────

export function ComponentsShell({ children }: { children: React.ReactNode }) {
  const { pg, setPg } = usePlayground();
  const [generateUI, setGenerateUI] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  // "idle" | "loading" | "done"
  const [genPhase, setGenPhase] = useState<"idle" | "loading" | "done">("idle");
  const genTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const segment = useSelectedLayoutSegment();
  const def = segment ? getComponent(segment) : null;
  const { prev, next } = segment ? getPrevNext(segment) : { prev: null, next: null };

  // Only recomputes when theme changes, not on every color picker drag
  const shell = useMemo(() => getShell(pg.theme), [pg.theme]);

  const base = pg.theme === "dark" ? darkTokens : lightTokens;
  const d = defaultPlaygroundState;
  // Fall back to the base theme value when the user hasn't explicitly changed
  // these from their light-mode defaults — prevents the dark base bg being
  // overridden with #ffffff when theme switches to dark.
  const resolvedBg      = pg.bgColor      !== d.bgColor      ? pg.bgColor      : base.bgBase;
  const resolvedSurface = pg.surfaceColor !== d.surfaceColor ? pg.surfaceColor : base.surface;
  const resolvedText    = pg.textColor    !== d.textColor    ? pg.textColor    : base.textPrimary;
  const resolvedBorder  = pg.borderColor  !== d.borderColor  ? pg.borderColor  : base.borderDefault;
  const anchors = {
    bgBase:         resolvedBg,
    surface:        resolvedSurface,
    textPrimary:    resolvedText,
    successDefault: base.successDefault,
    warningDefault: base.warningDefault,
    dangerDefault:  base.dangerDefault,
    infoDefault:    base.infoDefault,
    accentDefault:  pg.primaryColor,
    borderDefault:  resolvedBorder,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = (v: string | number) => v as any;
  const previewContainerStyle: React.CSSProperties = {
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
  };

  // Theme-aware toggle: detect active palette/preset and swap to its
  // colors for the new theme instead of resetting to defaults.
  const handleThemeToggle = () => {
    const newTheme = pg.theme === "dark" ? "light" : "dark";
    const d = defaultPlaygroundState;

    // Check if current colors match a palette
    const matchedPalette = PALETTE_OPTIONS.find((opt) => {
      const colors = resolveDimension(opt, pg.theme);
      return Object.entries(colors).every(
        ([k, v]) => pg[k as keyof PlaygroundState] === v,
      );
    });
    if (matchedPalette) {
      setPg({ ...pg, theme: newTheme, ...resolveDimension(matchedPalette, newTheme) });
      return;
    }

    // Check if current state matches a full preset
    const matchedPreset = COMBINED_PRESETS.find((preset) => {
      const resolved = resolvePreset(preset, pg.theme);
      return Object.entries(resolved).every(
        ([k, v]) => pg[k as keyof PlaygroundState] === v,
      );
    });
    if (matchedPreset) {
      setPg({ ...pg, theme: newTheme, ...resolvePreset(matchedPreset, newTheme) });
      return;
    }

    // No match — reset non-primary colors so base theme fallback kicks in
    setPg({
      ...pg,
      theme: newTheme,
      borderColor: d.borderColor,
      bgColor: d.bgColor,
      surfaceColor: d.surfaceColor,
      textColor: d.textColor,
    });
  };

  // Stable callbacks so memoized components don't re-render on pg changes
  const toggleGenerateUI = useCallback(() => {
    setGenerateUI((v) => {
      if (v) return false; // turning off — no animation needed
      // Turning on: start generation sequence
      genTimers.current.forEach(clearTimeout);
      setGenPhase("loading");
      const t1 = setTimeout(() => setGenPhase("done"), 2000);
      const t2 = setTimeout(() => { setGenPhase("idle"); setCustomizerOpen(true); }, 2600);
      genTimers.current = [t1, t2];
      return true;
    });
  }, []);
  const dismissGenerateUI = useCallback(() => {
    genTimers.current.forEach(clearTimeout);
    setGenPhase("idle");
    setGenerateUI(false);
    setCustomizerOpen(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => genTimers.current.forEach(clearTimeout), []);

  // Sync playground CSS custom properties to :root so portaled content
  // (Menu, ColorPicker, CommandPalette) inherits spacing/radius/font overrides
  useEffect(() => {
    const root = document.documentElement;
    const entries = Object.entries(previewContainerStyle).filter(
      ([k]) => typeof k === "string" && k.startsWith("--lucent-"),
    );
    for (const [prop, val] of entries) {
      root.style.setProperty(prop, val as string);
    }
    root.style.setProperty("--lucent-font-family-base", `"${pg.fontFamily}", sans-serif`);
    return () => {
      for (const [prop] of entries) {
        root.style.removeProperty(prop);
      }
      root.style.removeProperty("--lucent-font-family-base");
    };
  }, [previewContainerStyle, pg.fontFamily]);

  // Load the playground font globally
  useEffect(() => {
    const family = pg.fontFamily;
    const id = `gfont-${family.replace(/\s+/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [pg.fontFamily]);

  const sidebar = (
    <div className="hide-scrollbar" style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: resolvedBg }}>
      <SidebarNav shell={shell} segment={segment} />
    </div>
  );

  const rightSidebarContent = generateUI ? (
    <div className="hide-scrollbar" style={{ width: 280, height: "100%", overflowY: "auto", overflowX: "hidden", background: "transparent" }}>
      <PlaygroundPanel state={pg} onChange={setPg} shell={shell} showCodeTab />
    </div>
  ) : undefined;

  const generateUIContent = generateUI && genPhase !== "idle" ? (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: "calc(100vh - 56px)" }}>
      <LucentSpinner size={120} done={genPhase === "done"} />
      <span style={{ fontSize: 13, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {genPhase === "done" ? "Done" : "Generating UI…"}
      </span>
    </div>
  ) : generateUI ? (
    <div style={{ flex: 1, minHeight: "100%", background: resolvedBg }}>
      <BentoGrid previewStyle={previewContainerStyle} />
    </div>
  ) : children;

  return (
    <LucentProvider theme={pg.theme} anchors={anchors}>
      <div className="hide-scrollbar" style={{ ...previewContainerStyle, [a("--lucent-font-family-base")]: `"${pg.fontFamily}", sans-serif`, fontFamily: `"${pg.fontFamily}", sans-serif` }}>
      <PageLayout
        style={{ height: "100vh", background: resolvedBg, color: resolvedText }}
        header={<HeaderContent shell={shell} bg={resolvedBg} prev={prev} next={next} defName={def?.name ?? ""} isDark={pg.theme === "dark"} onThemeToggle={handleThemeToggle} generateUI={generateUI} onToggleGenerateUI={toggleGenerateUI} onDismissGenerateUI={dismissGenerateUI} />}
        sidebar={sidebar}
        headerHeight={56}
        sidebarWidth={generateUI ? 10 : 240}
        rightSidebar={rightSidebarContent}
        rightSidebarWidth={customizerOpen ? 280 : 10}
      >
        {generateUIContent}
      </PageLayout>
      </div>
    </LucentProvider>
  );
}

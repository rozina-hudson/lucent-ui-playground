"use client";

import { memo, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import {
  LucentProvider,
  Badge,
  PageLayout,
  NavMenu,
  lightTokens,
  darkTokens,
} from "lucent-ui";
import dynamic from "next/dynamic";
const LucentDevTools = dynamic(() => import("lucent-ui/devtools").then((m) => m.LucentDevTools), { ssr: false });
import { getShell } from "@/lib/shellColors";
import { usePlayground } from "@/lib/playgroundContext";
import { CATEGORIES, ATOM_SUBGROUPS, MOLECULE_SUBGROUPS, PATTERN_SUBGROUPS, componentRegistry, getComponent, getPrevNext, type ComponentDef } from "@/lib/componentData";
import { BentoGrid } from "@/components/docs/BentoGrid";
import {
  defaultPlaygroundState,
  PALETTE_OPTIONS,
  COMBINED_PRESETS,
  DESIGN_PRESETS,
  resolveDimension,
  resolvePreset,
  type PlaygroundState,
} from "@/components/docs/PlaygroundPanel";
import { LucentSpinner } from "@/components/brand";

type Shell = ReturnType<typeof getShell>;

// ─── Stable sub-components — only re-render on theme/slug/toggle changes ─────

const RESOURCES = [
  { slug: "changelog", label: "Changelog" },
];

const SidebarNav = memo(function SidebarNav({
  segment,
}: {
  segment: string | null;
}) {
  return (
    <NavMenu aria-label="Component navigation" size="sm" style={{ padding: "8px 8px" }}>
      {/* Resources */}
      {RESOURCES.map(({ slug, label }) => (
        <NavMenu.Item
          key={slug}
          as={Link}
          href={`/components/${slug}`}
          isActive={slug === segment}
        >
          {label}
        </NavMenu.Item>
      ))}

      <NavMenu.Separator />

      {/* Atoms — sub-nav groups */}
      <NavMenu.Group label="Atoms" defaultOpen>
        {ATOM_SUBGROUPS.map((sub) => {
          const hasActiveChild = sub.slugs.includes(segment ?? "");
          return (
            <NavMenu.Item key={sub.label} isActive={hasActiveChild}>
              {sub.label}
              <NavMenu.Sub>
                {sub.slugs.map((slug) => {
                  const comp = componentRegistry.find((c) => c.slug === slug);
                  return (
                    <NavMenu.Item
                      key={slug}
                      as={Link}
                      href={`/components/${slug}`}
                      isActive={slug === segment}
                    >
                      {comp?.name ?? slug}
                    </NavMenu.Item>
                  );
                })}
              </NavMenu.Sub>
            </NavMenu.Item>
          );
        })}
      </NavMenu.Group>

      {/* Molecules — flat list + sub-grouped filters */}
      <NavMenu.Group label="Molecules" defaultOpen>
        {CATEGORIES.find((c) => c.label === "Molecules")!.slugs
          .filter((slug) => !MOLECULE_SUBGROUPS.some((sub) => sub.slugs.includes(slug)))
          .map((slug) => {
            const comp = componentRegistry.find((c) => c.slug === slug);
            return (
              <NavMenu.Item
                key={slug}
                as={Link}
                href={`/components/${slug}`}
                isActive={slug === segment}
              >
                {comp?.name ?? slug}
              </NavMenu.Item>
            );
          })}
        {MOLECULE_SUBGROUPS.map((sub) => {
          const hasActiveChild = sub.slugs.includes(segment ?? "");
          return (
            <NavMenu.Item key={sub.label} isActive={hasActiveChild}>
              {sub.label}
              <NavMenu.Sub>
                {sub.slugs.map((slug) => {
                  const comp = componentRegistry.find((c) => c.slug === slug);
                  return (
                    <NavMenu.Item
                      key={slug}
                      as={Link}
                      href={`/components/${slug}`}
                      isActive={slug === segment}
                    >
                      {comp?.name ?? slug}
                    </NavMenu.Item>
                  );
                })}
              </NavMenu.Sub>
            </NavMenu.Item>
          );
        })}
      </NavMenu.Group>

      {/* Patterns — sub-nav groups */}
      <NavMenu.Group label="Patterns" defaultOpen>
        {PATTERN_SUBGROUPS.map((sub) => {
          const hasActiveChild = sub.slugs.includes(segment ?? "");
          return (
            <NavMenu.Item key={sub.label} isActive={hasActiveChild}>
              {sub.label}
              <NavMenu.Sub>
                {sub.slugs.map((slug) => {
                  const comp = componentRegistry.find((c) => c.slug === slug);
                  return (
                    <NavMenu.Item
                      key={slug}
                      as={Link}
                      href={`/components/${slug}`}
                      isActive={slug === segment}
                    >
                      {comp?.name ?? slug}
                    </NavMenu.Item>
                  );
                })}
              </NavMenu.Sub>
            </NavMenu.Item>
          );
        })}
      </NavMenu.Group>
    </NavMenu>
  );
});


const HeaderContent = memo(function HeaderContent({
  shell,
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "100%", background: "var(--lucent-bg-base)", gap: 12 }}>
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

    // Check if current state matches a full preset (combined + design)
    const allPresets = [...COMBINED_PRESETS, ...DESIGN_PRESETS];
    const matchedPreset = allPresets.find((preset) => {
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
      const t2 = setTimeout(() => { setGenPhase("idle"); }, 2600);
      genTimers.current = [t1, t2];
      return true;
    });
  }, []);
  const dismissGenerateUI = useCallback(() => {
    genTimers.current.forEach(clearTimeout);
    setGenPhase("idle");
    setGenerateUI(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => genTimers.current.forEach(clearTimeout), []);

  const sidebar = (
    <div className="hide-scrollbar" style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: "var(--lucent-bg-base)" }}>
      <SidebarNav segment={segment} />
    </div>
  );

  const generateUIContent = generateUI && genPhase !== "idle" ? (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: "calc(100vh - 56px)" }}>
      <LucentSpinner size={120} done={genPhase === "done"} />
      <span style={{ fontSize: 13, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {genPhase === "done" ? "Done" : "Generating UI…"}
      </span>
    </div>
  ) : generateUI ? (
    <div style={{ flex: 1, minHeight: "100%", background: "var(--lucent-surface)" }}>
      <BentoGrid />
    </div>
  ) : children;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shadowPreset = pg.shadowStyle !== "default" ? { shadow: pg.shadowStyle as any } : undefined;

  return (
    <LucentProvider theme={pg.theme} anchors={anchors} preset={shadowPreset}>
      <LucentDevTools />
      <PageLayout
        style={{ height: "100vh", background: "var(--lucent-bg-base)", color: "var(--lucent-text-primary)" }}
        header={<HeaderContent shell={shell} prev={prev} next={next} defName={def?.name ?? ""} isDark={pg.theme === "dark"} onThemeToggle={handleThemeToggle} generateUI={generateUI} onToggleGenerateUI={toggleGenerateUI} onDismissGenerateUI={dismissGenerateUI} />}
        sidebar={sidebar}
        headerHeight={56}
        sidebarWidth={generateUI ? 10 : 240}
      >
        {generateUIContent}
      </PageLayout>
    </LucentProvider>
  );
}

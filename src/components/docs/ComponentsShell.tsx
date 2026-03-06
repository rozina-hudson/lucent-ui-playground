"use client";

import { memo, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import {
  LucentProvider,
  Badge,
  Button,
  PageLayout,
  Collapsible,
  NavLink,
} from "lucent-ui";
import type { LucentTokens } from "lucent-ui";

import { getShell } from "@/lib/shellColors";
import { deriveAccentTokens } from "@/lib/colorUtils";
import { usePlayground } from "@/lib/playgroundContext";
import { CATEGORIES, componentRegistry, getComponent, getPrevNext, type ComponentDef } from "@/lib/componentData";
import { BentoGrid } from "@/components/docs/BentoGrid";
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

const GenerateUIToggle = memo(function GenerateUIToggle({
  shell,
  active,
  onToggle,
}: {
  shell: Shell;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: `1px solid ${shell.border}` }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: active ? shell.goldBg : "transparent",
          border: "none",
          cursor: "pointer",
          color: active ? shell.gold : shell.text,
          transition: "all 0.15s",
          ...SIDEBAR_LABEL,
        }}
      >
        ✦ Generate UI
        {active && <span style={{ fontSize: 10, color: shell.gold }}>ON</span>}
      </button>
    </div>
  );
});

const HeaderContent = memo(function HeaderContent({
  shell,
  prev,
  next,
  defName,
  isDark,
  onThemeToggle,
}: {
  shell: Shell;
  prev: ComponentDef | null;
  next: ComponentDef | null;
  defName: string;
  isDark: boolean;
  onThemeToggle: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "100%", background: shell.bg, gap: 12 }}>
      <Link href="/" style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: 600, fontSize: 13, color: shell.gold, textDecoration: "none", letterSpacing: "-0.01em", flexShrink: 0 }}>
        Lucent UI
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {prev
          ? <Link href={`/components/${prev.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>← {prev.name}</Link>
          : <span style={{ width: 60 }} />}
        <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: 12, color: shell.text, fontWeight: 600 }}>{defName}</span>
        {next
          ? <Link href={`/components/${next.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>{next.name} →</Link>
          : <span style={{ width: 60 }} />}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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

  const tokenOverrides: Partial<LucentTokens> = {
    ...deriveAccentTokens(pg.primaryColor),
    borderDefault: pg.borderColor,
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

  // Stable callbacks so memoized components don't re-render on pg changes
  const toggleGenerateUI = useCallback(() => {
    setGenerateUI((v) => {
      if (v) return false; // turning off — no animation needed
      // Turning on: start generation sequence
      genTimers.current.forEach(clearTimeout);
      setGenPhase("loading");
      const t1 = setTimeout(() => setGenPhase("done"), 2000);
      const t2 = setTimeout(() => setGenPhase("idle"), 2600);
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
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: shell.bg }}>
      <SidebarNav shell={shell} segment={segment} />
      <GenerateUIToggle shell={shell} active={generateUI} onToggle={toggleGenerateUI} />
    </div>
  );

  return (
    <LucentProvider theme={pg.theme} tokens={tokenOverrides}>
      <PageLayout
        style={{ background: shell.bg, color: shell.text, minHeight: "100vh" }}
        header={<HeaderContent shell={shell} prev={prev} next={next} defName={def?.name ?? ""} isDark={pg.theme === "dark"} onThemeToggle={() => setPg({ ...pg, theme: pg.theme === "dark" ? "light" : "dark" })} />}
        sidebar={sidebar}
        headerHeight={56}
        sidebarWidth={240}
      >
        {generateUI && genPhase !== "idle" ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, minHeight: "calc(100vh - 56px)" }}>
            <LucentSpinner size={120} done={genPhase === "done"} />
            <span style={{ fontSize: 13, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
              {genPhase === "done" ? "Done" : "Generating UI…"}
            </span>
          </div>
        ) : generateUI ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 48px 0" }}>
              <span style={{ fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", flex: 1 }}>
                All components — adjust appearance settings to preview changes across the system
              </span>
              <Button variant="ghost" size="sm" onClick={dismissGenerateUI} style={{ color: shell.muted, borderColor: shell.border }}>
                ← Back to docs
              </Button>
            </div>
            <BentoGrid previewStyle={previewContainerStyle} />
          </div>
        ) : children}
      </PageLayout>
    </LucentProvider>
  );
}

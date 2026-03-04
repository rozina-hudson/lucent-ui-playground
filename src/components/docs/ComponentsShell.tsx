"use client";

import { memo, useMemo, useState, useCallback } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import {
  LucentProvider,
  Badge,
  Button,
  Text,
  PageLayout,
  Collapsible,
} from "lucent-ui";
import type { LucentTokens } from "lucent-ui";

import { getShell } from "@/lib/shellColors";
import { deriveAccentTokens } from "@/lib/colorUtils";
import { usePlayground } from "@/lib/playgroundContext";
import { CATEGORIES, componentRegistry, getComponent, getPrevNext, type ComponentDef } from "@/lib/componentData";
import { PlaygroundPanel } from "@/components/docs/PlaygroundPanel";
import { BentoGrid } from "@/components/docs/BentoGrid";

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
  navOpen,
  onOpenChange,
}: {
  shell: Shell;
  segment: string | null;
  navOpen: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Collapsible
      open={navOpen}
      onOpenChange={onOpenChange}
      style={{ borderBottom: `1px solid ${shell.border}` }}
      trigger={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", color: shell.text, ...SIDEBAR_LABEL }}>
          Components
          <span style={{ color: shell.subtle, fontSize: 10, lineHeight: 1 }}>{navOpen ? "▲" : "▼"}</span>
        </div>
      }
    >
      <div style={{ paddingBottom: 12 }}>
        {CATEGORIES.map((cat) => (
          <div key={cat.label} style={{ marginBottom: 16 }}>
            <Text as="p" size="xs" weight="bold" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: shell.subtle, padding: "0 20px", margin: "0 0 6px" }}>
              {cat.label}
            </Text>
            <nav>
              {cat.slugs.map((slug) => {
                const comp = componentRegistry.find((c) => c.slug === slug);
                const isActive = slug === segment;
                return (
                  <Link
                    key={slug}
                    href={`/components/${slug}`}
                    style={{
                      display: "block",
                      padding: "5px 20px",
                      fontSize: 13,
                      color: isActive ? shell.gold : shell.muted,
                      textDecoration: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? shell.goldBg : "transparent",
                      borderLeft: isActive ? `2px solid ${shell.gold}` : "2px solid transparent",
                    }}
                  >
                    {comp?.name ?? slug}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </Collapsible>
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
}: {
  shell: Shell;
  prev: ComponentDef | null;
  next: ComponentDef | null;
  defName: string;
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
        <Badge variant="accent" size="sm">✦ LLM-ready</Badge>
      </div>
    </div>
  );
});

// ─── Main shell ───────────────────────────────────────────────────────────────

export function ComponentsShell({ children }: { children: React.ReactNode }) {
  const { pg, setPg } = usePlayground();
  const [navOpen, setNavOpen] = useState(true);
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [generateUI, setGenerateUI] = useState(false);

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
  const toggleGenerateUI = useCallback(() => setGenerateUI((v) => !v), []);
  const dismissGenerateUI = useCallback(() => setGenerateUI(false), []);

  const sidebar = (
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: shell.bg }}>
      <SidebarNav shell={shell} segment={segment} navOpen={navOpen} onOpenChange={setNavOpen} />
      <GenerateUIToggle shell={shell} active={generateUI} onToggle={toggleGenerateUI} />
      {/* Appearance panel intentionally not memoized — needs to update with every pg change */}
      <Collapsible
        open={appearanceOpen}
        onOpenChange={setAppearanceOpen}
        trigger={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", color: shell.text, ...SIDEBAR_LABEL }}>
            Appearance
            <span style={{ color: shell.subtle, fontSize: 10, lineHeight: 1 }}>{appearanceOpen ? "▲" : "▼"}</span>
          </div>
        }
      >
        <PlaygroundPanel state={pg} onChange={setPg} shell={shell} />
      </Collapsible>
    </div>
  );

  return (
    <LucentProvider theme={pg.theme} tokens={tokenOverrides}>
      <PageLayout
        style={{ background: shell.bg, color: shell.text, minHeight: "100vh" }}
        header={<HeaderContent shell={shell} prev={prev} next={next} defName={def?.name ?? ""} />}
        sidebar={sidebar}
        headerHeight={56}
        sidebarWidth={240}
      >
        {generateUI ? (
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

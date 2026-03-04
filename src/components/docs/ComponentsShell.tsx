"use client";

import { useState } from "react";
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
import { CATEGORIES, componentRegistry, getComponent, getPrevNext } from "@/lib/componentData";
import { PlaygroundPanel } from "@/components/docs/PlaygroundPanel";
import { BentoGrid } from "@/components/docs/BentoGrid";

export function ComponentsShell({ children }: { children: React.ReactNode }) {
  const { pg, setPg } = usePlayground();
  const [navOpen, setNavOpen] = useState(true);
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [generateUI, setGenerateUI] = useState(false);

  const segment = useSelectedLayoutSegment();
  const def = segment ? getComponent(segment) : null;
  const { prev, next } = segment ? getPrevNext(segment) : { prev: null, next: null };

  const shell = getShell(pg.theme);
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

  const sidebarLabel: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const sidebar = (
    <div style={{ height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", background: shell.bg }}>
      <Collapsible
        open={navOpen}
        onOpenChange={setNavOpen}
        style={{ borderBottom: `1px solid ${shell.border}` }}
        trigger={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", color: shell.text, ...sidebarLabel }}>
            Components
            <span style={{ color: shell.subtle, fontSize: 10, lineHeight: 1 }}>{navOpen ? "▲" : "▼"}</span>
          </div>
        }
      >
        <div style={{ paddingBottom: 12 }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ marginBottom: 16 }}>
              <Text
                as="p"
                size="xs"
                weight="bold"
                style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: shell.subtle, padding: "0 20px", margin: "0 0 6px" }}
              >
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

      <div style={{ borderBottom: `1px solid ${shell.border}` }}>
        <button
          onClick={() => setGenerateUI((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: generateUI ? shell.goldBg : "transparent",
            border: "none",
            cursor: "pointer",
            color: generateUI ? shell.gold : shell.text,
            transition: "all 0.15s",
            ...sidebarLabel,
          }}
        >
          ✦ Generate UI
          {generateUI && <span style={{ fontSize: 10, color: shell.gold }}>ON</span>}
        </button>
      </div>

      <Collapsible
        open={appearanceOpen}
        onOpenChange={setAppearanceOpen}
        trigger={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", color: shell.text, ...sidebarLabel }}>
            Appearance
            <span style={{ color: shell.subtle, fontSize: 10, lineHeight: 1 }}>{appearanceOpen ? "▲" : "▼"}</span>
          </div>
        }
      >
        <PlaygroundPanel state={pg} onChange={setPg} shell={shell} />
      </Collapsible>
    </div>
  );

  const header = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: "100%", background: shell.bg, gap: 12 }}>
      <Link
        href="/"
        style={{ fontFamily: "var(--font-unbounded), sans-serif", fontWeight: 600, fontSize: 13, color: shell.gold, textDecoration: "none", letterSpacing: "-0.01em", flexShrink: 0 }}
      >
        Lucent UI
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {prev ? (
          <Link href={`/components/${prev.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            ← {prev.name}
          </Link>
        ) : <span style={{ width: 60 }} />}
        <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: 12, color: shell.text, fontWeight: 600 }}>
          {def?.name ?? ""}
        </span>
        {next ? (
          <Link href={`/components/${next.slug}`} style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            {next.name} →
          </Link>
        ) : <span style={{ width: 60 }} />}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Badge variant="accent" size="sm">✦ LLM-ready</Badge>
      </div>
    </div>
  );

  return (
    <LucentProvider theme={pg.theme} tokens={tokenOverrides}>
      <PageLayout
        style={{ background: shell.bg, color: shell.text, minHeight: "100vh" }}
        header={header}
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
              <Button variant="ghost" size="sm" onClick={() => setGenerateUI(false)} style={{ color: shell.muted, borderColor: shell.border }}>
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

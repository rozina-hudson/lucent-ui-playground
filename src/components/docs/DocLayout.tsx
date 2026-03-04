"use client";

import { useState } from "react";
import Link from "next/link";
import { LucentProvider, useLucent } from "lucent-ui";
import type { LucentTokens } from "lucent-ui";

import { getShell } from "@/lib/shellColors";
import { deriveAccentTokens } from "@/lib/colorUtils";
import { CATEGORIES, componentRegistry, type ComponentDef } from "@/lib/componentData";
import { componentPreviews } from "@/lib/componentPreviews";
import { PlaygroundPanel, defaultPlaygroundState, type PlaygroundState } from "./PlaygroundPanel";
import { CodeBlock } from "./CodeBlock";
import { InstallTabs } from "./InstallTabs";
import { AiUsageSection } from "./AiUsageSection";
import { ExampleCard } from "./ExampleCard";
import { PropsTable } from "./PropsTable";

type Props = {
  def: ComponentDef;
  prev: ComponentDef | null;
  next: ComponentDef | null;
};

// ─── Root — holds playground state ───────────────────────────────────────────

export function DocLayout({ def, prev, next }: Props) {
  const [pg, setPg] = useState<PlaygroundState>(defaultPlaygroundState);

  const shell = getShell(pg.theme);

  const tokenOverrides: Partial<LucentTokens> = {
    ...deriveAccentTokens(pg.primaryColor),
    borderDefault: pg.borderColor,
  };

  return (
    <LucentProvider theme={pg.theme} tokens={tokenOverrides}>
      <PageShell def={def} prev={prev} next={next} pg={pg} setPg={setPg} shell={shell} />
    </LucentProvider>
  );
}

// ─── Shell wrapper (needs useLucent for tokens) ────────────────────────────

function PageShell({
  def,
  prev,
  next,
  pg,
  setPg,
  shell,
}: Props & {
  pg: PlaygroundState;
  setPg: (s: PlaygroundState) => void;
  shell: ReturnType<typeof getShell>;
}) {
  const { tokens } = useLucent();
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const previewContainerStyle: React.CSSProperties = {
    fontSize: `${pg.fontScale}em`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ["--lucent-radius-sm" as any]: `${Math.max(0, pg.borderRadius - 4)}px`,
    ["--lucent-radius-md" as any]: `${pg.borderRadius}px`,
    ["--lucent-radius-lg" as any]: `${pg.borderRadius + 4}px`,
    ["--spacing-scale" as any]: `${pg.spacingScale}`,
  };

  // First example becomes the top preview
  const firstExample = def.examples[0];
  const TopPreview = firstExample ? componentPreviews[firstExample.previewKey] : null;

  const HEADER_H = 56;
  const SIDEBAR_W = 240;

  return (
    <div style={{ background: shell.bg, color: shell.text, minHeight: "100vh" }}>

      {/* ─── Top nav ─── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: HEADER_H,
          borderBottom: `1px solid ${shell.border}`,
          position: "sticky",
          top: 0,
          background: shell.bg,
          zIndex: 40,
          gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: shell.gold,
            textDecoration: "none",
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          Lucent UI
        </Link>

        {/* Prev / Name / Next */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {prev ? (
            <Link
              href={`/components/${prev.slug}`}
              style={{
                fontSize: 12,
                color: shell.muted,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              ← {prev.name}
            </Link>
          ) : (
            <span style={{ width: 60 }} />
          )}
          <span
            style={{
              fontFamily: "var(--font-unbounded), sans-serif",
              fontSize: 12,
              color: shell.text,
              fontWeight: 600,
            }}
          >
            {def.name}
          </span>
          {next ? (
            <Link
              href={`/components/${next.slug}`}
              style={{
                fontSize: 12,
                color: shell.muted,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {next.name} →
            </Link>
          ) : (
            <span style={{ width: 60 }} />
          )}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              color: shell.gold,
              fontFamily: "var(--font-dm-sans), sans-serif",
              border: `1px solid ${shell.goldBorder}`,
              background: shell.goldBg,
              padding: "3px 8px",
              borderRadius: 5,
              fontWeight: 600,
            }}
          >
            ✦ LLM-ready
          </span>
        </div>
      </header>

      {/* ─── Two-column layout ─── */}
      <div style={{ display: "flex" }}>

        {/* ── Sidebar ── */}
        <aside
          style={{
            width: SIDEBAR_W,
            flexShrink: 0,
            borderRight: `1px solid ${shell.border}`,
            position: "sticky",
            top: HEADER_H,
            height: `calc(100vh - ${HEADER_H}px)`,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navigation */}
          <div style={{ padding: "20px 0", flex: 1 }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.label} style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: shell.subtle,
                    padding: "0 20px",
                    margin: "0 0 6px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {cat.label}
                </p>
                <nav>
                  {cat.slugs.map((slug) => {
                    const comp = componentRegistry.find((c) => c.slug === slug);
                    const isActive = slug === def.slug;
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

          {/* Appearance panel */}
          <div style={{ borderTop: `1px solid ${shell.border}` }}>
            <PlaygroundPanel state={pg} onChange={setPg} shell={shell} />
          </div>
        </aside>

        {/* ── Main content ── */}
        <main
          style={{
            flex: 1,
            padding: "40px 48px",
            maxWidth: 900,
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            <Link href="/" style={{ color: shell.muted, textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/components/button" style={{ color: shell.muted, textDecoration: "none" }}>Components</Link>
            <span>/</span>
            <span style={{ color: shell.text }}>{def.name}</span>
          </div>

          {/* Component header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <h1
                style={{
                  fontFamily: "var(--font-unbounded), sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: shell.text,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {def.name}
              </h1>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: shell.muted,
                  background: shell.surface,
                  border: `1px solid ${shell.border}`,
                  borderRadius: 5,
                  padding: "3px 8px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  textTransform: "lowercase",
                }}
              >
                {def.category === "Atoms" ? "atom" : "molecule"}
              </span>
            </div>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                lineHeight: 1.65,
                color: shell.muted,
                fontFamily: "var(--font-dm-sans), sans-serif",
                maxWidth: 620,
              }}
            >
              {def.description}
            </p>

            {/* Copy import */}
            <CopyImportButton importStatement={def.importStatement} shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* Preview / Code tabs */}
          <SectionTitle shell={shell}>Preview</SectionTitle>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
              {(["preview", "code"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "5px 14px",
                    border: `1px solid ${tab === t ? shell.gold : shell.border}`,
                    borderRadius: 6,
                    background: tab === t ? shell.goldBg : "transparent",
                    color: tab === t ? shell.gold : shell.muted,
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: 12,
                    fontWeight: tab === t ? 600 : 400,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "preview" ? (
              <div
                style={{
                  border: `1px solid ${shell.border}`,
                  borderRadius: 12,
                  background: tokens.bgBase,
                  padding: "32px 28px",
                  minHeight: 120,
                  ...previewContainerStyle,
                }}
              >
                {TopPreview ? <TopPreview /> : null}
              </div>
            ) : (
              <CodeBlock code={firstExample?.code ?? ""} shell={shell} />
            )}
          </div>

          <Divider shell={shell} />

          {/* Installation */}
          <SectionTitle shell={shell}>Installation</SectionTitle>
          <div style={{ marginBottom: 40 }}>
            <InstallTabs shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* Import */}
          <SectionTitle shell={shell}>Import</SectionTitle>
          <div style={{ marginBottom: 40 }}>
            <CodeBlock code={def.importStatement} shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* Usage */}
          <SectionTitle shell={shell}>Usage</SectionTitle>
          <div style={{ marginBottom: 40 }}>
            <CodeBlock code={def.usageCode} shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* AI Usage */}
          <SectionTitle shell={shell}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              AI Usage
              <span style={{ fontSize: 11, color: shell.gold, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 400 }}>✦ Claude · Cursor · VS Code · MCP</span>
            </span>
          </SectionTitle>
          <div style={{ marginBottom: 40 }}>
            <AiUsageSection prompts={def.aiPrompts} shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* Examples */}
          <SectionTitle shell={shell}>Examples</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {def.examples.map((ex) => (
              <ExampleCard
                key={ex.previewKey}
                example={ex}
                previews={componentPreviews}
                shell={shell}
                previewBg={tokens.bgBase}
              />
            ))}
          </div>

          <Divider shell={shell} />

          {/* API Reference */}
          <SectionTitle shell={shell}>API Reference</SectionTitle>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif", marginTop: 0, marginBottom: 16 }}>
              {def.name} props — <span style={{ color: shell.subtle }}>* required</span>
            </p>
            <PropsTable props={def.props} shell={shell} />
          </div>

          {/* Prev / Next footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 24,
              borderTop: `1px solid ${shell.border}`,
            }}
          >
            {prev ? (
              <Link
                href={`/components/${prev.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 11, color: shell.subtle, fontFamily: "var(--font-dm-sans), sans-serif" }}>← Previous</span>
                <span style={{ fontSize: 13, color: shell.text, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>{prev.name}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/components/${next.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 2,
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 11, color: shell.subtle, fontFamily: "var(--font-dm-sans), sans-serif" }}>Next →</span>
                <span style={{ fontSize: 13, color: shell.text, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>{next.name}</span>
              </Link>
            ) : <div />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionTitle({ children, shell }: { children: React.ReactNode; shell: ReturnType<typeof getShell> }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
      <h2
        style={{
          fontFamily: "var(--font-unbounded), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: shell.text,
          margin: 0,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: shell.border }} />
    </div>
  );
}

function Divider({ shell }: { shell: ReturnType<typeof getShell> }) {
  return <div style={{ height: 1, background: shell.border, margin: "0 0 36px" }} />;
}

function CopyImportButton({ importStatement, shell }: { importStatement: string; shell: ReturnType<typeof getShell> }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(importStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={copy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        border: `1px solid ${shell.border}`,
        borderRadius: 8,
        background: shell.surface,
        cursor: "pointer",
        fontFamily: "monospace",
        fontSize: 12,
        color: shell.muted,
        transition: "border-color 0.15s",
      }}
    >
      <code style={{ color: shell.codeText }}>{importStatement}</code>
      <span
        style={{
          fontSize: 11,
          color: copied ? shell.gold : shell.subtle,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontWeight: 500,
          borderLeft: `1px solid ${shell.border}`,
          paddingLeft: 8,
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

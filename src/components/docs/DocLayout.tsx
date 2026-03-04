"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LucentProvider,
  useLucent,
  Badge,
  Button,
  Text,
  PageLayout,
  Collapsible,
  NavLink,
  Breadcrumb,
  Tabs,
} from "lucent-ui";
import type { LucentTokens } from "lucent-ui";

import { getShell } from "@/lib/shellColors";
import { deriveAccentTokens } from "@/lib/colorUtils";
import { CATEGORIES, componentRegistry, type ComponentDef } from "@/lib/componentData";
import { componentPreviews } from "@/lib/componentPreviews";
import { PlaygroundPanel, defaultPlaygroundState, type PlaygroundState } from "./PlaygroundPanel";
import { BentoGrid } from "./BentoGrid";
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
  const [navOpen, setNavOpen] = useState(true);
  const [appearanceOpen, setAppearanceOpen] = useState(true);
  const [generateUI, setGenerateUI] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = (v: string | number) => v as any;
  const previewContainerStyle: React.CSSProperties = {
    // Font scale — override the actual CSS vars lucent-ui reads (rem-based, not inherited)
    [a("--lucent-font-size-xs")]: `${0.75 * pg.fontScale}rem`,
    [a("--lucent-font-size-sm")]: `${0.875 * pg.fontScale}rem`,
    [a("--lucent-font-size-md")]: `${1 * pg.fontScale}rem`,
    [a("--lucent-font-size-lg")]: `${1.125 * pg.fontScale}rem`,
    [a("--lucent-font-size-xl")]: `${1.25 * pg.fontScale}rem`,
    [a("--lucent-font-size-2xl")]: `${1.5 * pg.fontScale}rem`,
    [a("--lucent-font-size-3xl")]: `${1.875 * pg.fontScale}rem`,
    // Spacing scale — override the actual space tokens (affects padding/gap, not fixed heights)
    [a("--lucent-space-1")]: `${0.25 * pg.spacingScale}rem`,
    [a("--lucent-space-2")]: `${0.5 * pg.spacingScale}rem`,
    [a("--lucent-space-3")]: `${0.75 * pg.spacingScale}rem`,
    [a("--lucent-space-4")]: `${1 * pg.spacingScale}rem`,
    [a("--lucent-space-5")]: `${1.25 * pg.spacingScale}rem`,
    [a("--lucent-space-6")]: `${1.5 * pg.spacingScale}rem`,
    [a("--lucent-space-8")]: `${2 * pg.spacingScale}rem`,
    [a("--lucent-space-10")]: `${2.5 * pg.spacingScale}rem`,
    // Border radius
    [a("--lucent-radius-sm")]: `${Math.max(0, pg.borderRadius - 4)}px`,
    [a("--lucent-radius-md")]: `${pg.borderRadius}px`,
    [a("--lucent-radius-lg")]: `${pg.borderRadius + 4}px`,
  };

  // First example becomes the top preview
  const firstExample = def.examples[0];
  const TopPreview = firstExample ? componentPreviews[firstExample.previewKey] : null;

  const sidebarLabel: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  };

  const sidebar = (
    <div style={{
      height: "100%",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      background: shell.bg,
      borderRight: `1px solid ${shell.border}`,
    }}>
      {/* ── Components panel ── */}
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
                  return (
                    <NavLink key={slug} href={`/components/${slug}`} as={Link} isActive={slug === def.slug}>
                      {comp?.name ?? slug}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </Collapsible>

      {/* ── Generate UI toggle ── */}
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

      {/* ── Appearance panel ── */}
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
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      height: "100%",
      borderBottom: `1px solid ${shell.border}`,
      background: shell.bg,
      gap: 12,
    }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {prev ? (
          <Link
            href={`/components/${prev.slug}`}
            style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            ← {prev.name}
          </Link>
        ) : (
          <span style={{ width: 60 }} />
        )}
        <span style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: 12, color: shell.text, fontWeight: 600 }}>
          {def.name}
        </span>
        {next ? (
          <Link
            href={`/components/${next.slug}`}
            style={{ fontSize: 12, color: shell.muted, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {next.name} →
          </Link>
        ) : (
          <span style={{ width: 60 }} />
        )}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Badge variant="accent" size="sm">✦ LLM-ready</Badge>
      </div>
    </div>
  );

  return (
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGenerateUI(false)}
              style={{ color: shell.muted, borderColor: shell.border }}
            >
              ← Back to docs
            </Button>
          </div>
          <BentoGrid previewStyle={previewContainerStyle} />
        </div>
      ) : (
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 900 }}>
          <Breadcrumb
            style={{ marginBottom: 24 }}
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components/button" },
              { label: def.name },
            ]}
          />

          {/* Component header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <Text
                as="h1"
                family="display"
                size="3xl"
                weight="bold"
                style={{ color: shell.text, margin: 0, letterSpacing: "-0.02em" }}
              >
                {def.name}
              </Text>
              <Badge variant="neutral" size="sm">{def.category === "Atoms" ? "atom" : "molecule"}</Badge>
            </div>
            <Text
              as="p"
              size="sm"
              lineHeight="relaxed"
              style={{ margin: "0 0 16px", color: shell.muted, maxWidth: 620 }}
            >
              {def.description}
            </Text>
            <CopyImportButton importStatement={def.importStatement} shell={shell} />
          </div>

          <Divider shell={shell} />

          {/* Preview / Code tabs */}
          <SectionTitle shell={shell}>Preview</SectionTitle>
          <Tabs
            defaultValue="preview"
            style={{ marginBottom: 40 }}
            tabs={[
              {
                value: "preview",
                label: "Preview",
                content: (
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
                ),
              },
              {
                value: "code",
                label: "Code",
                content: <CodeBlock code={firstExample?.code ?? ""} shell={shell} />,
              },
            ]}
          />

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
                previewStyle={previewContainerStyle}
              />
            ))}
          </div>

          <Divider shell={shell} />

          {/* API Reference */}
          <SectionTitle shell={shell}>API Reference</SectionTitle>
          <div style={{ marginBottom: 64 }}>
            <Text as="p" size="sm" style={{ color: shell.muted, marginTop: 0, marginBottom: 16 }}>
              {def.name} props — <span style={{ color: shell.subtle }}>* required</span>
            </Text>
            <PropsTable props={def.props} shell={shell} />
          </div>

          {/* Prev / Next footer */}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: `1px solid ${shell.border}` }}>
            {prev ? (
              <Link href={`/components/${prev.slug}`} style={{ display: "flex", flexDirection: "column", gap: 2, textDecoration: "none" }}>
                <span style={{ fontSize: 11, color: shell.subtle, fontFamily: "var(--font-dm-sans), sans-serif" }}>← Previous</span>
                <span style={{ fontSize: 13, color: shell.text, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>{prev.name}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/components/${next.slug}`} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, textDecoration: "none" }}>
                <span style={{ fontSize: 11, color: shell.subtle, fontFamily: "var(--font-dm-sans), sans-serif" }}>Next →</span>
                <span style={{ fontSize: 13, color: shell.text, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500 }}>{next.name}</span>
              </Link>
            ) : <div />}
          </div>
        </main>
      )}
    </PageLayout>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionTitle({ children, shell }: { children: React.ReactNode; shell: ReturnType<typeof getShell> }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
      <Text
        as="h2"
        family="display"
        size="xl"
        weight="semibold"
        style={{ color: shell.text, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
      >
        {children}
      </Text>
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

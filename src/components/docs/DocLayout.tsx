"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLucent, Badge, Text, Breadcrumb, Tabs, Divider } from "lucent-ui";

import { getShell } from "@/lib/shellColors";
import { usePlayground } from "@/lib/playgroundContext";
import { type ComponentDef } from "@/lib/componentData";
import { componentPreviews } from "@/lib/componentPreviews";
import { CodeBlock } from "./CodeBlock";
import { InstallTabs } from "./InstallTabs";
import { AiUsageSection } from "./AiUsageSection";
import { ExampleCard } from "./ExampleCard";
import { PropsTable } from "./PropsTable";
import { PlaygroundPanel, generateCode } from "./PlaygroundPanel";
import { ComponentCustomizer } from "./ComponentCustomizer";

type Props = {
  def: ComponentDef;
  prev: ComponentDef | null;
  next: ComponentDef | null;
};

export function DocLayout({ def, prev, next }: Props) {
  const { pg, setPg } = usePlayground();
  const { tokens } = useLucent();
  const shell = getShell(pg.theme);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [compValues, setCompValues] = useState<Record<string, any>>(() => {
    const obj: Record<string, any> = {};
    def.props.forEach((p) => {
      if (p.name === "children") return;
      if (p.type.includes("=>") || p.type.includes("CSSProperties")) return;
      if (p.defaultValue !== undefined) {
        let v: any = p.defaultValue;
        if (v === "true" || v === "false") v = v === "true";
        else if (v !== "" && !isNaN(Number(v))) v = Number(v);
        // strip surrounding quotes stored in componentData: '"md"' → 'md'
        else if (typeof v === "string" && v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        obj[p.name] = v;
      } else if (p.type === "string" && ["label", "placeholder", "title", "description"].includes(p.name)) {
        // seed common text props with the component name so the preview isn't blank
        obj[p.name] = def.name;
      }
    });
    return obj;
  });

  const compPropsAsString = useMemo(() => {
    return Object.entries(compValues)
      .filter(([k]) => k !== "children")
      .map(([k, v]) => {
        if (typeof v === "string") return `${k}={"${v}"}`;
        if (typeof v === "boolean") return v ? k : "";
        return `${k}={${JSON.stringify(v)}}`;
      })
      .filter(Boolean)
      .join(" ");
  }, [compValues]);

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
    [a("--lucent-font-family-base")]: `"${pg.fontFamily}", sans-serif`,
    fontFamily: `"${pg.fontFamily}", sans-serif`,
  };

  const firstExample = def.examples[0];
  const TopPreview = firstExample ? componentPreviews[firstExample.previewKey] : null;

  return (
    <main style={{ flex: 1, padding: "40px 48px", maxWidth: 900, overflow: "visible" }}>
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
          <Text as="h1" family="display" size="3xl" weight="bold" style={{ color: shell.text, margin: 0, letterSpacing: "-0.02em" }}>
            {def.name}
          </Text>
          <Badge variant="neutral" size="sm">{def.category === "Atoms" ? "atom" : "molecule"}</Badge>
        </div>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ margin: "0 0 16px", color: shell.muted, maxWidth: 620 }}>
          {def.description}
        </Text>
        <CopyImportButton importStatement={def.importStatement} shell={shell} />
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      <SectionTitle shell={shell}>Preview</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <Tabs
          defaultValue="preview"
          style={{ marginBottom: 16 }}
          tabs={[
            {
              value: "preview",
              label: "Preview",
              content: (
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1, background: tokens.bgBase, padding: "32px 28px", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${shell.border}`, borderRadius: 12, ...previewContainerStyle }}>
                    {mounted && TopPreview ? <TopPreview /> : null}
                  </div>
                  <div style={{ width: 280, flexShrink: 0, border: `1px solid ${shell.border}`, borderRadius: 12, background: shell.surface }}>
                    <PlaygroundPanel state={pg} onChange={setPg} shell={shell} />
                  </div>
                </div>
              ),
            },
            {
              value: "playground",
              label: "Playground",
              content: (
                <ComponentCustomizer
                  def={def}
                  shell={shell}
                  values={compValues}
                  onValuesChange={(name, v) => setCompValues((prev) => ({ ...prev, [name]: v }))}
                  previewStyle={previewContainerStyle}
                  previewBg={tokens.bgBase}
                />
              ),
            },
          ]}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <CodeBlock
            code={`<${def.name}${compPropsAsString ? " " + compPropsAsString : ""} />`}
            shell={shell}
          />
          <CodeBlock code={generateCode(pg)} shell={shell} />
        </div>
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      <SectionTitle shell={shell}>Installation</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <InstallTabs shell={shell} />
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      <SectionTitle shell={shell}>Import</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <CodeBlock code={def.importStatement} shell={shell} />
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      <SectionTitle shell={shell}>Usage</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <CodeBlock code={def.usageCode} shell={shell} />
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      <SectionTitle shell={shell}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          AI Usage
          <span style={{ fontSize: 11, color: shell.gold, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 400 }}>✦ Claude · Cursor · VS Code · MCP</span>
        </span>
      </SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <AiUsageSection prompts={def.aiPrompts} shell={shell} />
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

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

      <Divider style={{ margin: "0 0 36px" }} />

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

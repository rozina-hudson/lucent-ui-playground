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
import { ComponentCustomizer } from "./ComponentCustomizer";

type Props = {
  def: ComponentDef;
  prev: ComponentDef | null;
  next: ComponentDef | null;
};

export function DocLayout({ def, prev, next }: Props) {
  const { pg, activeDocTab, setActiveDocTab } = usePlayground();
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
      .filter(([k]) => k !== "children" && !k.startsWith("_"))
      .map(([k, v]) => {
        if (typeof v === "string") return `${k}="${v}"`;
        if (typeof v === "boolean") return v ? k : "";
        return `${k}={${JSON.stringify(v)}}`;
      })
      .filter(Boolean)
      .join(" ");
  }, [compValues]);

  const firstExample = def.examples[0];
  const TopPreview = firstExample ? componentPreviews[firstExample.previewKey] : null;

  return (
    <main style={{ flex: 1, overflow: "visible" }}>
      {/* ── Full-width preview/playground area ─────────────────────────────── */}
      <div style={{ padding: "40px 48px 0" }}>
        <Breadcrumb
          style={{ marginBottom: 24, maxWidth: 900 }}
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components/button" },
            { label: def.name },
          ]}
        />

        {/* Component header */}
        <div style={{ marginBottom: 32, maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <Text as="h1" family="display" size="3xl" weight="bold" style={{ color: shell.text, margin: 0, letterSpacing: "-0.02em" }}>
              {def.name}
            </Text>
            <Badge variant="neutral" size="sm">{def.category === "Atoms" ? "atom" : def.category === "Molecules" ? "molecule" : "pattern"}</Badge>
          </div>
          <Text as="p" size="sm" lineHeight="relaxed" style={{ margin: "0 0 16px", color: shell.muted, maxWidth: 620 }}>
            {def.description}
          </Text>
          <AiUsageSection prompts={def.aiPrompts} />
        </div>
      </div>

      <Divider style={{ margin: "0 0 0" }} />

      {/* Preview / Playground / Examples — full width */}
      <div style={{ padding: "40px 48px 40px" }}>
        <Tabs
          value={activeDocTab}
          onChange={setActiveDocTab}
          tabs={[
            {
              value: "preview",
              label: "Preview",
              content: (
                <div style={{ background: tokens.surface, padding: "32px 28px", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${shell.border}`, borderRadius: 12 }}>
                  {mounted && TopPreview ? <TopPreview /> : null}
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
                  previewBg={tokens.surface}
                  fallbackPreview={TopPreview}
                />
              ),
            },
            {
              value: "examples",
              label: `Examples (${def.examples.length})`,
              content: (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {def.examples.map((ex) => (
                    <ExampleCard
                      key={ex.previewKey}
                      example={ex}
                      previews={componentPreviews}
                      shell={shell}
                      previewBg={tokens.surface}
                    />
                  ))}
                </div>
              ),
            },
          ]}
        />
        {activeDocTab !== "examples" && (
          <>
            <div style={{ marginTop: 32 }} />
            <SectionTitle shell={shell}>Usage</SectionTitle>
            <div>
              <CodeBlock
                code={(() => {
                  const tag = def.name;
                  const props = compPropsAsString ? " " + compPropsAsString : "";

                  // ButtonGroup: render child Buttons
                  if (tag === "ButtonGroup") {
                    const variant = compValues._bgVariant ?? "outline";
                    const size = compValues._bgSize ?? "md";
                    const labels = (compValues._bgLabels ?? "Left, Center, Right").split(",").map((s: string) => s.trim());
                    const btnProps = `variant="${variant}"${size !== "md" ? ` size="${size}"` : ""}`;
                    const children = labels.map((l: string) => `  <Button ${btnProps}>${l}</Button>`).join("\n");
                    return `import { ButtonGroup, Button } from 'lucent-ui'\n\n<${tag}>\n${children}\n</${tag}>`;
                  }

                  // SplitButton: render with children label
                  if (tag === "SplitButton") {
                    const label = compValues._label ?? "Save";
                    return `${def.importStatement}\n\n<${tag}${props}\n  menuItems={[\n    { label: "Save as draft", onSelect: () => {} },\n    { label: "Save & publish", onSelect: () => {} },\n  ]}\n>\n  ${label}\n</${tag}>`;
                  }

                  // Components with a text label (Button, Chip)
                  const label = compValues._label;
                  if (label !== undefined && label !== def.name) {
                    return `${def.importStatement}\n\n<${tag}${props}>${label}</${tag}>`;
                  }

                  // Default: self-closing or with component name as children
                  if (def.props.some((p) => p.name === "children")) {
                    return `${def.importStatement}\n\n<${tag}${props}>${def.name}</${tag}>`;
                  }
                  return `${def.importStatement}\n\n<${tag}${props} />`;
                })()}
                shell={shell}
                language="React / JSX"
              />
            </div>
          </>
        )}
      </div>

      <Divider style={{ margin: "0" }} />

      {/* ── Constrained content area ──────────────────────────────────────── */}
      <div style={{ padding: "36px 48px 0", maxWidth: 900 }}>
        <SectionTitle shell={shell}>Installation</SectionTitle>
        <div style={{ marginBottom: 40 }}>
          <InstallTabs shell={shell} />
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



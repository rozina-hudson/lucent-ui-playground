"use client";

import { useState, useEffect } from "react";
import { Collapsible } from "lucent-ui";
import { CodeBlock } from "./CodeBlock";
import type { ExampleDef } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";
import type { componentPreviews } from "@/lib/componentPreviews";

type Props = {
  example: ExampleDef;
  previews: typeof componentPreviews;
  shell: ShellColors;
  previewBg: string;
  previewStyle?: React.CSSProperties;
};

export function ExampleCard({ example, previews, shell, previewBg, previewStyle }: Props) {
  const PreviewComponent = previews[example.previewKey];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ border: `1px solid ${shell.border}`, borderRadius: 12, overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: `1px solid ${shell.border}`,
          background: shell.surface,
          display: "flex",
          alignItems: "baseline",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: shell.text,
          }}
        >
          {example.title}
        </span>
        {example.description && (
          <span
            style={{
              fontSize: 12,
              color: shell.muted,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            {example.description}
          </span>
        )}
      </div>

      {/* Live preview */}
      <div
        style={{
          padding: "28px 24px",
          background: previewBg,
          minHeight: 80,
          ...previewStyle,
        }}
      >
        {mounted && PreviewComponent ? (
          <PreviewComponent />
        ) : (
          <span style={{ fontSize: 12, color: shell.muted }}>{mounted ? "Preview unavailable" : ""}</span>
        )}
      </div>

      {/* View Code toggle */}
      <div style={{ borderTop: `1px solid ${shell.border}`, background: shell.surface }}>
        <Collapsible trigger="View code">
          <div style={{ padding: "0 16px 16px" }}>
            <CodeBlock code={example.code} shell={shell} />
          </div>
        </Collapsible>
      </div>
    </div>
  );
}

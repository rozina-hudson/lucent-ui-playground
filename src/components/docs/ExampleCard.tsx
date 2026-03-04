"use client";

import { useState } from "react";
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
  const [expanded, setExpanded] = useState(false);
  const PreviewComponent = previews[example.previewKey];

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
        {PreviewComponent ? (
          <PreviewComponent />
        ) : (
          <span style={{ fontSize: 12, color: shell.muted }}>Preview unavailable</span>
        )}
      </div>

      {/* View Code toggle */}
      <div style={{ borderTop: `1px solid ${shell.border}`, background: shell.surface }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "none",
            color: shell.muted,
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.15s",
              fontSize: 10,
            }}
          >
            ▾
          </span>
          {expanded ? "Hide code" : "View code"}
        </button>

        {expanded && (
          <div style={{ padding: "0 16px 16px" }}>
            <CodeBlock code={example.code} shell={shell} />
          </div>
        )}
      </div>
    </div>
  );
}

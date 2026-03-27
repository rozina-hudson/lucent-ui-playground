"use client";

import { useState, useEffect } from "react";
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
  const [codeOpen, setCodeOpen] = useState(false);
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
        <button
          onClick={() => setCodeOpen(!codeOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: 13,
            color: shell.muted,
          }}
        >
          View code
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "transform 0.15s", transform: codeOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        {codeOpen && (
          <div style={{ padding: "0 16px 16px" }}>
            <CodeBlock code={example.code} shell={shell} />
          </div>
        )}
      </div>
    </div>
  );
}

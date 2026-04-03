"use client";

import { useState, useEffect } from "react";
import { Text } from "lucent-ui";
import { CodeBlock } from "./CodeBlock";
import type { ExampleDef } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";
import type { componentPreviews } from "@/lib/componentPreviews";

type Props = {
  example: ExampleDef;
  previews: typeof componentPreviews;
  shell: ShellColors;
  previewBg: string;
};

export function ExampleCard({ example, previews, shell, previewBg }: Props) {
  const PreviewComponent = previews[example.previewKey];
  const [mounted, setMounted] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Title + description */}
      <div style={{ marginBottom: 12 }}>
        <Text as="h3" size="lg" weight="semibold" style={{ margin: 0, color: shell.text }}>
          {example.title}
        </Text>
        {example.description && (
          <Text size="sm" style={{ margin: "4px 0 0", color: shell.muted }}>
            {example.description}
          </Text>
        )}
      </div>

      {/* Live preview */}
      <div
        style={{
          padding: "28px 24px",
          background: previewBg,
          minHeight: 80,
          border: `1px solid ${shell.border}`,
          borderRadius: 12,
        }}
      >
        {mounted && PreviewComponent ? (
          <PreviewComponent />
        ) : (
          <span style={{ fontSize: 12, color: shell.muted }}>{mounted ? "Preview unavailable" : ""}</span>
        )}
      </div>

      {/* View Code toggle */}
      <button
        onClick={() => setCodeOpen(!codeOpen)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginTop: 8,
          padding: "4px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 12,
          color: shell.muted,
        }}
      >
        {codeOpen ? "Hide code" : "View code"}
        <svg
          width={14}
          height={14}
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
        <div style={{ marginTop: 8 }}>
          <CodeBlock code={example.code} shell={shell} />
        </div>
      )}
    </div>
  );
}

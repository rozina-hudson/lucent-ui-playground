"use client";

import { useState } from "react";
import type { ShellColors } from "@/lib/shellColors";

type Props = {
  code: string;
  shell: ShellColors;
  language?: string;
};

export function CodeBlock({ code, shell }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${shell.border}` }}>
      <pre
        style={{
          margin: 0,
          padding: "16px 48px 16px 16px",
          background: shell.codeBg,
          color: shell.codeText,
          fontFamily: "var(--font-dm-sans), monospace",
          fontSize: 13,
          lineHeight: 1.65,
          overflowX: "auto",
          whiteSpace: "pre",
        }}
      >
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        title="Copy code"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${shell.border}`,
          background: shell.surface,
          color: shell.muted,
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 11,
          fontWeight: 500,
          cursor: "pointer",
          transition: "color 0.15s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

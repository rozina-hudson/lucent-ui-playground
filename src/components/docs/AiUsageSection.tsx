"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import type { AiPrompts } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

type Tool = "claude" | "cursor" | "vscode" | "mcp";

const TOOLS: { key: Tool; label: string; icon: string }[] = [
  { key: "claude", label: "Claude", icon: "✦" },
  { key: "cursor", label: "Cursor", icon: "⌥" },
  { key: "vscode", label: "VS Code", icon: "⎋" },
  { key: "mcp", label: "MCP", icon: "⚙" },
];

type Props = {
  prompts: AiPrompts;
  shell: ShellColors;
};

export function AiUsageSection({ prompts, shell }: Props) {
  const [active, setActive] = useState<Tool>("claude");

  return (
    <div>
      <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
        {TOOLS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              border: `1px solid ${active === t.key ? shell.gold : shell.border}`,
              borderRadius: 6,
              background: active === t.key ? shell.goldBg : "transparent",
              color: active === t.key ? shell.gold : shell.muted,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              fontWeight: active === t.key ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 11 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ marginBottom: 8 }}>
        {active === "claude" && (
          <p style={{ margin: "0 0 8px", fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Paste this into a Claude conversation or claude.ai:
          </p>
        )}
        {active === "cursor" && (
          <p style={{ margin: "0 0 8px", fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Use in Cursor chat (<code style={{ fontFamily: "monospace" }}>Cmd+L</code>) or .cursorrules:
          </p>
        )}
        {active === "vscode" && (
          <p style={{ margin: "0 0 8px", fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Use in GitHub Copilot Chat or any VS Code AI chat panel:
          </p>
        )}
        {active === "mcp" && (
          <p style={{ margin: "0 0 8px", fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Add the lucent-ui MCP server to your Claude Desktop or agent config:
          </p>
        )}
      </div>
      <CodeBlock code={prompts[active]} shell={shell} />
    </div>
  );
}

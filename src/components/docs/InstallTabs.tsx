"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import type { ShellColors } from "@/lib/shellColors";

type PM = "pnpm" | "npm" | "yarn" | "bun";

const commands: Record<PM, string> = {
  pnpm: "pnpm add lucent-ui",
  npm: "npm install lucent-ui",
  yarn: "yarn add lucent-ui",
  bun: "bun add lucent-ui",
};

type Props = { shell: ShellColors };

export function InstallTabs({ shell }: Props) {
  const [active, setActive] = useState<PM>("pnpm");

  return (
    <div>
      <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
        {(["pnpm", "npm", "yarn", "bun"] as PM[]).map((pm) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            style={{
              padding: "5px 12px",
              border: `1px solid ${active === pm ? shell.gold : shell.border}`,
              borderRadius: 6,
              background: active === pm ? shell.goldBg : "transparent",
              color: active === pm ? shell.gold : shell.muted,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              fontWeight: active === pm ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {pm}
          </button>
        ))}
      </div>
      <CodeBlock code={`$ ${commands[active]}`} shell={shell} />
    </div>
  );
}

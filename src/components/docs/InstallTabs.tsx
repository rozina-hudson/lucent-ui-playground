import { CodeBlock } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";

type Props = { shell?: ShellColors };

export function InstallTabs(_: Props) {
  return (
    <CodeBlock
      tabs={[
        { label: "pnpm", code: "pnpm add lucent-ui" },
        { label: "npm",  code: "npm install lucent-ui" },
        { label: "yarn", code: "yarn add lucent-ui" },
        { label: "bun",  code: "bun add lucent-ui" },
      ]}
    />
  );
}

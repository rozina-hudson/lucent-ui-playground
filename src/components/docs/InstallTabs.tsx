import { Tabs } from "lucent-ui";
import { CodeBlock } from "./CodeBlock";
import type { ShellColors } from "@/lib/shellColors";

type Props = { shell: ShellColors };

export function InstallTabs({ shell }: Props) {
  return (
    <Tabs
      defaultValue="pnpm"
      tabs={[
        { value: "pnpm", label: "pnpm", content: <CodeBlock code="$ pnpm add lucent-ui" shell={shell} /> },
        { value: "npm",  label: "npm",  content: <CodeBlock code="$ npm install lucent-ui" shell={shell} /> },
        { value: "yarn", label: "yarn", content: <CodeBlock code="$ yarn add lucent-ui" shell={shell} /> },
        { value: "bun",  label: "bun",  content: <CodeBlock code="$ bun add lucent-ui" shell={shell} /> },
      ]}
    />
  );
}

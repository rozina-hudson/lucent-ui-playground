import { CodeBlock } from "lucent-ui";
import type { AiPrompts } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

type Props = {
  prompts: AiPrompts;
  shell?: ShellColors;
};

export function AiUsageSection({ prompts }: Props) {
  return (
    <CodeBlock
      variant="prompt"
      tabs={[
        { label: "✦ Claude",  code: prompts.claude },
        { label: "⌥ Cursor",  code: prompts.cursor },
        { label: "⎋ VS Code", code: prompts.vscode },
        { label: "⚙ MCP",     code: prompts.mcp },
      ]}
    />
  );
}

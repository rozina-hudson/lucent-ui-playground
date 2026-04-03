import { CodeBlock } from "lucent-ui";
import type { AiPrompts } from "@/lib/componentData";

type Props = {
  prompts: AiPrompts;
};

export function AiUsageSection({ prompts }: Props) {
  return (
    <CodeBlock
      variant="prompt"
      wrap
      tabs={[
        { label: "✦ Claude",  code: prompts.claude },
        { label: "⌥ Cursor",  code: prompts.cursor },
        { label: "⎋ VS Code", code: prompts.vscode },
        { label: "⚙ MCP",     code: prompts.mcp },
      ]}
    />
  );
}

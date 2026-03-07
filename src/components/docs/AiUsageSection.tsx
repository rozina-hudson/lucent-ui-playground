import { Tabs } from "lucent-ui";
import { CodeBlock } from "./CodeBlock";
import type { AiPrompts } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

const descriptions: Record<keyof AiPrompts, string> = {
  claude: "Paste this into a Claude conversation or claude.ai:",
  cursor: "Use in Cursor chat (Cmd+L) or .cursorrules:",
  vscode: "Use in GitHub Copilot Chat or any VS Code AI chat panel:",
  mcp: "Add the lucent-ui MCP server to your Claude Desktop or agent config:",
};

type Props = {
  prompts: AiPrompts;
  shell: ShellColors;
};

export function AiUsageSection({ prompts, shell }: Props) {
  const tabContent = (key: keyof AiPrompts) => (
    <div>
      <p style={{ margin: "0 0 8px", fontSize: 12, color: shell.muted, fontFamily: "var(--font-dm-sans), sans-serif" }}>
        {descriptions[key]}
      </p>
      <CodeBlock code={prompts[key]} shell={shell} />
    </div>
  );

  return (
    <Tabs
      defaultValue="claude"
      tabs={[
        { value: "claude", label: "✦ Claude",  content: tabContent("claude") },
        { value: "cursor", label: "⌥ Cursor",  content: tabContent("cursor") },
        { value: "vscode", label: "⎋ VS Code", content: tabContent("vscode") },
        { value: "mcp",    label: "⚙ MCP",     content: tabContent("mcp") },
      ]}
    />
  );
}

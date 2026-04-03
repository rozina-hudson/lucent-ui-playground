"use client";

import { CodeBlock as LucentCodeBlock } from "lucent-ui";
import type { ShellColors } from "@/lib/shellColors";

type Props = {
  code: string;
  shell?: ShellColors;
  language?: string;
  minimal?: boolean;
};

export function CodeBlock({ code, language, minimal }: Props) {
  return <LucentCodeBlock code={code} language={language} minimal={minimal} />;
}

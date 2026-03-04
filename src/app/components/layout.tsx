import { PlaygroundProvider } from "@/lib/playgroundContext";
import { ComponentsShell } from "@/components/docs/ComponentsShell";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlaygroundProvider>
      <ComponentsShell>{children}</ComponentsShell>
    </PlaygroundProvider>
  );
}

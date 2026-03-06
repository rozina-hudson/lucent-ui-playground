import { ComponentsShell } from "@/components/docs/ComponentsShell";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <ComponentsShell>{children}</ComponentsShell>;
}

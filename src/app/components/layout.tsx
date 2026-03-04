import { PlaygroundProvider } from "@/lib/playgroundContext";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <PlaygroundProvider>{children}</PlaygroundProvider>;
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0a", color: "#f5f5f5" }}>
      {/* Nav */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "#1f1f1f" }}
      >
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-unbounded)", color: "#f5f5f5" }}
        >
          Lucent UI
        </span>
        <nav className="flex items-center gap-6 text-sm" style={{ color: "#a3a3a3" }}>
          <Link href="/components" className="hover:text-white transition-colors">
            Components
          </Link>
          <a
            href="https://www.npmjs.com/package/lucent-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            npm
          </a>
          <a
            href="https://github.com/rozina-hudson/lucent-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8"
            style={{ background: "#1a1a1a", color: "#e9c96b", border: "1px solid #2a2a1a" }}
          >
            v0.1.0 — now on npm
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-unbounded)", lineHeight: 1.15 }}
          >
            Build beautiful React apps.{" "}
            <span style={{ color: "#e9c96b" }}>AI-ready</span> from day one.
          </h1>

          <p
            className="text-lg mb-10"
            style={{ color: "#a3a3a3", maxWidth: 560, margin: "0 auto 2.5rem" }}
          >
            Lucent UI ships every component with a machine-readable manifest and an MCP server —
            so your AI agents understand your design system as well as your developers do.
          </p>

          {/* Install command */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-mono mb-10 mx-auto"
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              color: "#e5e7eb",
              display: "flex",
              width: "fit-content",
              gap: "1.5rem",
            }}
          >
            <span>
              <span style={{ color: "#6b7280" }}>$</span> npm install lucent-ui
            </span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/components"
              className="px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "#e9c96b", color: "#1a1300" }}
            >
              Explore components →
            </Link>
            <a
              href="https://github.com/rozina-hudson/lucent-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ border: "1px solid #2a2a2a", color: "#a3a3a3" }}
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto text-left">
          <FeatureCard
            icon="◎"
            title="AI-first manifests"
            description="Every component ships with a COMPONENT_MANIFEST — a machine-readable schema of props, variants, and usage examples."
          />
          <FeatureCard
            icon="⬡"
            title="MCP server"
            description="Run lucent-mcp and let AI assistants discover, inspect, and compose components via the Model Context Protocol."
          />
          <FeatureCard
            icon="◈"
            title="Design tokens"
            description="Fully customizable via CSS custom properties. Override any token per-provider without touching component source."
          />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-6 py-5 border-t text-xs"
        style={{ borderColor: "#1f1f1f", color: "#525252" }}
      >
        <span>© {new Date().getFullYear()} Lucent UI</span>
        <span>MIT License</span>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-3"
      style={{ background: "#111", border: "1px solid #1f1f1f" }}
    >
      <span className="text-2xl" style={{ color: "#e9c96b" }}>
        {icon}
      </span>
      <h3 className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
        {description}
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePlayground } from "@/lib/playgroundContext";
import { getShell } from "@/lib/shellColors";
import { CHANGELOG } from "@/lib/changelogData";
import { DesignPresetShowcase } from "@/components/DesignPresetShowcase";
import {
  defaultPlaygroundState,
  PALETTE_OPTIONS,
  COMBINED_PRESETS,
  resolveDimension,
  resolvePreset,
  type PlaygroundState,
} from "@/components/docs/PlaygroundPanel";

export default function Home() {
  const { pg, setPg } = usePlayground();
  const shell = getShell(pg.theme);
  const isDark = pg.theme === "dark";

  const [npmVersion, setNpmVersion] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://registry.npmjs.org/lucent-ui/latest")
      .then((r) => r.json())
      .then((d) => setNpmVersion(d.version))
      .catch(() => {});
  }, []);

  const goldBadgeBg = isDark ? "#1a1a1a" : "#fefce8";
  const goldBadgeBorder = isDark ? "#2a2a1a" : "#fde68a";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: shell.bg, color: shell.text, transition: "background 0.2s, color 0.2s" }}
    >
      {/* Nav */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: shell.border }}
      >
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-unbounded)", color: shell.text }}
        >
          Lucent UI
        </span>
        <nav className="flex items-center gap-6 text-sm" style={{ color: shell.muted }}>
          <NavLink href="/components" shell={shell}>Components</NavLink>
          <NavLink href="/components/changelog" shell={shell}>Changelog</NavLink>
          <NavLink href="https://www.npmjs.com/package/lucent-ui" external shell={shell}>npm</NavLink>
          <NavLink href="https://github.com/rozina-hudson/lucent-ui" external shell={shell}>GitHub</NavLink>
          <button
            onClick={() => {
              const newTheme = isDark ? "light" : "dark";
              const d = defaultPlaygroundState;

              const matchedPalette = PALETTE_OPTIONS.find((opt) => {
                const colors = resolveDimension(opt, pg.theme);
                return Object.entries(colors).every(
                  ([k, v]) => pg[k as keyof PlaygroundState] === v,
                );
              });
              if (matchedPalette) {
                setPg({ ...pg, theme: newTheme, ...resolveDimension(matchedPalette, newTheme) });
                return;
              }

              const matchedPreset = COMBINED_PRESETS.find((preset) => {
                const resolved = resolvePreset(preset, pg.theme);
                return Object.entries(resolved).every(
                  ([k, v]) => pg[k as keyof PlaygroundState] === v,
                );
              });
              if (matchedPreset) {
                setPg({ ...pg, theme: newTheme, ...resolvePreset(matchedPreset, newTheme) });
                return;
              }

              setPg({
                ...pg,
                theme: newTheme,
                borderColor: d.borderColor,
                bgColor: d.bgColor,
                surfaceColor: d.surfaceColor,
                textColor: d.textColor,
              });
            }}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: `1px solid ${shell.border}`,
              borderRadius: 8,
              padding: "5px 10px",
              cursor: "pointer",
              color: shell.muted,
              fontSize: 13,
              lineHeight: 1,
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            {isDark ? "☀︎" : "☽"}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8"
            style={{ background: goldBadgeBg, color: "#e9c96b", border: `1px solid ${goldBadgeBorder}` }}
          >
            {npmVersion ? `v${npmVersion} — now on npm` : "now on npm"}
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-unbounded)", lineHeight: 1.15, color: shell.text }}
          >
            Build beautiful React apps.{" "}
            <span style={{ color: "#e9c96b" }}>AI-ready</span> from day one.
          </h1>

          <p
            className="text-lg mb-10"
            style={{ color: shell.muted, maxWidth: 560, margin: "0 auto 2.5rem" }}
          >
            Lucent UI ships every component with a machine-readable manifest and an MCP server —
            so your AI agents understand your design system as well as your developers do.
          </p>

          {/* Install command */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-mono mb-10 mx-auto"
            style={{
              background: shell.codeBg,
              border: `1px solid ${shell.border}`,
              color: shell.codeText,
              display: "flex",
              width: "fit-content",
              gap: "1.5rem",
            }}
          >
            <span>
              <span style={{ color: shell.muted }}>$</span> npm install lucent-ui
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
              className="px-6 py-3 rounded-lg text-sm font-semibold"
              style={{ border: `1px solid ${shell.border}`, color: shell.muted }}
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
            shell={shell}
          />
          <FeatureCard
            icon="⬡"
            title="MCP server"
            description="Run lucent-mcp and let AI assistants discover, inspect, and compose components via the Model Context Protocol."
            shell={shell}
          />
          <FeatureCard
            icon="◈"
            title="Design tokens"
            description="Fully customizable via CSS custom properties. Override any token per-provider without touching component source."
            shell={shell}
          />
        </div>

        {/* Design presets showcase */}
        <DesignPresetShowcase shellTheme={pg.theme} />

        {/* Changelog preview */}
        <div className="mt-24 max-w-4xl w-full mx-auto text-left">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-unbounded)", color: shell.text }}
            >
              What&rsquo;s new
            </h2>
            <Link
              href="/components/changelog"
              className="text-xs"
              style={{ color: shell.subtle, textDecoration: "none" }}
            >
              Full changelog →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {CHANGELOG.slice(0, 3).map((entry, i) => (
              <div
                key={entry.version}
                className="flex gap-8 text-left"
                style={{
                  paddingBottom: 32,
                  marginBottom: i < 2 ? 0 : 0,
                  borderBottom: i < 2 ? `1px solid ${shell.border}` : "none",
                  paddingTop: i > 0 ? 32 : 0,
                }}
              >
                {/* Version label */}
                <div style={{ width: 96, flexShrink: 0 }}>
                  <span
                    className="text-xs font-mono font-medium"
                    style={{
                      color: shell.subtle,
                      display: "block",
                      paddingTop: 2,
                    }}
                  >
                    {entry.version}
                  </span>
                  {entry.date && (
                    <span className="text-xs" style={{ color: shell.subtle, opacity: 0.6 }}>
                      {entry.date}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: shell.text, margin: "0 0 10px" }}
                  >
                    {entry.title}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {entry.items.slice(0, 3).map((item) => (
                      <div key={item.label} className="flex gap-3 items-start">
                        <span style={{ color: shell.subtle, fontSize: 10, marginTop: 4, flexShrink: 0 }}>—</span>
                        <span className="text-sm" style={{ color: shell.muted, lineHeight: 1.6 }}>
                          <span className="font-mono text-xs" style={{ color: shell.text }}>
                            {item.label}
                          </span>
                          {" "}
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-6 py-5 border-t text-xs"
        style={{ borderColor: shell.border, color: shell.subtle }}
      >
        <span>© {new Date().getFullYear()} Lucent UI</span>
        <span>MIT License</span>
      </footer>
    </div>
  );
}

function NavLink({
  href,
  children,
  external,
  shell,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  shell: ReturnType<typeof getShell>;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedProps = {
    style: { color: hovered ? shell.text : shell.muted, transition: "color 0.15s" },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
      {children}
    </a>
  ) : (
    <Link href={href} {...sharedProps}>
      {children}
    </Link>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  shell,
}: {
  icon: string;
  title: string;
  description: string;
  shell: ReturnType<typeof getShell>;
}) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-3"
      style={{ background: shell.surface, border: `1px solid ${shell.border}` }}
    >
      <span className="text-2xl" style={{ color: "#e9c96b" }}>
        {icon}
      </span>
      <h3 className="font-semibold text-sm" style={{ color: shell.text }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: shell.muted }}>
        {description}
      </p>
    </div>
  );
}

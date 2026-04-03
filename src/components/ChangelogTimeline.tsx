"use client";

import React from "react";
import Link from "next/link";
import { getShell, type ShellColors } from "@/lib/shellColors";

const GREEN = "#34d399";
const GOLD = "#e9c96b";

/* ─── Badge ────────────────────────────────────────────────────────────────── */

function TBadge({
  label,
  green,
  shell,
}: {
  label: string;
  green?: boolean;
  shell: ShellColors;
}) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.05em",
        padding: "2px 8px",
        borderRadius: 4,
        border: `1px solid ${green ? GREEN + "50" : shell.border}`,
        color: green ? GREEN : shell.text,
        fontFamily: "monospace",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Entry type ───────────────────────────────────────────────────────────── */

type Entry = {
  version: string;
  date: string;
  title: React.ReactNode;
  badges: { label: string; green?: boolean }[];
  content: React.ReactNode;
  latest?: boolean;
};

/* ─── Curated entries ──────────────────────────────────────────────────────── */

function buildEntries(shell: ShellColors): Entry[] {
  return [
    {
      version: "V0.34",
      date: "APRIL 2026",
      latest: true,
      title: (
        <>
          4 New <span style={{ color: GREEN }}>Patterns</span>{" "}
          <span style={{ color: GOLD }}>&amp;</span> MCP{" "}
          <span style={{ color: GREEN }}>Design Rules</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "4 PATTERNS" },
        { label: "MCP" },
      ],
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>4 new patterns</strong> —{" "}
            <strong style={{ color: shell.text }}>ProductCard</strong> (article &amp; team member variants),{" "}
            <strong style={{ color: shell.text }}>AnnouncementCard</strong> (media, system notice, promo),{" "}
            <strong style={{ color: shell.text }}>ConfirmationDialog</strong> (typed confirmation),{" "}
            <strong style={{ color: shell.text }}>BulkActionBar</strong> (minimal &amp; extended).
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>MCP design rules</strong> — layout guidelines injected into the MCP system prompt with a new{" "}
            <code style={{ fontSize: 12, padding: "1px 5px", borderRadius: 3, background: shell.codeBg, color: shell.codeText }}>get_design_rules</code>{" "}
            tool. DevTools presets now apply full color palettes with theme-aware light/dark variants.
          </p>
        </div>
      ),
    },
    {
      version: "V0.31",
      date: "MARCH 2026",
      title: (
        <>
          <span style={{ color: GREEN }}>Stepper</span>{" "}
          <span style={{ color: GOLD }}>&amp;</span> Golden{" "}
          <span style={{ color: GREEN }}>Compositions</span>
        </>
      ),
      badges: [
        { label: "STEPPER" },
        { label: "4 PATTERNS" },
        { label: "6 COMPOSITIONS" },
      ],
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>Stepper molecule</strong> — step indicator for onboarding wizards, checkout funnels, and setup sequences. Horizontal + vertical, animated checkmark, numbered steps, status badges, custom icons.
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>4 new patterns</strong> —{" "}
            <strong style={{ color: shell.text }}>PricingTable</strong>,{" "}
            <strong style={{ color: shell.text }}>NotificationFeed</strong>,{" "}
            <strong style={{ color: shell.text }}>OnboardingFlow</strong>,{" "}
            <strong style={{ color: shell.text }}>DashboardHeader</strong>.
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>6 golden compositions</strong> — interactive proof that the component system produces polished, real-world UI. Recipes tier renamed to <strong style={{ color: shell.text }}>Patterns</strong>.
          </p>
        </div>
      ),
    },
    {
      version: "V0.30",
      date: "MARCH 2026",
      title: (
        <>
          Timeline <span style={{ color: GREEN }}>Redesign</span>{" "}
          <span style={{ color: GOLD }}>&amp;</span> Filter{" "}
          <span style={{ color: GREEN }}>Molecules</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "4 MOLECULES" },
        { label: "PATTERN" },
      ],
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>Timeline redesigned</strong> — modern activity-feed pattern with compact filled dots, inline title + date, and a new{" "}
            <code style={{ fontSize: 12, padding: "1px 5px", borderRadius: 3, background: shell.codeBg, color: shell.codeText }}>content</code>{" "}
            prop for embedding rich nested blocks like Cards.
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>4 Filter molecules</strong> —{" "}
            <strong style={{ color: shell.text }}>FilterSearch</strong> (collapsible icon → input),{" "}
            <strong style={{ color: shell.text }}>FilterSelect</strong> (single-select button + menu),{" "}
            <strong style={{ color: shell.text }}>FilterMultiSelect</strong> (multi-select with chip count),{" "}
            <strong style={{ color: shell.text }}>FilterDateRange</strong> (date range button + calendar).
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            New <strong style={{ color: shell.text }}>SearchFilterBar</strong> pattern composes the Filter family into a compact toolbar with three variants: Default, Minimal, and Pipeline.
          </p>
        </div>
      ),
    },
    {
      version: "V0.28",
      date: "MARCH 2026",
      title: (
        <>
          DevTools <span style={{ color: GOLD }}>&amp;</span> Design{" "}
          <span style={{ color: GREEN }}>Personalities</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "DEVTOOLS" },
        { label: "PRESETS" },
      ],
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>LucentDevTools</strong> — a floating panel from{" "}
            <code style={{ fontSize: 12, padding: "1px 5px", borderRadius: 3, background: shell.codeBg, color: shell.codeText }}>lucent-ui/devtools</code>{" "}
            for real-time design system manipulation. Three tabs: Design, Typography, Tokens.
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>10 design presets</strong> via a single{" "}
            <code style={{ fontSize: 12, padding: "1px 5px", borderRadius: 3, background: shell.codeBg, color: shell.codeText }}>preset</code>{" "}
            prop — Liquid Glass, Bento, Brutalist, Terminal, Soft UI, Bloom, Minimal, and more. Each bundles palette, shape, density, shadow, and font.
          </p>
          <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: shell.text }}>8 shadow presets</strong> with dark-mode-native variants that simulate light sources instead of darkening.
          </p>
        </div>
      ),
    },
    {
      version: "V0.26",
      date: "MARCH 2026",
      title: (
        <>
          Composition <span style={{ color: GREEN }}>Patterns</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "7 PATTERNS" },
      ],
      content: (
        <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
          Ready-to-use patterns showing how components compose into production UIs —{" "}
          <strong style={{ color: shell.text }}>ProfileCard</strong>,{" "}
          <strong style={{ color: shell.text }}>SettingsPanel</strong>,{" "}
          <strong style={{ color: shell.text }}>StatsRow</strong>,{" "}
          <strong style={{ color: shell.text }}>ActionBar</strong>,{" "}
          <strong style={{ color: shell.text }}>FormLayout</strong>,{" "}
          <strong style={{ color: shell.text }}>EmptyStateCard</strong>,{" "}
          <strong style={{ color: shell.text }}>CollapsibleCard</strong>.
          Each pattern ships with working JSX, variants, and design notes.
        </p>
      ),
    },
    {
      version: "V0.25",
      date: "MARCH 2026",
      title: (
        <>
          Card <span style={{ color: GOLD }}>&amp;</span> Collapsible{" "}
          <span style={{ color: GREEN }}>Polish</span>
        </>
      ),
      badges: [
        { label: "ENHANCED" },
        { label: "MOLECULE" },
      ],
      content: (
        <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
          Card gets <strong style={{ color: shell.text }}>hoverable</strong> prop for lift + glow without onClick.
          Collapsible adds smooth 180ms height animation, CSS hover feedback, focus-visible ring,{" "}
          <strong style={{ color: shell.text }}>disabled</strong> and{" "}
          <strong style={{ color: shell.text }}>padded</strong> props.
          New <strong style={{ color: shell.text }}>CollapsibleCard</strong> pattern composes both.
        </p>
      ),
    },
    {
      version: "V0.24",
      date: "MARCH 2026",
      title: (
        <>
          <span style={{ color: GREEN }}>NavMenu</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
        { label: "MOLECULE" },
      ],
      content: (
        <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
          Compound API with{" "}
          <strong style={{ color: shell.text }}>Item</strong>,{" "}
          <strong style={{ color: shell.text }}>Group</strong>,{" "}
          <strong style={{ color: shell.text }}>Sub</strong>,{" "}
          <strong style={{ color: shell.text }}>Separator</strong>.
          Sliding highlight pill, 3 highlight states, inverse mode, hasIcons, 3 sizes.
        </p>
      ),
    },
    {
      version: "V0.23",
      date: "MARCH 2026",
      title: (
        <>
          SplitButton <span style={{ color: GOLD }}>&amp;</span> ButtonGroup
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
        { label: "ATOM" },
      ],
      content: (
        <p style={{ fontSize: 14, color: shell.muted, lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: shell.text }}>SplitButton</strong> — primary action + chevron dropdown, all 7 variants, 5 sizes, composes Menu.{" "}
          <strong style={{ color: shell.text }}>ButtonGroup</strong> — visual grouping with flattened inner radius.
          Button also gets wider padding, icon-only auto-sizing, transparent outline backgrounds.
        </p>
      ),
    },
  ];
}

/* ─── Timeline entry ───────────────────────────────────────────────────────── */

function TimelineEntry({
  entry,
  shell,
  isLast,
}: {
  entry: Entry;
  shell: ShellColors;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 28,
        position: "relative",
      }}
    >
      {/* Dot column */}
      <div
        style={{
          width: 12,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 28,
        }}
      >
        <div
          style={{
            width: entry.latest ? 12 : 8,
            height: entry.latest ? 12 : 8,
            borderRadius: "50%",
            background: entry.latest ? GOLD : shell.subtle,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          border: `1px solid ${shell.border}`,
          borderRadius: 12,
          padding: "24px 28px",
          marginBottom: isLast ? 0 : 24,
          textAlign: "left",
        }}
      >
        {/* Version + date + badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: shell.muted,
              letterSpacing: "0.04em",
            }}
          >
            {entry.version}
            <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
            {entry.date}
          </span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {entry.badges.map((b) => (
              <TBadge
                key={b.label}
                label={b.label}
                green={b.green}
                shell={shell}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: shell.text,
            margin: "0 0 16px",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          {entry.title}
        </h3>

        {/* Content */}
        {entry.content}
      </div>
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */

export function ChangelogTimeline({
  shellTheme,
}: {
  shellTheme: "light" | "dark";
}) {
  const shell = getShell(shellTheme);
  const entries = buildEntries(shell);

  return (
    <div
      className="mt-24 w-full mx-auto"
      style={{ maxWidth: 900, padding: "0 24px" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 48,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: shell.muted,
            fontFamily: "monospace",
          }}
        >
          CHANGELOG
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: GREEN,
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: GREEN,
              display: "inline-block",
            }}
          />
          ACTIVE DEVELOPMENT
        </span>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Continuous vertical line */}
        <div
          style={{
            position: "absolute",
            left: 5.5,
            top: 40,
            bottom: 40,
            width: 1,
            background: shell.border,
            zIndex: 0,
          }}
        />

        {entries.map((entry, i) => (
          <TimelineEntry
            key={entry.version}
            entry={entry}
            shell={shell}
            isLast={i === entries.length - 1}
          />
        ))}
      </div>

      {/* Footer stats */}
      <div
        style={{
          borderTop: `1px solid ${shell.border}`,
          marginTop: 48,
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: shell.muted,
            fontFamily: "monospace",
          }}
        >
          V0.16 → V0.34 · 19 RELEASES
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            color: shell.muted,
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: GOLD }}>67</span> COMPONENTS + <span style={{ color: GREEN }}>10</span> DESIGN PRESETS
        </span>
      </div>

      {/* Full changelog link */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link
          href="/components/changelog"
          style={{
            fontSize: 13,
            color: shell.subtle,
            textDecoration: "none",
          }}
        >
          View full changelog →
        </Link>
      </div>
    </div>
  );
}

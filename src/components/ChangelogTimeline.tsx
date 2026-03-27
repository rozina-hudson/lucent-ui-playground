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
      version: "V0.22",
      date: "MARCH 2026",
      latest: true,
      title: (
        <>
          Chip <span style={{ color: GREEN }}>Pulse</span>, Ghost{" "}
          <span style={{ color: GOLD }}>&amp;</span> Dot-only
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
        { label: "ATOM" },
      ],
      content: (
        <p
          style={{
            fontSize: 14,
            color: shell.muted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Three new modes for the Chip atom.{" "}
          <strong style={{ color: shell.text }}>pulse</strong> adds a pulsing
          ring animation on the status dot for live states.{" "}
          <strong style={{ color: shell.text }}>ghost</strong> renders
          transparent background with text-only, 8% hover tint.{" "}
          <strong style={{ color: shell.text }}>dot-only</strong> omits children
          for a compact circular indicator. Children are now optional.
        </p>
      ),
    },
    {
      version: "V0.21",
      date: "MARCH 2026",
      title: (
        <>
          Progress <span style={{ color: GREEN }}>Bar</span>
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
        { label: "ATOM" },
      ],
      content: (
        <>
          <p
            style={{
              fontSize: 14,
              color: shell.muted,
              lineHeight: 1.7,
              margin: "0 0 16px",
            }}
          >
            Threshold auto-variant —{" "}
            <strong style={{ color: shell.text }}>warnAt</strong> and{" "}
            <strong style={{ color: shell.text }}>dangerAt</strong> props
            auto-switch color based on value direction. Ascending for
            &ldquo;high is bad&rdquo; metrics, descending for &ldquo;low is
            bad&rdquo;. The <em>intent</em> lives in the manifest.
          </p>
          <div
            style={{
              background: shell.codeBg,
              border: `1px solid ${shell.border}`,
              borderRadius: 8,
              padding: "16px 20px",
              fontSize: 13,
              fontFamily: "monospace",
              lineHeight: 1.8,
              overflowX: "auto",
              color: shell.codeText,
            }}
          >
            <span style={{ color: shell.muted }}>
              {"// ascending — high is bad (CPU, disk, error rate)"}
            </span>{" "}
            <span style={{ color: GREEN }}>&lt;Progress</span> value=
            <span style={{ color: GOLD }}>{"{usage}"}</span> warnAt=
            <span style={{ color: GOLD }}>{"{70}"}</span> dangerAt=
            <span style={{ color: GOLD }}>{"{90}"}</span>{" "}
            <span style={{ color: GREEN }}>/&gt;</span>
            <br />
            <span style={{ color: shell.muted }}>
              {"// descending — low is bad (battery, health, quota)"}
            </span>{" "}
            <span style={{ color: GREEN }}>&lt;Progress</span> value=
            <span style={{ color: GOLD }}>{"{battery}"}</span> warnAt=
            <span style={{ color: GOLD }}>{"{30}"}</span> dangerAt=
            <span style={{ color: GOLD }}>{"{10}"}</span>{" "}
            <span style={{ color: GREEN }}>/&gt;</span>
          </div>
        </>
      ),
    },
    {
      version: "V0.20",
      date: "MARCH 2026",
      title: (
        <>
          Stack <span style={{ color: GOLD }}>&amp;</span> Row
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
      ],
      content: (
        <p
          style={{
            fontSize: 14,
            color: shell.muted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Layout primitives with density-aware spacing tokens. Gap values
          reference{" "}
          <strong style={{ color: shell.text }}>
            var(--lucent-space-&#123;n&#125;)
          </strong>
          , so density presets scale the entire layout automatically — no
          overrides required.
        </p>
      ),
    },
    {
      version: "V0.19",
      date: "MARCH 2026",
      title: (
        <>
          Toast <span style={{ color: GOLD }}>+</span> Overlay Polish
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
        { label: "MOLECULE" },
      ],
      content: (
        <p
          style={{
            fontSize: 14,
            color: shell.muted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Cascading card stack with hover-to-expand. Six positions. Imperative{" "}
          <strong style={{ color: shell.text }}>useToast</strong> API. Then{" "}
          <strong style={{ color: shell.text }}>v0.19.1</strong> dropped frosted
          glass across every overlay — CommandPalette, Menu, MultiSelect,
          DatePicker, SearchInput — with portal rendering that escapes{" "}
          <strong style={{ color: shell.text }}>overflow:hidden</strong>.
        </p>
      ),
    },
    {
      version: "V0.17 – V0.18",
      date: "MARCH 2026",
      title: (
        <>
          Menu <span style={{ color: GOLD }}>&amp;</span> Button
        </>
      ),
      badges: [
        { label: "NEW", green: true },
        { label: "COMPONENT_MANIFEST" },
      ],
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {[
            {
              label: "Menu",
              text: "Compound API, 8-direction portal placement, WAI-ARIA keyboard navigation, viewport-edge flipping",
            },
            {
              label: "Button\n2xs",
              text: "22px height for dense UIs — toolbars, table-inline actions, icon triggers where xs is still too tall",
            },
            {
              label: "danger-outline / ghost",
              text: "Two new destructive variants at different emphasis levels",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", gap: 16, alignItems: "baseline" }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: shell.text,
                  fontFamily: "monospace",
                  minWidth: 120,
                  flexShrink: 0,
                  whiteSpace: "pre-line",
                  lineHeight: 1.4,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: shell.muted,
                  lineHeight: 1.6,
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
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
          V0.17 → V0.22 · 6 RELEASES THIS MONTH
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
          <span style={{ color: GOLD }}>25</span> COMPONENTS SHIP WITH
          COMPONENT_MANIFEST
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

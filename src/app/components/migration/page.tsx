"use client";

import { useMemo } from "react";
import { Text, Divider } from "lucent-ui";
import { getShell } from "@/lib/shellColors";
import { usePlayground } from "@/lib/playgroundContext";
import { CodeBlock } from "@/components/docs/CodeBlock";

const BEFORE_CODE = `<LucentProvider tokens={{ surfaceDefault: '#fff', bgMuted: '#f3f4f6' }}>`;
const AFTER_CODE = `<LucentProvider tokens={{ surface: '#fff', surfaceSecondary: '#f3f4f6' }}>`;

const renames: { before: string; after: string; notes: string }[] = [
  {
    before: "surfaceDefault",
    after: "surface",
    notes: "Component background (cards, inputs, dropdowns)",
  },
  {
    before: "bgMuted",
    after: "surfaceSecondary",
    notes: "Tinted fill layer — footer areas, inset panels, disabled inputs inside a card",
  },
];

export default function MigrationPage() {
  const { pg } = usePlayground();
  const shell = useMemo(() => getShell(pg.theme), [pg.theme]);

  const td: React.CSSProperties = {
    padding: "10px 16px",
    fontSize: 13,
    fontFamily: "monospace",
    color: shell.text,
    borderBottom: `1px solid ${shell.border}`,
    verticalAlign: "top",
  };
  const tdNotes: React.CSSProperties = {
    ...td,
    fontFamily: "var(--font-dm-sans), sans-serif",
    color: shell.muted,
  };
  const th: React.CSSProperties = {
    padding: "8px 16px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: shell.subtle,
    textAlign: "left",
    borderBottom: `1px solid ${shell.border}`,
    background: shell.surface,
    fontFamily: "var(--font-dm-sans), sans-serif",
  };

  return (
    <main style={{ flex: 1, padding: "40px 48px", maxWidth: 760 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Text
            as="h1"
            family="display"
            size="3xl"
            weight="bold"
            style={{ color: shell.text, margin: 0, letterSpacing: "-0.02em" }}
          >
            Migrating to 0.8.0
          </Text>
        </div>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ margin: 0, color: shell.muted, maxWidth: 560 }}>
          Three surface tokens were renamed for clarity. If you pass custom tokens to{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>LucentProvider</code>,
          you&rsquo;ll need to update them. Everything else is unchanged.
        </Text>
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      {/* Token renames */}
      <SectionTitle shell={shell}>Token renames</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ color: shell.muted, marginTop: 0, marginBottom: 20 }}>
          Three tokens were renamed. The old names no longer exist in{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>LucentTokens</code>.
        </Text>
        <div
          style={{
            border: `1px solid ${shell.border}`,
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Before</th>
                <th style={th}>After</th>
                <th style={th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {renames.map((row) => (
                <tr key={row.before}>
                  <td style={{ ...td, color: shell.subtle, textDecoration: "line-through" }}>{row.before}</td>
                  <td style={td}>{row.after}</td>
                  <td style={tdNotes}>{row.notes}</td>
                </tr>
              ))}
              <tr>
                <td style={{ ...td, color: shell.subtle, borderBottom: "none" }}>(new)</td>
                <td style={{ ...td, borderBottom: "none" }}>surfaceSecondary</td>
                <td style={{ ...tdNotes, borderBottom: "none" }}>
                  Was previously <code style={{ fontFamily: "monospace", fontSize: 12 }}>bgMuted</code>; now correctly placed in the surface tier
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      {/* Who is affected */}
      <SectionTitle shell={shell}>Who is affected</SectionTitle>
      <div style={{ marginBottom: 40 }}>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ color: shell.muted, marginTop: 0, marginBottom: 20 }}>
          Only projects passing custom token overrides to{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>LucentProvider</code>.
          If you&rsquo;re using the default theme or a{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>brandTokens</code> preset, no changes are needed.
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <Text as="p" size="xs" weight="medium" style={{ color: shell.subtle, margin: "0 0 6px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Before
            </Text>
            <CodeBlock code={BEFORE_CODE} language="tsx" shell={shell} />
          </div>
          <div>
            <Text as="p" size="xs" weight="medium" style={{ color: shell.subtle, margin: "0 0 6px", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              After
            </Text>
            <CodeBlock code={AFTER_CODE} language="tsx" shell={shell} />
          </div>
        </div>
      </div>

      <Divider style={{ margin: "0 0 36px" }} />

      {/* Why */}
      <SectionTitle shell={shell}>Why</SectionTitle>
      <div style={{ marginBottom: 64 }}>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ color: shell.muted, marginTop: 0, marginBottom: 12 }}>
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>surfaceDefault</code> vs{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>bgMuted</code> blurred the line between
          the page canvas layer (<code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>bg*</code>) and the
          component elevation layer (<code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>surface*</code>).
        </Text>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ color: shell.muted, margin: 0 }}>
          The rename makes the distinction explicit:{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>bg*</code> tokens are for layout regions
          (body, sidebar, page background);{" "}
          <code style={{ fontFamily: "monospace", fontSize: 12, color: shell.codeText }}>surface*</code> tokens are for component
          surfaces (cards, modals, inputs). It&rsquo;s a breaking change but a mechanical find-and-replace for anyone affected.
        </Text>
      </div>
    </main>
  );
}

function SectionTitle({ children, shell }: { children: React.ReactNode; shell: ReturnType<typeof getShell> }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
      <Text
        as="h2"
        family="display"
        size="xl"
        weight="semibold"
        style={{ color: shell.text, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
      >
        {children}
      </Text>
      <div style={{ flex: 1, height: 1, background: shell.border }} />
    </div>
  );
}

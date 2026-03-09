"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Text, Divider, Badge } from "lucent-ui";
import { getShell } from "@/lib/shellColors";
import { usePlayground } from "@/lib/playgroundContext";
import { CHANGELOG } from "@/lib/changelogData";

export default function ChangelogPage() {
  const { pg } = usePlayground();
  const shell = useMemo(() => getShell(pg.theme), [pg.theme]);

  return (
    <main style={{ flex: 1, padding: "40px 48px", maxWidth: 760 }}>
      <div style={{ marginBottom: 40 }}>
        <Text
          as="h1"
          family="display"
          size="3xl"
          weight="bold"
          style={{ color: shell.text, margin: "0 0 10px", letterSpacing: "-0.02em" }}
        >
          Changelog
        </Text>
        <Text as="p" size="sm" lineHeight="relaxed" style={{ margin: 0, color: shell.muted, maxWidth: 520 }}>
          What&rsquo;s new in each version of Lucent UI.
        </Text>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {CHANGELOG.map((entry, i) => (
          <div key={entry.version}>
            {/* Version header */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
              <Text
                as="h2"
                family="display"
                size="xl"
                weight="semibold"
                style={{ color: shell.text, margin: 0, letterSpacing: "-0.01em" }}
              >
                {entry.version}
              </Text>
              {entry.date && (
                <Text as="span" size="sm" style={{ color: shell.subtle }}>
                  {entry.date}
                </Text>
              )}
              <div style={{ flex: 1, height: 1, background: shell.border }} />
            </div>

            {/* Section label */}
            <div style={{ marginBottom: 16 }}>
              <Text as="p" size="sm" weight="medium" style={{ color: shell.muted, margin: 0 }}>
                {entry.title}
              </Text>
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {entry.items.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 16 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: shell.subtle,
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  <div>
                    <Text
                      as="span"
                      size="sm"
                      weight="medium"
                      style={{
                        color: shell.text,
                        fontFamily: "monospace",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text as="span" size="sm" lineHeight="relaxed" style={{ color: shell.muted, display: "block" }}>
                      {item.description.includes("migration guide") ? (
                        <>
                          {item.description.replace(" — see the migration guide.", "")} —{" "}
                          <Link
                            href="/components/migration"
                            style={{ color: shell.text, textDecoration: "underline", textUnderlineOffset: 3 }}
                          >
                            see the migration guide
                          </Link>
                          .
                        </>
                      ) : (
                        item.description
                      )}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            {i < CHANGELOG.length - 1 && (
              <Divider style={{ margin: "0 0 40px" }} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

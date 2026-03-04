import type { PropDef } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

type Props = {
  props: PropDef[];
  shell: ShellColors;
};

export function PropsTable({ props, shell }: Props) {
  if (props.length === 0) return null;

  const th: React.CSSProperties = {
    padding: "8px 12px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: shell.subtle,
    fontFamily: "var(--font-dm-sans), sans-serif",
    borderBottom: `1px solid ${shell.border}`,
    whiteSpace: "nowrap",
  };

  const tdBase: React.CSSProperties = {
    padding: "10px 12px",
    fontSize: 13,
    fontFamily: "var(--font-dm-sans), sans-serif",
    verticalAlign: "top",
    borderBottom: `1px solid ${shell.border}`,
  };

  return (
    <div style={{ border: `1px solid ${shell.border}`, borderRadius: 10, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: shell.surface }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={{ ...th, width: "50%" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              style={{ background: i % 2 === 0 ? "transparent" : shell.surface + "80" }}
            >
              <td style={{ ...tdBase, color: shell.text }}>
                <code
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    background: shell.codeBg,
                    padding: "2px 6px",
                    borderRadius: 4,
                    color: shell.codeText,
                  }}
                >
                  {p.name}
                </code>
                {p.required && (
                  <span style={{ color: "#ef4444", marginLeft: 4, fontSize: 11 }}>*</span>
                )}
              </td>
              <td style={{ ...tdBase, color: shell.muted }}>
                <code style={{ fontFamily: "monospace", fontSize: 11 }}>{p.type}</code>
              </td>
              <td style={{ ...tdBase, color: shell.muted }}>
                {p.defaultValue ? (
                  <code style={{ fontFamily: "monospace", fontSize: 11 }}>{p.defaultValue}</code>
                ) : (
                  <span style={{ color: shell.subtle }}>—</span>
                )}
              </td>
              <td style={{ ...tdBase, color: shell.muted }}>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

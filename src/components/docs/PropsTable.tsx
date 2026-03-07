import { Table } from "lucent-ui";
import type { PropDef } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

type Props = {
  props: PropDef[];
  shell: ShellColors;
};

export function PropsTable({ props, shell }: Props) {
  if (props.length === 0) return null;

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell as="th">Prop</Table.Cell>
          <Table.Cell as="th">Type</Table.Cell>
          <Table.Cell as="th">Default</Table.Cell>
          <Table.Cell as="th" style={{ width: "50%" }}>Description</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {props.map((p) => (
          <Table.Row key={p.name}>
            <Table.Cell>
              <code style={{ fontFamily: "monospace", fontSize: 12, background: shell.codeBg, padding: "2px 6px", borderRadius: 4, color: shell.codeText }}>
                {p.name}
              </code>
              {p.required && <span style={{ color: "#ef4444", marginLeft: 4, fontSize: 11 }}>*</span>}
            </Table.Cell>
            <Table.Cell>
              <code style={{ fontFamily: "monospace", fontSize: 11 }}>{p.type}</code>
            </Table.Cell>
            <Table.Cell>
              {p.defaultValue
                ? <code style={{ fontFamily: "monospace", fontSize: 11 }}>{p.defaultValue}</code>
                : <span style={{ color: shell.subtle }}>—</span>}
            </Table.Cell>
            <Table.Cell>{p.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

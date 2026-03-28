"use client";

import React, { useMemo } from "react";
import * as Lucent from "lucent-ui";
import { Select, Toggle, Input, Text, Radio, useLucent, ToastProvider, useToast, Button } from "lucent-ui";
import type { ComponentDef } from "@/lib/componentData";
import type { ShellColors } from "@/lib/shellColors";

// Error boundary so a bad prop combination never crashes the whole page
class PreviewErrorBoundary extends React.Component<
  { children: React.ReactNode; shell: ShellColors },
  { error: boolean }
> {
  constructor(props: { children: React.ReactNode; shell: ShellColors }) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch() { /* suppress console error in prod */ }
  render() {
    if (this.state.error) {
      return (
        <Text size="xs" style={{ color: this.props.shell.muted }}>
          Live preview unavailable for this component.
        </Text>
      );
    }
    return this.props.children;
  }
}

type Props = {
  def: ComponentDef;
  shell: ShellColors;
  values: Record<string, any>;
  onValuesChange: (name: string, v: any) => void;
  previewBg?: string;
};

const DEFAULT_TABS = [
  { value: "one", label: "Tab One", content: <Text size="sm">Content for Tab One.</Text> },
  { value: "two", label: "Tab Two", content: <Text size="sm">Content for Tab Two.</Text> },
  { value: "three", label: "Tab Three", content: <Text size="sm">Content for Tab Three.</Text> },
];

function ToastPreviewButtons() {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Changes saved", description: "Your profile has been updated.", variant: "success" })}>Success</Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Warning", description: "Approaching storage limit.", variant: "warning" })}>Warning</Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "danger" })}>Danger</Button>
      <Button variant="outline" size="sm" onClick={() => toast({ title: "Item deleted", variant: "danger", action: { label: "Undo", onClick: () => {} } })}>With action</Button>
    </div>
  );
}

export function ComponentCustomizer({ def, shell, values, onValuesChange, previewBg }: Props) {
  const compName = def.customizerName ?? def.name;
  const Comp = useMemo(() => (Lucent as any)[compName] ?? null, [compName]);
  const { tokens } = useLucent();

  const configurableProps = def.props.filter(
    (p) =>
      p.name !== "children" &&
      !p.type.includes("=>") &&       // skip callbacks (onChange, onClick, etc.)
      !p.type.includes("CSSProperties") // skip style objects
  );

  const renderControl = (p: ComponentDef["props"][0]) => {
    const { name, type } = p;
    const unionMatch = type.match(/"([^"]+)"/g);
    const isBool = type.includes("boolean");

    if (isBool) {
      return (
        <div key={name} style={{ marginBottom: 12 }}>
          <Toggle
            label={name}
            size="sm"
            checked={!!values[name]}
            onChange={(e) => onValuesChange(name, e.target.checked)}
          />
        </div>
      );
    } else if (unionMatch && unionMatch.length <= 6) {
      const options = unionMatch.map((s) => s.replace(/"/g, ""));
      return (
        <div key={name} style={{ marginBottom: 12 }}>
          <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>{name}</Text>
          <Select
            size="sm"
            value={values[name] ?? options[0]}
            onChange={(e) => onValuesChange(name, e.target.value)}
            options={options.map((o) => ({ value: o, label: o }))}
          />
        </div>
      );
    } else {
      return (
        <div key={name} style={{ marginBottom: 12 }}>
          <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>{name}</Text>
          <Input
            value={values[name] ?? ""}
            onChange={(e) => onValuesChange(name, e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", border: `1px solid ${shell.border}`, borderRadius: 12, overflow: "hidden" }}>
      {/* Live preview */}
      <div
        style={{
          flex: 1,
          background: previewBg,
          padding: "32px 28px",
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Comp ? (
          <PreviewErrorBoundary shell={shell}>
            {compName === "RadioGroup" ? (
              <Comp name="preview" value="" onChange={() => {}} {...(values as any)}>
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
                <Radio value="c" label="Option C" />
              </Comp>
            ) : compName === "Tabs" ? (
              <Comp
                defaultValue="one"
                tabs={DEFAULT_TABS}
                {...(values as any)}
              />
            ) : compName === "Table" ? (
              <Comp {...(values as any)}>
                <Lucent.Table.Head>
                  <Lucent.Table.Row>
                    <Lucent.Table.Cell as="th">Name</Lucent.Table.Cell>
                    <Lucent.Table.Cell as="th">Role</Lucent.Table.Cell>
                  </Lucent.Table.Row>
                </Lucent.Table.Head>
                <Lucent.Table.Body>
                  <Lucent.Table.Row>
                    <Lucent.Table.Cell>Alice</Lucent.Table.Cell>
                    <Lucent.Table.Cell>Engineer</Lucent.Table.Cell>
                  </Lucent.Table.Row>
                  <Lucent.Table.Row>
                    <Lucent.Table.Cell>Bob</Lucent.Table.Cell>
                    <Lucent.Table.Cell>Designer</Lucent.Table.Cell>
                  </Lucent.Table.Row>
                  <Lucent.Table.Row>
                    <Lucent.Table.Cell>Carol</Lucent.Table.Cell>
                    <Lucent.Table.Cell>Manager</Lucent.Table.Cell>
                  </Lucent.Table.Row>
                </Lucent.Table.Body>
              </Comp>
            ) : compName === "CodeBlock" ? (
              <Comp
                language="tsx"
                code={`<Button variant="primary">Save</Button>`}
                {...(values as any)}
              />
            ) : compName === "NavLink" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  width: 200,
                  padding: 12,
                  borderRadius: 10,
                  ...(values.inverse ? {
                    background: tokens.bgSubtle,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                  } : {}),
                }}
              >
                <Comp {...(values as any)} isActive href="#">Dashboard</Comp>
                <Comp {...(values as any)} isActive={false} href="#">Components</Comp>
                <Comp {...(values as any)} isActive={false} href="#">Settings</Comp>
              </div>
            ) : compName === "Chip" ? (
              <Comp {...(values as any)}>Sample Chip</Comp>
            ) : compName === "ToastProvider" ? (
              <ToastProvider
                position={values.position ?? "bottom-right"}
                duration={values.duration ? Number(values.duration) : 5000}
              >
                <ToastPreviewButtons />
              </ToastProvider>
            ) : (
              <Comp
                {...(values as any)}
                {...(def.props.some((p) => p.name === "children") ? { children: def.name } : {})}
              />
            )}
          </PreviewErrorBoundary>
        ) : (
          <Text size="xs">Unable to render preview</Text>
        )}
      </div>

      {/* Controls sidebar */}
      <div
        style={{
          width: 220,
          flexShrink: 0,
          borderLeft: `1px solid ${shell.border}`,
          background: shell.surface,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        {configurableProps.length === 0 ? (
          <Text size="xs" style={{ color: shell.muted }}>No configurable props.</Text>
        ) : (
          configurableProps.map(renderControl)
        )}
      </div>
    </div>
  );
}

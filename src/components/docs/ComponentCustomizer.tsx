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
  /** Fallback preview component for patterns / components without lucent-ui exports */
  fallbackPreview?: React.FC | null;
};

const DEFAULT_TABS = [
  { value: "one", label: "Tab One", content: <Text size="sm">Content for Tab One.</Text> },
  { value: "two", label: "Tab Two", content: <Text size="sm">Content for Tab Two.</Text> },
  { value: "three", label: "Tab Three", content: <Text size="sm">Content for Tab Three.</Text> },
];

function RadioGroupPreview({ values }: { values: Record<string, any> }) {
  const [selected, setSelected] = React.useState("a");
  const { orientation, disabled, ...radioProps } = values;
  return (
    <Lucent.RadioGroup name="preview" value={selected} onChange={setSelected} orientation={orientation} disabled={disabled}>
      <Radio value="a" label="Option A" {...radioProps} />
      <Radio value="b" label="Option B" {...radioProps} />
      <Radio value="c" label="Option C" {...radioProps} />
    </Lucent.RadioGroup>
  );
}

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

export function ComponentCustomizer({ def, shell, values, onValuesChange, previewBg, fallbackPreview: FallbackPreview }: Props) {
  const compName = def.customizerName ?? def.name;
  const Comp = useMemo(() => (Lucent as any)[compName] ?? null, [compName]);
  const { tokens } = useLucent();

  const EXCLUDED_PROPS = new Set([
    "children", "value", "defaultValue", "type", "id", "name",
    "htmlFor", "className", "ref", "required", "options", "results",
    "items", "columns", "rows", "steps", "commands", "tabs",
    "bordered", "menuPlacement",
  ]);

  // Components that use children as a text label
  const LABEL_COMPONENTS = new Set(["Button", "SplitButton", "Chip"]);
  const hasLabel = LABEL_COMPONENTS.has(compName);

  // Components with custom playground-only controls (not in props table)
  const hasCustomControls = compName === "ButtonGroup";

  const configurableProps = def.props.filter(
    (p) =>
      !EXCLUDED_PROPS.has(p.name) &&
      !p.type.includes("=>") &&       // skip callbacks (onChange, onClick, etc.)
      !p.type.includes("CSSProperties") && // skip style objects
      p.type !== "component"           // skip pattern composition props
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
    } else if (unionMatch && unionMatch.length <= 10) {
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
            size="sm"
            value={values[name] ?? ""}
            onChange={(e) => onValuesChange(name, e.target.value)}
          />
        </div>
      );
    }
  };

  // Render the live preview — special cases for components needing children/data
  const renderPreview = () => {
    // Patterns and components not exported from lucent-ui → use fallback preview
    if (!Comp) {
      if (FallbackPreview) return <FallbackPreview />;
      return <Text size="xs">Unable to render preview</Text>;
    }

    switch (compName) {
      case "RadioGroup":
        return <RadioGroupPreview values={values} />;

      case "Tabs":
        return <Comp defaultValue="one" tabs={DEFAULT_TABS} {...(values as any)} />;

      case "Table":
        return (
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
        );

      case "CodeBlock":
        return <Comp language="tsx" code={`<Button variant="primary">Save</Button>`} {...(values as any)} />;

      case "NavLink":
        return (
          <div style={{
            display: "flex", flexDirection: "column", gap: 4, width: 200, padding: 12, borderRadius: 10,
            ...(values.inverse ? { background: tokens.bgSubtle, boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)" } : {}),
          }}>
            <Comp {...(values as any)} isActive href="#">Dashboard</Comp>
            <Comp {...(values as any)} isActive={false} href="#">Components</Comp>
            <Comp {...(values as any)} isActive={false} href="#">Settings</Comp>
          </div>
        );

      case "Chip":
        return <Comp {...(values as any)}>{values._label ?? "Sample Chip"}</Comp>;

      case "ToastProvider":
        return (
          <ToastProvider
            position={values.position ?? "bottom-right"}
            duration={values.duration ? Number(values.duration) : 5000}
          >
            <ToastPreviewButtons />
          </ToastProvider>
        );

      // ── Additional special cases ─────────────────────────────────────────

      case "Collapsible":
        return (
          <Comp
            trigger={<Text weight="medium">Click to expand</Text>}
            defaultOpen
            {...(values as any)}
          >
            <Text size="sm" color="secondary">This is the collapsible content. It animates smoothly when toggling.</Text>
          </Comp>
        );

      case "Menu":
        return (
          <Lucent.Menu trigger={<Button variant="outline">Actions</Button>} {...(values as any)}>
            <Lucent.MenuItem onSelect={() => {}}>Edit</Lucent.MenuItem>
            <Lucent.MenuItem onSelect={() => {}}>Duplicate</Lucent.MenuItem>
            <Lucent.MenuSeparator />
            <Lucent.MenuItem onSelect={() => {}} danger>Delete</Lucent.MenuItem>
          </Lucent.Menu>
        );

      case "SplitButton":
        return (
          <Comp
            menuItems={[
              { label: "Save as draft", onSelect: () => {} },
              { label: "Save & publish", onSelect: () => {} },
              { label: "Discard", onSelect: () => {}, danger: true },
            ]}
            {...(values as any)}
          >
            {values._label ?? "Save"}
          </Comp>
        );

      case "ButtonGroup": {
        const bgVariant = values._bgVariant ?? "outline";
        const bgSize = values._bgSize ?? "md";
        const bgLabels = (values._bgLabels ?? "Left, Center, Right").split(",").map((s: string) => s.trim());
        return (
          <Comp>
            {bgLabels.map((label: string, i: number) => (
              <Button key={i} variant={bgVariant} size={bgSize}>{label}</Button>
            ))}
          </Comp>
        );
      }

      case "Stepper":
        return (
          <Comp
            steps={["Account", "Profile", "Review", "Confirm"]}
            current={1}
            {...(values as any)}
          />
        );

      case "Timeline":
        return (
          <Comp
            items={[
              { title: "Deployed to production", date: "2 min ago", status: "success" as const },
              { title: "Build completed", date: "5 min ago", status: "success" as const },
              { title: "Tests passed", date: "8 min ago", status: "info" as const },
              { title: "PR approved", date: "15 min ago", status: "default" as const },
            ]}
            {...(values as any)}
          />
        );

      case "DataTable":
        return (
          <Comp
            columns={[
              { key: "name", header: "Name" },
              { key: "role", header: "Role" },
              { key: "status", header: "Status" },
            ]}
            rows={[
              { name: "Alice", role: "Engineer", status: "Active" },
              { name: "Bob", role: "Designer", status: "Away" },
              { name: "Carol", role: "Manager", status: "Active" },
            ]}
            {...(values as any)}
          />
        );

      case "NavMenu":
        return (
          <Lucent.NavMenu aria-label="Preview" {...(values as any)}>
            <Lucent.NavMenuItem href="#" isActive>Dashboard</Lucent.NavMenuItem>
            <Lucent.NavMenuItem href="#">Components</Lucent.NavMenuItem>
            <Lucent.NavMenuItem href="#">Settings</Lucent.NavMenuItem>
          </Lucent.NavMenu>
        );

      case "CommandPalette":
        return (
          <div>
            <Text size="xs" color="secondary" style={{ marginBottom: 8 }}>Press the button or use ⌘K</Text>
            <Comp
              commands={[
                { id: "new", label: "New file", group: "File", onSelect: () => {} },
                { id: "save", label: "Save", group: "File", onSelect: () => {} },
                { id: "find", label: "Find in project", group: "Edit", onSelect: () => {} },
              ]}
              {...(values as any)}
            />
          </div>
        );

      case "Alert":
        return <Comp title="Heads up" {...(values as any)}>This is an alert message with additional details.</Comp>;

      case "Card":
        return (
          <Comp {...(values as any)}>
            <Lucent.Stack gap="2">
              <Text weight="semibold">Card Title</Text>
              <Text size="sm" color="secondary">Card content goes here. This is a sample card with some text.</Text>
            </Lucent.Stack>
          </Comp>
        );

      case "Select":
        return (
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Comp
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "svelte", label: "Svelte" },
                { value: "angular", label: "Angular" },
              ]}
              {...(values as any)}
            />
          </div>
        );

      case "EmptyState":
        return <Comp title="No results found" description="Try adjusting your search or filters." {...(values as any)} />;

      case "Tooltip":
        return <Comp content="This is a tooltip" {...(values as any)}><Button variant="outline">Hover me</Button></Comp>;

      case "Breadcrumb":
        return <Comp items={[{ label: "Home", href: "#" }, { label: "Components", href: "#" }, { label: "Breadcrumb" }]} {...(values as any)} />;

      case "Skeleton":
        return (
          <Lucent.Stack gap="3" style={{ width: 200 }}>
            <Comp variant="circle" width={48} height={48} {...(values as any)} />
            <Comp variant="text" lines={3} {...(values as any)} />
          </Lucent.Stack>
        );

      case "MultiSelect":
        return (
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Comp
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "svelte", label: "Svelte" },
                { value: "angular", label: "Angular" },
              ]}
              placeholder="Select frameworks..."
              {...(values as any)}
            />
          </div>
        );

      case "SegmentedControl":
        return (
          <Comp
            options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
              { value: "board", label: "Board" },
            ]}
            defaultValue="grid"
            {...(values as any)}
          />
        );

      case "FormField":
        return (
          <div style={{ width: "100%", maxWidth: 360 }}>
            <Comp label="Email" htmlFor="preview-email" helperText="We'll never share your email." {...(values as any)}>
              <Input id="preview-email" placeholder="you@example.com" />
            </Comp>
          </div>
        );

      case "FilterSelect":
        return (
          <Comp
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" },
            ]}
            {...(values as any)}
          />
        );

      case "FilterMultiSelect":
        return (
          <Comp
            label="Tags"
            options={[
              { value: "react", label: "React" },
              { value: "typescript", label: "TypeScript" },
              { value: "node", label: "Node.js" },
            ]}
            {...(values as any)}
          />
        );

      case "FileUpload":
        return <Comp accept="image/*" multiple {...(values as any)} />;

      case "PageLayout":
        return (
          <div style={{ height: 200, border: `1px solid ${shell.border}`, borderRadius: 8, overflow: "hidden" }}>
            <Comp
              header={<div style={{ padding: "8px 16px", background: tokens.bgSubtle }}><Text size="sm" weight="medium">Header</Text></div>}
              sidebar={<div style={{ padding: "8px 16px" }}><Text size="xs" color="secondary">Sidebar</Text></div>}
              headerHeight={36}
              sidebarWidth={100}
              {...(values as any)}
            >
              <div style={{ padding: 16 }}><Text size="sm">Main content area</Text></div>
            </Comp>
          </div>
        );

      default: {
        const FORM_COMPONENTS = new Set([
          "Input", "Textarea", "Select", "SearchInput", "DatePicker",
          "DateRangePicker", "MultiSelect", "Slider", "ColorPicker",
          "FormField", "Toggle", "Checkbox", "Radio",
        ]);
        const needsMaxWidth = FORM_COMPONENTS.has(compName);
        const el = (
          <Comp
            {...(values as any)}
            {...(def.props.some((p) => p.name === "children") ? { children: values._label ?? def.name } : {})}
          />
        );
        return needsMaxWidth
          ? <div style={{ width: "100%", maxWidth: 360 }}>{el}</div>
          : el;
      }
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
        <PreviewErrorBoundary shell={shell}>
          {renderPreview()}
        </PreviewErrorBoundary>
      </div>

      {/* Controls sidebar */}
      {(configurableProps.length > 0 || hasLabel || hasCustomControls) && (
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
          {hasLabel && (
            <div style={{ marginBottom: 12 }}>
              <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>label</Text>
              <Input
                size="sm"
                value={values._label ?? (compName === "Chip" ? "Sample Chip" : compName === "SplitButton" ? "Save" : "Button")}
                onChange={(e) => onValuesChange("_label", e.target.value)}
              />
            </div>
          )}
          {compName === "ButtonGroup" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>labels</Text>
                <Input
                  size="sm"
                  value={values._bgLabels ?? "Left, Center, Right"}
                  onChange={(e) => onValuesChange("_bgLabels", e.target.value)}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>variant</Text>
                <Select
                  size="sm"
                  value={values._bgVariant ?? "outline"}
                  onChange={(e) => onValuesChange("_bgVariant", e.target.value)}
                  options={[
                    { value: "primary", label: "primary" },
                    { value: "secondary", label: "secondary" },
                    { value: "outline", label: "outline" },
                    { value: "ghost", label: "ghost" },
                    { value: "danger", label: "danger" },
                    { value: "danger-outline", label: "danger-outline" },
                    { value: "danger-ghost", label: "danger-ghost" },
                  ]}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <Text size="xs" style={{ marginBottom: 4, color: shell.muted }}>size</Text>
                <Select
                  size="sm"
                  value={values._bgSize ?? "md"}
                  onChange={(e) => onValuesChange("_bgSize", e.target.value)}
                  options={[
                    { value: "2xs", label: "2xs" },
                    { value: "xs", label: "xs" },
                    { value: "sm", label: "sm" },
                    { value: "md", label: "md" },
                    { value: "lg", label: "lg" },
                  ]}
                />
              </div>
            </>
          )}
          {configurableProps.map(renderControl)}
        </div>
      )}
    </div>
  );
}

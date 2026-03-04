// ─── Types ────────────────────────────────────────────────────────────────────

export type PropDef = {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
};

export type ExampleDef = {
  title: string;
  description: string;
  code: string;
  previewKey: string;
};

export type AiPrompts = {
  claude: string;
  cursor: string;
  vscode: string;
  mcp: string;
};

export type ComponentDef = {
  slug: string;
  name: string;
  category: "Atoms" | "Molecules";
  description: string;
  importStatement: string;
  usageCode: string;
  aiPrompts: AiPrompts;
  props: PropDef[];
  examples: ExampleDef[];
};

// ─── Category / sidebar ordering ─────────────────────────────────────────────

export const CATEGORIES: { label: string; slugs: string[] }[] = [
  {
    label: "Atoms",
    slugs: [
      "button", "input", "textarea", "select", "searchinput",
      "checkbox", "radio", "toggle", "tag", "badge",
      "formfield", "text", "icon", "divider", "spinner", "avatar", "skeleton",
    ],
  },
  {
    label: "Molecules",
    slugs: ["alert", "card", "emptystate", "tooltip"],
  },
];

// ─── Registry ─────────────────────────────────────────────────────────────────

export const componentRegistry: ComponentDef[] = [
  // ── Button ──────────────────────────────────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    category: "Atoms",
    description:
      "Trigger actions and navigation. Supports four semantic variants, three sizes, loading and disabled states, a trailing chevron for dropdown triggers, and an optional full-width layout.",
    importStatement: "import { Button } from 'lucent-ui'",
    usageCode: `<Button variant="primary">Save changes</Button>`,
    aiPrompts: {
      claude: `"Add a Button from lucent-ui with variant="primary". It should trigger form submission and show a loading spinner while the request is in flight."`,
      cursor: `@lucent-ui Add a primary Button that submits the form. Show a loading state while the async action runs.`,
      vscode: `Using the lucent-ui component library, add a Button with variant="primary" for form submission. Handle the loading state.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a primary Button from lucent-ui"`,
    },
    props: [
      { name: "variant", type: `"primary" | "secondary" | "ghost" | "danger"`, description: "Visual style of the button.", defaultValue: `"primary"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and horizontal padding scale.", defaultValue: `"md"` },
      { name: "loading", type: "boolean", description: "Replaces the label with a spinner and disables interaction.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction and mutes the appearance.", defaultValue: "false" },
      { name: "chevron", type: "boolean", description: "Appends a down-chevron icon for dropdown trigger patterns.", defaultValue: "false" },
      { name: "fullWidth", type: "boolean", description: "Stretches the button to fill its container.", defaultValue: "false" },
      { name: "children", type: "React.ReactNode", description: "Button label.", required: true },
      { name: "onClick", type: "() => void", description: "Callback fired when the button is clicked." },
    ],
    examples: [
      {
        title: "Variants",
        description: "Four semantic variants for different action weights.",
        previewKey: "button-variants",
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      },
      {
        title: "Sizes",
        description: "Three sizes to match different UI densities.",
        previewKey: "button-sizes",
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      },
      {
        title: "States",
        description: "Loading, disabled, dropdown chevron, and full-width.",
        previewKey: "button-states",
        code: `<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
<Button variant="primary" chevron>Dropdown</Button>
<Button variant="primary" fullWidth>Full width</Button>`,
      },
    ],
  },

  // ── Input ────────────────────────────────────────────────────────────────────
  {
    slug: "input",
    name: "Input",
    category: "Atoms",
    description:
      "Single-line text field for names, emails, IDs, and free text. Supports label, placeholder, helper text, error state, and both controlled and uncontrolled usage.",
    importStatement: "import { Input } from 'lucent-ui'",
    usageCode: `<Input label="Email" placeholder="you@example.com" />`,
    aiPrompts: {
      claude: `"Add an Input from lucent-ui with a label, placeholder, and error state. It should be a controlled component."`,
      cursor: `@lucent-ui Add a controlled Input field with label, placeholder, helperText, and error handling.`,
      vscode: `Using lucent-ui, add an Input component with label="Email", placeholder, and an error state for validation feedback.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a controlled Input from lucent-ui with label and error state"`,
    },
    props: [
      { name: "label", type: "string", description: "Label displayed above the input." },
      { name: "type", type: "string", description: "HTML input type (text, email, password, etc.).", defaultValue: `"text"` },
      { name: "placeholder", type: "string", description: "Hint text shown when the field is empty." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
      { name: "helperText", type: "string", description: "Hint or description below the input." },
      { name: "errorText", type: "string", description: "Error message; triggers the error visual state." },
      { name: "disabled", type: "boolean", description: "Prevents interaction and mutes the appearance.", defaultValue: "false" },
      { name: "required", type: "boolean", description: "Appends a red asterisk to the label.", defaultValue: "false" },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", description: "Change event handler." },
    ],
    examples: [
      {
        title: "Default",
        description: "Basic input with label and placeholder.",
        previewKey: "input-default",
        code: `<Input label="Email" type="email" placeholder="you@example.com" />`,
      },
      {
        title: "With helper text",
        description: "Helper text provides additional context below the field.",
        previewKey: "input-helper",
        code: `<Input
  label="Username"
  helperText="3–20 characters, letters and numbers only"
  placeholder="yourname"
/>`,
      },
      {
        title: "Error state",
        description: "Red border and message for validation feedback.",
        previewKey: "input-error",
        code: `<Input
  label="Password"
  type="password"
  errorText="Must be at least 8 characters"
  value="short"
/>`,
      },
    ],
  },

  // ── Textarea ─────────────────────────────────────────────────────────────────
  {
    slug: "textarea",
    name: "Textarea",
    category: "Atoms",
    description:
      "Multi-line text field with optional auto-resize and character count. Ideal for bios, notes, and any open-ended text input.",
    importStatement: "import { Textarea } from 'lucent-ui'",
    usageCode: `<Textarea label="Bio" placeholder="Tell us about yourself…" autoResize />`,
    aiPrompts: {
      claude: `"Add a Textarea from lucent-ui with label, autoResize, and a 280-character limit with a character counter."`,
      cursor: `@lucent-ui Add a Textarea with autoResize and showCount for a tweet-style input (280 char max).`,
      vscode: `Using lucent-ui, add a Textarea with label, autoResize prop, and a maxLength of 280 with showCount.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Textarea from lucent-ui with auto-resize and character count"`,
    },
    props: [
      { name: "label", type: "string", description: "Label displayed above the textarea." },
      { name: "placeholder", type: "string", description: "Hint text when the field is empty." },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "autoResize", type: "boolean", description: "Grows the textarea height as content is added.", defaultValue: "false" },
      { name: "maxLength", type: "number", description: "Character limit. Used with showCount to display a counter." },
      { name: "showCount", type: "boolean", description: "Displays remaining character count when maxLength is set.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLTextAreaElement>) => void", description: "Change event handler." },
    ],
    examples: [
      {
        title: "Auto-resize",
        description: "The textarea grows as you type.",
        previewKey: "textarea-autoresize",
        code: `<Textarea
  label="Bio"
  autoResize
  placeholder="Tell us about yourself…"
/>`,
      },
      {
        title: "Character count",
        description: "Shows remaining characters when maxLength is set.",
        previewKey: "textarea-count",
        code: `<Textarea
  label="Tweet"
  maxLength={280}
  showCount
  placeholder="What's happening?"
/>`,
      },
    ],
  },

  // ── Select ───────────────────────────────────────────────────────────────────
  {
    slug: "select",
    name: "Select",
    category: "Atoms",
    description:
      "Native dropdown for choosing from a fixed list of options. Supports label, placeholder, error state, and three sizes.",
    importStatement: "import { Select } from 'lucent-ui'",
    usageCode: `<Select
  label="Country"
  placeholder="Choose a country"
  options={[
    { value: "us", label: "United States" },
    { value: "gb", label: "United Kingdom" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a Select from lucent-ui with a label, placeholder, and a list of options. Show an error state if nothing is selected."`,
      cursor: `@lucent-ui Add a Select with label, placeholder, and options array. Include an error state.`,
      vscode: `Using lucent-ui, add a Select component with label, placeholder, options prop, and an errorText for validation.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Select from lucent-ui with label and options"`,
    },
    props: [
      { name: "label", type: "string", description: "Label above the select." },
      { name: "placeholder", type: "string", description: "Default empty option shown when no value is selected." },
      { name: "options", type: "Array<{ value: string; label: string }>", description: "The list of selectable options.", required: true },
      { name: "value", type: "string", description: "Controlled value." },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial selection." },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and font size.", defaultValue: `"md"` },
      { name: "errorText", type: "string", description: "Error message; triggers the error visual state." },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLSelectElement>) => void", description: "Change handler." },
    ],
    examples: [
      {
        title: "Default",
        description: "Select with label and placeholder.",
        previewKey: "select-default",
        code: `<Select
  label="Country"
  placeholder="Choose a country"
  options={[
    { value: "us", label: "United States" },
    { value: "gb", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
/>`,
      },
      {
        title: "Sizes",
        description: "Three sizes — sm, md, and lg.",
        previewKey: "select-sizes",
        code: `<Select size="sm" options={[{ value: "a", label: "Small" }]} defaultValue="a" />
<Select size="md" options={[{ value: "a", label: "Medium" }]} defaultValue="a" />
<Select size="lg" options={[{ value: "a", label: "Large" }]} defaultValue="a" />`,
      },
      {
        title: "Error state",
        description: "Red border and message for validation.",
        previewKey: "select-error",
        code: `<Select
  label="Role"
  placeholder="Select a role"
  options={[{ value: "admin", label: "Admin" }, { value: "member", label: "Member" }]}
  errorText="Please select a role"
/>`,
      },
    ],
  },

  // ── SearchInput ───────────────────────────────────────────────────────────────
  {
    slug: "searchinput",
    name: "SearchInput",
    category: "Atoms",
    description:
      "Text field with a leading search icon and an inline results dropdown. Suitable for filtering, look-ups, and autocomplete flows.",
    importStatement: "import { SearchInput } from 'lucent-ui'",
    usageCode: `<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search…"
  results={results}
  onResultSelect={(r) => setQuery(r.label)}
/>`,
    aiPrompts: {
      claude: `"Add a SearchInput from lucent-ui. Filter a local array based on the input value and show matching results in the dropdown."`,
      cursor: `@lucent-ui Add a SearchInput that filters a list and shows results in its dropdown.`,
      vscode: `Using lucent-ui, add a SearchInput component. Populate results by filtering an array with the current query value.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a SearchInput from lucent-ui with local filtering"`,
    },
    props: [
      { name: "value", type: "string", description: "Controlled search query.", required: true },
      { name: "onChange", type: "(value: string) => void", description: "Called on every keystroke.", required: true },
      { name: "placeholder", type: "string", description: "Hint text when empty." },
      { name: "results", type: "Array<{ id: number | string; label: string }>", description: "Dropdown options to display." },
      { name: "onResultSelect", type: "(result: { id: number | string; label: string }) => void", description: "Called when the user clicks a result." },
      { name: "isLoading", type: "boolean", description: "Shows a spinner in the dropdown.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "With results",
        description: "Live filtering — type to see matching results.",
        previewKey: "searchinput-results",
        code: `const [query, setQuery] = useState("");
const results = allItems
  .filter(item => item.toLowerCase().includes(query.toLowerCase()))
  .map((item, i) => ({ id: i, label: item }));

<SearchInput
  value={query}
  onChange={setQuery}
  placeholder="Search fruits…"
  results={results}
  onResultSelect={(r) => setQuery(r.label)}
/>`,
      },
      {
        title: "Loading state",
        description: "Shows a spinner while async results are fetched.",
        previewKey: "searchinput-loading",
        code: `<SearchInput value="pineapple" onChange={() => {}} isLoading />`,
      },
      {
        title: "Disabled",
        description: "Non-interactive state.",
        previewKey: "searchinput-disabled",
        code: `<SearchInput value="" onChange={() => {}} disabled placeholder="Search disabled…" />`,
      },
    ],
  },

  // ── Checkbox ──────────────────────────────────────────────────────────────────
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Atoms",
    description:
      "Labelled checkbox with checked, indeterminate, and disabled states. Available in two sizes.",
    importStatement: "import { Checkbox } from 'lucent-ui'",
    usageCode: `<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`,
    aiPrompts: {
      claude: `"Add a Checkbox from lucent-ui for a 'terms and conditions' acceptance. Make it controlled and show an error if the user tries to proceed without checking it."`,
      cursor: `@lucent-ui Add a controlled Checkbox with label for accepting terms and conditions.`,
      vscode: `Using lucent-ui, add a Checkbox component with label, checked state, and onChange handler.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Checkbox from lucent-ui for terms acceptance"`,
    },
    props: [
      { name: "label", type: "string", description: "Text label next to the checkbox." },
      { name: "checked", type: "boolean", description: "Controlled checked state." },
      { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial checked state." },
      { name: "indeterminate", type: "boolean", description: "Visually indeterminate state (dash icon), used for parent checkboxes.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
      { name: "size", type: `"sm" | "md"`, description: "Checkbox size.", defaultValue: `"md"` },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", description: "Change handler." },
    ],
    examples: [
      {
        title: "States",
        description: "Checked, indeterminate, disabled, and disabled-checked.",
        previewKey: "checkbox-states",
        code: `<Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled checked" disabled checked />`,
      },
      {
        title: "Sizes",
        description: "Small and medium variants.",
        previewKey: "checkbox-sizes",
        code: `<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium" defaultChecked />`,
      },
    ],
  },

  // ── Radio ─────────────────────────────────────────────────────────────────────
  {
    slug: "radio",
    name: "Radio",
    category: "Atoms",
    description:
      "Radio button used inside a RadioGroup for mutually exclusive selection. Supports vertical and horizontal orientation and a group-level disabled state.",
    importStatement: "import { Radio, RadioGroup } from 'lucent-ui'",
    usageCode: `<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" label="Free — up to 3 projects" />
  <Radio value="pro" label="Pro — unlimited projects" />
  <Radio value="enterprise" label="Enterprise — custom limits" />
</RadioGroup>`,
    aiPrompts: {
      claude: `"Add a RadioGroup from lucent-ui with three plan options (Free, Pro, Enterprise). Make it controlled and show the selected value below."`,
      cursor: `@lucent-ui Add a controlled RadioGroup with vertical layout for plan selection.`,
      vscode: `Using lucent-ui, add a RadioGroup with Radio children for selecting a subscription plan.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a RadioGroup from lucent-ui for plan selection"`,
    },
    props: [
      { name: "name", type: "string", description: "Shared name attribute for the radio group.", required: true },
      { name: "value", type: "string", description: "Controlled selected value.", required: true },
      { name: "onChange", type: "(value: string) => void", description: "Called when the selection changes.", required: true },
      { name: "orientation", type: `"vertical" | "horizontal"`, description: "Layout direction.", defaultValue: `"vertical"` },
      { name: "disabled", type: "boolean", description: "Disables all radio buttons in the group.", defaultValue: "false" },
      { name: "children", type: "React.ReactNode", description: "Radio components.", required: true },
    ],
    examples: [
      {
        title: "Vertical group",
        description: "Default vertical stacking for a list of options.",
        previewKey: "radio-vertical",
        code: `<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" label="Free — up to 3 projects" />
  <Radio value="pro" label="Pro — unlimited projects" />
  <Radio value="enterprise" label="Enterprise — custom" />
</RadioGroup>`,
      },
      {
        title: "Horizontal group",
        description: "Side-by-side layout for compact option sets.",
        previewKey: "radio-horizontal",
        code: `<RadioGroup name="size" value={size} onChange={setSize} orientation="horizontal">
  <Radio value="s" label="S" />
  <Radio value="m" label="M" />
  <Radio value="l" label="L" />
  <Radio value="xl" label="XL" />
</RadioGroup>`,
      },
      {
        title: "Disabled group",
        description: "All radio buttons are non-interactive.",
        previewKey: "radio-disabled",
        code: `<RadioGroup name="locked" value="a" onChange={() => {}} disabled>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>`,
      },
    ],
  },

  // ── Toggle ────────────────────────────────────────────────────────────────────
  {
    slug: "toggle",
    name: "Toggle",
    category: "Atoms",
    description:
      "On/off switch in three sizes. Best used for immediate boolean settings like dark mode, notifications, or feature flags.",
    importStatement: "import { Toggle } from 'lucent-ui'",
    usageCode: `<Toggle
  label="Dark mode"
  checked={dark}
  onChange={(e) => setDark(e.target.checked)}
/>`,
    aiPrompts: {
      claude: `"Add a Toggle from lucent-ui for a dark mode setting. Make it controlled and update a theme state when toggled."`,
      cursor: `@lucent-ui Add a controlled Toggle for enabling dark mode.`,
      vscode: `Using lucent-ui, add a Toggle component with label="Dark mode" and a controlled checked state.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Toggle from lucent-ui for a settings screen"`,
    },
    props: [
      { name: "label", type: "string", description: "Text label next to the toggle." },
      { name: "checked", type: "boolean", description: "Controlled on/off state." },
      { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Toggle size.", defaultValue: `"md"` },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", description: "Change handler." },
    ],
    examples: [
      {
        title: "Controlled",
        description: "Live state reflected in the toggle.",
        previewKey: "toggle-controlled",
        code: `<Toggle
  label="Dark mode"
  checked={toggled}
  onChange={(e) => setToggled(e.target.checked)}
/>`,
      },
      {
        title: "Sizes",
        description: "Small, medium, and large.",
        previewKey: "toggle-sizes",
        code: `<Toggle size="sm" label="Small" defaultChecked />
<Toggle size="md" label="Medium" defaultChecked />
<Toggle size="lg" label="Large" defaultChecked />`,
      },
      {
        title: "Disabled",
        description: "Non-interactive off and on states.",
        previewKey: "toggle-disabled",
        code: `<Toggle disabled label="Off (disabled)" />
<Toggle disabled defaultChecked label="On (disabled)" />`,
      },
    ],
  },

  // ── Tag ───────────────────────────────────────────────────────────────────────
  {
    slug: "tag",
    name: "Tag",
    category: "Atoms",
    description:
      "Inline label for categories, skills, or metadata. Six semantic variants, two sizes, and an optional dismiss handler for removable tags.",
    importStatement: "import { Tag } from 'lucent-ui'",
    usageCode: `<Tag variant="accent" onDismiss={() => removeTag(id)}>
  TypeScript
</Tag>`,
    aiPrompts: {
      claude: `"Add a list of dismissible Tags from lucent-ui for skill selection. Each tag should be removable from the list."`,
      cursor: `@lucent-ui Add dismissible Tags for a skills input. Removing a tag should update the state array.`,
      vscode: `Using lucent-ui, add Tag components with onDismiss handlers for a skills list.`,
      mcp: `// lucent-ui MCP
// Ask: "Add dismissible Tags from lucent-ui for a tag list"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Tag label.", required: true },
      { name: "variant", type: `"neutral" | "accent" | "success" | "warning" | "danger" | "info"`, description: "Colour variant.", defaultValue: `"neutral"` },
      { name: "size", type: `"sm" | "md"`, description: "Tag size.", defaultValue: `"md"` },
      { name: "onDismiss", type: "() => void", description: "If provided, renders a dismiss (×) button." },
    ],
    examples: [
      {
        title: "Dismissible",
        description: "Tags can be removed individually.",
        previewKey: "tag-dismissible",
        code: `const [tags, setTags] = useState(["React", "TypeScript", "Design Systems"]);

{tags.map((t) => (
  <Tag key={t} onDismiss={() => setTags(prev => prev.filter(x => x !== t))}>
    {t}
  </Tag>
))}`,
      },
      {
        title: "Variants",
        description: "Six semantic colour variants.",
        previewKey: "tag-variants",
        code: `<Tag variant="neutral">Neutral</Tag>
<Tag variant="accent">Accent</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="danger">Danger</Tag>
<Tag variant="info">Info</Tag>`,
      },
      {
        title: "Sizes",
        description: "Small and medium.",
        previewKey: "tag-sizes",
        code: `<Tag size="sm">Small</Tag>
<Tag size="md">Medium</Tag>`,
      },
    ],
  },

  // ── Badge ─────────────────────────────────────────────────────────────────────
  {
    slug: "badge",
    name: "Badge",
    category: "Atoms",
    description:
      "Compact status indicator for counts, labels, and live status. Six semantic variants and an optional pulsing dot.",
    importStatement: "import { Badge } from 'lucent-ui'",
    usageCode: `<Badge variant="success" dot>Active</Badge>`,
    aiPrompts: {
      claude: `"Add a Badge from lucent-ui with variant="success" and a pulsing dot to indicate an active status."`,
      cursor: `@lucent-ui Add a Badge with a pulsing dot for live status indication.`,
      vscode: `Using lucent-ui, add a Badge component with variant="success" and dot prop for a live-status indicator.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a status Badge from lucent-ui"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Badge label or count.", required: true },
      { name: "variant", type: `"neutral" | "accent" | "success" | "warning" | "danger" | "info"`, description: "Colour variant.", defaultValue: `"neutral"` },
      { name: "size", type: `"sm" | "md"`, description: "Badge size.", defaultValue: `"md"` },
      { name: "dot", type: "boolean", description: "Adds a pulsing dot before the label.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Variants",
        description: "Six semantic variants, one with a dot.",
        previewKey: "badge-variants",
        code: `<Badge variant="neutral">Neutral</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">12</Badge>
<Badge variant="info">Beta</Badge>`,
      },
      {
        title: "Sizes",
        description: "Small and medium.",
        previewKey: "badge-sizes",
        code: `<Badge size="sm" variant="success">Small</Badge>
<Badge size="md" variant="success">Medium</Badge>`,
      },
    ],
  },

  // ── FormField ─────────────────────────────────────────────────────────────────
  {
    slug: "formfield",
    name: "FormField",
    category: "Atoms",
    description:
      "Label wrapper that standardises required flags, helper text, and inline error messages across any form control. Wrap any input with it.",
    importStatement: "import { FormField } from 'lucent-ui'",
    usageCode: `<FormField
  label="Email address"
  htmlFor="email"
  required
  helperText="We'll never share your email."
>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>`,
    aiPrompts: {
      claude: `"Wrap an Input with a FormField from lucent-ui. Add a label, required flag, helper text, and an error message for validation."`,
      cursor: `@lucent-ui Wrap an Input in a FormField with label, required, helperText, and errorMessage.`,
      vscode: `Using lucent-ui, wrap a form input with FormField. Add label, htmlFor, required, helperText, and errorMessage props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FormField wrapper from lucent-ui"`,
    },
    props: [
      { name: "label", type: "string", description: "Label text.", required: true },
      { name: "htmlFor", type: "string", description: "Links the label to a form control via id." },
      { name: "required", type: "boolean", description: "Appends a red asterisk to the label.", defaultValue: "false" },
      { name: "helperText", type: "string", description: "Hint shown below the control." },
      { name: "errorMessage", type: "string", description: "Error shown below the control; overrides helperText." },
      { name: "children", type: "React.ReactNode", description: "The form control to label.", required: true },
    ],
    examples: [
      {
        title: "Basic",
        description: "Label and optional helper text.",
        previewKey: "formfield-basic",
        code: `<FormField label="Email address" htmlFor="email">
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>`,
      },
      {
        title: "Required + helper",
        description: "Required field with contextual helper text.",
        previewKey: "formfield-required",
        code: `<FormField
  label="Username"
  htmlFor="username"
  required
  helperText="Letters and numbers only, 3–20 chars"
>
  <Input id="username" placeholder="yourname" />
</FormField>`,
      },
      {
        title: "Error state",
        description: "Error message replaces helper text.",
        previewKey: "formfield-error",
        code: `<FormField
  label="Password"
  htmlFor="password"
  required
  errorMessage="Must be at least 8 characters"
>
  <Input id="password" type="password" defaultValue="short" />
</FormField>`,
      },
    ],
  },

  // ── Text ──────────────────────────────────────────────────────────────────────
  {
    slug: "text",
    name: "Text",
    category: "Atoms",
    description:
      "Polymorphic typography primitive. Seven sizes, four weights, seven semantic colours, three font families, and a truncation utility.",
    importStatement: "import { Text } from 'lucent-ui'",
    usageCode: `<Text size="lg" weight="semibold" color="primary">
  Heading copy
</Text>`,
    aiPrompts: {
      claude: `"Add a Text component from lucent-ui for a section heading. Use size="xl", weight="semibold", and the display font family."`,
      cursor: `@lucent-ui Add a Text with size="xl", weight="semibold", family="display" for a page heading.`,
      vscode: `Using lucent-ui, add a Text component with size, weight, and color props for typography styling.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Text component from lucent-ui"`,
    },
    props: [
      { name: "as", type: "React.ElementType", description: "The HTML element or component to render (p, span, h1, code…).", defaultValue: `"p"` },
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`, description: "Font size.", defaultValue: `"md"` },
      { name: "weight", type: `"regular" | "medium" | "semibold" | "bold"`, description: "Font weight.", defaultValue: `"regular"` },
      { name: "color", type: `"primary" | "secondary" | "disabled" | "success" | "warning" | "danger" | "info"`, description: "Semantic colour.", defaultValue: `"primary"` },
      { name: "family", type: `"base" | "mono" | "display"`, description: "Font family.", defaultValue: `"base"` },
      { name: "truncate", type: "boolean", description: "Clips overflow to one line with an ellipsis.", defaultValue: "false" },
      { name: "children", type: "React.ReactNode", description: "Text content.", required: true },
    ],
    examples: [
      {
        title: "Sizes",
        description: "From xs to 3xl.",
        previewKey: "text-sizes",
        code: `<Text as="span" size="xs">xs</Text>
<Text as="span" size="sm">sm</Text>
<Text as="span" size="md">md (base)</Text>
<Text as="span" size="lg">lg</Text>
<Text as="span" size="xl">xl</Text>
<Text as="span" size="2xl">2xl</Text>
<Text as="span" size="3xl">3xl</Text>`,
      },
      {
        title: "Weights",
        description: "Regular, medium, semibold, bold.",
        previewKey: "text-weights",
        code: `<Text as="span" weight="regular">Regular</Text>
<Text as="span" weight="medium">Medium</Text>
<Text as="span" weight="semibold">Semibold</Text>
<Text as="span" weight="bold">Bold</Text>`,
      },
      {
        title: "Semantic colours",
        description: "Seven colour roles.",
        previewKey: "text-colors",
        code: `<Text as="span" color="primary">Primary</Text>
<Text as="span" color="secondary">Secondary</Text>
<Text as="span" color="disabled">Disabled</Text>
<Text as="span" color="success">Success</Text>
<Text as="span" color="warning">Warning</Text>
<Text as="span" color="danger">Danger</Text>
<Text as="span" color="info">Info</Text>`,
      },
    ],
  },

  // ── Icon ─────────────────────────────────────────────────────────────────────
  {
    slug: "icon",
    name: "Icon",
    category: "Atoms",
    description:
      "Wrapper that sizes and colours any inline SVG to align with the type scale. Pass your own SVG as children.",
    importStatement: "import { Icon } from 'lucent-ui'",
    usageCode: `<Icon size="md" color="var(--lucent-success-default)">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
</Icon>`,
    aiPrompts: {
      claude: `"Add an Icon from lucent-ui wrapping a check-circle SVG. Use size="lg" and color the icon with the success token."`,
      cursor: `@lucent-ui Wrap a check SVG in an Icon component with size="lg" and success colour.`,
      vscode: `Using lucent-ui, add an Icon component with size="lg" and color="var(--lucent-success-default)" wrapping an SVG.`,
      mcp: `// lucent-ui MCP
// Ask: "Add an Icon wrapper from lucent-ui for an SVG"`,
    },
    props: [
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, description: "Icon dimensions.", defaultValue: `"md"` },
      { name: "color", type: "string", description: "CSS colour value or CSS variable. Defaults to currentColor." },
      { name: "label", type: "string", description: "Accessible label (sets aria-label). If omitted the icon is decorative." },
      { name: "children", type: "React.ReactNode", description: "An inline SVG element.", required: true },
    ],
    examples: [
      {
        title: "Sizes",
        description: "xs through xl — hover to see the size label.",
        previewKey: "icon-sizes",
        code: `<Icon size="xs">…</Icon>
<Icon size="sm">…</Icon>
<Icon size="md">…</Icon>
<Icon size="lg">…</Icon>
<Icon size="xl">…</Icon>`,
      },
      {
        title: "Coloured",
        description: "Apply any CSS colour or design-token variable.",
        previewKey: "icon-colored",
        code: `<Icon size="lg" color="var(--lucent-success-default)">…</Icon>
<Icon size="lg" color="var(--lucent-danger-default)">…</Icon>
<Icon size="lg" color="var(--lucent-warning-default)">…</Icon>`,
      },
    ],
  },

  // ── Divider ───────────────────────────────────────────────────────────────────
  {
    slug: "divider",
    name: "Divider",
    category: "Atoms",
    description:
      "Horizontal or vertical separator line for sectioning related content. Supports an optional centred label.",
    importStatement: "import { Divider } from 'lucent-ui'",
    usageCode: `<Divider />`,
    aiPrompts: {
      claude: `"Add a Divider from lucent-ui between two form sections. Use the label prop to show the text 'OR'."`,
      cursor: `@lucent-ui Add a Divider with label="OR" between two form sections.`,
      vscode: `Using lucent-ui, add a Divider component with an optional label prop.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Divider from lucent-ui"`,
    },
    props: [
      { name: "orientation", type: `"horizontal" | "vertical"`, description: "Direction of the divider line.", defaultValue: `"horizontal"` },
      { name: "label", type: "string", description: "Optional text centred on the divider line." },
    ],
    examples: [
      {
        title: "Horizontal",
        description: "Default separator between stacked content.",
        previewKey: "divider-horizontal",
        code: `<Text size="sm" color="secondary">Content above</Text>
<Divider />
<Text size="sm" color="secondary">Content below</Text>`,
      },
      {
        title: "With label",
        description: "Centred label — common for login/register separators.",
        previewKey: "divider-labeled",
        code: `<Divider label="OR" />`,
      },
      {
        title: "Vertical",
        description: "Inline separator between breadcrumb or nav items.",
        previewKey: "divider-vertical",
        code: `<div style={{ display: "flex", alignItems: "center", height: 32 }}>
  <Text size="sm">Home</Text>
  <Divider orientation="vertical" />
  <Text size="sm">About</Text>
  <Divider orientation="vertical" />
  <Text size="sm">Contact</Text>
</div>`,
      },
    ],
  },

  // ── Spinner ───────────────────────────────────────────────────────────────────
  {
    slug: "spinner",
    name: "Spinner",
    category: "Atoms",
    description:
      "Animated loading indicator in five sizes for inline and overlay loading states.",
    importStatement: "import { Spinner } from 'lucent-ui'",
    usageCode: `<Spinner size="md" />`,
    aiPrompts: {
      claude: `"Add a Spinner from lucent-ui centred in a loading overlay while data is being fetched."`,
      cursor: `@lucent-ui Add a centred Spinner overlay for a loading state.`,
      vscode: `Using lucent-ui, add a Spinner component inside a loading overlay container.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Spinner from lucent-ui for a loading state"`,
    },
    props: [
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, description: "Spinner diameter.", defaultValue: `"md"` },
    ],
    examples: [
      {
        title: "Sizes",
        description: "Five sizes from xs to xl.",
        previewKey: "spinner-sizes",
        code: `<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
      },
    ],
  },

  // ── Avatar ────────────────────────────────────────────────────────────────────
  {
    slug: "avatar",
    name: "Avatar",
    category: "Atoms",
    description:
      "Circular user image with an automatic initials fallback when the image is absent or fails to load. Available in five sizes.",
    importStatement: "import { Avatar } from 'lucent-ui'",
    usageCode: `<Avatar src="/photo.jpg" alt="Jane Doe" size="md" />`,
    aiPrompts: {
      claude: `"Add an Avatar from lucent-ui for a user profile. Show the user's photo if available, falling back to their initials."`,
      cursor: `@lucent-ui Add an Avatar that shows the user's photo or initials fallback, size="lg".`,
      vscode: `Using lucent-ui, add an Avatar component with src, alt (for initials), and size props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add an Avatar from lucent-ui with image and initials fallback"`,
    },
    props: [
      { name: "alt", type: "string", description: "Alt text for the image. Also used to generate initials when src is missing.", required: true },
      { name: "src", type: "string", description: "Image URL. If not provided or fails to load, initials are shown." },
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl"`, description: "Avatar diameter.", defaultValue: `"md"` },
    ],
    examples: [
      {
        title: "With image",
        description: "All five sizes with a photo.",
        previewKey: "avatar-image",
        code: `<Avatar src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="xs" />
<Avatar src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="sm" />
<Avatar src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="lg" />
<Avatar src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="xl" />`,
      },
      {
        title: "Initials fallback",
        description: "When no src is provided, initials are derived from alt.",
        previewKey: "avatar-initials",
        code: `<Avatar alt="Jane Doe" size="xs" />
<Avatar alt="Jane Doe" size="sm" />
<Avatar alt="Jane Doe" size="md" />
<Avatar alt="Jane Doe" size="lg" />
<Avatar alt="Jane Doe" size="xl" />`,
      },
    ],
  },

  // ── Skeleton ──────────────────────────────────────────────────────────────────
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Atoms",
    description:
      "Pulsing placeholder shapes — text lines, circle, and rectangle — that mirror content layout during loading.",
    importStatement: "import { Skeleton } from 'lucent-ui'",
    usageCode: `<Skeleton variant="text" lines={3} />`,
    aiPrompts: {
      claude: `"Add Skeleton placeholders from lucent-ui to replicate a card layout while data loads. Use circle for the avatar, rectangle for the image, and text lines for the content."`,
      cursor: `@lucent-ui Add a Skeleton card placeholder: avatar circle, image rectangle, and 2 text lines.`,
      vscode: `Using lucent-ui, add Skeleton components for a loading card: circle (avatar), rectangle (image), text (lines).`,
      mcp: `// lucent-ui MCP
// Ask: "Add Skeleton placeholders from lucent-ui"`,
    },
    props: [
      { name: "variant", type: `"text" | "circle" | "rectangle"`, description: "Shape of the skeleton.", defaultValue: `"text"` },
      { name: "lines", type: "number", description: "Number of text lines (only for variant=\"text\").", defaultValue: "1" },
      { name: "width", type: "number | string", description: "Width override." },
      { name: "height", type: "number | string", description: "Height override." },
    ],
    examples: [
      {
        title: "Text lines",
        description: "Placeholder for body copy.",
        previewKey: "skeleton-text",
        code: `<Skeleton variant="text" lines={3} />`,
      },
      {
        title: "Shapes",
        description: "Circle, rectangle, and single text line.",
        previewKey: "skeleton-shapes",
        code: `<Skeleton variant="circle" width={40} height={40} />
<Skeleton variant="rectangle" width={120} height={40} />
<Skeleton variant="text" width={160} />`,
      },
      {
        title: "Card placeholder",
        description: "Combining shapes to mirror a card layout.",
        previewKey: "skeleton-card",
        code: `<Skeleton variant="rectangle" height={120} />
<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
  <Skeleton variant="circle" width={32} height={32} />
  <Skeleton variant="text" width="60%" />
</div>
<Skeleton variant="text" lines={2} />`,
      },
    ],
  },

  // ── Alert ─────────────────────────────────────────────────────────────────────
  {
    slug: "alert",
    name: "Alert",
    category: "Molecules",
    description:
      "Full-width contextual message for info, success, warning, and error states. Supports an optional title and a dismissible variant.",
    importStatement: "import { Alert } from 'lucent-ui'",
    usageCode: `<Alert variant="success" title="Changes saved">
  Your profile has been updated successfully.
</Alert>`,
    aiPrompts: {
      claude: `"Add an Alert from lucent-ui with variant="warning" and a dismissible button. Show it conditionally based on a boolean state."`,
      cursor: `@lucent-ui Add a dismissible warning Alert that shows conditionally.`,
      vscode: `Using lucent-ui, add an Alert with variant="warning", title, and an onDismiss handler.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a dismissible Alert from lucent-ui"`,
    },
    props: [
      { name: "variant", type: `"info" | "success" | "warning" | "danger"`, description: "Semantic colour variant.", required: true },
      { name: "title", type: "string", description: "Bold heading above the message body." },
      { name: "onDismiss", type: "() => void", description: "If provided, renders a close button." },
      { name: "children", type: "React.ReactNode", description: "Alert message body.", required: true },
    ],
    examples: [
      {
        title: "Variants",
        description: "Info, success, warning, and danger.",
        previewKey: "alert-variants",
        code: `<Alert variant="info" title="Did you know?">You can customise the accent colour via token overrides.</Alert>
<Alert variant="success" title="Changes saved">Your profile has been updated successfully.</Alert>
<Alert variant="warning" title="Approaching limit">You've used 80% of your monthly quota.</Alert>
<Alert variant="danger" title="Payment failed">Check your card details and try again.</Alert>`,
      },
      {
        title: "Body only",
        description: "No title — message only.",
        previewKey: "alert-body",
        code: `<Alert variant="info">Your session expires in 5 minutes.</Alert>`,
      },
      {
        title: "Dismissible",
        description: "A close button hides the alert.",
        previewKey: "alert-dismissible",
        code: `const [visible, setVisible] = useState(true);
{visible && (
  <Alert
    variant="danger"
    title="Payment failed"
    onDismiss={() => setVisible(false)}
  >
    Check your card details and try again.
  </Alert>
)}`,
      },
    ],
  },

  // ── Card ──────────────────────────────────────────────────────────────────────
  {
    slug: "card",
    name: "Card",
    category: "Molecules",
    description:
      "Padded surface container with optional header, footer, configurable shadow, and border radius. Adapts to the active theme.",
    importStatement: "import { Card } from 'lucent-ui'",
    usageCode: `<Card
  header={<Text weight="semibold">Card title</Text>}
  footer={<Button size="sm">Save</Button>}
>
  Card content goes here.
</Card>`,
    aiPrompts: {
      claude: `"Add a Card from lucent-ui with a header containing the title, body content, and a footer with Save and Cancel buttons."`,
      cursor: `@lucent-ui Add a Card with header, footer with actions, and body content.`,
      vscode: `Using lucent-ui, add a Card component with header, children, and footer props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Card from lucent-ui with header and footer"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Card body content.", required: true },
      { name: "header", type: "React.ReactNode", description: "Content rendered in the card header area." },
      { name: "footer", type: "React.ReactNode", description: "Content rendered in the card footer area." },
      { name: "padding", type: `"none" | "sm" | "md" | "lg"`, description: "Inner padding.", defaultValue: `"md"` },
      { name: "shadow", type: `"none" | "sm" | "md" | "lg"`, description: "Drop shadow.", defaultValue: `"sm"` },
      { name: "radius", type: `"none" | "sm" | "md" | "lg"`, description: "Border radius.", defaultValue: `"md"` },
      { name: "style", type: "React.CSSProperties", description: "Inline style override." },
    ],
    examples: [
      {
        title: "Body only",
        description: "Simplest card — content only.",
        previewKey: "card-body",
        code: `<Card>
  <Text size="sm" color="secondary">
    A simple card with body content only.
  </Text>
</Card>`,
      },
      {
        title: "Header + footer",
        description: "Full card with title and action footer.",
        previewKey: "card-header-footer",
        code: `<Card
  header={<Text family="display" weight="semibold">Card title</Text>}
  footer={
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button variant="primary" size="sm">Save</Button>
    </div>
  }
>
  <Text size="sm" color="secondary">Edit your profile information below.</Text>
</Card>`,
      },
      {
        title: "Padding & shadow",
        description: "Control padding, shadow, and radius independently.",
        previewKey: "card-sizes",
        code: `<Card padding="sm" shadow="none" radius="sm">
  <Text size="xs">sm padding, no shadow</Text>
</Card>
<Card padding="lg" shadow="lg" radius="lg">
  <Text size="xs">lg padding + shadow</Text>
</Card>`,
      },
    ],
  },

  // ── EmptyState ────────────────────────────────────────────────────────────────
  {
    slug: "emptystate",
    name: "EmptyState",
    category: "Molecules",
    description:
      "Zero-data placeholder with an optional illustration, description, and a call-to-action button for guiding users to take action.",
    importStatement: "import { EmptyState } from 'lucent-ui'",
    usageCode: `<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button variant="secondary" size="sm">Clear filters</Button>}
/>`,
    aiPrompts: {
      claude: `"Add an EmptyState from lucent-ui to an empty list. Include a search icon as the illustration, a title, description, and a 'New item' CTA button."`,
      cursor: `@lucent-ui Add an EmptyState with icon illustration, title, description, and CTA button.`,
      vscode: `Using lucent-ui, add an EmptyState component with illustration (Icon), title, description, and action props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add an EmptyState from lucent-ui for an empty list"`,
    },
    props: [
      { name: "title", type: "string", description: "Primary empty-state message.", required: true },
      { name: "description", type: "string", description: "Secondary hint below the title." },
      { name: "illustration", type: "React.ReactNode", description: "Icon or image above the title." },
      { name: "action", type: "React.ReactNode", description: "CTA button or link below the description." },
    ],
    examples: [
      {
        title: "With illustration + CTA",
        description: "Full empty state with icon, description, and action.",
        previewKey: "emptystate-full",
        code: `<EmptyState
  illustration={
    <Icon size="xl">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={11} cy={11} r={8} />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    </Icon>
  }
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button variant="secondary" size="sm">Clear filters</Button>}
/>`,
      },
      {
        title: "Minimal",
        description: "Title only — no illustration or action needed.",
        previewKey: "emptystate-minimal",
        code: `<EmptyState title="Nothing here yet" />`,
      },
    ],
  },

  // ── Tooltip ───────────────────────────────────────────────────────────────────
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Molecules",
    description:
      "On-hover contextual hint anchored to a trigger element. Four directional placements and a configurable show delay.",
    importStatement: "import { Tooltip } from 'lucent-ui'",
    usageCode: `<Tooltip content="Delete this item" placement="top">
  <Button variant="ghost">Delete</Button>
</Tooltip>`,
    aiPrompts: {
      claude: `"Wrap an icon button with a Tooltip from lucent-ui. Use placement="top" and a descriptive content string."`,
      cursor: `@lucent-ui Add a Tooltip with placement="top" wrapping an icon button.`,
      vscode: `Using lucent-ui, add a Tooltip component with content and placement props around a Button.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Tooltip from lucent-ui around a button"`,
    },
    props: [
      { name: "content", type: "string", description: "Tooltip message text.", required: true },
      { name: "placement", type: `"top" | "bottom" | "left" | "right"`, description: "Direction the tooltip appears relative to the trigger.", defaultValue: `"top"` },
      { name: "delay", type: "number", description: "Milliseconds before the tooltip appears on hover.", defaultValue: "300" },
      { name: "children", type: "React.ReactNode", description: "The trigger element.", required: true },
    ],
    examples: [
      {
        title: "Placements",
        description: "Top, bottom, left, and right.",
        previewKey: "tooltip-placements",
        code: `<Tooltip content="Tooltip on top" placement="top">
  <Button variant="secondary" size="sm">Top</Button>
</Tooltip>
<Tooltip content="Tooltip on bottom" placement="bottom">
  <Button variant="secondary" size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Tooltip on left" placement="left">
  <Button variant="secondary" size="sm">Left</Button>
</Tooltip>
<Tooltip content="Tooltip on right" placement="right">
  <Button variant="secondary" size="sm">Right</Button>
</Tooltip>`,
      },
      {
        title: "No delay",
        description: "Instant tooltip — delay set to 0.",
        previewKey: "tooltip-nodelay",
        code: `<Tooltip content="Instant tooltip" delay={0}>
  <Button variant="ghost" size="sm">Hover me</Button>
</Tooltip>`,
      },
    ],
  },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getComponent(slug: string): ComponentDef | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return componentRegistry.map((c) => c.slug);
}

export function getPrevNext(slug: string): { prev: ComponentDef | null; next: ComponentDef | null } {
  const all = CATEGORIES.flatMap((cat) =>
    cat.slugs.map((s) => componentRegistry.find((c) => c.slug === s)!)
  ).filter(Boolean);
  const idx = all.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

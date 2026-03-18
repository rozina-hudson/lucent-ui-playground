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
  /** Override the component rendered in the Playground customizer (e.g. "RadioGroup" for the radio page) */
  customizerName?: string;
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
      "checkbox", "radio", "toggle",
      "formfield", "text", "icon", "divider", "spinner", "avatar", "skeleton",
      "breadcrumb", "navlink", "datepicker", "daterangepicker", "multiselect",
      "slider", "codeblock", "table", "colorpicker", "colorswatch", "segmentedcontrol", "chip",
    ],
  },
  {
    label: "Molecules",
    slugs: [
      "alert", "card", "emptystate", "tooltip",
      "tabs", "collapsible", "commandpalette", "datatable",
      "fileupload", "pagelayout", "timeline",
    ],
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
      "Trigger actions and navigation. Supports five semantic variants (primary, secondary, outline, ghost, danger), four sizes (xs–lg), hover lift + glow animation, loading and disabled states, a trailing chevron for dropdown triggers, and an optional full-width layout.",
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
      { name: "variant", type: `"primary" | "secondary" | "outline" | "ghost" | "danger"`, description: "Visual style of the button. secondary is a filled surface button; outline is a bordered button.", defaultValue: `"primary"` },
      { name: "size", type: `"xs" | "sm" | "md" | "lg"`, description: "Height and horizontal padding scale. xs (26px) is ideal for compact toolbars.", defaultValue: `"md"` },
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
        description: "Five semantic variants for different action weights.",
        previewKey: "button-variants",
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      },
      {
        title: "Sizes",
        description: "Four sizes from compact toolbars (xs) to prominent CTAs (lg).",
        previewKey: "button-sizes",
        code: `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
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
      "Multi-line text field with optional auto-resize, character count, and three sizes. Ideal for bios, notes, and any open-ended text input.",
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
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height, font size, and padding scale.", defaultValue: `"md"` },
      { name: "autoResize", type: "boolean", description: "Grows the textarea height as content is added.", defaultValue: "false" },
      { name: "maxLength", type: "number", description: "Character limit. Used with showCount to display a counter." },
      { name: "showCount", type: "boolean", description: "Displays remaining character count when maxLength is set.", defaultValue: "false" },
      { name: "helperText", type: "string", description: "Hint or description below the textarea." },
      { name: "errorText", type: "string", description: "Error message; triggers the error visual state." },
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
      {
        title: "Sizes",
        description: "Three sizes with size-aware font and padding.",
        previewKey: "textarea-sizes",
        code: `<Textarea size="sm" label="Size sm" placeholder="Small textarea" />
<Textarea size="md" label="Size md" placeholder="Medium textarea" />
<Textarea size="lg" label="Size lg" placeholder="Large textarea" />`,
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
      "Text field with a leading search icon and an inline results dropdown. Supports label, helper text, and error state. Suitable for filtering, look-ups, and autocomplete flows.",
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
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and font scale — passed through to the underlying Input.", defaultValue: `"md"` },
      { name: "label", type: "string", description: "Label displayed above the search input." },
      { name: "helperText", type: "string", description: "Hint or description below the input." },
      { name: "errorText", type: "string", description: "Error message; triggers the error visual state." },
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
      {
        title: "With label & helper text",
        description: "Label and helper text provide context for the search field.",
        previewKey: "searchinput-labeled",
        code: `<SearchInput
  label="Search products"
  helperText="Type at least 2 characters"
  value={query}
  onChange={setQuery}
  placeholder="Search…"
/>`,
      },
    ],
  },

  // ── Checkbox ──────────────────────────────────────────────────────────────────
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Atoms",
    description:
      "Labelled checkbox with checked, indeterminate, and disabled states. Available in three sizes (sm/md/lg). The contained prop wraps the checkbox in a bordered card with accent highlighting when checked — ideal for plan selection and feature toggles.",
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
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Checkbox size.", defaultValue: `"md"` },
      { name: "contained", type: "boolean", description: "Wraps the checkbox in a bordered container with accent highlighting when checked.", defaultValue: "false" },
      { name: "helperText", type: "string", description: "Secondary text displayed below the label." },
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
        description: "Three sizes — sm, md, and lg.",
        previewKey: "checkbox-sizes",
        code: `<Checkbox size="sm" label="Small" defaultChecked />
<Checkbox size="md" label="Medium" defaultChecked />
<Checkbox size="lg" label="Large" defaultChecked />`,
      },
      {
        title: "Contained",
        description: "Bordered container with accent highlight — great for plan selection cards.",
        previewKey: "checkbox-contained",
        code: `<Checkbox contained label="Free" helperText="Up to 3 projects" checked={plan === "free"} onChange={() => setPlan("free")} />
<Checkbox contained label="Pro" helperText="Unlimited projects" checked={plan === "pro"} onChange={() => setPlan("pro")} />`,
      },
    ],
  },

  // ── Radio ─────────────────────────────────────────────────────────────────────
  {
    slug: "radio",
    name: "Radio",
    customizerName: "RadioGroup",
    category: "Atoms",
    description:
      "Radio button used inside a RadioGroup for mutually exclusive selection. Supports vertical and horizontal orientation, three sizes (sm/md/lg), a group-level disabled state, and a contained prop for bordered card-style options with helperText.",
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
      {
        title: "Contained",
        description: "Bordered containers with accent highlight for plan-style selection.",
        previewKey: "radio-contained",
        code: `<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Radio value="free" label="Free" helperText="Up to 3 projects" contained />
  <Radio value="pro" label="Pro" helperText="Unlimited projects" contained />
  <Radio value="enterprise" label="Enterprise" helperText="Custom limits & SSO" contained />
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
      "On/off switch in three sizes with optional contained card style and helperText. Best used for immediate boolean settings like dark mode, notifications, or feature flags. The align prop positions the track on the left or right.",
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
      { name: "contained", type: "boolean", description: "Wraps the toggle in a bordered container with accent highlighting when checked.", defaultValue: "false" },
      { name: "helperText", type: "string", description: "Secondary text displayed below the label." },
      { name: "align", type: `"left" | "right"`, description: "Position of the toggle track relative to the label.", defaultValue: `"left"` },
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
      {
        title: "Contained",
        description: "Bordered containers with helperText — great for settings panels.",
        previewKey: "toggle-contained",
        code: `<Toggle contained label="Email notifications" helperText="Receive updates via email" defaultChecked />
<Toggle contained label="Push notifications" helperText="Get notified on your device" />
<Toggle contained label="Marketing emails" helperText="Occasional product news" align="right" />`,
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
      {
        title: "CardBleed",
        description: "Let children stretch edge-to-edge, cancelling the card's horizontal padding. Text stays aligned with the rest of the card content.",
        previewKey: "card-bleed",
        code: `<Card>
  <Text weight="semibold">Settings</Text>
  <CardBleed style={{ borderTop: '1px solid var(--lucent-border-default)' }}>
    <Text size="sm" color="secondary">This row stretches to the card edges.</Text>
  </CardBleed>
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

  // ── Breadcrumb ───────────────────────────────────────────────────────────────
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Atoms",
    description:
      "Horizontal trail of navigational links showing the user's location within a hierarchy. Supports custom separators and click handlers.",
    importStatement: "import { Breadcrumb } from 'lucent-ui'",
    usageCode: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a Breadcrumb from lucent-ui showing a three-level navigation path: Home → Components → current page."`,
      cursor: `@lucent-ui Add a Breadcrumb with three items showing Home, Components, and the current page.`,
      vscode: `Using lucent-ui, add a Breadcrumb component with items array containing href and label.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Breadcrumb from lucent-ui for page navigation"`,
    },
    props: [
      { name: "items", type: "BreadcrumbItem[]", description: "Array of breadcrumb items. Each item has label, optional href and onClick.", required: true },
      { name: "separator", type: "React.ReactNode", description: "Custom separator between items. Defaults to \"/\".", defaultValue: '"/>"' },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the breadcrumb container." },
    ],
    examples: [
      {
        title: "Basic breadcrumb",
        description: "Three-level navigation path with links.",
        previewKey: "breadcrumb-basic",
        code: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ]}
/>`,
      },
      {
        title: "Custom separator",
        description: "Using a › arrow as separator.",
        previewKey: "breadcrumb-separator",
        code: `<Breadcrumb
  separator="›"
  items={[
    { label: "Dashboard", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ]}
/>`,
      },
    ],
  },

  // ── NavLink ──────────────────────────────────────────────────────────────────
  {
    slug: "navlink",
    name: "NavLink",
    category: "Atoms",
    description:
      "Styled navigation anchor with active, disabled, and icon states. Renders as an <a> by default but accepts a custom `as` prop for framework routers.",
    importStatement: "import { NavLink } from 'lucent-ui'",
    usageCode: `<NavLink href="/dashboard" isActive>
  Dashboard
</NavLink>`,
    aiPrompts: {
      claude: `"Build a sidebar navigation using NavLink from lucent-ui. Include Dashboard, Settings, and Profile links, marking the current route as active."`,
      cursor: `@lucent-ui Create a vertical nav list with NavLink components, one marked isActive.`,
      vscode: `Using lucent-ui, build a sidebar using NavLink with href, isActive, and icon props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a NavLink from lucent-ui to a sidebar"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Link label text or content.", required: true },
      { name: "href", type: "string", description: "URL the link points to." },
      { name: "isActive", type: "boolean", description: "Applies the active visual style.", defaultValue: "false" },
      { name: "icon", type: "React.ReactNode", description: "Optional icon rendered before the label." },
      { name: "disabled", type: "boolean", description: "Prevents interaction and dims the link.", defaultValue: "false" },
      { name: "onClick", type: "() => void", description: "Click handler." },
      { name: "as", type: "React.ElementType", description: "Override rendered element — e.g. a Next.js Link.", defaultValue: '"a"' },
    ],
    examples: [
      {
        title: "States",
        description: "Default, active, and disabled nav links.",
        previewKey: "navlink-states",
        code: `<NavLink href="#">Home</NavLink>
<NavLink href="#" isActive>Dashboard</NavLink>
<NavLink href="#" disabled>Admin</NavLink>`,
      },
      {
        title: "Vertical sidebar",
        description: "Stacked nav links mimicking a sidebar.",
        previewKey: "navlink-sidebar",
        code: `<div style={{ display: "flex", flexDirection: "column", gap: 4, width: 200 }}>
  <NavLink href="#" isActive>Dashboard</NavLink>
  <NavLink href="#">Components</NavLink>
  <NavLink href="#">Settings</NavLink>
</div>`,
      },
    ],
  },

  // ── DatePicker ───────────────────────────────────────────────────────────────
  {
    slug: "datepicker",
    name: "DatePicker",
    category: "Atoms",
    description:
      "Controlled date input that opens a calendar popover. Supports three sizes, min/max constraints, and a placeholder.",
    importStatement: "import { DatePicker } from 'lucent-ui'",
    usageCode: `const [date, setDate] = useState<Date | undefined>(undefined);

<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`,
    aiPrompts: {
      claude: `"Add a controlled DatePicker from lucent-ui bound to a useState hook. Include min/max constraints and a clear placeholder."`,
      cursor: `@lucent-ui Add a DatePicker with controlled value, onChange, and optional min/max props.`,
      vscode: `Using lucent-ui, add a DatePicker component with controlled value and onChange handler.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a DatePicker from lucent-ui to a form"`,
    },
    props: [
      { name: "value", type: "Date", description: "Controlled Date object." },
      { name: "defaultValue", type: "Date", description: "Uncontrolled initial Date value." },
      { name: "onChange", type: "(date: Date) => void", description: "Called with the selected Date object." },
      { name: "placeholder", type: "string", description: "Placeholder text when no date is selected.", defaultValue: '"Select date"' },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and font size — matches Input sizing.", defaultValue: `"md"` },
      { name: "disabled", type: "boolean", description: "Disables the input.", defaultValue: "false" },
      { name: "min", type: "Date", description: "Minimum selectable date." },
      { name: "max", type: "Date", description: "Maximum selectable date." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Controlled",
        description: "DatePicker bound to state.",
        previewKey: "datepicker-controlled",
        code: `const [date, setDate] = useState<Date | undefined>(undefined);

<DatePicker value={date} onChange={setDate} placeholder="Pick a date" />`,
      },
      {
        title: "With constraints",
        description: "Min and max restrict selectable range.",
        previewKey: "datepicker-constrained",
        code: `<DatePicker
  defaultValue={new Date("2025-06-15")}
  min={new Date("2025-01-01")}
  max={new Date("2025-12-31")}
  placeholder="Select a 2025 date"
/>`,
      },
      {
        title: "Sizes",
        description: "Three sizes matching Input heights.",
        previewKey: "datepicker-sizes",
        code: `<DatePicker size="sm" placeholder="Size sm" />
<DatePicker size="md" placeholder="Size md" />
<DatePicker size="lg" placeholder="Size lg" />`,
      },
    ],
  },

  // ── DateRangePicker ──────────────────────────────────────────────────────────
  {
    slug: "daterangepicker",
    name: "DateRangePicker",
    category: "Atoms",
    description:
      "Selects a start and end date from a calendar popover. Supports three sizes and real-time range highlighting on hover. Returns a DateRange object with start/end Date values.",
    importStatement: "import { DateRangePicker } from 'lucent-ui'",
    usageCode: `const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Select date range"
/>`,
    aiPrompts: {
      claude: `"Add a DateRangePicker from lucent-ui to a filter bar. Bind it to a DateRange state and display the selected from/to dates below."`,
      cursor: `@lucent-ui Add a DateRangePicker with controlled value and onChange returning a DateRange object.`,
      vscode: `Using lucent-ui, add a DateRangePicker with value and onChange props for a date range filter.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a DateRangePicker from lucent-ui to a filter form"`,
    },
    props: [
      { name: "value", type: "DateRange", description: "Controlled range with { start: Date; end: Date }." },
      { name: "defaultValue", type: "DateRange", description: "Uncontrolled initial range." },
      { name: "onChange", type: "(range: DateRange) => void", description: "Called with the selected range." },
      { name: "placeholder", type: "string", description: "Placeholder when no range is selected.", defaultValue: '"Select range"' },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and font size — matches Input sizing.", defaultValue: `"md"` },
      { name: "disabled", type: "boolean", description: "Disables the input.", defaultValue: "false" },
      { name: "min", type: "Date", description: "Minimum selectable date." },
      { name: "max", type: "Date", description: "Maximum selectable date." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Controlled",
        description: "DateRangePicker bound to state.",
        previewKey: "daterangepicker-controlled",
        code: `const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

<DateRangePicker
  value={range}
  onChange={setRange}
  placeholder="Select date range"
/>`,
      },
      {
        title: "Disabled",
        description: "Non-interactive state.",
        previewKey: "daterangepicker-disabled",
        code: `<DateRangePicker disabled placeholder="Unavailable" />`,
      },
      {
        title: "Sizes",
        description: "Three sizes matching Input heights.",
        previewKey: "daterangepicker-sizes",
        code: `<DateRangePicker size="sm" placeholder="Size sm" />
<DateRangePicker size="md" placeholder="Size md" />
<DateRangePicker size="lg" placeholder="Size lg" />`,
      },
    ],
  },

  // ── MultiSelect ──────────────────────────────────────────────────────────────
  {
    slug: "multiselect",
    name: "MultiSelect",
    category: "Atoms",
    description:
      "Dropdown that allows selecting multiple options rendered as Chips. Supports three sizes, label, helper/error text, max selection, and size-aware dropdown density.",
    importStatement: "import { MultiSelect } from 'lucent-ui'",
    usageCode: `const [values, setValues] = useState<string[]>([]);

<MultiSelect
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]}
  value={values}
  onChange={setValues}
  placeholder="Select frameworks"
/>`,
    aiPrompts: {
      claude: `"Add a MultiSelect from lucent-ui for selecting multiple tags or categories. Bind to a string[] state and show selected values as chips."`,
      cursor: `@lucent-ui Add a MultiSelect with options array and controlled string[] value.`,
      vscode: `Using lucent-ui, add a MultiSelect component with options, value, and onChange props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a MultiSelect from lucent-ui to a filter form"`,
    },
    props: [
      { name: "options", type: "MultiSelectOption[]", description: "Array of { value, label, disabled? } options.", required: true },
      { name: "value", type: "string[]", description: "Controlled array of selected values." },
      { name: "defaultValue", type: "string[]", description: "Uncontrolled initial selection.", defaultValue: "[]" },
      { name: "onChange", type: "(values: string[]) => void", description: "Called with updated selection array." },
      { name: "placeholder", type: "string", description: "Placeholder when nothing is selected.", defaultValue: '"Select..."' },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height, font size, and border radius matching Input.", defaultValue: `"md"` },
      { name: "label", type: "string", description: "Label displayed above the multi-select." },
      { name: "helperText", type: "string", description: "Hint or description below the control." },
      { name: "errorText", type: "string", description: "Error message; triggers the error visual state." },
      { name: "disabled", type: "boolean", description: "Disables the entire control.", defaultValue: "false" },
      { name: "max", type: "number", description: "Maximum number of selectable items." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Controlled",
        description: "MultiSelect bound to state.",
        previewKey: "multiselect-controlled",
        code: `const [values, setValues] = useState<string[]>(["react"]);

<MultiSelect
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "angular", label: "Angular" },
  ]}
  value={values}
  onChange={setValues}
  placeholder="Select frameworks"
/>`,
      },
      {
        title: "With max",
        description: "Limit selection to 2 items.",
        previewKey: "multiselect-max",
        code: `<MultiSelect
  options={[
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
    { value: "d", label: "Option D" },
  ]}
  defaultValue={["a"]}
  max={2}
  placeholder="Pick up to 2"
/>`,
      },
      {
        title: "With label & helper text",
        description: "Label, helper text, and size matching Input's pattern.",
        previewKey: "multiselect-labeled",
        code: `<MultiSelect
  label="Technologies"
  helperText="Select the frameworks you use"
  size="md"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]}
  value={values}
  onChange={setValues}
  placeholder="Select frameworks"
/>`,
      },
    ],
  },

  // ── Tabs ─────────────────────────────────────────────────────────────────────
  {
    slug: "tabs",
    name: "Tabs",
    category: "Molecules",
    description:
      "Horizontal tab bar with associated content panels. Supports controlled and uncontrolled modes and disabled tabs.",
    importStatement: "import { Tabs } from 'lucent-ui'",
    usageCode: `<Tabs
  defaultValue="overview"
  tabs={[
    { value: "overview", label: "Overview", content: <p>Overview content</p> },
    { value: "details", label: "Details", content: <p>Details content</p> },
    { value: "settings", label: "Settings", content: <p>Settings content</p> },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a Tabs component from lucent-ui with three panels: Overview, Details, and Settings. Use defaultValue to set the initial active tab."`,
      cursor: `@lucent-ui Add a Tabs component with tabs array containing value, label, and content.`,
      vscode: `Using lucent-ui, add a Tabs component with multiple tab panels and defaultValue.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Tabs component from lucent-ui with multiple panels"`,
    },
    props: [
      { name: "tabs", type: "TabItem[]", description: "Array of { value, label, content, disabled? } tab definitions.", required: true },
      { name: "defaultValue", type: "string", description: "Uncontrolled initial active tab value." },
      { name: "value", type: "string", description: "Controlled active tab value." },
      { name: "onChange", type: "(value: string) => void", description: "Called when the active tab changes." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the tabs wrapper." },
    ],
    examples: [
      {
        title: "Basic",
        description: "Three tabs with content panels.",
        previewKey: "tabs-basic",
        code: `<Tabs
  defaultValue="overview"
  tabs={[
    { value: "overview", label: "Overview", content: <Text>Overview content here.</Text> },
    { value: "details", label: "Details", content: <Text>Details content here.</Text> },
    { value: "settings", label: "Settings", content: <Text>Settings content here.</Text> },
  ]}
/>`,
      },
      {
        title: "With disabled tab",
        description: "A tab can be disabled to prevent selection.",
        previewKey: "tabs-disabled",
        code: `<Tabs
  defaultValue="active"
  tabs={[
    { value: "active", label: "Active", content: <Text>Active panel.</Text> },
    { value: "preview", label: "Preview", content: <Text>Preview panel.</Text> },
    { value: "locked", label: "Locked", content: <Text>Locked.</Text>, disabled: true },
  ]}
/>`,
      },
      {
        title: "Overflow menu",
        description: "When tabs exceed the container width, extra items collapse into a \"more\" overflow menu automatically.",
        previewKey: "tabs-overflow",
        code: `<div style={{ width: 260 }}>
  <Tabs
    defaultValue="home"
    tabs={[
      { value: "home", label: "Home", content: <Text>Home content.</Text> },
      { value: "profile", label: "Profile", content: <Text>Profile content.</Text> },
      { value: "settings", label: "Settings", content: <Text>Settings content.</Text> },
      { value: "billing", label: "Billing", content: <Text>Billing content.</Text> },
      { value: "notifications", label: "Notifications", content: <Text>Notifications content.</Text> },
      { value: "integrations", label: "Integrations", content: <Text>Integrations content.</Text> },
    ]}
  />
</div>`,
      },
    ],
  },

  // ── Collapsible ───────────────────────────────────────────────────────────────
  {
    slug: "collapsible",
    name: "Collapsible",
    category: "Molecules",
    description:
      "Expandable/collapsible content section with a trigger. Supports controlled and uncontrolled open state with smooth animation.",
    importStatement: "import { Collapsible } from 'lucent-ui'",
    usageCode: `<Collapsible trigger="Advanced options">
  <Text>Hidden content revealed on expand.</Text>
</Collapsible>`,
    aiPrompts: {
      claude: `"Add a Collapsible from lucent-ui to reveal advanced settings. Pass a string as trigger and nest form fields as children."`,
      cursor: `@lucent-ui Add a Collapsible with a trigger label and children content that expands on click.`,
      vscode: `Using lucent-ui, add a Collapsible component with trigger and children props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Collapsible from lucent-ui for expandable content"`,
    },
    props: [
      { name: "trigger", type: "React.ReactNode", description: "The always-visible trigger element (string or JSX).", required: true },
      { name: "children", type: "React.ReactNode", description: "Content shown when expanded.", required: true },
      { name: "defaultOpen", type: "boolean", description: "Uncontrolled initial open state.", defaultValue: "false" },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state changes." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Uncontrolled",
        description: "Self-managed open state with defaultOpen.",
        previewKey: "collapsible-basic",
        code: `<Collapsible trigger="Show advanced options">
  <Text color="secondary">Hidden until expanded. Place any content here.</Text>
</Collapsible>`,
      },
      {
        title: "Default open",
        description: "Starts in the expanded state.",
        previewKey: "collapsible-open",
        code: `<Collapsible trigger="Release notes" defaultOpen>
  <Text>v0.4.0 — Added Tabs, Collapsible, DataTable, and more.</Text>
</Collapsible>`,
      },
    ],
  },

  // ── CommandPalette ────────────────────────────────────────────────────────────
  {
    slug: "commandpalette",
    name: "CommandPalette",
    category: "Molecules",
    description:
      "Keyboard-accessible command launcher with search filtering and grouped commands. Opens via a configurable keyboard shortcut.",
    importStatement: "import { CommandPalette } from 'lucent-ui'",
    usageCode: `const [open, setOpen] = useState(false);

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  commands={[
    { id: "new", label: "New file", group: "File", onSelect: () => {} },
    { id: "save", label: "Save", group: "File", onSelect: () => {} },
    { id: "find", label: "Find in project", group: "Edit", onSelect: () => {} },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a CommandPalette from lucent-ui with grouped commands for navigation, file actions, and settings. Bind open state to a keyboard shortcut handler."`,
      cursor: `@lucent-ui Add a CommandPalette with grouped commands and open/onOpenChange props.`,
      vscode: `Using lucent-ui, add a CommandPalette component with controlled open state and commands array.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a CommandPalette from lucent-ui to the app"`,
    },
    props: [
      { name: "commands", type: "CommandItem[]", description: "Array of { id, label, description?, icon?, group?, onSelect, disabled? } commands.", required: true },
      { name: "open", type: "boolean", description: "Controlled open state.", required: true },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the palette is opened or closed.", required: true },
      { name: "placeholder", type: "string", description: "Search input placeholder.", defaultValue: '"Search commands..."' },
      { name: "shortcutKey", type: "string", description: "Keyboard key that toggles the palette (with Cmd/Ctrl)." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the dialog." },
    ],
    examples: [
      {
        title: "Grouped commands",
        description: "Commands organised into File and Edit groups.",
        previewKey: "commandpalette-groups",
        code: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open palette</Button>
  <CommandPalette
    open={open}
    onOpenChange={setOpen}
    commands={[
      { id: "new", label: "New file", group: "File", onSelect: () => setOpen(false) },
      { id: "save", label: "Save", group: "File", onSelect: () => setOpen(false) },
      { id: "find", label: "Find in project", group: "Edit", onSelect: () => setOpen(false) },
      { id: "replace", label: "Replace", group: "Edit", onSelect: () => setOpen(false) },
    ]}
  />
</>`,
      },
    ],
  },

  // ── DataTable ─────────────────────────────────────────────────────────────────
  {
    slug: "datatable",
    name: "DataTable",
    category: "Molecules",
    description:
      "Feature-rich table with sortable columns, pagination, and a custom empty state. Accepts typed row data via generics.",
    importStatement: "import { DataTable } from 'lucent-ui'",
    usageCode: `<DataTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role" },
    { key: "status", header: "Status" },
  ]}
  rows={[
    { name: "Alice", role: "Engineer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Away" },
  ]}
  pageSize={10}
/>`,
    aiPrompts: {
      claude: `"Add a DataTable from lucent-ui to display a list of users. Include sortable Name and Role columns, pagination set to 10 rows per page, and an empty state."`,
      cursor: `@lucent-ui Add a DataTable with typed columns, rows array, and pageSize.`,
      vscode: `Using lucent-ui, add a DataTable component with columns, rows, and pagination props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a DataTable from lucent-ui to display tabular data"`,
    },
    props: [
      { name: "columns", type: "DataTableColumn<T>[]", description: "Column definitions with key, header, optional render, sortable, width, and align.", required: true },
      { name: "rows", type: "T[]", description: "Array of row data objects.", required: true },
      { name: "pageSize", type: "number", description: "Number of rows per page.", defaultValue: "10" },
      { name: "page", type: "number", description: "Controlled current page (1-indexed)." },
      { name: "onPageChange", type: "(page: number) => void", description: "Called when the user changes the page." },
      { name: "emptyState", type: "React.ReactNode", description: "Content rendered when rows is empty." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the table wrapper." },
    ],
    examples: [
      {
        title: "Basic table",
        description: "Sortable columns with pagination.",
        previewKey: "datatable-basic",
        code: `<DataTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "role", header: "Role", sortable: true },
    { key: "status", header: "Status" },
  ]}
  rows={[
    { name: "Alice", role: "Engineer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Away" },
    { name: "Carol", role: "Manager", status: "Active" },
    { name: "Dave", role: "QA", status: "Inactive" },
  ]}
  pageSize={3}
/>`,
      },
      {
        title: "Empty state",
        description: "Custom message when there are no rows.",
        previewKey: "datatable-empty",
        code: `<DataTable
  columns={[
    { key: "name", header: "Name" },
    { key: "role", header: "Role" },
  ]}
  rows={[]}
  emptyState={<Text color="secondary">No results found.</Text>}
/>`,
      },
    ],
  },

  // ── FileUpload ────────────────────────────────────────────────────────────────
  {
    slug: "fileupload",
    name: "FileUpload",
    category: "Molecules",
    description:
      "Drag-and-drop file upload zone with file list, progress tracking, error display, and size validation.",
    importStatement: "import { FileUpload } from 'lucent-ui'",
    usageCode: `const [files, setFiles] = useState([]);

<FileUpload
  value={files}
  onChange={setFiles}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
/>`,
    aiPrompts: {
      claude: `"Add a FileUpload from lucent-ui that accepts images up to 5 MB. Show progress bars and allow multiple files. Handle onError for size validation feedback."`,
      cursor: `@lucent-ui Add a FileUpload with accept, multiple, maxSize, and controlled value/onChange.`,
      vscode: `Using lucent-ui, add a FileUpload component with drag-and-drop, maxSize validation, and onChange.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FileUpload from lucent-ui to a form"`,
    },
    props: [
      { name: "value", type: "UploadFile[]", description: "Controlled list of UploadFile objects.", required: true },
      { name: "onChange", type: "(files: UploadFile[]) => void", description: "Called when the file list changes.", required: true },
      { name: "accept", type: "string", description: "Accepted MIME types, e.g. \"image/*\" or \".pdf\"." },
      { name: "multiple", type: "boolean", description: "Allow multiple file selection.", defaultValue: "false" },
      { name: "maxSize", type: "number", description: "Maximum file size in bytes." },
      { name: "onError", type: "(error: string) => void", description: "Called when a file exceeds maxSize." },
      { name: "disabled", type: "boolean", description: "Disables the upload zone.", defaultValue: "false" },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Image upload",
        description: "Accepts images up to 5 MB, multiple files.",
        previewKey: "fileupload-images",
        code: `const [files, setFiles] = useState([]);

<FileUpload
  value={files}
  onChange={setFiles}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
/>`,
      },
      {
        title: "Disabled",
        description: "Upload zone in disabled state.",
        previewKey: "fileupload-disabled",
        code: `<FileUpload value={[]} onChange={() => {}} disabled />`,
      },
    ],
  },

  // ── PageLayout ────────────────────────────────────────────────────────────────
  {
    slug: "pagelayout",
    name: "PageLayout",
    category: "Molecules",
    description:
      "Full-page shell with a fixed header, collapsible left sidebar, optional right sidebar, and scrollable main content area. Designed as a top-level layout wrapper.",
    importStatement: "import { PageLayout } from 'lucent-ui'",
    usageCode: `<PageLayout
  header={<div>App header</div>}
  sidebar={<nav>Sidebar nav</nav>}
  sidebarWidth={240}
>
  <p>Main page content</p>
</PageLayout>`,
    aiPrompts: {
      claude: `"Wrap the app in a PageLayout from lucent-ui. Pass a header with a logo and nav, a sidebar with NavLink items, an optional rightSidebar for a details panel, and the page content as children."`,
      cursor: `@lucent-ui Add a PageLayout with header, sidebar, rightSidebar, and children props.`,
      vscode: `Using lucent-ui, add a PageLayout component as the root shell with header, left sidebar, right sidebar, and content area.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a PageLayout from lucent-ui as the app shell with a right sidebar"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Main content area.", required: true },
      { name: "header", type: "React.ReactNode", description: "Content for the fixed top header bar." },
      { name: "sidebar", type: "React.ReactNode", description: "Content for the left sidebar." },
      { name: "sidebarWidth", type: "number", description: "Sidebar width in pixels.", defaultValue: "240" },
      { name: "headerHeight", type: "number", description: "Header height in pixels.", defaultValue: "56" },
      { name: "sidebarCollapsed", type: "boolean", description: "Collapses the left sidebar when true.", defaultValue: "false" },
      { name: "rightSidebar", type: "React.ReactNode", description: "Content for the right sidebar panel." },
      { name: "rightSidebarWidth", type: "number | string", description: "Right sidebar width in px or any CSS value.", defaultValue: "240" },
      { name: "rightSidebarCollapsed", type: "boolean", description: "Collapses the right sidebar when true.", defaultValue: "false" },
      { name: "footer", type: "React.ReactNode", description: "Content for the footer bar rendered below the body row." },
      { name: "footerHeight", type: "number | string", description: "Footer height in px or any CSS value.", defaultValue: "48" },
      { name: "mainStyle", type: "React.CSSProperties", description: "Inline styles for the main content area." },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the outer wrapper." },
    ],
    examples: [
      {
        title: "With header and sidebar",
        description: "Full app shell layout.",
        previewKey: "pagelayout-full",
        code: `<PageLayout
  header={<Text weight="semibold">My App</Text>}
  sidebar={
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
      <NavLink href="#" isActive>Dashboard</NavLink>
      <NavLink href="#">Settings</NavLink>
    </div>
  }
  sidebarWidth={200}
  style={{ height: 400 }}
>
  <Text>Main content area</Text>
</PageLayout>`,
      },
      {
        title: "Collapsed sidebar",
        description: "Sidebar hidden via sidebarCollapsed.",
        previewKey: "pagelayout-collapsed",
        code: `<PageLayout
  header={<Text weight="semibold">My App</Text>}
  sidebar={<NavLink href="#">Dashboard</NavLink>}
  sidebarCollapsed
  style={{ height: 300 }}
>
  <Text>Full-width content when sidebar is hidden.</Text>
</PageLayout>`,
      },
      {
        title: "With right sidebar",
        description: "Optional right panel for contextual info or tools.",
        previewKey: "pagelayout-right-sidebar",
        code: `<PageLayout
  header={<Text weight="semibold">My App</Text>}
  sidebar={
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
      <NavLink href="#" isActive>Dashboard</NavLink>
      <NavLink href="#">Settings</NavLink>
    </div>
  }
  rightSidebar={
    <div style={{ padding: 12 }}>
      <Text size="sm" weight="semibold">Details</Text>
      <Text size="sm">Contextual info panel</Text>
    </div>
  }
  rightSidebarWidth={200}
  style={{ height: 400 }}
>
  <Text>Main content area</Text>
</PageLayout>`,
      },
    ],
  },

  // ── Timeline ──────────────────────────────────────────────────────────────────
  {
    slug: "timeline",
    name: "Timeline",
    category: "Molecules",
    description:
      "Vertical list of timestamped events with status indicators, icons, and descriptions. Ideal for activity feeds and progress trackers.",
    importStatement: "import { Timeline } from 'lucent-ui'",
    usageCode: `<Timeline
  items={[
    { id: "1", title: "Order placed", date: "Mar 1", status: "success" },
    { id: "2", title: "Processing", date: "Mar 2", status: "info" },
    { id: "3", title: "Shipped", date: "Mar 3", status: "default" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a Timeline from lucent-ui showing an order status history. Include timestamps, status indicators (success, info, warning, danger), and short descriptions."`,
      cursor: `@lucent-ui Add a Timeline with items array containing id, title, date, and status.`,
      vscode: `Using lucent-ui, add a Timeline component with status-coloured items and optional descriptions.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Timeline from lucent-ui to show event history"`,
    },
    props: [
      { name: "items", type: "TimelineItem[]", description: "Array of { id, title, description?, date?, status?, icon? } items.", required: true },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the timeline wrapper." },
    ],
    examples: [
      {
        title: "Status variants",
        description: "Items with different status indicators.",
        previewKey: "timeline-statuses",
        code: `<Timeline
  items={[
    { id: "1", title: "Deployed to production", date: "Mar 1", status: "success" },
    { id: "2", title: "Build running", date: "Mar 1", status: "info" },
    { id: "3", title: "Tests warning", date: "Feb 28", status: "warning" },
    { id: "4", title: "Deploy failed", date: "Feb 27", status: "danger" },
  ]}
/>`,
      },
      {
        title: "With descriptions",
        description: "Each item has a title and longer description.",
        previewKey: "timeline-descriptions",
        code: `<Timeline
  items={[
    { id: "1", title: "Account created", description: "Welcome to the platform!", date: "Jan 10", status: "success" },
    { id: "2", title: "Profile updated", description: "Added avatar and bio.", date: "Jan 12" },
    { id: "3", title: "First project", description: "Created project 'Lucent UI'.", date: "Jan 15", status: "info" },
  ]}
/>`,
      },
    ],
  },

  // ── Slider ──────────────────────────────────────────────────────────────────
  {
    slug: "slider",
    name: "Slider",
    category: "Atoms",
    description:
      "Range input styled with Lucent tokens for selecting a numeric value within a bounded range. Supports controlled and uncontrolled usage, three sizes, and an inline value display.",
    importStatement: "import { Slider } from 'lucent-ui'",
    usageCode: `<Slider label="Volume" showValue />`,
    aiPrompts: {
      claude: `"Add a Slider from lucent-ui with a label and showValue. Range 0–100, step 1."`,
      cursor: `@lucent-ui Add a Slider with label and showValue. Make it controlled with a useState hook.`,
      vscode: `Using the lucent-ui component library, add a Slider with label and showValue props.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a Slider from lucent-ui with label and showValue"`,
    },
    props: [
      { name: "min", type: "number", description: "Minimum value.", defaultValue: "0" },
      { name: "max", type: "number", description: "Maximum value.", defaultValue: "100" },
      { name: "step", type: "number", description: "Increment step between values.", defaultValue: "1" },
      { name: "value", type: "number", description: "Controlled current value. Pair with onChange." },
      { name: "defaultValue", type: "number", description: "Initial value for uncontrolled usage. Defaults to the midpoint of min/max." },
      { name: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", description: "Called on every value change." },
      { name: "label", type: "string", description: "Visible label rendered above the track." },
      { name: "showValue", type: "boolean", description: "Displays the current numeric value beside the label.", defaultValue: "false" },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Controls track thickness and thumb diameter.", defaultValue: `"md"` },
      { name: "disabled", type: "boolean", description: "Prevents interaction and dims the control.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Sizes",
        description: "Three track sizes — sm, md, and lg.",
        previewKey: "slider-sizes",
        code: `<Slider size="sm" label="Small" />
<Slider size="md" label="Medium" />
<Slider size="lg" label="Large" />`,
      },
      {
        title: "Controlled with value display",
        description: "Controlled slider with live numeric readout.",
        previewKey: "slider-controlled",
        code: `const [val, setVal] = useState(40);
<Slider
  label="Opacity"
  value={val}
  onChange={e => setVal(Number(e.target.value))}
  showValue
/>`,
      },
      {
        title: "Disabled",
        description: "Disabled state prevents interaction.",
        previewKey: "slider-disabled",
        code: `<Slider label="Locked" disabled defaultValue={40} />`,
      },
    ],
  },

  // ── CodeBlock ────────────────────────────────────────────────────────────────
  {
    slug: "codeblock",
    name: "CodeBlock",
    category: "Atoms",
    description:
      "Styled code display with optional tabs, a language label, copy-to-clipboard, and an AI prompt variant. Zero-dependency — no syntax highlighting library bundled.",
    importStatement: "import { CodeBlock } from 'lucent-ui'",
    usageCode: `<CodeBlock language="tsx" code={\`<Button variant="primary">Save</Button>\`} />`,
    aiPrompts: {
      claude: `"Add a CodeBlock from lucent-ui to display a code snippet. Show a language label and copy-to-clipboard button."`,
      cursor: `@lucent-ui Add a CodeBlock with language label and code prop for displaying a snippet.`,
      vscode: `Using the lucent-ui component library, add a CodeBlock component to display a formatted code snippet.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a CodeBlock from lucent-ui"`,
    },
    props: [
      { name: "code", type: "string", description: "Code string — used in single (non-tabbed) mode." },
      { name: "language", type: "string", description: "Language label shown in the header. Purely cosmetic." },
      { name: "tabs", type: "{ label: string; code: string; language?: string; icon?: string }[]", description: "Tabbed mode. Each entry has label, code, optional language and icon. Switching tabs resets copy state." },
      { name: "variant", type: `"code" | "prompt"`, description: `"code" renders a scrollable pre/code block. "prompt" renders a single-line truncated span suited to AI tool prompts.`, defaultValue: `"code"` },
      { name: "helperText", type: "string", description: "Descriptive text rendered between the tab bar and the code area." },
      { name: "showCopyButton", type: "boolean", description: "Renders a copy-to-clipboard button. Shows a 'Copied!' confirmation for 2s on success.", defaultValue: "true" },
    ],
    examples: [
      {
        title: "Single snippet",
        description: "A code block with a language label.",
        previewKey: "codeblock-single",
        code: `<CodeBlock language="tsx" code={\`<Button variant="primary">Save</Button>\`} />`,
      },
      {
        title: "Tabbed install commands",
        description: "Multiple related snippets with tab switching.",
        previewKey: "codeblock-tabs",
        code: `<CodeBlock
  tabs={[
    { label: 'pnpm', code: 'pnpm add lucent-ui', language: 'bash' },
    { label: 'npm',  code: 'npm install lucent-ui', language: 'bash' },
    { label: 'yarn', code: 'yarn add lucent-ui', language: 'bash' },
  ]}
/>`,
      },
      {
        title: "AI prompt variant",
        description: "Single-line truncated display for AI tool prompts.",
        previewKey: "codeblock-prompt",
        code: `<CodeBlock
  variant="prompt"
  helperText="Paste into Claude:"
  code={'Add a Button with variant="primary".'}
/>`,
      },
    ],
  },

  // ── Table ────────────────────────────────────────────────────────────────────
  {
    slug: "table",
    name: "Table",
    category: "Atoms",
    description:
      "Lightweight token-styled HTML table with compound sub-components. Distinct from DataTable — no sorting, filtering, or pagination. Use for static reference data, props tables, and comparison grids.",
    importStatement: "import { Table } from 'lucent-ui'",
    usageCode: `<Table>
  <Table.Head>
    <Table.Row>
      <Table.Cell as="th">Name</Table.Cell>
      <Table.Cell as="th">Role</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice</Table.Cell>
      <Table.Cell>Engineer</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
    aiPrompts: {
      claude: `"Add a Table from lucent-ui with Table.Head, Table.Body, Table.Row, and Table.Cell sub-components. Include column headers."`,
      cursor: `@lucent-ui Add a Table with compound sub-components for a static reference data grid with column headers.`,
      vscode: `Using the lucent-ui component library, add a Table with Table.Head and Table.Body compound sub-components.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a Table from lucent-ui to display reference data"`,
    },
    props: [
      { name: "striped", type: "boolean", description: "Applies alternating bgMuted backgrounds to even tbody rows.", defaultValue: "false" },
      { name: "Table.Head", type: "component", description: "Renders <thead> with bgMuted background. Accepts Table.Row children." },
      { name: "Table.Body", type: "component", description: "Renders <tbody>. Accepts Table.Row children." },
      { name: "Table.Foot", type: "component", description: "Renders <tfoot> with bgMuted background." },
      { name: "Table.Row", type: "component", description: "Renders <tr> with a hover highlight. Accepts Table.Cell children." },
      { name: "Table.Cell", type: "component", description: `Renders <td> by default or <th scope="col"> when as="th". Header cells are semibold; data cells are regular weight.` },
    ],
    examples: [
      {
        title: "Basic",
        description: "Simple table with head and body.",
        previewKey: "table-basic",
        code: `<Table>
  <Table.Head>
    <Table.Row>
      <Table.Cell as="th">Name</Table.Cell>
      <Table.Cell as="th">Role</Table.Cell>
      <Table.Cell as="th">Status</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice</Table.Cell>
      <Table.Cell>Engineer</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Bob</Table.Cell>
      <Table.Cell>Designer</Table.Cell>
      <Table.Cell>Away</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Carol</Table.Cell>
      <Table.Cell>Manager</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
      },
      {
        title: "Striped",
        description: "Alternating row backgrounds for easier scanning.",
        previewKey: "table-striped",
        code: `<Table striped>
  <Table.Head>
    <Table.Row>
      <Table.Cell as="th">Name</Table.Cell>
      <Table.Cell as="th">Role</Table.Cell>
      <Table.Cell as="th">Status</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice</Table.Cell>
      <Table.Cell>Engineer</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Bob</Table.Cell>
      <Table.Cell>Designer</Table.Cell>
      <Table.Cell>Away</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Carol</Table.Cell>
      <Table.Cell>Manager</Table.Cell>
      <Table.Cell>Active</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
      },
      {
        title: "With rich cell content",
        description: "Embed other Lucent components inside cells.",
        previewKey: "table-rich-cells",
        code: `<Table>
  <Table.Head>
    <Table.Row>
      <Table.Cell as="th">User</Table.Cell>
      <Table.Cell as="th">Status</Table.Cell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Alice</Table.Cell>
      <Table.Cell><Chip variant="success" dot>Active</Chip></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Bob</Table.Cell>
      <Table.Cell><Chip variant="warning" dot>Away</Chip></Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Carol</Table.Cell>
      <Table.Cell><Chip variant="danger" dot>Inactive</Chip></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>`,
      },
    ],
  },

  // ── ColorPicker ───────────────────────────────────────────────────────────────
  {
    slug: "colorpicker",
    name: "ColorPicker",
    category: "Atoms",
    description:
      "Fully-featured color selection component. Opens a popover with a spectrum panel, hue and alpha sliders, four input formats (Hex, RGB, HSL, HSB), eyedropper support, and multi-group preset palettes switchable via dropdown.",
    importStatement: "import { ColorPicker } from 'lucent-ui'",
    usageCode: `<ColorPicker value={color} onChange={setColor} label="Brand color" />`,
    aiPrompts: {
      claude: `"Add a ColorPicker from lucent-ui with a label and preset color groups. Handle state with useState."`,
      cursor: `@lucent-ui Add a ColorPicker with preset brand and semantic color groups. Use controlled state.`,
      vscode: `Using the lucent-ui component library, add a ColorPicker with label and presetGroups for brand colors.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a ColorPicker from lucent-ui with preset groups"`,
    },
    props: [
      { name: "value", type: "string", description: "Current color value (any CSS color string).", required: true },
      { name: "onChange", type: "(color: string) => void", description: "Callback fired when the color changes.", required: true },
      { name: "label", type: "string", description: "Label displayed above the trigger swatch." },
      { name: "presetGroups", type: "ColorPresetGroup[]", description: "Array of { label, colors } groups. Single group hides the switcher; multiple groups show a dropdown." },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Default",
        description: "Basic color picker with label.",
        previewKey: "colorpicker-default",
        code: `const [color, setColor] = useState("#3b82f6");

<ColorPicker value={color} onChange={setColor} label="Brand color" />`,
      },
      {
        title: "With preset groups",
        description: "Multiple preset palettes switchable via dropdown.",
        previewKey: "colorpicker-presets",
        code: `const [color, setColor] = useState("#111827");

<ColorPicker
  value={color}
  onChange={setColor}
  label="Theme color"
  presetGroups={[
    { label: "Brand", colors: ["#111827", "#3b82f6", "#8b5cf6"] },
    { label: "Semantic", colors: ["#22c55e", "#f59e0b", "#ef4444"] },
  ]}
/>`,
      },
    ],
  },

  // ── ColorSwatch ───────────────────────────────────────────────────────────────
  {
    slug: "colorswatch",
    name: "ColorSwatch",
    category: "Atoms",
    description:
      "Standalone color swatch atom. Supports circle and square shapes, six sizes (xs–2xl), a selected state with an inset ring, and a checkerboard background for colors with transparency. Fully interactive as a button.",
    importStatement: "import { ColorSwatch } from 'lucent-ui'",
    usageCode: `<ColorSwatch color="#3b82f6" size="lg" />`,
    aiPrompts: {
      claude: `"Add a ColorSwatch from lucent-ui with a selected state and square shape. Use size="lg"."`,
      cursor: `@lucent-ui Add a ColorSwatch with selected state, square shape, and lg size.`,
      vscode: `Using the lucent-ui component library, add a ColorSwatch with square shape, selected state, and onClick handler.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a ColorSwatch from lucent-ui"`,
    },
    props: [
      { name: "color", type: "string", description: "CSS color value to display.", required: true },
      { name: "size", type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, description: "Swatch diameter / side length.", defaultValue: `"md"` },
      { name: "shape", type: `"circle" | "square"`, description: "Swatch shape.", defaultValue: `"circle"` },
      { name: "selected", type: "boolean", description: "Shows an inset ring to indicate selection.", defaultValue: "false" },
      { name: "showCheckerboard", type: "boolean", description: "Shows a checkerboard pattern behind transparent colors.", defaultValue: "false" },
      { name: "onClick", type: "() => void", description: "Click handler — makes the swatch interactive." },
    ],
    examples: [
      {
        title: "Shapes and sizes",
        description: "Circle and square shapes across different sizes.",
        previewKey: "colorswatch-shapes",
        code: `<ColorSwatch color="#3b82f6" size="sm" />
<ColorSwatch color="#8b5cf6" size="md" />
<ColorSwatch color="#ef4444" size="lg" shape="square" />
<ColorSwatch color="#22c55e" size="xl" shape="square" />`,
      },
      {
        title: "Selected and transparency",
        description: "Selected state with inset ring and checkerboard for alpha colors.",
        previewKey: "colorswatch-selected",
        code: `<ColorSwatch color="#3b82f6" size="lg" selected />
<ColorSwatch color="rgba(59,130,246,0.4)" size="lg" showCheckerboard />`,
      },
    ],
  },

  // ── SegmentedControl ──────────────────────────────────────────────────────────
  {
    slug: "segmentedcontrol",
    name: "SegmentedControl",
    category: "Atoms",
    description:
      "Pill-style toggle group with a smooth sliding selection indicator. Fills its container by default. Use for format switchers, view mode toggles, or filter bars.",
    importStatement: "import { SegmentedControl } from 'lucent-ui'",
    usageCode: `<SegmentedControl
  defaultValue="grid"
  options={[
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a SegmentedControl from lucent-ui with three options for switching between view modes. Use defaultValue."`,
      cursor: `@lucent-ui Add a SegmentedControl with grid/list/table options and a defaultValue.`,
      vscode: `Using the lucent-ui component library, add a SegmentedControl for view mode switching with three options.`,
      mcp: `// lucent-ui MCP — add to your tools config:
{
  "mcpServers": {
    "lucent-ui": {
      "command": "npx",
      "args": ["-y", "lucent-ui-mcp"]
    }
  }
}
// Then ask: "Add a SegmentedControl from lucent-ui for view mode toggling"`,
    },
    props: [
      { name: "options", type: "{ value: string; label: string }[]", description: "The available options.", required: true },
      { name: "defaultValue", type: "string", description: "Initially selected value (uncontrolled)." },
      { name: "value", type: "string", description: "Selected value (controlled)." },
      { name: "onChange", type: "(value: string) => void", description: "Callback fired when the selection changes." },
      { name: "disabled", type: "boolean", description: "Disables all options.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Default",
        description: "Three-option toggle with a sliding indicator.",
        previewKey: "segmentedcontrol-default",
        code: `<SegmentedControl
  defaultValue="grid"
  options={[
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
    { value: "table", label: "Table" },
  ]}
/>`,
      },
      {
        title: "Controlled",
        description: "Controlled value with onChange callback.",
        previewKey: "segmentedcontrol-controlled",
        code: `const [view, setView] = useState("overview");

<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: "overview", label: "Overview" },
    { value: "details", label: "Details" },
    { value: "activity", label: "Activity" },
  ]}
/>`,
      },
    ],
  },

  // ── Chip ──────────────────────────────────────────────────────────────────────
  {
    slug: "chip",
    name: "Chip",
    category: "Atoms",
    description:
      "Unified label primitive replacing Tag and Badge. Supports dismissible, clickable, and selectable modes with swatch, dot, leftIcon, and borderless options. Available in three sizes and six semantic variants. Heights scale with spacing tokens.",
    importStatement: "import { Chip } from 'lucent-ui'",
    usageCode: `<Chip variant="accent" onDismiss={() => remove(id)}>
  TypeScript
</Chip>`,
    aiPrompts: {
      claude: `"Add a list of Chip components from lucent-ui for filter tags. Support dismiss and click-to-select. Use the swatch prop for color-coded categories."`,
      cursor: `@lucent-ui Add Chips with onDismiss for removable tags and onClick for selectable filters.`,
      vscode: `Using lucent-ui, add Chip components with variant, onDismiss, and swatch props for a category filter bar.`,
      mcp: `// lucent-ui MCP
// Ask: "Add Chip components from lucent-ui for a filter tag list"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Chip label.", required: true },
      { name: "variant", type: `"neutral" | "accent" | "success" | "warning" | "danger" | "info"`, description: "Semantic colour variant.", defaultValue: `"neutral"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Chip size. Heights scale with spacing tokens.", defaultValue: `"md"` },
      { name: "onDismiss", type: "() => void", description: "If provided, renders a dismiss (×) button for removable chips." },
      { name: "onClick", type: "() => void", description: "Makes the chip clickable — renders as a button element." },
      { name: "leftIcon", type: "React.ReactNode", description: "Icon or element rendered before the label (emoji, flags, avatars)." },
      { name: "swatch", type: "string", description: "Hex color rendered as a small dot before the label for color-coded categories." },
      { name: "dot", type: "boolean", description: "Status dot rendered before the label using the variant color.", defaultValue: "false" },
      { name: "borderless", type: "boolean", description: "Removes the border for a softer filled-only appearance.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Variants",
        description: "Six semantic colour variants.",
        previewKey: "chip-variants",
        code: `<Chip variant="neutral">Neutral</Chip>
<Chip variant="accent">Accent</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="danger">Danger</Chip>
<Chip variant="info">Info</Chip>`,
      },
      {
        title: "Dismissible & clickable",
        description: "Removable chips with onDismiss and selectable chips with onClick.",
        previewKey: "chip-interactive",
        code: `{chips.map((c) => (
  <Chip key={c} onDismiss={() => setChips(prev => prev.filter(x => x !== c))}>{c}</Chip>
))}

{options.map((c) => (
  <Chip key={c} variant={selected === c ? "accent" : "neutral"} onClick={() => setSelected(c)}>{c}</Chip>
))}`,
      },
      {
        title: "Swatch, dot, leftIcon & borderless",
        description: "Decorative options for color-coded categories, status indicators, and flags.",
        previewKey: "chip-decorated",
        code: `<Chip swatch="#3b82f6">Design</Chip>
<Chip swatch="#22c55e">Engineering</Chip>
<Chip dot variant="success">Online</Chip>
<Chip dot variant="danger">Offline</Chip>
<Chip leftIcon="🇺🇸">United States</Chip>
<Chip borderless variant="accent">Borderless</Chip>`,
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

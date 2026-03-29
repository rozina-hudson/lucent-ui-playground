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
  category: "Atoms" | "Molecules" | "Recipes";
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
      "splitbutton", "buttongroup",
      "stack", "row", "progress",
    ],
  },
  {
    label: "Molecules",
    slugs: [
      "alert", "card", "emptystate", "tooltip",
      "tabs", "collapsible", "commandpalette", "datatable",
      "fileupload", "pagelayout", "timeline", "menu", "toast", "navmenu",
      "filtersearch", "filterselect", "filtermultiselect", "filterdaterange",
    ],
  },
  {
    label: "Recipes",
    slugs: [
      "profilecard", "settingspanel", "statsrow",
      "actionbar", "formlayout", "emptystatecard",
      "collapsiblecard", "searchfilterbar",
    ],
  },
];

// ─── Sidebar: Atom sub-groups for nested nav ─────────────────────────────────

export const ATOM_SUBGROUPS: { label: string; slugs: string[] }[] = [
  { label: "Buttons", slugs: ["button", "splitbutton", "buttongroup"] },
  { label: "Text Fields", slugs: ["input", "textarea", "searchinput"] },
  { label: "Selectors", slugs: ["select", "multiselect", "datepicker", "daterangepicker", "colorpicker", "slider"] },
  { label: "Controls", slugs: ["checkbox", "radio", "toggle", "segmentedcontrol"] },
  { label: "Display", slugs: ["text", "icon", "chip", "avatar", "colorswatch", "codeblock", "table"] },
  { label: "Feedback", slugs: ["spinner", "skeleton", "progress"] },
  { label: "Layout", slugs: ["stack", "row", "divider", "formfield", "breadcrumb", "navlink"] },
];

// ─── Sidebar: Recipe sub-groups for nested nav ──────────────────────────────

export const MOLECULE_SUBGROUPS: { label: string; slugs: string[] }[] = [
  { label: "Filters", slugs: ["filtersearch", "filterselect", "filtermultiselect", "filterdaterange"] },
];

export const RECIPE_SUBGROUPS: { label: string; slugs: string[] }[] = [
  { label: "Cards", slugs: ["profilecard", "statsrow", "emptystatecard", "collapsiblecard"] },
  { label: "Layouts", slugs: ["settingspanel", "actionbar", "formlayout"] },
  { label: "Toolbars", slugs: ["searchfilterbar"] },
];

// ─── Registry ─────────────────────────────────────────────────────────────────

export const componentRegistry: ComponentDef[] = [
  // ── Button ──────────────────────────────────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    category: "Atoms",
    description:
      "Trigger actions and navigation. Supports seven semantic variants (primary, secondary, outline, ghost, danger, danger-outline, danger-ghost), five sizes (2xs–lg), hover lift + glow animation, loading and disabled states, a trailing chevron for dropdown triggers, full-width layout, icon-only auto-sizing (renders as square when no children), transparent outline backgrounds, color-mix(transparent) neutral fills for disabled states, and a single translucent accent halo press ring.",
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
      { name: "variant", type: `"primary" | "secondary" | "outline" | "ghost" | "danger" | "danger-outline" | "danger-ghost"`, description: "Visual style of the button. secondary is a filled surface button; outline is a bordered button. danger-outline is a red-bordered variant for destructive actions needing visual weight; danger-ghost is red text on transparent background for low-emphasis destructive actions.", defaultValue: `"primary"` },
      { name: "size", type: `"2xs" | "xs" | "sm" | "md" | "lg"`, description: "Height and horizontal padding scale. 2xs (22px) for dashboard toolbars and table-inline actions; xs (26px) for compact toolbars.", defaultValue: `"md"` },
      { name: "loading", type: "boolean", description: "Replaces the label with a spinner and disables interaction.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Prevents interaction and mutes the appearance.", defaultValue: "false" },
      { name: "chevron", type: "boolean", description: "Appends a down-chevron icon for dropdown trigger patterns.", defaultValue: "false" },
      { name: "fullWidth", type: "boolean", description: "Stretches the button to fill its container.", defaultValue: "false" },
      { name: "leftIcon", type: "ReactNode", description: "Icon displayed before the label." },
      { name: "rightIcon", type: "ReactNode", description: "Icon displayed after the label." },
      { name: "spread", type: "boolean", description: "Spaces content to the edges (space-between). Useful with fullWidth + rightIcon/chevron.", defaultValue: "false" },
      { name: "children", type: "React.ReactNode", description: "Button label. Omit for icon-only buttons (auto-sizes to square)." },
      { name: "onClick", type: "() => void", description: "Callback fired when the button is clicked." },
    ],
    examples: [
      {
        title: "Variants",
        description: "Seven semantic variants for different action weights, including danger compound variants.",
        previewKey: "button-variants",
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-outline">Danger outline</Button>
<Button variant="danger-ghost">Danger ghost</Button>`,
      },
      {
        title: "Sizes",
        description: "Five sizes from ultra-dense toolbars (2xs) to prominent CTAs (lg).",
        previewKey: "button-sizes",
        code: `<Button size="2xs">2XS</Button>
<Button size="xs">Extra small</Button>
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
      "Labelled checkbox with checked, indeterminate, and disabled states. Available in three sizes (sm/md/lg). The contained prop wraps the checkbox in a border-strong container — checked fills with a neutral color-mix(textPrimary 6%) background, unchecked is transparent outline only. No hover state on contained wrappers. Ideal for plan selection and feature toggles.",
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
      { name: "contained", type: "boolean", description: "Wraps the checkbox in a border-strong container. Checked fills with neutral color-mix(textPrimary 6%) background; unchecked is transparent.", defaultValue: "false" },
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
        description: "Border-strong container with neutral checked fill — great for plan selection cards.",
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
      "Radio button used inside a RadioGroup for mutually exclusive selection. Supports vertical and horizontal orientation, three sizes (sm/md/lg), a group-level disabled state, and a contained prop for border-strong card-style options with neutral checked fill and helperText.",
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
        description: "Border-strong containers with neutral checked fill for plan-style selection.",
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
      "On/off switch in three sizes with optional contained card style (border-strong, neutral checked fill) and helperText. Best used for immediate boolean settings like dark mode, notifications, or feature flags. The align prop positions the track on the left or right.",
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
      { name: "contained", type: "boolean", description: "Wraps the toggle in a border-strong container. Checked fills with neutral color-mix(textPrimary 6%) background; unchecked is transparent.", defaultValue: "false" },
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
      "Surface container with five elevation variants (ghost → combo), optional header/footer, interactive onClick/href support, status accent bars (inset box-shadow, curves with border-radius), selectable state, and hoverable prop for hover lift with neutral glow without making the card interactive. Default radius bumped to lg. Overflow visible by default (hidden only when media prop is set) so nested child shadows are never clipped. Collapsible auto-bleeds inside Card — just wrap and it works. Adapts to the active theme.",
    importStatement: "import { Card } from 'lucent-ui'",
    usageCode: `<Card
  variant="elevated"
  header={<Text weight="semibold">Card title</Text>}
  footer={<Button size="sm">Save</Button>}
>
  Card content goes here.
</Card>`,
    aiPrompts: {
      claude: `"Add an elevated Card from lucent-ui with a header, body content, and a footer with Save and Cancel buttons."`,
      cursor: `@lucent-ui Add an elevated Card with header, footer with actions, and body content.`,
      vscode: `Using lucent-ui, add a Card component with variant="elevated", header, children, and footer props.`,
      mcp: `// lucent-ui MCP
// Ask: "Add an elevated Card from lucent-ui with header and footer"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Card body content.", required: true },
      { name: "variant", type: `"ghost" | "outline" | "filled" | "elevated" | "combo"`, description: "Elevation level. ghost = transparent, no border. outline = transparent with border. filled = surfaceTint background. elevated = surface with border and shadow. combo = filled wrapper with elevated body inset.", defaultValue: `"outline"` },
      { name: "header", type: "React.ReactNode", description: "Content rendered in the card header area." },
      { name: "footer", type: "React.ReactNode", description: "Content rendered in the card footer area." },
      { name: "media", type: "React.ReactNode", description: "Full-bleed content rendered at the top of the card before the header, with no padding." },
      { name: "onClick", type: "() => void", description: "Renders the card as a <button> with hover lift, focus ring, and active press state." },
      { name: "href", type: "string", description: "Renders the card as an <a> with hover lift, focus ring, and active press state." },
      { name: "hoverable", type: "boolean", description: "Enables hover lift and neutral glow shadow without making the card a button or link. Interactive cards (onClick/href) get accent-colored glow; hoverable-only cards get a neutral glow (12% text-primary). Use when the card wraps its own interactive content.", defaultValue: "false" },
      { name: "disabled", type: "boolean", description: "Reduces opacity, blocks interaction, sets cursor: not-allowed.", defaultValue: "false" },
      { name: "status", type: `"success" | "warning" | "danger" | "info"`, description: "Adds a 3px colored bar on the left edge as an inset box-shadow that curves with the card's border-radius." },
      { name: "selected", type: "boolean", description: "Applies a unified accent-subtle background across all variants. Sets aria-pressed on interactive cards.", defaultValue: "false" },
      { name: "padding", type: `"none" | "sm" | "md" | "lg"`, description: "Inner padding. Vertical padding is tighter than horizontal.", defaultValue: `"md"` },
      { name: "shadow", type: `"none" | "sm" | "md" | "lg"`, description: "Drop shadow.", defaultValue: `"sm"` },
      { name: "radius", type: `"none" | "sm" | "md" | "lg"`, description: "Border radius.", defaultValue: `"lg"` },
      { name: "style", type: "React.CSSProperties", description: "Inline style override." },
    ],
    examples: [
      {
        title: "Elevation variants",
        description: "Five variants form a visual importance hierarchy, from ghost (invisible) to combo (inset body). Headers and footers recede into the tint on combo while the body pops.",
        previewKey: "card-variants",
        code: `<Card
  variant="ghost"
  header={<Text size="xs" weight="semibold">ghost</Text>}
  footer={<Text size="xs" color="secondary">Footer</Text>}
>
  <Text size="xs" color="secondary">Body content</Text>
</Card>

<Card
  variant="combo"
  header={<Text size="xs" weight="semibold">combo</Text>}
  footer={<Text size="xs" color="secondary">Footer</Text>}
>
  <Text size="xs" color="secondary">Body content</Text>
</Card>`,
      },
      {
        title: "Header + footer",
        description: "Full card with title and action footer.",
        previewKey: "card-header-footer",
        code: `<Card
  variant="elevated"
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
        title: "Interactive card",
        description: "onClick renders as a button with hover lift and active press. href renders as a link.",
        previewKey: "card-interactive",
        code: `<Card variant="elevated" onClick={() => alert("Clicked!")}>
  <Text weight="semibold" size="sm">Click me</Text>
  <Text size="xs" color="secondary">
    I have hover lift and active press.
  </Text>
</Card>`,
      },
      {
        title: "Status accent",
        description: "A colored bar on the left edge signals status context.",
        previewKey: "card-status",
        code: `<Card status="success"><Text size="xs">Success</Text></Card>
<Card status="warning"><Text size="xs">Warning</Text></Card>
<Card status="danger"><Text size="xs">Danger</Text></Card>
<Card status="info"><Text size="xs">Info</Text></Card>`,
      },
      {
        title: "Media & selected",
        description: "media renders full-bleed content at the top. selected applies a unified accent-subtle background for toggle behavior.",
        previewKey: "card-selected-media",
        code: `{/* Full-bleed image */}
<Card
  media={
    <img src="hero.jpg" alt="Hero"
      style={{ width: "100%", height: 120, objectFit: "cover" }} />
  }
>
  <Text weight="semibold" size="sm">Media card</Text>
</Card>

{/* Selected toggle card */}
<Card selected onClick={() => toggle()}>
  <Text weight="semibold" size="sm">Selected card</Text>
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
      {
        title: "Hoverable",
        description: "Hover lift and neutral glow without making the card interactive. Use when the card wraps its own clickable content like a Collapsible.",
        previewKey: "card-hoverable",
        code: `<Card hoverable variant="elevated">
  <Text weight="semibold" size="sm">Hoverable card</Text>
  <Text size="xs" color="secondary">
    Lift and glow on hover, but not a button or link.
  </Text>
</Card>

<Card hoverable variant="filled">
  <Text weight="semibold" size="sm">Filled hoverable</Text>
  <Text size="xs" color="secondary">
    Neutral glow (12% text-primary).
  </Text>
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
      "Styled navigation anchor with active, disabled, icon, and inverse states. The inverse prop uses a surface background with textPrimary for sidebar links on tinted chrome. Renders as an <a> by default but accepts a custom `as` prop for framework routers.",
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
      { name: "inverse", type: "boolean", description: "Uses surface background with textPrimary instead of accent for the active state. Active inverse links show border-default border, shadow-md elevation, and a 3px accent right border indicator. Ideal for sidebar navigation on tinted chrome.", defaultValue: "false" },
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
      {
        title: "Inverse sidebar",
        description: "Inverse links for sidebar navigation on tinted chrome backgrounds.",
        previewKey: "navlink-inverse",
        code: `<div style={{ display: "flex", flexDirection: "column", gap: 4, width: 200 }}>
  <NavLink href="#" isActive inverse>Dashboard</NavLink>
  <NavLink href="#" inverse>Components</NavLink>
  <NavLink href="#" inverse>Settings</NavLink>
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
      "Controlled date input that opens a calendar popover. Supports label, helperText, errorText, three sizes, min/max constraints, and border-box sizing matching Input/Select.",
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
      { name: "label", type: "string", description: "Label displayed above the picker." },
      { name: "helperText", type: "string", description: "Hint or description below the picker." },
      { name: "errorText", type: "string", description: "Error message — triggers the error visual state with aria-invalid." },
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
        title: "With label & helper text",
        description: "Label, helperText, and errorText props matching Input's pattern.",
        previewKey: "datepicker-labeled",
        code: `<DatePicker
  label="Start date"
  helperText="When should the project begin?"
  placeholder="Pick a date"
/>

<DatePicker
  label="Deadline"
  errorText="A deadline is required"
  placeholder="Pick a date"
/>`,
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
      "Selects a start and end date from a calendar popover. Supports label, helperText, errorText, three sizes, and real-time range highlighting on hover. Returns a DateRange object with start/end Date values. Border-box sizing matches Input/Select.",
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
      { name: "label", type: "string", description: "Label displayed above the picker." },
      { name: "helperText", type: "string", description: "Hint or description below the picker." },
      { name: "errorText", type: "string", description: "Error message — triggers the error visual state with aria-invalid." },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Height and font size — matches Input sizing.", defaultValue: `"md"` },
      { name: "disabled", type: "boolean", description: "Disables the input.", defaultValue: "false" },
      { name: "trigger", type: "React.ReactNode", description: "Custom trigger element replacing the default input-style button. Use with a Button for compact toolbar layouts." },
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
        title: "With label & helper text",
        description: "Label, helperText, and errorText props matching Input's pattern.",
        previewKey: "daterangepicker-labeled",
        code: `<DateRangePicker
  label="Trip dates"
  helperText="Select your check-in and check-out dates"
  placeholder="Select date range"
/>

<DateRangePicker
  label="Booking period"
  errorText="Please select a valid date range"
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
      {
        title: "Custom trigger",
        description: "Replace the default input with a compact Button trigger — ideal for filter bars and toolbars.",
        previewKey: "daterangepicker-trigger",
        code: `<DateRangePicker
  trigger={<Button variant="secondary" size="sm">Date range</Button>}
/>`,
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

  // ── FilterSearch ─────────────────────────────────────────────────────────────
  {
    slug: "filtersearch",
    name: "FilterSearch",
    category: "Molecules",
    description:
      "Collapsible search button that expands to a text input on click and collapses back when blurred empty. Designed for filter bars and toolbars where space is tight.",
    importStatement: "import { FilterSearch } from 'lucent-ui'",
    usageCode: `const [query, setQuery] = useState("");

<FilterSearch value={query} onChange={setQuery} placeholder="Search..." />`,
    aiPrompts: {
      claude: `"Add a FilterSearch from lucent-ui for a toolbar. It shows as an icon button and expands to a search input on click."`,
      cursor: `@lucent-ui Add a FilterSearch with controlled value and onChange for a compact toolbar search.`,
      vscode: `Using lucent-ui, add a FilterSearch that expands from an icon button to a text input.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FilterSearch from lucent-ui to a filter bar"`,
    },
    props: [
      { name: "value", type: "string", description: "Controlled search value." },
      { name: "defaultValue", type: "string", description: "Initial value for uncontrolled usage." },
      { name: "onChange", type: "(value: string) => void", description: "Called with the current search string." },
      { name: "placeholder", type: "string", description: "Input placeholder text.", defaultValue: '"Search…"' },
      { name: "variant", type: `"secondary" | "outline"`, description: "Button style when collapsed.", defaultValue: `"secondary"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Button and input size.", defaultValue: `"md"` },
      { name: "width", type: "number", description: "Width of the expanded input in pixels.", defaultValue: "260" },
      { name: "disabled", type: "boolean", description: "Disables the button.", defaultValue: "false" },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Default",
        description: "Click the search icon to expand, blur empty to collapse.",
        previewKey: "filtersearch-default",
        code: `<FilterSearch placeholder="Search items..." />`,
      },
      {
        title: "Sizes",
        description: "Three sizes matching the filter family.",
        previewKey: "filtersearch-sizes",
        code: `<FilterSearch size="sm" placeholder="Small" />
<FilterSearch size="md" placeholder="Medium" />
<FilterSearch size="lg" placeholder="Large" />`,
      },
    ],
  },

  // ── FilterSelect ────────────────────────────────────────────────────────────
  {
    slug: "filterselect",
    name: "FilterSelect",
    category: "Molecules",
    description:
      "Single-select filter button that opens a Menu popover. The trigger shows the selected label or falls back to the label prop. Outline variant auto-switches to secondary when a value is selected.",
    importStatement: "import { FilterSelect } from 'lucent-ui'",
    usageCode: `<FilterSelect
  label="Availability"
  options={[
    { value: "in-stock", label: "In stock" },
    { value: "out-of-stock", label: "Out of stock" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a FilterSelect from lucent-ui for a single-select filter in a toolbar. It opens a Menu popover with selectable options."`,
      cursor: `@lucent-ui Add a FilterSelect with label and options for a toolbar single-select filter.`,
      vscode: `Using lucent-ui, add a FilterSelect with label and options for a filter bar.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FilterSelect from lucent-ui to a filter toolbar"`,
    },
    props: [
      { name: "label", type: "string", description: "Label shown on the trigger when no value is selected.", required: true },
      { name: "options", type: "FilterSelectOption[]", description: "Array of { value, label, disabled? } options.", required: true },
      { name: "value", type: "string", description: "Controlled selected value." },
      { name: "defaultValue", type: "string", description: "Initial value for uncontrolled usage." },
      { name: "onChange", type: "(value: string | undefined) => void", description: "Called with the selected value, or undefined when cleared." },
      { name: "variant", type: `"secondary" | "outline"`, description: "Trigger style. Outline auto-switches to secondary when a value is selected.", defaultValue: `"secondary"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Trigger and dropdown size.", defaultValue: `"md"` },
      { name: "icon", type: "React.ReactNode", description: "Icon rendered before the label in the trigger." },
      { name: "disabled", type: "boolean", description: "Disables the trigger.", defaultValue: "false" },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Default",
        description: "Single-select filter with label fallback.",
        previewKey: "filterselect-default",
        code: `<FilterSelect
  label="Availability"
  options={[
    { value: "in-stock", label: "In stock" },
    { value: "out-of-stock", label: "Out of stock" },
  ]}
/>`,
      },
      {
        title: "Sizes",
        description: "Three sizes matching the filter family.",
        previewKey: "filterselect-sizes",
        code: `<FilterSelect size="sm" label="Small" options={opts} />
<FilterSelect size="md" label="Medium" options={opts} />
<FilterSelect size="lg" label="Large" options={opts} />`,
      },
    ],
  },

  // ── FilterMultiSelect ───────────────────────────────────────────────────────
  {
    slug: "filtermultiselect",
    name: "FilterMultiSelect",
    category: "Molecules",
    description:
      "Filter-oriented multi-select with button-style trigger and popover dropdown. Supports xs–lg sizes, ghost variant, and label-less compact mode (no chevron). Ideal for toolbar and filter bar layouts.",
    importStatement: "import { FilterMultiSelect } from 'lucent-ui'",
    usageCode: `const [values, setValues] = useState<string[]>([]);

<FilterMultiSelect
  label="Status"
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ]}
  value={values}
  onChange={setValues}
/>`,
    aiPrompts: {
      claude: `"Add a FilterMultiSelect from lucent-ui for a toolbar filter. Use the ghost variant and xs size for compact layouts."`,
      cursor: `@lucent-ui Add a FilterMultiSelect with label, options, ghost variant, and xs size for a filter bar.`,
      vscode: `Using lucent-ui, add a FilterMultiSelect for a toolbar with ghost variant and compact xs size.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FilterMultiSelect from lucent-ui to a filter toolbar"`,
    },
    props: [
      { name: "options", type: "FilterMultiSelectOption[]", description: "Array of { value, label, disabled? } options.", required: true },
      { name: "value", type: "string[]", description: "Controlled array of selected values." },
      { name: "defaultValue", type: "string[]", description: "Uncontrolled initial selection.", defaultValue: "[]" },
      { name: "onChange", type: "(values: string[]) => void", description: "Called with updated selection array." },
      { name: "label", type: "string", description: "Label shown on the trigger button.", required: true },
      { name: "size", type: `"xs" | "sm" | "md" | "lg"`, description: "Trigger and dropdown density. xs is new for compact toolbar usage.", defaultValue: `"md"` },
      { name: "variant", type: `"secondary" | "outline" | "ghost"`, description: "Trigger button style. Outline switches to secondary when items are selected. Ghost blends into toolbars.", defaultValue: `"secondary"` },
      { name: "icon", type: "React.ReactNode", description: "Icon rendered before the label in the trigger button." },
      { name: "disabled", type: "boolean", description: "Disables the trigger.", defaultValue: "false" },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Sizes",
        description: "Four sizes including the new xs for compact toolbars.",
        previewKey: "filtermultiselect-sizes",
        code: `<FilterMultiSelect size="xs" label="XS" options={opts} />
<FilterMultiSelect size="sm" label="Small" options={opts} />
<FilterMultiSelect size="md" label="Medium" options={opts} />
<FilterMultiSelect size="lg" label="Large" options={opts} />`,
      },
      {
        title: "Ghost variant",
        description: "Ghost trigger style for seamless toolbar integration.",
        previewKey: "filtermultiselect-ghost",
        code: `<FilterMultiSelect
  variant="ghost"
  label="Status"
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]}
/>`,
      },
      {
        title: "Compact xs",
        description: "The xs size is ideal for dense toolbars and filter bars.",
        previewKey: "filtermultiselect-compact",
        code: `<FilterMultiSelect
  size="xs"
  label="Filter"
  options={[
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ]}
/>`,
      },
    ],
  },

  // ── FilterDateRange ─────────────────────────────────────────────────────────
  {
    slug: "filterdaterange",
    name: "FilterDateRange",
    category: "Molecules",
    description:
      "Date range filter button that opens a calendar popover. Shows the selected range on the trigger label. Outline variant auto-switches to secondary when a range is selected.",
    importStatement: "import { FilterDateRange } from 'lucent-ui'",
    usageCode: `<FilterDateRange label="Date range" />`,
    aiPrompts: {
      claude: `"Add a FilterDateRange from lucent-ui for a date filter in a toolbar. It opens a calendar popover and shows the selected range on the button."`,
      cursor: `@lucent-ui Add a FilterDateRange with label for a toolbar date filter.`,
      vscode: `Using lucent-ui, add a FilterDateRange for a filter bar date range picker.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a FilterDateRange from lucent-ui to a filter toolbar"`,
    },
    props: [
      { name: "label", type: "string", description: "Label shown on the trigger when no range is selected." },
      { name: "value", type: "DateRange", description: "Controlled range with { start: Date; end: Date }." },
      { name: "defaultValue", type: "DateRange", description: "Initial range for uncontrolled usage." },
      { name: "onChange", type: "(range: DateRange) => void", description: "Called with the selected range." },
      { name: "variant", type: `"secondary" | "outline"`, description: "Trigger style. Outline auto-switches to secondary when a range is selected.", defaultValue: `"secondary"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Trigger and calendar size.", defaultValue: `"md"` },
      { name: "min", type: "Date", description: "Minimum selectable date." },
      { name: "max", type: "Date", description: "Maximum selectable date." },
      { name: "disabled", type: "boolean", description: "Disables the trigger.", defaultValue: "false" },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the wrapper." },
    ],
    examples: [
      {
        title: "Default",
        description: "Button trigger that opens a calendar popover for range selection.",
        previewKey: "filterdaterange-default",
        code: `<FilterDateRange label="Date range" />`,
      },
      {
        title: "Sizes",
        description: "Three sizes matching the filter family.",
        previewKey: "filterdaterange-sizes",
        code: `<FilterDateRange size="sm" label="Small" />
<FilterDateRange size="md" label="Medium" />
<FilterDateRange size="lg" label="Large" />`,
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
      { name: "tabs", type: "TabItem[]", description: "Array of { value, label, content?, disabled? } tab definitions. When no tab has content, panel rendering is skipped (header-only / controlled mode).", required: true },
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
      "Expandable/collapsible content section with a trigger. Smooth height animation via direct DOM measurement (180ms), CSS-driven hover feedback with translucent tint, focus-visible ring, disabled state, and padded prop to control content spacing. Auto-bleeds inside Card by consuming CardPaddingContext — just wrap in a Card and it works. Dynamic overflow (hidden during animation, visible when resting) so nested shadows aren't clipped. Supports controlled and uncontrolled open state.",
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
      { name: "disabled", type: "boolean", description: "Reduces trigger opacity to 0.5, sets cursor: not-allowed, and prevents toggling.", defaultValue: "false" },
      { name: "padded", type: "boolean", description: "When false, removes built-in content padding so children (e.g. a nested Card) can provide their own spacing.", defaultValue: "true" },
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
      {
        title: "Disabled",
        description: "Prevents toggling with reduced opacity and not-allowed cursor.",
        previewKey: "collapsible-disabled",
        code: `<Collapsible trigger="Locked section" disabled>
  <Text color="secondary">This content cannot be revealed.</Text>
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
      "Full-page shell with a fixed header, collapsible left sidebar, optional right sidebar, and scrollable main content area. Chrome regions can use a distinct background via chromeBackground for visual separation from the main content. Hidden scrollbars on all scrollable regions.",
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
      { name: "chromeBackground", type: `"bgBase" | "bgSubtle" | "surface" | "surfaceSecondary"`, description: "Background token for chrome regions (header, sidebar, footer). Use \"bgSubtle\", \"surface\", or \"surfaceSecondary\" to visually distinguish chrome from the main content area." },
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
      {
        title: "Chrome theming",
        description: "surfaceSecondary chrome background distinguishes header and sidebar from the main content.",
        previewKey: "pagelayout-chrome",
        code: `<PageLayout
  header={<Text weight="semibold">My App</Text>}
  sidebar={
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
      <NavLink href="#" isActive inverse>Dashboard</NavLink>
      <NavLink href="#" inverse>Settings</NavLink>
    </div>
  }
  chromeBackground="surfaceSecondary"
  sidebarWidth={200}
  style={{ height: 400 }}
>
  <Text>Content on bgBase canvas with surfaceSecondary chrome</Text>
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
      "Modern activity-feed timeline with compact filled dots, inline title + date layout, and optional rich content slots. Ideal for activity feeds, changelogs, and progress trackers.",
    importStatement: "import { Timeline } from 'lucent-ui'",
    usageCode: `<Timeline
  items={[
    { id: "1", title: "Order placed", date: "Mar 1", status: "success" },
    { id: "2", title: "Processing", date: "Mar 2", status: "info" },
    { id: "3", title: "Shipped", date: "Mar 3", status: "default" },
  ]}
/>`,
    aiPrompts: {
      claude: `"Add a Timeline from lucent-ui showing an activity feed. Use filled-dot status indicators (success, info, warning, danger), inline dates, and optional content slots for rich nested blocks."`,
      cursor: `@lucent-ui Add a Timeline with items array containing id, title, date, status, and optional content slot for rich blocks.`,
      vscode: `Using lucent-ui, add a Timeline component with filled-dot status indicators, inline dates, and content prop for embedding Cards or other blocks.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Timeline activity feed from lucent-ui with content slots"`,
    },
    props: [
      { name: "items", type: "TimelineItem[]", description: "Array of { id, title, description?, date?, status?, icon?, content? } items. content accepts ReactNode for rich nested blocks.", required: true },
      { name: "style", type: "React.CSSProperties", description: "Inline styles for the timeline wrapper." },
    ],
    examples: [
      {
        title: "Status variants",
        description: "Filled-dot indicators for each status — success, info, warning, danger, and default (small white inner dot on muted fill).",
        previewKey: "timeline-statuses",
        code: `<Timeline
  items={[
    { id: "1", title: "Deployed to production", date: "Mar 1", status: "success" },
    { id: "2", title: "Build running", date: "Mar 1", status: "info" },
    { id: "3", title: "Tests warning", date: "Feb 28", status: "warning" },
    { id: "4", title: "Deploy failed", date: "Feb 27", status: "danger" },
    { id: "5", title: "Commit pushed", date: "Feb 26" },
  ]}
/>`,
      },
      {
        title: "With descriptions",
        description: "Each item has a title, inline date, and longer description.",
        previewKey: "timeline-descriptions",
        code: `<Timeline
  items={[
    { id: "1", title: "Account created", description: "Welcome to the platform!", date: "Jan 10", status: "success" },
    { id: "2", title: "Profile updated", description: "Added avatar and bio.", date: "Jan 12" },
    { id: "3", title: "First project", description: "Created project 'Lucent UI'.", date: "Jan 15", status: "info" },
  ]}
/>`,
      },
      {
        title: "Rich content slots",
        description: "Use the content prop to embed Cards or other rich blocks below each timeline item.",
        previewKey: "timeline-content",
        code: `<Timeline
  items={[
    {
      id: "1",
      title: "v2.0 released",
      date: "Mar 15",
      status: "success",
      content: (
        <Card variant="outline">
          <Text size="sm" weight="medium">Release highlights</Text>
          <Text size="xs" color="secondary">New dashboard, improved performance, and dark mode support.</Text>
        </Card>
      ),
    },
    {
      id: "2",
      title: "Design review",
      date: "Mar 12",
      status: "info",
      content: (
        <Card variant="outline">
          <Text size="xs" color="secondary">Approved new component library with updated token system.</Text>
        </Card>
      ),
    },
    { id: "3", title: "Sprint started", date: "Mar 10" },
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
      "Fully-featured color selection component. Opens a portaled popover (zIndex 999999) with a spectrum panel, hue and alpha sliders, four input formats (Hex, RGB, HSL, HSB), eyedropper support, and multi-group preset palettes. Supports compact size and inline label placement.",
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
      { name: "size", type: `"sm" | "md"`, description: "Trigger swatch size. sm renders a compact 24px swatch.", defaultValue: `"md"` },
      { name: "inline", type: "boolean", description: "Places the label beside the swatch instead of above it.", defaultValue: "false" },
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
      {
        title: "Compact inline",
        description: "Small trigger with inline label — ideal for settings panels and customizers.",
        previewKey: "colorpicker-compact",
        code: `const [color, setColor] = useState("#8b5cf6");

<ColorPicker
  value={color}
  onChange={setColor}
  label="Accent"
  size="sm"
  inline
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
      "Pill-style toggle group with an elevation-aware sliding indicator. Uses getBoundingClientRect with ResizeObserver for pixel-perfect positioning. Zero-padding track with 3px inset indicator. Focus ring only on keyboard navigation (:focus-visible).",
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
      "Status-first label primitive. Supports dismissible, clickable, and selectable modes with swatch, dot, leftIcon, borderless, ghost, and pulse options. Dot-only mode (omit children with dot) renders a compact circular indicator. Available in three sizes and six semantic variants. Heights scale with spacing tokens.",
    importStatement: "import { Chip } from 'lucent-ui'",
    usageCode: `<Chip variant="accent" onDismiss={() => remove(id)}>
  TypeScript
</Chip>`,
    aiPrompts: {
      claude: `"Add a list of Chip components from lucent-ui for filter tags. Support dismiss and click-to-select. Use ghost chips for inline table statuses and dot-only with pulse for live indicators."`,
      cursor: `@lucent-ui Add Chips with onDismiss for removable tags, ghost for inline statuses, and dot pulse for live indicators.`,
      vscode: `Using lucent-ui, add Chip components with variant, ghost, dot, pulse props for status indicators and a category filter bar.`,
      mcp: `// lucent-ui MCP
// Ask: "Add Chip components from lucent-ui with ghost mode for table statuses and pulsing dots for live states"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Chip label. Optional — omit with dot to render a dot-only indicator." },
      { name: "variant", type: `"neutral" | "accent" | "success" | "warning" | "danger" | "info"`, description: "Semantic colour variant. The accent variant uses a solid accent background with hue-tinted accentFg foreground color.", defaultValue: `"neutral"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Chip size. Heights scale with spacing tokens.", defaultValue: `"md"` },
      { name: "onDismiss", type: "() => void", description: "If provided, renders a dismiss (×) button for removable chips." },
      { name: "onClick", type: "() => void", description: "Makes the chip clickable — renders as a button element." },
      { name: "leftIcon", type: "React.ReactNode", description: "Icon or element rendered before the label (emoji, flags, avatars)." },
      { name: "swatch", type: "string", description: "Hex color rendered as a small dot before the label for color-coded categories." },
      { name: "dot", type: "boolean", description: "Status dot rendered before the label using the variant color. When used without children, renders a compact circular dot-only indicator.", defaultValue: "false" },
      { name: "pulse", type: "boolean", description: "Pulsing ring animation on the status dot for live/in-progress states (deploying, syncing, live incident). Only applies when dot is true. Uses injected @keyframes lucent-chip-pulse.", defaultValue: "false" },
      { name: "ghost", type: "boolean", description: "Transparent background with text color only, no border. Subtle 8% tint on hover when interactive. Ideal for inline status indicators in tables and lists.", defaultValue: "false" },
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
      {
        title: "Ghost, pulse & dot-only",
        description: "Ghost mode for inline table statuses, pulse for live indicators, and dot-only mode for compact signals.",
        previewKey: "chip-status",
        code: `{/* Ghost — inline status indicators */}
<Chip ghost variant="success" dot>Deployed</Chip>
<Chip ghost variant="warning" dot>Syncing</Chip>
<Chip ghost variant="danger" dot>Failed</Chip>

{/* Pulse — live/in-progress states */}
<Chip variant="success" dot pulse>Live</Chip>
<Chip variant="warning" dot pulse>Deploying</Chip>
<Chip variant="danger" dot pulse>Incident</Chip>

{/* Dot-only — compact circular indicators */}
<Chip variant="success" dot />
<Chip variant="warning" dot pulse />
<Chip variant="danger" dot />`,
      },
    ],
  },

  // ── Menu ───────────────────────────────────────────────────────────────────
  {
    slug: "menu",
    name: "Menu",
    category: "Molecules",
    description:
      "Compound-component dropdown menu with portal rendering, 8-direction placement with auto-flip, full WAI-ARIA keyboard navigation, and scale + fade animations. Supports selected, danger, disabled items, shortcut hints, and grouped sections.",
    importStatement: "import { Menu, MenuItem, MenuSeparator, MenuGroup } from 'lucent-ui'",
    usageCode: `<Menu trigger={<Button>Actions</Button>}>
  <MenuItem onSelect={() => handleEdit()}>Edit</MenuItem>
  <MenuItem onSelect={() => handleDuplicate()}>Duplicate</MenuItem>
  <MenuSeparator />
  <MenuItem onSelect={() => handleDelete()} danger>Delete</MenuItem>
</Menu>`,
    aiPrompts: {
      claude: `"Add a Menu from lucent-ui triggered by a Button. Include items for Edit, Duplicate, and a danger Delete item separated by a MenuSeparator."`,
      cursor: `@lucent-ui Add a dropdown Menu with MenuItem children, a MenuSeparator, and a danger item for delete.`,
      vscode: `Using lucent-ui, add a Menu component with compound children (MenuItem, MenuSeparator, MenuGroup) triggered by a Button.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a Menu from lucent-ui with edit, duplicate, and delete items"`,
    },
    props: [
      { name: "trigger", type: "React.ReactNode", description: "The element that opens the menu on click.", required: true },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Size variant — flows through context to all items. Font sizes aligned with Button.", defaultValue: `"md"` },
      { name: "placement", type: `"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "right"`, description: "Preferred placement of the popover. Automatically flips at viewport edges.", defaultValue: `"bottom-start"` },
      { name: "open", type: "boolean", description: "Controlled open state." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
      { name: "children", type: "React.ReactNode", description: "MenuItem, MenuSeparator, and MenuGroup children.", required: true },
    ],
    examples: [
      {
        title: "Basic menu",
        description: "Simple dropdown with items, separator, and a danger action.",
        previewKey: "menu-basic",
        code: `<Menu trigger={<Button variant="outline">Actions</Button>}>
  <MenuItem onSelect={() => {}}>Edit</MenuItem>
  <MenuItem onSelect={() => {}}>Duplicate</MenuItem>
  <MenuSeparator />
  <MenuItem onSelect={() => {}} danger>Delete</MenuItem>
</Menu>`,
      },
      {
        title: "Selected & shortcuts",
        description: "Items with selected state and keyboard shortcut hints.",
        previewKey: "menu-selected",
        code: `<Menu trigger={<Button variant="outline">View</Button>}>
  <MenuItem onSelect={() => {}} selected>Grid view</MenuItem>
  <MenuItem onSelect={() => {}}>List view</MenuItem>
  <MenuSeparator />
  <MenuItem onSelect={() => {}} shortcut="⌘E">Edit layout</MenuItem>
  <MenuItem onSelect={() => {}} shortcut="⌘D" disabled>Duplicate</MenuItem>
</Menu>`,
      },
      {
        title: "Grouped with sizes",
        description: "MenuGroup sections with labels, shown in small size.",
        previewKey: "menu-grouped",
        code: `<Menu trigger={<Button variant="outline" size="sm">Options</Button>} size="sm">
  <MenuGroup label="Navigate">
    <MenuItem onSelect={() => {}}>Dashboard</MenuItem>
    <MenuItem onSelect={() => {}}>Settings</MenuItem>
  </MenuGroup>
  <MenuGroup label="Account">
    <MenuItem onSelect={() => {}}>Profile</MenuItem>
    <MenuItem onSelect={() => {}} danger>Sign out</MenuItem>
  </MenuGroup>
</Menu>`,
      },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    customizerName: "ToastProvider",
    category: "Molecules",
    description:
      "Imperative toast notifications via ToastProvider + useToast hook. Five semantic variants with built-in icons, action buttons, cascading card stack with hover-to-expand, six screen positions, enter/exit animations, and configurable auto-dismiss.",
    importStatement: "import { ToastProvider, useToast } from 'lucent-ui'",
    usageCode: `// Wrap your app once
<ToastProvider>
  <App />
</ToastProvider>

// Then call from anywhere
const { toast, dismiss } = useToast();
toast({ title: "Saved", variant: "success" });`,
    aiPrompts: {
      claude: `"Add a ToastProvider from lucent-ui at the app root, then use the useToast hook to show a success toast on form submit."`,
      cursor: `@lucent-ui Add ToastProvider and use the useToast hook to show a toast notification with an undo action button.`,
      vscode: `Using lucent-ui, wrap the app with ToastProvider and call useToast().toast() to show an imperative notification with variant and action.`,
      mcp: `// lucent-ui MCP
/ Ask: "Add toast notifications from lucent-ui with success and danger variants"`,
    },
    props: [
      { name: "position", type: `"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`, description: "Screen position for the toast stack.", defaultValue: `"bottom-right"` },
      { name: "duration", type: "number", description: "Default auto-dismiss duration in ms. Pass Infinity to disable.", defaultValue: "5000" },
      { name: "portalContainer", type: "HTMLElement", description: "Custom portal target. Defaults to document.body." },
      { name: "toast()", type: "(options: ToastOptions) => string", description: "Show a toast. Returns a dismissible id. Options: title, description, variant, action ({ label, onClick }), duration." },
      { name: "dismiss()", type: "(id: string) => void", description: "Programmatically dismiss a toast by id." },
    ],
    examples: [
      {
        title: "Basic toast",
        description: "Simple notification with title and description.",
        previewKey: "toast-basic",
        code: `const { toast } = useToast();

<Button onClick={() => toast({
  title: "Changes saved",
  description: "Your profile has been updated successfully."
})}>
  Show toast
</Button>`,
      },
      {
        title: "Variants",
        description: "Default, success, warning, danger, and info variants with semantic icons.",
        previewKey: "toast-variants",
        code: `const { toast } = useToast();

<Button onClick={() => toast({ title: "Success", variant: "success" })}>Success</Button>
<Button onClick={() => toast({ title: "Warning", variant: "warning" })}>Warning</Button>
<Button onClick={() => toast({ title: "Danger", variant: "danger" })}>Danger</Button>
<Button onClick={() => toast({ title: "Info", variant: "info" })}>Info</Button>`,
      },
      {
        title: "With action",
        description: "Toast with an inline undo action button.",
        previewKey: "toast-action",
        code: `const { toast } = useToast();

<Button onClick={() => toast({
  title: "Item deleted",
  description: "The file has been moved to trash.",
  variant: "danger",
  action: { label: "Undo", onClick: () => {} },
})}>
  Delete with undo
</Button>`,
      },
    ],
  },
  // ── Stack ─────────────────────────────────────────────────────────────────
  {
    slug: "stack",
    name: "Stack",
    category: "Atoms",
    description:
      "Vertical flex layout primitive. Accepts a gap spacing token (0–24), align, justify, wrap, and a polymorphic as prop (div, section, nav, form, fieldset, ul, ol). Gap values reference spacing tokens so density presets scale layout automatically.",
    importStatement: "import { Stack } from 'lucent-ui'",
    usageCode: `<Stack gap="4">
  <Text>First</Text>
  <Text>Second</Text>
</Stack>`,
    aiPrompts: {
      claude: `"Add a Stack from lucent-ui with gap="6" to vertically space a heading, description, and action button."`,
      cursor: `@lucent-ui Use Stack with gap="4" to lay out a form with stacked fields.`,
      vscode: `Using lucent-ui, add a Stack component to vertically arrange content with consistent gap spacing.`,
      mcp: `// lucent-ui MCP
// Ask: "Use Stack from lucent-ui to create a vertical layout with gap-based spacing"`,
    },
    props: [
      { name: "gap", type: `"0" | "1" | "2" | "3" | "4" | "6" | "8" | "10" | "12" | "16" | "20" | "24"`, description: "Vertical gap between children using spacing tokens.", defaultValue: `"4"` },
      { name: "align", type: `"stretch" | "start" | "center" | "end"`, description: "Cross-axis alignment.", defaultValue: `"stretch"` },
      { name: "justify", type: `"start" | "center" | "end" | "between" | "around" | "evenly"`, description: "Main-axis distribution." },
      { name: "as", type: `"div" | "section" | "nav" | "form" | "fieldset" | "ul" | "ol"`, description: "Rendered HTML element.", defaultValue: `"div"` },
      { name: "wrap", type: "boolean", description: "Allow children to wrap.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Basic stack",
        description: "Vertical layout with default gap.",
        previewKey: "stack-basic",
        code: `<Stack gap="4">
  <Text>First item</Text>
  <Text>Second item</Text>
  <Text>Third item</Text>
</Stack>`,
      },
      {
        title: "Form layout",
        description: "Stack as a form container with wider spacing.",
        previewKey: "stack-form",
        code: `<Stack as="form" gap="6">
  <Input label="Name" />
  <Input label="Email" />
  <Button variant="primary">Submit</Button>
</Stack>`,
      },
    ],
  },
  // ── Row ──────────────────────────────────────────────────────────────────
  {
    slug: "row",
    name: "Row",
    category: "Atoms",
    description:
      "Horizontal flex layout primitive with the same API as Stack. Default gap and alignment are tuned for horizontal layouts like label/action pairs and button groups. Gap values reference spacing tokens so density presets scale automatically.",
    importStatement: "import { Row } from 'lucent-ui'",
    usageCode: `<Row gap="3">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Cancel</Button>
</Row>`,
    aiPrompts: {
      claude: `"Add a Row from lucent-ui with gap="3" to horizontally arrange action buttons."`,
      cursor: `@lucent-ui Use Row with gap="3" to lay out a horizontal button group.`,
      vscode: `Using lucent-ui, add a Row component to horizontally arrange buttons with consistent spacing.`,
      mcp: `// lucent-ui MCP
// Ask: "Use Row from lucent-ui to create a horizontal button group with gap-based spacing"`,
    },
    props: [
      { name: "gap", type: `"0" | "1" | "2" | "3" | "4" | "6" | "8" | "10" | "12" | "16" | "20" | "24"`, description: "Horizontal gap between children using spacing tokens.", defaultValue: `"3"` },
      { name: "align", type: `"stretch" | "start" | "center" | "end"`, description: "Cross-axis alignment.", defaultValue: `"center"` },
      { name: "justify", type: `"start" | "center" | "end" | "between" | "around" | "evenly"`, description: "Main-axis distribution." },
      { name: "as", type: `"div" | "section" | "nav" | "form" | "fieldset" | "ul" | "ol"`, description: "Rendered HTML element.", defaultValue: `"div"` },
      { name: "wrap", type: "boolean", description: "Allow children to wrap.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Button group",
        description: "Horizontal row of action buttons.",
        previewKey: "row-buttons",
        code: `<Row gap="3">
  <Button variant="primary">Save</Button>
  <Button variant="outline">Cancel</Button>
</Row>`,
      },
      {
        title: "Space between",
        description: "Row with items pushed to opposite ends.",
        previewKey: "row-between",
        code: `<Row justify="between">
  <Text>Settings</Text>
  <Button variant="ghost" size="sm">Edit</Button>
</Row>`,
      },
    ],
  },
  // ── Progress ─────────────────────────────────────────────────────────────
  {
    slug: "progress",
    name: "Progress",
    category: "Atoms",
    description:
      "Horizontal progress bar for completion, usage, or health metrics. Supports four semantic variants (accent, success, warning, danger), three sizes, optional labels, and threshold-based auto-variant switching via warnAt/dangerAt props. Smooth CSS transitions on value and variant changes.",
    importStatement: "import { Progress } from 'lucent-ui'",
    usageCode: `<Progress value={65} />`,
    aiPrompts: {
      claude: `"Add a Progress bar from lucent-ui with value={75} and variant="success" to show upload completion."`,
      cursor: `@lucent-ui Add a Progress bar with threshold auto-variant using warnAt and dangerAt props for a CPU usage indicator.`,
      vscode: `Using lucent-ui, add a Progress component with label={true} to show a percentage bar.`,
      mcp: `// lucent-ui MCP
// Ask: "Use Progress from lucent-ui with warnAt and dangerAt thresholds for a health metric"`,
    },
    props: [
      { name: "value", type: "number", description: "Current progress value.", required: true },
      { name: "max", type: "number", description: "Maximum value.", defaultValue: "100" },
      { name: "variant", type: `"accent" | "success" | "warning" | "danger"`, description: "Bar color variant.", defaultValue: `"accent"` },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Bar height.", defaultValue: `"md"` },
      { name: "label", type: "boolean | ReactNode", description: "Show percentage label (true) or custom content." },
      { name: "warnAt", type: "number", description: "Value threshold to auto-switch to warning variant." },
      { name: "dangerAt", type: "number", description: "Value threshold to auto-switch to danger variant." },
    ],
    examples: [
      {
        title: "Basic progress",
        description: "Simple bar with a value and label.",
        previewKey: "progress-basic",
        code: `<Progress value={65} label />`,
      },
      {
        title: "Variants",
        description: "Semantic color variants for different contexts.",
        previewKey: "progress-variants",
        code: `<Progress value={80} variant="success" label />
<Progress value={55} variant="warning" label />
<Progress value={30} variant="danger" label />`,
      },
      {
        title: "Threshold auto-variant",
        description: "Automatic color switching based on value thresholds (ascending: high is bad).",
        previewKey: "progress-threshold",
        code: `<Progress value={85} warnAt={60} dangerAt={80} label />`,
      },
    ],
  },
  // ── SplitButton ──────────────────────────────────────────────────────────────
  {
    slug: "splitbutton",
    name: "SplitButton",
    category: "Atoms",
    description:
      "Compound button pairing a primary action with a chevron dropdown for secondary actions. Each half is an independent button with its own hover lift and press ring. Composes the Menu molecule for dropdown keyboard navigation, positioning, and portal rendering. Supports all 7 variants and 5 sizes.",
    importStatement: "import { SplitButton } from 'lucent-ui'",
    usageCode: `<SplitButton
  onClick={() => handleSave()}
  menuItems={[
    { label: "Save as draft", onSelect: () => handleDraft() },
    { label: "Save & publish", onSelect: () => handlePublish() },
  ]}
>
  Save
</SplitButton>`,
    aiPrompts: {
      claude: `"Add a SplitButton from lucent-ui with a primary save action and dropdown menu items for 'Save as draft' and 'Save & publish'."`,
      cursor: `@lucent-ui Add a SplitButton with primary action and menuItems for secondary actions.`,
      vscode: `Using lucent-ui, add a SplitButton component with onClick for the main action and menuItems array for dropdown options.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a SplitButton from lucent-ui with save and publish options"`,
    },
    props: [
      { name: "variant", type: `"primary" | "secondary" | "outline" | "ghost" | "danger" | "danger-outline" | "danger-ghost"`, description: "Visual style of both button halves.", defaultValue: `"primary"` },
      { name: "size", type: `"2xs" | "xs" | "sm" | "md" | "lg"`, description: "Height and padding scale.", defaultValue: `"md"` },
      { name: "onClick", type: "() => void", description: "Callback for the primary (left) button click." },
      { name: "menuItems", type: "Array<{ label: string; onSelect: () => void; disabled?: boolean; danger?: boolean; icon?: ReactNode }>", description: "Items shown in the dropdown menu.", required: true },
      { name: "leftIcon", type: "ReactNode", description: "Icon displayed before the primary label." },
      { name: "disabled", type: "boolean", description: "Disables both halves.", defaultValue: "false" },
      { name: "loading", type: "boolean", description: "Shows spinner on primary half and disables interaction.", defaultValue: "false" },
      { name: "bordered", type: "boolean", description: "Adds visible border around the split button." },
      { name: "menuPlacement", type: `"bottom-start" | "bottom-end" | "top-start" | "top-end"`, description: "Preferred dropdown placement.", defaultValue: `"bottom-end"` },
      { name: "children", type: "React.ReactNode", description: "Primary button label.", required: true },
    ],
    examples: [
      {
        title: "Variants",
        description: "All seven variants with dropdown actions.",
        previewKey: "splitbutton-variants",
        code: `<SplitButton
  variant="primary"
  menuItems={[
    { label: "Save as draft", onSelect: () => {} },
    { label: "Save & publish", onSelect: () => {} },
  ]}
>
  Save
</SplitButton>
<SplitButton variant="outline" menuItems={[{ label: "Option A", onSelect: () => {} }]}>
  Options
</SplitButton>
<SplitButton variant="danger" menuItems={[{ label: "Force delete", onSelect: () => {} }]}>
  Delete
</SplitButton>`,
      },
      {
        title: "Sizes",
        description: "Five sizes from 2xs to lg.",
        previewKey: "splitbutton-sizes",
        code: `<SplitButton size="2xs" menuItems={[{ label: "Alt", onSelect: () => {} }]}>2XS</SplitButton>
<SplitButton size="xs" menuItems={[{ label: "Alt", onSelect: () => {} }]}>XS</SplitButton>
<SplitButton size="sm" menuItems={[{ label: "Alt", onSelect: () => {} }]}>SM</SplitButton>
<SplitButton size="md" menuItems={[{ label: "Alt", onSelect: () => {} }]}>MD</SplitButton>
<SplitButton size="lg" menuItems={[{ label: "Alt", onSelect: () => {} }]}>LG</SplitButton>`,
      },
      {
        title: "States",
        description: "Loading and disabled states.",
        previewKey: "splitbutton-states",
        code: `<SplitButton loading menuItems={[{ label: "Alt", onSelect: () => {} }]}>Saving</SplitButton>
<SplitButton disabled menuItems={[{ label: "Alt", onSelect: () => {} }]}>Disabled</SplitButton>`,
      },
    ],
  },
  // ── ButtonGroup ──────────────────────────────────────────────────────────────
  {
    slug: "buttongroup",
    name: "ButtonGroup",
    category: "Atoms",
    description:
      "Layout wrapper that visually groups Button or SplitButton children with a small token-based gap and flattened inner corner radius so the set reads as a single unit. Works with any variant combination including ghost toolbars.",
    importStatement: "import { ButtonGroup } from 'lucent-ui'",
    usageCode: `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
    aiPrompts: {
      claude: `"Add a ButtonGroup from lucent-ui wrapping three outline Buttons so they appear as a single connected unit."`,
      cursor: `@lucent-ui Add a ButtonGroup with three outline Button children for a toolbar.`,
      vscode: `Using lucent-ui, add a ButtonGroup to visually group several Button components.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a ButtonGroup from lucent-ui wrapping outline buttons for a toolbar"`,
    },
    props: [
      { name: "children", type: "React.ReactNode", description: "Button or SplitButton children to group.", required: true },
    ],
    examples: [
      {
        title: "Basic group",
        description: "Three outline buttons grouped as a visual unit.",
        previewKey: "buttongroup-basic",
        code: `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
      },
      {
        title: "Mixed variants",
        description: "Combining different variants and a SplitButton in one group.",
        previewKey: "buttongroup-mixed",
        code: `<ButtonGroup>
  <Button variant="primary">Save</Button>
  <SplitButton variant="outline" menuItems={[{ label: "Save as draft", onSelect: () => {} }]}>
    More
  </SplitButton>
</ButtonGroup>`,
      },
      {
        title: "Ghost toolbar",
        description: "Ghost variant group for a compact toolbar.",
        previewKey: "buttongroup-ghost",
        code: `<ButtonGroup>
  <Button variant="ghost" size="sm">Bold</Button>
  <Button variant="ghost" size="sm">Italic</Button>
  <Button variant="ghost" size="sm">Underline</Button>
</ButtonGroup>`,
      },
    ],
  },
  // ── NavMenu ─────────────────────────────────────────────────────────────────
  {
    slug: "navmenu",
    name: "NavMenu",
    category: "Molecules",
    description:
      "Hierarchical navigation for sidebar and top-bar layouts with a DOM-driven sliding highlight pill. Compound API with Item, Group, Sub, and Separator. Three highlight states (child active, collapsed-with-active-child, self-active parent), CSS hover with translucent tint, inverse mode with accent right-border, three sizes, and collapsible groups with height animation.",
    importStatement: "import { NavMenu } from 'lucent-ui'",
    usageCode: `<NavMenu aria-label="Main navigation">
  <NavMenu.Item href="/dashboard" isActive>Dashboard</NavMenu.Item>
  <NavMenu.Group label="Settings">
    <NavMenu.Item href="/settings/profile">Profile</NavMenu.Item>
    <NavMenu.Item href="/settings/billing">Billing</NavMenu.Item>
  </NavMenu.Group>
</NavMenu>`,
    aiPrompts: {
      claude: `"Add a NavMenu from lucent-ui with a sidebar layout. Include NavMenu.Group for collapsible sections and NavMenu.Item for navigation links. Set hasIcons for icon alignment."`,
      cursor: `@lucent-ui Add a NavMenu sidebar with Groups for sections and Items for links. Use the sliding highlight pill for active state.`,
      vscode: `Using lucent-ui, add a NavMenu component with compound children (NavMenu.Item, NavMenu.Group, NavMenu.Sub, NavMenu.Separator) for a sidebar navigation.`,
      mcp: `// lucent-ui MCP
// Ask: "Add a NavMenu from lucent-ui with collapsible groups and active item highlight"`,
    },
    props: [
      { name: "orientation", type: `"vertical" | "horizontal"`, description: "Layout direction.", defaultValue: `"vertical"` },
      { name: "inverse", type: "boolean", description: "Surface background with accent right-border and elevation shadow.", defaultValue: "false" },
      { name: "size", type: `"sm" | "md" | "lg"`, description: "Text and padding size.", defaultValue: `"md"` },
      { name: "hasIcons", type: "boolean", description: "Controls left-padding alignment for icon consistency.", defaultValue: "false" },
      { name: "aria-label", type: "string", description: "Accessible label for the nav element." },
      { name: "style", type: "React.CSSProperties", description: "Custom styles for the root element." },
      { name: "NavMenu.Item", type: "compound", description: "Navigation item. Props: href, isActive, icon, badge, onClick, disabled, as, children." },
      { name: "NavMenu.Group", type: "compound", description: "Collapsible group with header. Props: label, defaultOpen, icon, children." },
      { name: "NavMenu.Sub", type: "compound", description: "Nested submenu with horizontal dropdown and viewport collision detection. Props: label, icon, children." },
      { name: "NavMenu.Separator", type: "compound", description: "Visual separator between items." },
    ],
    examples: [
      {
        title: "Basic sidebar",
        description: "Vertical navigation with groups and active state.",
        previewKey: "navmenu-sidebar",
        code: `<NavMenu aria-label="Sidebar">
  <NavMenu.Item href="#" isActive>Dashboard</NavMenu.Item>
  <NavMenu.Item href="#">Analytics</NavMenu.Item>
  <NavMenu.Separator />
  <NavMenu.Group label="Settings">
    <NavMenu.Item href="#">Profile</NavMenu.Item>
    <NavMenu.Item href="#">Billing</NavMenu.Item>
    <NavMenu.Item href="#">Team</NavMenu.Item>
  </NavMenu.Group>
</NavMenu>`,
      },
      {
        title: "Inverse mode",
        description: "Surface background with accent right-border for tinted chrome.",
        previewKey: "navmenu-inverse",
        code: `<NavMenu inverse aria-label="Sidebar">
  <NavMenu.Item href="#" isActive>Dashboard</NavMenu.Item>
  <NavMenu.Item href="#">Projects</NavMenu.Item>
  <NavMenu.Group label="Admin">
    <NavMenu.Item href="#">Users</NavMenu.Item>
    <NavMenu.Item href="#">Roles</NavMenu.Item>
  </NavMenu.Group>
</NavMenu>`,
      },
      {
        title: "Sizes",
        description: "Small, medium, and large navigation items.",
        previewKey: "navmenu-sizes",
        code: `<NavMenu size="sm" aria-label="Small nav">
  <NavMenu.Item href="#" isActive>Small</NavMenu.Item>
  <NavMenu.Item href="#">Item</NavMenu.Item>
</NavMenu>
<NavMenu size="lg" aria-label="Large nav">
  <NavMenu.Item href="#" isActive>Large</NavMenu.Item>
  <NavMenu.Item href="#">Item</NavMenu.Item>
</NavMenu>`,
      },
    ],
  },

  // ── Recipes ──────────────────────────────────────────────────────────────────

  // ── ProfileCard ──────────────────────────────────────────────────────────────
  {
    slug: "profilecard",
    name: "ProfileCard",
    category: "Recipes",
    description:
      "User profile card composed from Card, Avatar, Text (display font), Chip, Row, Stack, Divider, and Button. Features a stat row with 2xl display numbers, borderless clickable chips for tags, and action buttons. Compact collapsible variant uses a filled Card with Collapsible.",
    importStatement: "import { Card, Avatar, Text, Chip, Row, Stack, Divider, Button, Collapsible } from 'lucent-ui'",
    usageCode: `<Card variant="elevated" style={{ width: 320 }}>
  <Stack gap="4">
    <Row gap="4">
      <Avatar src="/avatar.jpg" size="md" alt="Jane Doe" />
      <Stack gap="1">
        <Row gap="2" align="center">
          <Text size="lg" weight="bold" family="display">Jane Doe</Text>
          <Chip variant="success" dot size="sm">Pro</Chip>
        </Row>
        <Text size="sm" color="secondary">Product Designer</Text>
      </Stack>
    </Row>
    <Text size="sm" color="secondary">
      Crafting intuitive experiences for complex products.
    </Text>
    <Row gap="2">
      <Chip variant="neutral" size="sm" borderless onClick={() => {}}>Design</Chip>
      <Chip variant="neutral" size="sm" borderless onClick={() => {}}>UX</Chip>
    </Row>
    <Divider spacing="0" />
    <Row justify="around">
      <Stack align="center" gap="0">
        <Text size="2xl" weight="bold" family="display">128</Text>
        <Text size="xs" color="secondary">Projects</Text>
      </Stack>
      <Stack align="center" gap="0">
        <Text size="2xl" weight="bold" family="display">4.9</Text>
        <Text size="xs" color="secondary">Rating</Text>
      </Stack>
    </Row>
    <Divider spacing="0" />
    <Row gap="2">
      <Button size="sm">Message</Button>
      <Button variant="outline" size="sm">Follow</Button>
    </Row>
  </Stack>
</Card>`,
    aiPrompts: {
      claude: `"Create a ProfileCard using lucent-ui: Card elevated wrapping Avatar, display-font name, subtitle, borderless clickable Chips, a stat row with 2xl display numbers, and action Buttons. Use Stack and Row for layout, Divider for separation."`,
      cursor: `@lucent-ui Create a ProfileCard: Card elevated with Avatar, display-font name, clickable Chips, stat row (2xl display), and action Buttons.`,
      vscode: `Using lucent-ui, compose a profile card with Card, Avatar, Text (display font), Chip (borderless), Row for stats, and Button actions.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the ProfileCard composition recipe"
// Tool: get_composition_recipe({ name: "ProfileCard" })`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated" | "combo"`, description: "Elevation level of the outer card.", defaultValue: `"elevated"` },
      { name: "Avatar src", type: "string", description: "Profile image URL." },
      { name: "Avatar size", type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, description: "Avatar dimensions.", defaultValue: `"xl"` },
      { name: "Text family", type: `"base" | "mono" | "display"`, description: "Use display for the name heading.", defaultValue: `"base"` },
      { name: "Chip borderless", type: "boolean", description: "Removes border for a softer tag appearance.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "Profile card",
        description: "Full profile with avatar, stats, tags, and actions.",
        previewKey: "recipe-profilecard",
        code: `<Card variant="elevated" style={{ width: 320 }}>
  <Stack gap="4">
    <Row gap="4">
      <Avatar size="lg" alt="Jane Doe" />
      <Stack gap="1">
        <Row gap="2" align="center">
          <Text size="lg" weight="bold" family="display">Jane Doe</Text>
          <Chip variant="accent" size="sm">Pro</Chip>
        </Row>
        <Text size="sm" color="secondary">Product Designer</Text>
      </Stack>
    </Row>
    <Text size="sm" color="secondary">
      Crafting intuitive experiences for complex products.
    </Text>
    <Row gap="2">
      <Chip variant="neutral" size="sm" borderless onClick={() => {}}>Design</Chip>
      <Chip variant="neutral" size="sm" borderless onClick={() => {}}>UX</Chip>
    </Row>
    <Divider spacing="0" />
    <Row justify="around">
      <Stack align="center" gap="0">
        <Text size="2xl" weight="bold" family="display">128</Text>
        <Text size="xs" color="secondary">Projects</Text>
      </Stack>
      <Stack align="center" gap="0">
        <Text size="2xl" weight="bold" family="display">4.9</Text>
        <Text size="xs" color="secondary">Rating</Text>
      </Stack>
    </Row>
    <Divider spacing="0" />
    <Row gap="2">
      <Button size="sm">Message</Button>
      <Button variant="outline" size="sm">Follow</Button>
    </Row>
  </Stack>
</Card>`,
      },
      {
        title: "Compact collapsible variant",
        description: "Filled card with collapsible bio and stats.",
        previewKey: "recipe-profilecard-compact",
        code: `<Card variant="filled" hoverable style={{ width: 320 }}>
  <Collapsible
    trigger={
      <Row gap="3">
        <Avatar size="md" />
        <Stack gap="0">
          <Text size="sm" weight="semibold">Jane Doe</Text>
          <Text size="xs" color="secondary">Designer</Text>
        </Stack>
      </Row>
    }
  >
    <Stack gap="3">
      <Text size="sm" color="secondary">
        Designing intuitive experiences for complex products.
      </Text>
      <Row gap="2">
        <Button size="sm" variant="outline">View profile</Button>
      </Row>
    </Stack>
  </Collapsible>
</Card>`,
      },
    ],
  },

  // ── SettingsPanel ─────────────────────────────────────────────────────────────
  {
    slug: "settingspanel",
    name: "SettingsPanel",
    category: "Recipes",
    description:
      "Settings panel composed from Card, Stack, Row, Text, Toggle, Select, Divider, and Button. Features toggle rows with descriptions, a select dropdown, and an action footer. Drill-down variant adds a NavMenu sidebar for multi-section navigation.",
    importStatement: "import { Card, Stack, Row, Text, Toggle, Select, Divider, Button } from 'lucent-ui'",
    usageCode: `<Card variant="elevated" style={{ width: 400 }}>
  <Stack gap="4">
    <Text size="lg" weight="bold">Settings</Text>
    <Divider spacing="0" />
    <Row justify="between">
      <Stack gap="0">
        <Text size="sm" weight="medium">Notifications</Text>
        <Text size="xs" color="secondary">Receive email alerts</Text>
      </Stack>
      <Toggle defaultChecked />
    </Row>
    <Row justify="between">
      <Stack gap="0">
        <Text size="sm" weight="medium">Dark mode</Text>
        <Text size="xs" color="secondary">Use dark theme</Text>
      </Stack>
      <Toggle />
    </Row>
    <Divider spacing="0" />
    <Select label="Language" defaultValue="en" options={[
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
    ]} />
    <Divider spacing="0" />
    <Row gap="2" justify="end">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </Row>
  </Stack>
</Card>`,
    aiPrompts: {
      claude: `"Create a SettingsPanel using lucent-ui: Card elevated with toggle rows (label + description + Toggle), a Select dropdown, dividers, and a save/cancel footer. Use Stack and Row for layout."`,
      cursor: `@lucent-ui Create a SettingsPanel: Card with toggle rows, Select dropdown, dividers, and action footer.`,
      vscode: `Using lucent-ui, compose a settings panel with Card, Toggle rows, Select, Divider, and Button footer.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the SettingsPanel composition recipe"
// Tool: get_composition_recipe({ name: "SettingsPanel" })`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated" | "combo"`, description: "Elevation level of the outer card.", defaultValue: `"elevated"` },
      { name: "Toggle defaultChecked", type: "boolean", description: "Initial state for toggle rows.", defaultValue: "false" },
      { name: "Select label", type: "string", description: "Label for dropdown fields." },
      { name: "Select defaultValue", type: "string", description: "Default selected option." },
    ],
    examples: [
      {
        title: "Settings panel",
        description: "Toggle rows with descriptions, a select dropdown, and save/cancel footer.",
        previewKey: "recipe-settingspanel",
        code: `<Card variant="elevated" style={{ width: 400 }}>
  <Stack gap="4">
    <Text size="lg" weight="bold">Settings</Text>
    <Divider spacing="0" />
    <Row justify="between">
      <Stack gap="0">
        <Text size="sm" weight="medium">Notifications</Text>
        <Text size="xs" color="secondary">Receive email alerts</Text>
      </Stack>
      <Toggle defaultChecked />
    </Row>
    <Divider spacing="0" />
    <Select label="Language" defaultValue="en" options={[
      { value: "en", label: "English" },
    ]} />
    <Divider spacing="0" />
    <Row gap="2" justify="end">
      <Button variant="outline" size="sm">Cancel</Button>
      <Button size="sm">Save changes</Button>
    </Row>
  </Stack>
</Card>`,
      },
      {
        title: "Drill-down with NavMenu",
        description: "Multi-section settings with a sidebar NavMenu for navigation.",
        previewKey: "recipe-settingspanel-drilldown",
        code: `<Card variant="elevated" style={{ width: 520 }}>
  <Row gap="0" align="stretch">
    <NavMenu size="sm" style={{ width: 140, borderRight: "1px solid var(--lucent-border-default)", padding: 8 }}>
      <NavMenu.Item isActive>General</NavMenu.Item>
      <NavMenu.Item>Security</NavMenu.Item>
      <NavMenu.Item>Billing</NavMenu.Item>
    </NavMenu>
    <Stack gap="4" style={{ flex: 1, padding: 16 }}>
      <Text size="md" weight="bold">General</Text>
      <Row justify="between">
        <Stack gap="0">
          <Text size="sm" weight="medium">Dark mode</Text>
          <Text size="xs" color="secondary">Use dark theme</Text>
        </Stack>
        <Toggle />
      </Row>
    </Stack>
  </Row>
</Card>`,
      },
    ],
  },

  // ── StatsRow ──────────────────────────────────────────────────────────────────
  {
    slug: "statsrow",
    name: "StatsRow",
    category: "Recipes",
    description:
      "Stats row composed from Card, Row, Stack, Text, and Chip. Individual stat cards display a metric label, a 2xl display number, and a trend chip with comparison text. Revenue variant adds avatar headers for team attribution.",
    importStatement: "import { Card, Row, Stack, Text, Chip } from 'lucent-ui'",
    usageCode: `<Row gap="4" wrap>
  <Card variant="outline" style={{ flex: 1, minWidth: 180 }}>
    <Stack gap="1">
      <Text size="xs" color="secondary">Total Users</Text>
      <Text size="2xl" weight="bold" family="display">12,847</Text>
      <Row gap="2" align="center">
        <Chip variant="success" size="sm">+12.5%</Chip>
        <Text size="xs" color="secondary">vs last month</Text>
      </Row>
    </Stack>
  </Card>
  <Card variant="outline" style={{ flex: 1, minWidth: 180 }}>
    <Stack gap="1">
      <Text size="xs" color="secondary">Revenue</Text>
      <Text size="2xl" weight="bold" family="display">$48.2k</Text>
      <Row gap="2" align="center">
        <Chip variant="danger" size="sm">-3.1%</Chip>
        <Text size="xs" color="secondary">vs last month</Text>
      </Row>
    </Stack>
  </Card>
</Row>`,
    aiPrompts: {
      claude: `"Create a StatsRow using lucent-ui: Row of outline Cards, each with a label (xs secondary), a 2xl display number, and a trend Chip (success/danger) with comparison text."`,
      cursor: `@lucent-ui Create a StatsRow: Row of Cards with metric labels, 2xl display numbers, and trend Chips.`,
      vscode: `Using lucent-ui, compose a stats row with Card, Text (2xl display), and Chip for trend indicators.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the StatsRow composition recipe"
// Tool: get_composition_recipe({ name: "StatsRow" })`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated"`, description: "Elevation level of each stat card.", defaultValue: `"outline"` },
      { name: "Chip variant", type: `"success" | "danger" | "warning" | "info"`, description: "Semantic color for the trend indicator." },
      { name: "Text font", type: `"body" | "display"`, description: "Use display for large metric numbers.", defaultValue: `"display"` },
    ],
    examples: [
      {
        title: "Stats row",
        description: "Three stat cards with trend indicators.",
        previewKey: "recipe-statsrow",
        code: `<Row gap="4" wrap>
  <Card variant="outline" style={{ flex: 1, minWidth: 160 }}>
    <Stack gap="1">
      <Text size="xs" color="secondary">Users</Text>
      <Text size="2xl" weight="bold" family="display">12,847</Text>
      <Chip variant="success" size="sm">+12.5%</Chip>
    </Stack>
  </Card>
  <Card variant="outline" style={{ flex: 1, minWidth: 160 }}>
    <Stack gap="1">
      <Text size="xs" color="secondary">Revenue</Text>
      <Text size="2xl" weight="bold" family="display">$48.2k</Text>
      <Chip variant="danger" size="sm">-3.1%</Chip>
    </Stack>
  </Card>
</Row>`,
      },
      {
        title: "Revenue variant with avatars",
        description: "Stat cards with avatar headers for team attribution.",
        previewKey: "recipe-statsrow-avatars",
        code: `<Row gap="4" wrap>
  <Card variant="elevated" style={{ flex: 1, minWidth: 200 }}>
    <Stack gap="2">
      <Row gap="2" align="center">
        <Avatar size="sm" />
        <Text size="xs" color="secondary">Alice — Sales</Text>
      </Row>
      <Text size="2xl" weight="bold" family="display">$24.1k</Text>
      <Chip variant="success" size="sm">+8.3%</Chip>
    </Stack>
  </Card>
  <Card variant="elevated" style={{ flex: 1, minWidth: 200 }}>
    <Stack gap="2">
      <Row gap="2" align="center">
        <Avatar size="sm" />
        <Text size="xs" color="secondary">Bob — Marketing</Text>
      </Row>
      <Text size="2xl" weight="bold" family="display">$18.7k</Text>
      <Chip variant="warning" size="sm">+1.2%</Chip>
    </Stack>
  </Card>
</Row>`,
      },
    ],
  },

  // ── ActionBar ─────────────────────────────────────────────────────────────────
  {
    slug: "actionbar",
    name: "ActionBar",
    category: "Recipes",
    description:
      "Action bar header composed from Stack, Row, Breadcrumb, Text, Divider, and Button. Page header variant features breadcrumb navigation, a 3xl display title, a divider, and action buttons. Card header variant uses an uppercase label with md title and tight letter-spacing.",
    importStatement: "import { Stack, Row, Breadcrumb, Text, Divider, Button } from 'lucent-ui'",
    usageCode: `<Stack gap="3">
  <Breadcrumb items={[
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Details" },
  ]} />
  <Row justify="between" align="end">
    <Text size="3xl" weight="bold" family="display">Project Alpha</Text>
    <Row gap="2">
      <Button variant="outline" size="sm">Edit</Button>
      <Button size="sm">Publish</Button>
    </Row>
  </Row>
  <Divider spacing="0" />
</Stack>`,
    aiPrompts: {
      claude: `"Create an ActionBar using lucent-ui: Stack with Breadcrumb, a 3xl display title Row with action Buttons, and a Divider below. For card headers, use uppercase xs label + md title with tight letter-spacing."`,
      cursor: `@lucent-ui Create an ActionBar: Breadcrumb + 3xl display title + action Buttons + Divider.`,
      vscode: `Using lucent-ui, compose an action bar header with Breadcrumb, Text (3xl display), Button actions, and Divider.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the ActionBar composition recipe"
// Tool: get_composition_recipe({ name: "ActionBar" })`,
    },
    props: [
      { name: "Text size", type: `"md" | "lg" | "xl" | "2xl" | "3xl"`, description: "Title size — 3xl for page headers, md for card headers.", defaultValue: `"3xl"` },
      { name: "Text family", type: `"base" | "mono" | "display"`, description: "Use display for page-level titles.", defaultValue: `"base"` },
      { name: "Breadcrumb.Item href", type: "string", description: "Navigation link for each breadcrumb segment." },
    ],
    examples: [
      {
        title: "Page header",
        description: "Breadcrumb navigation, large display title, and action buttons.",
        previewKey: "recipe-actionbar-page",
        code: `<Stack gap="3">
  <Breadcrumb items={[
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Details" },
  ]} />
  <Row justify="between" align="end">
    <Text size="3xl" weight="bold" family="display">Project Alpha</Text>
    <Row gap="2">
      <Button variant="outline" size="sm">Edit</Button>
      <Button size="sm">Publish</Button>
    </Row>
  </Row>
  <Divider spacing="0" />
</Stack>`,
      },
      {
        title: "Card header",
        description: "Uppercase label with medium title and tight letter-spacing for card sections.",
        previewKey: "recipe-actionbar-card",
        code: `<Card variant="outline" style={{ width: 360 }}>
  <Stack gap="2">
    <Text size="xs" color="secondary"
      style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
      Overview
    </Text>
    <Row justify="between" align="center">
      <Text size="md" weight="semibold">Team Activity</Text>
      <Button variant="ghost" size="xs">View all</Button>
    </Row>
    <Divider spacing="0" />
    <Text size="sm" color="secondary">
      Activity feed content goes here.
    </Text>
  </Stack>
</Card>`,
      },
    ],
  },

  // ── FormLayout ────────────────────────────────────────────────────────────────
  {
    slug: "formlayout",
    name: "FormLayout",
    category: "Recipes",
    description:
      "Form layout composed from Card, Stack, Row, Text, Input, Textarea, Select, Divider, and Button. Stacked form with section grouping, side-by-side fields using Row, dividers between sections, and a submit/cancel footer.",
    importStatement: "import { Card, Stack, Row, Text, Input, Textarea, Select, DatePicker, Divider, Button } from 'lucent-ui'",
    usageCode: `<Card variant="elevated" style={{ width: 480 }}>
  <Stack as="form" gap="4">
    <Text size="lg" weight="bold">Create Project</Text>
    <Divider spacing="0" />
    <Input label="Project name" placeholder="My project" />
    <Row gap="3">
      <DatePicker label="Start date" placeholder="Pick a date" style={{ flex: 1 }} />
      <DatePicker label="End date" placeholder="Pick a date" style={{ flex: 1 }} />
    </Row>
    <Textarea label="Description" placeholder="Describe the project..." />
    <Select label="Priority" options={[
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]} />
    <Divider spacing="0" />
    <Row gap="2" justify="end">
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Create project</Button>
    </Row>
  </Stack>
</Card>`,
    aiPrompts: {
      claude: `"Create a FormLayout using lucent-ui: Card elevated wrapping a Stack form with Input fields, side-by-side Row fields, Textarea, Select, Dividers for section breaks, and a submit/cancel Button footer."`,
      cursor: `@lucent-ui Create a FormLayout: Card with stacked form fields, side-by-side Row inputs, Textarea, Select, and action footer.`,
      vscode: `Using lucent-ui, compose a form layout with Card, Stack (as="form"), Input, Row for side-by-side fields, Textarea, Select, Divider, and Buttons.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the FormLayout composition recipe"
// Tool: get_composition_recipe({ name: "FormLayout" })`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated"`, description: "Elevation level of the form card.", defaultValue: `"elevated"` },
      { name: "Stack as", type: `"form" | "div"`, description: "Render as a form element for native submission.", defaultValue: `"form"` },
      { name: "Input label", type: "string", description: "Field label." },
      { name: "Input placeholder", type: "string", description: "Placeholder text." },
    ],
    examples: [
      {
        title: "Form layout",
        description: "Stacked form with sections, side-by-side fields, and action footer.",
        previewKey: "recipe-formlayout",
        code: `<Card variant="elevated" style={{ width: 480 }}>
  <Stack as="form" gap="4">
    <Text size="lg" weight="bold">Create Project</Text>
    <Divider spacing="0" />
    <Input label="Project name" placeholder="My project" />
    <Row gap="3">
      <DatePicker label="Start" placeholder="Pick a date" style={{ flex: 1 }} />
      <DatePicker label="End" placeholder="Pick a date" style={{ flex: 1 }} />
    </Row>
    <Textarea label="Description" placeholder="Describe..." />
    <Divider spacing="0" />
    <Row gap="2" justify="end">
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Create</Button>
    </Row>
  </Stack>
</Card>`,
      },
      {
        title: "Section grouping",
        description: "Multiple form sections with headings and dividers.",
        previewKey: "recipe-formlayout-sections",
        code: `<Card variant="elevated" style={{ width: 480 }}>
  <Stack as="form" gap="4">
    <Text size="lg" weight="bold">Account Settings</Text>
    <Divider spacing="0" />
    <Text size="sm" weight="semibold">Personal Info</Text>
    <Row gap="3">
      <Input label="First name" style={{ flex: 1 }} />
      <Input label="Last name" style={{ flex: 1 }} />
    </Row>
    <Input label="Email" type="email" />
    <Divider spacing="0" />
    <Text size="sm" weight="semibold">Preferences</Text>
    <Select label="Timezone" options={[
      { value: "utc", label: "UTC" },
      { value: "est", label: "EST" },
    ]} />
    <Divider spacing="0" />
    <Row gap="2" justify="end">
      <Button variant="outline">Cancel</Button>
      <Button type="submit">Save</Button>
    </Row>
  </Stack>
</Card>`,
      },
    ],
  },

  // ── EmptyStateCard ────────────────────────────────────────────────────────────
  {
    slug: "emptystatecard",
    name: "EmptyStateCard",
    category: "Recipes",
    description:
      "Empty state card composed from Card, EmptyState, Icon, Text, and Button. Features an icon illustration, heading, description, and a call-to-action button. Three variants: no results, getting started, and error.",
    importStatement: "import { Card, EmptyState, Icon, Button } from 'lucent-ui'",
    usageCode: `<Card variant="outline" style={{ width: 400 }}>
  <EmptyState
    illustration={
      <Icon size="xl">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={11} cy={11} r={8} />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </Icon>
    }
    title="No results found"
    description="Try adjusting your search or filters to find what you're looking for."
    action={<Button variant="secondary" size="sm">Clear filters</Button>}
  />
</Card>`,
    aiPrompts: {
      claude: `"Create an EmptyStateCard using lucent-ui: Card wrapping EmptyState with an Icon illustration, title, description, and a CTA Button. Use three variants: no results, getting started, and error."`,
      cursor: `@lucent-ui Create an EmptyStateCard: Card with EmptyState, Icon illustration, and CTA Button in three variants.`,
      vscode: `Using lucent-ui, compose an empty state card with Card, EmptyState, Icon, and Button for no-results, onboarding, and error states.`,
      mcp: `// lucent-ui MCP
// Ask: "Get the EmptyStateCard composition recipe"
// Tool: get_composition_recipe({ name: "EmptyStateCard" })`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated"`, description: "Elevation level of the outer card.", defaultValue: `"outline"` },
      { name: "EmptyState title", type: "string", description: "Heading text.", required: true },
      { name: "EmptyState description", type: "string", description: "Supporting description text." },
      { name: "EmptyState illustration", type: "React.ReactNode", description: "Icon or image above the title." },
      { name: "EmptyState action", type: "React.ReactNode", description: "CTA button or link." },
    ],
    examples: [
      {
        title: "No results",
        description: "Search returned no matches — prompt the user to adjust filters.",
        previewKey: "recipe-emptystate-noresults",
        code: `<Card variant="outline" style={{ width: 360 }}>
  <EmptyState
    illustration={<Icon size="xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.35-4.35"/></svg></Icon>}
    title="No results found"
    description="Try adjusting your search or filters."
    action={<Button variant="secondary" size="sm">Clear filters</Button>}
  />
</Card>`,
      },
      {
        title: "Getting started",
        description: "Onboarding state prompting the user to create their first item.",
        previewKey: "recipe-emptystate-onboarding",
        code: `<Card variant="outline" style={{ width: 360 }}>
  <EmptyState
    illustration={<Icon size="xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 5v14M5 12h14"/></svg></Icon>}
    title="Get started"
    description="Create your first project to begin."
    action={<Button size="sm">Create project</Button>}
  />
</Card>`,
      },
      {
        title: "Error state",
        description: "Something went wrong — offer a retry action.",
        previewKey: "recipe-emptystate-error",
        code: `<Card variant="outline" style={{ width: 360 }}>
  <EmptyState
    illustration={<Icon size="xl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={12} cy={12} r={10}/><path d="M12 8v4M12 16h.01"/></svg></Icon>}
    title="Something went wrong"
    description="We couldn't load the data. Please try again."
    action={<Button variant="danger" size="sm">Retry</Button>}
  />
</Card>`,
      },
    ],
  },

  // ── CollapsibleCard ────────────────────────────────────────────────────────────
  {
    slug: "collapsiblecard",
    name: "CollapsibleCard",
    category: "Recipes",
    description:
      "Expandable card composed from Card + Collapsible. The Collapsible auto-bleeds inside the Card via CardPaddingContext — just wrap and it works. Use hoverable on the Card for hover lift without making it interactive. Works with all five card variants; combo gives a two-tone layout with a nested elevated Card.",
    importStatement: "import { Card, Collapsible } from 'lucent-ui'",
    usageCode: `<Card variant="elevated" hoverable>
  <Collapsible trigger="Show details">
    <Text size="sm" color="secondary">
      Expanded content auto-bleeds to fill the card.
    </Text>
  </Collapsible>
</Card>`,
    aiPrompts: {
      claude: `"Create a CollapsibleCard using lucent-ui by wrapping a Collapsible inside a Card with hoverable. The Collapsible auto-bleeds to fill the card body — no extra padding props needed."`,
      cursor: `@lucent-ui Create a CollapsibleCard: Card hoverable wrapping a Collapsible. Auto-bleed handles padding.`,
      vscode: `Using lucent-ui, compose a Card (variant="elevated", hoverable) wrapping a Collapsible for an expandable card pattern.`,
      mcp: `// lucent-ui MCP
// Ask: "Create a CollapsibleCard recipe from lucent-ui using Card + Collapsible"`,
    },
    props: [
      { name: "Card variant", type: `"ghost" | "outline" | "filled" | "elevated" | "combo"`, description: "Elevation level of the outer card.", defaultValue: `"outline"` },
      { name: "Card hoverable", type: "boolean", description: "Enables hover lift and neutral glow without making the card a button or link.", defaultValue: "false" },
      { name: "Card status", type: `"success" | "warning" | "danger" | "info"`, description: "Colored left-edge accent bar." },
      { name: "Collapsible trigger", type: "React.ReactNode", description: "Always-visible trigger element.", required: true },
      { name: "Collapsible defaultOpen", type: "boolean", description: "Start in expanded state.", defaultValue: "false" },
      { name: "Collapsible disabled", type: "boolean", description: "Prevent toggling.", defaultValue: "false" },
    ],
    examples: [
      {
        title: "All variants",
        description: "Five card elevation levels with a Collapsible inside each. The Collapsible auto-bleeds to match the card body.",
        previewKey: "card-collapsible-recipe",
        code: `<Card variant="ghost" hoverable>
  <Collapsible trigger="Ghost">
    <Text size="xs" color="secondary">Content</Text>
  </Collapsible>
</Card>

<Card variant="elevated" hoverable>
  <Collapsible trigger="Elevated">
    <Text size="xs" color="secondary">Content</Text>
  </Collapsible>
</Card>

<Card variant="combo" hoverable>
  <Collapsible trigger="Combo">
    <Text size="xs" color="secondary">Content</Text>
  </Collapsible>
</Card>`,
      },
      {
        title: "Composed layouts",
        description: "Elevated and filled cards with expanded content. Use for settings panels, FAQ sections, or detail drawers.",
        previewKey: "collapsible-card-recipe",
        code: `<Card variant="elevated" hoverable>
  <Collapsible trigger="Expand details">
    <Text size="sm" color="secondary">
      Content inside a hoverable card.
    </Text>
  </Collapsible>
</Card>

<Card variant="filled" hoverable>
  <Collapsible trigger="Filled variant">
    <Text size="sm" color="secondary">
      Works with any card variant.
    </Text>
  </Collapsible>
</Card>`,
      },
    ],
  },

  // ── Search / Filter Bar (Recipe) ────────────────────────────────────────────
  {
    slug: "searchfilterbar",
    name: "SearchFilterBar",
    category: "Recipes",
    description:
      "Compact toolbar recipe for filtering and sorting lists and data tables. Composes the Filter molecule family — FilterSearch, FilterSelect, FilterMultiSelect, and FilterDateRange — into a cohesive bar with conditional clear-all and view toggle.",
    importStatement: `import { Row, Button, FilterSearch, FilterSelect, FilterMultiSelect, FilterDateRange, SegmentedControl } from 'lucent-ui'`,
    usageCode: `<Row gap="2" align="center" style={{ flexWrap: "wrap" }}>
  <FilterSearch size="sm" placeholder="Search..." />
  <FilterSelect size="sm" label="Availability" options={availabilityOpts} />
  <FilterMultiSelect size="sm" label="Status" options={statusOpts} />
  <FilterDateRange size="sm" label="Date range" />
  <Button variant="ghost" size="sm">Clear all</Button>
  <div style={{ flex: 1 }} />
  <FilterSelect size="sm" label="Sort" options={sortOpts} />
  <SegmentedControl size="sm" defaultValue="list" options={viewOpts} />
</Row>`,
    aiPrompts: {
      claude: `"Build a SearchFilterBar recipe from lucent-ui. Use a Row composing FilterSearch, FilterSelect, FilterMultiSelect, and FilterDateRange molecules. Add a conditional ghost Clear All button and a SegmentedControl for view toggle."`,
      cursor: `@lucent-ui Build a SearchFilterBar: Row composing FilterSearch, FilterSelect, FilterMultiSelect, FilterDateRange, and SegmentedControl.`,
      vscode: `Using lucent-ui, compose a search/filter bar with FilterSearch, FilterSelect, FilterMultiSelect, FilterDateRange, and SegmentedControl.`,
      mcp: `// lucent-ui MCP
// Ask: "Build a search/filter bar recipe from lucent-ui using Filter molecules"`,
    },
    props: [
      { name: "Row", type: "component", description: "Horizontal flex container for the toolbar layout." },
      { name: "FilterSearch", type: "component", description: "Collapsible search icon that expands to an input on click." },
      { name: "FilterSelect", type: "component", description: "Single-select button + menu popover (e.g. Availability, Sort)." },
      { name: "FilterMultiSelect", type: "component", description: "Multi-select filter with chip count badge in trigger." },
      { name: "FilterDateRange", type: "component", description: "Date range button + calendar popover." },
      { name: "SegmentedControl", type: "component", description: "View toggle (grid/list) pushed to the right edge." },
      { name: "Button variant=\"ghost\"", type: "component", description: "Conditional Clear All button that appears when any filter is active." },
    ],
    examples: [
      {
        title: "Full toolbar",
        description: "Search, single/multi-select filters, date range, clear all, sort, and view toggle.",
        previewKey: "recipe-searchfilterbar",
        code: `<Row gap="2" align="center" style={{ flexWrap: "wrap" }}>
  <FilterSearch size="sm" placeholder="Search..." />
  <FilterSelect size="sm" label="Availability" options={availabilityOpts} />
  <FilterMultiSelect size="sm" label="Status" options={statusOpts} />
  <FilterMultiSelect size="sm" label="Tags" options={tagOpts} />
  <FilterDateRange size="sm" label="Date range" />
  <Button variant="ghost" size="sm">Clear all</Button>
  <div style={{ flex: 1 }} />
  <FilterSelect size="sm" label="Sort" options={sortOpts} />
  <SegmentedControl size="sm" defaultValue="list" options={viewOpts} />
</Row>`,
      },
      {
        title: "Minimal",
        description: "Search and sort only — simplest variant.",
        previewKey: "recipe-searchfilterbar-minimal",
        code: `<Row gap="2" align="center">
  <FilterSearch size="sm" placeholder="Search..." />
  <div style={{ flex: 1 }} />
  <FilterSelect size="sm" label="Sort" options={sortOpts} />
</Row>`,
      },
      {
        title: "Pipeline filters",
        description: "Multi-select filters only — for pipeline and kanban views.",
        previewKey: "recipe-searchfilterbar-pipeline",
        code: `<Row gap="2" align="center" style={{ flexWrap: "wrap" }}>
  <FilterMultiSelect size="sm" label="Status" options={statusOpts} />
  <FilterMultiSelect size="sm" label="Assignee" options={assigneeOpts} />
  <FilterMultiSelect size="sm" label="Priority" options={priorityOpts} />
  <Button variant="ghost" size="sm">Clear all</Button>
</Row>`,
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

export type ChangelogEntry = {
  version: string;
  date?: string;
  title: string;
  items: ChangelogItem[];
};

export type ChangelogItem = {
  label: string;
  description: string;
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.10.0",
    date: "March 2026",
    title: "Design Presets & CLI",
    items: [
      {
        label: "Design Presets",
        description:
          "Pick a curated preset and get an instantly polished UI — colors, spacing, borders, and shadows — with zero manual configuration. 3 combined presets (modern, enterprise, playful) and 4 mixable dimensions: palette (6 options), shape (3), density (3), shadow (3). Full-atmosphere palettes tint bg, surface, and border colors toward the accent hue. Works with both light and dark themes automatically.",
      },
      {
        label: "npx lucent-ui init",
        description:
          "Interactive CLI that walks you through preset selection and writes a lucent.config.ts + provider snippet.",
      },
      {
        label: "MCP preset tools",
        description:
          "Two new MCP tools: list_presets discovers all available presets and dimensions, get_preset_config generates ready-to-use provider config from a selection.",
      },
    ],
  },
  {
    version: "0.9.2",
    date: "March 2026",
    title: "CardBleed & Tabs overflow",
    items: [
      {
        label: "CardBleed",
        description:
          "A companion to Card that lets specific children stretch edge-to-edge, cancelling the card's horizontal padding. Text inside stays aligned with the rest of the card content. Useful for full-width dividers, bordered sections, and settings-style lists.",
      },
      {
        label: "Tabs — overflow menu",
        description:
          "When tabs are rendered in a constrained-width container, items that don't fit are automatically collected into a \"more\" overflow menu. No configuration needed — the component measures available space and adapts.",
      },
    ],
  },
  {
    version: "0.9.1",
    date: "March 2026",
    title: "Patch Changes",
    items: [
      {
        label: "ColorPicker",
        description:
          "Fix popover opening off-viewport when the trigger is near the right edge of the screen (now right-aligns automatically).",
      },
      {
        label: "Card",
        description:
          "Increase default padding sizes by ~1.5× (sm: space-3→4, md: space-4→6, lg: space-6→8).",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "March 2026",
    title: "New components & Input enhancements",
    items: [
      {
        label: "ColorPicker",
        description:
          "Fully-featured color selection popover with a spectrum panel, hue/alpha sliders, four input formats (Hex, RGB, HSL, HSB), eyedropper support, and multi-group preset palettes switchable via dropdown.",
      },
      {
        label: "ColorSwatch",
        description:
          "Standalone color swatch atom. Circle or square shape, six sizes (xs–2xl), selected state with inset ring, and checkerboard background for transparent colors. Forwards ref and accepts any button attribute.",
      },
      {
        label: "SegmentedControl",
        description:
          "Pill-style toggle group with a smooth sliding selection indicator. Fills its container by default — use it for format switchers, view mode toggles, or filter bars.",
      },
      {
        label: "Input — prefix, suffix, sizes",
        description:
          "Input now accepts prefix and suffix addons flush inside the field border, plus a size prop (sm / md / lg) for height and font control. Icon slots (leftElement, rightElement) also available.",
      },
      {
        label: "Select — style prop consistency",
        description:
          "The style prop on Select now applies to the outer wrapper div, matching Input behavior for easier width and layout control.",
      },
      {
        label: "Breaking: ColorPicker presets API",
        description:
          "ColorPicker's presets and presetsLabel props replaced by presetGroups: ColorPresetGroup[]. Each group has a label and colors array; single group hides the switcher, multiple groups show a dropdown.",
      },
    ],
  },
  {
    version: "0.8.0",
    date: "March 2026",
    title: "Token derivation system",
    items: [
      {
        label: "createTheme()",
        description:
          "Generate a complete light/dark token set from a single accent color. Pass an accent hex and get back a full LucentTokens object with all surface, border, text, and semantic colors derived automatically.",
      },
      {
        label: "ThemeAnchors",
        description:
          "Lower-level API for building custom themes with explicit control over the derivation inputs.",
      },
      {
        label: "LucentProviderManifest",
        description:
          "Machine-readable manifest for the provider itself, so AI agents understand theming configuration.",
      },
      {
        label: "Token rename: surfaceDefault → surface",
        description:
          "Added surfaceSecondary, removed bgMuted. Affects custom token overrides — see the migration guide.",
      },
    ],
  },
  {
    version: "0.7.0",
    title: "New atoms: Slider, CodeBlock, Table",
    items: [
      {
        label: "Slider",
        description: "Range input with token-driven track and thumb styling.",
      },
      {
        label: "CodeBlock",
        description:
          "Syntax-highlighted code display with tab support, a prompt variant for terminal-style output, and optional helperText.",
      },
      {
        label: "Table",
        description:
          "Structural table primitive (Table, Table.Head, Table.Body, Table.Row, Table.Cell) for building data-dense layouts.",
      },
    ],
  },
  {
    version: "0.6.0",
    title: "DataTable filtering",
    items: [
      {
        label: "Per-column filtering",
        description:
          "Searchable multi-select filtering via filterable: true on column definitions. Filter dropdowns are searchable, multi-select, and reset pagination automatically. onFilterChange callback exposes the current filter state.",
      },
    ],
  },
  {
    version: "0.5.0",
    title: "Theme customizer: border colors",
    items: [
      {
        label: "Border color picker",
        description:
          "Border color picker in the theme customizer with theme-aware derivation.",
      },
      {
        label: "Exported helpers",
        description:
          "getThemeComplementBorderColor and deriveBorderVariants exported for use in custom token pipelines.",
      },
    ],
  },
  {
    version: "0.4.0 — 0.4.2",
    title: "Molecules Wave 2 + COMPONENT_MANIFEST spec v1.0",
    items: [
      {
        label: "New molecules",
        description:
          "DataTable, CommandPalette, MultiSelect, DatePicker, DateRangePicker, FileUpload, Timeline. All ship with specVersion: \"1.0\" manifests — the stable manifest format AI tools can rely on.",
      },
      {
        label: "PageLayout extended",
        description: "Added rightSidebar and footer slots.",
      },
      {
        label: "Missing manifests backfilled",
        description: "NavLink, Breadcrumb, Tabs, Collapsible.",
      },
    ],
  },
  {
    version: "0.3.0",
    title: "lucent-manifest CLI",
    items: [
      {
        label: "npx lucent-manifest init",
        description:
          "Fetch your Figma Variables and generate a lucent.manifest.json token override file with --figma-token and --file-key flags, or use --template for a pre-filled JSON template for manual editing.",
      },
    ],
  },
  {
    version: "0.2.0",
    title: "Navigation & layout components",
    items: [
      {
        label: "New components",
        description:
          "Breadcrumb, Tabs, Collapsible, NavLink, PageLayout.",
      },
    ],
  },
  {
    version: "0.1.0",
    title: "Initial release — 15 components",
    items: [
      {
        label: "Atoms",
        description:
          "Button, Badge, Avatar, Input, Textarea, Checkbox, Radio / RadioGroup, Toggle, Select, Tag, Tooltip, Icon, Text, Spinner, Divider.",
      },
      {
        label: "Molecules",
        description: "FormField, SearchInput, Card, Alert, EmptyState, Skeleton.",
      },
      {
        label: "LLM-ready from day one",
        description:
          "Every component ships with a COMPONENT_MANIFEST and is accessible via the MCP server (lucent-mcp).",
      },
    ],
  },
];

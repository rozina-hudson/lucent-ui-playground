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

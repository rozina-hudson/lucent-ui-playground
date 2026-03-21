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
    version: "0.14.0",
    date: "March 2026",
    title: "Form field consistency & picker labels",
    items: [
      {
        label: "Form field consistency",
        description:
          "Textarea label font size is now size-aware, matching Input (sm/md use font-size-sm, lg uses font-size-md). Textarea horizontal padding aligned with Input (space-3 for sm, space-4 for md/lg). Select lg value font size corrected from font-size-lg to font-size-md to match Input.",
      },
      {
        label: "DatePicker / DateRangePicker",
        description:
          "Added label, helperText, and errorText props. Fixed box-sizing from content-box to border-box so width no longer grows with padding. Horizontal padding is now size-aware, matching Input/Select. Icon-to-text gap is now size-aware (space-2 for sm, midpoint for md, space-3 for lg). Focus ring updated to border + boxShadow pattern matching Input/Select. Manifests updated with new props and aria-invalid.",
      },
      {
        label: "Chip accent variant",
        description:
          "The accent variant now uses a solid accent background with auto-derived text-on-accent color for better visual weight and contrast.",
      },
      {
        label: "Playground",
        description:
          "DatePicker and DateRangePicker entries now include label, helperText, and errorText controls.",
      },
    ],
  },
  {
    version: "0.13.0",
    date: "March 2026",
    title: "Chip component, contained controls & token-based spacing",
    items: [
      {
        label: "Chip — unified label primitive",
        description:
          "New Chip component replaces both Tag and Badge with a single flexible component for filters, tags, statuses, and categories. Supports onDismiss for removable chips, onClick for clickable/selectable chips, swatch for color-coded categories, dot for status indicators (online/offline), leftIcon for leading elements (emoji, flags, avatars), and borderless for a softer filled-only appearance. Available in three sizes (sm/md/lg) with six semantic variants. Heights scale with spacing tokens. Tag and Badge are kept for backward compatibility.",
      },
      {
        label: "Contained Checkbox, Radio & Toggle",
        description:
          "All three controls gain a contained prop that wraps them in a bordered container with accent highlighting when checked. Designed for plan selection cards, feature toggles, and consent items where each option needs its own visual weight. Pair with the new helperText prop for secondary context below the label — the label auto-upgrades to medium weight for visual hierarchy. Checkbox and Radio also gain an lg size (20px). Toggle adds an align prop to position the track on the left or right.",
      },
      {
        label: "Token-based heights",
        description:
          "All form control heights now use calc(space-token × 0.5 + fixed) for dampened vertical scaling — horizontal padding scales fully with spacing tokens while height scales at 50% rate. This applies to Input, Select, Button, DatePicker, DateRangePicker, MultiSelect, Chip, and contained Checkbox/Radio/Toggle. The playground adds spacing, font size, and roundness sliders to visualise scaling in real time.",
      },
      {
        label: "MultiSelect enhancements",
        description:
          "MultiSelect gains label, helperText, and errorText props matching Input's pattern. Focus ring now matches Input (boxShadow instead of outline). Dropdown padding follows a size × density matrix — tighter at sm, more generous at lg, scaling with density presets. Checkboxes in the dropdown match the MultiSelect's size. Selected values render as Chips instead of Tags.",
      },
      {
        label: "SearchInput & Textarea",
        description:
          "SearchInput adds label, helperText, and errorText passthrough to the underlying Input. The search icon scales with size (14/18/20px). Textarea gains a size prop (sm/md/lg) with size-aware font and padding. Label and helper text font sizes now scale with component size across Input, Select, and MultiSelect.",
      },
      {
        label: "Input focus fix",
        description:
          "Fixed a bug where the focus ring wouldn't appear on SearchInput — {...rest} was spread after the explicit onFocus/onBlur handlers, overwriting them when consumers passed their own handlers.",
      },
    ],
  },
  {
    version: "0.12.0",
    date: "March 2026",
    title: "xs button, component filter & picker alignment",
    items: [
      {
        label: "Button xs size",
        description:
          "New xs size (26px height, font-size-xs) for compact UIs like customizer panels and toolbars. The customizer's palette/shape/density/shadow pickers now use the Button atom with size=\"xs\" and color swatch leftIcon instead of raw HTML buttons.",
      },
      {
        label: "Component filter",
        description:
          "ComponentPreview gains a search bar at the top to filter sections by component name — type to show/hide, with a count of visible components.",
      },
      {
        label: "MultiSelect, DatePicker & Tag alignment",
        description:
          "MultiSelect adds a size prop (sm/md/lg) with heights, font sizes, and border radius matching Input. Tags inside MultiSelect now use the Tag atom (not an internal duplicate) with size-matched variants. DatePicker and DateRangePicker gain a size prop with full-width triggers and content-box sizing to match Input heights. DateRangePicker highlights the range between first click and hovered day in real time. Tag adds an lg size (28px), hover animation on dismissible tags, and respects the roundness setting (radius-lg instead of radius-full).",
      },
      {
        label: "Manifest updates",
        description:
          "Button: outline variant, xs size, chevron/spread props, swatch example. Tag: lg size. MultiSelect, DatePicker, DateRangePicker: size prop.",
      },
    ],
  },
  {
    version: "0.11.0",
    date: "March 2026",
    title: "Button overhaul, APCA contrast & new palettes",
    items: [
      {
        label: "Component consistency",
        description:
          "Select refactored to wrapper-div architecture matching Input (fixes height mismatch). Select and Textarea get proper disabled states. Textarea border radius aligned to radius-lg with hover border and smooth focus-ring transitions. SearchInput gains a size prop (sm/md/lg) passthrough to Input. Button heights aligned to match Input/Select at every size.",
      },
      {
        label: "Button overhaul",
        description:
          "New outline variant (bordered button); secondary is now a filled surface button. Hover animation with translateY(-1px) lift + accent-derived glow. Press state with translateY(1px) + accent ring. Theme-aware disabled state via color-mix (no accent tinting). Variant-aware focus ring (danger uses danger-subtle). Primary border removed for a cleaner look.",
      },
      {
        label: "APCA contrast algorithm",
        description:
          "Replaced WCAG 2.1 luminance threshold with APCA (Accessible Perceptual Contrast Algorithm) for getContrastText — correctly handles saturated blues/purples. ensureContrast() nudges accent lightness until APCA Lc ≥ 60. LucentProvider auto-adjusts accentDefault so no accent color ever produces unreadable button text. New exports: apcaContrast, ensureContrast, getContrastRatio.",
      },
      {
        label: "6 new palette presets",
        description:
          "Trendy: violet (#8b5cf6), coral (#e8624a), teal (#0d9488), amber (#d97706). Muted: slate (#475569), sage (#5f8c6e). Total palette count now 12.",
      },
    ],
  },
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

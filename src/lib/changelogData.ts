export type ChangelogEntry = {
  version: string;
  date?: string;
  title: string;
  items: ChangelogItem[];
};

export type ChangelogItem = {
  label: string;
  description: string;
  subItems?: string[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.21.0",
    date: "March 2026",
    title: "New Atom: Progress Bar",
    items: [
      {
        label: "Progress",
        description:
          "Horizontal bar for completion, usage, or health metrics.",
        subItems: [
          "Props: value, max (default 100), variant (accent/success/warning/danger), size (sm/md/lg), label (true for percentage, or custom ReactNode).",
          "Threshold auto-variant — warnAt and dangerAt props auto-switch color based on the current value. Ascending thresholds (warnAt < dangerAt) suit \"high is bad\" metrics (CPU, disk); descending (warnAt > dangerAt) suit \"low is bad\" metrics (battery, health).",
          "Accessible role=\"progressbar\" with aria-valuenow, aria-valuemin, aria-valuemax.",
          "Smooth CSS transitions on value and variant changes.",
        ],
      },
      {
        label: "Playground",
        description:
          "Progress and Slider added to the component playground for side-by-side comparison with prop knobs.",
      },
      {
        label: "Density preview",
        description:
          "Widened compact/comfortable multipliers (65%/140%) so density changes are actually visible.",
      },
    ],
  },
  {
    version: "0.20.0",
    date: "March 2026",
    title: "New Atoms: Stack & Row Layout Primitives",
    items: [
      {
        label: "Stack",
        description:
          "Vertical flex container with gap spacing tokens.",
        subItems: [
          "Props: gap (spacing token \"0\"–\"24\"), align, justify, as (polymorphic: div | section | nav | form | fieldset | ul | ol), wrap.",
          "Default: gap=\"4\", align=\"stretch\".",
          "Gap values reference var(--lucent-space-{n}) tokens, so density presets scale layout automatically.",
        ],
      },
      {
        label: "Row",
        description:
          "Horizontal flex container with the same API as Stack.",
        subItems: [
          "Default: gap=\"3\", align=\"center\" — tuned for horizontal layouts like label/action pairs and button groups.",
          "Gap values reference spacing tokens, so density presets scale layout automatically.",
        ],
      },
      {
        label: "Dev helpers refactored",
        description:
          "Internal Section and Row dev helpers refactored to use the new primitives.",
      },
    ],
  },
  {
    version: "0.19.1",
    date: "March 2026",
    title: "Overlay Polish",
    items: [
      {
        label: "Frosted glass overlays",
        description:
          "All overlay components (CommandPalette, Menu, MultiSelect, DatePicker, DateRangePicker, SearchInput, ColorPicker) now use a frosted glass backdrop: 85% opacity surface-overlay with backdrop-filter: blur(6px).",
      },
      {
        label: "Accent glow",
        description:
          "Overlay borders are tinted with 15% accent-default via color-mix, and a soft 24px accent glow shadow adapts automatically to any palette preset.",
      },
      {
        label: "Portal dropdowns",
        description:
          "MultiSelect, DatePicker, DateRangePicker, and SearchInput dropdowns now render via createPortal with position: fixed, so they escape Card overflow: hidden.",
      },
      {
        label: "CommandPalette",
        description:
          "Arrow-key navigation and UI polish.",
        subItems: [
          "Fixed keyboard navigation cycling through items; added wrapping at top/bottom (#91).",
          "Active highlight now uses accent-tinted background visible in both light and dark mode.",
          "Rounded inset item highlights, Button xs keycaps in footer and search bar, frosted glass panel with blurred backdrop.",
        ],
      },
      {
        label: "DatePicker / DateRangePicker size scaling",
        description:
          "Calendar content (cell height, font size, nav buttons, padding, minWidth) now scales with the size prop (sm/md/lg).",
      },
      {
        label: "DatePicker dark mode hover",
        description:
          "Day hover uses color-mix(accent-default 20%, surface-secondary) for visibility in dark mode.",
      },
      {
        label: "SearchInput",
        description:
          "Fixed duplicate clear button (native type=\"search\" X), aligned dropdown text/spacing/rounding with Menu pattern, text size now matches input size.",
      },
    ],
  },
  {
    version: "0.19.0",
    date: "March 2026",
    title: "Toast molecule — imperative notifications",
    items: [
      {
        label: "Toast",
        description:
          "New molecule for ephemeral notifications via ToastProvider + useToast hook. Imperative API — call toast() from anywhere, get a dismissible id back.",
        subItems: [
          "Five variants (default, success, warning, danger, info) with semantic border colors and built-in 16×16 SVG icons (same set as Alert).",
          "Multi-line text with semibold title + optional secondary description (supports \\n via white-space: pre-line).",
          "Inline action buttons in two styles: bordered pill (Sonner-style \"Undo\") or underlined link. Clicking fires the callback and auto-dismisses.",
          "Cascading card stack — multiple toasts stack as empty card shells with progressive scaleX reduction and opacity fade. Up to 3 shells visible. Hover to expand fans out all toasts with content fading in and heights animating.",
          "Six positions (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right). Anchored edge pinned at fixed distance from screen edge. Enter/exit slide animations with opacity fade and scale-up.",
          "Auto-dismiss configurable per-provider (default 5s) and per-toast — pass Infinity to disable. Portal rendering via createPortal.",
          "Accessible: role=\"status\" + aria-live=\"polite\" on each toast, aria-hidden on stacked shells, aria-label=\"Dismiss\" on close button.",
        ],
      },
    ],
  },
  {
    version: "0.18.0",
    date: "March 2026",
    title: "Menu molecule & MultiSelect font scaling",
    items: [
      {
        label: "Menu",
        description:
          "New compound-component dropdown menu with portal rendering, 8-direction placement, and full WAI-ARIA keyboard navigation.",
        subItems: [
          "Compound API — Menu, MenuItem, MenuSeparator, and MenuGroup compose as JSX children.",
          "Portal rendering via createPortal escapes overflow: hidden ancestors. 8-direction placement with automatic viewport-edge flipping.",
          "Full WAI-ARIA Menu Button keyboard navigation (arrow keys, Enter/Space, Escape, Home/End). Outside-click and scroll dismissal.",
          "Scale + fade entrance/exit animations over 120ms.",
          "Selected state with trailing accent-colored checkmark. Danger items with danger-colored text and icon. Shortcut hints via shortcut prop. Disabled state.",
          "Three size variants (sm | md | lg) flow from the root Menu through context, with font sizes aligned to Button.",
        ],
      },
      {
        label: "MultiSelect dropdown font scaling",
        description:
          "Dropdown item text now scales with the size prop instead of being hardcoded to font-size-sm.",
        subItems: [
          "sm → font-size-sm, md → font-size-md, lg → font-size-lg.",
          "Placeholder/input font for lg corrected from font-size-md to font-size-lg.",
          "\"No options\" and \"Max N selected\" text scale proportionally.",
        ],
      },
    ],
  },
  {
    version: "0.17.0",
    date: "March 2026",
    title: "Button ultra-dense size & danger compound variants",
    items: [
      {
        label: "Button",
        description:
          "New 2xs size and two danger compound variants.",
        subItems: [
          "size=\"2xs\" — 22px height with space-1 padding and radius-md for dashboard toolbars, table-inline actions, and icon triggers where xs (26px) is still too tall.",
          "danger-outline — red border + red text on surface background for destructive actions that need visual weight without a filled background.",
          "danger-ghost — red text on transparent background, no border for low-emphasis destructive actions in list rows or dense UIs.",
        ],
      },
    ],
  },
  {
    version: "0.16.0",
    date: "March 2026",
    title: "Chrome theming, unified customizer & inverse NavLink",
    items: [
      {
        label: "PageLayout chrome theming",
        description:
          "New chromeBackground prop to visually distinguish chrome regions from the main content area.",
        subItems: [
          "Accepts \"bgBase\" | \"bgSubtle\" | \"surface\" for header, sidebar, and footer backgrounds.",
          "Outer wrapper background matches the chrome token, eliminating white gaps behind rounded content cards.",
          "Hidden scrollbars on all scrollable regions.",
        ],
      },
      {
        label: "Unified Design Customizer",
        description:
          "The dev preview's right sidebar rebuilt into a single unified customizer.",
        subItems: [
          "Quick-start presets (Modern / Enterprise / Playful), 12-palette picker.",
          "Anchor color pickers with live derived-variant dots. Accent cascading auto-derives bgBase and borderDefault.",
          "Layout sliders for radius, elevation, font scale, and spacing scale — all using Lucent UI components.",
        ],
      },
      {
        label: "NavLink inverse prop",
        description:
          "New inverse prop for sidebar navigation on tinted chrome.",
        subItems: [
          "Uses surface background with textPrimary instead of accent for the active state.",
          "Active inverse links render with border-default border, shadow-md elevation, and a 3px accent-colored right border indicator.",
        ],
      },
      {
        label: "ColorPicker size & inline",
        description:
          "New size and inline props for compact color picker layouts.",
        subItems: [
          "size prop (\"sm\" | \"md\") — sm renders a compact 24px swatch trigger.",
          "inline prop places the label beside the swatch.",
          "Popover now renders via createPortal to document.body, escaping overflow: hidden ancestors.",
        ],
      },
      {
        label: "SegmentedControl improvements",
        description:
          "Elevation-aware indicator with improved positioning and keyboard focus.",
        subItems: [
          "shadow-sm from the active shadow preset. Accurate positioning via getBoundingClientRect with ResizeObserver.",
          "Zero-padding track with 3px inset indicator.",
          "Focus ring only appears on keyboard navigation (:focus-visible), not mouse clicks.",
        ],
      },
      {
        label: "CSS variable fix",
        description:
          "--lucent-bg-base was incorrectly referenced as --lucent-bgBase (camelCase). Now uses the correct kebab-case form.",
      },
    ],
  },
  {
    version: "0.15.0",
    date: "March 2026",
    title: "Card elevation hierarchy & interactive props",
    items: [
      {
        label: "Card",
        description:
          "Five elevation variants, interactive props, status accents, and a media slot.",
        subItems: [
          "Five variant levels: ghost (transparent, no border), outline (default), filled (surfaceTint background), elevated (surface + border + shadow), combo (filled wrapper with elevated body inset).",
          "onClick renders as <button> with hover lift, focus ring, and active press. href renders as <a> with the same interactive states. disabled reduces opacity and blocks interaction.",
          "status prop (success | warning | danger | info) adds a 3px colored bar on the left edge.",
          "selected prop adds an outer accent-subtle ring and subtle background tint with aria-pressed.",
          "media prop renders full-bleed content at the top of the card (before header) with no padding.",
        ],
      },
      {
        label: "Token: surfaceTint",
        description:
          "New hue-matched shade of bgBase used by filled and combo card variants.",
        subItems: [
          "Derived automatically when bgBase is customized.",
          "surface is now auto-derived from bgBase and optional in ThemeAnchors.",
        ],
      },
      {
        label: "Shadow presets updated",
        description:
          "Subtle preset uses soft dual-layer shadows at ~60% opacity. Elevated preset uses wider blur radii (up to 32px) for more pronounced depth.",
      },
    ],
  },
  {
    version: "0.14.2",
    date: "March 2026",
    title: "Neutral text & control track colors",
    items: [
      {
        label: "Neutral text colors",
        description:
          "Text colors now stay neutral gray regardless of accent palette.",
        subItems: [
          "Removed textPrimary from all palette presets (#111827 light / #f3f4f6 dark).",
          "textPrimary is now optional in ThemeAnchors, falling through to the base theme default when omitted.",
        ],
      },
      {
        label: "controlTrack token",
        description:
          "New neutral gray background token for inactive control surfaces.",
        subItems: [
          "Light: #d1d5db, dark: derived from bgBase. Decoupled from borderDefault so it isn't affected by accent-tinted palette borders.",
          "Toggle off-state track now uses controlTrack instead of borderStrong.",
          "Slider unfilled and disabled tracks use controlTrack instead of borderDefault (WebKit and Firefox).",
        ],
      },
    ],
  },
  {
    version: "0.14.0",
    date: "March 2026",
    title: "Form field consistency & picker labels",
    items: [
      {
        label: "Form field consistency",
        description:
          "Textarea and Select sizing aligned with Input.",
        subItems: [
          "Textarea label font size is now size-aware (sm/md use font-size-sm, lg uses font-size-md). Horizontal padding aligned with Input.",
          "Select lg value font size corrected from font-size-lg to font-size-md to match Input.",
        ],
      },
      {
        label: "DatePicker / DateRangePicker",
        description:
          "Added label, helperText, and errorText props with full sizing consistency.",
        subItems: [
          "Fixed box-sizing from content-box to border-box so width no longer grows with padding.",
          "Horizontal padding and icon-to-text gap are now size-aware, matching Input/Select.",
          "Focus ring updated to border + boxShadow pattern matching Input/Select. Manifests updated with new props and aria-invalid.",
        ],
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
        label: "Chip",
        description:
          "New unified label primitive replacing Tag and Badge for filters, tags, statuses, and categories.",
        subItems: [
          "onDismiss for removable chips, onClick for clickable/selectable chips.",
          "swatch for color-coded categories, dot for status indicators, leftIcon for leading elements.",
          "borderless for a softer filled-only appearance. Three sizes (sm/md/lg) with six semantic variants.",
          "Heights scale with spacing tokens. Tag and Badge kept for backward compatibility.",
        ],
      },
      {
        label: "Contained Checkbox, Radio & Toggle",
        description:
          "New contained prop wraps controls in a bordered container with accent highlighting when checked.",
        subItems: [
          "Designed for plan selection cards, feature toggles, and consent items.",
          "helperText prop for secondary context below the label — label auto-upgrades to medium weight.",
          "Checkbox and Radio gain an lg size (20px). Toggle adds an align prop (left | right).",
        ],
      },
      {
        label: "Token-based heights",
        description:
          "All form control heights use dampened vertical scaling — height scales at 50% rate while horizontal padding scales fully.",
        subItems: [
          "calc(space-token × 0.5 + fixed) applied to Input, Select, Button, DatePicker, DateRangePicker, MultiSelect, Chip, and contained controls.",
          "Playground adds spacing, font size, and roundness sliders to visualise scaling in real time.",
        ],
      },
      {
        label: "MultiSelect enhancements",
        description:
          "Label, helperText, errorText props and improved dropdown scaling.",
        subItems: [
          "Focus ring now matches Input (boxShadow instead of outline).",
          "Dropdown padding follows a size × density matrix. Checkboxes match the MultiSelect's size.",
          "Selected values render as Chips instead of Tags.",
        ],
      },
      {
        label: "SearchInput & Textarea",
        description:
          "Label, helperText, and errorText passthrough plus size-aware scaling.",
        subItems: [
          "SearchInput search icon scales with size (14/18/20px).",
          "Textarea gains a size prop (sm/md/lg) with size-aware font and padding.",
          "Label and helper text font sizes now scale with component size across Input, Select, and MultiSelect.",
        ],
      },
      {
        label: "Input focus fix",
        description:
          "Fixed focus ring not appearing on SearchInput — {...rest} was spread after onFocus/onBlur handlers, overwriting them.",
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
          "New xs size (26px height, font-size-xs) for compact UIs like customizer panels and toolbars.",
      },
      {
        label: "Component filter",
        description:
          "ComponentPreview gains a search bar to filter sections by component name with a count of visible components.",
      },
      {
        label: "MultiSelect, DatePicker & Tag alignment",
        description:
          "Size prop and height/font alignment across picker components.",
        subItems: [
          "MultiSelect adds a size prop (sm/md/lg) with heights, font sizes, and border radius matching Input. Tags inside use the Tag atom with size-matched variants.",
          "DatePicker and DateRangePicker gain a size prop with full-width triggers and content-box sizing. DateRangePicker highlights the range in real time.",
          "Tag adds an lg size (28px), hover animation on dismissible tags, and respects the roundness setting.",
        ],
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
          "Select, Textarea, SearchInput, and Button sizing aligned across atoms.",
        subItems: [
          "Select refactored to wrapper-div architecture matching Input (fixes height mismatch). Proper disabled states.",
          "Textarea border radius aligned to radius-lg with hover border and smooth focus-ring transitions.",
          "SearchInput gains a size prop (sm/md/lg) passthrough to Input.",
          "Button heights aligned to match Input/Select at every size.",
        ],
      },
      {
        label: "Button overhaul",
        description:
          "New outline variant, interactive animations, and theme-aware states.",
        subItems: [
          "outline variant (bordered button); secondary is now a filled surface button.",
          "Hover animation with translateY(-1px) lift + accent-derived glow. Press state with translateY(1px) + accent ring.",
          "Theme-aware disabled state via color-mix (no accent tinting). Variant-aware focus ring.",
          "Primary border removed for a cleaner look.",
        ],
      },
      {
        label: "APCA contrast algorithm",
        description:
          "Replaced WCAG 2.1 luminance with APCA for accessible text contrast — correctly handles saturated blues/purples.",
        subItems: [
          "ensureContrast() nudges accent lightness until APCA Lc ≥ 60.",
          "LucentProvider auto-adjusts accentDefault so no accent color ever produces unreadable button text.",
          "New exports: apcaContrast, ensureContrast, getContrastRatio.",
        ],
      },
      {
        label: "6 new palette presets",
        description:
          "Trendy: violet, coral, teal, amber. Muted: slate, sage. Total palette count now 12.",
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
          "Curated presets for an instantly polished UI with zero manual configuration.",
        subItems: [
          "3 combined presets (modern, enterprise, playful) and 4 mixable dimensions: palette (6), shape (3), density (3), shadow (3).",
          "Full-atmosphere palettes tint bg, surface, and border colors toward the accent hue.",
          "Works with both light and dark themes automatically.",
        ],
      },
      {
        label: "npx lucent-ui init",
        description:
          "Interactive CLI that walks you through preset selection and writes a lucent.config.ts + provider snippet.",
      },
      {
        label: "MCP preset tools",
        description:
          "Two new MCP tools: list_presets discovers all available presets and dimensions, get_preset_config generates ready-to-use provider config.",
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
          "Fully-featured color selection popover.",
        subItems: [
          "Spectrum panel, hue/alpha sliders, four input formats (Hex, RGB, HSL, HSB).",
          "Eyedropper support and multi-group preset palettes switchable via dropdown.",
        ],
      },
      {
        label: "ColorSwatch",
        description:
          "Standalone color swatch atom with circle or square shape, six sizes (xs–2xl), selected state, and checkerboard background for transparent colors.",
      },
      {
        label: "SegmentedControl",
        description:
          "Pill-style toggle group with a smooth sliding selection indicator. Fills its container by default.",
      },
      {
        label: "Input — prefix, suffix, sizes",
        description:
          "Input now accepts prefix and suffix addons flush inside the field border, plus a size prop (sm / md / lg) for height and font control.",
      },
      {
        label: "Select — style prop consistency",
        description:
          "The style prop on Select now applies to the outer wrapper div, matching Input behavior.",
      },
      {
        label: "Breaking: ColorPicker presets API",
        description:
          "presets and presetsLabel props replaced by presetGroups: ColorPresetGroup[]. Single group hides the switcher, multiple groups show a dropdown.",
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
          "Generate a complete light/dark token set from a single accent hex — all surface, border, text, and semantic colors derived automatically.",
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

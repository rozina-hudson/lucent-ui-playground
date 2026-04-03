"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LucentProvider,
  useLucent,
  brandTokens,
  Button,
  Input,
  Textarea,
  Chip,
  Avatar,
  Spinner,
  Divider,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  Select,
  Tooltip,
  Icon,
  Text,
  FormField,
  SearchInput,
  Card,
  Alert,
  EmptyState,
  Skeleton,
} from "lucent-ui";
import type { LucentTokens, Theme } from "lucent-ui";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccentPreset = "default" | "gold" | "indigo";

const indigoTokens: Partial<LucentTokens> = {
  accentDefault: "#4f46e5",
  accentHover: "#4338ca",
  accentSubtle: "#eef2ff",
  accentBorder: "#4f46e5",
  accentFg: "#1e1b4b",
};

const accentLabel: Record<AccentPreset, string> = {
  default: "Default",
  gold: "Gold",
  indigo: "Indigo",
};

const SECTIONS = [
  { id: "text", label: "Text" },
  { id: "button", label: "Button" },
  { id: "formfield", label: "FormField" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
  { id: "select", label: "Select" },
  { id: "searchinput", label: "SearchInput" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio" },
  { id: "toggle", label: "Toggle" },
  { id: "chip", label: "Chip" },
  { id: "alert", label: "Alert" },
  { id: "card", label: "Card" },
  { id: "emptystate", label: "EmptyState" },
  { id: "skeleton", label: "Skeleton" },
  { id: "avatar", label: "Avatar" },
  { id: "spinner", label: "Spinner" },
  { id: "tooltip", label: "Tooltip" },
  { id: "icon", label: "Icon" },
  { id: "divider", label: "Divider" },
];

// ─── Shell colours — follow the theme toggle ───────────────────────────────────

type ShellColors = {
  bg: string; surface: string; border: string;
  text: string; muted: string; subtle: string;
  gold: string; goldBg: string; goldBorder: string;
};

function getShell(theme: Theme): ShellColors {
  if (theme === "dark") {
    return {
      bg: "#0a0a0a", surface: "#111111", border: "#1f1f1f",
      text: "#f5f5f5", muted: "#a3a3a3", subtle: "#525252",
      gold: "#e9c96b", goldBg: "#1a1a1a", goldBorder: "#2a2a1a",
    };
  }
  return {
    bg: "#ffffff", surface: "#f9fafb", border: "#e5e7eb",
    text: "#0a0a0a", muted: "#6b7280", subtle: "#9ca3af",
    gold: "#e9c96b", goldBg: "#fefce8", goldBorder: "#fde68a",
  };
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function ComponentGallery() {
  const [theme, setTheme] = useState<Theme>("light");
  const [accent, setAccent] = useState<AccentPreset>("default");

  const tokenOverrides =
    accent === "gold" ? brandTokens : accent === "indigo" ? indigoTokens : undefined;

  return (
    <LucentProvider theme={theme} tokens={tokenOverrides}>
      <GalleryShell
        theme={theme}
        accent={accent}
        onToggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        onSetAccent={setAccent}
      />
    </LucentProvider>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function GalleryShell({
  theme,
  accent,
  onToggleTheme,
  onSetAccent,
}: {
  theme: Theme;
  accent: AccentPreset;
  onToggleTheme: () => void;
  onSetAccent: (p: AccentPreset) => void;
}) {
  const { tokens } = useLucent();
  const shell = getShell(theme);

  return (
    <div style={{ background: shell.bg, color: shell.text, minHeight: "100vh" }}>
      {/* ── Top nav ── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 56,
          borderBottom: `1px solid ${shell.border}`,
          position: "sticky",
          top: 0,
          background: shell.bg,
          zIndex: 30,
          gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: shell.gold,
            textDecoration: "none",
            letterSpacing: "-0.01em",
            flexShrink: 0,
          }}
        >
          Lucent UI
        </Link>

        <span
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontSize: 12,
            color: shell.muted,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Components
        </span>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["default", "gold", "indigo"] as AccentPreset[]).map((p) => (
            <button
              key={p}
              onClick={() => onSetAccent(p)}
              style={{
                padding: "4px 12px",
                border: `1px solid ${accent === p ? shell.gold : shell.border}`,
                borderRadius: 6,
                background: accent === p ? shell.goldBg : "transparent",
                color: accent === p ? shell.gold : shell.muted,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 12,
                fontWeight: accent === p ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {accentLabel[p]}
            </button>
          ))}

          <div style={{ width: 1, height: 20, background: shell.border }} />

          <button
            onClick={onToggleTheme}
            style={{
              padding: "4px 12px",
              border: `1px solid ${shell.border}`,
              borderRadius: 6,
              background: "transparent",
              color: shell.muted,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: 12,
              cursor: "pointer",
              transition: "color 0.15s",
            }}
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
        </div>
      </header>

      {/* ── Two-column layout ── */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 200,
            flexShrink: 0,
            borderRight: `1px solid ${shell.border}`,
            position: "sticky",
            top: 56,
            height: "calc(100vh - 56px)",
            overflowY: "auto",
            padding: "24px 0",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: shell.subtle,
              padding: "0 20px",
              margin: "0 0 12px",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Components
          </p>
          <nav>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  display: "block",
                  padding: "6px 20px",
                  fontSize: 13,
                  color: shell.muted,
                  textDecoration: "none",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = shell.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = shell.muted)}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "40px 48px", maxWidth: 900 }}>
          <GalleryContent tokens={tokens} shell={shell} />
        </main>
      </div>
    </div>
  );
}

// ─── Gallery content ──────────────────────────────────────────────────────────

function GalleryContent({ tokens, shell }: { tokens: ReturnType<typeof useLucent>["tokens"]; shell: ShellColors }) {
  const [inputVal, setInputVal] = useState("");
  const [textareaVal, setTextareaVal] = useState("");
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState("option1");
  const [radioSize, setRadioSize] = useState("m");
  const [toggled, setToggled] = useState(false);
  const [selectVal, setSelectVal] = useState("");
  const [tags, setTags] = useState(["React", "TypeScript", "Design Systems"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertDismissed, setAlertDismissed] = useState(false);

  const allFruits = [
    "Apple", "Apricot", "Banana", "Blueberry", "Cherry",
    "Grape", "Mango", "Orange", "Peach", "Pear", "Pineapple", "Strawberry",
  ];
  const searchResults =
    searchQuery.length > 0
      ? allFruits
          .filter((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((f, i) => ({ id: i, label: f }))
      : [];

  return (
    <div>
      <Section id="text" title="Text" tokens={tokens} shell={shell}>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Text as="span" size="xs">xs</Text>
          <Text as="span" size="sm">sm</Text>
          <Text as="span" size="md">md (base)</Text>
          <Text as="span" size="lg">lg</Text>
          <Text as="span" size="xl">xl</Text>
          <Text as="span" size="2xl">2xl</Text>
          <Text as="span" size="3xl">3xl</Text>
        </Row>
        <Row label="Weights" tokens={tokens} shell={shell}>
          <Text as="span" weight="regular">Regular</Text>
          <Text as="span" weight="medium">Medium</Text>
          <Text as="span" weight="semibold">Semibold</Text>
          <Text as="span" weight="bold">Bold</Text>
        </Row>
        <Row label="Colors" tokens={tokens} shell={shell}>
          <Text as="span" color="primary">Primary</Text>
          <Text as="span" color="secondary">Secondary</Text>
          <Text as="span" color="disabled">Disabled</Text>
          <Text as="span" color="success">Success</Text>
          <Text as="span" color="warning">Warning</Text>
          <Text as="span" color="danger">Danger</Text>
          <Text as="span" color="info">Info</Text>
        </Row>
        <Row label="Family" tokens={tokens} shell={shell}>
          <Text as="span" size="sm">base — DM Sans</Text>
          <Text as="code" family="mono" size="sm">mono — const hello = &apos;world&apos;;</Text>
          <Text as="span" family="display" size="lg" weight="semibold">display — Unbounded</Text>
        </Row>
        <Row label="Truncate" tokens={tokens} shell={shell}>
          <Text as="span" truncate style={{ maxWidth: 200 }}>
            This text is truncated because it exceeds the max-width container
          </Text>
        </Row>
      </Section>

      <Section id="button" title="Button" tokens={tokens} shell={shell}>
        <Row label="Variants" tokens={tokens} shell={shell}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Row>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
        <Row label="States" tokens={tokens} shell={shell}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" chevron>Dropdown</Button>
          <Button variant="primary" fullWidth>Full width</Button>
        </Row>
      </Section>

      <Section id="formfield" title="FormField" tokens={tokens} shell={shell}>
        <Row label="Basic" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <FormField label="Email address" htmlFor="ff-email">
              <Input id="ff-email" type="email" placeholder="you@example.com" />
            </FormField>
          </div>
        </Row>
        <Row label="Required + helper" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <FormField label="Username" htmlFor="ff-user" required helperText="Letters and numbers only, 3–20 chars">
              <Input id="ff-user" placeholder="yourname" />
            </FormField>
          </div>
        </Row>
        <Row label="Error state" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <FormField label="Password" htmlFor="ff-pw" required errorMessage="Must be at least 8 characters">
              <Input id="ff-pw" type="password" defaultValue="short" />
            </FormField>
          </div>
        </Row>
      </Section>

      <Section id="input" title="Input" tokens={tokens} shell={shell}>
        <Row label="Default" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Input label="Email" type="email" placeholder="you@example.com" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          </div>
        </Row>
        <Row label="With helper" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Input label="Username" helperText="3–20 characters" placeholder="yourname" />
          </div>
        </Row>
        <Row label="Error state" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Input label="Password" type="password" errorText="Must be at least 8 characters" value="short" />
          </div>
        </Row>
      </Section>

      <Section id="textarea" title="Textarea" tokens={tokens} shell={shell}>
        <Row label="Auto-resize" tokens={tokens} shell={shell}>
          <div style={{ width: 320 }}>
            <Textarea label="Bio" autoResize placeholder="Tell us about yourself…" value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} />
          </div>
        </Row>
        <Row label="With character count" tokens={tokens} shell={shell}>
          <div style={{ width: 320 }}>
            <Textarea label="Tweet" maxLength={280} showCount value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)} />
          </div>
        </Row>
      </Section>

      <Section id="select" title="Select" tokens={tokens} shell={shell}>
        <Row label="Default" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Select
              label="Country"
              placeholder="Choose a country"
              options={[
                { value: "us", label: "United States" },
                { value: "gb", label: "United Kingdom" },
                { value: "ca", label: "Canada" },
                { value: "au", label: "Australia" },
              ]}
              value={selectVal}
              onChange={(e) => setSelectVal(e.target.value)}
            />
          </div>
        </Row>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} style={{ width: 180 }}>
              <Select size={s} options={[{ value: "a", label: `Size ${s}` }, { value: "b", label: "Option B" }]} defaultValue="a" />
            </div>
          ))}
        </Row>
        <Row label="Error state" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Select label="Role" placeholder="Select a role" options={[{ value: "admin", label: "Admin" }, { value: "member", label: "Member" }]} errorText="Please select a role" />
          </div>
        </Row>
      </Section>

      <Section id="searchinput" title="SearchInput" tokens={tokens} shell={shell}>
        <Row label="With results" tokens={tokens} shell={shell}>
          <div style={{ width: 320 }}>
            <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search fruits…" results={searchResults} onResultSelect={(r) => setSearchQuery(r.label)} />
          </div>
        </Row>
        <Row label="Loading" tokens={tokens} shell={shell}>
          <div style={{ width: 320 }}>
            <SearchInput value="pineapple" onChange={() => {}} isLoading />
          </div>
        </Row>
        <Row label="Disabled" tokens={tokens} shell={shell}>
          <div style={{ width: 320 }}>
            <SearchInput value="" onChange={() => {}} disabled placeholder="Search disabled…" />
          </div>
        </Row>
      </Section>

      <Section id="checkbox" title="Checkbox" tokens={tokens} shell={shell}>
        <Row label="States" tokens={tokens} shell={shell}>
          <Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled checked" disabled checked />
        </Row>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Checkbox size="sm" label="Small" defaultChecked />
          <Checkbox size="md" label="Medium" defaultChecked />
        </Row>
      </Section>

      <Section id="radio" title="Radio" tokens={tokens} shell={shell}>
        <Row label="Vertical group" tokens={tokens} shell={shell}>
          <RadioGroup name="plan" value={radio} onChange={setRadio}>
            <Radio value="option1" label="Free — up to 3 projects" />
            <Radio value="option2" label="Pro — unlimited projects" />
            <Radio value="option3" label="Enterprise — custom limits" />
          </RadioGroup>
        </Row>
        <Row label="Horizontal group" tokens={tokens} shell={shell}>
          <RadioGroup name="size-demo" value={radioSize} onChange={setRadioSize} orientation="horizontal">
            <Radio value="s" label="S" />
            <Radio value="m" label="M" />
            <Radio value="l" label="L" />
            <Radio value="xl" label="XL" />
          </RadioGroup>
        </Row>
        <Row label="Disabled" tokens={tokens} shell={shell}>
          <RadioGroup name="disabled-demo" value="a" onChange={() => {}} disabled>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        </Row>
      </Section>

      <Section id="toggle" title="Toggle" tokens={tokens} shell={shell}>
        <Row label="Controlled" tokens={tokens} shell={shell}>
          <Toggle label="Dark mode" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
        </Row>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Toggle size="sm" label="Small" defaultChecked />
          <Toggle size="md" label="Medium" defaultChecked />
          <Toggle size="lg" label="Large" defaultChecked />
        </Row>
        <Row label="Disabled" tokens={tokens} shell={shell}>
          <Toggle disabled label="Off" />
          <Toggle disabled defaultChecked label="On" />
        </Row>
      </Section>

      <Section id="chip" title="Chip" tokens={tokens} shell={shell}>
        <Row label="Dismissible" tokens={tokens} shell={shell}>
          {tags.map((t) => (
            <Chip key={t} onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))}>{t}</Chip>
          ))}
          {tags.length === 0 && <Text as="span" size="sm" color="secondary">All dismissed</Text>}
        </Row>
        <Row label="Variants" tokens={tokens} shell={shell}>
          <Chip variant="neutral">Neutral</Chip>
          <Chip variant="accent">Accent</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="danger">Danger</Chip>
          <Chip variant="info">Info</Chip>
        </Row>
        <Row label="Decorated" tokens={tokens} shell={shell}>
          <Chip swatch="#3b82f6">Design</Chip>
          <Chip dot variant="success">Online</Chip>
          <Chip leftIcon="🇺🇸">United States</Chip>
          <Chip borderless variant="accent">Borderless</Chip>
        </Row>
      </Section>

      <Section id="alert" title="Alert" tokens={tokens} shell={shell}>
        <Row label="Variants" tokens={tokens} shell={shell}>
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.space3, width: "100%" }}>
            <Alert variant="info" title="Did you know?">You can customize the accent color using token overrides.</Alert>
            <Alert variant="success" title="Changes saved">Your profile has been updated successfully.</Alert>
            <Alert variant="warning" title="Approaching limit">You&apos;ve used 80% of your monthly quota.</Alert>
            <Alert variant="danger" title="Payment failed" onDismiss={alertDismissed ? undefined : () => setAlertDismissed(true)}>
              {alertDismissed ? "Dismissed!" : "Check your card details and try again."}
            </Alert>
          </div>
        </Row>
        <Row label="Body only" tokens={tokens} shell={shell}>
          <Alert variant="info">Your session expires in 5 minutes.</Alert>
        </Row>
      </Section>

      <Section id="card" title="Card" tokens={tokens} shell={shell}>
        <Row label="Body only" tokens={tokens} shell={shell}>
          <Card style={{ width: 280 }}>
            <Text size="sm" color="secondary">A simple card with body content only.</Text>
          </Card>
        </Row>
        <Row label="Header + footer" tokens={tokens} shell={shell}>
          <Card
            style={{ width: 280 }}
            header={<Text family="display" weight="semibold">Card title</Text>}
            footer={
              <div style={{ display: "flex", justifyContent: "flex-end", gap: tokens.space2 }}>
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </div>
            }
          >
            <Text size="sm" color="secondary">Edit your profile information below.</Text>
          </Card>
        </Row>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Card padding="sm" shadow="none" radius="sm" style={{ width: 160 }}>
            <Text size="xs">sm padding, no shadow</Text>
          </Card>
          <Card padding="lg" shadow="lg" radius="lg" style={{ width: 160 }}>
            <Text size="xs">lg padding + shadow</Text>
          </Card>
        </Row>
      </Section>

      <Section id="emptystate" title="EmptyState" tokens={tokens} shell={shell}>
        <Row label="With illustration + CTA" tokens={tokens} shell={shell}>
          <Card style={{ width: 360 }}>
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
              description="Try adjusting your search or filters."
              action={<Button variant="secondary" size="sm">Clear filters</Button>}
            />
          </Card>
        </Row>
        <Row label="Minimal" tokens={tokens} shell={shell}>
          <Card style={{ width: 280 }}>
            <EmptyState title="Nothing here yet" />
          </Card>
        </Row>
      </Section>

      <Section id="skeleton" title="Skeleton" tokens={tokens} shell={shell}>
        <Row label="Text lines" tokens={tokens} shell={shell}>
          <div style={{ width: 280 }}>
            <Skeleton variant="text" lines={3} />
          </div>
        </Row>
        <Row label="Shapes" tokens={tokens} shell={shell}>
          <Skeleton variant="circle" width={40} height={40} />
          <Skeleton variant="rectangle" width={120} height={40} />
          <Skeleton variant="text" width={160} />
        </Row>
        <Row label="Card placeholder" tokens={tokens} shell={shell}>
          <Card style={{ width: 280 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: tokens.space3 }}>
              <Skeleton variant="rectangle" height={120} />
              <div style={{ display: "flex", gap: tokens.space2, alignItems: "center" }}>
                <Skeleton variant="circle" width={32} height={32} />
                <Skeleton variant="text" width="60%" />
              </div>
              <Skeleton variant="text" lines={2} />
            </div>
          </Card>
        </Row>
      </Section>

      <Section id="avatar" title="Avatar" tokens={tokens} shell={shell}>
        <Row label="With image" tokens={tokens} shell={shell}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Avatar key={s} src="https://i.pravatar.cc/150?img=5" alt="Jane Doe" size={s} />
          ))}
        </Row>
        <Row label="Initials fallback" tokens={tokens} shell={shell}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Avatar key={s} alt="Jane Doe" size={s} />
          ))}
        </Row>
      </Section>

      <Section id="spinner" title="Spinner" tokens={tokens} shell={shell}>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </Row>
      </Section>

      <Section id="tooltip" title="Tooltip" tokens={tokens} shell={shell}>
        <Row label="Placements" tokens={tokens} shell={shell}>
          <Tooltip content="Tooltip on top" placement="top">
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
          </Tooltip>
        </Row>
        <Row label="No delay" tokens={tokens} shell={shell}>
          <Tooltip content="Instant tooltip" delay={0}>
            <Button variant="ghost" size="sm">Hover me (instant)</Button>
          </Tooltip>
        </Row>
      </Section>

      <Section id="icon" title="Icon" tokens={tokens} shell={shell}>
        <Row label="Sizes" tokens={tokens} shell={shell}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Tooltip key={s} content={s} delay={0}>
              <Icon size={s} label={`${s} icon`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 8v4l3 3" />
                </svg>
              </Icon>
            </Tooltip>
          ))}
        </Row>
        <Row label="Coloured" tokens={tokens} shell={shell}>
          <Icon size="lg" color="var(--lucent-success-default)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          </Icon>
          <Icon size="lg" color="var(--lucent-danger-default)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><path d="M15 9l-6 6M9 9l6 6" /></svg>
          </Icon>
          <Icon size="lg" color="var(--lucent-warning-default)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1={12} y1={9} x2={12} y2={13} /><line x1={12} y1={17} x2="12.01" y2={17} /></svg>
          </Icon>
        </Row>
      </Section>

      <Section id="divider" title="Divider" tokens={tokens} shell={shell}>
        <Row label="Horizontal" tokens={tokens} shell={shell}>
          <div style={{ width: "100%" }}>
            <Text as="p" size="sm" color="secondary" style={{ margin: `0 0 ${tokens.space2}` }}>Content above</Text>
            <Divider />
            <Text as="p" size="sm" color="secondary" style={{ margin: `${tokens.space2} 0 0` }}>Content below</Text>
          </div>
        </Row>
        <Row label="With label" tokens={tokens} shell={shell}>
          <div style={{ width: "100%" }}>
            <Divider label="OR" />
          </div>
        </Row>
        <Row label="Vertical" tokens={tokens} shell={shell}>
          <div style={{ display: "flex", alignItems: "center", height: 32 }}>
            <Text as="span" size="sm" color="secondary">Home</Text>
            <Divider orientation="vertical" />
            <Text as="span" size="sm" color="secondary">About</Text>
            <Divider orientation="vertical" />
            <Text as="span" size="sm" color="secondary">Contact</Text>
          </div>
        </Row>
      </Section>
    </div>
  );
}

// ─── Section + Row primitives ─────────────────────────────────────────────────

function Section({
  id,
  title,
  tokens,
  shell,
  children,
}: {
  id: string;
  title: string;
  tokens: ReturnType<typeof useLucent>["tokens"];
  shell: ShellColors;
  children: React.ReactNode;
}) {
  return (
    <div id={id} style={{ marginBottom: 56, scrollMarginTop: 72 }}>
      {/* Section heading lives in the dark chrome */}
      <div style={{ marginBottom: 16, display: "flex", alignItems: "baseline", gap: 12 }}>
        <h2
          style={{
            fontFamily: "var(--font-unbounded), sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: shell.text,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, background: shell.border }} />
      </div>

      {/* Preview canvas — themed by LucentProvider */}
      <div
        style={{
          background: tokens.bgBase,
          border: `1px solid ${shell.border}`,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  tokens,
  children,
}: {
  label: string;
  tokens: ReturnType<typeof useLucent>["tokens"];
  shell: ShellColors;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "16px 24px",
        borderBottom: `1px solid ${tokens.borderDefault}`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: tokens.textSecondary,
          fontFamily: tokens.fontFamilyMono,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: tokens.space3, flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

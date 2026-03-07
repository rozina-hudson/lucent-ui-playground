"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SearchInput,
  Checkbox,
  Radio,
  RadioGroup,
  Toggle,
  Tag,
  Badge,
  FormField,
  Text,
  Icon,
  Divider,
  Spinner,
  Avatar,
  Skeleton,
  Alert,
  Card,
  EmptyState,
  Tooltip,
  useLucent,
  Breadcrumb,
  NavLink,
  DatePicker,
  DateRangePicker,
  MultiSelect,
  Tabs,
  Collapsible,
  CommandPalette,
  DataTable,
  FileUpload,
  PageLayout,
  Timeline,
} from "lucent-ui";
import type { UploadFile } from "lucent-ui";

// ─── Type ─────────────────────────────────────────────────────────────────────

type PreviewFC = React.FC;

// ─── Button ───────────────────────────────────────────────────────────────────

const ButtonVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
  </div>
);

const ButtonSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

const ButtonStates: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
    <Button variant="primary" chevron>Dropdown</Button>
    <div style={{ width: "100%" }}>
      <Button variant="primary" fullWidth>Full width</Button>
    </div>
  </div>
);

// ─── Input ────────────────────────────────────────────────────────────────────

const InputDefault: PreviewFC = () => {
  const [val, setVal] = useState("");
  return (
    <div style={{ width: 280 }}>
      <Input label="Email" type="email" placeholder="you@example.com" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
};

const InputHelper: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <Input label="Username" helperText="3–20 characters, letters and numbers only" placeholder="yourname" />
  </div>
);

const InputError: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <Input label="Password" type="password" errorText="Must be at least 8 characters" defaultValue="short" />
  </div>
);

// ─── Textarea ─────────────────────────────────────────────────────────────────

const TextareaAutoresize: PreviewFC = () => {
  const [val, setVal] = useState("");
  return (
    <div style={{ width: 320 }}>
      <Textarea label="Bio" autoResize placeholder="Tell us about yourself…" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
};

const TextareaCount: PreviewFC = () => {
  const [val, setVal] = useState("");
  return (
    <div style={{ width: 320 }}>
      <Textarea label="Tweet" maxLength={280} showCount placeholder="What's happening?" value={val} onChange={(e) => setVal(e.target.value)} />
    </div>
  );
};

// ─── Select ───────────────────────────────────────────────────────────────────

const SelectDefault: PreviewFC = () => {
  const [val, setVal] = useState("");
  return (
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
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>
  );
};

const SelectSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <div key={s} style={{ width: 160 }}>
        <Select size={s} options={[{ value: "a", label: `Size ${s}` }, { value: "b", label: "Option B" }]} defaultValue="a" />
      </div>
    ))}
  </div>
);

const SelectError: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <Select label="Role" placeholder="Select a role" options={[{ value: "admin", label: "Admin" }, { value: "member", label: "Member" }]} errorText="Please select a role" />
  </div>
);

// ─── SearchInput ──────────────────────────────────────────────────────────────

const allFruits = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Grape", "Mango", "Orange", "Peach", "Pear"];

const SearchInputResults: PreviewFC = () => {
  const [query, setQuery] = useState("");
  const results = query.length > 0
    ? allFruits.filter((f) => f.toLowerCase().includes(query.toLowerCase())).map((f, i) => ({ id: i, label: f }))
    : [];
  return (
    <div style={{ width: 320 }}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search fruits…" results={results} onResultSelect={(r) => setQuery(r.label)} />
    </div>
  );
};

const SearchInputLoading: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <SearchInput value="pineapple" onChange={() => {}} isLoading />
  </div>
);

const SearchInputDisabled: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <SearchInput value="" onChange={() => {}} disabled placeholder="Search disabled…" />
  </div>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const CheckboxStates: PreviewFC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Checkbox label="Accept terms" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" disabled checked />
    </div>
  );
};

const CheckboxSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Checkbox size="sm" label="Small" defaultChecked />
    <Checkbox size="md" label="Medium" defaultChecked />
  </div>
);

// ─── Radio ────────────────────────────────────────────────────────────────────

const RadioVertical: PreviewFC = () => {
  const [val, setVal] = useState("free");
  return (
    <RadioGroup name="plan-v" value={val} onChange={setVal}>
      <Radio value="free" label="Free — up to 3 projects" />
      <Radio value="pro" label="Pro — unlimited projects" />
      <Radio value="enterprise" label="Enterprise — custom limits" />
    </RadioGroup>
  );
};

const RadioHorizontal: PreviewFC = () => {
  const [val, setVal] = useState("m");
  return (
    <RadioGroup name="size-h" value={val} onChange={setVal} orientation="horizontal">
      <Radio value="s" label="S" />
      <Radio value="m" label="M" />
      <Radio value="l" label="L" />
      <Radio value="xl" label="XL" />
    </RadioGroup>
  );
};

const RadioDisabled: PreviewFC = () => (
  <RadioGroup name="disabled-r" value="a" onChange={() => {}} disabled>
    <Radio value="a" label="Option A" />
    <Radio value="b" label="Option B" />
  </RadioGroup>
);

// ─── Toggle ───────────────────────────────────────────────────────────────────

const ToggleControlled: PreviewFC = () => {
  const [on, setOn] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Toggle label="Dark mode" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <Text as="span" size="sm" color="secondary">{on ? "On" : "Off"}</Text>
    </div>
  );
};

const ToggleSizes: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <Toggle size="sm" label="Small" defaultChecked />
    <Toggle size="md" label="Medium" defaultChecked />
    <Toggle size="lg" label="Large" defaultChecked />
  </div>
);

const ToggleDisabled: PreviewFC = () => (
  <div style={{ display: "flex", gap: 20 }}>
    <Toggle disabled label="Off (disabled)" />
    <Toggle disabled defaultChecked label="On (disabled)" />
  </div>
);

// ─── Tag ──────────────────────────────────────────────────────────────────────

const TagDismissible: PreviewFC = () => {
  const [tags, setTags] = useState(["React", "TypeScript", "Design Systems"]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      {tags.map((t) => (
        <Tag key={t} onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))}>{t}</Tag>
      ))}
      {tags.length === 0 && <Text as="span" size="sm" color="secondary">All dismissed</Text>}
    </div>
  );
};

const TagVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    <Tag variant="neutral">Neutral</Tag>
    <Tag variant="accent">Accent</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="danger">Danger</Tag>
    <Tag variant="info">Info</Tag>
  </div>
);

const TagSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Tag size="sm">Small</Tag>
    <Tag size="md">Medium</Tag>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const BadgeVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="accent">Accent</Badge>
    <Badge variant="success" dot>Active</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">12</Badge>
    <Badge variant="info">Beta</Badge>
  </div>
);

const BadgeSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <Badge size="sm" variant="success">Small</Badge>
    <Badge size="md" variant="success">Medium</Badge>
  </div>
);

// ─── FormField ────────────────────────────────────────────────────────────────

const FormFieldBasic: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <FormField label="Email address" htmlFor="ff-email">
      <Input id="ff-email" type="email" placeholder="you@example.com" />
    </FormField>
  </div>
);

const FormFieldRequired: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <FormField label="Username" htmlFor="ff-user" required helperText="Letters and numbers only, 3–20 chars">
      <Input id="ff-user" placeholder="yourname" />
    </FormField>
  </div>
);

const FormFieldError: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <FormField label="Password" htmlFor="ff-pw" required errorMessage="Must be at least 8 characters">
      <Input id="ff-pw" type="password" defaultValue="short" />
    </FormField>
  </div>
);

// ─── Text ─────────────────────────────────────────────────────────────────────

const TextSizes: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const).map((s) => (
      <Text key={s} as="span" size={s}>{s} — The quick brown fox</Text>
    ))}
  </div>
);

const TextWeights: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <Text as="span" weight="regular" size="lg">Regular — The quick brown fox</Text>
    <Text as="span" weight="medium" size="lg">Medium — The quick brown fox</Text>
    <Text as="span" weight="semibold" size="lg">Semibold — The quick brown fox</Text>
    <Text as="span" weight="bold" size="lg">Bold — The quick brown fox</Text>
  </div>
);

const TextColors: PreviewFC = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
    <Text as="span" color="primary">Primary</Text>
    <Text as="span" color="secondary">Secondary</Text>
    <Text as="span" color="disabled">Disabled</Text>
    <Text as="span" color="success">Success</Text>
    <Text as="span" color="warning">Warning</Text>
    <Text as="span" color="danger">Danger</Text>
    <Text as="span" color="info">Info</Text>
  </div>
);

// ─── Icon ─────────────────────────────────────────────────────────────────────

const ClockSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={10} />
    <path d="M12 8v4l3 3" />
  </svg>
);

const IconSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
      <Tooltip key={s} content={s} delay={0}>
        <Icon size={s} label={`${s} icon`}><ClockSvg /></Icon>
      </Tooltip>
    ))}
  </div>
);

const IconColored: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Icon size="lg" color="var(--lucent-success-default)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
    </Icon>
    <Icon size="lg" color="var(--lucent-danger-default)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10} /><path d="M15 9l-6 6M9 9l6 6" /></svg>
    </Icon>
    <Icon size="lg" color="var(--lucent-warning-default)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1={12} y1={9} x2={12} y2={13} /><line x1={12} y1={17} x2="12.01" y2={17} /></svg>
    </Icon>
  </div>
);

// ─── Divider ──────────────────────────────────────────────────────────────────

const DividerHorizontal: PreviewFC = () => {
  const { tokens } = useLucent();
  return (
    <div style={{ width: "100%" }}>
      <Text as="p" size="sm" color="secondary" style={{ margin: `0 0 ${tokens.space2}` }}>Content above</Text>
      <Divider />
      <Text as="p" size="sm" color="secondary" style={{ margin: `${tokens.space2} 0 0` }}>Content below</Text>
    </div>
  );
};

const DividerLabeled: PreviewFC = () => (
  <div style={{ width: "100%" }}>
    <Divider label="OR" />
  </div>
);

const DividerVertical: PreviewFC = () => (
  <div style={{ display: "flex", alignItems: "center", height: 32 }}>
    <Text as="span" size="sm" color="secondary">Home</Text>
    <Divider orientation="vertical" />
    <Text as="span" size="sm" color="secondary">About</Text>
    <Divider orientation="vertical" />
    <Text as="span" size="sm" color="secondary">Contact</Text>
  </div>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────

const SpinnerSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </div>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AvatarImage: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
      <Avatar key={s} src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size={s} />
    ))}
  </div>
);

const AvatarInitials: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
      <Avatar key={s} alt="Jane Doe" size={s} />
    ))}
  </div>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonText: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <Skeleton variant="text" lines={3} />
  </div>
);

const SkeletonShapes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <Skeleton variant="circle" width={40} height={40} />
    <Skeleton variant="rectangle" width={120} height={40} />
    <Skeleton variant="text" width={160} />
  </div>
);

const SkeletonCard: PreviewFC = () => {
  const { tokens } = useLucent();
  return (
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
  );
};

// ─── Alert ────────────────────────────────────────────────────────────────────

const AlertVariants: PreviewFC = () => {
  const { tokens } = useLucent();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: tokens.space3, width: "100%" }}>
      <Alert variant="info" title="Did you know?">You can customise the accent colour via token overrides.</Alert>
      <Alert variant="success" title="Changes saved">Your profile has been updated successfully.</Alert>
      <Alert variant="warning" title="Approaching limit">You&apos;ve used 80% of your monthly quota.</Alert>
      <Alert variant="danger" title="Payment failed">Check your card details and try again.</Alert>
    </div>
  );
};

const AlertBody: PreviewFC = () => (
  <Alert variant="info">Your session expires in 5 minutes.</Alert>
);

const AlertDismissible: PreviewFC = () => {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Alert variant="danger" title="Payment failed" onDismiss={() => setVisible(false)}>
      Check your card details and try again.
    </Alert>
  ) : (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Text as="span" size="sm" color="secondary">Alert dismissed.</Text>
      <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>Reset</Button>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const CardBody: PreviewFC = () => (
  <Card style={{ width: 280 }}>
    <Text size="sm" color="secondary">A simple card with body content only.</Text>
  </Card>
);

const CardHeaderFooter: PreviewFC = () => {
  const { tokens } = useLucent();
  return (
    <Card
      style={{ width: 300 }}
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
  );
};

const CardSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
    <Card padding="sm" shadow="none" radius="sm" style={{ width: 160 }}>
      <Text size="xs">sm padding, no shadow</Text>
    </Card>
    <Card padding="lg" shadow="lg" radius="lg" style={{ width: 160 }}>
      <Text size="xs">lg padding + shadow</Text>
    </Card>
  </div>
);

// ─── EmptyState ───────────────────────────────────────────────────────────────

const EmptyStateFull: PreviewFC = () => (
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
);

const EmptyStateMinimal: PreviewFC = () => (
  <Card style={{ width: 280 }}>
    <EmptyState title="Nothing here yet" />
  </Card>
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────

const TooltipPlacements: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
  </div>
);

const TooltipNoDelay: PreviewFC = () => (
  <Tooltip content="Instant tooltip" delay={0}>
    <Button variant="ghost" size="sm">Hover me (instant)</Button>
  </Tooltip>
);

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

const BreadcrumbBasic: PreviewFC = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Breadcrumb" },
    ]}
  />
);

const BreadcrumbSeparator: PreviewFC = () => (
  <Breadcrumb
    separator="›"
    items={[
      { label: "Dashboard", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ]}
  />
);

// ─── NavLink ──────────────────────────────────────────────────────────────────

const NavLinkStates: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <NavLink href="#">Home</NavLink>
    <NavLink href="#" isActive>Dashboard</NavLink>
    <NavLink href="#" disabled>Admin</NavLink>
  </div>
);

const NavLinkSidebar: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 200 }}>
    <NavLink href="#" isActive>Dashboard</NavLink>
    <NavLink href="#">Components</NavLink>
    <NavLink href="#">Settings</NavLink>
  </div>
);

// ─── DatePicker ───────────────────────────────────────────────────────────────

const DatePickerControlled: PreviewFC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div style={{ width: 280 }}>
      <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
    </div>
  );
};

const DatePickerConstrained: PreviewFC = () => (
  <div style={{ width: 280 }}>
    <DatePicker
      defaultValue={new Date("2025-06-15")}
      min={new Date("2025-01-01")}
      max={new Date("2025-12-31")}
      placeholder="Select a 2025 date"
    />
  </div>
);

// ─── DateRangePicker ──────────────────────────────────────────────────────────

const DateRangePickerControlled: PreviewFC = () => {
  const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);
  return (
    <div style={{ width: 320 }}>
      <DateRangePicker value={range} onChange={setRange} placeholder="Select date range" />
    </div>
  );
};

const DateRangePickerDisabled: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <DateRangePicker disabled placeholder="Unavailable" />
  </div>
);

// ─── MultiSelect ──────────────────────────────────────────────────────────────

const MultiSelectControlled: PreviewFC = () => {
  const [values, setValues] = useState<string[]>(["react"]);
  return (
    <div style={{ width: 300 }}>
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
      />
    </div>
  );
};

const MultiSelectMax: PreviewFC = () => (
  <div style={{ width: 300 }}>
    <MultiSelect
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
        { value: "d", label: "Option D" },
      ]}
      defaultValue={["a"]}
      max={2}
      placeholder="Pick up to 2"
    />
  </div>
);

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TabsBasic: PreviewFC = () => (
  <Tabs
    defaultValue="overview"
    tabs={[
      { value: "overview", label: "Overview", content: <Text>Overview content here.</Text> },
      { value: "details", label: "Details", content: <Text>Details content here.</Text> },
      { value: "settings", label: "Settings", content: <Text>Settings content here.</Text> },
    ]}
  />
);

const TabsDisabled: PreviewFC = () => (
  <Tabs
    defaultValue="active"
    tabs={[
      { value: "active", label: "Active", content: <Text>Active panel.</Text> },
      { value: "preview", label: "Preview", content: <Text>Preview panel.</Text> },
      { value: "locked", label: "Locked", content: <Text>Locked.</Text>, disabled: true },
    ]}
  />
);

// ─── Collapsible ──────────────────────────────────────────────────────────────

const CollapsibleBasic: PreviewFC = () => (
  <div style={{ width: 360 }}>
    <Collapsible trigger="Show advanced options">
      <Text color="secondary">Hidden until expanded. Place any content here.</Text>
    </Collapsible>
  </div>
);

const CollapsibleOpen: PreviewFC = () => (
  <div style={{ width: 360 }}>
    <Collapsible trigger="Release notes" defaultOpen>
      <Text>v0.4.0 — Added Tabs, Collapsible, DataTable, and more.</Text>
    </Collapsible>
  </div>
);

// ─── CommandPalette ───────────────────────────────────────────────────────────

const CommandPaletteGroups: PreviewFC = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
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
    </div>
  );
};

// ─── DataTable ────────────────────────────────────────────────────────────────

const DataTableBasic: PreviewFC = () => (
  <DataTable
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
  />
);

const DataTableEmpty: PreviewFC = () => (
  <DataTable
    columns={[
      { key: "name", header: "Name" },
      { key: "role", header: "Role" },
    ]}
    rows={[]}
    emptyState={<Text color="secondary">No results found.</Text>}
  />
);

// ─── FileUpload ───────────────────────────────────────────────────────────────

const FileUploadImages: PreviewFC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  return (
    <FileUpload
      value={files}
      onChange={setFiles}
      accept="image/*"
      multiple
      maxSize={5 * 1024 * 1024}
    />
  );
};

const FileUploadDisabled: PreviewFC = () => (
  <FileUpload value={[]} onChange={() => {}} disabled />
);

// ─── PageLayout ───────────────────────────────────────────────────────────────

const PageLayoutFull: PreviewFC = () => (
  <PageLayout
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
  </PageLayout>
);

const PageLayoutCollapsed: PreviewFC = () => (
  <PageLayout
    header={<Text weight="semibold">My App</Text>}
    sidebar={<NavLink href="#">Dashboard</NavLink>}
    sidebarCollapsed
    style={{ height: 300 }}
  >
    <Text>Full-width content when sidebar is hidden.</Text>
  </PageLayout>
);

const PageLayoutRightSidebar: PreviewFC = () => (
  <PageLayout
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
  </PageLayout>
);

// ─── Timeline ─────────────────────────────────────────────────────────────────

const TimelineStatuses: PreviewFC = () => (
  <Timeline
    items={[
      { id: "1", title: "Deployed to production", date: "Mar 1", status: "success" },
      { id: "2", title: "Build running", date: "Mar 1", status: "info" },
      { id: "3", title: "Tests warning", date: "Feb 28", status: "warning" },
      { id: "4", title: "Deploy failed", date: "Feb 27", status: "danger" },
    ]}
  />
);

const TimelineDescriptions: PreviewFC = () => (
  <Timeline
    items={[
      { id: "1", title: "Account created", description: "Welcome to the platform!", date: "Jan 10", status: "success" },
      { id: "2", title: "Profile updated", description: "Added avatar and bio.", date: "Jan 12" },
      { id: "3", title: "First project", description: "Created project 'Lucent UI'.", date: "Jan 15", status: "info" },
    ]}
  />
);

// ─── Registry ─────────────────────────────────────────────────────────────────

export const componentPreviews: Record<string, PreviewFC> = {
  // Button
  "button-variants": ButtonVariants,
  "button-sizes": ButtonSizes,
  "button-states": ButtonStates,
  // Input
  "input-default": InputDefault,
  "input-helper": InputHelper,
  "input-error": InputError,
  // Textarea
  "textarea-autoresize": TextareaAutoresize,
  "textarea-count": TextareaCount,
  // Select
  "select-default": SelectDefault,
  "select-sizes": SelectSizes,
  "select-error": SelectError,
  // SearchInput
  "searchinput-results": SearchInputResults,
  "searchinput-loading": SearchInputLoading,
  "searchinput-disabled": SearchInputDisabled,
  // Checkbox
  "checkbox-states": CheckboxStates,
  "checkbox-sizes": CheckboxSizes,
  // Radio
  "radio-vertical": RadioVertical,
  "radio-horizontal": RadioHorizontal,
  "radio-disabled": RadioDisabled,
  // Toggle
  "toggle-controlled": ToggleControlled,
  "toggle-sizes": ToggleSizes,
  "toggle-disabled": ToggleDisabled,
  // Tag
  "tag-dismissible": TagDismissible,
  "tag-variants": TagVariants,
  "tag-sizes": TagSizes,
  // Badge
  "badge-variants": BadgeVariants,
  "badge-sizes": BadgeSizes,
  // FormField
  "formfield-basic": FormFieldBasic,
  "formfield-required": FormFieldRequired,
  "formfield-error": FormFieldError,
  // Text
  "text-sizes": TextSizes,
  "text-weights": TextWeights,
  "text-colors": TextColors,
  // Icon
  "icon-sizes": IconSizes,
  "icon-colored": IconColored,
  // Divider
  "divider-horizontal": DividerHorizontal,
  "divider-labeled": DividerLabeled,
  "divider-vertical": DividerVertical,
  // Spinner
  "spinner-sizes": SpinnerSizes,
  // Avatar
  "avatar-image": AvatarImage,
  "avatar-initials": AvatarInitials,
  // Skeleton
  "skeleton-text": SkeletonText,
  "skeleton-shapes": SkeletonShapes,
  "skeleton-card": SkeletonCard,
  // Alert
  "alert-variants": AlertVariants,
  "alert-body": AlertBody,
  "alert-dismissible": AlertDismissible,
  // Card
  "card-body": CardBody,
  "card-header-footer": CardHeaderFooter,
  "card-sizes": CardSizes,
  // EmptyState
  "emptystate-full": EmptyStateFull,
  "emptystate-minimal": EmptyStateMinimal,
  // Tooltip
  "tooltip-placements": TooltipPlacements,
  "tooltip-nodelay": TooltipNoDelay,
  // Breadcrumb
  "breadcrumb-basic": BreadcrumbBasic,
  "breadcrumb-separator": BreadcrumbSeparator,
  // NavLink
  "navlink-states": NavLinkStates,
  "navlink-sidebar": NavLinkSidebar,
  // DatePicker
  "datepicker-controlled": DatePickerControlled,
  "datepicker-constrained": DatePickerConstrained,
  // DateRangePicker
  "daterangepicker-controlled": DateRangePickerControlled,
  "daterangepicker-disabled": DateRangePickerDisabled,
  // MultiSelect
  "multiselect-controlled": MultiSelectControlled,
  "multiselect-max": MultiSelectMax,
  // Tabs
  "tabs-basic": TabsBasic,
  "tabs-disabled": TabsDisabled,
  // Collapsible
  "collapsible-basic": CollapsibleBasic,
  "collapsible-open": CollapsibleOpen,
  // CommandPalette
  "commandpalette-groups": CommandPaletteGroups,
  // DataTable
  "datatable-basic": DataTableBasic,
  "datatable-empty": DataTableEmpty,
  // FileUpload
  "fileupload-images": FileUploadImages,
  "fileupload-disabled": FileUploadDisabled,
  // PageLayout
  "pagelayout-full": PageLayoutFull,
  "pagelayout-collapsed": PageLayoutCollapsed,
  "pagelayout-right-sidebar": PageLayoutRightSidebar,
  // Timeline
  "timeline-statuses": TimelineStatuses,
  "timeline-descriptions": TimelineDescriptions,
};

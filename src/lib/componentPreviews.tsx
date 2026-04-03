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
  Slider,
  CodeBlock,
  Table,
  ColorPicker,
  ColorSwatch,
  SegmentedControl,
  CardBleed,
  Chip,
  Menu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  ToastProvider,
  useToast,
  Stack,
  Row,
  Progress,
  SplitButton,
  ButtonGroup,
  NavMenu,
  FilterMultiSelect,
  FilterSearch,
  FilterSelect,
  FilterDateRange,
  Stepper,
} from "lucent-ui";
import type { UploadFile } from "lucent-ui";

// ─── Type ─────────────────────────────────────────────────────────────────────

type PreviewFC = React.FC;

// ─── Button ───────────────────────────────────────────────────────────────────

const ButtonVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="danger-outline">Danger outline</Button>
    <Button variant="danger-ghost">Danger ghost</Button>
  </div>
);

const ButtonSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <Button size="2xs">2XS</Button>
    <Button size="xs">Extra small</Button>
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

const TextareaSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <div key={s} style={{ width: 220 }}>
        <Textarea size={s} label={`Size ${s}`} placeholder={`${s} textarea`} />
      </div>
    ))}
  </div>
);

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

const SearchInputLabeled: PreviewFC = () => {
  const [query, setQuery] = useState("");
  return (
    <div style={{ width: 320 }}>
      <SearchInput
        label="Search products"
        helperText="Type at least 2 characters"
        value={query}
        onChange={setQuery}
        placeholder="Search…"
      />
    </div>
  );
};

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
    <Checkbox size="lg" label="Large" defaultChecked />
  </div>
);

const CheckboxContained: PreviewFC = () => {
  const [plan, setPlan] = useState("pro");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 300 }}>
      <Checkbox
        contained
        label="Free"
        helperText="Up to 3 projects"
        checked={plan === "free"}
        onChange={() => setPlan("free")}
      />
      <Checkbox
        contained
        label="Pro"
        helperText="Unlimited projects"
        checked={plan === "pro"}
        onChange={() => setPlan("pro")}
      />
      <Checkbox
        contained
        label="Enterprise"
        helperText="Custom limits & SSO"
        checked={plan === "enterprise"}
        onChange={() => setPlan("enterprise")}
      />
    </div>
  );
};

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

const RadioContained: PreviewFC = () => {
  const [val, setVal] = useState("pro");
  return (
    <RadioGroup name="plan-c" value={val} onChange={setVal}>
      <Radio value="free" label="Free" helperText="Up to 3 projects" contained />
      <Radio value="pro" label="Pro" helperText="Unlimited projects" contained />
      <Radio value="enterprise" label="Enterprise" helperText="Custom limits & SSO" contained />
    </RadioGroup>
  );
};

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

const ToggleContained: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
    <Toggle contained label="Email notifications" helperText="Receive updates via email" defaultChecked />
    <Toggle contained label="Push notifications" helperText="Get notified on your device" />
    <Toggle contained label="Marketing emails" helperText="Occasional product news" align="right" />
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

const CardVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
    {(["ghost", "outline", "filled", "elevated"] as const).map((v) => (
      <Card key={v} variant={v} style={{ width: 150 }}>
        <Text size="xs" weight="medium">{v}</Text>
      </Card>
    ))}
    <Card
      variant="combo"
      style={{ width: 150 }}
      header={<Text size="xs" weight="semibold">combo</Text>}
      footer={<Text size="xs" color="secondary">Footer</Text>}
    >
      <Text size="xs" color="secondary">Body pops</Text>
    </Card>
  </div>
);

const CardHeaderFooter: PreviewFC = () => {
  const { tokens } = useLucent();
  return (
    <Card
      variant="elevated"
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

const CardInteractive: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Card variant="elevated" onClick={() => {}} style={{ width: 180 }}>
      <Text weight="semibold" size="sm">Click me</Text>
      <Text size="xs" color="secondary">Hover lift + active press.</Text>
    </Card>
    <Card variant="elevated" disabled onClick={() => {}} style={{ width: 180 }}>
      <Text weight="semibold" size="sm">Disabled</Text>
      <Text size="xs" color="secondary">No interaction allowed.</Text>
    </Card>
  </div>
);

const CardStatus: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    {(["success", "warning", "danger", "info"] as const).map((s) => (
      <Card key={s} status={s} style={{ width: 130 }}>
        <Text size="xs" weight="medium">{s}</Text>
      </Card>
    ))}
  </div>
);

const CardSelectedMedia: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "start" }}>
    <Card
      media={
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=520&h=240&fit=crop"
          alt="Mountain landscape"
          style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
        />
      }
      style={{ width: 240 }}
    >
      <Text weight="semibold" size="sm">Media card</Text>
      <Text size="xs" color="secondary">Full-bleed image at the top.</Text>
    </Card>
    <Card selected onClick={() => {}} style={{ width: 240 }}>
      <Text weight="semibold" size="sm">Selected card</Text>
      <Text size="xs" color="secondary">Accent ring indicates selection.</Text>
    </Card>
  </div>
);

const CardBleedExample: PreviewFC = () => (
  <Card style={{ width: 300 }}>
    <Text weight="semibold">Settings</Text>
    <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)", marginTop: 12 }}>
      <Text size="sm" color="secondary">This row stretches to the card edges.</Text>
    </CardBleed>
    <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)" }}>
      <Text size="sm" color="secondary">Another full-width row.</Text>
    </CardBleed>
  </Card>
);

const CardHoverable: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
    <Card hoverable variant="elevated" style={{ width: 200 }}>
      <Text weight="semibold" size="sm">Hoverable card</Text>
      <Text size="xs" color="secondary">
        Lift and glow on hover, but not a button or link.
      </Text>
    </Card>
    <Card hoverable variant="filled" style={{ width: 200 }}>
      <Text weight="semibold" size="sm">Filled hoverable</Text>
      <Text size="xs" color="secondary">
        Neutral glow (12% text-primary).
      </Text>
    </Card>
  </div>
);

const CardCollapsibleRecipe: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
    {(["ghost", "outline", "filled", "elevated", "combo"] as const).map((v) => (
      <Card key={v} variant={v} hoverable style={{ width: 200 }}>
        <Collapsible trigger={v}>
          <Text size="xs" color="secondary">
            Expanded content inside a {v} card.
          </Text>
        </Collapsible>
      </Card>
    ))}
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

const NavLinkInverse: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 200 }}>
    <NavLink href="#" isActive inverse>Dashboard</NavLink>
    <NavLink href="#" inverse>Components</NavLink>
    <NavLink href="#" inverse>Settings</NavLink>
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

const DatePickerLabeled: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
    <div style={{ width: 280 }}>
      <DatePicker
        label="Start date"
        helperText="When should the project begin?"
        placeholder="Pick a date"
      />
    </div>
    <div style={{ width: 280 }}>
      <DatePicker
        label="Deadline"
        errorText="A deadline is required"
        placeholder="Pick a date"
      />
    </div>
  </div>
);

const DatePickerSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <div key={s} style={{ width: 200 }}>
        <DatePicker size={s} placeholder={`Size ${s}`} />
      </div>
    ))}
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

const DateRangePickerLabeled: PreviewFC = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
    <div style={{ width: 320 }}>
      <DateRangePicker
        label="Trip dates"
        helperText="Select your check-in and check-out dates"
        placeholder="Select date range"
      />
    </div>
    <div style={{ width: 320 }}>
      <DateRangePicker
        label="Booking period"
        errorText="Please select a valid date range"
        placeholder="Select date range"
      />
    </div>
  </div>
);

const DateRangePickerDisabled: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <DateRangePicker disabled placeholder="Unavailable" />
  </div>
);

const DateRangePickerSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <div key={s} style={{ width: 240 }}>
        <DateRangePicker size={s} placeholder={`Size ${s}`} />
      </div>
    ))}
  </div>
);

const DateRangePickerTrigger: PreviewFC = () => (
  <DateRangePicker
    trigger={<Button variant="secondary" size="sm">Date range</Button>}
  />
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

const MultiSelectLabeled: PreviewFC = () => {
  const [values, setValues] = useState<string[]>([]);
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Technologies"
        helperText="Select the frameworks you use"
        size="md"
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

// ─── FilterSearch ─────────────────────────────────────────────────────────────

const FilterSearchDefault: PreviewFC = () => (
  <FilterSearch placeholder="Search items..." />
);

const FilterSearchSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <FilterSearch size="sm" placeholder="Small" />
    <FilterSearch size="md" placeholder="Medium" />
    <FilterSearch size="lg" placeholder="Large" />
  </div>
);

// ─── FilterSelect ─────────────────────────────────────────────────────────────

const filterSelectOpts = [
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
  { value: "preorder", label: "Pre-order" },
];

const FilterSelectDefault: PreviewFC = () => (
  <FilterSelect label="Availability" options={filterSelectOpts} />
);

const FilterSelectSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <FilterSelect key={s} size={s} label={s.toUpperCase()} options={filterSelectOpts} />
    ))}
  </div>
);

// ─── FilterMultiSelect ────────────────────────────────────────────────────────

const filterOpts = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const FilterMultiSelectSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    {(["xs", "sm", "md", "lg"] as const).map((s) => (
      <FilterMultiSelect key={s} size={s} label={s.toUpperCase()} options={filterOpts} />
    ))}
  </div>
);

const FilterMultiSelectGhost: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    <FilterMultiSelect variant="ghost" label="Status" options={filterOpts} />
    <FilterMultiSelect variant="ghost" label="Priority" options={[
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ]} />
  </div>
);

const FilterMultiSelectCompact: PreviewFC = () => (
  <FilterMultiSelect size="xs" label="Filter" options={filterOpts} />
);

// ─── FilterDateRange ──────────────────────────────────────────────────────────

const FilterDateRangeDefault: PreviewFC = () => (
  <FilterDateRange label="Date range" />
);

const FilterDateRangeSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
    {(["sm", "md", "lg"] as const).map((s) => (
      <FilterDateRange key={s} size={s} label={s.toUpperCase()} />
    ))}
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

const TabsOverflow: PreviewFC = () => (
  <div style={{ width: 260 }}>
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
  </div>
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

const CollapsibleDisabled: PreviewFC = () => (
  <div style={{ width: 360 }}>
    <Collapsible trigger="Locked section" disabled>
      <Text color="secondary">This content cannot be revealed.</Text>
    </Collapsible>
  </div>
);

const CollapsibleCardRecipe: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "start" }}>
    <Card variant="elevated" hoverable style={{ width: 260 }}>
      <Collapsible trigger="Expand details">
        <Text size="sm" color="secondary">
          Content inside a hoverable card.
        </Text>
      </Collapsible>
    </Card>
    <Card variant="filled" hoverable style={{ width: 260 }}>
      <Collapsible trigger="Filled variant">
        <Text size="sm" color="secondary">
          Works with any card variant.
        </Text>
      </Collapsible>
    </Card>
  </div>
);

// ─── Stepper ──────────────────────────────────────────────────────────────────

const StepperHorizontal: PreviewFC = () => (
  <Stepper
    steps={["Account", "Profile", "Review", "Confirm"]}
    current={2}
  />
);

const StepperVertical: PreviewFC = () => (
  <Stepper
    orientation="vertical"
    steps={[
      { label: "Create account", description: "Enter your email and password" },
      { label: "Personal info", description: "Name, avatar, and bio" },
      { label: "Preferences", description: "Notification and display settings" },
    ]}
    current={1}
  />
);

const StepperStatus: PreviewFC = () => (
  <Stepper
    steps={["Setup", "Configure", "Deploy"]}
    current={1}
    showStatus
  />
);

// ─── Pattern Previews ────────────────────────────────────────────────────────

const RecipeProfileCard: PreviewFC = () => (
  <Card variant="elevated" style={{ width: 320 }}>
    <Stack gap="4">
      <Row gap="4">
        <Avatar size="md" alt="Jane Doe" />
        <Stack gap="1">
          <Row gap="2" align="center">
            <Text size="lg" weight="bold" family="display">Jane Doe</Text>
            <Chip variant="success" dot size="sm">Pro</Chip>
          </Row>
          <Text size="sm" color="secondary">Product Designer</Text>
        </Stack>
      </Row>
      <Text size="sm" color="secondary">
        Crafting intuitive experiences for complex products. Passionate about design systems and accessibility.
      </Text>
      <Row gap="2">
        <Chip variant="neutral" size="sm" borderless onClick={() => {}}>Design</Chip>
        <Chip variant="neutral" size="sm" borderless onClick={() => {}}>UX</Chip>
        <Chip variant="neutral" size="sm" borderless onClick={() => {}}>Research</Chip>
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
        <Stack align="center" gap="0">
          <Text size="2xl" weight="bold" family="display">56</Text>
          <Text size="xs" color="secondary">Reviews</Text>
        </Stack>
      </Row>
      <Divider spacing="0" />
      <Row gap="2">
        <Button size="sm">Message</Button>
        <Button variant="outline" size="sm">Follow</Button>
      </Row>
    </Stack>
  </Card>
);

const RecipeProfileCardCompact: PreviewFC = () => (
  <Card variant="filled" hoverable style={{ width: 320 }}>
    <Collapsible
      trigger={
        <Row gap="3">
          <Avatar size="md" alt="Jane Doe" />
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
  </Card>
);

const RecipeSettingsPanel: PreviewFC = () => (
  <Card variant="elevated" style={{ width: 400 }}>
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
        { value: "fr", label: "French" },
      ]} />
      <Divider spacing="0" />
      <Row gap="2" justify="end">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save changes</Button>
      </Row>
    </Stack>
  </Card>
);

const RecipeSettingsDrilldown: PreviewFC = () => (
  <Card variant="elevated" style={{ width: 520 }}>
    <Row gap="0" align="stretch">
      <NavMenu size="sm" style={{ width: 140, borderRight: "1px solid var(--lucent-border-default)", padding: 8 }}>
        <NavMenu.Item isActive>General</NavMenu.Item>
        <NavMenu.Item>Security</NavMenu.Item>
        <NavMenu.Item>Billing</NavMenu.Item>
      </NavMenu>
      <Stack gap="4" style={{ flex: 1, padding: 16 }}>
        <Text size="md" weight="bold">General</Text>
        <Divider spacing="0" />
        <Row justify="between">
          <Stack gap="0">
            <Text size="sm" weight="medium">Dark mode</Text>
            <Text size="xs" color="secondary">Use dark theme</Text>
          </Stack>
          <Toggle />
        </Row>
        <Row justify="between">
          <Stack gap="0">
            <Text size="sm" weight="medium">Analytics</Text>
            <Text size="xs" color="secondary">Share usage data</Text>
          </Stack>
          <Toggle defaultChecked />
        </Row>
      </Stack>
    </Row>
  </Card>
);

const RecipeStatsRow: PreviewFC = () => (
  <Row gap="4" wrap>
    <Card variant="outline" style={{ flex: 1, minWidth: 160 }}>
      <Stack gap="1">
        <Text size="xs" color="secondary">Total Users</Text>
        <Text size="2xl" weight="bold" family="display">12,847</Text>
        <Row gap="2" align="center">
          <Chip variant="success" size="sm">+12.5%</Chip>
          <Text size="xs" color="secondary">vs last month</Text>
        </Row>
      </Stack>
    </Card>
    <Card variant="outline" style={{ flex: 1, minWidth: 160 }}>
      <Stack gap="1">
        <Text size="xs" color="secondary">Revenue</Text>
        <Text size="2xl" weight="bold" family="display">$48.2k</Text>
        <Row gap="2" align="center">
          <Chip variant="danger" size="sm">-3.1%</Chip>
          <Text size="xs" color="secondary">vs last month</Text>
        </Row>
      </Stack>
    </Card>
    <Card variant="outline" style={{ flex: 1, minWidth: 160 }}>
      <Stack gap="1">
        <Text size="xs" color="secondary">Conversion</Text>
        <Text size="2xl" weight="bold" family="display">3.2%</Text>
        <Row gap="2" align="center">
          <Chip variant="success" size="sm">+0.8%</Chip>
          <Text size="xs" color="secondary">vs last month</Text>
        </Row>
      </Stack>
    </Card>
  </Row>
);

const RecipeStatsRowAvatars: PreviewFC = () => (
  <Row gap="4" wrap>
    <Card variant="elevated" style={{ flex: 1, minWidth: 200 }}>
      <Stack gap="2">
        <Row gap="2" align="center">
          <Avatar size="sm" alt="Alice" />
          <Text size="xs" color="secondary">Alice — Sales</Text>
        </Row>
        <Text size="2xl" weight="bold" family="display">$24.1k</Text>
        <Chip variant="success" size="sm">+8.3%</Chip>
      </Stack>
    </Card>
    <Card variant="elevated" style={{ flex: 1, minWidth: 200 }}>
      <Stack gap="2">
        <Row gap="2" align="center">
          <Avatar size="sm" alt="Bob" />
          <Text size="xs" color="secondary">Bob — Marketing</Text>
        </Row>
        <Text size="2xl" weight="bold" family="display">$18.7k</Text>
        <Chip variant="warning" size="sm">+1.2%</Chip>
      </Stack>
    </Card>
  </Row>
);

const RecipeActionBarPage: PreviewFC = () => (
  <Stack gap="3">
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
  </Stack>
);

const RecipeActionBarCard: PreviewFC = () => (
  <Card variant="outline" style={{ width: 360 }}>
    <Stack gap="2">
      <Text size="xs" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
  </Card>
);

const RecipeFormLayout: PreviewFC = () => (
  <Card variant="elevated" style={{ width: 480 }}>
    <Stack as="form" gap="4">
      <Text size="lg" weight="bold">Create Project</Text>

      <Input label="Project name" placeholder="My project" />
      <Row gap="3">
        <DatePicker label="Start date" placeholder="Pick a date" style={{ flex: 1 }} />
        <DatePicker label="End date" placeholder="Pick a date" style={{ flex: 1 }} />
      </Row>
      <Textarea label="Description" placeholder="Describe the project..." />

      <Row gap="2" justify="end">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Create project</Button>
      </Row>
    </Stack>
  </Card>
);

const RecipeFormLayoutSections: PreviewFC = () => (
  <Card variant="elevated" style={{ width: 480 }}>
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
        { value: "pst", label: "PST" },
      ]} />
      <Divider spacing="0" />
      <Row gap="2" justify="end">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save</Button>
      </Row>
    </Stack>
  </Card>
);

const RecipeEmptyStateNoResults: PreviewFC = () => (
  <Card variant="outline" style={{ width: 360 }}>
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

const RecipeEmptyStateOnboarding: PreviewFC = () => (
  <Card variant="outline" style={{ width: 360 }}>
    <EmptyState
      illustration={
        <Icon size="xl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Icon>
      }
      title="Get started"
      description="Create your first project to begin."
      action={<Button size="sm">Create project</Button>}
    />
  </Card>
);

const RecipeEmptyStateError: PreviewFC = () => (
  <Card variant="outline" style={{ width: 360 }}>
    <EmptyState
      illustration={
        <Icon size="xl">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={12} r={10} />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </Icon>
      }
      title="Something went wrong"
      description="We couldn't load the data. Please try again."
      action={<Button variant="danger" size="sm">Retry</Button>}
    />
  </Card>
);

// ─── Recipe: SearchFilterBar ──────────────────────────────────────────────────

const sfbStatusOpts = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const sfbTagOpts = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "devops", label: "DevOps" },
];

const RecipeSearchFilterBar: PreviewFC = () => (
  <Row gap="2" align="center" style={{ flexWrap: "wrap" }}>
    <FilterSearch size="sm" placeholder="Search..." />
    <FilterSelect size="sm" label="Availability" options={[
      { value: "in-stock", label: "In stock" },
      { value: "out-of-stock", label: "Out of stock" },
    ]} />
    <FilterMultiSelect size="sm" label="Status" options={sfbStatusOpts} />
    <FilterMultiSelect size="sm" label="Tags" options={sfbTagOpts} />
    <FilterDateRange size="sm" label="Date range" />
    <Button variant="ghost" size="sm">Clear all</Button>
    <div style={{ flex: 1 }} />
    <Row gap="2" align="center" style={{ flexShrink: 0 }}>
      <FilterSelect size="sm" label="Sort" options={[
        { value: "newest", label: "Newest first" },
        { value: "oldest", label: "Oldest first" },
      ]} />
      <SegmentedControl
        size="sm"
        defaultValue="list"
        options={[
          { value: "grid", label: "▦" },
          { value: "list", label: "☰" },
        ]}
      />
    </Row>
  </Row>
);

const RecipeSearchFilterBarMinimal: PreviewFC = () => (
  <Row gap="2" align="center">
    <FilterSearch size="sm" placeholder="Search..." />
    <div style={{ flex: 1 }} />
    <FilterSelect size="sm" label="Sort" options={[
      { value: "newest", label: "Newest first" },
      { value: "oldest", label: "Oldest first" },
    ]} />
  </Row>
);

const RecipeSearchFilterBarPipeline: PreviewFC = () => (
  <Row gap="2" align="center" style={{ flexWrap: "wrap" }}>
    <FilterMultiSelect size="sm" label="Status" options={sfbStatusOpts} />
    <FilterMultiSelect size="sm" label="Assignee" options={[
      { value: "alice", label: "Alice" },
      { value: "bob", label: "Bob" },
      { value: "carol", label: "Carol" },
    ]} />
    <FilterMultiSelect size="sm" label="Priority" options={[
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ]} />
    <Button variant="ghost" size="sm">Clear all</Button>
  </Row>
);

// ─── Pattern: PricingTable ────────────────────────────────────────────────────

const PatternPricingTable: PreviewFC = () => (
  <Row gap="4" align="stretch">
    <Card variant="outline" style={{ flex: 1 }}><Stack gap="3">
      <Text weight="semibold">Free</Text>
      <Text size="3xl" weight="bold">$0<Text size="sm" color="secondary">/mo</Text></Text>
      <Divider />
      <Text size="sm">5 projects</Text>
      <Text size="sm">1 GB storage</Text>
      <Text size="sm">Community support</Text>
      <Button variant="outline" fullWidth>Get started</Button>
    </Stack></Card>
    <Card variant="elevated" style={{ flex: 1, borderColor: "var(--lucent-accent-default)", borderWidth: 2 }}><Stack gap="3">
      <Chip variant="accent" size="sm">Popular</Chip>
      <Text weight="semibold">Pro</Text>
      <Text size="3xl" weight="bold">$19<Text size="sm" color="secondary">/mo</Text></Text>
      <Divider />
      <Text size="sm">Unlimited projects</Text>
      <Text size="sm">50 GB storage</Text>
      <Text size="sm">Priority support</Text>
      <Button variant="primary" fullWidth>Upgrade</Button>
    </Stack></Card>
    <Card variant="outline" style={{ flex: 1 }}><Stack gap="3">
      <Text weight="semibold">Enterprise</Text>
      <Text size="3xl" weight="bold">Custom</Text>
      <Divider />
      <Text size="sm">Unlimited everything</Text>
      <Text size="sm">SSO &amp; SAML</Text>
      <Text size="sm">Dedicated support</Text>
      <Button variant="outline" fullWidth>Contact sales</Button>
    </Stack></Card>
  </Row>
);

// ─── Pattern: NotificationFeed ───────────────────────────────────────────────

const PatternNotificationFeed: PreviewFC = () => (
  <Stack gap="1" style={{ maxWidth: 440 }}>
    <Card style={{ background: "var(--lucent-accent-subtle)" }}>
      <Row gap="3" align="start">
        <Avatar size="sm" alt="Alice" />
        <Stack gap="1" style={{ flex: 1 }}>
          <Text size="sm" weight="medium">Alice commented on your PR</Text>
          <Text size="xs" color="secondary">2 minutes ago</Text>
        </Stack>
        <Chip size="sm" variant="accent">Comment</Chip>
      </Row>
    </Card>
    <Card style={{ background: "var(--lucent-accent-subtle)" }}>
      <Row gap="3" align="start">
        <Avatar size="sm" alt="Carol" />
        <Stack gap="1" style={{ flex: 1 }}>
          <Text size="sm" weight="medium">Carol assigned you to PROJ-42</Text>
          <Text size="xs" color="secondary">15 minutes ago</Text>
        </Stack>
        <Chip size="sm" variant="warning">Assigned</Chip>
      </Row>
    </Card>
    <Card>
      <Row gap="3" align="start">
        <Avatar size="sm" alt="Bob" />
        <Stack gap="1" style={{ flex: 1 }}>
          <Text size="sm">Bob mentioned you in #general</Text>
          <Text size="xs" color="secondary">1 hour ago</Text>
        </Stack>
        <Chip size="sm" variant="neutral">Mention</Chip>
      </Row>
    </Card>
  </Stack>
);

// ─── Pattern: OnboardingFlow ─────────────────────────────────────────────────

const PatternOnboardingFlow: PreviewFC = () => (
  <Card style={{ maxWidth: 480 }}>
    <Stack gap="6">
      <Stepper steps={["Account", "Profile", "Confirm"]} current={1} />
      <Stack gap="4">
        <Input label="Full name" placeholder="Jane Doe" />
        <Input label="Username" placeholder="@jane" />
        <Select label="Role" options={[
          { value: "dev", label: "Developer" },
          { value: "design", label: "Designer" },
          { value: "pm", label: "Product Manager" },
        ]} />
      </Stack>
      <Row gap="3" style={{ justifyContent: "flex-end" }}>
        <Button variant="outline">Back</Button>
        <Button variant="primary">Next</Button>
      </Row>
    </Stack>
  </Card>
);

// ─── Pattern: DashboardHeader ────────────────────────────────────────────────

const PatternDashboardHeader: PreviewFC = () => (
  <Stack gap="4">
    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Analytics" }, { label: "Dashboard" }]} />
    <Row align="center" style={{ justifyContent: "space-between" }}>
      <Text as="h2" size="2xl" weight="bold" family="display" style={{ margin: 0 }}>Dashboard</Text>
      <Row gap="2">
        <Button variant="outline" size="sm">Export</Button>
        <Button variant="primary" size="sm">New report</Button>
      </Row>
    </Row>
    <Row gap="4">
      <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Revenue</Text><Text size="xl" weight="bold">$48.2k</Text><Chip size="sm" variant="success">+12%</Chip></Stack></Card>
      <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Users</Text><Text size="xl" weight="bold">2,847</Text><Chip size="sm" variant="success">+8%</Chip></Stack></Card>
      <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Orders</Text><Text size="xl" weight="bold">1,024</Text><Chip size="sm" variant="danger">-3%</Chip></Stack></Card>
      <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Conversion</Text><Text size="xl" weight="bold">3.2%</Text><Chip size="sm" variant="success">+0.4%</Chip></Stack></Card>
    </Row>
  </Stack>
);

// ─── Pattern: ProductCard ────────────────────────────────────────────────────

const PatternProductCard: PreviewFC = () => (
  <Card style={{ maxWidth: 280 }} media={
    <div style={{ height: 160, background: "var(--lucent-accent-subtle)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Text size="3xl">🎧</Text>
    </div>
  }>
    <Stack gap="3">
      <Row align="center" style={{ justifyContent: "space-between" }}>
        <Text weight="semibold">Wireless Headphones</Text>
        <Chip size="sm" variant="accent">New</Chip>
      </Row>
      <Text size="sm" color="secondary">Premium noise-cancelling with 30h battery.</Text>
      <Row align="center" style={{ justifyContent: "space-between" }}>
        <Text size="lg" weight="bold">$299</Text>
        <Button size="sm">Add to cart</Button>
      </Row>
    </Stack>
  </Card>
);

const PatternProductCardTeam: PreviewFC = () => (
  <Card style={{ maxWidth: 280 }}>
    <Stack gap="3" align="center" style={{ textAlign: "center" }}>
      <Avatar size="xl" alt="Jane Doe" />
      <Stack gap="1" align="center">
        <Text weight="semibold">Jane Doe</Text>
        <Text size="sm" color="secondary">Lead Designer</Text>
      </Stack>
      <Row gap="2">
        <Chip size="sm" variant="accent">Design</Chip>
        <Chip size="sm" variant="neutral">UX</Chip>
      </Row>
      <Button variant="outline" size="sm" fullWidth>Contact</Button>
    </Stack>
  </Card>
);

// ─── Pattern: AnnouncementCard ──────────────────────────────────────────────

const PatternAnnouncementCard: PreviewFC = () => (
  <Card style={{ maxWidth: 440 }}>
    <Stack gap="3">
      <Row gap="2" align="center">
        <Chip size="sm" variant="info">Announcement</Chip>
        <Text size="xs" color="secondary">2 hours ago</Text>
      </Row>
      <Text size="lg" weight="semibold">New Feature: Dark Mode</Text>
      <Text size="sm" color="secondary">We&apos;ve added a dark mode toggle to all pages. Try it out in your settings.</Text>
      <Row gap="2">
        <Button size="sm">Learn more</Button>
        <Button size="sm" variant="ghost">Dismiss</Button>
      </Row>
    </Stack>
  </Card>
);

const PatternAnnouncementCardSystem: PreviewFC = () => (
  <Card status="warning" style={{ maxWidth: 440 }}>
    <Stack gap="3">
      <Row gap="2" align="center">
        <Chip size="sm" variant="warning">Maintenance</Chip>
      </Row>
      <Text weight="semibold">Scheduled Downtime</Text>
      <Text size="sm" color="secondary">Systems will be offline Saturday 2:00–4:00 AM UTC for database migration.</Text>
      <Button size="sm" variant="outline">View status page</Button>
    </Stack>
  </Card>
);

// ─── Pattern: ConfirmationDialog ────────────────────────────────────────────

const PatternConfirmationDialog: PreviewFC = () => (
  <Card variant="elevated" style={{ maxWidth: 400 }}>
    <Stack gap="4">
      <Text size="lg" weight="semibold">Delete project?</Text>
      <Text size="sm" color="secondary">This action cannot be undone. All data associated with this project will be permanently removed.</Text>
      <Row gap="2" style={{ justifyContent: "flex-end" }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </Row>
    </Stack>
  </Card>
);

const PatternConfirmationDialogTyped: PreviewFC = () => (
  <Card variant="elevated" style={{ maxWidth: 400 }}>
    <Stack gap="4">
      <Text size="lg" weight="semibold">Delete &quot;my-project&quot;?</Text>
      <Text size="sm" color="secondary">Type the project name to confirm deletion.</Text>
      <Input placeholder="my-project" />
      <Row gap="2" style={{ justifyContent: "flex-end" }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger" disabled>Delete</Button>
      </Row>
    </Stack>
  </Card>
);

// ─── Pattern: BulkActionBar ─────────────────────────────────────────────────

const PatternBulkActionBar: PreviewFC = () => (
  <Card variant="filled">
    <Row gap="3" align="center">
      <Chip variant="accent">3 selected</Chip>
      <Divider orientation="vertical" />
      <Button size="sm" variant="outline">Archive</Button>
      <Button size="sm" variant="outline">Move to…</Button>
      <Button size="sm" variant="danger-outline">Delete</Button>
      <div style={{ flex: 1 }} />
      <Button size="sm" variant="ghost">Clear selection</Button>
    </Row>
  </Card>
);

const PatternBulkActionBarMinimal: PreviewFC = () => (
  <Card variant="filled">
    <Row gap="3" align="center">
      <Text size="sm" weight="medium">5 items selected</Text>
      <div style={{ flex: 1 }} />
      <Button size="sm" variant="danger-outline">Delete</Button>
      <Button size="sm" variant="ghost">Clear</Button>
    </Row>
  </Card>
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

const PageLayoutChrome: PreviewFC = () => (
  <PageLayout
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
      { id: "5", title: "Commit pushed", date: "Feb 26" },
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

const TimelineContent: PreviewFC = () => (
  <Timeline
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
  />
);

// ─── Slider ───────────────────────────────────────────────────────────────────

const SliderSizes: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
    <Slider size="sm" label="Small" defaultValue={40} />
    <Slider size="md" label="Medium" defaultValue={60} />
    <Slider size="lg" label="Large" defaultValue={75} />
  </div>
);

const SliderControlled: PreviewFC = () => {
  const [val, setVal] = useState(40);
  return (
    <div style={{ width: 320 }}>
      <Slider
        label="Opacity"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        showValue
      />
    </div>
  );
};

const SliderDisabled: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <Slider label="Locked" disabled defaultValue={40} />
  </div>
);

// ─── CodeBlock ────────────────────────────────────────────────────────────────

const CodeBlockSingle: PreviewFC = () => (
  <div style={{ width: "100%", maxWidth: 520 }}>
    <CodeBlock language="tsx" code={`<Button variant="primary">Save</Button>`} />
  </div>
);

const CodeBlockTabs: PreviewFC = () => (
  <div style={{ width: "100%", maxWidth: 520 }}>
    <CodeBlock
      tabs={[
        { label: "pnpm", code: "pnpm add lucent-ui", language: "bash" },
        { label: "npm", code: "npm install lucent-ui", language: "bash" },
        { label: "yarn", code: "yarn add lucent-ui", language: "bash" },
      ]}
    />
  </div>
);

const CodeBlockPrompt: PreviewFC = () => (
  <div style={{ width: "100%", maxWidth: 520 }}>
    <CodeBlock
      variant="prompt"
      helperText="Paste into Claude:"
      code={'Add a Button with variant="primary".'}
    />
  </div>
);

// ─── Table ────────────────────────────────────────────────────────────────────

const TableBasic: PreviewFC = () => (
  <Table>
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
  </Table>
);

const TableStriped: PreviewFC = () => (
  <Table striped>
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
  </Table>
);

const TableRichCells: PreviewFC = () => (
  <Table>
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
  </Table>
);

// ─── ColorPicker ─────────────────────────────────────────────────────────────

const ColorPickerDefault: PreviewFC = () => {
  const [color, setColor] = useState("#3b82f6");
  return <ColorPicker value={color} onChange={setColor} label="Brand color" />;
};

const ColorPickerPresets: PreviewFC = () => {
  const [color, setColor] = useState("#111827");
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Theme color"
      presetGroups={[
        { label: "Brand", colors: ["#111827", "#3b82f6", "#8b5cf6"] },
        { label: "Semantic", colors: ["#22c55e", "#f59e0b", "#ef4444"] },
      ]}
    />
  );
};

const ColorPickerCompact: PreviewFC = () => {
  const [color, setColor] = useState("#8b5cf6");
  return <ColorPicker value={color} onChange={setColor} label="Accent" size="sm" inline />;
};

// ─── ColorSwatch ─────────────────────────────────────────────────────────────

const ColorSwatchShapes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <ColorSwatch color="#3b82f6" size="sm" />
    <ColorSwatch color="#8b5cf6" size="md" />
    <ColorSwatch color="#ef4444" size="lg" shape="square" />
    <ColorSwatch color="#22c55e" size="xl" shape="square" />
  </div>
);

const ColorSwatchSelected: PreviewFC = () => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <ColorSwatch color="#3b82f6" size="lg" selected />
    <ColorSwatch color="rgba(59,130,246,0.4)" size="lg" showCheckerboard />
  </div>
);

// ─── SegmentedControl ────────────────────────────────────────────────────────

const SegmentedControlDefault: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <SegmentedControl
      defaultValue="grid"
      options={[
        { value: "grid", label: "Grid" },
        { value: "list", label: "List" },
        { value: "table", label: "Table" },
      ]}
    />
  </div>
);

const SegmentedControlControlled: PreviewFC = () => {
  const [view, setView] = useState("overview");
  return (
    <div style={{ width: 360 }}>
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { value: "overview", label: "Overview" },
          { value: "details", label: "Details" },
          { value: "activity", label: "Activity" },
        ]}
      />
    </div>
  );
};

// ─── Chip ────────────────────────────────────────────────────────────────────

const ChipVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    <Chip variant="neutral">Neutral</Chip>
    <Chip variant="accent">Accent</Chip>
    <Chip variant="success">Success</Chip>
    <Chip variant="warning">Warning</Chip>
    <Chip variant="danger">Danger</Chip>
    <Chip variant="info">Info</Chip>
  </div>
);

const ChipInteractive: PreviewFC = () => {
  const [chips, setChips] = useState(["React", "TypeScript", "Design Systems"]);
  const [selected, setSelected] = useState<string | null>("React");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <Chip key={c} onDismiss={() => setChips((prev) => prev.filter((x) => x !== c))}>{c}</Chip>
        ))}
        {chips.length === 0 && <Text as="span" size="sm" color="secondary">All dismissed</Text>}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["React", "Vue", "Svelte"].map((c) => (
          <Chip key={c} variant={selected === c ? "accent" : "neutral"} onClick={() => setSelected(c)}>{c}</Chip>
        ))}
      </div>
    </div>
  );
};

const ChipDecorated: PreviewFC = () => (
  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
    <Chip swatch="#3b82f6">Design</Chip>
    <Chip swatch="#22c55e">Engineering</Chip>
    <Chip dot variant="success">Online</Chip>
    <Chip dot variant="danger">Offline</Chip>
    <Chip leftIcon="🇺🇸">United States</Chip>
    <Chip borderless variant="accent">Borderless</Chip>
  </div>
);

const ChipStatus: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Chip ghost variant="success" dot>Deployed</Chip>
      <Chip ghost variant="warning" dot>Syncing</Chip>
      <Chip ghost variant="danger" dot>Failed</Chip>
    </div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Chip variant="success" dot pulse>Live</Chip>
      <Chip variant="warning" dot pulse>Deploying</Chip>
      <Chip variant="danger" dot pulse>Incident</Chip>
    </div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <Chip variant="success" dot />
      <Chip variant="warning" dot pulse />
      <Chip variant="danger" dot />
    </div>
  </div>
);

// ─── Menu ────────────────────────────────────────────────────────────────────

const MenuBasic: PreviewFC = () => (
  <Menu trigger={<Button variant="outline">Actions</Button>}>
    <MenuItem onSelect={() => {}}>Edit</MenuItem>
    <MenuItem onSelect={() => {}}>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem onSelect={() => {}} danger>Delete</MenuItem>
  </Menu>
);

const MenuSelected: PreviewFC = () => (
  <Menu trigger={<Button variant="outline">View</Button>}>
    <MenuItem onSelect={() => {}} selected>Grid view</MenuItem>
    <MenuItem onSelect={() => {}}>List view</MenuItem>
    <MenuSeparator />
    <MenuItem onSelect={() => {}} shortcut="⌘E">Edit layout</MenuItem>
    <MenuItem onSelect={() => {}} shortcut="⌘D" disabled>Duplicate</MenuItem>
  </Menu>
);

const MenuGrouped: PreviewFC = () => (
  <Menu trigger={<Button variant="outline" size="sm">Options</Button>} size="sm">
    <MenuGroup label="Navigate">
      <MenuItem onSelect={() => {}}>Dashboard</MenuItem>
      <MenuItem onSelect={() => {}}>Settings</MenuItem>
    </MenuGroup>
    <MenuGroup label="Account">
      <MenuItem onSelect={() => {}}>Profile</MenuItem>
      <MenuItem onSelect={() => {}} danger>Sign out</MenuItem>
    </MenuGroup>
  </Menu>
);

// ─── Toast ────────────────────────────────────────────────────────────────────

const ToastBasicInner: PreviewFC = () => {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() => toast({ title: "Changes saved", description: "Your profile has been updated successfully." })}
    >
      Show toast
    </Button>
  );
};

const ToastBasic: PreviewFC = () => (
  <ToastProvider>
    <ToastBasicInner />
  </ToastProvider>
);

const ToastVariantsInner: PreviewFC = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Button variant="outline" onClick={() => toast({ title: "Default", variant: "default" })}>Default</Button>
      <Button variant="outline" onClick={() => toast({ title: "Success", description: "Operation completed.", variant: "success" })}>Success</Button>
      <Button variant="outline" onClick={() => toast({ title: "Warning", description: "Approaching limit.", variant: "warning" })}>Warning</Button>
      <Button variant="outline" onClick={() => toast({ title: "Danger", description: "Something went wrong.", variant: "danger" })}>Danger</Button>
      <Button variant="outline" onClick={() => toast({ title: "Info", description: "New version available.", variant: "info" })}>Info</Button>
    </div>
  );
};

const ToastVariants: PreviewFC = () => (
  <ToastProvider>
    <ToastVariantsInner />
  </ToastProvider>
);

const ToastActionInner: PreviewFC = () => {
  const { toast } = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Item deleted",
          description: "The file has been moved to trash.",
          variant: "danger",
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Delete with undo
    </Button>
  );
};

const ToastAction: PreviewFC = () => (
  <ToastProvider>
    <ToastActionInner />
  </ToastProvider>
);

// ─── Stack ───────────────────────────────────────────────────────────────────

const StackBasic: PreviewFC = () => (
  <Stack gap="4" style={{ width: 240 }}>
    <Text>First item</Text>
    <Text>Second item</Text>
    <Text>Third item</Text>
  </Stack>
);

const StackForm: PreviewFC = () => (
  <Stack as="form" gap="6" style={{ width: 280 }}>
    <Input label="Name" placeholder="Jane Doe" />
    <Input label="Email" placeholder="jane@example.com" />
    <Button variant="primary">Submit</Button>
  </Stack>
);

// ─── Row ─────────────────────────────────────────────────────────────────────

const RowButtons: PreviewFC = () => (
  <Row gap="3">
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </Row>
);

const RowBetween: PreviewFC = () => (
  <Row justify="between" style={{ width: 320 }}>
    <Text>Settings</Text>
    <Button variant="ghost" size="sm">Edit</Button>
  </Row>
);

// ─── Progress ────────────────────────────────────────────────────────────────

const ProgressBasic: PreviewFC = () => (
  <div style={{ width: 320 }}>
    <Progress value={65} label />
  </div>
);

const ProgressVariants: PreviewFC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
    <Progress value={80} variant="success" label />
    <Progress value={55} variant="warning" label />
    <Progress value={30} variant="danger" label />
  </div>
);

const ProgressThreshold: PreviewFC = () => {
  const [val, setVal] = useState(85);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
      <Progress value={val} warnAt={60} dangerAt={80} label />
      <Slider label="Value" value={val} onChange={(e) => setVal(Number(e.target.value))} showValue />
    </div>
  );
};

// ─── SplitButton ──────────────────────────────────────────────────────────────

const SplitButtonVariants: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <SplitButton
      variant="primary"
      onClick={() => {}}
      menuItems={[
        { label: "Save as draft", onSelect: () => {} },
        { label: "Save & publish", onSelect: () => {} },
      ]}
    >
      Save
    </SplitButton>
    <SplitButton
      variant="outline"
      onClick={() => {}}
      menuItems={[{ label: "Option A", onSelect: () => {} }, { label: "Option B", onSelect: () => {} }]}
    >
      Options
    </SplitButton>
    <SplitButton
      variant="secondary"
      onClick={() => {}}
      menuItems={[{ label: "Export CSV", onSelect: () => {} }]}
    >
      Export
    </SplitButton>
    <SplitButton
      variant="danger"
      onClick={() => {}}
      menuItems={[{ label: "Force delete", onSelect: () => {}, danger: true }]}
    >
      Delete
    </SplitButton>
  </div>
);

const SplitButtonSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <SplitButton size="2xs" onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>2XS</SplitButton>
    <SplitButton size="xs" onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>XS</SplitButton>
    <SplitButton size="sm" onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>SM</SplitButton>
    <SplitButton size="md" onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>MD</SplitButton>
    <SplitButton size="lg" onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>LG</SplitButton>
  </div>
);

const SplitButtonStates: PreviewFC = () => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
    <SplitButton loading onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>Saving</SplitButton>
    <SplitButton disabled onClick={() => {}} menuItems={[{ label: "Alt", onSelect: () => {} }]}>Disabled</SplitButton>
  </div>
);

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

const ButtonGroupBasic: PreviewFC = () => (
  <ButtonGroup>
    <Button variant="outline">Left</Button>
    <Button variant="outline">Center</Button>
    <Button variant="outline">Right</Button>
  </ButtonGroup>
);

const ButtonGroupMixed: PreviewFC = () => (
  <ButtonGroup>
    <Button variant="primary">Save</Button>
    <SplitButton
      variant="outline"
      onClick={() => {}}
      menuItems={[{ label: "Save as draft", onSelect: () => {} }]}
    >
      More
    </SplitButton>
  </ButtonGroup>
);

const ButtonGroupGhost: PreviewFC = () => (
  <ButtonGroup>
    <Button variant="ghost" size="sm">Bold</Button>
    <Button variant="ghost" size="sm">Italic</Button>
    <Button variant="ghost" size="sm">Underline</Button>
  </ButtonGroup>
);

// ─── NavMenu ──────────────────────────────────────────────────────────────────

const NavMenuSidebar: PreviewFC = () => (
  <div style={{ width: 240 }}>
    <NavMenu aria-label="Sidebar">
      <NavMenu.Item href="#" isActive>Dashboard</NavMenu.Item>
      <NavMenu.Item href="#">Analytics</NavMenu.Item>
      <NavMenu.Separator />
      <NavMenu.Group label="Settings">
        <NavMenu.Item href="#">Profile</NavMenu.Item>
        <NavMenu.Item href="#">Billing</NavMenu.Item>
        <NavMenu.Item href="#">Team</NavMenu.Item>
      </NavMenu.Group>
    </NavMenu>
  </div>
);

const NavMenuInverse: PreviewFC = () => (
  <div style={{ width: 240 }}>
    <NavMenu inverse aria-label="Sidebar">
      <NavMenu.Item href="#" isActive>Dashboard</NavMenu.Item>
      <NavMenu.Item href="#">Projects</NavMenu.Item>
      <NavMenu.Group label="Admin">
        <NavMenu.Item href="#">Users</NavMenu.Item>
        <NavMenu.Item href="#">Roles</NavMenu.Item>
      </NavMenu.Group>
    </NavMenu>
  </div>
);

const NavMenuSizes: PreviewFC = () => (
  <div style={{ display: "flex", gap: 32 }}>
    <div style={{ width: 180 }}>
      <NavMenu size="sm" aria-label="Small nav">
        <NavMenu.Item href="#" isActive>Small</NavMenu.Item>
        <NavMenu.Item href="#">Item</NavMenu.Item>
      </NavMenu>
    </div>
    <div style={{ width: 180 }}>
      <NavMenu size="lg" aria-label="Large nav">
        <NavMenu.Item href="#" isActive>Large</NavMenu.Item>
        <NavMenu.Item href="#">Item</NavMenu.Item>
      </NavMenu>
    </div>
  </div>
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
  "textarea-sizes": TextareaSizes,
  // Select
  "select-default": SelectDefault,
  "select-sizes": SelectSizes,
  "select-error": SelectError,
  // SearchInput
  "searchinput-results": SearchInputResults,
  "searchinput-loading": SearchInputLoading,
  "searchinput-disabled": SearchInputDisabled,
  "searchinput-labeled": SearchInputLabeled,
  // Checkbox
  "checkbox-states": CheckboxStates,
  "checkbox-sizes": CheckboxSizes,
  "checkbox-contained": CheckboxContained,
  // Radio
  "radio-vertical": RadioVertical,
  "radio-horizontal": RadioHorizontal,
  "radio-disabled": RadioDisabled,
  "radio-contained": RadioContained,
  // Toggle
  "toggle-controlled": ToggleControlled,
  "toggle-sizes": ToggleSizes,
  "toggle-disabled": ToggleDisabled,
  "toggle-contained": ToggleContained,
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
  "card-variants": CardVariants,
  "card-header-footer": CardHeaderFooter,
  "card-interactive": CardInteractive,
  "card-status": CardStatus,
  "card-selected-media": CardSelectedMedia,
  "card-bleed": CardBleedExample,
  "card-hoverable": CardHoverable,
  "card-collapsible-recipe": CardCollapsibleRecipe,
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
  "navlink-inverse": NavLinkInverse,
  // DatePicker
  "datepicker-controlled": DatePickerControlled,
  "datepicker-labeled": DatePickerLabeled,
  "datepicker-constrained": DatePickerConstrained,
  "datepicker-sizes": DatePickerSizes,
  // DateRangePicker
  "daterangepicker-controlled": DateRangePickerControlled,
  "daterangepicker-labeled": DateRangePickerLabeled,
  "daterangepicker-disabled": DateRangePickerDisabled,
  "daterangepicker-sizes": DateRangePickerSizes,
  "daterangepicker-trigger": DateRangePickerTrigger,
  // MultiSelect
  "multiselect-controlled": MultiSelectControlled,
  "multiselect-max": MultiSelectMax,
  "multiselect-labeled": MultiSelectLabeled,
  // FilterSearch
  "filtersearch-default": FilterSearchDefault,
  "filtersearch-sizes": FilterSearchSizes,
  // FilterSelect
  "filterselect-default": FilterSelectDefault,
  "filterselect-sizes": FilterSelectSizes,
  // FilterMultiSelect
  "filtermultiselect-sizes": FilterMultiSelectSizes,
  "filtermultiselect-ghost": FilterMultiSelectGhost,
  "filtermultiselect-compact": FilterMultiSelectCompact,
  // FilterDateRange
  "filterdaterange-default": FilterDateRangeDefault,
  "filterdaterange-sizes": FilterDateRangeSizes,
  // Tabs
  "tabs-basic": TabsBasic,
  "tabs-disabled": TabsDisabled,
  "tabs-overflow": TabsOverflow,
  // Collapsible
  "collapsible-basic": CollapsibleBasic,
  "collapsible-open": CollapsibleOpen,
  "collapsible-disabled": CollapsibleDisabled,
  "collapsible-card-recipe": CollapsibleCardRecipe,
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
  "pagelayout-chrome": PageLayoutChrome,
  // Timeline
  "timeline-statuses": TimelineStatuses,
  "timeline-descriptions": TimelineDescriptions,
  "timeline-content": TimelineContent,
  // Slider
  "slider-sizes": SliderSizes,
  "slider-controlled": SliderControlled,
  "slider-disabled": SliderDisabled,
  // CodeBlock
  "codeblock-single": CodeBlockSingle,
  "codeblock-tabs": CodeBlockTabs,
  "codeblock-prompt": CodeBlockPrompt,
  // Table
  "table-basic": TableBasic,
  "table-striped": TableStriped,
  "table-rich-cells": TableRichCells,
  // ColorPicker
  "colorpicker-default": ColorPickerDefault,
  "colorpicker-presets": ColorPickerPresets,
  "colorpicker-compact": ColorPickerCompact,
  // ColorSwatch
  "colorswatch-shapes": ColorSwatchShapes,
  "colorswatch-selected": ColorSwatchSelected,
  // SegmentedControl
  "segmentedcontrol-default": SegmentedControlDefault,
  "segmentedcontrol-controlled": SegmentedControlControlled,
  // Chip
  "chip-variants": ChipVariants,
  "chip-interactive": ChipInteractive,
  "chip-decorated": ChipDecorated,
  "chip-status": ChipStatus,
  // Toast
  "toast-basic": ToastBasic,
  "toast-variants": ToastVariants,
  "toast-action": ToastAction,
  // Menu
  "menu-basic": MenuBasic,
  "menu-selected": MenuSelected,
  "menu-grouped": MenuGrouped,
  // Stack
  "stack-basic": StackBasic,
  "stack-form": StackForm,
  // Row
  "row-buttons": RowButtons,
  "row-between": RowBetween,
  // Progress
  "progress-basic": ProgressBasic,
  "progress-variants": ProgressVariants,
  "progress-threshold": ProgressThreshold,
  // SplitButton
  "splitbutton-variants": SplitButtonVariants,
  "splitbutton-sizes": SplitButtonSizes,
  "splitbutton-states": SplitButtonStates,
  // ButtonGroup
  "buttongroup-basic": ButtonGroupBasic,
  "buttongroup-mixed": ButtonGroupMixed,
  "buttongroup-ghost": ButtonGroupGhost,
  // NavMenu
  "navmenu-sidebar": NavMenuSidebar,
  "navmenu-inverse": NavMenuInverse,
  "navmenu-sizes": NavMenuSizes,
  // Recipe: ProfileCard
  "recipe-profilecard": RecipeProfileCard,
  "recipe-profilecard-compact": RecipeProfileCardCompact,
  // Recipe: SettingsPanel
  "recipe-settingspanel": RecipeSettingsPanel,
  "recipe-settingspanel-drilldown": RecipeSettingsDrilldown,
  // Recipe: StatsRow
  "recipe-statsrow": RecipeStatsRow,
  "recipe-statsrow-avatars": RecipeStatsRowAvatars,
  // Recipe: ActionBar
  "recipe-actionbar-page": RecipeActionBarPage,
  "recipe-actionbar-card": RecipeActionBarCard,
  // Recipe: FormLayout
  "recipe-formlayout": RecipeFormLayout,
  "recipe-formlayout-sections": RecipeFormLayoutSections,
  // Recipe: EmptyStateCard
  "recipe-emptystate-noresults": RecipeEmptyStateNoResults,
  "recipe-emptystate-onboarding": RecipeEmptyStateOnboarding,
  "recipe-emptystate-error": RecipeEmptyStateError,
  // Recipe: SearchFilterBar
  "recipe-searchfilterbar": RecipeSearchFilterBar,
  "recipe-searchfilterbar-minimal": RecipeSearchFilterBarMinimal,
  "recipe-searchfilterbar-pipeline": RecipeSearchFilterBarPipeline,
  // Stepper
  "stepper-horizontal": StepperHorizontal,
  "stepper-vertical": StepperVertical,
  "stepper-status": StepperStatus,
  // Pattern: PricingTable
  "pattern-pricingtable": PatternPricingTable,
  // Pattern: NotificationFeed
  "pattern-notificationfeed": PatternNotificationFeed,
  // Pattern: OnboardingFlow
  "pattern-onboardingflow": PatternOnboardingFlow,
  // Pattern: DashboardHeader
  "pattern-dashboardheader": PatternDashboardHeader,
  // Pattern: ProductCard
  "pattern-productcard": PatternProductCard,
  "pattern-productcard-team": PatternProductCardTeam,
  // Pattern: AnnouncementCard
  "pattern-announcementcard": PatternAnnouncementCard,
  "pattern-announcementcard-system": PatternAnnouncementCardSystem,
  // Pattern: ConfirmationDialog
  "pattern-confirmationdialog": PatternConfirmationDialog,
  "pattern-confirmationdialog-typed": PatternConfirmationDialogTyped,
  // Pattern: BulkActionBar
  "pattern-bulkactionbar": PatternBulkActionBar,
  "pattern-bulkactionbar-minimal": PatternBulkActionBarMinimal,
};

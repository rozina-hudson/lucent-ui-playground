"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  LucentProvider,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Chip,
  Divider,
  Input,
  Menu,
  MenuItem,
  MenuSeparator,
  Row,
  Select,
  Slider,
  Stack,
  Stepper,
  Text,
  Toggle,
  ToastProvider,
} from "lucent-ui";
const LucentDevTools = dynamic(() => import("lucent-ui/devtools").then((m) => m.LucentDevTools), { ssr: false });
import { usePlayground } from "@/lib/playgroundContext";
import { getShell } from "@/lib/shellColors";
import {
  defaultPlaygroundState,
  PALETTE_OPTIONS,
  COMBINED_PRESETS,
  DESIGN_PRESETS,
  resolveDimension,
  resolvePreset,
  type PlaygroundState,
} from "@/components/docs/PlaygroundPanel";

// ─── Composition previews ───────────────────────────────────────────────────

function ProfileCard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--lucent-space-4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-4)" }}>
        <Avatar alt="Rozina Szogyenyi" src="https://i.pravatar.cc/150?u=szogyenyi.zina@gmail.com" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-2)" }}>
            <Text size="lg" weight="semibold">Rozina Szogyenyi</Text>
            <Chip variant="success" size="sm" dot>Pro</Chip>
          </div>
          <Text size="sm" color="secondary">Staff Product Designer</Text>
        </div>
      </div>
      <Text size="sm" color="secondary" lineHeight="relaxed">
        Building design systems that scale. Open-source contributor, TypeScript enthusiast, and occasional writer.
      </Text>
      <div style={{ display: "flex", gap: "var(--lucent-space-2)", flexWrap: "wrap" }}>
        <Chip variant="neutral" size="sm">Design Systems</Chip>
        <Chip variant="neutral" size="sm">TypeScript</Chip>
        <Chip variant="neutral" size="sm">React</Chip>
      </div>
      <Divider />
      <div style={{ display: "flex", gap: "var(--lucent-space-4)" }}>
        {[{ value: "2.4k", label: "Followers" }, { value: "186", label: "Projects" }, { value: "99.8%", label: "Uptime" }].map(({ value, label }) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <Text size="xl" weight="bold" style={{ display: "block", lineHeight: 1.2 }}>{value}</Text>
            <Text size="xs" color="secondary">{label}</Text>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--lucent-space-2)" }}>
        <Button size="sm" variant="primary" style={{ flex: 1 }}>Follow</Button>
        <Button size="sm" variant="ghost">Message</Button>
      </div>
    </div>
  );
}

function PreferencesCard() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [language, setLanguage] = useState("en");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--lucent-space-3)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--lucent-space-2)" }}>
        <Text size="md" weight="semibold" style={{ flex: 1 }}>Preferences</Text>
        <Badge variant="accent" size="sm">v2.4</Badge>
        <Menu trigger={<Button size="2xs" variant="ghost">&#x22EF;</Button>}>
          <MenuItem onSelect={() => {}}>Reset defaults</MenuItem>
          <MenuItem onSelect={() => {}}>Import config</MenuItem>
          <MenuSeparator />
          <MenuItem onSelect={() => {}} danger>Clear all data</MenuItem>
        </Menu>
      </div>
      <Divider />
      <Toggle contained label="Push notifications" helperText="Alerts on your device" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
      <Toggle contained label="Auto-save" helperText="Save changes automatically" checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />
      <Slider label="Font size" min={12} max={24} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} size="sm" showValue />
      <Select size="sm" label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} options={[{ value: "en", label: "English" }, { value: "es", label: "Español" }, { value: "fr", label: "Français" }, { value: "de", label: "Deutsch" }]} />
      <Divider />
      <div style={{ display: "flex", gap: "var(--lucent-space-2)" }}>
        <Button size="sm" variant="primary" style={{ flex: 1 }}>Save changes</Button>
        <Button size="sm" variant="ghost">Reset</Button>
      </div>
    </div>
  );
}

function PricingTable() {
  return (
    <div style={{ display: "flex", gap: "var(--lucent-space-4)" }}>
      <Card variant="outline" style={{ flex: 1 }}><Stack gap="3">
        <Text weight="semibold">Free</Text>
        <Text size="2xl" weight="bold">$0<Text size="sm" color="secondary">/mo</Text></Text>
        <Divider />
        <Text size="sm">5 projects</Text>
        <Text size="sm">1 GB storage</Text>
        <Text size="sm">Community support</Text>
        <Button variant="outline" fullWidth size="sm">Get started</Button>
      </Stack></Card>
      <Card variant="elevated" style={{ flex: 1, borderColor: "var(--lucent-accent-default)", borderWidth: 2 }}><Stack gap="3">
        <Chip variant="accent" size="sm">Popular</Chip>
        <Text weight="semibold">Pro</Text>
        <Text size="2xl" weight="bold">$19<Text size="sm" color="secondary">/mo</Text></Text>
        <Divider />
        <Text size="sm">Unlimited projects</Text>
        <Text size="sm">50 GB storage</Text>
        <Text size="sm">Priority support</Text>
        <Button variant="primary" fullWidth size="sm">Upgrade</Button>
      </Stack></Card>
      <Card variant="outline" style={{ flex: 1 }}><Stack gap="3">
        <Text weight="semibold">Enterprise</Text>
        <Text size="2xl" weight="bold">Custom</Text>
        <Divider />
        <Text size="sm">Unlimited everything</Text>
        <Text size="sm">SSO &amp; SAML</Text>
        <Text size="sm">Dedicated support</Text>
        <Button variant="outline" fullWidth size="sm">Contact sales</Button>
      </Stack></Card>
    </div>
  );
}

function NotificationFeed() {
  return (
    <Stack gap="1">
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
            <Text size="xs" color="secondary">15 min ago</Text>
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
}

function OnboardingFlow() {
  const [step, setStep] = useState(0);

  const steps = [
    // Step 0 — Account
    <Stack key={0} gap="3">
      <Input label="Email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="Create a password" />
    </Stack>,
    // Step 1 — Profile
    <Stack key={1} gap="3">
      <Input label="Full name" placeholder="Jane Doe" />
      <Input label="Username" placeholder="@jane" />
      <Select label="Role" options={[
        { value: "dev", label: "Developer" },
        { value: "design", label: "Designer" },
        { value: "pm", label: "Product Manager" },
      ]} />
    </Stack>,
    // Step 2 — Confirm
    <Stack key={2} gap="3">
      <Text size="sm" color="secondary" lineHeight="relaxed">
        Review your details and click Finish to create your account. You can always update these later in Settings.
      </Text>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--lucent-space-2)", padding: "var(--lucent-space-3)", background: "var(--lucent-accent-subtle)", borderRadius: "var(--lucent-radius-md)" }}>
        <Text size="sm"><Text size="sm" weight="medium">Email:</Text> you@example.com</Text>
        <Text size="sm"><Text size="sm" weight="medium">Name:</Text> Jane Doe</Text>
        <Text size="sm"><Text size="sm" weight="medium">Role:</Text> Designer</Text>
      </div>
    </Stack>,
  ];

  return (
    <Stack gap="5">
      <Stepper steps={["Account", "Profile", "Confirm"]} current={step} />
      {steps[step]}
      <Row gap="3" style={{ justifyContent: "flex-end" }}>
        {step > 0 && <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>Back</Button>}
        {step < 2
          ? <Button variant="primary" size="sm" onClick={() => setStep(step + 1)}>Next</Button>
          : <Button variant="primary" size="sm" onClick={() => setStep(0)}>Finish</Button>
        }
      </Row>
    </Stack>
  );
}

function DashboardHeader() {
  return (
    <Stack gap="4">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Analytics" }, { label: "Dashboard" }]} />
      <Row align="center" style={{ justifyContent: "space-between" }}>
        <Text as="h3" size="xl" weight="bold" family="display" style={{ margin: 0 }}>Dashboard</Text>
        <Row gap="2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="primary" size="sm">New report</Button>
        </Row>
      </Row>
      <div style={{ display: "flex", gap: "var(--lucent-space-3)" }}>
        <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Revenue</Text><Text size="lg" weight="bold">$48.2k</Text><Chip size="sm" variant="success">+12%</Chip></Stack></Card>
        <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Users</Text><Text size="lg" weight="bold">2,847</Text><Chip size="sm" variant="success">+8%</Chip></Stack></Card>
        <Card style={{ flex: 1 }}><Stack gap="1"><Text size="xs" color="secondary">Orders</Text><Text size="lg" weight="bold">1,024</Text><Chip size="sm" variant="danger">-3%</Chip></Stack></Card>
      </div>
    </Stack>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────

const COMPOSITIONS = [
  {
    name: "ProfileCard",
    description: "Avatar, name with status chip, bio, skill tags, follower stats row, and follow/message actions.",
    components: "Card, Avatar, Text, Chip, Divider, Button, Row, Stack",
    half: true,
    render: ProfileCard,
    code: `import { Card, Avatar, Text, Chip, Divider, Button, Row, Stack } from 'lucent-ui'

function ProfileCard() {
  return (
    <Card variant="elevated" style={{ maxWidth: 400 }}>
      <Stack gap="4">
        <Row gap="4">
          <Avatar alt="Jane Doe" src="/avatar.jpg" size="lg" />
          <Stack gap="1">
            <Row gap="2" align="center">
              <Text size="lg" weight="semibold">Jane Doe</Text>
              <Chip variant="success" size="sm" dot>Pro</Chip>
            </Row>
            <Text size="sm" color="secondary">Staff Product Designer</Text>
          </Stack>
        </Row>
        <Text size="sm" color="secondary" lineHeight="relaxed">
          Building design systems that scale.
        </Text>
        <Row gap="2" style={{ flexWrap: "wrap" }}>
          <Chip variant="neutral" size="sm">Design Systems</Chip>
          <Chip variant="neutral" size="sm">TypeScript</Chip>
          <Chip variant="neutral" size="sm">React</Chip>
        </Row>
        <Divider />
        <Row gap="4">
          {[{ value: "2.4k", label: "Followers" }, { value: "186", label: "Projects" }].map(s => (
            <Stack key={s.label} gap="0" style={{ flex: 1, textAlign: "center" }}>
              <Text size="xl" weight="bold">{s.value}</Text>
              <Text size="xs" color="secondary">{s.label}</Text>
            </Stack>
          ))}
        </Row>
        <Row gap="2">
          <Button size="sm" variant="primary" style={{ flex: 1 }}>Follow</Button>
          <Button size="sm" variant="ghost">Message</Button>
        </Row>
      </Stack>
    </Card>
  )
}`,
  },
  {
    name: "PreferencesCard",
    description: "Header with version badge and overflow menu, toggle setting rows with icons, font-size slider, language select, and save/reset footer.",
    components: "Card, Text, Badge, Menu, Toggle, Slider, Select, Divider, Button",
    half: true,
    render: PreferencesCard,
    code: `import { Card, Text, Badge, Menu, MenuItem, MenuSeparator, Toggle, Slider, Select, Divider, Button } from 'lucent-ui'

function PreferencesCard() {
  const [notifications, setNotifications] = useState(true)
  const [fontSize, setFontSize] = useState(16)
  const [language, setLanguage] = useState("en")

  return (
    <Card variant="elevated" style={{ maxWidth: 400 }}>
      <Stack gap="3">
        <Row align="center">
          <Text size="md" weight="semibold" style={{ flex: 1 }}>Preferences</Text>
          <Badge variant="accent" size="sm">v2.4</Badge>
          <Menu trigger={<Button size="2xs" variant="ghost">⋯</Button>}>
            <MenuItem onSelect={() => {}}>Reset defaults</MenuItem>
            <MenuSeparator />
            <MenuItem onSelect={() => {}} danger>Clear all data</MenuItem>
          </Menu>
        </Row>
        <Divider />
        <Toggle contained label="Push notifications"
          checked={notifications} onChange={e => setNotifications(e.target.checked)} />
        <Slider label="Font size" min={12} max={24}
          value={fontSize} onChange={e => setFontSize(Number(e.target.value))} size="sm" showValue />
        <Select size="sm" label="Language" value={language}
          onChange={e => setLanguage(e.target.value)}
          options={[{ value: "en", label: "English" }, { value: "es", label: "Español" }]} />
        <Divider />
        <Row gap="2">
          <Button size="sm" variant="primary" style={{ flex: 1 }}>Save changes</Button>
          <Button size="sm" variant="ghost">Reset</Button>
        </Row>
      </Stack>
    </Card>
  )
}`,
  },
  {
    name: "PricingTable",
    description: "Three-tier pricing cards (Free/Pro/Enterprise) with feature lists. Middle card highlighted with accent border and a Popular chip.",
    components: "Card, Stack, Row, Text, Chip, Divider, Button",
    half: false,
    render: PricingTable,
    code: `import { Card, Stack, Row, Text, Chip, Divider, Button } from 'lucent-ui'

function PricingTable() {
  return (
    <Row gap="4" align="stretch">
      <Card variant="outline" style={{ flex: 1 }}>
        <Stack gap="3">
          <Text weight="semibold">Free</Text>
          <Text size="2xl" weight="bold">$0<Text size="sm" color="secondary">/mo</Text></Text>
          <Divider />
          <Text size="sm">5 projects</Text>
          <Text size="sm">1 GB storage</Text>
          <Button variant="outline" fullWidth size="sm">Get started</Button>
        </Stack>
      </Card>
      <Card variant="elevated" style={{ flex: 1, borderColor: "var(--lucent-accent-default)", borderWidth: 2 }}>
        <Stack gap="3">
          <Chip variant="accent" size="sm">Popular</Chip>
          <Text weight="semibold">Pro</Text>
          <Text size="2xl" weight="bold">$19<Text size="sm" color="secondary">/mo</Text></Text>
          <Divider />
          <Text size="sm">Unlimited projects</Text>
          <Text size="sm">50 GB storage</Text>
          <Button variant="primary" fullWidth size="sm">Upgrade</Button>
        </Stack>
      </Card>
      <Card variant="outline" style={{ flex: 1 }}>
        <Stack gap="3">
          <Text weight="semibold">Enterprise</Text>
          <Text size="2xl" weight="bold">Custom</Text>
          <Divider />
          <Text size="sm">Unlimited everything</Text>
          <Text size="sm">SSO & SAML</Text>
          <Button variant="outline" fullWidth size="sm">Contact sales</Button>
        </Stack>
      </Card>
    </Row>
  )
}`,
  },
  {
    name: "NotificationFeed",
    description: "Notification list with read/unread states (accent-subtle background), type chips, and avatar sender indicators.",
    components: "Card, Stack, Row, Avatar, Text, Chip",
    half: true,
    render: NotificationFeed,
    code: `import { Card, Stack, Row, Avatar, Text, Chip } from 'lucent-ui'

function NotificationFeed({ notifications }) {
  return (
    <Stack gap="1">
      {notifications.map(n => (
        <Card key={n.id} style={n.unread ? { background: "var(--lucent-accent-subtle)" } : undefined}>
          <Row gap="3" align="start">
            <Avatar size="sm" alt={n.sender} />
            <Stack gap="1" style={{ flex: 1 }}>
              <Text size="sm" weight={n.unread ? "medium" : undefined}>{n.message}</Text>
              <Text size="xs" color="secondary">{n.time}</Text>
            </Stack>
            <Chip size="sm" variant={n.chipVariant}>{n.type}</Chip>
          </Row>
        </Card>
      ))}
    </Stack>
  )
}`,
  },
  {
    name: "OnboardingFlow",
    description: "Multi-step form with Stepper progress indicator, input fields, select dropdown, and back/next navigation.",
    components: "Stepper, Stack, Row, Input, Select, Button, Text",
    half: true,
    render: OnboardingFlow,
    code: `import { Stepper, Stack, Row, Input, Select, Button, Card } from 'lucent-ui'

function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const totalSteps = 3

  return (
    <Card>
      <Stack gap="5">
        <Stepper steps={["Account", "Profile", "Confirm"]} current={step} />

        {step === 0 && (
          <Stack gap="3">
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Password" type="password" />
          </Stack>
        )}
        {step === 1 && (
          <Stack gap="3">
            <Input label="Full name" placeholder="Jane Doe" />
            <Select label="Role" options={[
              { value: "dev", label: "Developer" },
              { value: "design", label: "Designer" },
            ]} />
          </Stack>
        )}
        {step === 2 && (
          <Text size="sm" color="secondary">Review and confirm your details.</Text>
        )}

        <Row gap="3" style={{ justifyContent: "flex-end" }}>
          {step > 0 && <Button variant="outline" size="sm" onClick={() => setStep(s => s - 1)}>Back</Button>}
          <Button variant="primary" size="sm"
            onClick={() => setStep(s => s < totalSteps - 1 ? s + 1 : 0)}>
            {step < totalSteps - 1 ? "Next" : "Finish"}
          </Button>
        </Row>
      </Stack>
    </Card>
  )
}`,
  },
  {
    name: "DashboardHeader",
    description: "Breadcrumb navigation, page title with action buttons, and a row of stat cards with trend chips.",
    components: "Breadcrumb, Text, Row, Stack, Card, Chip, Button",
    half: false,
    render: DashboardHeader,
    code: `import { Breadcrumb, Text, Row, Stack, Card, Chip, Button } from 'lucent-ui'

function DashboardHeader({ stats }) {
  return (
    <Stack gap="4">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />
      <Row align="center" style={{ justifyContent: "space-between" }}>
        <Text as="h1" size="2xl" weight="bold" family="display">Dashboard</Text>
        <Row gap="2">
          <Button variant="outline" size="sm">Export</Button>
          <Button variant="primary" size="sm">New report</Button>
        </Row>
      </Row>
      <Row gap="4">
        {stats.map(s => (
          <Card key={s.label} style={{ flex: 1 }}>
            <Stack gap="1">
              <Text size="xs" color="secondary">{s.label}</Text>
              <Text size="xl" weight="bold">{s.value}</Text>
              <Chip size="sm" variant={s.trend > 0 ? "success" : "danger"}>
                {s.trend > 0 ? "+" : ""}{s.trend}%
              </Chip>
            </Stack>
          </Card>
        ))}
      </Row>
    </Stack>
  )
}`,
  },
];

// ─── Code snippet ───────────────────────────────────────────────────────────

function CodeSnippet({ code, shell }: { code: string; shell: ReturnType<typeof getShell> }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 500,
          color: shell.muted,
          fontFamily: "var(--font-dm-sans), sans-serif",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}>&#x25B6;</span>
        {open ? "Hide code" : "View code"}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            background: shell.codeBg,
            border: `1px solid ${shell.border}`,
            borderRadius: 10,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <button
            onClick={copy}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              fontSize: 11,
              fontWeight: 500,
              color: copied ? "#e9c96b" : shell.subtle,
              background: shell.surface,
              border: `1px solid ${shell.border}`,
              borderRadius: 6,
              padding: "3px 10px",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              transition: "color 0.15s",
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre
            style={{
              margin: 0,
              padding: "16px 20px",
              fontSize: 12.5,
              lineHeight: 1.65,
              color: shell.codeText,
              overflowX: "auto",
              fontFamily: "monospace",
            }}
          >
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

function NavLink({
  href,
  children,
  external,
  shell,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  shell: ReturnType<typeof getShell>;
}) {
  const [hovered, setHovered] = useState(false);
  const sharedProps = {
    style: { color: hovered ? shell.text : shell.muted, transition: "color 0.15s" },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
      {children}
    </a>
  ) : (
    <Link href={href} {...sharedProps}>
      {children}
    </Link>
  );
}

export default function CompositionsPage() {
  const { pg, setPg } = usePlayground();
  const shell = useMemo(() => getShell(pg.theme), [pg.theme]);
  const isDark = pg.theme === "dark";

  return (
    <LucentProvider theme={pg.theme}>
    <LucentDevTools />
    <div
      className="min-h-screen flex flex-col"
      style={{ background: shell.bg, color: shell.text, transition: "background 0.2s, color 0.2s" }}
    >
      {/* Nav */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: shell.border }}
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-unbounded)", color: shell.text, textDecoration: "none" }}
        >
          Lucent UI
        </Link>
        <nav className="flex items-center gap-6 text-sm" style={{ color: shell.muted }}>
          <NavLink href="/components" shell={shell}>Components</NavLink>
          <NavLink href="/compositions" shell={shell}>Compositions</NavLink>
          <NavLink href="/components/changelog" shell={shell}>Changelog</NavLink>
          <NavLink href="https://www.npmjs.com/package/lucent-ui" external shell={shell}>npm</NavLink>
          <NavLink href="https://github.com/rozina-hudson/lucent-ui" external shell={shell}>GitHub</NavLink>
          <button
            onClick={() => {
              const newTheme = isDark ? "light" : "dark";
              const d = defaultPlaygroundState;

              const matchedPalette = PALETTE_OPTIONS.find((opt) => {
                const colors = resolveDimension(opt, pg.theme);
                return Object.entries(colors).every(
                  ([k, v]) => pg[k as keyof PlaygroundState] === v,
                );
              });
              if (matchedPalette) {
                setPg({ ...pg, theme: newTheme, ...resolveDimension(matchedPalette, newTheme) });
                return;
              }

              const allPresets = [...COMBINED_PRESETS, ...DESIGN_PRESETS];
              const matchedPreset = allPresets.find((preset) => {
                const resolved = resolvePreset(preset, pg.theme);
                return Object.entries(resolved).every(
                  ([k, v]) => pg[k as keyof PlaygroundState] === v,
                );
              });
              if (matchedPreset) {
                setPg({ ...pg, theme: newTheme, ...resolvePreset(matchedPreset, newTheme) });
                return;
              }

              setPg({
                ...pg,
                theme: newTheme,
                borderColor: d.borderColor,
                bgColor: d.bgColor,
                surfaceColor: d.surfaceColor,
                textColor: d.textColor,
              });
            }}
            aria-label="Toggle theme"
            style={{
              background: "none",
              border: `1px solid ${shell.border}`,
              borderRadius: 8,
              padding: "5px 10px",
              cursor: "pointer",
              color: shell.muted,
              fontSize: 13,
              lineHeight: 1,
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            {isDark ? "☀︎" : "☽"}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 24px 0" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            color: "#e9c96b",
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        >
          GOLDEN COMPOSITIONS
        </div>
        <h1
          style={{
            fontFamily: "var(--font-unbounded)",
            fontSize: 40,
            fontWeight: 700,
            color: shell.text,
            margin: "0 0 12px",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          Real UI. Not demos.
        </h1>
        <p
          style={{
            fontSize: 16,
            color: shell.muted,
            margin: "0 auto 48px",
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          Six interactive compositions that prove the component system produces polished,
          production-ready interfaces. Every element below is a live Lucent UI component.
        </p>
      </div>

      {/* Composition gallery */}
      <main style={{ flex: 1, maxWidth: 960, width: "100%", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {COMPOSITIONS.map((comp) => {
            const Preview = comp.render;
            return (
              <section key={comp.name}>
                {/* Label row */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                  <Text
                    as="h2"
                    family="display"
                    size="xl"
                    weight="semibold"
                    style={{ color: shell.text, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}
                  >
                    {comp.name}
                  </Text>
                  <div style={{ flex: 1, height: 1, background: shell.border }} />
                </div>

                <p style={{ fontSize: 14, color: shell.muted, margin: "0 0 8px", lineHeight: 1.6 }}>
                  {comp.description}
                </p>
                <p style={{ fontSize: 12, color: shell.subtle, margin: "0 0 20px", fontFamily: "monospace" }}>
                  {comp.components}
                </p>

                {/* Live preview */}
                <div
                  style={{
                    border: `1px solid ${shell.border}`,
                    borderRadius: 14,
                    padding: 28,
                    background: shell.surface,
                    position: "relative",
                    overflow: "hidden",
                    ...(comp.half ? { maxWidth: "50%" } : {}),
                  }}
                >
                  <LucentProvider theme={pg.theme}>
                    <ToastProvider position="bottom-right" duration={2000}>
                      <Preview />
                    </ToastProvider>
                  </LucentProvider>
                </div>

                <CodeSnippet code={comp.code} shell={shell} />
              </section>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-6 py-5 border-t text-xs"
        style={{ borderColor: shell.border, color: shell.subtle }}
      >
        <span>© {new Date().getFullYear()} Lucent UI</span>
        <span>MIT License</span>
      </footer>
    </div>
    </LucentProvider>
  );
}

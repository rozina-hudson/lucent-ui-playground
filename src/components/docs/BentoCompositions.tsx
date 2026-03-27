"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardBleed,
  Checkbox,
  Chip,
  CodeBlock,
  Collapsible,
  ColorPicker,
  ColorSwatch,
  DateRangePicker,
  Divider,
  EmptyState,
  FormField,
  Input,
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  MultiSelect,
  NavMenu,
  NavMenuItem,
  Progress,
  Radio,
  RadioGroup,
  Row,
  SearchInput,
  SegmentedControl,
  Select,
  Skeleton,
  Slider,
  Spinner,
  SplitButton,
  Stack,
  Table,
  Tabs,
  Text,
  Textarea,
  Timeline,
  ToastProvider,
  Toggle,
  Tooltip,
  useToast,
} from "lucent-ui";

// ─── Composition type ─────────────────────────────────────────────────────────

export type BentoComposition = {
  id: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  component: React.FC;
  /** When true the composition renders its own Card — BentoGrid skips the wrapper. */
  ownCard?: boolean;
};

// ─── 1. Incident Command ──────────────────────────────────────────────────────
// Alert, Progress (thresholds), Timeline, Chip (pulse/dot-only), Badge,
// SplitButton, Card (combo), Row, Stack, Divider, Spinner, Text, Button

const IncidentCommand: React.FC = () => {
  const [env, setEnv] = useState("staging");

  return (
    <Card
      variant="combo"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Incident #482</Text>
          <Chip variant="danger" size="sm" dot pulse>Active</Chip>
          <div style={{ flex: 1 }} />
          <Badge variant="danger" size="sm">P1</Badge>
        </Row>
      }
      footer={
        <Row gap="2">
          <SplitButton
            size="sm"
            variant="danger"
            onClick={() => {}}
            menuItems={[
              { label: "Escalate to VP Eng", onSelect: () => {} },
              { label: "Page secondary on-call", onSelect: () => {} },
            ]}
          >
            Escalate
          </SplitButton>
          <Button size="sm" variant="outline">Acknowledge</Button>
          <div style={{ flex: 1 }} />
          <Button size="sm" variant="ghost">View runbook</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Alert variant="danger" title="Payment processing degraded">
          p95 latency at 2.4s — automatic failover initiated to region us-west-2.
        </Alert>

        <Stack gap="2">
          <Progress value={92} max={100} warnAt={70} dangerAt={90} label="CPU — api-gateway" size="sm" />
          <Progress value={78} max={100} warnAt={70} dangerAt={90} label="Memory — api-gateway" size="sm" />
          <Progress value={34} max={100} variant="success" label="Disk — api-gateway" size="sm" />
        </Stack>

        <Divider label="Timeline" />

        <Timeline
          items={[
            { id: "1", title: "Auto-failover triggered", description: "Traffic rerouted to us-west-2", date: "2m ago", status: "danger" },
            { id: "2", title: "Alert fired", description: "p95 latency > 2s threshold", date: "4m ago", status: "warning" },
            { id: "3", title: "Deployment completed", description: "v2.4.1 rolled out to all pods", date: "8m ago", status: "success" },
          ]}
        />

        <SegmentedControl
          size="sm"
          value={env}
          onChange={setEnv}
          options={[
            { value: "staging", label: "Staging" },
            { value: "production", label: "Production" },
          ]}
        />
      </Stack>
    </Card>
  );
};

// ─── 2. Team Roster ───────────────────────────────────────────────────────────
// NavMenu, Avatar, Chip (ghost, dot), Badge, Card (elevated), Stack, Row,
// Divider, Text, Button, Tooltip

const TeamRoster: React.FC = () => {
  const [active, setActive] = useState("engineering");

  const members = [
    { name: "Alice Chen", role: "Lead Engineer", avatar: "alice", online: true },
    { name: "Bob Martinez", role: "Designer", avatar: "bob", online: true },
    { name: "Clara Kim", role: "PM", avatar: "clara", online: false },
    { name: "Dev Patel", role: "Backend", avatar: "dev", online: true },
  ];

  return (
    <Card
      variant="elevated"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Teams</Text>
          <Badge variant="accent" size="sm">4 online</Badge>
          <div style={{ flex: 1 }} />
          <Button size="2xs" variant="ghost">Invite</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <NavMenu size="sm" aria-label="Teams">
          <NavMenuItem isActive={active === "engineering"} onClick={() => setActive("engineering")}>
            Engineering
          </NavMenuItem>
          <NavMenuItem isActive={active === "design"} onClick={() => setActive("design")}>
            Design
          </NavMenuItem>
          <NavMenuItem isActive={active === "product"} onClick={() => setActive("product")}>
            Product
          </NavMenuItem>
        </NavMenu>

        <Divider />

        <Stack gap="2">
          {members.map((m) => (
            <Row key={m.name} gap="3" style={{ alignItems: "center" }}>
              <Tooltip content={m.role} delay={0}>
                <Avatar alt={m.name} src={`https://i.pravatar.cc/150?u=${m.avatar}`} size="sm" />
              </Tooltip>
              <Stack gap="0" style={{ flex: 1, minWidth: 0 }}>
                <Text size="sm" weight="semibold">{m.name}</Text>
                <Text size="xs" color="secondary">{m.role}</Text>
              </Stack>
              <Chip variant={m.online ? "success" : "neutral"} size="sm" dot />
            </Row>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

// ─── 3. Deploy Pipeline ──────────────────────────────────────────────────────
// Card (outline, status), Progress, Timeline, Chip, Badge, Breadcrumb,
// Button, ButtonGroup, Text, Stack, Row, Spinner, Textarea

const DeployPipeline: React.FC = () => {
  const [notes, setNotes] = useState("");

  return (
    <Card
      variant="outline"
      status="warning"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Deploy</Text>
          <Chip variant="accent" size="sm" borderless>v2.5.0</Chip>
          <Chip variant="warning" size="sm" dot>Rolling out</Chip>
          <div style={{ flex: 1 }} />
          <ButtonGroup>
            <Button size="2xs" variant="outline">Logs</Button>
            <Button size="2xs" variant="outline">Metrics</Button>
          </ButtonGroup>
        </Row>
      }
      footer={
        <Row gap="2">
          <Button size="sm" variant="primary" disabled>Promote to prod</Button>
          <Button size="sm" variant="danger-outline">Rollback</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Breadcrumb items={[{ label: "main" }, { label: "release/2.5.0" }, { label: "staging" }]} separator="→" />

        <Timeline
          items={[
            { id: "1", title: "Build", description: "Compiled in 38s", date: "3m ago", status: "success" },
            { id: "2", title: "Tests", description: "847 passed, 0 failed", date: "2m ago", status: "success" },
            { id: "3", title: "Staging deploy", description: "Rolling out 3/5 pods…", date: "Now", status: "warning" },
          ]}
        />

        <Row gap="2" style={{ alignItems: "center" }}>
          <Spinner size="xs" />
          <Text size="xs" color="secondary">Deploying to staging… 60% complete</Text>
        </Row>

        <Progress value={60} max={100} label="Rollout progress" size="sm" />

        <Card variant="filled" padding="sm">
          <Textarea
            size="sm"
            label="Release notes"
            placeholder="What changed…"
            autoResize
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ minHeight: 48 }}
          />
        </Card>
      </Stack>
    </Card>
  );
};

// ─── 4. Contact Form ──────────────────────────────────────────────────────────
// Input, Textarea, Select, Checkbox, Radio, RadioGroup, Toggle, FormField,
// DateRangePicker, MultiSelect, Button, Card, Stack, Row

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("support");
  const [priority, setPriority] = useState("normal");
  const [tags, setTags] = useState<string[]>(["bug"]);
  const [subscribe, setSubscribe] = useState(true);
  const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

  return (
    <Card
      variant="outline"
      header={<Text size="sm" weight="semibold">New request</Text>}
      footer={
        <Row gap="2">
          <Button size="sm" variant="primary" disabled={!name.trim()}>Submit</Button>
          <Button size="sm" variant="ghost">Cancel</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Row gap="2">
          <div style={{ flex: 1 }}>
            <Input size="sm" label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div style={{ flex: 1 }}>
            <Input size="sm" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
        </Row>

        <Select
          size="sm"
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          options={[
            { value: "support", label: "Technical support" },
            { value: "billing", label: "Billing inquiry" },
            { value: "feature", label: "Feature request" },
            { value: "other", label: "Other" },
          ]}
        />

        <MultiSelect
          size="sm"
          label="Tags"
          placeholder="Select tags…"
          value={tags}
          onChange={setTags}
          options={[
            { value: "bug", label: "Bug" },
            { value: "feature", label: "Feature" },
            { value: "docs", label: "Documentation" },
            { value: "ux", label: "UX" },
          ]}
        />

        <RadioGroup name="priority" value={priority} onChange={setPriority}>
          <Row gap="2" style={{ flexWrap: "wrap" }}>
            <Radio value="low" label="Low" contained size="sm" />
            <Radio value="normal" label="Normal" contained size="sm" />
            <Radio value="high" label="High" contained size="sm" />
            <Radio value="urgent" label="Urgent" contained size="sm" />
          </Row>
        </RadioGroup>

        <FormField label="Preferred dates" htmlFor="contact-dates">
          <DateRangePicker size="sm" value={range} onChange={setRange} placeholder="Select window…" />
        </FormField>

        <Toggle
          contained
          label="Subscribe to updates"
          helperText="Get notified when status changes"
          checked={subscribe}
          onChange={(e) => setSubscribe(e.target.checked)}
        />
      </Stack>
    </Card>
  );
};

// ─── 5. Code Review ───────────────────────────────────────────────────────────
// CodeBlock, SplitButton, Card (hoverable), Chip, Badge, Avatar, Text,
// Menu, MenuItem, MenuSeparator, Tooltip, Divider, Stack, Row, ButtonGroup

const CodeReview: React.FC = () => {
  return (
    <Card
      variant="combo"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">PR #347</Text>
          <Badge variant="success" size="sm">+124 −38</Badge>
          <div style={{ flex: 1 }} />
          <Row gap="1" style={{ alignItems: "center" }}>
            <Tooltip content="Alice Chen" delay={0}><Avatar alt="Alice" src="https://i.pravatar.cc/150?u=alice" size="xs" /></Tooltip>
            <Tooltip content="Bob Martinez" delay={0}><Avatar alt="Bob" src="https://i.pravatar.cc/150?u=bob" size="xs" /></Tooltip>
          </Row>
        </Row>
      }
      footer={
        <Row gap="2">
          <SplitButton
            size="sm"
            variant="primary"
            onClick={() => {}}
            menuItems={[
              { label: "Approve & merge", onSelect: () => {} },
              { label: "Squash & merge", onSelect: () => {} },
              { label: "Rebase & merge", onSelect: () => {} },
            ]}
          >
            Approve
          </SplitButton>
          <Button size="sm" variant="ghost">Request changes</Button>
          <div style={{ flex: 1 }} />
          <Menu trigger={<Button size="sm" variant="ghost">⋯</Button>}>
            <MenuItem onSelect={() => {}}>Copy branch name</MenuItem>
            <MenuItem onSelect={() => {}}>View diff in new tab</MenuItem>
            <MenuSeparator />
            <MenuItem onSelect={() => {}} danger>Close PR</MenuItem>
          </Menu>
        </Row>
      }
    >
      <Stack gap="3">
        <Card variant="ghost" padding="sm" hoverable>
          <Row gap="2" style={{ alignItems: "center" }}>
            <Chip variant="success" size="sm" dot>Passed</Chip>
            <Text size="sm">CI — all 847 tests passing</Text>
            <div style={{ flex: 1 }} />
            <Text size="xs" color="secondary">2m ago</Text>
          </Row>
        </Card>

        <Divider label="Changed files" />

        <CardBleed>
          <CodeBlock
            code={`// auth/middleware.ts
+export function validateSession(token: string) {
+  const decoded = verify(token, SECRET);
+  if (decoded.exp < Date.now() / 1000) {
+    throw new SessionExpiredError();
+  }
+  return decoded;
 }

-// TODO: add token refresh logic
+export async function refreshToken(token: string) {
+  const session = validateSession(token);
+  return sign({ ...session, exp: ttl() }, SECRET);
+}`}
            language="diff"
          />
        </CardBleed>

        <Row gap="1" style={{ flexWrap: "wrap" }}>
          <Chip variant="neutral" size="sm">auth</Chip>
          <Chip variant="neutral" size="sm">middleware</Chip>
          <Chip variant="accent" size="sm" ghost>reviewed</Chip>
        </Row>
      </Stack>
    </Card>
  );
};

// ─── 6. Analytics ─────────────────────────────────────────────────────────────
// Table, Progress (thresholds), SearchInput, SegmentedControl, Chip (pulse,
// dot-only), Badge, Card (combo), Divider, Text, Stack, Row

const Analytics: React.FC = () => {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("services");

  const services = [
    { name: "api-gateway", status: "healthy", latency: "12ms", cpu: 45, uptime: "99.99%" },
    { name: "auth-service", status: "healthy", latency: "8ms", cpu: 23, uptime: "100%" },
    { name: "payment-svc", status: "degraded", latency: "340ms", cpu: 87, uptime: "99.2%" },
    { name: "email-worker", status: "down", latency: "—", cpu: 0, uptime: "94.1%" },
  ];

  const statusVariant: Record<string, "success" | "warning" | "danger"> = {
    healthy: "success",
    degraded: "warning",
    down: "danger",
  };

  const filtered = search
    ? services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    : services;

  return (
    <Card
      variant="combo"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Infrastructure</Text>
          <Chip variant="danger" size="sm" dot pulse>2 issues</Chip>
          <div style={{ flex: 1 }} />
          <Badge variant="info" size="sm">Live</Badge>
        </Row>
      }
      footer={
        <Row gap="2" style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text size="xs" color="secondary">Last refreshed: just now</Text>
          <Button size="xs" variant="outline">Export</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Row gap="2">
          <div style={{ flex: 1 }}>
            <SearchInput size="sm" value={search} onChange={setSearch} placeholder="Filter services…" />
          </div>
          <SegmentedControl
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { value: "services", label: "Services" },
              { value: "metrics", label: "Metrics" },
            ]}
          />
        </Row>

        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Service</Table.Cell>
              <Table.Cell as="th">Status</Table.Cell>
              <Table.Cell as="th">CPU</Table.Cell>
              <Table.Cell as="th">Latency</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {filtered.map((s) => (
              <Table.Row key={s.name}>
                <Table.Cell>
                  <Text size="sm" style={{ fontFamily: "monospace", fontSize: 12 }}>{s.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Chip variant={statusVariant[s.status]} size="sm" dot>{s.status}</Chip>
                </Table.Cell>
                <Table.Cell>
                  <Progress value={s.cpu} max={100} warnAt={70} dangerAt={90} size="sm" />
                </Table.Cell>
                <Table.Cell><Text size="sm">{s.latency}</Text></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Divider />

        <Row gap="2" style={{ flexWrap: "wrap" }}>
          <Chip variant="success" size="sm" dot>2 healthy</Chip>
          <Chip variant="warning" size="sm" dot>1 degraded</Chip>
          <Chip variant="danger" size="sm" dot>1 down</Chip>
        </Row>
      </Stack>
    </Card>
  );
};

// ─── 7. Notification Feed ─────────────────────────────────────────────────────
// Alert (4 variants), Collapsible, Chip (pulse), Button, Text, Stack, Row,
// Skeleton, Badge, Card

const NotificationFeed: React.FC = () => {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const notifications = [
    { id: "a", variant: "success" as const, title: "Deploy succeeded", body: "v2.5.0 is live in production." },
    { id: "b", variant: "warning" as const, title: "Rate limit warning", body: "API quota at 87% — consider upgrading." },
    { id: "c", variant: "danger" as const, title: "Build failed", body: "2 type errors in checkout module." },
    { id: "d", variant: "info" as const, title: "Maintenance window", body: "Scheduled downtime Mar 30, 02:00–04:00 UTC." },
  ];

  const visible = notifications.filter((n) => !dismissed.includes(n.id));

  return (
    <Card
      variant="filled"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Notifications</Text>
          <Badge variant="accent" size="sm">{visible.length}</Badge>
          <div style={{ flex: 1 }} />
          <Button size="2xs" variant="ghost" onClick={() => setDismissed([])}>Reset</Button>
        </Row>
      }
    >
      <Stack gap="2">
        {visible.length === 0 ? (
          <Stack gap="2">
            <Skeleton style={{ height: 48, borderRadius: 8 }} />
            <Skeleton style={{ height: 48, borderRadius: 8 }} />
            <Text size="xs" color="secondary" style={{ textAlign: "center" }}>All caught up!</Text>
          </Stack>
        ) : (
          visible.map((n) => (
            <Alert
              key={n.id}
              variant={n.variant}
              title={n.title}
              onDismiss={() => setDismissed((prev) => [...prev, n.id])}
            >
              {n.body}
            </Alert>
          ))
        )}

        <Collapsible trigger="Older notifications">
          <Stack gap="2" style={{ paddingTop: 8 }}>
            <Card variant="ghost" padding="sm">
              <Row gap="2" style={{ alignItems: "center" }}>
                <Chip variant="success" size="sm" dot />
                <Text size="sm" color="secondary">Database migration completed — 12h ago</Text>
              </Row>
            </Card>
            <Card variant="ghost" padding="sm">
              <Row gap="2" style={{ alignItems: "center" }}>
                <Chip variant="info" size="sm" dot />
                <Text size="sm" color="secondary">New team member added — 1d ago</Text>
              </Row>
            </Card>
          </Stack>
        </Collapsible>
      </Stack>
    </Card>
  );
};

// ─── 8. File Manager ──────────────────────────────────────────────────────────
// Breadcrumb, SearchInput, Checkbox, Table, Menu, MenuItem, MenuGroup,
// MenuSeparator, Chip, Button, ButtonGroup, Text, Stack, Row, FileUpload,
// EmptyState, Card

const FileManager: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["package.json"]);

  const files = [
    { name: "src/", type: "folder", size: "—", modified: "2h ago" },
    { name: "package.json", type: "json", size: "1.2 KB", modified: "4h ago" },
    { name: "tsconfig.json", type: "json", size: "340 B", modified: "1d ago" },
    { name: "README.md", type: "md", size: "2.8 KB", modified: "3d ago" },
  ];

  const filtered = search
    ? files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  const toggle = (name: string) => {
    setSelected((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  };

  return (
    <Card
      variant="outline"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Files</Text>
          <div style={{ flex: 1 }} />
          <ButtonGroup>
            <Button size="2xs" variant="outline">Upload</Button>
            <Button size="2xs" variant="outline">New folder</Button>
          </ButtonGroup>
          <Menu trigger={<Button size="2xs" variant="ghost">⋯</Button>}>
            <MenuGroup label="View">
              <MenuItem onSelect={() => {}}>Grid view</MenuItem>
              <MenuItem onSelect={() => {}}>List view</MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem onSelect={() => {}}>Sort by name</MenuItem>
            <MenuItem onSelect={() => {}}>Sort by date</MenuItem>
          </Menu>
        </Row>
      }
    >
      <Stack gap="3">
        <Breadcrumb items={[{ label: "root" }, { label: "lucent-ui" }, { label: "src" }]} />

        <SearchInput size="sm" value={search} onChange={setSearch} placeholder="Search files…" />

        {filtered.length === 0 ? (
          <EmptyState
            title="No files found"
            description="Try a different search term."
            action={<Button size="sm" variant="outline" onClick={() => setSearch("")}>Clear search</Button>}
          />
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell as="th" style={{ width: 32 }} />
                <Table.Cell as="th">Name</Table.Cell>
                <Table.Cell as="th">Size</Table.Cell>
                <Table.Cell as="th">Modified</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {filtered.map((f) => (
                <Table.Row key={f.name}>
                  <Table.Cell>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(f.name)}
                      onChange={() => toggle(f.name)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Row gap="2" style={{ alignItems: "center" }}>
                      <Text size="sm">{f.type === "folder" ? "📁" : "📄"}</Text>
                      <Text size="sm" weight={f.type === "folder" ? "semibold" : "regular"}>{f.name}</Text>
                    </Row>
                  </Table.Cell>
                  <Table.Cell><Text size="sm" color="secondary">{f.size}</Text></Table.Cell>
                  <Table.Cell><Text size="sm" color="secondary">{f.modified}</Text></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}

        {selected.length > 0 && (
          <Row gap="2" style={{ alignItems: "center" }}>
            <Chip variant="accent" size="sm" borderless>{selected.length} selected</Chip>
            <Button size="2xs" variant="ghost" onClick={() => setSelected([])}>Clear</Button>
          </Row>
        )}
      </Stack>
    </Card>
  );
};

// ─── 9. Theme Studio ──────────────────────────────────────────────────────────
// ColorPicker, ColorSwatch, Slider, Collapsible, SegmentedControl, Toggle,
// Card (combo), Stack, Row, Chip, Text, Button, Divider

const ThemeStudio: React.FC = () => {
  const [color, setColor] = useState("#6366f1");
  const [radius, setRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [mode, setMode] = useState("Light");
  const [animations, setAnimations] = useState(true);

  const palette = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ef4444", "#14b8a6"];

  return (
    <Card
      variant="combo"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Theme Studio</Text>
          <Chip variant="accent" size="sm" borderless>Custom</Chip>
          <div style={{ flex: 1 }} />
          <SegmentedControl
            size="sm"
            value={mode}
            onChange={setMode}
            options={[
              { value: "Light", label: "Light" },
              { value: "Dark", label: "Dark" },
            ]}
          />
        </Row>
      }
      footer={
        <Row gap="2">
          <Button size="xs" variant="primary">Apply theme</Button>
          <Button size="xs" variant="outline">Export tokens</Button>
          <Button size="xs" variant="ghost">Reset</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Row gap="2" style={{ alignItems: "center" }}>
          <ColorPicker value={color} onChange={setColor} size="sm" />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
            {palette.map((c) => (
              <ColorSwatch key={c} color={c} size="md" selected={c === color} onClick={() => setColor(c)} />
            ))}
          </div>
        </Row>

        <Divider />

        <Collapsible trigger="Layout" defaultOpen>
          <Stack gap="3" style={{ paddingTop: 8 }}>
            <Slider label="Border radius" min={0} max={24} value={radius} onChange={(e) => setRadius(Number(e.target.value))} size="sm" showValue />
            <Slider label="Base spacing" min={4} max={32} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} size="sm" showValue />
            <Toggle contained label="Animations" helperText="Enable hover and focus effects" checked={animations} onChange={(e) => setAnimations(e.target.checked)} />
          </Stack>
        </Collapsible>

        <Collapsible trigger="Typography">
          <Stack gap="2" style={{ paddingTop: 8 }}>
            <Text size="xs" color="secondary">Preview</Text>
            <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
              <Text size="2xl" weight="bold">Aa</Text>
              <Text size="lg" weight="semibold">Heading</Text>
              <Text size="sm">Body text</Text>
              <Text size="xs" color="secondary">Caption</Text>
            </div>
          </Stack>
        </Collapsible>
      </Stack>
    </Card>
  );
};

// ─── 10. Chat Room ────────────────────────────────────────────────────────────
// Avatar, Text, Input, Button, Tooltip, Spinner, Card (outline), CardBleed,
// Chip, Badge, Stack, Row, Skeleton

const ChatRoom: React.FC = () => {
  const [msg, setMsg] = useState("");

  const messages = [
    { id: 1, user: "Alice", avatar: "alice", time: "10:32 AM", text: "Has anyone reviewed the new PR?" },
    { id: 2, user: "Bob", avatar: "bob", time: "10:34 AM", text: "Looking at it now — the API changes look solid 👍" },
    { id: 3, user: "Clara", avatar: "clara", time: "10:36 AM", text: "I left a few comments on error handling." },
  ];

  return (
    <Card
      variant="outline"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">#engineering</Text>
          <Chip variant="success" size="sm" dot pulse>3 online</Chip>
          <div style={{ flex: 1 }} />
          <Menu trigger={<Button size="2xs" variant="ghost">⋯</Button>}>
            <MenuItem onSelect={() => {}}>Channel settings</MenuItem>
            <MenuItem onSelect={() => {}}>Pinned messages</MenuItem>
            <MenuSeparator />
            <MenuItem onSelect={() => {}} danger>Leave channel</MenuItem>
          </Menu>
        </Row>
      }
      footer={
        <Row gap="2">
          <div style={{ flex: 1 }}>
            <Input size="sm" placeholder="Message #engineering…" value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <Button size="sm" variant="primary" disabled={!msg.trim()}>Send</Button>
        </Row>
      }
    >
      <Stack gap="3">
        {messages.map((m) => (
          <Row key={m.id} gap="2" style={{ alignItems: "flex-start" }}>
            <Tooltip content={m.user} delay={0}>
              <Avatar alt={m.user} src={`https://i.pravatar.cc/150?u=${m.avatar}`} size="sm" />
            </Tooltip>
            <Stack gap="0" style={{ flex: 1 }}>
              <Row gap="2" style={{ alignItems: "baseline" }}>
                <Text size="sm" weight="semibold">{m.user}</Text>
                <Text size="xs" color="secondary">{m.time}</Text>
              </Row>
              <Text size="sm">{m.text}</Text>
            </Stack>
          </Row>
        ))}

        <Row gap="2" style={{ alignItems: "center" }}>
          <Spinner size="xs" />
          <Text size="xs" color="secondary">Clara is typing…</Text>
        </Row>
      </Stack>
    </Card>
  );
};

// ─── 11. Project Board ────────────────────────────────────────────────────────
// Card (ghost, hoverable, selected), SegmentedControl, Chip, Avatar, Text,
// Menu, MenuItem, MenuGroup, MenuSeparator, Tooltip, Badge, Stack, Row,
// SplitButton, Tabs

const ProjectBoard: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(2);
  const [tab, setTab] = useState("board");

  const tasks = [
    { id: 1, title: "Fix auth redirect loop", status: "done", assignee: "alice", points: 3 },
    { id: 2, title: "Add dark mode toggle", status: "active", assignee: "bob", points: 5 },
    { id: 3, title: "Update API docs", status: "todo", assignee: "clara", points: 2 },
    { id: 4, title: "Refactor form validation", status: "active", assignee: "alice", points: 8 },
  ];

  const statusMap: Record<string, { variant: "neutral" | "warning" | "success"; label: string }> = {
    todo: { variant: "neutral", label: "To do" },
    active: { variant: "warning", label: "Active" },
    done: { variant: "success", label: "Done" },
  };

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <Card
      variant="ghost"
      header={
        <Row gap="2" style={{ alignItems: "center" }}>
          <Text size="sm" weight="semibold">Sprint 15</Text>
          <Chip variant="accent" size="sm" borderless>
            {tasks.reduce((s, t) => s + t.points, 0)} pts
          </Chip>
          <div style={{ flex: 1 }} />
          <SplitButton
            size="2xs"
            variant="outline"
            onClick={() => {}}
            menuItems={[
              { label: "Edit sprint", onSelect: () => {} },
              { label: "View burndown", onSelect: () => {} },
              { label: "End sprint", onSelect: () => {}, danger: true },
            ]}
          >
            Actions
          </SplitButton>
        </Row>
      }
    >
      <Stack gap="3">
        <Tabs
          tabs={[
            { value: "board", label: "Board", content: null },
            { value: "list", label: "List", content: null },
            { value: "timeline", label: "Timeline", content: null },
          ]}
          value={tab}
          onChange={setTab}
        />

        <SegmentedControl
          size="sm"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "todo", label: "To do" },
            { value: "active", label: "Active" },
            { value: "done", label: "Done" },
          ]}
        />

        <Stack gap="2">
          {filtered.map((t) => (
            <Card
              key={t.id}
              variant="outline"
              padding="sm"
              hoverable
              selected={selected === t.id}
              onClick={() => setSelected(selected === t.id ? null : t.id)}
            >
              <Row gap="2" style={{ alignItems: "center" }}>
                <Chip variant={statusMap[t.status].variant} size="sm" dot>
                  {statusMap[t.status].label}
                </Chip>
                <Text size="sm" style={{ flex: 1 }}>{t.title}</Text>
                <Badge variant="neutral" size="sm">{t.points}p</Badge>
                <Tooltip content={t.assignee} delay={0}>
                  <Avatar alt={t.assignee} src={`https://i.pravatar.cc/150?u=${t.assignee}`} size="xs" />
                </Tooltip>
              </Row>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

// ─── 12. Toast & Feedback ─────────────────────────────────────────────────────
// ToastProvider, useToast, Input, Radio, RadioGroup, Toggle, Button,
// Card (filled), Stack, Row, Text

const FeedbackTesterInner: React.FC = () => {
  const { toast } = useToast();
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("Changes saved successfully");
  const [withAction, setWithAction] = useState(false);

  const fire = () => {
    toast({
      title: message || "Notification",
      variant: variant as "default" | "success" | "warning" | "danger" | "info",
      ...(withAction ? { action: { label: "Undo", onClick: () => {} } } : {}),
    });
  };

  return (
    <Card
      variant="filled"
      header={<Text size="sm" weight="semibold">Toast playground</Text>}
      footer={
        <Row gap="2">
          <Button size="sm" variant="primary" onClick={fire}>Fire toast</Button>
          <Button size="sm" variant="ghost" onClick={() => setMessage("")}>Reset</Button>
        </Row>
      }
    >
      <Stack gap="3">
        <Input size="sm" label="Message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Toast message…" />

        <RadioGroup name="toast-v" value={variant} onChange={setVariant}>
          <Row gap="1" style={{ flexWrap: "wrap" }}>
            {["default", "success", "warning", "danger", "info"].map((v) => (
              <Radio key={v} value={v} label={v.charAt(0).toUpperCase() + v.slice(1)} contained size="sm" />
            ))}
          </Row>
        </RadioGroup>

        <Toggle
          contained
          label="Add action button"
          helperText="Include an Undo action"
          checked={withAction}
          onChange={(e) => setWithAction(e.target.checked)}
        />
      </Stack>
    </Card>
  );
};

const FeedbackTester: React.FC = () => (
  <ToastProvider position="bottom-right" duration={3000}>
    <FeedbackTesterInner />
  </ToastProvider>
);

// ─── Registry ─────────────────────────────────────────────────────────────────

// Order matters: CSS columns:3 flows items top→bottom per column, so the
// first 4 items fill the top of each column. Lead with neutral/calm cards
// and interleave the colorful ones (incident, notifications, deploy) lower.
export const BENTO_COMPOSITIONS: BentoComposition[] = [
  // ── column 1 top ──
  { id: "chat-room",         colSpan: 1, rowSpan: 2, component: ChatRoom,        ownCard: true },
  { id: "theme-studio",      colSpan: 1, rowSpan: 2, component: ThemeStudio,     ownCard: true },
  { id: "incident-command",  colSpan: 2, rowSpan: 2, component: IncidentCommand, ownCard: true },
  { id: "feedback-tester",   colSpan: 1, rowSpan: 2, component: FeedbackTester,  ownCard: true },
  // ── column 2 top ──
  { id: "project-board",     colSpan: 2, rowSpan: 1, component: ProjectBoard,    ownCard: true },
  { id: "file-manager",      colSpan: 2, rowSpan: 2, component: FileManager,     ownCard: true },
  { id: "notification-feed", colSpan: 1, rowSpan: 2, component: NotificationFeed, ownCard: true },
  { id: "analytics",         colSpan: 2, rowSpan: 2, component: Analytics,       ownCard: true },
  // ── column 3 top ──
  { id: "code-review",       colSpan: 2, rowSpan: 2, component: CodeReview,      ownCard: true },
  { id: "contact-form",      colSpan: 1, rowSpan: 2, component: ContactForm,     ownCard: true },
  { id: "deploy-pipeline",   colSpan: 2, rowSpan: 1, component: DeployPipeline,  ownCard: true },
  { id: "team-roster",       colSpan: 1, rowSpan: 2, component: TeamRoster,      ownCard: true },
];

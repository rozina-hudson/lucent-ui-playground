"use client";

import { useState } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
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
  FormField,
  Input,
  Menu,
  MenuGroup,
  MenuItem,
  MenuSeparator,
  Radio,
  RadioGroup,
  SearchInput,
  SegmentedControl,
  Select,
  Slider,
  Spinner,
  Table,
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

// ─── 1. Team Chat (2×2) ──────────────────────────────────────────────────────
// Card: outline with header, CardBleed for message area

const TeamChat: React.FC = () => {
  const [msg, setMsg] = useState("");

  const messages = [
    { id: 1, user: "Alice", time: "10:32 AM", text: "Has anyone reviewed the new PR?" },
    { id: 2, user: "Bob", time: "10:34 AM", text: "Looking at it now — the API changes look solid 👍" },
    { id: 3, user: "Clara", time: "10:36 AM", text: "I left a few comments on the error handling." },
  ];

  return (
    <Card
      variant="outline"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">#engineering</Text>
          <Chip variant="success" size="sm" dot>3 online</Chip>
          <div style={{ flex: 1 }} />
          <Menu trigger={<Button size="xs" variant="ghost">⋯</Button>}>
            <MenuItem onSelect={() => {}}>Channel settings</MenuItem>
            <MenuItem onSelect={() => {}}>Pinned messages</MenuItem>
            <MenuSeparator />
            <MenuItem onSelect={() => {}} danger>Leave channel</MenuItem>
          </Menu>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Input size="sm" placeholder="Message #engineering…" value={msg} onChange={(e) => setMsg(e.target.value)} />
          </div>
          <Button size="sm" variant="primary" disabled={!msg.trim()}>Send</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <Tooltip content={m.user} delay={0}>
              <Avatar alt={m.user} size="sm" />
            </Tooltip>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
                <Text size="sm" weight="semibold">{m.user}</Text>
                <Text size="xs" color="secondary">{m.time}</Text>
              </div>
              <Text size="sm">{m.text}</Text>
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Spinner size="xs" />
          <Text size="xs" color="secondary">Clara is typing…</Text>
        </div>
      </div>
    </Card>
  );
};

// ─── 2. Theme Builder (2×2) ──────────────────────────────────────────────────
// Card features: combo variant with header + footer (tinted chrome, elevated body)

const ThemeBuilder: React.FC = () => {
  const [color, setColor] = useState("#3b82f6");
  const [radius, setRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [mode, setMode] = useState("light");

  const palette = ["#3b82f6", "#8b5cf6", "#ef4444", "#f59e0b", "#22c55e", "#06b6d4"];

  return (
    <Card
      variant="combo"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Theme Studio</Text>
          <Chip variant="accent" size="sm" borderless>Custom</Chip>
          <div style={{ flex: 1 }} />
          <SegmentedControl
            size="sm"
            value={mode}
            onChange={setMode}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="xs" variant="primary">Apply theme</Button>
          <Button size="xs" variant="outline">Export tokens</Button>
          <Button size="xs" variant="ghost">Reset</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Card variant="filled" padding="sm">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ColorPicker value={color} onChange={setColor} size="sm" />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
              {palette.map((c) => (
                <ColorSwatch key={c} color={c} size="md" selected={c === color} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>
        </Card>

        <Collapsible trigger="Layout" defaultOpen>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
            <Slider label="Border radius" min={0} max={24} value={radius} onChange={(e) => setRadius(Number(e.target.value))} size="sm" showValue />
            <Slider label="Base spacing" min={4} max={32} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))} size="sm" showValue />
          </div>
        </Collapsible>
      </div>
    </Card>
  );
};

// ─── 3. Sprint Board (2×1) ───────────────────────────────────────────────────
// Card: ghost outer (transparent), interactive ghost Cards with selected state inside

const SprintBoard: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number | null>(2);

  const tasks = [
    { id: 1, title: "Fix auth redirect loop", status: "done", assignee: "Alice" },
    { id: 2, title: "Add dark mode toggle", status: "in-progress", assignee: "Bob" },
    { id: 3, title: "Update API docs", status: "todo", assignee: "Clara" },
    { id: 4, title: "Refactor form validation", status: "in-progress", assignee: "Alice" },
  ];

  const statusVariant: Record<string, "neutral" | "warning" | "success"> = {
    todo: "neutral",
    "in-progress": "warning",
    done: "success",
  };
  const statusLabels: Record<string, string> = {
    todo: "To do",
    "in-progress": "In progress",
    done: "Done",
  };

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <Card
      variant="ghost"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Sprint 14</Text>
          <Chip variant="accent" size="sm" borderless>8 pts</Chip>
          <div style={{ flex: 1 }} />
          <Menu trigger={<Button size="xs" variant="ghost">⋯</Button>}>
            <MenuGroup label="Sprint">
              <MenuItem onSelect={() => {}}>Edit sprint</MenuItem>
              <MenuItem onSelect={() => {}}>View burndown</MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem onSelect={() => {}} danger>End sprint</MenuItem>
          </Menu>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SegmentedControl
          size="sm"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All" },
            { value: "todo", label: "To do" },
            { value: "in-progress", label: "Active" },
            { value: "done", label: "Done" },
          ]}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map((t) => (
            <Card
              key={t.id}
              variant="outline"
              padding="sm"
              selected={selected === t.id}
              onClick={() => setSelected(selected === t.id ? null : t.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Chip variant={statusVariant[t.status]} size="sm" dot>{statusLabels[t.status]}</Chip>
                <Text size="sm" style={{ flex: 1 }}>{t.title}</Text>
                <Tooltip content={t.assignee} delay={0}>
                  <Avatar alt={t.assignee} size="xs" />
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

// ─── 4. Code Vault (1×2) ────────────────────────────────────────────────────
// Card: filled with header + footer, CardBleed for full-width code blocks

const CodeVault: React.FC = () => {
  const [search, setSearch] = useState("");

  const snippets = [
    {
      title: "Debounce hook",
      lang: "tsx",
      code: `function useDebounce<T>(value: T, ms = 300) {
  const [d, setD] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setD(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return d;
}`,
    },
    {
      title: "Fetch with retry",
      lang: "tsx",
      code: `async function fetchRetry(url: string, n = 3) {
  for (let i = 0; i < n; i++) {
    try { return await fetch(url); }
    catch (e) { if (i === n - 1) throw e; }
  }
}`,
    },
  ];

  const filtered = search
    ? snippets.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()))
    : snippets;

  return (
    <Card
      variant="filled"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Snippets</Text>
          <Chip variant="neutral" size="sm" borderless>{snippets.length} saved</Chip>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="xs" variant="primary">+ New snippet</Button>
          <Button size="xs" variant="ghost">Import</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SearchInput size="sm" value={search} onChange={setSearch} placeholder="Search snippets…" />

        {filtered.map((s, i) => (
          <Collapsible key={i} trigger={s.title} defaultOpen={i === 0}>
            <div style={{ paddingTop: 6 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <Chip size="sm" variant="accent" borderless>{s.lang.toUpperCase()}</Chip>
              </div>
              <CardBleed>
                <CodeBlock language={s.lang} code={s.code} />
              </CardBleed>
            </div>
          </Collapsible>
        ))}
      </div>
    </Card>
  );
};

// ─── 5. Volume Mixer (1×2) ──────────────────────────────────────────────────
// Card: elevated with header + footer, CardBleed for channel section

const VolumeMixer: React.FC = () => {
  const [master, setMaster] = useState(80);
  const [music, setMusic] = useState(65);
  const [voice, setVoice] = useState(90);
  const [effects, setEffects] = useState(50);
  const [muteEffects, setMuteEffects] = useState(false);

  return (
    <Card
      variant="elevated"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Audio mixer</Text>
          <Chip variant="success" size="sm" dot>Active</Chip>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 6 }}>
          <Tooltip content="Reset all levels to default" delay={0}>
            <Button size="xs" variant="ghost">Reset</Button>
          </Tooltip>
          <div style={{ flex: 1 }} />
          <Button size="xs" variant="primary">Apply</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Slider label="Master" min={0} max={100} value={master} onChange={(e) => setMaster(Number(e.target.value))} size="sm" showValue />

        <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)", borderBottom: "1px solid var(--lucent-border-default)", padding: "10px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Channels</Text>
            <Slider label="Music" min={0} max={100} value={music} onChange={(e) => setMusic(Number(e.target.value))} size="sm" showValue />
            <Slider label="Voice" min={0} max={100} value={voice} onChange={(e) => setVoice(Number(e.target.value))} size="sm" showValue />
            <Slider label="Effects" min={0} max={100} value={muteEffects ? 0 : effects} onChange={(e) => setEffects(Number(e.target.value))} size="sm" showValue disabled={muteEffects} />
          </div>
        </CardBleed>

        <Toggle contained label="Mute effects" helperText="Silence all sound effects" checked={muteEffects} onChange={(e) => setMuteEffects(e.target.checked)} />
      </div>
    </Card>
  );
};

// ─── 6. Travel Booking (2×1) ────────────────────────────────────────────────
// Card: outline with header, inner ghost Card with status="info"

const TravelBooking: React.FC = () => {
  const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);
  const [dest, setDest] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [tripType, setTripType] = useState("roundtrip");

  return (
    <Card
      variant="outline"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Book a trip</Text>
          <Chip variant="accent" size="sm" borderless>Flights + Hotels</Chip>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="sm" variant="primary" disabled={!dest.trim() || !range}>Search flights</Button>
          <Button size="sm" variant="ghost">Flexible dates</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SegmentedControl
          size="sm"
          value={tripType}
          onChange={setTripType}
          options={[
            { value: "roundtrip", label: "Round trip" },
            { value: "oneway", label: "One way" },
            { value: "multi", label: "Multi-city" },
          ]}
        />

        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 180px" }}>
            <Input size="sm" label="Destination" placeholder="Where to?" value={dest} onChange={(e) => setDest(e.target.value)} />
          </div>
          <div style={{ flex: "1 1 80px" }}>
            <Select
              size="sm"
              label="Travelers"
              options={[
                { value: "1", label: "1 adult" },
                { value: "2", label: "2 adults" },
                { value: "3", label: "3 adults" },
                { value: "4", label: "Family (2+2)" },
              ]}
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />
          </div>
        </div>

        <FormField label="Travel dates" htmlFor="travel-dates">
          <DateRangePicker size="sm" value={range} onChange={setRange} placeholder="Select dates…" />
        </FormField>

        {range && (
          <Card variant="ghost" status="info" padding="sm">
            <Text size="sm">Flights are 18% cheaper if you depart one day earlier.</Text>
          </Card>
        )}
      </div>
    </Card>
  );
};

// ─── 7. Toast Tester (1×2) ──────────────────────────────────────────────────
// Card: filled with header + footer

const ToastTesterInner: React.FC = () => {
  const { toast } = useToast();
  const [variant, setVariant] = useState("default");
  const [message, setMessage] = useState("Operation completed");
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
      header={<Text size="sm" weight="semibold">Toast tester</Text>}
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="sm" variant="primary" onClick={fire}>Fire toast</Button>
          <Button size="sm" variant="ghost" onClick={() => { setMessage(""); setVariant("default"); }}>Reset</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Input size="sm" label="Message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Toast message…" />

        <RadioGroup name="toast-variant" value={variant} onChange={setVariant}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["default", "success", "warning", "danger", "info"].map((v) => (
              <Radio key={v} value={v} label={v.charAt(0).toUpperCase() + v.slice(1)} contained size="sm" />
            ))}
          </div>
        </RadioGroup>

        <Toggle contained label="Add action button" helperText="Include an Undo action" checked={withAction} onChange={(e) => setWithAction(e.target.checked)} />
      </div>
    </Card>
  );
};

const ToastTester: React.FC = () => (
  <ToastProvider position="bottom-right" duration={3000}>
    <ToastTesterInner />
  </ToastProvider>
);

// ─── 8. Service Monitor (2×2) ───────────────────────────────────────────────
// Card features: combo variant with header + footer, ghost Cards with status accents

const ServiceMonitor: React.FC = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const services = [
    { name: "api-gateway", status: "healthy", latency: "12ms", uptime: "99.99%" },
    { name: "auth-service", status: "healthy", latency: "8ms", uptime: "100%" },
    { name: "payment-svc", status: "degraded", latency: "340ms", uptime: "99.2%" },
    { name: "email-worker", status: "down", latency: "—", uptime: "94.1%" },
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Services</Text>
          <Chip variant="danger" size="sm" dot>2 issues</Chip>
          <div style={{ flex: 1 }} />
          <Tooltip content="Refresh services" delay={0}>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
              }}
            >
              {loading ? <Spinner size="xs" /> : "↻"}
            </Button>
          </Tooltip>
        </div>
      }
      footer={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text size="xs" color="secondary">Last updated: just now</Text>
          <Button size="xs" variant="outline">Export report</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <SearchInput size="sm" value={search} onChange={setSearch} placeholder="Filter services…" />

        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell as="th">Service</Table.Cell>
              <Table.Cell as="th">Status</Table.Cell>
              <Table.Cell as="th">Latency</Table.Cell>
              <Table.Cell as="th">Uptime</Table.Cell>
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
                <Table.Cell><Text size="sm">{s.latency}</Text></Table.Cell>
                <Table.Cell><Text size="sm">{s.uptime}</Text></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Divider label="Recent incidents" />

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Card variant="ghost" status="warning" padding="sm">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text size="sm" weight="semibold">Payment timeouts</Text>
                <Text size="xs" color="secondary">p95 latency &gt; 300ms</Text>
              </div>
              <Text size="xs" color="secondary">5 min ago</Text>
            </div>
          </Card>
          <Card variant="ghost" status="danger" padding="sm">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text size="sm" weight="semibold">Email worker OOM</Text>
                <Text size="xs" color="secondary">Container restarting</Text>
              </div>
              <Text size="xs" color="secondary">12 min ago</Text>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};

// ─── 9. Recipe Card (1×2) ───────────────────────────────────────────────────
// Card features: elevated variant with header + footer, CardBleed for ingredients

const RecipeCard: React.FC = () => {
  const [servings, setServings] = useState(4);
  const [checked, setChecked] = useState<string[]>([]);

  const ingredients = [
    "2 cups all-purpose flour",
    "1 tsp baking powder",
    "3 large eggs",
    "1 cup whole milk",
    "2 tbsp melted butter",
  ];

  const toggleIngredient = (item: string) => {
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  return (
    <Card
      variant="elevated"
      header={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold" family="display">Classic Crêpes</Text>
          <Chip variant="neutral" size="sm" borderless>25 min</Chip>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="xs" variant="primary">Save recipe</Button>
          <Button size="xs" variant="ghost">Share</Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Chip size="sm" variant="success" borderless>Vegetarian</Chip>
          <Chip size="sm" variant="accent" borderless>Breakfast</Chip>
          <Chip size="sm" variant="warning" borderless>Easy</Chip>
        </div>

        <Slider label={`Servings: ${servings}`} min={1} max={12} value={servings} onChange={(e) => setServings(Number(e.target.value))} size="sm" />

        <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)", borderBottom: "1px solid var(--lucent-border-default)", padding: "10px 16px" }}>
          <Collapsible trigger="Ingredients" defaultOpen>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 6 }}>
              {ingredients.map((item) => (
                <Checkbox
                  key={item}
                  label={item}
                  size="sm"
                  checked={checked.includes(item)}
                  onChange={() => toggleIngredient(item)}
                />
              ))}
            </div>
          </Collapsible>
        </CardBleed>

        <Collapsible trigger="Instructions">
          <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 6 }}>
            <Text size="sm">1. Whisk flour and baking powder together.</Text>
            <Text size="sm">2. Beat eggs, then add milk and melted butter.</Text>
            <Text size="sm">3. Combine wet and dry ingredients until smooth.</Text>
            <Text size="sm">4. Cook on a buttered pan over medium heat.</Text>
          </div>
        </Collapsible>
      </div>
    </Card>
  );
};

// ─── 10. Release Pipeline (2×1) ─────────────────────────────────────────────
// Card features: status="warning" accent bar, filled Card for deploy notes

const ReleasePipeline: React.FC = () => {
  const [env, setEnv] = useState("staging");
  const [notes, setNotes] = useState("");

  const stages = [
    { id: "1", title: "Build", description: "Compiled in 42s", date: "2 min ago", status: "success" as const },
    { id: "2", title: "Unit tests", description: "312 passed, 0 failed", date: "1 min ago", status: "success" as const },
    { id: "3", title: "Deploy to staging", description: "Rolling out…", date: "Just now", status: "warning" as const },
  ];

  return (
    <Card status="warning">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Text size="sm" weight="semibold">Release</Text>
          <Chip variant="accent" size="sm" borderless>v2.4.0</Chip>
          <Chip variant="warning" size="sm" dot>Deploying</Chip>
        </div>

        <Breadcrumb items={[{ label: "main" }, { label: "release/2.4.0" }]} separator="→" />

        <SegmentedControl
          size="sm"
          value={env}
          onChange={setEnv}
          options={[
            { value: "staging", label: "Staging" },
            { value: "production", label: "Production" },
          ]}
        />

        <Timeline items={stages} />

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Spinner size="xs" />
          <Text size="xs" color="secondary">Deploying to {env}… ETA 45s</Text>
        </div>

        <Card variant="filled" padding="sm">
          <Textarea
            size="sm"
            label="Deploy notes"
            placeholder="What changed in this release…"
            autoResize
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ minHeight: 50 }}
          />
        </Card>

        <div style={{ display: "flex", gap: 8 }}>
          <Button size="sm" variant="primary" disabled={env === "staging"}>Promote to prod</Button>
          <Button size="sm" variant="outline">Rollback</Button>
        </div>
      </div>
    </Card>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "team-chat",        colSpan: 2, rowSpan: 2, component: TeamChat,        ownCard: true }, // outline + header/footer
  { id: "theme-builder",    colSpan: 2, rowSpan: 2, component: ThemeBuilder,     ownCard: true }, // combo + header/footer
  { id: "sprint-board",     colSpan: 2, rowSpan: 1, component: SprintBoard,     ownCard: true }, // ghost + header, inner outline cards
  { id: "code-vault",       colSpan: 1, rowSpan: 2, component: CodeVault,       ownCard: true }, // filled + header/footer
  { id: "volume-mixer",     colSpan: 1, rowSpan: 2, component: VolumeMixer,     ownCard: true }, // elevated + header/footer
  { id: "travel-booking",   colSpan: 2, rowSpan: 1, component: TravelBooking,   ownCard: true }, // outline + header/footer, inner status card
  { id: "toast-tester",     colSpan: 1, rowSpan: 2, component: ToastTester,     ownCard: true }, // filled + header/footer
  { id: "service-monitor",  colSpan: 2, rowSpan: 2, component: ServiceMonitor,  ownCard: true }, // combo + header/footer, inner status cards
  { id: "recipe-card",      colSpan: 1, rowSpan: 2, component: RecipeCard,      ownCard: true }, // elevated + header/footer + CardBleed
  { id: "release-pipeline", colSpan: 2, rowSpan: 1, component: ReleasePipeline, ownCard: true }, // status="warning" + inner filled card
];

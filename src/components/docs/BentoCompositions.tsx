"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Collapsible,
  CommandPalette,
  DataTable,
  DatePicker,
  DateRangePicker,
  EmptyState,
  FileUpload,
  FormField,
  Icon,
  Input,
  MultiSelect,
  NavLink,
  PageLayout,
  Radio,
  RadioGroup,
  SearchInput,
  Select,
  Skeleton,
  Spinner,
  Tag,
  Tabs,
  Text,
  Textarea,
  Timeline,
  Toggle,
  Tooltip,
  CardBleed,
} from "lucent-ui";
import type { UploadFile } from "lucent-ui";

// ─── Composition type ─────────────────────────────────────────────────────────

export type BentoComposition = {
  id: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  component: React.FC;
};

// ─── 1. Onboarding wizard (2×2) ──────────────────────────────────────────────

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("engineer");
  const [stack, setStack] = useState<string[]>(["react"]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [agreed, setAgreed] = useState(false);

  const steps = ["Profile", "Stack", "Confirm"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", height: "100%" }}>
      <div>
        <Breadcrumb
          items={steps.map((s, i) => ({
            label: s,
            onClick: i < step ? () => setStep(i) : undefined,
          }))}
        />
        <Text size="lg" weight="semibold" style={{ marginTop: 10 }}>
          {step === 0 ? "Tell us about yourself" : step === 1 ? "What's in your stack?" : "Almost done!"}
        </Text>
      </div>

      {step === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <FormField label="Full name" htmlFor="ob-name" required>
            <Input id="ob-name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: 8 }}>I am a…</Text>
            <RadioGroup name="ob-role" value={role} onChange={setRole}>
              <Radio value="designer" label="Product designer" />
              <Radio value="engineer" label="Software engineer" />
              <Radio value="pm" label="Product manager" />
              <Radio value="other" label="Something else" />
            </RadioGroup>
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <FormField label="Preferred stack" htmlFor="ob-stack">
            <MultiSelect
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "typescript", label: "TypeScript" },
                { value: "node", label: "Node.js" },
                { value: "python", label: "Python" },
                { value: "go", label: "Go" },
              ]}
              value={stack}
              onChange={setStack}
              placeholder="Select technologies…"
            />
          </FormField>
          <FormField label="Start date" htmlFor="ob-start">
            <DatePicker value={startDate} onChange={setStartDate} placeholder="When do you start?" />
          </FormField>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Alert variant="success" title="Looking good!">
            Review your choices below before finishing.
          </Alert>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Name", value: name || "—" },
              { label: "Role", value: role },
              { label: "Stack", value: stack.join(", ") || "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <Text size="sm" color="secondary">{label}</Text>
                <Text size="sm" weight="medium">{value}</Text>
              </div>
            ))}
          </div>
          <Checkbox label="I agree to the terms of service" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        {step > 0 && <Button size="sm" variant="ghost" onClick={() => setStep((s) => s - 1)}>Back</Button>}
        <div style={{ flex: 1 }} />
        {step < 2 ? (
          <Button size="sm" variant="primary" onClick={() => setStep((s) => s + 1)} disabled={step === 0 && !name.trim()}>
            Continue
          </Button>
        ) : (
          <Button size="sm" variant="primary" disabled={!agreed}>Finish setup</Button>
        )}
      </div>
    </div>
  );
};

// ─── 2. CRM contact profile (2×2) ────────────────────────────────────────────

const CRMContact: React.FC = () => {
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<UploadFile[]>([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Avatar alt="Sarah Chen" src="https://i.pravatar.cc/150?img=47" size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Text size="md" weight="semibold">Sarah Chen</Text>
              <div style={{ display: "flex", gap: 6, marginTop: 4, marginBottom: 4 }}>
                <Badge variant="success" size="sm" dot>Active</Badge>
                <Badge variant="accent" size="sm">Enterprise</Badge>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <Button size="sm" variant="ghost">Message</Button>
              <Button size="sm" variant="primary">Follow up</Button>
            </div>
          </div>
          <Text size="sm" color="secondary" style={{ marginBottom: 4 }}>VP of Engineering · Acme Corp</Text>
          <Breadcrumb items={[{ label: "Contacts" }, { label: "Acme Corp" }, { label: "Sarah Chen" }]} />
        </div>
      </div>

      <Tabs
        tabs={[
          {
            value: "activity",
            label: "Activity",
            content: (
              <div style={{ paddingTop: 8 }}>
                <Timeline
                  items={[
                    { id: "1", title: "Demo call scheduled", description: "30-min intro with product team.", date: "Today", status: "info" },
                    { id: "2", title: "Proposal sent", description: "Enterprise plan quote emailed.", date: "Yesterday", status: "success" },
                    { id: "3", title: "Follow-up missed", description: "No response after 3 days.", date: "Mar 1", status: "warning" },
                    { id: "4", title: "Initial contact", description: "Inbound lead via website.", date: "Feb 28", status: "success" },
                  ]}
                />
              </div>
            ),
          },
          {
            value: "files",
            label: "Files",
            content: (
              <div style={{ paddingTop: 8 }}>
                <FileUpload value={files} onChange={setFiles} accept=".pdf,.docx,.pptx" multiple maxSize={20 * 1024 * 1024} />
              </div>
            ),
          },
          {
            value: "notes",
            label: "Notes",
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <Textarea
                  placeholder="Add a private note…"
                  autoResize
                  maxLength={500}
                  showCount
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button size="sm" variant="primary" disabled={!notes.trim()}>Save note</Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─── 3. Project dashboard (2×2) ──────────────────────────────────────────────

const IssuesIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={8} cy={8} r={6} /><path d="M8 5v3l2 2" /></svg>
);
const TeamIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={6} cy={5} r={2.5} /><path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" /><path d="M11 3c1.5 0 3 1 3 3" /><path d="M15 13c0-2-1-3.5-3-3.5" /></svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><polyline points="2,12 5,8 8,10 12,5 14,7" /><rect x={1} y={1} width={14} height={14} rx={1} /></svg>
);
const GearIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={8} cy={8} r={2.5} /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M3.3 12.7l1.4-1.4M11.3 4.7l1.4-1.4" /></svg>
);

const ProjectDashboard: React.FC = () => {
  const [active, setActive] = useState("issues");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const navItems = [
    { id: "issues", label: "Issues", Icon: IssuesIcon },
    { id: "analytics", label: "Analytics", Icon: ChartIcon },
    { id: "team", label: "Team", Icon: TeamIcon },
    { id: "settings", label: "Settings", Icon: GearIcon },
  ];

  const allRows = [
    { title: "Fix auth token refresh", assignee: "Alice Lee", status: "In progress", priority: "High" },
    { title: "Add MultiSelect component", assignee: "Bob Kim", status: "Done", priority: "Medium" },
    { title: "Improve loading states", assignee: "Clara Roy", status: "Todo", priority: "Low" },
    { title: "Update design tokens", assignee: "Dan Mao", status: "In review", priority: "High" },
    { title: "Write onboarding docs", assignee: "Eve Ng", status: "Todo", priority: "Medium" },
  ];

  const rows = query
    ? allRows.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : allRows;

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearching(true);
    setTimeout(() => setSearching(false), 400);
  };

  return (
    <div style={{ overflow: "hidden", margin: "-16px", width: "calc(100% + 32px)" }}>
      <PageLayout
        header={
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
            <Text size="sm" weight="semibold" family="display">Lucent</Text>
            <div style={{ flex: 1 }} />
            <Tooltip content="Alice Lee" delay={0}>
              <Avatar alt="Alice Lee" size="xs" src="https://i.pravatar.cc/150?img=47" />
            </Tooltip>
          </div>
        }
        sidebar={
          <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px" }}>
            {navItems.map(({ id, label, Icon }) => (
              <NavLink key={id} as="button" isActive={active === id} icon={<Icon />} onClick={() => setActive(id)}>
                {label}
              </NavLink>
            ))}
          </div>
        }
        sidebarWidth={148}
        style={{ height: 300 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 16px", height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchInput value={query} onChange={handleSearch} placeholder="Search issues…" isLoading={searching} />
            </div>
            <Button size="sm" variant="primary">New issue</Button>
          </div>
          {searching ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Skeleton variant="rectangle" height={36} />
              <Skeleton variant="text" lines={3} />
            </div>
          ) : rows.length === 0 ? (
            <Text size="sm" color="secondary">No issues match your search.</Text>
          ) : (
            <DataTable
              columns={[
                { key: "title", header: "Title", sortable: true },
                { key: "assignee", header: "Assignee" },
                { key: "status", header: "Status", sortable: true },
                { key: "priority", header: "Priority", sortable: true },
              ]}
              rows={rows}
              pageSize={4}
            />
          )}
        </div>
      </PageLayout>
    </div>
  );
};

// ─── 4. Analytics report builder (2×1) ───────────────────────────────────────

const AnalyticsReport: React.FC = () => {
  const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);
  const [metrics, setMetrics] = useState<string[]>(["visitors", "conversions", "uptime"]);

  const allStats = [
    { key: "visitors",    label: "Visitors",    value: "58.7k",  change: "+22%",  variant: "success" as const },
    { key: "conversions", label: "Conversions", value: "3.6%",   change: "+0.5%", variant: "success" as const },
    { key: "revenue",     label: "Revenue",     value: "$12.4k", change: "+8%",   variant: "success" as const },
    { key: "churn",       label: "Churn",       value: "1.2%",   change: "-0.3%", variant: "danger"  as const },
    { key: "sessions",    label: "Sessions",    value: "142k",   change: "+18%",  variant: "success" as const },
    { key: "uptime",      label: "Uptime",      value: "99.9%",  change: "stable",variant: "neutral" as const },
  ];

  const stats = allStats.filter((s) => metrics.includes(s.key));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <Text size="sm" weight="semibold">Analytics</Text>
          <Text size="xs" color="secondary">Pick a period and choose metrics</Text>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <DateRangePicker value={range} onChange={setRange} placeholder="Date range…" />
          <MultiSelect
            options={allStats.map((s) => ({ value: s.key, label: s.label }))}
            value={metrics}
            onChange={setMetrics}
            placeholder="Metrics…"
          />
        </div>
      </div>
      <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)", paddingTop: 20 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {stats.length === 0 ? (
            <Text size="sm" color="secondary">Select at least one metric above.</Text>
          ) : stats.map(({ key, label, value, change, variant }) => (
            <div key={key} style={{ flex: "1 1 80px" }}>
              <Text size="xs" color="secondary">{label}</Text>
              <Text size="xl" weight="semibold">{value}</Text>
              <Badge variant={variant} size="sm">{change}</Badge>
            </div>
          ))}
        </div>
      </CardBleed>
    </div>
  );
};

// ─── 5. Deploy pipeline (1×2) ────────────────────────────────────────────────

const DeployPipeline: React.FC = () => {
  const [env, setEnv] = useState("staging");
  const [deploying, setDeploying] = useState(false);

  const stages = [
    { id: "1", title: "Build",           description: "webpack 5 — 1.2 MB bundle",       date: "2 min ago", status: "success" as const },
    { id: "2", title: "Unit tests",      description: "142 passed, 0 failed",             date: "1 min ago", status: "success" as const },
    { id: "3", title: `Deploy to ${env}`, description: deploying ? "Rolling out…" : "Awaiting trigger", date: "now", status: deploying ? "info" as const : "warning" as const },
    { id: "4", title: "Health check",   description: "Pending deploy",                  date: "—",         status: "info" as const },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div>
        <Breadcrumb items={[{ label: "lucent-ui" }, { label: "main" }, { label: "v2.5.0" }]} separator="/" />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <Text size="sm" weight="semibold">Pipeline</Text>
          <Badge variant={deploying ? "warning" : "neutral"} size="sm" dot={deploying}>
            {deploying ? "Running" : "Idle"}
          </Badge>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Select
          options={[
            { value: "staging", label: "Staging" },
            { value: "prod",    label: "Production" },
            { value: "preview", label: "Preview" },
          ]}
          value={env}
          onChange={(e) => setEnv(e.target.value)}
          size="sm"
        />
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="ghost"   disabled={!deploying} onClick={() => setDeploying(false)}>Cancel</Button>
        <Button size="sm" variant="primary" disabled={deploying}  onClick={() => setDeploying(true)}>Deploy</Button>
      </div>
      <Timeline items={stages} />
      <div style={{ marginTop: "auto" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
          <Tag variant="success" size="sm">Tests OK</Tag>
          <Tag variant="success" size="sm">Lint OK</Tag>
          <Tag variant="warning" size="sm">Bundle +12 kB</Tag>
        </div>
        {deploying && (
          <Alert variant="warning" title="Deploy in progress">
            Do not push new commits while rolling out.
          </Alert>
        )}
      </div>
    </div>
  );
};

// ─── 6. Settings panel (1×2) ─────────────────────────────────────────────────

const SettingsPanel: React.FC = () => {
  const [email,   setEmail]   = useState(true);
  const [push,    setPush]    = useState(false);
  const [weekly,  setWeekly]  = useState(true);
  const [twofa,   setTwofa]   = useState(false);
  const [theme,   setTheme]   = useState("system");
  const [features, setFeatures] = useState<string[]>(["ai", "analytics"]);

  const notifRows = [
    { label: "Email alerts",       val: email,  set: setEmail },
    { label: "Push notifications", val: push,   set: setPush },
    { label: "Weekly digest",      val: weekly, set: setWeekly },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 10 }}>Settings</Text>

      <CardBleed style={{ borderBottom: "1px solid var(--lucent-border-default)", padding: 0 }}>
        <Collapsible
          defaultOpen
          style={{ padding: "0 8px" }}
          trigger={<div style={{ padding: "8px 0", cursor: "pointer" }}><Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Notifications</Text></div>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 10 }}>
            {notifRows.map(({ label, val, set }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                <Text size="sm">{label}</Text>
                <Toggle size="sm" checked={val} onChange={(e) => set(e.target.checked)} />
              </div>
            ))}
          </div>
        </Collapsible>
      </CardBleed>

      <CardBleed style={{ borderBottom: "1px solid var(--lucent-border-default)", padding: 0 }}>
        <Collapsible
          style={{ padding: "0 8px" }}
          trigger={<div style={{ padding: "8px 0", cursor: "pointer" }}><Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Appearance</Text></div>}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 10 }}>
            <Select
              options={[
                { value: "system", label: "System default" },
                { value: "light",  label: "Light" },
                { value: "dark",   label: "Dark" },
              ]}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              size="sm"
            />
            <MultiSelect
              options={[
                { value: "ai",        label: "AI features" },
                { value: "analytics", label: "Analytics" },
                { value: "beta",      label: "Beta UI" },
                { value: "devtools",  label: "Dev tools" },
              ]}
              value={features}
              onChange={setFeatures}
              placeholder="Enabled features…"
            />
          </div>
        </Collapsible>
      </CardBleed>

      <CardBleed style={{ borderBottom: "1px solid var(--lucent-border-default)", padding: 0 }}>
        <Collapsible
         style={{ padding: "0 8px" }}
          trigger={<div style={{ padding: "8px 0", cursor: "pointer" }}><Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Security</Text></div>}
        >
          <div style={{ padding: "6px 0 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text size="sm">Two-factor auth</Text>
            <Toggle size="sm" checked={twofa} onChange={(e) => setTwofa(e.target.checked)} />
          </div>
        </Collapsible>
      </CardBleed>

      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <Button size="sm" variant="ghost">Reset</Button>
        <Button size="sm" variant="primary">Save changes</Button>
      </div>
    </div>
  );
};

// ─── 7. Event booking form (2×1) ─────────────────────────────────────────────

const EventBooking: React.FC = () => {
  const [title,      setTitle]      = useState("");
  const [date,       setDate]       = useState<Date | undefined>(undefined);
  const [regWindow,  setRegWindow]  = useState<{ start: Date; end: Date } | undefined>(undefined);
  const [sendInvites, setSendInvites] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Create event</Text>
        <Badge variant="neutral" size="sm">Draft</Badge>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <FormField label="Event name" htmlFor="ev-title" style={{ flex: 1 }}>
          <Input id="ev-title" placeholder="Q2 Product Kickoff" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormField>
        <FormField label="Registration window" htmlFor="ev-reg" style={{ flex: 1 }}>
          <DateRangePicker value={regWindow} onChange={setRegWindow} placeholder="Open → close" />
        </FormField>
      </div>
      <FormField label="Event date" htmlFor="ev-date">
        <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
      </FormField>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Toggle size="sm" checked={sendInvites} onChange={(e) => setSendInvites(e.target.checked)} />
          <Text size="sm" color="secondary">Send calendar invites</Text>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Button size="sm" variant="ghost">Save draft</Button>
          <Button size="sm" variant="primary" disabled={!title.trim() || !date}>Publish</Button>
        </div>
      </div>
    </div>
  );
};

// ─── 8. App overview dashboard (2×2) ─────────────────────────────────────────

const STATUS_DOT: Record<string, string> = {
  success: "#22c55e",
  warning: "#f59e0b",
  danger:  "#ef4444",
  info:    "#3b82f6",
};

const AppOverview: React.FC = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [taskName,  setTaskName]  = useState("");
  const [saved,     setSaved]     = useState(false);
  const [cmdOpen,   setCmdOpen]   = useState(false);

  const stats = [
    { value: "12", label: "Projects", accent: true },
    { value: "48", label: "Tasks",    accent: false },
    { value: "6",  label: "Members",  accent: false },
  ];

  const activity = [
    { title: "Design review completed", time: "2 min ago",  status: "success" as const },
    { title: "API keys rotated",        time: "1 hr ago",   status: "warning" as const },
    { title: "Deploy failed on staging",time: "3 hr ago",   status: "danger"  as const },
    { title: "New member joined",       time: "yesterday",  status: "info"    as const },
  ];

  const handleSave = () => {
    if (!taskName.trim()) return;
    setSaved(true);
    setTaskName("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      {/* App header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--lucent-accent-default)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Text size="xs" weight="bold" style={{ color: "var(--lucent-text-on-accent)", lineHeight: 1 }}>A</Text>
        </div>
        <Text size="sm" weight="semibold">Acme</Text>
        <div style={{ display: "flex", gap: 2, marginLeft: 4 }}>
          {(["Dashboard", "Projects", "Team"] as const).map((nav) => (
            <button
              key={nav}
              onClick={() => setActiveNav(nav.toLowerCase())}
              style={{
                padding: "3px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12,
                fontWeight: activeNav === nav.toLowerCase() ? 500 : 400,
                background: activeNav === nav.toLowerCase() ? "var(--lucent-surface-raised)" : "transparent",
                color: activeNav === nav.toLowerCase() ? "var(--lucent-text-primary)" : "var(--lucent-text-secondary)",
              }}
            >
              {nav}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Tooltip content="James Doe" delay={0}>
          <Avatar alt="James Doe" size="xs" />
        </Tooltip>
      </div>

      {/* Overview row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div>
          <Text size="sm" weight="semibold">Overview</Text>
          <Text size="xs" color="secondary">Last updated just now</Text>
        </div>
        <Button size="sm" variant="primary" onClick={() => setCmdOpen(true)}>+ New project</Button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8 }}>
        {stats.map(({ value, label, accent }) => (
          <div
            key={label}
            style={{
              flex: 1, padding: "10px 12px", borderRadius: 8,
              background: accent ? "var(--lucent-accent-default)" : "var(--lucent-surface)",
              border: accent ? "none" : "1px solid var(--lucent-border-default)",
            }}
          >
            <Text size="xl" weight="bold" style={{ color: accent ? "var(--lucent-text-on-accent)" : undefined, display: "block", lineHeight: 1.2 }}>{value}</Text>
            <Text size="xs" style={{ color: accent ? "var(--lucent-text-on-accent)" : "var(--lucent-text-secondary)" }}>{label}</Text>
          </div>
        ))}
      </div>

      {/* Add task */}
      <div style={{ padding: 12, borderRadius: 8, border: "1px solid var(--lucent-border-default)", background: "var(--lucent-surface)", display: "flex", flexDirection: "column", gap: 8 }}>
        <Text size="sm" weight="semibold">Add task</Text>
        {saved && <Alert variant="success" title="Task added">It appeared in your backlog.</Alert>}
        <Input placeholder="Task name…" value={taskName} onChange={(e) => setTaskName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSave()} />
        <div style={{ display: "flex", gap: 6 }}>
          <Button size="sm" variant="primary"  disabled={!taskName.trim()} onClick={handleSave}>Save</Button>
          <Button size="sm" variant="ghost"    onClick={() => setTaskName("")}>Cancel</Button>
        </div>
      </div>

      {/* Activity feed */}
      <div style={{ padding: 12, borderRadius: 8, border: "1px solid var(--lucent-border-default)", background: "var(--lucent-surface)" }}>
        <Text size="sm" weight="semibold" style={{ display: "block", marginBottom: 8 }}>Recent activity</Text>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {activity.map(({ title, time, status }, i) => (
            <div
              key={title}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 0",
                borderBottom: i < activity.length - 1 ? "1px solid var(--lucent-border-subtle)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_DOT[status], flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <Text size="sm" style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</Text>
                  <Text size="xs" color="secondary">{time}</Text>
                </div>
              </div>
              <Badge variant={status} size="sm" style={{ marginLeft: 8, flexShrink: 0 }}>{status}</Badge>
            </div>
          ))}
        </div>
        <Text size="xs" color="secondary" style={{ display: "block", marginTop: 8 }}>Showing 4 of 24 events</Text>
      </div>

      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        commands={[
          { id: "frontend", label: "Frontend redesign", group: "Projects", onSelect: () => setCmdOpen(false) },
          { id: "api",      label: "API v2",            group: "Projects", onSelect: () => setCmdOpen(false) },
          { id: "mobile",   label: "Mobile app",        group: "Projects", onSelect: () => setCmdOpen(false) },
        ]}
      />
    </div>
  );
};

// ─── 9. File workspace (1×2) ─────────────────────────────────────────────────

const UploadSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} />
  </svg>
);

const FileWorkspace: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const imageFiles = files.filter((f) => f.file.type.startsWith("image/"));
  const docFiles   = files.filter((f) => !f.file.type.startsWith("image/"));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text size="sm" weight="semibold">Assets</Text>
        {files.length > 0 && <Badge variant="neutral" size="sm">{files.length} file{files.length !== 1 ? "s" : ""}</Badge>}
      </div>
      <Tabs
        tabs={[
          {
            value: "upload",
            label: "Upload",
            content: (
              <div style={{ paddingTop: 8 }}>
                <FileUpload value={files} onChange={setFiles} accept="image/*,.pdf,.docx" multiple maxSize={20 * 1024 * 1024} />
              </div>
            ),
          },
          {
            value: "images",
            label: `Images${imageFiles.length > 0 ? ` (${imageFiles.length})` : ""}`,
            content: (
              <div style={{ paddingTop: 8 }}>
                {imageFiles.length === 0 ? (
                  <EmptyState illustration={<Icon size="xl"><UploadSvg /></Icon>} title="No images yet" description="Upload images in the Upload tab." />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {imageFiles.map((f) => (
                      <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, background: "var(--lucent-surface-subtle)" }}>
                        <Tag variant="accent" size="sm">IMG</Tag>
                        <Text size="sm" style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.file.name}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            value: "docs",
            label: `Docs${docFiles.length > 0 ? ` (${docFiles.length})` : ""}`,
            content: (
              <div style={{ paddingTop: 8 }}>
                {docFiles.length === 0 ? (
                  <EmptyState illustration={<Icon size="xl"><UploadSvg /></Icon>} title="No documents yet" description="Upload PDFs or docs in the Upload tab." />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {docFiles.map((f) => (
                      <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", borderRadius: 6, background: "var(--lucent-surface-subtle)" }}>
                        <Tag variant="neutral" size="sm">DOC</Tag>
                        <Text size="sm" style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.file.name}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            value: "videos",
            label: "Videos",
            content: (
              <div style={{ paddingTop: 8 }}>
                <EmptyState illustration={<Icon size="xl"><UploadSvg /></Icon>} title="No videos yet" description="Video uploads coming soon." />
              </div>
            ),
          },
          {
            value: "archives",
            label: "Archives",
            content: (
              <div style={{ paddingTop: 8 }}>
                <EmptyState illustration={<Icon size="xl"><UploadSvg /></Icon>} title="No archives" description="ZIP and TAR files will appear here." />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─── 10. Team roster (2×1) ───────────────────────────────────────────────────

const TeamRoster: React.FC = () => {
  const [query,   setQuery]   = useState("");
  const [roles,   setRoles]   = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (val: string) => {
    setQuery(val);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const allMembers = [
    { name: "Alice Lee",  role: "Engineer", status: "Active",   dept: "engineering" },
    { name: "Bob Kim",    role: "Designer", status: "Away",     dept: "design" },
    { name: "Clara Roy",  role: "Manager",  status: "Active",   dept: "product" },
    { name: "Dan Mao",    role: "Engineer", status: "Inactive", dept: "engineering" },
    { name: "Eve Ng",     role: "Designer", status: "Active",   dept: "design" },
  ];

  const filtered = allMembers.filter((m) => {
    const matchQuery = !query || m.name.toLowerCase().includes(query.toLowerCase());
    const matchRole  = roles.length === 0 || roles.includes(m.dept);
    return matchQuery && matchRole;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Team</Text>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Alice Lee", "Bob Kim", "Clara Roy"].map((name) => (
            <Tooltip key={name} content={name} delay={0}>
              <Avatar alt={name} size="xs" />
            </Tooltip>
          ))}
          <Badge variant="neutral" size="sm">+2</Badge>
        </div>
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="primary">Invite</Button>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <SearchInput value={query} onChange={handleSearch} placeholder="Search members…" isLoading={loading} />
        </div>
        <MultiSelect
          options={[
            { value: "engineering", label: "Engineering" },
            { value: "design",      label: "Design" },
            { value: "product",     label: "Product" },
          ]}
          value={roles}
          onChange={setRoles}
          placeholder="All depts…"
        />
      </div>
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton variant="rectangle" height={36} />
          <Skeleton variant="text" lines={3} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Spinner size="sm" />
            <Text size="xs" color="secondary">Loading…</Text>
          </div>
        </div>
      ) : (
        <DataTable
          columns={[
            { key: "name",   header: "Name",   sortable: true },
            { key: "role",   header: "Role",   sortable: true },
            { key: "status", header: "Status", sortable: true },
          ]}
          rows={filtered}
          pageSize={4}
        />
      )}
    </div>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "onboarding",    colSpan: 2, rowSpan: 2, component: OnboardingWizard },
  { id: "crm-contact",   colSpan: 2, rowSpan: 2, component: CRMContact },
  { id: "project-dash",  colSpan: 2, rowSpan: 2, component: ProjectDashboard },
  { id: "analytics",     colSpan: 2, rowSpan: 1, component: AnalyticsReport },
  { id: "deploy",        colSpan: 1, rowSpan: 2, component: DeployPipeline },
  { id: "settings",      colSpan: 1, rowSpan: 2, component: SettingsPanel },
  { id: "event-booking", colSpan: 2, rowSpan: 1, component: EventBooking },
  { id: "app-overview",  colSpan: 2, rowSpan: 2, component: AppOverview },
  { id: "file-workspace",colSpan: 1, rowSpan: 2, component: FileWorkspace },
  { id: "team-roster",   colSpan: 2, rowSpan: 1, component: TeamRoster },
];

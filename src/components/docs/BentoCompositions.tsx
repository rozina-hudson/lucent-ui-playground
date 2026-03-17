"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
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
  SearchInput,
  Select,
  Skeleton,
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

// ─── 1. Email composer (2×2) ────────────────────────────────────────────────

const EmailComposer: React.FC = () => {
  const [to, setTo] = useState("elena@acme.co");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("normal");
  const [sending, setSending] = useState(false);

  const canSend = to.trim() && subject.trim() && body.trim();

  const handleSend = () => {
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">New message</Text>
        <Badge variant="neutral" size="sm">Draft</Badge>
        <div style={{ flex: 1 }} />
        <Select
          size="sm"
          options={[
            { value: "low", label: "Low priority" },
            { value: "normal", label: "Normal" },
            { value: "high", label: "High priority" },
          ]}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Input size="sm" label="To" value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@email.com" />
        </div>
        <Button size="sm" variant="outline">CC</Button>
        <Button size="sm" variant="outline">BCC</Button>
      </div>

      <Input size="sm" label="Subject" placeholder="Re: Q2 planning…" value={subject} onChange={(e) => setSubject(e.target.value)} />

      <Textarea
        placeholder="Write your message…"
        autoResize
        maxLength={2000}
        showCount
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ flex: 1, minHeight: 100 }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Button size="sm" variant="primary" disabled={!canSend} loading={sending} onClick={handleSend}>
          Send
        </Button>
        <Button size="sm" variant="outline">Save draft</Button>
        <Button size="sm" variant="ghost">Attach</Button>
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="danger" disabled={!to && !subject && !body}>Discard</Button>
      </div>
    </div>
  );
};

// ─── 2. API playground (2×2) ────────────────────────────────────────────────

const APIPlayground: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/users");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState("");

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse(JSON.stringify({ users: [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }], total: 42 }, null, 2));
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">API Console</Text>
        <Badge variant="accent" size="sm">REST</Badge>
        <div style={{ flex: 1 }} />
        <SearchInput size="sm" value={history} onChange={setHistory} placeholder="Search history…" />
      </div>

      {/* Method + URL + Send — all sm, aligned heights */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ width: 100 }}>
          <Select
            size="sm"
            options={[
              { value: "GET", label: "GET" },
              { value: "POST", label: "POST" },
              { value: "PUT", label: "PUT" },
              { value: "DELETE", label: "DELETE" },
            ]}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Input size="sm" placeholder="https://api.example.com/…" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <Button size="sm" variant="primary" loading={loading} onClick={handleSend} disabled={!url.trim()}>
          Send
        </Button>
      </div>

      <Tabs
        tabs={[
          {
            value: "response",
            label: "Response",
            content: (
              <div style={{ paddingTop: 8 }}>
                {loading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <Skeleton variant="rectangle" height={20} />
                    <Skeleton variant="text" lines={4} />
                  </div>
                ) : response ? (
                  <Textarea value={response} onChange={() => {}} disabled style={{ fontFamily: "monospace", fontSize: 12, minHeight: 120 }} />
                ) : (
                  <Text size="sm" color="secondary">Send a request to see the response here.</Text>
                )}
              </div>
            ),
          },
          {
            value: "headers",
            label: "Headers",
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}><Input size="sm" placeholder="Key" defaultValue="Authorization" /></div>
                  <div style={{ flex: 2 }}><Input size="sm" placeholder="Value" defaultValue="Bearer •••••" /></div>
                  <Button size="sm" variant="ghost">Remove</Button>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}><Input size="sm" placeholder="Key" defaultValue="Content-Type" /></div>
                  <div style={{ flex: 2 }}><Input size="sm" placeholder="Value" defaultValue="application/json" /></div>
                  <Button size="sm" variant="ghost">Remove</Button>
                </div>
                <Button size="sm" variant="outline" style={{ alignSelf: "flex-start" }}>+ Add header</Button>
              </div>
            ),
          },
          {
            value: "body",
            label: "Body",
            content: (
              <div style={{ paddingTop: 8 }}>
                <Textarea placeholder='{ "name": "New User" }' autoResize style={{ fontFamily: "monospace", fontSize: 12, minHeight: 80 }} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─── 3. Support ticket (2×2) ────────────────────────────────────────────────

const SupportTicket: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [tags, setTags] = useState<string[]>(["bug"]);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title.trim() && desc.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">New ticket</Text>
        <Badge variant="warning" size="sm">Support</Badge>
      </div>

      {submitted && (
        <Alert variant="success" title="Ticket created">
          Your ticket has been submitted and assigned.
        </Alert>
      )}

      <FormField label="Title" htmlFor="tk-title" required>
        <Input id="tk-title" placeholder="Brief summary of the issue" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>

      {/* Priority + Assignee — sm aligned */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <FormField label="Priority" htmlFor="tk-priority">
            <Select
              size="sm"
              options={[
                { value: "low", label: "Low" },
                { value: "medium", label: "Medium" },
                { value: "high", label: "High" },
                { value: "critical", label: "Critical" },
              ]}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </FormField>
        </div>
        <div style={{ flex: 1 }}>
          <FormField label="Assignee" htmlFor="tk-assignee">
            <Select
              size="sm"
              placeholder="Unassigned"
              options={[
                { value: "alice", label: "Alice Lee" },
                { value: "bob", label: "Bob Kim" },
                { value: "clara", label: "Clara Roy" },
              ]}
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <FormField label="Labels" htmlFor="tk-tags">
        <MultiSelect
          options={[
            { value: "bug", label: "Bug" },
            { value: "feature", label: "Feature" },
            { value: "docs", label: "Documentation" },
            { value: "ux", label: "UX" },
            { value: "perf", label: "Performance" },
          ]}
          value={tags}
          onChange={setTags}
          placeholder="Add labels…"
        />
      </FormField>

      <Textarea
        label="Description"
        placeholder="Describe the issue in detail…"
        autoResize
        maxLength={1000}
        showCount
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Button size="sm" variant="primary" disabled={!canSubmit} onClick={() => setSubmitted(true)}>
          Submit ticket
        </Button>
        <Button size="sm" variant="outline">Save draft</Button>
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="danger" disabled={!title && !desc}>Clear form</Button>
      </div>
    </div>
  );
};

// ─── 4. Billing overview (2×1) ──────────────────────────────────────────────

const BillingOverview: React.FC = () => {
  const [range, setRange] = useState<{ start: Date; end: Date } | undefined>(undefined);

  const plans = [
    { name: "Free", price: "$0", current: false },
    { name: "Pro", price: "$29", current: true },
    { name: "Enterprise", price: "Custom", current: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div>
          <Text size="sm" weight="semibold">Billing</Text>
          <Text size="xs" color="secondary">Current period usage and plan</Text>
        </div>
        <DateRangePicker value={range} onChange={setRange} placeholder="Billing period…" />
      </div>

      <CardBleed style={{ borderTop: "1px solid var(--lucent-border-default)", paddingTop: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                flex: "1 1 100px",
                padding: "12px 14px",
                borderRadius: 8,
                border: plan.current ? "2px solid var(--lucent-accent-default)" : "1px solid var(--lucent-border-default)",
                background: plan.current ? "var(--lucent-accent-subtle)" : "var(--lucent-surface)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Text size="sm" weight="semibold">{plan.name}</Text>
                {plan.current && <Badge variant="accent" size="sm">Current</Badge>}
              </div>
              <Text size="lg" weight="bold">{plan.price}</Text>
              <Text size="xs" color="secondary">/month</Text>
              <div style={{ marginTop: 8 }}>
                {plan.current ? (
                  <Button size="sm" variant="secondary" disabled fullWidth>Active</Button>
                ) : plan.name === "Free" ? (
                  <Button size="sm" variant="ghost" disabled fullWidth>Downgrade</Button>
                ) : (
                  <Button size="sm" variant="outline" fullWidth>Upgrade</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBleed>
    </div>
  );
};

// ─── 5. Code review (1×2) ───────────────────────────────────────────────────

const CodeReview: React.FC = () => {
  const [comment, setComment] = useState("");
  const [approved, setApproved] = useState(false);

  const files = [
    { name: "src/Button.tsx", adds: 42, dels: 18, status: "modified" },
    { name: "src/Select.tsx", adds: 26, dels: 8, status: "modified" },
    { name: "src/SearchInput.tsx", adds: 14, dels: 3, status: "modified" },
    { name: "src/types.ts", adds: 6, dels: 0, status: "added" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Review</Text>
        <Badge variant="warning" size="sm">4 files</Badge>
      </div>
      <Breadcrumb items={[{ label: "main" }, { label: "feat/button-overhaul" }]} separator="→" />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {files.map((f) => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--lucent-border-subtle)" }}>
            <Tag variant={f.status === "added" ? "success" : "neutral"} size="sm">{f.status === "added" ? "A" : "M"}</Tag>
            <Text size="sm" style={{ flex: 1, fontFamily: "monospace", fontSize: 12 }}>{f.name}</Text>
            <Text size="xs" style={{ color: "var(--lucent-success-default)" }}>+{f.adds}</Text>
            <Text size="xs" style={{ color: "var(--lucent-danger-default)" }}>−{f.dels}</Text>
          </div>
        ))}
      </div>

      <Textarea
        placeholder="Leave a review comment…"
        autoResize
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ minHeight: 60 }}
      />

      <div style={{ display: "flex", gap: 6, marginTop: "auto", flexWrap: "wrap" }}>
        <Button size="sm" variant="primary" onClick={() => setApproved(true)} disabled={approved}>
          {approved ? "Approved" : "Approve"}
        </Button>
        <Button size="sm" variant="outline" disabled={!comment.trim()}>Request changes</Button>
        <Button size="sm" variant="ghost" disabled={!comment.trim()}>Comment</Button>
      </div>
    </div>
  );
};

// ─── 6. Feature flags (1×2) ─────────────────────────────────────────────────

const FeatureFlags: React.FC = () => {
  const [search, setSearch] = useState("");
  const [env, setEnv] = useState("staging");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    darkMode: true,
    aiAssist: true,
    betaUI: false,
    newOnboard: false,
    v2Api: true,
  });

  const allFlags = [
    { key: "darkMode", label: "Dark mode", locked: false },
    { key: "aiAssist", label: "AI assist", locked: false },
    { key: "betaUI", label: "Beta UI", locked: false },
    { key: "newOnboard", label: "New onboarding", locked: true },
    { key: "v2Api", label: "V2 API", locked: true },
  ];

  const filtered = allFlags.filter((f) => !search || f.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Feature flags</Text>
        <Badge variant="neutral" size="sm">{Object.values(flags).filter(Boolean).length} active</Badge>
      </div>

      {/* Environment select + search — sm aligned */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ width: 120 }}>
          <Select
            size="sm"
            options={[
              { value: "staging", label: "Staging" },
              { value: "prod", label: "Production" },
              { value: "dev", label: "Development" },
            ]}
            value={env}
            onChange={(e) => setEnv(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SearchInput size="sm" value={search} onChange={setSearch} placeholder="Filter flags…" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {filtered.map((flag) => (
          <div
            key={flag.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid var(--lucent-border-subtle)",
              opacity: flag.locked ? 0.6 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Text size="sm">{flag.label}</Text>
              {flag.locked && <Tag variant="neutral" size="sm">Locked</Tag>}
            </div>
            <Toggle
              size="sm"
              checked={flags[flag.key]}
              disabled={flag.locked}
              onChange={(e) => setFlags({ ...flags, [flag.key]: e.target.checked })}
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
        <Button size="sm" variant="primary" disabled={env === "prod"}>Deploy to {env}</Button>
        <Button size="sm" variant="outline">Reset</Button>
      </div>
    </div>
  );
};

// ─── 7. Invoice builder (2×1) ───────────────────────────────────────────────

const InvoiceBuilder: React.FC = () => {
  const [client, setClient] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const items = [
    { description: "UI design — homepage", hours: "12", rate: "$120", total: "$1,440" },
    { description: "Frontend development", hours: "24", rate: "$150", total: "$3,600" },
    { description: "QA & testing", hours: "8", rate: "$100", total: "$800" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Invoice</Text>
        <Badge variant="neutral" size="sm">INV-2024-037</Badge>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Input size="sm" label="Client" placeholder="Client name…" value={client} onChange={(e) => setClient(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <FormField label="Due date" htmlFor="inv-date">
            <DatePicker value={date} onChange={setDate} placeholder="Select date…" />
          </FormField>
        </div>
      </div>

      <DataTable
        columns={[
          { key: "description", header: "Description" },
          { key: "hours", header: "Hours" },
          { key: "rate", header: "Rate" },
          { key: "total", header: "Total" },
        ]}
        rows={items}
        pageSize={5}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <Button size="sm" variant="outline">+ Add line</Button>
          <Button size="sm" variant="ghost">Preview</Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Text size="sm" weight="semibold">Total: $5,840</Text>
          <Button size="sm" variant="primary" disabled={!client.trim()}>Send invoice</Button>
        </div>
      </div>
    </div>
  );
};

// ─── 8. Monitoring dashboard (2×2) ──────────────────────────────────────────

const MonitoringDashboard: React.FC = () => {
  const [activeNav, setActiveNav] = useState("overview");
  const [query, setQuery] = useState("");
  const [cmdOpen, setCmdOpen] = useState(false);

  const OverviewIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x={1} y={1} width={6} height={6} rx={1} /><rect x={9} y={1} width={6} height={6} rx={1} /><rect x={1} y={9} width={6} height={6} rx={1} /><rect x={9} y={9} width={6} height={6} rx={1} /></svg>
  );
  const AlertsIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M8 1L1 14h14L8 1z" /><path d="M8 6v4M8 12v0" /></svg>
  );
  const LogsIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M2 4h12M2 8h8M2 12h10" /></svg>
  );
  const MetricsIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><polyline points="2,12 5,8 8,10 12,5 14,7" /></svg>
  );

  const services = [
    { name: "api-gateway", status: "healthy", latency: "12ms", uptime: "99.99%" },
    { name: "auth-service", status: "healthy", latency: "8ms", uptime: "100%" },
    { name: "payment-svc", status: "degraded", latency: "340ms", uptime: "99.2%" },
    { name: "email-worker", status: "down", latency: "—", uptime: "94.1%" },
    { name: "search-index", status: "healthy", latency: "24ms", uptime: "99.98%" },
  ];

  const filtered = query
    ? services.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : services;

  const incidents = [
    { id: "1", title: "Payment timeouts", description: "p95 latency > 300ms on payment-svc", date: "5 min ago", status: "warning" as const },
    { id: "2", title: "Email worker crash", description: "OOM kill — restarting container", date: "12 min ago", status: "danger" as const },
    { id: "3", title: "Cert renewed", description: "TLS cert auto-renewed for *.api.acme.co", date: "2 hr ago", status: "success" as const },
  ];

  return (
    <div style={{ overflow: "hidden", margin: "-16px", width: "calc(100% + 32px)" }}>
      <PageLayout
        header={
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
            <Text size="sm" weight="semibold" family="display">Monitor</Text>
            <Badge variant="danger" size="sm" dot>2 issues</Badge>
            <div style={{ flex: 1 }} />
            <Button size="sm" variant="ghost" onClick={() => setCmdOpen(true)}>⌘K</Button>
            <Tooltip content="Ops team" delay={0}>
              <Avatar alt="Ops" size="xs" />
            </Tooltip>
          </div>
        }
        sidebar={
          <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px" }}>
            {[
              { id: "overview", label: "Overview", Icon: OverviewIcon },
              { id: "alerts", label: "Alerts", Icon: AlertsIcon },
              { id: "logs", label: "Logs", Icon: LogsIcon },
              { id: "metrics", label: "Metrics", Icon: MetricsIcon },
            ].map(({ id, label, Icon }) => (
              <NavLink key={id} as="button" isActive={activeNav === id} icon={<Icon />} onClick={() => setActiveNav(id)}>
                {label}
              </NavLink>
            ))}
          </div>
        }
        sidebarWidth={140}
        style={{ height: 340 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 16px", height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <SearchInput size="sm" value={query} onChange={setQuery} placeholder="Search services…" />
            </div>
            <Button size="sm" variant="outline">Export</Button>
          </div>

          <DataTable
            columns={[
              { key: "name", header: "Service", sortable: true },
              { key: "status", header: "Status", sortable: true },
              { key: "latency", header: "Latency" },
              { key: "uptime", header: "Uptime" },
            ]}
            rows={filtered}
            pageSize={4}
          />

          <Text size="xs" weight="semibold" color="secondary" style={{ marginTop: 4 }}>Recent incidents</Text>
          <Timeline items={incidents} />
        </div>
      </PageLayout>
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        commands={[
          { id: "restart", label: "Restart email-worker", group: "Actions", onSelect: () => setCmdOpen(false) },
          { id: "silence", label: "Silence payment alerts", group: "Actions", onSelect: () => setCmdOpen(false) },
          { id: "logs", label: "View recent logs", group: "Navigate", onSelect: () => { setActiveNav("logs"); setCmdOpen(false); } },
        ]}
      />
    </div>
  );
};

// ─── 9. Workspace settings (1×2) ────────────────────────────────────────────

const WorkspaceSettings: React.FC = () => {
  const [name, setName] = useState("Acme Corp");
  const [saved, setSaved] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 10 }}>Workspace</Text>

      {saved && <Alert variant="success" title="Saved" style={{ marginBottom: 8 }}>Workspace name updated.</Alert>}

      {/* Rename — sm aligned row */}
      <CardBleed style={{ borderBottom: "1px solid var(--lucent-border-default)", padding: "12px 0" }}>
        <div style={{ padding: "0 16px" }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>General</Text>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Input size="sm" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button size="sm" variant="primary" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </CardBleed>

      {/* Invite member — sm aligned */}
      <CardBleed style={{ borderBottom: "1px solid var(--lucent-border-default)", padding: "12px 0" }}>
        <div style={{ padding: "0 16px" }}>
          <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Invite member</Text>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Input size="sm" placeholder="email@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
            </div>
            <div style={{ width: 100 }}>
              <Select
                size="sm"
                options={[
                  { value: "member", label: "Member" },
                  { value: "admin", label: "Admin" },
                  { value: "viewer", label: "Viewer" },
                ]}
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
              />
            </div>
            <Button size="sm" variant="outline" disabled={!inviteEmail.includes("@")}>Invite</Button>
          </div>
        </div>
      </CardBleed>

      {/* Danger zone */}
      <div style={{ marginTop: "auto", padding: "12px 0" }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Danger zone</Text>
        <Checkbox
          label="I understand this action is irreversible"
          checked={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.checked)}
        />
        <div style={{ marginTop: 8 }}>
          <Button size="sm" variant="danger" disabled={!confirmDelete}>Delete workspace</Button>
        </div>
      </div>
    </div>
  );
};

// ─── 10. Data import (1×2) ──────────────────────────────────────────────────

const UploadSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} />
  </svg>
);

const DataImport: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [format, setFormat] = useState("csv");
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);

  const hasFile = files.length > 0;

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => { setImporting(false); setDone(true); }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Import data</Text>
        {hasFile && <Badge variant="accent" size="sm">{files.length} file{files.length !== 1 ? "s" : ""}</Badge>}
      </div>

      {done && (
        <Alert variant="success" title="Import complete">
          {files.length} file{files.length !== 1 ? "s" : ""} imported successfully.
        </Alert>
      )}

      {/* Format selector — sm aligned with label */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Select
            size="sm"
            label="Format"
            options={[
              { value: "csv", label: "CSV" },
              { value: "json", label: "JSON" },
              { value: "xlsx", label: "Excel (.xlsx)" },
            ]}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />
        </div>
      </div>

      <FileUpload
        value={files}
        onChange={(f) => { setFiles(f); setDone(false); }}
        accept={format === "csv" ? ".csv" : format === "json" ? ".json" : ".xlsx"}
        multiple
        maxSize={50 * 1024 * 1024}
      />

      {!hasFile && (
        <EmptyState
          illustration={<Icon size="lg"><UploadSvg /></Icon>}
          title="No files selected"
          description={`Upload a .${format} file to get started.`}
        />
      )}

      <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
        <Button size="sm" variant="primary" disabled={!hasFile || done} loading={importing} onClick={handleImport}>
          Import
        </Button>
        <Button size="sm" variant="outline" disabled={!hasFile} onClick={() => { setFiles([]); setDone(false); }}>
          Clear
        </Button>
      </div>
    </div>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "email-composer",   colSpan: 2, rowSpan: 2, component: EmailComposer },
  { id: "api-playground",   colSpan: 2, rowSpan: 2, component: APIPlayground },
  { id: "support-ticket",   colSpan: 2, rowSpan: 2, component: SupportTicket },
  { id: "billing",          colSpan: 2, rowSpan: 1, component: BillingOverview },
  { id: "code-review",      colSpan: 1, rowSpan: 2, component: CodeReview },
  { id: "feature-flags",    colSpan: 1, rowSpan: 2, component: FeatureFlags },
  { id: "invoice",          colSpan: 2, rowSpan: 1, component: InvoiceBuilder },
  { id: "monitoring",       colSpan: 2, rowSpan: 2, component: MonitoringDashboard },
  { id: "workspace",        colSpan: 1, rowSpan: 2, component: WorkspaceSettings },
  { id: "data-import",      colSpan: 1, rowSpan: 2, component: DataImport },
];

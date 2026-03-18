"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Breadcrumb,
  Button,
  CardBleed,
  Checkbox,
  Chip,
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
  Tabs,
  Text,
  Textarea,
  Timeline,
  Toggle,
  Tooltip,
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
// Showcases: Chip (dismissible recipients), Button xs, Textarea size

const EmailComposer: React.FC = () => {
  const [recipients, setRecipients] = useState(["elena@acme.co", "ops@acme.co"]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("normal");
  const [sending, setSending] = useState(false);

  const canSend = recipients.length > 0 && subject.trim() && body.trim();

  const handleSend = () => {
    setSending(true);
    setTimeout(() => setSending(false), 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">New message</Text>
        <Chip variant="neutral" size="sm" borderless>Draft</Chip>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Select
            size="sm"
            label="Priority"
            options={[
              { value: "low", label: "Low priority" },
              { value: "normal", label: "Normal" },
              { value: "high", label: "High priority" },
            ]}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <Text size="xs" color="secondary">To:</Text>
        {recipients.map((r) => (
          <Chip key={r} size="sm" onDismiss={() => setRecipients((prev) => prev.filter((x) => x !== r))}>{r}</Chip>
        ))}
        <Button size="xs" variant="ghost">+ Add</Button>
      </div>

      <Input size="sm" label="Subject" placeholder="Re: Q2 planning…" value={subject} onChange={(e) => setSubject(e.target.value)} />

      <Textarea
        size="sm"
        placeholder="Write your message…"
        autoResize
        maxLength={2000}
        showCount
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ flex: 1, minHeight: 100 }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Button size="xs" variant="primary" disabled={!canSend} loading={sending} onClick={handleSend}>Send</Button>
        <Button size="xs" variant="outline">Save draft</Button>
        <Button size="xs" variant="ghost">Attach</Button>
        <div style={{ flex: 1 }} />
        <Button size="xs" variant="danger" disabled={!recipients.length && !subject && !body}>Discard</Button>
      </div>
    </div>
  );
};

// ─── 2. API playground (2×2) ────────────────────────────────────────────────
// Showcases: Chip dot (status), SearchInput label, Textarea size

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
        <Chip variant="accent" size="sm" borderless>REST</Chip>
        {response && <Chip variant="success" size="sm" dot>200 OK</Chip>}
        <div style={{ flex: 1 }} />
        <SearchInput size="sm" value={history} onChange={setHistory} placeholder="Search history…" />
      </div>

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
        <Button size="sm" variant="primary" loading={loading} onClick={handleSend} disabled={!url.trim()}>Send request</Button>
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
                  <Textarea size="sm" value={response} onChange={() => {}} disabled style={{ fontFamily: "monospace", fontSize: 12, minHeight: 120 }} />
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
                <Textarea size="sm" placeholder='{ "name": "New User" }' autoResize style={{ fontFamily: "monospace", fontSize: 12, minHeight: 80 }} />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─── 3. Support ticket (2×2) ────────────────────────────────────────────────
// Showcases: MultiSelect label/helperText/size, Chip for applied labels, Textarea size

const SupportTicket: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [tags, setTags] = useState<string[]>(["bug"]);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title.trim() && desc.trim();

  const labelColors: Record<string, string> = {
    bug: "#ef4444",
    feature: "#3b82f6",
    docs: "#8b5cf6",
    ux: "#f59e0b",
    perf: "#22c55e",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">New ticket</Text>
        <Chip variant="warning" size="sm" dot>Support</Chip>
      </div>

      {submitted && (
        <Alert variant="success" title="Ticket created">
          Your ticket has been submitted and assigned.
        </Alert>
      )}

      <FormField label="Title" htmlFor="tk-title" required>
        <Input id="tk-title" placeholder="Brief summary of the issue" value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormField>

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

      <MultiSelect
        label="Labels"
        helperText="Categorize this ticket"
        size="sm"
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

      {tags.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <Chip key={t} size="sm" swatch={labelColors[t]} onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Chip>
          ))}
        </div>
      )}

      <Textarea
        size="sm"
        label="Description"
        placeholder="Describe the issue in detail…"
        autoResize
        maxLength={1000}
        showCount
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Button size="xs" variant="primary" disabled={!canSubmit} onClick={() => setSubmitted(true)}>Submit ticket</Button>
        <Button size="xs" variant="outline">Save draft</Button>
        <div style={{ flex: 1 }} />
        <Button size="xs" variant="danger" disabled={!title && !desc}>Clear form</Button>
      </div>
    </div>
  );
};

// ─── 4. Plan selector (2×1) ─────────────────────────────────────────────────
// Showcases: Contained Radio with helperText, Chip for plan features

const PlanSelector: React.FC = () => {
  const [plan, setPlan] = useState("pro");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Choose a plan</Text>
        <Chip variant="accent" size="sm" borderless>Billed monthly</Chip>
      </div>

      <RadioGroup name="plan-select" value={plan} onChange={setPlan}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 140px" }}>
            <Radio value="free" label="Free — $0/mo" helperText="Up to 3 projects, 1 GB storage" contained />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <Radio value="pro" label="Pro — $29/mo" helperText="Unlimited projects, 50 GB, priority support" contained />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <Radio value="enterprise" label="Enterprise" helperText="Custom limits, SSO, dedicated support" contained />
          </div>
        </div>
      </RadioGroup>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Chip size="sm" variant={plan === "free" ? "neutral" : "success"} leftIcon="✓">API access</Chip>
        <Chip size="sm" variant={plan !== "free" ? "success" : "neutral"} leftIcon={plan !== "free" ? "✓" : "×"}>Custom domains</Chip>
        <Chip size="sm" variant={plan === "enterprise" ? "success" : "neutral"} leftIcon={plan === "enterprise" ? "✓" : "×"}>SSO</Chip>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <Button size="xs" variant="primary">Confirm plan</Button>
        <Button size="xs" variant="ghost">Compare plans</Button>
      </div>
    </div>
  );
};

// ─── 5. Code review (1×2) ───────────────────────────────────────────────────
// Showcases: Chip (swatch for file status), Textarea size, Button xs

const CodeReview: React.FC = () => {
  const [comment, setComment] = useState("");
  const [approved, setApproved] = useState(false);

  const files = [
    { name: "src/Button.tsx", adds: 42, dels: 18, status: "modified" },
    { name: "src/Chip.tsx", adds: 180, dels: 0, status: "added" },
    { name: "src/Select.tsx", adds: 26, dels: 8, status: "modified" },
    { name: "src/types.ts", adds: 6, dels: 0, status: "added" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Review</Text>
        <Chip variant="warning" size="sm" dot>{files.length} files</Chip>
      </div>
      <Breadcrumb items={[{ label: "main" }, { label: "feat/chip-component" }]} separator="→" />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {files.map((f) => (
          <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid var(--lucent-border-subtle)" }}>
            <Chip variant={f.status === "added" ? "success" : "neutral"} size="sm" borderless>{f.status === "added" ? "A" : "M"}</Chip>
            <Text size="sm" style={{ flex: 1, fontFamily: "monospace", fontSize: 12 }}>{f.name}</Text>
            <Text size="xs" style={{ color: "var(--lucent-success-default)" }}>+{f.adds}</Text>
            <Text size="xs" style={{ color: "var(--lucent-danger-default)" }}>−{f.dels}</Text>
          </div>
        ))}
      </div>

      <Textarea
        size="sm"
        placeholder="Leave a review comment…"
        autoResize
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ minHeight: 60 }}
      />

      <div style={{ display: "flex", gap: 6, marginTop: "auto", flexWrap: "wrap" }}>
        <Button size="xs" variant="primary" onClick={() => setApproved(true)} disabled={approved}>
          {approved ? "Approved" : "Approve"}
        </Button>
        <Button size="xs" variant="outline" disabled={!comment.trim()}>Request changes</Button>
        <Button size="xs" variant="ghost" disabled={!comment.trim()}>Comment</Button>
      </div>
    </div>
  );
};

// ─── 6. Notification settings (1×2) ─────────────────────────────────────────
// Showcases: Contained Toggle with helperText and align

const NotificationSettings: React.FC = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}>
      <Text size="sm" weight="semibold">Notifications</Text>

      {saved && <Alert variant="success" title="Preferences saved">Your notification settings have been updated.</Alert>}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Toggle contained label="Email digest" helperText="Daily summary of activity" defaultChecked />
        <Toggle contained label="Push notifications" helperText="Real-time alerts on your device" defaultChecked />
        <Toggle contained label="Slack integration" helperText="Post updates to #team-alerts" align="right" />
        <Toggle contained label="Marketing emails" helperText="Occasional product news and tips" align="right" />
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
        <Button size="xs" variant="primary" onClick={handleSave}>Save preferences</Button>
        <Button size="xs" variant="ghost">Reset defaults</Button>
      </div>
    </div>
  );
};

// ─── 7. Invoice builder (2×1) ───────────────────────────────────────────────
// Showcases: Chip for status, DatePicker size, Button xs

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
        <Chip variant="neutral" size="sm" borderless>INV-2024-037</Chip>
        <Chip variant="warning" size="sm" dot>Pending</Chip>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Input size="sm" label="Client" placeholder="Client name…" value={client} onChange={(e) => setClient(e.target.value)} />
        </div>
        <div style={{ flex: 1 }}>
          <FormField label="Due date" htmlFor="inv-date">
            <DatePicker size="sm" value={date} onChange={setDate} placeholder="Select date…" />
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
// Showcases: Chip dot (service status), SearchInput label, Button xs

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
            <Chip variant="danger" size="sm" dot>2 issues</Chip>
            <div style={{ flex: 1 }} />
            <Button size="xs" variant="ghost" onClick={() => setCmdOpen(true)}>⌘K</Button>
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
// Showcases: Contained Checkbox with helperText, Chip for member roles, Button xs

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
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <Chip size="sm" leftIcon="👤" variant="accent">You (Owner)</Chip>
            <Chip size="sm" leftIcon="👤">Alice (Admin)</Chip>
            <Chip size="sm" leftIcon="👤">Bob (Member)</Chip>
          </div>
        </div>
      </CardBleed>

      <div style={{ marginTop: "auto", padding: "12px 0" }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Danger zone</Text>
        <Checkbox
          contained
          label="Delete this workspace"
          helperText="I understand this action is irreversible"
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
// Showcases: MultiSelect label/size for column mapping, Chip for file info, DateRangePicker size

const UploadSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} />
  </svg>
);

const DataImport: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [format, setFormat] = useState("csv");
  const [columns, setColumns] = useState<string[]>(["name", "email"]);
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
        {hasFile && <Chip variant="accent" size="sm" dot>{files.length} file{files.length !== 1 ? "s" : ""}</Chip>}
        {done && <Chip variant="success" size="sm" dot>Complete</Chip>}
      </div>

      {done && (
        <Alert variant="success" title="Import complete">
          {files.length} file{files.length !== 1 ? "s" : ""} imported successfully.
        </Alert>
      )}

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

      <MultiSelect
        label="Columns to import"
        helperText="Choose which columns to include"
        size="sm"
        options={[
          { value: "name", label: "Name" },
          { value: "email", label: "Email" },
          { value: "role", label: "Role" },
          { value: "created", label: "Created at" },
          { value: "status", label: "Status" },
        ]}
        value={columns}
        onChange={setColumns}
        placeholder="Select columns…"
      />

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
        <Button size="sm" variant="primary" disabled={!hasFile || done} loading={importing} onClick={handleImport}>Import</Button>
        <Button size="sm" variant="outline" disabled={!hasFile} onClick={() => { setFiles([]); setDone(false); }}>Clear</Button>
      </div>
    </div>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "email-composer",       colSpan: 2, rowSpan: 2, component: EmailComposer },
  { id: "api-playground",       colSpan: 2, rowSpan: 2, component: APIPlayground },
  { id: "support-ticket",       colSpan: 2, rowSpan: 2, component: SupportTicket },
  { id: "plan-selector",        colSpan: 2, rowSpan: 1, component: PlanSelector },
  { id: "code-review",          colSpan: 1, rowSpan: 2, component: CodeReview },
  { id: "notifications",        colSpan: 1, rowSpan: 2, component: NotificationSettings },
  { id: "invoice",              colSpan: 2, rowSpan: 1, component: InvoiceBuilder },
  { id: "monitoring",           colSpan: 2, rowSpan: 2, component: MonitoringDashboard },
  { id: "workspace",            colSpan: 1, rowSpan: 2, component: WorkspaceSettings },
  { id: "data-import",          colSpan: 1, rowSpan: 2, component: DataImport },
];

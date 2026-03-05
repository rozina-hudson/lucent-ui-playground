"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Divider,
  EmptyState,
  FormField,
  Icon,
  Input,
  NavLink,
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
  Toggle,
  Tooltip,
} from "lucent-ui";

// ─── Composition type ─────────────────────────────────────────────────────────

export type BentoComposition = {
  id: string;
  colSpan: 1 | 2;
  rowSpan: 1 | 2;
  component: React.FC;
};

// ─── 1. Onboarding wizard (2×2 featured) ─────────────────────────────────────

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("designer");
  const [agreed, setAgreed] = useState(false);
  const steps = ["Profile", "Role", "Confirm"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <div>
        <Breadcrumb
          items={steps.map((s, i) => ({
            label: s,
            onClick: i < step ? () => setStep(i) : undefined,
          }))}
        />
        <Text size="lg" weight="semibold" style={{ marginTop: 10 }}>
          {step === 0 ? "What's your name?" : step === 1 ? "Pick your role" : "You're all set"}
        </Text>
      </div>

      {step === 0 && (
        <FormField label="Full name" htmlFor="ob-name" required>
          <Input id="ob-name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
      )}
      {step === 1 && (
        <RadioGroup name="ob-role" value={role} onChange={setRole}>
          <Radio value="designer" label="Designer" />
          <Radio value="engineer" label="Engineer" />
          <Radio value="pm" label="Product Manager" />
          <Radio value="other" label="Other" />
        </RadioGroup>
      )}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Alert variant="success" title="Almost there">Review your choices before finishing.</Alert>
          <Checkbox label="I agree to the terms of service" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        {step > 0 && <Button size="sm" variant="ghost" onClick={() => setStep((s) => s - 1)}>Back</Button>}
        <div style={{ flex: 1 }} />
        {step < 2
          ? <Button size="sm" variant="primary" onClick={() => setStep((s) => s + 1)} disabled={step === 0 && !name.trim()}>Continue</Button>
          : <Button size="sm" variant="primary" disabled={!agreed}>Finish</Button>}
      </div>
    </div>
  );
};

// ─── 2. Tabbed settings (1×2 tall) ───────────────────────────────────────────

const TabbedSettings: React.FC = () => {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [twofa, setTwofa] = useState(false);
  const [passkeys, setPasskeys] = useState(true);

  return (
    <div style={{ width: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 10 }}>Settings</Text>
      <Tabs
        tabs={[
          {
            value: "notifs",
            label: "Notifications",
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 8 }}>
                {[
                  { label: "Email alerts", val: email, set: setEmail },
                  { label: "Push notifications", val: push, set: setPush },
                  { label: "Weekly digest", val: weekly, set: setWeekly },
                ].map(({ label, val, set }, i) => (
                  <div key={label}>
                    {i > 0 && <Divider />}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                      <Text size="sm">{label}</Text>
                      <Toggle size="sm" checked={val} onChange={(e) => set(e.target.checked)} />
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
          {
            value: "security",
            label: "Security",
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 8 }}>
                {[
                  { label: "Two-factor auth", val: twofa, set: setTwofa },
                  { label: "Passkeys", val: passkeys, set: setPasskeys },
                ].map(({ label, val, set }, i) => (
                  <div key={label}>
                    {i > 0 && <Divider />}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
                      <Text size="sm">{label}</Text>
                      <Toggle size="sm" checked={val} onChange={(e) => set(e.target.checked)} />
                    </div>
                  </div>
                ))}
                <Divider />
                <Button size="sm" variant="danger" style={{ marginTop: 8 }}>Revoke all sessions</Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─── 3. Sidebar nav (2×1 wide) ───────────────────────────────────────────────

const SidebarPreview: React.FC = () => {
  const [active, setActive] = useState("dashboard");
  const DashIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x={1} y={1} width={6} height={6} rx={1} /><rect x={9} y={1} width={6} height={6} rx={1} /><rect x={1} y={9} width={6} height={6} rx={1} /><rect x={9} y={9} width={6} height={6} rx={1} /></svg>
  );
  const UsersIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={6} cy={5} r={3} /><path d="M1 14c0-3 2-5 5-5s5 2 5 5" /><path d="M11 4c1.5 0 3 1 3 3" /><path d="M15 14c0-2-1-4-3-4" /></svg>
  );
  const ChartIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M2 12 L5 8 L8 10 L12 5 L14 7" /><rect x={1} y={1} width={14} height={14} rx={1} /></svg>
  );
  const SettingsIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx={8} cy={8} r={2.5} /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M3.3 12.7l1.4-1.4M11.3 4.7l1.4-1.4" /></svg>
  );
  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: DashIcon },
    { id: "analytics", label: "Analytics", Icon: ChartIcon },
    { id: "team", label: "Team", Icon: UsersIcon },
    { id: "settings", label: "Settings", Icon: SettingsIcon },
  ];

  return (
    <div style={{ display: "flex", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 140 }}>
        <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px", marginBottom: 4 }}>Navigation</Text>
        {navItems.map(({ id, label, Icon }) => (
          <NavLink
            key={id}
            as="button"
            isActive={active === id}
            icon={<Icon />}
            onClick={() => setActive(id)}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <Divider orientation="vertical" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <Text size="sm" weight="semibold">{navItems.find((n) => n.id === active)?.label}</Text>
        <Skeleton variant="rectangle" height={32} />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  );
};

// ─── 4. Deployment pipeline (2×1 wide) ───────────────────────────────────────

const DeploymentPipeline: React.FC = () => {
  const [env, setEnv] = useState("staging");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Breadcrumb items={[{ label: "main" }, { label: "v2.5.0" }]} separator="→" />
        <Badge variant="warning" size="sm" dot>Building</Badge>
      </div>
      <Divider />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Select
          label="Environment"
          options={[
            { value: "staging", label: "Staging" },
            { value: "prod", label: "Production" },
            { value: "preview", label: "Preview" },
          ]}
          value={env}
          onChange={(e) => setEnv(e.target.value)}
          size="sm"
        />
        <div style={{ flex: 1 }} />
        <Button size="sm" variant="ghost">Cancel</Button>
        <Button size="sm" variant="primary">Deploy</Button>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Tag variant="success" size="sm">Tests passed</Tag>
        <Tag variant="success" size="sm">Lint OK</Tag>
        <Tag variant="warning" size="sm">Bundle +12 kB</Tag>
      </div>
    </div>
  );
};

// ─── 5. Collapsible FAQ (1×2 tall) ───────────────────────────────────────────

const FaqPanel: React.FC = () => {
  const faqs = [
    { q: "What is Lucent UI?", a: "A design system for building beautiful, accessible React apps with zero friction." },
    { q: "Is it free to use?", a: "Yes — Lucent UI is open source under the MIT license." },
    { q: "Does it support dark mode?", a: "Yes. Switch between light and dark via the Appearance panel." },
    { q: "How do I customize tokens?", a: "Pass a tokens prop to LucentProvider to override any design token." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>FAQ</Text>
      {faqs.map((faq) => (
        <Collapsible
          key={faq.q}
          style={{ borderBottom: "1px solid var(--lucent-border-default)" }}
          trigger={
            <div style={{ padding: "10px 0", cursor: "pointer" }}>
              <Text size="sm" weight="medium">{faq.q}</Text>
            </div>
          }
        >
          <Text size="xs" color="secondary" style={{ paddingBottom: 10 }}>{faq.a}</Text>
        </Collapsible>
      ))}
    </div>
  );
};

// ─── 6. Analytics tabs (2×1 wide) ────────────────────────────────────────────

const AnalyticsTabs: React.FC = () => (
  <div style={{ width: "100%" }}>
    <Tabs
      defaultValue="week"
      tabs={[
        {
          value: "week",
          label: "This week",
          content: (
            <div style={{ display: "flex", gap: 16, paddingTop: 12 }}>
              {[
                { label: "Visitors", value: "14.2k", badge: "+8%", variant: "success" as const },
                { label: "Conversions", value: "3.1%", badge: "−0.4%", variant: "danger" as const },
                { label: "Uptime", value: "99.9%", badge: "stable", variant: "neutral" as const },
              ].map(({ label, value, badge, variant }) => (
                <div key={label} style={{ flex: 1 }}>
                  <Text size="xs" color="secondary">{label}</Text>
                  <Text size="xl" weight="semibold">{value}</Text>
                  <Badge variant={variant} size="sm">{badge}</Badge>
                </div>
              ))}
            </div>
          ),
        },
        {
          value: "month",
          label: "This month",
          content: (
            <div style={{ display: "flex", gap: 16, paddingTop: 12 }}>
              {[
                { label: "Visitors", value: "58.7k", badge: "+22%", variant: "success" as const },
                { label: "Conversions", value: "3.6%", badge: "+0.5%", variant: "success" as const },
                { label: "Uptime", value: "99.7%", badge: "−0.2%", variant: "warning" as const },
              ].map(({ label, value, badge, variant }) => (
                <div key={label} style={{ flex: 1 }}>
                  <Text size="xs" color="secondary">{label}</Text>
                  <Text size="xl" weight="semibold">{value}</Text>
                  <Badge variant={variant} size="sm">{badge}</Badge>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  </div>
);

// ─── 7. Team roster (2×1 wide) ───────────────────────────────────────────────

const TeamRoster: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", flexWrap: "wrap" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text size="sm" weight="semibold">Team</Text>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Tooltip content="Alice Lee" delay={0}><Avatar alt="Alice Lee" size="sm" /></Tooltip>
        <Tooltip content="Bob Kim" delay={0}><Avatar alt="Bob Kim" size="sm" /></Tooltip>
        <Tooltip content="Clara Roy" delay={0}><Avatar alt="Clara Roy" size="sm" /></Tooltip>
        <Tooltip content="Dan Mao" delay={0}><Avatar alt="Dan Mao" size="sm" /></Tooltip>
        <Tooltip content="Eve Ng" delay={0}><Avatar alt="Eve Ng" size="sm" /></Tooltip>
        <Badge variant="neutral" size="sm">+4</Badge>
      </div>
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ display: "flex", gap: 6 }}>
      <Button size="sm" variant="secondary">Manage</Button>
      <Button size="sm" variant="primary">Invite</Button>
    </div>
  </div>
);

// ─── 8. Command search (2×1 wide) ────────────────────────────────────────────

const CommandSearch: React.FC = () => {
  const [q, setQ] = useState("");
  const all = ["Button", "Input", "Select", "Tabs", "Alert", "Card", "Badge", "Toggle", "Breadcrumb", "NavLink", "Collapsible"];
  const results = q
    ? all.filter((x) => x.toLowerCase().includes(q.toLowerCase())).map((x, i) => ({ id: i, label: x }))
    : [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <SearchInput
        value={q}
        onChange={setQ}
        placeholder="Search components…"
        results={results}
        onResultSelect={(r) => setQ(r.label)}
      />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Tag variant="accent" size="sm">Tabs</Tag>
        <Tag variant="neutral" size="sm">Breadcrumb</Tag>
        <Tag variant="neutral" size="sm">NavLink</Tag>
        <Tag variant="success" size="sm">Collapsible</Tag>
        <Tag variant="neutral" size="sm">Alert</Tag>
      </div>
    </div>
  );
};

// ─── 9. Loading skeleton (1×1) ───────────────────────────────────────────────

const LoadingCard: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Skeleton variant="circle" width={36} height={36} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="rectangle" height={56} />
    <Skeleton variant="text" lines={2} />
  </div>
);

// ─── 10. User profile (2×1 wide) ─────────────────────────────────────────────

const UserProfile: React.FC = () => (
  <div style={{ display: "flex", gap: 14, alignItems: "center", width: "100%" }}>
    <Avatar alt="Jane Doe" size="lg" src="https://i.pravatar.cc/150?img=47" />
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
        <Text size="md" weight="semibold">Jane Doe</Text>
        <Badge variant="accent" size="sm" dot>Admin</Badge>
      </div>
      <Breadcrumb items={[{ label: "Design Systems" }, { label: "Lucent UI" }, { label: "Jane Doe" }]} />
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      <Button size="sm" variant="ghost">Message</Button>
      <Button size="sm" variant="primary">Follow</Button>
    </div>
  </div>
);

// ─── 11. Status board (1×1) ──────────────────────────────────────────────────

const StatusBoard: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Spinner size="sm" />
      <Text size="sm" color="secondary">Processing…</Text>
      <Badge variant="warning" size="sm">3 pending</Badge>
    </div>
    <Divider />
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      <Badge variant="success" dot>Deployed</Badge>
      <Badge variant="warning">Queued</Badge>
      <Badge variant="danger">2 errors</Badge>
      <Badge variant="neutral">Draft</Badge>
    </div>
  </div>
);

// ─── 12. Collapsible filters (1×2 tall) ──────────────────────────────────────

const CollapsibleFilters: React.FC = () => {
  const [cat, setCat] = useState("all");
  const [avail, setAvail] = useState(true);
  const [dep, setDep] = useState(false);
  const [atom, setAtom] = useState(true);
  const [molecule, setMolecule] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Filter</Text>
      <Collapsible
        defaultOpen
        style={{ borderBottom: "1px solid var(--lucent-border-default)" }}
        trigger={
          <div style={{ padding: "8px 0", cursor: "pointer" }}>
            <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Category</Text>
          </div>
        }
      >
        <div style={{ paddingBottom: 10 }}>
          <Select
            options={[
              { value: "all", label: "All" },
              { value: "atoms", label: "Atoms" },
              { value: "molecules", label: "Molecules" },
            ]}
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            size="sm"
          />
        </div>
      </Collapsible>
      <Collapsible
        defaultOpen
        style={{ borderBottom: "1px solid var(--lucent-border-default)" }}
        trigger={
          <div style={{ padding: "8px 0", cursor: "pointer" }}>
            <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Tier</Text>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 10 }}>
          <Checkbox label="Atom" size="sm" checked={atom} onChange={(e) => setAtom(e.target.checked)} />
          <Checkbox label="Molecule" size="sm" checked={molecule} onChange={(e) => setMolecule(e.target.checked)} />
        </div>
      </Collapsible>
      <Collapsible
        style={{ borderBottom: "1px solid var(--lucent-border-default)" }}
        trigger={
          <div style={{ padding: "8px 0", cursor: "pointer" }}>
            <Text size="xs" weight="bold" color="secondary" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>Status</Text>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingBottom: 10 }}>
          <Checkbox label="Available" size="sm" checked={avail} onChange={(e) => setAvail(e.target.checked)} />
          <Checkbox label="Deprecated" size="sm" checked={dep} onChange={(e) => setDep(e.target.checked)} />
        </div>
      </Collapsible>
      <Button size="sm" variant="ghost" style={{ marginTop: 10 }}>Reset all</Button>
    </div>
  );
};

// ─── 13. Empty state (1×1) ───────────────────────────────────────────────────

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-6l-2 3H10l-2-3H2" />
    <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
  </svg>
);

const EmptyPanel: React.FC = () => (
  <EmptyState
    illustration={<Icon size="xl"><InboxIcon /></Icon>}
    title="No messages"
    description="Your inbox is empty. Messages from your team will appear here."
    action={<Button size="sm" variant="secondary">Start a conversation</Button>}
  />
);

// ─── 14. Feedback form (2×1 wide) ────────────────────────────────────────────

const FeedbackForm: React.FC = () => {
  const [val, setVal] = useState("");
  const [type, setType] = useState("bug");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Send feedback</Text>
        <div style={{ display: "flex", gap: 4 }}>
          {["bug", "idea", "other"].map((t) => (
            <Tag
              key={t}
              variant={type === t ? "accent" : "neutral"}
              size="sm"
              onDismiss={undefined}
            >
              <span style={{ cursor: "pointer" }} onClick={() => setType(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </Tag>
          ))}
        </div>
      </div>
      <Textarea
        placeholder="What's on your mind?"
        maxLength={280}
        showCount
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <Button size="sm" variant="ghost">Cancel</Button>
        <Button size="sm" variant="primary" disabled={!val.trim()}>Submit</Button>
      </div>
    </div>
  );
};

// ─── 15. Notification feed tabs (1×2 tall) ───────────────────────────────────

const NotificationFeed: React.FC = () => (
  <div style={{ width: "100%" }}>
    <Tabs
      defaultValue="all"
      tabs={[
        {
          value: "all",
          label: "All",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 8 }}>
              <Alert variant="success" title="Deploy complete">v2.5.0 shipped to production.</Alert>
              <Alert variant="warning" title="Quota at 80%">Consider upgrading your plan.</Alert>
              <Alert variant="info" title="Maintenance">Scheduled Sunday 2–4 AM UTC.</Alert>
            </div>
          ),
        },
        {
          value: "unread",
          label: "Unread",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 8 }}>
              <Alert variant="warning" title="Quota at 80%">Consider upgrading your plan.</Alert>
            </div>
          ),
        },
      ]}
    />
  </div>
);

// ─── 16. Publish flow (1×1) ──────────────────────────────────────────────────

const PublishCard: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <Text size="sm" weight="semibold">Ready to publish?</Text>
          <Badge variant="neutral" size="sm">Draft</Badge>
        </div>
        <Breadcrumb items={[{ label: "blog" }, { label: "posts" }, { label: "draft-42" }]} />
      </div>
      <Checkbox label="I agree to the publishing terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
      <div style={{ display: "flex", gap: 6 }}>
        <Button size="sm" variant="ghost" fullWidth>Save draft</Button>
        <Button size="sm" variant="primary" fullWidth disabled={!agreed}>Publish</Button>
      </div>
    </div>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "onboarding",     colSpan: 2, rowSpan: 2, component: OnboardingWizard },
  { id: "notif-tabs",     colSpan: 1, rowSpan: 2, component: NotificationFeed },
  { id: "analytics",      colSpan: 2, rowSpan: 1, component: AnalyticsTabs },
  { id: "sidebar-nav",    colSpan: 2, rowSpan: 1, component: SidebarPreview },
  { id: "settings-tabs",  colSpan: 1, rowSpan: 2, component: TabbedSettings },
  { id: "team",           colSpan: 2, rowSpan: 1, component: TeamRoster },
  { id: "deploy",         colSpan: 2, rowSpan: 1, component: DeploymentPipeline },
  { id: "faq",            colSpan: 1, rowSpan: 2, component: FaqPanel },
  { id: "search",         colSpan: 2, rowSpan: 1, component: CommandSearch },
  { id: "loading",        colSpan: 1, rowSpan: 1, component: LoadingCard },
  { id: "profile",        colSpan: 2, rowSpan: 1, component: UserProfile },
  { id: "status",         colSpan: 1, rowSpan: 1, component: StatusBoard },
  { id: "col-filters",    colSpan: 1, rowSpan: 2, component: CollapsibleFilters },
  { id: "empty",          colSpan: 1, rowSpan: 1, component: EmptyPanel },
  { id: "feedback",       colSpan: 2, rowSpan: 1, component: FeedbackForm },
  { id: "publish",        colSpan: 1, rowSpan: 1, component: PublishCard },
];

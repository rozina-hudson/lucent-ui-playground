"use client";

import { useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  EmptyState,
  FormField,
  Icon,
  Input,
  Radio,
  RadioGroup,
  SearchInput,
  Select,
  Skeleton,
  Spinner,
  Tag,
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

// ─── 1. Sign in (2×2 featured) ───────────────────────────────────────────────

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      <div>
        <Text size="xl" weight="semibold">Welcome back</Text>
        <Text size="sm" color="secondary">Sign in to your account</Text>
      </div>
      <FormField label="Email" htmlFor="b-email">
        <Input id="b-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
      <FormField label="Password" htmlFor="b-pw">
        <Input id="b-pw" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
      </FormField>
      <Button variant="primary" fullWidth>Sign in</Button>
      <Divider label="OR" />
      <Button variant="secondary" fullWidth>Continue with Google</Button>
    </div>
  );
};

// ─── 2. Notification feed (1×2 tall) ─────────────────────────────────────────

const NotificationFeed: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
      <Text size="sm" weight="semibold">Notifications</Text>
      <Badge variant="danger" size="sm">3</Badge>
    </div>
    <Alert variant="success" title="Deploy complete">v2.4.1 shipped to production.</Alert>
    <Alert variant="warning" title="Quota at 80%">Consider upgrading your plan.</Alert>
    <Alert variant="info" title="Maintenance">Scheduled Sunday 2–4 AM UTC.</Alert>
  </div>
);

// ─── 3. Team roster (2×1 wide) ───────────────────────────────────────────────

const TeamRoster: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", flexWrap: "wrap" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text size="sm" weight="semibold">Team members</Text>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Tooltip content="Alice Lee" delay={0}><Avatar alt="Alice Lee" size="sm" /></Tooltip>
        <Tooltip content="Bob Kim" delay={0}><Avatar alt="Bob Kim" size="sm" /></Tooltip>
        <Tooltip content="Clara Roy" delay={0}><Avatar alt="Clara Roy" size="sm" /></Tooltip>
        <Tooltip content="Dan Mao" delay={0}><Avatar alt="Dan Mao" size="sm" /></Tooltip>
        <Badge variant="neutral" size="sm">+3</Badge>
      </div>
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ display: "flex", gap: 6 }}>
      <Button size="sm" variant="secondary">Manage</Button>
      <Button size="sm" variant="primary">Invite</Button>
    </div>
  </div>
);

// ─── 4. Command search (2×1 wide) ────────────────────────────────────────────

const CommandSearch: React.FC = () => {
  const [q, setQ] = useState("");
  const all = ["Button", "Input", "Select", "Alert", "Card", "Badge", "Toggle", "Spinner"];
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
        <Tag variant="accent" size="sm">Button</Tag>
        <Tag variant="neutral" size="sm">Input</Tag>
        <Tag variant="neutral" size="sm">Card</Tag>
        <Tag variant="success" size="sm">Alert</Tag>
        <Tag variant="neutral" size="sm">Toggle</Tag>
      </div>
    </div>
  );
};

// ─── 5. Settings toggles (1×2 tall) ──────────────────────────────────────────

const SettingsToggles: React.FC = () => {
  const [dark, setDark] = useState(true);
  const [notifs, setNotifs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [beta, setBeta] = useState(false);
  const rows = [
    { label: "Dark mode", val: dark, set: setDark },
    { label: "Notifications", val: notifs, set: setNotifs },
    { label: "Analytics", val: analytics, set: setAnalytics },
    { label: "Beta features", val: beta, set: setBeta },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Text size="sm" weight="semibold" style={{ marginBottom: 8 }}>Preferences</Text>
      {rows.map(({ label, val, set }, i) => (
        <>
          {i > 0 && <Divider key={`d-${label}`} />}
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
            <Text size="sm">{label}</Text>
            <Toggle size="sm" checked={val} onChange={(e) => set(e.target.checked)} />
          </div>
        </>
      ))}
    </div>
  );
};

// ─── 6. Feedback form (2×1 wide) ─────────────────────────────────────────────

const FeedbackForm: React.FC = () => {
  const [val, setVal] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <Text size="sm" weight="semibold">Send feedback</Text>
      <Textarea
        placeholder="What's on your mind?"
        maxLength={280}
        showCount
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        <Button size="sm" variant="ghost">Cancel</Button>
        <Button size="sm" variant="primary">Submit</Button>
      </div>
    </div>
  );
};

// ─── 7. Plan selector (1×2 tall) ─────────────────────────────────────────────

const PlanSelector: React.FC = () => {
  const [plan, setPlan] = useState("pro");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Text size="sm" weight="semibold">Select plan</Text>
        <Badge variant="accent" size="sm">Current: Pro</Badge>
      </div>
      <RadioGroup name="bento-plan" value={plan} onChange={setPlan}>
        <Radio value="starter" label="Starter — Free" />
        <Radio value="pro" label="Pro — $12/mo" />
        <Radio value="team" label="Team — $49/mo" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>
      <Button variant="primary" size="sm" fullWidth>Upgrade plan</Button>
    </div>
  );
};

// ─── 8. Loading skeleton (1×1) ───────────────────────────────────────────────

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

// ─── 9. User profile (2×1 wide) ──────────────────────────────────────────────

const UserProfile: React.FC = () => (
  <div style={{ display: "flex", gap: 14, alignItems: "center", width: "100%" }}>
    <Avatar alt="Jane Doe" size="lg" src="https://i.pravatar.cc/150?img=47" />
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
        <Text size="md" weight="semibold">Jane Doe</Text>
        <Badge variant="accent" size="sm" dot>Admin</Badge>
      </div>
      <Text size="sm" color="secondary">Product Designer · San Francisco</Text>
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      <Button size="sm" variant="ghost">Message</Button>
      <Button size="sm" variant="primary">Follow</Button>
    </div>
  </div>
);

// ─── 10. Status board (1×1) ──────────────────────────────────────────────────

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

// ─── 11. Filter panel (1×2 tall) ─────────────────────────────────────────────

const FilterPanel: React.FC = () => {
  const [cat, setCat] = useState("all");
  const [avail, setAvail] = useState(true);
  const [dep, setDep] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <Text size="sm" weight="semibold">Filter by</Text>
      <Select
        label="Category"
        options={[
          { value: "all", label: "All components" },
          { value: "atoms", label: "Atoms" },
          { value: "molecules", label: "Molecules" },
        ]}
        value={cat}
        onChange={(e) => setCat(e.target.value)}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Text size="xs" color="secondary" weight="medium" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</Text>
        <Checkbox label="Available" checked={avail} onChange={(e) => setAvail(e.target.checked)} />
        <Checkbox label="Deprecated" checked={dep} onChange={(e) => setDep(e.target.checked)} />
      </div>
      <Divider />
      <Button size="sm" variant="ghost">Reset filters</Button>
    </div>
  );
};

// ─── 12. Empty state (1×1) ───────────────────────────────────────────────────

const SearchMagnify = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={11} cy={11} r={8} />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const EmptyPanel: React.FC = () => (
  <EmptyState
    illustration={<Icon size="xl"><SearchMagnify /></Icon>}
    title="No results found"
    description="Try a different search term or clear your filters."
    action={<Button size="sm" variant="secondary">Clear filters</Button>}
  />
);

// ─── 13. 2FA / Security (2×1 wide) ───────────────────────────────────────────

const SecurityCard: React.FC = () => {
  const [twofa, setTwofa] = useState(false);
  const [passkeys, setPasskeys] = useState(true);
  return (
    <Card style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Text size="sm" weight="semibold">Two-factor auth</Text>
            <Text size="xs" color="secondary">Protect your account with 2FA.</Text>
          </div>
          <Toggle checked={twofa} onChange={(e) => setTwofa(e.target.checked)} />
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Text size="sm" weight="semibold">Passkeys</Text>
            <Text size="xs" color="secondary">Sign in without a password.</Text>
          </div>
          <Toggle checked={passkeys} onChange={(e) => setPasskeys(e.target.checked)} />
        </div>
      </div>
    </Card>
  );
};

// ─── 14. Publish action card (1×1) ───────────────────────────────────────────

const PublishCard: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
      <div>
        <Text size="sm" weight="semibold">Ready to publish?</Text>
        <Text size="xs" color="secondary" style={{ marginTop: 2 }}>This will make your changes live.</Text>
      </div>
      <Checkbox label="I agree to the terms and conditions" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
      <div style={{ display: "flex", gap: 6 }}>
        <Button size="sm" variant="ghost" fullWidth>Save draft</Button>
        <Button size="sm" variant="primary" fullWidth disabled={!agreed}>Publish</Button>
      </div>
    </div>
  );
};

// ─── Registry ─────────────────────────────────────────────────────────────────

export const BENTO_COMPOSITIONS: BentoComposition[] = [
  { id: "signin",        colSpan: 2, rowSpan: 2, component: SignIn },
  { id: "notifications", colSpan: 1, rowSpan: 2, component: NotificationFeed },
  { id: "team",          colSpan: 2, rowSpan: 1, component: TeamRoster },
  { id: "search",        colSpan: 2, rowSpan: 1, component: CommandSearch },
  { id: "settings",      colSpan: 1, rowSpan: 2, component: SettingsToggles },
  { id: "feedback",      colSpan: 2, rowSpan: 1, component: FeedbackForm },
  { id: "plan",          colSpan: 1, rowSpan: 2, component: PlanSelector },
  { id: "loading",       colSpan: 1, rowSpan: 1, component: LoadingCard },
  { id: "profile",       colSpan: 2, rowSpan: 1, component: UserProfile },
  { id: "status",        colSpan: 1, rowSpan: 1, component: StatusBoard },
  { id: "filter",        colSpan: 1, rowSpan: 2, component: FilterPanel },
  { id: "empty",         colSpan: 1, rowSpan: 1, component: EmptyPanel },
  { id: "security",      colSpan: 2, rowSpan: 1, component: SecurityCard },
  { id: "publish",       colSpan: 1, rowSpan: 1, component: PublishCard },
];

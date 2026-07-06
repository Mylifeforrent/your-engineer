import { PageHeader, Card, CardHeader, Badge, Button, StatusDot } from "@/components/ui"
import {
  Siren,
  Terminal,
  Sparkles,
  Mail,
  Webhook,
  History,
  ChevronRight,
  Server,
} from "lucide-react"

type Alert = {
  id: string
  service: string
  title: string
  severity: "high" | "medium" | "low"
  time: string
  status: "Analysis Complete" | "Analyzing" | "Pending"
}

const alerts: Alert[] = [
  {
    id: "AL-2041",
    service: "inventory-service",
    title: "5xx error rate spiked to 8.2%",
    severity: "high",
    time: "1 hour ago",
    status: "Analysis Complete",
  },
  {
    id: "AL-2040",
    service: "order-service",
    title: "Order API P99 latency > 2s",
    severity: "medium",
    time: "3 hours ago",
    status: "Pending",
  },
  {
    id: "AL-2039",
    service: "payment-gateway",
    title: "Callback queue backlogged 1.2k",
    severity: "low",
    time: "Yesterday",
    status: "Analysis Complete",
  },
]

const sevTone = { high: "danger", medium: "warning", low: "muted" } as const
const sevLabel = { high: "High", medium: "Medium", low: "Low" } as const

const logLines = [
  "2026-07-06 09:12:04 ERROR [inventory] DeductStock timeout after 3000ms sku=SK-88213",
  "2026-07-06 09:12:04 WARN  [inventory] db pool exhausted active=50/50 waiting=37",
  "2026-07-06 09:12:05 ERROR [inventory] 500 GET /api/stock/batch trace=ac91f2",
  "2026-07-06 09:12:06 INFO  [inventory] slow query 2140ms: SELECT * FROM stock_lock ...",
]

export default function AlertsPage() {
  const [selected, setSelected] = useState<Alert>(alerts[0])

  return (
    <div>
      <PageHeader
        title="Alert Analysis"
        desc="Query logs via MCP, combine service context and historical experience, AI produces traceable root cause analysis"
        actions={<Badge tone="primary">AI Reasoning · Phase 3</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        {/* Alert list */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader
              title="Alert List"
              icon={<Siren className="h-4 w-4" />}
              action={<Badge tone="danger">2 Pending</Badge>}
            />
            <ul className="divide-y divide-border">
              {alerts.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => setSelected(a)}
                    className={
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors " +
                      (selected.id === a.id ? "bg-secondary/60" : "hover:bg-secondary/30")
                    }
                  >
                    <div className="mt-1">
                      <StatusDot tone={sevTone[a.severity]} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {a.id}
                        </span>
                        <Badge tone={sevTone[a.severity]}>{sevLabel[a.severity]} Priority</Badge>
                      </div>
                      <p className="mt-1 truncate text-sm">{a.title}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        {a.service} · {a.time}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Service Base Config" icon={<Server className="h-4 w-4" />} />
            <div className="space-y-2.5 p-4 text-sm">
              <ConfigRow k="System" v="E-commerce Core Trading System" />
              <ConfigRow k="Service" v={selected.service} />
              <ConfigRow k="Upstream" v="order-service, cart-service" />
              <ConfigRow k="Downstream" v="mysql-inventory, redis-lock" />
              <ConfigRow k="Impact Scope" v="Order / Flash Sale / Inventory Display" />
              <ConfigRow k="Log MCP" v="loki-prod (Connected)" />
            </div>
          </Card>
        </div>

        {/* Analysis */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title={`Root Cause Analysis · ${selected.id}`}
              desc={selected.title}
              icon={<Sparkles className="h-4 w-4" />}
              action={<Badge tone={sevTone[selected.severity]}>{selected.status}</Badge>}
            />
            <div className="space-y-5 p-4">
              <section>
                <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  AI Synthesis
                </h4>
                <p className="text-sm leading-relaxed text-pretty">
                  Inventory service database connection pool is exhausted (active 50/50), combined with <code className="rounded bg-secondary px-1 font-mono text-xs">stock_lock</code>{" "}
                  slow queries causing long connection occupancy, stock deduction API timeouts and 5xx errors. The trigger aligns with today's 10:00 flash sale traffic peak.
                </p>
              </section>

              <section>
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Terminal className="h-3.5 w-3.5" /> Related Logs (via MCP Query)
                </h4>
                <div className="overflow-x-auto rounded-md border border-border bg-background p-3">
                  <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {logLines.map((l, i) => (
                      <div key={i} className={l.includes("ERROR") ? "text-destructive" : ""}>
                        {l}
                      </div>
                    ))}
                  </pre>
                </div>
              </section>

              <section>
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <History className="h-3.5 w-3.5" /> Referenced Historical Experience
                </h4>
                <div className="rounded-md border border-border bg-secondary/30 px-3 py-2.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge tone="muted">EXP-118</Badge>
                    <span className="text-xs text-muted-foreground">2026-05 · Similarity 91%</span>
                  </div>
                  <p className="mt-1.5 text-pretty">
                    During promotions, connection pool saturation: temporarily scale db pool to 80, add composite index for stock_lock, long-term fix is async inventory deduction.
                  </p>
                </div>
              </section>

              <section>
                <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Suggested Actions
                </h4>
                <ol className="space-y-1.5 text-sm">
                  {[
                    "Temporary: Increase connection pool 50 → 80, alleviate timeouts",
                    "Stabilize: Add composite index (sku_id, status) for stock_lock slow queries",
                    "Root cause fix: Async inventory deduction + local cache pre-deduction",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-primary">{i + 1}.</span>
                      <span className="text-pretty">{s}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
                <Button className="flex-1">
                  <Mail className="h-4 w-4" /> Email Analysis Results
                </Button>
                <Button variant="outline" className="flex-1">
                  <Webhook className="h-4 w-4" /> Push to Webhook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ConfigRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-xs text-muted-foreground">{k}</span>
      <span className="truncate text-right font-mono text-xs">{v}</span>
    </div>
  )
}

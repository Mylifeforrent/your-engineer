"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button, StatusDot } from "@/components/ui"
import { Settings2, Plug, Mail, Webhook, Plus, Zap, ShieldCheck } from "lucide-react"

type Mcp = {
  id: string
  name: string
  type: string
  endpoint: string
  status: "connected" | "error" | "disabled"
}

const mcpServers: Mcp[] = [
  { id: "m1", name: "Jira Cloud", type: "Task Management", endpoint: "mcp://jira-prod", status: "connected" },
  { id: "m2", name: "Confluence", type: "Documentation", endpoint: "mcp://confluence-prod", status: "connected" },
  { id: "m3", name: "Loki Log Query", type: "Logging", endpoint: "mcp://loki-prod", status: "connected" },
  { id: "m4", name: "GitHub PR", type: "Code", endpoint: "mcp://github-org", status: "connected" },
  { id: "m5", name: "Jenkins Trigger", type: "CI", endpoint: "mcp://jenkins", status: "disabled" },
  { id: "m6", name: "Elastic Logs", type: "Logging", endpoint: "mcp://es-cluster", status: "error" },
]

const channels = [
  { id: "c1", name: "Dev Team Mailing List", type: "email" as const, target: "dev-team@corp.com", status: "connected" as const },
  { id: "c2", name: "Enterprise IM Webhook", type: "webhook" as const, target: "https://im.corp/hook/xa92", status: "connected" as const },
  { id: "c3", name: "On-Call Alert Webhook", type: "webhook" as const, target: "https://oncall.corp/hook/b71", status: "connected" as const },
]

const statusTone = { connected: "success", error: "danger", disabled: "muted" } as const
const statusLabel = { connected: "Connected", error: "Connection Failed", disabled: "Disabled" } as const

export default function ConfigPage() {
  const [testing, setTesting] = useState<string | null>(null)

  function test(id: string) {
    setTesting(id)
    setTimeout(() => setTesting(null), 1200)
  }

  return (
    <div>
      <PageHeader
        title="Config Center"
        desc="Integrate external capabilities via MCP, configure notification channels, and run connection tests; config is isolated per team"
        actions={<Badge tone="primary">Platform Foundation · Phase 1</Badge>}
      />

      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-pretty">
            Adding a new external capability = configuring an MCP server, not hardcoding an adapter. Credentials are encrypted and isolated per team (platform-team).
          </span>
        </div>

        {/* MCP servers */}
        <Card>
          <CardHeader
            title="MCP Services"
            desc="Modules call team-configured MCP capabilities as needed"
            icon={<Plug className="h-4 w-4" />}
            action={
              <Button size="sm" variant="outline">
                <Plus className="h-3.5 w-3.5" /> Add MCP
              </Button>
            }
          />
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0">
            {mcpServers.map((m, i) => (
              <div
                key={m.id}
                className={
                  "flex items-center gap-3 px-4 py-3 " +
                  (i % 2 === 0 ? "sm:border-r sm:border-border" : "") +
                  (i >= 2 ? " sm:border-t sm:border-border" : "")
                }
              >
                <StatusDot tone={statusTone[m.status]} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{m.name}</p>
                    <Badge tone="muted">{m.type}</Badge>
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                    {m.endpoint}
                  </p>
                </div>
                <Badge tone={statusTone[m.status]}>{statusLabel[m.status]}</Badge>
                <Button size="sm" variant="ghost" onClick={() => test(m.id)}>
                  <Zap
                    className={"h-3.5 w-3.5 " + (testing === m.id ? "animate-pulse text-primary" : "")}
                  />
                  {testing === m.id ? "Testing" : "Test"}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Notification channels */}
        <Card>
          <CardHeader
            title="Notification Channels"
            desc="Async flows (health check, alerts) notify via email/webhook; enterprise IM via webhook"
            icon={<Mail className="h-4 w-4" />}
            action={
              <Button size="sm" variant="outline">
                <Plus className="h-3.5 w-3.5" /> Add Channel
              </Button>
            }
          />
          <ul className="divide-y divide-border">
            {channels.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                  {c.type === "email" ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <Webhook className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">
                    {c.target}
                  </p>
                </div>
                <Badge tone="success">{statusLabel[c.status]}</Badge>
                <Button size="sm" variant="ghost" onClick={() => test(c.id)}>
                  <Zap
                    className={"h-3.5 w-3.5 " + (testing === c.id ? "animate-pulse text-primary" : "")}
                  />
                  {testing === c.id ? "Testing" : "Test"}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

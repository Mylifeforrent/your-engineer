"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button, StatusDot } from "@/components/ui"
import {
  FlaskConical,
  Upload,
  Play,
  ImageIcon,
  Terminal,
  Sparkles,
  ExternalLink,
  Tag,
} from "lucide-react"

type Script = {
  id: string
  name: string
  kind: "Playwright" | "pytest"
  tags: string[]
  last: string
  status: "success" | "failed" | "error" | "idle"
}

const scripts: Script[] = [
  {
    id: "s1",
    name: "Checkout Flow E2E Regression",
    kind: "Playwright",
    tags: ["UI", "Checkout", "Regression"],
    last: "2 hours ago",
    status: "failed",
  },
  {
    id: "s2",
    name: "Order Create API Smoke",
    kind: "pytest",
    tags: ["API", "Order"],
    last: "4 hours ago",
    status: "success",
  },
  {
    id: "s3",
    name: "Login Auth API Suite",
    kind: "pytest",
    tags: ["API", "Auth"],
    last: "Yesterday",
    status: "success",
  },
  {
    id: "s4",
    name: "Product Detail Page UI Validation",
    kind: "Playwright",
    tags: ["UI", "Product"],
    last: "3 days ago",
    status: "error",
  },
]

const statusTone = {
  success: "success",
  failed: "warning",
  error: "danger",
  idle: "muted",
} as const
const statusLabel = {
  success: "Passed",
  failed: "Failed",
  error: "Error",
  idle: "Not Run",
} as const

const runLog = [
  "> playwright test checkout.spec.ts --project=chromium",
  "Running 12 tests using 4 workers",
  "  ✓ Should navigate to checkout page (1.2s)",
  "  ✓ Should display shipping address (0.8s)",
  "  ✗ Should correctly calculate coupon discount (2.1s)",
  "    Expected: ¥88.00  Received: ¥98.00",
  "  ✗ Should support switching payment method (1.9s)",
  "  ✗ Should redirect to result page after order submission (timeout 30s)",
  "9 passed, 3 failed (46.2s)",
]

export default function TestsPage() {
  const [selected, setSelected] = useState<Script>(scripts[0])

  return (
    <div>
      <PageHeader
        title="Test Execution"
        desc="Upload scripts, run in built-in sandbox, capture screenshots and full logs, AI consolidates into structured test report"
        actions={
          <>
            <Button variant="outline">
              <Upload className="h-4 w-4" /> Upload Script
            </Button>
            <Badge tone="primary">Execution Orchestration · Phase 2</Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-5">
        {/* Script list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Test Cases"
              icon={<FlaskConical className="h-4 w-4" />}
              action={<Badge tone="muted">{scripts.length} scripts</Badge>}
            />
            <ul className="divide-y divide-border">
              {scripts.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSelected(s)}
                    className={
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors " +
                      (selected.id === s.id ? "bg-secondary/60" : "hover:bg-secondary/30")
                    }
                  >
                    <StatusDot tone={statusTone[s.status]} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{s.name}</p>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <Badge tone="muted">{s.kind}</Badge>
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] text-muted-foreground"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                      {s.last}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Detail */}
        <div className="space-y-4 lg:col-span-3">
          <Card>
            <CardHeader
              title={selected.name}
              desc={`${selected.kind} · Built-in Sandbox · Timeout 60s · Memory 512MB`}
              icon={<Tag className="h-4 w-4" />}
              action={
                <Button size="sm">
                  <Play className="h-3.5 w-3.5" /> Run
                </Button>
              }
            />
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              <RunStat label="Passed" value="9" tone="success" />
              <RunStat label="Failed" value="3" tone="warning" />
              <RunStat label="Error" value="0" tone="danger" />
            </div>

            {/* Screenshots */}
            <div className="p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" /> Failure Screenshots
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["Coupon Discount", "Payment Method Switch", "Order Result Page"].map((t) => (
                  <div
                    key={t}
                    className="flex aspect-video flex-col items-center justify-center gap-1 rounded-md border border-border bg-background text-center"
                  >
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <span className="px-1 text-[10px] text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs */}
            <div className="px-4 pb-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" /> Execution Log
              </h4>
              <div className="overflow-x-auto rounded-md border border-border bg-background p-3">
                <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {runLog.map((l, i) => (
                    <div
                      key={i}
                      className={
                        l.includes("✗") || l.includes("failed") || l.includes("Expected")
                          ? "text-destructive"
                          : l.includes("✓")
                            ? "text-success"
                            : ""
                      }
                    >
                      {l}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="AI Test Report"
              desc="Consolidates screenshots, logs, and execution data into structured report"
              icon={<Sparkles className="h-4 w-4" />}
              action={<Badge tone="warning">Pending Sync Confirmation</Badge>}
            />
            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed text-pretty">
                In this checkout regression, 3 out of 12 cases failed, all concentrated on coupon and payment flows: coupon discount amount calculation error (expected ¥88, actual ¥98),
                suspected tiered discount rule not taking effect; payment method switch and order submission timeout may be cascading failures from the coupon exception. Recommend prioritizing investigation of the marketing pricing service.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="h-4 w-4" /> Sync to Jira
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="h-4 w-4" /> Sync to Confluence
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function RunStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "success" | "warning" | "danger"
}) {
  const color = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
  }[tone]
  return (
    <div className="px-4 py-3 text-center">
      <p className={"text-xl font-semibold " + color}>{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

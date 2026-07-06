"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button, StatusDot } from "@/components/ui"
import {
  HeartPulse,
  Clock,
  Mail,
  Webhook,
  Plus,
  ImageIcon,
  ChevronRight,
} from "lucide-react"

type Job = {
  id: string
  name: string
  cron: string
  cronLabel: string
  channels: ("email" | "webhook")[]
  last: string
  status: "success" | "failed"
  enabled: boolean
}

const jobs: Job[] = [
  {
    id: "j1",
    name: "Payment Gateway Health Check",
    cron: "*/15 * * * *",
    cronLabel: "Every 15 minutes",
    channels: ["email", "webhook"],
    last: "28 minutes ago",
    status: "success",
    enabled: true,
  },
  {
    id: "j2",
    name: "Core Order Flow Inspection",
    cron: "0 * * * *",
    cronLabel: "Hourly",
    channels: ["webhook"],
    last: "12 minutes ago",
    status: "success",
    enabled: true,
  },
  {
    id: "j3",
    name: "Inventory Service Availability",
    cron: "*/30 * * * *",
    cronLabel: "Every 30 minutes",
    channels: ["email"],
    last: "9 minutes ago",
    status: "failed",
    enabled: true,
  },
  {
    id: "j4",
    name: "Nightly Full Regression",
    cron: "0 2 * * *",
    cronLabel: "Daily at 02:00",
    channels: ["email", "webhook"],
    last: "Today 02:00",
    status: "success",
    enabled: false,
  },
]

const history = [
  { time: "09:45", job: "Payment Gateway Health Check", status: "success" as const, dur: "6.2s" },
  { time: "09:30", job: "Inventory Service Availability", status: "failed" as const, dur: "31.0s" },
  { time: "09:15", job: "Payment Gateway Health Check", status: "success" as const, dur: "5.8s" },
  { time: "09:00", job: "Core Order Flow Inspection", status: "success" as const, dur: "12.4s" },
  { time: "08:45", job: "Payment Gateway Health Check", status: "success" as const, dur: "6.0s" },
]

export default function HealthCheckPage() {
  return (
    <div>
      <PageHeader
        title="Daily Health Check"
        desc="Configure scheduled tasks for uploaded scripts, proactively push results via email/webhook after execution"
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-4 w-4" /> New Scheduled Task
            </Button>
            <Badge tone="primary">Execution Orchestration · Phase 2</Badge>
          </>
        }
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniStat label="Active Tasks" value="3" />
          <MiniStat label="Last 24h Runs" value="142" />
          <MiniStat label="Pass Rate" value="94%" />
          <MiniStat label="Today's Failures" value="8" tone="danger" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Jobs */}
          <Card className="lg:col-span-2">
            <CardHeader title="Scheduled Tasks" icon={<HeartPulse className="h-4 w-4" />} />
            <ul className="divide-y divide-border">
              {jobs.map((j) => (
                <li key={j.id} className="flex items-center gap-3 px-4 py-3">
                  <StatusDot tone={j.enabled ? (j.status === "success" ? "success" : "danger") : "muted"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{j.name}</p>
                      {!j.enabled && <Badge tone="muted">Disabled</Badge>}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="h-3 w-3" /> {j.cronLabel}
                      </span>
                      <span className="font-mono text-[10px]">{j.cron}</span>
                      <span className="text-[11px]">· Last {j.last}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {j.channels.includes("email") && (
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    {j.channels.includes("webhook") && (
                      <Webhook className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <label className="relative ml-1 inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked={j.enabled} className="peer sr-only" />
                      <div className="h-4 w-7 rounded-full bg-secondary peer-checked:bg-primary" />
                      <div className="absolute left-0.5 h-3 w-3 rounded-full bg-foreground transition-transform peer-checked:translate-x-3" />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* History */}
          <Card>
            <CardHeader
              title="Execution History"
              desc="Includes screenshots and logs, fully traceable"
              icon={<ImageIcon className="h-4 w-4" />}
            />
            <ul className="divide-y divide-border">
              {history.map((h, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="font-mono text-[11px] text-muted-foreground">{h.time}</span>
                  <StatusDot tone={h.status === "success" ? "success" : "danger"} />
                  <span className="min-w-0 flex-1 truncate text-sm">{h.job}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    {h.dur}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "danger"
}) {
  return (
    <Card className="p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={
          "mt-2 text-2xl font-semibold tracking-tight " +
          (tone === "danger" ? "text-destructive" : "")
        }
      >
        {value}
      </p>
    </Card>
  )
}

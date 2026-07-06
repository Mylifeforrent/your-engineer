"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui"
import {
  Wrench,
  Rocket,
  FilePlus2,
  FileSearch2,
  FileEdit,
  Sparkles,
  Check,
  GitPullRequest,
  Plus,
} from "lucide-react"

const tools = [
  {
    id: "release",
    name: "Release Document Generation",
    desc: "Aggregate Jira / Confluence / PRs, generate release document draft",
    icon: Rocket,
    tone: "primary" as const,
  },
  {
    id: "jira-create",
    name: "Jira Create",
    desc: "Generate Jira tasks in team format",
    icon: FilePlus2,
    tone: "default" as const,
  },
  {
    id: "jira-review",
    name: "Jira Review",
    desc: "AI checks ticket completeness and standards compliance",
    icon: FileSearch2,
    tone: "default" as const,
  },
  {
    id: "confluence",
    name: "Confluence Write",
    desc: "Create / edit documents from templates",
    icon: FileEdit,
    tone: "default" as const,
  },
]

const releaseInputs = [
  { icon: GitPullRequest, label: "Merged PRs", value: "18", src: "github/order-service" },
  { icon: Check, label: "Completed Jira", value: "12 items", src: "OMS Board · Sprint 42" },
  { icon: FileEdit, label: "Related Confluence", value: "3 docs", src: "Trading Domain Space" },
]

export default function MiniToolsPage() {
  const [phase, setPhase] = useState<"idle" | "gen" | "done">("done")

  return (
    <div>
      <PageHeader
        title="Mini Tools / Release"
        desc="Configure team-specific mini tools based on platform templates, AI generates content in team format, all write-backs require manual confirmation"
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-4 w-4" /> New Mini Tool
            </Button>
            <Badge tone="primary">AI Reasoning · Phase 3</Badge>
          </>
        }
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Tool cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => {
            const Icon = t.icon
            return (
              <Card key={t.id} className="p-4 transition-colors hover:border-primary/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 text-sm font-medium">{t.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                  {t.desc}
                </p>
              </Card>
            )
          })}
        </div>

        {/* Release tool */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader
                title="Release Prep · v3.8.0"
                desc="Aggregated input sources"
                icon={<Rocket className="h-4 w-4" />}
              />
              <ul className="divide-y divide-border">
                {releaseInputs.map((r) => {
                  const Icon = r.icon
                  return (
                    <li key={r.label} className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">{r.label}</p>
                        <p className="truncate font-mono text-[11px] text-muted-foreground">
                          {r.src}
                        </p>
                      </div>
                      <Badge tone="primary">{r.value}</Badge>
                    </li>
                  )
                })}
              </ul>
              <div className="p-4">
                <Button className="w-full" onClick={() => setPhase("done")}>
                  <Sparkles className="h-4 w-4" /> Regenerate Release Document
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated doc */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader
                title="Release Document Draft"
                desc="Team format · Editable / AI polishable"
                icon={<FileEdit className="h-4 w-4" />}
                action={<Badge tone="warning">Pending Write-Back Confirmation</Badge>}
              />
              <div className="space-y-4 p-4">
                <DocSection title="Version Overview">
                  This release focuses on the Trading Domain's order timeout auto-cancellation capability and settlement experience optimization, including 12 requirements and 18 PRs, covering order, inventory, and settlement services.
                </DocSection>
                <DocSection title="Major Changes">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Added order timeout auto-cancellation and inventory rollback</li>
                    <li>Refactored settlement page coupon pricing, fixed tiered discount not taking effect</li>
                    <li>Inventory deduction API idempotency refactoring</li>
                  </ul>
                </DocSection>
                <DocSection title="Risks & Rollback">
                  Start with 10% gradual rollout, monitor inventory rollback success rate and settlement order conversion; in case of anomaly, can quickly disable via the <code className="rounded bg-secondary px-1 font-mono text-xs">order.timeout.enabled</code> switch.
                </DocSection>

                <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
                  <Button className="flex-1">
                    <Check className="h-4 w-4" /> Confirm Write-Back to Confluence
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Sparkles className="h-4 w-4" /> AI Polish Full Text
                  </Button>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">
                  All write-back operations require manual confirmation
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-border bg-secondary/30 p-3">
      <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-pretty">{children}</div>
    </section>
  )
}

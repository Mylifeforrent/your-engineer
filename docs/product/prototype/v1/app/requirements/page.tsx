"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui"
import {
  Sparkles,
  Link2,
  FileText,
  ListChecks,
  BookOpen,
  Loader2,
  Check,
  Pencil,
  ExternalLink,
  CircleCheck,
} from "lucide-react"

const domains = ["Trading Domain", "Marketing Domain", "Inventory Domain", "User Account Domain", "Settlement Domain"]

const suggestedTasks = [
  { title: "Add 'Timeout Pending Cancellation' state to order state machine", type: "Backend", points: 3 },
  { title: "Scheduled task to scan overdue unpaid orders and trigger cancellation", type: "Backend", points: 5 },
  { title: "Inventory rollback idempotency refactoring", type: "Backend", points: 3 },
  { title: "Display cancellation reason and countdown on order detail page", type: "Frontend", points: 2 },
]

const userStories = [
  "As a buyer, when I haven't paid within 30 minutes after placing an order, the system should automatically cancel the order and release inventory so the product becomes available again.",
  "As an operator, I want the timeout duration to be configurable per campaign so we can flexibly adjust it during promotions.",
]

const sources = [
  { label: "Trading Domain · Order Lifecycle Design.md", type: "Domain Knowledge" },
  { label: "PRD: Order Timeout Auto-Cancellation (requirement link)", type: "Link" },
  { label: "Trading Domain · Inventory Deduction and Rollback Spec.md", type: "Domain Knowledge" },
]

export default function RequirementsPage() {
  const [domain, setDomain] = useState(domains[0])
  const [input, setInput] = useState(
    "Orders unpaid for 30 minutes should be automatically cancelled and locked inventory released; timeout duration must support per-campaign configuration.",
  )
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle")

  function analyze() {
    setPhase("analyzing")
    setTimeout(() => setPhase("done"), 1600)
  }

  return (
    <div>
      <PageHeader
        title="Requirement Analysis"
        desc="Analyze requirements combining domain knowledge and link content, generate confirmable Jira tasks and Confluence document drafts"
        actions={<Badge tone="primary">AI Reasoning · Phase 1</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-5">
        {/* Input */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader title="Requirement Input" icon={<FileText className="h-4 w-4" />} />
            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">Business Domain</label>
                <div className="flex flex-wrap gap-1.5">
                  {domains.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDomain(d)}
                      className={
                        "rounded-md border px-2.5 py-1 text-xs transition-colors " +
                        (domain === d
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border bg-card text-muted-foreground hover:text-foreground")
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">
                  Requirement Description / Link
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="Paste requirement description, or PRD / Jira link..."
                />
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                <Link2 className="h-3.5 w-3.5" />
                <span className="truncate">wiki.corp/prd/order-timeout-cancel</span>
                <Badge tone="muted" className="ml-auto">
                  Attached
                </Badge>
              </div>

              <Button onClick={analyze} disabled={phase === "analyzing"} className="w-full">
                {phase === "analyzing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Start Analysis
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Referenced Sources"
              desc="Evidence first: analysis conclusions are traceable"
              icon={<BookOpen className="h-4 w-4" />}
            />
            <ul className="divide-y divide-border">
              {phase === "done" ? (
                sources.map((s) => (
                  <li key={s.label} className="flex items-center gap-2 px-4 py-2.5 text-sm">
                    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="truncate">{s.label}</span>
                    <Badge tone="muted" className="ml-auto shrink-0">
                      {s.type}
                    </Badge>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center text-xs text-muted-foreground">
                  Referenced domain knowledge and links will be shown after analysis
                </li>
              )}
            </ul>
          </Card>
        </div>

        {/* Output */}
        <div className="lg:col-span-3">
          <Card className="min-h-[400px]">
            <CardHeader
              title="Analysis Results"
              desc={`Domain: ${domain}`}
              icon={<ListChecks className="h-4 w-4" />}
              action={
                phase === "done" ? (
                  <Badge tone="warning">Pending Manual Confirmation</Badge>
                ) : (
                  <Badge tone="muted">Not Started</Badge>
                )
              }
            />

            {phase === "idle" && (
              <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Fill in requirements and click "Start Analysis" — AI will generate tasks and user stories combining domain knowledge
                </p>
              </div>
            )}

            {phase === "analyzing" && (
              <div className="flex h-80 flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Retrieving domain knowledge, accessing links, and reasoning...</p>
              </div>
            )}

            {phase === "done" && (
              <div className="space-y-5 p-4">
                <section>
                  <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Requirement Summary
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty">
                    Introduce "timeout auto-cancellation" capability in the Trading Domain order lifecycle: for orders unpaid beyond a configurable duration,
                    the system automatically cancels and rolls back locked inventory. Affects order state machine, inventory rollback, and frontend display.
                  </p>
                </section>

                <section>
                  <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Impact Scope
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["Order Service", "Inventory Service", "Scheduled Tasks", "Order Frontend", "Marketing Config"].map((t) => (
                      <Badge key={t} tone="primary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Suggested Tasks (Jira Draft)
                    </h4>
                    <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <Sparkles className="h-3 w-3" /> AI Polish
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {suggestedTasks.map((t) => (
                      <li
                        key={t.title}
                        className="flex items-start gap-2.5 rounded-md border border-border bg-secondary/30 px-3 py-2"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-pretty">{t.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge tone="muted">{t.type}</Badge>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {t.points} pts
                            </span>
                          </div>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    User Stories
                  </h4>
                  <ul className="space-y-2">
                    {userStories.map((s, i) => (
                      <li
                        key={i}
                        className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm leading-relaxed text-pretty"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
                  <Button className="flex-1">
                    <Check className="h-4 w-4" /> Confirm and Create 4 Jira Tasks
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4" /> Sync to Confluence
                  </Button>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">
                  No Jira / Confluence content is created before confirmation
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

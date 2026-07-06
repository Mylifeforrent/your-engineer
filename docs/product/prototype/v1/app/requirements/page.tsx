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

const domains = ["交易域", "营销域", "库存域", "用户账户域", "结算域"]

const suggestedTasks = [
  { title: "订单状态机新增「超时待取消」状态", type: "后端", points: 3 },
  { title: "定时任务扫描超时未支付订单并触发取消", type: "后端", points: 5 },
  { title: "库存回滚接口幂等性改造", type: "后端", points: 3 },
  { title: "订单详情页展示取消原因与倒计时", type: "前端", points: 2 },
]

const userStories = [
  "作为买家，当我下单后超过 30 分钟未支付时，系统应自动取消订单并释放库存，以便商品重新可售。",
  "作为运营，我希望超时时间可按活动配置，以便大促期间灵活调整。",
]

const sources = [
  { label: "交易域 · 订单生命周期设计.md", type: "领域知识" },
  { label: "PRD: 订单超时自动取消 (需求链接)", type: "链接" },
  { label: "交易域 · 库存扣减与回滚规范.md", type: "领域知识" },
]

export default function RequirementsPage() {
  const [domain, setDomain] = useState(domains[0])
  const [input, setInput] = useState(
    "下单后 30 分钟未支付需自动取消订单并释放已锁定库存，超时时间需支持按营销活动配置。",
  )
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle")

  function analyze() {
    setPhase("analyzing")
    setTimeout(() => setPhase("done"), 1600)
  }

  return (
    <div>
      <PageHeader
        title="需求分析"
        desc="结合领域知识与链接内容分析需求，生成可确认的 Jira 任务与 Confluence 文档草稿"
        actions={<Badge tone="primary">AI 推理线 · Phase 1</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-5">
        {/* Input */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader title="需求输入" icon={<FileText className="h-4 w-4" />} />
            <div className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 block text-xs text-muted-foreground">业务领域</label>
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
                  需求描述 / 链接
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary/50"
                  placeholder="粘贴需求描述，或贴入 PRD / Jira 链接…"
                />
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                <Link2 className="h-3.5 w-3.5" />
                <span className="truncate">wiki.corp/prd/order-timeout-cancel</span>
                <Badge tone="muted" className="ml-auto">
                  已附加
                </Badge>
              </div>

              <Button onClick={analyze} disabled={phase === "analyzing"} className="w-full">
                {phase === "analyzing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> AI 分析中…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> 开始分析
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="引用来源"
              desc="证据优先：分析结论可溯源"
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
                  分析完成后展示引用的领域知识与链接
                </li>
              )}
            </ul>
          </Card>
        </div>

        {/* Output */}
        <div className="lg:col-span-3">
          <Card className="min-h-[400px]">
            <CardHeader
              title="分析结果"
              desc={`领域：${domain}`}
              icon={<ListChecks className="h-4 w-4" />}
              action={
                phase === "done" ? (
                  <Badge tone="warning">待人工确认</Badge>
                ) : (
                  <Badge tone="muted">未开始</Badge>
                )
              }
            />

            {phase === "idle" && (
              <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  填写需求并点击「开始分析」，AI 将结合领域知识生成任务与用户故事
                </p>
              </div>
            )}

            {phase === "analyzing" && (
              <div className="flex h-80 flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">正在检索领域知识、访问链接并推理…</p>
              </div>
            )}

            {phase === "done" && (
              <div className="space-y-5 p-4">
                <section>
                  <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    需求摘要
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty">
                    在交易域订单生命周期中引入「超时自动取消」能力：对超过可配置时长仍未支付的订单，
                    系统自动取消并回滚锁定库存。影响订单状态机、库存回滚与前端展示。
                  </p>
                </section>

                <section>
                  <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    影响范围
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["订单服务", "库存服务", "定时任务", "订单前端", "营销配置"].map((t) => (
                      <Badge key={t} tone="primary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      建议任务（Jira 草稿）
                    </h4>
                    <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                      <Sparkles className="h-3 w-3" /> AI 润色
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
                              {t.points} 点
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
                    用户故事
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
                    <Check className="h-4 w-4" /> 确认并创建 4 个 Jira 任务
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4" /> 同步至 Confluence
                  </Button>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">
                  确认前不会创建任何 Jira / Confluence 内容
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

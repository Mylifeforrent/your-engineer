"use client"

import { useState } from "react"
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
  status: "分析完成" | "分析中" | "待处理"
}

const alerts: Alert[] = [
  {
    id: "AL-2041",
    service: "inventory-service",
    title: "5xx 错误率突增至 8.2%",
    severity: "high",
    time: "1 小时前",
    status: "分析完成",
  },
  {
    id: "AL-2040",
    service: "order-service",
    title: "下单接口 P99 延迟 > 2s",
    severity: "medium",
    time: "3 小时前",
    status: "待处理",
  },
  {
    id: "AL-2039",
    service: "payment-gateway",
    title: "回调队列积压 1.2k",
    severity: "low",
    time: "昨天",
    status: "分析完成",
  },
]

const sevTone = { high: "danger", medium: "warning", low: "muted" } as const
const sevLabel = { high: "高", medium: "中", low: "低" } as const

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
        title="告警分析"
        desc="通过 MCP 查询日志，结合服务上下文与历史经验，AI 产出可溯源的根因分析"
        actions={<Badge tone="primary">AI 推理线 · Phase 3</Badge>}
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        {/* Alert list */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader
              title="告警列表"
              icon={<Siren className="h-4 w-4" />}
              action={<Badge tone="danger">2 待处理</Badge>}
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
                        <Badge tone={sevTone[a.severity]}>{sevLabel[a.severity]}优先级</Badge>
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
            <CardHeader title="服务基础配置" icon={<Server className="h-4 w-4" />} />
            <div className="space-y-2.5 p-4 text-sm">
              <ConfigRow k="系统" v="电商核心交易系统" />
              <ConfigRow k="服务" v={selected.service} />
              <ConfigRow k="上游" v="order-service, cart-service" />
              <ConfigRow k="下游" v="mysql-inventory, redis-lock" />
              <ConfigRow k="影响范围" v="下单 / 秒杀 / 库存展示" />
              <ConfigRow k="日志 MCP" v="loki-prod (已连接)" />
            </div>
          </Card>
        </div>

        {/* Analysis */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title={`根因分析 · ${selected.id}`}
              desc={selected.title}
              icon={<Sparkles className="h-4 w-4" />}
              action={<Badge tone={sevTone[selected.severity]}>{selected.status}</Badge>}
            />
            <div className="space-y-5 p-4">
              <section>
                <h4 className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  AI 综合判断
                </h4>
                <p className="text-sm leading-relaxed text-pretty">
                  库存服务数据库连接池被打满（active 50/50），叠加 <code className="rounded bg-secondary px-1 font-mono text-xs">stock_lock</code>{" "}
                  慢查询导致连接长时间占用，扣减库存接口大量超时并返回 5xx。诱因与今日 10 点开始的秒杀活动流量高峰吻合。
                </p>
              </section>

              <section>
                <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Terminal className="h-3.5 w-3.5" /> 相关日志（经 MCP 查询）
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
                  <History className="h-3.5 w-3.5" /> 引用历史经验
                </h4>
                <div className="rounded-md border border-border bg-secondary/30 px-3 py-2.5 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge tone="muted">EXP-118</Badge>
                    <span className="text-xs text-muted-foreground">2026-05 · 相似度 91%</span>
                  </div>
                  <p className="mt-1.5 text-pretty">
                    大促期间连接池打满：临时扩容 db 连接池至 80，为 stock_lock 增加复合索引，长期改造为库存扣减异步化。
                  </p>
                </div>
              </section>

              <section>
                <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  建议处置
                </h4>
                <ol className="space-y-1.5 text-sm">
                  {[
                    "临时：连接池 50 → 80，缓解超时",
                    "止血：对 stock_lock 慢查询增加 (sku_id, status) 复合索引",
                    "根治：库存扣减异步化 + 本地缓存预扣减",
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
                  <Mail className="h-4 w-4" /> 邮件发送分析结果
                </Button>
                <Button variant="outline" className="flex-1">
                  <Webhook className="h-4 w-4" /> 推送至 Webhook
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

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
    name: "结算流程 E2E 回归",
    kind: "Playwright",
    tags: ["UI", "结算", "回归"],
    last: "2 小时前",
    status: "failed",
  },
  {
    id: "s2",
    name: "订单创建 API 冒烟",
    kind: "pytest",
    tags: ["API", "订单"],
    last: "4 小时前",
    status: "success",
  },
  {
    id: "s3",
    name: "登录鉴权 API 套件",
    kind: "pytest",
    tags: ["API", "鉴权"],
    last: "昨天",
    status: "success",
  },
  {
    id: "s4",
    name: "商品详情页 UI 校验",
    kind: "Playwright",
    tags: ["UI", "商品"],
    last: "3 天前",
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
  success: "成功",
  failed: "失败",
  error: "错误",
  idle: "未运行",
} as const

const runLog = [
  "> playwright test checkout.spec.ts --project=chromium",
  "Running 12 tests using 4 workers",
  "  ✓ 应能进入结算页 (1.2s)",
  "  ✓ 应展示收货地址 (0.8s)",
  "  ✗ 应正确计算优惠券抵扣 (2.1s)",
  "    Expected: ¥88.00  Received: ¥98.00",
  "  ✗ 应支持切换支付方式 (1.9s)",
  "  ✗ 提交订单后跳转结果页 (timeout 30s)",
  "9 passed, 3 failed (46.2s)",
]

export default function TestsPage() {
  const [selected, setSelected] = useState<Script>(scripts[0])

  return (
    <div>
      <PageHeader
        title="测试执行"
        desc="上传脚本、内置沙箱运行，采集截图与完整日志，AI 归集为结构化测试报告"
        actions={
          <>
            <Button variant="outline">
              <Upload className="h-4 w-4" /> 上传脚本
            </Button>
            <Badge tone="primary">执行编排线 · Phase 2</Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-5">
        {/* Script list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="测试用例"
              icon={<FlaskConical className="h-4 w-4" />}
              action={<Badge tone="muted">{scripts.length} 个脚本</Badge>}
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
              desc={`${selected.kind} · 内置沙箱 · 超时 60s · 内存 512MB`}
              icon={<Tag className="h-4 w-4" />}
              action={
                <Button size="sm">
                  <Play className="h-3.5 w-3.5" /> 运行
                </Button>
              }
            />
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              <RunStat label="通过" value="9" tone="success" />
              <RunStat label="失败" value="3" tone="warning" />
              <RunStat label="错误" value="0" tone="danger" />
            </div>

            {/* Screenshots */}
            <div className="p-4">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <ImageIcon className="h-3.5 w-3.5" /> 失败截图
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["优惠券抵扣", "支付方式切换", "订单结果页"].map((t) => (
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
                <Terminal className="h-3.5 w-3.5" /> 执行日志
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
              title="AI 测试报告"
              desc="将截图、日志与执行数据归集为结构化报告"
              icon={<Sparkles className="h-4 w-4" />}
              action={<Badge tone="warning">待确认同步</Badge>}
            />
            <div className="space-y-3 p-4">
              <p className="text-sm leading-relaxed text-pretty">
                本次结算回归 12 例中 3 例失败，均集中于优惠券与支付环节：优惠券抵扣金额计算错误（预期 ¥88 实得 ¥98），
                疑似满减规则未生效；支付方式切换与订单提交超时可能由前置优惠券异常连带导致。建议优先排查营销计价服务。
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="h-4 w-4" /> 同步至 Jira
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="h-4 w-4" /> 同步至 Confluence
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

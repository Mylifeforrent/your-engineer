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
    name: "发布文档生成",
    desc: "聚合 Jira / Confluence / PR，生成发布文档草稿",
    icon: Rocket,
    tone: "primary" as const,
  },
  {
    id: "jira-create",
    name: "Jira 建单",
    desc: "按团队格式生成 Jira 任务",
    icon: FilePlus2,
    tone: "default" as const,
  },
  {
    id: "jira-review",
    name: "Jira 评审",
    desc: "AI 检查单据完整性与规范",
    icon: FileSearch2,
    tone: "default" as const,
  },
  {
    id: "confluence",
    name: "Confluence 编写",
    desc: "按模板创建 / 编辑文档",
    icon: FileEdit,
    tone: "default" as const,
  },
]

const releaseInputs = [
  { icon: GitPullRequest, label: "已合并 PR", value: "18 个", src: "github/order-service" },
  { icon: Check, label: "已完成 Jira", value: "12 项", src: "OMS 看板 · Sprint 42" },
  { icon: FileEdit, label: "关联 Confluence", value: "3 篇", src: "交易域空间" },
]

export default function MiniToolsPage() {
  const [phase, setPhase] = useState<"idle" | "gen" | "done">("done")

  return (
    <div>
      <PageHeader
        title="小工具 / 发布"
        desc="基于平台模板配置团队专属小工具，AI 按团队格式生成内容，写回均需人工确认"
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-4 w-4" /> 新建小工具
            </Button>
            <Badge tone="primary">AI 推理线 · Phase 3</Badge>
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
                title="发布准备 · v3.8.0"
                desc="聚合的输入源"
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
                  <Sparkles className="h-4 w-4" /> 重新生成发布文档
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated doc */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader
                title="发布文档草稿"
                desc="团队格式 · 可编辑 / AI 润色"
                icon={<FileEdit className="h-4 w-4" />}
                action={<Badge tone="warning">待确认写回</Badge>}
              />
              <div className="space-y-4 p-4">
                <DocSection title="版本概述">
                  本次发布聚焦交易域订单超时自动取消能力与结算体验优化，包含 12 项需求与 18 个 PR，涉及订单、库存、结算三个服务。
                </DocSection>
                <DocSection title="主要变更">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>新增订单超时自动取消与库存回滚</li>
                    <li>结算页优惠券计价重构，修复满减未生效问题</li>
                    <li>库存扣减接口幂等性改造</li>
                  </ul>
                </DocSection>
                <DocSection title="风险与回滚">
                  灰度 10% 起量，观测库存回滚成功率与结算下单转化；异常时可通过开关 <code className="rounded bg-secondary px-1 font-mono text-xs">order.timeout.enabled</code> 快速关闭。
                </DocSection>

                <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
                  <Button className="flex-1">
                    <Check className="h-4 w-4" /> 确认写回 Confluence
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Sparkles className="h-4 w-4" /> AI 润色全文
                  </Button>
                </div>
                <p className="text-center text-[11px] text-muted-foreground">
                  所有写回操作均需人工确认
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

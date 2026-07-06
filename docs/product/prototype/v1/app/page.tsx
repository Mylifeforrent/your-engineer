import Link from "next/link"
import { PageHeader, Card, CardHeader, Badge, StatusDot, Button, Stat } from "@/components/ui"
import { overviewStats, activities, pendingTasks, healthTrend } from "@/lib/data"
import { navGroups } from "@/lib/nav"
import { ArrowUpRight, CheckCircle2, Circle, Sparkles } from "lucide-react"

export default function DashboardPage() {
  const modules = navGroups.flatMap((g) => g.items).filter((i) => i.href !== "/")

  return (
    <div>
      <PageHeader
        title="总览"
        desc="今天是 2026 年 7 月 6 日 · 你有 3 项待确认的 AI 产出"
        actions={
          <Button>
            <Sparkles className="h-4 w-4" />
            新建需求分析
          </Button>
        }
      />

      <div className="space-y-6 p-4 sm:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {overviewStats.map((s) => (
            <Stat
              key={s.label}
              label={s.label}
              value={s.value}
              sub={<span className="text-muted-foreground">{s.sub}</span>}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Activity feed */}
          <Card className="lg:col-span-2">
            <CardHeader
              title="平台动态"
              desc="AI 推理与执行编排的最新产出"
              action={
                <Badge tone="muted">实时</Badge>
              }
            />
            <ul className="divide-y divide-border">
              {activities.map((a) => (
                <li key={a.id} className="flex items-start gap-3 px-4 py-3">
                  <div className="mt-1">
                    <StatusDot tone={a.tone} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {a.module}
                      </span>
                      <Badge tone={a.tone}>{a.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-pretty">{a.title}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    {a.time}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Pending tasks */}
          <Card>
            <CardHeader
              title="待办 / 待确认"
              desc="写操作均需人工确认"
              action={<Badge tone="primary">{pendingTasks.length}</Badge>}
            />
            <ul className="divide-y divide-border">
              {pendingTasks.map((t) => (
                <li key={t.id} className="flex items-start gap-2.5 px-4 py-3">
                  {t.needConfirm ? (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug text-pretty">{t.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {t.module}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-[11px] text-muted-foreground">{t.due}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Health trend + module grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader title="巡检通过率" desc="近 12 个执行窗口" />
            <div className="p-4">
              <div className="flex h-32 items-end gap-1.5">
                {healthTrend.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className="w-full rounded-sm bg-primary/70"
                      style={{ height: `${v}%` }}
                      title={`${v}%`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <span>-12h</span>
                <span>现在</span>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">功能模块</h3>
              <span className="font-mono text-[11px] text-muted-foreground">7 个模块</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <Link key={m.href} href={m.href}>
                    <Card className="group h-full p-4 transition-colors hover:border-primary/40">
                      <div className="flex items-start justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <h4 className="mt-3 text-sm font-medium">{m.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                        {m.desc}
                      </p>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

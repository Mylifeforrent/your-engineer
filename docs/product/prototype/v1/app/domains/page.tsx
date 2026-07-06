"use client"

import { useState } from "react"
import { PageHeader, Card, CardHeader, Badge, Button } from "@/components/ui"
import { BookMarked, FileText, Plus, Upload, Search, Database } from "lucide-react"

type Domain = {
  id: string
  name: string
  docs: number
  size: string
  updated: string
}

const domains: Domain[] = [
  { id: "d1", name: "交易域", docs: 14, size: "1.2 MB", updated: "2 天前" },
  { id: "d2", name: "营销域", docs: 8, size: "640 KB", updated: "1 周前" },
  { id: "d3", name: "库存域", docs: 11, size: "980 KB", updated: "3 天前" },
  { id: "d4", name: "用户账户域", docs: 6, size: "420 KB", updated: "2 周前" },
  { id: "d5", name: "结算域", docs: 9, size: "720 KB", updated: "5 天前" },
]

const docs = [
  { name: "订单生命周期设计.md", size: "128 KB", tag: "设计" },
  { name: "库存扣减与回滚规范.md", size: "86 KB", tag: "规范" },
  { name: "订单状态机说明.md", size: "64 KB", tag: "设计" },
  { name: "支付超时处理策略.md", size: "42 KB", tag: "策略" },
  { name: "交易域术语表.md", size: "20 KB", tag: "术语" },
]

export default function DomainsPage() {
  const [selected, setSelected] = useState<Domain>(domains[0])

  return (
    <div>
      <PageHeader
        title="领域知识"
        desc="定义业务领域并配置知识库（本期基于 SQLite + 非结构化文档检索），供需求分析等 AI 模块检索"
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-4 w-4" /> 新建领域
            </Button>
            <Badge tone="primary">平台基础 · Phase 1</Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        {/* Domain list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="业务领域"
              icon={<Database className="h-4 w-4" />}
              action={<Badge tone="muted">{domains.length}</Badge>}
            />
            <ul className="divide-y divide-border">
              {domains.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => setSelected(d)}
                    className={
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors " +
                      (selected.id === d.id ? "bg-secondary/60" : "hover:bg-secondary/30")
                    }
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary">
                      <BookMarked className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {d.docs} 篇 · {d.size}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{d.updated}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Domain detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title={`${selected.name} · 知识文档`}
              desc={`${selected.docs} 篇文档 · 用于 RAG 检索增强`}
              icon={<FileText className="h-4 w-4" />}
              action={
                <Button size="sm" variant="outline">
                  <Upload className="h-3.5 w-3.5" /> 上传文档
                </Button>
              }
            />

            <div className="border-b border-border p-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={`在「${selected.name}」中检索知识…`}
                />
              </div>
            </div>

            <ul className="divide-y divide-border">
              {docs.map((doc) => (
                <li key={doc.name} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{doc.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{doc.size}</p>
                  </div>
                  <Badge tone="muted">{doc.tag}</Badge>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <Database className="h-3.5 w-3.5" />
              <span>需求分析选择「{selected.name}」时，将实际检索以上文档并在结论中溯源引用。</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

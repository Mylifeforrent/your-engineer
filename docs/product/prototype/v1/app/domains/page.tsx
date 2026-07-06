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
  { id: "d1", name: "Trading Domain", docs: 14, size: "1.2 MB", updated: "2 days ago" },
  { id: "d2", name: "Marketing Domain", docs: 8, size: "640 KB", updated: "1 week ago" },
  { id: "d3", name: "Inventory Domain", docs: 11, size: "980 KB", updated: "3 days ago" },
  { id: "d4", name: "User Account Domain", docs: 6, size: "420 KB", updated: "2 weeks ago" },
  { id: "d5", name: "Settlement Domain", docs: 9, size: "720 KB", updated: "5 days ago" },
]

const docs = [
  { name: "Order Lifecycle Design.md", size: "128 KB", tag: "Design" },
  { name: "Inventory Deduction and Rollback Spec.md", size: "86 KB", tag: "Spec" },
  { name: "Order State Machine Doc.md", size: "64 KB", tag: "Design" },
  { name: "Payment Timeout Handling Strategy.md", size: "42 KB", tag: "Strategy" },
  { name: "Trading Domain Glossary.md", size: "20 KB", tag: "Glossary" },
]

export default function DomainsPage() {
  const [selected, setSelected] = useState<Domain>(domains[0])

  return (
    <div>
      <PageHeader
        title="Domain Knowledge"
        desc="Define business domains and configure knowledge bases (SQLite + unstructured document retrieval this phase) for AI modules like Requirement Analysis"
        actions={
          <>
            <Button variant="outline">
              <Plus className="h-4 w-4" /> New Domain
            </Button>
            <Badge tone="primary">Platform Foundation · Phase 1</Badge>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        {/* Domain list */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader
              title="Business Domains"
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
                        {d.docs} docs · {d.size}
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
              title={`${selected.name} · Knowledge Documents`}
              desc={`${selected.docs} documents · Used for RAG retrieval augmentation`}
              icon={<FileText className="h-4 w-4" />}
              action={
                <Button size="sm" variant="outline">
                  <Upload className="h-3.5 w-3.5" /> Upload Document
                </Button>
              }
            />

            <div className="border-b border-border p-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder={`Search knowledge in "${selected.name}"...`}
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
              <span>When Requirement Analysis selects "{selected.name}", it will actually retrieve these documents and trace citations in conclusions.</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

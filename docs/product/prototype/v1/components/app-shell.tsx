"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navGroups, allNavItems } from "@/lib/nav"
import { cn } from "@/lib/utils"
import { Terminal, Search, Bell, Menu, X, ChevronRight } from "lucide-react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const active = allNavItems.find(
    (item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href)),
  )

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">Copilot</span>
            <span className="font-mono text-[10px] text-muted-foreground">Engineering Efficiency Platform v4</span>
          </div>
          <button
            className="ml-auto text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive =
                    item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href))
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                        )}
                      >
                        <Icon
                          className={cn("h-4 w-4 shrink-0", isActive && "text-primary")}
                        />
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-mono text-[10px] font-medium text-destructive-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">
              YZ
            </div>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm">Zhen Yang · Backend</span>
              <span className="truncate font-mono text-[10px] text-muted-foreground">
                platform-team
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
          <button
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Engineering Efficiency Platform</span>
            <ChevronRight className="hidden h-3.5 w-3.5 sm:inline" />
            <span className="font-medium text-foreground">{active?.title ?? "Overview"}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm text-muted-foreground md:flex">
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Search modules, tasks...</span>
              <kbd className="ml-6 rounded border border-border bg-secondary px-1 font-mono text-[10px]">
                ⌘K
              </kbd>
            </div>
            <button
              className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}

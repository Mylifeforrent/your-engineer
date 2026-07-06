import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  FileSearch,
  FlaskConical,
  HeartPulse,
  Siren,
  Wrench,
  Settings2,
  BookMarked,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  desc: string
  badge?: string
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Workbench",
    items: [
      {
        title: "Overview",
        href: "/",
        icon: LayoutDashboard,
        desc: "Today's to-do, runtime status, and team activity",
      },
    ],
  },
  {
    label: "AI Reasoning Line",
    items: [
      {
        title: "Requirement Analysis",
        href: "/requirements",
        icon: FileSearch,
        desc: "Analyze requirements combining domain knowledge, generate Jira / Confluence drafts",
      },
      {
        title: "Alert Analysis",
        href: "/alerts",
        icon: Siren,
        desc: "Production alert root cause analysis and experience accumulation",
        badge: "2",
      },
      {
        title: "Mini Tools / Release",
        href: "/mini-tools",
        icon: Wrench,
        desc: "Templated mini tools and release document generation",
      },
    ],
  },
  {
    label: "Execution Orchestration Line",
    items: [
      {
        title: "Test Execution",
        href: "/tests",
        icon: FlaskConical,
        desc: "Upload scripts, run in sandbox, consolidate results",
      },
      {
        title: "Daily Health Check",
        href: "/health-check",
        icon: HeartPulse,
        desc: "Scheduled script triggers, results notified via email / webhook",
      },
    ],
  },
  {
    label: "Platform Foundation",
    items: [
      {
        title: "Config Center",
        href: "/config",
        icon: Settings2,
        desc: "MCP services, notification channels, and connection tests",
      },
      {
        title: "Domain Knowledge",
        href: "/domains",
        icon: BookMarked,
        desc: "Business domain definition and knowledge base configuration",
      },
    ],
  },
]

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items)

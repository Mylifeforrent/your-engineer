export const overviewStats = [
  { label: "Today's To-Do", value: "7", sub: "3 items need manual confirmation" },
  { label: "Health Check Pass Rate", value: "94%", sub: "Last 24 hours · 42 runs" },
  { label: "Pending Alerts", value: "2", sub: "1 high priority" },
  { label: "AI Adoption Rate", value: "63%", sub: "+5% vs last week" },
]

export type Activity = {
  id: string
  module: string
  title: string
  time: string
  tone: "primary" | "success" | "warning" | "danger" | "muted"
  status: string
}

export const activities: Activity[] = [
  {
    id: "a1",
    module: "Requirement Analysis",
    title: "'Order Timeout Auto-Cancellation' generated 4 Jira task drafts",
    time: "12 minutes ago",
    tone: "primary",
    status: "Pending Confirmation",
  },
  {
    id: "a2",
    module: "Daily Health Check",
    title: "Payment Gateway Health Check Passed",
    time: "28 minutes ago",
    tone: "success",
    status: "Success",
  },
  {
    id: "a3",
    module: "Alert Analysis",
    title: "Inventory Service 5xx spike root cause analysis complete",
    time: "1 hour ago",
    tone: "danger",
    status: "High Priority",
  },
  {
    id: "a4",
    module: "Test Execution",
    title: "Checkout Flow E2E Regression 3 cases failed",
    time: "2 hours ago",
    tone: "warning",
    status: "Partial Failure",
  },
  {
    id: "a5",
    module: "Mini Tools / Release",
    title: "v3.8.0 release document draft generated",
    time: "3 hours ago",
    tone: "muted",
    status: "Draft",
  },
]

export type Task = {
  id: string
  title: string
  module: string
  due: string
  needConfirm: boolean
}

export const pendingTasks: Task[] = [
  { id: "t1", title: "Confirm 'Order Timeout' requirement analysis and create Jira", module: "Requirement Analysis", due: "Today", needConfirm: true },
  { id: "t2", title: "Review Inventory Service alert root cause analysis", module: "Alert Analysis", due: "Today", needConfirm: true },
  { id: "t3", title: "Confirm checkout E2E report and sync Confluence", module: "Test Execution", due: "Today", needConfirm: true },
  { id: "t4", title: "Supplement 'Marketing Domain' business knowledge documents", module: "Domain Knowledge", due: "Tomorrow", needConfirm: false },
  { id: "t5", title: "Test newly added Jira MCP service connection", module: "Config Center", due: "This week", needConfirm: false },
]

export const healthTrend = [72, 88, 65, 94, 90, 78, 96, 84, 92, 88, 94, 100]

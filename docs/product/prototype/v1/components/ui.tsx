import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  desc,
  actions,
}: {
  title: string
  desc?: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0">
        <h1 className="text-balance text-xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 text-pretty text-sm text-muted-foreground">{desc}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>{children}</div>
  )
}

export function CardHeader({
  title,
  desc,
  icon,
  action,
}: {
  title: string
  desc?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
      <div className="flex items-start gap-2.5">
        {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

type Tone = "default" | "primary" | "success" | "warning" | "danger" | "muted"

const toneMap: Record<Tone, string> = {
  default: "bg-secondary text-secondary-foreground",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-destructive/15 text-destructive",
  muted: "bg-secondary/60 text-muted-foreground",
}

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] font-medium",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusDot({ tone = "default" }: { tone?: Tone }) {
  const color: Record<Tone, string> = {
    default: "bg-muted-foreground",
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
    muted: "bg-muted-foreground",
  }
  return <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", color[tone])} />
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-card text-foreground hover:bg-secondary",
    ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
  }
  const sizes = {
    default: "h-9 px-3.5 text-sm",
    sm: "h-8 px-2.5 text-xs",
  }
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Stat({
  label,
  value,
  sub,
  tone = "primary",
}: {
  label: string
  value: string
  sub?: React.ReactNode
  tone?: Tone
}) {
  return (
    <Card className="p-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <div className="mt-1.5 flex items-center gap-1.5 text-xs">{sub}</div>}
    </Card>
  )
}

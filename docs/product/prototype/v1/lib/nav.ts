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
    label: "工作台",
    items: [
      {
        title: "总览",
        href: "/",
        icon: LayoutDashboard,
        desc: "今日待办、运行态与团队动态",
      },
    ],
  },
  {
    label: "AI 推理线",
    items: [
      {
        title: "需求分析",
        href: "/requirements",
        icon: FileSearch,
        desc: "结合领域知识分析需求，生成 Jira / Confluence 草稿",
      },
      {
        title: "告警分析",
        href: "/alerts",
        icon: Siren,
        desc: "生产告警根因分析与经验沉淀",
        badge: "2",
      },
      {
        title: "小工具 / 发布",
        href: "/mini-tools",
        icon: Wrench,
        desc: "模板化小工具与发布文档生成",
      },
    ],
  },
  {
    label: "执行编排线",
    items: [
      {
        title: "测试执行",
        href: "/tests",
        icon: FlaskConical,
        desc: "上传脚本、沙箱运行、结果归集",
      },
      {
        title: "日常巡检",
        href: "/health-check",
        icon: HeartPulse,
        desc: "定时触发脚本，结果邮件 / Webhook 通知",
      },
    ],
  },
  {
    label: "平台基础",
    items: [
      {
        title: "配置中心",
        href: "/config",
        icon: Settings2,
        desc: "MCP 服务、通知渠道与连接测试",
      },
      {
        title: "领域知识",
        href: "/domains",
        icon: BookMarked,
        desc: "业务领域定义与知识库配置",
      },
    ],
  },
]

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items)

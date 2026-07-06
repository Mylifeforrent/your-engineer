export const overviewStats = [
  { label: "今日待办", value: "7", sub: "3 项需人工确认" },
  { label: "巡检通过率", value: "94%", sub: "近 24 小时 · 42 次运行" },
  { label: "待处理告警", value: "2", sub: "1 个高优先级" },
  { label: "AI 采纳率", value: "63%", sub: "本周较上周 +5%" },
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
    module: "需求分析",
    title: "「订单超时自动取消」已生成 4 个 Jira 任务草稿",
    time: "12 分钟前",
    tone: "primary",
    status: "待确认",
  },
  {
    id: "a2",
    module: "日常巡检",
    title: "支付网关健康检查 通过",
    time: "28 分钟前",
    tone: "success",
    status: "成功",
  },
  {
    id: "a3",
    module: "告警分析",
    title: "库存服务 5xx 突增 根因分析已完成",
    time: "1 小时前",
    tone: "danger",
    status: "高优先级",
  },
  {
    id: "a4",
    module: "测试执行",
    title: "结算流程 E2E 回归 3 用例失败",
    time: "2 小时前",
    tone: "warning",
    status: "部分失败",
  },
  {
    id: "a5",
    module: "小工具 / 发布",
    title: "v3.8.0 发布文档草稿已生成",
    time: "3 小时前",
    tone: "muted",
    status: "草稿",
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
  { id: "t1", title: "确认「订单超时」需求分析并创建 Jira", module: "需求分析", due: "今天", needConfirm: true },
  { id: "t2", title: "复核库存服务告警根因分析", module: "告警分析", due: "今天", needConfirm: true },
  { id: "t3", title: "确认结算 E2E 报告并同步 Confluence", module: "测试执行", due: "今天", needConfirm: true },
  { id: "t4", title: "补充「营销域」业务知识文档", module: "领域知识", due: "明天", needConfirm: false },
  { id: "t5", title: "测试新增的 Jira MCP 服务连接", module: "配置中心", due: "本周", needConfirm: false },
]

export const healthTrend = [72, 88, 65, 94, 90, 78, 96, 84, 92, 88, 94, 100]

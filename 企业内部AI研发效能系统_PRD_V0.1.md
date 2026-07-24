# 企业内部 AI 研发效能系统 PRD

> 文档版本：V0.1  
> 文档状态：初稿  
> 产品阶段：内部轻量级服务 / MVP 规划  
> 目标用户：研发团队、QA、Release Owner、SRE、研发负责人  
> 最后更新：2026-07-24

---

## 1. 文档概述

### 1.1 产品名称

暂定名称：**AI Engineering Operations Hub**

中文暂定名称：**企业内部 AI 研发效能平台**

### 1.2 产品定位

本产品是一套面向企业内部研发团队的轻量级 AI 服务，旨在通过连接 Jira、Confluence、代码仓库、CI/CD、日志平台和告警系统，减少研发交付和生产问题排查过程中重复、分散、低效的信息整理工作。

产品首阶段重点解决两个高频且耗时的问题：

1. Release 准备过程中的信息收集、完整性检查、风险识别和文档生成。
2. 生产告警发生后的日志查询、变更关联、历史经验检索和初步原因分析。

后续逐步扩展自动化测试执行与分析、需求分析等能力。

### 1.3 核心价值主张

> 在不替代人工决策的前提下，利用 AI 自动收集证据、组织信息、识别缺失项、提出分析假设，并将结果同步到现有研发工具中。

---

## 2. 背景与问题

### 2.1 Release 准备现状

一次 Release 通常需要人工从多个系统中收集并整理以下信息：

- Jira 中的需求、缺陷、任务和版本信息
- GitHub、GitLab 或其他代码仓库中的 PR、Commit 和审批状态
- 自动化测试及手工测试结果
- 已知问题和风险
- 数据库或配置变更
- 发布步骤
- 发布后检查项
- 回滚条件和回滚方案
- Confluence 中的 Release 模板和历史文档

当前主要问题包括：

- 信息分散在多个系统中
- 内容重复整理
- Release 文档格式不统一
- 发布前检查依赖个人经验
- 容易遗漏未关闭 Jira、未审批 PR、测试缺失和回滚方案
- Release 文档准备耗时较长
- 发布材料缺少来源追溯

### 2.2 告警分析现状

生产告警发生后，值班人员通常需要人工完成：

- 判断告警属于哪个系统、服务和环境
- 查询相关日志
- 查看指标和 Trace
- 确认最近发布或配置变更
- 查找服务依赖关系
- 检索历史 Incident 和 Runbook
- 判断影响范围
- 整理初步分析结论
- 通过 Email 或 API 通知相关人员

当前主要问题包括：

- 排查入口多，信息获取过程重复
- 服务、日志、部署和历史经验之间缺少统一关联
- 排查过程依赖资深人员经验
- 初步信息整理耗时长
- 告警通知中缺少足够的上下文和证据
- 相似事故的经验无法被稳定复用

### 2.3 自动化测试现状

团队已有或计划建设 Playwright、Pytest 等测试脚本，但存在以下问题：

- 测试执行入口分散
- 测试结果、截图和日志难以统一查看
- 测试结果与 Release 准备流程未打通
- 失败原因仍需要人工阅读大量日志
- 定时健康检查和手动测试执行底层能力重复

### 2.4 需求分析现状

需求分析具备潜在价值，但当前优先级低于 Release、告警分析和自动化测试，暂不作为首阶段重点。

---

## 3. 产品目标

### 3.1 业务目标

1. 显著减少 Release 文档准备和发布前检查时间。
2. 缩短生产告警的初步信息收集和定位时间。
3. 让测试结果可以直接成为 Release 证据的一部分。
4. 让团队历史经验、Runbook 和 Incident 记录可以被 AI 检索和复用。
5. 保持人工审核与决策权，避免 AI 直接执行高风险操作。
6. 在内部轻量级使用前提下，建立可扩展的连接器、权限、审计和证据模型。

### 3.2 产品目标

- 提供统一 Workspace，管理团队、服务、业务知识、工具连接和模板。
- 提供 Release Preparation 工作流。
- 提供只读型 Alert Analyzer。
- 提供统一的任务运行、日志、证据和通知能力。
- 后续接入现有 CI/CD，实现自动化测试触发与结果分析。
- 后续扩展需求分析、Jira 创建和 Confluence 内容生成。

### 3.3 非目标

首阶段不包含：

- 自动部署
- 自动回滚
- 自动重启生产服务
- 自动修改生产配置
- 自动关闭告警
- 自动批准 Release
- 通用低代码工作流平台
- 任意用户脚本在平台服务器直接执行
- 面向外部客户的商业化、多租户和计费能力
- 完整替代 Jira、Confluence、CI/CD 或可观测性平台

---

## 4. 用户与角色

### 4.1 Release Owner

主要职责：

- 准备 Release 文档
- 收集变更和测试信息
- 检查发布前准备状态
- 协调开发、QA 和运维团队
- 确认发布风险和回滚方案

核心诉求：

- 自动收集发布信息
- 快速发现缺失项
- 自动生成规范文档
- 减少跨系统复制粘贴

### 4.2 QA / QA Lead

主要职责：

- 提供测试证据
- 查看自动化测试结果
- 分析失败原因
- 确认测试覆盖范围

核心诉求：

- 统一查看日志、截图和执行结果
- 将测试结果自动关联到 Release
- 使用 AI 辅助分析失败原因

### 4.3 SRE / On-call Engineer

主要职责：

- 接收并处理生产告警
- 查询日志、指标和变更
- 判断影响范围
- 形成初步结论
- 协调相关团队

核心诉求：

- 自动收集排障上下文
- 关联最近发布和历史事故
- 获得有证据支持的原因假设
- 减少重复查询操作

### 4.4 Engineering Manager

主要职责：

- 关注发布质量
- 关注生产稳定性
- 审核风险
- 衡量团队研发效能

核心诉求：

- 查看 Release Readiness
- 查看告警处理效率
- 获取统一的审计和统计信息

### 4.5 Platform Administrator

主要职责：

- 配置第三方工具
- 管理凭证、权限和模板
- 配置服务、日志来源和通知方式
- 查看审计记录

---

## 5. 产品优先级

| 优先级 | 模块 | 定位 |
|---|---|---|
| P0 | Release Preparation | 首个 MVP，优先解决发布准备耗时问题 |
| P1 | Alert Analyzer | 第二个核心模块，提供只读型告警初步分析 |
| P2 | Automated Testing | 先接入现有 CI/CD，再考虑自建执行能力 |
| P3 | Requirement Analysis | 后续复用 Jira、Confluence 和知识库能力 |
| 基础能力 | 配置、连接器、权限、审计、证据 | 随 P0、P1 逐步建设 |

---

## 6. 产品整体结构

### 6.1 Workspace

用于组织团队内部的业务和技术上下文，包括：

- 团队
- 项目
- 业务领域
- 服务
- 系统
- 环境
- 知识文档
- Runbook
- 历史 Incident
- Release 模板
- 通知规则
- 成员与权限

### 6.2 AI Workflows

面向用户提供场景化工作流：

- Release Preparation
- Alert Analyzer
- Test Failure Analysis
- Requirement Analysis
- Jira Review
- Confluence Content Generation

### 6.3 Automation Runs

统一管理所有运行任务：

- 手动触发
- 定时触发
- API 触发
- Webhook 触发
- CI/CD 触发
- 运行状态
- 开始和结束时间
- 执行日志
- 截图和附件
- AI 分析结果
- 重试
- 通知
- 审计

### 6.4 Integrations

首期重点连接：

- Jira
- Confluence
- GitHub 或 GitLab
- Jenkins、GitHub Actions 或 GitLab CI
- Email
- 日志平台
- 告警平台

后续连接：

- Metrics 平台
- Distributed Tracing
- Kubernetes
- Slack 或 Microsoft Teams
- 配置中心
- Feature Flag 平台

### 6.5 Templates and Policies

管理：

- Release 模板
- Jira 模板
- Confluence 模板
- 告警分析模板
- 通知模板
- AI Prompt 模板
- 审批规则
- 权限策略
- 字段映射规则

### 6.6 Audit and Evidence

记录：

- AI 使用了哪些数据
- 数据来自哪个系统
- 数据获取时间
- 用户做了哪些修改
- 用户批准了哪些操作
- 向第三方系统写入了什么
- 测试运行产生了哪些证据
- AI 结论对应哪些日志、指标、变更或历史记录

---

# 7. P0：Release Preparation

## 7.1 模块目标

自动收集 Release 所需信息，生成结构化 Release Readiness Report 和 Release 文档草稿，识别缺失项与风险，并在用户确认后同步到 Confluence。

## 7.2 用户故事

### US-R01 创建 Release 分析任务

作为 Release Owner，我希望选择一个 Jira Version 或一组 Jira Issues，以便系统自动汇总本次发布内容。

### US-R02 收集发布信息

作为 Release Owner，我希望系统自动读取相关 PR、测试结果和现有文档，以减少手工复制粘贴。

### US-R03 检查发布完整性

作为 Release Owner，我希望系统检查未关闭 Jira、未审批 PR、缺失测试证据和缺失回滚方案，以便提前发现风险。

### US-R04 生成 Release 文档

作为 Release Owner，我希望系统根据团队模板生成 Release 文档草稿，以便快速完成发布材料。

### US-R05 人工修改和确认

作为 Release Owner，我希望在同步 Confluence 前查看、修改和确认内容，以保证文档准确。

### US-R06 同步 Confluence

作为 Release Owner，我希望将确认后的文档创建或更新到指定 Confluence Page。

### US-R07 查看来源与审计

作为用户，我希望查看每一项内容的来源，以及谁在何时修改和发布了文档。

---

## 7.3 Release Preparation 主流程

```text
创建 Release 任务
    ↓
选择 Jira Version / Jira Issues
    ↓
读取 Jira 数据
    ↓
读取 PR / Commit 数据
    ↓
读取或上传测试结果
    ↓
读取 Release 模板和历史资料
    ↓
执行确定性规则检查
    ↓
AI 汇总、分类和风险分析
    ↓
生成 Release Readiness Report
    ↓
生成 Release 文档草稿
    ↓
用户修改与确认
    ↓
同步 Confluence
    ↓
保存版本、来源和审计记录
```

---

## 7.4 输入

### 7.4.1 必须支持

- Jira Project
- Jira Version / Fix Version
- 指定 Jira Issue 列表
- Release 名称
- Release 版本
- 目标环境
- 计划发布时间
- Release Owner
- Confluence 模板
- 用户补充说明
- 手动上传测试报告
- 手工填写测试摘要

### 7.4.2 后续支持

- GitHub / GitLab PR
- Commit 列表
- Jenkins / GitHub Actions / GitLab CI 测试结果
- 安全扫描结果
- 代码质量扫描结果
- 数据库变更记录
- Feature Flag 变更
- 历史 Incident
- 已知问题列表

---

## 7.5 Release Readiness Report

系统应输出结构化报告，包括以下部分。

### 7.5.1 Release 概览

- Release 名称
- 版本
- 环境
- 计划发布时间
- 发布负责人
- 涉及系统和服务
- Jira Version
- 关联 Confluence 页面

### 7.5.2 变更内容

- 新功能
- Bug 修复
- 配置变更
- 数据库变更
- 依赖变更
- 基础设施变更
- 其他变更

### 7.5.3 测试证据

- 自动化测试结果
- 手工测试结果
- 测试范围
- 未覆盖内容
- 已知失败
- 截图和附件
- 测试执行时间
- 测试环境

### 7.5.4 风险与缺失项

- 未关闭 Jira
- 未审批 PR
- 未合并 PR
- 缺少测试证据
- 缺少回滚方案
- 缺少发布后验证
- 高风险服务变更
- 数据库变更
- 配置变更
- 关键依赖变更
- 已知生产问题

### 7.5.5 发布检查

- 发布前检查项
- 发布步骤
- 发布后验证
- 回滚条件
- 回滚步骤
- 联系人和责任团队

### 7.5.6 来源状态

每一项内容应标记：

- 已从来源确认
- 基于多项信息推断
- 用户手动输入
- 当前缺失
- 需要人工确认

---

## 7.6 AI 能力边界

### AI 负责

- 汇总 Release 信息
- 按业务功能分类
- 生成变更摘要
- 识别潜在风险
- 总结测试结果
- 生成已知问题摘要
- 生成发布后检查建议
- 生成回滚注意事项草稿
- 按模板生成 Confluence 文档
- 对用户选中的内容进行局部润色

### 确定性程序负责

- Jira 字段读取
- PR 状态读取
- 字段映射
- 必填项校验
- 规则检查
- 权限校验
- API 调用
- Confluence 页面创建或更新
- 版本保存
- 审计记录
- 失败重试

### AI 不负责

- 自动决定是否允许发布
- 自动批准风险
- 自动执行部署
- 自动回滚
- 自动修改生产系统
- 将推测标记为已确认事实

---

## 7.7 Release Preparation MVP 范围

### In Scope

1. 配置 Jira 和 Confluence。
2. 选择 Jira Version 或 Jira Issues。
3. 读取 Jira 内容。
4. 手动上传或填写测试结果。
5. 配置 Release 模板。
6. 生成 Release Readiness Report。
7. 生成 Release 文档草稿。
8. 用户编辑、局部 AI 润色和确认。
9. 创建或更新 Confluence 页面。
10. 查看来源和审计记录。

### Out of Scope

- 自动部署
- 自动发布审批
- 自动回滚
- 多级审批流
- 多团队依赖编排
- 通用工作流设计器
- 多云部署编排
- 复杂 Release Train

---

## 7.8 Release Preparation 验收标准

### AC-R01 Jira 数据读取

- 用户能够选择已配置的 Jira Project。
- 用户能够选择 Jira Version 或输入 Issue Key。
- 系统能够读取 Issue Summary、Description、Status、Type、Priority、Assignee、Fix Version 等字段。
- 读取失败时显示明确错误信息。

### AC-R02 测试结果录入

- 用户能够上传测试报告或填写测试摘要。
- 系统保存文件名、上传人、上传时间和关联 Release。
- 用户能够查看测试附件。

### AC-R03 完整性检查

系统至少能够识别：

- 未关闭 Jira
- 缺少测试结果
- 缺少回滚方案
- 缺少发布后验证
- 缺少发布负责人

### AC-R04 文档生成

- 系统能够基于模板生成 Release 文档。
- 文档中包含 Release 概览、变更、测试、风险和回滚信息。
- 用户能够编辑生成内容。
- 用户能够针对选中段落使用 AI 润色。

### AC-R05 Confluence 同步

- 用户能够选择目标 Space 和 Page。
- 系统在执行前显示预览。
- 用户确认后创建或更新页面。
- 系统记录操作结果和页面链接。

### AC-R06 来源追溯

- 关键内容能够查看来源。
- AI 推断内容有明确标识。
- 缺失内容不得被伪装为已确认信息。

---

# 8. P1：Alert Analyzer

## 8.1 模块目标

在生产告警发生后，自动识别服务和环境，查询相关日志、最近发布、历史 Incident 和 Runbook，输出结构化、可追溯的初步分析报告，并通过 Email 或 API 通知用户。

## 8.2 第一阶段定位

> 只读型生产告警初步分析助手。

第一阶段只负责：

- 信息收集
- 证据整理
- 影响范围初步判断
- 原因假设排序
- 推荐下一步排查动作
- 通知相关用户

第一阶段不执行任何生产修改操作。

---

## 8.3 用户故事

### US-A01 接收告警

作为 SRE，我希望系统通过 API 或 Webhook 接收告警，以便自动开始分析。

### US-A02 识别服务上下文

作为 SRE，我希望系统根据告警识别系统、服务、环境、Region 和负责人。

### US-A03 自动查询日志

作为 SRE，我希望系统根据预配置的日志查询规则获取相关日志。

### US-A04 关联最近变更

作为 SRE，我希望系统自动查询最近 Release、PR、Commit 和配置变化。

### US-A05 检索历史经验

作为 SRE，我希望系统检索历史 Incident 和 Runbook，以复用过往经验。

### US-A06 输出初步分析

作为 SRE，我希望系统给出有证据支持的原因假设和下一步排查建议。

### US-A07 通知用户

作为 SRE，我希望分析结果能够通过 Email 或 API 发送给相关人员。

### US-A08 查看证据

作为用户，我希望能够查看 AI 分析所使用的原始日志、变更和历史记录。

---

## 8.4 告警分析主流程

```text
接收告警
    ↓
结构化解析告警
    ↓
识别系统、服务、环境和负责人
    ↓
加载服务配置、依赖和 Runbook
    ↓
查询相关日志
    ↓
查询最近 Release、PR、Commit 和配置变更
    ↓
检索历史 Incident
    ↓
AI 汇总证据并生成原因假设
    ↓
输出初步分析报告
    ↓
通过 Email 或 API 通知
    ↓
保存证据、结果和审计记录
```

---

## 8.5 告警输入结构

系统至少支持以下字段：

- Alert ID
- Alert Type
- Severity
- Environment
- System
- Service
- Region
- Start Time
- Current Status
- Triggered Metric
- Threshold
- Alert Message
- Dashboard Link
- Log Query
- Related Release
- Source System
- Raw Payload

告警字段不完整时，系统应保留原始 Payload，并明确标记缺失信息。

---

## 8.6 服务配置

每个服务应支持配置：

- 服务名称
- 所属系统
- 所属团队
- 负责人
- 环境
- Region
- 上游服务
- 下游服务
- 日志来源
- 默认日志查询模板
- Dashboard
- Runbook
- 代码仓库
- 部署来源
- Jira Project
- Confluence Space
- 通知目标

---

## 8.7 第一阶段数据来源

### 必须支持

- 告警内容
- 服务基本信息
- 服务负责人
- 日志平台
- 最近部署记录
- 历史 Incident
- Runbook
- Release 数据

### 后续支持

- Metrics
- Distributed Trace
- Kubernetes Events
- Cloud Provider Events
- Database Slow Query
- Feature Flag 变化
- 配置中心变更
- 网络和基础设施事件

---

## 8.8 告警分析输出

### 8.8.1 事件概览

- 当前发生了什么
- 开始时间
- 当前状态
- 严重程度
- 受影响服务
- 可能影响范围
- 负责人

### 8.8.2 关键证据

- 相关错误日志
- 关键日志片段
- 异常指标
- 最近发布
- 最近 PR 或 Commit
- 配置变化
- 上游或下游异常
- 相似历史 Incident
- 相关 Runbook

### 8.8.3 原因假设

每个假设至少包含：

- 假设名称
- 可能原因
- 支持证据
- 反向证据
- 置信度
- 仍需验证的信息
- 建议验证方式

### 8.8.4 推荐下一步

- 建议查询的日志
- 建议查看的指标
- 建议确认的变更
- 建议联系的团队
- 建议执行的人工操作
- 是否建议评估回滚

### 8.8.5 信息缺口

系统必须明确显示：

- 无法访问的数据源
- 缺少的日志
- 缺少的指标
- 缺少的服务配置
- 缺少的部署记录
- 当前无法确认的结论

---

## 8.9 AI 安全边界

### 允许

- 读取授权范围内的数据
- 汇总信息
- 生成原因假设
- 生成排查建议
- 生成通知内容
- 检索相似历史事故

### 不允许

- 自动重启服务
- 自动扩容
- 自动修改配置
- 自动回滚
- 自动关闭告警
- 自动删除日志
- 自动将推测声明为根因
- 绕过权限读取数据

---

## 8.10 Alert Analyzer MVP 范围

### In Scope

1. 支持一个或少数几个核心系统。
2. 支持固定类型告警。
3. 支持一个日志平台。
4. 支持一个部署记录来源。
5. 支持历史 Incident 和 Runbook。
6. 输出结构化分析报告。
7. 支持 Email 或 API 通知。
8. 支持证据查看。
9. 支持权限和审计。
10. 支持分析失败与数据源不可用提示。

### Out of Scope

- 自动修复
- 自动回滚
- 自动修改生产系统
- 全平台、全服务、全告警类型覆盖
- 无限制自然语言日志查询
- 完整替代现有 APM 或 Incident Management 平台

---

## 8.11 Alert Analyzer 验收标准

### AC-A01 告警接收

- 系统能够通过 API 或 Webhook 接收告警。
- 系统保存原始 Payload。
- 重复告警能够通过 Alert ID 或去重规则识别。

### AC-A02 服务识别

- 系统根据告警字段识别服务和环境。
- 无法识别时标记为需要人工确认。
- 用户可手动修正服务归属。

### AC-A03 日志查询

- 系统能够调用已配置日志平台。
- 查询时间范围可基于告警时间自动计算。
- 查询失败时展示错误和影响。

### AC-A04 最近变更关联

- 系统能够查询告警前指定时间窗口内的 Release 或部署。
- 系统展示变更时间、服务和版本。

### AC-A05 原因假设

- 每个原因假设必须包含证据。
- 每个原因假设必须包含置信度。
- 无充分证据时不得给出确定性根因结论。

### AC-A06 通知

- 用户可配置 Email 或 API 通知。
- 通知包含事件概览、原因假设、关键证据和分析链接。
- 数据不完整时必须在通知中提示。

### AC-A07 审计

- 保存告警接收时间。
- 保存数据查询记录。
- 保存 AI 分析版本。
- 保存通知发送状态。

---

# 9. P2：Automated Testing

## 9.1 模块目标

统一触发测试任务、获取测试结果、日志、截图和报告，使用 AI 辅助分析失败原因，并将测试证据提供给 Release Preparation。

## 9.2 实施策略

### 第一阶段

优先接入已有执行基础设施：

- Jenkins
- GitHub Actions
- GitLab CI
- Azure DevOps Pipeline
- 现有 Kubernetes Job

平台负责：

- 触发任务
- 查看状态
- 拉取日志
- 获取截图和报告
- AI 分析失败
- 同步 Release 证据
- 定时触发
- 通知用户

### 第二阶段

仅在现有 CI/CD 无法满足需求时考虑自建脚本执行能力，包括：

- Playwright
- Pytest
- 容器化执行
- Secret 管理
- 网络白名单
- CPU、内存和时间限制
- 文件系统隔离
- 镜像扫描
- 并发和配额控制

---

## 9.3 用户故事

- 用户可以查看测试任务清单。
- 用户可以手动触发测试。
- 用户可以配置定时任务。
- 用户可以查看执行状态。
- 用户可以查看日志、截图和附件。
- AI 可以总结失败原因。
- 用户可以将结果关联到 Release。
- 用户可以将结果同步到 Jira 或 Confluence。
- 用户可以配置失败、恢复和状态变化通知。

---

## 9.4 测试与健康检查统一模型

测试执行和健康检查不作为两套独立执行系统。

统一任务模型包括：

- 执行内容
- 执行环境
- 触发方式
- 参数
- 超时时间
- 重试策略
- 结果处理方式
- 通知策略
- Jira / Confluence 同步规则

触发方式包括：

- 手动
- 定时
- API
- Webhook
- PR 合并
- Release 前
- 告警后

---

# 10. P3：Requirement Analysis

## 10.1 模块目标

用户输入文字或链接，选择业务领域，系统读取相关业务知识并进行需求分析，输出问题清单、User Story、Task 和验收标准，并在用户确认后创建 Jira 和同步 Confluence。

## 10.2 后续范围

- 文本输入
- 超链接输入
- 业务领域选择
- 业务知识检索
- 需求完整性分析
- 未决问题识别
- User Story
- Task
- 验收标准
- 风险
- 依赖
- 用户编辑
- 局部 AI 润色
- Jira 创建
- Confluence 同步

---

# 11. 配置中心

## 11.1 Integration

配置第三方系统连接：

- Jira
- Confluence
- GitHub / GitLab
- CI/CD
- 日志平台
- 告警平台
- Email
- Slack / Teams
- API Endpoint

## 11.2 Credential

要求：

- 凭证加密存储
- 支持 Token 或 OAuth
- 区分用户级和团队级凭证
- 支持测试连接
- 支持凭证过期提示
- 支持凭证轮换
- 凭证内容不得展示给无权限用户

## 11.3 Mapping

支持：

- Workspace 与 Jira Project 映射
- Workspace 与 Confluence Space 映射
- 服务与代码仓库映射
- 服务与日志来源映射
- 服务与部署来源映射
- Release 与 Jira Version 映射
- 告警类型与日志查询模板映射

## 11.4 Policy

支持：

- 哪些用户可以读取数据
- 哪些用户可以创建或更新 Confluence
- 哪些用户可以触发测试
- 哪些用户可以查看生产日志
- 哪些写操作必须人工确认
- 哪些通知可以自动发送

## 11.5 Audit

记录：

- 谁配置了连接
- 谁修改了模板
- 谁运行了任务
- 谁批准了外部写操作
- 写入了哪些内容
- 查询了哪些生产数据
- AI 使用了哪些来源

---

# 12. 权限模型

建议采用 Workspace 级 RBAC。

## 12.1 角色

### Admin

- 管理 Workspace
- 管理连接器和凭证
- 管理权限和模板
- 查看全部审计记录

### Maintainer

- 管理服务、Release 和 Runbook
- 创建分析任务
- 确认第三方写操作

### Operator

- 运行 Release Preparation
- 运行 Alert Analyzer
- 触发测试
- 查看授权数据

### Viewer

- 查看报告、任务和结果
- 不允许执行写操作

## 12.2 资源权限

权限应至少覆盖：

- Workspace
- Service
- Release
- Alert
- Incident
- Test Job
- Integration
- Credential
- Template
- Audit Log

---

# 13. 核心数据模型

## 13.1 Workspace

- id
- name
- description
- owner
- members
- settings

## 13.2 Service

- id
- workspace_id
- name
- system
- team
- owners
- environments
- regions
- dependencies
- repository
- log_source
- deployment_source
- runbooks

## 13.3 Release

- id
- workspace_id
- name
- version
- environment
- planned_time
- owner
- jira_version
- issues
- changes
- test_evidence
- risks
- readiness_status
- confluence_page
- created_at
- updated_at

## 13.4 Change

- id
- release_id
- source_type
- source_id
- category
- description
- service
- risk_level
- evidence

## 13.5 TestRun

- id
- workspace_id
- job_id
- release_id
- trigger_type
- environment
- status
- started_at
- ended_at
- logs
- screenshots
- attachments
- ai_analysis

## 13.6 Alert

- id
- workspace_id
- external_alert_id
- source
- alert_type
- severity
- environment
- system
- service
- region
- start_time
- status
- raw_payload

## 13.7 IncidentAnalysis

- id
- alert_id
- evidence
- hypotheses
- impact
- next_steps
- missing_information
- model_info
- created_at

## 13.8 Evidence

- id
- source_type
- source_system
- source_reference
- retrieved_at
- content
- content_hash
- access_scope

## 13.9 Integration

- id
- workspace_id
- type
- name
- endpoint
- credential_reference
- status
- created_by
- updated_at

---

# 14. AI 设计原则

## 14.1 Human-in-the-loop

所有第三方写操作必须经过人工确认，包括：

- 创建或更新 Confluence
- 创建或更新 Jira
- 发送正式 Release 通知
- 发送 Incident 通知
- 触发高成本测试任务

## 14.2 可追溯

AI 输出必须尽可能关联来源：

- Jira Issue
- PR
- Commit
- 测试结果
- 日志
- Release
- Runbook
- 历史 Incident
- 用户输入

## 14.3 区分事实与推断

系统必须明确区分：

- 已确认事实
- AI 推断
- 用户输入
- 当前缺失
- 无法访问
- 需要人工确认

## 14.4 AI 与确定性程序分工

AI 负责：

- 理解
- 分类
- 总结
- 推理
- 生成草稿
- 提出建议

确定性程序负责：

- 权限
- 规则
- 字段校验
- API 调用
- 调度
- 状态管理
- 重试
- 审计
- 去重
- 配额

## 14.5 模型失败降级

发生以下情况时，系统应提供降级结果：

- 模型不可用
- 数据源不可用
- 输入超长
- 分析超时
- 部分证据无法读取
- 输出格式不合法

降级结果至少包含：

- 已获取的原始信息
- 当前缺少的信息
- 失败原因
- 可重试操作

---

# 15. 非功能需求

## 15.1 安全

- 凭证加密存储
- 最小权限原则
- Workspace 数据隔离
- 生产日志访问控制
- 敏感字段脱敏
- API 鉴权
- 审计日志
- 防止 SSRF
- 限制链接访问范围
- 记录外部数据读取行为

## 15.2 隐私

日志和文档中可能包含：

- 用户信息
- Token
- Cookie
- 邮箱
- 手机号
- 支付信息
- 内部服务地址

发送给模型前应支持：

- 字段过滤
- 正则脱敏
- Secret 检测
- 访问范围控制
- 数据保留策略

## 15.3 性能

初始建议：

- 页面常规请求响应时间小于 3 秒
- Release 数据采集任务支持异步执行
- Alert Analyzer 在数据源正常时尽快生成初步结果
- 大型日志内容采用分段处理
- 任务状态可实时或准实时刷新

## 15.4 可用性

- 外部数据源失败不应导致整个任务不可查看
- 支持任务重试
- 支持部分结果展示
- 保存原始输入
- 支持幂等写入
- 防止重复创建 Confluence 页面
- 防止重复发送通知

## 15.5 可观测性

系统自身需要记录：

- API 成功率
- 连接器成功率
- 数据源延迟
- AI 调用成功率
- AI 延迟
- Token 消耗
- 任务失败率
- 通知发送状态
- 外部写入成功率

---

# 16. 通知设计

## 16.1 通知渠道

首期：

- Email
- API Callback

后续：

- Slack
- Microsoft Teams
- Jira Comment
- Confluence Update

## 16.2 通知策略

支持：

- 只在失败时通知
- 只在状态变化时通知
- 连续失败多次后通知
- 恢复正常时通知
- 按严重级别通知
- 同类告警合并
- 静默时间
- 去重窗口
- 通知升级

---

# 17. 产品导航建议

## 17.1 第一阶段

### Release

- Releases
- Create Release Report
- Release Readiness
- Templates

### Settings

- Integrations
- Workspace
- Credentials
- Permissions
- Audit Logs

## 17.2 第二阶段新增

### Incidents

- Alerts
- Analyses
- Services
- Runbooks
- Incident History

## 17.3 第三阶段新增

### Automations

- Test Jobs
- Runs
- Schedules
- Test Reports

## 17.4 第四阶段新增

### Requirements

- Requirement Analysis
- Drafts
- Jira Tasks
- Documents

---

# 18. 指标体系

## 18.1 Release Preparation

- Release 文档准备平均耗时
- 自动填充比例
- AI 内容采用率
- 用户修改比例
- 平均修改幅度
- 发布前发现缺失项数量
- Confluence 同步成功率
- Release 文档实际采用率
- 每次 Release 减少的人工步骤

## 18.2 Alert Analyzer

- 从收到告警到生成初步分析的时间
- Top 3 原因包含真实根因的比例
- 推荐排查步骤有效率
- 相似 Incident 命中率
- 用户采纳率
- 无依据结论比例
- 平均故障定位时间降低比例
- 重复告警识别率
- 通知成功率

## 18.3 Automated Testing

- 测试触发成功率
- 运行成功率
- 平均执行时间
- 日志和附件获取成功率
- AI 失败分析采用率
- Flaky Test 识别准确率
- 测试证据关联 Release 的比例
- 通知噪音率

## 18.4 平台指标

- 日活用户
- 周活 Workspace
- 任务运行量
- 连接器成功率
- AI 调用成功率
- 外部写入失败率
- 权限拒绝次数
- 审计覆盖率

---

# 19. 版本路线图

## Phase 0：基础能力

目标：支撑 Release Preparation MVP。

范围：

- Workspace
- 用户与角色
- Jira 连接器
- Confluence 连接器
- 凭证管理
- 模板管理
- 任务状态
- AI 调用层
- 来源引用
- 审计日志

## Phase 1：Release Preparation MVP

范围：

- Jira Version / Issue 读取
- 测试结果手动录入
- Release Readiness Report
- 缺失项检查
- Release 文档生成
- 用户修改与确认
- Confluence 创建或更新
- 来源和审计

阶段完成标准：

> 团队能够使用系统完成一次真实 Release 的材料准备和 Confluence 发布。

## Phase 2：Alert Analyzer MVP

范围：

- 固定告警类型
- 少数核心服务
- 一个日志平台
- 最近部署关联
- 历史 Incident
- Runbook
- 原因假设
- Email / API 通知
- 证据和审计

阶段完成标准：

> 在目标服务和告警类型下，系统能够明显减少人工搜集信息和初步排查时间。

## Phase 3：Automated Testing

范围：

- 接入现有 CI/CD
- 手动和定时触发
- 日志、截图、报告
- AI 失败分析
- Release 证据关联
- 通知策略

阶段完成标准：

> 自动化测试结果能够稳定进入 Release Readiness 流程。

## Phase 4：Requirement Analysis

范围：

- 文本和链接输入
- 业务领域
- 知识库
- 需求缺口
- User Story
- Task
- 验收标准
- Jira 创建
- Confluence 同步

---

# 20. 主要风险

## 20.1 范围膨胀

风险：

- Release、告警、测试和需求模块均可独立发展为大型平台。

应对：

- 严格按照 P0、P1、P2、P3 推进。
- 每阶段限定目标系统、服务和场景。
- 不提前建设通用低代码平台。

## 20.2 AI 幻觉

风险：

- AI 将推测描述为事实。
- AI 生成无依据风险。
- AI 错误归因生产问题。

应对：

- 强制来源引用。
- 明确事实、推断和缺失。
- 原因假设必须包含支持证据和反向证据。
- 高风险结论必须人工确认。

## 20.3 权限和敏感数据

风险：

- 用户越权访问生产日志。
- Token 或用户隐私被发送给模型。

应对：

- Workspace RBAC。
- Secret 检测。
- 日志脱敏。
- 最小权限。
- 完整审计。

## 20.4 第三方连接器不稳定

风险：

- Jira、Confluence、日志或 CI/CD 不可用。
- API 限流。
- 字段和权限差异。

应对：

- 连接状态检测。
- 重试和退避。
- 缓存部分结果。
- 显示数据缺失。
- 支持字段映射。

## 20.5 任意代码执行

风险：

- 上传脚本在平台执行带来严重安全问题。

应对：

- 第一阶段仅接入现有 CI/CD。
- 后续自建执行必须使用隔离环境、网络白名单、资源限制和 Secret Vault。

## 20.6 通知噪音

风险：

- 健康检查和告警分析频繁通知，导致用户忽略。

应对：

- 去重。
- 合并。
- 状态变化通知。
- 静默时间。
- 严重级别。
- 升级策略。

---

# 21. 待确认问题

以下问题需在进入详细设计前进一步确认。

## Release Preparation

1. 当前主要使用 Jira Cloud 还是 Jira Data Center？
2. Confluence 是 Cloud 还是 Data Center？
3. Release 当前通过 Jira Fix Version、Epic、Label 还是其他方式组织？
4. Release 文档是否已有固定模板？
5. 测试结果当前来自哪些系统？
6. 是否需要接入 GitHub、GitLab 或 Bitbucket？
7. Confluence 更新是创建新页面还是更新固定页面？
8. 是否需要支持一个 Release 涉及多个服务和多个团队？
9. Release Ready 的规则由谁维护？
10. 是否需要审批流？

## Alert Analyzer

1. 当前告警来源是什么？
2. 当前日志平台是什么？
3. 是否有统一 Service Catalog？
4. 部署记录来自哪个系统？
5. 历史 Incident 存储在哪里？
6. Runbook 是否结构化？
7. 首批支持哪些服务？
8. 首批支持哪些告警类型？
9. Email 通知接收人如何确定？
10. 是否需要与现有 Incident Management 平台集成？

## Automated Testing

1. 当前主要使用 Jenkins、GitHub Actions、GitLab CI 还是其他系统？
2. Playwright 和 Pytest 脚本目前在哪里运行？
3. 是否已有统一测试报告格式？
4. 截图、Trace 和日志当前存在哪里？
5. 测试需要访问哪些内部环境？
6. 定时健康检查的通知策略是什么？

---

# 22. 最终产品方向

产品演进顺序确定为：

1. **Release Preparation**
2. **Alert Analyzer**
3. **Automated Testing**
4. **Requirement Analysis**

整体演进逻辑：

> 发布前提高准备效率  
> → 生产中提高故障定位效率  
> → 用自动化测试增强发布证据  
> → 最后向需求阶段延伸

第一阶段应优先确保：

- 能够解决真实 Release 场景
- 能够连接现有 Jira 和 Confluence
- 能够生成有来源的 Release Readiness Report
- 用户能够修改和确认
- 第三方写操作可预览、可审计
- 底层能力可以被后续 Alert Analyzer 和 Automated Testing 复用

---

# 23. 附录：首版推荐范围摘要

## 首版必须实现

- Workspace
- 用户与角色
- Jira 配置
- Confluence 配置
- 凭证安全存储
- Release 创建
- Jira Version / Issues 读取
- 测试结果手动录入
- Release Readiness
- 缺失项检查
- Release 文档生成
- 局部 AI 润色
- 用户确认
- Confluence 同步
- 来源引用
- 审计日志

## 首版暂不实现

- Alert Analyzer
- 自动化测试执行
- 需求分析
- 自动部署
- 自动回滚
- 任意脚本执行
- 通用工作流设计器
- 多租户商业化能力

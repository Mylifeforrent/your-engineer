# 企业内部研发运维“最后一公里”效率助手 PRD

> 文档版本：V0.2  
> 文档状态：需求收敛版  
> 产品阶段：内部小团队 MVP  
> 目标规模：20 人以内固定团队  
> 主要用户：Release Owner、开发、QA、SRE / On-call、团队负责人  
> 最后更新：2026-07-24

---

## 1. 文档目的

本文档用于明确企业内部研发运维效率助手的产品定位、范围边界、核心场景、功能需求、验收标准和实施路线。

V0.2 基于前期需求讨论、竞品调研以及企业现有工具环境进行收敛，重点回答以下问题：

1. 本产品具体解决什么问题？
2. 本产品与 Jira、Confluence、Jenkins、Ansible、xMatters、Elasticsearch、Prometheus 等现有平台是什么关系？
3. 首期应该做哪些功能，哪些功能明确不做？
4. Release Preparation 和生产告警处理应如何形成轻量、可落地的工作流？
5. AI 应在哪些环节参与，哪些环节必须由确定性程序或人工完成？

---

# 2. 产品概述

## 2.1 暂定名称

中文暂定名称：

**企业内部研发运维“最后一公里”效率助手**

英文暂定名称：

**Engineering Last-Mile Assistant**

产品名称后续可以调整，但产品定位应保持稳定。

## 2.2 产品定位

本产品是一套面向 20 人以内内部研发运维团队的轻量级效率工具。

产品不替代企业已有的研发、交付、自动化和可观测性平台，而是连接这些已有平台，自动完成跨系统信息收集、标准检查、内容汇总和结果录入，解决日常工作中重复查询、人工核对、复制粘贴和多系统跳转的“最后一公里”问题。

一句话定义：

> **连接现有企业系统，把分散信息自动汇总、检查和整理，并辅助用户完成 Release Preparation、Change Request 和生产告警初步排查。**

## 2.3 核心价值

产品核心价值不是建设一个新的通用平台，而是：

- 减少用户在不同系统之间频繁切换
- 减少重复查询和复制粘贴
- 自动按照企业内部标准检查完整性
- 将已有数据整理成可提交的文档或表单
- 将告警、日志、指标和最近变更集中到一个页面
- 用 AI 辅助总结、解释和提出原因假设
- 保留人工确认，避免自动执行高风险操作

## 2.4 产品原则

### 原系统仍是 Source of Truth

Jira、Jenkins、Ansible、Elasticsearch、Prometheus、Confluence、xMatters 和 Change Request 系统仍然是各自数据的权威来源。

本产品只保存：

- 外部对象 ID
- 原始系统链接
- 查询时间
- 必要摘要
- 用户确认后的内容
- Release 决策时的轻量证据快照
- 本系统运行和操作日志

本产品不长期复制完整日志、完整指标或完整流水线数据。

### 集成为主，自研为辅

优先调用现有系统的 API、Webhook、查询接口和深链接。

不重复建设：

- CI/CD 平台
- 自动化部署平台
- 日志平台
- 指标平台
- 告警路由平台
- On-call 平台
- 通用 Incident Management 平台
- 通用 Release Orchestration 平台

### 固定场景优先，不建设通用工作流平台

首期只围绕两个固定场景：

1. Release Preparation & Change Request
2. Alert Triage

通过模板、映射和查询配置适配内部差异，不提供通用低代码工作流设计器。

### 确定性规则优先于 AI

可明确判断的问题使用规则，例如：

- Jenkins Build 是否成功
- 必填字段是否填写
- 测试结果是否存在
- Jira Issue 是否关闭
- 是否存在回滚方案
- Change Request 必填字段是否齐全

AI 负责：

- 信息归类
- 摘要
- 风险解释
- 文档草稿
- 告警原因假设
- 下一步排查建议

### Human-in-the-loop

所有外部写操作和高风险操作都必须由用户确认。

---

# 3. 背景与现状

## 3.1 企业现有工具环境

当前企业内部已经具备或计划使用以下能力：

| 类别 | 现有系统或平台 | 本产品的使用方式 |
|---|---|---|
| 工作项管理 | Jira | 读取 Issue、Version、状态和发布范围 |
| 文档管理 | Confluence | 读取模板、创建或更新 Release 文档 |
| CI/CD | Jenkins | 读取 Job、Build、测试结果和制品；后续可触发已有 Job |
| 自动化执行 | Ansible / 企业 Ansible 平台 | 读取部署或自动化 Job 状态；后续按需触发已有模板 |
| 告警 | xMatters | 接收 Webhook、API 或告警邮件 |
| 日志 | Elasticsearch | 按预配置条件查询告警相关日志 |
| 指标 | Prometheus | 按预配置 PromQL 查询相关指标 |
| Change 管理 | 企业现有 Change Request 系统 | 根据确认后的 Release 信息创建 Change Request |
| 通知 | Email / 企业内部接口 | 发送 Release 或告警分析结果 |
| 本系统日志 | 本产品自身 | 记录运行、连接器、错误和用户操作 |

## 3.2 Release Preparation 当前问题

Production Release Preparation 通常需要：

1. 确认 Release 范围。
2. 查询 Jira 中的需求、缺陷和任务。
3. 检查 Jenkins Build、测试和制品。
4. 查询 Ansible 或部署执行信息。
5. 检查企业要求的 Release Checklist。
6. 查找回滚方案、验证步骤和相关文档。
7. 将所有信息整理到 Release Preparation 文档。
8. 再将同样的信息填写到 Change Request 系统。
9. 补充 Change 系统所需字段并提交。

主要痛点：

- 信息分散在多个系统
- 相同信息需要重复查询和填写
- 企业标准较多，容易遗漏
- 文档和 Change Request 字段映射依赖人工经验
- 完成一次 Release Preparation 耗时较长
- 无法快速说明当时基于哪些证据提交了 Change

## 3.3 生产告警处理当前问题

当前典型流程：

1. xMatters 发送告警或告警邮件。
2. 用户阅读告警内容。
3. 判断告警级别、环境、系统和服务。
4. 打开 Elasticsearch 查询日志。
5. 打开 Prometheus 查看指标。
6. 检查最近 Jenkins Build、Ansible Job 或 Release。
7. 查找 Runbook 或历史处理经验。
8. 形成初步判断并通知相关人员。

主要痛点：

- 告警、日志、指标和变更信息分散
- 每次都要重复执行相似查询
- 需要记住不同系统的查询方式
- 告警与最近 Release / Deployment 缺少直接关联
- 初步分析依赖熟悉系统的人员
- 原始证据和分析结果未统一保存
- 用户需要频繁在多个页面之间跳转

## 3.4 自动化测试当前问题

团队已有 Jenkins 和测试脚本能力，产品不需要自建测试执行平台。

真正需要解决的是：

- 统一查看已有 Jenkins Job 和运行结果
- 快速获取 Console Log、测试报告和截图
- 将测试结果关联到 Release Preparation
- 使用 AI 辅助总结测试失败
- 后续可从本工具触发已有 Jenkins Job

---

# 4. 产品目标与非目标

## 4.1 业务目标

### Release 场景

- 减少 Release Preparation 信息收集时间
- 减少重复填写
- 提高企业标准检查的一致性
- 降低遗漏必填项和关键证据的概率
- 一次生成 Release 文档和 Change Request 草稿

### Alert 场景

- 减少从告警到获得完整上下文的时间
- 自动执行常用日志和指标查询
- 快速关联最近 Build、Deployment 和 Release
- 提供有证据支持的初步原因假设
- 让用户可以快速回到原系统继续深挖

## 4.2 产品目标

首期产品需要提供：

1. 系统与服务映射配置
2. Jira、Confluence、Jenkins、Ansible、xMatters、Elasticsearch、Prometheus 和 Change 系统连接
3. Release Preparation & Change Request Assistant
4. Alert Triage Assistant
5. 简单规则检查
6. 模板和字段映射
7. AI 摘要、文档草稿和原因假设
8. 外部系统深链接
9. 本产品运行日志和基本操作记录

## 4.3 非目标

首期明确不建设：

- 多租户
- 多 Workspace
- 复杂 RBAC
- 通用工作流设计器
- 完整 Release Orchestration
- 自动部署
- 自动回滚
- 自动修复生产问题
- On-call 排班
- 告警路由和升级策略
- 完整 Incident Command Center
- 日志存储和索引
- Metrics / Trace 平台
- 自建 CI/CD
- 任意用户脚本执行环境
- 通用企业 Service Catalog
- 商业化计费和外部客户能力

---

# 5. 用户与权限

## 5.1 用户范围

产品面向固定内部团队，预计活跃用户不超过 20 人。

主要角色：

- Release Owner
- 开发工程师
- QA
- SRE / On-call
- 团队负责人
- 系统管理员

## 5.2 轻量权限模型

首期只保留两个角色。

### Administrator

- 配置连接器
- 管理系统映射
- 管理 Release 模板
- 管理规则
- 管理 Change Request 字段映射
- 查看本系统运行日志

### User

- 创建和编辑 Release Case
- 执行 Release 信息收集
- 查看和确认 Release 文档
- 创建 Change Request
- 查看 Alert Case
- 运行告警数据收集
- 填写最终原因和处理结果

## 5.3 权限原则

- 登录优先复用企业 SSO 或内部认证。
- 不在本产品内建设复杂资源级权限。
- 对生产日志、Jira、Jenkins、Ansible 等数据的访问，优先使用受控的服务账号或企业集成账号。
- 所有外部写操作必须记录操作用户。
- Token、密码和 Secret 不得以明文保存或展示。

---

# 6. 产品总体结构

```text
企业现有系统
Jira / Confluence / Jenkins / Ansible
xMatters / Elasticsearch / Prometheus / Change System
                         ↓
                   Connector Layer
                         ↓
        Mapping / Query Template / Rule Check
                         ↓
              AI Summary and Assistance
                         ↓
     Release Workbench / Alert Triage Workbench
                         ↓
Confluence / Change Request / Email / Deep Links
```

产品由以下轻量模块组成：

1. Release Workbench
2. Alert Triage Workbench
3. Jenkins Job Assistant（后续）
4. Configuration
5. Run Logs

---

# 7. P0-A：Release Preparation & Change Request Assistant

## 7.1 模块目标

根据用户选择的系统、环境、版本和 Release 类型，自动从现有系统收集信息，按照企业标准检查完整性，生成 Release Preparation 文档草稿，并在用户确认后创建或更新 Confluence 页面及 Change Request。

## 7.2 核心价值

> 一次收集，多处复用；自动检查，人工确认；减少跨系统查询和重复填写。

## 7.3 用户故事

### US-R01 创建 Release Case

作为 Release Owner，我希望创建一个 Release Case，并选择系统、环境、版本和 Release 类型，以加载正确的模板和检查规则。

### US-R02 自动收集 Release 信息

作为 Release Owner，我希望系统从 Jira、Jenkins、Ansible 和 Confluence 自动收集信息，以减少人工查询。

### US-R03 执行标准检查

作为 Release Owner，我希望系统按照企业标准检查必填项、Build、测试、回滚和验证信息，以避免遗漏。

### US-R04 生成 Release Preparation 文档

作为 Release Owner，我希望系统基于收集结果和模板生成文档草稿。

### US-R05 人工补充与确认

作为 Release Owner，我希望编辑系统生成的内容，并使用 AI 进行局部润色。

### US-R06 创建 Confluence 页面

作为 Release Owner，我希望将确认内容创建或更新到指定 Confluence 页面。

### US-R07 创建 Change Request

作为 Release Owner，我希望系统将已确认信息映射成 Change Request 草稿，并在我确认后提交到目标系统。

### US-R08 查看原始证据

作为用户，我希望每项关键信息都能跳转到 Jira、Jenkins、Ansible 或其他原始系统。

---

## 7.4 主流程

```text
创建 Release Case
        ↓
选择系统、环境、版本、Release 类型
        ↓
加载 Release 模板、Checklist 和字段映射
        ↓
读取 Jira Issue / Version
        ↓
读取 Jenkins Build、测试结果、制品信息
        ↓
读取 Ansible Job / Deployment 信息
        ↓
读取已有 Confluence 资料
        ↓
执行 Release Checklist
        ↓
AI 生成 Release Preparation 草稿
        ↓
用户补充、编辑和确认
        ↓
创建或更新 Confluence 页面
        ↓
生成 Change Request 草稿
        ↓
用户预览并确认
        ↓
创建 Change Request
        ↓
保存轻量 Evidence Snapshot
```

---

## 7.5 Release Case 输入

### 必填输入

- 系统
- 服务或应用
- 环境
- Release 类型
- 版本或 Release 名称
- Release Owner
- 计划发布时间
- Jira Version 或 Issue 列表

### 可选输入

- Jenkins Job / Build
- Ansible Job
- 测试结果
- 回滚计划
- 发布后验证步骤
- 已知问题
- 风险说明
- 补充文档链接
- Change Request 类型

---

## 7.6 数据收集

### Jira

首期读取：

- Issue Key
- Summary
- Description
- Type
- Priority
- Status
- Assignee
- Fix Version
- Labels
- 原始链接

### Jenkins

首期读取：

- Job 名称
- Build Number
- Build 状态
- Branch
- 参数
- 开始和结束时间
- Console Log 链接
- 测试报告摘要
- 制品链接
- 原始 Build 链接

### Ansible

根据企业实际平台能力读取：

- Job / Job Template
- Inventory / Environment
- Job 状态
- 开始和结束时间
- 执行用户
- Extra Variables 摘要
- 运行日志链接
- 原始 Job 链接

首期不要求从本产品触发 Ansible 执行。

### Confluence

首期读取：

- Release 模板
- 历史 Release 文档
- 回滚或验证文档链接
- 目标 Space 和父页面

---

## 7.7 Release Checklist

首期使用固定规则或简单配置，不建设通用规则引擎。

每条规则包含：

- 规则名称
- 适用 Release 类型
- 严重程度
- 是否阻断
- 检查方式
- 检查结果
- 说明
- 原始证据链接
- 是否允许人工覆盖
- 覆盖原因

### 示例规则

| 规则 | 检查方式 | 严重程度 |
|---|---|---|
| Production Build 必须成功 | Jenkins Build Status | Blocking |
| 必须存在测试结果 | Jenkins / 用户上传 | Blocking |
| 必须填写回滚计划 | Release Form | Blocking |
| 必须填写发布后验证 | Release Form | Blocking |
| 关键 Jira Issue 必须关闭 | Jira Status | Warning / Blocking |
| 必须指定 Release Owner | Release Form | Blocking |
| 数据库变更必须有回滚说明 | Release Form | Blocking |
| Ansible Job 必须成功 | Ansible Job Status | 根据 Release 类型配置 |

## 7.8 AI 能力

AI 负责：

- 汇总 Release 内容
- 将 Jira Issue 按功能和类型分类
- 生成 Release Summary
- 总结 Build 和测试结果
- 解释 Checklist 风险
- 生成已知问题摘要
- 生成回滚说明草稿
- 生成发布后验证草稿
- 按模板生成 Release Preparation 文档
- 将确认内容转换为 Change Request 描述
- 局部润色用户选中的文本

AI 不负责：

- 判断是否最终允许发布
- 自动覆盖失败规则
- 自动提交 Change Request
- 自动执行部署
- 自动执行回滚
- 虚构缺失的测试或回滚信息

---

## 7.9 Release Preparation 输出

### 页面输出

- Release 基本信息
- Jira 变更列表
- Jenkins Build 与测试
- Ansible / Deployment 信息
- Checklist 状态
- 缺失信息
- 风险和警告
- Release Preparation 文档预览
- Change Request 草稿
- 原始系统链接

### Confluence 输出

至少包含：

1. Release 概览
2. Release 范围
3. 变更内容
4. Build 和制品
5. 测试结果
6. 风险与已知问题
7. 发布步骤
8. 回滚方案
9. 发布后验证
10. 联系人
11. Change Request 链接

### Change Request 输出

具体字段由企业 Change 系统决定，建议至少支持：

- Short Description
- Detailed Description
- Business Reason
- Affected System
- Environment
- Planned Start / End Time
- Implementation Plan
- Test Evidence
- Risk
- Rollback Plan
- Validation Plan
- Related Jira
- Related Confluence
- Owner

---

## 7.10 Evidence Snapshot

在创建 Change Request 时保存一份轻量快照，包括：

- Release Case ID
- 快照时间
- Jira Issue 列表及状态
- Jenkins Build Number 和状态
- 测试结果摘要
- Ansible Job 和状态
- Checklist 结果
- 用户确认内容版本
- Confluence 页面链接
- Change Request ID 和链接
- 关键外部对象链接

本产品不保存完整 Jenkins Console Log、完整 Elasticsearch 日志或完整 Prometheus 数据。

---

## 7.11 验收标准

### AC-R01 Release Case 创建

- 用户能够选择系统、环境和 Release 类型。
- 系统能够加载对应模板和 Checklist。
- 缺少必要配置时显示明确提示。

### AC-R02 数据收集

- 系统能够读取配置范围内的 Jira 信息。
- 系统能够读取指定 Jenkins Job / Build 状态。
- 系统能够读取可用的 Ansible Job 信息。
- 单个数据源失败时，其他结果仍可展示。
- 每项结果提供原始系统链接。

### AC-R03 Checklist

- 系统能够执行配置的固定规则。
- Blocking 和 Warning 有明显区分。
- 用户可以看到检查依据。
- 允许覆盖的规则必须填写覆盖原因。

### AC-R04 文档生成

- 系统能够按模板生成 Release Preparation 草稿。
- AI 不得将缺失信息生成成已确认事实。
- 用户能够编辑内容并局部润色。
- 文档能够创建或更新到 Confluence。

### AC-R05 Change Request

- 系统能够根据字段映射生成草稿。
- 提交前必须预览。
- 用户确认后才能创建。
- 创建成功后保存 ID 和链接。
- 重复提交时给出提示。

### AC-R06 Evidence

- Change Request 创建时生成快照。
- 快照能够追溯到外部来源。
- 用户可以查看创建 Change 时的关键状态。

---

# 8. P0-B：Alert Triage Assistant

## 8.1 模块名称调整

V0.1 使用 “Alert Analyzer”。

V0.2 建议改为：

**Alert Triage Assistant**

原因：

- 首版重点是信息聚合和初步排查
- 不承诺自动完成 Root Cause Analysis
- 更符合只读、辅助和人工确认的边界

## 8.2 模块目标

接收 xMatters 告警，自动识别系统、服务、环境和严重等级，调用预配置的 Elasticsearch 与 Prometheus 查询，关联最近 Jenkins Build、Ansible Job、Release 和 Change，统一展示原始证据，并使用 AI 生成事件摘要、原因假设和下一步建议。

## 8.3 用户故事

### US-A01 接收告警

作为 On-call 用户，我希望系统从 xMatters Webhook、API 或邮件接收告警。

### US-A02 识别系统

作为 On-call 用户，我希望系统自动识别告警涉及的系统、服务、环境和严重级别。

### US-A03 查询日志

作为 On-call 用户，我希望系统自动执行对应 Elasticsearch 查询。

### US-A04 查询指标

作为 On-call 用户，我希望系统自动执行对应 Prometheus 查询。

### US-A05 关联最近变更

作为 On-call 用户，我希望系统展示告警前最近的 Jenkins Build、Ansible Job、Release 和 Change Request。

### US-A06 AI 初步分析

作为 On-call 用户，我希望系统根据收集的信息给出摘要、最多三个原因假设和建议检查步骤。

### US-A07 查看原始系统

作为用户，我希望从分析页面直接打开 xMatters、Elasticsearch、Prometheus、Jenkins、Ansible、Jira 和 Change Request。

### US-A08 记录最终结果

作为用户，我希望记录最终原因、实际处理动作和分析是否有帮助。

---

## 8.4 告警接收方式

优先顺序：

1. xMatters Webhook / HTTP Integration
2. xMatters API
3. 告警 Email 解析

邮件解析作为兼容方式，不作为长期唯一入口。

告警至少保存：

- External Alert ID
- 告警标题
- 告警正文
- 告警等级
- 系统
- 服务
- 环境
- Region（如果存在）
- 开始时间
- 当前状态
- 告警来源
- 原始告警链接
- 原始 Payload 或 Email Reference

---

## 8.5 系统映射与查询模板

每个系统或服务可以配置以下内容。

### 基本映射

- 系统名称
- 服务名称
- 环境
- 负责人
- Jira Project
- Runbook URL
- Confluence 页面
- 默认通知目标

### Elasticsearch 查询配置

- Elasticsearch 连接
- Index Pattern
- 时间字段
- Service 字段
- Environment 字段
- Severity 字段
- Trace / Request ID 字段
- 默认查询窗口
- 关键词模板
- 查询结果数量限制
- 深链接模板

### Prometheus 查询配置

- Prometheus 连接
- 错误率 PromQL
- 延迟 PromQL
- 请求量 PromQL
- CPU / 内存 PromQL
- 业务指标 PromQL
- 默认查询窗口
- Dashboard 深链接

### Jenkins 映射

- 相关 Job
- Branch
- Service 参数
- Build 深链接
- 查询最近 Build 的时间窗口

### Ansible 映射

- Job Template 或 Job 类型
- Environment
- 查询最近执行的时间窗口
- Job 深链接

---

## 8.6 主流程

```text
接收 xMatters 告警
        ↓
解析告警字段
        ↓
匹配 SystemMapping
        ↓
查询 Elasticsearch 日志
        ↓
查询 Prometheus 指标
        ↓
查询最近 Jenkins Build
        ↓
查询最近 Ansible Job
        ↓
查询最近 Release / Change Request
        ↓
加载 Runbook 和历史处理说明
        ↓
统一展示原始证据和深链接
        ↓
AI 生成摘要、原因假设和下一步建议
        ↓
用户继续排查并填写最终结果
```

---

## 8.7 Alert Triage 输出

### 事件概览

- 告警标题
- 告警等级
- 系统
- 服务
- 环境
- 开始时间
- 当前状态
- 负责人

### 日志摘要

- Elasticsearch 查询条件
- 查询时间范围
- 错误数量
- 主要错误类型
- 关键日志片段摘要
- 原始查询链接

### 指标摘要

- 错误率
- 延迟
- 请求量
- CPU / 内存
- 业务指标
- 异常时间点
- Prometheus 或 Dashboard 链接

### 最近变更

- Jenkins Build
- Ansible Job
- 最近 Release
- Change Request
- 版本
- 执行时间
- 状态
- 原始链接

### AI 原因假设

最多三个，每个假设包含：

- 假设名称
- 支持证据
- 反向证据或不确定信息
- 置信度
- 建议验证方式

### 下一步建议

- 建议查询内容
- 建议检查指标
- 建议查看最近变更
- 建议联系负责人
- 建议参考 Runbook
- 是否建议人工评估回滚

### 信息缺口

- 未能识别系统
- Elasticsearch 查询失败
- Prometheus 查询失败
- 无最近 Build
- 无 Deployment 信息
- 无 Runbook
- 数据不足以形成明确假设

---

## 8.8 AI 边界

AI 可以：

- 解析告警自然语言
- 汇总日志和指标
- 关联时间顺序
- 提出原因假设
- 生成下一步排查建议
- 总结 Runbook 和历史经验

AI 不可以：

- 自动宣布根因
- 自动关闭告警
- 自动重启
- 自动扩容
- 自动回滚
- 自动修改配置
- 自动运行生产 Ansible Job
- 隐藏数据缺失

---

## 8.9 用户反馈

每个 Alert Case 支持记录：

- 分析有帮助
- 部分有帮助
- 没有帮助
- 最终原因
- 实际处理动作
- 是否与最近 Release / Deployment 有关
- 补充备注

首期不建设复杂 AI Evaluation 平台，但保存这些反馈用于后续优化查询模板和 AI Prompt。

---

## 8.10 验收标准

### AC-A01 告警接收

- 系统能够通过至少一种 xMatters 接入方式创建 Alert Case。
- 保存原始告警引用。
- 相同 External Alert ID 不应重复创建。

### AC-A02 映射

- 系统能够根据告警字段匹配服务配置。
- 无法匹配时允许用户手动选择。
- 用户可看到匹配依据。

### AC-A03 日志与指标查询

- 系统能够执行预配置 Elasticsearch 查询。
- 系统能够执行预配置 Prometheus 查询。
- 查询失败时展示错误，不阻断其他数据源。
- 查询结果提供原始系统深链接。

### AC-A04 最近变更

- 系统能够查询指定时间窗口内的 Jenkins Build。
- 系统能够查询可用的 Ansible Job。
- 系统能够关联最近 Release 和 Change Request。
- 无数据时明确显示“未发现”，不能由 AI 补全。

### AC-A05 AI 分析

- AI 输出事件摘要。
- AI 最多输出三个原因假设。
- 每个假设必须引用已收集证据。
- 数据不足时必须显示信息缺口。
- 不得输出自动生产操作。

### AC-A06 用户结果

- 用户可以填写最终原因和处理动作。
- 用户可以评价分析是否有帮助。
- 保存用户和更新时间。

---

# 9. P1：Jenkins Job Assistant

## 9.1 定位

不建设自动化测试执行平台，只连接和复用企业现有 Jenkins。

## 9.2 目标

- 查看已有 Job
- 触发已有 Job
- 传递预定义参数
- 查看 Build 状态
- 查看 Console Log
- 获取测试报告、截图和制品
- AI 总结失败
- 将测试结果关联到 Release Case

## 9.3 边界

- 不允许用户上传任意脚本到本平台执行
- 不负责构建执行环境
- 不负责 Jenkins Agent 管理
- 不长期保存完整 Console Log
- 不替代 Jenkins 权限

## 9.4 与 Release 的关系

Jenkins Job Assistant 的主要价值是为 Release Preparation 提供自动化测试和 Build 证据。

---

# 10. P2：Requirement Analysis

需求分析继续保留为后续方向。

后续可复用：

- Jira 连接
- Confluence 连接
- 模板
- AI 编辑
- SystemMapping
- 本系统运行日志

首期不进入开发范围。

---

# 11. Configuration

## 11.1 配置目标

配置中心只服务于两个固定工作流，不建设通用连接平台。

## 11.2 连接器配置

首期预计支持：

- Jira
- Confluence
- Jenkins
- Ansible
- xMatters
- Elasticsearch
- Prometheus
- Change Request System
- Email

每个连接器至少包括：

- 名称
- Endpoint
- 认证方式
- Secret Reference
- 连接状态
- 最后测试时间
- 测试连接操作

## 11.3 SystemMapping

SystemMapping 是首期核心配置对象。

建议字段：

- 系统名称
- 服务名称
- 环境
- Owner
- Jira Project
- Jira Version 规则
- Jenkins Job
- Ansible Job Template
- Elasticsearch Query Template
- Prometheus Query Template
- Runbook URL
- Confluence Space
- Release Template
- Change Request Type
- Change Field Mapping

## 11.4 Template

模板类型：

- Release Preparation 模板
- Checklist 模板
- Confluence 模板
- Change Request 字段模板
- Alert Summary 模板
- Email 模板

模板可以按：

- 系统
- 环境
- Release 类型

进行匹配。

---

# 12. 最小数据模型

## 12.1 SystemMapping

```text
id
system_name
service_name
environment
owner
jira_project
jenkins_job
ansible_mapping
elasticsearch_query_config
prometheus_query_config
runbook_url
confluence_config
change_request_config
enabled
```

## 12.2 ReleaseCase

```text
id
system_mapping_id
release_name
version
release_type
environment
planned_time
owner
jira_references
jenkins_references
ansible_references
checklist_results
ai_draft
confirmed_content
confluence_reference
change_request_reference
status
created_by
created_at
updated_at
```

## 12.3 AlertCase

```text
id
external_alert_id
source
raw_reference
system_mapping_id
severity
environment
started_at
status
log_summary
metric_summary
recent_changes
ai_summary
hypotheses
missing_information
final_cause
resolution_action
feedback
created_at
updated_at
```

## 12.4 EvidenceReference

```text
id
case_type
case_id
source_system
external_id
source_url
retrieved_at
summary
snapshot_data
```

## 12.5 TaskRun

```text
id
case_type
case_id
run_type
status
current_step
started_at
ended_at
error_code
error_message
```

## 12.6 Template

```text
id
template_type
name
system
environment
release_type
content
version
enabled
```

首期不需要单独设计：

- Workspace
- Phase
- Activity
- Alert Group
- Incident
- Investigation Session
- 复杂 Approval
- Policy
- 通用 Workflow

如后续出现明确需求，再从现有实体演进。

---

# 13. AI 设计

## 13.1 AI 使用场景

### Release

- Jira 变更归类
- Release Summary
- 测试结果摘要
- 风险解释
- 文档草稿
- Change Request 草稿
- 局部润色

### Alert

- 告警字段提取
- 日志摘要
- 指标摘要
- 最近变更说明
- 原因假设
- 下一步建议
- Runbook 摘要

## 13.2 输入控制

AI 仅接收：

- 用户有权查看的数据
- 查询结果摘要
- 经过限制的关键日志片段
- 必要指标结果
- Runbook 内容
- Release 和 Change 摘要

不默认发送：

- 完整日志索引
- 完整 Console Log
- Secret
- Token
- Cookie
- 用户隐私数据
- 无关生产数据

## 13.3 输出结构

AI 输出必须使用结构化格式，至少区分：

- 已确认事实
- AI 推断
- 信息缺口
- 用户需要确认
- 原始证据引用

## 13.4 降级

AI 不可用时：

- Release 仍应展示收集结果和 Checklist
- Alert 仍应展示日志、指标和最近变更
- 用户仍可手动完成后续操作
- 页面明确显示 AI 步骤失败

---

# 14. 本系统日志与可观测性

本产品自身日志是首期必要能力。

## 14.1 Application Log

记录：

- API 请求
- 页面异常
- 数据库异常
- 系统错误

## 14.2 Connector Log

记录：

- 连接器名称
- 操作类型
- 请求开始和结束时间
- 成功或失败
- 返回状态
- 重试次数
- 错误代码
- 脱敏后的错误信息

不得记录：

- 明文 Token
- 密码
- Secret
- 未脱敏的敏感请求正文

## 14.3 Task Run Log

每次 Release 收集和 Alert 分析使用唯一 `run_id`。

记录：

- 任务类型
- Case ID
- 执行步骤
- 当前状态
- 每步耗时
- 调用的数据源
- 失败步骤
- AI 调用状态
- 外部写入结果

## 14.4 Operation Log

记录：

- 操作用户
- 操作时间
- 编辑内容版本
- 确认操作
- Confluence 创建或更新
- Change Request 创建
- 最终结果

## 14.5 统一关联字段

日志统一包含：

- request_id
- run_id
- release_case_id 或 alert_case_id
- connector
- operation
- status
- duration_ms
- error_code

## 14.6 保留策略

首期可采用简单保留策略：

- 系统运行日志：按内部标准保留
- Connector Log：保留足够用于排错的周期
- Operation Log：长期保留关键写操作
- 不长期保存第三方完整日志内容

---

# 15. 非功能需求

## 15.1 安全

- Secret 加密存储或引用企业 Secret Manager
- 所有外部调用使用最小权限账号
- 外部写操作必须人工确认
- 敏感日志进入 AI 前脱敏
- 防止通过用户输入访问任意内网地址
- 限制 Connector 可访问的目标地址
- 不在前端展示 Secret

## 15.2 性能

- 普通页面操作目标响应时间小于 3 秒
- 多系统数据收集允许异步执行
- 用户可查看当前步骤和进度
- 单个连接器超时不阻断全部结果
- Elasticsearch 返回结果数量必须限制
- Prometheus 查询必须限制时间范围

## 15.3 可靠性

- Connector 失败可重试
- 外部写入使用幂等控制
- 防止重复创建 Change Request
- 防止重复更新 Confluence
- 任务失败后保留已成功收集的数据
- 外部系统不可用时展示明确状态

## 15.4 可维护性

- 连接器之间保持独立
- 查询模板可配置
- Release 模板可配置
- 规则可以简单增删
- AI Prompt 与业务代码分离
- 错误信息便于排查

---

# 16. 产品导航

首期建议导航保持简单。

## Release

- Release Cases
- Create Release
- Templates

## Alerts

- Alert Cases
- Alert Detail

## Configuration

- System Mappings
- Connectors
- Release Templates
- Checklist Rules
- Change Field Mapping

## Operations

- Task Runs
- System Logs

不提供复杂 Dashboard、组织管理或权限管理页面。

---

# 17. 核心指标

## 17.1 Release

- 单次 Release Preparation 平均耗时
- 自动收集字段比例
- Checklist 自动检查比例
- 文档自动填充比例
- 用户修改幅度
- Change Request 创建成功率
- 每次 Release 减少的跨系统操作次数
- 缺失项发现数量

## 17.2 Alert

- 从告警接收到完成数据聚合的时间
- 自动识别系统成功率
- Elasticsearch 查询成功率
- Prometheus 查询成功率
- 最近变更关联成功率
- 用户认为分析有帮助的比例
- 从告警到初步判断的时间变化
- 原因假设包含最终原因的比例

## 17.3 平台

- Connector 成功率
- Task Run 成功率
- 外部写入成功率
- AI 调用成功率
- 平均任务耗时
- 用户实际使用次数

首期最重要的指标是：

> **实际节省了多少人工查询、核对和填写时间。**

---

# 18. 实施路线

## Phase 0：技术验证

目标：

- 确认各系统 API、认证和权限
- 验证企业网络访问
- 确认 Change Request 系统是否支持 API 创建
- 确认 xMatters 最佳接入方式
- 收集现有 Release 模板和 Checklist
- 确定首批系统映射

输出：

- Connector 可行性清单
- 字段映射
- 查询样例
- PoC 数据

## Phase 1：Release Preparation MVP

范围：

- SystemMapping
- Jira 读取
- Jenkins Build / Test 读取
- Ansible 信息读取
- Checklist
- AI Release 草稿
- Confluence 写入
- Change Request 草稿与创建
- Evidence Snapshot
- Task Run Log

完成标准：

> 团队可以使用系统完成一次真实 Production Release Preparation 和 Change Request 创建。

## Phase 2：Alert Triage MVP

范围：

- xMatters 告警接入
- 系统匹配
- Elasticsearch 查询
- Prometheus 查询
- 最近 Jenkins / Ansible / Release / Change 关联
- AI 摘要和原因假设
- 原始系统深链接
- 用户最终原因反馈

完成标准：

> 在选定系统和告警类型下，明显减少从收到告警到获得完整上下文的时间。

## Phase 3：Jenkins Job Assistant

范围：

- 触发已有 Job
- 参数选择
- 运行状态
- Console Log
- 测试报告和制品
- AI 失败摘要
- Release 关联

## Phase 4：需求分析

根据实际价值再决定是否启动。

---

# 19. MVP 收敛建议

## 首批支持范围

建议只选择：

- 1 至 2 个核心业务系统
- 1 套 Production Release 标准
- 1 种 Change Request 类型
- 1 个 Jenkins 平台
- 1 个 Ansible 平台
- 1 个 Elasticsearch 集群或入口
- 1 个 Prometheus 入口
- 1 至 3 种高频告警类型

不应一开始覆盖所有系统和所有 Release 类型。

## 首批成功判定

### Release

- 系统完成真实 Release 数据收集
- Checklist 与现有人工标准一致
- Confluence 文档可实际使用
- Change Request 可以成功创建
- 用户认为流程比现状更快

### Alert

- 能够稳定接收告警
- 能够匹配目标服务
- 能够查询日志和指标
- 能够展示最近变更
- AI 输出不掩盖信息缺口
- On-call 用户认为聚合页面有实际帮助

---

# 20. 主要风险

## 20.1 Change 系统缺少可用 API

影响：

- 无法直接创建 Change Request。

应对：

- 首期生成可复制的结构化草稿
- 支持导出
- 后续评估浏览器自动化，但不作为优先方案

## 20.2 外部系统字段和权限不一致

影响：

- 不同环境或项目查询失败。

应对：

- 使用 SystemMapping
- 提供连接测试
- 显示明确错误
- 首期限制支持范围

## 20.3 告警内容不足以匹配服务

影响：

- 无法自动选择查询模板。

应对：

- 支持告警字段映射
- 支持关键词和正则规则
- 允许用户手动修正
- 将修正结果用于后续优化

## 20.4 AI 输出看起来合理但无实际价值

应对：

- 强制引用证据
- 最多输出三个假设
- 显示信息缺口
- 保存用户反馈和最终原因
- 用历史告警进行离线回放验证

## 20.5 产品逐步平台化

应对：

- 每个新增需求先判断现有平台能否完成
- 默认选择集成
- 不建设通用工作流和复杂权限
- 以减少实际操作时间作为新增功能标准

---

# 21. 待确认问题

## Release

1. Production Release 当前使用哪些 Jira 字段？
2. Jenkins 测试结果采用什么格式？
3. Ansible 使用开源命令行、AWX 还是企业 Automation Platform？
4. Release Preparation 现有模板有哪些类型？
5. Change Request 使用什么系统？
6. Change 系统是否提供 API？
7. Change 必填字段和字段类型是什么？
8. 同一 Release 是否涉及多个 Jenkins Job？
9. Release 文档是创建新页面还是更新固定页面？
10. 哪些 Checklist 项是 Blocking？

## Alert

1. xMatters 当前能否配置 Webhook？
2. 告警正文是否稳定包含系统、服务和环境？
3. Elasticsearch 中如何区分服务和环境？
4. Prometheus 是否有统一 Label 规范？
5. 首批支持哪些告警类型？
6. 如何确定告警前的变更查询窗口？
7. Jenkins 和 Ansible 是否能按服务查询最近执行？
8. 是否有现成 Runbook？
9. 是否需要保存历史告警处理记录？
10. 是否需要通过 Email 回传分析结果？

---

# 22. V0.1 → V0.2 变更记录

## 22.1 产品定位调整

### V0.1

企业内部 AI 研发效能平台，具备向多模块平台发展的倾向。

### V0.2

企业内部研发运维“最后一公里”效率助手。

重点是：

- 连接已有平台
- 聚合分散信息
- 自动检查
- 生成和录入
- 不重复建设底层能力

## 22.2 模块调整

| V0.1 | V0.2 |
|---|---|
| Release Preparation | Release Preparation & Change Request Assistant |
| Alert Analyzer | Alert Triage Assistant |
| Automated Testing | Jenkins Job Assistant |
| Workspace | 删除，改为单实例 SystemMapping |
| 完整 Service Catalog | 简化为系统和连接器映射 |
| 多角色 RBAC | 简化为 Administrator / User |
| Automation Runs | 简化为 TaskRun |
| 通用模板和 Policy | 简化为固定模板、Checklist 和字段映射 |
| 完整 Evidence | 简化为 Release Evidence Snapshot |
| Alert Investigation 平台 | 简化为告警聚合、假设和反馈 |

## 22.3 新增内容

- Change Request Assistant
- Change 字段映射
- xMatters 接入
- Elasticsearch 与 Prometheus 分开建模
- Jenkins 和 Ansible 作为已有平台集成
- 本系统 Application / Connector / Task / Operation Log
- Deep Link 优先
- 原系统为 Source of Truth
- 轻量化 MVP 支持范围

## 22.4 删除或暂缓

- 多 Workspace
- 复杂 RBAC
- 通用工作流设计器
- Release Phase / Activity
- 完整 Incident Management
- On-call
- 自动修复
- 自动回滚
- 自建脚本执行
- 通用 Service Catalog
- 平台级 AI Evaluation

---

# 23. 最终产品边界声明

## 本产品做什么

- 连接现有企业系统
- 自动收集 Release 和告警相关信息
- 统一展示分散的数据
- 按企业标准执行检查
- 生成 Release 文档
- 生成并创建 Change Request
- 聚合告警日志、指标和最近变更
- 提供 AI 摘要和原因假设
- 提供原系统深链接
- 保存自身运行和操作日志

## 本产品不做什么

- 不替代 Jira
- 不替代 Confluence
- 不替代 Jenkins
- 不替代 Ansible
- 不替代 xMatters
- 不替代 Elasticsearch
- 不替代 Prometheus
- 不建设完整 Release Orchestration
- 不建设完整 Incident Management
- 不自动修改生产环境
- 不建设面向市场的通用平台能力

---

# 24. 结论

产品应以轻量、固定团队和实际节省时间为首要约束。

最终定位为：

> **通过连接企业已有工具，自动完成跨系统信息收集、标准检查、内容汇总和结果录入，解决 Production Release Preparation、Change Request 和生产告警处理中的最后一公里效率问题。**

首期开发顺序：

1. Release Preparation & Change Request Assistant
2. Alert Triage Assistant
3. Jenkins Job Assistant
4. Requirement Analysis

每个阶段都应以真实内部场景验证，而不是以功能数量衡量完成度。

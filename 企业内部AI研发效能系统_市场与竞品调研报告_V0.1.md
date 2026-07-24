# 企业内部 AI 研发效能系统：市场与竞品调研报告

> 文档版本：V0.1  
> 调研日期：2026-07-24  
> 调研范围：Release Preparation、Alert Analyzer、相关基础平台能力  
> 调研原则：优先采用产品官方文档和官方产品页面；功能状态可能随厂商版本更新而变化

---

## 1. 执行摘要

### 1.1 核心结论

当前产品方向具备现实需求和市场验证，但不适合被定义为一个新的通用 Release Orchestration、Observability 或 Incident Management 平台。

更合适的定位是：

> **构建在企业现有 Jira、Confluence、代码仓库、CI/CD、日志和告警系统之上的 AI 证据聚合、完整性检查与辅助决策层。**

调研得到以下主要判断：

1. **Release Preparation 的市场成熟度较高。**  
   Jira、Harness、GitLab 和 ServiceNow 已经验证了 Release 对象、发布阶段、审批、开发状态、证据快照、审计和风险检查等产品模式。

2. **Alert Analyzer 正快速从“告警摘要”发展为“AI 调查代理”。**  
   Datadog、incident.io、Harness 等产品强调自动建立假设、查询遥测、关联代码和部署变更、检索历史事件，并生成下一步建议。

3. **AI 本身不是主要壁垒，数据和上下文才是。**  
   市面上较强的告警分析能力通常建立在完整的日志、指标、Trace、服务拓扑、部署记录、代码仓库和历史 Incident 之上。

4. **不建议自研底层日志、告警路由、On-call、CI/CD 或部署编排。**  
   这些能力已有成熟产品，应优先集成。自研重点应放在内部流程、团队知识、证据关联、规则检查和输出模板上。

5. **当前 PRD 需要补强 Service Catalog、Evidence、Rule Engine 和 AI Evaluation。**  
   这四项能力是 Release 与 Alert 两条产品线可以共享的底座。

6. **第一版应继续保持 Release Preparation 为 P0。**  
   Alert Analyzer 的数据和权限前提更复杂，适合通过一个服务、一个日志平台和一种告警类型进行受控 PoC。

---

## 2. 调研目标

本次调研不以复制竞品功能为目的，而是回答以下问题：

1. 当前需求是否已有市场验证？
2. 成熟产品采用了哪些稳定的数据模型和交互模式？
3. 哪些功能可以直接采购或集成？
4. 哪些功能必须根据企业内部流程自研？
5. 当前 PRD 是否存在范围过大、能力缺失或顺序错误？
6. 产品应该如何形成差异化？
7. 下一阶段 PoC 应验证哪些关键假设？

---

## 3. 市场能力地图

当前市场产品大致分为以下类别。

| 类别 | 主要能力 | 代表产品 |
|---|---|---|
| Release Tracking | 版本、Issue、PR、Build、Deployment 状态 | Jira Releases |
| Release Orchestration | 发布流程、阶段、活动、审批、日历、执行 | Harness Release Orchestration |
| Release Evidence | Release 快照、制品、测试和审计证据 | GitLab Releases |
| Enterprise Release Governance | 发布计划、治理、合规和跨团队可见性 | ServiceNow Digital Product Release |
| Release Content Generation | Release Note、文档草稿、内容总结 | Atlassian Rovo 等 |
| Alert Management / AIOps | 告警聚合、降噪、去重和路由 | PagerDuty、Jira Service Management |
| AI Investigation | 假设生成、遥测查询、变更关联和原因分析 | Datadog Bits、incident.io Investigations |
| Incident Lifecycle | 事件协作、角色、时间线、状态更新和复盘 | Rootly、PagerDuty、incident.io |
| Change Intelligence | 将故障与部署、配置、Feature Flag 等变化关联 | Harness AI SRE、Datadog |
| Causal Observability | 基于服务拓扑和遥测进行事件关联 | Dynatrace Davis AI |

本产品不需要完整覆盖上述全部类别。更合理的切入点是：

- Release：跨系统证据聚合 + 内部规则检查 + Release 文档生成
- Alert：告警上下文聚合 + 最近变更关联 + 内部经验检索 + 有证据的原因假设

---

# 4. Release Preparation 竞品调研

## 4.1 Jira Releases 与 Release Page

### 产品定位

Jira Release Page 将一个 Version 下的工作项及其开发状态集中展示。连接 GitHub、GitLab、Bitbucket 或 Jenkins 后，可以显示与工作项关联的 Commit、Branch、Pull Request、Build 和 Deployment 信息。

Jira 还会针对以下情况提供警告：

- 工作项已完成，但 Pull Request 仍未关闭
- 工作项已完成，但代码未经 Review
- 工作项已完成，但关联 Build 失败
- 仍存在开放的 Review

Jira Cloud 的 Release Page 还支持 Release Approver 对发布进行批准或拒绝。

### 可借鉴点

1. **Release 不是文档，而是结构化 Version。**
2. **确定性警告比 AI 判断更可靠。**
3. **Jira Issue 与代码、Build、Deployment 的关联依赖 Issue Key 规范。**
4. **Release Readiness 应把风险直接定位到具体工作项。**
5. **审批状态应作为结构化数据保存，而不是只出现在文档中。**

### 不应照搬

- 不需要替代 Jira 的 Version 管理。
- 不需要重新实现工作项和开发状态页面。
- 不应依赖所有团队严格按照 Jira 原生方式组织 Release。

### 对本产品的意义

Jira 本身已经覆盖基础 Release Tracking。本产品必须提供 Jira 原生能力之外的价值：

- 跨多个项目、服务或数据源聚合
- 自定义测试证据
- 团队特定 Release Checklist
- 回滚和发布后验证检查
- Confluence 模板生成
- 历史 Incident 风险关联
- 对缺失信息给出改进建议

参考：[Jira Release Page 官方文档][jira-release-page]

---

## 4.2 Atlassian Rovo Release Notes Drafter

### 产品定位

Atlassian 已提供通过 Rovo 从 Jira 查询结果生成 Release Notes 的使用场景。Rovo Agent 还可以被配置并用于 Jira、Confluence 和 Automation。

### 可借鉴点

1. AI 文档生成功能正在快速商品化。
2. 仅提供“从 Jira 生成 Release Note”难以形成长期差异化。
3. AI 应嵌入编辑和自动化流程，而不是成为独立聊天入口。
4. 产品需要输出结构化 Readiness 和 Evidence，而不只是自然语言文档。

### 竞争压力

如果企业已经全面使用 Atlassian Cloud 和 Rovo，简单的 Jira 汇总、Confluence 草稿和内容润色很可能可以直接通过 Atlassian 原生能力完成。

因此，本产品必须聚焦：

- 非 Atlassian 数据源
- 内部检查规则
- 测试证据
- Release 与 Incident 的关联
- 更稳定的模板和审批逻辑
- 数据来源、推断和缺失状态的区分

参考：[Rovo Release Notes Drafter][rovo-release-notes]、[Rovo Agents][rovo-agents]

---

## 4.3 Harness Release Orchestration

### 产品定位

Harness 将复杂 Release 建模为可复用的 Process，并进一步拆分为 Phase 和 Activity，支持 Release Calendar、执行、协作、审批和通知。它面向跨服务、跨团队和跨环境的复杂发布场景。

### 可借鉴点

1. **Process 与 Release Instance 分离。**  
   Release 模板与具体一次发布的数据不应混为一体。

2. **Phase / Activity 模型。**  
   发布准备可以分为 Scope、Development、Testing、Approval、Deployment Preparation 和 Post-release Verification 等阶段。

3. **Inputs 和 Variables。**  
   同一套模板应在不同环境、服务和版本中重复使用。

4. **Release Calendar。**  
   后续可用于展示计划发布窗口和冲突，但不是首版核心。

5. **审批、通知和执行记录属于 Release 生命周期。**

### 不应照搬

- 首版不需要完整流程编排器。
- 不需要自动部署和多环境执行。
- 不需要复杂的 Release Train 或跨组织协调能力。
- 不应在用户价值验证前建设通用 YAML 或低代码工作流系统。

### 对本产品的意义

可借鉴其数据模型，但产品应停留在 **Preparation 和 Readiness**，不扩展为完整 Orchestration。

参考：[Harness Release Orchestration][harness-release]

---

## 4.4 GitLab Releases 与 Release Evidence

### 产品定位

GitLab 在创建 Release 时会保存与该 Release 相关的数据快照，即 Release Evidence。Evidence 可以包含测试制品、Milestone 和匹配版本的 Package，并可以通过 API 访问。其核心价值是形成持久、可审计的 Release 记录。

### 可借鉴点

1. **Evidence 应是一等数据实体。**
2. Release 生成时应保存证据快照，不能始终只显示实时数据。
3. Evidence 应记录获取时间、来源、内容哈希和关联 Release。
4. 测试报告、制品、Issue、PR 和 Package 应可以作为不同类型的证据。
5. 一个 Release 可以拥有多个时间点的 Evidence Snapshot。

### 对当前 PRD 的直接影响

当前 PRD 已经包含 Evidence 实体，但需要进一步明确：

- Evidence Snapshot
- Evidence Type
- Source Timestamp
- Retrieved Timestamp
- Content Hash
- Validation Status
- Access Scope
- Snapshot Version
- 是否为 Release 决策时使用的证据

参考：[GitLab Release Evidence][gitlab-evidence]、[GitLab Releases][gitlab-releases]

---

## 4.5 ServiceNow Digital Product Release

### 产品定位

ServiceNow Digital Product Release 聚焦大型组织中的发布计划、可见性、自动化、Readiness 和合规。其优势通常在于与 ITSM、变更管理和治理流程整合。

### 可借鉴点

1. Release Readiness 与合规检查可以统一展示。
2. Release 往往与 Change、Approval、Risk 和 Audit 相关联。
3. 大型企业需要跨团队统一可见性和责任归属。

### 不应照搬

- 首版不需要 ITIL 级别的完整流程。
- 不应引入过多状态、审批层级和组织治理。
- 内部轻量级工具应避免配置成本高于人工流程成本。

### 对本产品的意义

ServiceNow 是“企业级上限”参考，而不是 MVP 设计模板。应重点借鉴 Readiness、Governance 和 Audit，不复制其复杂度。

参考：[ServiceNow Digital Product Release][servicenow-dpr]

---

## 4.6 Release 产品综合对比

| 产品 | 核心强项 | AI 角色 | 数据前提 | 对本产品最值得借鉴 | 不建议照搬 |
|---|---|---|---|---|---|
| Jira Releases | Issue 与开发状态聚合、警告、审批 | 内容辅助 | Jira 与开发工具已连接 | 确定性风险警告、Issue 级追踪 | 重建 Version 管理 |
| Rovo | 搜索、生成 Release Note、Agent | 生成与检索 | Atlassian 数据和连接源 | 编辑器内 AI、Agent 接入 | 只做 Jira 摘要 |
| Harness RO | Process、Phase、Activity、执行和审批 | 流程建模辅助 | 较完整的软件交付平台 | 模板与实例分离、阶段模型 | 完整编排平台 |
| GitLab Releases | Release Snapshot、制品和 Evidence | 非核心 | GitLab SDLC 数据 | Evidence Snapshot | 将 GitLab 作为唯一来源 |
| ServiceNow DPR | 企业治理、Readiness、合规 | 流程辅助 | ServiceNow 工作流和组织配置 | Readiness、Risk、Audit | 复杂 ITIL 流程 |

---

# 5. Alert Analyzer 竞品调研

## 5.1 Datadog Bits Investigation 与 Incident AI

### 产品定位

Datadog Bits Investigation 被定义为可自动调查生产问题的 AI Agent。它可以围绕 Monitor Alert 建立调查，形成假设，并查询相关遥测。其配置支持连接 GitHub、Grafana、Dynatrace、Splunk、Sentry 和 ServiceNow 等外部系统。

Datadog 还允许使用 Runbook 和专用上下文文件等知识来源增强调查。

### 可借鉴点

1. **分析应是多步骤 Investigation，而不是一次 Prompt。**
2. 每个调查需要保存：
   - 当前假设
   - 已执行查询
   - 获得的证据
   - 被排除的假设
   - 最终建议
3. 模型需要能够按需选择工具和查询数据。
4. Runbook 和服务上下文是独立的 Knowledge Source。
5. 用户应可以继续与调查结果对话。
6. Alert Analyzer 的评估单位应是一次 Investigation Session。

### 数据优势与限制

Datadog 的核心优势是原生掌握大量遥测和服务上下文。内部产品如果只有局部日志，不应期待达到同等通用分析能力。

### 对本产品的意义

应该借鉴其 Investigation 模型，但首版只允许有限工具：

- 查询指定日志平台
- 查询最近 Release
- 查询历史 Incident
- 查询 Runbook
- 查询服务责任人

参考：[Datadog Bits Investigation][datadog-bits]、[Datadog Knowledge Sources][datadog-knowledge]、[Datadog Incident AI][datadog-incident-ai]

---

## 5.2 incident.io Investigations

### 产品定位

incident.io Investigations 强调从告警到调查、Root Cause 和 Resolution 的自动化，并把代码变化、告警和历史 Incident 关联起来。用户还可以在调查过程中继续询问是否出现过类似问题。

### 可借鉴点

1. 告警应先经过 Triage，再决定是否需要立即处理。
2. 变更、告警和历史事故是最关键的三类关联信息。
3. 对话式追问适合作为调查的补充，而非主要入口。
4. 相似 Incident 查询是高价值功能。
5. 调查结果应推动具体下一步操作。

### 风险

市场产品常使用“Root Cause”措辞，但实际产品设计仍应区分：

- 已确认根因
- 高概率原因
- 待验证假设

本产品首版应坚持输出“原因假设”，不自动声明 Root Cause。

参考：[incident.io Investigations][incident-investigations]

---

## 5.3 Rootly AI

### 产品定位

Rootly AI 主要嵌入完整 Incident 生命周期，提供事件标题生成、实时摘要、Catchup、Mitigation 和 Resolution 摘要、编辑器辅助、会议记录以及 Retrospective 内容生成。

Rootly 明确强调 AI 访问应尊重 Incident 可见性和 Slack 消息范围。

### 可借鉴点

1. AI 输出应随 Incident 信息增加而更新。
2. “当前摘要”与“最终复盘”是不同产品对象。
3. Timeline、Alert、Action Item、沟通记录和会议转录共同构成 Incident Context。
4. AI 输出必须可编辑和重新生成。
5. 隐私和权限应按 Incident 粒度评估。
6. 信息不足时应明确提示，而不是强行生成。
7. Incident Catchup 是非常实用的轻量场景。

### 与本产品的关系

Rootly 更擅长事件协作和文档化，而当前产品希望进一步连接内部日志、Release 和业务知识。可以借鉴其 Incident Lifecycle，但不必重建 Slack 原生指挥系统。

参考：[Rootly AI][rootly-ai]

---

## 5.4 PagerDuty AIOps 与 PagerDuty Advance

### 产品定位

PagerDuty AIOps 聚焦告警降噪、可见性、Triage 和自动化。PagerDuty Advance 则提供生成式 AI 助手，可以在 Slack 和 Microsoft Teams 中总结事件、提出诊断问题和排障建议，并生成状态更新和 Post-Incident Review 草稿。

PagerDuty 官方文档明确提示生成式 AI 输出可能错误，使用前需要事实核验。

### 可借鉴点

1. Alert Noise Reduction 和 Root Cause Analysis 是两层不同能力。
2. 通知和协作渠道是 Incident 产品的重要入口。
3. Status Update、Incident Summary 和 Post-Incident Review 可以共享上下文。
4. AI 输出应带有明确的事实核验提示。
5. 私人侧边对话可以避免在公共 Incident Channel 产生噪音。
6. 调查能力必须与 On-call 和 Service Ownership 对接。

### 不应照搬

- 不需要重建 On-call Scheduling。
- 不需要重建复杂的 Alert Routing 和 Escalation。
- 如果团队已有 PagerDuty，应优先把它作为 Alert Source 和通知目标。

参考：[PagerDuty AIOps][pagerduty-aiops]、[PagerDuty Advance][pagerduty-advance]

---

## 5.5 Harness AI SRE

### 产品定位

Harness AI SRE 强调将 Incident 与不同来源的 Change Event 关联，包括 CI/CD Pipeline、Feature Flag、第三方变更和 Deployment，并集成 ServiceNow、Slack 和监控系统。

### 可借鉴点

1. **Change Intelligence 应作为 Alert Analyzer 的核心能力。**
2. Release、Deployment、配置和 Feature Flag 应统一抽象为 Change。
3. 一个 Change 应记录：
   - 服务
   - 环境
   - 时间
   - 变更类型
   - 负责人
   - 来源
   - 关联版本
4. 故障分析不能只查日志，还要查告警发生前的 Change Window。
5. Release Preparation 建立的 Change 和 Evidence 数据，可以直接支持 Alert Analyzer。

### 对本产品的重要启示

Release 和 Alert 两条产品线的核心共享对象不只是 Workspace 和 Service，还包括：

- Change
- Deployment
- Evidence
- Service Ownership
- Timeline

参考：[Harness AI SRE][harness-ai-sre]

---

## 5.6 Jira Service Management 与 Rovo

### 产品定位

Jira Service Management 支持告警管理、Alert 到 Incident 的转换、Incident 协作和 On-call。Rovo 可以对相似 Alert 进行分组，并生成 Group Title、Priority 和摘要；还可以查找与 Incident 相关的知识文档、PIR、Jira Work Item 和第三方资源。

### 可借鉴点

1. Alert Grouping 是 Triage 前的重要降噪能力。
2. 用户权限必须贯穿 AI 检索，不能先检索再过滤。
3. 相关资源检索的结果应包括：
   - Runbook
   - 历史 PIR
   - Jira Issue
   - Confluence 文档
   - Slack 内容
4. Alert、Alert Group 和 Incident 应是不同实体。
5. 首版可以不做智能分组，但数据模型不应把 Alert 和 Incident 混为一体。

### 竞争压力

如果企业已经使用 Jira Service Management Cloud 和 Rovo，基础告警分组、相关资源搜索和 Incident 协作可能无需自研。本产品应重点补充：

- 特定日志查询
- Release / Deployment 强关联
- 内部业务影响分析
- 自定义原因假设和通知格式

参考：[JSM Rovo Alert Grouping][jsm-alert-grouping]、[JSM Related Resources][jsm-related-resources]

---

## 5.7 Dynatrace Davis AI

### 产品定位

Dynatrace Davis AI 是以遥测、事件和拓扑为基础的因果分析能力。它会处理阈值异常、基线退化、进程崩溃、部署和配置变化等事件。

### 可借鉴点

1. 服务拓扑对于判断影响范围和因果关系非常重要。
2. Deployment 和 Configuration Change 本身也是可观测事件。
3. 事件时间顺序和依赖方向是分析的重要输入。
4. 纯文本 RAG 无法替代结构化拓扑与时间关系。

### 对本产品的意义

首版不需要构建完整因果图，但 Service Catalog 至少要支持上游、下游和关键依赖关系。

参考：[Dynatrace Davis AI][dynatrace-davis]

---

## 5.8 Alert 产品综合对比

| 产品 | 核心强项 | 主要数据基础 | AI 角色 | 最值得借鉴 | 自研时的警示 |
|---|---|---|---|---|---|
| Datadog Bits | 遥测驱动的多步骤调查 | Logs、Metrics、Traces、Monitor、代码 | 假设、查询、分析 | Investigation Session | 数据不完整时能力会显著下降 |
| incident.io | 调查与事件响应结合 | Alert、Code Change、历史 Incident | 调查和行动建议 | 变更与历史事件关联 | 不要把假设直接称为根因 |
| Rootly AI | Incident 全生命周期与文档化 | Timeline、Alert、Slack、会议记录 | 摘要、Catchup、Retro | 可更新摘要、权限范围 | 摘要不等同于技术调查 |
| PagerDuty | 告警降噪、On-call、响应协调 | Alert、Service、Incident、Chat | 摘要、建议、PIR | 降噪与调查分层 | 不应重建成熟 On-call 能力 |
| Harness AI SRE | Change Intelligence | Pipeline、Deployment、Flag、第三方变更 | 变更关联、Triage | 统一 Change 模型 | 需要可靠的变更数据 |
| JSM + Rovo | Alert、Incident、知识资源统一 | Atlassian 数据和连接源 | 分组、搜索、摘要 | Alert Group 与资源检索 | 原生能力可能覆盖简单场景 |
| Dynatrace Davis | 拓扑和因果分析 | 完整遥测和依赖拓扑 | 事件关联与根因分析 | 拓扑、事件时间线 | 不能只靠 LLM 模拟因果关系 |

---

# 6. 跨产品共性设计模式

## 6.1 结构化实体优先于文档

成熟产品不会只保存最终生成的自然语言，而是保存：

- Release
- Phase
- Activity
- Evidence
- Change
- Alert
- Alert Group
- Incident
- Investigation
- Hypothesis
- Timeline Event
- Action Item
- Approval

文档、Email 和 Confluence Page 都应是这些结构化实体的输出形式。

---

## 6.2 确定性规则优先于 AI 判断

适合规则判断的内容包括：

- 是否存在未关闭 Jira
- PR 是否合并
- Build 是否成功
- 测试是否上传
- 是否填写回滚方案
- 是否填写发布后验证
- 是否获得必要审批
- 告警是否重复
- 服务是否存在配置
- 日志查询是否成功

AI 应处理：

- 信息归类
- 内容总结
- 风险解释
- 多证据综合
- 原因假设
- 下一步建议

---

## 6.3 Service Catalog 是告警分析的基础

服务至少需要配置：

- 服务名称
- 所属系统
- Owner
- 环境
- Region
- Repository
- Deployment Source
- Log Source
- Dashboard
- Runbook
- 上游服务
- 下游服务
- 关键业务功能
- 通知目标

没有 Service Catalog，Alert Analyzer 只能成为通用日志聊天工具。

---

## 6.4 Change Intelligence 是两个模块的连接点

Release Preparation 负责建立和验证 Change：

- Jira Change
- PR / Commit
- Deployment
- Configuration Change
- Database Change
- Feature Flag Change

Alert Analyzer 则在告警时间窗口内检索这些 Change。

因此，Change 应成为共享核心实体。

---

## 6.5 调查应保存过程，而不只保存结论

一次 Investigation 至少应保存：

- 输入告警
- 调查时间范围
- 使用的数据源
- 执行过的查询
- 查询结果摘要
- 假设列表
- 支持证据
- 反向证据
- 排除原因
- 信息缺口
- 最终建议
- 用户反馈
- 最终确认根因

这也是后续评估 AI 准确率的基础。

---

## 6.6 Human-in-the-loop 是主流设计

市场产品普遍保留人工决策。尤其需要人工确认的操作包括：

- 正式发布
- 生产变更
- 回滚
- 重启
- 告警关闭
- 对外状态更新
- 正式根因报告

首版应保持只读调查，不建设自动修复。

---

## 6.7 权限必须在检索前生效

AI 只能读取用户原本有权读取的：

- 日志
- Jira
- Confluence
- Slack
- Incident
- 代码
- 服务配置

不应先构建一个全量知识库，再依赖 Prompt 告诉模型不要泄露信息。

---

# 7. Build / Buy / Integrate 决策

## 7.1 建议自研

| 能力 | 决策理由 |
|---|---|
| Release Readiness Rule Engine | 高度依赖内部流程和模板 |
| 跨系统 Evidence Model | 是两个核心模块的共享资产 |
| 内部 Release 文档生成 | 团队格式和规则差异较大 |
| Change 统一模型 | 需要关联 Jira、PR、部署和告警 |
| 内部业务影响分析 | 外部产品缺少特定业务上下文 |
| 原因假设输出规范 | 需要符合团队风险和审计要求 |
| AI 来源、推断和缺失标记 | 是产品可信度的重要差异化 |
| Investigation 反馈与评估 | 决定 AI 能力能否持续改进 |

## 7.2 建议集成

| 能力 | 建议集成对象 |
|---|---|
| Jira 和 Version | Jira |
| 文档管理 | Confluence |
| PR、Commit 和代码 | GitHub、GitLab 或 Bitbucket |
| CI/CD 和测试执行 | Jenkins、GitHub Actions、GitLab CI |
| 日志存储和检索 | 当前企业日志平台 |
| Metrics 和 Trace | 当前 Observability 平台 |
| Alert Source | PagerDuty、JSM、Datadog 或现有告警系统 |
| On-call 和 Escalation | 当前 On-call 平台 |
| Email 和 Chat | 企业现有通信系统 |
| Secret 管理 | 企业 Vault 或云 Secret Manager |

## 7.3 建议采购优先评估

出现以下情况时，应优先评估采购现有产品：

- 企业已经完整使用 Datadog，并且 Bits Investigation 可以访问所需数据。
- 企业已经使用 PagerDuty、incident.io 或 Rootly 完成 On-call 和 Incident 流程。
- 企业已购买 Atlassian Rovo，简单 Release Note 和相关资源搜索已满足需求。
- 企业已有 Harness 或 ServiceNow，并已建立完整 Release Governance。

即使采购现有产品，也可能仍需自研轻量适配层，用于内部业务知识、模板和跨产品输出。

## 7.4 暂不建设

- 日志存储引擎
- Metrics / Trace 平台
- 通用 On-call 系统
- 完整 CI/CD
- 自动部署
- 自动回滚
- 通用低代码工作流
- 全自动生产修复
- 通用因果图平台

---

# 8. 产品差异化建议

## 8.1 推荐定位

> **为使用 Jira、Confluence 和现有研发运维工具的内部团队，提供面向 Release 和生产告警的 AI 证据聚合、规则检查和辅助决策服务。**

## 8.2 差异化能力

1. **Release 与 Alert 使用同一套 Change 和 Evidence 数据。**
2. **支持企业内部固定模板和规则。**
3. **清晰区分事实、推断、缺失和人工输入。**
4. **所有结论可以返回原始证据。**
5. **提供低配置成本的团队级 Service Catalog。**
6. **聚焦少数高频流程，而不是建设完整平台。**
7. **支持 Jira 和 Confluence 的深度输出。**
8. **以内部历史修复经验增强告警分析。**
9. **允许逐步接入数据源，不要求一次完成完整 Observability 建设。**

## 8.3 不应作为差异化的能力

以下能力容易被平台厂商快速商品化，不适合作为唯一卖点：

- Jira Issue 摘要
- Release Note 生成
- Incident 摘要
- 文本润色
- 普通知识库问答
- 单段日志解释
- Confluence Page 创建

---

# 9. 对现有 PRD 的修订建议

## 9.1 将 Service Catalog 提升为 Phase 0 必需能力

当前 PRD 已包含 Service，但建议明确为首批底座，而不是 Alert 阶段再补充。

首版最低字段：

- Service Name
- System
- Team
- Owner
- Environment
- Repository
- Jira Project
- Log Source
- Deployment Source
- Runbook
- Upstream / Downstream

---

## 9.2 增加 Rule Engine

Release Readiness 不应完全依赖 AI。

建议增加：

- Rule Definition
- Rule Scope
- Rule Severity
- Rule Result
- Blocking / Non-blocking
- Evidence Requirement
- Override
- Override Reason
- Rule Owner
- Rule Version

示例：

- 所有 P0/P1 Issue 必须关闭
- 必须存在测试证据
- 数据库变更必须有回滚步骤
- 关键服务 Release 必须填写发布后验证
- PR 必须合并且 Build 成功

---

## 9.3 强化 Evidence Snapshot

增加：

- Snapshot ID
- Snapshot Time
- Release Decision Time
- Source Timestamp
- Retrieved Timestamp
- Content Hash
- Validation Status
- Retention Policy
- Access Scope

避免 Release 文档在数周后显示与发布决策时不同的实时数据。

---

## 9.4 增加 Change 实体和 Change Window

Change 类型至少包括：

- Code
- Deployment
- Configuration
- Database
- Feature Flag
- Infrastructure
- Dependency

Alert Analyzer 默认查询：

- 告警前一段时间
- 告警开始到当前
- 相同服务最近若干次 Release

时间窗口应可按告警类型配置。

---

## 9.5 增加 Investigation Session

建议数据结构：

- investigation_id
- alert_id
- status
- time_range
- tools_used
- queries
- evidence
- hypotheses
- missing_information
- recommendations
- user_feedback
- confirmed_root_cause
- created_at
- completed_at

---

## 9.6 增加 AI Evaluation

至少记录：

- 用户是否认为结果有帮助
- Top 3 是否包含真实根因
- 哪条建议被执行
- 哪个证据最有帮助
- 哪个假设被排除
- 最终根因
- 是否存在误导结论
- AI 节省的估算时间

没有这些反馈，系统无法判断 Alert Analyzer 是否真的有效。

---

## 9.7 明确 Release 与 Deployment 的区别

- Release：一组准备交付的业务和技术变化
- Deployment：将某个构建或版本部署到某环境的执行事件

一个 Release 可以包含多个 Deployment。  
Alert 应关联实际 Deployment，而不仅是计划 Release。

---

## 9.8 增加 Alert Group，但暂不实现智能分组

数据模型可预留：

- alert_group_id
- grouping_key
- related_alerts
- group_reason
- severity
- primary_alert

首版可以使用确定性字段分组，后续再引入 AI。

---

# 10. MVP 建议

## 10.1 Release Preparation MVP

### 必须具备

- Jira Version / Issue 读取
- Confluence 模板
- 测试结果手动上传
- Service Catalog 基础字段
- 确定性 Rule Engine
- Release Readiness Report
- Evidence Snapshot
- AI 变更摘要和风险解释
- 用户确认
- Confluence 写入
- 审计记录

### 建议暂缓

- Release Calendar
- 多阶段复杂编排
- 自动部署
- 多层审批
- 自定义低代码流程
- 全自动跨团队协调

---

## 10.2 Alert Analyzer PoC

### 受控范围

- 1 个核心服务
- 1 种高频告警
- 1 个日志平台
- 1 个 Deployment 来源
- 1 套 Runbook
- 一批经过整理的历史 Incident
- Email 或 API 输出
- 只读分析

### 调查工具

首版只允许：

1. 查询服务信息
2. 查询指定时间范围日志
3. 查询最近 Deployment / Release
4. 查询历史 Incident
5. 查询 Runbook
6. 查询服务负责人

### 输出

- 事件概览
- 关键证据
- 原因假设 Top 3
- 每个假设的支持证据
- 信息缺口
- 下一步检查
- 建议联系团队
- 分析可信度说明

---

# 11. PoC 验证方案

## 11.1 Release PoC

选择过去 5 至 10 次真实 Release，比较：

- 人工准备耗时
- 系统准备耗时
- 自动填充比例
- 缺失项命中率
- 错误警告率
- 用户修改幅度
- 文档最终采用率

成功标准建议：

- 明显减少信息收集和排版时间
- 不遗漏现有 Checklist 的关键项
- 关键数据均可追溯到来源
- 用户愿意在真实 Release 中使用

---

## 11.2 Alert PoC

选择 20 至 50 个已解决的历史 Incident，进行离线回放：

1. 隐藏最终 Root Cause。
2. 只提供告警发生时可获得的数据。
3. 让系统生成 Top 3 假设和下一步建议。
4. 与真实排查路径和最终 Root Cause 对比。
5. 由 SRE 人工评价。

建议指标：

- Top 3 Root Cause Recall
- Evidence Precision
- 建议下一步有效率
- 无依据结论率
- 平均节省时间
- 数据源失败时的降级质量

在离线回放达到可接受水平后，再接入实时告警。

---

# 12. 主要风险与应对

## 12.1 原生平台能力快速增强

风险：

- Atlassian、Datadog、PagerDuty 等可能快速覆盖简单 AI 功能。

应对：

- 不把摘要和文档生成作为核心壁垒。
- 聚焦内部流程、跨平台证据和团队规则。

## 12.2 数据完整度不足

风险：

- 缺少 Deployment、Service Owner 或历史 Incident 时，告警分析质量低。

应对：

- 在 PoC 前先建设最小 Service Catalog。
- 明确显示信息缺口。
- 不在数据不足时给出确定性结论。

## 12.3 配置成本过高

风险：

- 每个服务需要大量手工配置，用户放弃使用。

应对：

- 从 Jira、代码仓库和现有配置自动导入。
- 使用模板继承。
- 首版限定少量服务。

## 12.4 AI 输出难以评估

风险：

- 输出看起来合理，但没有实际帮助。

应对：

- 采用历史事件回放。
- 保存用户反馈和最终根因。
- 评价假设、证据和建议，而不是只评价文字质量。

## 12.5 产品范围再次膨胀

风险：

- 逐步加入 On-call、日志平台、部署编排等通用能力。

应对：

- 每项新增能力必须先完成 Build / Buy / Integrate 评审。
- 优先集成，不复制成熟平台。

---

# 13. 下一步行动建议

## 第一项：完成内部现状调研

需要确认：

- 当前 Jira / Confluence 版本
- 当前代码仓库
- 当前 CI/CD
- 当前日志平台
- 当前告警平台
- 当前 On-call 平台
- Release 文档模板
- Release Checklist
- 历史 Incident 数据质量
- 服务和 Owner 数据是否存在

## 第二项：修订 PRD

根据本报告补充：

- Service Catalog
- Rule Engine
- Evidence Snapshot
- Change Intelligence
- Investigation Session
- AI Evaluation
- Alert Group 数据模型
- Release 与 Deployment 的区别

## 第三项：制作 Release 原型

优先设计以下页面：

1. Release 列表
2. 创建 Release
3. Release Readiness
4. Evidence 查看
5. 文档预览与编辑
6. Confluence 发布确认

## 第四项：准备 Alert 离线数据集

至少整理：

- 原始告警
- 相关日志
- 最近 Deployment
- Runbook
- 历史 Timeline
- 最终 Root Cause
- 实际修复动作

## 第五项：做采购与集成评估

根据公司当前工具栈，分别验证：

- Atlassian Rovo 是否已覆盖简单 Release Note 和相关资源搜索
- 当前 Observability 产品是否已有 AI Investigation
- 当前 Incident 平台是否已有 AI Summary 和 Postmortem
- 哪些 API 和权限可用于内部系统集成

---

# 14. 最终建议

本产品值得继续推进，但应该避免以“市场已有类似产品”为理由扩大范围。

建议坚持以下边界：

> **不建设新的 Jira、Confluence、CI/CD、Observability 或 On-call 平台。**  
> **建设一个连接现有系统、理解内部规则、统一证据并辅助决策的轻量层。**

产品近期路线仍建议保持：

1. Release Preparation MVP
2. Alert Analyzer 离线回放 PoC
3. Alert Analyzer 小范围实时试点
4. 自动化测试结果集成
5. 需求分析

---

# 15. 官方资料索引

[harness-release]: https://developer.harness.io/docs/release-orchestration/
[gitlab-evidence]: https://docs.gitlab.com/user/project/releases/release_evidence/
[gitlab-releases]: https://docs.gitlab.com/user/project/releases/
[jira-release-page]: https://support.atlassian.com/jira-software-cloud/docs/use-the-release-page-to-check-the-progress-of-a-version/
[rovo-release-notes]: https://www.atlassian.com/software/rovo/use-cases/agent-release-notes-drafter
[rovo-agents]: https://support.atlassian.com/rovo/docs/agents/
[servicenow-dpr]: https://www.servicenow.com/products/digital-product-release.html
[datadog-bits]: https://docs.datadoghq.com/bits_ai/bits_investigation/
[datadog-knowledge]: https://docs.datadoghq.com/bits_ai/bits_investigation/knowledge_sources/
[datadog-incident-ai]: https://docs.datadoghq.com/incident_response/incident_management/investigate/incident_ai/
[incident-investigations]: https://incident.io/investigations
[rootly-ai]: https://docs.rootly.com/ai/ai
[pagerduty-aiops]: https://www.pagerduty.com/platform/aiops/
[pagerduty-advance]: https://support.pagerduty.com/main/docs/pagerduty-advance
[harness-ai-sre]: https://developer.harness.io/docs/ai-sre/
[jsm-alert-grouping]: https://support.atlassian.com/jira-service-management-cloud/docs/alert-grouping-using-atlassian-intelligence/
[jsm-related-resources]: https://support.atlassian.com/jira-service-management-cloud/docs/find-related-resources-with-atlassian-intelligence/
[dynatrace-davis]: https://docs.dynatrace.com/docs/semantic-dictionary/model/davis

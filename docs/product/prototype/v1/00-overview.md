# PRD 00 — Product Overview: AI Engineering Copilot

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-05
- **Source:** PRODUCT_SPEC_v4.md (v4)
- **Related change:** — (baseline product doc, seeded from the v4 spec)

> This is the cross-cutting product overview. Each of the six modules has its own
> PRD file (01–07) under this folder. Page/UI design and technical/AI
> implementation are deliberately out of scope here and handled by later docs.

## Problem / goal

An internal R&D-efficiency AI platform for the enterprise. It offloads the
repetitive context-gathering, result-consolidation, and document-syncing work
that engineering teams do across requirements, testing, operations, and releases
to AI — while keeping humans in control of write operations and high-risk
judgments.

## Two product lines (shared foundation)

The six modules split into two categories with different characteristics, sharing
one common foundation:

- **AI reasoning line**: AI reads context → reasons → produces a draft → human
  confirms → writes back. Covers Requirement Analysis, Alert Analyzer, and
  Mini-tools / Release prep.
- **Execution orchestration line**: the platform's built-in sandbox triggers
  script execution → collects results → AI consolidates → writes back / notifies.
  Covers Test Execution and daily Health Check.

Distinguishing the two matters because their value propositions, acceptance
criteria, and technical complexity differ; scheduling and resourcing should treat
them separately.

## Shared foundation

Every module depends on the following shared capabilities:

- **Config Center + MCP integration**: the platform's external capabilities are
  all integrated through MCP (Model Context Protocol) servers. Teams configure
  the MCP servers they need in the Config Center (Jira, Confluence, log queries,
  Jenkins, etc.), and modules call them as needed. MCP is the platform-wide
  extension standard, not a per-module solution.
- **Business domain knowledge**: admins define business domains, and each domain
  is loaded with unstructured knowledge documents (implemented lightweight with
  SQLite this phase) for retrieval-augmented AI.
- **Notifications**: email and generic webhook. Async flows (Health Check, Alert
  Analyzer) notify users via these two channels; enterprise IM connects via
  webhook — the platform does not build in specific IM adapters.
- **AI write-back layer**: a unified capability for AI-generated content → human
  confirmation (with optional AI polish / manual edit) → write back to Jira /
  Confluence. Reused by Requirement Analysis, Mini-tools, and Release prep.
- **Execution sandbox**: an isolated environment for running user scripts,
  responsible for timeouts, resource limits, screenshots, and log collection.
  Reused by Test Execution and Health Check.

## Product principles (the root of the business rules)

1. **Humans confirm write operations**: any write back to Jira / Confluence,
   task creation, or document modification must be confirmed by the user — never
   executed automatically.
2. **Evidence first**: AI's analytical conclusions (requirement impact, alert
   root cause) should carry their sources where possible — visited links,
   retrieved domain knowledge, log excerpts.
3. **Team autonomy**: MCP servers, business domains, mini-tool templates, and
   notification channels are configured by each team; the platform does not
   presume any team's business.
4. **Unified extension integration**: integration with external systems always
   goes through MCP. Adding a new external capability = configuring an MCP
   server, not hardcoding an adapter into the product.
5. **Process visibility**: logs, screenshots, and errors for Test Execution and
   Health Check must be fully inspectable, so users have a clear picture of what
   ran.
6. **AI is an assistant, not a decision-maker**: AI produces drafts and
   suggestions; humans make the final call.
7. **Domain-agnostic**: by default the platform is not tied to a specific
   business; team-specific knowledge is injected via business-domain config.

## Target users

| User | Primary modules | Core benefit |
| --- | --- | --- |
| Backend / Frontend dev | Requirement Analysis, Mini-tools | Quickly grasp requirement impact, auto-generate Jira/Confluence, less doc labor |
| QA / SDET | Test Execution, Health Check | Connect the test-execution chain, auto-consolidate and sync results |
| DevOps / SRE | Health Check, Alert Analyzer | Automated scheduled checks; fast production-alert triage |
| Release coordinator | Mini-tools / Release prep | Auto-summarize release docs from Jira/Confluence/PR |
| Team admin | Config Center, Business domain knowledge | Configure tools, domain knowledge, and mini-tool templates for the team |

## Delivery roadmap

Scheduled on the principle of "ship one chain people can use daily first, then
expand." Each phase uses "are there real users willing to keep using it" as its
success marker.

| Phase | Modules delivered | Why this order | Success marker |
| --- | --- | --- | --- |
| Phase 1 | Requirement Analysis + Config Center + Domain Knowledge | Config Center and domain knowledge are prerequisites for Requirement Analysis writing back to Jira/Confluence; Requirement Analysis has the most obvious AI value | A dev team uses it for requirement analysis and creates Jira/Confluence |
| Phase 2 | Test Execution + daily Health Check | Both share the built-in sandbox execution engine and result collection; cheapest to build together | A QA team runs tests and syncs results with it; SRE uses scheduled checks |
| Phase 3 | Alert Analyzer + Mini-tools / Release | Depends on the config and write-back capabilities accumulated earlier; the experience base needs time to build up | Production alerts are analyzed through the platform; release docs are drafted by AI |

Modules within a phase may run in parallel, but starting work across phases in
parallel is discouraged.

## Out of scope (this phase)

- No automatic execution of any write operation (Jira/Confluence write-back and
  production fixes all require human confirmation).
- Does not replace Jira, Confluence, Jenkins, monitoring, or log systems — only
  orchestrates and AI-augments between them.
- No AI generation of test scripts from scratch (scripts are written and uploaded
  by teams themselves).
- No hardcoded adapters for any specific external system (log sources, IM, etc.)
  — all integrated via configured MCP servers.
- Test Execution this phase is built-in sandbox only, no Jenkins triggering
  (later via MCP extension).
- Business domain knowledge this phase is unstructured document retrieval only,
  no structured rule engine.
- Notifications are email + generic webhook only, no built-in specific IM
  adapters.
- No complex multi-tenant billing or enterprise-grade fine-grained permission
  matrix.
- Requirement Analysis and Test Execution are independent this phase; no
  automatic chaining from requirement to test script.

## Success metrics

| Metric | Target | Module |
| --- | --- | --- |
| Reduction in requirement-analysis time | 40%+ | Requirement Analysis |
| Reduction in manual Jira/Confluence doc labor | Significant (measured by adoption rate) | Requirement Analysis, Mini-tools |
| Test-execution chain connectivity | Target teams can 100% trigger and collect results from the platform | Test Execution |
| Reduction in manual check-consolidation time | 60%+ | Health Check |
| Reduction in release-doc drafting time | 50%+ | Mini-tools / Release |
| Reduction in initial alert-triage time | 30%+ | Alert Analyzer |
| Human adoption rate of AI output | 60%+ | All AI reasoning modules |

The measurement definitions for each metric (how "time" and "adoption" are
computed) are aligned with the relevant teams at each phase kickoff.

## Risks

| Risk | Mitigation |
| --- | --- |
| Building all six modules at once turns into feature piling | Strictly deliver by phase; validate one chain first |
| Sandbox isolation and dependency management underestimated | Phase 2 validates the sandbox with one or two script types first, then expands |
| Few usable MCP servers early in the ecosystem | Prioritize self-building the MCP servers Phase 1 needs (Jira, Confluence) |
| Alert Analyzer experience base has poor cold-start results | Accept early reliance on manual entry; value grows with accumulation |
| Weak domain-knowledge quality leads to vague analysis | Require domains to have at least basic knowledge configured before Requirement Analysis launches |
| MCP credential and external-access security | Encrypt credentials at rest, isolate per team, audit MCP calls |

## Confirmed key decisions (inputs to the technical design)

1. **Shared write-back layer**: Requirement Analysis polishing, mini-tool
   generation, and release summarization are unified into one "AI generates →
   human confirms (optional AI polish / manual edit) → write back" capability,
   reused in all three places; they differ only in input source and output
   template.
2. **Execution environment**: Test Execution and Health Check are built-in
   sandbox only this phase; Jenkins triggering later via MCP extension.
3. **Business domain knowledge**: SQLite + unstructured document retrieval this
   phase; no structured rule engine.
4. **External capability integration**: unified through MCP. Log sources, Jira,
   Confluence, Jenkins, etc. are all integrated as configured MCP servers; the
   platform hardcodes no adapters; teams self-build MCP servers as needed.
5. **Notification channels**: email + generic webhook; enterprise IM via webhook.

**Deferred to the technical-design phase**: MCP server implementation and
runtime, sandbox isolation and dependency approach, the AI write-back layer's
template mechanism, domain-knowledge retrieval implementation, and the
experience-base auto-accumulation algorithm.

## Change history (from spec)

- v3 → v4: MCP set as the platform-level extension standard; Test Execution
  confirmed as built-in-sandbox first; domain knowledge confirmed as unstructured
  retrieval; notifications confirmed as email + webhook; all open questions
  closed and converted to confirmed decisions.
- v2 → v3: modules refactored into the six actually described; introduced the
  two lines (AI reasoning / execution orchestration); extracted the shared
  foundation; clarified AI's role in the test module; decoupled requirements from
  testing; ordered delivery by dependency and value.

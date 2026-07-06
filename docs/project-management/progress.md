# Project progress board — AI Engineering Copilot

Single source of truth for delivery status. Maintained by the pm-agent.
Seeded from PRODUCT_SPEC_v4.md on 2026-07-05.

Doc pipeline per module: Product -> Prototype -> Architecture -> Frontend -> Backend -> DevOps -> Impl
Legend: [x] done · [ ] pending · N/A not applicable

> Note: **Product** and **Prototype** stages are complete for all seven modules.
> Product PRDs came from the v4 spec; the Prototype stage is a runnable Next.js
> prototype covering all screens (`docs/product/prototype/v1/`) with per-module UX
> docs (00–07). Architecture and all engineering-design docs are NOT yet written —
> author each downstream stage through the business-change-workflow skill when you
> start that module.

## Roadmap phases

| Phase | Modules | Status |
|-------|---------|--------|
| Phase 1 | Requirement Analysis (01) · Config Center (04) · Domain Knowledge (05) | Product + Prototype ready — architecture pending |
| Phase 2 | Test Execution (02) · Daily Health Check (03) | Product + Prototype ready — architecture pending |
| Phase 3 | Alert Analyzer (07) · Mini-tools/Release (06) | Product + Prototype ready — architecture pending |

## Module status

Prototype column links to the per-module UX doc under `docs/product/prototype/v1/`.

| Module | PRD | Product | Prototype | Arch | FE | BE | DevOps | Impl | Phase |
|--------|-----|:------:|:---------:|:----:|:--:|:--:|:------:|:----:|:-----:|
| Requirement Analysis | [01](../product/prd/01-requirement-analysis.md) | [x] | [[x]](../product/prototype/v1/01-requirement-analysis.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 1 |
| Config Center | [04](../product/prd/04-config-center.md) | [x] | [[x]](../product/prototype/v1/04-config-center.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 1 |
| Domain Knowledge | [05](../product/prd/05-domain-knowledge.md) | [x] | [[x]](../product/prototype/v1/05-domain-knowledge.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 1 |
| Test Execution | [02](../product/prd/02-test-execution.md) | [x] | [[x]](../product/prototype/v1/02-test-execution.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 2 |
| Daily Health Check | [03](../product/prd/03-health-check.md) | [x] | [[x]](../product/prototype/v1/03-health-check.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 2 |
| Alert Analyzer | [07](../product/prd/07-alert-analyzer.md) | [x] | [[x]](../product/prototype/v1/07-alert-analyzer.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 3 |
| Mini-tools/Release | [06](../product/prd/06-mini-tools.md) | [x] | [[x]](../product/prototype/v1/06-mini-tools.md) | [ ] | [ ] | [ ] | [ ] | [ ] | 3 |

## Next action

Product + Prototype are done for all modules. Begin the **Architecture** stage for
**Phase 1**. Recommended order within the phase: Config Center (04) + Domain
Knowledge (05) first (they are prerequisites for Requirement Analysis writing back
to Jira/Confluence), then Requirement Analysis (01).

Concretely:
1. Create the first change file in `docs/changes/` (e.g.
   `2026-07-06-config-center-mcp.md`) from the template, marking the completed
   Product + Prototype stages and opening the Architecture stage.
2. Run the business-change-workflow skill to produce architecture -> frontend ->
   backend -> devops design docs, pausing for human confirmation between stages.
3. The architecture stage must resolve the items the PRD overview deferred: MCP
   server runtime, sandbox isolation/dependencies, the AI write-back layer's
   template mechanism, and domain-knowledge retrieval.

## Needs attention

- Statistical definitions for all success metrics must be aligned with the
  relevant teams at each phase kickoff (per spec §7).

## Done

| Item | Shipped | Notes |
|------|---------|-------|
| Baseline product docs seeded from v4 spec | 2026-07-05 | 7 module PRDs + overview |
| Prototype v1 (all 7 modules) + UX docs | 2026-07-06 | Next.js app + per-module UX specs (00–07); build passes; fixed `/alerts` missing `"use client"`/`useState` |

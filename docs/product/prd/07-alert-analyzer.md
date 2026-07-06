# PRD 07 — Alert Analyzer (AI reasoning line)

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-05
- **Source:** PRODUCT_SPEC_v4.md §4.7
- **Line:** AI reasoning · **Roadmap:** Phase 3
- **Depends on:** Config Center (04) log-type MCP, Notifications (shared)

## User story

When a production problem arrives, I need to inspect logs along the business flow
and analyze the situation. I want to pre-configure the basics — what system this
is, which service, the impact scope, how to query the logs — and let AI combine
past fix experience with its own judgment to produce a synthesized result, then
send it to me via email or webhook.

## Core capabilities

- **Base config**: configure context for a system / service — system design,
  upstream/downstream relationships, interaction methods, impact scope, etc.
  This part is initially prepared by humans.
- **Log access via MCP**: the Alert Analyzer builds in no specific log-source
  adapter. Log queries go through log-type MCP servers configured in the Config
  Center (different log systems are just different MCP servers).
- **AI analysis**: when an alert fires, AI queries logs via MCP and, combining the
  configured context, past fix experience, and its own judgment, produces a
  synthesized root-cause analysis.
- **Experience iteration**: fix experience is initially entered partly by hand,
  then automatically accumulated and refined from handled alerts.
- **Result delivery**: the analysis result is delivered to the user via email or
  webhook.

## Business rules

- Log queries go through configured MCP servers; log sources are not hardcoded
  (Principle 4: unified extension integration).
- The analysis result must carry evidence: relevant logs and referenced
  historical experience (Principle 2: evidence first).

## Acceptance criteria

- [ ] Base context can be configured for a system / service.
- [ ] Log queries go through configured MCP servers; no hardcoded log source.
- [ ] Supports manual entry of initial fix experience.
- [ ] AI can produce a root-cause analysis combining context, logs, and
      historical experience.
- [ ] The analysis result carries evidence (relevant logs, referenced historical
      experience).
- [ ] Results can be delivered via email or webhook.
- [ ] Historical alert analyses can accumulate into future experience.

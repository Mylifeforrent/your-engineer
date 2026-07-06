---
name: coding-standards
description: >
  Use whenever writing or reviewing code in this repository, to keep style,
  structure, error handling, and testing consistent across the platform. General
  best-practice conventions that apply regardless of module.
---

# Coding standards — AI Engineering Copilot

Baseline conventions for all code. Module-specific backend guidance lives in the
`backend-patterns` skill; this skill is language/layer-agnostic.

## Structure & clarity

- Small, single-purpose functions; keep control flow shallow and readable.
- Respect the module boundaries defined in `docs/architecture/`. Business logic
  stays in its designated layer — no leaking into controllers/UI.
- Prefer editing existing code over duplicating; remove dead code as you go.

## Error handling

- No silent failures. Handle or propagate; never swallow exceptions.
- External I/O (MCP calls, sandbox runs, network, DB) must handle timeouts and
  partial failures explicitly.
- Fail loudly in development, degrade gracefully in production.

## Naming & readability

- Descriptive names; avoid abbreviations that aren't domain-standard.
- Comments explain WHY, not WHAT. Keep them current or delete them.

## Testing

- Cover the acceptance criteria in the module PRD (`docs/product/prd/*.md`).
- Test behaviour and edge cases (empty/loading/error/timeout), not just the
  happy path.
- A change isn't done until its PRD acceptance criteria are demonstrably tested.

## Security-adjacent defaults

- Validate and sanitise untrusted input (user scripts, fetched URLs, log
  content, webhook payloads) before use.
- Never hardcode secrets; read from the team-scoped, encrypted config.
- Do not log secrets or sensitive payloads.

## Consistency with the workflow

- If implementation reveals the design docs are wrong or incomplete, stop and
  fix the docs first (via the business-change-workflow skill) — code and docs
  must stay in agreement, because the docs are the recovery contract.

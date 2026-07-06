---
name: backend-patterns
description: >
  Use when designing or implementing backend/server code for this platform:
  MCP server invocation, the execution sandbox, the shared AI write-back layer,
  notifications (email/webhook), the SQLite domain-knowledge store, async/
  scheduled jobs, or external API integration. Provides the platform's backend
  conventions so implementations stay consistent and safe.
---

# Backend patterns — AI Engineering Copilot

Apply these when writing backend code. They encode the platform's principles so
you don't rediscover them per feature.

## External access goes through MCP — always

- Never hardcode an adapter for a specific external system (log source, Jira,
  Confluence, Jenkins, IM). Reach them only via a configured MCP server.
- Treat MCP calls as untrusted I/O: validate inputs, handle timeouts and partial
  failures, and log the call for audit.
- New external capability = a new configured MCP server, not new adapter code.

## The shared write-back layer

Requirement analysis, mini-tools, and release prep all reuse ONE flow:
`AI generates draft -> human confirms (optional AI polish / manual edit) -> write back`.

- Implement write-back once, parameterised by (input source, output template).
  Do not fork per feature.
- The confirmation step is mandatory and must not be bypassable server-side.
- Surface the created result + link back to the caller.

## Execution sandbox

- User scripts (Playwright/pytest) run only in the isolated sandbox with
  enforced timeout and resource limits.
- Collect screenshots + full logs for all three outcomes (success/failure/error);
  each must be retrievable and human-readable.
- Health-check reuses this same engine — differ only in trigger (cron) and result
  routing (notification), not in execution.

## Domain knowledge store

- This phase: SQLite + unstructured document retrieval. No structured rule engine.
- Retrieval results feeding AI reasoning must be traceable (cite the source docs).

## Notifications

- Only email + generic webhook. Enterprise IM connects via webhook.
- Async flows (health-check, alert-analyzer) notify through these two channels.

## Credentials & isolation

- Encrypt secrets at rest; scope every config (MCP servers, channels) per
  team/workspace. Never log secrets or return them to the client.

## General

- Prefer explicit, typed interface contracts (defined in `docs/architecture/`)
  between layers so frontend and backend can be built independently.
- Evidence-first: analysis outputs (requirement impact, alert root cause) carry
  their sources (links, retrieved knowledge, log excerpts).

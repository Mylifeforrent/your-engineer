# Prototype v1 — UX: Config Center

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/config` · **File:** `app/config/page.tsx`
- **PRD:** [prd/04-config-center.md](../../prd/04-config-center.md)
- **Line/Phase:** Platform Foundation · Phase 1

## Purpose

Configure the team's external capabilities as **MCP servers** and its
**notification channels**, and run connection tests. Encodes PRD principle 4 (all
integration via MCP, no hardcoded adapters) and the credential-isolation stance.

## Layout

Header: phase badge. Body:

- **Principle banner** — shield icon + reminder: "Adding a new external capability =
  configuring an MCP server, not hardcoding an adapter. Credentials are encrypted
  and isolated per team."
- `MCP Services` card — 2-col grid of servers. Each: status dot, name, type badge,
  `mcp://…` endpoint (monospace), status badge (`Connected/Connection Failed/
  Disabled`), and a **Test** button (ghost) that pulses while testing.
- `Notification Channels` card — list of channels. Each: email/webhook icon, name,
  target (address/URL), `Connected` badge, and a **Test** button.

## States

- `testing: string | null` — id of the row currently under test; set on click,
  cleared after 1.2s (`setTimeout`). Drives the pulsing zap icon + "Testing" label.
- MCP status enum: `connected | error | disabled` → tone `success/danger/muted`.
- Server/channel lists are mock consts.

## Interaction notes / fidelity

- The **Test** action is the only wired interaction (simulated success, no real
  probe). `Add MCP` / `Add Channel` are display-only.
- This screen is the backbone dependency for Requirement Analysis, Test Execution,
  Health Check, and Alert Analysis — those modules consume what's configured here.

## Not yet modeled (defer to FE/BE design)

- Add/edit MCP + channel forms, credential entry/encryption, real connection
  probing, per-team isolation, and MCP call auditing.

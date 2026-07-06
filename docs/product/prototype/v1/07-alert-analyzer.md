# Prototype v1 — UX: Alert Analysis

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/alerts` · **File:** `app/alerts/page.tsx`
- **PRD:** [prd/07-alert-analyzer.md](../../prd/07-alert-analyzer.md)
- **Line/Phase:** AI Reasoning · Phase 3

## Purpose

Triage production alerts: query logs via MCP, combine service context and
historical experience, and produce a traceable AI root-cause analysis with
suggested actions, then notify via email/webhook. Encodes PRD principle 2 (evidence
first) and 6 (AI assists).

## Layout

Header: phase badge. Two-column on `lg` (1/3 list+context · 2/3 analysis):

- **Left (stacked):**
  - `Alert List` card — selectable list. Each row: severity dot, alert id,
    severity badge (High/Medium/Low), title, `service · time`, chevron.
  - `Service Base Config` card — key/value rows (System, Service, Upstream,
    Downstream, Impact Scope, Log MCP) that update with the selected alert's
    service.
- **Right:** `Root Cause Analysis · {id}` card with:
  1. **AI Synthesis** — prose root cause (inline code for identifiers).
  2. **Related Logs (via MCP Query)** — monospace log panel, ERROR lines in
     destructive tone.
  3. **Referenced Historical Experience** — an experience card (id, date,
     similarity %, remedy summary).
  4. **Suggested Actions** — ordered list (temporary / stabilize / root-cause fix).
  5. **Notify bar** — `Email Analysis Results` (primary) + `Push to Webhook`
     (outline).

## States

- `selected: Alert` (default first). Selection drives the analysis card title,
  the `Service Base Config` service row, and the status badge/tone.
- Alert list, logs, experience, and actions are mock consts (the analysis body is
  the inventory-service sample regardless of which alert is selected in v1).
- Severity enum: `high | medium | low` → tone `danger/warning/muted`.

> **Fixed during verification (2026-07-06):** this page called `useState` without a
> `"use client"` directive or the import, which broke the production build. Both
> were added; build now passes.

## Interaction notes / fidelity

- Alert selection is the only wired interaction. Notify buttons are display-only.
- Logs-via-MCP and the historical-experience card are the evidence-first anchors;
  the experience card also previews the "experience accumulation" concept from the
  PRD (cold-start caveat noted in the overview risks).

## Not yet modeled (defer to FE/BE design)

- Real alert ingestion, live MCP log queries, per-alert analysis, the experience
  base + similarity retrieval, and actual notification dispatch.

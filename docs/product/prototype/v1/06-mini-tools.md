# Prototype v1 — UX: Mini Tools / Release

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/mini-tools` · **File:** `app/mini-tools/page.tsx`
- **PRD:** [prd/06-mini-tools.md](../../prd/06-mini-tools.md)
- **Line/Phase:** AI Reasoning · Phase 3

## Purpose

Templated, team-specific mini tools built on the shared AI write-back layer, with
Release Document Generation as the flagship: aggregate PRs + completed Jira +
Confluence, produce a draft in team format, confirm write-back. Encodes PRD
principle 1 (confirm write-back) and 6 (AI assists, human edits/polishes).

## Layout

Header: `New Mini Tool` (outline) + phase badge. Body:

- **Tool cards** — 4-up grid: Release Document Generation (primary), Jira Create,
  Jira Review, Confluence Write. Each: icon, name, description.
- **Release tool** — two-column on `lg` (2/5 inputs · 3/5 draft):
  - `Release Prep · v3.8.0` card: aggregated input sources (Merged PRs, Completed
    Jira, Related Confluence) each with count badge + source label; a `Regenerate
    Release Document` button.
  - `Release Document Draft` card: sectioned draft (Version Overview, Major Changes,
    Risks & Rollback) badged `Pending Write-Back Confirmation`; confirm bar with
    `Confirm Write-Back to Confluence` (primary) + `AI Polish Full Text` (outline);
    reminder line "All write-back operations require manual confirmation."

## States

- `phase: "idle" | "gen" | "done"` — **initialized to `done`** so the draft shows by
  default; `Regenerate` sets it back to `done` (no real generation delay wired).
- Tool cards, inputs, and draft body are mock consts.

## Interaction notes / fidelity

- `Regenerate` is the only wired handler (no-op transition). Confirm write-back and
  AI polish are display-only.
- Reuses the same write-back / confirm-gate pattern as Requirement Analysis — this
  is the shared "AI generates → human confirms → write back" layer surfaced in a
  third place (per PRD confirmed decision 1).

## Not yet modeled (defer to FE/BE design)

- Configurable tool templates, real source aggregation, live generation, editable
  draft, and the actual Confluence write-back.

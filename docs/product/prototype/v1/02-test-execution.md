# Prototype v1 — UX: Test Execution

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/tests` · **File:** `app/tests/page.tsx`
- **PRD:** [prd/02-test-execution.md](../../prd/02-test-execution.md)
- **Line/Phase:** Execution Orchestration · Phase 2

## Purpose

Manage uploaded test scripts (Playwright/pytest), run them in the built-in sandbox,
and view screenshots + full logs, with AI consolidating results into a structured
report that can be synced to Jira/Confluence. Encodes PRD principle 5 (process
visibility) and principle 1 (confirm before sync).

## Layout

Two-column on `lg` (2/5 script list · 3/5 detail); header has `Upload Script`
(outline) + phase badge.

- **Left:** `Test Cases` card — selectable list. Each row: status dot, name, kind
  badge (Playwright/pytest), hashtag tags, last-run time.
- **Right (stacked):**
  - Selected-script card: subtitle shows sandbox limits ("Built-in Sandbox ·
    Timeout 60s · Memory 512MB"), a `Run` button, a 3-cell stat strip
    (Passed/Failed/Error), a **Failure Screenshots** grid (3 placeholder thumbs),
    and an **Execution Log** panel (monospace, color-coded pass/fail lines).
  - `AI Test Report` card: prose synthesis of the run + `Sync to Jira` / `Sync to
    Confluence` (both outline), badged `Pending Sync Confirmation`.

## States

- `selected: Script` (default first). Clicking a row highlights it and drives the
  detail card title/subtitle.
- Status is a fixed enum per script: `success | failed | error | idle`, mapped to
  tone (`success/warning/danger/muted`) and label (`Passed/Failed/Error/Not Run`).
- `Run`, stats, and log content are **static mock** in v1 (no live-run transition);
  the detail always shows the checkout-regression sample (9 passed / 3 failed).

## Interaction notes / fidelity

- Script selection is the only wired interaction.
- Log color rule: lines with `✗`/`failed`/`Expected` → destructive; `✓` → success.
- The two sync buttons are this module's confirm gate (display-only in v1).

## Not yet modeled (defer to FE/BE design)

- Real upload, live sandbox run + streaming logs, real screenshot capture, and the
  actual report write-back.

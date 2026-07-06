# Prototype v1 — UX: Daily Health Check

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/health-check` · **File:** `app/health-check/page.tsx`
- **PRD:** [prd/03-health-check.md](../../prd/03-health-check.md)
- **Line/Phase:** Execution Orchestration · Phase 2

## Purpose

Schedule uploaded scripts to run on a cron cadence and push results via
email/webhook, with a fully traceable run history (screenshots + logs). Reuses the
sandbox from Test Execution; encodes PRD principle 5 (visibility).

## Layout

Header: `New Scheduled Task` (outline) + phase badge. Body:

- **Stat strip** (4 mini-stats): Active Tasks, Last 24h Runs, Pass Rate, Today's
  Failures (danger tone).
- **Two-column on `lg`** (2/3 jobs · 1/3 history):
  - `Scheduled Tasks` card — job list. Each row: status dot (enabled+status, else
    muted), name, `Disabled` badge when off, cron label + raw cron + last-run, the
    channel icons it notifies to (mail/webhook), and an **enable toggle** switch.
  - `Execution History` card — timeline rows: time, status dot, job name, duration,
    chevron (into detail).

## States

- No React state — page is a static render of `jobs[]` and `history[]` mock data.
- The enable toggle uses `defaultChecked` (uncontrolled) — visual only in v1.
- Job status enum: `success | failed`; `enabled` boolean flips the dot to muted.

## Interaction notes / fidelity

- Everything is display-only: `New Scheduled Task`, toggles, and history chevrons
  are affordances, not wired.
- Notification-channel icons per job map to the channels configured in Config
  Center — the cross-module link to surface in later design.

## Not yet modeled (defer to FE/BE design)

- Cron editor, real scheduling/execution, live pass-rate, run-detail drill-in with
  screenshots/logs, and actual email/webhook dispatch.

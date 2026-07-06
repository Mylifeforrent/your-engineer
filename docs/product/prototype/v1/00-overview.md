# Prototype v1 — UX Overview: AI Engineering Copilot

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-06
- **Stage:** Prototype / UX (pipeline stage 2)
- **Source of truth for behavior:** the PRDs in `docs/product/prd/` (01–07)
- **Reference implementation:** the Next.js app in this folder (`app/`, `components/`, `lib/`)

> This document and its per-module siblings (01–07) describe the **screens, states,
> and interaction flows** of the v1 prototype. The runnable app in this folder is
> the visual reference; these docs are the recovery contract — if the app code were
> lost, the UX could be reconstructed from these docs plus the PRDs.

## What the prototype is

A clickable, front-end-only prototype covering all seven modules on one app shell.
It has **no backend** — all data is mocked in `lib/data.ts` and inline per page, and
"AI" flows are simulated with `setTimeout`. Its job is to validate information
architecture, screen layout, and the human-confirmation interaction model before
any architecture or engineering design begins.

## Tech (prototype only — not a product decision)

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Static prerender; every route is `○ (Static)` |
| UI runtime | React 19 | Interactive pages use `"use client"` |
| Styling | Tailwind CSS 4 + `globals.css` design tokens | Dark theme, token-driven colors |
| Icons | `lucide-react` | — |
| Data | mocked in `lib/data.ts` + inline consts | no network, no persistence |

These are prototype conveniences. The real frontend stack is decided later in the
`docs/frontend/` stage and is **not** bound by this choice.

## Information architecture

The left nav (`lib/nav.ts`) groups the seven modules to mirror the PRD's "two
product lines + shared foundation" model:

- **Workbench** — Overview (`/`)
- **AI Reasoning Line** — Requirement Analysis (`/requirements`), Alert Analysis
  (`/alerts`), Mini Tools / Release (`/mini-tools`)
- **Execution Orchestration Line** — Test Execution (`/tests`), Daily Health Check
  (`/health-check`)
- **Platform Foundation** — Config Center (`/config`), Domain Knowledge (`/domains`)

Every page carries a phase/line badge (e.g. "AI Reasoning · Phase 1") so the
roadmap is visible in the UI itself.

## Shared layout & component system

- **App shell** (`components/app-shell.tsx`): fixed left sidebar with grouped nav,
  active-route highlight, and per-item badges (e.g. pending-alert count). Main
  content scrolls independently.
- **UI kit** (`components/ui.tsx`): the shared primitives every page composes from —
  `PageHeader`, `Card` / `CardHeader`, `Badge`, `Button`, `StatusDot`, `Stat`.
- **Design tokens** (`app/globals.css`): semantic color tokens (`primary`,
  `success`, `warning`, `destructive`, `muted`, `border`, `secondary`) used
  consistently for status meaning across modules.

## Cross-cutting interaction patterns

These recur on every module and encode the PRD's product principles:

1. **Human-confirmation gate.** Any write-back (Jira create, Confluence sync,
   notification send) is a distinct confirm button, never automatic. Draft output
   carries a `Pending … Confirmation` badge and a reminder line ("No Jira /
   Confluence content is created before confirmation"). — PRD principle 1.
2. **Evidence-first output.** AI conclusions are shown alongside their sources:
   referenced domain docs, visited links, queried log excerpts, historical
   experience cards. — PRD principle 2.
3. **AI-draft → edit / polish.** Generated content is editable, with an "AI Polish"
   affordance on the whole draft or a selected part. — PRD principle 6.
4. **Process visibility.** Execution modules surface full logs, screenshots, and
   status dots so users can see exactly what ran. — PRD principle 5.
5. **Simulated async.** AI/analysis actions move through `idle → analyzing → done`
   states via `setTimeout`, standing in for real async backends.

## Screen inventory

| # | Module | Route | Doc | Key interactive states |
| --- | --- | --- | --- | --- |
| — | Overview | `/` | [00](00-overview.md) | static dashboard (stats, activity, to-do, trend, module grid) |
| 01 | Requirement Analysis | `/requirements` | [01](01-requirement-analysis.md) | `idle → analyzing → done`; domain select; confirm-create |
| 02 | Test Execution | `/tests` | [02](02-test-execution.md) | script select; run stats; logs/screenshots; report sync |
| 03 | Daily Health Check | `/health-check` | [03](03-health-check.md) | job list + enable toggle; run history |
| 04 | Config Center | `/config` | [04](04-config-center.md) | MCP list + connection test; notification channels |
| 05 | Domain Knowledge | `/domains` | [05](05-domain-knowledge.md) | domain select; doc list; search |
| 06 | Mini Tools / Release | `/mini-tools` | [06](06-mini-tools.md) | tool cards; release inputs; draft + write-back confirm |
| 07 | Alert Analysis | `/alerts` | [07](07-alert-analyzer.md) | alert select; root-cause synthesis; notify |

## Known prototype limitations

- Front-end only; no auth, no persistence, no real MCP/sandbox/AI calls.
- Mock data is illustrative (e-commerce trading domain) to make flows concrete;
  the product itself is domain-agnostic (PRD principle 7).
- Some flows are display-only (edit / polish buttons are affordances, not wired).

## Build / run

From this folder: `npm install` then `npm run build` (or `npm run dev`). As of
2026-07-06 the build is clean — all 10 routes prerender. One bug was fixed during
verification: `/alerts` was missing its `"use client"` directive and `useState`
import.

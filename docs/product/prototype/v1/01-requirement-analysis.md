# Prototype v1 — UX: Requirement Analysis

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/requirements` · **File:** `app/requirements/page.tsx`
- **PRD:** [prd/01-requirement-analysis.md](../../prd/01-requirement-analysis.md)
- **Line/Phase:** AI Reasoning · Phase 1

## Purpose

Let a user turn a requirement (text or link) plus a chosen business domain into an
AI analysis — impact scope, suggested Jira tasks, user stories — with traceable
sources, then confirm to create Jira/Confluence. Encodes PRD principles 1 (human
confirm), 2 (evidence first), 6 (AI assists).

## Layout

Two-column on `lg` (2/5 input · 3/5 output); stacks on mobile.

- **Left (input):**
  - `Requirement Input` card: business-domain chip selector (single-select, 5 mock
    domains), requirement textarea, an "Attached" link chip, and a `Start Analysis`
    button.
  - `Referenced Sources` card: empty placeholder until analysis completes, then a
    list of cited domain docs / links with type badges.
- **Right (output):** `Analysis Results` card with a state-driven body.

## States

Single state var `phase: "idle" | "analyzing" | "done"` (mock, `setTimeout` 1.6s).

| Phase | Output card | Sources card | Result badge |
| --- | --- | --- | --- |
| `idle` | centered prompt + sparkle icon | placeholder text | `Not Started` (muted) |
| `analyzing` | spinner + "Retrieving domain knowledge…" | placeholder | — |
| `done` | full analysis (below) | cited sources list | `Pending Manual Confirmation` (warning) |

Domain selection updates the result card subtitle (`Domain: …`) live.

## `done` output anatomy

1. **Requirement Summary** — prose paragraph.
2. **Impact Scope** — row of primary badges (affected services/areas).
3. **Suggested Tasks (Jira Draft)** — list; each item shows title, type badge
   (Backend/Frontend), story points, a per-item edit (pencil) affordance; section
   header has an **AI Polish** action.
4. **User Stories** — list of story cards.
5. **Confirm bar** — `Confirm and Create 4 Jira Tasks` (primary) + `Sync to
   Confluence` (outline), followed by the reminder line "No Jira / Confluence
   content is created before confirmation."

## Interaction notes / fidelity

- `Start Analysis` is the only wired transition; edit, AI-polish, and the confirm
  buttons are display-only affordances in v1.
- The confirm gate and source traceability are the two must-keep behaviors for
  later stages — they map directly to PRD acceptance criteria.

## Not yet modeled (defer to FE/BE design)

- Real link fetching, real domain retrieval, editable task rows, partial-selection
  AI polish, and the actual Jira/Confluence write-back result echo.

# Prototype v1 — UX: Domain Knowledge

- **Owner:** (you) · **Status:** Approved · **Last updated:** 2026-07-06
- **Route:** `/domains` · **File:** `app/domains/page.tsx`
- **PRD:** [prd/05-domain-knowledge.md](../../prd/05-domain-knowledge.md)
- **Line/Phase:** Platform Foundation · Phase 1

## Purpose

Define business domains and load each with unstructured knowledge documents
(SQLite + document retrieval this phase) that AI modules — chiefly Requirement
Analysis — retrieve for RAG. Encodes PRD principle 7 (domain-agnostic; team injects
knowledge).

## Layout

Header: `New Domain` (outline) + phase badge. Two-column on `lg` (1/3 list · 2/3
detail):

- **Left:** `Business Domains` card — selectable list. Each row: book icon,
  name, `N docs · size`, last-updated.
- **Right:** selected-domain card:
  - Header: "{domain} · Knowledge Documents", subtitle "N documents · Used for RAG
    retrieval augmentation", `Upload Document` button.
  - Search bar (placeholder scoped to the selected domain).
  - Document list — each row: file icon, filename, size, category tag badge.
  - Footer note tying it back to Requirement Analysis: "When Requirement Analysis
    selects '{domain}', it will actually retrieve these documents and trace
    citations in conclusions."

## States

- `selected: Domain` (default first). Selection drives the detail header, subtitle,
  search placeholder, and footer note.
- Domain list and doc list are mock consts (doc list is the same sample regardless
  of selected domain in v1).

## Interaction notes / fidelity

- Domain selection is the only wired interaction. `New Domain`, `Upload Document`,
  and search are display-only.
- The footer note is the explicit UX link to Requirement Analysis's evidence-first
  behavior — keep this coupling visible in later design.

## Not yet modeled (defer to FE/BE design)

- Create-domain + upload flows, real document storage/indexing, working search, and
  the retrieval that feeds citations back into Requirement Analysis.

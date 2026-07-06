# PRD 05 — Business Domain Knowledge (shared foundation)

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-05
- **Source:** PRODUCT_SPEC_v4.md §4.5
- **Line:** Shared foundation · **Roadmap:** Phase 1
- **Consumed by:** Requirement Analysis (01) and other AI reasoning modules

## User story

As an admin, I want to define business domains for my team and attach the
corresponding business knowledge to each domain, so that modules like Requirement
Analysis can read targeted domain context when they work.

## Core capabilities

- Define business domains (implemented lightweight with SQLite this phase).
- Configure / attach business knowledge for each domain.
- Serve retrieval to AI reasoning modules (e.g. Requirement Analysis) by the
  selected domain.

## Business rules

- When Requirement Analysis selects a domain, it must actually retrieve that
  domain's knowledge and reflect it in the output (Principle 2: evidence first).

## Acceptance criteria

- [ ] Business domains can be created and edited.
- [ ] Business knowledge can be configured for a domain.
- [ ] When Requirement Analysis selects a domain, that domain's knowledge is
      actually retrieved and reflected in the output.

## Out of scope (this phase)

- Unstructured document retrieval only; no structured rule engine.

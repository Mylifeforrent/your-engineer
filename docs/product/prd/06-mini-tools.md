# PRD 06 — Mini-tools (AI reasoning line)

- **Owner:** (you)
- **Status:** Approved
- **Last updated:** 2026-07-05
- **Source:** PRODUCT_SPEC_v4.md §4.6
- **Line:** AI reasoning · **Roadmap:** Phase 3
- **Depends on:** AI write-back layer (shared), Config Center (04)

## User story

I want to configure mini-tools that fit our team's conventions based on templates
the platform provides — e.g. Jira review, Jira create, Confluence create/edit —
and use AI to generate content in our team's format. Release prep especially:
after tests pass, we hand-write release docs from Jira, Confluence, and PRs,
which is time-consuming, and I want AI to ease that burden.

## Core capabilities

- **Templated mini-tools**: the platform provides templates; teams configure
  their own mini-tools (Jira review, Jira create, Confluence create/edit, etc.).
- **AI content generation**: use AI to generate Jira / Confluence content in the
  team's format.
- **Release prep tool**: aggregate Jira, Confluence, and PR info; AI generates a
  release-doc draft, reducing manual summarization.

All mini-tools reuse the shared "AI generates → human confirms → write back"
capability.

## Business rules

- All write-back actions require user confirmation (Principle 1: humans confirm
  write operations).
- Generated content must match the team's configured format.

## Acceptance criteria

- [ ] Provides configurable mini-tool templates.
- [ ] Teams can configure their own mini-tools from templates.
- [ ] AI-generated content matches the team's configured format.
- [ ] The release tool can aggregate Jira / Confluence / PR and generate a doc
      draft.
- [ ] All write-back actions require user confirmation.

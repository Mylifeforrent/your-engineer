---
name: business-change-workflow
description: >
  Use this skill whenever a change touches a business rule — login, authentication,
  authorization/permissions, payments, pricing, billing, data retention, or any
  user-facing workflow — before writing or editing any source code. It drives the
  change through an ordered, human-gated documentation pipeline (product ->
  prototype -> architecture -> frontend -> backend -> devops -> project management)
  and only then unlocks implementation. Trigger it when the user proposes a new
  feature or a change to how the product behaves, or when the PreToolUse guard
  blocks a code edit and tells you to run this workflow.
---

# Business Change Workflow

This skill enforces the ordered pipeline defined in the root `CLAUDE.md`. Run it
in the main conversation so the human can see and confirm each step.

## Step 0 — Decide if this is a business change

A change is a "business change" if it alters product behaviour or a business
rule (login, auth, permissions, payments, pricing, data retention, user-facing
flows). Pure refactors, typos, and formatting are NOT business changes — tell
the human they can set `docs/changes/.active` to `trivial` to bypass the guard.

If it IS a business change, continue.

## Step 1 — Assess impact and create the change file

1. Read `docs/project-management/progress.md` and skim the existing docs to
   understand current state.
2. Determine which stages are affected and which are `N/A`.
3. Decide whether this is a **large** change (touches architecture, or 3+ areas,
   or is risky). If large, invoke the `doc-archivist` agent to snapshot the
   affected docs into `docs/_archive/YYYY-MM-DD-<slug>/` BEFORE anything is edited.
4. Create `docs/changes/YYYY-MM-DD-<slug>.md` from
   `docs/changes/TEMPLATE.md`, filling in the summary, the affected-files list,
   and marking clearly-irrelevant stages as `N/A`.
5. Present the impact assessment to the human and ask them to confirm the scope
   and the list of documents to be changed. **Wait for confirmation.**

## Step 2 — Walk the pipeline, one stage at a time

For each applicable stage IN ORDER:
`Product -> Prototype -> Architecture -> Frontend -> Backend -> DevOps`

1. Update the relevant document(s) using the matching `TEMPLATE.md`.
2. Link the updated file(s) in the change file's "Affected files" list.
3. Show the human what changed and **ask for confirmation** before advancing.
4. On confirmation, tick that stage's box (`- [x]`) in the change file.

Use the `architect-agent` for the Architecture stage. Do not skip ahead; do not
edit source code yet.

## Step 3 — Register the task with project management

Invoke the `pm-agent` to:
- Add the change to `docs/project-management/progress.md` with owner, status,
  and a link to the change file.
- Tick the "Project management" box in the change file.

## Step 4 — Unlock implementation

Once every applicable stage is `- [x]` or `N/A` up to and including
"Project management":
1. Write the change slug into `docs/changes/.active` (this tells the
   PreToolUse guard that coding is now permitted for this change).
2. Hand off to the `dev-agent` to implement against the approved docs.
3. As implementation completes, tick "Implementation" and update
   `progress.md` via the `pm-agent`.

## Step 5 — Close out

- Confirm the docs still match the shipped code (they are the recovery contract).
- Clear or update `docs/changes/.active`.
- Mark the change `Done` in `progress.md`.

## Guardrails

- Never edit source code while any applicable pre-implementation stage is
  unchecked. The PreToolUse guard will block you anyway; respect it.
- Every stage transition needs explicit human confirmation.
- Keep docs detailed enough to reconstruct the code from scratch.

# Project Guide for Claude Code

This file loads at the start of every session. It defines the documentation
structure, the roles, and the hard rules that govern how changes flow through
the project. Read it before doing anything.

---

## 1. Documentation structure

All project knowledge lives under `docs/`. Every folder has one clear owner.

```
docs/
  product/                 # WHAT we build and WHY
    prd/                   # Product requirement documents (one file per feature/module)
    prototype/             # Prototype / UX notes, wireframe descriptions, flows
  architecture/            # System-level design: data flow, module boundaries, tech choices
  frontend/                # Frontend design docs: components, state, routes, API contracts
  backend/                 # Backend design docs: services, endpoints, data models, jobs
  devops/                  # Deployment, infra, CI/CD, environments, runbooks
  project-management/
    progress.md            # Master progress board (single source of truth for status)
  changes/                 # Change index: ONE file per business change (the core mechanism)
  _archive/                # Version snapshots, one folder per archived change (for rollback)
```

The `architecture/` folder is intentionally separate from `frontend/` and
`backend/`, because a system-level change touches both and must not hide inside
either one.

---

## 2. The change index (`docs/changes/`) is the source of truth for progress

A "business change" is any change that alters a business rule: login, auth,
permissions, payments, pricing, data retention, user-facing workflows, etc.

Every business change gets exactly one file:
`docs/changes/YYYY-MM-DD-<slug>.md` (see `docs/changes/TEMPLATE.md`).

That file holds:
- A checklist of the stages the change must pass through, in order.
- Links to every specific document that this change touches.
- The current status of each stage.

Claude and every hook/skill/agent MUST read the relevant change file to know
what stage a change is in and what is still incomplete. Do NOT try to infer
progress by scanning the whole `docs/` tree.

---

## 3. The mandatory change pipeline (order matters)

A business change must move through these stages IN ORDER. Each stage produces
or updates a document, and each stage requires HUMAN CONFIRMATION before moving
to the next:

1. **Product** — update/create the PRD in `docs/product/prd/`.
2. **Prototype / UX** — update `docs/product/prototype/` (only if there is UI impact).
3. **Architecture** — update `docs/architecture/` (only if module boundaries / data flow / tech change).
4. **Frontend design** — update `docs/frontend/`.
5. **Backend design** — update `docs/backend/`.
6. **DevOps** — update `docs/devops/` (only if deploy/infra/env impact).
7. **Project management** — record the task and status in `docs/project-management/progress.md`.
8. **Implementation** — only now may code be written.

Stages that clearly have no impact may be marked `N/A` in the change file, but
this must be an explicit, human-confirmed decision — never silently skipped.

---

## 4. Hard rules (non-negotiable)

- **No code before docs.** Code (`Edit`/`Write` on source files) is only allowed
  for a business change once its change file shows every applicable stage
  complete up to and including "Project management". A `PreToolUse` hook enforces
  this; do not try to work around it.
- **One change, one change file.** Never bundle unrelated business changes.
- **Snapshot before large changes.** For any change flagged as "large", the
  `doc-archivist` agent copies the current affected docs into
  `docs/_archive/YYYY-MM-DD-<slug>/` BEFORE they are edited, so the project can
  be rolled back or reconstructed from docs alone.
- **Human confirmation between stages.** After each stage's document is updated,
  stop and ask the human to confirm before advancing.
- **Docs are the recovery contract.** The docs must be complete enough that, if
  the code were lost, an AI agent could reconstruct the implementation from the
  docs alone. Write them with that bar in mind.

---

## 5. Roles (subagents)

| Role            | Agent file                     | Responsibility |
|-----------------|--------------------------------|----------------|
| Project manager | `.claude/agents/pm-agent.md`   | Maintain `progress.md` and change-file status |
| Architect       | `.claude/agents/architect-agent.md` | Update architecture + interface/design docs |
| Doc archivist   | `.claude/agents/doc-archivist.md`   | Snapshot docs to `_archive/` before large changes |
| Developer       | `.claude/agents/dev-agent.md`  | Write code — only after the pipeline is complete |
| Code reviewer   | `.claude/agents/code-reviewer.md`     | Review diffs for correctness/quality and fidelity to the design docs |
| Security reviewer | `.claude/agents/security-reviewer.md` | Review changes against the platform's security invariants (credentials, MCP, sandbox, write-backs) |
| Test runner     | `.claude/agents/test-runner.md`       | Run tests, isolate failures, verify PRD acceptance criteria |

The end-to-end procedure is defined in the
`business-change-workflow` skill (`.claude/skills/business-change-workflow/`).
Two supporting knowledge skills are available and auto-loaded when relevant:
`backend-patterns` (MCP / sandbox / write-back / notifications conventions) and
`coding-standards` (general style, error handling, testing).

---

## 6. Conventions

- Change slugs are kebab-case and descriptive: `requirement-analysis-mcp`, `sandbox-timeout-limits`.
- Dates use `YYYY-MM-DD`.
- Every doc has an owner, a status, and a "last updated" date in its header.
- Prefer editing an existing doc over creating a near-duplicate.

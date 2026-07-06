# Setup guide

This scaffold gives you a documentation-driven change workflow for Claude Code.
A code edit is blocked until the change has passed an ordered, human-confirmed
documentation pipeline.

## 1. Drop the files into your project

Copy the contents of this folder into your project root, preserving structure:

```
your-project/
  CLAUDE.md
  .claude/
    settings.json
    hooks/business-change-guard.sh
    skills/business-change-workflow/SKILL.md
    agents/pm-agent.md
    agents/architect-agent.md
    agents/doc-archivist.md
    agents/dev-agent.md
  docs/
    product/ architecture/ frontend/ backend/ devops/
    project-management/progress.md
    changes/  _archive/
```

If you already have a `CLAUDE.md` or `.claude/settings.json`, MERGE rather than
overwrite.

## 2. Make the hook executable

```bash
chmod +x .claude/hooks/business-change-guard.sh
```

The hook needs `jq` on your PATH. Install it if missing (`brew install jq`,
`apt-get install jq`, etc.).

## 3. Tune the guard to your codebase

Open `.claude/hooks/business-change-guard.sh` and adjust the "allow" lists in
section 2 to match your project:
- If your business rules live in `.yaml`/`.json`/`.sql`, REMOVE those extensions
  from the allow list so edits to them are also gated.
- Keep genuinely non-business files (lockfiles, README, etc.) allowed.

## 4. How a change flows

1. You describe a change (e.g. "add CAPTCHA to login").
2. Claude runs the `business-change-workflow` skill: it assesses impact, creates
   `docs/changes/YYYY-MM-DD-<slug>.md`, and (for large changes) snapshots the
   affected docs to `docs/_archive/<slug>/` via the `doc-archivist` agent.
3. Claude walks the pipeline stage by stage — product, prototype, architecture,
   frontend, backend, devops — pausing for your confirmation at each step.
4. The `pm-agent` registers the task in `docs/project-management/progress.md`.
5. Only then is the slug written to `docs/changes/.active`, which lets the
   PreToolUse guard permit code edits. The `dev-agent` implements against the
   approved docs.

## 5. Trivial / non-business edits

For a typo or refactor that is not a business change:

```bash
echo trivial > docs/changes/.active
```

This bypasses the guard for the current change. Clear it afterwards.

## 6. Rollback / reconstruction

Every large change is archived under `docs/_archive/<slug>/` with a MANIFEST.
Because docs are written as the "recovery contract", you can hand the archived
docs back to an agent to reconstruct the implementation if code is lost.

## 7. Worked example

`docs/changes/2026-07-05-login-captcha.md` is a filled-in example. Read it to see
the pattern, then delete it.

## Reference

This mirrors patterns from open-source spec-driven setups you can study further:
BMAD-METHOD, Pimzino/claude-code-spec-workflow (has a progress dashboard),
gotalab/cc-sdd, and shinpr/claude-code-workflows.

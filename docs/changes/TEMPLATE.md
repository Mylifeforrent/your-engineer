# Change: <short title>

- **Slug:** `YYYY-MM-DD-<slug>`
- **Date opened:** YYYY-MM-DD
- **Owner:** <name>
- **Size:** small | large
- **Status:** Planning | Docs in review | Ready for dev | In progress | Done | Rolled back

## Summary

<One or two sentences: what is changing and why. This is the business rule being
changed, stated plainly.>

## Pipeline

Tick a box when the stage's doc is updated AND the human has confirmed it.
Mark a stage `N/A` (and say why) if it truly has no impact.

- [ ] Product          — PRD updated
- [ ] Prototype        — UX / prototype updated
- [ ] Architecture     — system design updated
- [ ] Frontend         — frontend design updated
- [ ] Backend          — backend design updated
- [ ] DevOps           — deploy / infra updated
- [ ] Project management — task registered in progress.md
- [ ] Implementation   — code written against approved docs

## Affected files

List every document (and later, every source file) this change touches. This is
what the guard and agents read to know scope.

- product/prd/<file>.md
- architecture/<file>.md
- frontend/<file>.md
- backend/<file>.md
- devops/<file>.md

## Snapshot (large changes only)

- Archived to: `docs/_archive/YYYY-MM-DD-<slug>/`
- Manifest: `docs/_archive/YYYY-MM-DD-<slug>/MANIFEST.md`

## Notes / decisions

<Any decisions made, alternatives rejected, N/A justifications, open questions.>
